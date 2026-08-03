import { Box } from "@mui/material";
import inkImg from "../../../assets/testInk5.png";

export const MonsterFormation = () => {
    const SPACING_X = 85;
    const SPACING_Y = 50;

    const enemies = ['Gorashi', 'Lingyu Lurker', 'Feathzui', 'Ratascar', 'Taoheti', 'Jurenzai Swarmhost'];
    // const enemies = ['Gorashi', 'Gorashi', 'Gorashi'];
    // const enemies = ['Gorashi']

    // const getFormationPosition = (index: number): { x: number, row: number } => {
    //     if (index === 0) return { x: 0, row: 0 };

    //     const row = Math.ceil(index / 2);
    //     const isLeft = index % 2 !== 0;
        
    //     const x = isLeft ? -row : row; 

    //     return { x, row };
    // };

    const getFormationPosition = (index: number): { row: number, xOffset: number } => {
        let row = 0; 
        let itemsInRow = 1; 
        let positionInRow = index; 

        while (positionInRow >= itemsInRow) {
            positionInRow -= itemsInRow;
            row++;
            itemsInRow++;
        }

        const xOffset = positionInRow - (itemsInRow - 1) / 2;

        return { row, xOffset };
    };

    const getFormationScale = (enemiesCount: number) => {
        if (enemiesCount === 1) return 'scale(1.4)';
        if (enemiesCount >= 2 && enemiesCount <= 3) return 'scale(1.2)';
        if (enemiesCount >= 4 && enemiesCount <= 6) return 'scale(1)';
        if (enemiesCount >= 7) return 'scale(0.85)';
        return 'scale(1)';
    };

    return (
        <Box position="relative" width="100%" height="100%" display="flex" flexGrow={1} sx={{ transform: getFormationScale(enemies.length), transformOrigin: 'center center' }}>
            {(() => {
                const maxRow = enemies.length > 0 ? getFormationPosition(enemies.length - 1).row : 0;
                const verticalCenterOffset = (maxRow * SPACING_Y) / 2;

                return enemies.map((enemyName, index) => {
                const { row, xOffset } = getFormationPosition(index);
                
                const translateX = xOffset * SPACING_X;
                const bottomOffset = row * SPACING_Y; 
                
                const zIndex = 100 - row;
                
                const scale = 1 - (row * 0.1);

                return (
                    <Box 
                        key={index}
                        position="absolute"
                        left='50%'
                        top='50%'
                        zIndex={zIndex}
                        width='35%'
                        sx={{
                            transform: `translate(calc(-50% + ${translateX}%), calc(-50% - ${bottomOffset}px + ${verticalCenterOffset}px)) scale(${scale})`,
                        }}
                    >
                        <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
                            <Box 
                                component="img" 
                                src={window.modAPI.gameData.monsters.find(m => m.name === enemyName)?.image} 
                                sx={{ width: '80%', zIndex: 2 }} 
                            />
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '65px',
                                    borderRadius: '50%',
                                    
                                    backgroundImage: `url(${inkImg})`,

                                    // background: `
                                    //     radial-gradient(ellipse at 40% 45%, #050505 10%, transparent 60%),
                                    //     radial-gradient(ellipse at 60% 55%, #0a0a0a 15%, transparent 65%),
                                    //     radial-gradient(ellipse at 50% 50%, rgba(20, 20, 20, 0.9) 30%, rgba(70, 70, 75, 0.35) 70%, transparent 85%)
                                    // `,
                                    // WebkitMaskImage: `
                                    //     radial-gradient(ellipse at 45% 50%, black 35%, transparent 75%),
                                    //     radial-gradient(ellipse at 75% 40%, black 20%, transparent 65%),
                                    //     radial-gradient(ellipse at 25% 60%, black 15%, transparent 60%)
                                    // `,
                                    // WebkitMaskComposite: 'add',
                                    // maskImage: `
                                    //     radial-gradient(ellipse at 45% 50%, black 35%, transparent 75%),
                                    //     radial-gradient(ellipse at 75% 40%, black 20%, transparent 65%),
                                    //     radial-gradient(ellipse at 25% 60%, black 15%, transparent 60%)
                                    // `,
                                    // maskComposite: 'add',

                                    // transform: 'scaleY(0.4) rotate(-3deg)',
                                    // // boxShadow: '0 0 15px 8px rgba(0, 0, 0, 0.7), inset 0px 2px 6px rgba(255, 255, 255, 0.04)',
                                    // marginTop: '-45px', 
                                    // zIndex: 1,

                                    backgroundSize: '100% 100%',
                                    // backgroundPosition: 'center bottom',
                                    // filter: 'brightness(0.6)',
                                    // transform: 'scaleY(0.8)',
                                    // borderBottom: '12px solid rgba(0,0,0,0.8)',
                                    // boxShadow: 'inset 0 -10px 20px rgba(0, 0, 0, 0.3)',
                                    filter: 'blur(50%)',
                                    marginTop: '-55px', 
                                    zIndex: 1,
                                }}
                            />
                        </Box>
                    </Box>
                );
            })
            })()}
        </Box>
    );
}