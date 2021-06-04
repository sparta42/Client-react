import '../public/style.scss'
import Login from './Login.js';
import SignUp from './SignUp.js';
import { BASE_URI, $ } from './Constants.js';
import { isValidInputForm } from './Helpers.js';

const postUserLoginInfo = (email, password) => {
    fetch(`${BASE_URI}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                email,
                password
            }
        )
    })
    .then((response) => response.json())
    .then(response => {
        console.log(response);
        window.localStorage.setItem('access_token', response.accessToken);
    })
    .then(() => {
        console.log(window.localStorage.getItem('access_token'))
        fetch(`http://3.35.151.102:8080/user/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
            },
        })
        .then(resolve => resolve.json())
        .then(resolve => {
            const box = document.createElement('h1')
            box.innerText = `
                ID: ${resolve.name}
            `
            document.body.appendChild(box)
        })
    })
    .catch((err) => console.log(err));
}

const postSignUpInfo = (email, password, name) => {
    fetch(`${BASE_URI}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            name,
            password,
        })
    })
        .then((response) => response.json())
        .then(response => {
            console.log(response);
        })
}

const handleLogin = () => {
    const email = $('#login_email_input').value;
    const pw = $('#login_pw_input').value;

    if (!isValidInputForm(email, pw)) {
        return;
    }
    postUserLoginInfo(email, pw);
}


const handleSignUp = () => {
    const email = $('#email_input').value;
    const pw = $('#pw_input').value;
    const name = $('#name_input').value;

    if (!isValidInputForm(email, pw, name)) {
        return;
    }
    postSignUpInfo(email, pw, name);
}

const App = () => {
    $("body").appendChild(Login());
    $("body").appendChild(SignUp());
    $('#login_button').addEventListener("click", handleLogin);
    $("#signup").addEventListener("click", handleSignUp);
}

const main = () => {
    App();
}

main();
