import { TreasureItem, Technique } from 'afnm-types';

import icon from '../assets/image.png';
import { TestScreen } from './screens/TestScreen/TestScreen';
import { PaintingScreen } from './screens/PaintingScreen/PaintingScreen';

window.modAPI.actions.addScreen({
  key: 'testWelcomeScreen',
  component: TestScreen
});

window.modAPI.actions.addScreen({
  key: 'challengePaintingScreen',
  component: PaintingScreen
});

window.modAPI.actions.addBuildingsToLocation('Liang Tiao Village', [
  {
    kind: 'modBuilding',
    name: 'Test Building Mod',
    displayName: 'Test Building Mod',
    icon: icon,
    screen: 'testWelcomeScreen',
    position: 'middleleft'
  }
]);

window.modAPI.actions.addBuildingsToLocation('Liang Tiao Village', [
  {
    kind: 'modBuilding',
    name: 'Painting',
    displayName: 'Painting',
    icon: icon,
    screen: 'challengePaintingScreen',
    position: 'belowtop'
  }
]);