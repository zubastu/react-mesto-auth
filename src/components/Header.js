import React from "react";
import { useLocation, Link } from "react-router-dom";

import headerLogo from "../images/logo__header.svg";

function Header({ loggedIn }) {
  const location = useLocation();

  return (
    <div className="header center">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <div className="header__info-container">
        {location.pathname === "/" && (
          <Link to="/sign-in" className="header__button button">
            Выйти
          </Link>
        )}
        {location.pathname === "/sign-up" && (
          <Link to="/sign-in" className="header__button button">
            Войти
          </Link>
        )}
        {location.pathname === "/sign-in" && (
          <Link to="/sign-up" className="header__button button">
            Регистрация
          </Link>
        )}
        {loggedIn && location.pathname === "/" && (
          <p className="header__user-info">Email в будущем</p>
        )}
      </div>
    </div>
  );
}

export default Header;
