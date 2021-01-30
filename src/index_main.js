window.onload = function () {
  var thermostat = new Thermostat();

  // Load Data
  LoadData();

  // Update Text
  UpdateTempText();
  UpdateCityTemp();

  // Functions
  function UpdateTempText() {
    let currentTemperature = thermostat.getCurrentTemperature();
    $('#temperature').text(currentTemperature.toString());
  }

  function LoadData() {
    let thermo_temp = parseInt(window.localStorage.getItem('thermo_temp'));
    if (!thermo_temp) {
      thermo_temp = 20;
    }
    thermostat.setCurrentTemperature(thermo_temp);
  }

  function LocalSaveTemp() {
    let currentTemperature = thermostat.getCurrentTemperature();
    window.localStorage.setItem('thermo_temp', currentTemperature);
  }

  function UpdateThermostatText() {
    let currentMode = thermostat.getCurrentPowerSavingMode();
    let psText = "";

    if (currentMode) {
      psText += "on";
    } else {
      psText += "off";
    }

    $('#power-saving-status > b').text(psText);
  }

  function UpdateCityTemp() {
    $.get('http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2f126880b3291e092a6190341819d775',
      function (data) {
        let fahrenheit_temp = data.main.temp;
        let celsius_temp = FahrenheitToCelsius(fahrenheit_temp);
        $('#city-temperature').text(celsius_temp);
      }
    );
  }

  function FahrenheitToCelsius(value) {
    return parseInt(value - 273.15);
  }

  // Click events
  $('#temperature-up').click(function () {
    thermostat.up();
    LocalSaveTemp();
    UpdateTempText();
  });

  $('#temperature-down').click(function () {
    thermostat.down();
    LocalSaveTemp();
    UpdateTempText();
  });

  $('#temperature-reset').click(function () {
    thermostat.resetTemperature();
    LocalSaveTemp();
    UpdateTempText();
  });

  $('#powersaving-on').click(function () {
    thermostat.switchPowerSavingModeOn();
    UpdateThermostatText();
  });

  $('#powersaving-off').click(function () {
    thermostat.switchPowerSavingModeOff();
    UpdateThermostatText();
  });
}
