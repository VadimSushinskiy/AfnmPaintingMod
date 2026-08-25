import { bodyForgingBreakthroughs } from "./bodyForging/bodyForgingBreakthroughs";

export function initializeBreakthroughs() {
    bodyForgingBreakthroughs.forEach((breakthrough) => {
        window.modAPI.actions.addBreakthrough('bodyForging', breakthrough);
    });
}