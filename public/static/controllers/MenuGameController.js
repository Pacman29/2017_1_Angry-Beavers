/**
 * Created by pacman29 on 08.03.17.
 */

'use strict';

(function () {
    class MenuGameController extends window.View {
        constructor(opt = {}) {
            super(opt.user);
            this.user = opt.user;
            this.page_parts = opt.page.getParts();
            this.addListener();
        }

        addListener() {
            this.page_parts.get("AppName").querySelector(".appname").addEventListener('click', event => {
                event.preventDefault();
                this.router.go("/");
            });

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
            if (!this.user.isAuth) {
                this.router.go("/");
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

    window.MenuGameController = MenuGameController;
}());
