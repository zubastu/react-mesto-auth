import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [login, setLogin] = useState({ email: "", password: "" });

  const handleChangeInput = (event) => {
    const { value, name } = event.target;
    setLogin({ ...login, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      email: login.email,
      password: login.password,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="form form_type_no-popup form_type_no-popup-with-margin center"
    >
      <h2 className="popup-heading popup-heading_type_light">Регистрация</h2>
      <fieldset className="form__input-container input">
        <label className="form__field form__field_type_with-margin">
          <input
            onChange={handleChangeInput}
            className="form__item form__item_type_black input"
            placeholder="Email"
            name="email"
            type="email"
            value={login.email || ""}
          />
        </label>

        <label className="form__field form__field_type_with-margin">
          <input
            onChange={handleChangeInput}
            className="form__item form__item_type_black input"
            placeholder="Пароль"
            name="password"
            type="password"
            autoComplete="on"
            value={login.password || ""}
          />
        </label>
      </fieldset>
      <button
        type="submit"
        className="submit-btn submit-btn_type_light submit-btn_type_with-margin button"
      >
        Зарегистрироваться
      </button>
      <Link className="register-link button" to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </form>
  );
};

export default Register;
