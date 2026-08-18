import { RecipeItem } from "afnm-types";
import { recipeIcons } from "../recipeIcons";
import { bindingAgonyPillMap, bindingAgonyPillPlusMap } from "../../pills/combatPills/bindingAgonyPill";
import { spiritInk } from "../../materials/spiritInk";

export const bindingAgonyPillIRecipe: RecipeItem = {
    kind: 'recipe',
    name: 'Binding Agony Pill (I) Recipe',
    description: 'A recipe for a Binding Agony Pill (I).',
    icon: recipeIcons.pill,
    stacks: 1,
    rarity: 'qitouched',
    realm: 'bodyForging',
    baseItem: { ...bindingAgonyPillMap.bodyForging, stacks: 5},
    perfectItem: { ...bindingAgonyPillPlusMap.bodyForging, stacks: 5},
    ingredients: [
        {
            item: window.modAPI.gameData.items['Flaring Yang Bud'],
            quantity: 1
        },
        {
            item: window.modAPI.gameData.items['Lesser Yuhe Herb'],
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