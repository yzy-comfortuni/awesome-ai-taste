(function (root) {
  'use strict';
  const node = typeof module !== 'undefined' && module.exports;
  const G = node ? require('./geometry.js') : root.TechnicalGeometry;
  const SHEET = node ? require('./sheet.js') : root.TechnicalSheet;
  const {add, sub, dot, cross, ROLES} = G;

  function createCamera({azimuth = -135, elevation = Math.asin(1 / Math.sqrt(3)) * 180 / Math.PI, roll = 16} = {}) {
    if (![azimuth, elevation, roll].every(Number.isFinite) || Math.abs(elevation) > 90) throw Error('Invalid camera angles');
    const a = azimuth * Math.PI / 180, e = elevation * Math.PI / 180, r = roll * Math.PI / 180;
    const direction = [Math.cos(e) * Math.cos(a), Math.cos(e) * Math.sin(a), Math.sin(e)];
    const right = [-Math.sin(a), Math.cos(a), 0], up = cross(direction, right);
    return {
      direction,
      project: p => {
        const x = dot(p, right), y = -dot(p, up);
        return [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r), dot(p, direction)];
      }
    };
  }
  const defaultCamera = createCamera();
  const project = (point, camera) => (camera ? createCamera(camera) : defaultCamera).project(point);

  const escape = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
  const round = n => Number(n.toFixed(4));
  const rank = line => ROLES.indexOf(line.role);
  const shift = (part, amount) => part.explosion.map(n => n * amount);

  function contours(part, direction) {
    const edges = new Map();
    for (const f of part.triangles) {
      const ab = sub(part.vertices[f[1]], part.vertices[f[0]]), ac = sub(part.vertices[f[2]], part.vertices[f[0]]), n = cross(ab, ac);
      const length = Math.hypot(...n), flat = length <= Math.hypot(...ab) * Math.hypot(...ac) * 1e-12;
      for (let j = 0; j < 3; j++) {
        const a = f[j], b = f[(j + 1) % 3], key = a < b ? `${a}:${b}` : `${b}:${a}`;
        if (!edges.has(key)) edges.set(key, {a, b, uses: 0, signs: []});
        const edge = edges.get(key);
        edge.uses++;
        if (!flat) edge.signs.push(dot(n, direction) / length);
      }
    }
    return [...edges.values()].filter(e => {
      if (!e.signs.length) return false;
      if (e.uses === 1) return true;
      const low = Math.min(...e.signs), high = Math.max(...e.signs);
      return low <= 1e-8 && high >= -1e-8 && (low < -1e-8 || high > 1e-8);
    });
  }

  function chain(segments) {
    const ends = new Map(), used = new Uint8Array(segments.length);
    segments.forEach(([a, b], i) => {
      for (const end of [a, b]) {
        if (!ends.has(end)) ends.set(end, []);
        ends.get(end).push(i);
      }
    });
    const extend = (from, add) => {
      for (let tail = from; ;) {
        const next = ends.get(tail).find(i => !used[i]);
        if (next === undefined) return;
        used[next] = 1;
        const [a, b] = segments[next];
        tail = a === tail ? b : a;
        add(tail);
      }
    };
    let d = '';
    segments.forEach(([a, b], i) => {
      if (used[i]) return;
      used[i] = 1;
      const points = [a, b];
      extend(b, end => points.push(end));
      extend(a, end => points.unshift(end));
      d += 'M' + points.join('L');
    });
    return d;
  }

  function checkPart(p) {
    if (p.triangles.some(f => f.length !== 3 || f.some(i => !Number.isInteger(i) || i < 0 || i >= p.vertices.length))) {
      throw Error(`Part ${p.id} has a triangle that references a missing vertex`);
    }
    if (!p.vertices.every(G.isPoint) || !p.lines.every(l => G.isPoint(l.a) && G.isPoint(l.b))) {
      throw Error(`Part ${p.id} has a point without three finite coordinates`);
    }
  }

  function fit(scenes) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const extend = ([x, y]) => {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    };
    for (const {meshes, trails} of scenes) {
      for (const mesh of meshes) {
        mesh.points.forEach(extend);
        for (const l of mesh.lines) [l.a, l.b].forEach(extend);
      }
      for (const t of trails) [t.a, t.b].forEach(extend);
    }
    if (![minX, minY, maxX, maxY].every(Number.isFinite)) throw Error('Drawing geometry must contain finite vertices');
    const scale = Math.min((SHEET.width - SHEET.margin * 2) / (maxX - minX || 1), (SHEET.height - SHEET.margin * 2) / (maxY - minY || 1));
    const bounds = {width: (maxX - minX) * scale, height: (maxY - minY) * scale};
    bounds.x = (SHEET.width - bounds.width) / 2;
    bounds.y = (SHEET.height - bounds.height) / 2;
    return {scale, bounds, offset: [bounds.x - minX * scale, bounds.y - minY * scale]};
  }

  function occluder(meshes, paper, depthTolerance) {
    const triangles = [], cells = new Map(), cellSize = 1.5;
    const cell = n => Math.floor(n / cellSize);
    for (const mesh of meshes) {
      if (mesh.part.transparent) continue;
      const points = mesh.points.map(paper);
      for (const face of mesh.part.triangles) {
        const [a, b, c] = face.map(i => points[i]);
        const den = (b[1] - c[1]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[1] - c[1]);
        const span = Math.max((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2, (b[0] - c[0]) ** 2 + (b[1] - c[1]) ** 2, (c[0] - a[0]) ** 2 + (c[1] - a[1]) ** 2);
        if (Math.abs(den) <= span * 1e-9) continue;
        const id = triangles.push({a, b, c, den}) - 1;
        for (let x = cell(Math.min(a[0], b[0], c[0])); x <= cell(Math.max(a[0], b[0], c[0])); x++) {
          for (let y = cell(Math.min(a[1], b[1], c[1])); y <= cell(Math.max(a[1], b[1], c[1])); y++) {
            const key = x + ',' + y;
            if (!cells.has(key)) cells.set(key, []);
            cells.get(key).push(id);
          }
        }
      }
    }
    return p => {
      for (const id of cells.get(cell(p[0]) + ',' + cell(p[1])) || []) {
        const {a, b, c, den} = triangles[id];
        const u = ((b[1] - c[1]) * (p[0] - c[0]) + (c[0] - b[0]) * (p[1] - c[1])) / den;
        if (u < -.000001 || u > 1.000001) continue;
        const v = ((c[1] - a[1]) * (p[0] - c[0]) + (a[0] - c[0]) * (p[1] - c[1])) / den;
        if (v < -.000001 || u + v > 1.000001) continue;
        if (u * a[2] + v * b[2] + (1 - u - v) * c[2] > p[2] + depthTolerance) return false;
      }
      return true;
    };
  }

  function inker({paper, scale, visible, sample}) {
    const point = p => `${round(p[0])} ${round(p[1])}`;
    return lines => {
      const paths = new Map(), seen = new Set();
      for (const {a: from, b: to, role} of lines.sort((a, b) => rank(a) - rank(b))) {
        const a = paper(from), b = paper(to);
        const key = [a, b].map(q => point(q) + ' ' + round(q[2] * scale)).sort().join('|');
        if (seen.has(key)) continue;
        seen.add(key);
        const steps = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / sample));
        let run = null, previous = null;
        const keep = (start, end) => {
          const ends = [point(start), point(end)];
          if (ends[0] === ends[1]) return;
          if (!paths.has(role)) paths.set(role, []);
          paths.get(role).push(ends);
        };
        for (let i = 0; i <= steps; i++) {
          const at = a.map((n, k) => n + (b[k] - n) * i / steps);
          if (visible(at)) {
            run ??= at;
          } else if (run !== null) {
            if (previous) keep(run, previous);
            run = null;
          }
          previous = at;
        }
        if (run !== null) keep(run, previous);
      }
      return [...paths].map(([role, segments]) => `<path data-line-role="${role}" fill="none" d="${chain(segments)}"/>`).join('');
    };
  }

  function filler(meshes, paper, visible) {
    const faces = [];
    const seen = (a, b, c) => {
      const steps = Math.min(24, Math.ceil(Math.max(Math.hypot(b[0] - a[0], b[1] - a[1]), Math.hypot(c[0] - a[0], c[1] - a[1]))));
      for (let i = 0; i <= steps; i++) {
        for (let j = 0; i + j <= steps; j++) {
          const u = (i + 1 / 3) / (steps + 1), v = (j + 1 / 3) / (steps + 1);
          if (visible([0, 1, 2].map(k => a[k] + u * (b[k] - a[k]) + v * (c[k] - a[k])))) return true;
        }
      }
      return false;
    };
    const pieces = (a, b, c) => {
      const n = Math.min(48, Math.ceil(Math.max(...[[a, b], [b, c], [c, a]].map(([p, q]) => Math.hypot(q[0] - p[0], q[1] - p[1]))) / 3));
      const at = (i, j) => [0, 1, 2].map(k => a[k] + (b[k] - a[k]) * i / n + (c[k] - a[k]) * j / n), result = [];
      for (let i = 0; i < n; i++) {
        for (let j = 0; i + j < n; j++) {
          result.push([at(i, j), at(i + 1, j), at(i, j + 1)]);
          if (i + j < n - 1) result.push([at(i + 1, j), at(i + 1, j + 1), at(i, j + 1)]);
        }
      }
      return result;
    };
    // Closed shells hide their own back faces. Each shell's signed volume
    // says which way its triangles wind, since helpers differ.
    const facing = part => {
      const key = i => part.vertices[i].map(n => n.toFixed(6)).join(), parent = part.triangles.map((_, f) => f), faces = new Map();
      const find = f => {
        while (parent[f] !== f) f = parent[f] = parent[parent[f]];
        return f;
      };
      const edges = part.triangles.map(face => {
        const keys = face.map(key);
        return keys.map((k, j) => [k, keys[(j + 1) % 3]].sort().join('|'));
      });
      edges.forEach((list, f) => list.forEach(edge => {
        if (faces.has(edge)) parent[find(f)] = find(faces.get(edge));
        else faces.set(edge, f);
      }));
      const shells = new Map();
      part.triangles.forEach((face, f) => {
        const root = find(f);
        if (!shells.has(root)) shells.set(root, {volume: 0, uses: new Map()});
        const shell = shells.get(root), [a, b, c] = face.map(i => part.vertices[i]);
        shell.volume += dot(a, cross(b, c));
        for (const edge of edges[f]) shell.uses.set(edge, (shell.uses.get(edge) || 0) + 1);
      });
      for (const shell of shells.values()) {
        shell.sign = [...shell.uses.values()].every(n => n % 2 === 0) ? Math.sign(shell.volume) : 0;
      }
      return part.triangles.map((_, f) => shells.get(find(f)).sign);
    };
    for (const {part, points: projected} of meshes) {
      if (part.transparent) continue;
      const points = projected.map(paper), signs = facing(part);
      part.triangles.forEach((face, f) => {
        const [a, b, c] = face.map(i => points[i]);
        const area = (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
        if (Math.abs(area) <= 1e-7 || area * signs[f] > 0) return;
        const whole = area > 0 ? [a, b, c] : [a, c, b], split = pieces(...whole), source = {whole, count: split.length};
        for (const [p, q, r] of split) {
          if (!seen(p, q, r)) continue;
          faces.push({
            part,
            source,
            corners: [p, q, r],
            depth: (p[2] + q[2] + r[2]) / 3,
            box: [Math.min(p[0], q[0], r[0]), Math.min(p[1], q[1], r[1]), Math.max(p[0], q[0], r[0]), Math.max(p[1], q[1], r[1])]
          });
        }
      });
    }
    const overlaps = (p, q) => p[0] < q[2] && q[0] < p[2] && p[1] < q[3] && q[1] < p[3];
    const cellSize = 2, cells = box => {
      const keys = [];
      for (let x = Math.floor(box[0] / cellSize); x <= Math.floor(box[2] / cellSize); x++) {
        for (let y = Math.floor(box[1] / cellSize); y <= Math.floor(box[3] / cellSize); y++) keys.push(x + ',' + y);
      }
      return keys;
    };
    const covered = (run, face) => cells(face.box).some(key => run.cells.get(key)?.some(box => overlaps(box, face.box)));
    const runs = [];
    for (const face of faces.sort((p, q) => p.depth - q.depth)) {
      let run;
      for (let i = runs.length - 1; i >= 0 && !run; i--) {
        if (runs[i].part === face.part) run = runs[i];
        else if (covered(runs[i], face)) break;
      }
      if (!run) runs.push(run = {part: face.part, faces: [], cells: new Map(), box: [...face.box]});
      run.faces.push(face);
      for (const key of cells(face.box)) {
        if (!run.cells.has(key)) run.cells.set(key, []);
        run.cells.get(key).push(face.box);
      }
      run.box = [Math.min(run.box[0], face.box[0]), Math.min(run.box[1], face.box[1]), Math.max(run.box[2], face.box[2]), Math.max(run.box[3], face.box[3])];
    }
    const point = p => `${Number(p[0].toFixed(2))} ${Number(p[1].toFixed(2))}`;
    return runs.map((run, index) => {
      const edges = new Map();
      const counts = new Map();
      for (const {source} of run.faces) counts.set(source, (counts.get(source) || 0) + 1);
      const drawn = new Set();
      for (const {source, corners: piece} of run.faces) {
        if (drawn.has(source)) continue;
        const intact = counts.get(source) === source.count;
        if (intact) drawn.add(source);
        const corners = intact ? source.whole : piece;
        const keys = corners.map(point);
        for (let j = 0; j < 3; j++) {
          const from = keys[j], to = keys[(j + 1) % 3];
          if (from === to) continue;
          const back = to + '|' + from;
          if (edges.get(back)) edges.set(back, edges.get(back) - 1);
          else edges.set(from + '|' + to, (edges.get(from + '|' + to) || 0) + 1);
        }
      }
      const outgoing = new Map();
      for (const [key, count] of edges) {
        const [from, to] = key.split('|');
        if (!outgoing.has(from)) outgoing.set(from, []);
        for (let n = 0; n < count; n++) outgoing.get(from).push(to);
      }
      let d = '';
      for (const [start, targets] of outgoing) {
        while (targets.length) {
          const loop = [start];
          for (let at = outgoing.get(start).pop(); at !== start; at = outgoing.get(at).pop()) loop.push(at);
          const corners = loop.map(key => key.split(' ').map(Number)).filter((p, i, all) => {
            const a = all[(i + all.length - 1) % all.length], b = all[(i + 1) % all.length];
            const span = Math.hypot(b[0] - a[0], b[1] - a[1]);
            return span === 0 || Math.abs((p[0] - a[0]) * (b[1] - a[1]) - (p[1] - a[1]) * (b[0] - a[0])) / span > .004;
          });
          const area = corners.reduce((sum, p, i) => sum + p[0] * corners[(i + 1) % corners.length][1] - corners[(i + 1) % corners.length][0] * p[1], 0);
          if (corners.length > 2 && Math.abs(area) > 1e-4) d += 'M' + corners.map(p => p.join(' ')).join('L') + 'Z';
        }
      }
      const covers = new Set(runs.slice(0, index).filter(r => r.part !== run.part && overlaps(r.box, run.box)).map(r => r.part.id));
      return d && `<path data-fill="${escape(run.part.id)}" data-covers="${escape([...covers].join(' '))}" fill="none" d="${d}"/>`;
    }).join('');
  }

  function render(parts, {explosion = 1, isolated = null, sample = .045, camera, fitExplosion = explosion, trails = [], fill = false} = {}) {
    for (const [name, value] of [['Explosion', explosion], ['Fit explosion', fitExplosion]]) {
      if (!Number.isFinite(value) || value < 0 || value > 2) throw Error(name + ' must be 0–2');
    }
    if (!Number.isFinite(sample) || sample < .01 || sample > .2) throw Error('Invalid paper-space sampling');
    if (!Array.isArray(trails)) throw Error('Trails must be an array');
    const view = camera ? createCamera(camera) : defaultCamera;
    const shown = isolated === null ? parts : parts.filter(p => p.id === String(isolated));
    if (!shown.length) throw Error('Unknown part');
    shown.forEach(checkPart);

    const byId = new Map(parts.map(p => [p.id, p]));
    const trailEnd = (point, id, amount) => {
      G.point3(point, 'A trail end');
      if (id === undefined || id === null) return point;
      if (!byId.has(String(id))) throw Error(`Trail refers to unknown part ${id}`);
      return add(point, shift(byId.get(String(id)), amount));
    };
    const scene = amount => ({
      meshes: shown.map(part => {
        const offset = shift(part, amount), place = v => view.project(add(v, offset));
        return {part, points: part.vertices.map(place), lines: part.lines.map(l => ({role: l.role, a: place(l.a), b: place(l.b)}))};
      }),
      trails: isolated === null ? trails.map(t => {
        const a = trailEnd(t.a, t.from, amount), b = trailEnd(t.b, t.to, amount);
        return {role: G.lineRole(t.role ?? 'axis'), a: view.project(a), b: view.project(b), collapsed: Math.hypot(...sub(a, b)) <= 1e-9};
      }) : []
    });

    const current = scene(explosion);
    const {scale, bounds, offset} = fit(fitExplosion === explosion ? [current] : [current, scene(fitExplosion)]);
    const paper = p => [offset[0] + p[0] * scale, offset[1] + p[1] * scale, p[2]];
    const visible = occluder(current.meshes, paper, .01 / scale);
    const ink = inker({paper, scale, sample, visible});

    const groups = current.meshes.map(({part, points, lines}) => {
      const outlines = contours(part, view.direction).map(({a, b}) => ({a: points[a], b: points[b], role: 'outline'}));
      const id = `part-${escape(part.id)}-${escape(SHEET.slug(part.name))}`;
      return `<g id="${id}" data-item="${escape(part.id)}" data-name="${escape(part.name)}"><title>${escape(part.name)}</title>${ink([...lines, ...outlines])}</g>`;
    });
    const fillInk = fill ? filler(current.meshes, paper, visible) : '';
    if (fillInk) groups.unshift(`<g data-fills="">${fillInk}</g>`);
    const trailInk = ink(current.trails.filter(t => !t.collapsed));
    if (trailInk) groups.push(`<g data-trails="">${trailInk}</g>`);
    return {markup: groups.join(''), bounds, scale, offset};
  }

  const api = {SHEET, createCamera, project, render};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.TechnicalProjection = api;
})(globalThis);
