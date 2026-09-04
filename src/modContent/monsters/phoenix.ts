import { Buff, EnemyEntity, Technique } from "afnm-types";
import image from '../../assets/monster/phoenix/phoenix.png';
import offensiveImage from '../../assets/monster/phoenix/phoenix-offensive2.png';
import hitImageAsset from '../../assets/monster/phoenix/phoenix-hit.png';
import fireTorrentIcon from '../../assets/monster/phoenix/FireTorrent.png';
import phoenixFlameIcon from '../../assets/monster/phoenix/PhoenixFlame.png';
import fieryRegenerationIcon from '../../assets/monster/phoenix/FieryRegeneration.png';
import clawStrikeIcon from '../../assets/monster/phoenix/ClawStrike.png';

const clawStrike: Technique = {
    name: 'Claw Strike',
    icon:clawStrikeIcon,
    type: 'none',
    effects: [
        {
            kind: 'damage',
            amount: {
                value: 1,
                stat: 'power',
            }
        }
    ]
}

const phoenixFlame: Buff = {
    name: 'Phoenix Flame',
    icon:phoenixFlameIcon,
    canStack: true,
    stacks: 1,
    stats: {
        vulnerability: {
            value: 5,
            stat: undefined,
            scaling: 'stacks',
        }
    },
    afterTechniqueEffects: [
        {
            kind: 'damageSelf',
            amount: {
                value: 0.02,
                stat: 'power',
                scaling: 'stacks'
            }
        }
    ],
    onRoundEffects: [
        {
            kind: 'add',
            amount: {
                value: -1,
                stat: undefined,
            }
        }
    ]
}

const fireTorrent: Technique = {
    name: 'Fire Torrent',
    icon:fireTorrentIcon,
    type: 'none',
    effects: [
        {
            kind: 'damage',
            amount: {
                value: 0.7,
                stat: 'power',
            }
        },
        {
            kind: 'buffTarget',
            buff: phoenixFlame,
            amount: {
                value: 1,
                stat: undefined,
            }
        }
    ]
}

const fieryRegeneration: Technique = {
    name: 'Fiery Regeneration',
    icon:fieryRegenerationIcon,
    type: 'none',
    effects: [
        {
            kind: 'heal',
            amount: {
                value: 1,
                stat: 'power',
            }
        }
    ]
}

export const youngPhoenix: EnemyEntity = {
    name: 'Young Phoenix',
    image:image,
    offensiveImage: { image: offensiveImage },
    hitImage: { image: hitImageAsset },
    imageScale: 1,
    realm: 'bodyForging',
    realmProgress: 'Middle',
    difficulty: 'hard',
    battleLength: 'long',
    stances: [
        {
            name: 'Claw Attack',
            techniques: [clawStrike, fireTorrent, clawStrike]
        },
        {
            name: 'Fire Torrent',
            techniques: [fireTorrent, clawStrike, fireTorrent]
        },
        {
            name: 'Phoenix Regeneration',
            techniques: [fieryRegeneration, fireTorrent, fieryRegeneration]
        }
    ],
    stanceRotation: [
        {
            kind: 'single',
            stance: 'Claw Attack'
        },
        {
            kind: 'single',
            stance: 'Fire Torrent'
        },
        {
            kind: 'single',
            stance: 'Phoenix Regeneration'
        },
    ],
    rotationOverrides: [],
    drops: []
}