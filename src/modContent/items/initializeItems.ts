import { items } from "./items";

export function initializeItems() {
    items.forEach((item) => {
        window.modAPI.actions.addItem(item);
    });
}