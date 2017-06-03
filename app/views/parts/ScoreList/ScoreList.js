/**
 * Created by pacman29 on 05.03.17.
 */

'use strict';

import './ScoreList.scss';
import pugScoreList from './ScoreList.pug';

import BorderConstruct from '../../constructs/BorderConstruct/BorderConstruct';
import imagescontroller from '../../ImagesController';

const RIGHT_IMG = imagescontroller.get_menu_img("Scorelist");
const TITLE = "типа скорлист";
const PLAYERS = [
    {
        position: "1",
        nickname: "lol_1",
        score: "999"
    },
    {
        position: "2",
        nickname: "lol_2",
        score: "888"
    },
    {
        position: "3",
        nickname: "lol_3",
        score: "777"
    },
];
const YOU = {
    position: "1337",
    nickname: "Andrew",
    score: "-7"
};

const ScoreList = function () {
    let div = document.createElement('div');

    div.innerHTML = pugScoreList({
        topPlayers: PLAYERS,
        player: YOU
    });

    return BorderConstruct({
        title: TITLE,
        el: div,
        img: RIGHT_IMG
    });
};

export default ScoreList;
