// Hamrah Nazer - core client logic (lightweight)
// Simple storage (localStorage) and offline queue; replace sendToServer with real endpoint
const DB_KEY = 'hamrah_nazer_db_v1';
const db = {
  async get(){ try{ const raw = localStorage.getItem(DB_KEY); return raw?JSON.parse(raw):{sheets:[],roadJobs:[],reports:[],queue:[],optReportTag:true}; }catch(e){return {sheets:[],roadJobs:[],reports:[],queue:[],optReportTag:true}} },
  async set(data){ localStorage.setItem(DB_KEY, JSON.stringify(data)); }
};

async function enqueueSync(item){ const data=await db.get(); data.queue.push(item); await db.set(data); trySync(); }
async function trySync(){ if(!navigator.onLine) return; const data=await db.get(); while(data.queue.length){ const job=data.queue.shift(); try{ await sendToServer(job); markSynced(job); }catch(e){ data.queue.unshift(job); break; } await db.set(data); } }
async function sendToServer(job){ if(!navigator.onLine) throw 'offline'; // TODO: implement real upload (Firebase/REST)
  // demo: attempt to POST to /api/sync (ignored if not present)
  await fetch('/api/sync',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(job)}).catch(()=>{});
  return true;
}
function markSynced(job){ // mark local items as synced
  db.get().then(data=>{ ['sheets','roadJobs'].forEach(k=>{ const idx=data[k].findIndex(x=>x.id===job.payload.id); if(idx>=0) data[k][idx].synced=true; }); db.set(data); });
}

// Lightweight helper: on pages we call functions defined here
window.__HN = { db, enqueueSync, trySync };

// Simple online/offline indicator
window.addEventListener('online', trySync);
