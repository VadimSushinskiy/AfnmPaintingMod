import { crfatingActions } from "./craftingActions";

export function initializeCraftingActions() {
    crfatingActions.forEach((action) => {
        window.modAPI.actions.addCraftingTechnique(action);
    });
}