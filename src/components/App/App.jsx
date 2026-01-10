import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";

import { addItem, deleteItem, getItems } from "../../utils/api.js";
import { getWeatherData } from "../../utils/weatherApi.js";
import "./App.css";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext.js";

function App() {
  // App state: items, which modal is open, and the selected card.
  const [clothingItems, setClothingItems] = useState([]); // all clothing cards in state
  const [activeModal, setActiveModal] = useState(""); // which modal is currently open (if any)
  const [selectedCard, setSelectedCard] = useState(null); // card selected for preview modal
  const [cardToDelete, setCardToDelete] = useState(null); // card waiting for delete confirmation
  const [weatherData, setWeatherData] = useState({
    city: "",
    temperature: { F: 0, C: 0 },
    condition: "clear",
    isDay: true,
  }); // latest weather reading in both units
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F"); // chosen unit for temps (F/C)

  // Open the "add garment" modal from the header button.
  const handleAddClothesClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    // Open the preview modal for the clicked card.
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleCloseModal = () => {
    // Close any modal and clear the selected card.
    setActiveModal("");
    setSelectedCard(null);
    setCardToDelete(null);
  };

  const handleAddItemSubmit = (itemData, resetForm) => {
    addItem(itemData)
      .then((item) => {
        setClothingItems((prevItems) => [item, ...prevItems]);
        if (typeof resetForm === "function") {
          resetForm();
        }
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Add item failed:", err);
      });
  };

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("confirm-delete");
  };

  const handleDeleteItem = () => {
    if (!cardToDelete?._id) {
      return;
    }
    deleteItem(cardToDelete._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete._id)
        );
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Delete item failed:", err);
      });
  };

  // Switch between F and C wherever the app shows temperature.
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    // Load weather info once when the app starts.
    getWeatherData()
      .then((data) => {
        setWeatherData(data); // store city + temperature in state
      })
      .catch((err) => {
        console.error("Weather request failed:", err);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        console.error("Items request failed:", err);
      });
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
          {/* Page routes: home and profile */}
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onAddClothesClick={handleAddClothesClick}
                  onCardClick={handleCardClick}
                />
              }
            />
          </Routes>
         

          <Footer />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={handleCloseModal}
            onDeleteRequest={openConfirmationModal}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "confirm-delete"}
            onClose={handleCloseModal}
            onConfirm={handleDeleteItem}
          />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
            onCloseModal={handleCloseModal}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
