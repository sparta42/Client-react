const app = elem => {
  const center = "127.1054221,37.3591614";
  const clientId = "1zszamdg6u"
  const state = {
    level : 1
  }

  const $elem = document.querySelector(elem);
  const render = () => {
    //$elem.appendChild(staticMap());
  };

  let map = document.querySelector('#theMap');
  
  const clickFunc = () => {
    if (state.level < 16) {
      state.level = state.level + 1;
      map.setAttribute('src', `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=300&h=300&center=${center}&level=${Math.round(state.level)}&X-NCP-APIGW-API-KEY-ID=${clientId}`);
    }
  }

  const zoom = (e) => {
    e.preventDefault();

    if (state.level < 16.6 && e.deltaY < -1)
      state.level = state.level + 0.1;
    else if (state.level > 0.4 && e.deltaY > 1)
      state.level = state.level - 0.1;
    map.setAttribute('src', `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=300&h=300&center=${center}&level=${Math.round(state.level)}&X-NCP-APIGW-API-KEY-ID=${clientId}`);
  }

  document.getElementById('theMap').addEventListener("click", clickFunc);
  document.getElementById('theMap').addEventListener("wheel", zoom);

  render();

  return $elem;
};

app('body');
