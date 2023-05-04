// initial call to API
function grabWeatherData() {
    const city = document.querySelector('input').value
    return fetch(`https://goweather.herokuapp.com/weather/${city}`).then(res => res.json()).then(data => renderWeatherCard(data));
};

// event listener for the click to submit
function lookUpWeather () {
    const submit = document.querySelector("form")
    submit.addEventListener('submit', function(e) {
        e.preventDefault();
        grabWeatherData();
    });
};
lookUpWeather();

function renderWeatherCard(weather) {
};