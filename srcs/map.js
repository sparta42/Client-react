import * as env from '../.env';
import draggable from './lib/dragable';
import calculateP2L from './lib/calculator';

const map = (width, height, latitude, longtitude, zoom) => {
  const state = {
    width,
    height,
    lat: latitude,
    lot: longtitude,
    zoom
  };

  const wrapper = document.querySelector('.map');
  const $elem = document.createElement('img');

  const render = () => {
    $elem.src = `${env.BASE_URL}`
                + `?w=${state.width}&h=${state.height}&center=${state.lot},${state.lat}&level=${state.zoom}`
                + `&X-NCP-APIGW-API-KEY-ID=${env.CLIENT_ID}`;
  };

  const changeCenter = () => {
    const left = parseInt($elem.style.getPropertyValue('--left'), 10);
    const top = parseInt($elem.style.getPropertyValue('--top'), 10);

    const {lat, lot} = calculateP2L({
      lat: state.lat,
      lot: state.lot
    }, state.zoom, state.width, state.height, {
      x: (state.width / 2) - (isNaN(left) ? 0 : (left + 250) / 2),
      y: (state.height / 2) - (isNaN(top) ? 0 : (top + 250) / 2)
    });
    wrapper.appendChild(map(1000, 1000, lat, lot, 16));
    setTimeout(() => wrapper.removeChild(wrapper.firstChild), 500);
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
