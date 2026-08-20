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
  showToast(`Reset ${cat.name} skills`, "neutral");
  render();
}

function resetAllSkills() {
  activeSkills.clear();
  showToast("All skill matrix points reset", "neutral");
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
      <button type="button" onclick="setCategory('${key}')" class="px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2 cursor-pointer ${
        isActive
          ? 'bg-amber-400/15 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
          : 'card-sub text-slate-400 hover:text-slate-200 hover:border-slate-700'
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

    let actionLabel = "";
    if (isAllocated) {
      actionLabel = `<span class="text-amber-400 font-bold flex items-center gap-1">✓ ALLOCATED</span>`;
    } else if (isUnlocked) {
      actionLabel = `<span class="text-sky-400 font-bold">+ LEARN</span>`;
    } else {
      actionLabel = `<span class="text-slate-500 font-medium flex items-center gap-1">🔒 REQ ${req} PTS</span>`;
    }

    return `
      <div onclick="toggleSkill('${skill.id}')" class="${cardClass} p-3.5 rounded-xl cursor-pointer flex flex-col justify-between select-none min-h-[125px]">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <div class="flex items-center gap-2 min-w-0">
              <span class="text-xl flex-shrink-0">${skill.icon}</span>
              <span class="text-xs font-bold font-display truncate ${isAllocated ? 'text-amber-300' : 'text-slate-200'}">${skill.name}</span>
            </div>
            <span class="px-2 py-0.5 rounded text-[9px] font-pixel flex-shrink-0 ${isAllocated ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}">
              ${skill.cost}P
            </span>
          </div>

          <div class="space-y-1 text-xs">
            ${skill.buffs.map(b => `<p class="text-emerald-400/90 leading-snug font-medium">• ${b}</p>`).join('')}
            ${skill.debuffs.map(d => `<p class="text-rose-400 leading-snug font-medium">• ${d}</p>`).join('')}
          </div>
        </div>

        <div class="text-[9px] font-pixel text-right mt-3 border-t border-slate-800/40 pt-1.5">
          ${actionLabel}
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

  // Status Headers
  document.getElementById('tier-1-status').innerText = `UNLOCKED (${points.t1} PTS)`;

  const t2Unlocked = points.total >= cat.reqs.t2;
  document.getElementById('tier-2-status').innerText = `${t2Unlocked ? 'UNLOCKED' : 'LOCKED'} (${points.t2}/${cat.reqs.t2} REQ)`;
  const t2Pct = Math.min(100, Math.round((points.total / cat.reqs.t2) * 100));
  document.getElementById('tier-2-progress').style.width = `${t2Pct}%`;

  const t3Unlocked = points.total >= cat.reqs.t3;
  document.getElementById('tier-3-status').innerText = `${t3Unlocked ? 'UNLOCKED' : 'LOCKED'} (${points.t3}/${cat.reqs.t3} REQ)`;
  const t3Pct = Math.min(100, Math.round((points.total / cat.reqs.t3) * 100));
  document.getElementById('tier-3-progress').style.width = `${t3Pct}%`;

  // Sidebar counters
  document.getElementById('summary-t1').innerText = points.t1;
  document.getElementById('summary-t2').innerText = points.t2;
  document.getElementById('summary-t3').innerText = points.t3;

  // Active perks compilation
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
    ? `<div class="text-xs text-slate-500 italic p-2.5 rounded-lg card-sub">No buffs selected</div>`
    : buffs.map(b => `
        <div class="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
          <span>${b.icon}</span>
          <span class="font-medium">${b.text}</span>
        </div>
      `).join('');

  const debuffsEl = document.getElementById('debuffs-list');
  debuffsEl.innerHTML = debuffs.length === 0
    ? `<div class="text-xs text-slate-500 italic p-2.5 rounded-lg card-sub">No tradeoffs active</div>`
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

function showToast(message, type = "success") {
  const toast = document.getElementById("toast-notification");
  const toastText = document.getElementById("toast-text");
  toastText.innerText = message;

  if (type === "neutral") {
    toast.className = "fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-600 text-slate-200 shadow-[0_10px_25px_rgba(0,0,0,0.8)] text-xs font-semibold toast-active";
  } else {
    toast.className = "fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 shadow-[0_10px_25px_rgba(0,0,0,0.8)] text-xs font-semibold toast-active";
  }

  setTimeout(() => {
    toast.classList.remove("toast-active");
  }, 2200);
}

function exportBuildLink() {
  const exportArr = Array.from(activeSkills);
  const encoded = btoa(JSON.stringify(exportArr));
  const url = new URL(window.location.href);
  url.searchParams.set("build", encoded);
  navigator.clipboard.writeText(url.href);
  showToast("Build link copied to clipboard!");
}

function loadBuildFromURL() {
  const params = new URLSearchParams(window.location.search);
  const build = params.get("build");
  if (build) {
    try {
      const decoded = JSON.parse(atob(build));
      if (Array.isArray(decoded)) activeSkills = new Set(decoded);
    } catch (e) {
      console.error("Invalid build parameter", e);
    }
  }
}

// --- Suggestions Modal Handlers ---
function openSuggestionsModal() {
  const modal = document.getElementById("suggestions-modal");
  const listContainer = document.getElementById("suggestions-list");
  const categoryTitle = document.getElementById("modal-category-title");
  
  const currentCat = SKILL_DATABASE[currentCategoryKey];
  const suggestions = (typeof SUGGESTIONS_DATABASE !== "undefined" && SUGGESTIONS_DATABASE[currentCategoryKey]) || [];

  categoryTitle.innerText = `${currentCat.name} — Recommended Builds`;

  if (suggestions.length === 0) {
    listContainer.innerHTML = `
      <div class="p-6 rounded-xl card-sub text-center text-xs text-slate-500 italic">
        No community presets added for ${currentCat.name} yet.
      </div>
    `;
  } else {
    listContainer.innerHTML = suggestions.map(preset => {
      const skillPills = preset.skills.map(id => {
        const found = currentCat.skills.find(s => s.id === id);
        return found ? `<span class="px-2 py-0.5 rounded bg-slate-800 border border-slate-700/80 text-slate-300 text-[11px] font-medium">${found.icon} ${found.name}</span>` : '';
      }).join(' ');

      return `
        <div class="p-4 rounded-xl card-sub border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col gap-2.5">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2 flex-wrap">
              <h4 class="font-display font-bold text-xs text-white">${preset.title}</h4>
              <span class="px-2 py-0.5 rounded text-[9px] font-pixel border ${preset.badgeColor}">${preset.tag}</span>
            </div>
            <button type="button" onclick="applyPreset('${preset.id}')" class="btn-primary px-3 py-1.5 rounded-lg text-slate-950 font-display font-bold text-xs cursor-pointer">
              Apply Build
            </button>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed">${preset.description}</p>
          <div class="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
            ${skillPills}
          </div>
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
  showToast(`Applied preset: ${preset.title}`);
  render();
}

// Initial Boot
loadBuildFromURL();
render();
