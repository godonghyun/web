const weather = document.querySelector('.js-weather');

// my api key for weather request
const API_KEY = '0637c3dcff4c3f02db598cccea94156f';
const COORDS = 'coords';

function getWeather(lat,  lng){
    // request weather json to server
    // then method makes us easy to handle fetched JSON
    // if not, it could end up using not responded data
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json(); // json function to get weather JSON format
    }).then(function(json){
        // now we can add weather info to html
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${temperature} 🌡  at <strong>${place}</strong>`;
    });
}

function saveCoords(coordsObj){ // save in LS
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    // called when success
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
        latitude,
        longitude
    }

    saveCoords(coordsObj);
    getWeather(latitude, longtitude);
}

function handleGeoError() {
    // callsed when failed
    console.log("cant access geo location")
}

function askForCoords() {
    // a locater function
    // needs two argument. function called when success, function called when failed
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    // look up LS for already given coordinates
    const loadedCoords = localStorage.getItem(COORDS)
    if (loadedCoords === null) {    // if none
        askForCoords(); // ask for new coord
    } else {
        // if there are
        const parseCoords = JSON.parse(loadedCoords);
        // show on screen
        getWeather(parseCoords['latitude'],parseCoords['longitude']);
    }
}

function init() {
    loadCoords();
}

init();