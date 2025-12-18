import cloudysky from "../../assets/cloudysky.png";
import "./WeatherCard.css";

function WeatherCard() {
  return (
    <section className="weather-card">
      <img
        src={cloudysky}
        alt="Cloudy wheather"
        className="weather-card__image"
      />
      <p className="weather-card__temp">75 &deg;F</p>
    </section>
  );
}

export default WeatherCard;
