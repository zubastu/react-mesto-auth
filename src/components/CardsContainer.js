import React from "react";
import loadOverlay from "../images/loading.svg";

const CardsContainer = ({ isLoadingCards, children }) => {
  return (
    <div id="cards-container" className="photo-cards center">
      {isLoadingCards ? (
        <img className="load-overlay" src={loadOverlay} alt="загрузка" />
      ) : (
        children
      )}
    </div>
  );
};

export default CardsContainer;
