import React, { useContext, useEffect, useState } from 'react';
import './UserProfilePage.css';
import { UserContext } from '../components/contexts/UserContext';

function UserProfilePage() {
  const { userProfile, loadUserProfile } = useContext(UserContext);
  const [profileData, setProfileData] = useState(userProfile || {});
  console.log('UserProfile:', profileData);
  useEffect(() => {
    if (!userProfile) {
      loadUserProfile();
    }
  }, [userProfile, loadUserProfile]);

  useEffect(() => {
    setProfileData(userProfile);
  }, [userProfile]);

  return (
    <div className="profile-form">
      <div className="form-left">
        <div className="form-group">
          <label>Ім’я</label>
          <input 
            type="text" 
            placeholder="Ім’я" 
            value={profileData?.firstname || ''} 
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Призвище</label>
          <input 
            type="text" 
            placeholder="Призвище" 
            value={profileData?.lastname || ''} 
            readOnly
          />
        </div>
      </div>
      <div className="form-right">
        <div className="form-group">
          <label>Номер телефону</label>
          <input 
            type="text" 
            placeholder="+380" 
            value={profileData?.phone || ''} 
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Ел.пошта</label>
          <input 
            type="email" 
            placeholder="Ел.пошта" 
            value={profileData?.email || ''} 
            readOnly
          />
        </div>
      </div>
      <div className="form-center">
        <div className="form-group photo-upload">
          <img src={profileData?.photo || 'path_to_default_photo'} alt="profile" />
          <button>Змінити фото</button>
        </div>
      </div>
      <div className="form-save">
        <button className="save-button">Зберегти</button>
      </div>
    </div>
  );
}

export default UserProfilePage;
