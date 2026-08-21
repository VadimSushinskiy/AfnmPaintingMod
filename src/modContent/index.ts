import icon from '../assets/image.png';
import { initializeCraftingActions } from './craftingActions/initializeCraftingActions';
import { initializeItems } from './items/initializeItems';
import { PaintingScreenBf } from './screens/PaintingScreen/PaintingScreenBf';
import { initializeTechniques } from './techniques/initializeTechniques';

initializeTechniques();
initializeCraftingActions();
initializeItems();

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