import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.js";

function LoginModal({ isOpen, onLogin, onCloseModal, onRegisterClick }) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof onLogin === "function") {
      onLogin(values, resetForm);
    }
  };

  return (
    <ModalWithForm
      name="login"
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      altButton={
        <button
          type="button"
          className="modal__alt-button"
          onClick={onRegisterClick}
        >
          or Sign Up
        </button>
      }
    >
      <label className="modal__label">
        Email
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
        Password
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
    </ModalWithForm>
  );
}

export default LoginModal;
