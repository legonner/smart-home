const getElement = id => document.getElementById(id);

const autoMinTempElement = getElement('user-min-temp');
const autoMaxTempElement = getElement('user-max-temp');
const userConditioningCurrentTempElement = getElement('user-conditioning-current-temp');
const userConditioningCurrentSpeedElement = getElement('user-conditioning-current-speed');
const autoIncreaseMinTempButton = getElement('increase-min-temp');
const autoDecreaseMinTempButton = getElement('decrease-min-temp');
const autoIncreaseMaxTempButton = getElement('increase-max-temp');
const autoDecreaseMaxTempButton = getElement('decrease-max-temp');
const increaseConditioningTempButton = getElement('increase-conditioning-temp');
const decreaseConditioningTempButton = getElement('decrease-conditioning-temp');
const increaseConditioningSpeedButton = getElement('increase-conditioning-speed');
const decreaseConditioningSpeedButton = getElement('decrease-conditioning-speed');
const climateControlButton = getElement('climateControlButton');
const conditionRadioOn = getElement('climateRadio1');
const conditionRadioOff = getElement('climateRadio2');
const boilerRadioOn = getElement('climateRadio3');
const boilerRadioOff = getElement('climateRadio4');
const climateAutoModeButton = getElement('btn-check-auto-mode');
const temperatureElement = getElement('temperature');
const conditionModeCool = getElement('climateModeRadioCool');
const conditionModeHeat = getElement('climateModeRadioHeat');

let currentTemperature = parseFloat(temperatureElement.textContent);
let autoMinTemperature = 20.0;
let autoMaxTemperature = 24.0;
let userConditioningTemp = 20.0;
let userConditioningSpeed = 3;

function calculateAverageTemperature() {
  const averageTemp = (autoMinTemperature + autoMaxTemperature) / 2;
  return averageTemp % 0.5 === 0 ? averageTemp : Math.floor(averageTemp);
}

autoMinTempElement.textContent = autoMinTemperature.toFixed(1);
autoMaxTempElement.textContent = autoMaxTemperature.toFixed(1);

function updateAutoTemperatures() {
  autoMinTempElement.textContent = autoMinTemperature.toFixed(1);
  autoMaxTempElement.textContent = autoMaxTemperature.toFixed(1);
}

function updateConditioningTempAndSpeed() {
  userConditioningCurrentTempElement.textContent = userConditioningTemp.toFixed(1);
  userConditioningCurrentSpeedElement.textContent = userConditioningSpeed;
}

let temperatureChangeInterval = null;

function startTemperatureChangeInterval() {
  if (temperatureChangeInterval === null) {
    const intervalTime = 7000 / userConditioningSpeed;
    temperatureChangeInterval = setInterval(changeTemperature, intervalTime);
  }
}

function stopTemperatureChangeInterval() {
  clearInterval(temperatureChangeInterval);
  temperatureChangeInterval = null;
}

function updateCurrentTemperature() {
  currentTemperature = parseFloat(temperatureElement.textContent);
}

setInterval(updateCurrentTemperature, 1000);

function changeTemperature() {
  if (!conditionRadioOn.checked) {
    stopTemperatureChangeInterval();
    conditionRadioOn.checked = false;
    updateClimateControlButton();
    return;
  }

  if (currentTemperature < userConditioningTemp) {
    conditionModeHeat.checked = true;
    currentTemperature += 0.5;
    temperatureElement.textContent = currentTemperature.toFixed(1);
  } else if (currentTemperature > userConditioningTemp) {
    conditionModeCool.checked = true;
    currentTemperature -= 0.5;
    temperatureElement.textContent = currentTemperature.toFixed(1);
  } else {
    updateClimateControlButton();
  }
}

updateConditioningTempAndSpeed();
updateAutoTemperatures();

autoIncreaseMinTempButton.addEventListener('click', () => {
  autoMinTemperature += 0.5;
  updateAutoTemperatures();
});

autoDecreaseMinTempButton.addEventListener('click', () => {
  autoMinTemperature -= 0.5;
  updateAutoTemperatures();
});

autoIncreaseMaxTempButton.addEventListener('click', () => {
  autoMaxTemperature += 0.5;
  updateAutoTemperatures();
});

autoDecreaseMaxTempButton.addEventListener('click', () => {
  autoMaxTemperature -= 0.5;
  updateAutoTemperatures();
});

increaseConditioningTempButton.addEventListener('click', () => {
  userConditioningTemp += 0.5;
  updateConditioningTempAndSpeed();
});

decreaseConditioningTempButton.addEventListener('click', () => {
  userConditioningTemp -= 0.5;
  updateConditioningTempAndSpeed();
});

increaseConditioningSpeedButton.addEventListener('click', () => {
  if (userConditioningSpeed < 7) {
    userConditioningSpeed++;
    updateConditioningTempAndSpeed();
    startTemperatureChangeInterval();
  }
});

decreaseConditioningSpeedButton.addEventListener('click', () => {
  if (userConditioningSpeed > 1) {
    userConditioningSpeed--;
    updateConditioningTempAndSpeed();
    startTemperatureChangeInterval();
  }
});

function updateClimateControlButton() {
  const conditionRadioChecked = conditionRadioOn.checked;
  const boilerRadioChecked = boilerRadioOn.checked;

  let iconHtml = '';
  if (conditionRadioChecked) {
    iconHtml += '<i class="fa-solid fa-fan fa-spin fa-xl"></i>';
  }
  if (boilerRadioChecked) {
    iconHtml += '<i class="fa-solid fa-fire fa-shake fa-xl"></i>';
  }

  if (iconHtml) {
    climateControlButton.innerHTML = `
      Climate control
      <span class="badge text-bg-primary">
        ${iconHtml}
      </span>
    `;
  } else {
    climateControlButton.innerHTML = `
      Climate control
      <span class="badge text-bg-primary"> off </span>
    `;
  }
}

conditionRadioOn.addEventListener('click', () => {
  updateClimateControlButton();
  if (conditionRadioOn.checked) {
    startTemperatureChangeInterval();
  } else {
    stopTemperatureChangeInterval();
  }
});

conditionRadioOff.addEventListener('click', updateClimateControlButton);
boilerRadioOn.addEventListener('click', updateClimateControlButton);
boilerRadioOff.addEventListener('click', updateClimateControlButton);

// Initialize DOM values on page load
updateConditioningTempAndSpeed();
updateAutoTemperatures();
updateClimateControlButton();
