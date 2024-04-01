document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "54a57bc234ad752a4f59e59cd372201d";

  async function getWeatherData(cityName) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      const city = data.name;
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      document.getElementById("cityName").textContent = `City: ${city}`;
      document.getElementById(
        "temperature"
      ).textContent = `Temperature: ${temperature}°C`;
      document.getElementById(
        "description"
      ).textContent = `Description: ${description}`;
      document.getElementById(
        "humidity"
      ).textContent = `Humidity: ${humidity}%`;
      document.getElementById(
        "windSpeed"
      ).textContent = `Wind Speed: ${windSpeed} m/s`;
      document.getElementById("weatherData").classList.remove("hidden");
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  const cities = [
    // "NewYork",
    "London",
    "Paris",
    "Berlin",
    "Toronto",
    "Sydney",
    "Tokyo",
  ];
  cities.forEach((city) => {
    document.getElementById(city).addEventListener("click", function (event) {
      event.preventDefault();
      getWeatherData(city);
    });
  });
  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      const cityName = document.getElementById("cityInput").value;
      getWeatherData(cityName);
    });
});
