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
  currentCategoryKey = targetCategory; // Navigate directly to that category tab

  closeSuggestionsModal();
  showToast(`Applied ${preset.title}`);
  render();
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
      console.error("Invalid build parameter", e);
    }
  }
}

// Initial Boot: Load URL build, restore Farm ID from local storage, and render UI
loadSavedFarmId();
loadBuildFromURL();
render();
