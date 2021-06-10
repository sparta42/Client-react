import * as env from '../.env';

const map = parent => {
  const state = {
    width: 1000,
    height: 1000,
    lat: 127.12412,
    lot: 37.252151,
    level: 16
  };

  const $elem = document.createElement('img');

  const render = () => {
    $elem.src = `${env.BASE_URL}`
                + `?w=${state.width}&h=${state.height}&center=${state.lat},${state.lot}&level=${state.level}`
                + `&X-NCP-APIGW-API-KEY-ID=${env.CLIENT_ID}`;
  };

  $elem.addEventListener('mousedown', e => {
    const offsetX = parseInt($elem.style.getPropertyValue('--left'), 10);
    const offsetY = parseInt($elem.style.getPropertyValue('--top'), 10);

    const startX = e.clientX;
    const startY = e.clientY;

    const moveAt = event => {
      $elem.style.setProperty('--left', event.clientX - startX + (isNaN(offsetX) ? 0 : offsetX));
      $elem.style.setProperty('--top', event.clientY - startY + (isNaN(offsetX) ? 0 : offsetY));
    };

    const mouseMove = event => {
      moveAt(event);
    };

    parent.addEventListener('mousemove', mouseMove);

    parent.onmouseup = () => {
      parent.removeEventListener('mousemove', mouseMove);
      parent.onmouseup = null;
    };
  });

  (() => {
    $elem.classList.add('staticMap');
    render();
  })();

  return $elem;
};

export default map;
