import React from "react";
import { useLocation, Link } from "react-router-dom";

import headerLogo from "../images/logo__header.svg";

function Header({ loggedIn, authUser, handleExitUser }) {
  const location = useLocation();

  return (
    <div className="header center">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <div className="header__info-container">
        {location.pathname === "/" && (
          <button onClick={handleExitUser} className="header__button button" >
            Выйти
          </button>
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
          <p className="header__user-info">{authUser.data.email}</p>
        )}
      </div>
    </div>
  );
}

export default Header;
