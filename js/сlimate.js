const getElement = id => document.getElementById(id);

const elements = {
  autoMinTemp: getElement('user-min-temp'),
  autoMaxTemp: getElement('user-max-temp'),
  userConditioningCurrentTemp: getElement('user-conditioning-current-temp'),
  userConditioningCurrentSpeed: getElement('user-conditioning-current-speed'),
  autoIncreaseMinTempButton: getElement('increase-min-temp'),
  autoDecreaseMinTempButton: getElement('decrease-min-temp'),
  autoIncreaseMaxTempButton: getElement('increase-max-temp'),
  autoDecreaseMaxTempButton: getElement('decrease-max-temp'),
  increaseConditioningTempButton: getElement('increase-conditioning-temp'),
  decreaseConditioningTempButton: getElement('decrease-conditioning-temp'),
  increaseConditioningSpeedButton: getElement('increase-conditioning-speed'),
  decreaseConditioningSpeedButton: getElement('decrease-conditioning-speed'),
  climateControlButton: getElement('climateControlButton'),
  conditionRadioOn: getElement('climateRadio1'),
  conditionRadioOff: getElement('climateRadio2'),
  boilerRadioOn: getElement('climateRadio3'),
  boilerRadioOff: getElement('climateRadio4'),
  climateAutoModeButton: getElement('btn-check-auto-mode'),
  autoModeSettingsButton: getElement('auto-mode-settings'),
  temperatureElement: getElement('temperature'),
  conditionModeCool: getElement('climateModeRadioCool'),
  conditionModeHeat: getElement('climateModeRadioHeat'),
};

let currentTemperature = parseFloat(elements.temperatureElement.textContent);
let autoMinTemperature = 20.0;
let autoMaxTemperature = 24.0;
let userConditioningTemp = 20.0;
let userConditioningSpeed = 2;
let temperatureChangeInterval = null;
let temperatureIncreaseInterval = null;

function calculateAverageTemperature() {
  const averageTemp = (autoMinTemperature + autoMaxTemperature) / 2;
  return averageTemp % 0.5 === 0 ? averageTemp : Math.floor(averageTemp);
}

// Update initial auto temperatures
elements.autoMinTemp.textContent = autoMinTemperature.toFixed(1);
elements.autoMaxTemp.textContent = autoMaxTemperature.toFixed(1);

function updateAutoTemperatures() {
  elements.autoMinTemp.textContent = autoMinTemperature.toFixed(1);
  elements.autoMaxTemp.textContent = autoMaxTemperature.toFixed(1);
}

function updateConditioningTempAndSpeed() {
  elements.userConditioningCurrentTemp.textContent = userConditioningTemp.toFixed(1);
  elements.userConditioningCurrentSpeed.textContent = userConditioningSpeed;
}

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
  currentTemperature = parseFloat(elements.temperatureElement.textContent);
}

function startTemperatureIncreaseInterval() {
  if (temperatureIncreaseInterval === null) {
    temperatureIncreaseInterval = setInterval(increaseTemperature, 3000);
  }
}

function stopTemperatureIncreaseInterval() {
  clearInterval(temperatureIncreaseInterval);
  temperatureIncreaseInterval = null;
}

function increaseTemperature() {
  if (elements.boilerRadioOff.checked || currentTemperature >= 30) {
    stopTemperatureIncreaseInterval();
    updateClimateControlButton();
    return;
  }

  currentTemperature += 0.5;
  elements.temperatureElement.textContent = currentTemperature.toFixed(1);
}

// Update current temperature value periodically
setInterval(updateCurrentTemperature, 1000);

// Change temperature based on user settings
function changeTemperature() {
  if (!elements.conditionRadioOn.checked) {
    stopTemperatureChangeInterval();
    elements.conditionRadioOn.checked = false;
    updateClimateControlButton();
    return;
  }

  if (currentTemperature < userConditioningTemp) {
    elements.conditionModeHeat.checked = true;
    currentTemperature += 0.5;
    elements.temperatureElement.textContent = currentTemperature.toFixed(1);
  } else if (currentTemperature > userConditioningTemp) {
    elements.conditionModeCool.checked = true;
    currentTemperature -= 0.5;
    elements.temperatureElement.textContent = currentTemperature.toFixed(1);
  } else {
    updateClimateControlButton();
  }
}

