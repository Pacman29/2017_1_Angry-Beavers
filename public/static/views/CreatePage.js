/**
 * Created by pacman29 on 20.02.17.
 */

'use strict';

import AppName from './parts/AppName/AppName';
import AboutUs from './parts/AboutUs/AboutUs';
import Footer from './parts/Footer/Footer';
import FormSignIn from './parts/FormSignIn/FormSignIn';
import FormSignUp from './parts/FormSignUp/FormSignUp';
import MenuStart from './parts/MenuStart/MenuStart';
import MenuGame from './parts/MenuGame/MenuGame';
import ScoreList from './parts/ScoreList/ScoreList';
import Rules from './parts/Rules/Rules';
import UserHeader from './parts/UserHeader/UserHeader';

import User from '../models/user';

class CreatePage {
    constructor() {
        if (CreatePage.__instance) {
            return CreatePage.__instance;
        }
        this.body = (document.getElementsByTagName('body'))[0];
        this.parts = new Map();

        this.addParts(this.body, "AppName", AppName());
        this.addParts(this.body, "UserHeader", UserHeader());
        this.addParts(this.body, "MenuStart", MenuStart());
        this.addParts(this.body, "MenuGame", MenuGame());
        this.addParts(this.body, "SignIn", FormSignIn());
        this.addParts(this.body, "SignUp", FormSignUp());
        this.addParts(this.body, "ScoreList", ScoreList());
        this.addParts(this.body, "AboutUs", AboutUs());
        this.addParts(this.body, "Rules", Rules());
        this.addParts(this.body, "Footer", Footer());
    }

    addParts(parent, name, NDecorate) {
        this.parts.set(name, NDecorate);
        NDecorate.node.hidden = true;
        parent.appendChild(NDecorate.node);
    }

    getParts() {
        return this.parts;
    }
}

export default CreatePage;
