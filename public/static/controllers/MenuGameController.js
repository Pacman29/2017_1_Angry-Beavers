/**
 * Created by pacman29 on 08.03.17.
 */

'use strict';

import View from '../modules/view';

class MenuGameController extends View {
    constructor(opt = {}) {
        if(MenuGameController.__instance){
            return MenuGameController.__instance;
        }
        super(opt);
        MenuGameController.__instance = this;
        this.addListener();
    }

    addListener() {
        document.getElementById("menuGame_play").addEventListener('click', event => {
            event.preventDefault();
            this.router.go('/play');
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
        this.page_parts.get("AppName").hidden = false;
        if (!this.session.isAuth) {
            this.router.go('/signin');
        }
        else {
            this.page_parts.get("MenuGame").hidden = false;
        }
        this.page_parts.get("Footer").hidden = false;
    }

    hide() {
        this.page_parts.get("AppName").hidden = true;
        this.page_parts.get("MenuGame").hidden = true;
        this.page_parts.get("Footer").hidden = true;
    }
}

export default MenuGameController;
