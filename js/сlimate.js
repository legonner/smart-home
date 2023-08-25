const autoMinTempElement = document.getElementById('user-min-temp');
const autoMaxTempElement = document.getElementById('user-max-temp');
const userConditioningCurrentTempElement = document.getElementById('user-conditioning-current-temp');
const userConditioningCurrentSpeedElement = document.getElementById('user-conditioning-current-speed');
const autoIncreaseMinTempButton = document.getElementById('increase-min-temp');
const autoDecreaseMinTempButton = document.getElementById('decrease-min-temp');
const autoIncreaseMaxTempButton = document.getElementById('increase-max-temp');
const autoDecreaseMaxTempButton = document.getElementById('decrease-max-temp');
const increaseConditioningTempButton = document.getElementById('increase-conditioning-temp');
const decreaseConditioningTempButton = document.getElementById('decrease-conditioning-temp');
const increaseConditioningSpeedButton = document.getElementById('increase-conditioning-speed');
const decreaseConditioningSpeedButton = document.getElementById('decrease-conditioning-speed');
const climateControlButton = document.getElementById('climateControlButton');
const conditionRadioOn = document.getElementById('climateRadio1');
const conditionRadioOff = document.getElementById('climateRadio2');
const boilerRadioOn = document.getElementById('climateRadio3');
const boilerRadioOff = document.getElementById('climateRadio4');

let autoMinTemperature = 20.0;
let autoMaxTemperature = 24.0;
let autoAveTemperature = calculateAverageTemperature();

let userConditioningTemp = 20.0;
let userConditioningSpeed = 1;

function calculateAverageTemperature() {
  const averageTemp = (autoMinTemperature + autoMaxTemperature) / 2;
  return averageTemp % 0.5 === 0 ? averageTemp : Math.floor(averageTemp);
}

autoMinTempElement.textContent = autoMinTemperature.toFixed(1);
autoMaxTempElement.textContent = autoMaxTemperature.toFixed(1);

function updateAutoTemperatures() {
  autoMinTempElement.textContent = autoMinTemperature.toFixed(1);
  autoMaxTempElement.textContent = autoMaxTemperature.toFixed(1);
  autoAveTemperature = Math.floor((autoMinTemperature + autoMaxTemperature) / 2);
}

function updateConditioningTempAndSpeed() {
  userConditioningCurrentTempElement.textContent = userConditioningTemp.toFixed(1);
  userConditioningCurrentSpeedElement.textContent = userConditioningSpeed;
}

updateConditioningTempAndSpeed();

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
  }
});

decreaseConditioningSpeedButton.addEventListener('click', () => {
  if (userConditioningSpeed > 1) {
    userConditioningSpeed--;
    updateConditioningTempAndSpeed();
  }
});

function updateClimateControlButton() {
  const conditionRadioChecked = conditionRadioOn.checked;
  const boilerRadioChecked = boilerRadioOn.checked;

  if (conditionRadioChecked && boilerRadioChecked) {
    climateControlButton.innerHTML = `
      Climate control
      <span class="badge text-bg-primary">
        <i class="fa-solid fa-fan fa-spin fa-xl"></i>
        <i class="fa-solid fa-fire fa-shake fa-xl"></i>
      </span>
    `;
  } else if (conditionRadioChecked) {
    climateControlButton.innerHTML = `
      Climate control
      <span class="badge text-bg-primary">
        <i class="fa-solid fa-fan fa-spin fa-xl"></i>
      </span>
    `;
  } else if (boilerRadioChecked) {
    climateControlButton.innerHTML = `
      Climate control
      <span class="badge text-bg-primary">
        <i class="fa-solid fa-fire fa-shake fa-xl"></i>
      </span>
    `;
  } else {
    climateControlButton.innerHTML = `
      Climate control
      <span class="badge text-bg-primary"> off </span>
    `;
  }
}

conditionRadioOn.addEventListener('click', updateClimateControlButton);
conditionRadioOff.addEventListener('click', updateClimateControlButton);
boilerRadioOn.addEventListener('click', updateClimateControlButton);
boilerRadioOff.addEventListener('click', updateClimateControlButton);
