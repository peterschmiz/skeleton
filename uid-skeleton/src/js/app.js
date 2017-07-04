import loadSvgSprite from './utils/svg-sprite-loader';
import { sampleModule } from './modules/sample-module';

class App {
  constructor() {
    loadSvgSprite();
    sampleModule.init();
  }
}

export default App;

window.addEventListener('load', () => new App());
