let modalSelectedCategoryKey = "crops";
let currentTierFilter = "all"; // 'all' | 1 | 2 | 3

function setTierFilter(tier) {
  currentTierFilter = tier;

  // Update button styles
  ['all', 1, 2, 3].forEach(t => {
    const btn = document.getElementById(`filter-${t}`);
    if (btn) {
      if (t === tier) {
        btn.className = "px-2.5 py-1 rounded-lg text-[10px] font-bold transition bg-amber-400/20 text-amber-300";
      } else {
        btn.className = "px-2.5 py-1 rounded-lg text-[10px] font-bold transition text-slate-400 hover:text-white";
      }
    }
  });

  // Toggle tier sections visibility
  document.getElementById('tier-1-section').style.display = (tier === 'all' || tier === 1) ? 'flex' : 'none';
  document.getElementById('tier-2-section').style.display = (tier === 'all' || tier === 2) ? 'flex' : 'none';
  document.getElementById('tier-3-section').style.display = (tier === 'all' || tier === 3) ? 'flex' : 'none';
}

function renderTabs() {
  const nav = document.getElementById("category-tabs");
  nav.innerHTML = Object.entries(SKILL_DATABASE).map(([key, cat]) => {
    const isActive = key === currentCategoryKey;
    const inv = getCategoryInvestments(key);
    return `
      <button type="button" onclick="setCategory('${key}')" class="px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition border flex items-center gap-1 cursor-pointer ${
        isActive
          ? 'bg-amber-400/15 border-amber-400 text-amber-300'
          : 'card-sub text-slate-400 hover:text-slate-200 hover:border-slate-700'
      }">
        <span class="text-xs">${cat.icon}</span>
        <span>${cat.name}</span>
        ${inv.totalPoints > 0 ? `<span class="px-1 py-0.1 rounded-full bg-amber-400/20 text-[8px] font-pixel text-amber-300 font-bold">${inv.totalPoints}p</span>` : ''}
      </button>
    `;
  }).join('');
}

