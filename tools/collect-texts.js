(()=>{const T=new Set(),add=t=>{if(t)T.add(plain(t).trim())};
const pools=[v13a,v13b,v14a,v14b,v15,vJob,vCity,vStation];
pools.flat().forEach(w=>{add(jw(w));add(w.r)});
Object.values(VBM).forEach(v=>{add(jw(v));const c=teWord(v);add(v.k?`{${c.k}|${c.r}}`:c.r);for(let i=0;i<40;i++)teWrong(v).forEach(add)});
Object.keys(Q).forEach(id=>customQs(id).forEach(q=>{
  if(q.t==='mc'){add(q.say||q.jp);if(q.jpc)q.c.forEach(add)}
  if(q.t==='fill'){add(q.s.replace('＿＿',q.a))}
  if(q.t==='build'){q.a.forEach(add);(q.d||[]).forEach(add);add(q.a.join(''))}}));
add(VSAMPLE);
return [...T].filter(Boolean)})()
