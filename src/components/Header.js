import React from "react";
import headerLogo from "../images/logo__header.svg";

function Header() {
  return (
    <div className="header center">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
    </div>
  );
}

export default Header;
