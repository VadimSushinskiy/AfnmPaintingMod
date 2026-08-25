import { RecipeItem } from "afnm-types";
import { recipeIcons } from "../recipeIcons";
import { inkIron } from "../../materials/inkIron";
import { spiritInk } from "../../materials/spiritInk";

export const inkIronRecipe: RecipeItem = {
    kind: 'recipe',
    name: 'Ink Iron Recipe',
    description: 'A recipe for an Ink Iron.',
    icon: recipeIcons.material,
    stacks: 1,
    rarity: 'empowered',
    realm: 'bodyForging',
    baseItem: { ...inkIron, stacks: 1},
    perfectItem:  { ...inkIron, stacks: 3},
    ingredients: [
        {
            item: window.modAPI.gameData.items['Cold Iron'],
            quantity: 3
        },
        {
            item: window.modAPI.gameData.items['Nether Jade'],
            quantity: 3
        },
        {
            item: spiritInk,
            quantity: 1
        },
    ],
    realmProgress: 'Late',
    difficulty: 'medium'
}