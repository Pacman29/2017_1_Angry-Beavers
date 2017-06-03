/**
 * Created by ed on 07.04.17.
 */

'use strict';

import './UserHeader.scss';
import pugUserHeader from './UserHeader.pug';
import imagescontroller from '../../ImagesController';
const UserHeader = function () {
    let div = document.createElement('div');
    div.innerHTML = pugUserHeader({exiticon: imagescontroller.get_menu_img("Users-Exit-icon")});
     ;
    return div;
};

export default UserHeader;
