import React from "react";
import Popup from "./Popup";

const PopupWithForm = ({
  innerButtonText,
  closePopup,
  formName,
  heading,
  isOpened,
  isUploading,
  name,
  onSubmit,
  selector,
  submit,
  title,
  children,
  dispatch,
}) => {
  return (
    <Popup
      selector={selector}
      closePopup={closePopup}
      name={name}
      dispatch={dispatch}
      isOpened={isOpened}
    >
      <form
        className={`${formName} form_type_popup`}
        id={`${name}__form`}
        name={name}
        onSubmit={onSubmit}
        noValidate
      >
        <h2 className={heading}>{title}</h2>

        <fieldset className="form__input-container input">
          {children}
          <button
            type="submit"
            className={`submit-btn submit-btn_${name} ${submit} button`}
          >
            {isUploading ? "Выполнение..." : innerButtonText}
          </button>
        </fieldset>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
