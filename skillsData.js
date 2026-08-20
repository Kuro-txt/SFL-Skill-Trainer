const SKILL_DATABASE = {
  crops: {
    name: "Crops",
    icon: "🌾",
    reqs: { t1: 0, t2: 3, t3: 7 },
    skills: [
      { id: "green_thumb", tier: 1, cost: 1, name: "Green Thumb", icon: "🌱", buffs: ["-5% plot crop growth time"], debuffs: [] },
      { id: "young_farmer", tier: 1, cost: 1, name: "Young Farmer", icon: "🧑‍🌾", buffs: ["+0.1 Basic Crop yield"], debuffs: [] },
      { id: "experienced_farmer", tier: 1, cost: 1, name: "Experienced Farmer", icon: "🚜", buffs: ["+0.1 Medium Crop yield"], debuffs: [] },
      { id: "old_farmer", tier: 1, cost: 1, name: "Old Farmer", icon: "👴", buffs: ["+0.1 Advanced Crop yield"], debuffs: [] },
      { id: "chonky_scarecrow", tier: 1, cost: 1, name: "Chonky Scarecrow", icon: "🎃", buffs: ["Increases Basic Scarecrow's AOE to a 7x7 area", "Additional -10% basic crop growth time"], debuffs: [] },
      { id: "bettys_friend", tier: 1, cost: 1, name: "Betty's Friend", icon: "🪙", buffs: ["Betty Coin delivery revenue increased by 30%"], debuffs: [] },
      { id: "strong_roots", tier: 2, cost: 2, name: "Strong Roots", icon: "🥕", buffs: ["-10% Advanced crop growth time"], debuffs: [] },
      { id: "coin_swindler", tier: 2, cost: 2, name: "Coin Swindler", icon: "💰", buffs: ["+10% coins when selling plot crops at the Market"], debuffs: [] },
      { id: "golden_sunflower", tier: 2, cost: 2, name: "Golden Sunflower", icon: "🌻", buffs: ["1/700 chance for 0.35 gold when harvesting sunflowers (excl. Crop Machine)"], debuffs: [] },
      { id: "horror_mike", tier: 2, cost: 2, name: "Horror Mike", icon: "👻", buffs: ["Increases Scary Mike's AOE to a 7x7 area", "Additional +0.1 medium crop yield"], debuffs: [] },
      { id: "lauries_gains", tier: 2, cost: 2, name: "Laurie's Gains", icon: "🐦", buffs: ["Increases Laurie the Chuckle Crow's AOE to a 7x7 area", "Additional +0.1 advanced crop yield"], debuffs: [] },
      { id: "instant_growth", tier: 3, cost: 3, name: "Instant Growth", icon: "⚡", buffs: ["Grants ability to instantly harvest all currently growing crops in plots"], debuffs: [] },
      { id: "acre_farm", tier: 3, cost: 3, name: "Acre Farm", icon: "🏡", buffs: ["+1 Advanced crop yield"], debuffs: ["-0.5 Basic and Medium crop yield"] },
      { id: "hectare_farm", tier: 3, cost: 3, name: "Hectare Farm", icon: "🏞️", buffs: ["+1 Basic and Medium crop yield"], debuffs: ["-0.5 Advanced crop yield"] }
    ]
  },
  trees: {
    name: "Trees",
    icon: "🌲",
    reqs: { t1: 0, t2: 2, t3: 5 },
    skills: [
      { id: "lumberjacks_extra", tier: 1, cost: 1, name: "Lumberjack's Extra", icon: "🪓", buffs: ["+0.1 wood yield"], debuffs: [] },
      { id: "tree_charge", tier: 1, cost: 1, name: "Tree Charge", icon: "⏳", buffs: ["-10% tree growth time"], debuffs: [] },
      { id: "more_axes", tier: 1, cost: 1, name: "More Axes", icon: "🪵", buffs: ["+50 axe stock"], debuffs: [] },
      { id: "insta_chop", tier: 1, cost: 1, name: "Insta-Chop", icon: "⚡", buffs: ["1 Tap Trees"], debuffs: [] },
      { id: "tough_tree", tier: 2, cost: 2, name: "Tough Tree", icon: "🛡️", buffs: ["1/10 chance of x3 wood yield"], debuffs: [] },
      { id: "fellers_discount", tier: 2, cost: 2, name: "Feller's Discount", icon: "🏷️", buffs: ["-20% axe coin cost"], debuffs: [] },
      { id: "money_tree", tier: 2, cost: 2, name: "Money Tree", icon: "🪙", buffs: ["1% chance of finding 200 Coins when chopping trees"], debuffs: [] },
      { id: "tree_turnaround", tier: 3, cost: 3, name: "Tree Turnaround", icon: "🔄", buffs: ["15% chance for trees to grow instantly"], debuffs: [] },
      { id: "tree_blitz", tier: 3, cost: 3, name: "Tree Blitz", icon: "🌟", buffs: ["Ability to make all trees instantly grow"], debuffs: [] }
    ]
  },
  fishing: {
    name: "Fishing",
    icon: "🎣",
    reqs: { t1: 0, t2: 2, t3: 5 },
    skills: [
      { id: "fishermans_5_fold", tier: 1, cost: 1, name: "Fisherman's 5 Fold", icon: "🎏", buffs: ["+5 daily fishing reels"], debuffs: [] },
      { id: "fishy_chance", tier: 1, cost: 1, name: "Fishy Chance", icon: "🐟", buffs: ["10% chance of +1 basic fish"], debuffs: [] },
      { id: "fishy_roll", tier: 1, cost: 1, name: "Fishy Roll", icon: "🍣", buffs: ["10% chance of +1 advanced fish"], debuffs: [] },
      { id: "reel_deal", tier: 1, cost: 1, name: "Reel Deal", icon: "🏷️", buffs: ["-50% rod coin cost"], debuffs: [] },
      { id: "fishermans_10_fold", tier: 2, cost: 2, name: "Fisherman's 10 Fold", icon: "🎣", buffs: ["+10 daily fishing reels"], debuffs: [] },
      { id: "fishy_fortune", tier: 2, cost: 2, name: "Fishy Fortune", icon: "💰", buffs: ["+100% coins from Corale's deliveries"], debuffs: [] },
      { id: "fishy_gamble", tier: 2, cost: 2, name: "Fishy Gamble", icon: "🎲", buffs: ["20% chance of +1 expert fish"], debuffs: [] },
      { id: "frenzied_fish", tier: 3, cost: 3, name: "Frenzied Fish", icon: "🦈", buffs: ["During fish frenzy, +1 fish and 50% chance of +1 fish"], debuffs: [] },
      { id: "more_with_less", tier: 3, cost: 3, name: "More With Less", icon: "⚖️", buffs: ["+25 daily fishing reels"], debuffs: ["+1 Rod cost per cast"] },
      { id: "fishy_feast", tier: 3, cost: 3, name: "Fishy Feast", icon: "🍲", buffs: ["+20% Bumpkin XP from Fish"], debuffs: [] }
    ]
  },
  mining: {
    name: "Mining",
    icon: "⛏️",
    reqs: { t1: 0, t2: 3, t3: 7 },
    skills: [
      { id: "rock_n_roll", tier: 1, cost: 1, name: "Rock'N'Roll", icon: "🪨", buffs: ["+0.1 Stone Yield"], debuffs: [] },
      { id: "iron_bumpkin", tier: 1, cost: 1, name: "Iron Bumpkin", icon: "⚙️", buffs: ["+0.1 Iron Yield"], debuffs: [] },
      { id: "speed_miner", tier: 1, cost: 1, name: "Speed Miner", icon: "⏱️", buffs: ["-20% Stone recovery time"], debuffs: [] },
      { id: "tap_prospector", tier: 1, cost: 1, name: "Tap Prospector", icon: "🔨", buffs: ["1 tap small mineral nodes"], debuffs: [] },
      { id: "forge_ward_profits", tier: 1, cost: 1, name: "Forge-Ward Profits", icon: "🪙", buffs: ["+20% Blacksmith deliveries revenue"], debuffs: [] },
      { id: "iron_hustle", tier: 2, cost: 2, name: "Iron Hustle", icon: "⚡", buffs: ["-30% Iron recovery time"], debuffs: [] },
      { id: "frugal_miner", tier: 2, cost: 2, name: "Frugal Miner", icon: "🏷️", buffs: ["-20% all pickaxes coin cost"], debuffs: [] },
      { id: "rocky_favor", tier: 2, cost: 2, name: "Rocky Favor", icon: "⚖️", buffs: ["+1 Stone yield"], debuffs: ["-0.5 Iron yield"] },
      { id: "fire_kissed", tier: 2, cost: 2, name: "Fire Kissed", icon: "🔥", buffs: ["+1 Crimstone yield on 5th consecutive mine"], debuffs: [] },
      { id: "midas_sprint", tier: 2, cost: 2, name: "Midas Sprint", icon: "✨", buffs: ["-10% Gold recovery time"], debuffs: [] },
      { id: "ferrous_favor", tier: 3, cost: 3, name: "Ferrous Favor", icon: "🧲", buffs: ["+1 Iron yield"], debuffs: ["-0.5 Stone yield"] },
      { id: "golden_touch", tier: 3, cost: 3, name: "Golden Touch", icon: "👑", buffs: ["+0.5 Gold Yield"], debuffs: [] },
      { id: "more_picks", tier: 3, cost: 3, name: "More Picks", icon: "📦", buffs: ["Increased stock: +70 Pickaxe, +20 Stone Pickaxe, +7 Iron Pickaxe, +2 Gold Pickaxe"], debuffs: [] },
      { id: "fireside_alchemist", tier: 3, cost: 3, name: "Fireside Alchemist", icon: "🧪", buffs: ["-15% Crimstone recovery time"], debuffs: [] },
      { id: "midas_rush", tier: 3, cost: 3, name: "Midas Rush", icon: "🏆", buffs: ["-20% Gold recovery time"], debuffs: [] }
    ]
  },
  cooking: {
    name: "Cooking",
    icon: "🍳",
    reqs: { t1: 0, t2: 2, t3: 5 },
    skills: [
      { id: "fast_feasts", tier: 1, cost: 1, name: "Fast Feasts", icon: "🍲", buffs: ["-10% Firepit and Kitchen cooking time"], debuffs: [] },
      { id: "nom_nom", tier: 1, cost: 1, name: "Nom Nom", icon: "🍔", buffs: ["+10% Food deliveries revenue"], debuffs: [] },
      { id: "munching_mastery", tier: 1, cost: 1, name: "Munching Mastery", icon: "⭐", buffs: ["+5% Bumpkin XP"], debuffs: [] },
      { id: "swift_sizzle", tier: 1, cost: 1, name: "Swift Sizzle", icon: "🔥", buffs: ["-40% Fire Pit cooking time with oil"], debuffs: [] },
      { id: "frosted_cakes", tier: 2, cost: 2, name: "Frosted Cakes", icon: "🎂", buffs: ["-10% Cakes cooking time"], debuffs: [] },
      { id: "juicy_boost", tier: 2, cost: 2, name: "Juicy Boost", icon: "🧃", buffs: ["+10% Bumpkin XP from drinks"], debuffs: [] },
      { id: "turbo_fry", tier: 2, cost: 2, name: "Turbo Fry", icon: "🍟", buffs: ["-50% Kitchen cooking time with oil"], debuffs: [] },
      { id: "drive_through_deli", tier: 2, cost: 2, name: "Drive-Through Deli", icon: "🥪", buffs: ["+15% Bumpkin XP from Deli"], debuffs: [] },
      { id: "instant_gratification", tier: 3, cost: 3, name: "Instant Gratification", icon: "⚡", buffs: ["Ability to make all meals currently cooking ready to be eaten"], debuffs: [] },
      { id: "double_nom", tier: 3, cost: 3, name: "Double Nom", icon: "🍽️", buffs: ["+1 food from cooking"], debuffs: ["2x ingredients required for cooking"] },
      { id: "fiery_jackpot", tier: 3, cost: 3, name: "Fiery Jackpot", icon: "🎰", buffs: ["+20% Chance of +1 food from Firepit"], debuffs: [] },
      { id: "fry_frenzy", tier: 3, cost: 3, name: "Fry Frenzy", icon: "⚡", buffs: ["-60% Deli cooking time with oil"], debuffs: [] }
    ]
  },
  compost: {
    name: "Compost",
    icon: "🪱",
    reqs: { t1: 0, t2: 3, t3: 7 },
    skills: [
      { id: "efficient_bin", tier: 1, cost: 1, name: "Efficient Bin", icon: "🗑️", buffs: ["+5 Sprout Mix"], debuffs: [] },
      { id: "turbo_charged", tier: 1, cost: 1, name: "Turbo Charged", icon: "🧪", buffs: ["+5 Fruitful Blend"], debuffs: [] },
      { id: "wormy_treat", tier: 1, cost: 1, name: "Wormy Treat", icon: "🪱", buffs: ["+1 Worm"], debuffs: [] },
      { id: "feathery_business", tier: 1, cost: 1, name: "Feathery Business", icon: "🪶", buffs: ["Use feathers instead of eggs to boost composters"], debuffs: ["2x feathers to boost composters"] },
      { id: "sprout_surge", tier: 1, cost: 1, name: "Sprout Surge", icon: "🌱", buffs: ["Put Sprout Mix on all plots"], debuffs: [] },
      { id: "blend_tastic", tier: 1, cost: 1, name: "Blend-tastic", icon: "✨", buffs: ["Put Fruitful Blend on all plots"], debuffs: [] },
      { id: "premium_worms", tier: 2, cost: 2, name: "Premium Worms", icon: "👑", buffs: ["+10 Rapid Root"], debuffs: [] },
      { id: "fruitful_bounty", tier: 2, cost: 2, name: "Fruitful Bounty", icon: "🍎", buffs: ["Double Fruitful Blend's Effect"], debuffs: [] },
      { id: "swift_decomposer", tier: 2, cost: 2, name: "Swift Decomposer", icon: "⏳", buffs: ["-10% compost time"], debuffs: [] },
      { id: "composting_bonanza", tier: 2, cost: 2, name: "Composting Bonanza", icon: "⏱️", buffs: ["Speed up composters by an additional hour when boosting"], debuffs: ["2x resources to boost composters"] },
      { id: "root_rocket", tier: 2, cost: 2, name: "Root Rocket", icon: "🚀", buffs: ["Put Rapid Root on all plots"], debuffs: [] },
      { id: "composting_overhaul", tier: 3, cost: 3, name: "Composting Overhaul", icon: "📦", buffs: ["+2 Worms"], debuffs: [] },
      { id: "composting_revamp", tier: 3, cost: 3, name: "Composting Revamp", icon: "⚗️", buffs: ["+5 fertilisers"], debuffs: ["-2 Worms"] }
    ]
  },
  aging: {
    name: "Aging",
    icon: "🧂",
    reqs: { t1: 0, t2: 3, t3: 7 },
    skills: [
      { id: "cheap_rakes", tier: 1, cost: 1, name: "Cheap Rakes", icon: "🏷️", buffs: ["-20% salt rake coin cost"], debuffs: [] },
      { id: "speedy_aging", tier: 1, cost: 1, name: "Speedy Aging", icon: "⏳", buffs: ["-10% Fish Aging time"], debuffs: [] },
      { id: "salty_seas", tier: 1, cost: 1, name: "Salty Seas", icon: "🌊", buffs: ["-10% salt charge replenishment time"], debuffs: [] },
      { id: "wide_rakes", tier: 1, cost: 1, name: "Wide Rakes", icon: "🧹", buffs: ["+2 Salt per harvest"], debuffs: [] },
      { id: "bacalhau", tier: 1, cost: 1, name: "Bacalhau", icon: "🐟", buffs: ["+1 Bait yield from fermentation rack"], debuffs: [] },
      { id: "fish_smoking", tier: 2, cost: 2, name: "Fish Smoking", icon: "💨", buffs: ["Doubled chance Aged Fish becomes Prime Aged"], debuffs: [] },
      { id: "refiner", tier: 2, cost: 2, name: "Refiner", icon: "💎", buffs: ["15% chance of +1 Refined Salt when making Refined Salt"], debuffs: [] },
      { id: "sea_blessed", tier: 2, cost: 2, name: "Sea Blessed", icon: "✨", buffs: ["5% chance to restore 1 charge to 4 Salt Nodes on harvest"], debuffs: [] },
      { id: "ager", tier: 3, cost: 3, name: "Ager", icon: "🏛️", buffs: ["2× output from Aging Shed Racks"], debuffs: ["2× Aging Shed inputs (ingredients, fish & salt)"] },
      { id: "salt_surge", tier: 3, cost: 3, name: "Salt Surge", icon: "⚡", buffs: ["Recharge all Salt Nodes to max"], debuffs: [] }
    ]
  },
  fruit_patch: {
    name: "Fruit Patch",
    icon: "🍎",
    reqs: { t1: 0, t2: 2, t3: 5 },
    skills: [
      { id: "fruitful_fumble", tier: 1, cost: 1, name: "Fruitful Fumble", icon: "🍓", buffs: ["+0.1 Fruit Patch yield"], debuffs: [] },
      { id: "fruity_heaven", tier: 1, cost: 1, name: "Fruity Heaven", icon: "🏷️", buffs: ["-10% Fruit Patch seeds cost"], debuffs: [] },
      { id: "fruity_profit", tier: 1, cost: 1, name: "Fruity Profit", icon: "💰", buffs: ["+50% coins from Tango's deliveries"], debuffs: [] },
      { id: "loyal_macaw", tier: 1, cost: 1, name: "Loyal Macaw", icon: "🦜", buffs: ["Double Macaw's effect"], debuffs: [] },
      { id: "no_axe_no_worries", tier: 1, cost: 1, name: "No Axe No Worries", icon: "✂️", buffs: ["Chop fruit branches and stems without axes"], debuffs: ["-1 wood from fruit branches and stems"] },
      { id: "catchup", tier: 2, cost: 2, name: "Catchup", icon: "⏳", buffs: ["-10% Fruit Patch growth time"], debuffs: [] },
      { id: "fruity_woody", tier: 2, cost: 2, name: "Fruity Woody", icon: "🪵", buffs: ["+1 wood from fruit branches and stems"], debuffs: [] },
      { id: "pear_turbocharge", tier: 2, cost: 2, name: "Pear Turbocharge", icon: "🍐", buffs: ["Double Immortal Pear's effect"], debuffs: [] },
      { id: "crime_fruit", tier: 2, cost: 2, name: "Crime Fruit", icon: "🍋", buffs: ["+10 Tomato and Lemon seeds stock"], debuffs: [] },
      { id: "generous_orchard", tier: 3, cost: 3, name: "Generous Orchard", icon: "🌳", buffs: ["20% chance of +1 Fruit Patch yield"], debuffs: [] },
      { id: "long_pickings", tier: 3, cost: 3, name: "Long Pickings", icon: "🍌", buffs: ["-25% Apple and Banana growth time"], debuffs: ["+10% growth time for all other fruit patch fruits"] },
      { id: "short_pickings", tier: 3, cost: 3, name: "Short Pickings", icon: "🫐", buffs: ["-25% Blueberry and Orange growth time"], debuffs: ["+10% growth time for all other fruit patch fruits"] },
      { id: "zesty_vibes", tier: 3, cost: 3, name: "Zesty Vibes", icon: "🍊", buffs: ["+1 Tomato and Lemon yield"], debuffs: ["-0.25 yield for all other fruit patch fruits"] }
    ]
  },
  animals: {
    name: "Animals",
    icon: "🐑",
    reqs: { t1: 0, t2: 4, t3: 8 },
    skills: [
      { id: "efficient_feeding", tier: 1, cost: 1, name: "Efficient Feeding", icon: "🌾", buffs: ["-5% feed to feed all animals"], debuffs: [] },
      { id: "restless_animals", tier: 1, cost: 1, name: "Restless Animals", icon: "⏱️", buffs: ["-10% Animal sleep time"], debuffs: [] },
      { id: "fine_fibers", tier: 1, cost: 1, name: "Fine Fibers", icon: "🧵", buffs: ["+0.1 Feather, Leather and Merino Wool yield"], debuffs: [] },
      { id: "bountiful_bounties", tier: 1, cost: 1, name: "Bountiful Bounties", icon: "💰", buffs: ["+50% Coins from Animal Bounties"], debuffs: [] },
      { id: "double_bale", tier: 1, cost: 1, name: "Double Bale", icon: "📦", buffs: ["Double Bale's Effect"], debuffs: [] },
      { id: "bale_economy", tier: 1, cost: 1, name: "Bale Economy", icon: "🥛", buffs: ["Bale affects milk and wool production"], debuffs: [] },
      { id: "featherweight", tier: 1, cost: 1, name: "Featherweight", icon: "🪶", buffs: ["+0.35 Feather yield"], debuffs: ["-0.1 Leather & Merino Wool yield"] },
      { id: "abundant_harvest", tier: 2, cost: 2, name: "Abundant Harvest", icon: "🥚", buffs: ["+0.2 Egg, Wool and Milk yield"], debuffs: [] },
      { id: "heartwarming_instruments", tier: 2, cost: 2, name: "Heartwarming Instruments", icon: "🪕", buffs: ["+50% Animal XP from Animal Affection tools"], debuffs: [] },
      { id: "kale_mix", tier: 2, cost: 2, name: "Kale Mix", icon: "🥬", buffs: ["Mixed Grain requires 3 kale to mix instead"], debuffs: [] },
      { id: "alternate_medicine", tier: 2, cost: 2, name: "Alternate Medicine", icon: "🍯", buffs: ["Barn Delight requires 1 less Lemon and Honey to mix"], debuffs: [] },
      { id: "healthy_livestock", tier: 2, cost: 2, name: "Healthy Livestock", icon: "💖", buffs: ["-50% chance of sickness"], debuffs: [] },
      { id: "merino_whisperer", tier: 2, cost: 2, name: "Merino Whisperer", icon: "🐑", buffs: ["+0.35 Merino Wool yield"], debuffs: ["-0.1 Leather & Feather yield"] },
      { id: "clucky_grazing", tier: 3, cost: 3, name: "Clucky Grazing", icon: "🐔", buffs: ["-25% feed to feed Chickens"], debuffs: ["+50% feed to feed other animals"] },
      { id: "sheepwise_diet", tier: 3, cost: 3, name: "Sheepwise Diet", icon: "🐏", buffs: ["-25% feed to feed Sheep"], debuffs: ["+50% feed to feed other animals"] },
      { id: "cow_smart_nutrition", tier: 3, cost: 3, name: "Cow-Smart Nutrition", icon: "🐄", buffs: ["-25% feed to feed Cows"], debuffs: ["+50% feed to feed other animals"] },
      { id: "chonky_feed", tier: 3, cost: 3, name: "Chonky Feed", icon: "🍖", buffs: ["2x animal xp from animal feed"], debuffs: ["+50% feed to feed all animals"] },
      { id: "leathercraft_mastery", tier: 3, cost: 3, name: "Leathercraft Mastery", icon: "🥋", buffs: ["+0.35 Leather yield"], debuffs: ["-0.1 Feather & Merino Wool yield"] },
      { id: "barnyard_rouse", tier: 3, cost: 3, name: "Barnyard Rouse", icon: "⚡", buffs: ["Instantly wakes up all animals"], debuffs: [] }
    ]
  },
  bees_flowers: {
    name: "Bees & Flowers",
    icon: "🐝",
    reqs: { t1: 0, t2: 2, t3: 5 },
    skills: [
      { id: "sweet_bonus", tier: 1, cost: 1, name: "Sweet Bonus", icon: "🍯", buffs: ["+0.1 Honey per hive"], debuffs: [] },
      { id: "hyper_bees", tier: 1, cost: 1, name: "Hyper Bees", icon: "⚡", buffs: ["+0.1 Honey production speed"], debuffs: [] },
      { id: "blooming_boost", tier: 1, cost: 1, name: "Blooming Boost", icon: "🌸", buffs: ["-10% Flower growth time"], debuffs: [] },
      { id: "flower_sale", tier: 1, cost: 1, name: "Flower Sale", icon: "🏷️", buffs: ["-20% Flower Seeds cost"], debuffs: [] },
      { id: "buzzworthy_treats", tier: 2, cost: 2, name: "Buzzworthy Treats", icon: "🥞", buffs: ["+10% Bumpkin XP from Honey Foods"], debuffs: [] },
      { id: "blossom_bonding", tier: 2, cost: 2, name: "Blossom Bonding", icon: "💐", buffs: ["+2 relationship points for gifting flowers"], debuffs: [] },
      { id: "pollen_power_up", tier: 2, cost: 2, name: "Pollen Power Up", icon: "🌼", buffs: ["Additional +0.1 crop yield after pollination (total +0.3)"], debuffs: [] },
      { id: "petalled_perk", tier: 2, cost: 2, name: "Petalled Perk", icon: "🌺", buffs: ["10% chance of +1 Flower"], debuffs: [] },
      { id: "bee_collective", tier: 3, cost: 3, name: "Bee Collective", icon: "🐝", buffs: ["+20% Bee Swarm chance"], debuffs: [] },
      { id: "flower_power", tier: 3, cost: 3, name: "Flower Power", icon: "🌻", buffs: ["-20% Flower growth time"], debuffs: [] },
      { id: "flowery_abode", tier: 3, cost: 3, name: "Flowery Abode", icon: "🏡", buffs: ["+0.5 Honey production speed"], debuffs: ["+50% Flower growth time"] },
      { id: "petal_blessed", tier: 3, cost: 3, name: "Petal Blessed", icon: "✨", buffs: ["Ability to make all flowers currently growing ready to be harvested"], debuffs: [] }
    ]
  },
  greenhouse: {
    name: "Greenhouse",
    icon: "🏡",
    reqs: { t1: 0, t2: 2, t3: 5 },
    skills: [
      { id: "glass_room", tier: 1, cost: 1, name: "Glass Room", icon: "🪟", buffs: ["+0.1 Greenhouse produce yield"], debuffs: [] },
      { id: "seedy_business", tier: 1, cost: 1, name: "Seedy Business", icon: "🏷️", buffs: ["-15% Greenhouse seeds cost"], debuffs: [] },
      { id: "rice_and_shine", tier: 1, cost: 1, name: "Rice and Shine", icon: "🌾", buffs: ["-5% growth time for greenhouse produce"], debuffs: [] },
      { id: "victorias_secretary", tier: 1, cost: 1, name: "Victoria's Secretary", icon: "🪙", buffs: ["+50% Coins from Victoria's deliveries"], debuffs: [] },
      { id: "olive_express", tier: 2, cost: 2, name: "Olive Express", icon: "🫒", buffs: ["-10% Olive growth time"], debuffs: [] },
      { id: "rice_rocket", tier: 2, cost: 2, name: "Rice Rocket", icon: "🚀", buffs: ["-10% Rice growth time"], debuffs: [] },
      { id: "vine_velocity", tier: 2, cost: 2, name: "Vine Velocity", icon: "🍇", buffs: ["-10% Grape growth time"], debuffs: [] },
      { id: "seeded_bounty", tier: 2, cost: 2, name: "Seeded Bounty", icon: "🌿", buffs: ["+0.5 Greenhouse produce yield"], debuffs: ["+1 Greenhouse seed to plant"] },
      { id: "greenhouse_guru", tier: 3, cost: 3, name: "Greenhouse Guru", icon: "⚡", buffs: ["Ability to make all greenhouse produce currently growing ready to be harvested"], debuffs: [] },
      { id: "greenhouse_gamble", tier: 3, cost: 3, name: "Greenhouse Gamble", icon: "🎲", buffs: ["25% chance of +1 greenhouse produce"], debuffs: [] },
      { id: "slick_saver", tier: 3, cost: 3, name: "Slick Saver", icon: "🛢️", buffs: ["-1 Oil to grow greenhouse produce"], debuffs: [] },
      { id: "greasy_plants", tier: 3, cost: 3, name: "Greasy Plants", icon: "🧪", buffs: ["+1 Greenhouse produce yield"], debuffs: ["+100% Oil consumption in greenhouse"] }
    ]
  },
  machinery: {
    name: "Machinery",
    icon: "⚙️",
    reqs: { t1: 0, t2: 2, t3: 5 },
    skills: [
      { id: "crop_extension_1", tier: 1, cost: 1, name: "Crop Extension Module I", icon: "🔌", buffs: ["Allow Rhubarb and Zucchini seeds to be used in crop machine"], debuffs: [] },
      { id: "crop_processor_unit", tier: 1, cost: 1, name: "Crop Processor Unit", icon: "⚙️", buffs: ["-5% Crop Machine growth time"], debuffs: ["+10% Oil consumption in Crop Machine"] },
      { id: "oil_gadget", tier: 1, cost: 1, name: "Oil Gadget", icon: "🛢️", buffs: ["-10% Oil consumption in Crop Machine"], debuffs: [] },
      { id: "oil_extraction", tier: 1, cost: 1, name: "Oil Extraction", icon: "⛽", buffs: ["+1 Oil when collecting from reserves"], debuffs: [] },
      { id: "leak_proof_tank", tier: 1, cost: 1, name: "Leak-Proof Tank", icon: "🛡️", buffs: ["Triple oil tank capacity in crop machine"], debuffs: [] },
      { id: "crop_extension_2", tier: 2, cost: 2, name: "Crop Extension Module II", icon: "🥕", buffs: ["Allow Carrot and Cabbage seeds to be used in crop machine"], debuffs: [] },
      { id: "crop_extension_3", tier: 2, cost: 2, name: "Crop Extension Module III", icon: "🥦", buffs: ["Allow Yam and Broccoli seeds to be used in crop machine"], debuffs: [] },
      { id: "rapid_rig", tier: 2, cost: 2, name: "Rapid Rig", icon: "⚡", buffs: ["-20% Crop Machine growth time"], debuffs: ["+40% Oil consumption in Crop Machine"] },
      { id: "oil_be_back", tier: 2, cost: 2, name: "Oil Be Back", icon: "⏱️", buffs: ["-20% Oil refill time"], debuffs: [] },
      { id: "oil_rig", tier: 2, cost: 2, name: "Oil Rig", icon: "🏗️", buffs: ["Oil Drill requires 20 Wool instead of Leather to craft"], debuffs: [] },
      { id: "field_expansion_module", tier: 3, cost: 3, name: "Field Expansion Module", icon: "📦", buffs: ["+5 packs added to machine queue system"], debuffs: [] },
      { id: "field_extension_module", tier: 3, cost: 3, name: "Field Extension Module", icon: "🚜", buffs: ["+5 plots added to machine"], debuffs: [] },
      { id: "efficiency_extension_module", tier: 3, cost: 3, name: "Efficiency Extension Module", icon: "💡", buffs: ["-30% Oil consumption in Crop Machine"], debuffs: [] },
      { id: "grease_lightning", tier: 3, cost: 3, name: "Grease Lightning", icon: "⚡", buffs: ["Ability to make empty oil wells instantly refill"], debuffs: [] }
    ]
  }
};
