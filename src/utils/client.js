export default class Client {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }

  _checkPromise(promise) {
    return promise.then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  get(type) {
    const promise = fetch(`${this._url}/${type}`, {
      method: "GET",
      headers: this._headers,
    });
    return this._checkPromise(promise);
  }

  post(type, item) {
    const promise = fetch(`${this._url}/${type}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link,
        image: item.image,
      }),
    });
    return this._checkPromise(promise);
  }

  patch(type, keys) {
    const promise = fetch(`${this._url}/${type}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(keys),
    });
    return this._checkPromise(promise);
  }

  delete(type) {
    const promise = fetch(`${this._url}/${type}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._checkPromise(promise);
  }

  put(type) {
    const promise = fetch(`${this._url}/${type}`, {
      method: "PUT",
      headers: this._headers,
    });
    return this._checkPromise(promise);
  }
}
