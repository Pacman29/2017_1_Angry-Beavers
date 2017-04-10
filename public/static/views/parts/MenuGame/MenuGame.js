/**
 * Created by ed on 28.03.17.
 */

'use strict';

import pugMenuGame from './MenuGame.pug';

import MenuConstruct from '../../constructs/MenuConstruct/MenuConstruct';
import NodeDecorator from '../../NodeDecorator';

const ITEMS = [
    {
        id: "menuGame_play",
        defaultImg: "images/Game.png",
        backImg: "images/Game_hold.png"
    },
    {
        id: "menuGame_score",
        defaultImg: "images/Score_btn.png",
        backImg: "images/Score_btn_hold.png"
    },
    {
        id: "menuGame_aboutUs",
        defaultImg: "images/About_us.png",
        backImg: "images/We_do_it.png"
    },
    {
        id: "menuGame_rules",
        defaultImg: "images/About_rules.png",
        backImg: "images/About_rules_2.png"
    }
];

const MenuGame = function MenuStart() {
    let div = document.createElement('div');
    div.innerHTML = pugMenuGame({
        items: ITEMS
    });
    return new NodeDecorator(div,false,true,{
        buttons: {
            play: document.getElementById(ITEMS[0].id),
            score: document.getElementById(ITEMS[0].id),
            aboutUs: document.getElementById(ITEMS[0].id),
            rules: document.getElementById(ITEMS[0].id)
        }
    });
};

export default MenuGame;
