import React, { useEffect } from "react";

const Popup = ({ className, closePopup, children, name, dispatch }) => {
  const closeByEscape = (event) => {
    if (event.key === "Escape") {
      dispatch({
        type: "close_by_escape",
      });
    }
  };
  useEffect(() => {
    document.addEventListener("keyup", closeByEscape);
    return () => {
      document.removeEventListener("keyup", closeByEscape);
    };
  }, []);

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
