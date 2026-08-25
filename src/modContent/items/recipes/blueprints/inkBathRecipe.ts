import { RecipeItem } from "afnm-types";
import { recipeIcons } from "../recipeIcons";
import { blueprintMap } from "../../blueprints/blueprints";
import { inkBathPlusRoomMap, inkBathRoomMap } from "../../../house/inkBathRoom";
import { spiritInk } from "../../materials/spiritInk";
import { inkIron } from "../../materials/inkIron";

export const inkBathIRecipe: RecipeItem = {
    kind: 'recipe',
    name: 'Ink Bath (I) Recipe',
    description: 'A recipe for an Ink Bath (I).',
    icon: recipeIcons.breakthrough,
    stacks: 1,
    rarity: 'qitouched',
    realm: 'bodyForging',
    baseItem: blueprintMap[inkBathRoomMap.bodyForging.name],
    perfectItem: blueprintMap[inkBathPlusRoomMap.bodyForging.name],
    ingredients: [
        {
            item: inkIron,
            quantity: 3
        },
        {
            item: spiritInk,
            quantity: 5
        },
    ],
    realmProgress: 'Late',
    difficulty: 'hard'
}