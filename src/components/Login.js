import React from "react";

const Login = () => {
  return (
    <form className="form form_type_no-popup form_type_no-popup-with-margin center">
      <h2 className="popup-heading popup-heading_type_light">Вход</h2>
      <fieldset className="form__input-container input">
        <label className="form__field form__field_type_with-margin">
          <input
            className="form__item form__item_type_black input"
            placeholder="Email"
          />
        </label>

        <label className="form__field form__field_type_with-margin">
          <input
            className="form__item form__item_type_black input"
            placeholder="Пароль"
          />
        </label>
      </fieldset>
      <button
        type="submit"
        className="submit-btn submit-btn_type_light submit-btn_type_with-margin button"
      >
        Войти
      </button>
    </form>
  );
};

export default Login;
