/**
 * Created by pacman29 on 08.03.17.
 */
'use strict';

import View from '../modules/view';

class ScoreListController extends View {
    constructor(opt = {}) {
        if (ScoreListController.__instance) {
            return ScoreListController.__instance;
        }
        super(opt);
        ScoreListController.__instance = this;
        this.addListener();
    }

    addListener() {
        [...document.querySelectorAll(".userheader-appname")]
            .concat([...document.querySelectorAll('.appname')])
            .forEach(a => a.addEventListener('click', event => {
                event.preventDefault();
                this.router.go("/");
            }));
    }

    resume() {
        this.show();
    }

    show() {
        if (!this.session.isAuth) {
            this.router.go('/signin');
        } else {
            this.page_parts.get("UserHeader").hidden = false;
            [...document.querySelectorAll('.userheader-login')].forEach(a => a.innerHTML = this.session.user.login);
            [...document.querySelectorAll('.userheader-score')].forEach(a => a.innerHTML = this.session.user.score);
            this.page_parts.get("ScoreList").hidden = false;

            document.myentrymsg.show("Загружаю");

            this.session.getScoreList()
                .then(score => {
                    const scoreList = document.getElementById('score_list');
                    scoreList.innerHTML = ``;

                    const head = document.createElement('tr');
                    head.className = 'scorelist__row';

                    const headPosition = document.createElement('th');
                    headPosition.className = 'col-lg-2 scorelist__head';
                    headPosition.innerHTML = '#';
                    const headNickname = document.createElement('th');
                    headNickname.className = 'col-lg-2 scorelist__head';
                    headNickname.innerHTML = 'Ник';
                    const headScore = document.createElement('th');
                    headScore.className = 'col-lg-2 scorelist__head';
                    headScore.innerHTML = 'Очки';

                    head.appendChild(headPosition);
                    head.appendChild(headNickname);
                    head.appendChild(headScore);
                    scoreList.appendChild(head);


                    score.forEach((user, i) => {
                        if (i === 10 && score.length >= 12 && score[10].position !== 10) {
                            const row = document.createElement('tr');
                            row.className = 'scorelist__row';

                            const userPosition = document.createElement('th');
                            userPosition.className = 'scorelist__separator';
                            userPosition.innerHTML = `...`;
                            userPosition.setAttribute('colspan', '3');

                            row.appendChild(userPosition);
                            scoreList.appendChild(row);
                        }

                        const row = document.createElement('tr');
                        row.className = 'scorelist__row';

                        let userPosition = document.createElement('th');
                        let userNickname = document.createElement('th');
                        let userScore = document.createElement('th');
                        if(user.login === this.session.user.login){
                            userPosition.className = 'col-lg-2 scorelist__cell scorelist__thisuser';
                            userPosition.innerHTML = user.rank;
                            userNickname.className = 'col-lg-2 scorelist__cell scorelist__thisuser';
                            userNickname.innerHTML = user.login;
                            userScore.className = 'col-lg-2 scorelist__cell scorelist__thisuser';
                            userScore.innerHTML = user.score;
                        } else {
                            userPosition.className = 'col-lg-2 scorelist__cell';
                            userPosition.innerHTML = user.rank;
                            userNickname.className = 'col-lg-2 scorelist__cell';
                            userNickname.innerHTML = user.login;
                            userScore.className = 'col-lg-2 scorelist__cell';
                            userScore.innerHTML = user.score;
                        }

                        row.appendChild(userPosition);
                        row.appendChild(userNickname);
                        row.appendChild(userScore);

                        scoreList.appendChild(row);
                    });
                    document.myentrymsg.close();
                });
            document.myentrymsg.close();
        }

        /*
         TODO :: Здесь нужно заполнить лидерборд, тут надо просто подумать
         */

        this.page_parts.get("Footer").hidden = false;
    }

    hide() {
        this.page_parts.get("UserHeader").hidden = true;
        this.page_parts.get("ScoreList").hidden = true;
        this.page_parts.get("Footer").hidden = true;
        document.myentrymsg.close();
    }
}

export default ScoreListController;
