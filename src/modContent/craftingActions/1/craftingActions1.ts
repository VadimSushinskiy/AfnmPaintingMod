import { CraftingTechnique } from "afnm-types";
import { fourColorArray } from "./fourColorArray";
import { paintedPerfection } from "./paintedPerfection";
import { paintedCompletion } from "./paintedCompletion";
import { paintedRestoration } from "./paintedRestoration";
import { paintedStabilization } from "./paintedStabilization";
import { colorBlur } from "./colorBlur";

export const craftingActions1: CraftingTechnique[] = [
    fourColorArray,
    paintedPerfection,
    paintedCompletion,
    paintedRestoration,
    paintedStabilization,
    colorBlur,
]