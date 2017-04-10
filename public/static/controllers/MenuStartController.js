/**
 * Created by pacman29 on 24.02.17.
 */

'use strict';

import View from '../modules/view';

class MenuStartController extends View {
    constructor(opt = {}) {
        if(MenuStartController.__instance){
            return MenuStartController.__instance;
        }
        super(opt);
        MenuStartController.__instance = this;

        this.controller_parts.push(this.page_parts.get("AppName"));
        this.controller_parts.push(this.page_parts.get("MenuStart"));
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

        let menu_controls = this.page_parts.get("MenuStart").controlls;

        debugger;

        menu_controls.signIn.addEventListener('click', event => {
            event.preventDefault();
            this.router.go('/signin');
        });
        menu_controls.aboutUs.addEventListener('click', event => {
            event.preventDefault();
            this.router.go('/aboutus');
        });
        menu_controls.rules.addEventListener('click', event => {
            event.preventDefault();
            this.router.go('/rules');
        });
    }

    resume() {
        this.show();
    }

    show() {

        if (this.session.isAuth) {
            this.router.go('/');
        }
        else {
            this.controller_parts.forEach(iter => {
                iter.hidden(false);
            })
        }

    }

    hide() {
        this.controller_parts.forEach(iter => {
            iter.hidden(true);
        })
    }
}

export default MenuStartController;
