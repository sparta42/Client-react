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
    const PostLogin = () => {
        fetch('/sparta/hello').then((resolve, reject) => {
            console.log(resolve)
        })
    }

    button.onclick = PostLogin

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
