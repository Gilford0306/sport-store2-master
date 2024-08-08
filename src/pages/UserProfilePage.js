import React from 'react';
import './UserProfilePage.css'

function UserProfilePage() {
  return (
    <div className="profile-form">
      <div className="form-left">
        <div className="form-group">
          <label>Ім’я</label>
          <input type="text" placeholder="Ім’я" />
        </div>
        <div className="form-group">
          <label>Призвище</label>
          <input type="text" placeholder="Призвище" />
        </div>
      </div>
      <div className="form-right">
        <div className="form-group">
          <label>Номер телефону</label>
          <input type="text" placeholder="+380" />
        </div>
        <div className="form-group">
          <label>Ел.пошта</label>
          <input type="email" placeholder="Ел.пошта" />
        </div>
      </div>
      <div className="form-center">
        <div className="form-group photo-upload">
          <img src="path_to_photo" alt="profile" />
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
