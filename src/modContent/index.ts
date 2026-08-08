import icon from '../assets/image.png';
import { PaintingScreen } from './screens/PaintingScreen/PaintingScreen';

window.modAPI.actions.addScreen({
  key: 'challengePaintingScreen',
  component: PaintingScreen
});

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