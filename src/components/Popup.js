import React from "react";

const Popup = ({
  closePopup,
  children,
  name,
  selector,
  isOpened
}) => {



  const closeByOverlayClick = (e) => {
    if (e.target.classList.contains("popup_opened")) {
      closePopup(name);
    }
  };
  const className = isOpened ? `${selector} popup_opened` : `${selector}`

  return (
    <div className={className} onClick={closeByOverlayClick}>
      <div className="popup-container">
        {children}
        <button
          type="button"
          className="close-btn"
          onClick={() => closePopup(name)}
        />
      </div>
    </div>
  );
};

export default Popup;
