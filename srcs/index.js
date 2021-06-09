import '../public/style.scss'
const mapsUrl = 'https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?'
let width = 400
let height = 350
let centerX = 127.0646955
let centerY = 37.4882247
let level = 16
let apiKeyID = '9cdskm4clv'


const elem = document.createElement('div')

elem.innerHTML = `
<div id='maps_api'>
    <img src=${mapsUrl}w=${width}&h=${height}&center=${centerX},${centerY}&scale=2&level=${level}&X-NCP-APIGW-API-KEY-ID=${apiKeyID}>
</div>
`

document.querySelector('div').appendChild(elem)
