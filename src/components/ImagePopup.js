import React from "react";
import Popup from "./Popup";

const ImagePopup = ({ selector, isOpened, onClose, selectedCard, name }) => {


  return (
    <Popup selector={selector} closePopup={onClose} name={name} isOpened={isOpened}>
      <div className="popup__photo-container">
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