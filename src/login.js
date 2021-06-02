const logo = () => {
    const logo = document.createElement('div');
    logo.classList.add('logo');
    logo.innerHTML = `
        <p>42 Jenli</p>
    `

    return logo
}

const button = () => {
    const button = document.createElement('div');

    button.classList.add('button');
    button.innerHTML = `
        <p>Login</p>
    `
    const postLogin = () => {
        fetch('http://3.35.151.102:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'string@naver.com',
                password: 'string',
            })
        })
        .then(resolve => resolve.json())
        .then(resolve => {
            window.localStorage.setItem('access_token', resolve.accessToken)
        })
        .then(() => {
            fetch('http://3.35.151.102:8080/user/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`
                },
            })
            .then(resolve => resolve.json())
            .then(resolve => {
                const box = document.querySelector('.login');
                const name = document.createElement('h1');
                name.innerText = resolve.name
                box.appendChild(name)
            })
        })
    }

    button.onclick = postLogin

    return button
}

const Login = () => {
    const box = document.createElement('div');
    box.classList.add('login');


    box.appendChild(logo())
    box.appendChild(button())

    return box;
};

export default Login;