function renderTierGrid(tierNum, elementId) {
  const cat = SKILL_DATABASE[currentCategoryKey];
  const tierSkills = cat.skills.filter(s => s.tier === tierNum);
  const inv = getCategoryInvestments(currentCategoryKey);
  const req = cat.reqs[`t${tierNum}`];
  const isTierUnlocked = inv.totalPoints >= req;

  const container = document.getElementById(elementId);
  container.innerHTML = tierSkills.map(skill => {
    const rank = skillRanks[skill.id] || 0;
    const isAllocated = rank > 0;
    const cardClass = isAllocated ? "skill-card active" : (isTierUnlocked ? "skill-card available" : "skill-card locked");

    const nextCost = rank < 3 ? getRankCost(skill.tier, rank + 1) : null;
    let nextCostText = "";
    if (rank === 0) {
      nextCostText = `${nextCost.points}P`;
    } else if (rank < 3) {
      nextCostText = `+${nextCost.points}P${nextCost.shards > 0 ? `+${nextCost.shards}🔷` : ''}`;
    } else {
      nextCostText = "MAX";
    }

    return `
      <div onclick="toggleSkillCard('${skill.id}')" class="${cardClass} p-2 rounded-lg flex flex-col justify-between select-none cursor-pointer transition-all min-h-[96px]">
        <div>
          <!-- Icon, Title & Rank Dots -->
          <div class="flex items-start justify-between gap-1 mb-1">
            <div class="flex items-center gap-1 min-w-0">
              <span class="text-sm flex-shrink-0">${skill.icon}</span>
              <span class="text-[11px] font-bold font-display leading-tight truncate ${isAllocated ? 'text-amber-300' : 'text-slate-200'}">${skill.name}</span>
            </div>
            
            <div class="flex items-center gap-0.5 bg-slate-900/90 px-1 py-0.5 rounded border border-slate-800 flex-shrink-0">
              <div class="rank-dot ${rank >= 1 ? 'active' : ''}"></div>
              <div class="rank-dot ${rank >= 2 ? 'active' : ''}"></div>
              <div class="rank-dot ${rank >= 3 ? 'active' : ''}"></div>
            </div>
          </div>

          <!-- Compact Buff Descriptions -->
          <div class="space-y-0.5 text-[10px] mb-1 leading-tight">
            ${skill.buffs.map(b => `<p class="text-emerald-400/90 truncate">• ${b}</p>`).join('')}
            ${skill.debuffs.map(d => `<p class="text-rose-400 truncate">• ${d}</p>`).join('')}
          </div>
        </div>

        <!-- Stepper Controls -->
        <div class="flex items-center justify-between pt-1 border-t border-slate-800/60 mt-0.5">
          <span class="text-[8px] font-pixel ${rank === 3 ? 'text-amber-400 font-bold' : 'text-slate-400'}">
            ${isTierUnlocked || isAllocated ? nextCostText : `REQ ${req}P`}
          </span>

          <div class="flex items-center gap-1" onclick="event.stopPropagation()">
            <button type="button" onclick="downgradeSkill('${skill.id}', event)" ${rank === 0 ? 'disabled' : ''} class="btn-step w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-slate-200">
              -
            </button>
            <button type="button" onclick="upgradeSkill('${skill.id}', event)" ${rank === 3 || (!isTierUnlocked && rank === 0) ? 'disabled' : ''} class="btn-step w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-amber-300">
              +
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderSummary() {
  const cat = SKILL_DATABASE[currentCategoryKey];
  const catInv = getCategoryInvestments(currentCategoryKey);
  const globalInv = getTotalGlobalInvestments();

  // Bottom HUD Dock Counters
  document.getElementById('dock-points').innerText = `${globalInv.points} pts`;
  document.getElementById('dock-shards').innerText = `${globalInv.shards}`;
  document.getElementById('tab-tier-summary').innerText = `${catInv.totalPoints} pts in tab`;

  // Status Headers
  document.getElementById('tier-1-status').innerText = `${catInv.t1} PTS`;

  const t2Unlocked = catInv.totalPoints >= cat.reqs.t2;
  document.getElementById('tier-2-status').innerText = `${t2Unlocked ? 'UNLOCKED' : 'LOCKED'} (${catInv.t2}/${cat.reqs.t2})`;
  document.getElementById('tier-2-progress').style.width = `${Math.min(100, Math.round((catInv.totalPoints / cat.reqs.t2) * 100))}%`;

  const t3Unlocked = catInv.totalPoints >= cat.reqs.t3;
  document.getElementById('tier-3-status').innerText = `${t3Unlocked ? 'UNLOCKED' : 'LOCKED'} (${catInv.t3}/${cat.reqs.t3})`;
  document.getElementById('tier-3-progress').style.width = `${Math.min(100, Math.round((catInv.totalPoints / cat.reqs.t3) * 100))}%`;

  document.getElementById('summary-t1').innerText = `${catInv.t1}p`;
  document.getElementById('summary-t2').innerText = `${catInv.t2}p`;
  document.getElementById('summary-t3').innerText = `${catInv.t3}p`;

  let buffs = [];
  let debuffs = [];

  cat.skills.forEach(s => {
    const rank = skillRanks[s.id] || 0;
    if (rank > 0) {
      s.buffs.forEach(b => buffs.push({ text: b, icon: s.icon, rank }));
      s.debuffs.forEach(d => debuffs.push({ text: d, icon: s.icon, rank }));
    }
  });

  const buffsEl = document.getElementById('buffs-list');
  buffsEl.innerHTML = buffs.length === 0 
    ? `<div class="text-[10px] text-slate-500 italic p-1.5 rounded card-sub">No active buffs</div>`
    : buffs.map(b => `
        <div class="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between gap-1">
          <div class="flex items-center gap-1 min-w-0">
            <span>${b.icon}</span>
            <span class="truncate text-[11px]">${b.text}</span>
          </div>
          <span class="text-[8px] font-pixel px-1 py-0.2 rounded bg-emerald-400/20 text-emerald-300">R${b.rank}</span>
        </div>
      `).join('');

  const debuffsEl = document.getElementById('debuffs-list');
  debuffsEl.innerHTML = debuffs.length === 0
    ? `<div class="text-[10px] text-slate-500 italic p-1.5 rounded card-sub">No tradeoffs</div>`
    : debuffs.map(d => `
        <div class="p-1.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center justify-between gap-1">
          <div class="flex items-center gap-1 min-w-0">
            <span>${d.icon}</span>
            <span class="truncate text-[11px]">${d.text}</span>
          </div>
          <span class="text-[8px] font-pixel px-1 py-0.2 rounded bg-rose-400/20 text-rose-300">R${d.rank}</span>
        </div>
      `).join('');
}

function render() {
  renderTabs();
  renderTierGrid(1, "tier-1-grid");
  renderTierGrid(2, "tier-2-grid");
  renderTierGrid(3, "tier-3-grid");
  renderSummary();
  setTierFilter(currentTierFilter);
}

// Stats Drawer Handlers
function openStatsDrawer() {
  document.getElementById('drawer-backdrop').classList.remove('hidden');
  document.getElementById('stats-drawer').classList.add('drawer-open');
}

function closeStatsDrawer() {
  document.getElementById('drawer-backdrop').classList.add('hidden');
  document.getElementById('stats-drawer').classList.remove('drawer-open');
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast-notification");
  document.getElementById("toast-text").innerText = message;
  
  if (type === "error") {
    toast.className = "fixed top-3 inset-x-0 mx-auto w-fit z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-rose-500/40 text-rose-300 shadow-2xl text-xs font-semibold toast-active";
  } else if (type === "neutral") {
    toast.className = "fixed top-3 inset-x-0 mx-auto w-fit z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-600 text-slate-300 shadow-2xl text-xs font-semibold toast-active";
  } else {
    toast.className = "fixed top-3 inset-x-0 mx-auto w-fit z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/40 text-emerald-300 shadow-2xl text-xs font-semibold toast-active";
  }

  setTimeout(() => { toast.classList.remove("toast-active"); }, 2000);
}

// Multi-tab Presets Modal Handlers
function openSuggestionsModal() {
  const modal = document.getElementById("suggestions-modal");
  modalSelectedCategoryKey = currentCategoryKey;
  renderModalContent();
  modal.style.display = "flex";
}

function setModalCategory(catKey) {
  modalSelectedCategoryKey = catKey;
  renderModalContent();
}

function renderModalContent() {
  const tabsContainer = document.getElementById("modal-category-tabs");
  const listContainer = document.getElementById("suggestions-list");

  tabsContainer.innerHTML = Object.entries(SKILL_DATABASE).map(([key, cat]) => {
    const isSelected = key === modalSelectedCategoryKey;
    const presetsCount = (SUGGESTIONS_DATABASE[key] || []).length;
    return `
      <button type="button" onclick="setModalCategory('${key}')" class="px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap transition flex items-center gap-1 cursor-pointer ${
        isSelected
          ? 'bg-amber-400/20 border border-amber-400 text-amber-300'
          : 'bg-slate-900/60 border border-slate-800 text-slate-400'
      }">
        <span>${cat.icon}</span>
        <span>${cat.name}</span>
        ${presetsCount > 0 ? `<span class="text-[8px] px-1 rounded-full bg-slate-800 text-slate-300">${presetsCount}</span>` : ''}
      </button>
    `;
  }).join('');

  const activeCat = SKILL_DATABASE[modalSelectedCategoryKey];
  const suggestions = (typeof SUGGESTIONS_DATABASE !== "undefined" && SUGGESTIONS_DATABASE[modalSelectedCategoryKey]) || [];

  if (suggestions.length === 0) {
    listContainer.innerHTML = `<div class="p-4 rounded-lg card-sub text-center text-xs text-slate-500 italic">No presets added yet.</div>`;
  } else {
    listContainer.innerHTML = suggestions.map(preset => {
      const skillPills = preset.skills.map(id => {
        const found = activeCat.skills.find(s => s.id === id);
        return found ? `<span class="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 text-[9px]">${found.icon} ${found.name}</span>` : '';
      }).join(' ');

      return `
        <div class="p-2 rounded-lg card-sub border border-slate-800 flex flex-col gap-1">
          <div class="flex items-center justify-between gap-1">
            <h4 class="font-display font-bold text-xs text-white">${preset.title}</h4>
            <button type="button" onclick="applyPreset('${preset.id}', '${modalSelectedCategoryKey}')" class="btn-primary px-2 py-0.5 rounded text-slate-950 font-display font-bold text-[10px] cursor-pointer">
              Apply
            </button>
          </div>
          <p class="text-[10px] text-slate-400 leading-snug">${preset.description}</p>
          <div class="flex flex-wrap gap-1 pt-1 border-t border-slate-800/60">${skillPills}</div>
        </div>
      `;
    }).join('');
  }
}

function closeSuggestionsModal() {
  document.getElementById("suggestions-modal").style.display = "none";
}

function onModalBackdropClick(event) {
  if (event.target.id === "suggestions-modal") closeSuggestionsModal();
}
