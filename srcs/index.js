import '../public/style.scss'
const mapsUrl = 'https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?'

let latitude = undefined
let longitude = undefined
let width = 800
let height = 700
let centerX = 127.061838
let centerY = 37.490211
let levelDist = 16 * 10
let level = 16
let apiKeyID = '9cdskm4clv'

navigator.geolocation.getCurrentPosition((pos) => {
    latitude = pos.coords.latitude
    longitude = pos.coords.longitude
    if (latitude === undefined || longitude === undefined)
        alert('can\'t load current position!')
    else console.log(longitude, latitude)
})
const elem = document.createElement('div')
loadMap()
function loadMap() {
    elem.innerHTML = `
    <div>
        <img id='mapsApi' class='map_img' src=${mapsUrl}w=${width}&h=${height}&center=${centerX},${centerY}&level=${level}&X-NCP-APIGW-API-KEY-ID=${apiKeyID}>
        <img id='currPos' class='btn_img' src='./../icon/curr_pos.png'>
        <img id='zoomUp' class='btn_img' src='./../icon/plus.png'>
        <img id='zoomDown' class='btn_img' src='./../icon/minus.png'>
    </div>
    `

    document.querySelector('div').appendChild(elem)
    document.getElementById('mapsApi').addEventListener("wheel", wheelEvent)
    document.getElementById('currPos').addEventListener('click', currPoint)
    document.getElementById('zoomUp').addEventListener('click', () => {
        if (level < 19)
            level += 1
        levelDist = level * 10
        loadMap()
    })
    document.getElementById('zoomDown').addEventListener('click', () => {
        if (level > 5)
            level -= 1
        levelDist = level * 10
        loadMap()
    })
    document.getElementById('mapsApi').addEventListener('click', (e) => {
        let latLng = calLatitudeLongitude(e.offsetX, e.offsetY)
        centerX = latLng[0]
        centerY = latLng[1]
        console.log(latLng[0], latLng[1])
        loadMap()
    })
}


function wheelEvent() {
    window.onmousewheel = function(e) {
        if (e.wheelDelta === -120 && levelDist / 10 > 5)
            levelDist -= 1;
        else if (e.wheelDelta === 120 && levelDist / 10 < 18)
            levelDist += 1;
    }
    if (level != parseInt(levelDist / 10))
    {
        level = parseInt(levelDist / 10)
        loadMap()
    }
}

function currPoint() {
    if (centerX !== latitude & centerY !== longitude) {
        navigator.geolocation.getCurrentPosition((pos) => {
            latitude = pos.coords.latitude
            longitude = pos.coords.longitude
        })
        if (longitude === undefined || latitude === undefined)
            alert('can\'t load current position!')
        else {
            centerX = longitude
            centerY = latitude
        }
        loadMap()
    }
}

function calLatitudeLongitude(w, h) {
    let C = (256 / (2 * Math.PI)) * Math.pow(2, level + 1)
    let x = C * (centerX * Math.PI / 180 + Math.PI)
    let y = C * (Math.PI - Math.log(Math.tan((Math.PI / 4) + centerY * Math.PI / 180 / 2)))
    let xp = x - (width / 2 - w)
    let yp = y - (height / 2 - h)
    let M = (xp / C) - Math.PI
    let N = -(yp / C) + Math.PI
    let lon_p = M / Math.PI * 180
    let lat_p = ((Math.atan(Math.exp(N)) - (Math.PI / 4)) * 2) / Math.PI * 180
    return [lon_p, lat_p]
}
