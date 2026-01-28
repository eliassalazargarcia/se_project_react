import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard.jsx";
import CurrentUserContext from "../../../context/CurrentUserContext";

function ClothesSection({ clothingItems, onAddClothesClick, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Filter items to only show those owned by the current user
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

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
      {/* Show only clothing cards owned by the current user */}
      <ul className="clothes-section__list">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              data={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              isLoggedIn={true}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;
