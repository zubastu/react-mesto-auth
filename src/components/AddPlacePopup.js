import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ onAddCard, onClose, isOpened, isUploading, dispatch }) => {
  const [card, setCard] = useState({ name: "", link: "" });

  const handleChangeInput = (event) => {
    const { value, name } = event.target;
    setCard({ ...card, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard(card);
  }

  return (
    <PopupWithForm
      dispatch={dispatch}
      isUploading={isUploading}
      closePopup={onClose}
      selector="popup popup_card"
      heading="popup-heading popup-heading_type_form"
      isOpened={isOpened}
      formName="form form_card"
      name="Card"
      title="Новое место"
      submit="submit-btn_type_form"
      onSubmit={handleSubmit}
      innerButtonText="Создать"
    >
      <label className="form__field">
        <input
          type="text"
          className="form__item form__item_input_name-card input"
          value={card.name}
          onChange={handleChangeInput}
          name="name"
          id="cardName-input"
          minLength="2"
          maxLength="30"
          required
          placeholder="Имя места"
        />
        <span className="form__input-error cardName-input-error"></span>
      </label>

      <label className="form__field">
        <input
          type="url"
          className="form__item form__item_input_link-card input"
          value={card.link}
          onChange={handleChangeInput}
          name="link"
          id="cardUrl-input"
          required
          placeholder="Ссылка на место"
        />
        <span className="form__input-error cardUrl-input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
