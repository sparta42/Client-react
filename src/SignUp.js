const SignUp = () => {
    const signUpBox = document.createElement('div');

    signUpBox.innerHTML = `
        <h2>SignUP</h2>
        <input type="text" id="name_input" placeholder="사용자 이름을 입력하세요"/>
        <input type="text" id="email_input" placeholder="아이디로 사용할 이메일을 입력하세요">
        <input type="text" id="pw_input" placeholder="비밀번호를 입력하세요"/>
        <button id="signup">signup</button>
    `;
    return signUpBox;
}

export default SignUp;