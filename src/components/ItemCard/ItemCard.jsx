import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemCard({ data, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  // Check if the item was liked by the current user
  const isLiked = data.likes?.some((id) => id === currentUser?._id);

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleImageClick = () => {
    if (typeof onCardClick === "function") {
      onCardClick(data);
    }
  };

  const handleLike = () => {
    if (typeof onCardLike === "function") {
      onCardLike({ id: data._id, isLiked });
    }
  };

  return (
    <li className="card">
      <h2 className="card__title">{data.name}</h2>
      {isLoggedIn && (
        <button
          type="button"
          className={itemLikeButtonClassName}
          onClick={handleLike}
        />
      )}
      <img
        src={data.link}
        alt={data.name}
        className="card__image"
        onClick={handleImageClick}
      />
    </li>
  );
}

export default ItemCard;
