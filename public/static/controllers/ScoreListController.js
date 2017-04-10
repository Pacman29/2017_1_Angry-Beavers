/**
 * Created by pacman29 on 08.03.17.
 */
'use strict';

import View from '../modules/view';

class ScoreListController extends View {
    constructor(opt = {}) {
        if (ScoreListController.__instance) {
            return ScoreListController.__instance;
        }
        super(opt);
        ScoreListController.__instance = this;

        this.controller_parts.push(this.page_parts.get("UserHeader"));
        this.controller_parts.push(this.page_parts.get("ScoreList"));
        this.controller_parts.push(this.page_parts.get("Footer"));

        this.addListener();
    }

    addListener() {
    }

    resume() {
        this.show();
    }

    show() {
        if (!this.session.isAuth) {
            this.router.go('/signin');
        } else {
            this.controller_parts.forEach(iter => {
                iter.hidden(false);
            });
        }

        /*
         TODO :: Здесь нужно заполнить лидерборд, тут надо просто подумать
         */

    }

    hide() {
        this.controller_parts.forEach(iter => {
            iter.hidden(true);
        });
    }
}

export default ScoreListController;
