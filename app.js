let currentCategoryKey = "crops";
// Stores skill ranks: { skillId: rank } (1 to 3). Missing/0 means unlearned.
let skillRanks = {};

// Cost calculation per tier & target rank
function getRankCost(tier, targetRank) {
  if (targetRank === 1) {
    if (tier === 1) return { points: 1, shards: 0 };
    if (tier === 2) return { points: 2, shards: 0 };
    if (tier === 3) return { points: 3, shards: 0 };
  }
  if (targetRank === 2 || targetRank === 3) {
    if (tier === 1) return { points: 1, shards: 1 };
    if (tier === 2) return { points: 2, shards: 2 };
    if (tier === 3) return { points: 6, shards: 3 };
  }
  return { points: 0, shards: 0 };
}

// Cumulative points & shards spent on a skill up to rank R
function getCumulativeSkillCost(tier, rank) {
  let points = 0;
  let shards = 0;
  for (let r = 1; r <= rank; r++) {
    const cost = getRankCost(tier, r);
    points += cost.points;
    shards += cost.shards;
  }
  return { points, shards };
}

function getCategoryInvestments(catKey) {
  const cat = SKILL_DATABASE[catKey];
  let t1 = 0, t2 = 0, t3 = 0;
  let totalPoints = 0;
  let totalShards = 0;

  cat.skills.forEach(s => {
    const rank = skillRanks[s.id] || 0;
    if (rank > 0) {
      const cost = getCumulativeSkillCost(s.tier, rank);
      totalPoints += cost.points;
      totalShards += cost.shards;
      if (s.tier === 1) t1 += cost.points;
      if (s.tier === 2) t2 += cost.points;
      if (s.tier === 3) t3 += cost.points;
    }
  });

  return { t1, t2, t3, totalPoints, totalShards };
}

function getTotalGlobalInvestments() {
  let points = 0;
  let shards = 0;
  Object.keys(SKILL_DATABASE).forEach(catKey => {
    const inv = getCategoryInvestments(catKey);
    points += inv.totalPoints;
    shards += inv.totalShards;
  });
  return { points, shards };
}

// Clicking the card toggles between Rank 1 and unselected
function toggleSkillCard(skillId) {
  const cat = SKILL_DATABASE[currentCategoryKey];
  const skill = cat.skills.find(s => s.id === skillId);
  if (!skill) return;

  const currentRank = skillRanks[skillId] || 0;

  if (currentRank > 0) {
    // Unselect completely
    delete skillRanks[skillId];
    validateTierRequirements(currentCategoryKey);
  } else {
    // Allocate to Rank 1 if prerequisites are met
    const inv = getCategoryInvestments(currentCategoryKey);
    if (skill.tier === 2 && inv.totalPoints < cat.reqs.t2) return;
    if (skill.tier === 3 && inv.totalPoints < cat.reqs.t3) return;

    skillRanks[skillId] = 1;
  }

  render();
}

function upgradeSkill(skillId, event) {
  if (event) event.stopPropagation();
  const cat = SKILL_DATABASE[currentCategoryKey];
  const skill = cat.skills.find(s => s.id === skillId);
  if (!skill) return;

  const currentRank = skillRanks[skillId] || 0;
  if (currentRank >= 3) return;

  if (currentRank === 0) {
    const inv = getCategoryInvestments(currentCategoryKey);
    if (skill.tier === 2 && inv.totalPoints < cat.reqs.t2) return;
    if (skill.tier === 3 && inv.totalPoints < cat.reqs.t3) return;
  }

  skillRanks[skillId] = currentRank + 1;
  render();
}

function downgradeSkill(skillId, event) {
  if (event) event.stopPropagation();
  const currentRank = skillRanks[skillId] || 0;
  if (currentRank <= 0) return;

  if (currentRank === 1) {
    delete skillRanks[skillId];
  } else {
    skillRanks[skillId] = currentRank - 1;
  }

  validateTierRequirements(currentCategoryKey);
  render();
}

