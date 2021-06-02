const url = ''

const Login = () => {
    fetch(url, {
        method: 'POST',
    }).then(resolve => {
        console.log(resolve)
        //localStorage.setItem('access_toekn', resolve.url...);
    })
}

const getUerUrl = ''
const getUser = () => {
    fetch(getUerUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    }).then(resolve => {
        console.log(resolve)
        /*
            redirect with some state...
        */
    })
}