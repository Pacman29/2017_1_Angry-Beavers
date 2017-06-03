/**
 * Created by ed on 20.05.17.
 */

'use strict';

import Konva from 'konva/src/Core';
import 'konva/src/shapes/Rect';
import 'konva/src/shapes/Circle';
import 'konva/src/shapes/Arc';
import 'konva/src/shapes/Text';
import 'konva/src/shapes/Line';
import 'konva/src/shapes/Image';
import 'konva/src/Animation';
import 'konva/src/Tween';

import View from '../modules/view';
import ImagesController from "../views/ImagesController";
const STAGE_WIDTH = 1280;
const STAGE_HEIGHT = 720;

const USERS_TOP = 50;
const USERS_RIGHT = 20;
const USERS_WIDTH = 300;
const USERS_BORDER_RADIUS = 5;

const HISTORY_TOP = 50;
const HISTORY_LEFT = 5;
const HISTORY_CARD_WIDTH = 30;
const HISTORY_CARD_HEIGHT = HISTORY_CARD_WIDTH * 1.4786324786324787;
const HISTORY_OFFSET = 5;
const HISTORY_CARD_OFFSET = 5;

const HAND_CARD_WIDTH = 145;
const HAND_CARD_HEIGHT = HAND_CARD_WIDTH * 1.4786324786324787;
const HAND_CARD_OFFSET = 20;
const HAND_CARD_BORDER_THICKNESS = 4;

const TABLE_TOP = 80;
const TABLE_LEFT = (HISTORY_CARD_WIDTH + HISTORY_CARD_OFFSET) * 4;
const TABLE_CARD_WIDTH = 170;
const TABLE_CARD_HEIGHT = TABLE_CARD_WIDTH * 1.4786324786324787;
const TABLE_CARD_OFFSET = 30;

const UTABLE_TOP = 340;
const UTABLE_LEFT = TABLE_LEFT;
const UTABLE_CARD_WIDTH = 95;
const UTABLE_CARD_HEIGHT = UTABLE_CARD_WIDTH * 1.4786324786324787;
const UTABLE_CARD_OFFSET = 10;

const USER_HEIGHT = 50;
const USER_AVATAR_WIDTH = 50;

const TOOLTIP_TIMER_SIZE = 50;
const TOOLTIP_TEXT_TOP = TOOLTIP_TIMER_SIZE / 2.5;

const ERROR_LOGO_SIZE = 140;

let USER_AVATARS = [];
for (let i = 1; i <= 10; ++i) {
    USER_AVATARS.push(ImagesController.get_avatar_img(`${i}`));
}

// меня задолбала копипаста, поэтому я всё таки написал функции, но это по-прежнему индусский гавнокод
const generateLoader = function () {
    const layerErrorLoader = new Konva.Arc({
        innerRadius: 40,
        outerRadius: 70,
        angle: 1,
        fill: '#88C1D8',
        stroke: 'black',
        strokeWidth: 4
    });

    layerErrorLoader.run = () => {
        let period = 2000;
        let tween1 = new Konva.Tween({
            node: layerErrorLoader,
            duration: period / 1000 / 2,
            easing: Konva.Easings.EaseInOut,
            fill: '#42A045',
            angle: 360,
        });
        let tween2 = new Konva.Tween({
            node: layerErrorLoader,
            duration: period / 829,
            easing: Konva.Easings.Linear,
            fill: '#42A045',
        });

        tween1.onFinish = () => tween1.reverse();
        tween1.onReset = () => tween1.play();
        tween1.play();
        tween2.onFinish = () => tween2.reverse();
        tween2.onReset = () => tween2.play();
        tween2.play();
    };

    return layerErrorLoader;
};

