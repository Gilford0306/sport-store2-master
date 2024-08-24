// UserProfilePage.jsx
import React, { useContext, useEffect, useState } from "react";
import "./UserProfilePage.css";
import { UserContext } from "../components/contexts/UserContext";
import axios from "axios";
import DeafaultPhoto from "../components/assets/Ellipse9.png";
import { useNavigate } from "react-router-dom";

function UserProfilePage() {
  const { userProfile, loadUserProfile } = useContext(UserContext);
  const [profileData, setProfileData] = useState(userProfile || {});
  const [isEditing, setIsEditing] = useState(false);
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

  return (
    <div className="profile-form">
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
    </div>
  );
}

export default UserProfilePage;
