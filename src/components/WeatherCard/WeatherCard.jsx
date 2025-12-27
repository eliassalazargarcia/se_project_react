import { useContext } from "react";

import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import { weatherConditionImages } from "../../utils/constance";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  // Pull the current unit from context; App provides { currentTemperatureUnit, handleToggleSwitchChange }.
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const isFahrenheit = currentTemperatureUnit === "F";
  // Use the precomputed temperatures from the API response; no per-render conversion needed.
  const temperature = isFahrenheit
    ? weatherData.temperature.F
    : weatherData.temperature.C;
  // Symbol to show beside the number based on the chosen unit.
  const tempSymbol = isFahrenheit ? "F" : "C";
  // Pick the correct background based on time of day and condition; fall back to clear if unknown.
  const dayNightKey = weatherData.isDay ? "day" : "night";
  const conditionKey = weatherData.condition || "clear";
  const cardImage =
    weatherConditionImages[dayNightKey]?.[conditionKey]?.image ??
    weatherConditionImages[dayNightKey]?.clear?.image;

  return (
    <section className="weather-card">
      <img
        src={cardImage}
        alt={`${conditionKey} weather ${dayNightKey}`}
        className="weather-card__image"
      />
      <p className="weather-card__temp">
        {temperature}&deg;{tempSymbol}
      </p>
    </section>
  );
}

export default WeatherCard;
