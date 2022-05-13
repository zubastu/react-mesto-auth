import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpened, onClose, isUploading, onUpdateUser, dispatch }) => {
  const [profile, setProfile] = useState({ name: "", about: "" });

  const handleChangeInput = (event) => {
    const { value, name } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const userInfo = useContext(CurrentUserContext);
  useEffect(() => {
    setProfile({
      name: userInfo.name,
      about: userInfo.about,
    });
  }, [userInfo, isOpened]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: profile.name,
      about: profile.about,
    });
  }

  return (
    <div>
      <PopupWithForm
        dispatch={dispatch}
        onSubmit={handleSubmit}
        isUploading={isUploading}
        closePopup={onClose}
        selector="popup popup_profile"
        heading="popup-heading popup-heading_type_form"
        isOpened={isOpened}
        formName="form form_profile"
        name="Profile"
        title="Редактировать профиль"
        submit="submit-btn_type_form"
        innerButtonText="Сохранить"
      >
        <label className="form__field">
          <input
            type="text"
            className="form__item form__item_input_name-profile input"
            name="name"
            id="name-input"
            minLength="2"
            maxLength="40"
            required
            value={profile.name || ""}
            onChange={handleChangeInput}
            placeholder="Имя профиля"
          />
          <span className="form__input-error name-input-error"></span>
        </label>

        <label className="form__field">
          <input
            type="text"
            className="form__item form__item_input_job-profile input"
            name="about"
            id="job-input"
            minLength="2"
            maxLength="200"
            required
            value={profile.about || ""}
            onChange={handleChangeInput}
            placeholder="Деятельность"
          />
          <span className="form__input-error job-input-error"></span>
        </label>
      </PopupWithForm>
    </div>
  );
};

export default EditProfilePopup;