const generateCard = function (card) {
    let group = new Konva.Group({
        width: TABLE_CARD_WIDTH,
        height: TABLE_CARD_HEIGHT,
        fill: 'white',
    });

    let rect = new Konva.Rect({
        x: -1,
        y: -2,
        width: TABLE_CARD_WIDTH + 2,
        height: TABLE_CARD_HEIGHT + 2,
        stroke: card.red ? 'red' : 'black',
        fill: 'white',
        strokeWidth: 1,
    });
    group.add(rect);

    let loader = generateLoader();

    let cardImg = new Image();
    cardImg.src = ImagesController.get_game_img(`${card.id}`);
    setTimeout(() => {
        if (cardImg.complete) return;

        loader.setX(TABLE_CARD_WIDTH / 2);
        loader.setY(TABLE_CARD_HEIGHT / 2);
        loader.setScale({x: 0.65, y: 0.65});
        group.add(loader);
        loader.run();
    }, 200);
    cardImg.onload = function () {
        let img = new Konva.Image({
            image: cardImg,
            width: TABLE_CARD_WIDTH,
            height: TABLE_CARD_HEIGHT,
            opacity: 0,
        });
        group.add(img);
        if (img.getLayer()) {
            let tween = new Konva.Tween({
                node: img,
                opacity: 1,
                duration: 0.3
            });
            tween.onFinish = () => loader.remove();
            tween.play();
        } else {
            img.opacity(1);
            loader.remove();
        }
    };
    return group;
};

const generateUser = function (user) {
    let userGroup = new Konva.Group();

    // user avatar
    let userAvatarImage = new Image();
    userAvatarImage.src = user.avatar;
    userAvatarImage.onload = function () {
        let userAvatar = new Konva.Image({
            x: 1,
            y: 1,
            cornerRadius: USER_AVATAR_WIDTH / 2,
            width: USER_AVATAR_WIDTH - 2,
            height: USER_AVATAR_WIDTH - 2,
            image: userAvatarImage,
            opacity: 0
        });
        userGroup.add(userAvatar);
        if (userAvatar.getLayer()) {
            let tween = new Konva.Tween({
                node: userAvatar,
                opacity: 1,
                duration: 0.3
            });
            tween.play();
        } else {
            userAvatar.opacity(1);
        }
    }.bind(this);

    // user's nick
    let userNick = new Konva.Text({
        x: USER_AVATAR_WIDTH + 5,
        y: 12,
        width: USERS_WIDTH,
        text: user['userLogin'],
        align: 'left',
        fontSize: 16,
        fontFamily: 'DigitalStrip',
    });
    userGroup.add(userNick);

    // master indicator
    let userDescription = new Konva.Text({
        x: USER_AVATAR_WIDTH + 5,
        y: 30,
        width: USERS_WIDTH,
        text: `${user['isMaster'] ? 'Ведущий, ' : ''}Очки: ${user['score']}`,
        align: 'left',
        fill: 'gray',
        fontSize: 12,
        fontFamily: 'DigitalStrip',
    });
    userGroup.add(userDescription);

    return userGroup;

};

const insertItem = function (parent, item) {
    parent.add(item);
    return new Promise(r => r());
};

const removeItem = function (item) {
    item.remove();
    return new Promise(r => r());
};

const replaceItem = function (oldItem, newItem) {
    const parent = oldItem.getParent();
    return removeItem(oldItem)
        .then(() => insertItem(parent, newItem));
};

const listUpdate = function (parent, oldItems, newItems) {
    for (let i = 0; i < newItems.length; ++i) {
        if (oldItems[i] && oldItems[i].id === newItems[i].id) {
            newItems[i].item = oldItems[i].item;
            continue;
        }

        newItems[i].item = newItems[i].itemGenerator();
        // если уже на экране уже есть итем
        if (oldItems[i]) {
            oldItems[i].item.remove();
            parent.add(newItems[i].item);
            newItems[i].onAdd && newItems[i].onAdd(newItems[i].item);
        }
        // если её нет
        else {
            parent.add(newItems[i].item);
        }
    }
    // удаляем все последующие итемы с экрана
    for (let i = newItems.length; i < oldItems.length; ++i) {
        oldItems[i].item.remove();
    }

    return newItems;
};

const listSubscribe = function (options) {
    options.list.forEach(c => {
        c.item.on('mousedown touchstart', function () {
            options.onClick(c);
        });
        c.item.on('mouseover', function () {
            options.onMouseOver(c);
        });
        c.item.on('mouseout', function () {
            options.onMouseOut(c);
        });
    });
};

