const app = elem => {
  const clientId = '1zszamdg6u';
  const state = {
    level: 1,
    centerX: 127.1054221,
    centerY: 37.3591614,
    width: 500,
    height: 500,
    scale: 2
  };
  const center = `${state.centerX},${state.centerY}`;
  const $elem = document.querySelector(elem);
  const render = () => {
    // $elem.appendChild(staticMap());
  };

  const map = document.querySelector('#theMap');

  const clickZoomIn = () => {
    // calLatitudeLongitude(e.screenX, e.screenY);
    // center = `${state.centerX},${state.centerY}`;
    if (state.level < 16) {
      state.level = state.level + 1;
      map.setAttribute('src', `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=300&h=300&center=${center}&level=${Math.round(state.level)}&scale=2&X-NCP-APIGW-API-KEY-ID=${clientId}`);
    }
  };

  const zoom = e => {
    e.preventDefault();

    if (state.level < 16.6 && e.deltaY < -1) {
      state.level = state.level + 0.1;
    } else if (state.level > 0.4 && e.deltaY > 1) {
      state.level = state.level - 0.1;
    }
    map.setAttribute('src', `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=300&h=300&center=${center}&level=${Math.round(state.level)}&scale=2&X-NCP-APIGW-API-KEY-ID=${clientId}`);
  };

  // const calLatitudeLongitude = (w, h) => {
  //   if (state.scale === 2) {
  //     w = w / 2;
  //     h = h / 2;
  //   }
  //   const C = (256 / (2 * Math.PI)) * 2 ** state.level;
  //   const x = C * (state.centerX * Math.PI / 180 + Math.PI);
  //   const y = C * (Math.PI - Math.log(Math.tan((Math.PI / 4) + state.centerY * Math.PI / 180 / 2)));
  //   const xp = x - (state.width / 2 - w);
  //   const yp = y - (state.height / 2 - h);
  //   const M = (xp / C) - Math.PI;
  //   const N = -(yp / C) + Math.PI;
  //   const lon_p = M / Math.PI * 180;
  //   const lat_p = ((Math.atan(Math.exp(N)) - (Math.PI / 4)) * 2) / Math.PI * 180;
  //   state.centerX = lon_p;
  //   state.centerY = lat_p;
  // };

  document.getElementById('theMap').addEventListener('click', clickZoomIn);
  document.getElementById('theMap').addEventListener('wheel', zoom);

  render();

  return $elem;
};

app('body');
