/**
 * Created by pacman29 on 08.03.17.
 */

'use strict';

import View from '../modules/view';

class SignUpController extends View {
    constructor(opt = {}) {
        if(SignUpController.__instance){
            return SignUpController.__instance;
        }
        super(opt);
        SignUpController.__instance = this;

        this.controller_parts.push(this.page_parts.get("AppName"));
        this.controller_parts.push(this.page_parts.get("SignUp"));
        this.controller_parts.push(this.page_parts.get("Footer"));

        this.addListener();
    }

    addListener() {

        this.page_parts.get("AppName").controlls.appname.addEventListener('click', event => {
            event.preventDefault();
            if(this.session.isAuth){
                this.router.go("/menu");
            } else {
                this.router.go("/");
            }

        });

        let form_btns = this.page_parts.get("SignUp").controlls.buttons;

        form_btns.signUp.addEventListener('click', event => {
            event.preventDefault();

            let credentials = this.validateForm();
            if (credentials) {
                this.session.signUp(credentials.login, credentials.email, credentials.password)
                    .then(() => {
                        this.router.go('/menu');
                    })
                    .catch(e => {
                        alert(e);
                    });
            }
        });
        form_btns.signIn.addEventListener('click', event => {
            event.preventDefault();
            this.router.go('/signin')
        });
    }

    validateForm() {
        let form_inpts = this.page_parts.get("SignUp").controlls.inputs;
        let login = form_inpts.loginInput.value;
        let passw = form_inpts.passwordInput.value;
        let passwRepeat = form_inpts.passwordRepeatInput.value;
        let email = form_inpts.emailInput.value;

        // email check
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            alert("Некорректный e-mail");
            return false;
        }

        // login check
        if (login.length < 4) {
            alert("Минимальная длина логина - 4 символа");
            return false;
        }
        if (!/^[a-zA-Z0-9_]*$/.test(login)) {
            alert("Логин может содержать только символы латинского алфавита, цифры и _");
            return false;
        }

        // password check
        if (passw.length < 6) {
            alert("Минимальная длина пароля - 6 символов");
            return false;
        }
        if (passw !== passwRepeat) {
            alert("Пароли не совпадают");
            return false;
        }

        return {
            login: login,
            password: passw,
            email: email
        }
    }

    resume() {
        this.show();
    }

    show() {
        this.page_parts.get("AppName").hidden(false);
        if (this.session.isAuth) {
            this.router.go('/');
        } else {
            this.page_parts.get("SignUp").hidden(false);
        }
        this.page_parts.get("Footer").hidden(false);
    }

    hide() {
        this.controller_parts.forEach(iter => {
            iter.hidden(true);
        });
    }
}

export default SignUpController;
