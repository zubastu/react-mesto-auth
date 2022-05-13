export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (password, email) => {
  const promise = fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  });
  return checkResponse(promise);
};

export const login = (password, email) => {
  const promise = fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  });
  return checkResponse(promise);
};

function checkResponse(promise) {
  return promise.then((res) => {
    return (res.status === 200) ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  });
}

export const checkAuth = (token) => {
  const promise = fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(promise);
};
