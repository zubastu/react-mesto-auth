import React from "react";
import headerLogo from "../images/logo__header.svg";

function Header({ state }) {
  return (
    <div className="header center">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <div className="header__info-container">
        <button className="header__button button">Регистрация</button>
        {state.loggedIn && <p className="header__user-info">email</p>}
      </div>
    </div>
  );
}

export default Header;
