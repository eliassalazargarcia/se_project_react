import "./Main.css";
import WeatherCard from "../../WeatherCard/WeatherCard";
import ItemCard from "../../ItemCard/ItemCard";

function Main({ clothingItems, onCardClick }) {
  return (
    <main className="main">
      <WeatherCard />
      <p className="weather__text">Today is 75° F / You may want to wear:</p>
      <ul className="main__card-list">
        {clothingItems.map((item) => {
          return <ItemCard key={item._id} data={item} onCardClick={onCardClick} />;
        })}
      </ul>
    </main>
  );
}

export default Main;
