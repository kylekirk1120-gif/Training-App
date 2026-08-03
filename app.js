// Train Together PWA — All app logic. data.js must load before this file

// ============ STATE MANAGEMENT ============
function loadState(){try{const s=localStorage.getItem('trainTogether');return s?JSON.parse(s):{you:{sessions:0,streak:0,weights:[],liftBests:{}},dad:{sessions:0,streak:0,weights:[],liftBests:{}}};}catch(e){return {you:{sessions:0,streak:0,weights:[],liftBests:{}},dad:{sessions:0,streak:0,weights:[],liftBests:{}}};}}
function saveState(){try{localStorage.setItem('trainTogether',JSON.stringify(state));}catch(e){}}
let state = loadState();
let homeUser='you', progUser='you';
let currentPhase='1', currentWeek='1';
const DAYS_DATA = PHASES_W1[currentPhase];
let currentDay='A', sessionActive=false, sessionStart=null, sessionInterval=null, currentExIdx=0, allEx=[];
let timerSecs=90, timerMax=90, timerRunning=false, timerInterval=null, timerEndTime=null;

// ============ NAVIGATION ============
function goScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
  document.getElementById('screen-'+id).classList.add('active');
  const navEl=document.getElementById('nav-'+id);
  if(navEl)navEl.classList.add('active');
  if(id==='home')refreshHome();
  if(id==='progress')refreshProgress();
  if(id==='workout')renderWorkout();
}
function setHomeUser(u,btn){homeUser=u;document.getElementById('h-you-btn').className='toggle-btn'+(u==='you'?' you-on':'');document.getElementById('h-dad-btn').className='toggle-btn'+(u==='dad'?' dad-on':'');refreshHome();}
function setProgUser(u,btn){
  progUser=u;
  const ep=document.getElementById('prog-edit-panel');
  const eb=document.getElementById('prog-edit-btn');
  if(ep)ep.style.display='none';
  if(eb)eb.style.display='';
  document.getElementById('prog-you-btn').className='toggle-btn'+(u==='you'?' you-on':'');
  document.getElementById('prog-dad-btn').className='toggle-btn'+(u==='dad'?' dad-on':'');
  refreshProgress();
}
// ============ PHASE PROGRESSION (session-count based, unequal phase lengths) ============
function getPhaseForSessionNum(n){
  for(const p of ['1','2','3','4']){ if(n<=PHASE_INFO[p].sessionEnd) return p; }
  return '4';
}
function phaseLengthLabel(p){
  const info=PHASE_INFO[p];
  return info.name+' · '+info.weeks+' weeks ('+info.sessions+' sessions)';
}
// sessionsCompletedTotal = total sessions the user has finished so far (before the "next" one about to happen)
function getNextSession(phase,week,day,sessionsCompletedTotal){
  const nextSessionNum=(sessionsCompletedTotal||0)+1;
  const nextPhase=getPhaseForSessionNum(nextSessionNum);
  if(day==='A') return {phase:nextPhase,week,day:'B'};
  if(nextPhase!==phase) return {phase:nextPhase,week:'1',day:'A'};
  const w=parseInt(week);
  return {phase,week:String(w<3?w+1:1),day:'A'};
}
function computeNextSession(u){
  const s=state[u];
  return s.lastPhase?getNextSession(s.lastPhase,s.lastWeek,s.lastDay,s.sessions):{phase:'1',week:'1',day:'A'};
}
// Sessions completed within the user's current phase, e.g. {done:13,total:16}
function phaseProgressFor(u){
  const s=state[u];
  const phase=s.lastPhase||'1';
  const info=PHASE_INFO[phase];
  const done=Math.max(0,Math.min(info.sessions,s.sessions-(info.sessionStart-1)));
  return {phase,info,done};
}
function goToNextWorkout(){
  const next=computeNextSession(homeUser);
  currentPhase=next.phase; currentWeek=next.week; currentDay=next.day;
  for(let i=1;i<=4;i++){const b=document.getElementById('phase-'+i+'-btn');if(b)b.className='toggle-btn'+(String(i)===currentPhase?' active':'');}
  for(let i=1;i<=3;i++){const b=document.getElementById('week-'+i+'-btn');if(b)b.className='toggle-btn'+(String(i)===currentWeek?' active':'');}
  const da=document.getElementById('day-a-btn'),db=document.getElementById('day-b-btn');
  if(da)da.className='toggle-btn'+(currentDay==='A'?' active':'');
  if(db)db.className='toggle-btn'+(currentDay==='B'?' active':'');
  document.getElementById('workout-sub').textContent=phaseLengthLabel(currentPhase);
  goScreen('workout');
}
function refreshHome(){
  const u=homeUser, s=state[u];
  document.getElementById('h-streak').textContent=s.streak;
  document.getElementById('h-sessions').textContent=s.sessions;
  const next=computeNextSession(u);
  document.getElementById('home-next-session').textContent='Ph '+next.phase+' W'+next.week+' · Day '+next.day+(next.day==='A'?' — Upper':' — Lower');
  const prog=phaseProgressFor(u);
  document.getElementById('h-phase').textContent=prog.phase;
  document.getElementById('h-phase-sub').textContent=prog.info.name.split('· ')[1]||prog.info.name;
  document.getElementById('h-phase-progress').textContent=prog.done;
  document.getElementById('h-phase-total').textContent='of '+prog.info.sessions;
  document.getElementById('home-phase-status').textContent=phaseLengthLabel(prog.phase)+' · Session '+prog.done+' of '+prog.info.sessions;
}

