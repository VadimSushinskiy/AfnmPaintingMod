import { Item } from "afnm-types";
import { techniqueItems } from "./techniques/technique";
import { flames } from "./flames/flames";
import { talismans } from "./talismans/talismans";
import { materials } from "./materials/materials";
import { recipes } from "./recipes/recipes";
import { mounts } from "./mounts/mounts";
import { pills } from "./pills/pills";

export const items: Item[] = [
    ...materials,
    ...techniqueItems,
    ...talismans,
    ...mounts,
    ...flames,
    ...pills,
    ...recipes,
]