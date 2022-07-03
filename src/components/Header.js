import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import headerLogo from "../images/logo__header.svg";

function Header({ loggedIn, handleExitUser }) {
  const location = useLocation();
  const { email } = useContext(CurrentUserContext);

  return (
    <div className="header center">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <div className="header__info-container">
        {location.pathname === "/signup" && (
          <Link to="/signin" className="header__button button">
            Войти
          </Link>
        )}
        {location.pathname === "/signin" && (
          <Link to="/signup" className="header__button button">
            Регистрация
          </Link>
        )}
        {loggedIn && location.pathname === "/" && (
          <>
            <p className="header__user-info">{email}</p>
            <button onClick={handleExitUser} className="header__button button">
              Выйти
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
