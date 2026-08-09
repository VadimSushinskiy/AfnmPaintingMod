import icon from '../assets/image.png';
import { PaintingScreenBf } from './screens/PaintingScreen/PaintingScreenBf';

window.modAPI.actions.addScreen({
  key: 'challengePaintingScreen',
  component: PaintingScreenBf,
});

window.modAPI.actions.addBuildingsToLocation('Liang Tiao Village', [
  {
    kind: 'modBuilding',
    name: 'Painting',
    displayName: 'Painting',
    icon: icon,
    screen: 'challengePaintingScreen',
    position: 'belowtop',
  }
]);