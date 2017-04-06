/**
 * Created by pacman29 on 08.03.17.
 */

'use strict';

import View from '../modules/view';

class RulesController extends View {
    constructor(opt = {}) {
        super(opt);
        this.addListener();
    }

    addListener() {
        this.page_parts.get("AppName").querySelector(".appname").addEventListener('click', event => {
            event.preventDefault();
            this.router.go("/");
        });
    }

    resume() {
        this.show();
    }

    show() {
        this.page_parts.get("AppName").hidden = false;
        this.page_parts.get("Rules").hidden = false;
        this.page_parts.get("Footer").hidden = false;
    }

    hide() {
        this.page_parts.get("AppName").hidden = true;
        this.page_parts.get("Rules").hidden = true;
        this.page_parts.get("Footer").hidden = true;
    }

}

export default RulesController;
