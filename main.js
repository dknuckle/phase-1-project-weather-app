// initial call to API
function grabWeatherData() {
    const city = document.querySelector('input').value;
    return fetch(`https://goweather.herokuapp.com/weather/${city}`)
        .then(res => {
        if (!res.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return res.json();
        })
        .then(weatherData => {
            console.log(weatherData); // Log the API response data
            renderWeatherCard(weatherData);
            return weatherData; // Optional: Return the data for further processing
          })
        .catch(error => {
        // Handle the error
        console.error(error);
        });
    }
      

// event listener for the click to submit
function lookUpWeather() {
    const submit = document.querySelector("form");
    submit.addEventListener('submit', function(e) {
      e.preventDefault();
      grabWeatherData();
    });
  }
  
  lookUpWeather();
  function renderWeatherCard(weather) {
    if (!weather || !weather.temperature || !weather.wind || !weather.description || !weather.forecast || !Array.isArray(weather.forecast)) {
      console.error('Invalid weather data:', weather);
      return;
    }
  
    const card = document.createElement('li');
    card.classList.add('card');
  
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
  
    const title = document.createElement('h4');
    title.textContent = 'Weather Today';
  
    const temperatureParagraph = document.createElement('p');
    const temperatureFahrenheit = (parseFloat(weather.temperature) * 9/5) + 32;
    temperatureParagraph.textContent = `The temperature today is ${temperatureFahrenheit.toFixed(2)}°F`;
  
    const windParagraph = document.createElement('p');
    const windMph = parseFloat(weather.wind) * 0.621371;
    windParagraph.textContent = `The wind is currently blowing approximately ${windMph.toFixed(2)} mph and it is ${weather.description}`;
  
    contentDiv.appendChild(title);
    contentDiv.appendChild(temperatureParagraph);
    contentDiv.appendChild(windParagraph);
  
    const forecastDiv = document.createElement('div');
    forecastDiv.classList.add('forecast');
  
    const forecastTitle = document.createElement('h5');
    forecastTitle.textContent = "Next 3 Day Forecast";
  
    forecastDiv.appendChild(forecastTitle);
  
    const forecastList = document.createElement('ul');
  
    weather.forecast.forEach(day => {
      const forecastItem = document.createElement('li');
      const dayText = document.createElement('p');
      dayText.textContent = `Day ${day.day}:`;
      const temperatureText = document.createElement('p');
      const temperatureFahrenheit = (parseFloat(day.temperature) * 9/5) + 32;
      temperatureText.textContent = `Temperature: ${temperatureFahrenheit.toFixed(2)}°F`;
      const windText = document.createElement('p');
      const windMph = parseFloat(day.wind) * 0.621371;
      windText.textContent = `Wind: ${windMph.toFixed(2)} mph`;
  
      forecastItem.appendChild(dayText);
      forecastItem.appendChild(temperatureText);
      forecastItem.appendChild(windText);
      forecastList.appendChild(forecastItem);
    });
  
    forecastDiv.appendChild(forecastList);
  
    card.appendChild(contentDiv);
    card.appendChild(forecastDiv);
  
    const weatherContainer = document.querySelector('#weather');
    weatherContainer.appendChild(card);
  }
    