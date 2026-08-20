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
  showToast(`Reset ${cat.name}`);
  render();
}

function resetAllSkills() {
  activeSkills.clear();
  showToast("All points reset");
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
      <button type="button" onclick="setCategory('${key}')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition border flex items-center gap-1.5 cursor-pointer ${
        isActive
          ? 'bg-amber-400/15 border-amber-400 text-amber-300'
          : 'card-sub text-slate-400 hover:text-slate-200 hover:border-slate-700'
      }">
        <span class="text-sm">${cat.icon}</span>
        <span>${cat.name}</span>
        ${catPts > 0 ? `<span class="px-1 py-0.1 rounded-full bg-amber-400/20 text-[8px] font-pixel text-amber-300 font-bold">${catPts}</span>` : ''}
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
      <div onclick="toggleSkill('${skill.id}')" class="${cardClass} p-2.5 rounded-lg cursor-pointer flex flex-col justify-between select-none">
        <div>
          <div class="flex items-center justify-between gap-1.5 mb-1">
            <div class="flex items-center gap-1.5 min-w-0">
              <span class="text-base flex-shrink-0">${skill.icon}</span>
              <span class="text-xs font-bold font-display truncate ${isAllocated ? 'text-amber-300' : 'text-slate-200'}">${skill.name}</span>
            </div>
            <span class="px-1.5 py-0.2 rounded text-[8px] font-pixel flex-shrink-0 ${isAllocated ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}">
              ${skill.cost}P
            </span>
          </div>

          <div class="space-y-0.5 text-[11px]">
            ${skill.buffs.map(b => `<p class="text-emerald-400/90 leading-tight">• ${b}</p>`).join('')}
            ${skill.debuffs.map(d => `<p class="text-rose-400 leading-tight">• ${d}</p>`).join('')}
          </div>
        </div>

        <div class="text-[8px] font-pixel text-right mt-1.5 pt-1 border-t border-slate-800/40">
          ${isAllocated ? '<span class="text-amber-400 font-bold">✓ ACTIVE</span>' : (isUnlocked ? '<span class="text-sky-400">+ LEARN</span>' : `<span class="text-slate-500">🔒 REQ ${req}P</span>`)}
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

  document.getElementById('tier-1-status').innerText = `${points.t1} PTS`;

  const t2Unlocked = points.total >= cat.reqs.t2;
  document.getElementById('tier-2-status').innerText = `${t2Unlocked ? 'UNLOCKED' : 'LOCKED'} (${points.t2}/${cat.reqs.t2})`;
  document.getElementById('tier-2-progress').style.width = `${Math.min(100, Math.round((points.total / cat.reqs.t2) * 100))}%`;

  const t3Unlocked = points.total >= cat.reqs.t3;
  document.getElementById('tier-3-status').innerText = `${t3Unlocked ? 'UNLOCKED' : 'LOCKED'} (${points.t3}/${cat.reqs.t3})`;
  document.getElementById('tier-3-progress').style.width = `${Math.min(100, Math.round((points.total / cat.reqs.t3) * 100))}%`;

  document.getElementById('summary-t1').innerText = points.t1;
  document.getElementById('summary-t2').innerText = points.t2;
  document.getElementById('summary-t3').innerText = points.t3;

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
    ? `<div class="text-[10px] text-slate-500 italic p-1.5 rounded card-sub">No buffs</div>`
    : buffs.map(b => `
        <div class="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-1.5">
          <span>${b.icon}</span>
          <span class="truncate">${b.text}</span>
        </div>
      `).join('');

  const debuffsEl = document.getElementById('debuffs-list');
  debuffsEl.innerHTML = debuffs.length === 0
    ? `<div class="text-[10px] text-slate-500 italic p-1.5 rounded card-sub">No tradeoffs</div>`
    : debuffs.map(d => `
        <div class="p-1.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center gap-1.5">
          <span>${d.icon}</span>
          <span class="truncate">${d.text}</span>
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

function showToast(message) {
  const toast = document.getElementById("toast-notification");
  document.getElementById("toast-text").innerText = message;
  toast.className = "fixed bottom-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/40 text-emerald-300 shadow-xl text-xs font-semibold toast-active";
  setTimeout(() => { toast.classList.remove("toast-active"); }, 2000);
}

function exportBuildLink() {
  const exportArr = Array.from(activeSkills);
  const encoded = btoa(JSON.stringify(exportArr));
  const url = new URL(window.location.href);
  url.searchParams.set("build", encoded);
  navigator.clipboard.writeText(url.href);
  showToast("Link copied!");
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

function openSuggestionsModal() {
  const modal = document.getElementById("suggestions-modal");
  const listContainer = document.getElementById("suggestions-list");
  const currentCat = SKILL_DATABASE[currentCategoryKey];
  const suggestions = (typeof SUGGESTIONS_DATABASE !== "undefined" && SUGGESTIONS_DATABASE[currentCategoryKey]) || [];

  document.getElementById("modal-category-title").innerText = `${currentCat.name} Presets`;

  if (suggestions.length === 0) {
    listContainer.innerHTML = `<div class="p-4 rounded-lg card-sub text-center text-xs text-slate-500 italic">No presets added yet.</div>`;
  } else {
    listContainer.innerHTML = suggestions.map(preset => {
      const skillPills = preset.skills.map(id => {
        const found = currentCat.skills.find(s => s.id === id);
        return found ? `<span class="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 text-[10px]">${found.icon} ${found.name}</span>` : '';
      }).join(' ');

      return `
        <div class="p-2.5 rounded-lg card-sub border border-slate-800 flex flex-col gap-1.5">
          <div class="flex items-center justify-between gap-1.5">
            <div class="flex items-center gap-1.5">
              <h4 class="font-display font-bold text-xs text-white">${preset.title}</h4>
              <span class="px-1.5 py-0.2 rounded text-[8px] font-pixel border ${preset.badgeColor}">${preset.tag}</span>
            </div>
            <button type="button" onclick="applyPreset('${preset.id}')" class="btn-primary px-2 py-0.5 rounded text-slate-950 font-display font-bold text-[11px] cursor-pointer">
              Apply
            </button>
          </div>
          <p class="text-[11px] text-slate-400">${preset.description}</p>
          <div class="flex flex-wrap gap-1 pt-1 border-t border-slate-800/60">${skillPills}</div>
        </div>
      `;
    }).join('');
  }

  modal.style.display = "flex";
}

function closeSuggestionsModal() {
  document.getElementById("suggestions-modal").style.display = "none";
}

function onModalBackdropClick(event) {
  if (event.target.id === "suggestions-modal") closeSuggestionsModal();
}

function applyPreset(presetId) {
  const suggestions = (typeof SUGGESTIONS_DATABASE !== "undefined" && SUGGESTIONS_DATABASE[currentCategoryKey]) || [];
  const preset = suggestions.find(p => p.id === presetId);
  if (!preset) return;

  const currentCat = SKILL_DATABASE[currentCategoryKey];
  currentCat.skills.forEach(s => activeSkills.delete(s.id));
  preset.skills.forEach(skillId => activeSkills.add(skillId));

  validateTierRequirements(currentCategoryKey);
  closeSuggestionsModal();
  showToast(`Applied ${preset.title}`);
  render();
}

loadBuildFromURL();
render();
