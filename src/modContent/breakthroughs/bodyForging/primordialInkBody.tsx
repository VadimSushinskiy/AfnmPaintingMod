import { Breakthrough, ModOptionsFC } from "afnm-types";
import { ink, paintingColor } from "../../techniques/painting";
import iconAsset from '../../../assets/breakthrough/PrimordialInkBody.png';
import { fleshObliterationPill } from "../../items/breakthrough/fleshObliterationPill";

export const primordialInkBody: Breakthrough = {
    name: 'Primordial Ink Body',
    description: `Discard your mortal form via the obliteration pill, and perfect it using ink as a medium to become incarnation of the most primordial creation. This is the beginning of the Path of Creation.`,
    physicalStats: {
        eyes: 1,
        meridians: 1,
        dantian: 1,
        muscles: 1,
        flesh: 1,
        digestion: 1,
    },
    socialStats: {
        lifespan: 60,
        charisma: window.modAPI.utils.getBreakthroughCharisma('meridianOpening', 1),
    },
    combatBuffs: [
        {
            buff: {
                name: 'Primordial Ink Body',
                icon:iconAsset,
                canStack: false,
                stacks: 1,
                stats: undefined,
                onRoundStartEffects: [
                    {
                        kind: 'buffSelf',
                        buff: ink,
                        amount: {
                            value: 2,
                            stat: undefined,
                        }
                    }
                ],
                colour: paintingColor,
                type: 'none',
            },
            buffStacks: {
                value: 1,
                stat: undefined,
            }
        }
    ],
    allowedSlotItems: {
        brain: ['Remembrance of Power'],
        heart: ['Ocean Nephrite'],
        pill: ['Flesh Annihilation Pill', fleshObliterationPill.name],
        groin: ['Spirit Core (I)'],
    },
    unlocked: (flags) => true,
    //hint:,
    // requirements: [
    //     (args) => ({
    //         done: args.breakthrough.bodyForging?.brain === 'Remembrance of Power',
    //         preview: (

    //         )
    //     }),
    // ],
    requirements: window.modAPI.gameData.breakthroughs['bodyForging'].find(b => b.name === 'Flawless Nephrite Body')?.requirements ?? [],
    totalRequirements: 4,
    getNumDone: (args): number => {
        let count = 0;
        if (args.breakthrough.bodyForging?.brain === 'Remembrance of Power') {
        count++;
        }
        if (args.breakthrough.bodyForging?.heart === 'Ocean Nephrite') {
        count++;
        }
        if (args.breakthrough.bodyForging?.pill === 'Flesh Annihilation Pill') {
        count++;
        }
        if (args.breakthrough.bodyForging?.groin === 'Spirit Core (I)') {
        count++;
        }
        return count;
    },
}