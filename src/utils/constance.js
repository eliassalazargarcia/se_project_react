// Coordinates and API key are kept here so weatherApi.js can build the request URL.
const coordinates = { lat: "26.167281", lon: "-80.317949" };
const apiKey = "2ee69c6c78cdb41b9a685dd8bdbfbf28";

// Map weather conditions to the right background image for day/night cards.
const weatherConditionImages = {
  day: {
    clear: {
      name: "clear",
      image: new URL("../assets/day-clear.png", import.meta.url).href,
    },
    cloudy: {
      name: "cloudy",
      image: new URL("../assets/day-cloudy.png", import.meta.url).href,
    },
    fog: {
      name: "fog",
      image: new URL("../assets/day-fog.png", import.meta.url).href,
    },
    rain: {
      name: "rain",
      image: new URL("../assets/day-rain.png", import.meta.url).href,
    },
    snow: {
      name: "snow",
      image: new URL("../assets/day-snow.png", import.meta.url).href,
    },
    storm: {
      name: "storm",
      image: new URL("../assets/day-storm.png", import.meta.url).href,
    },
  },
  night: {
    clear: {
      name: "clear",
      image: new URL("../assets/night-clear.png", import.meta.url).href,
    },
    cloudy: {
      name: "cloudy",
      image: new URL("../assets/night-cloudy.png", import.meta.url).href,
    },
    fog: {
      name: "fog",
      image: new URL("../assets/night-fog.png", import.meta.url).href,
    },
    rain: {
      name: "rain",
      image: new URL("../assets/night-rain.png", import.meta.url).href,
    },
    snow: {
      name: "snow",
      image: new URL("../assets/night-snow.png", import.meta.url).href,
    },
    storm: {
      name: "storm",
      image: new URL("../assets/night-strom.png", import.meta.url).href, // file is named night-strom.png in assets
    },
  },
};

export { coordinates, apiKey, weatherConditionImages };
