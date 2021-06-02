import '../public/style.scss'
import Login from './login'

import { initialRoutes, historyRotuePush } from './router'


const Main = () => {
    const main = document.createElement('div');

    main.appendChild(Login());

    return main;
};

document.body.appendChild(Main());
