import { useContext } from "react";

import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  // Read the current unit and the toggle handler straight from context.
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  const isChecked = currentTemperatureUnit === "C"; // checked means show Celsius

  return (
    <label htmlFor="toggle-switch" className="toggle-switch">
      <input
        id="toggle-switch"
        type="checkbox"
        className="toggle-switch__checkbox"
        checked={isChecked}
        onChange={handleToggleSwitchChange} // ask App (via context) to flip the unit
      />
      <span className="toggle-switch__circle"></span>
      <span className="toggle-switch__value toggle-switch__value_left">F</span>
      <span className="toggle-switch__value toggle-switch__value_right">C</span>
    </label>
  );
}

export default ToggleSwitch;
