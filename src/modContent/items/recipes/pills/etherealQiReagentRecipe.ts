import { RecipeItem } from "afnm-types";
import { recipeIcons } from "../recipeIcons";
import { etherealQiReagentMap } from "../../pills/craftingReagents/etherealQiReagent";
import { spiritInk } from "../../materials/spiritInk";

export const etherealQiReagentRecipe: RecipeItem = {
    kind: 'recipe',
    name: 'Ethereal Qi Reagent (I) Recipe',
    description: 'A recipe for an Ethereal Qi Reagent (I).',
    icon: recipeIcons.pill,
    stacks: 1,
    rarity: 'qitouched',
    realm: 'bodyForging',
    baseItem: { ...etherealQiReagentMap.bodyForging, stacks: 3},
    perfectItem: { ...etherealQiReagentMap.bodyForging, stacks: 5},
    ingredients: [
        {
            item: window.modAPI.gameData.items['Lesser Spirit Grass'],
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