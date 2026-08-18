import { RecipeItem } from "afnm-types";
import { recipeIcons } from "../recipeIcons";
import { spiritInk } from "../../materials/spiritInk";
import { energyResonancePillMap, energyResonancePillPlusMap } from "../../pills/combatPills/energyResonancePill";

export const energyResonancePillIRecipe: RecipeItem = {
    kind: 'recipe',
    name: 'Energy Resonance Pill (I) Recipe',
    description: 'A recipe for an Energy Resonance Pill (I).',
    icon: recipeIcons.pill,
    stacks: 1,
    rarity: 'qitouched',
    realm: 'bodyForging',
    baseItem: { ...energyResonancePillMap.bodyForging, stacks: 5},
    perfectItem: { ...energyResonancePillPlusMap.bodyForging, stacks: 5},
    ingredients: [
        {
            item: window.modAPI.gameData.items['Flaring Yang Bud'],
            quantity: 2
        },
        {
            item: window.modAPI.gameData.items['Spirit Core (I)'],
            quantity: 1
        },
        {
            item: spiritInk,
            quantity: 1
        },
    ],
    realmProgress: 'Late',
    difficulty: 'medium',
}