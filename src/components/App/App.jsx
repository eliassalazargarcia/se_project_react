import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

import { addItem, deleteItem, getItems, addCardLike, removeCardLike, updateProfile } from "../../utils/api.js";
import { getWeatherData } from "../../utils/weatherApi.js";
import { register, authorize, checkToken } from "../../utils/auth.js";
import "./App.css";
import ItemModal from "../ItemModal/ItemModal.jsx";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../context/CurrentUserContext.js";

function App() {
  // App state: items, which modal is open, and the selected card.
  const [clothingItems, setClothingItems] = useState([]); // all clothing cards in state
  const [activeModal, setActiveModal] = useState(""); // which modal is currently open (if any)
  const [selectedCard, setSelectedCard] = useState(null); // card selected for preview modal
  const [cardToDelete, setCardToDelete] = useState(null); // card waiting for delete confirmation
  const [weatherData, setWeatherData] = useState({
    city: "",
    temperature: { F: 0, C: 0 },
    condition: "clear",
    isDay: true,
  }); // latest weather reading in both units
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F"); // chosen unit for temps (F/C)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // is user authenticated
  const [currentUser, setCurrentUser] = useState(null); // current user data

  // Open the "add garment" modal from the header button.
  const handleAddClothesClick = () => {
    setActiveModal("add-garment");
  };

  // Open register modal
  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  // Open login modal
  const handleLoginClick = () => {
    setActiveModal("login");
  };

  // Open edit profile modal
  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  // Handle user registration
  const handleRegistration = (data, resetForm) => {
    register(data)
      .then(() => {
        // After successful registration, log the user in
        return authorize({ email: data.email, password: data.password });
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        if (typeof resetForm === "function") {
          resetForm();
        }
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  // Handle user login
  const handleLogin = (data, resetForm) => {
    authorize(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        if (typeof resetForm === "function") {
          resetForm();
        }
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Handle profile update
  const handleUpdateUser = (data) => {
    const token = localStorage.getItem("jwt");
    updateProfile(data, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Update profile failed:", err);
      });
  };

  // Handle card like/unlike
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.error("Like failed:", err));
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.error("Unlike failed:", err));
    }
  };

  const handleCardClick = (card) => {
    // Open the preview modal for the clicked card.
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleCloseModal = () => {
    // Close any modal and clear the selected card.
    setActiveModal("");
    setSelectedCard(null);
    setCardToDelete(null);
  };

  const handleAddItemSubmit = (itemData, resetForm) => {
    const token = localStorage.getItem("jwt");
    addItem(itemData, token)
      .then((item) => {
        setClothingItems((prevItems) => [item, ...prevItems]);
        if (typeof resetForm === "function") {
          resetForm();
        }
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Add item failed:", err);
      });
  };

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("confirm-delete");
  };

  const handleDeleteItem = () => {
    if (!cardToDelete?._id) {
      return;
    }
    const token = localStorage.getItem("jwt");
    deleteItem(cardToDelete._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete._id)
        );
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Delete item failed:", err);
      });
  };

  // Switch between F and C wherever the app shows temperature.
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    // Load weather info once when the app starts.
    getWeatherData()
      .then((data) => {
        setWeatherData(data); // store city + temperature in state
      })
      .catch((err) => {
        console.error("Weather request failed:", err);
      });
  }, []);

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token check failed:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        console.error("Items request failed:", err);
      });
  }, []);

  return (
    // Share the unit and its toggle handler so children can read and flip it.
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={currentUser}>
          <div className="app">
            <Header
              weatherData={weatherData}
              onAddClothesClick={handleAddClothesClick}
              isLoggedIn={isLoggedIn}
              onRegisterClick={handleRegisterClick}
              onLoginClick={handleLoginClick}
            />
            {/* Page routes: home and profile */}
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onAddClothesClick={handleAddClothesClick}
                      onCardClick={handleCardClick}
                      onLogout={handleLogout}
                      onEditProfile={handleEditProfileClick}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onClose={handleCloseModal}
              onDeleteRequest={openConfirmationModal}
            />
            <DeleteConfirmationModal
              isOpen={activeModal === "confirm-delete"}
              onClose={handleCloseModal}
              onConfirm={handleDeleteItem}
            />
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onAddItem={handleAddItemSubmit}
              onCloseModal={handleCloseModal}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onRegister={handleRegistration}
              onCloseModal={handleCloseModal}
              onLoginClick={handleLoginClick}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onLogin={handleLogin}
              onCloseModal={handleCloseModal}
              onRegisterClick={handleRegisterClick}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onUpdateUser={handleUpdateUser}
              onCloseModal={handleCloseModal}
            />
          </div>
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
