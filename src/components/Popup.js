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
