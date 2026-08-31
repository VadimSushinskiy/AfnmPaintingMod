import { Item } from "afnm-types";
import { techniqueItems } from "./techniques/technique";
import { flames } from "./flames/flames";
import { talismans } from "./talismans/talismans";
import { materials } from "./materials/materials";
import { recipes } from "./recipes/recipes";
import { mounts } from "./mounts/mounts";
import { pills } from "./pills/pills";
import { blueprints } from "./blueprints/blueprints";
import { breakthrough } from "./breakthrough/breakthrough";
import { craftingActionItems } from "./techniques/craftingAction";
import { treasures } from "./treasures/treasures";

export const items: Item[] = [
    ...materials,
    ...treasures,
    ...techniqueItems,
    ...craftingActionItems,
    ...talismans,
    ...mounts,
    ...flames,
    ...pills,
    ...blueprints,
    ...breakthrough,
    ...recipes,
]