import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../../WeatherCard/WeatherCard";

import ItemCard from "../../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../../context/CurrentTemperatureUnitContext";
import { getWeatherCondition } from "../../../utils/weatherApi";

function Main({ clothingItems, onCardClick, weatherData }) {
  // Read the unit from context to keep the “Today is …” line in sync with the toggle.
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const isFahrenheit = currentTemperatureUnit === "F";
  // Use the precomputed temperatures from the API response; no per-render conversion needed.
  const temperature = isFahrenheit
    ? weatherData.temperature.F
    : weatherData.temperature.C;
  const tempSymbol = isFahrenheit ? "F" : "C";
  // Determine which weather bucket we’re in (hot/warm/cold) based on the Fahrenheit reading.
  const weatherType = getWeatherCondition(weatherData.temperature.F);
  // Only show clothing items that match the current weather bucket.
  const filteredClothing = clothingItems.filter(
    (item) => item.weather?.toLowerCase() === weatherType
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="weather__text">
        Today is {temperature}° {tempSymbol} / You may want to wear:
      </p>
      <ul className="main__card-list">
        {filteredClothing.map((item) => {
          return (
            <ItemCard key={item._id} data={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
