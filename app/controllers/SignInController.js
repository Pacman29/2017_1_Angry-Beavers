/**
 * Created by pacman29 on 07.03.17.
 */

'use strict';

import View from '../modules/view';

class SignInController extends View {
    constructor(opt = {}) {
        if (SignInController.__instance) {
            return SignInController.__instance;
        }
        super(opt);
        SignInController.__instance = this;
        this.addListener();
    }

    addListener() {
        [...document.querySelectorAll(".userheader-appname")]
            .concat([...document.querySelectorAll('.appname')])
            .forEach(a => a.addEventListener('click', event => {
                event.preventDefault();
                this.router.go("/");
            }));

        document.getElementById("formSignIn_signInBtn").addEventListener('click', event => {
            event.preventDefault();

            document.myentrymsg.show("Входим");
            let login = document.getElementById('formSignIn_loginInput').value;
            let passw = document.getElementById('formSignIn_passwordInput').value;
            if (!login || !passw) {
                document.myentrymsg.close();
                document.myalert.show('Enter login and password');
            } else {
                this.session.login(login, passw)
                    .then(() => {
                        document.myentrymsg.close();
                        this.router.go('/menu');
                    })
                    .catch(e => {
                        document.myentrymsg.close();
                        document.myalert.show(e);
                    });
            }
        });
        document.getElementById("formSignIn_signUpBtn").addEventListener('click', event => {
            event.preventDefault();
            this.router.go('/signup')
        });
    }

    resume() {
        this.show();
    }

    show() {
        this.page_parts.get("AppName").hidden = false;
        if (this.session.isAuth) {
            this.router.go('/');
        } else {
            this.page_parts.get("SignIn").hidden = false;
        }
        this.page_parts.get("Footer").hidden = false;
    }

    hide() {
        this.page_parts.get("AppName").hidden = true;
        this.page_parts.get("SignIn").hidden = true;
        this.page_parts.get("Footer").hidden = true;
        document.myentrymsg.close();
        document.myalert.close();
    }

}

export default SignInController;
