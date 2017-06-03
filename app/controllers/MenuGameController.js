/**
 * Created by pacman29 on 08.03.17.
 */

'use strict';

import View from '../modules/view';

class MenuGameController extends View {
    constructor(opt = {}) {
        if (MenuGameController.__instance) {
            return MenuGameController.__instance;
        }
        super(opt);
        MenuGameController.__instance = this;
        this.addListener();
    }

    addListener() {
        [...document.querySelectorAll(".userheader-appname")]
            .concat([...document.querySelectorAll('.appname')])
            .forEach(a => a.addEventListener('click', event => {
                event.preventDefault();
                this.router.go("/");
            }));

        document.querySelectorAll(".userheader-logout").forEach(a => a.addEventListener('click', event => {
            event.preventDefault();
            this.session.logout()
                .then(() => {
                    this.router.go('/');
                })
                .catch(e => {
                    document.myalert.show(e);
                });
        }));
        document.getElementById("menuGame_play").addEventListener('click', event => {
            event.preventDefault();
            this.router.go('/lobby');
        });
        document.getElementById("menuGame_score").addEventListener('click', event => {
            event.preventDefault();
            this.router.go('/scorelist');
        });
        document.getElementById("menuGame_aboutUs").addEventListener('click', event => {
            event.preventDefault();
            this.router.go('/aboutus');
        });
        document.getElementById("menuGame_rules").addEventListener('click', event => {
            event.preventDefault();
            this.router.go('/rules');
        });
    }


    resume() {
        this.show();
    }

    show() {
        this.page_parts.get("UserHeader").hidden = false;
        if (!this.session.isAuth) {
            this.router.go('/signin');
        }
        else {
            this.session.userData();
            this.page_parts.get("MenuGame").hidden = false;

            [...document.querySelectorAll('.userheader-login')].forEach(a => a.innerHTML = this.session.user.login);
            [...document.querySelectorAll('.userheader-score')].forEach(a => a.innerHTML = this.session.user.score);
        }
        this.page_parts.get("Footer").hidden = false;
    }

    hide() {
        this.page_parts.get("UserHeader").hidden = true;
        this.page_parts.get("MenuGame").hidden = true;
        this.page_parts.get("Footer").hidden = true;
        document.myalert.close();
    }
}

export default MenuGameController;
