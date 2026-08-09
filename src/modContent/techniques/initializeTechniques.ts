import { paintingTechniques } from "./paintingTechniques";

export function initializeTechniques() {
    paintingTechniques.forEach((technique) => {
        window.modAPI.actions.addTechnique(technique);
    });
}