const listUnsubscribe = function (list) {
    list.forEach(c => {
        c.item.off('mousedown');
        c.item.off('touchstart');
        c.item.off('mouseover');
        c.item.off('mouseout');
    });
};

class GameController extends View {
    constructor(opt = {}) {
        if (GameController.__instance) {
            return GameController.__instance;
        }
        super(opt);
        GameController.__instance = this;
        this.addListener();
    }

    addListener() {

    }

    resume() {
        this.show();
    }

    show() {
        document.myrules.close();

        if (!this.session.isAuth) {
            this.router.go('/signin');
        }
        else {
            USER_AVATARS = USER_AVATARS.sort(() => .5 - Math.random()); // shuffle

            this.page_parts.get("Game").hidden = false;
            if (window.location.pathname === '/gameFake/' || window.location.pathname === '/gameFake') { // ну это "или" это полный пиздос, но чё поделать времени мало...
                this._game = this.session.createFakeGame();
            } else {
                this._game = this.session.createGame();
            }

            this._game.onHandInfo = this._updateHand.bind(this);
            this._game.onError = x => function () {
                this._showError('произошла ошибка. пытаюсь соединиться с сервером...');
                this._game.start();
            }.bind(this);
            this._game.onClosed = function () {
                this._showError('что-то с интернетом. пытаюсь соединиться с сервером...');
                this._game.start();
            }.bind(this);
            this._game.onRoundInfo = function () {
                this._showGame();
                this._updateUsers();
                this._updateUserCards();
            }.bind(this);
            this._game.onTableInfo = function () {
                this._showGame();
                this._updateTable();
                this._moveTableCenter();
            }.bind(this);
            this._game.onUserCardsInfo = function () {
                this._showGame();
                this._updateTooltip('waitForMaster');
                this._updateUserCards();
                if (this._game.needToSelectFormHand || !+this._game.userCards) {
                    this._moveHandCenter();
                } else {
                    this._moveHandRight();
                }
            }.bind(this);
            this._game.onGetCardFromHand = function () {
                this._showGame();
                this._updateTooltip('chooseCardFromHand');
                this._moveHandCenter();
                this._onSelectFromHand();
            }.bind(this);
            this._game.onGetCardFromTable = function () {
                this._showGame();
                this._updateTooltip('chooseCardFromTable');
                this._updateUserCards();
                this._moveHandRight();
                this._onSelectFromTable();
            }.bind(this);
            this._game.onGameFinishedMessage = function () {
                this._game.onClosed = undefined;
                this._game.onError = undefined;
                this._updateTooltip('gameOver');
                this._isGameOver = true;
                this._updateTable();
                this._moveTableCenter(true);
                this.session.userData();
            }.bind(this);
            this._game.onNewRoundMessage = function () {
                this._updateHistory();
                this._updateUserCards([]);
                this._moveHandCenter();
            }.bind(this);
            this._isGameOver = false;
            this._createCanvas();
            this._showGame();
            this._game.start();
        }
    }

    hide() {
        document.myrules.close();
        this.page_parts.get("Game").hidden = true;
        this._game && this._game.stop();
    }

