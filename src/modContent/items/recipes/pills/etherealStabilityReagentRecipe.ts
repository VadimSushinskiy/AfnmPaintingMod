import { RecipeItem } from "afnm-types";
import { recipeIcons } from "../recipeIcons";
import { etherealStabilityReagentMap } from "../../pills/craftingReagents/etherealStabilityReagent";
import { spiritInk } from "../../materials/spiritInk";

export const etherealStabilityReagentRecipe: RecipeItem = {
    kind: 'recipe',
    name: 'Ethereal Stability Reagent (I) Recipe',
    description: 'A recipe for an Ethereal Stability Reagent (I).',
    icon: recipeIcons.pill,
    stacks: 1,
    rarity: 'qitouched',
    realm: 'bodyForging',
    baseItem: { ...etherealStabilityReagentMap.bodyForging, stacks: 3},
    perfectItem: { ...etherealStabilityReagentMap.bodyForging, stacks: 5},
    ingredients: [
        {
            item: window.modAPI.gameData.items['Lesser Spirit Grass'],
            quantity: 2
        },
        {
            item: window.modAPI.gameData.items['Cold Iron'],
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