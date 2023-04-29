function grabWeatherData() {
    const city = document.querySelector('input').value
fetch(`https://goweather.herokuapp.com/weather/${city}`).then(res => res.json()).then(data => console.log(data));
};