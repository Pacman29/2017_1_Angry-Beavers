/**
 * Created by ed on 06.05.17.
 */

'use strict';

import View from '../modules/view';

class LobbyController extends View {
    constructor(opt = {}) {
        if (LobbyController.__instance) {
            return LobbyController.__instance;
        }
        super(opt);
        LobbyController.__instance = this;
        this.addListener();
    }

    addListener() {
        [...document.querySelectorAll(".userheader-appname")]
            .concat([...document.querySelectorAll('.appname')])
            .forEach(a => a.addEventListener('click', event => {
                event.preventDefault();
                this.router.go("/");
            }));
        document.getElementById('lobby_single').addEventListener('click', function () {
            this.router.go('/gameFake');
        }.bind(this));
    }

    resume() {
        this.show();
    }

    show() {
        if (!this.session.isAuth) {
            this.router.go('/signin');
        }
        else {
            this.page_parts.get("UserHeader").hidden = false;
            this.page_parts.get("Lobby").hidden = false;
            [...document.querySelectorAll('.userheader-login')].forEach(a => a.innerHTML = this.session.user.login);
            [...document.querySelectorAll('.userheader-score')].forEach(a => a.innerHTML = this.session.user.score);

            this._startLobby();
        }
    }

    hide() {
        this._stopLobby();
        this.page_parts.get("UserHeader").hidden = true;
        this.page_parts.get("Lobby").hidden = true;
        document.myconfirm.close();
    }

    _startLobby() {
        if (this._lobby) {
            this._lobby.stop();
        }

        let handler = this._updateInfo.bind(this);
        this._lobby = this.session.createLobby();

        handler();
        this._lobby.onInfo = handler;
        this._lobby.onError = (function () {
            let obj = this;
            document.myconfirm.show('Произошла ошибка. Поиграешь один?',val => {
                obj.router.go(val ? '/gameFake' : '/');
            });
        }).bind(this);
        this._lobby.onClosed = (function () {
            let obj = this;
            document.myconfirm.show('Произошла ошибка. Поиграешь один?',val => {
                obj.router.go(val ? '/gameFake' : '/');
            });
        }).bind(this);
        this._lobby.onUserAdd = handler;
        this._lobby.onUserRemove = handler;
        this._lobby.onGameStart = function () {
            this._lobby.onClosed = undefined;
            this.router.go('/game');
        }.bind(this);
        this._lobby.start();
    }

    _stopLobby() {
        this._lobby && this._lobby.stop();
    }

    _updateInfo() {
        document.getElementById('lobby_users').innerHTML = '';
        document.getElementById('lobby_title').innerHTML = 'Ожидаем игроков...';
        if (this._lobby && this._lobby.users) {
            document.getElementById('lobby_title').innerHTML = `Ожидаем игроков${this._lobby.maxUsersCount ? ` (${this._lobby.maxUsersCount - this._lobby.users.length}` : ''})`;
            this._lobby.users.forEach(u => {
                let user = document.createElement('label');
                user.innerHTML = u.userLogin;
                document.getElementById('lobby_users').appendChild(user);
                document.getElementById('lobby_users').appendChild(document.createElement('hr'));
            });
        }
    }
}

export default LobbyController;
