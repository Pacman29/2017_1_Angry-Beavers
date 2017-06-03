/**
 * Created by ed on 08.05.17.
 */

'use strict';

class GameFake {
    constructor(session) {
        this._session = session;
        this._history = [];
    }

    get session() {
        return this._session;
    }

    start() {
        this._rountCount = 4;

        this._hand = [];
        for (let i = 0; i < 7; ++i) {
            this._hand.push({
                "id": Math.round(Math.random() * 100)
            });
        }

        !this._users && (this._users = [
            {
                "userLogin": this._session.user.login,
                "isMaster": true,
                "score": 0,
                "type": "GameUserInfo"
            }
        ]);
        this._table = [
            {
                "id": Math.round(Math.random() * 100)
            }
        ];
        this._userCards = [];

        this._onNewRoundMessage && this._onNewRoundMessage();
        this._onHandInfo && this._onHandInfo();
        this._roundNum = 1;
        this._onRoundInfo && this._onRoundInfo();
        this._onTableInfo && this._onTableInfo();
        this._needToSelectFromHand = true;
        this._onGetCardFromHand && this._onGetCardFromHand();
    }

    stop() {

    }

    selectCardFromHand(index) {
        this._needToSelectFromHand = false;
        setTimeout(function () {
            if (this._table.length === 3) return;

            let card = this._hand[index];
            if (this._roundNum === 1) {
                const a = this._table[this._table.length - 1];
                this._table[this._table.length - 1] = card;
                this._table.push(a);
            } else {
                this._table.push(card);
            }

            this._hand[index] = {
                "id": Math.round(Math.random() * 100)
            };

            this._onTableInfo && this._onTableInfo();

            if (this._roundNum === 2) {
                setTimeout(function () {
                    this._history.push(this._table);
                    this.stop();
                    ++this._users[0].score;
                    this.start();
                }.bind(this), 3000);
            } else {
                this._onHandInfo && this._onHandInfo();
                this._onRoundInfo && this._onRoundInfo();
                setTimeout(function () {
                    this._needToSelectFromHand = true;
                    this._onGetCardFromHand && this._onGetCardFromHand();
                    this._userCards = [];
                    this._onUserCardsInfo && this._onUserCardsInfo();
                }.bind(this), 2000);
            }
            ++this._roundNum;
        }.bind(this), 1000);
    }

    selectCardFromTable(index) {
        return;

        this._needToSelectFromTable = false;
        let card = this._userCards[index];
        if (this._table[this._table.length - 1].red) {
            const a = this._table[this._table.length - 1];
            this._table[this._table.length - 1] = card;
            this._table.push(a);
        } else {
            this._table.push(card);
        }
        this._history.push(this._table);
        this._hand = [];
        this._onHandInfo && this._onHandInfo();

    }

    get needToSelectFormHand() {
        return this._needToSelectFromHand;
    }

    get needToSelectFormTable() {
        return this._needToSelectFromTable;
    }

    get roundCount() {
        return this._rountCount
    }

    get roundNum() {
        return this._roundNum;
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
        this.__kek_kostili__onUserCardsInfo = value;
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

export default GameFake;
