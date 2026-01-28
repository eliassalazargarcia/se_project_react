import "./Profile.css";
import SideBar from "./SideBar/SideBar.jsx";
import ClothesSection from "./ClothesSection/ClothesSection.jsx";

function Profile({ clothingItems, onAddClothesClick, onCardClick, onLogout, onEditProfile, onCardLike }) {
  return (
    <div className="profile">
      {/* Left: user info */}
      <SideBar onLogout={onLogout} onEditProfile={onEditProfile} />
      {/* Right: full list of items */}
      <ClothesSection
        clothingItems={clothingItems}
        onAddClothesClick={onAddClothesClick}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
      />
    </div>
  );
}

export default Profile;
