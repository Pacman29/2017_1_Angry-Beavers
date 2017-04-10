/**
 * Created by pacman29 on 08.03.17.
 */

'use strict';

import './AboutUs.css';
import BorderConstruct from '../../constructs/BorderConstruct/BorderConstruct';
import pugAboutUs from './AboutUs.pug';
import NodeDecorator from '../../NodeDecorator';

const RIGHT_IMG = "images/Dance.png";
const HEAD_TEXT = "Ага, вот эти ребята: ";
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
        headText: HEAD_TEXT
    });

    return new NodeDecorator(BorderConstruct({
        el: div,
        img: RIGHT_IMG
    }),true,true,{});
};

export default AboutUs;
