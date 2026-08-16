import { items } from "./items";

export function initializeItems() {
    items.forEach((techniqueItem) => {
        window.modAPI.actions.addItem(techniqueItem);
    });
}