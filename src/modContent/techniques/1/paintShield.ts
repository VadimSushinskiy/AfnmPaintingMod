import { Buff, Technique } from "afnm-types";
import { inks, paintingTechsType } from "../painting";
import iconAsset from '../../../assets/techniques/1/PaintShield.png';
import { SketchTechniqueSignature } from "../helpers/sketchTypes";

export const paintShieldSignature: SketchTechniqueSignature = {
    name: 'Shield',
    stateKey: 'paintShield',
    trigger: 'paintShieldTrigger',
    playerManifestationEffects: {
        maxBarrier: 10,
        barrierEffectiveness: 10,
    },
    enemyManifestationEffects: {},
}

export const paintShieldPreviewBuff: Buff = {
    name: 'Shield',
    icon: iconAsset,
    canStack: false,
    stacks: 1,
    stats: {},
    tooltip: 'When manifested:<br/>Gain <num>+10%</num> Max Barrier<br/>Gain <num>+10%</num> Barrier Effectiveness',
    buffType: 'Sketch',
}

export const paintShield: Technique = {
    name: 'Paint Shield',
    icon: iconAsset,
    type: 'none',
    noneType: paintingTechsType,
    realm: 'bodyForging',
    costs: [
        {
            buff: inks,
            amount: 1,
        }
    ],
    effects: [
        {
            kind: 'barrier',
            amount: {
                value: 1,
                stat: 'power',
            }
        },
        {
            kind: 'trigger',
            triggerKey: paintShieldSignature.trigger,
            amount: { value: 1, stat: undefined }
        },
        {
            kind: 'buffSelf',
            buff: paintShieldPreviewBuff,
            amount: {value: 0, stat: undefined},
            condition: {
                kind: 'chance',
                percentage: 0,
            }
        }
    ],
    tooltip: `Gain {barrier.amount} barrier and add <name>Sketch: Shield</name> to all your <name>Painting Surfaces</name>.<br/>`,
    disableCrystalDrop: true,
}