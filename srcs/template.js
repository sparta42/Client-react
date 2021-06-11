const makeMapTemplate = (mapURI, state) => {
  return `
	  <div id="mapImage" style="background-image:url(${mapURI}); width: ${state.width}px; height: ${state.height}px; position: relative;">
	    <div id="marker" style="width: 22px; height:33px;
	      z-index:999;
	      background-image:url('https://ssl.pstatic.net/static/maps/mantle/1x/marker-default.png'); 
	      position: absolute;
	      top: 50%; 
	      left: 50%;
	      display: none">            
	    </div> 
	  </div>
	`;
};

export { makeMapTemplate };
