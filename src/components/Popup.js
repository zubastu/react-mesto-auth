import React, { useEffect } from "react";

const Popup = ({
  className,
  closePopup,
  children,
  name,
}) => {



  const closeByOverlayClick = (e) => {
    if (e.target.classList.contains("popup_opened")) {
      closePopup(name);
    }
  };

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
