let currentCategoryKey = "crops";
let activeSkills = new Set();

// Web Audio API feedback
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playAudio(type) {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const now = audioCtx.currentTime;
  if (type === 'allocate') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.1);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.start(now);
    osc.stop(now + 0.12);
  } else if (type === 'refund') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.09);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.start(now);
    osc.stop(now + 0.09);
  } else if (type === 'tab') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(329.63, now);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.start(now);
    osc.stop(now + 0.06);
  }
}

function getCategoryPoints(catKey) {
  const cat = SKILL_DATABASE[catKey];
  let t1 = 0, t2 = 0, t3 = 0;
  cat.skills.forEach(s => {
    if (activeSkills.has(s.id)) {
      if (s.tier === 1) t1 += s.cost;
      if (s.tier === 2) t2 += s.cost;
      if (s.tier === 3) t3 += s.cost;
    }
  });
  return { t1, t2, t3, total: t1 + t2 + t3 };
}

function getTotalAllPoints() {
  let total = 0;
  Object.keys(SKILL_DATABASE).forEach(catKey => {
    total += getCategoryPoints(catKey).total;
  });
  return total;
}

function toggleSkill(skillId) {
  const cat = SKILL_DATABASE[currentCategoryKey];
  const skill = cat.skills.find(s => s.id === skillId);
  if (!skill) return;

  if (activeSkills.has(skillId)) {
    activeSkills.delete(skillId);
    validateTierRequirements(currentCategoryKey);
    playAudio('refund');
  } else {
    const points = getCategoryPoints(currentCategoryKey);
    if (skill.tier === 2 && points.total < cat.reqs.t2) return;
    if (skill.tier === 3 && points.total < cat.reqs.t3) return;

    activeSkills.add(skillId);
    playAudio('allocate');
  }
  render();
}

function validateTierRequirements(catKey) {
  const cat = SKILL_DATABASE[catKey];
  let points = getCategoryPoints(catKey);

  if (points.total < cat.reqs.t3) {
    cat.skills.filter(s => s.tier === 3).forEach(s => activeSkills.delete(s.id));
  }
  points = getCategoryPoints(catKey);
  if (points.total < cat.reqs.t2) {
    cat.skills.filter(s => s.tier === 2).forEach(s => activeSkills.delete(s.id));
  }
}

function resetCurrentCategory() {
  const cat = SKILL_DATABASE[currentCategoryKey];
  cat.skills.forEach(s => activeSkills.delete(s.id));
  playAudio('refund');
  render();
}

function resetAllSkills() {
  activeSkills.clear();
  playAudio('refund');
  render();
}

function setCategory(key) {
  currentCategoryKey = key;
  playAudio('tab');
  render();
}

function renderTabs() {
  const nav = document.getElementById("category-tabs");
  nav.innerHTML = Object.entries(SKILL_DATABASE).map(([key, cat]) => {
    const isActive = key === currentCategoryKey;
    const catPts = getCategoryPoints(key).total;
    return `
      <button onclick="setCategory('${key}')" class="px-4 py-2.5 rounded-xl border flex items-center gap-2.5 whitespace-nowrap text-xs font-bold transition-all ${
        isActive
          ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
      }">
        <span class="text-base">${cat.icon}</span>
        <span>${cat.name}</span>
        ${catPts > 0 ? `<span class="px-1.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-[9px] font-pixel text-amber-300">${catPts}</span>` : ''}
      </button>
    `;
  }).join('');
}

function renderTierGrid(tierNum, elementId) {
  const cat = SKILL_DATABASE[currentCategoryKey];
  const tierSkills = cat.skills.filter(s => s.tier === tierNum);
  const points = getCategoryPoints(currentCategoryKey);
  const req = cat.reqs[`t${tierNum}`];
  const isUnlocked = points.total >= req;

  const container = document.getElementById(elementId);
  container.innerHTML = tierSkills.map(skill => {
    const isAllocated = activeSkills.has(skill.id);
    let cardClass = isAllocated ? "card-unlocked" : (isUnlocked ? "card-available" : "card-locked");

    return `
      <div onclick="toggleSkill('${skill.id}')" class="${cardClass} p-4 rounded-xl cursor-pointer transition-all duration-200 flex flex-col justify-between select-none relative group min-h-[140px]">
        <div>
          <div class="flex items-start justify-between gap-2 mb-2">
            <div class="flex items-center gap-2.5">
              <span class="text-2xl">${skill.icon}</span>
              <div>
                <h3 class="font-rune font-bold text-xs ${isAllocated ? 'text-amber-200' : 'text-slate-100'}">${skill.name}</h3>
                <span class="text-[9px] font-pixel text-amber-400/80">${skill.cost} PTS</span>
              </div>
            </div>
            ${isAllocated 
              ? `<span class="px-2 py-0.5 rounded bg-amber-400 text-black text-[9px] font-pixel shadow">ON</span>` 
              : `<span class="text-[9px] font-pixel text-slate-500">${isUnlocked ? 'LEARN' : 'LOCKED'}</span>`
            }
          </div>

          <div class="space-y-1 mt-2">
            ${skill.buffs.map(b => `<p class="text-[11px] text-emerald-400/90 font-medium leading-tight">• ${b}</p>`).join('')}
            ${skill.debuffs.map(d => `<p class="text-[11px] text-rose-400 font-medium leading-tight">• ${d}</p>`).join('')}
          </div>
        </div>

        <div class="text-[9px] font-pixel text-slate-500 text-right mt-3">
          ${isAllocated ? 'CLICK TO REFUND' : (isUnlocked ? 'CLICK TO ALLOCATE' : `REQ ${req} PTS`)}
        </div>
      </div>
    `;
  }).join('');
}