    _createCanvas() {
        if (this._stage) {
            this._stage.remove();

            delete this._groupUserCards;
            delete this._groupHand;
            delete this._groupError;
            delete this._groupErrorDescription;
            delete this._groupHistory;
            delete this._groupTable;
            delete this._groupUsers;

            delete this._userCards;
            delete this._hand;
            delete this._table;
            delete this._history;
            delete this._users;
            delete this._hintText;
        }

        this._stage = new Konva.Stage({
            container: 'container',
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT
        });

        let fitStageIntoParentContainer = function () {
            const innerWidth = window.innerWidth;
            const innerHeight = window.innerHeight;

            if (innerWidth < innerHeight) {
                this._stage.width(innerWidth);
                this._stage.height(innerHeight);
                this._stage.scale({x: 1, y: 1});
                this._stage.draw();
                this._showError('переверни экран', false);
            } else {
                let scale = Math.min(innerWidth / STAGE_WIDTH, innerHeight / STAGE_HEIGHT);
                this._stage.width(STAGE_WIDTH * scale);
                this._stage.height(STAGE_HEIGHT * scale);
                this._stage.scale({x: scale, y: scale});
                this._stage.draw();
                this._showGame();
            }

        }.bind(this);

        this._layerGame = new Konva.Layer();
        this._stage.add(this._layerGame);

        this._layerError = new Konva.Layer();
        this._stage.add(this._layerError);

        this._updateTooltip('waitForPlayers');

        window.addEventListener('resize', fitStageIntoParentContainer);
        window.addEventListener('orientationchange', fitStageIntoParentContainer);

        const exitButton = new Konva.Text({
            x: STAGE_WIDTH - USERS_RIGHT - 85,
            y: 15,
            align: 'center',
            fontSize: 20,
            fontFamily: 'DigitalStrip',
            text: 'Выйти',
        });

        exitButton.on('mousedown touchstart', function () {
            this.router.go('/');
        }.bind(this));
        exitButton.on('mouseover', function () {
            this._stage.container().style.cursor = 'pointer';
            let tween = new Konva.Tween({
                node: exitButton,
                fontSize: 23,
                duration: 0.2
            });
            tween.play();
        }.bind(this));
        exitButton.on('mouseout', function () {
            this._stage.container().style.cursor = 'default';
            let tween = new Konva.Tween({
                node: exitButton,
                fontSize: 20,
                duration: 0.2
            });
            tween.play();
        }.bind(this));
        this._layerGame.add(exitButton);


        const circle = new Konva.Circle({
            x: TOOLTIP_TIMER_SIZE / 2 + 4,
            y: TOOLTIP_TIMER_SIZE / 2 + 4,
            radius: TOOLTIP_TIMER_SIZE / 2,
            stroke: 'black',
        });
        this._layerGame.add(circle);

        const circleText = new Konva.Text({
            x: TOOLTIP_TIMER_SIZE / 10,
            y: TOOLTIP_TIMER_SIZE / 2.8,
            width: TOOLTIP_TIMER_SIZE,
            align: 'center',
            fontSize: 24,
            text: '?',
            fontFamily: 'DigitalStrip',
        });
        circleText.on('mousedown touchstart', function () {
            document.myrules.close();
            document.myrules.show();
        }.bind(this));
        circleText.on('mouseover', function () {
            this._stage.container().style.cursor = 'pointer';
            let tween = new Konva.Tween({
                node: circleText,
                fontSize: 27,
                duration: 0.2
            });
            tween.play();
        }.bind(this));
        circleText.on('mouseout', function () {
            this._stage.container().style.cursor = 'default';
            let tween = new Konva.Tween({
                node: circleText,
                fontSize: 24,
                duration: 0.2
            });
            tween.play();
        }.bind(this));
        this._layerGame.add(circleText);


        fitStageIntoParentContainer();
    }

    _updateHand() {
        if (!this._groupHand) {
            this._groupHand = new Konva.Group({
                x: 0,
                y: STAGE_HEIGHT - HAND_CARD_HEIGHT - HAND_CARD_BORDER_THICKNESS,
            });
            this._layerGame.add(this._groupHand);
        }

        if (!this._hand) this._hand = [];

        listUnsubscribe(this._hand);

        let newHand = [];
        this._game.hand.forEach(function (card, i) {
            if (!card || typeof card === "string") return;
            newHand.push({
                id: card.id,
                index: i,
                card: card,
                itemGenerator: () => {
                    let group = generateCard.bind(this)(card);

                    group.setX((HAND_CARD_WIDTH + HAND_CARD_OFFSET) * i + 5);
                    group.setY(0);
                    group.scale({
                        x: HAND_CARD_WIDTH / group.getWidth(),
                        y: HAND_CARD_HEIGHT / group.getHeight()
                    });

                    return group;
                },
            });
        }.bind(this));
        this._hand = listUpdate(this._groupHand, this._hand, newHand);
        this._layerGame.drawScene();
    }

