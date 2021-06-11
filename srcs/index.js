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

  const getPositionInfos = (position) => {
    const crd = position.coords;

    state.currentLatitude = crd.latitude;
    state.currentLongitude = crd.longitude;
    showPositionOntheMap(crd, state);
  };

  const requestLocationPermission = () => {
    console.log("test");
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 3000,
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(
        getPositionInfos,
        (err) => {
          console.error(err);
          showPositionOntheMap({
            latitude: state.currentLatitude,
            longitude: state.currentLongitude,
          });
        },
        options
      );
    } else {
      alert("지도 서비스를 이용할 수 없는 브라우지입니다.");
    }
  };

  const handleWheel = (event) => {
    if (event.target.id !== "mapImage") return;
    if (event.deltaY < 0) {
      zoomInMap(state);
      return;
    }
    zoomOutMap(state);
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
    const $getLocationButton = document.createElement("button");

    $app.setAttribute("id", "app");
    $mapContainer.setAttribute("id", "map-container");
    $getLocationButton.setAttribute("id", "locationBtn");
    $getLocationButton.innerText = "현재 위치는?";

    $app.appendChild($mapContainer);
    $app.appendChild($getLocationButton);
    $elem.appendChild($app);

    $getLocationButton.addEventListener("click", requestLocationPermission);
    $mapContainer.addEventListener("wheel", handleWheel);

    render();
    state.isInit = false;
  };

  init();
  return $elem;
};

app("body");
