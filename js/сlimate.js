const autoMinTempElement = document.getElementById('user-min-temp');
const autoMaxTempElement = document.getElementById('user-max-temp');
const autoIncreaseMinTempButton = document.getElementById('increase-min-temp');
const autoDecreaseMinTempButton = document.getElementById('decrease-min-temp');
const autoIncreaseMaxTempButton = document.getElementById('increase-max-temp');
const autoDecreaseMaxTempButton = document.getElementById('decrease-max-temp');

let autoMinTemperature = 20.0;
let autoMaxTemperature = 24.0;
let autoAveTemperature = calculateAverageTemperature();

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

