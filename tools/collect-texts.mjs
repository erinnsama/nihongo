import {spawn} from 'node:child_process';import fs from 'node:fs';
const [,,url,expr,out]=process.argv;
const p=spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new','--remote-debugging-port=9334','--user-data-dir='+out+'.prof','about:blank']);
await new Promise(r=>setTimeout(r,2500));
const tabs=await (await fetch('http://127.0.0.1:9334/json')).json();
const ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const pend={};ws.onmessage=m=>{const d=JSON.parse(m.data);if(pend[d.id]){pend[d.id](d);delete pend[d.id]}};
const send=(method,params={})=>new Promise(r=>{pend[++id]=r;ws.send(JSON.stringify({id,method,params}))});
await send('Page.navigate',{url});await new Promise(r=>setTimeout(r,2500));
const r=await send('Runtime.evaluate',{expression:fs.readFileSync(expr,'utf8'),returnByValue:true});
if(r.result.exceptionDetails)console.log(JSON.stringify(r.result.exceptionDetails).slice(0,500));
else{fs.writeFileSync(out,JSON.stringify(r.result.result.value,null,0));console.log('n',r.result.result.value.length)}
p.kill();process.exit(0);
