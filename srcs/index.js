import '../public/style.scss';
import map from './map';

const app = elem => {
  const $elem = document.querySelector(elem);

  const render = () => {
    $elem.appendChild(map($elem));
  };

  render();

  return $elem;
};

app('.map');
