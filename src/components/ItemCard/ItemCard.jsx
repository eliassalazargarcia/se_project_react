import "./ItemCard.css";

function ItemCard({ data, onCardClick }) {
  const handleImageClick = () => {
    if (typeof onCardClick === "function") {
      onCardClick(data);
    }
  };

  return (
    <li className="card">
      <h2 className="card__title">{data.name}</h2>
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
