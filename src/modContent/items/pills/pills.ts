import { Item, PillItem } from "afnm-types";
import { fantasyZenithPills, fantasyZenithPillsPlus, fantasyZenithPillsS } from "./fantasyZenithPill";
import { unityPills, unityPillsPlus, unityPillsS } from "./unityPill";
import { reagents } from "./craftingReagents/reagents";

export const pills: Item[] = [
    ...fantasyZenithPills,
    ...fantasyZenithPillsPlus,
    ...fantasyZenithPillsS,
    ...unityPills,
    ...unityPillsPlus,
    ...unityPillsS,
    ...reagents,
];