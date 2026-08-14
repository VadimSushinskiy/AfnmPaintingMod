import { SketchTechniqueEffect } from "./sketchTypes";

export const createStateKey = (stat: keyof SketchTechniqueEffect): string => {
    return createStateKeyWithoutTypeCheck(stat);
}

export const createStateKeyWithoutTypeCheck = (stat: string): string => {
    const capitalizedKey = stat.charAt(0).toUpperCase() + stat.slice(1);

    return `paint${capitalizedKey}`;
}