    _updateUsers(list) {
        if (!this._groupUsers) {
            let layerUserBox = new Konva.Group({
                x: STAGE_WIDTH - USERS_RIGHT - USERS_WIDTH,
                y: USERS_TOP,
            });
            this._layerGame.add(layerUserBox);

            // the outer box
            let border = new Konva.Rect({
                x: 0,
                y: 0,
                fill: 'white',
                width: USERS_WIDTH,
                height: USER_HEIGHT * (1 + this._game.users.length),
                stroke: 'black',
                strokeWidth: 1,
                cornerRadius: USERS_BORDER_RADIUS,
            });
            layerUserBox.add(border);

            // title text
            let title = new Konva.Text({
                x: 0,
                y: 16,
                width: USERS_WIDTH,
                text: "Игроки",
                align: 'center',
                fontSize: 20,
                fontFamily: 'DigitalStrip',
            });
            layerUserBox.add(title);

            // head separator
            let titleSeparator = new Konva.Line({
                points: [0, USER_HEIGHT, USERS_WIDTH, USER_HEIGHT],
                stroke: 'black',
                strokeWidth: 1,
            });
            layerUserBox.add(titleSeparator);

            // список игроков
            this._groupUsers = new Konva.Group({
                x: 0,
                y: 50,
            });
            layerUserBox.add(this._groupUsers);
        }

        if (!this._users) this._users = [];

        let newUsers = [];
        (list || this._game.users).forEach(function (user, i) {
            newUsers.push({
                id: `${user.nickname}${user.score}${user.isMaster}`,
                itemGenerator: () => {
                    // current user line
                    user.avatar = USER_AVATARS[i];
                    let userGroup = generateUser(user);
                    userGroup.setX(0);
                    userGroup.setY(i * USER_HEIGHT);

                    if (i !== this._game.users.length - 1) {
                        // users separator
                        let userSeparator = new Konva.Line({
                            points: [0, USER_HEIGHT, USERS_WIDTH, USER_HEIGHT],
                            stroke: 'black',
                            strokeWidth: 1,
                        });
                        userGroup.add(userSeparator);
                    }

                    return userGroup;
                }
            });
        }.bind(this));
        this._users = listUpdate(this._groupUsers, this._users, newUsers);
        this._layerGame.drawScene();
    }

    _updateTable(list) {
        if (!this._groupTable) {
            this._groupTable = new Konva.Group({
                y: TABLE_TOP,
            });
            this._layerGame.add(this._groupTable);
        }

        if (!this._table) this._table = [];

        let newTable = [];
        let _i = 0;
        if (list || !this._isGameOver) {
            (list || this._game.table).forEach(function (card, i) {
                if (!card || typeof card === "string") return;
                let __i = _i;
                ++_i;
                newTable.push({
                    id: card.id,
                    card: card,
                    index: i,
                    itemGenerator: () => {
                        let group = generateCard.bind(this)(card);
                        group.scale({
                            x: TABLE_CARD_WIDTH / group.getWidth(),
                            y: TABLE_CARD_HEIGHT / group.getHeight()
                        });
                        group.setX((TABLE_CARD_WIDTH + TABLE_CARD_OFFSET) * __i);
                        group.setY(0);
                        return group;
                    }
                });
            }.bind(this));
        } else {
            newTable = [
                {
                    id: -100500,
                    card: null,
                    index: 0,
                    itemGenerator: () => {
                        return new Konva.Text({
                            text: 'игра закончена',
                            fontSize: 30,
                            y: TABLE_CARD_HEIGHT / 2 + 20,
                            fontFamily: 'DigitalStrip',
                        });
                    },
                },
            ];
        }

        this._table = listUpdate(this._groupTable, this._table, newTable);
        this._layerGame.drawScene();
    }

    _updateUserCards(list) {
        if (!this._groupUserCards) {
            this._groupUserCards = new Konva.Group({
                y: UTABLE_TOP,
            });
            this._layerGame.add(this._groupUserCards);
        }

        if (!this._userCards) this._userCards = [];

        let newUserCards = [];
        let _i = 0;

        (list || this._game.userCards).forEach(function (card, i) {
            if (!card || typeof card === "string") return;
            let __i = _i;
            ++_i;
            newUserCards.push({
                id: card.id,
                card: card,
                index: i,
                itemGenerator: () => {
                    let group = generateCard.bind(this)(card);
                    group.scale({
                        x: UTABLE_CARD_WIDTH / group.getWidth(),
                        y: UTABLE_CARD_HEIGHT / group.getHeight()
                    });
                    group.setX((UTABLE_CARD_WIDTH + UTABLE_CARD_OFFSET) * __i);
                    group.setY(0);
                    return group;
                }
            });
        }.bind(this));

        this._userCards = listUpdate(this._groupUserCards, this._userCards, newUserCards);
        this._layerGame.drawScene();
    }

