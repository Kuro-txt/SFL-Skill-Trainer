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
      <button onclick="setCategory('${key}')" class="px-2.5 py-1.5 rounded text-[11px] font-bold whitespace-nowrap border-2 flex items-center gap-1.5 ${
        isActive
          ? 'bg-[#ffe4a0] border-[#7c4822] text-[#3e2723] shadow-inner'
          : 'bg-[#d8a878] border-[#8d5524] text-[#542e13] hover:bg-[#e4b787]'
      }">
        <span>${cat.icon}</span>
        <span>${cat.name}</span>
        ${catPts > 0 ? `<span class="px-1 py-0.2 rounded bg-amber-800 text-yellow-100 text-[8px] font-pixel">${catPts}</span>` : ''}
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
    let cardClass = isAllocated ? "sfl-card active" : (isUnlocked ? "sfl-card" : "sfl-card locked");

    return `
      <div onclick="toggleSkill('${skill.id}')" class="${cardClass} p-2 rounded cursor-pointer flex flex-col justify-between select-none">
        <div>
          <div class="flex items-center justify-between gap-1 mb-1">
            <div class="flex items-center gap-1.5">
              <span class="text-lg">${skill.icon}</span>
              <span class="font-bold text-xs leading-tight text-[#3e2723]">${skill.name}</span>
            </div>
            <span class="font-pixel text-[8px] ${isAllocated ? 'text-amber-900 font-bold' : 'text-stone-600'}">
              ${skill.cost}P
            </span>
          </div>

          <div class="space-y-0.5 text-[11px] leading-tight">
            ${skill.buffs.map(b => `<p class="text-emerald-900 font-medium">• ${b}</p>`).join('')}
            ${skill.debuffs.map(d => `<p class="text-rose-900 font-medium">• ${d}</p>`).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderSummary() {
  const cat = SKILL_DATABASE[currentCategoryKey];
  const points = getCategoryPoints(currentCategoryKey);

  document.getElementById('hud-total-points').innerText = `${getTotalAllPoints()} PTS SPENT`;
  document.getElementById('tier-1-count').innerText = `${points.t1} pts`;
  document.getElementById('tier-2-count').innerText = `${points.t2} pts`;
  document.getElementById('tier-3-count').innerText = `${points.t3} pts`;

  document.getElementById('tier-2-header').innerText = `TIER 2 (${cat.reqs.t2} Req) - ${points.total >= cat.reqs.t2 ? 'UNLOCKED' : 'LOCKED'}`;
  document.getElementById('tier-3-header').innerText = `TIER 3 (${cat.reqs.t3} Req) - ${points.total >= cat.reqs.t3 ? 'UNLOCKED' : 'LOCKED'}`;

  let buffs = [];
  let debuffs = [];

  Object.values(SKILL_DATABASE).forEach(c => {
    c.skills.forEach(s => {
      if (activeSkills.has(s.id)) {
        s.buffs.forEach(b => buffs.push({ text: b, icon: s.icon }));
        s.debuffs.forEach(d => debuffs.push({ text: d, icon: s.icon }));
      }
    });
  });

  const buffsEl = document.getElementById('buffs-list');
  buffsEl.innerHTML = buffs.length === 0 
    ? `<div class="text-stone-600 italic">No buffs selected</div>`
    : buffs.map(b => `<div class="p-1 bg-[#fff8e7] border border-[#d6b485] rounded text-emerald-900">${b.icon} ${b.text}</div>`).join('');

  const debuffsEl = document.getElementById('debuffs-list');
  debuffsEl.innerHTML = debuffs.length === 0
    ? `<div class="text-stone-600 italic">No debuffs selected</div>`
    : debuffs.map(d => `<div class="p-1 bg-[#ffebe6] border border-[#dca69f] rounded text-rose-900">${d.icon} ${d.text}</div>`).join('');
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
