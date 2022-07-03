import Client from "./client";

export default class Api {
  constructor(client) {
    this._client = client;
  }

  loadAllCards() {
    return this._client.get("/cards");
  }

  createCard(card) {
    return this._client.post("/cards", card);
  }

  deleteCard(id) {
    return this._client.delete(`/cards/${id}`);
  }

  getUserInfo() {
    return this._client.get("/users/me");
  }

  setUserInfo(data) {
    return this._client.patch("/users/me", {
      name: data.name,
      about: data.about,
    });
  }

  setAvatar(avatarData) {
    return this._client.patch("/users/me/avatar", {
      avatar: avatarData.avatar,
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (!isLiked) {
      return this._client.put(`cards/${id}/likes`);
    } else {
      return this._client.delete(`cards/${id}/likes`);
    }
  }

  register(pass, email) {
    return this._client.postAuthInfo(pass, email, "/signup");
  }

  login(pass, email) {
    return this._client.postAuthInfo(pass, email, "/signin");
  }

  auth(token) {
    return this._client.checkAuth(token);
  }
}

const client = new Client("https://api.zubastu.nomoreparties.sbs");

export const api = new Api(client);
