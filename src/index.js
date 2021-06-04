//참고자료 : https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow#oauth-2.0-endpoints_6
import '../public/index.scss'
import '../public/normalize.scss'
import '../public/reset.scss'

const BASE_URL = 'http://3.35.151.102:8080';
const REDIR_URL = 'http://localhost:3000/oauth2/redirect';
const endPoint = '/auth/login';
const AUTH_URL = `${BASE_URL}/oauth2/authorize/ftseoul?redirect_uri=${REDIR_URL}`;

const	OauthLogin = () => {

	fetch(AUTH_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
	}).then(res => res.json())
	.then(res=>console.log(res))
}


const	signIn = () => {
	const getIdValue = document.getElementById('getId').value;
	const getPasswordValue = document.getElementById('getPassword').value;

	console.log(getIdValue);
	console.log(getPasswordValue);

	fetch(`${BASE_URL}${endPoint}`, {
		method: 'POST',
		body: {
			"email": `${getIdValue}`,
			"password": `${getPasswordValue}`
		}
	}).then(res => res.json())
	.then(res => console.log(res))
}

document.getElementById('42login').addEventListener('click', OauthLogin);
document.getElementById('signIn').addEventListener('click', signIn);
