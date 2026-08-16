import { TechniqueItem } from "afnm-types";
import { paintingTechniques } from "../../techniques/paintingTechniques";

export const techniqueItems: TechniqueItem[] = paintingTechniques
    .filter((e) => e.realm)
    .map((e) => ({
        subKind: 'technique',
        technique: e.name,
        kind: 'technique',
        name: e.name,
        element: e.type,
        description: `The knowledge of how to perform the '${e.name}' technique.`,
        icon: e.icon,
        stacks: 1,
        rarity: 'mundane',
        realm: e.realm!,
    }));