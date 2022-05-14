import React from "react";
import Popup from "./Popup";
import success from "../images/sucsess.svg";
import wrong from "../images/wrong.svg";

const InfoToolTip = ({ onClose, registrationResult, isOpened, name, dispatch }) => {
  const className = isOpened ? "popup_toolTip popup_opened" : "popup_toolTip";
  return (
    <Popup className={className} closePopup={onClose} name={name} dispatch={dispatch} isOpened={isOpened}>
      <div className="tooltip">
        <button
          type="button"
          className="close-btn close-btn_tooltip"
          onClick={() => onClose(name)}
        />

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
