import logo from "../../../assets/logo.png";
import avatar from "../../../assets/avatar.png";
import { Link } from "react-router-dom";
import "./Header.css";

import ToggleSwitch from "../../ToggleSwithc/ToggleSwitch";

// Shows logo, location, and button to add clothes; needs weatherData to display the city name.
function Header({
  onAddClothesClick,
  weatherData,
}) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "short",
    day: "numeric",
  });
  const dateTimeValue = now.toISOString().split("T")[0];
  const cityName = weatherData?.city || "Loading"; // fallback keeps the header from crashing if data is still loading

  return (
    <header className="header">
      <div className="header__side">
        {/* Click logo to go to home */}
        <Link to="/" className="header__logo-link">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__place">
          <time className="header__datetime" dateTime={dateTimeValue}>
            {dateStr}
          </time>
          , {cityName}
        </p>
      </div>
      <div className="header__side">
        <ToggleSwitch />
        <button
          type="button"
          className="header__add-clothes-btn"
          onClick={onAddClothesClick}
        >
          + Add clothes
        </button>
        {/* Click name/avatar to go to profile */}
        <Link to="/profile" className="header__profile-link">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Avatar icon" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
