import * as env from '../.env';
import draggable from './lib/dragable';


const map = (width, height, lat, lot, zoom) => {
  let state = {
    width,
    height,
    lat,
    lot,
    zoom
  };

  const setState = (key, value) => {
    state = Object.assign({}, state, {[key]: value});
  };

  const $elem = document.createElement('img');

  const render = () => {
    $elem.src = `${env.BASE_URL}`
                + `?w=${state.width}&h=${state.height}&center=${state.lot},${state.lat}&level=${state.zoom}`
                + `&X-NCP-APIGW-API-KEY-ID=${env.CLIENT_ID}`;
  };

  const eventBind = () => {
    $elem.addEventListener('mousedown', draggable($elem, 0, 0));
  };

  (() => {
    $elem.classList.add('staticMap');
    render();
    eventBind();
  })();

  return $elem;
};

export default map;
