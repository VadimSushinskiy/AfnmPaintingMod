import { TreasureItem } from "afnm-types";

export const failedTrialResult: TreasureItem = {
    kind: 'treasure',
    name: 'Failed Trial Result',
    description: 'A failed attempt to overcome crafting trial.',
    icon: window.modAPI.gameData.items['Failed Legacy Key'].icon,
    stacks: 1,
    rarity: 'mundane',
    realm: 'bodyForging',
    hideRealmTier: true,
}