/**
 * Created by ed on 29.03.17.
 */

'use strict';

import BorderConstruct from '../../constructs/BorderConstruct/BorderConstruct';
import FormConsruct from '../../constructs/FormConstruct/FormConstruct';
import pugFormSignUp from './FormSignUp.pug';
import NodeDecorator from '../../NodeDecorator';

const RIGHT_IMG = "images/add_your_data.png";
const TITLE = "Регистрация";

const EMAIL_FIELD = {
    id: "formSignUp_emailInput",
    type: "email",
    required: "true",
    placeholder: "ваш e-mail",
};
const LOGIN_FIELD = {
    id: "formSignUp_loginInput",
    type: "text",
    required: "true",
    placeholder: "ваш логин",
};
const PASSRORD_FIELD = {
    id: "formSignUp_passwordInput",
    type: "password",
    required: "true",
    placeholder: "ваш пароль",
};
const PASSRORD_REPEAT_FIELD = {
    id: "formSignUp_passwordRepeatInput",
    type: "password",
    required: "true",
    placeholder: "ваш пароль ещё раз",
};

const SIGN_UP_BUTTON = {
    id: "formSignUp_signUpBtn",
    type: "submit",
    text: "Отправить",
};
const SIGN_IN_BUTTON = {
    id: "formSignUp_signInBtn",
    type: "reset",
    text: "Авторизация",
};

const FormSignUp = function () {
    let div = document.createElement('div');
    div.innerHTML = pugFormSignUp({
        form: {
            title: TITLE,
            fields: [
                EMAIL_FIELD,
                LOGIN_FIELD,
                PASSRORD_FIELD,
                PASSRORD_REPEAT_FIELD,
            ],
            buttons: [
                SIGN_UP_BUTTON,
                SIGN_IN_BUTTON,
            ],
        }
    });
    return new NodeDecorator(BorderConstruct({
        img: RIGHT_IMG,
        el: div
    }),true,false,{
        inputs: {
            emailInput: document.getElementById(EMAIL_FIELD.id),
            loginInput: document.getElementById(LOGIN_FIELD.id),
            passwordInput: document.getElementById(PASSRORD_FIELD.id),
            passwordRepeatInput: document.getElementById(PASSRORD_REPEAT_FIELD.id)
        },
        buttons: {
            signUp: document.getElementById(SIGN_UP_BUTTON.id),
            signIn: document.getElementById(SIGN_IN_BUTTON.id)
        }
    });
};

export default FormSignUp;
