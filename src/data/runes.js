const RUNES = {
  // Precision
  "Press the Attack": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png".toLowerCase().toLowerCase().toLowerCase(),
  "Lethal Tempo": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Precision/LethalTempo/LethalTempotemp.png".toLowerCase().toLowerCase(),
  "Fleet Footwork": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png".toLowerCase().toLowerCase(),
  "Conqueror": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Precision/Conqueror/Conqueror.png".toLowerCase().toLowerCase(),
  "Absorb Life": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Precision/AbsorbLife/AbsorbLife.png".toLowerCase().toLowerCase(),
  "Triumph": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Precision/Triumph.png".toLowerCase().toLowerCase(),
  "Presence of Mind": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png".toLowerCase().toLowerCase(),
  "Legend: Alacrity": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png".toLowerCase().toLowerCase(),
  "Legend: Haste": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Precision/LegendHaste/LegendHaste.png".toLowerCase().toLowerCase(),
  "Legend: Bloodline": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png".toLowerCase().toLowerCase(),
  "Coup de Grace": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png".toLowerCase().toLowerCase(),
  "Cut Down": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Precision/CutDown/CutDown.png".toLowerCase().toLowerCase(),
  "Last Stand": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Sorcery/LastStand/LastStand.png".toLowerCase().toLowerCase(),

  // Domination
  "Electrocute": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Domination/Electrocute/Electrocute.png".toLowerCase().toLowerCase(),
  "Dark Harvest": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png".toLowerCase().toLowerCase(),
  "Hail of Blades": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png".toLowerCase().toLowerCase(),
  "Cheap Shot": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Domination/CheapShot/CheapShot.png".toLowerCase().toLowerCase(),
  "Taste of Blood": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Domination/TasteOfBlood/TasteOfBlood.png".toLowerCase().toLowerCase(),
  "Sudden Impact": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png".toLowerCase().toLowerCase(),
  "Deep Ward": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Domination/DeepWard/DeepWard.png".toLowerCase().toLowerCase(),
  "Sixth Sense": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Domination/SixthSense/SixthSense.png".toLowerCase().toLowerCase(),
  "Grisly Mementos": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Domination/GrislyMementos/GrislyMementos.png".toLowerCase().toLowerCase(),
  "Treasure Hunter": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Domination/TreasureHunter/TreasureHunter.png".toLowerCase().toLowerCase(),
  "Relentless Hunter": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png".toLowerCase().toLowerCase(),
  "Ultimate Hunter": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png".toLowerCase().toLowerCase(),

  // Sorcery
  "Summon Aery": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Sorcery/SummonAery/SummonAery.png".toLowerCase().toLowerCase(),
  "Arcane Comet": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png".toLowerCase().toLowerCase(),
  "Phase Rush": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png".toLowerCase().toLowerCase(),
  "Axiom Arcanist": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Sorcery/NullifyingOrb/NullifyingOrb.png".toLowerCase().toLowerCase(),
  "Manaflow Band": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png".toLowerCase().toLowerCase(),
  "Nimbus Cloak": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Sorcery/NimbusCloak/6361.png".toLowerCase().toLowerCase(),
  "Transcendence": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Sorcery/Transcendence/Transcendence.png".toLowerCase().toLowerCase(),
  "Celerity": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Sorcery/Celerity/Celeritytemp.png".toLowerCase().toLowerCase(),
  "Absolute Focus": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png".toLowerCase().toLowerCase(),
  "Scorch": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Sorcery/Scorch/Scorch.png".toLowerCase().toLowerCase(),
  "Waterwalking": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Sorcery/Waterwalking/Waterwalking.png".toLowerCase().toLowerCase(),
  "Gathering Storm": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png".toLowerCase().toLowerCase(),

  // Resolve
  "Grasp of the Undying": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png".toLowerCase().toLowerCase(),
  "Aftershock": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Resolve/veteranaftershock/veteranaftershock.png".toLowerCase().toLowerCase(),
  "Guardian": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Resolve/Guardian/Guardian.png".toLowerCase().toLowerCase(),
  "Demolish": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Resolve/Demolish/Demolish.png".toLowerCase().toLowerCase(),
  "Font of Life": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Resolve/FontOfLife/FontOfLife.png".toLowerCase().toLowerCase(),
  "Shield Bash": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Resolve/mirrorshell/mirrorshell.png".toLowerCase().toLowerCase(),
  "Conditioning": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Resolve/Conditioning/Conditioning.png".toLowerCase().toLowerCase(),
  "Second Wind": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Resolve/SecondWind/SecondWind.png".toLowerCase().toLowerCase(),
  "Bone Plating": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Resolve/BonePlating/BonePlating.png".toLowerCase().toLowerCase(),
  "Overgrowth": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Resolve/Overgrowth/Overgrowth.png".toLowerCase().toLowerCase(),
  "Revitalize": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Resolve/Revitalize/Revitalize.png".toLowerCase().toLowerCase(),
  "Unflinching": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/sorcery/Unflinching/Unflinching.png".toLowerCase().toLowerCase(),

  // Inspiration
  "Glacial Augment": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png".toLowerCase().toLowerCase(),
  "Unsealed Spellbook": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png".toLowerCase().toLowerCase(),
  "First Strike": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png".toLowerCase().toLowerCase(),
  "Magical Footwear": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png".toLowerCase().toLowerCase(),
  "Cash Back": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Inspiration/CashBack/CashBack.png".toLowerCase().toLowerCase(),
  "Hextech Flashtraption": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Inspiration/HextechFlashtraption/HextechFlashtraption.png".toLowerCase(),
  "Triple Tonic": "/Triple_Tonic_rune.png",
  "Time Warp Tonic": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Inspiration/TimeWarpTonic/TimeWarpTonic.png".toLowerCase(),
  "Biscuit Delivery": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png".toLowerCase(),
  "Cosmic Insight": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png".toLowerCase(),
  "Approach Velocity": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Resolve/ApproachVelocity/ApproachVelocity.png".toLowerCase(),
  "Jack of All Trades": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/Styles/Inspiration/JackOfAllTrades/JackOfAllTrades.png".toLowerCase(),

  // Shards (StatMods)
  "Adaptive Force": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/StatMods/StatModsAdaptiveForceIcon.png".toLowerCase(),
  "Attack Speed": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/StatMods/StatModsAttackSpeedIcon.png".toLowerCase(),
  "Ability Haste": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/StatMods/StatModsCDRScalingIcon.png".toLowerCase(),
  "Health": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/StatMods/StatModsHealthScalingIcon.png".toLowerCase(),
  "Health Scaling": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodshealthplusicon.png".toLowerCase(),
  "Move Speed": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsmovementspeedicon.png"
}

export default RUNES