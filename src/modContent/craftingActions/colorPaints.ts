import { CraftingBuff } from 'afnm-types';
import bluePaintIcon from '../../assets/techniques/craftingPaints/BluePaint.png';
import greenPaintIcon from '../../assets/techniques/craftingPaints/GreenPaint.png';
import yellowPaintIcon from '../../assets/techniques/craftingPaints/YellowPaint.png';
import purplePaintIcon from '../../assets/techniques/craftingPaints/PurplePaint.png';

const bluePaint: CraftingBuff = {
    name: 'Blue Paint',
    icon:bluePaintIcon,
    canStack: true,
    stats: {
        control: { value: 0.01, stat: 'control', scaling: 'stacks' }
    },
    effects: [],
    stacks: 1,
    displayLocation: 'none',
}

const greenPaint: CraftingBuff = {
    name: 'Green Paint',
    icon:greenPaintIcon,
    canStack: true,
    stats: {
        intensity: { value: 0.01, stat: 'intensity', scaling: 'stacks' },
        
    },
    effects: [],
    stacks: 1,
    displayLocation: 'none',
}

const yellowPaint: CraftingBuff = {
    name: 'Yellow Paint',
    icon:yellowPaintIcon,
    canStack: true,
    stats: {
        stabilityCostPercentage: { value: 1, stat: undefined, eqn: '100 - min((stacks * 0.5), 99)'}
    },
    statsTooltip: `Decrease <b>Stability cost</b> of all actions by <num>0.5%</num> per stack.`,
    effects: [],
    stacks: 1,
    displayLocation: 'none',
}

const purplePaint: CraftingBuff = {
    name: 'Purple Paint',
    icon:purplePaintIcon,
    canStack: true,
    stats: {
        poolCostPercentage: { value: 1, stat: undefined, eqn: '100 - min((stacks * 0.5), 99)'}
    },
    statsTooltip: `Decrease <b>Qi Pool cost</b> of all actions by <num>0.5%</num> per stack.`,
    effects: [],
    stacks: 1,
    displayLocation: 'none',
}

export const colorPaints = {
    blue: bluePaint,
    green: greenPaint,
    yellow: yellowPaint,
    purple: purplePaint,
}