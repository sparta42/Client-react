import '../public/style.scss'
import Login from './login'

const Main = () => {
    const main = document.createElement('div');

    main.appendChild(Login());

    return main;
};

document.body.appendChild(Main());
