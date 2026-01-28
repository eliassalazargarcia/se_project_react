import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemModal({ isOpen, card, onClose, onDeleteRequest }) {
  const currentUser = useContext(CurrentUserContext);

  const handleOverlayMouseDown = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  // Check if the current user is the owner of the current clothing item
  const isOwn = card?.owner === currentUser?._id;

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
              {isOwn && (
                <button
                  type="button"
                  className="modal__delete"
                  onClick={() => onDeleteRequest(card)}
                >
                  Delete item
                </button>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ItemModal;
