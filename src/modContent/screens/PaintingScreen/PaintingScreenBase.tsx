import { Avatar, Badge, Box, Typography } from '@mui/material';
import { EventStep, GameEvent, ModReduxAPI } from 'afnm-types';
import bg from '../../../assets/paintingScreen/paintingRoom.png';
import painting from '../../../assets/paintingScreen/painting.png';
import smallScroll from '../../../assets/paintingScreen/smallScroll.png';
import bigScroll from '../../../assets/paintingScreen/bigScroll.png';
import swordIcon from '../../../assets/paintingScreen/autobattleIcon.png';
import potionIcon from '../../../assets/paintingScreen/useItemIcon.png';
import scroll from '../../../assets/paintingScreen/frontTrialScroll.png';
import scrollSide from '../../../assets/paintingScreen/rightTrialScroll.png';
import scrollSide2 from '../../../assets/paintingScreen/leftTrialScroll.png';
import arrowIcon from '../../../assets/paintingScreen/arrow.png';
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import { EffectCreative, Mousewheel, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Close } from '@mui/icons-material';
import { Trial } from '../../types/Trial';

const scrollActive = scroll;

// Slides within this many steps of the centre are held at full opacity (so 7 are
// visible), and only fade across the final step as they arrive from offscreen.
const FULLY_VISIBLE_EACH_SIDE = 2;
const EDGE_FADE_AT = FULLY_VISIBLE_EACH_SIDE + 1;

const ENTITY_POSITIONS = [
    { left: '25%', topCombat: '34%', topCrafting: '35%' },
    { left: '73%', topCombat: '40%', topCrafting: '41%' },
    { left: '86%', topCombat: '54%', topCrafting: '55%' },
    { left: '74%', topCombat: '71%', topCrafting: '71%' },
    { left: '39%', topCombat: '56%', topCrafting: '57%' },
];

// EffectCreative overwrites each slide's own opacity every frame, so the fade is
// published as a custom property and consumed by a child element instead.
const applyEdgeFade = (swiper: SwiperClass) => {
  swiper.slides.forEach((slideEl) => {
    const progressRaw =
      (slideEl as HTMLElement & { progress?: number }).progress ?? 0;
    const distance = Math.abs(progressRaw);

    const fade =
      1 - Math.min(Math.max(distance - FULLY_VISIBLE_EACH_SIDE, 0), 1);
    slideEl.style.setProperty('--trial-fade', String(fade));

    const isLeft = progressRaw < 0;
    slideEl.style.setProperty('--side-left-opacity', isLeft ? '0' : '1');
    slideEl.style.setProperty('--side-right-opacity', isLeft ? '1' : '0');

    const clampedProgress = Math.min(Math.max(progressRaw, -1), 1);

    const rotX = 5 * Math.abs(clampedProgress);
    const rotY = -8 * clampedProgress;
    const rotZ = 3 * clampedProgress;

    slideEl.style.setProperty('--c-rot-x', `${rotX}deg`);
    slideEl.style.setProperty('--c-rot-y', `${rotY}deg`);
    slideEl.style.setProperty('--c-rot-z', `${rotZ}deg`);

    slideEl.style.setProperty('--side-padding-right', isLeft ? '0%' : '10%');
    slideEl.style.setProperty('--side-padding-left', isLeft ? '10%' : '0%');
  });
};

// Swiper animates its transforms with a transition rather than per-frame updates,
// so mirror the duration it picks (0 while dragging) to keep the fade in step.
const syncEdgeFadeDuration = (swiper: SwiperClass, duration: number) => {
  swiper.slides.forEach((slideEl) => {
    slideEl.style.setProperty('--trial-fade-duration', `${duration}ms`);
  });
};

interface PaintingScreenBaseProps {
    screenAPI: ModReduxAPI;
    trialsList: Trial[];
    trialNumberFlag: string;
}

