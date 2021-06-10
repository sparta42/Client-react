import { $ } from "./helpers.js";
import { API_KEY_ID } from "./key.js";
import { makeMapTemplate } from "./template.js";

const app = (elem) => {
  const state = {
    width: 800,
    height: 800,
    level: 15,
    currentLatitude: 37.4882247,
    currentLongitude: 127.0652055,
    isInit: true,
  };

  const showPositionOntheMap = (crd, state) => {
    const { latitude, longitude } = crd;
    const mapURI = `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=${state.width}&h=${state.height}&center=${longitude},${latitude}&level=${state.level}&X-NCP-APIGW-API-KEY-ID=${API_KEY_ID}`;

    $("#map-container").innerHTML = makeMapTemplate(mapURI, state);
    if (navigator.geolocation && !state.isInit) {
      $("#marker").style.display = "block";
    }
  };

  const render = () => {
    showPositionOntheMap(
      {
        longitude: state.currentLongitude,
        latitude: state.currentLatitude,
      },
      state
    );
  };

  const $elem = $(elem);

  const init = () => {
    const $app = document.createElement("div");
    const $mapContainer = document.createElement("div");

    $app.setAttribute("id", "app");
    $mapContainer.setAttribute("id", "map-container");

    $app.appendChild($mapContainer);
    $elem.appendChild($app);

    render();
    state.isInit = false;
  };

  init();
  return $elem;
};

app("body");
