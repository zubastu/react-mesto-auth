import React from "react";
import PopupWithForm from "./PopupWithForm";

const PopupDeleteAccept = ({
  isOpened,
  onAcceptClick,
  isUploading,
  onClose,
  dispatch
}) => {


  return (
    <PopupWithForm
      dispatch={dispatch}
      isUploading={isUploading}
      closePopup={onClose}
      selector="popup popup_accept-delete-card"
      heading="popup-heading"
      isOpened={isOpened}
      formName="delete-container"
      name="Accept"
      title="Вы уверены?"
      submit="submit-btn_type_accept"
      onSubmit={onAcceptClick}
      innerButtonText="Да"
    />
  );
};

export default PopupDeleteAccept;
