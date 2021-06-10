const location = () => {
  if (!navigator.geolocation) {
    alert('This browswer no navigator');

    return;
  }
  const geo = navigator.geolocation;

  const getPos = () => new Promise((resolve, reject) => {
    geo.getCurrentPosition(pos => {
      resolve(
        {
          lat: pos.coords.latitude,
          lot: pos.coords.longitude
        }
      );
    }, err => reject(err));
  });

  return {getPos};
};

export default location;