    _updateHistory(list) {
        if (!this._groupHistory) {
            this._groupHistory = new Konva.Group({
                x: HISTORY_LEFT,
                y: HISTORY_TOP,
            });
            this._layerGame.add(this._groupHistory);
        }

        if (!this._history) this._history = [];

        let newHistory = [];
        let _i = 0;
        document.__kek = false;
        (list || this._game.history).forEach(function (l, i) {
            if (!l) return;

            let __i = _i;
            ++_i;
            newHistory.push({
                id: l,
                index: i,
                itemGenerator: () => {
                    let group = new Konva.Group({
                        x: HISTORY_LEFT,
                        y: HISTORY_TOP + __i * (HISTORY_OFFSET + HISTORY_CARD_HEIGHT)
                    });

                    let i_ = 0;
                    l.forEach(function (card) {
                        if (!card) return;
                        let cardGroup = generateCard.bind(this)(card);
                        cardGroup.scale({
                            x: HISTORY_CARD_WIDTH / cardGroup.getWidth(),
                            y: HISTORY_CARD_HEIGHT / cardGroup.getHeight()
                        });
                        cardGroup.setX((HISTORY_CARD_WIDTH + HISTORY_CARD_OFFSET) * i_++);
                        group.add(cardGroup);
                    }.bind(this));

                    group.on('mouseover', function () {
                        this._updateTable(l);
                        this._moveTableCenter(false);
                    }.bind(this));
                    group.on('mouseout', function () {
                        this._updateTable();
                        this._moveTableCenter(false);
                    }.bind(this));
                    group.on('mousedown touchstart', function () {
                        this._updateTable(document.__kek ? null : l);
                        this._moveTableCenter(false);
                        document.__kek = !document.__kek;
                    }.bind(this));

                    return group;
                }
            });
        }.bind(this));
        this._history = listUpdate(this._groupHistory, this._history, newHistory);
        this._layerGame.drawScene();
    }

    _moveTableCenter(isGameOver = this._isGameOver) {
        const cardsWidth = isGameOver ? 0 : this._table.length * (TABLE_CARD_OFFSET + TABLE_CARD_WIDTH) - TABLE_CARD_OFFSET;
        const tableWidth = STAGE_WIDTH - TABLE_LEFT - USERS_WIDTH - USERS_RIGHT * 2;

        const tween = new Konva.Tween({
            node: this._groupTable,
            x: TABLE_LEFT + (tableWidth - cardsWidth) / 2,
            y: TABLE_TOP,
            duration: 0.45,
            easing: Konva.Easings.StrongEaseOut,
        });
        tween.play();
    }

    _moveHandRight() {
        if (this._groupHand) {
            const scale = (USERS_WIDTH) / ((HAND_CARD_WIDTH + HAND_CARD_OFFSET) * this._hand.length);

            const tween = new Konva.Tween({
                node: this._groupHand,
                x: STAGE_WIDTH - USERS_WIDTH - USERS_RIGHT,
                y: STAGE_HEIGHT - HAND_CARD_HEIGHT * scale - HAND_CARD_BORDER_THICKNESS,
                scaleX: scale,
                scaleY: scale,
                duration: 0.5,
                easing: Konva.Easings.StrongEaseOut,
            });
            tween.play();
        }
        if (this._groupUserCards) {
            const scale = (HAND_CARD_HEIGHT) / (UTABLE_CARD_HEIGHT);
            const cardsWidth = this._userCards.length * (HAND_CARD_OFFSET + HAND_CARD_WIDTH) - HAND_CARD_OFFSET;
            const tableWidth = STAGE_WIDTH - USERS_WIDTH - 2 * USERS_RIGHT;

            const tween = new Konva.Tween({
                node: this._groupUserCards,
                y: STAGE_HEIGHT - HAND_CARD_HEIGHT - HAND_CARD_BORDER_THICKNESS,
                x: (tableWidth - cardsWidth) / 2,
                scaleX: scale,
                scaleY: scale,
                duration: 0.5,
                easing: Konva.Easings.StrongEaseOut,
            });
            tween.play();
        }
    }

