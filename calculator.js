// Dynamic lookup map: normalized skill name -> skill ID
const SKILL_NAME_LOOKUP = {};
Object.values(SKILL_DATABASE).forEach(cat => {
  cat.skills.forEach(skill => {
    SKILL_NAME_LOOKUP[skill.name.trim().toLowerCase()] = skill.id;
  });
});

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

// Points & shards spent in a single category
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

// Total points & shards spent across all categories
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

// Enforces tier prerequisites and refunds broken branches
function validateTierRequirements(catKey) {
  const cat = SKILL_DATABASE[catKey];
  let inv = getCategoryInvestments(catKey);

  if (inv.totalPoints < cat.reqs.t3) {
    cat.skills.filter(s => s.tier === 3).forEach(s => delete skillRanks[s.id]);
  }
  inv = getCategoryInvestments(catKey);
  if (inv.totalPoints < cat.reqs.t2) {
    cat.skills.filter(s => s.tier === 2).forEach(s => delete skillRanks[s.id]);
  }
}
