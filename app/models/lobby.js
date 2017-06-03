/**
 * Created by ed on 07.05.17.
 */

'use strict';

class Lobby {
    constructor(session) {
        this._session = session;
    }

    start() {
        this._users = [];

        this._ws = new WebSocket('wss://jokinghazardserver.herokuapp.com/lobby');
        console.log('LobbyConnected: ', this._ws);
        this._ws.onclose = (function (e) {
            console.log('LobbyClose: ', e);
            this._onInfo = undefined;
            this._onGameStart = undefined;
            this._onError = undefined;
            this._onUserAdd = undefined;
            this._onClosed && this._onClosed();
        }).bind(this);
        this._ws.onmessage = (function (evt) {
            let data = JSON.parse(evt.data);
            console.log('LobbyMessage: ', data);
            switch (data.type) {
                case 'Lobby Info':
                    this._users = data.users;
                    this._maxNumber = data.maxNumber;
                    this._onInfo && this._onInfo(data);
                    break;
                case 'UserAddedMessage':
                    this._users.push(data.user);
                    this._onUserAdd && this._onUserAdd(data);
                    break;
                case 'UserExitedMessage':
                    this._users = this._users.filter(a => a.userMail !== data.user.userMail && a.userLogin !== data.user.userLogin);
                    this._onUserRemove && this._onUserRemove(data);
                    break;
                case 'GameReadyMessage':
                    this._onInfo = undefined;
                    this._onClosed = undefined;
                    this._onError = undefined;
                    this._onUserAdd = undefined;
                    this._onGameStart && this._onGameStart(data);
                    this._ws.close();
                    break;

            }
        }).bind(this);
        this._ws.onerror = (function (e) {
            console.log('LobbyError: ', e);
            this._onError && this._onError();
        }).bind(this);
    }

    stop() {
        if (this._ws) {
            this._onInfo = undefined;
            this._onClosed = undefined;
            this._onError = undefined;
            this._onUserAdd = undefined;
            this._ws.close();
        }
    }

    get users() {
        return this._users;
    }

    get maxUsersCount() {
        return this._maxNumber;
    }

    get onInfo() {
        return this._onInfo;
    }

    set onInfo(value) {
        this._onInfo = value;
    }

    get onUserAdd() {
        return this._onUserAdd;
    }

    set onUserAdd(value) {
        this._onUserAdd = value;
    }

    get onUserRemove() {
        return this._onUserRemove;
    }

    set onUserRemove(value) {
        this._onUserRemove = value;
    }

    get onGameStart() {
        return this._onGameStart;
    }

    set onGameStart(value) {
        this._onGameStart = value;
    }

    get onError() {
        return this._onError;
    }

    set onError(value) {
        this._onError = value;
    }

    get onClosed() {
        return this._onClosed;
    }

    set onClosed(value) {
        this._onClosed = value;
    }
}

export default Lobby;
