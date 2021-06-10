import '../public/style.scss';
import map from './map';
import location from './lib/location';
import calcuateP2L from './lib/calculator';

const app = elem => {
  const state = {
    width: 500,
    height: 500,
    zoom: 16
  };

  const $elem = document.querySelector(elem);
  const geo = location();

  const init = () => {
    geo.getPos().then(pos => {
      $elem.appendChild(map(state.width, state.height, pos.lat, pos.lot, state.zoom));
      const {lot, lat} = calcuateP2L({
        lat: pos.lat,
        lot: pos.lot
      }, state.zoom, state.width, state.height,
      {
        x: 500,
        y: 250
      });
      $elem.appendChild(map(state.width, state.height, lat, lot, state.zoom));
    });
  };

  const render = () => {
    init();
  };

  render();

  return $elem;
};

app('.map');
