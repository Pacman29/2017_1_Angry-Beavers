/**
 * Created by ed on 28.03.17.
 */

'use strict';

import BorderConstruct from '../../constructs/BorderConstruct/BorderConstruct';
import FormConsruct from '../../constructs/FormConstruct/FormConstruct';
import pugFormSignIn from './FormSignIn.pug';
import imagescontroller from '../../ImagesController';
const RIGHT_IMG = imagescontroller.get_menu_img("add_your_data");
const TITLE = "Авторизация";

const LOGIN_FIELD = {
    id: "formSignIn_loginInput",
    type: "text",
    required: "true",
    placeholder: "ваш логин",
};
const PASSRORD_FIELD = {
    id: "formSignIn_passwordInput",
    type: "password",
    required: "true",
    placeholder: "ваш пароль",
};

const SIGN_IN_BUTTON = {
    id: "formSignIn_signInBtn",
    type: "submit",
    text: "Войти",
};
const SIGN_UP_BUTTON = {
    id: "formSignIn_signUpBtn",
    type: "reset",
    text: "Регистрация",
};

const FormSignIn = function () {
    let div = document.createElement('div');
    div.innerHTML = pugFormSignIn({
        form: {
            fields: [
                LOGIN_FIELD,
                PASSRORD_FIELD,
            ],
            buttons: [
                SIGN_IN_BUTTON,
                SIGN_UP_BUTTON,
            ],
        }
    });
    return BorderConstruct({
        title: TITLE,
        img: RIGHT_IMG,
        el: div
    });
};

export default FormSignIn;
