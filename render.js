let currentTierTab = 1; // 1 | 2 | 3 | 'stats'
let modalSelectedCategoryKey = "crops";

function setTierTab(tab) {
  currentTierTab = tab;
  render();
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
          : 'card-sub text-slate-400 hover:text-slate-200'
      }">
        <span class="text-xs">${cat.icon}</span>
        <span>${cat.name}</span>
        ${inv.totalPoints > 0 ? `<span class="px-1 py-0.1 rounded-full bg-amber-400/20 text-[8px] font-pixel text-amber-300 font-bold">${inv.totalPoints}p</span>` : ''}
      </button>
    `;
  }).join('');
}

function renderTierSegmentControls() {
  const cat = SKILL_DATABASE[currentCategoryKey];
  const inv = getCategoryInvestments(currentCategoryKey);

  [1, 2, 3].forEach(tier => {
    const btn = document.getElementById(`tier-tab-${tier}`);
    const isSelected = currentTierTab === tier;
    const isUnlocked = inv.totalPoints >= cat.reqs[`t${tier}`];

    btn.className = `flex-1 py-1.5 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 ${
      isSelected
        ? 'bg-amber-400 text-slate-950 shadow'
        : 'text-slate-400 hover:text-white bg-slate-900/50'
    }`;
    btn.innerHTML = `T${tier} ${!isUnlocked ? '🔒' : ''}`;
  });

  const statsBtn = document.getElementById('tier-tab-stats');
  statsBtn.className = `px-3 py-1.5 rounded-lg text-[10px] font-bold transition ${
    currentTierTab === 'stats' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 bg-slate-900/50'
  }`;
}

function renderActiveView() {
  const cat = SKILL_DATABASE[currentCategoryKey];
  const inv = getCategoryInvestments(currentCategoryKey);

  const skillsContainer = document.getElementById('skills-list-container');
  const statsContainer = document.getElementById('stats-view-container');
  const headerBox = document.getElementById('tier-header-box');
  const progressContainer = document.getElementById('tier-progress-container');
  const progressBar = document.getElementById('tier-progress-bar');
  const titleBadge = document.getElementById('tier-title-badge');
  const statusText = document.getElementById('tier-status-text');

  if (currentTierTab === 'stats') {
    skillsContainer.classList.add('hidden');
    statsContainer.classList.remove('hidden');
    headerBox.classList.add('hidden');
    return;
  }

  skillsContainer.classList.remove('hidden');
  statsContainer.classList.add('hidden');
  headerBox.classList.remove('hidden');

  const tierNum = currentTierTab;
  const req = cat.reqs[`t${tierNum}`];
  const isUnlocked = inv.totalPoints >= req;

  titleBadge.innerText = `TIER ${tierNum}`;
  statusText.innerText = isUnlocked ? `UNLOCKED (${inv[`t${tierNum}`]} PTS)` : `REQ ${req} PTS IN TAB`;

  if (tierNum > 1) {
    progressContainer.classList.remove('hidden');
    const pct = Math.min(100, Math.round((inv.totalPoints / req) * 100));
    progressBar.style.width = `${pct}%`;
  } else {
    progressContainer.classList.add('hidden');
  }

  const tierSkills = cat.skills.filter(s => s.tier === tierNum);
  skillsContainer.innerHTML = tierSkills.map(skill => {
    const rank = skillRanks[skill.id] || 0;
    const isAllocated = rank > 0;
    const rowClass = isAllocated ? "skill-row active" : (isUnlocked ? "skill-row" : "skill-row locked");

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
      <div onclick="toggleSkillCard('${skill.id}')" class="${rowClass} p-2 rounded-xl flex items-center justify-between gap-2 select-none cursor-pointer transition-all">
        <div class="flex items-center gap-2 min-w-0 flex-grow">
          <span class="text-base flex-shrink-0">${skill.icon}</span>
          <div class="min-w-0 flex-grow">
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-bold font-display truncate ${isAllocated ? 'text-amber-300' : 'text-slate-200'}">${skill.name}</span>
              
              <div class="flex items-center gap-0.5 bg-slate-900/90 px-1 py-0.5 rounded border border-slate-800 flex-shrink-0">
                <div class="rank-dot ${rank >= 1 ? 'active' : ''}"></div>
                <div class="rank-dot ${rank >= 2 ? 'active' : ''}"></div>
                <div class="rank-dot ${rank >= 3 ? 'active' : ''}"></div>
              </div>
            </div>
            
            <p class="text-[10px] text-emerald-400/90 truncate leading-tight mt-0.5">
              ${skill.buffs[0] || skill.debuffs[0] || ''}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-1.5 flex-shrink-0" onclick="event.stopPropagation()">
          <span class="text-[8px] font-pixel text-slate-400">${nextCostText}</span>
          <div class="flex items-center gap-0.5">
            <button type="button" onclick="downgradeSkill('${skill.id}', event)" ${rank === 0 ? 'disabled' : ''} class="btn-step w-5 h-5 rounded flex items-center justify-center text-[11px] font-bold text-slate-200">
              -
            </button>
            <button type="button" onclick="upgradeSkill('${skill.id}', event)" ${rank === 3 || (!isUnlocked && rank === 0) ? 'disabled' : ''} class="btn-step w-5 h-5 rounded flex items-center justify-center text-[11px] font-bold text-amber-300">
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

  // Top Bar Counters
  const hudPoints = document.getElementById('hud-total-points');
  const hudShards = document.getElementById('hud-total-shards');
  if (hudPoints) hudPoints.innerText = `${globalInv.points} pts`;
  if (hudShards) hudShards.innerText = `${globalInv.shards}`;

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
        <div class="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between gap-1 text-[11px]">
          <span class="truncate">${b.icon} ${b.text}</span>
          <span class="text-[8px] font-pixel px-1 rounded bg-emerald-400/20">R${b.rank}</span>
        </div>
      `).join('');

  const debuffsEl = document.getElementById('debuffs-list');
  debuffsEl.innerHTML = debuffs.length === 0 
    ? `<div class="text-[10px] text-slate-500 italic p-1.5 rounded card-sub">No tradeoffs</div>`
    : debuffs.map(d => `
        <div class="p-1.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center justify-between gap-1 text-[11px]">
          <span class="truncate">${d.icon} ${d.text}</span>
          <span class="text-[8px] font-pixel px-1 rounded bg-rose-400/20">R${d.rank}</span>
        </div>
      `).join('');
}

function render() {
  renderTabs();
  renderTierSegmentControls();
  renderActiveView();
  renderSummary();
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast-notification");
  document.getElementById("toast-text").innerText = message;
  
  if (type === "error") {
    toast.className = "fixed top-3 inset-x-0 mx-auto w-fit z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-rose-500/40 text-rose-300 shadow-2xl text-xs font-semibold toast-active";
  } else {
    toast.className = "fixed top-3 inset-x-0 mx-auto w-fit z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/40 text-emerald-300 shadow-2xl text-xs font-semibold toast-active";
  }

  setTimeout(() => { toast.classList.remove("toast-active"); }, 2000);
}

// Multi-Tab Presets Modal Handlers
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
