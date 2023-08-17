const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=f1ae10a3adc804510ad4b24e3ac6f7dc';

async function updateWeatherWidget() {
    try {
        const response = await fetch(apiUrl);
        const weather = await response.json();

        const temperatureCelsius = Math.round(weather.main.temp - 273.15);
        const description = weather.weather[0].description;
        let weatherIcon = '';

        if (description.includes('clouds')) {
            weatherIcon = '<i class="fa-solid fa-cloud fa-xl"></i>';
        } else if (description.includes('clear')) {
            weatherIcon = '<i class="fa-solid fa-sun fa-xl"></i>';
        } else if (description.includes('rain') || description.includes('drizzle')) {
            weatherIcon = '<i class="fa-solid fa-cloud-rain fa-xl"></i>';
        } else if (description.includes('mist') || description.includes('fog') || description.includes('haze') || description.includes('smoke') || description.includes('dust')) {
            weatherIcon = '<i class="fa-solid fa-smog fa-xl"></i>';
        } else if (description.includes('snow')) {
            weatherIcon = '<i class="fa-regular fa-snowflake fa-xl"></i>';
        } else if (description.includes('thunderstorm')) {
            weatherIcon = '<i class="fa-solid fa-cloud-bolt fa-xl"></i>';
        }

        const weatherWidget = document.getElementById('weather-widget');

        weatherWidget.innerHTML = `
      <p class="weather-info">${weatherIcon} outside ${temperatureCelsius}°C - ${description}</p>
    `;
    } catch (error) {
        console.error('Error:', error);
    }
}

updateWeatherWidget();

const temperatureElement = document.getElementById('temperature');
const decreaseTempButton = document.getElementById('decrease-temp');
const increaseTempButton = document.getElementById('increase-temp');

let currentTemperature = 22;

function updateTemperature() {
    temperatureElement.textContent = currentTemperature.toFixed(1);
}

decreaseTempButton.addEventListener('click', () => {
    currentTemperature -= 0.5;
    updateTemperature();
});

increaseTempButton.addEventListener('click', () => {
    currentTemperature += 0.5;
    updateTemperature();
});

updateTemperature();

const humidityElement = document.getElementById('humidity');
const decreaseHumidityButton = document.getElementById('decrease-humidity');
const increaseHumidityButton = document.getElementById('increase-humidity');

let currentHumidity = 55;

function updateHumidity() {
    humidityElement.textContent = currentHumidity;
}

decreaseHumidityButton.addEventListener('click', () => {
    if (currentHumidity > 0) {
        currentHumidity -= 1;
        updateHumidity();
    }
});

increaseHumidityButton.addEventListener('click', () => {
    if (currentHumidity < 100) {
        currentHumidity += 1;
        updateHumidity();
    }
});

updateHumidity();