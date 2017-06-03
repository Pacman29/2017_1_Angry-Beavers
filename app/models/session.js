/**
 * Created by ed on 05.04.17.
 */

'use strict';

const isBrowser = typeof navigator !== "undefined";

import 'whatwg-fetch';

import Lobby from './lobby';
import Game from './game';
import GameFake from './gameFake';

const DEFAULT_HOST = 'jokinghazardserver.herokuapp.com';

class Session {
    constructor(options = {}) {
        this._host = options.host || DEFAULT_HOST;
        this._user = null;
        this._lobby = null;

        this._cookies = '';
    }

    get user() {
        // todo: get user data from backend
        return this._user;
    }

    get isAuth() {
        return this.user;
    }

    get lobby() {
        return this._lobby;
    }

    _call(httpMethod, method, data) {
        const url = `https://${DEFAULT_HOST}/api/${method}`;
        const initPomise = {
            method: httpMethod,
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
                'Cookie': this._cookie
            }
        };
        if (httpMethod === 'POST') {
            if (data !== undefined) {
                initPomise.body = JSON.stringify(data);
            }
        }

        let _this = this;
        return fetch(url, initPomise)
            .then(response => {
                // todo: этот костыль тоже надо бы убрать
                if (!isBrowser) {
                    let cookies = response.headers._headers['set-cookie'];
                    if (cookies !== undefined) {
                        // todo: убрать этот костыль
                        _this._cookie = cookies[0];
                    }
                }

                return response.json();
            })
            .then(response => {
                if (!response.result) {
                    throw new Error(response.errorMsg);
                } else {
                    return response.data;
                }
            });
    }

    createLobby() {
        this._lobby && this._lobby.stop();
        this._lobby = new Lobby(this);
        return this._lobby;
    }

    createGame() {
        this._game && this._game.stop();
        this._game = new Game(this);
        return this._game;
    }

    createFakeGame() {
        this._game && this._game.stop();
        this._game = new GameFake(this);
        return this._game;
    }

    userData() {
        let _this = this;
        return this._call('GET', 'user/data')
            .then(response => {
                _this._user = {}; // todo: in ES6 rewrite with new User
                _this._user.login = response.userLogin;
                _this._user.email = response.userMail;
                _this._user.score = response.userScore;
                return response;
            });
    }

    getScoreList() {
        return this._call('GET', '/score');
    }

    login(login, password) {
        let _this = this;
        return this._call('POST', 'user/login', {
            pass: password,
            userLogin: login
        }).then(() => {
            _this._user = {}; // todo: in ES6 rewrite with new User
            _this._user.login = login;
            _this._user.score = 0;
        });
    };

    signUp(login, email, password) {
        let _this = this;
        return this._call('POST', 'user/signup', {
            userLogin: login,
            pass: password,
            userMail: email
        }).then(() => {
            _this._user = {}; // todo: in ES6 rewrite with new User
            _this._user.login = login;
            _this._user.email = email;
            _this._user.score = 0;
        });
    };

    logout() {
        return this._call('POST', 'user/logout')
            .then(() => {
                this._user = null;
            });
    };

    deleteUser() {
        return this._call('DELETE', 'user/delete');
    };
}

export default Session;
