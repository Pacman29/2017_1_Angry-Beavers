/**
 * Created by pacman29 on 08.03.17.
 */
'use strict';

import View from '../modules/view';

class RulesController extends View {
    constructor(opt = {}) {
        if (RulesController.__instance) {
            return RulesController.__instance;
        }
        super(opt);
        RulesController.__instance = this;
        this.addListener();
    }

    addListener() {
        [...document.querySelectorAll(".userheader-appname")]
            .concat([...document.querySelectorAll('.appname')])
            .forEach(a => a.addEventListener('click', event => {
                event.preventDefault();
                this.router.go("/");
            }));
    }

    resume() {
        this.show();
    }

    show() {
        if (this.session.isAuth) {
            this.page_parts.get("UserHeader").hidden = false;
            [...document.querySelectorAll('.userheader-login')].forEach(a => a.innerHTML = this.session.user.login);
            [...document.querySelectorAll('.userheader-score')].forEach(a => a.innerHTML = this.session.user.score);
        } else {
            this.page_parts.get("AppName").hidden = false;
        }
        this.page_parts.get("Rules").hidden = false;
        this.page_parts.get("Footer").hidden = false;
    }

    hide() {
        this.page_parts.get("UserHeader").hidden = true;
        this.page_parts.get("AppName").hidden = true;
        this.page_parts.get("Rules").hidden = true;
        this.page_parts.get("Footer").hidden = true;
    }

}

export default RulesController;