    _moveHandCenter() {
        if (this._groupHand) {
            const cardsWidth = this._hand.length * (HAND_CARD_OFFSET + HAND_CARD_WIDTH) - HAND_CARD_OFFSET;
            const tween = new Konva.Tween({
                node: this._groupHand,
                x: (STAGE_WIDTH - cardsWidth) / 2,
                y: STAGE_HEIGHT - HAND_CARD_HEIGHT - HAND_CARD_BORDER_THICKNESS,
                duration: 0.45,
                scaleX: 1,
                scaleY: 1,
                easing: Konva.Easings.StrongEaseOut,
            });
            tween.play();
        }
        if (this._groupUserCards) {
            const cardsWidth = this._userCards.length * (UTABLE_CARD_OFFSET + UTABLE_CARD_WIDTH) - UTABLE_CARD_OFFSET;
            const tableWidth = STAGE_WIDTH - UTABLE_LEFT - USERS_WIDTH - USERS_RIGHT * 2;
            const tween = new Konva.Tween({
                node: this._groupUserCards,
                x: UTABLE_LEFT + (tableWidth - cardsWidth) / 2,
                y: UTABLE_TOP,
                duration: 0.45,
                scaleX: 1,
                scaleY: 1,
                easing: Konva.Easings.StrongEaseOut,
            });
            tween.play();
        }
    }

    _fadeHand() {
        if (!this._groupHand) this._updateHand();

        const tween = new Konva.Tween({
            node: this._groupHand,
            opacity: 0.6,
            duration: 0.5,
        });

        tween.play();
    }

    _highlightHand() {
        if (!this._groupHand) this._updateHand();

        const tween = new Konva.Tween({
            node: this._groupHand,
            opacity: 1,
            duration: 0.5,
        });

        tween.play();
    }

    _onSelectFromHand() {
        this._updateHand();

        const moveCard = function (item, isUp) {
            const tween = new Konva.Tween({
                node: item,
                y: isUp ? -15 : 0,
                duration: 0.2,
                easing: Konva.Easings.StrongEaseOut,
            });
            tween.play();
        };

        this._highlightHand();
        listSubscribe({
            list: this._hand,
            onClick: function (c) {
                moveCard(c.item, false);

                this._stage.container().style.cursor = 'default';
                this._game.selectCardFromHand(c.index);

                listUnsubscribe(this._hand);
                this._fadeHand();
                this._updateTable();
                this._moveTableCenter();

                this._moveHandRight();

                this._updateTooltip('waitForPlayers');
            }.bind(this),
            onMouseOver: function (c) {
                moveCard(c.item, true);

                const l = this._game.table;
                if ((this._game.table.length && !this._game.table[0]) || this._game.table.length === 1) {
                    l.unshift(c.card);
                } else {
                    l.push(c.card);
                }
                this._updateTable(l);
                this._moveTableCenter();

                this._stage.container().style.cursor = 'pointer';
            }.bind(this),
            onMouseOut: function (c) {
                if (c.card.red && this._game.roundCount - 1 !== this._game.roundNum) return;

                moveCard(c.item, false);
                this._updateTable();
                this._moveTableCenter();

                this._stage.container().style.cursor = 'default';
            }.bind(this),
        });
    }

    _onSelectFromTable() {
        this._updateUserCards();

        listSubscribe({
            list: this._userCards,
            onClick: function (c) {
                this._stage.container().style.cursor = 'default';

                this._game.selectCardFromTable(c.index);

                listUnsubscribe(this._userCards);

                this._updateTable();
                this._moveTableCenter();

                this._updateTooltip('waitForPlayers');
            }.bind(this),
            onMouseOver: function (c) {
                const l = this._game.table;
                if ((this._game.table.length && !this._game.table[0]) || this._game.table.length === 1) {
                    l.unshift(c.card);
                } else {
                    l.push(c.card);
                }
                this._updateTable(l);
                this._moveTableCenter();

                this._stage.container().style.cursor = 'pointer';
            }.bind(this),
            onMouseOut: function (c) {
                this._updateTable();
                this._moveTableCenter();

                this._stage.container().style.cursor = 'default';
            }.bind(this),
        });
    }

