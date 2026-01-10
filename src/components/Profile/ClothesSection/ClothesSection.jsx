import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard.jsx";

function ClothesSection({ clothingItems, onAddClothesClick, onCardClick }) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        {/* Button opens the add-item form */}
        <button
          type="button"
          className="clothes-section__add-btn"
          onClick={onAddClothesClick}
        >
          + Add new
        </button>
      </div>
      {/* Show every clothing card in the app */}
      <ul className="clothes-section__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} data={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;
