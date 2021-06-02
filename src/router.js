// import login from '';
// import user from '';

const routes = {
    '/': '',
    '/home': ''
};

const renderHTML = (element, route) => {
    element.innerHTML = route;
};

const initialRoutes = (mode, element) => {
    returnHTML(element, routes['/']);

    window.onpopstate = () => renderHTML(element, routes[window.location.pathname]);
};

const historyRotuePush = (pathName, element) => {
    window.history.pushState({}, pathName, window.location.origin + pathName);
    returnHTML(element, routes[pathName]);
};

export { initialRoutes, historyRotuePush };