// Set logging persistence helpers

// ============ WORKOUT FUNCTIONS ============
// Returns full ordered sections for a given phase/week/day
function getSections(phase, week, day){
  const allW1 = PHASES_W1[phase][day].sections;
  const isShared = s=>{const l=s.label.toLowerCase();return l.includes('warm')||l.includes('mobil')||l.includes('conditioning')||l.includes('cool');};
  const warmup = allW1.filter(s=>s.label.toLowerCase().includes('warm'));
  const conditioning = allW1.filter(s=>s.label.toLowerCase().includes('conditioning'));
  const cooldown = allW1.filter(s=>s.label.toLowerCase().includes('cool'));
  const mobEntry = ((MOBILITY[phase]||{})[day]||{})[week];
  const mobility = mobEntry ? [mobEntry] : allW1.filter(s=>s.label.toLowerCase().includes('mobil'));
  if(week==='1'){
    const mainSecs = allW1.filter(s=>!isShared(s));
    return [...warmup, ...mainSecs, ...mobility, ...conditioning, ...cooldown];
  }
  const weekData = ((PHASES_MAIN[phase]||{})[week]||{})[day];
  const mainSecs = weekData || allW1.filter(s=>!isShared(s));
  return [...warmup, ...mainSecs, ...mobility, ...conditioning, ...cooldown];
}
function getExType(ex,secLabel){
  const n=ex.name.toLowerCase(),rx=(ex.rx||'').toLowerCase(),sl=(secLabel||'').toLowerCase();
  if(ex.sets===0||sl.includes('warm')||sl.includes('cool')||sl.includes('mobil')) return 'simple';
  if(sl.includes('conditioning')) return 'cardio';
  const timedNames=['plank','hollow body hold','wall sit','stir the pot','trx fallout','copenhagen plank','dead bug','bird dog','mcgill curl','rdl plank'];
  if(timedNames.some(t=>n.includes(t))&&(rx.includes('s ')||rx.includes('s·')||rx.includes('0s')||rx.includes('sec')||rx.match(/\d+s$/))) return 'timed';
  const carries=['suitcase carry','farmers carry','bear crawl'];
  if(carries.some(t=>n.includes(t))) return 'carry';
  const cardio=['rower intervals','assault bike','treadmill walk','box jump','broad jump','plyometric push up','band resisted punch','jump deadlift'];
  if(cardio.some(t=>n.includes(t))) return 'cardio';
  return 'weighted';
}
function parseDuration(rx){
  let m;
  if(m=rx.match(/(\d+)\s*min/)) return parseInt(m[1])*60;
  if(m=rx.match(/(\d+)\s*s(?:ec)?/)) return parseInt(m[1]);
  return 30;
}
function fmtRest(s){
  if(s<60) return s+'s';
  const m=Math.floor(s/60),sec=s%60;
  if(sec===0) return m+' min';
  return m+'m '+sec+'s';
}
function flatEx(day){
  const arr=[];
  getSections(currentPhase,currentWeek,day).forEach(sec=>sec.exercises.forEach(ex=>arr.push({...ex,secLabel:sec.label})));
  return arr;
}
function selectPhase(p,btn){
  currentPhase=p; currentWeek='1';
  for(let i=1;i<=4;i++) document.getElementById('phase-'+i+'-btn').className='toggle-btn'+(String(i)===p?' active':'');
  for(let i=1;i<=3;i++) document.getElementById('week-'+i+'-btn').className='toggle-btn'+(i===1?' active':'');
  document.getElementById('workout-sub').textContent=phaseLengthLabel(p);
  if(sessionActive){clearInterval(sessionInterval);sessionActive=false;document.getElementById('session-bar').style.display='none';document.getElementById('start-sess-btn').innerHTML='<i class="ti ti-player-play" aria-hidden="true"></i> Start session';document.getElementById('start-sess-btn').className='btn btn-green';}
  renderWorkout();
}
function selectWeek(w,btn){
  currentWeek=w;
  for(let i=1;i<=3;i++) document.getElementById('week-'+i+'-btn').className='toggle-btn'+(String(i)===w?' active':'');
  if(sessionActive){clearInterval(sessionInterval);sessionActive=false;document.getElementById('session-bar').style.display='none';document.getElementById('start-sess-btn').innerHTML='<i class="ti ti-player-play" aria-hidden="true"></i> Start session';document.getElementById('start-sess-btn').className='btn btn-green';}
  renderWorkout();
}

