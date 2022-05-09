export default function (state, action) {
  switch (action.type) {
    case "loading-cards-start":
      return {
        ...state,
        loadingCards: true,
      };
    case "loading-cards-end":
      return {
        ...state,
        loadingCards: false,
      };

    case "uploading-start":
      return {
        ...state,
        isUploading: true,
      };
    case "uploading-end":
      return {
        ...state,
        isUploading: false,
      };

    case "init":
      return {
        ...state,
        currentUser: action.payload.currentUser,
        cards: action.payload.cards,
      };

    case "init_user":
      return {
        ...state,
        currentUser: action.payload,
      };

    case "update_card":
      const updatedCards = state.cards.map((c) =>
        c._id === action.payload.card._id ? action.payload.newCard : c
      );
      return {
        ...state,
        cards: updatedCards,
      };

    case "delete_card":
        const newCards = state.cards.filter(
          (c) => c._id !== action.payload.card._id
        );
        return {
          ...state,
          cards: newCards,
        };

    case "add_card":
      const addNewCard = [action.payload, ...state.cards];
      return {
        ...state,
        cards: addNewCard,
      };

    case "open_profile":
      return {
        ...state,
        isOpenProfile: true,
        openedPopupName: "Profile",
      };

    case "open_card":
      return {
        ...state,
        isOpenCard: true,
        openedPopupName: "Card",
      };

    case "open_avatar":
      return {
        ...state,
        isOpenAvatar: true,
        openedPopupName: "Avatar",
      };

    case "open_image":
      return {
        ...state,
        isOpenImage: true,
        card: action.payload.card,
        openedPopupName: "Image",
      };

    case "open_accept":
      return {
        ...state,
        isOpenAccept: true,
        selectedCardDelete: action.payload.selectedCardDelete,
        openedPopupName: "Accept",
      };

    case "close_popup":
      return {
        ...state,
        [`isOpen${action.payload}`]: false,
      };

    case "close_by_escape":
      return {
        ...state,
        [`isOpen${state.openedPopupName}`]: false,
      };

    default:
      return state;
  }
}

