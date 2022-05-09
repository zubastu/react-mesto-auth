import React from "react";
import Popup from "./Popup";

const ImagePopup = ({ selector, isOpened, onClose, selectedCard, name }) => {
  const popupClassName = `${
    isOpened ? `${selector} popup_opened` : `${selector}`
  }`;

  return (
    <Popup className={popupClassName} closePopup={onClose} name={name}>
      <div className="popup__photo-container">
        <button
          className="close-btn close-btn_photo "
          type="button"
          onClick={() => onClose(name)}
        />

        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="popup__photo-image"
        />

        <p className="popup__photo-paragraph">{selectedCard.name}</p>
      </div>
    </Popup>
  );
};

export default ImagePopup;