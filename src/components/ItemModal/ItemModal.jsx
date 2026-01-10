import "./ItemModal.css";

function ItemModal({ isOpen, card, onClose, onDeleteRequest }) {
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
              <div className="modal__footer-text">
                <p className="modal__caption">{card.name}</p>
                <p className="modal__weather">Weather: {card.weather}</p>
              </div>
              <button
                type="button"
                className="modal__delete"
                onClick={() => onDeleteRequest(card)}
              >
                Delete item
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ItemModal;
