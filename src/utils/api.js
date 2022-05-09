import Client from "./client";

export default class Api {
  constructor(client) {
    this._client = client;
  }

  loadAllCards() {
    return this._client.get("cards");
  }

  createCard(card) {
    return this._client.post("cards", card);
  }

  deleteCard(id) {
    return this._client.delete(`cards/${id}`);
  }

  getUserInfo() {
    return this._client.get("users/me");
  }

  setUserInfo(data) {
    return this._client.patch("users/me", {
      name: data.name,
      about: data.about,
    });
  }

  getAvatar() {
    return this._client.get("users/me/avatar");
  }

  setAvatar(avatarData) {
    return this._client.patch("users/me/avatar", {
      avatar: avatarData.avatar,
    });
  }

  useLike(id) {
    return this._client.put(`cards/${id}/likes`);
  }

  removeLike(id) {
    return this._client.delete(`cards/${id}/likes`);
  }

  changeLikeCardStatus(id, isLiked) {
    if (!isLiked) {
      return this._client.put(`cards/${id}/likes`);
    } else {
      return this._client.delete(`cards/${id}/likes`);
    }
  }
}

const client = new Client("https://mesto.nomoreparties.co/v1/cohort-38", {
  authorization: "fc656d80-9f90-48b6-9907-1de866c0eaf7",
  "Content-Type": "application/json",
  Accept: "application/json: charset=utf-8",
});

export const api = new Api(client);