const timedSetIntervals={};
function startTimedSet(idx,setNum,dur){
  const key=idx+'_'+setNum;
  if(timedSetIntervals[key]) return;
  let remaining=dur;
  const el=document.getElementById('tcount-'+idx+'-'+setNum);
  const btn=document.getElementById('tbtn-'+idx+'-'+setNum);
  if(btn){btn.disabled=true;btn.textContent='Running…';}
  function tick(){
    if(!el){clearInterval(timedSetIntervals[key]);delete timedSetIntervals[key];return;}
    const m=Math.floor(remaining/60),s=remaining%60;
    el.textContent=m>0?m+':'+String(s).padStart(2,'0'):remaining+'s';
    if(remaining<=0){
      clearInterval(timedSetIntervals[key]);delete timedSetIntervals[key];
      el.textContent='Done!';el.style.color='var(--green)';
      if(btn){btn.disabled=false;btn.textContent='Done ✓';}
      try{if(navigator.vibrate)navigator.vibrate([200,100,200]);}catch(e){}
      try{beepTimer();}catch(e){}
    }
    remaining--;
  }
  tick();
  timedSetIntervals[key]=setInterval(tick,1000);
}
function renderWorkout(){
  allEx=flatEx(currentDay);
  let html='';
  getSections(currentPhase,currentWeek,currentDay).forEach(sec=>{
    const isSuperset=sec.label.toLowerCase().includes('superset');
    const secIndices=sec.exercises.map(ex=>allEx.findIndex(e=>e.name===ex.name&&e.secLabel===sec.label)).filter(i=>i>=0);
    const secFirst=secIndices.length?Math.min(...secIndices):-1;
    const secLast=secIndices.length?Math.max(...secIndices):-1;
    const secDone=isSuperset&&sessionActive&&secLast>=0&&currentExIdx>secLast;
    const secActive=isSuperset&&sessionActive&&secFirst>=0&&currentExIdx>=secFirst&&currentExIdx<=secLast;
    html+=`<div class="section-label" style="display:flex;justify-content:space-between;align-items:center">${sec.label}<span class="pill pill-blue">${sec.mins} min</span></div>`;
    sec.exercises.forEach(ex=>{
      const gIdx=allEx.findIndex(e=>e.name===ex.name&&e.secLabel===sec.label);
      const isDone=isSuperset?secDone:(sessionActive&&gIdx<currentExIdx);
      const isActive=isSuperset?secActive:(sessionActive&&gIdx===currentExIdx);
      const exType=getExType(ex,sec.label);
      html+=`<div class="ex-block${isActive?' active-ex':isDone?' done-ex':''}" id="exb-${gIdx}">
        <div class="ex-header" onclick="toggleExBody(${gIdx})">
          <div class="ex-dot">${isDone?'<i class="ti ti-check" style="font-size:11px" aria-hidden="true"></i>':isActive?'<i class="ti ti-player-play" style="font-size:10px" aria-hidden="true"></i>':gIdx+1}</div>
          <div style="flex:1"><div class="ex-name">${ex.name}</div><div class="ex-rx">${ex.rx}</div></div>
          <i class="ti ti-chevron-down" aria-hidden="true" id="chev-${gIdx}" style="font-size:15px;color:var(--text-2)"></i>
        </div>
        <div class="ex-body" id="exbody-${gIdx}">
          <div class="ex-cue" style="margin-top:6px">${ex.cues[0]}</div>
          <div class="ex-cue">${ex.cues[1]}</div>
          <a class="video-link" href="https://www.youtube.com/results?search_query=${ex.vid}" target="_blank"><i class="ti ti-player-play" aria-hidden="true" style="font-size:12px"></i> Watch tutorial</a>
          ${renderExBody(gIdx,ex,sec.label,exType)}
          ${!isSuperset&&isActive&&ex.rest>0&&exType==='weighted'?`<button class="btn btn-amber" style="margin-top:8px" onclick="launchRest(${ex.rest})"><i class="ti ti-clock" aria-hidden="true"></i> Rest ${fmtRest(ex.rest)}</button>`:''}
          ${!isSuperset&&isActive?`<button class="btn btn-green" style="margin-top:6px" onclick="advanceEx()"><i class="ti ti-arrow-right" aria-hidden="true"></i> Done — next exercise</button>`:''}
        </div>
      </div>`;
    });
    if(isSuperset&&secActive){
      const restSecs=sec.exercises[sec.exercises.length-1].rest||90;
      html+=`<button class="btn superset-done-btn" onclick="supersetDone(${secFirst},${sec.exercises.length},${restSecs})"><i class="ti ti-check" aria-hidden="true"></i> Superset done — rest ${fmtRest(restSecs)}</button>`;
    }
  });
  document.getElementById('workout-content').innerHTML=html;
  if(sessionActive&&currentExIdx<allEx.length){
    const b=document.getElementById('exbody-'+currentExIdx);
    if(b){b.classList.add('open');const c=document.getElementById('chev-'+currentExIdx);if(c)c.style.transform='rotate(180deg)';}
    setTimeout(()=>{const el=document.getElementById('exb-'+currentExIdx);if(el)el.scrollIntoView({behavior:'smooth',block:'nearest'});},100);
  }
}
function renderExBody(idx,ex,secLabel,exType){
  const exName=ex.name;
  if(exType==='simple'){
    return `<div class="ex-checkoff"><button class="ex-checkoff-btn" onclick="this.classList.toggle('on')"><i class="ti ti-check" aria-hidden="true"></i> Mark done</button></div>`;
  }
  if(exType==='cardio'){
    let rounds=1;const m=ex.rx.match(/(\d+)\s*rounds?/i);if(m)rounds=parseInt(m[1]);
    let h='<div class="ex-checkoff" style="flex-wrap:wrap;gap:6px;margin-top:8px">';
    if(rounds>1){for(let i=1;i<=rounds;i++)h+=`<button class="ex-checkoff-btn" onclick="this.classList.toggle('on')">R${i}</button>`;}
    else h+=`<button class="ex-checkoff-btn" onclick="this.classList.toggle('on')"><i class="ti ti-check" aria-hidden="true"></i> Done</button>`;
    return h+'</div>';
  }
  if(exType==='carry'){
    let h='<div style="margin-top:8px">';
    for(let i=1;i<=Math.max(1,ex.sets);i++) h+=`<div class="timed-set-row"><span style="font-size:12px;color:var(--text-2);min-width:36px">Set ${i}</span><span style="flex:1;font-size:12px;color:var(--text-2)">${ex.rx.match(/\d+m/)?ex.rx.match(/\d+m/)[0]:''}</span><button class="ex-checkoff-btn" onclick="this.classList.toggle('on')"><i class="ti ti-check" aria-hidden="true"></i></button></div>`;
    return h+'</div>';
  }
  if(exType==='timed'){
    const dur=parseDuration(ex.rx);
    let h='<div style="margin-top:8px">';
    for(let i=1;i<=Math.max(1,ex.sets);i++){
      h+=`<div class="timed-set-row">
        <span style="font-size:12px;color:var(--text-2);min-width:36px">Set ${i}</span>
        <span class="timed-countdown" id="tcount-${idx}-${i}">${dur>=60?Math.floor(dur/60)+':'+String(dur%60).padStart(2,'0'):dur+'s'}</span>
        <button class="btn btn-blue" id="tbtn-${idx}-${i}" style="width:auto;padding:6px 12px;margin:0;font-size:12px" onclick="startTimedSet(${idx},${i},${dur})"><i class="ti ti-player-play" aria-hidden="true"></i> Start</button>
        <button class="ex-checkoff-btn" onclick="this.classList.toggle('on')"><i class="ti ti-check" aria-hidden="true"></i></button>
      </div>`;
    }
    return h+'</div>';
  }
  // weighted — with persistence
  const es=exName.replace(/'/g,"\\'");
  const lastSess=getLastSession(exName);
  let lastSessHtml='';
  if(lastSess){
    const setsStr=lastSess.sets.map(s=>[s.w?s.w+'lb':'',s.r?'×'+s.r:'',s.rpe?'RPE '+s.rpe:''].filter(Boolean).join(' ')).join(' / ');
    const lastSet=lastSess.sets[lastSess.sets.length-1];
    const lastRpe=lastSet?parseFloat(lastSet.rpe):NaN;
    let tip='';
    if(!isNaN(lastRpe)){
      if(lastRpe<=6)tip='Consider adding 5lb today';
      else if(lastRpe<=8)tip='Stay at same weight or add 2.5–5lb if feeling strong';
      else tip='Stay at same weight — focus on form and consistency';
    }
    lastSessHtml=`<div style="margin-top:8px;padding:8px 10px;background:var(--gray-bg);border-radius:var(--radius-sm);font-size:12px">
      <span style="font-weight:600;color:var(--text-2)">Last session (${lastSess.date}):</span> <span style="color:var(--text-2)">${setsStr}</span>
      ${tip?`<div style="margin-top:3px;color:var(--blue-dark);font-size:11px">→ ${tip}</div>`:''}
    </div>`;
  } else {
    lastSessHtml='<div style="margin-top:8px;padding:7px 10px;background:var(--gray-bg);border-radius:var(--radius-sm);font-size:11px;color:var(--text-3)">No previous data — log this session to start tracking</div>';
  }
  let h=`<div style="margin-top:10px">${lastSessHtml}<div class="section-label" style="margin-top:10px">Log sets</div><div class="set-grid"><span class="set-lbl">Set</span><span class="set-lbl">Weight</span><span class="set-lbl">Reps</span><span class="set-lbl">RPE <span class="rpe-info" onclick="openRpePopup(event)">i</span></span><span></span></div>`;
  for(let i=1;i<=ex.sets;i++){
    const w=loadSetVal(currentPhase,currentWeek,currentDay,exName,i,'w');
    const r=loadSetVal(currentPhase,currentWeek,currentDay,exName,i,'r');
    const rpe=loadSetVal(currentPhase,currentWeek,currentDay,exName,i,'rpe');
    h+=`<div class="set-grid"><span class="set-lbl">${i}</span>
      <input class="set-inp" type="number" placeholder="—" value="${w}" oninput="saveSetVal('${currentPhase}','${currentWeek}','${currentDay}','${es}',${i},'w',this.value)">
      <input class="set-inp" type="number" placeholder="—" value="${r}" oninput="saveSetVal('${currentPhase}','${currentWeek}','${currentDay}','${es}',${i},'r',this.value)">
      <input class="set-inp" type="number" placeholder="—" value="${rpe}" oninput="saveSetVal('${currentPhase}','${currentWeek}','${currentDay}','${es}',${i},'rpe',this.value)">
      <button class="tick" onclick="this.classList.toggle('on')" aria-label="Done"><i class="ti ti-check" aria-hidden="true" style="font-size:12px"></i></button>
    </div>`;
  }
  return h+'</div>';
}
function toggleExBody(idx){const b=document.getElementById('exbody-'+idx);const c=document.getElementById('chev-'+idx);if(!b)return;const open=b.classList.toggle('open');if(c)c.style.transform=open?'rotate(180deg)':'';}
function selectDay(day,btn){
  currentDay=day;
  document.getElementById('day-a-btn').className='toggle-btn'+(day==='A'?' active':'');
  document.getElementById('day-b-btn').className='toggle-btn'+(day==='B'?' active':'');
  if(sessionActive){clearInterval(sessionInterval);sessionActive=false;document.getElementById('session-bar').style.display='none';document.getElementById('start-sess-btn').innerHTML='<i class="ti ti-player-play" aria-hidden="true"></i> Start session';document.getElementById('start-sess-btn').className='btn btn-green';}
  renderWorkout();
}
function toggleSession(){
  if(!sessionActive){
    sessionActive=true;currentExIdx=0;allEx=flatEx(currentDay);
    sessionStart=Date.now();clearInterval(sessionInterval);
    sessionInterval=setInterval(tickSession,1000);
    document.getElementById('session-bar').style.display='flex';
    document.getElementById('start-sess-btn').innerHTML='<i class="ti ti-square" aria-hidden="true"></i> End session';
    document.getElementById('start-sess-btn').className='btn btn-amber';
    renderWorkout();
  }else{
    endSession();
  }
}
function tickSession(){
  const el=Math.floor((Date.now()-sessionStart)/1000);
  const m=Math.floor(el/60),s=el%60;
  document.getElementById('sess-clock').textContent=m+':'+String(s).padStart(2,'0');
  const rem=Math.max(0,120*60-el);
  document.getElementById('sess-rem').textContent=Math.floor(rem/60)+'m';
  document.getElementById('sess-ex-num').textContent=(currentExIdx+1)+'/'+allEx.length;
}
function advanceEx(){if(currentExIdx<allEx.length-1){currentExIdx++;renderWorkout();}else{endSession();}}
function supersetDone(firstIdx,count,restSecs){
  currentExIdx=firstIdx+count;
  if(restSecs>0)startFloatTimer(restSecs);
  if(currentExIdx>=allEx.length){endSession();}else{renderWorkout();}
}
function endSession(){
  console.log('[endSession] phase='+currentPhase+' week='+currentWeek+' day='+currentDay+' user='+homeUser);
  const elapsed=Date.now()-sessionStart;
  try{saveSessionHistory();}catch(e){console.error('[endSession] saveSessionHistory failed:',e);}
  sessionActive=false;clearInterval(sessionInterval);
  const u=homeUser;
  state[u].sessions++;
  state[u].streak++;
  state[u].lastPhase=currentPhase;
  state[u].lastWeek=currentWeek;
  state[u].lastDay=currentDay;
  state[u].lastDate=new Date().toLocaleDateString();
  console.log('[endSession] state updated:',JSON.stringify({sessions:state[u].sessions,streak:state[u].streak,lastPhase:state[u].lastPhase,lastWeek:state[u].lastWeek,lastDay:state[u].lastDay,lastDate:state[u].lastDate}));
  saveState();
  console.log('[endSession] localStorage saved, rendering and showing modal');
  document.getElementById('session-bar').style.display='none';
  document.getElementById('start-sess-btn').innerHTML='<i class="ti ti-player-play" aria-hidden="true"></i> Start session';
  document.getElementById('start-sess-btn').className='btn btn-green';
  renderWorkout();refreshHome();
  showCompletionModal(elapsed);
}
function showCompletionModal(elapsedMs){
  const secs=Math.floor((elapsedMs||0)/1000);
  const m=Math.floor(secs/60),s=secs%60;
  const timeStr=m+'m'+(s?' '+s+'s':'');
  const u=homeUser;
  const next=getNextSession(currentPhase,currentWeek,currentDay,state[u].sessions);
  document.getElementById('modal-title').textContent='Day '+currentDay+' complete!';
  document.getElementById('modal-motive').textContent=currentDay==='A'?'Upper body done — rest up and come back strong!':'Lower body crushed — another session in the books!';
  document.getElementById('modal-summary').innerHTML=
    '<div style="background:var(--card-bg);border-radius:var(--radius-sm);padding:12px;text-align:center"><div style="font-size:11px;color:var(--text-2)">Phase</div><div style="font-size:16px;font-weight:700">'+currentPhase+' · '+PHASE_INFO[currentPhase].name.split('· ')[1]+'</div><div style="font-size:11px;color:var(--text-2);margin-top:1px">'+PHASE_INFO[currentPhase].weeks+' wks ('+PHASE_INFO[currentPhase].sessions+' sess)</div></div>'+
    '<div style="background:var(--card-bg);border-radius:var(--radius-sm);padding:12px;text-align:center"><div style="font-size:11px;color:var(--text-2)">Duration</div><div style="font-size:16px;font-weight:700">'+timeStr+'</div></div>'+
    '<div style="background:var(--card-bg);border-radius:var(--radius-sm);padding:12px;text-align:center"><div style="font-size:11px;color:var(--text-2)">Week</div><div style="font-size:16px;font-weight:700">Week '+currentWeek+'</div></div>'+
    '<div style="background:var(--card-bg);border-radius:var(--radius-sm);padding:12px;text-align:center"><div style="font-size:11px;color:var(--text-2)">Sessions</div><div style="font-size:16px;font-weight:700">'+state[u].sessions+'/48</div></div>';
  document.getElementById('modal-next').textContent='Phase '+next.phase+' · Week '+next.week+' · Day '+next.day+' — '+(next.day==='A'?'Upper':'Lower');
  document.getElementById('completion-modal').classList.add('show');
}
function dismissCompletionModal(){
  document.getElementById('completion-modal').classList.remove('show');
  refreshHome();
}
function launchRest(secs){startFloatTimer(secs);}

// ============ PROGRESS FUNCTIONS ============
function refreshProgress(){
  const u=progUser,s=state[u];
  document.getElementById('prog-sessions').textContent=s.sessions;
  document.getElementById('prog-streak').textContent=s.streak;
  const wts=s.weights||[];
  document.getElementById('prog-start-wt').textContent=wts.length?Math.round(wts[0].v):'—';
  document.getElementById('prog-curr-wt').textContent=wts.length?Math.round(wts[wts.length-1].v):'—';
  const prog=phaseProgressFor(u);
  document.getElementById('prog-phase-line').textContent=phaseLengthLabel(prog.phase);
  document.getElementById('prog-phase-progress-line').textContent='Session '+prog.done+' of '+prog.info.sessions;
  buildStreakDots(u,'streak-dots');
  renderBWEntries();
  renderLiftBests();
  renderLiftHistory();
}
function openProgEdit(){
  const u=progUser,s=state[u];
  document.getElementById('edit-sessions').value=s.sessions||0;
  document.getElementById('edit-streak').value=s.streak||0;
  document.getElementById('edit-phase').value=s.lastPhase||'1';
  document.getElementById('edit-week').value=s.lastWeek||'1';
  document.getElementById('edit-day').value=s.lastDay||'A';
  document.getElementById('prog-edit-user-label').textContent=u==='you'?'You':'Dad';
  document.getElementById('prog-edit-panel').style.display='block';
  document.getElementById('prog-edit-btn').style.display='none';
}
function saveProgEdit(){
  const u=progUser,s=state[u];
  s.sessions=Math.max(0,parseInt(document.getElementById('edit-sessions').value)||0);
  s.streak=Math.max(0,parseInt(document.getElementById('edit-streak').value)||0);
  s.lastPhase=document.getElementById('edit-phase').value;
  s.lastWeek=document.getElementById('edit-week').value;
  s.lastDay=document.getElementById('edit-day').value;
  saveState();
  const conf=document.getElementById('prog-edit-confirm');
  conf.style.display='block';
  setTimeout(()=>{
    conf.style.display='none';
    document.getElementById('prog-edit-panel').style.display='none';
    document.getElementById('prog-edit-btn').style.display='';
    refreshProgress();
    refreshHome();
  },1200);
}
function cancelProgEdit(){
  document.getElementById('prog-edit-panel').style.display='none';
  document.getElementById('prog-edit-btn').style.display='';
}
function renderLiftHistory(){
  const el=document.getElementById('lift-history');if(!el)return;
  let html='';
  LIFTS_LIST.forEach(lift=>{
    let log=[];
    try{log=JSON.parse(localStorage.getItem('exerciseLog_'+exKey(lift))||'[]');}catch(e){}
    if(!log.length)return;
    html+=`<div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:600;color:var(--text);margin-bottom:4px">${lift}</div>
      <table style="width:100%;border-collapse:collapse">
        <tr style="font-size:10px;color:var(--text-3)">
          <td style="padding:2px 6px 4px">Date</td>
          <td style="padding:2px 6px 4px;text-align:center">Weight</td>
          <td style="padding:2px 6px 4px;text-align:center">Reps</td>
          <td style="padding:2px 6px 4px;text-align:center">RPE</td>
        </tr>
        ${log.slice(0,5).map(entry=>{
          const best=entry.sets.reduce((b,s)=>parseFloat(s.w||0)>=parseFloat(b.w||0)?s:b,entry.sets[0]||{w:'',r:'',rpe:''});
          return `<tr style="font-size:12px;border-top:0.5px solid var(--border)">
            <td style="padding:5px 6px;color:var(--text-2)">${entry.date}</td>
            <td style="padding:5px 6px;text-align:center;font-weight:600">${best.w?best.w+'lb':'—'}</td>
            <td style="padding:5px 6px;text-align:center">${best.r||'—'}</td>
            <td style="padding:5px 6px;text-align:center">${best.rpe||'—'}</td>
          </tr>`;
        }).join('')}
      </table>
    </div>`;
  });
  el.innerHTML=html||'<div style="font-size:13px;color:var(--text-2);text-align:center;padding:10px 0">Log sessions to see lift history here</div>';
}
function buildStreakDots(u,elId){
  const el=document.getElementById(elId);if(!el)return;
  const done=state[u].sessions;el.innerHTML='';
  for(let i=1;i<=48;i++){const d=document.createElement('div');d.className='streak-dot '+(i<=done?'sdot-hit':i===done+1?'sdot-now':'sdot-empty');d.textContent=i;el.appendChild(d);}
}
function logBW(){
  const v=parseFloat(document.getElementById('bw-inp').value);if(!v)return;
  const date=new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'});
  if(!state[progUser].weights)state[progUser].weights=[];
  state[progUser].weights.push({date,v});saveState();
  document.getElementById('bw-inp').value='';renderBWEntries();refreshProgress();
}
function renderBWEntries(){
  const wts=state[progUser].weights||[];
  const el=document.getElementById('bw-entries');
  if(!wts.length){el.innerHTML='<div style="font-size:13px;color:var(--text-2);text-align:center;padding:10px 0">No entries yet — log your first weigh-in above</div>';return;}
  el.innerHTML=wts.slice(-5).reverse().map(w=>`<div class="ing-row"><span style="color:var(--text-2);font-size:12px">${w.date}</span><span style="font-weight:600">${Math.round(w.v)} lb</span></div>`).join('');
}
function renderLiftBests(){
  const bests=state[progUser].liftBests||{};
  document.getElementById('lift-bests').innerHTML=LIFTS_LIST.map(l=>`
    <div class="lift-row">
      <div style="flex:1"><div style="font-size:13px;font-weight:500">${l}</div></div>
      <input class="lift-inp" type="number" placeholder="— lb" value="${bests[l]||''}" data-lift="${l}" oninput="updateLiftBest('${l}',this.value)">
    </div>`).join('');
}
function updateLiftBest(lift,val){if(!state[progUser].liftBests)state[progUser].liftBests={};state[progUser].liftBests[lift]=val?parseFloat(val):null;saveState();}

// ============ TIMER FUNCTIONS ============
function toggleTimer(){
  const btn=document.getElementById('timer-btn');
  if(!timerRunning){
    timerRunning=true;
    timerEndTime=Date.now()+timerSecs*1000;
    btn.innerHTML='<i class="ti ti-player-pause" aria-hidden="true"></i> Pause';
    btn.className='btn btn-amber';
    clearInterval(timerInterval);
    timerInterval=setInterval(tickTimer,250);
    tickTimer();
  }else{
    timerRunning=false;
    clearInterval(timerInterval);
    timerSecs=Math.max(0,Math.round((timerEndTime-Date.now())/1000));
    btn.innerHTML='<i class="ti ti-player-play" aria-hidden="true"></i> Resume';
    btn.className='btn btn-green';
    updateTimerDisp();
  }
}
function tickTimer(){
  const btn=document.getElementById('timer-btn');
  timerSecs=Math.max(0,Math.round((timerEndTime-Date.now())/1000));
  updateTimerDisp();
  if(timerSecs<=0){
    clearInterval(timerInterval);timerRunning=false;
    btn.innerHTML='<i class="ti ti-refresh" aria-hidden="true"></i> Done';btn.className='btn btn-green';
    const disp=document.getElementById('timer-disp');
    disp.style.animation='timerFlash 0.5s ease-in-out infinite';
    const banner=document.getElementById('rest-complete-banner');
    if(banner){banner.style.display='block';setTimeout(()=>dismissRestBanner(),4000);}
    try{if(navigator.vibrate)navigator.vibrate([300,100,300,100,300]);}catch(e){}
    try{beepTimer();}catch(e){}
  }
}
function dismissRestBanner(){
  const b=document.getElementById('rest-complete-banner');
  if(b)b.style.display='none';
  const d=document.getElementById('timer-disp');
  if(d)d.style.animation='';
}
let audioCtx=null;
document.addEventListener('touchstart',function(){
  try{if(!audioCtx){audioCtx=new(window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();}}catch(e){}
},{once:true});
function beepTimer(){
  if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  for(let i=0;i<3;i++){
    const o=audioCtx.createOscillator(),g=audioCtx.createGain();
    o.connect(g);g.connect(audioCtx.destination);
    o.frequency.value=880;o.type='sine';
    const t=audioCtx.currentTime+i*0.25;
    g.gain.setValueAtTime(0.001,t);g.gain.exponentialRampToValueAtTime(0.3,t+0.02);g.gain.exponentialRampToValueAtTime(0.001,t+0.18);
    o.start(t);o.stop(t+0.2);
  }
}
// Resync timer when app returns from background / screen unlock
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){
    document.querySelectorAll('.lift-inp').forEach(inp=>{const l=inp.dataset.lift;if(l&&inp.value)updateLiftBest(l,inp.value);});
  }
  if(!document.hidden&&timerRunning){tickTimer();}
  if(!document.hidden&&sessionActive){tickSession();}
});
function adjTimer(d){
  timerSecs=Math.max(0,timerSecs+d);
  timerMax=Math.max(timerMax,timerSecs);
  if(timerRunning)timerEndTime=Date.now()+timerSecs*1000;
  updateTimerDisp();
}
function setPreset(s){clearInterval(timerInterval);timerRunning=false;timerSecs=s;timerMax=s;timerEndTime=null;document.getElementById('timer-btn').innerHTML='<i class="ti ti-player-play" aria-hidden="true"></i> Start';document.getElementById('timer-btn').className='btn btn-green';updateTimerDisp();}
function updateTimerDisp(){
  const m=Math.floor(timerSecs/60),s=timerSecs%60;
  document.getElementById('timer-disp').textContent=m+':'+String(s).padStart(2,'0');
  const pct=timerMax>0?Math.round(timerSecs/timerMax*100):100;
  const fill=document.getElementById('timer-fill');
  fill.style.width=pct+'%';
  fill.style.background=timerSecs<=10?'var(--red)':timerSecs<=30?'var(--amber)':'var(--amber-light)';
}
// Floating timer
let floatSecs=0,floatMax=90,floatRunning=false,floatEndTime=null,floatInterval=null;
function floatTimerTap(){
  const presets=document.getElementById('float-presets');
  if(floatRunning){
    floatRunning=false;clearInterval(floatInterval);
    const btn=document.getElementById('float-timer-btn');
    btn.className='';document.getElementById('float-timer-label').textContent='Rest';
    floatSecs=0;presets.style.display='none';return;
  }
  if(floatSecs>0){startFloatTimer(floatSecs);return;}
  presets.style.display=presets.style.display==='block'?'none':'block';
}
function startFloatTimer(s){
  document.getElementById('float-presets').style.display='none';
  floatSecs=s;floatMax=s;floatRunning=true;
  floatEndTime=Date.now()+s*1000;
  clearInterval(floatInterval);
  floatInterval=setInterval(tickFloatTimer,250);
  tickFloatTimer();
}
function tickFloatTimer(){
  floatSecs=Math.max(0,Math.round((floatEndTime-Date.now())/1000));
  const btn=document.getElementById('float-timer-btn');
  const lbl=document.getElementById('float-timer-label');
  if(floatSecs<=0){
    clearInterval(floatInterval);floatRunning=false;
    btn.className='done';lbl.textContent='Done!';
    try{if(navigator.vibrate)navigator.vibrate([300,100,300,100,300]);}catch(e){}
    try{beepTimer();}catch(e){}
    setTimeout(()=>{if(btn)btn.className='';if(lbl)lbl.textContent='Rest';floatSecs=0;},3000);
    return;
  }
  btn.className='running';
  const m=Math.floor(floatSecs/60),sec=floatSecs%60;
  lbl.textContent=m>0?m+':'+String(sec).padStart(2,'0'):floatSecs+'s';
}

