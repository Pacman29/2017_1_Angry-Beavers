/**
 * Created by ed on 28.03.17.
 */

'use strict';

import pugMenuGame from './MenuGame.pug';

import MenuConstruct from '../../constructs/MenuConstruct/MenuConstruct';
import imagescontroller from '../../ImagesController';
const ITEMS = [
    {
        id: "menuGame_play",
        defaultImg: imagescontroller.get_menu_img("Game"),
        backImg: imagescontroller.get_menu_img("Game_hold")
    },
    {
        id: "menuGame_score",
        defaultImg: imagescontroller.get_menu_img("Score_btn"),
        backImg: imagescontroller.get_menu_img("Score_btn_hold")
    },
    {
        id: "menuGame_aboutUs",
        defaultImg: imagescontroller.get_menu_img("About_us"),
        backImg: imagescontroller.get_menu_img("We_do_it")
    },
    {
        id: "menuGame_rules",
        defaultImg: imagescontroller.get_menu_img("About_rules"),
        backImg: imagescontroller.get_menu_img("About_rules_2")
    }
];

const MenuGame = function MenuStart() {
    let div = document.createElement('div');
    div.innerHTML = pugMenuGame({
        items: ITEMS
    });
    let img_first = div.getElementsByTagName("img")[0];
    img_first.classList.add("menuconstruct__mainimage");
    return div;
};

export default MenuGame;
