const FARM_STORAGE_KEY = "sfl_farm_id";

function loadSavedFarmId() {
  const savedId = localStorage.getItem(FARM_STORAGE_KEY);
  if (savedId) {
    const input = document.getElementById("farm-id-input");
    if (input) input.value = savedId;
  }
}

async function fetchFarmSkills(event) {
  if (event) event.preventDefault();

  const input = document.getElementById("farm-id-input");
  const farmId = input.value.trim();
  const fetchBtn = document.getElementById("fetch-btn");

  if (!farmId) return;

  localStorage.setItem(FARM_STORAGE_KEY, farmId);

  const originalBtnText = fetchBtn.innerHTML;
  fetchBtn.disabled = true;
  fetchBtn.innerHTML = `<span>⏳</span> Syncing...`;

  try {
    const res = await fetch(`/api/farm?id=${encodeURIComponent(farmId)}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to load farm.");
    }

    const rawSkills = data?.farm?.bumpkin?.skills || data?.bumpkin?.skills || {};
    const skillEntries = Object.entries(rawSkills);

    if (skillEntries.length === 0) {
      showToast(`Farm #${farmId} has no skills allocated.`, "neutral");
    } else {
      skillRanks = {};
      let matchedCount = 0;

      skillEntries.forEach(([skillName, rankValue]) => {
        const normalized = skillName.trim().toLowerCase();
        const skillId = SKILL_NAME_LOOKUP[normalized];

        if (skillId) {
          const rank = Math.min(3, Math.max(1, Number(rankValue) || 1));
          skillRanks[skillId] = rank;
          matchedCount++;
        }
      });

      Object.keys(SKILL_DATABASE).forEach(validateTierRequirements);
      saveStateToLocalStorage();

      const totals = getTotalGlobalInvestments();
      showToast(`Synced Farm #${farmId}: ${matchedCount} skills (${totals.points} pts, ${totals.shards} shards)`);
    }

    render();
  } catch (err) {
    showToast(err.message || "Failed to sync farm data", "error");
  } finally {
    fetchBtn.disabled = false;
    fetchBtn.innerHTML = originalBtnText;
  }
}