export const PaintingScreenBase = ({ screenAPI, trialsList = [], trialNumberFlag }: PaintingScreenBaseProps) => {
  const { useSelector, usePlaySfx, actions, components, useGameFlags } =
    screenAPI;
    
  const {
    BackgroundImage,
    PlayerComponent,
    GameTooltip,
    tooltips,
    ItemComponent,
    GameIconButton,
  } = components;

  const playSfx = usePlaySfx();

  const { flags } = useGameFlags();
  const trialNumber = (flags[trialNumberFlag] || 0) < trialsList.length ? flags[trialNumberFlag] || 0 : trialsList.length - 1;

  const player = useSelector((state) => state.player.player);
  const breakthrough = useSelector((state) => state.breakthrough);
  
  const [selectedTrialIndex, setSelectedTrialIndex] = useState(trialNumber);
  const [maxTrialIndex, setMaxTrialIndex] = useState(trialNumber);

  const selectedTrial = trialsList[selectedTrialIndex] ?? null;
  const isCombat = selectedTrial?.kind === 'combat';

  const rewards = selectedTrial?.rewards ?? [];

  const enemyBuffs = isCombat 
    ? (selectedTrial?.enemiesBuffs ?? []).map(buff => ({ buff, target: 'enemy' as const }))
    : [];

  const allBuffs = isCombat ? [...(selectedTrial?.playerBuffs ?? []).map(buff => ({buff, target: 'player' as const})), ...enemyBuffs] : [...(selectedTrial?.playerBuffs ?? []).map(buff => ({buff, target: 'player' as const}))];

  const entities = isCombat 
    ? (selectedTrial?.enemies ?? []).slice(0, 5).map(enemy => enemy.image)
    : (selectedTrial?.recipe?.ingredients ?? []).slice(0, 5).map(ingredient => ingredient.item.icon);

  const titleText = `Trial ${selectedTrialIndex + 1} ● ${selectedTrial?.title ?? ''}`;

  const startTrial = () => {
    const steps: EventStep[] = [];

    if (selectedTrial?.kind === 'combat') {
      steps.push({
        kind: 'text',
        text: 'You enter the painting, bracing yourself for the next trial. The world distorts and flattens, turning into paint and ink. When you come to, the enemies are already approaching, giving you no time to prepare.'
      });

      if (selectedTrial?.additionalBeforeTrialSteps) {
        steps.push(...selectedTrial.additionalBeforeTrialSteps);
      }

      const victorySteps: EventStep[] = [
          {
            kind: 'text',
            condition: `${trialNumberFlag} <= ${selectedTrialIndex}`,
            text: 'Under your onslaught, all enemies become just spots of paint again and the painting rejoices in your victory, healing your injuries. Your hard-earned rewards are formed from the paint before you.'
          },
          {
            kind: 'text',
            condition: `${trialNumberFlag} > ${selectedTrialIndex}`,
            text: 'Under your onslaught, all enemies become just spots of paint again and the painting rejoices in your victory, healing your injuries.'
          },
          {
            kind: 'addMultipleItem',
           condition: `${trialNumberFlag} <= ${selectedTrialIndex}`,
            items: (selectedTrial?.rewards ?? []).map(reward => {return {item: {name: reward.name}, amount: `${reward.stacks}`}})
          },
          {
            kind: 'flag',
            condition: `${trialNumberFlag} <= ${selectedTrialIndex}`,
            global: true,
            flag: trialNumberFlag,
            value: `${trialNumberFlag} + 1`
          }
        ];
      
      if (selectedTrial?.additionalAfterTrialSuccessSteps) {
        victorySteps.push(...selectedTrial.additionalAfterTrialSuccessSteps);
      }

      victorySteps.push({
        kind: 'text',
        text: 'After this, a portal to the real world manifests near you, absorbing the colors from everything around you. Upon exiting, the world blurs again, and you find yourself before the painting.'
      });

      var defeatSteps: EventStep[] = [
        {
          kind: 'text',
          text: 'Despite all your efforts, you are unable to overcome the enemies and this trial, and you are forced to surrender. The painting erases the enemies and restores all injuries you received in this combat.'
        }
      ];

      if (selectedTrial?.additionalAfterTrialFailSteps) {
        defeatSteps.push(...selectedTrial.additionalAfterTrialFailSteps);
      }

      defeatSteps.push({
        kind: 'text',
        text: 'After this, a portal to the real world manifests near you, absorbing the colors from everything around you. Upon exiting, the world blurs again, and you find yourself before the painting.'
      });

      steps.push({
        kind: 'combat',
        enemies: (selectedTrial?.enemies ?? []).map(enemy => {
          const enemyCopy = {...enemy};

          if (enemyCopy.spawnCondition) {
            enemyCopy.spawnCondition.buffs.push(...(selectedTrial?.enemiesBuffs ?? []))
          }
          else {
            enemyCopy.spawnCondition = {hpMult: 1, buffs: selectedTrial?.enemiesBuffs ?? []}
          }

          enemyCopy.drops = [];
          enemyCopy.shardMult = 0;
          enemyCopy.qiMult = 0;

          return enemyCopy;
        }),
        playerBuffs: selectedTrial?.playerBuffs ?? [],
        isSpar: true,
        victory: victorySteps,
        defeat: defeatSteps,
      });
    }
    else if (selectedTrial?.kind === 'crafting') {
      steps.push({
        kind: 'text',
        text: 'You enter the painting, bracing yourself for the next trial. The world distorts and flattens, turning into paint and ink. When you come to, ingredients are already floating in the air before you, as if hinting to begin.'
      });

      if (selectedTrial?.additionalBeforeTrialSteps) {
        steps.push(...selectedTrial.additionalBeforeTrialSteps);
      }

      const addFailCraftSteps = (steps: EventStep[]): void => {
        steps.push({
          kind: 'text',
          text: 'With a quiet pop, the result of your efforts flies out of the cauldron. Although you have succeeded in creating item, its quality doesn\'t meet the trial requirements and the painting reacts with disapproval.'
        });

        if (selectedTrial?.additionalAfterTrialFailSteps) {
          steps.push(...selectedTrial.additionalAfterTrialFailSteps);
        }
      }

      const addWinCraftSteps = (steps: EventStep[]): void => {
        steps.push({
          kind: 'text',
          condition: `${trialNumberFlag} <= ${selectedTrialIndex}`,
          text: 'With a quiet pop, the result of your efforts flies out of the cauldron. The painting analyzes it and, deeming it worthy, rejoices in your success. Your hard-earned rewards are formed from the paint before you.'
        });

        steps.push({
          kind: 'text',
          condition: `${trialNumberFlag} > ${selectedTrialIndex}`,
          text: 'With a quiet pop, the result of your efforts flies out of the cauldron. The painting analyzes it and, deeming it worthy, rejoices in your success.'
        });

        steps.push({
            kind: 'addMultipleItem',
           condition: `${trialNumberFlag} <= ${selectedTrialIndex}`,
            items: (selectedTrial?.rewards ?? []).map(reward => {return {item: {name: reward.name}, amount: `${reward.stacks}`}})
        });

        steps.push({
          kind: 'flag',
          condition: `${trialNumberFlag} <= ${selectedTrialIndex}`,
          global: true,
          flag: trialNumberFlag,
          value: `${trialNumberFlag} + 1`
        });

        if (selectedTrial?.additionalAfterTrialSuccessSteps) {
          steps.push(...selectedTrial.additionalAfterTrialSuccessSteps);
        }
      }

      const basicSteps: EventStep[] = [];
      if (selectedTrial?.result !== 'normal') {
        addFailCraftSteps(basicSteps);
      }
      else {
        addWinCraftSteps(basicSteps);
      }

      basicSteps.push({
        kind: 'text',
        text: 'After this, a portal to the real world manifests near you, absorbing the colors from everything around you. Upon exiting, the world blurs again, and you find yourself before the painting.'
      });

      const perfectSteps: EventStep[] = [];
      if (selectedTrial?.result === 'sublime') {
        addFailCraftSteps(perfectSteps);
      }
      else {
        addWinCraftSteps(perfectSteps);
      }

      perfectSteps.push({
        kind: 'text',
        text: 'After this, a portal to the real world manifests near you, absorbing the colors from everything around you. Upon exiting, the world blurs again, and you find yourself before the painting.'
      });

      const sublimeSteps: EventStep[] = [];
      addWinCraftSteps(sublimeSteps);

      sublimeSteps.push({
        kind: 'text',
        text: 'After this, a portal to the real world manifests near you, absorbing the colors from everything around you. Upon exiting, the world blurs again, and you find yourself before the painting.'
      });

      const failSteps: EventStep[] = [];
      failSteps.push({
        kind: 'text',
        text: 'Despite all your efforts, you failed to create required item and overcome the trial, and the painting reacts with disapproval.'
      });

      if (selectedTrial?.additionalAfterTrialFailSteps) {
        failSteps.push(...selectedTrial.additionalAfterTrialFailSteps);
      }

      failSteps.push({
        kind: 'text',
        text: 'After this, a portal to the real world manifests near you, absorbing the colors from everything around you. Upon exiting, the world blurs again, and you find yourself before the painting.'
      });

      steps.push({
        kind: 'crafting',
        recipe: selectedTrial?.recipe?.name ?? 'Healing Pill (I) Recipe',
        basicCraftSkill: 1,
        perfectCraftSkill: 3,
        sublimeCraftSkill: 7,
        buffs: (selectedTrial?.playerBuffs ?? []).length > 0 ? selectedTrial?.playerBuffs : undefined,
        forceSublimeCrafting: selectedTrial?.isSublime ?? false,
        basic: basicSteps,
        perfect: perfectSteps,
        sublime: sublimeSteps,
        failed: failSteps
      })
    }

    const event: GameEvent = {
      location: 'Liang Tiao Village',
      steps
    };

    actions.startEvent(event);

    const { flags } = useGameFlags();
    const newTrialNumber = flags[trialNumberFlag] || 0;
    if (newTrialNumber > trialNumber) {
      setMaxTrialIndex(newTrialNumber);
    }
  }

  return (
    <Box position="relative" flexGrow={1} display="flex" flexDirection="column">
      <BackgroundImage image={bg} screenEffect="dust" />

      <GameIconButton
        onMouseEnter={() => playSfx('Hover')}
        onClick={() => {
          actions.setScreen('location');
        }}
        sx={{
          position: 'absolute',
          top: 20,
          right: 30,
          width: '50px',
          height: '50px',
        }}
        aria-label="Close Painting Screen"
      >
        <Close fontSize="large" />
      </GameIconButton>

      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        height="100%"
      >
        <Box
          width="60%"
          height="100%"
          ml="10%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            position="relative"
            sx={{
              aspectRatio: '1604 / 1052',
              backgroundImage: `url('${painting}')`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
            }}
          >
            {entities.map((imgSrc, index) => {
              const pos = ENTITY_POSITIONS[index];

              return (
                <Box
                  key={index}
                  position="absolute"
                  left={pos.left}
                  top={isCombat ? pos.topCombat : pos.topCrafting}
                  zIndex={3}
                  width="10%"
                  sx={{
                    transform: 'translate(-50%, -100%)',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '150%',
                      aspectRatio: '1',
                      zIndex: -1,

                      background:
                        'radial-gradient(circle, rgba(20, 10, 5, 0.65) 0%, rgba(20, 10, 5, 0) 65%)',
                      mixBlendMode: 'multiply',

                      backdropFilter: 'blur(2px)',
                    }}
                  />

                  <Box
                    component="img"
                    src={imgSrc}
                    sx={{
                      width: isCombat ? '100%' : '65%',
                      display: 'block',
                      mx: isCombat ? '0' : 'auto',

                      filter:
                        'sepia(30%) saturate(70%) contrast(85%) brightness(95%)',
                    }}
                  />
                </Box>
              );
            })}

            <Typography
              onClick={startTrial}
              sx={{
                position: 'absolute',
                top: '96%',
                left: '57%',
                transform: 'translate(-50%, -100%)',
                zIndex: 10,

                color: '#102b4e',
                fontSize: 'clamp(20px, 2.5vw, 45px)',
                fontWeight: 700,
                fontStyle: 'italic',
                letterSpacing: '3px',
                textTransform: 'uppercase',

                textShadow: `
                                0 0 10px rgba(255, 255, 255, 0.9), 
                                0 0 20px rgba(255, 255, 255, 0.7),
                                0 0 30px rgba(173, 216, 230, 0.6)
                            `,

                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',

                '&:hover': {
                  transform: 'translate(-50%, -100%) scale(1.05)',
                  color: '#0a1d36',
                  textShadow: `
                                    0 0 15px rgba(255, 255, 255, 1), 
                                    0 0 30px rgba(255, 255, 255, 0.9),
                                    0 0 45px rgba(173, 216, 230, 0.8)
                                `,
                },
              }}
            >
              Enter Painting
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              zIndex: 20,
              width: '89%',
              ml: '11%',
              position: 'relative',
              '& .swiper': {
                width: '100%',
                height: '100%',
                pb: '5%',
                pt: '2%',
                overflow: 'visible',
                containerType: 'size',
              },
              '& .swiper-slide': {
                width: 'min(22cqw, calc(100cqh * (1719 / 1861)))',
                aspectRatio: '1719 / 1861',

                display: 'flex',
                justifyContent: 'center',
                transition: 'filter 0.4s ease, transform 0.2s ease',
                filter: 'brightness(0.6)',
                '&:hover': {
                  filter: 'brightness(0.8)',
                  transform: 'translateY(-5%)',
                },

                '& .trial-name-and-icon': {
                  pr: 'var(--side-padding-right, 0%)',
                  pl: 'var(--side-padding-left, 0%)',
                },

                '& .trial-title': {
                  fontSize: 'clamp(12px, 1vw, 22px)',
                },
              },

              '& .swiper-slide-active': {
                filter: 'brightness(1)',

                '&:hover': {
                  filter: 'brightness(1)',
                },

                '& .trial-scroll-active': {
                  opacity: 1,
                },

                '& .trial-scroll-side-left, & .trial-scroll-side-right': {
                  opacity: '0 !important',
                },

                '& .trial-name-and-icon': {
                  mb: '1%',
                  pr: '0%',
                  pl: '0%',
                },

                '& .trial-title': {
                  fontSize: 'clamp(12px, 1.2vw, 22px)',
                },
              },
            }}
          >
            <Swiper
              centeredSlides={true}
              slidesPerView={'auto'}
              initialSlide={selectedTrialIndex}
              mousewheel={true}
              slideToClickedSlide={true}
              spaceBetween={0}
              effect="creative"
              creativeEffect={{
                limitProgress: EDGE_FADE_AT,
                prev: {
                  translate: ['-95%', '-10%', 0],
                  scale: 0.9,
                },
                next: {
                  translate: ['95%', '-10%', 0],
                  scale: 0.9,
                },
              }}
              navigation={{
                prevEl: '.custom-prev-button',
                nextEl: '.custom-next-button',
              }}
              onSetTranslate={applyEdgeFade}
              onSetTransition={syncEdgeFadeDuration}
              onAfterInit={applyEdgeFade}
              onSlideChange={(swiper) =>
                setSelectedTrialIndex(swiper.activeIndex)
              }
              modules={[Mousewheel, EffectCreative, Navigation]}
            >
              <Box
                className="custom-prev-button"
                sx={{
                  position: 'absolute',
                  top: '25%',
                  left: '-4.5%',
                  transform: 'translateY(-50%) scaleX(-1)',
                  zIndex: 40,
                  cursor: 'pointer',
                  aspectRatio: '1 / 2',
                  height: '20%',

                  backgroundImage: `url('${arrowIcon}')`,
                  backgroundSize: '100% 100%',

                  transition: 'all 0.2s ease',

                  '&:hover': {
                    transform: 'translateY(-50%) scaleX(-1) scale(1.1)',
                  },
                  '&.swiper-button-disabled': {
                    opacity: 0.3,
                    cursor: 'not-allowed',
                    pointerEvents: 'none',
                  },
                }}
              ></Box>
              <Box
                className="custom-next-button"
                sx={{
                  position: 'absolute',
                  top: '25%',
                  right: '-4.5%',
                  transform: 'translateY(-50%)',
                  zIndex: 40,
                  cursor: 'pointer',
                  aspectRatio: '1 / 2',
                  height: '20%',

                  backgroundImage: `url('${arrowIcon}')`,
                  backgroundSize: '100% 100%',

                  transition: 'all 0.2s ease',

                  '&:hover': {
                    transform: 'translateY(-50%) scale(1.1)',
                  },
                  '&.swiper-button-disabled': {
                    opacity: 0.3,
                    cursor: 'not-allowed',
                    pointerEvents: 'none',
                  },
                }}
              ></Box>

              {trialsList.slice(0, maxTrialIndex + 1).map((trial, index) => {
                return (
                  <SwiperSlide
                    key={`trial${index}`}
                    style={{
                      transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                      cursor: 'pointer',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        aspectRatio: '1719 / 1861',

                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',

                        opacity: 'var(--trial-fade, 1)',
                        transition:
                          'opacity var(--trial-fade-duration, 0ms) ease',

                        position: 'relative',
                      }}
                    >
                      <Box
                        className="trial-scroll-side-left"
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url('${scrollSide2}')`,
                          backgroundSize: '100% 100%',
                          backgroundPosition: 'center',
                          opacity: 'var(--side-left-opacity, 0)',
                          willChange: 'opacity',
                        }}
                      />

                      <Box
                        className="trial-scroll-side-right"
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url('${scrollSide}')`,
                          backgroundSize: '100% 100%',
                          backgroundPosition: 'center',
                          opacity: 'var(--side-right-opacity, 1)',
                          willChange: 'opacity',
                        }}
                      />
                      
                      <Box
                        className="trial-scroll-active"
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url('${scrollActive}')`,
                          backgroundSize: '100% 100%',
                          backgroundPosition: 'center',
                          opacity: 0,
                        }}
                      />

                      <Box
                        className="trial-name-and-icon"
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          width: '100%',
                          mb: '-0.5%',
                          transformOrigin: 'bottom center',
                          zIndex: 2,

                          transform:
                            'perspective(1200px) rotateX(var(--c-rot-x, 0deg)) rotateY(var(--c-rot-y, 0deg)) rotateZ(var(--c-rot-z, 0deg))',
                          transition:
                            'transform var(--trial-fade-duration, 0ms) ease',
                        }}
                      >
                        <Box
                          width="20%"
                          sx={{
                            position: 'relative',
                            mb: '2px',
                            aspectRatio: 1,
                            background:
                              trial.kind === 'combat'
                                ? `linear-gradient(135deg, #9e3333 0%, #701a1a 100%)`
                                : `linear-gradient(135deg, #368a59 0%, #17452b 100%)`,
                            mask:
                              trial.kind === 'combat'
                                ? `url('${swordIcon}') center/contain no-repeat`
                                : `url('${potionIcon}') center/contain no-repeat`,
                            WebkitMask:
                              trial.kind === 'combat'
                                ? `url('${swordIcon}') center/contain no-repeat`
                                : `url('${potionIcon}') center/contain no-repeat`,
                            mixBlendMode: 'multiply',
                          }}
                        />
                        <Typography
                          className="trial-title"
                          fontWeight={600}
                          fontStyle="italic"
                          sx={{
                            position: 'relative',
                            color: '#1b1814',
                            textShadow: '0 1px 1px rgba(255,255,255,0.4)',
                          }}
                        >
                          Trial {index + 1}
                        </Typography>
                      </Box>
                    </Box>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
        </Box>

        <Box
          ml="4%"
          mt="3%"
          width="22%"
          display="flex"
          flexDirection="column"
          gap="16px"
          height="100%"
        >
          <Box
            px="7%"
            py="6%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            zIndex={50}
            sx={{
              containerType: 'inline-size',
              aspectRatio: '2400 / 954',
              backgroundImage: `url('${smallScroll}')`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              overflow: 'hidden',
            }}
          >
            <Box
              width="50px"
              height="50px"
              mb={0.5}
              sx={{
                background: selectedTrial?.kind === 'combat' ? `linear-gradient(135deg, #9e3333 0%, #701a1a 100%)` : `linear-gradient(135deg, #368a59 0%, #17452b 100%)`,
                mask: selectedTrial?.kind === 'combat' ? `url('${swordIcon}') center/contain no-repeat` : `url('${potionIcon}') center/contain no-repeat`,
                WebkitMask:selectedTrial?.kind === 'combat' ? `url('${swordIcon}') center/contain no-repeat` : `url('${potionIcon}') center/contain no-repeat`,
                opacity: 0.9,
                mixBlendMode: 'multiply',
                filter:
                  'drop-shadow(0px 1px 0px rgba(255, 255, 255, 0.3)) drop-shadow(0px -1px 1px rgba(0,0,0,0.4))',
                flexShrink: 1,
              }}
            ></Box>

            <Typography
              fontStyle="italic"
              fontWeight={600}
              sx={{
                letterSpacing: '0.5px',
                color: '#1b1814',
                textShadow: `0 1px 2px rgba(255,255,255,0.2)`,
                width: '100%',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                // fontSize: 'clamp(10px, 1.5vw, 30px)',
                fontSize: `clamp(10px, calc(100cqi / ${titleText.length} * 1.9), 30px)`,
                mixBlendMode: 'multiply',
                opacity: 0.8,
              }}
            >
              {titleText}
            </Typography>
          </Box>

          <Box
            px="12%"
            pt="6%"
            pb="7%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="100%"
            zIndex={50}
            sx={{
              aspectRatio: '2346 / 1470',
              backgroundImage: `url('${bigScroll}')`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              overflow: 'hidden',
              pointerEvents: 'all',
            }}
          >
            <Typography
              fontStyle="italic"
              fontWeight={600}
              sx={{
                letterSpacing: '0.5px',
                color: '#1b1814',
                textShadow: `0 1px 2px rgba(255,255,255,0.2)`,
                width: '100%',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                fontSize: 'clamp(10px, 1.5vw, 30px)',
                mixBlendMode: 'multiply',
                opacity: 0.8,
              }}
            >
              Effects
            </Typography>

            <Box
              pl={allBuffs?.length > 0 ? "10%" : '0'}
              display="flex"
              gap="15px"
              alignItems={allBuffs?.length > 0 ? 'flex-start' : 'center'} 
              justifyContent={allBuffs?.length > 0 ? 'flex-start' : 'center'}
              flexWrap="wrap"
              flexGrow={1}
              width="100%"
              sx={{ minHeight: 0 }}
            >
              {allBuffs?.length === 0 ? (
                <Typography
                  fontStyle="italic"
                  fontWeight={500}
                  sx={{
                      color: '#1b1814', 
                      opacity: 0.6,
                      fontSize: 'clamp(16px, 1.5vw, 28px)',
                      textAlign: 'center',
                      textShadow: '0px 1px 1px rgba(255, 255, 255, 0.3)',
                  }}
                >
                  No special effects
                </Typography>
                ) : (
                  allBuffs.map((buff) => (
                  <Box
                    key={buff.buff.name}
                    sx={{ height: '45%', aspectRatio: '1', flexShrink: 0 }}
                  >
                    <GameTooltip
                      provider={() => (
                        <tooltips.BuffTooltip
                          buff={{ ...buff.buff }}
                          entity={window.modAPI.utils.createPlayerCombatEntity(
                            player,
                            breakthrough,
                          )}
                        />
                      )}
                    >
                      <Badge
                        badgeContent={buff.buff.stacks}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        sx={{
                          width: '100%',
                          height: '100%',

                          '& .MuiBadge-badge': {
                            backgroundColor: 'black',
                            color: 'white',
                            width: '35%',
                            height: '35%',
                            borderRadius: '50%',
                            border: '1px outset gold',
                            fontSize: 'clamp(10px, 1.2vw, 24px)',
                            minWidth: 0,
                            padding: 0,

                            right: '20%',
                            bottom: '21%',
                            pr: '1px',
                            pt: '5px',
                          },
                        }}
                      >
                        <Avatar
                          sx={{
                            width: '100%',
                            height: '100%',
                            border: buff.target === 'player' ? '3px outset #368a59' : '3px outset #8b1a1a',
                            background: 'colour' in buff.buff ? buff.buff.colour ?? 'rgb(50,50,50)' : 'rgb(50,50,50)',
                          }}
                          src={buff.buff.icon}
                        />
                      </Badge>
                    </GameTooltip>
                  </Box>
                ))
              )}
            </Box>
          </Box>

          <Box
            px="12%"
            pt="6%"
            pb="7%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="100%"
            zIndex={50}
            sx={{
              aspectRatio: '2346 / 1470',
              backgroundImage: `url('${bigScroll}')`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              overflow: 'hidden',
              pointerEvents: 'all',
            }}
          >
            <Typography
              fontStyle="italic"
              fontWeight={600}
              sx={{
                letterSpacing: '0.5px',
                color: '#1b1814',
                textShadow: `0 1px 2px rgba(255,255,255,0.2)`,
                width: '100%',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                fontSize: 'clamp(10px, 1.5vw, 30px)',
                mixBlendMode: 'multiply',
                opacity: 0.8,
              }}
            >
              Rewards
            </Typography>

            <Box
              pl="10%"
              display="flex"
              gap="15px"
              alignItems="flex-start"
              justifyContent="flex-start"
              flexWrap="wrap"
              flexGrow={1}
              width="100%"
              sx={{ minHeight: 0 }}
            >
              {rewards.map((reward) => (
                <Box sx={{ height: '45%', aspectRatio: '1', flexShrink: 0 }}>
                  <GameTooltip
                    key={reward.name}
                    provider={() => (
                      <tooltips.ItemTooltip
                        item={reward}
                        equipped={undefined}
                        entity={window.modAPI.utils.createPlayerCombatEntity(
                          player,
                          breakthrough,
                        )}
                        craftingEntity={window.modAPI.utils.createPlayerCraftingEntity(
                          player,
                          breakthrough,
                        )}
                        player={player}
                      />
                    )}
                  >
                    <Box width="100%" height="100%">
                      <ItemComponent item={reward} equipped={false} size="100%" />
                    </Box>
                  </GameTooltip>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        position="absolute"
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        sx={{ pointerEvents: 'none', zIndex: 100 }}
      >
        <Box flexGrow={1} />
        <Box display="flex">
          <PlayerComponent />
        </Box>
      </Box>
    </Box>
  );
};
