/**
 * Created by pacman29 on 07.03.17.
 */

'use strict';

import View from '../modules/view';

class SignInController extends View {
    constructor(opt = {}) {
        if(SignInController.__instance){
            return SignInController.__instance;
        }
        super(opt);
        SignInController.__instance = this;

        this.controller_parts.push(this.page_parts.get("AppName"));
        this.controller_parts.push(this.page_parts.get("SignIn"));
        this.controller_parts.push(this.page_parts.get("Footer"));

        this.addListener();
    }

    addListener() {
        //
        this.page_parts.get("AppName").controlls.appname.querySelector(".appname").addEventListener('click', event => {
            event.preventDefault();
            if(this.session.isAuth){
                this.router.go("/menu");
            } else {
                this.router.go("/");
            }

        });

        let form_btns = this.page_parts.get("SignIn").controlls.buttons;

        form_btns.signIn.addEventListener('click', event => {
            event.preventDefault();

            let credentials = this.validateForm();
            if (credentials) {
                this.session.login(credentials.login, credentials.password)
                    .then(() => {
                        this.router.go('/menu');
                    })
                    .catch(e => {
                        alert(e);
                    });
            }

        });
        form_btns.signUp.addEventListener('click', event => {
            event.preventDefault();
            this.router.go('/signup')
        });
    }

    validateForm() {
        let form_inpts = this.page_parts.get("SignIn").controlls.inputs;
        let login = form_inpts.loginInput.value;
        let passw = form_inpts.passwordInput.value;

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

        return {
            login: login,
            password: passw
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
            this.page_parts.get("SignIn").hidden(false);
        }
        this.page_parts.get("Footer").hidden(false);
    }

    hide() {
        this.controller_parts.forEach(iter => {
            iter.hidden(true);
        });
    }

}

export default SignInController;
