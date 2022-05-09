import React from "react";

const Popup = ({className, closePopup, children, name}) => {
  const closeByOverlayClick = (e) => {
    if (
      e.target.classList.contains("popup_opened") ||
      e.target.classList.contains("close-btn")
    ) {
      closePopup(name);
    }
  };


  return (
    <div className={className} onClick={closeByOverlayClick}>
      {children}
    </div>
  );
};

export default Popup;
