export default class Client {
  constructor(url) {
    this._url = url;
    this._token = "";
  }

  _checkPromise(promise) {
    return promise.then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  get(type) {
    const promise = fetch(`${this._url}${type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json: charset=utf-8",
        authorization: `Bearer ${this._token}`,
      },
    });
    return this._checkPromise(promise);
  }

  post(type, item) {
    const promise = fetch(`${this._url}${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json: charset=utf-8",
        authorization: `Bearer ${this._token}`,
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link,
        image: item.image,
      }),
    });
    return this._checkPromise(promise);
  }

  patch(type, keys) {
    const promise = fetch(`${this._url}${type}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json: charset=utf-8",
        authorization: `Bearer ${this._token}`,
      },
      body: JSON.stringify(keys),
    });
    return this._checkPromise(promise);
  }

  delete(type) {
    const promise = fetch(`${this._url}/${type}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json: charset=utf-8",
        authorization: `Bearer ${this._token}`,
      },
    });
    return this._checkPromise(promise);
  }

  put(type) {
    const promise = fetch(`${this._url}/${type}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json: charset=utf-8",
        authorization: `Bearer ${this._token}`,
      },
    });
    return this._checkPromise(promise);
  }

  postAuthInfo(password, email, type) {
    const promise = fetch(`${this._url}${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json: charset=utf-8",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    });
    return this._checkPromise(promise);
  }

  checkAuth = (token) => {
    const promise = fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    this._token = token;
    return this._checkPromise(promise);
  };
}
