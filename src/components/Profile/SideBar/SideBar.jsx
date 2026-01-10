import avatar from "../../../assets/avatar.png";
import "./SideBar.css";

function SideBar() {
  return (
    <aside className="sidebar">
      {/* User info is hardcoded for now */}
      <img src={avatar} alt="Avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </aside>
  );
}

export default SideBar;
