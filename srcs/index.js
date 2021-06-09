const app = elem => {

  const $elem = document.querySelector(elem);

  const state = {WheelEvent: 1};

  // Map 을 생성하여 imag tag가 만들어지는 것
  const makeMapImg = () => {
    
    const mapUrl = "https://naveropenapi.apigw.ntruss.com/map-static/v2/raster";

    const clientID = "kdv137thbf";
    // const clientSecret = "sOjjiOeKAXLti6WbzVZTai0tZ9tdakDMOhCJl9I3";

    const mapOption = {
      center: "127.1054221,37.3591614",
      level: 16,
      w: 600,
      h: 600,
      "X-NCP-APIGW-API-KEY-ID": clientID,
      // "X-NCP-APIGW-API-KEY": clientSecret
    }

    const imgTag = document.createElement("img");

    function setImg() {
      const optionString = Object.entries(mapOption).map(e => e.join('=')).join('&');
      const srcString = `${mapUrl}?${optionString}`;
      imgTag.setAttribute('src', srcString.toString());
    }
    
    function zoomIn() {
      if (state.WheelEvent)
        mapOption.level += 1;
      state.WheelEvent = mapOption.level < 22 ? 1 : 0;
    }

    function zoomOut(){
     if (state.WheelEvent)
        mapOption.level -= 1;
      state.WheelEvent = mapOption.level >= 2 ? 1 : 0;
    }

    imgTag.addEventListener("wheel", (e) => {
      if (e.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
      setImg();
      return imgTag;
    })

    setImg();
    return imgTag;
  }
 
  const render = () => {
    const map = makeMapImg();
    $elem.appendChild(map);
  };

  render();

  return $elem;
};

app('body');
