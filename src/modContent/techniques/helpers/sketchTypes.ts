import { Buff } from "afnm-types";

export interface SketchTechniqueActiveEffect {
    damage?: number;
    barrier?: number;
    heal?: number;
    temphp?: number;
    buffSelf?: Buff[];
    buffTarget?: Buff[];
}

export interface SketchTechniqueEffect {
    power?: number;
    artefactPower?: number;
    protection?: number;
    defense?: number;
    dr?: number;
    maxHealth?: number;
    maxBarrier?: number;
    maxToxicity?: number;
    itemEffectiveness?: number;
    critChance?: number;
    critDamage?: number;
    overcrit?: number;
    barrierEffectiveness?: number;
    damageBoost?: number;
    barrierBoost?: number;
    healingBoost?: number;
    temphpBoost?: number;
    barrierBleed?: number;
    bulwarkOverheal?: number;
    vitalOverheal?: number;
    bloodBoost?: number;
    blossomBoost?: number;
    fistBoost?: number;
    cloudBoost?: number;
    weaponBoost?: number;
    celestialBoost?: number;
    bloodResistance?: number;
    blossomResistance?: number;
    fistResistance?: number;
    cloudResistance?: number;
    weaponResistance?: number;
    celestialResistance?: number;
    vulnerability?: number;
    weakness?: number;
    itemsPerRound?: number;
    dropletBoost?: number;
    openerBoost?: number;
    finisherBoost?: number;
    beforeTechEffects?: SketchTechniqueActiveEffect;
    afterTechEffects?: SketchTechniqueActiveEffect;
    roundStartEffects?: SketchTechniqueActiveEffect;
    roundEndEffects?: SketchTechniqueActiveEffect;
}

export interface SketchTechniqueSignature {
    name: string;
    stateKey: string;
    trigger: string;
    playerManifestationEffects: SketchTechniqueEffect;
    enemyManifestationEffects: SketchTechniqueEffect;
}

export type ManifestationSource = 'playerManifestationEffects' | 'enemyManifestationEffects';
export type TimingPhase = 'afterTechEffects' | 'beforeTechEffects' | 'roundStartEffects' | 'roundEndEffects';
export type TargetKind = 'buffSelf' | 'buffTarget';

export const PREFIX_MAP: Record<TimingPhase, Record<TargetKind, string>> = {
    afterTechEffects: { buffSelf: 'AETP', buffTarget: 'AETT' },
    beforeTechEffects: { buffSelf: 'BETP', buffTarget: 'BETT' },
    roundStartEffects: { buffSelf: 'RSEP', buffTarget: 'RSET' }, 
    roundEndEffects: { buffSelf: 'REEP', buffTarget: 'REET' }  
};

export const PHASE_PREFIXES = {
    afterTechEffects: 'AET',
    beforeTechEffects: 'BET',
    roundStartEffects: 'RSE',
    roundEndEffects: 'REE'
} as const;
export type PhaseKey = keyof typeof PHASE_PREFIXES;