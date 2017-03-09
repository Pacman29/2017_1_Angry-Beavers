/**
 * Created by pacman29 on 20.02.17.
 */
(function () {
    class CreatePage {
        constructor(opt = {}) {
            if (CreatePage.__instance) {
                return CreatePage.__instance;
            }
            this.body = (document.getElementsByTagName('body'))[0];
            this.links = [];
            this.parts = new Map();
            let link_name = document.createElement('link');
            link_name.setAttribute('rel', 'stylesheet');
            link_name.setAttribute('href', '');
            this.links.push();
            this.addParts(this.body, "AppName", window.AppName({
                attr: [
                    {
                        class: "my_ref my_font_for_gamename first",
                        text: "Joking"
                    },
                    {
                        class: "my_ref my_font_for_gamename second",
                        text: "Hazard"
                    }
                ]
            }), "stylesheets/parts/AppName.css");
            this.addParts(this.body, "MenuStart", window.Menu({
                icons: [
                    {
                        attr: {
                            src: "images/Login_btn.png",
                            class: "img-responsive my_btn_image",
                            onMouseOver: "this.src='images/GOODFACE.png'",
                            onMouseOut: "this.src='images/Login_btn.png'"
                        }
                    },
                    {
                        attr: {
                            src: "images/About_us.png",
                            class: "img-responsive my_btn_image",
                            onMouseOver: "this.src='images/We_do_it.png'",
                            onMouseOut: "this.src='images/About_us.png'"
                        }
                    },
                    {
                        attr: {
                            src: "images/About_rules.png",
                            class: "img-responsive my_btn_image",
                            onMouseOver: "this.src='images/About_rules_2.png'",
                            onMouseOut: "this.src='images/About_rules.png'"
                        }
                    }
                ]
            }), "stylesheets/parts/Menu.css");
            this.addParts(this.body, "MenuGame", window.Menu({
                icons: [
                    {
                        href: "play",
                        attr: {
                            src: "images/Game.png",
                            class: "img-responsive my_btn_image",
                            onMouseOver: "this.src='images/Game_hold.png'",
                            onMouseOut: "this.src='images/Game.png'"
                        }
                    },
                    {
                        href: "score",
                        attr: {
                            src: "images/Score_btn.png",
                            class: "img-responsive my_btn_image",
                            onMouseOver: "this.src='images/Score_btn_hold.png'",
                            onMouseOut: "this.src='images/Score_btn.png'"
                        }
                    },
                    {
                        href: "aboutus",
                        attr: {
                            src: "images/About_us.png",
                            class: "img-responsive my_btn_image",
                            onMouseOver: "this.src='images/We_do_it.png'",
                            onMouseOut: "this.src='images/About_us.png'"
                        }
                    },
                    {
                        href: "rules",
                        attr: {
                            src: "images/About_rules.png",
                            class: "img-responsive my_btn_image",
                            onMouseOver: "this.src='images/About_rules_2.png'",
                            onMouseOut: "this.src='images/About_rules.png'"
                        }
                    }
                ]
            }), "stylesheets/parts/Menu.css");

            this.addParts(this.body, "SignIn", window.Border({
                    img: "images/add_your_data.png",
                    stylesheet: "stylesheets/parts/Form.css",
                    el: window.FormConstruct({
                        text: "Авторизация",
                        inputs: [
                            {
                                placeholder: "Username",
                                class: "",
                                id: "username",
                                type: "text",
                                required: ""
                            },
                            {
                                placeholder: "Password",
                                class: "",
                                id: "password",
                                type: "password",
                                required: ""
                            }
                        ],
                        buttons: [
                            {
                                attrs: {
                                    type: "submit",
                                    class: ""
                                },
                                text: "Вход"
                            },
                            {
                                attrs: {
                                    type: "reset",
                                    class: ""
                                },
                                text: "Регистрация"
                            }
                        ]
                    })
                }),
                "stylesheets/parts/Border.css");

            this.addParts(this.body, "SignUp", window.Border({
                    img: "images/add_your_data.png",
                    stylesheet: "stylesheets/parts/Form.css",
                    el: window.FormConstruct({
                        text: "Регистрация",
                        inputs: [
                            {
                                placeholder: "Your Email",
                                class: "",
                                id: "email",
                                type: "text",
                                required: ""
                            },
                            {
                                placeholder: "Username",
                                class: "",
                                id: "username",
                                type: "text",
                                required: ""
                            },
                            {
                                placeholder: "Password",
                                class: "",
                                id: "password",
                                type: "password",
                                required: ""
                            },
                            {
                                placeholder: "Repeat password",
                                class: "",
                                id: "password_r",
                                type: "password",
                                required: ""
                            }
                        ],
                        buttons: [
                            {
                                attrs: {
                                    type: "submit",
                                    class: ""
                                },
                                text: "Отправить"
                            },
                            {
                                attrs: {
                                    type: "reset",
                                    class: ""
                                },
                                text: "Авторизация"
                            }
                        ]
                    })
                }),
                "stylesheets/parts/Border.css");

            this.addParts(this.body, "ScoreList", window.Border({
                    img: "images/Scorelist.png",
                    stylesheet: "stylesheets/parts/ScoreList.css",
                    el: window.ScoreList({},
                        [
                            {
                                position: "1",
                                nickname: "lol_1",
                                score: "999"
                            },
                            {
                                position: "2",
                                nickname: "lol_2",
                                score: "888"
                            },
                            {
                                position: "3",
                                nickname: "lol_3",
                                score: "777"
                            },
                            {
                                position: "...",
                                nickname: "...",
                                score: "..."
                            },
                            {
                                position: "4",
                                nickname: "lol_4",
                                score: "777"
                            }
                        ]
                    )
                }),
                "stylesheets/parts/Border.css");

            this.addParts(this.body, "AboutUs", window.Border({
                    img: "images/Dance.png",
                    stylesheet: "stylesheets/parts/AboutUs.css",
                    el: window.AboutUs({
                            text: "Ага, вот эти ребята: ",
                            members: [
                                {
                                    href: "https://github.com/Pacman29",
                                    text: "Pacman29"
                                }
                            ]
                        }
                    )
                }),
                "stylesheets/parts/Border.css");

            this.addParts(this.body, "Rules", window.Border({
                    img: "images/Rules_page.png",
                    stylesheet: "stylesheets/parts/Rules.css",
                    el: window.Rules({
                            text: "ну тут какие-то правила будут, наверное...",
                        }
                    )
                }),
                "stylesheets/parts/Border.css");

            this.addParts(this.body, "Footer", window.Footer({
                text: "Copyright © MyWebsite. All rights reserved.",
                class: "my_font"
            }), "stylesheets/parts/Footer.css");
        }

        addParts(parent, name, elem, stylesheet = "") {
            if (stylesheet !== "") {
                let style = document.createElement('link');
                style.setAttribute('rel', 'stylesheet');
                style.setAttribute('href', stylesheet);
                this.body.appendChild(style);
            }
            this.parts.set(name, elem);
            elem.hidden = true;
            parent.appendChild(elem);
        }

        getParts() {
            return this.parts;
        }
    }
    window.CreatePage = CreatePage;
}());
