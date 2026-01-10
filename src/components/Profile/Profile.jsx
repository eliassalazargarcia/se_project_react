import "./Profile.css";
import SideBar from "./SideBar/SideBar.jsx";
import ClothesSection from "./ClothesSection/ClothesSection.jsx";

function Profile({ clothingItems, onAddClothesClick, onCardClick }) {
  return (
    <div className="profile">
      {/* Left: user info */}
      <SideBar />
      {/* Right: full list of items */}
      <ClothesSection
        clothingItems={clothingItems}
        onAddClothesClick={onAddClothesClick}
        onCardClick={onCardClick}
      />
    </div>
  );
}

export default Profile;
