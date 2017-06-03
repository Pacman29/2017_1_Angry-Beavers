/**
 * Created by pacman29 on 08.03.17.
 */

'use strict';

import './AboutUs.scss';
import BorderConstruct from '../../constructs/BorderConstruct/BorderConstruct';
import pugAboutUs from './AboutUs.pug';
import imagescontroller from '../../ImagesController';
const RIGHT_IMG = imagescontroller.get_menu_img("Dance");
const TITLE = "Ага, вот эти ребята: ";
const MEMBERS = [
    {
        link: "https://github.com/ed-asriyan",
        name: "Ed Asriyan"
    },
    {
        link: "https://github.com/Pacman29",
        name: "Pacman29"
    },
    {
        link: "https://github.com/lieroz",
        name: "lieroz"
    },
    {
        link: "https://github.com/wolf1996",
        name: "wolf1996"
    }
];

const AboutUs = function () {
    let div = document.createElement('div');

    div.innerHTML = pugAboutUs({
        members: MEMBERS,
    });

    return BorderConstruct({
        title: TITLE,
        el: div,
        img: RIGHT_IMG
    });
};

export default AboutUs;
