import React, { useContext, useEffect, useState } from "react";
import "./UserProfilePage.css";
import { UserContext } from "../components/contexts/UserContext";
import axios from "axios";
import DeafaultPhoto from "../components/assets/Ellipse9.png";
import { useNavigate } from "react-router-dom";

function UserProfilePage() {
  const { userProfile, loadUserProfile, userRole } = useContext(UserContext);
  const [profileData, setProfileData] = useState(userProfile || {});
  const [isEditing, setIsEditing] = useState(false);
  const [newColor, setNewColor] = useState("");
  const [isColorFormVisible, setIsColorFormVisible] = useState(false);
  const [newCountry, setNewCountry] = useState("");
  const [isCountryFormVisible, setIsCountryFormVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isCategoryFormVisible, setIsCategoryFormVisible] = useState(false);
  const [newBrand, setNewBrand] = useState("");
  const [isBrandFormVisible, setIsBrandFormVisible] = useState(false);
  const [newGender, setNewGender] = useState("");
  const [isGenderFormVisible, setIsGenderFormVisible] = useState(false);
  const [newSport, setNewSport] = useState("");
  const [isSportFormVisible, setIsSportFormVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userProfile) {
      loadUserProfile();
    }
  }, [userProfile, loadUserProfile]);

  useEffect(() => {
    setProfileData(userProfile);
  }, [userProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://localhost:7000/api/Auth/UpdateProfile",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setIsEditing(false);
      loadUserProfile();
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleAllOrders = () => {
    navigate("/all-orders");
  };

  const handleAddItem = async (type, name, setter, toggleForm) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://localhost:7000/api/Product/AddNewItemToUniversalClass",
        { type, name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setter(""); // Clear input field
      toggleForm(false);
      // Optionally, you can reload data or show a success message here
    } catch (error) {
      console.error(`Error adding ${type.toLowerCase()}`, error);
    }
  };

  return (
    <div className="profile-form">
      {/* Existing profile form code */}
      <div className="form-left">
        <div className="form-group">
          <label>Ім’я</label>
          <input
            className="profile-form-input"
            type="text"
            name="firstName"
            placeholder="Ім’я"
            value={profileData?.firstName || ""}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Призвище</label>
          <input
            type="text"
            name="lastName"
            placeholder="Призвище"
            value={profileData?.lastName || ""}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>
      </div>
      <div className="form-right">
        <div className="form-group">
          <label>Номер телефону</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="+380"
            value={profileData?.phoneNumber || ""}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Ел.пошта</label>
          <input
            type="email"
            name="email"
            placeholder="Ел.пошта"
            value={profileData?.email || ""}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </div>
      </div>
      <div className="form-center">
        <div className="photo-upload">
          <img src={DeafaultPhoto} alt="profile" />
          <button className="save-button">Змінити фото</button>
        </div>
      </div>
      <div className="form-save">
        {isEditing ? (
          <button className="save-button" onClick={handleSave}>
            Зберегти
          </button>
        ) : (
          <button
            className="edit-button save-button"
            onClick={() => setIsEditing(true)}
          >
            Редагувати
          </button>
        )}
      </div>

      <div className="all-orders">
        <button className=" save-button" onClick={handleAllOrders}>
          Переглянути всі замовлення
        </button>
      </div>

      {userRole === "Admin" && (
        <div className="admin-actions">
          <button className="add-product-button" onClick={() => navigate("/add-product")}>
            Додати продукт
          </button>
          <button 
            className="add-color-button" 
            onClick={() => setIsColorFormVisible(!isColorFormVisible)}
          >
            Додати колір
          </button>
          {isColorFormVisible && (
            <div className="item-form">
              <input
                type="text"
                placeholder="Назва кольору"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
              />
              <button onClick={() => handleAddItem("Color", newColor, setNewColor, setIsColorFormVisible)}>Додати колір</button>
            </div>
          )}
          <button 
            className="add-country-button" 
            onClick={() => setIsCountryFormVisible(!isCountryFormVisible)}
          >
            Додати країну
          </button>
          {isCountryFormVisible && (
            <div className="item-form">
              <input
                type="text"
                placeholder="Назва країни"
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
              />
              <button onClick={() => handleAddItem("Country", newCountry, setNewCountry, setIsCountryFormVisible)}>Додати країну</button>
            </div>
          )}
          <button 
            className="add-category-button" 
            onClick={() => setIsCategoryFormVisible(!isCategoryFormVisible)}
          >
            Додати категорію
          </button>
          {isCategoryFormVisible && (
            <div className="item-form">
              <input
                type="text"
                placeholder="Назва категорії"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button onClick={() => handleAddItem("Category", newCategory, setNewCategory, setIsCategoryFormVisible)}>Додати категорію</button>
            </div>
          )}
          <button 
            className="add-brand-button" 
            onClick={() => setIsBrandFormVisible(!isBrandFormVisible)}
          >
            Додати бренд
          </button>
          {isBrandFormVisible && (
            <div className="item-form">
              <input
                type="text"
                placeholder="Назва бренду"
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
              />
              <button onClick={() => handleAddItem("Brand", newBrand, setNewBrand, setIsBrandFormVisible)}>Додати бренд</button>
            </div>
          )}
          <button 
            className="add-gender-button" 
            onClick={() => setIsGenderFormVisible(!isGenderFormVisible)}
          >
            Додати стать
          </button>
          {isGenderFormVisible && (
            <div className="item-form">
              <input
                type="text"
                placeholder="Назва статі"
                value={newGender}
                onChange={(e) => setNewGender(e.target.value)}
              />
              <button onClick={() => handleAddItem("Gender", newGender, setNewGender, setIsGenderFormVisible)}>Додати стать</button>
            </div>
          )}
          <button 
            className="add-sport-button" 
            onClick={() => setIsSportFormVisible(!isSportFormVisible)}
          >
            Додати спорт
          </button>
          {isSportFormVisible && (
            <div className="item-form">
              <input
                type="text"
                placeholder="Назва спорту"
                value={newSport}
                onChange={(e) => setNewSport(e.target.value)}
              />
              <button onClick={() => handleAddItem("Sport", newSport, setNewSport, setIsSportFormVisible)}>Додати спорт</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfilePage;
