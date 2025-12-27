// Talks to OpenWeatherMap using our stored API key and coordinates.
import { apiKey, coordinates } from "./constance";

// Grab weather from the API and reshape it into the tiny object the UI needs.
function getWeatherData() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`
  )
    .then((res) => {
      return res.ok
        ? res.json() // happy path: turn the HTTP response into JSON
        : Promise.reject(`Error from weather API: ${res.status}`); // bubble up an error the UI can show
    })
    .then((data) => {
      return parseWeatherData(data);
    });
}

// Translate OpenWeather condition codes into our simple buckets.
function mapWeatherIdToCondition(weatherId) {
  if (weatherId >= 200 && weatherId < 600) {
    // Thunderstorms and rain/drizzle
    return "rain";
  }
  if (weatherId >= 600 && weatherId < 700) {
    return "snow";
  }
  if (weatherId >= 700 && weatherId < 800) {
    return "fog"; // mist, smoke, haze, dust, fog, etc.
  }
  if (weatherId === 800) {
    return "clear";
  }
  if (weatherId > 800) {
    // 80x: few/scattered/broken/overcast clouds
    return "cloudy";
  }
  return "clear";
}

// Pull out just the fields we care about for the UI.
function parseWeatherData(data) {
  const parsedData = {};

  parsedData.city = data.name; // city name (e.g., "Sunrise")
  // Store both F and C so the UI can switch without recomputing each render.
  parsedData.temperature = {
    F: Math.round(data.main.temp), // API returns Fahrenheit when units=imperial
    C: Math.round((data.main.temp - 32) * (5 / 9)),
  };
  // Simple condition string for selecting images.
  const weatherId = data.weather?.[0]?.id ?? 800;
  parsedData.condition = mapWeatherIdToCondition(weatherId);
  // Determine if it's currently day or night based on sunrise/sunset.
  const nowMs = Date.now();
  const sunriseMs = (data.sys?.sunrise ?? 0) * 1000;
  const sunsetMs = (data.sys?.sunset ?? 0) * 1000;
  parsedData.isDay = nowMs >= sunriseMs && nowMs < sunsetMs;

  return parsedData;
}

// Map a Fahrenheit temperature to a simple weather category used for filtering cards.
function getWeatherCondition(tempFahrenheit) {
  if (tempFahrenheit >= 86) {
    return "hot";
  }
  if (tempFahrenheit >= 66) {
    return "warm";
  }
  return "cold";
}

export { getWeatherData, getWeatherCondition };
