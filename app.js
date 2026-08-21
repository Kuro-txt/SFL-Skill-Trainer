let currentCategoryKey = "crops";
let skillRanks = {};

function toggleSkillCard(skillId) {
  const cat = SKILL_DATABASE[currentCategoryKey];
  const skill = cat.skills.find(s => s.id === skillId);
  if (!skill) return;

  const currentRank = skillRanks[skillId] || 0;

  if (currentRank > 0) {
    delete skillRanks[skillId];
    validateTierRequirements(currentCategoryKey);
  } else {
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

function applyPreset(presetId, categoryKey) {
  const targetCategory = categoryKey || currentCategoryKey;
  const suggestions = (typeof SUGGESTIONS_DATABASE !== "undefined" && SUGGESTIONS_DATABASE[targetCategory]) || [];
  const preset = suggestions.find(p => p.id === presetId);
  if (!preset) return;

  const cat = SKILL_DATABASE[targetCategory];
  cat.skills.forEach(s => delete skillRanks[s.id]);
  preset.skills.forEach(skillId => skillRanks[skillId] = 1);

  validateTierRequirements(targetCategory);
  currentCategoryKey = targetCategory;

  closeSuggestionsModal();
  showToast(`Applied ${preset.title}`);
  render();
}

// --- Short Link Generation Engine ---
function exportBuildLink(tabOnly = false) {
  const targetSkills = tabOnly 
    ? SKILL_DATABASE[currentCategoryKey].skills.map(s => s.id) 
    : Object.keys(skillRanks);

  // Short format: "c01.2_m04.1" (shortCode.rank)
  const encodedParts = [];
  targetSkills.forEach(skillId => {
    const rank = skillRanks[skillId];
    const code = SKILL_SHORT_MAP[skillId];
    if (rank && code) {
      encodedParts.push(`${code}.${rank}`);
    }
  });

  const url = new URL(window.location.origin + window.location.pathname);
  if (encodedParts.length > 0) {
    url.searchParams.set("b", encodedParts.join('_'));
  }
  if (tabOnly) {
    url.searchParams.set("t", currentCategoryKey);
  }

  navigator.clipboard.writeText(url.href);
  closeShareModal();
  showToast(tabOnly ? `Copied ${SKILL_DATABASE[currentCategoryKey].name} short link!` : "Copied full build short link!");
}

function loadBuildFromURL() {
  const params = new URLSearchParams(window.location.search);
  const compressed = params.get("b");
  const tabParam = params.get("t");

  if (tabParam && SKILL_DATABASE[tabParam]) {
    currentCategoryKey = tabParam;
  }

  if (compressed) {
    try {
      skillRanks = {};
      const tokens = compressed.split('_');
      tokens.forEach(tok => {
        const [code, rankStr] = tok.split('.');
        const skillId = SHORT_TO_SKILL_MAP[code];
        const rank = parseInt(rankStr, 10);
        if (skillId && rank >= 1 && rank <= 3) {
          skillRanks[skillId] = rank;
        }
      });
      Object.keys(SKILL_DATABASE).forEach(validateTierRequirements);
    } catch (e) {
      console.error("Failed to parse short build string", e);
    }
  }
}

// Modal Handlers
function openShareModal() {
  const modal = document.getElementById("share-modal");
  const tabTitle = document.getElementById("share-tab-title");
  if (tabTitle) {
    tabTitle.innerText = `Share ${SKILL_DATABASE[currentCategoryKey].name} Only`;
  }
  modal.style.display = "flex";
}

function closeShareModal() {
  document.getElementById("share-modal").style.display = "none";
}

function onShareBackdropClick(event) {
  if (event.target.id === "share-modal") closeShareModal();
}

// Boot
loadSavedFarmId();
loadBuildFromURL();
render();
