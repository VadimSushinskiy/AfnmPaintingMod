import { craftingActions } from "./craftingActions";

export function initializeCraftingActions() {
    craftingActions.forEach((action) => {
        window.modAPI.actions.addCraftingTechnique(action);
    });
}