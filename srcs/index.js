import '../public/style.scss';
import map from './map';
import location from './lib/location';

const app = elem => {
  const state = {
    width: 1000,
    height: 1000,
    zoom: 16
  };

  const $elem = document.querySelector(elem);
  const geo = location();

  const init = () => {
    geo.getPos().then(pos => {
      $elem.appendChild(map(state.width, state.height, pos.lat, pos.lot, state.zoom));
    });
  };

  const render = () => {
    init();
  };

  render();

  return $elem;
};

app('.map');
