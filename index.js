//참고자료 : https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow#oauth-2.0-endpoints_6

const	OauthLogin = () => {

	var oauthEndpoint = 'http://3.36.249.156:4000/oauth2/redirect';
	
	var form = document.createElement('form');
	form.setAttribute('method', 'POST');
	form.setAttribute('action', oauthEndpoint);

	var params = {
		'email': 'seokim',
		'password':'Iama42cadet',
		'redirect_uri': 'http://3.35.151.102:8080/oauth2/authorize/ftseoul?redirect_uri=http://3.36.249.156:4000/oauth2/redirect',
	}
	for (var p in params) {
		var input = document.createElement('input');
		input.setAttribute('type', 'hidden');
		input.setAttribute('name', p);
		input.setAttribute('value', params[p]);
		form.appendChild(input);
	}
	document.body.appendChild(form);
	form.submit();
}
document.getElementById('42login').addEventListener('click', OauthLogin);
