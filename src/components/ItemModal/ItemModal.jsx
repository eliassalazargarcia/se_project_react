import "./ItemModal.css";

function ItemModal({ isOpen, card, onClose }) {
  const handleOverlayMouseDown = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onMouseDown={handleOverlayMouseDown}
    >
      <div className="modal__content modal__content_type_preview">
        <button
          type="button"
          className="modal__close"
          aria-label="Close modal"
          onClick={onClose}
        />
        {card ? (
          <>
            <img src={card.link} alt={card.name} className="modal__image" />
            <div className="modal__footer">
              <p className="modal__caption">{card.name}</p>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ItemModal;
