function onMapClick(e) {
  const latlng = e.latlng;
  const lat = latlng.lat;
  const lng = latlng.lng;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=YOUR_API_KEY&units=metric`)
    .then(response => response.json())
    .then(data => {
      updateCurrentWeather(
        data.name,
        data.weather[0].description,
        data.main.temp,
        data.main.humidity,
        data.wind.speed,
        data.weather[0].icon
      );
      const weatherCondition = getWeatherCondition(data.weather[0].icon);
      document.body.className = weatherCondition;
      // Remove the previous marker
      if (marker) {
        map.removeLayer(marker);
      }

      // Add a new marker with a popup that shows the weather information
      marker = L.marker([lat, lng]).addTo(map);
      marker.bindPopup(`
        <h3>${data.name}</h3>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind speed: ${data.wind.speed} m/s</p>
      `);
    })
    .catch(error => {
      console.error("An error occurred while fetching data:", error);
    });
}