function validateTierRequirements(catKey) {
  const cat = SKILL_DATABASE[catKey];
  let inv = getCategoryInvestments(catKey);

  // Downgrade Tier 3 if requirement is broken
  if (inv.totalPoints < cat.reqs.t3) {
    cat.skills.filter(s => s.tier === 3).forEach(s => delete skillRanks[s.id]);
  }
  inv = getCategoryInvestments(catKey);
  // Downgrade Tier 2 if requirement is broken
  if (inv.totalPoints < cat.reqs.t2) {
    cat.skills.filter(s => s.tier === 2).forEach(s => delete skillRanks[s.id]);
  }
}

function resetCurrentCategory() {
  const cat = SKILL_DATABASE[currentCategoryKey];
  cat.skills.forEach(s => delete skillRanks[s.id]);
  showToast(`Reset ${cat.name}`);
  render();
}

function resetAllSkills() {
  skillRanks = {};
  showToast("All points & shards reset");
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
    let cardClass = isAllocated ? "skill-card active" : (isTierUnlocked ? "skill-card available" : "skill-card locked");

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
          <!-- Title & Rank Dots -->
          <div class="flex items-center justify-between gap-1.5 mb-1.5">
            <div class="flex items-center gap-1.5 min-w-0">
              <span class="text-base flex-shrink-0">${skill.icon}</span>
              <span class="text-xs font-bold font-display truncate ${isAllocated ? 'text-amber-300' : 'text-slate-200'}">${skill.name}</span>
            </div>
            
            <!-- 3-Dot Rank Display -->
            <div class="flex items-center gap-1 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">
              <div class="rank-dot ${rank >= 1 ? 'active' : ''}"></div>
              <div class="rank-dot ${rank >= 2 ? 'active' : ''}"></div>
              <div class="rank-dot ${rank >= 3 ? 'active' : ''}"></div>
              <span class="text-[9px] font-pixel text-slate-400 ml-1">R${rank}</span>
            </div>
          </div>

          <!-- Buff Descriptions -->
          <div class="space-y-0.5 text-[11px] mb-2">
            ${skill.buffs.map(b => `<p class="text-emerald-400/90 leading-tight">• ${b}</p>`).join('')}
            ${skill.debuffs.map(d => `<p class="text-rose-400 leading-tight">• ${d}</p>`).join('')}
          </div>
        </div>

        <!-- Action Stepper -->
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

  // Topbar HUD
  document.getElementById('hud-total-points').innerText = `${globalInv.points} pts`;
  document.getElementById('hud-total-shards').innerText = `${globalInv.shards}`;

  // Tab Sidebar Investment
  document.getElementById('tab-summary-points').innerText = catInv.totalPoints;
  document.getElementById('tab-summary-shards').innerText = catInv.totalShards;

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

  // Filter buffs & debuffs strictly to current active tab
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

function showToast(message) {
  const toast = document.getElementById("toast-notification");
  document.getElementById("toast-text").innerText = message;
  toast.className = "fixed bottom-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/40 text-emerald-300 shadow-xl text-xs font-semibold toast-active";
  setTimeout(() => { toast.classList.remove("toast-active"); }, 2000);
}

function exportBuildLink() {
  const encoded = btoa(JSON.stringify(skillRanks));
  const url = new URL(window.location.href);
  url.searchParams.set("build", encoded);
  navigator.clipboard.writeText(url.href);
  showToast("Build link copied!");
}

function loadBuildFromURL() {
  const params = new URLSearchParams(window.location.search);
  const build = params.get("build");
  if (build) {
    try {
      const decoded = JSON.parse(atob(build));
      if (typeof decoded === "object" && decoded !== null) {
        if (Array.isArray(decoded)) {
          skillRanks = {};
          decoded.forEach(id => skillRanks[id] = 1);
        } else {
          skillRanks = decoded;
        }
      }
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
  currentCat.skills.forEach(s => delete skillRanks[s.id]);
  preset.skills.forEach(skillId => skillRanks[skillId] = 1);

  validateTierRequirements(currentCategoryKey);
  closeSuggestionsModal();
  showToast(`Applied ${preset.title}`);
  render();
}

loadBuildFromURL();
render();
