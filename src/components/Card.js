import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ card, onCardDelete, handleOpenCardImage, onCardLike }) => {
  const checkLike = () => {
    return card.likes.some(function (id) {
      return userInfo._id === id._id;
    });
  };

  const userInfo = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === userInfo._id;

  const deleteButtonClass = isOwn ? "card__delete" : "card__delete_disabled";

  const likeButtonClass = checkLike()
    ? "card__like card__like_active"
    : "card__like";

  return (
    <div className="card">
      <button
        type="button"
        className={`${deleteButtonClass} button`}
        onClick={() => onCardDelete(card)}
      />
      <img
        className="card__picture"
        src={card.link}
        alt={card.name}
        onClick={() => handleOpenCardImage(card)}
      />
      <div className="card__description">
        <p className="card__text">{card.name}</p>
        <div className="card__like-section">
          <button
            onClick={() => onCardLike(card, userInfo._id)}
            type="button"
            className={likeButtonClass}
          />
          <span
            className={
              card.likes.length > 0
                ? "card__like-counter"
                : "card__like-counter_disabled"
            }
          >
            {card.likes.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
