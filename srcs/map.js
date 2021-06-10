import * as env from '../.env';
import draggable from './lib/dragable';
import calculateP2L from './lib/calculator';

const map = (width, height, lat, lot, zoom) => {
  let state = {
    width,
    height,
    lat,
    lot,
    zoom
  };

  const $elem = document.createElement('img');

  const render = () => {
    $elem.src = `${env.BASE_URL}`
                + `?w=${state.width}&h=${state.height}&center=${state.lot},${state.lat}&level=${state.zoom}`
                + `&X-NCP-APIGW-API-KEY-ID=${env.CLIENT_ID}`;
  };

  const setState = (key, value) => {
    state = Object.assign({}, state, {[key]: value});
  };

  const changeCenter = () => {
    const left = parseInt($elem.style.getPropertyValue('--left'), 10);
    const top = parseInt($elem.style.getPropertyValue('--top'), 10);

    console.log((state.width / 2) - (isNaN(left) ? 0 : left + 250));
    console.log((state.height / 2) - (isNaN(top) ? 0 : top + 250));

    const { lat, lot } = calculateP2L({
      lat: state.lat,
      lot: state.lot
    }, state.zoom, state.width, state.height, {
      x: (state.width / 2) - (isNaN(left) ? 0 : (left + 250) / 2),
      y: (state.height / 2) - (isNaN(top) ? 0 : (top + 250) / 2)
    });
    document.querySelector('.map').appendChild(map(1000, 1000, lat, lot, 16));
  };

  const eventBind = () => {
    $elem.addEventListener('mousedown', draggable($elem, -250, -250, changeCenter));
  };

  (() => {
    $elem.classList.add('staticMap');
    render();
    eventBind();
  })();

  return $elem;
};

export default map;
