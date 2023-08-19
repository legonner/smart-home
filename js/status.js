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

function updateValue(elementId, value) {
    const element = document.getElementById(elementId);
    element.textContent = value;
}

const decreaseTempButton = document.getElementById('decrease-temp');
const increaseTempButton = document.getElementById('increase-temp');
let currentTemperature = 22;

decreaseTempButton.addEventListener('click', () => {
    currentTemperature -= 0.5;
    updateValue('temperature', currentTemperature.toFixed(1));
});

increaseTempButton.addEventListener('click', () => {
    currentTemperature += 0.5;
    updateValue('temperature', currentTemperature.toFixed(1));
});

updateValue('temperature', currentTemperature.toFixed(1));

const decreaseHumidityButton = document.getElementById('decrease-humidity');
const increaseHumidityButton = document.getElementById('increase-humidity');

let currentHumidity = 55;

decreaseHumidityButton.addEventListener('click', () => {
    if (currentHumidity > 0) {
        currentHumidity -= 1;
        updateValue('humidity', currentHumidity);
    }
});

increaseHumidityButton.addEventListener('click', () => {
    if (currentHumidity < 100) {
        currentHumidity += 1;
        updateValue('humidity', currentHumidity);
    }
});

updateValue('humidity', currentHumidity);

let currentEnergyUsage = 150;
let currentWaterUsage = 200;

function updateEnergyUsage() {
    updateValue('energy-usage', currentEnergyUsage.toFixed().padStart(7, '0') + ' kW/h');
}

function updateWaterUsage() {
    const waterCubicMeters = (currentWaterUsage / 1000).toFixed(2);
    updateValue('water-usage', waterCubicMeters.toString().padStart(8, '0') + ' m³');
}

function increaseEnergyUsage() {
    const checkedCheckboxes = document.querySelectorAll('.light__container .btn-check:checked');
    const checkedCount = checkedCheckboxes.length;
    currentEnergyUsage += checkedCount / 3;
    updateEnergyUsage();
}

updateEnergyUsage();
updateWaterUsage();

setInterval(increaseEnergyUsage, 2000);

function updateCheckboxLabel(checkboxId, labelClass, checkedText, uncheckedText, successClass, secondaryClass) {
    const checkbox = document.getElementById(checkboxId);
    const label = document.querySelector(labelClass);

    checkbox.addEventListener('change', function() {
        const isChecked = this.checked;
        label.innerHTML = isChecked ? checkedText : uncheckedText;
        label.classList.toggle(successClass, isChecked);
        label.classList.toggle(secondaryClass, !isChecked);
    });
}

updateCheckboxLabel('btn-check-alarm', '.usage-alarm .btn', 'Security alarm system <i class="fa-solid fa-shield"></i>', 'Security alarm system <i class="fa-regular fa-bell-slash"></i>', 'btn-outline-success', 'btn-outline-secondary');
updateCheckboxLabel('btn-check-flood', '.usage-flood .btn', 'Flood sensor <i class="fa-regular fa-circle-check"></i>', 'Flood sensor <i class="fa-regular fa-circle-xmark"></i>', 'btn-outline-success', 'btn-outline-secondary');
updateCheckboxLabel('btn-check-fire', '.usage-fire .btn', 'Fire sensor <i class="fa-regular fa-circle-check"></i>', 'Fire sensor <i class="fa-regular fa-circle-xmark"></i>', 'btn-outline-success', 'btn-outline-secondary');

