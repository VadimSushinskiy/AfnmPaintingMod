import { RecipeItem } from "afnm-types";
import { recipeIcons } from "../recipeIcons";
import { inkBrush, inkBrushPlus } from "../../mounts/inkBrush";
import { spiritInk } from "../../materials/spiritInk";

export const inkBrushRecipe: RecipeItem = {
    kind: 'recipe',
    name: 'Ink Brush Recipe',
    description: 'A recipe for an Ink Brush.',
    icon: recipeIcons.artefact,
    stacks: 1,
    rarity: 'qitouched',
    realm: 'bodyForging',
    baseItem: inkBrush,
    perfectItem: inkBrushPlus,
    ingredients: [
        {
            item: window.modAPI.gameData.items['Nether Jade'],
            quantity: 2
        },
        {
            item: spiritInk,
            quantity: 4
        },
        {
            item: window.modAPI.gameData.items['Artefact Blank (I)'],
            quantity: 1
        }
    ],
    realmProgress: 'Late',
    difficulty: 'hard'
}