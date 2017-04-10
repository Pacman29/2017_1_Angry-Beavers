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

        this.controller_parts.push(this.page_parts.get("UserHeader"));
        this.controller_parts.push(this.page_parts.get("AppName"));
        this.controller_parts.push(this.page_parts.get("Rules"));
        this.controller_parts.push(this.page_parts.get("Footer"));

        this.addListener();
    }

    addListener() {
        this.page_parts.get("AppName").controlls.appname.querySelector(".appname").addEventListener('click', event => {
            event.preventDefault();
            if (this.session.isAuth) {
                this.router.go("/menu");
            } else {
                this.router.go("/");
            }

        });
    }

    resume() {
        this.show();
    }

    show() {
        this.controller_parts.forEach(iter => {
            if(iter[this.checker_user].call()){
                iter.hidden(false);
            }
        });
    }

    hide() {
        this.controller_parts.forEach(iter => {
            iter.hidden(true);
        });
    }

}

export default RulesController;
