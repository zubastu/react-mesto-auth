import React, { useEffect } from "react";

const Popup = ({ closePopup, children, name, selector, isOpened }) => {
  const closeByOverlayClick = (e) => {
    if (e.target.classList.contains("popup_opened")) {
      closePopup(name);
    }
  };

  const className = isOpened ? `${selector} popup_opened` : `${selector}`;

  useEffect(() => {
    if (!isOpened) return;
    const closeOnEscapeKey = (e) => {
      if (e.key === "Escape") {
        closePopup(name);
      }
    };
    document.addEventListener("keyup", closeOnEscapeKey);
    return () => {
      document.removeEventListener("keyup", closeOnEscapeKey);
    };
  }, [isOpened, closePopup, name]);

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
