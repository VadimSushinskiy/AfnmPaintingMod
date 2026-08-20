import { RecipeItem } from "afnm-types";
import { recipeIcons } from "../recipeIcons";
import { unityPillMap, unityPillPlusMap } from "../../pills/craftingPills/unityPill";
import { spiritInk } from "../../materials/spiritInk";

export const unityPillIRecipe: RecipeItem = {
    kind: 'recipe',
    name: 'Unity Pill (I) Recipe',
    description: 'A recipe for an Unity Pill (I).',
    icon: recipeIcons.pill,
    stacks: 1,
    rarity: 'qitouched',
    realm: 'bodyForging',
    baseItem: { ...unityPillMap.bodyForging, stacks: 3},
    perfectItem: { ...unityPillPlusMap.bodyForging, stacks: 3},
    ingredients: [
        {
            item: window.modAPI.gameData.items['Flaring Yang Bud'],
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