function renderSummary() {
  const cat = SKILL_DATABASE[currentCategoryKey];
  const points = getCategoryPoints(currentCategoryKey);

  document.getElementById('hud-total-points').innerText = `${getTotalAllPoints()} pts`;
  document.getElementById('hud-cat-points').innerText = `${points.total} pts`;

  document.getElementById('tier-1-status').innerText = `UNLOCKED (${points.t1}/${cat.reqs.t1})`;
  document.getElementById('tier-2-status').innerText = `${points.total >= cat.reqs.t2 ? 'UNLOCKED' : 'LOCKED'} (${points.t2}/${cat.reqs.t2} Req)`;
  document.getElementById('tier-3-status').innerText = `${points.total >= cat.reqs.t3 ? 'UNLOCKED' : 'LOCKED'} (${points.t3}/${cat.reqs.t3} Req)`;

  document.getElementById('summary-t1').innerText = points.t1;
  document.getElementById('summary-t2').innerText = points.t2;
  document.getElementById('summary-t3').innerText = points.t3;

  let buffs = [];
  let debuffs = [];

  Object.values(SKILL_DATABASE).forEach(c => {
    c.skills.forEach(s => {
      if (activeSkills.has(s.id)) {
        s.buffs.forEach(b => buffs.push({ text: b, icon: s.icon, name: s.name }));
        s.debuffs.forEach(d => debuffs.push({ text: d, icon: s.icon, name: s.name }));
      }
    });
  });

  const buffsEl = document.getElementById('buffs-list');
  buffsEl.innerHTML = buffs.length === 0 
    ? `<div class="text-xs text-slate-500 italic p-3 rounded-lg bg-slate-900/50 border border-slate-800/60">No buffs selected.</div>`
    : buffs.map(b => `
        <div class="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-2">
          <span class="text-sm">${b.icon}</span>
          <div>
            <div class="text-[10px] font-pixel text-emerald-300/80 mb-0.5">${b.name}</div>
            <div class="text-xs text-emerald-300 font-medium">${b.text}</div>
          </div>
        </div>
      `).join('');

  const debuffsEl = document.getElementById('debuffs-list');
  debuffsEl.innerHTML = debuffs.length === 0
    ? `<div class="text-xs text-slate-500 italic p-3 rounded-lg bg-slate-900/50 border border-slate-800/60">No debuffs selected.</div>`
    : debuffs.map(d => `
        <div class="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/20 flex items-start gap-2">
          <span class="text-sm">${d.icon}</span>
          <div>
            <div class="text-[10px] font-pixel text-rose-300/80 mb-0.5">${d.name}</div>
            <div class="text-xs text-rose-300 font-medium">${d.text}</div>
          </div>
        </div>
      `).join('');
}

function render() {
  renderTabs();
  renderTierGrid(1, "tier-1-grid");
  renderTierGrid(2, "tier-2-grid");
  renderTierGrid(3, "tier-3-grid");
  renderSummary();
}

function exportBuildLink() {
  const exportArr = Array.from(activeSkills);
  const encoded = btoa(JSON.stringify(exportArr));
  const url = new URL(window.location.href);
  url.searchParams.set("build", encoded);
  navigator.clipboard.writeText(url.href);

  const toast = document.getElementById("toast-msg");
  toast.style.opacity = "1";
  playAudio('allocate');
  setTimeout(() => { toast.style.opacity = "0"; }, 2200);
}

function loadBuildFromURL() {
  const params = new URLSearchParams(window.location.search);
  const build = params.get("build");
  if (build) {
    try {
      const decoded = JSON.parse(atob(build));
      if (Array.isArray(decoded)) {
        activeSkills = new Set(decoded);
      }
    } catch (e) {
      console.error("Invalid build query", e);
    }
  }
}

// Initial Boot
loadBuildFromURL();
render();
