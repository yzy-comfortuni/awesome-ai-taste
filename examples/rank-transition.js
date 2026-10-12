/* Original teaching example for issue #6. No libraries or upstream code.
 * Positions interpolate between observed endpoint ranks; intermediate y is a
 * transition, not an assertion of the exact current rank. Labels use values.
 * Input series must have stable, unique IDs and the same membership at both ends.
 */
(function (root) {
  'use strict';
  const clamp = x => Math.max(0, Math.min(1, x));
  const smooth = x => { const t = clamp(x); return t * t * (3 - 2 * t); };
  const compareId = (a, b) => a < b ? -1 : a > b ? 1 : 0;
  function validate(items, frame, frames, spacing, transitionFrames) {
    if (!Array.isArray(items) || !items.length) throw new Error('nonempty series required');
    const ids = new Set();
    for (const d of items) {
      if (!d || typeof d.id !== 'string' || !d.id || ids.has(d.id) ||
          !Number.isFinite(d.from) || !Number.isFinite(d.to)) throw new Error('invalid series');
      ids.add(d.id);
    }
    if (!Number.isInteger(frame) || !Number.isInteger(frames) || frames < 1 ||
        !Number.isFinite(spacing) || spacing <= 0 ||
        !Number.isInteger(transitionFrames) || transitionFrames < 1 || transitionFrames > frames)
      throw new Error('invalid frame/geometry');
  }
  function ranks(items, field) {
    const sorted = items.slice().sort((a, b) => b[field] - a[field] || compareId(a.id, b.id));
    return new Map(sorted.map((d, i) => [d.id, i]));
  }
  function rankFrame(items, frame, frames = 20, spacing = 50, transitionFrames = 10) {
    validate(items, frame, frames, spacing, transitionFrames);
    const t = clamp(frame / frames);
    const start = ranks(items, 'from'), end = ranks(items, 'to');
    const progress = smooth((frame - (frames - transitionFrames) / 2) / transitionFrames);
    return items.map(d => ({id: d.id, value: d.from + (d.to - d.from) * t,
      y: (start.get(d.id) + (end.get(d.id) - start.get(d.id)) * progress) * spacing}));
  }
  // Intentionally failing reference: sorting values then assigning integer ranks.
  function discreteFrame(items, frame, frames = 20, spacing = 50) {
    validate(items, frame, frames, spacing, frames);
    const values = items.map(d => ({id: d.id, value: d.from + (d.to - d.from) * clamp(frame / frames)}));
    const order = ranks(values, 'value');
    return values.map(d => ({...d, y: order.get(d.id) * spacing}));
  }
  function maxStep(fn, items) {
    let last = fn(items, 0), max = 0;
    for (let f = 1; f <= 20; f++) {
      const next = fn(items, f);
      next.forEach((d, i) => { max = Math.max(max, Math.abs(d.y - last[i].y)); });
      last = next;
    }
    return max;
  }
  function verify() {
    const data = [{id: 'A', from: 100, to: 80}, {id: 'B', from: 80, to: 100}];
    const original = maxStep(discreteFrame, data), corrected = maxStep(rankFrame, data);
    if (original !== 50 || Math.abs(corrected - 7.4) > 1e-9) throw new Error('unexpected reproduction');
    const end = rankFrame(data, 20);
    if (end[0].value !== 80 || end[0].y !== 50 || end[1].value !== 100 || end[1].y !== 0)
      throw new Error('endpoint mismatch');
    const report = {fixture: 'new reproduction, not the reporter archive', fps: 20,
      frames: 20, spacing_px: 50, transition_frames: 10,
      before_max_step_px: original, after_max_step_px: corrected,
      endpoint_values_preserved: true,
      scope: 'pure position function; no Remotion execution or perceptual score'};
    console.log(JSON.stringify(report, null, 2));
  }
  const api = {rankFrame, discreteFrame, verify};
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
    if (require.main === module) verify();
  } else root.TasteRank = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
