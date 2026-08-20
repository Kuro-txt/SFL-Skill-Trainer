let currentCategoryKey = "crops";
let activeSkills = new Set();

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
  } else {
    const points = getCategoryPoints(currentCategoryKey);
    if (skill.tier === 2 && points.total < cat.reqs.t2) return;
    if (skill.tier === 3 && points.total < cat.reqs.t3) return;
    activeSkills.add(skillId);
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
  render();
}

function resetAllSkills() {
  activeSkills.clear();
  render();
}

function setCategory(key) {
  currentCategoryKey = key;
  render();
}

function renderTabs() {
  const nav = document.getElementById("category-tabs");
  nav.innerHTML = Object.entries(SKILL_DATABASE).map(([key, cat]) => {
    const isActive = key === currentCategoryKey;
    const catPts = getCategoryPoints(key).total;
    return `
      <button onclick="setCategory('${key}')" class="px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-2 ${
        isActive
          ? 'bg-amber-400/10 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
          : 'card-glass border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
      }">
        <span class="text-sm">${cat.icon}</span>
        <span>${cat.name}</span>
        ${catPts > 0 ? `<span class="px-1.5 py-0.2 rounded-full bg-amber-400/20 text-[9px] font-pixel text-amber-300 font-bold">${catPts}</span>` : ''}
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
    let cardClass = isAllocated ? "skill-card active" : (isUnlocked ? "skill-card available" : "skill-card locked");

    return `
      <div onclick="toggleSkill('${skill.id}')" class="${cardClass} p-3 rounded-xl cursor-pointer flex flex-col justify-between select-none">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <div class="flex items-center gap-2">
              <span class="text-xl">${skill.icon}</span>
              <span class="text-xs font-bold font-display ${isAllocated ? 'text-amber-300' : 'text-slate-200'}">${skill.name}</span>
            </div>
            <span class="px-2 py-0.5 rounded text-[9px] font-pixel ${isAllocated ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}">
              ${skill.cost}P
            </span>
          </div>

          <div class="space-y-1 text-xs">
            ${skill.buffs.map(b => `<p class="text-emerald-400/90 leading-snug">• ${b}</p>`).join('')}
            ${skill.debuffs.map(d => `<p class="text-rose-400 leading-snug">• ${d}</p>`).join('')}
          </div>
        </div>

        <div class="text-[9px] font-pixel text-slate-500 text-right mt-2">
          ${isAllocated ? 'ACTIVE' : (isUnlocked ? '+ LEARN' : `REQ ${req}P`)}
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

  document.getElementById('tier-1-status').innerText = `${points.t1} pts allocated`;
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
    ? `<div class="text-xs text-slate-500 italic p-2.5 rounded-lg bg-slate-900/40 border border-slate-800">No buffs selected</div>`
    : buffs.map(b => `
        <div class="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
          <span>${b.icon}</span>
          <span class="font-medium">${b.text}</span>
        </div>
      `).join('');

  const debuffsEl = document.getElementById('debuffs-list');
  debuffsEl.innerHTML = debuffs.length === 0
    ? `<div class="text-xs text-slate-500 italic p-2.5 rounded-lg bg-slate-900/40 border border-slate-800">No debuffs active</div>`
    : debuffs.map(d => `
        <div class="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center gap-2">
          <span>${d.icon}</span>
          <span class="font-medium">${d.text}</span>
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
  setTimeout(() => { toast.style.opacity = "0"; }, 2000);
}

function loadBuildFromURL() {
  const params = new URLSearchParams(window.location.search);
  const build = params.get("build");
  if (build) {
    try {
      const decoded = JSON.parse(atob(build));
      if (Array.isArray(decoded)) activeSkills = new Set(decoded);
    } catch (e) {
      console.error(e);
    }
  }
}

loadBuildFromURL();
render();
