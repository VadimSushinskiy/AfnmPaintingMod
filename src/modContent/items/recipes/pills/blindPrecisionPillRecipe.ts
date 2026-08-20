import { RecipeItem } from "afnm-types";
import { recipeIcons } from "../recipeIcons";
import { blindPrecisionPillMap, blindPrecisionPillPlusMap } from "../../pills/combatPills/blindPrecisionPill";
import { spiritInk } from "../../materials/spiritInk";

export const blindPrecisionPillIRecipe: RecipeItem = {
    kind: 'recipe',
    name: 'Blind Precision Pill (I) Recipe',
    description: 'A recipe for a Blind Precision Pill (I).',
    icon: recipeIcons.pill,
    stacks: 1,
    rarity: 'qitouched',
    realm: 'bodyForging',
    baseItem: { ...blindPrecisionPillMap.bodyForging, stacks: 5},
    perfectItem: { ...blindPrecisionPillPlusMap.bodyForging, stacks: 5},
    ingredients: [
        {
            item: window.modAPI.gameData.items['Nether Jade'],
            quantity: 1
        },
        {
            item: window.modAPI.gameData.items['Lesser Shui Blossom'],
            quantity: 2
        },
        {
            item: spiritInk,
            quantity: 1
        },
    ],
    realmProgress: 'Late',
    difficulty: 'medium',
}