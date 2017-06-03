/**
 * Created by ed on 20.05.17.
 */

'use strict';

import './Game.scss';
import pugLobby from './Game.pug';

const Game = function () {
    let div = document.createElement('div');
    div.innerHTML = pugLobby();
    return div;
};

export default Game;
