/**
 * Created by ed on 07.04.17.
 */

'use strict';

import './UserHeader.css';
import pugUserHeader from './UserHeader.pug';
import NodeDecorator from '../../NodeDecorator';

const UserHeader = function () {
    let div = document.createElement('div');
    div.innerHTML = pugUserHeader();
    return new NodeDecorator(div,false,true,{
        appname: div.querySelector(".userheader-appname"),
        logout: div.getElementsByTagName("image"),
        login: document.getElementById("userheader_login"),
        score: document.getElementById("userheader_score")
    });
};

export default UserHeader;
