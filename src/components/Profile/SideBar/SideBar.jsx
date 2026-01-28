import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../../context/CurrentUserContext";

function SideBar({ onLogout, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt="Avatar"
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser?.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <button type="button" className="sidebar__button" onClick={onEditProfile}>
        Change profile data
      </button>
      <button type="button" className="sidebar__logout" onClick={onLogout}>
        Log out
      </button>
    </aside>
  );
}

export default SideBar;
