/* Logic-only DOM stub. It cannot validate a real browser, focus or screen reader. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname,'../examples/review-demo.html'),'utf8');
const elements = new Map(); let focusTarget=null, prevented=0, cases=0;
function element(id='') {
  return {id, value:'',textContent:'',style:{},attrs:{},events:{},children:[],
    addEventListener(type,fn){this.events[type]=fn;},
    appendChild(child){this.children.push(child);elements.set(child.id,child);},
    setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];},
    focus(){focusTarget=this.id;}};
}
for(const m of html.matchAll(/\bid="([^"]+)"/g)) elements.set(m[1],element(m[1]));
elements.get('frame').value='0';
const document={getElementById(id){assert.ok(elements.has(id),'missing element '+id);return elements.get(id);},
  createElement(){return element();}};
const code=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');
vm.runInNewContext(code,{document,TasteRank:require('../examples/rank-transition.js')},{timeout:1000});
function submit(tool,days){focusTarget=null;elements.get('tool').value=tool;elements.get('days').value=days;
  elements.get('borrow').events.submit({preventDefault(){prevented++;}});cases++;}
submit('','');assert.equal(focusTarget,'tool');assert.equal(elements.get('tool').attrs['aria-invalid'],'true');
submit('电钻','8');assert.equal(focusTarget,'days');assert.equal(elements.get('tool').attrs['aria-invalid'],undefined);
for(const raw of ['0','8','2.5','three','','-1','3e0']){submit('电钻',raw);assert.equal(focusTarget,'days');assert.match(elements.get('days-error').textContent,/1–7/);}
for(const raw of ['1',' 3 ','7']){submit(' 电钻 ',raw);assert.equal(focusTarget,null);assert.equal(elements.get('days').attrs['aria-invalid'],undefined);assert.match(elements.get('result').textContent,/没有提交预约/);}
elements.get('frame').value='20';elements.get('frame').events.input();cases++;
assert.equal(elements.get('after-A').textContent,'A：80.0');assert.equal(elements.get('after-B').textContent,'B：100.0');
assert.equal(elements.get('after-A').style.transform,'translateY(50px)');
elements.get('frame').value='11';elements.get('frame').events.input();cases++;
assert.notEqual(elements.get('before-A').style.transform,elements.get('after-A').style.transform);
assert.match(elements.get('values').textContent,/不是观测/);
assert.equal(prevented,12);
console.log(JSON.stringify({cases,status:'passed',scope:'DOM-stub branches and focus calls only; not real browser behavior'}));
