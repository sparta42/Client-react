import * as env from '../.env';
import draggable from './lib/dragable';
import location from './lib/location';

const map = () => {
  let state = {
    width: 1000,
    height: 1000,
    lat: 37.252151,
    lot: 127.12412,
    level: 16
  };

  const setState = (key, value) => {
    state = Object.assign({}, state, {[key]: value});
  };

  const $elem = document.createElement('img');

  const render = () => {
    $elem.src = `${env.BASE_URL}`
                + `?w=${state.width}&h=${state.height}&center=${state.lot},${state.lat}&level=${state.level}`
                + `&X-NCP-APIGW-API-KEY-ID=${env.CLIENT_ID}`;
  };

  const lot = location();

  const init = () => {
    lot.getPos().then(pos => {
      setState('lot', pos.lot);
      setState('lat', pos.lat);
      render();
    });
  };

  const eventBind = () => {
    $elem.addEventListener('mousedown', draggable($elem));
  };

  (() => {
    $elem.classList.add('staticMap');
    init();
    eventBind();
  })();

  return $elem;
};

export default map;
