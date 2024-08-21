import React, { useContext, useEffect, useState } from "react";
import "./UserProfilePage.css";
import { UserContext } from "../components/contexts/UserContext";
import axios from "axios";

function UserProfilePage() {
  const { userProfile, loadUserProfile } = useContext(UserContext); // Предполагаем, что токен хранится в UserContext
  const [profileData, setProfileData] = useState(userProfile || {});
  const [isEditing, setIsEditing] = useState(false);

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
            Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
          },
        }
      );
      console.log(response.data);
      setIsEditing(false);
      loadUserProfile(); // Перезагрузить профиль, чтобы отобразить обновленные данные
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div className="profile-form">
      <div className="form-left">
        <div className="form-group">
          <label>Ім’я</label>
          <input
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
        <div className="form-group photo-upload">
          <img
            src={profileData?.photo || "path_to_default_photo"}
            alt="profile"
          />
          <button>Змінити фото</button>
        </div>
      </div>
      <div className="form-save">
        {isEditing ? (
          <button className="save-button" onClick={handleSave}>
            Зберегти
          </button>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Редагувати
          </button>
        )}
      </div>
    </div>
  );
}

export default UserProfilePage;
