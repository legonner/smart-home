const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=f1ae10a3adc804510ad4b24e3ac6f7dc';

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

const weatherWidget = document.getElementById('weather-widget');

let currentTemperature = 22;
let currentHumidity = 55;
let currentEnergyUsage = 150;
let currentWaterUsage = 200;
let currentEnergyConsumption = 0;
let lightEnergyUsage = 0;
let boilerEnergyUsage = 0;
let conditionerEnergyUsage = 0;

function updateValue(elementId, value) {
    const element = document.getElementById(elementId);
    element.textContent = value;
}

function updateWeatherWidget(weather) {
    const temperatureCelsius = Math.round(weather.main.temp - 273.15);
    const description = weather.weather[0].description;
    const weatherIcon = getWeatherIcon(description);

    weatherWidget.innerHTML = `
        <p class="weather-info">${weatherIcon} outside ${temperatureCelsius}°C - ${description}</p>
    `;
}

function getWeatherIcon(description) {
    for (const [key, icon] of Object.entries(weatherIcons)) {
        if (description.includes(key)) {
            return icon;
        }
    }
    return '';
}

async function fetchWeatherData() {
    try {
        const response = await fetch(apiUrl);
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

function updateTemperatureDisplay() {
    updateValue('temperature', currentTemperature.toFixed(1));
}

function adjustTemperature(change) {
    currentTemperature += change;
    updateTemperatureDisplay();
}

function updateHumidityDisplay() {
    updateValue('humidity', currentHumidity);
}

function adjustHumidity(change) {
    currentHumidity = Math.min(Math.max(currentHumidity + change, 0), 100);
    updateHumidityDisplay();
}

function updateEnergyUsageDisplay() {
    updateValue('energy-usage', currentEnergyUsage.toFixed().padStart(7, '0') + ' kW/h');
    updateValue('water-usage', (currentWaterUsage / 1000).toFixed(2).toString().padStart(8, '0') + ' m³');
}

function updateEnergyConsumptionDisplay() {
    const energyConsumptionElement = document.getElementById('energy-consumption');
    energyConsumptionElement.textContent = currentEnergyConsumption.toFixed(1);
}

function calculateTotalLightEnergyUsage() {
    const checkedCheckboxes = document.querySelectorAll('.light__container .btn-check:checked');
    lightEnergyUsage = checkedCheckboxes.length / 3;
}

function increaseEnergyUsage() {
    calculateTotalLightEnergyUsage();
    currentEnergyConsumption = lightEnergyUsage + boilerEnergyUsage + conditionerEnergyUsage;
    currentEnergyUsage += currentEnergyConsumption;
    updateEnergyUsageDisplay();
}

function adjustBoilerEnergyUsage(change) {
    boilerEnergyUsage += change;
    updateEnergyConsumptionDisplay();
}

function adjustConditionerEnergyUsage(change) {
    conditionerEnergyUsage += change;
    updateEnergyConsumptionDisplay();
}

const decreaseTempButton = document.getElementById('decrease-temp');
const increaseTempButton = document.getElementById('increase-temp');

decreaseTempButton.addEventListener('click', () => {
    adjustTemperature(-0.5);
});

increaseTempButton.addEventListener('click', () => {
    adjustTemperature(0.5);
});

const decreaseHumidityButton = document.getElementById('decrease-humidity');
const increaseHumidityButton = document.getElementById('increase-humidity');

decreaseHumidityButton.addEventListener('click', () => {
    if (currentHumidity > 0) {
        adjustHumidity(-1);
    }
});

increaseHumidityButton.addEventListener('click', () => {
    if (currentHumidity < 100) {
        adjustHumidity(1);
    }
});

const onRadioButton = document.getElementById('climateRadio3');
const offRadioButton = document.getElementById('climateRadio4');

onRadioButton.addEventListener('change', () => {
    if (onRadioButton.checked) {
        adjustBoilerEnergyUsage(4);
    }
});

offRadioButton.addEventListener('change', () => {
    if (offRadioButton.checked) {
        adjustBoilerEnergyUsage(-4);
    }
});

const conditionerOnRadioButton = document.getElementById('climateRadio1');
const conditionerOffRadioButton = document.getElementById('climateRadio2');
const econaviCheckbox = document.getElementById('econaviCheckbox');

conditionerOnRadioButton.addEventListener('change', () => {
    if (conditionerOnRadioButton.checked) {
        adjustConditionerEnergyUsage(5);
    }
});

conditionerOffRadioButton.addEventListener('change', () => {
    if (conditionerOffRadioButton.checked) {
        adjustConditionerEnergyUsage(-5);
    }
});

econaviCheckbox.addEventListener('change', () => {
    if (econaviCheckbox.checked) {
        adjustConditionerEnergyUsage(-3);
    } else {
        adjustConditionerEnergyUsage(3);
    }
});

updateWeatherWidget(await fetchWeatherData());
updateTemperatureDisplay();
updateHumidityDisplay();
updateEnergyUsageDisplay();
updateEnergyConsumptionDisplay();

setInterval(updateEnergyConsumptionDisplay, 500);
setInterval(increaseEnergyUsage, 2000);
