/**
 * Created by pacman29 on 08.03.17.
 */
(function () {
    class RulesController extends window.View {
        constructor(opt = {}) {
            super(opt);
            this.addListener();
        }

        addListener() {
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

    window.RulesController = RulesController;
}());
