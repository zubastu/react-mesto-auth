import React from "react";
import Profile from "./Profile";
import CardsContainer from "./CardsContainer";
import Card from "./Card";

function Main({
  handleOpenProfile,
  handleOpenAvatar,
  handleOpenCard,
  handleOpenCardImage,
  cards,
  handleCardLike,
  openAcceptDeletePopup,
  isLoadingCards,
}) {
  return (
    <div className="main">
      <Profile
        handleOpenProfile={handleOpenProfile}
        handleOpenAvatar={handleOpenAvatar}
        handleOpenCard={handleOpenCard}
      />

      <CardsContainer isLoadingCards={isLoadingCards}>
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardDelete={openAcceptDeletePopup}
            onCardLike={handleCardLike}
            handleOpenCardImage={handleOpenCardImage}
          />
        ))}
      </CardsContainer>
    </div>
  );
}

export default Main;
