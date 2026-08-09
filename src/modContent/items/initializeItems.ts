import { techniqueItems } from "./technique/technique";

export function initializeItems() {
    techniqueItems.forEach((techniqueItem) => {
        window.modAPI.actions.addItem(techniqueItem);
    });
}