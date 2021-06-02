import '../public/style.scss'
/*
document.body.innerHTML = `
    <div>
        <p>Hello</p>
    </div>
`
*/

const redirect_uri = 'http://3.35.151.102:8080/auth/login';

const btn42 = document.querySelector('.btn42')
const btnGoogle = document.querySelector('.btnGoogle')

btn42.addEventListener('click', () => {
    fetch(redirect_uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'string@naver.com',
            password: 'string'
        })
    })
        .then(resolve => resolve.json())
        .then(function (resolve) {
            fetch('http://3.35.151.102:8080/user/me', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + resolve.accessToken
                }
            })
            .then(resolve => resolve.json())
            .then(resolve => console.log(resolve.name))
        })
})

btnGoogle.addEventListener('click', () => {
    fetch(redirect_uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'string@naver.com',
            password: 'string'
        })
    })
        .then(resolve => resolve.json())
        .then(resolve => console.log(resolve.accessToken))
})