// Close float presets when tapping elsewhere

// ============ SESSION HISTORY ============
function getSetKey(phase,week,day,exName,setNum,field){
  return 'sets_p'+phase+'_'+day+'_w'+week+'_'+exName.replace(/\s+/g,'_').replace(/[^a-zA-Z0-9_]/g,'')+'_s'+setNum+'_'+field;
}
function saveSetVal(phase,week,day,exName,setNum,field,val){
  const k=getSetKey(phase,week,day,exName,setNum,field);
  localStorage.setItem(k,val);localStorage.setItem(k+'_ts',Date.now());
  if(field==='w')autoUpdateLiftBest(homeUser,exName,parseFloat(val));
}
// exercise names carry superset prefixes ("A1 · ") and variant suffixes ("(wide grip)", "heavy") —
// substring match against LIFTS_LIST catches those; "db"->"dumbbell" covers the one abbreviation mismatch in the data
function matchedLift(exName){
  const norm=s=>s.toLowerCase().replace(/\bdb\b/g,'dumbbell');
  const n=norm(exName);
  return LIFTS_LIST.find(l=>n.includes(norm(l)));
}
function autoUpdateLiftBest(u,exName,weight){
  if(isNaN(weight))return;
  const lift=matchedLift(exName);
  if(!lift)return;
  if(!state[u].liftBests)state[u].liftBests={};
  const current=parseFloat(state[u].liftBests[lift]);
  if(isNaN(current)||weight>current){
    state[u].liftBests[lift]=weight;
    saveState();
    if(progUser===u)renderLiftBests();
  }
}
function loadSetVal(phase,week,day,exName,setNum,field){
  const k=getSetKey(phase,week,day,exName,setNum,field);
  const ts=localStorage.getItem(k+'_ts');
  if(ts&&Date.now()-parseInt(ts)>7*24*60*60*1000){localStorage.removeItem(k);localStorage.removeItem(k+'_ts');return '';}
  return localStorage.getItem(k)||'';
}
// Exercise history helpers
function exKey(exName){return exName.replace(/\s+/g,'_').replace(/[^a-zA-Z0-9_]/g,'');}
function getLastSession(exName){
  try{const log=JSON.parse(localStorage.getItem('exerciseLog_'+exKey(exName))||'[]');return log.length?log[0]:null;}catch(e){return null;}
}
function saveSessionHistory(){
  const today=new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'});
  getSections(currentPhase,currentWeek,currentDay).forEach(sec=>{
    sec.exercises.forEach(ex=>{
      if(getExType(ex,sec.label)!=='weighted')return;
      const sets=[];
      for(let i=1;i<=ex.sets;i++){
        const w=loadSetVal(currentPhase,currentWeek,currentDay,ex.name,i,'w');
        const r=loadSetVal(currentPhase,currentWeek,currentDay,ex.name,i,'r');
        const rpe=loadSetVal(currentPhase,currentWeek,currentDay,ex.name,i,'rpe');
        if(w||r)sets.push({w:w||'',r:r||'',rpe:rpe||''});
      }
      if(!sets.length)return;
      const k=exKey(ex.name);
      const logKey='exerciseLog_'+k;
      let log=[];
      try{log=JSON.parse(localStorage.getItem(logKey)||'[]');}catch(e){}
      log=log.filter(e=>e.date!==today);
      log.unshift({date:today,sets});
      if(log.length>10)log=log.slice(0,10);
      localStorage.setItem(logKey,JSON.stringify(log));
    });
  });
}

// Exercise type classifier

// ============ UTILITY FUNCTIONS ============
// RPE Popup
function openRpePopup(e){e.stopPropagation();document.getElementById('rpe-popup').style.display='block';document.getElementById('rpe-popup-overlay').style.display='block';}
function closeRpePopup(){document.getElementById('rpe-popup').style.display='none';document.getElementById('rpe-popup-overlay').style.display='none';}

// ============ INITIALIZATION ============
document.getElementById('home-date').textContent = new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
document.addEventListener('click',function(e){
  const ft=document.getElementById('float-timer');
  if(ft&&!ft.contains(e.target)){
    const p=document.getElementById('float-presets');
    if(p)p.style.display='none';
  }
});
refreshHome();renderWorkout();
