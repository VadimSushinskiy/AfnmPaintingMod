import { Item } from "afnm-types";
import { fantasyZenithPills, fantasyZenithPillsPlus, fantasyZenithPillsS } from "./combatPills/fantasyZenithPill";
import { unityPills, unityPillsPlus, unityPillsS } from "./craftingPills/unityPill";
import { reagents } from "./craftingReagents/reagents";
import { energyResonancePills, energyResonancePillsPlus, energyResonancePillsS } from "./combatPills/energyResonancePill";
import { bindingAgonyPillsAll } from "./combatPills/bindingAgonyPill";
import { blindPrecisionPillsAll } from "./combatPills/blindPrecisionPill";
import { stabilityConversionPillsAll } from "./craftingPills/stabilityConversionPill";

export const pills: Item[] = [
    ...fantasyZenithPills,
    ...fantasyZenithPillsPlus,
    ...fantasyZenithPillsS,
    ...energyResonancePills,
    ...energyResonancePillsPlus,
    ...energyResonancePillsS,
    ...bindingAgonyPillsAll,
    ...blindPrecisionPillsAll,
    ...unityPills,
    ...unityPillsPlus,
    ...unityPillsS,
    ...stabilityConversionPillsAll,
    ...reagents,
];