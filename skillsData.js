const SKILL_DATABASE = {
  crops: {
    name: "Crops",
    icon: "🌾",
    reqs: { t1: 0, t2: 3, t3: 7 },
    skills: [
      { id: "green_thumb", name: "Green Thumb", tier: 1, cost: 1, icon: "🌱", buffs: ["-5% plot crop growth time"], debuffs: [] },
      { id: "young_farmer", name: "Young Farmer", tier: 1, cost: 1, icon: "🧑‍🌾", buffs: ["+0.1 Basic Crop yield"], debuffs: [] },
      { id: "experienced_farmer", name: "Experienced Farmer", tier: 1, cost: 1, icon: "🚜", buffs: ["+0.1 Medium Crop yield"], debuffs: [] },
      { id: "old_farmer", name: "Old Farmer", tier: 1, cost: 1, icon: "👴", buffs: ["+0.1 Advanced Crop yield"], debuffs: [] },
      { id: "chonky_scarecrow", name: "Chonky Scarecrow", tier: 1, cost: 1, icon: "🎃", buffs: ["Scarecrow AOE to 7x7", "-10% basic crop growth time"], debuffs: [] },
      { id: "bettys_friend", name: "Betty's Friend", tier: 1, cost: 1, icon: "💰", buffs: ["+30% Betty Coin delivery revenue"], debuffs: [] },

      { id: "strong_roots", name: "Strong Roots", tier: 2, cost: 2, icon: "🪵", buffs: ["-10% Advanced crop growth time"], debuffs: [] },
      { id: "coin_swindler", name: "Coin Swindler", tier: 2, cost: 2, icon: "🪙", buffs: ["+10% coins when selling plot crops at Market"], debuffs: [] },
      { id: "golden_sunflower", name: "Golden Sunflower", tier: 2, cost: 2, icon: "🌻", buffs: ["1/700 chance for 0.35 gold on harvest"], debuffs: [] },
      { id: "horror_mike", name: "Horror Mike", tier: 2, cost: 2, icon: "👻", buffs: ["Scary Mike AOE to 7x7", "+0.1 medium crop yield"], debuffs: [] },
      { id: "lauries_gains", name: "Laurie's Gains", tier: 2, cost: 2, icon: "🦅", buffs: ["Laurie Crow AOE to 7x7", "+0.1 advanced crop yield"], debuffs: [] },

      { id: "instant_growth", name: "Instant Growth", tier: 3, cost: 3, icon: "⚡", buffs: ["Instantly harvest all currently growing plot crops"], debuffs: [] },
      { id: "acre_farm", name: "Acre Farm", tier: 3, cost: 3, icon: "🏡", buffs: ["+1 Advanced crop yield"], debuffs: ["-0.5 Basic and Medium crop yield"] },
      { id: "hectare_farm", name: "Hectare Farm", tier: 3, cost: 3, icon: "🏞️", buffs: ["+1 Basic and Medium crop yield"], debuffs: ["-0.5 Advanced crop yield"] }
    ]
  },

  trees: {
    name: "Trees",
    icon: "🪓",
    reqs: { t1: 0, t2: 2, t3: 5 },
    skills: [
      { id: "lumberjacks_extra", name: "Lumberjack's Extra", tier: 1, cost: 1, icon: "🪵", buffs: ["+0.1 wood yield"], debuffs: [] },
      { id: "tree_charge", name: "Tree Charge", tier: 1, cost: 1, icon: "⚡", buffs: ["-10% tree growth time"], debuffs: [] },
      { id: "more_axes", name: "More Axes", tier: 1, cost: 1, icon: "🪓", buffs: ["+50 axe stock"], debuffs: [] },
      { id: "insta_chop", name: "Insta-Chop", tier: 1, cost: 1, icon: "✨", buffs: ["1 Tap Trees"], debuffs: [] },

      { id: "tough_tree", name: "Tough Tree", tier: 2, cost: 2, icon: "🌲", buffs: ["1/10 chance of x3 wood yield"], debuffs: [] },
      { id: "fellers_discount", name: "Feller's Discount", tier: 2, cost: 2, icon: "🏷️", buffs: ["-20% axe coin cost"], debuffs: [] },
      { id: "money_tree", name: "Money Tree", tier: 2, cost: 2, icon: "💸", buffs: ["1% chance of finding 200 Coins"], debuffs: [] },

      { id: "tree_turnaround", name: "Tree Turnaround", tier: 3, cost: 3, icon: "🔄", buffs: ["15% chance for trees to grow instantly"], debuffs: [] },
      { id: "tree_blitz", name: "Tree Blitz", tier: 3, cost: 3, icon: "🌪️", buffs: ["Ability to make all trees instantly grow"], debuffs: [] }
    ]
  },

  fishing: {
    name: "Fishing",
    icon: "🎣",
    reqs: { t1: 0, t2: 2, t3: 5 },
    skills: [
      { id: "fishermans_5_fold", name: "Fisherman's 5 Fold", tier: 1, cost: 1, icon: "🎣", buffs: ["+5 daily fishing reels"], debuffs: [] },
      { id: "fishy_chance", name: "Fishy Chance", tier: 1, cost: 1, icon: "🐟", buffs: ["10% chance of +1 basic fish"], debuffs: [] },
      { id: "fishy_roll", name: "Fishy Roll", tier: 1, cost: 1, icon: "🐡", buffs: ["10% chance of +1 advanced fish"], debuffs: [] },
      { id: "reel_deal", name: "Reel Deal", tier: 1, cost: 1, icon: "🏷️", buffs: ["-50% rod coin cost"], debuffs: [] },

      { id: "fishermans_10_fold", name: "Fisherman's 10 Fold", tier: 2, cost: 2, icon: "🎣", buffs: ["+10 daily fishing reels"], debuffs: [] },
      { id: "fishy_fortune", name: "Fishy Fortune", tier: 2, cost: 2, icon: "💰", buffs: ["+100% coins from Corale's deliveries"], debuffs: [] },
      { id: "fishy_gamble", name: "Fishy Gamble", tier: 2, cost: 2, icon: "🎲", buffs: ["20% chance of +1 expert fish"], debuffs: [] },

      { id: "frenzied_fish", name: "Frenzied Fish", tier: 3, cost: 3, icon: "🦈", buffs: ["During frenzy: +1 fish and 50% chance of +1 fish"], debuffs: [] },
      { id: "more_with_less", name: "More With Less", tier: 3, cost: 3, icon: "⚖️", buffs: ["+25 daily fishing reels"], debuffs: ["+1 Rod cost per cast"] },
      { id: "fishy_feast", name: "Fishy Feast", tier: 3, cost: 3, icon: "🍲", buffs: ["+20% Bumpkin XP from Fish"], debuffs: [] }
    ]
  },

  mining: {
    name: "Mining",
    icon: "⛏️",
    reqs: { t1: 0, t2: 3, t3: 7 },
    skills: [
      { id: "rock_n_roll", name: "Rock'N'Roll", tier: 1, cost: 1, icon: "🪨", buffs: ["+0.1 Stone Yield"], debuffs: [] },
      { id: "iron_bumpkin", name: "Iron Bumpkin", tier: 1, cost: 1, icon: "🧱", buffs: ["+0.1 Iron Yield"], debuffs: [] },
      { id: "speed_miner", name: "Speed Miner", tier: 1, cost: 1, icon: "⚡", buffs: ["-20% Stone recovery time"], debuffs: [] },
      { id: "tap_prospector", name: "Tap Prospector", tier: 1, cost: 1, icon: "✨", buffs: ["1 tap small mineral nodes"], debuffs: [] },
      { id: "forge_ward_profits", name: "Forge-Ward Profits", tier: 1, cost: 1, icon: "💰", buffs: ["+20% Blacksmith deliveries revenue"], debuffs: [] },

      { id: "iron_hustle", name: "Iron Hustle", tier: 2, cost: 2, icon: "⏱️", buffs: ["-30% Iron recovery time"], debuffs: [] },
      { id: "frugal_miner", name: "Frugal Miner", tier: 2, cost: 2, icon: "🏷️", buffs: ["-20% all pickaxes coin cost"], debuffs: [] },
      { id: "rocky_favor", name: "Rocky Favor", tier: 2, cost: 2, icon: "🪨", buffs: ["+1 Stone yield"], debuffs: ["-0.5 Iron yield"] },
      { id: "fire_kissed", name: "Fire Kissed", tier: 2, cost: 2, icon: "🔥", buffs: ["+1 Crimstone yield on 5th consecutive mine"], debuffs: [] },
      { id: "midas_sprint", name: "Midas Sprint", tier: 2, cost: 2, icon: "🪙", buffs: ["-10% Gold recovery time"], debuffs: [] },

      { id: "ferrous_favor", name: "Ferrous Favor", tier: 3, cost: 3, icon: "⚒️", buffs: ["+1 Iron yield"], debuffs: ["-0.5 Stone yield"] },
      { id: "golden_touch", name: "Golden Touch", tier: 3, cost: 3, icon: "👑", buffs: ["+0.5 Gold Yield"], debuffs: [] },
      { id: "more_picks", name: "More Picks", tier: 3, cost: 3, icon: "⛏️", buffs: ["+70 Pick, +20 Stone Pick, +7 Iron Pick, +2 Gold Pick stock"], debuffs: [] },
      { id: "fireside_alchemist", name: "Fireside Alchemist", tier: 3, cost: 3, icon: "🧪", buffs: ["-15% Crimstone recovery time"], debuffs: [] },
      { id: "midas_rush", name: "Midas Rush", tier: 3, cost: 3, icon: "🏆", buffs: ["-20% Gold recovery time"], debuffs: [] }
    ]
  },

  cooking: {
    name: "Cooking",
    icon: "🍳",
    reqs: { t1: 0, t2: 2, t3: 5 },
    skills: [
      { id: "fast_feasts", name: "Fast Feasts", tier: 1, cost: 1, icon: "⏱️", buffs: ["-10% Firepit and Kitchen cooking time"], debuffs: [] },
      { id: "nom_nom", name: "Nom Nom", tier: 1, cost: 1, icon: "😋", buffs: ["+10% Food deliveries revenue"], debuffs: [] },
      { id: "munching_mastery", name: "Munching Mastery", tier: 1, cost: 1, icon: "🧠", buffs: ["+5% Bumpkin XP"], debuffs: [] },
      { id: "swift_sizzle", name: "Swift Sizzle", tier: 1, cost: 1, icon: "🔥", buffs: ["-40% Fire Pit cooking time with oil"], debuffs: [] },

      { id: "frosted_cakes", name: "Frosted Cakes", tier: 2, cost: 2, icon: "🎂", buffs: ["-10% Cakes cooking time"], debuffs: [] },
      { id: "juicy_boost", name: "Juicy Boost", tier: 2, cost: 2, icon: "🧃", buffs: ["+10% Bumpkin XP from drinks"], debuffs: [] },
      { id: "turbo_fry", name: "Turbo Fry", tier: 2, cost: 2, icon: "🍟", buffs: ["-50% Kitchen cooking time with oil"], debuffs: [] },
      { id: "drive_through_deli", name: "Drive-Through Deli", tier: 2, cost: 2, icon: "🥪", buffs: ["+15% Bumpkin XP from Deli"], debuffs: [] },

      { id: "instant_gratification", name: "Instant Gratification", tier: 3, cost: 3, icon: "⚡", buffs: ["Instantly finishes all cooking meals"], debuffs: [] },
      { id: "double_nom", name: "Double Nom", tier: 3, cost: 3, icon: "🍽️", buffs: ["+1 food from cooking"], debuffs: ["2x ingredients required"] },
      { id: "fiery_jackpot", name: "Fiery Jackpot", tier: 3, cost: 3, icon: "🎰", buffs: ["+20% Chance of +1 food from Firepit"], debuffs: [] },
      { id: "fry_frenzy", name: "Fry Frenzy", tier: 3, cost: 3, icon: "🌪️", buffs: ["-60% Deli cooking time with oil"], debuffs: [] }
    ]
  },

  compost: {
    name: "Compost",
    icon: "🪱",
    reqs: { t1: 0, t2: 3, t3: 7 },
    skills: [
      { id: "efficient_bin", name: "Efficient Bin", tier: 1, cost: 1, icon: "📦", buffs: ["+5 Sprout Mix"], debuffs: [] },
      { id: "turbo_charged", name: "Turbo Charged", tier: 1, cost: 1, icon: "⚡", buffs: ["+5 Fruitful Blend"], debuffs: [] },
      { id: "wormy_treat", name: "Wormy Treat", tier: 1, cost: 1, icon: "🪱", buffs: ["+1 Worm"], debuffs: [] },
      { id: "feathery_business", name: "Feathery Business", tier: 1, cost: 1, icon: "🪶", buffs: ["Use feathers instead of eggs to boost composters"], debuffs: ["2x feathers to boost composters"] },
      { id: "sprout_surge", name: "Sprout Surge", tier: 1, cost: 1, icon: "🌱", buffs: ["Put Sprout Mix on all plots"], debuffs: [] },
      { id: "blend_tastic", name: "Blend-tastic", tier: 1, cost: 1, icon: "🧪", buffs: ["Put Fruitful Blend on all plots"], debuffs: [] },

      { id: "premium_worms", name: "Premium Worms", tier: 2, cost: 2, icon: "🐛", buffs: ["+10 Rapid Root"], debuffs: [] },
      { id: "fruitful_bounty", name: "Fruitful Bounty", tier: 2, cost: 2, icon: "🍎", buffs: ["Double Fruitful Blend's Effect"], debuffs: [] },
      { id: "swift_decomposer", name: "Swift Decomposer", tier: 2, cost: 2, icon: "⏱️", buffs: ["-10% compost time"], debuffs: [] },
      { id: "composting_bonanza", name: "Composting Bonanza", tier: 2, cost: 2, icon: "🚀", buffs: ["Speed up composters by additional 1hr on boost"], debuffs: ["2x resources to boost"] },
      { id: "root_rocket", name: "Root Rocket", tier: 2, cost: 2, icon: "🪴", buffs: ["Put Rapid Root on all plots"], debuffs: [] },

      { id: "composting_overhaul", name: "Composting Overhaul", tier: 3, cost: 3, icon: "⚙️", buffs: ["+2 Worms"], debuffs: [] },
      { id: "composting_revamp", name: "Composting Revamp", tier: 3, cost: 3, icon: "✨", buffs: ["+5 fertilisers"], debuffs: ["-2 Worms"] }
    ]
  },

  aging: {
    name: "Aging",
    icon: "🧂",
    reqs: { t1: 0, t2: 3, t3: 7 },
    skills: [
      { id: "cheap_rakes", name: "Cheap Rakes", tier: 1, cost: 1, icon: "🏷️", buffs: ["-20% salt rake coin cost"], debuffs: [] },
      { id: "speedy_aging", name: "Speedy Aging", tier: 1, cost: 1, icon: "⏱️", buffs: ["-10% Fish Aging time"], debuffs: [] },
      { id: "salty_seas", name: "Salty Seas", tier: 1, cost: 1, icon: "🌊", buffs: ["-10% salt charge replenishment time"], debuffs: [] },
      { id: "wide_rakes", name: "Wide Rakes", tier: 1, cost: 1, icon: "🧹", buffs: ["+2 Salt per harvest"], debuffs: [] },
      { id: "bacalhau", name: "Bacalhau", tier: 1, cost: 1, icon: "🐟", buffs: ["+1 Bait yield from fermentation rack"], debuffs: [] },

      { id: "fish_smoking", name: "Fish Smoking", tier: 2, cost: 2, icon: "💨", buffs: ["Doubled chance Aged Fish becomes Prime Aged"], debuffs: [] },
      { id: "refiner", name: "Refiner", tier: 2, cost: 2, icon: "🧂", buffs: ["15% chance of +1 Refined Salt when refining"], debuffs: [] },
      { id: "sea_blessed", name: "Sea Blessed", tier: 2, cost: 2, icon: "✨", buffs: ["5% chance to restore 1 charge to 4 Salt Nodes on harvest"], debuffs: [] },

      { id: "ager", name: "Ager", tier: 3, cost: 3, icon: "🏛️", buffs: ["2× output from Aging Shed Racks"], debuffs: ["2× Aging Shed inputs"] },
      { id: "salt_surge", name: "Salt Surge", tier: 3, cost: 3, icon: "⚡", buffs: ["Recharge all Salt Nodes to max"], debuffs: [] }
    ]
  },

  fruit_patch: {
    name: "Fruit Patch",
    icon: "🍎",
    reqs: { t1: 0, t2: 2, t3: 5 },
    skills: [
      { id: "fruitful_fumble", name: "Fruitful Fumble", tier: 1, cost: 1, icon: "🧺", buffs: ["+0.1 Fruit Patch yield"], debuffs: [] },
      { id: "fruity_heaven", name: "Fruity Heaven", tier: 1, cost: 1, icon: "🏷️", buffs: ["-10% Fruit Patch seeds cost"], debuffs: [] },
      { id: "fruity_profit", name: "Fruity Profit", tier: 1, cost: 1, icon: "💰", buffs: ["+50% coins from Tango's deliveries"], debuffs: [] },
      { id: "loyal_macaw", name: "Loyal Macaw", tier: 1, cost: 1, icon: "🦜", buffs: ["Double Macaw's effect"], debuffs: [] },
      { id: "no_axe_no_worries", name: "No Axe No Worries", tier: 1, cost: 1, icon: "🪓", buffs: ["Chop fruit branches/stems without axes"], debuffs: ["-1 wood from branches/stems"] },

      { id: "catchup", name: "Catchup", tier: 2, cost: 2, icon: "⏱️", buffs: ["-10% Fruit Patch growth time"], debuffs: [] },
      { id: "fruity_woody", name: "Fruity Woody", tier: 2, cost: 2, icon: "🪵", buffs: ["+1 wood from fruit branches and stems"], debuffs: [] },
      { id: "pear_turbocharge", name: "Pear Turbocharge", tier: 2, cost: 2, icon: "🍐", buffs: ["Double Immortal Pear's effect"], debuffs: [] },
      { id: "crime_fruit", name: "Crime Fruit", tier: 2, cost: 2, icon: "🍋", buffs: ["+10 Tomato and Lemon seeds stock"], debuffs: [] },

      { id: "generous_orchard", name: "Generous Orchard", tier: 3, cost: 3, icon: "🌳", buffs: ["20% chance of +1 Fruit Patch yield"], debuffs: [] },
      { id: "long_pickings", name: "Long Pickings", tier: 3, cost: 3, icon: "🍌", buffs: ["-25% Apple and Banana growth time"], debuffs: ["+10% growth time for all other fruits"] },
      { id: "short_pickings", name: "Short Pickings", tier: 3, cost: 3, icon: "🍊", buffs: ["-25% Blueberry and Orange growth time"], debuffs: ["+10% growth time for all other fruits"] },
      { id: "zesty_vibes", name: "Zesty Vibes", tier: 3, cost: 3, icon: "🍅", buffs: ["+1 Tomato and Lemon yield"], debuffs: ["-0.25 yield for all other fruits"] }
    ]
  },

  animals: {
    name: "Animals",
    icon: "🐄",
    reqs: { t1: 0, t2: 4, t3: 8 },
    skills: [
      { id: "efficient_feeding", name: "Efficient Feeding", tier: 1, cost: 1, icon: "🌾", buffs: ["-5% feed to feed all animals"], debuffs: [] },
      { id: "restless_animals", name: "Restless Animals", tier: 1, cost: 1, icon: "⏰", buffs: ["-10% Animal sleep time"], debuffs: [] },
      { id: "fine_fibers", name: "Fine Fibers", tier: 1, cost: 1, icon: "🧶", buffs: ["+0.1 Feather, Leather and Merino Wool yield"], debuffs: [] },
      { id: "bountiful_bounties", name: "Bountiful Bounties", tier: 1, cost: 1, icon: "💰", buffs: ["+50% Coins from Animal Bounties"], debuffs: [] },
      { id: "double_bale", name: "Double Bale", tier: 1, cost: 1, icon: "📦", buffs: ["Double Bale's Effect"], debuffs: [] },
      { id: "bale_economy", name: "Bale Economy", tier: 1, cost: 1, icon: "🥛", buffs: ["Bale affects milk and wool production"], debuffs: [] },
      { id: "featherweight", name: "Featherweight", tier: 1, cost: 1, icon: "🪶", buffs: ["+0.35 Feather yield"], debuffs: ["-0.1 Leather & Merino Wool yield"] },

      { id: "abundant_harvest", name: "Abundant Harvest", tier: 2, cost: 2, icon: "🧺", buffs: ["+0.2 Egg, Wool and Milk yield"], debuffs: [] },
      { id: "heartwarming_instruments", name: "Heartwarming Instruments", tier: 2, cost: 2, icon: "🎻", buffs: ["+50% Animal XP from Affection tools"], debuffs: [] },
      { id: "kale_mix", name: "Kale Mix", tier: 2, cost: 2, icon: "🥗", buffs: ["Mixed Grain requires 3 kale instead"], debuffs: [] },
      { id: "alternate_medicine", name: "Alternate Medicine", tier: 2, cost: 2, icon: "💊", buffs: ["Barn Delight requires 1 less Lemon & Honey"], debuffs: [] },
      { id: "healthy_livestock", name: "Healthy Livestock", tier: 2, cost: 2, icon: "❤️", buffs: ["-50% chance of sickness"], debuffs: [] },
      { id: "merino_whisperer", name: "Merino Whisperer", tier: 2, cost: 2, icon: "🐑", buffs: ["+0.35 Merino Wool yield"], debuffs: ["-0.1 Leather & Feather yield"] },

      { id: "clucky_grazing", name: "Clucky Grazing", tier: 3, cost: 3, icon: "🐔", buffs: ["-25% feed to feed Chickens"], debuffs: ["+50% feed to feed other animals"] },
      { id: "sheepwise_diet", name: "Sheepwise Diet", tier: 3, cost: 3, icon: "🐑", buffs: ["-25% feed to feed Sheep"], debuffs: ["+50% feed to feed other animals"] },
      { id: "cow_smart_nutrition", name: "Cow-Smart Nutrition", tier: 3, cost: 3, icon: "🐄", buffs: ["-25% feed to feed Cows"], debuffs: ["+50% feed to feed other animals"] },
      { id: "chonky_feed", name: "Chonky Feed", tier: 3, cost: 3, icon: "🍖", buffs: ["2x animal XP from animal feed"], debuffs: ["+50% feed to feed all animals"] },
      { id: "leathercraft_mastery", name: "Leathercraft Mastery", tier: 3, cost: 3, icon: "🥋", buffs: ["+0.35 Leather yield"], debuffs: ["-0.1 Feather & Merino Wool yield"] },
      { id: "barnyard_rouse", name: "Barnyard Rouse", tier: 3, cost: 3, icon: "🔔", buffs: ["Instantly wakes up all animals"], debuffs: [] }
    ]
  },

  bees_flowers: {
    name: "Bees & Flowers",
    icon: "🐝",
    reqs: { t1: 0, t2: 2, t3: 5 },
    skills: [
      { id: "sweet_bonus", name: "Sweet Bonus", tier: 1, cost: 1, icon: "🍯", buffs: ["+0.1 Honey per hive"], debuffs: [] },
      { id: "hyper_bees", name: "Hyper Bees", tier: 1, cost: 1, icon: "⚡", buffs: ["+0.1 Honey production speed"], debuffs: [] },
      { id: "blooming_boost", name: "Blooming Boost", tier: 1, cost: 1, icon: "🌸", buffs: ["-10% Flower growth time"], debuffs: [] },
      { id: "flower_sale", name: "Flower Sale", tier: 1, cost: 1, icon: "🏷️", buffs: ["-20% Flower Seeds cost"], debuffs: [] },

      { id: "buzzworthy_treats", name: "Buzzworthy Treats", tier: 2, cost: 2, icon: "🥞", buffs: ["+10% Bumpkin XP from Honey Foods"], debuffs: [] },
      { id: "blossom_bonding", name: "Blossom Bonding", tier: 2, cost: 2, icon: "💐", buffs: ["+2 relationship points for gifting flowers"], debuffs: [] },
      { id: "pollen_power_up", name: "Pollen Power Up", tier: 2, cost: 2, icon: "🌼", buffs: ["+0.1 crop yield after pollination (total +0.3)"], debuffs: [] },
      { id: "petalled_perk", name: "Petalled Perk", tier: 2, cost: 2, icon: "🌺", buffs: ["10% chance of +1 Flower"], debuffs: [] },

      { id: "bee_collective", name: "Bee Collective", tier: 3, cost: 3, icon: "🐝", buffs: ["+20% Bee Swarm chance"], debuffs: [] },
      { id: "flower_power", name: "Flower Power", tier: 3, cost: 3, icon: "🌻", buffs: ["-20% Flower growth time"], debuffs: [] },
      { id: "flowery_abode", name: "Flowery Abode", tier: 3, cost: 3, icon: "🏡", buffs: ["+0.5 Honey production speed"], debuffs: ["+50% Flower growth time"] },
      { id: "petal_blessed", name: "Petal Blessed", tier: 3, cost: 3, icon: "✨", buffs: ["Instantly harvests all currently growing flowers"], debuffs: [] }
    ]
  },

  greenhouse: {
    name: "Greenhouse",
    icon: "🏡",
    reqs: { t1: 0, t2: 2, t3: 5 },
    skills: [
      { id: "glass_room", name: "Glass Room", tier: 1, cost: 1, icon: "🪟", buffs: ["+0.1 Greenhouse produce yield"], debuffs: [] },
      { id: "seedy_business", name: "Seedy Business", tier: 1, cost: 1, icon: "🏷️", buffs: ["-15% Greenhouse seeds cost"], debuffs: [] },
      { id: "rice_and_shine", name: "Rice and Shine", tier: 1, cost: 1, icon: "🌾", buffs: ["-5% growth time for greenhouse produce"], debuffs: [] },
      { id: "victorias_secretary", name: "Victoria's Secretary", tier: 1, cost: 1, icon: "💼", buffs: ["+50% Coins from Victoria's deliveries"], debuffs: [] },

      { id: "olive_express", name: "Olive Express", tier: 2, cost: 2, icon: "🫒", buffs: ["-10% Olive growth time"], debuffs: [] },
      { id: "rice_rocket", name: "Rice Rocket", tier: 2, cost: 2, icon: "🚀", buffs: ["-10% Rice growth time"], debuffs: [] },
      { id: "vine_velocity", name: "Vine Velocity", tier: 2, cost: 2, icon: "🍇", buffs: ["-10% Grape growth time"], debuffs: [] },
      { id: "seeded_bounty", name: "Seeded Bounty", tier: 2, cost: 2, icon: "🌿", buffs: ["+0.5 Greenhouse produce yield", "+1 seed to plant"], debuffs: [] },

      { id: "greenhouse_guru", name: "Greenhouse Guru", tier: 3, cost: 3, icon: "🧘", buffs: ["Instantly finishes all growing greenhouse produce"], debuffs: [] },
      { id: "greenhouse_gamble", name: "Greenhouse Gamble", tier: 3, cost: 3, icon: "🎲", buffs: ["25% chance of +1 greenhouse produce"], debuffs: [] },
      { id: "slick_saver", name: "Slick Saver", tier: 3, cost: 3, icon: "🛢️", buffs: ["-1 Oil to grow greenhouse produce"], debuffs: [] },
      { id: "greasy_plants", name: "Greasy Plants", tier: 3, cost: 3, icon: "🌱", buffs: ["+1 Greenhouse produce yield"], debuffs: ["+100% Oil consumption in greenhouse"] }
    ]
  },

  machinery: {
    name: "Machinery",
    icon: "⚙️",
    reqs: { t1: 0, t2: 2, t3: 5 },
    skills: [
      { id: "crop_extension_module_i", name: "Crop Extension Module I", tier: 1, cost: 1, icon: "📦", buffs: ["Allow Rhubarb and Zucchini in crop machine"], debuffs: [] },
      { id: "crop_processor_unit", name: "Crop Processor Unit", tier: 1, cost: 1, icon: "⚡", buffs: ["-5% Crop Machine growth time"], debuffs: ["+10% Oil consumption"] },
      { id: "oil_gadget", name: "Oil Gadget", tier: 1, cost: 1, icon: "🛢️", buffs: ["-10% Oil consumption in Crop Machine"], debuffs: [] },
      { id: "oil_extraction", name: "Oil Extraction", tier: 1, cost: 1, icon: "⛽", buffs: ["+1 Oil when collecting from reserves"], debuffs: [] },
      { id: "leak_proof_tank", name: "Leak-Proof Tank", tier: 1, cost: 1, icon: "🛡️", buffs: ["Triple oil tank capacity in crop machine"], debuffs: [] },

      { id: "crop_extension_module_ii", name: "Crop Extension Module II", tier: 2, cost: 2, icon: "🥕", buffs: ["Allow Carrot and Cabbage in crop machine"], debuffs: [] },
      { id: "crop_extension_module_iii", name: "Crop Extension Module III", tier: 2, cost: 2, icon: "🥦", buffs: ["Allow Yam and Broccoli in crop machine"], debuffs: [] },
      { id: "rapid_rig", name: "Rapid Rig", tier: 2, cost: 2, icon: "💨", buffs: ["-20% Crop Machine growth time"], debuffs: ["+40% Oil consumption"] },
      { id: "oil_be_back", name: "Oil Be Back", tier: 2, cost: 2, icon: "⏱️", buffs: ["-20% Oil refill time"], debuffs: [] },
      { id: "oil_rig", name: "Oil Rig", tier: 2, cost: 2, icon: "🏗️", buffs: ["Oil Drill requires 20 Wool instead of Leather"], debuffs: [] },

      { id: "field_expansion_module", name: "Field Expansion Module", tier: 3, cost: 3, icon: "➕", buffs: ["+5 packs added to machine queue"], debuffs: [] },
      { id: "field_extension_module", name: "Field Extension Module", tier: 3, cost: 3, icon: "🗺️", buffs: ["+5 plots added to machine"], debuffs: [] },
      { id: "efficiency_extension_module", name: "Efficiency Extension Module", tier: 3, cost: 3, icon: "🔋", buffs: ["-30% Oil consumption in Crop Machine"], debuffs: [] },
      { id: "grease_lightning", name: "Grease Lightning", tier: 3, cost: 3, icon: "⚡", buffs: ["Ability to make empty oil wells instantly refill"], debuffs: [] }
    ]
  }
};