    _updateTooltip(state) {
        switch (state) {
            case 'chooseCardFromHand':
                this._updateTooltipText('Выбери карту, которая лучше всего подходит для комикса');
                break;
            case 'chooseCardFromTable':
                this._updateTooltipText('Выбери карту, из предложенных, которая лучше всего подходит для комикса');
                break;
            case 'waitForPlayers':
                this._updateTooltipText('Подожди пока другие игроки сделают выбор...');
                break;
            case 'waitForMaster':
                this._updateTooltipText('Подожди пока ведущий выберет лучшую карту...');
                break;
            default:
                this._updateTooltipText('');
        }
    }

    _updateTooltipText(text) {
        if (!this._hintText) {
            this._hintText = new Konva.Text({
                align: 'left',
                fontSize: 20,
                fontFamily: 'DigitalStrip',
                x: TOOLTIP_TIMER_SIZE + 15,
                y: TOOLTIP_TEXT_TOP,
            });

            this._layerGame.add(this._hintText);
        }

        this._hintText.text(text);
        this._layerGame.drawScene();
    }

    _showGame() {
        if (window.innerWidth < window.innerHeight) return;

        if (this._groupError) {
            const errorTween = new Konva.Tween({
                node: this._groupError,
                opacity: 0,
                duration: 0.5,
            });

            errorTween.onFinish = function () {
                this._groupError && this._groupError.remove();
                delete this._groupError;
            }.bind(this);
            errorTween.play();
        }
    };

    _showError(text, showLoader = true) {
        if (this._groupError) {
            this._groupErrorDescription.text(text);
            return;
        }

        this._groupError && this._groupError.remove();
        this._groupError = new Konva.Group({
            opacity: 0,
        });
        this._layerError.add(this._groupError);

        const layerErrorBackground = new Konva.Rect({
            x: 0,
            y: 0,
            width: this._stage.getWidth(),
            height: this._stage.getHeight(),
            fill: '#fbfbfb',
        });

        if (showLoader) {
            const layerErrorLoader = generateLoader();
            layerErrorLoader.setX(this._stage.getWidth() / 2);
            layerErrorLoader.setY(this._stage.getHeight() / 2);
            this._groupError.add(layerErrorLoader);
            layerErrorLoader.run();
        }

        const layerErrorDescription = new Konva.Text({
            x: 0,
            y: (this._stage.getWidth() + ERROR_LOGO_SIZE) / 2 + 50,
            width: this._stage.getWidth(),
            align: 'center',
            fontSize: 20,
            fontFamily: 'DigitalStrip',
            text: text,
        });
        this._groupErrorDescription = layerErrorDescription;

        const layerErrorButton = new Konva.Text({
            x: 0,
            y: this._stage.getHeight() - 50,
            width: this._stage.getWidth(),
            align: 'center',
            fontSize: 20,
            fontFamily: 'DigitalStrip',
            text: 'Выйти',
        });

        layerErrorButton.on('mousedown touchstart', function () {
            this.router.go('/');
        }.bind(this));
        layerErrorButton.on('mouseover', function () {
            this._stage.container().style.cursor = 'pointer';
            let tween = new Konva.Tween({
                node: layerErrorButton,
                fontSize: 23,
                duration: 0.2
            });
            tween.play();
        }.bind(this));
        layerErrorButton.on('mouseout', function () {
            this._stage.container().style.cursor = 'default';
            let tween = new Konva.Tween({
                node: layerErrorButton,
                fontSize: 20,
                duration: 0.2
            });
            tween.play();
        }.bind(this));

        this._groupError.add(layerErrorBackground);
        this._groupError.add(layerErrorDescription);
        this._groupError.add(layerErrorButton);


        const errorTween = new Konva.Tween({
            node: this._groupError,
            opacity: 1,
            duration: 0.5,
        });
        errorTween.play();
    };
}

export default GameController;
