/**
 * Created by pacman29 on 08.03.17.
 */

'use strict';

import './Rules.css';
import pugRules from './Rules.pug';

import BorderConstruct from '../../constructs/BorderConstruct/BorderConstruct';
import NodeDecorator from '../../NodeDecorator';

const RIGHT_IMG = "images/Rules_page.png";
const HEAD_TEXT = "ну тут какие-то правила будут, наверное...";

const Rules = function () {
    let div = document.createElement('div');

    div.innerHTML = pugRules({
        title: HEAD_TEXT
    });

    return new NodeDecorator(BorderConstruct({
        el: div,
        img: RIGHT_IMG
    }),true,true,{});
};

export default Rules;
