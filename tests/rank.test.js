'use strict';
const assert = require('node:assert/strict');
const {rankFrame, discreteFrame} = require('../examples/rank-transition.js');
const pair = [{id:'A',from:100,to:80},{id:'B',from:80,to:100}];
const byId = a => Object.fromEntries(a.map(d => [d.id, d]));
let count = 0;
function check(name, fn) { fn(); count++; }
check('original 50px jump', () => assert.equal(discreteFrame(pair,11)[0].y - discreteFrame(pair,10)[0].y,50));
check('bounded correction', () => {
  let maximum=0;
  for(let f=1;f<=20;f++) maximum=Math.max(maximum,Math.abs(rankFrame(pair,f)[0].y-rankFrame(pair,f-1)[0].y));
  assert.ok(Math.abs(maximum-7.4)<1e-9);
});
check('preserves all values, not just endpoints', () => {
  for(let f=0;f<=20;f++) rankFrame(pair,f).forEach((d,i)=>assert.equal(d.value,discreteFrame(pair,f)[i].value));
});
check('clamps start and end', () => {
  assert.deepEqual(rankFrame(pair,-8),rankFrame(pair,0));
  assert.deepEqual(rankFrame(pair,99),rankFrame(pair,20));
});
check('out-of-order frame requests are deterministic', () => {
  const expected=Array.from({length:21},(_,i)=>rankFrame(pair,i));
  for(const f of [20,0,12,4,19,4,1,20,9]) assert.deepEqual(rankFrame(pair,f),expected[f]);
});
check('does not mutate input', () => {
  const data=Object.freeze(pair.map(x=>Object.freeze({...x})));
  const before=JSON.stringify(data); rankFrame(data,7); discreteFrame(data,11);
  assert.equal(JSON.stringify(data),before);
});
check('stable IDs determine endpoint ties independent of input order', () => {
  const data=[{id:'B',from:10,to:10},{id:'A',from:10,to:10}];
  const output=byId(rankFrame(data,11));
  assert.equal(output.A.y,0); assert.equal(output.B.y,50);
  assert.deepEqual(output,byId(rankFrame(data.slice().reverse(),11)));
});
check('three series endpoints preserve rank and finite positions', () => {
  const data=[{id:'C',from:0,to:30},{id:'A',from:30,to:10},{id:'B',from:20,to:20}];
  assert.equal(byId(rankFrame(data,0)).A.y,0);
  assert.equal(byId(rankFrame(data,20)).C.y,0);
  assert.equal(byId(rankFrame(data,20)).A.y,100);
  for(let f=0;f<=20;f++) for(const d of rankFrame(data,f)) assert.ok(Number.isFinite(d.y));
});
check('empty and duplicate IDs rejected', () => {
  assert.throws(()=>rankFrame([],0));
  assert.throws(()=>rankFrame([{id:'A',from:1,to:2},{id:'A',from:2,to:3}],0));
});
check('invalid values and geometry rejected', () => {
  assert.throws(()=>rankFrame([{id:'A',from:NaN,to:2}],0));
  assert.throws(()=>rankFrame(pair,1.5));
  assert.throws(()=>rankFrame(pair,0,20,0));
  assert.throws(()=>rankFrame(pair,0,20,50,21));
  assert.throws(()=>rankFrame(pair,0,0));
});
console.log(JSON.stringify({tests:count,status:'passed',scope:'original pure JS fixture, not browser or Remotion'}));
