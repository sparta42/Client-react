const Login = () => {
    const loginBox = document.createElement('div');

    loginBox.innerHTML = `
        <h2>Login</h2>
        <input type="text" id="login_email_input" placeholder="이메일을 입력하세요"/>
        <input type="text" id="login_pw_input" placeholder="비밀번호를 입력하세요"/>
        <button id="login_button">Login</button>
    `
    return loginBox;
}

export default Login;