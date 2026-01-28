import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.js";

function RegisterModal({ isOpen, onRegister, onCloseModal, onLoginClick }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof onRegister === "function") {
      onRegister(values, resetForm);
    }
  };

  return (
    <ModalWithForm
      name="register"
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      altButton={
        <button
          type="button"
          className="modal__alt-button"
          onClick={onLoginClick}
        >
          or Log In
        </button>
      }
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL*
        <input
          type="url"
          className="modal__input"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
