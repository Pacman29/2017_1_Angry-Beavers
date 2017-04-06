/**
 * Created by ed on 05.04.17.
 */

'use strict';

let isBrowser = typeof require === 'undefined';

if (!isBrowser) {
    var fetch = require('node-fetch');
}


(function () {
    const DEFAULT_HOST = 'jokinghazardserver.herokuapp.com';

    class Session {
        constructor(options) {
            options = options || {};

            this._host = options.host || DEFAULT_HOST;

            this._cookies = '';
            this._user = {isAuth: false};
        }

        get user() {
            // todo: get user data from backend
            return this._user;
        }

        get isAuth() {
            return this._user.isAuth;
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

        login(login, password) {
            let _this = this;
            return this._call('POST', 'user/login', {
                pass: password,
                userLogin: login
            }).then(() => {
                _this._user = {}; // todo: in ES6 rewrite with new User
                _this._user.login = login;
                _this._user.isAuth = true;
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
                _this._user.isAuth = true;
            });
        };

        logout() {
            let _this = this;
            return this._call('POST', 'user/logout').then(() =>{
                _this._user.isAuth = false;
            });
        };

        deleteUser() {
            return this._call('DELETE', 'user/delete').then(() =>{
                _this._user.isAuth = false;
            });
        };
    }

    if (isBrowser) {
        window.Session = Session;
    } else {
        module.exports = Session;
    }
}());
