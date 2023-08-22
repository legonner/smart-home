const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=f1ae10a3adc804510ad4b24e3ac6f7dc';
let weatherData = null;

const weatherIcons = {
    clouds: '<i class="fa-solid fa-cloud fa-xl"></i>',
    clear: '<i class="fa-solid fa-sun fa-xl"></i>',
    rain: '<i class="fa-solid fa-cloud-rain fa-xl"></i>',
    mist: '<i class="fa-solid fa-smog fa-xl"></i>',
    smoke: '<i class="fa-solid fa-smog fa-xl"></i>',
    haze: '<i class="fa-solid fa-smog fa-xl"></i>',
    dust: '<i class="fa-solid fa-smog fa-xl"></i>',
    fog: '<i class="fa-solid fa-smog fa-xl"></i>',
    snow: '<i class="fa-regular fa-snowflake fa-xl"></i>',
    drizzle: '<i class="fa-solid fa-cloud-rain fa-xl"></i>',
    thunderstorm: '<i class="fa-solid fa-cloud-bolt fa-xl"></i>'
};

async function fetchWeatherData() {
    try {
        const response = await fetch(apiUrl);
        weatherData = await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function updateWeatherWidget() {
    if (!weatherData) {
        await fetchWeatherData();
    }

    if (weatherData) {
        const temperatureCelsius = Math.round(weatherData.main.temp - 273.15);
        const description = weatherData.weather[0].description;
        const weatherIcon = getWeatherIcon(description);

        const weatherWidget = document.getElementById('weather-widget');

        weatherWidget.innerHTML = `
            <p class="weather-info">${weatherIcon} outside ${temperatureCelsius}°C - ${description}</p>
        `;
    }
}

function getWeatherIcon(description) {
    for (const [key, icon] of Object.entries(weatherIcons)) {
        if (description.includes(key)) {
            return icon;
        }
    }
    return '';
}

updateWeatherWidget();

function updateValue(elementId, value) {
    const element = document.getElementById(elementId);
    element.textContent = value;
}

function handleTemperatureChange(change) {
    currentTemperature += change;
    updateValue('temperature', currentTemperature.toFixed(1));
}

function handleHumidityChange(change) {
    if (currentHumidity + change >= 0 && currentHumidity + change <= 100) {
        currentHumidity += change;
        updateValue('humidity', currentHumidity);
    }
}

const decreaseTempButton = document.getElementById('decrease-temp');
const increaseTempButton = document.getElementById('increase-temp');
let currentTemperature = 22;

decreaseTempButton.addEventListener('click', () => {
    handleTemperatureChange(-0.5);
});

increaseTempButton.addEventListener('click', () => {
    handleTemperatureChange(0.5);
});

updateValue('temperature', currentTemperature.toFixed(1));

const decreaseHumidityButton = document.getElementById('decrease-humidity');
const increaseHumidityButton = document.getElementById('increase-humidity');

let currentHumidity = 55;

decreaseHumidityButton.addEventListener('click', () => {
    handleHumidityChange(-1);
});

increaseHumidityButton.addEventListener('click', () => {
    handleHumidityChange(1);
});

updateValue('humidity', currentHumidity);

let currentEnergyUsage = 150;
let currentWaterUsage = 200;
let currentEnergyConsumption = 0;

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
    currentEnergyConsumption = checkedCount / 3;
    currentEnergyUsage += currentEnergyConsumption;
    updateEnergyUsage();
}

function updateEnergyConsumption() {
    const energyConsumptionElement = document.getElementById('energy-consumption');
    energyConsumptionElement.textContent = currentEnergyConsumption.toFixed(1);
}

updateEnergyUsage();
updateWaterUsage();

setInterval(updateEnergyConsumption, 500);
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
