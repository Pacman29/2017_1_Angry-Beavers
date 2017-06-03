'use strict';

let id = 0;

/** Класс представляет собой Путь в вашем приложении */
class Route {
    /**
     * Создаёт новый Route - ассоциирует некоторую view с шаблоном пути
     * @param {string} pathname - Шаблон пути
     * @param {View} view - Класс конкретной View
     * @param {Object} [options={}] - Дополнительные параметры, которые будут переданы во view при её создании и инициализации
     */
    constructor(pathname, view, options = {}) {
        this.id = `p${id}`;
        id++;
        this.pathname = new RegExp("\\"+pathname+"((\\?[a-z0-9\\-?\\[\\]=&;#]+)|$)");
        this.View = view;
        this.options = options;
    }

    /**
     * Активирует текущий Route (переходит по нему)
     * @param {string} pathname - Путь в приложении
     * @param {Object} [state={}] - Объект state, который был передан в событие popstate для объекта window
     */
    navigate(pathname, state = {}) {
        state = state || {};
        //const keys = this.regex(pathname);
        if (!this._view) {
            const view = new this.View(this.options);
            view.init(this.options);
            view.setRouter(this.__router);
            this._view = view;
        }

        this._view.resume(Object.assign(state));
    }

    /**
     * Деактивирует текущий Route
     */
    leave() {
        this._view && this._view.pause();
    }

    /**
     * Устанавливает текущему Route инстанс роутера
     * @param {Router} router - Инстанс роутера
     */
    setRouter(router) {
        this.__router = router;
    }
}

export default Route;
