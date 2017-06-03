/**
 * Created by pacman29 on 22.02.17.
 */

'use strict';

import './Footer.scss';
import pugFooter from './Footer.pug';

const TEXT = "Copyright © Angry Beavers. All rights NOT reserved.";

const Footer = function () {
    let footer = document.createElement('footer');
    footer.setAttribute('class', 'text-center footer');
    footer.innerHTML = pugFooter({
        text: TEXT
    });
    return footer;
};

export default Footer;
