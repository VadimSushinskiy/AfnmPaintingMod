import { Buff } from "afnm-types";
import iconAsset from '../../assets/techniques/Inks.png';

export const inks: Buff = {
    name: 'Inks',
    icon: iconAsset,
    canStack: true,
    stats: undefined,
    effectHint: 'Spent to activate certain Painting techniques',
    stacks: 1,
    cantUpgrade: true
}