import logo from "../../../assets/logo.png";
import avatar from "../../../assets/avatar.png";
import "./Header.css";

function Header({ onAddClothesClick }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "short",
    day: "numeric",
  });
  const dateTimeValue = now.toISOString().split("T")[0];

  return (
    <header className="header">
      <img src={logo} alt="WTWR logo" className="header__logo" />
      <p className="header__place">
        <time className="header__datetime" dateTime={dateTimeValue}>
          {dateStr}
        </time>
        , Miami
      </p>
      <button
        type="button"
        className="header__add-clothes-btn"
        onClick={onAddClothesClick}
      >
        + Add clothes
      </button>
      <p className="header__username">Terrence Tegegne</p>
      <img src={avatar} alt="Avatar icon" className="header__avatar" />
    </header>
  );
}

export default Header;
