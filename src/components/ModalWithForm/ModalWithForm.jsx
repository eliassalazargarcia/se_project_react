import "./ModalWithForm.css";

function ModalWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  children,
  altButton,
}) {
  const handleOverlayMouseDown = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (typeof onSubmit === "function") {
      onSubmit(evt);
    }
  };

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""}`}
      onMouseDown={handleOverlayMouseDown}
    >
      <div className="modal__content modal__content_type_form">
        <button
          type="button"
          className="modal__close modal__close_type_form"
          aria-label="Close modal"
          onClick={onClose}
        />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" name={name} onSubmit={handleSubmit}>
          {children}
          <div className="modal__button-row">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {altButton}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
