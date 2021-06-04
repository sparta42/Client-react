const $ = (selector, element = document) => {
    return element.querySelector(selector)
};

const BASE_URI = 'http://3.35.151.102:8080/auth/';

export { $, BASE_URI };