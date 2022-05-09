import React, { useReducer, useEffect } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupDeleteAccept from "./PopupDeleteAccept";
import reducer from "../utils/reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    isOpenProfile: false,
    isOpenCard: false,
    isOpenImage: false,
    isOpenAvatar: false,
    isOpenAccept: false,
    card: {},
    selectedCardDelete: {},
    loadingCards: false,
    isUploading: false,
    currentUser: {},
    cards: [],
    openedPopupName: "",
  });

  useEffect(() => {
    dispatch({
      type: "loading-cards-start",
    });
    Promise.all([api.getUserInfo(), api.loadAllCards()])
      .then(([userData, cardsData]) => {
        dispatch({
          type: "init",
          payload: {
            currentUser: userData,
            cards: cardsData,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: "loading-cards-end",
        });
      });
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", closeByEscape);
    return () => {
      document.removeEventListener("keyup", closeByEscape);
    };
  }, []);

  const handleCardLike = (card, userId) => {
    const isLiked = card.likes.some((i) => i._id === userId);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        dispatch({
          type: "update_card",
          payload: {
            newCard: newCard,
            card: card,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteCard = (card) => {
    dispatch({
      type: "uploading-start",
    });
    api
      .deleteCard(card._id)
      .then(() => {
        dispatch({
          type: "delete_card",
          payload: card._id,
        });
        closePopup("Accept");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: "uploading-end",
        });
      });
  };

  const handleUpdateUser = (cardInfo) => {
    dispatch({
      type: "uploading-start",
    });
    api
      .setUserInfo(cardInfo)
      .then((data) => {
        dispatch({
          type: "init_user",
          payload: data,
        });
        closePopup("Profile");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: "uploading-end",
        });
      });
  };

  const handleUpdateAvatar = (avatarInfo) => {
    dispatch({
      type: "uploading-start",
    });
    api
      .setAvatar(avatarInfo)
      .then((data) => {
        dispatch({
          type: "init_user",
          payload: data,
        });
        closePopup("Avatar");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: "uploading-end",
        });
      });
  };

  const handleOpenProfile = () =>
    dispatch({
      type: "open_profile",
    });
  const handleOpenCard = () =>
    dispatch({
      type: "open_card",
    });
  const handleOpenAvatar = () =>
    dispatch({
      type: "open_avatar",
    });
  const handleOpenCardImage = (card) => {
    dispatch({
      type: "open_image",
      payload: {
        card: card,
      },
    });
  };

  const closePopup = (popupType) => {
    dispatch({
      type: "close_popup",
      payload: popupType,
    });
  };

  const handleAddPlaceSubmit = (cardInfo) => {
    dispatch({
      type: "uploading-start",
    });
    api
      .createCard(cardInfo)
      .then((newCard) => {
        dispatch({
          type: "add_card",
          payload: newCard,
        });
        closePopup("Card");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: "uploading-end",
        });
      });
  };

  const deleteCardAccept = (e) => {
    e.preventDefault();
    handleDeleteCard(state.selectedCardDelete);
  };

  const openAcceptDeletePopup = (card) => {
    dispatch({
      type: "open_accept",
      payload: {
        selectedCardDelete: card,
      },
    });
  };

  const closeByEscape = (event) => {
    if (event.key === "Escape") {
      dispatch({
        type: "close_by_escape",
      });
    }
  };

  return (
    <div className="page page_type_margin">
      <Header />
      <CurrentUserContext.Provider value={state.currentUser}>
        <Main
          handleOpenProfile={handleOpenProfile}
          handleOpenCard={handleOpenCard}
          handleOpenAvatar={handleOpenAvatar}
          handleOpenCardImage={handleOpenCardImage}
          cards={state.cards}
          handleCardLike={handleCardLike}
          openAcceptDeletePopup={openAcceptDeletePopup}
          isLoadingCards={state.loadingCards}
        />
        <EditProfilePopup
          isUploading={state.isUploading}
          onUpdateUser={handleUpdateUser}
          onClose={closePopup}
          isOpened={state.isOpenProfile}
        />
        <EditAvatarPopup
          isUploading={state.isUploading}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closePopup}
          isOpened={state.isOpenAvatar}
        />
        <AddPlacePopup
          isUploading={state.isUploading}
          onAddCard={handleAddPlaceSubmit}
          onClose={closePopup}
          isOpened={state.isOpenCard}
        />
        <PopupDeleteAccept
          isUploading={state.isUploading}
          onAcceptClick={deleteCardAccept}
          onClose={closePopup}
          isOpened={state.isOpenAccept}
        />
      </CurrentUserContext.Provider>

      <Footer />

      <ImagePopup
        selectedCard={state.card}
        onClose={closePopup}
        isOpened={state.isOpenImage}
        selector="popup popup_photo"
        name="Image"
      />
    </div>
  );
}

export default App;
