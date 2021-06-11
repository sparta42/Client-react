import '../public/style.scss';

const app = () => {
  const state = {
    mapParam: {
      w: window.screen.availWidth,
      h: window.screen.availHeight,
      scale: 1,
      level: 16,
      center: `127.071551,37.488104`,
      API_KEY_ID: '3oy4krbiqs'
    }
  };

  const $body = document.body;
  const $imgContianer = document.createElement('div');
  const $img = document.createElement('img');

  const render = () => {
    const apiUrl = 'https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors';
    const url = new URL(apiUrl);
    const {searchParams} = url;

    searchParams.set('w', state.mapParam.w / state.mapParam.scale);
    searchParams.set('h', state.mapParam.h / state.mapParam.scale);
    searchParams.set('scale', state.mapParam.scale);
    searchParams.set('level', state.mapParam.level);
    searchParams.set('center', state.mapParam.center);
    searchParams.set('X-NCP-APIGW-API-KEY-ID', state.mapParam.API_KEY_ID);
    $img.setAttribute('src', url.toString());
    $imgContianer.appendChild($img);
    $imgContianer.classList.add('imgContainer');
    $imgContianer.style.overflow = 'hidden';
    $body.style.overflow = 'hidden';
    $body.appendChild($imgContianer);
  };

  const zoom = e => {
    e.preventDefault();
    const leveling = Math.max(1, Math.round(state.mapParam.level + (e.deltaY * -0.1)));
    if (leveling > 20) {
      alert('Max level!');

      return;
    }
    if (leveling < 0) {
      alert('Min level!');

      return;
    }
    state.mapParam.level = leveling;
    render();
  };

  $img.addEventListener('wheel', zoom);

  render();
};

app();
