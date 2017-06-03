/**
 * Created by ed on 07.05.17.
 */

'use strict';

class Game {
    constructor(session) {
        this._session = session;
    }

    get session() {
        return this._session;
    }

    start() {
        this._hand = [];
        this._users = [];
        this._table = [];
        this._userCards = [];
        this._history = [];

        this._ws = new WebSocket('wss://jokinghazardserver.herokuapp.com/game');
        console.log('GameConnected: ', this._ws);
        this._ws.onclose = (function (e) {
            console.log('GameClose: ', e);
            this._onClosed && this._onClosed();
        }).bind(this);
        this._ws.onmessage = (function (evt) {
            let data = JSON.parse(evt.data);
            console.log('GameMessage: ', data);
            switch (data.type) {
                case 'RoundInfo':
                    this._users = data.users;
                    this._roundNum = data.roundNum;
                    this._onRoundInfo && this._onRoundInfo(data);
                    break;
                case 'HandInfo':
                    this._hand = data.hand;
                    this._onHandInfo && this._onHandInfo(data);
                    break;
                case 'TableInfo':
                    this._table = data.hand;
                    this._onTableInfo && this._onTableInfo(data);
                    break;
                case 'UserCardsInfo':
                    this._userCards = data.hand;
                    this._onUserCardsInfo && this._onUserCardsInfo(data);
                    break;
                case 'GetCardFromHand':
                    this._needToSelectFromHand = true;
                    this._onGetCardFromHand && this._onGetCardFromHand(data);
                    break;
                case 'GetCardFromTable':
                    this._needToSelectFromTable = true;
                    this._onGetCardFromTable && this._onGetCardFromTable(data);
                    break;
                case 'NewRoundMessage':
                    this._history.push(this._table);
                    this._table = [];
                    this._userCards = [];
                    this._onNewRoundMessage && this._onNewRoundMessage(data);
                    break;
                case 'Game Finished Message':
                    this._onGameFinishedMessage && this._onGameFinishedMessage(data);
                    this.stop();
                    break;
            }
        }).bind(this);
        this._ws.onerror = (function (e) {
            console.log('GameError: ', e);
            this._onError && this._onError(e);
        }).bind(this);
    }

    stop() {
        if (this._ws) {
            this._ws.onerror = undefined;
            this._ws.onmessage = undefined;
            this._ws.onclose = undefined;
            this._onError = undefined;

            this._ws && this._ws.send(JSON.stringify({
                "type": "UserExited",
            }));

            this._ws.close();
        }
    }

    selectCardFromHand(index) {
        this._ws.send(JSON.stringify({
            "type": "ChooseCardFromHand",
            "chosenCard": index
        }));
        this._needToSelectFromHand = false;
    }

    selectCardFromTable(index) {
        this._ws.send(JSON.stringify({
            "type": "ChooseCardFromTable",
            "chosenCard": index
        }));
        this._needToSelectFromTable = false;
    }

    get needToSelectFormHand() {
        return this._needToSelectFromHand;
    }

    get needToSelectFormTable() {
        return this._needToSelectFromTable;
    }

    get roundNum() {
        return this._roundNum;
    }

    get roundCount() {
        return 5;
    }

    get hand() {
        return this._hand.slice();
    }

    get users() {
        return this._users.slice();
    }

    get table() {
        return this._table.slice();
    }

    get userCards() {
        return this._userCards.slice();
    }

    get history() {
        return this._history;
    }

    get onHandInfo() {
        return this._onHandInfo;
    }

    set onHandInfo(value) {
        this._onHandInfo = value;
    }

    get onRoundInfo() {
        return this._onRoundInfo;
    }

    set onRoundInfo(value) {
        this._onRoundInfo = value;
    }

    get onTableInfo() {
        return this._onTableInfo;
    }

    set onTableInfo(value) {
        this._onTableInfo = value;
    }

    get onUserCardsInfo() {
        return this._onUserCardsInfo;
    }

    set onUserCardsInfo(value) {
        this._onUserCardsInfo = value;
    }

    get onGetCardFromHand() {
        return this._onGetCardFromHand;
    }

    set onGetCardFromHand(value) {
        this._onGetCardFromHand = value;
    }

    get onGetCardFromTable() {
        return this._onGetCardFromTable;
    }

    set onGetCardFromTable(value) {
        this._onGetCardFromTable = value;
    }

    get onGameFinishedMessage() {
        return this._onGameFinishedMessage;
    }

    set onGameFinishedMessage(value) {
        this._onGameFinishedMessage = value;
    }

    get onNewRoundMessage() {
        return this._onNewRoundMessage;
    }

    set onNewRoundMessage(value) {
        this._onNewRoundMessage = value;
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

export default Game;
