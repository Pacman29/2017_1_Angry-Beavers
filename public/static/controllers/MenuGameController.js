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

        this.controller_parts.push(this.page_parts.get("UserHeader"));
        this.controller_parts.push(this.page_parts.get("MenuGame"));
        this.controller_parts.push(this.page_parts.get("Footer"));

        this.addListener();
    }

    addListener() {
        this.page_parts.get("UserHeader").controlls.appname.addEventListener('click', event => {
            event.preventDefault();
            this.router.go("/menu");
        });

        this.page_parts.get("UserHeader").controlls.logout.addEventListener('click', event => {
            event.preventDefault();
            this.session.logout()
                .then(() => {
                    this.router.go('/');
                })
                .catch(e => {
                    alert(e);
                });
        });

        let menu_controls = this.page_parts.get("MenuGame").controlls;

        menu_controls.buttons.play.addEventListener('click', event => {
            event.preventDefault();
            this.router.go('/play');
        });
        menu_controls.buttons.score.addEventListener('click', event => {
            event.preventDefault();
            this.router.go('/scorelist');
        });
        menu_controls.buttons.aboutUs.addEventListener('click', event => {
            event.preventDefault();
            this.router.go('/aboutus');
        });
        menu_controls.buttons.rules.addEventListener('click', event => {
            event.preventDefault();
            this.router.go('/rules');
        });
    }


    resume() {
        this.show();
    }

    show() {
        if (!this.session.isAuth) {
            this.router.go('/signin');
        }
        else {
            this.page_parts.get("UserHeader").hidden(false);
            this.page_parts.get("MenuGame").hidden(false);

            this.page_parts.get("UserHeader").controlls.login.innerHTML = this.session.user.login;
            this.page_parts.get("UserHeader").controlls.score.innerHTML = this.session.user.score;

            this.page_parts.get("Footer").hidden(false);
        }

    }

    hide() {
        this.controller_parts.forEach(iter => {
            iter.hidden(true);
        });
    }
}

export default MenuGameController;
