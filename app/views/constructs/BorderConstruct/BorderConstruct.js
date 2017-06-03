/**
 * Created by pacman29 on 22.02.17.
 */

'use strict';

import './BorderConstruct.scss';
import pugBorderConstruct from './BorderConstruct.pug';

const BorderConstruct = function Border(opt = {}) {
    let container = document.createElement('div');
    container.innerHTML = pugBorderConstruct({
        title: opt.title,
        img: opt.img,
        element: opt.el
    });
    return container;
};

export default BorderConstruct;