function updateClimateControlButton() {
  const conditionRadioChecked = elements.conditionRadioOn.checked;
  const boilerRadioChecked = elements.boilerRadioOn.checked;

  let iconHtml = '';
  if (conditionRadioChecked) {
    iconHtml += '<i class="fa-solid fa-fan fa-spin fa-xl"></i>';
  }
  if (boilerRadioChecked) {
    iconHtml += '<i class="fa-solid fa-fire fa-shake fa-xl"></i>';
  }

  if (iconHtml) {
    elements.climateControlButton.innerHTML = `
      Climate control
      <span class="badge text-bg-primary">
        ${iconHtml}
      </span>
    `;
  } else {
    elements.climateControlButton.innerHTML = `
      Climate control
      <span class="badge text-bg-primary"> off </span>
    `;
  }
}

// Toggle auto mode settings panel
elements.autoModeSettingsButton.addEventListener('click', () => {
  const autoModeSettingsIcon = elements.autoModeSettingsButton.querySelector('i');
  const isExpanded = autoModeSettingsIcon.classList.contains('fa-circle-chevron-up');

  if (isExpanded) {
    autoModeSettingsIcon.classList.remove('fa-circle-chevron-up');
    autoModeSettingsIcon.classList.add('fa-circle-chevron-down');
  } else {
    autoModeSettingsIcon.classList.remove('fa-circle-chevron-down');
    autoModeSettingsIcon.classList.add('fa-circle-chevron-up');
  }
});

// Increase minimum auto temperature
elements.autoIncreaseMinTempButton.addEventListener('click', () => {
  autoMinTemperature += 0.5;
  updateAutoTemperatures();
});

// Decrease minimum auto temperature
elements.autoDecreaseMinTempButton.addEventListener('click', () => {
  autoMinTemperature -= 0.5;
  updateAutoTemperatures();
});

// Increase maximum auto temperature
elements.autoIncreaseMaxTempButton.addEventListener('click', () => {
  autoMaxTemperature += 0.5;
  updateAutoTemperatures();
});

// Decrease maximum auto temperature
elements.autoDecreaseMaxTempButton.addEventListener('click', () => {
  autoMaxTemperature -= 0.5;
  updateAutoTemperatures();
});

// Increase user conditioning temperature
elements.increaseConditioningTempButton.addEventListener('click', () => {
  userConditioningTemp += 0.5;
  updateConditioningTempAndSpeed();
});

// Decrease user conditioning temperature
elements.decreaseConditioningTempButton.addEventListener('click', () => {
  userConditioningTemp -= 0.5;
  updateConditioningTempAndSpeed();
});

// Increase user conditioning speed
elements.increaseConditioningSpeedButton.addEventListener('click', () => {
  if (userConditioningSpeed < 7) {
    userConditioningSpeed++;
    updateConditioningTempAndSpeed();
    startTemperatureChangeInterval();
  }
});

// Decrease user conditioning speed
elements.decreaseConditioningSpeedButton.addEventListener('click', () => {
  if (userConditioningSpeed > 1) {
    userConditioningSpeed--;
    updateConditioningTempAndSpeed();
    startTemperatureChangeInterval();
  }
});

// Handle click on condition radio button
elements.conditionRadioOn.addEventListener('click', () => {
  updateClimateControlButton();
  if (elements.conditionRadioOn.checked) {
    startTemperatureChangeInterval();
  } else {
    stopTemperatureChangeInterval();
  }
});

// Handle click on boiler radio button
elements.boilerRadioOn.addEventListener('click', () => {
  updateClimateControlButton();
  if (elements.boilerRadioOn.checked) {
    startTemperatureIncreaseInterval();
  } else {
    stopTemperatureIncreaseInterval();
  }
});

// Handle click on boiler off radio button
elements.boilerRadioOff.addEventListener('click', () => {
  updateClimateControlButton();
  if (!elements.boilerRadioOff.checked) {
    startTemperatureIncreaseInterval();
  } else {
    stopTemperatureIncreaseInterval();
  }
});

// Update climate control button when condition radio is turned off
elements.conditionRadioOff.addEventListener('click', updateClimateControlButton);

// Update climate control button when boiler radio is turned on
elements.boilerRadioOn.addEventListener('click', updateClimateControlButton);

// Update climate control button when boiler radio is turned off
elements.boilerRadioOff.addEventListener('click', updateClimateControlButton);

// Initialize DOM values on page load
updateConditioningTempAndSpeed();
updateAutoTemperatures();
updateClimateControlButton();
