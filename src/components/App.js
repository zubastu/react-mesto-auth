import React, { useReducer, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import reducer from "../utils/reducer";
import Register from "./Register";
import Login from "./Login";
import InfoToolTip from "./InfoToolTip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    isOpenProfile: false,
    isOpenCard: false,
    isOpenImage: false,
    isOpenAvatar: false,
    isOpenAccept: false,
    isOpenInfoToolTip: false,
    loadingCards: false,
    isUploading: false,
    card: {},
    selectedCardDelete: {},
    currentUser: {},
    cards: [],
    openedPopupName: "",
    loggedIn: false,
    registrationResult: false,
    userAuthorized: {},
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.loggedIn) return;
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
  }, [state.loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token &&
      auth.checkAuth(token).then((data) => {
        dispatch({
          type: "user_auth_set",
          payload: data,
        });
        dispatch({
          type: "login_ok",
        });
        navigate("/", { replace: true });
      });
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

  const onLogin = (authInfo) => {
    auth
      .login(authInfo.password, authInfo.email)
      .then((res) => {
        res && localStorage.setItem("token", res.token);
        dispatch({
          type: "login_ok",
        });
      })
      .then(() => {
        const token = localStorage.getItem("token");
        token &&
          auth.checkAuth(token).then((data) => {
            dispatch({
              type: "user_auth_set",
              payload: data,
            });
            navigate("/", { replace: true });
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "registration_err",
        });
      });
  };

  const onRegister = (authInfo) => {
    auth
      .register(authInfo.password, authInfo.email)
      .then((res) => {
        res &&
          dispatch({
            type: "registration_ok",
          });
        navigate("/sign-in", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "registration_err",
        });
      });
  };

  const handleExitUser = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "user_exit",
    });
    navigate("/sign-in", { replace: true });
  };

  return (
    <div className="page page_type_margin">
      <CurrentUserContext.Provider value={state.currentUser}>
        <Header
          loggedIn={state.loggedIn}
          authUser={state.userAuthorized}
          handleExitUser={handleExitUser}
        />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={onRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                exact
                path="/"
                component={Main}
                handleOpenProfile={handleOpenProfile}
                handleOpenCard={handleOpenCard}
                handleOpenAvatar={handleOpenAvatar}
                handleOpenCardImage={handleOpenCardImage}
                cards={state.cards}
                handleCardLike={handleCardLike}
                openAcceptDeletePopup={openAcceptDeletePopup}
                isLoadingCards={state.loadingCards}
                loggedIn={state.loggedIn}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <InfoToolTip
          dispatch={dispatch}
          onClose={closePopup}
          isOpened={state.isOpenInfoToolTip}
          registrationResult={state.registrationResult}
          name="InfoToolTip"
        />
        <EditProfilePopup
          dispatch={dispatch}
          isUploading={state.isUploading}
          onUpdateUser={handleUpdateUser}
          onClose={closePopup}
          isOpened={state.isOpenProfile}
        />
        <EditAvatarPopup
          dispatch={dispatch}
          isUploading={state.isUploading}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closePopup}
          isOpened={state.isOpenAvatar}
        />
        <AddPlacePopup
          dispatch={dispatch}
          isUploading={state.isUploading}
          onAddCard={handleAddPlaceSubmit}
          onClose={closePopup}
          isOpened={state.isOpenCard}
        />
        <PopupWithForm
          dispatch={dispatch}
          isUploading={state.isUploading}
          closePopup={closePopup}
          selector="popup popup_accept-delete-card"
          heading="popup-heading"
          isOpened={state.isOpenAccept}
          formName="delete-container"
          name="Accept"
          title="Вы уверены?"
          submit="submit-btn_type_accept"
          onSubmit={deleteCardAccept}
          innerButtonText="Да"
        />
      </CurrentUserContext.Provider>

      <Footer />

      <ImagePopup
        dispatch={dispatch}
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
