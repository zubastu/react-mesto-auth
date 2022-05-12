import React from "react";
import { useLocation, Link, Router, useHistory } from "react-router-dom";

import headerLogo from "../images/logo__header.svg";

function Header({ loggedIn }) {
  const location = useLocation();
  const history = useHistory()

  return (
    <Router history={history}>
      <div className="header center">
        <img className="header__logo" src={headerLogo} alt="Логотип" />
        <div className="header__info-container">
          {location.pathname === "/" && (
            <button className="header__button button" onClick={()=> history.push("/sign-in")}>
              Выйти
            </button>
          )}
          {location.pathname === "/sign-up" && (
            <button className="header__button button" onClick={()=> history.push("/sign-in")}>Войти</button>
          )}
          {location.pathname === "/sign-in" && (
            <button className="header__button button" onClick={()=> history.push("/sign-up")}>Регистрация</button>
          )}
          {loggedIn && location.pathname === "/" && (
            <p className="header__user-info">{loggedIn}</p>
          )}
        </div>
      </div>
    </Router>
  );
}

export default Header;
