/**
 * Created by pacman29 on 20.02.17.
 */

'use strict';

import './AppName.css';
import pugAppName from './AppName.pug';
import NodeDecorator from '../../NodeDecorator';

const AppName = function () {
    let container = document.createElement('div');
    container.innerHTML = pugAppName();
    return new NodeDecorator(container,true,false,{
        appname: container.querySelector(".appname")
    });
};

export default AppName;
