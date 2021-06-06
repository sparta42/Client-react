import test from 'test';

const app = elem => {
  test();

  const state = {text: 1};

  const $elem = document.querySelector(elem);

  const render = () => {
    $elem.innerHTML = `
      <h1>
        ${state.text}
      </h1>
    `;
  };

  $elem.addEventListener('click', () => {
    state.text = state.text + 1;
    render();
  });

  render();

  return $elem;
};

app('body');
