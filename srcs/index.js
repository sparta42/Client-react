const app = elem => {

  const $elem = document.querySelector(elem);

  const $layer = document.createElement("layer");
  const $layer2 = document.createElement("layer");

  const $text = document.createElement("h1");
  const $text2 = document.createElement("h2");
  $text.innerText = "hi";
  $text2.innerText = "hellow";
  
  $layer.appendChild($text);
  $layer2.appendChild($text2);
  $layer2.zindex = -1;
  $elem.appendChild($layer);
  $elem.appendChild($layer2);

  const MapApi = () => {

    const $staticMap = "https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors";

    const $imgTag = document.createElement("img");

    const $mapOption = {
      center: "127.1054221,37.3591614",
      level: 10,
      w: 500,
      h: 500,
      "X-NCP-APIGW-API-KEY-ID": "kdv137thbf"
    }

    const getSrc = () => {
      const $queryString = Object.entries($mapOption).map(e=>e.join('=')).join('&');
      const $src = `${$staticMap}?${$queryString}`;
      return $src.toString();
    }
    
    const zoomIn = () => {
      if ($mapOption.level + 1 < 22)
        $mapOption.level += 1;
      return ;
    }

    const zoomOut = () => {
      if ($mapOption.level - 1 >= 0)
        $mapOption.level -= 1;
      return ;
    }
    
    $imgTag.addEventListener("wheel", (event) => {
      if (event.deltaY < 0)
        zoomOut();
      else
        zoomIn();
      $imgTag.setAttribute("src", getSrc());
      return $imgTag;
    })

    let distanceX = 0;
    let distanceY = 0;
    $imgTag.addEventListener("dragstart", (event) => {
      console.log(event);
      distanceX = parseInt(event.x);
      distanceY = parseInt(event.y);
    })

    $imgTag.addEventListener("dragend", (event) => {
      console.log(event);
      distanceY -= parseInt(event.y);
      distanceX -= parseInt(event.x);
      console.log(distanceX, distanceY);
      const newX = 37.3591614 - distanceY/$mapOption.level;
      const newY = 127.1054221 - distanceX/$mapOption.level;
      $mapOption.center = `${newY},${newX}`;
      $imgTag.setAttribute("src", getSrc());
      return $imgTag;
    })
    
    $imgTag.addEventListener("click", (e) => {
      console.log(e);
    })

    $imgTag.setAttribute("src", getSrc());
    return $imgTag;
  }
  
  const render = () => {
    $elem.appendChild(MapApi());
  };

  render();

  return $elem;
};

app('body');
