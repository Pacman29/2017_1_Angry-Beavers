/**
 * Created by pacman29 on 04.04.17.
 */

'use strict';

import Session from "../public/static/models/session";

const session = new Session();

let test_user = {
    email: "test$$@test.ru",
    password: "test$$",
    login: "test$$"
};

describe("API tests.", () => {
    it("SignUp", function (done) {
        session.signUp(test_user.login, test_user.email, test_user.password)
            .then(() => {
                done();
            })
            .catch(e => {
                done(e);
            });
    });
    it("SignUp_fail", function (done) {
        session.signUp(test_user.login, test_user.email, test_user.password)
            .then(() => {
                done("Sign up success");
            })
            .catch(() => {
                done();
            });
    });

    it("SignIn", function (done) {
        session.login(test_user.login, test_user.password)
            .then(() => {
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it("LogOut", (done) => {
            session.logout()
                .then(() => {
                    done();
                })
                .catch(e => {
                    done(e);
                });
        }
    );

    it("SignIn_fail", function (done) {
        session.login(test_user.login + "bla", test_user.password + "bla")
            .then(() => {
                done("Sign in success");
            })
            .catch(() => {
                done();
            });
    });

    it("LogOut_fail", (done) => {
        session.logout()
            .then(() => {
                done("Log out success");
            })
            .catch(() => {
                done();
            });
    });

    it("SignIn", function (done) {
        session.login(test_user.login, test_user.password)
            .then(() => {
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it("DeleteUser", (done) => {
        session.deleteUser()
            .then(() => {
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it("DeleteUser_fail", (done) => {
        session.deleteUser()
            .then(() => {
                done("Delete success");
            })
            .catch(() => {
                done();
            });
    });
});
