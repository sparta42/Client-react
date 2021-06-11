Math.radian = degrees => degrees * Math.PI / 180;
Math.degrees = radian => radian * 180 / Math.PI;

const centerPosInMap = ({lat, lot}, zoom) => {
  const c = (256 / (2 * Math.PI)) * (2 ** zoom);
  const x = c * (Math.radian(lot) + Math.PI);
  const y = c * (Math.PI - Math.log(Math.tan((Math.PI / 4) + (Math.radian(lat) / 2))));

  return [x, y];
};

const calcuateP2L = (center, zoom, width, height, point) => {
  const [centerX, centerY] = centerPosInMap(center, zoom);

  const x = centerX - ((width / 2) - point.x);
  const y = centerY - ((height / 2) - point.y);

  const c = (256 / (2 * Math.PI)) * (2 ** zoom);
  const m = (x / c) - Math.PI;
  const n = -(y / c) + Math.PI;

  const lot = Math.degrees(m);
  const lat = Math.degrees((Math.atan(Math.exp(n)) - (Math.PI / 4)) * 2);

  return {
    lot,
    lat
  };
};

export default calcuateP2L;

/*
const {lot, lat} = calcuateP2L({
        lat: pos.lat,
        lot: pos.lot
      }, state.zoom, state.width, state.height,
      {
        x: 500,
        y: 250
      });
      $elem.appendChild(map(state.width, state.height, lat, lot, state.zoom));
*/
