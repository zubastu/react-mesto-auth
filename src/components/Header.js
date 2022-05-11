import React from "react";
import headerLogo from "../images/logo__header.svg";

function Header({ state }) {
  const checkUrl = document.location.href;

  return (
    <div className="header center">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <div className="header__info-container">
        {checkUrl.endsWith("/") && (
          <button className="header__button button">Выйти</button>
        )}
        {checkUrl.endsWith("/sign-up") && (
          <button className="header__button button">Войти</button>
        )}
        {checkUrl.endsWith("/sign-in") && (
          <button className="header__button button">Регистрация</button>
        )}
        {state.loggedIn && checkUrl.endsWith("/") && <p className="header__user-info">{state.currentUser.name}</p>}
      </div>
    </div>
  );
}

export default Header;
