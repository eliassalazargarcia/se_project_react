import { useEffect, useState } from "react";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";

import { defaultClothingItems } from "../../utils/clothingItems.js";
import { getWeatherData } from "../../utils/weatherApi.js";
import "./App.css";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext.js";

function App() {
  // Keep track of the cards to show, which modal is open, and which card is selected.
  const [clothingItems, setClothingItems] = useState([]); // all clothing cards in state
  const [activeModal, setActiveModal] = useState(""); // which modal is currently open (if any)
  const [selectedCard, setSelectedCard] = useState(null); // card selected for preview modal
  const [weatherData, setWeatherData] = useState({
    city: "",
    temperature: { F: 0, C: 0 },
    condition: "clear",
    isDay: true,
  }); // latest weather reading in both units
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F"); // chosen unit for temps (F/C)

  // Opens the add-garment modal when the header button is clicked.
  const handleAddClothesClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    // Open the preview modal for the clicked card.
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleCloseModal = () => {
    // Close any modal and clear selection.
    setActiveModal("");
    setSelectedCard(null);
  };

  // Toggles between Fahrenheit and Celsius everywhere the context is consumed.
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    // Grab weather data once when the app loads so we can later adjust UI based on weather.
    getWeatherData()
      .then((data) => {
        setWeatherData(data); // save the parsed weather object { city, temperature: { F, C } }
      })
      .catch((err) => {
        console.error("Weather request failed:", err);
      });
  }, []);

  useEffect(() => {
    setClothingItems(defaultClothingItems); // load starter clothes on mount
  }, []);

  return (
    // Share the unit and its toggle handler so children can read and flip it.
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <Header
            weatherData={weatherData} // pass weather down so the header can show city name
            onAddClothesClick={handleAddClothesClick}
          />
          <Main
            weatherData={weatherData}
            clothingItems={clothingItems}
            onCardClick={handleCardClick}
          />
          <Footer />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={handleCloseModal}
          />
          <ModalWithForm
            name="add-garment"
            title="New garment"
            buttonText="Add garment"
            isOpen={activeModal === "add-garment"}
            onClose={handleCloseModal}
          >
            <label className="modal__label">
              Name
              <input
                type="text"
                className="modal__input"
                name="name"
                placeholder="Name"
                required
              />
            </label>
            <label className="modal__label">
              Image
              <input
                type="url"
                className="modal__input"
                name="link"
                placeholder="Image URL"
                required
              />
            </label>
            <fieldset className="modal__fieldset">
              <legend className="modal__legend">Select the weather type:</legend>
              <label className="modal__radio-label">
                <input
                  type="radio"
                  className="modal__radio-input"
                  name="weather"
                  value="hot"
                  required
                />
                Hot
              </label>
              <label className="modal__radio-label">
                <input
                  type="radio"
                  className="modal__radio-input"
                  name="weather"
                  value="warm"
                  required
                />
                Warm
              </label>
              <label className="modal__radio-label">
                <input
                  type="radio"
                  className="modal__radio-input"
                  name="weather"
                  value="cold"
                  required
                />
                Cold
              </label>
            </fieldset>
          </ModalWithForm>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
