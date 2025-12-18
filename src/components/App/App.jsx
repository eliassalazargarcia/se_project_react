import { useState } from "react";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";

import { defaultClothingItems } from "../../utils/clothingItems.js";
import "./App.css";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const handleAddClothesClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  return (
    <div className="app">
      <Header onAddClothesClick={handleAddClothesClick} />
      <Main clothingItems={clothingItems} onCardClick={handleCardClick} />
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
  );
}

export default App;
