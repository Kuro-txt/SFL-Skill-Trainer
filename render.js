function renderTabs() {
  const nav = document.getElementById("category-tabs");
  nav.innerHTML = Object.entries(SKILL_DATABASE).map(([key, cat]) => {
    const isActive = key === currentCategoryKey;
    const inv = getCategoryInvestments(key);
    return `
      <button type="button" onclick="setCategory('${key}')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition border flex items-center gap-1.5 cursor-pointer ${
        isActive
          ? 'bg-amber-400/15 border-amber-400 text-amber-300'
          : 'card-sub text-slate-400 hover:text-slate-200 hover:border-slate-700'
      }">
        <span class="text-sm">${cat.icon}</span>
        <span>${cat.name}</span>
        ${inv.totalPoints > 0 ? `<span class="px-1 py-0.1 rounded-full bg-amber-400/20 text-[8px] font-pixel text-amber-300 font-bold">${inv.totalPoints}p</span>` : ''}
        ${inv.totalShards > 0 ? `<span class="px-1 py-0.1 rounded-full bg-cyan-400/20 text-[8px] font-pixel text-cyan-300 font-bold">${inv.totalShards}🔷</span>` : ''}
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
      nextCostText = `Next: +${nextCost.points}P ${nextCost.shards > 0 ? `+${nextCost.shards}🔷` : ''}`;
    } else {
      nextCostText = "MAX RANK";
    }

    return `
      <div onclick="toggleSkillCard('${skill.id}')" class="${cardClass} p-2.5 rounded-lg flex flex-col justify-between select-none cursor-pointer transition-all">
        <div>
          <div class="flex items-center justify-between gap-1.5 mb-1.5">
            <div class="flex items-center gap-1.5 min-w-0">
              <span class="text-base flex-shrink-0">${skill.icon}</span>
              <span class="text-xs font-bold font-display truncate ${isAllocated ? 'text-amber-300' : 'text-slate-200'}">${skill.name}</span>
            </div>
            
            <div class="flex items-center gap-1 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">
              <div class="rank-dot ${rank >= 1 ? 'active' : ''}"></div>
              <div class="rank-dot ${rank >= 2 ? 'active' : ''}"></div>
              <div class="rank-dot ${rank >= 3 ? 'active' : ''}"></div>
              <span class="text-[9px] font-pixel text-slate-400 ml-1">R${rank}</span>
            </div>
          </div>

          <div class="space-y-0.5 text-[11px] mb-2">
            ${skill.buffs.map(b => `<p class="text-emerald-400/90 leading-tight">• ${b}</p>`).join('')}
            ${skill.debuffs.map(d => `<p class="text-rose-400 leading-tight">• ${d}</p>`).join('')}
          </div>
        </div>

        <div class="flex items-center justify-between pt-1.5 border-t border-slate-800/60 mt-1">
          <span class="text-[9px] font-pixel ${rank === 3 ? 'text-amber-400 font-bold' : 'text-slate-400'}">
            ${isTierUnlocked || isAllocated ? nextCostText : `REQ ${req}P`}
          </span>

          <div class="flex items-center gap-1" onclick="event.stopPropagation()">
            <button type="button" onclick="downgradeSkill('${skill.id}', event)" ${rank === 0 ? 'disabled' : ''} class="btn-step w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-slate-200">
              -
            </button>
            <button type="button" onclick="upgradeSkill('${skill.id}', event)" ${rank === 3 || (!isTierUnlocked && rank === 0) ? 'disabled' : ''} class="btn-step w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-amber-300">
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

  document.getElementById('hud-total-points').innerText = `${globalInv.points} pts`;
  document.getElementById('hud-total-shards').innerText = `${globalInv.shards}`;
  document.getElementById('tab-summary-points').innerText = catInv.totalPoints;
  document.getElementById('tab-summary-shards').innerText = catInv.totalShards;

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
    ? `<div class="text-[10px] text-slate-500 italic p-1.5 rounded card-sub">No ${cat.name} buffs active</div>`
    : buffs.map(b => `
        <div class="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between gap-1.5">
          <div class="flex items-center gap-1.5 min-w-0">
            <span>${b.icon}</span>
            <span class="truncate">${b.text}</span>
          </div>
          <span class="text-[8px] font-pixel px-1 py-0.2 rounded bg-emerald-400/20 text-emerald-300">R${b.rank}</span>
        </div>
      `).join('');

  const debuffsEl = document.getElementById('debuffs-list');
  debuffsEl.innerHTML = debuffs.length === 0
    ? `<div class="text-[10px] text-slate-500 italic p-1.5 rounded card-sub">No ${cat.name} tradeoffs</div>`
    : debuffs.map(d => `
        <div class="p-1.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center justify-between gap-1.5">
          <div class="flex items-center gap-1.5 min-w-0">
            <span>${d.icon}</span>
            <span class="truncate">${d.text}</span>
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
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast-notification");
  document.getElementById("toast-text").innerText = message;
  
  if (type === "error") {
    toast.className = "fixed bottom-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-rose-500/40 text-rose-300 shadow-xl text-xs font-semibold toast-active";
  } else if (type === "neutral") {
    toast.className = "fixed bottom-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-600 text-slate-300 shadow-xl text-xs font-semibold toast-active";
  } else {
    toast.className = "fixed bottom-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/40 text-emerald-300 shadow-xl text-xs font-semibold toast-active";
  }

  setTimeout(() => { toast.classList.remove("toast-active"); }, 2400);
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
