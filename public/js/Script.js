document.getElementById("city").addEventListener("input", getWeather);

async function getWeather() {
  try {
    const city = document.getElementById("city").value;
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: city,
          appid: "54a57bc234ad752a4f59e59cd372201d",
          units: "metric",
        },
      }
    );

    const forecastData = response.data.list;
    const currentDay = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });
    const dailyForecast = {};

    forecastData.forEach((data) => {
      const day = new Date(data.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
      });
      dailyForecast[day] = dailyForecast[day] || {
        minTemp: data.main.temp_min,
        maxTemp: data.main.temp_max,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
      };
      dailyForecast[day].minTemp = Math.min(
        dailyForecast[day].minTemp,
        data.main.temp_min
      );
      dailyForecast[day].maxTemp = Math.max(
        dailyForecast[day].maxTemp,
        data.main.temp_max
      );
    });
    const weatherCondition = getWeatherCondition(dailyForecast[currentDay].icon);
    document.body.className = weatherCondition;
    updateCurrentWeather(response.data.city.name, dailyForecast[currentDay]);

    const dayElements = document.querySelectorAll(".day-name");
    const tempElements = document.querySelectorAll(".day-temp");
    const iconElements = document.querySelectorAll(".day-icon");

    dayElements.forEach((dayElement, index) => {
      const day = Object.keys(dailyForecast)[index];
      const data = dailyForecast[day];
      dayElement.textContent = day;
      tempElements[index].textContent = `${Math.round(
        data.minTemp
      )}º / ${Math.round(data.maxTemp)}º`;
      iconElements[index].innerHTML = getWeatherIcon(data.icon);
    });
  } catch (error) {
    console.error("An error occurred while fetching data:", error.message);
  }
}
function getWeatherCondition(iconCode) {
  // Define weather conditions based on icon codes (adjust as needed)
  const weatherConditions = {
    "01": "sunny",
    "02": "cloudy",
    "03": "cloudy", // Considered as cloudy as well
    "04": "cloudy", // Considered as cloudy as well
    "09": "rainy",
    "10": "rainy", // Considered as rainy as well
    "11": "rainy", // Considered as rainy as well
    "13": "snowy",
    "50": "cloudy" // Considered as cloudy as well
  };
  const codePrefix = iconCode.slice(0, 2);
  // Use the weatherConditions object to map the icon code to the corresponding weather condition
  return weatherConditions[codePrefix] || "default";
}

function updateCurrentWeather(cityName, weatherData) {
  const currentTemperature = Math.round(weatherData.maxTemp);
  document.querySelector(
    ".weather-temp"
  ).textContent = `${currentTemperature}ºC`;
  document.querySelector(".date-dayname").textContent =
    new Date().toLocaleDateString("en-US", { weekday: "long" });
  const extractedDateTime = new Date().toUTCString().slice(5, 16);
  document.querySelector(".date-day").textContent = extractedDateTime;
  const weatherIconElement = document.querySelector(".weather-icon");
  weatherIconElement.innerHTML = getWeatherIcon(weatherData.icon);
  document.querySelector(".location").textContent = cityName;
  document.querySelector(".weather-desc").textContent = weatherData.description
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  document.querySelector(
    ".humidity .value"
  ).textContent = `${weatherData.humidity} %`;
  document.querySelector(
    ".wind .value"
  ).textContent = `${weatherData.windSpeed} m/s`;
}

function getWeatherIcon(iconCode) {
  const iconBaseUrl = "https://openweathermap.org/img/wn/";
  const iconSize = "@2x.png";
  return `<img src="${iconBaseUrl}${iconCode}${iconSize}" alt="Weather Icon">`;
}

document.addEventListener("DOMContentLoaded", () => {
  getWeather();
  setInterval(getWeather, 900000);
});
