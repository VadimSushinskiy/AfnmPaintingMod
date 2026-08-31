import { TreasureItem } from "afnm-types";

export const successfulTrialResult: TreasureItem = {
    kind: 'treasure',
    name: 'Successful Trial Result',
    description: 'A successful attempt to overcome crafting trial.',
    icon: window.modAPI.gameData.items['True Legacy Key'].icon,
    stacks: 1,
    rarity: 'empowered',
    realm: 'bodyForging',
    hideRealmTier: true,
}