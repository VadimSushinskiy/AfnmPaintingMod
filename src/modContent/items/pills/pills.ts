import { Item } from "afnm-types";
import { fantasyZenithPills, fantasyZenithPillsPlus, fantasyZenithPillsS } from "./combatPills/fantasyZenithPill";
import { unityPills, unityPillsPlus, unityPillsS } from "./unityPill";
import { reagents } from "./craftingReagents/reagents";
import { energyResonancePills, energyResonancePillsPlus, energyResonancePillsS } from "./combatPills/energyResonancePill";
import { bindingAgonyPillsAll } from "./combatPills/bindingAgonyPill";

export const pills: Item[] = [
    ...fantasyZenithPills,
    ...fantasyZenithPillsPlus,
    ...fantasyZenithPillsS,
    ...energyResonancePills,
    ...energyResonancePillsPlus,
    ...energyResonancePillsS,
    ...bindingAgonyPillsAll,
    ...unityPills,
    ...unityPillsPlus,
    ...unityPillsS,
    ...reagents,
];