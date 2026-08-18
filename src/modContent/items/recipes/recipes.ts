import { RecipeItem } from "afnm-types";
import { inkRecyclingTalismanRecipe } from "./talismans/inkRecyclingTalismanRecipe";
import { inkBrushRecipe } from "./mounts/inkBrushRecipe";
import { fantasyZenithPillIRecipe } from "./pills/fantasyZenithPillRecipe";
import { unityPillIRecipe } from "./pills/unityPillRecipe";
import { etherealQiReagentRecipe } from "./pills/etherealQiReagentRecipe";
import { etherealStabilityReagentRecipe } from "./pills/etherealStabilityReagentRecipe";
import { energyResonancePillIRecipe } from "./pills/energyResonancePillRecipe";
import { bindingAgonyPillIRecipe } from "./pills/bindingAgonyPillRecipe";

export const recipes: RecipeItem[] = [
    inkRecyclingTalismanRecipe,
    inkBrushRecipe,
    fantasyZenithPillIRecipe,
    energyResonancePillIRecipe,
    bindingAgonyPillIRecipe,
    unityPillIRecipe,
    etherealQiReagentRecipe,
    etherealStabilityReagentRecipe,
]