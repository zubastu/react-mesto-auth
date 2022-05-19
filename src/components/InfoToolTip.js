import React from "react";
import Popup from "./Popup";
import success from "../images/sucsess.svg";
import wrong from "../images/wrong.svg";

const InfoToolTip = ({ onClose, registrationResult, isOpened, name }) => {
  return (
    <Popup
      selector="popup_toolTip"
      closePopup={onClose}
      name={name}
      isOpened={isOpened}
    >
      <div className="tooltip">
        <img
          src={registrationResult ? success : wrong}
          className="tooltip__image"
          alt={registrationResult ? "Успех" : "Ошибка"}
        />
        <p className="tooltip__subtitle">
          {registrationResult
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </Popup>
  );
};

export default InfoToolTip;
