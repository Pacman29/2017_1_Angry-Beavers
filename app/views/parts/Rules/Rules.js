/**
 * Created by pacman29 on 08.03.17.
 */

'use strict';

import './Rules.scss';
import pugRules from './Rules.pug';

import BorderConstruct from '../../constructs/BorderConstruct/BorderConstruct';

import imagescontroller from '../../ImagesController';
const RIGHT_IMG = imagescontroller.get_menu_img("Rules_page");
const TITLE = "";

const Rules = function () {
    let div = document.createElement('div');

    div.innerHTML = pugRules();
    document.__rules = "<p>    В игре принимают участие четыре человека: один ведущий и три игрока.\n</p>" +
        "<p>      Цель игры — создать комикс.\n</p>" +
        "<p>      Игра состоит из нескольких раундов. В начале раунда всем раздается по семь карт и на стол случайным образом " +
        "выкладывается одна карта из колоды." +
        " Затем, ведущий выбирает из своей колоды наиболее удачную карту для продолжения комикса и кладет её слева от первой." +
        " Далее каждый из игроков предлагает из своих рук одну карту, котораяя будет заключительной частью комикса." +
        " Из трех предложенных карт ведущему требуется выбрать наиболее удачную, но он не знает чья эта карта." +
        " Игрок, чью карту выбрал ведущий, получает одно очко. На этом раунд заканчивается, ведущим становится следующий игрок.</p>" +
        "<p>      Игра продолжается до тех пор, пока не сыграется четыре раунда.</p>" +
        "<p>      Побеждает игрок, набравший наибольшее число очков.</p>";
    div.getElementsByTagName("p")[0].innerHTML =  document.__rules;

    return BorderConstruct({
        title: TITLE,
        el: div,
        img: RIGHT_IMG
    });
};

export default Rules;
