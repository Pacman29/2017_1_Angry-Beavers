/**
 * Created by ed on 28.03.17.
 */

'use strict';

import pugMenuStart from './MenuStart.pug';

import MenuConstruct from '../../constructs/MenuConstruct/MenuConstruct';
import imagescontroller from '../../ImagesController';
const ITEMS = [
    {
        id: "menuStart_signIn",
        defaultImg: imagescontroller.get_menu_img("Login_btn"),
        backImg:imagescontroller.get_menu_img("GOODFACE")
    },
    {
        id: "menuStart_aboutUs",
        defaultImg: imagescontroller.get_menu_img("About_us"),
        backImg: imagescontroller.get_menu_img("We_do_it")
    },
    {
        id: "menuStart_rules",
        defaultImg: imagescontroller.get_menu_img("About_rules"),
        backImg: imagescontroller.get_menu_img("About_rules_2")
    }
];

const MenuStart = function MenuStart() {
    let div = document.createElement('div');
    div.innerHTML = pugMenuStart({
        items: ITEMS
    });
    let img_first = div.getElementsByTagName("img")[0];
    img_first.classList.add("menuconstruct__mainimage");

    return div;
};

export default MenuStart;
