/**
 * Created by pacman29 on 02.06.17.
 */

import pugRulesMsg from './RulesMsg.pug';
import "./MsgWindow.scss";

const RulesMsg = function () {

    let _block = null;
    let _win = null;

    let initBlock = function() {
        _block = document.getElementsByClassName('blockscreen')[0];
        if (!_block) {
            let parent = document.getElementsByTagName('body')[0];
            let obj = parent.firstChild;
            _block = document.createElement('div');
            _block.setAttribute("class",'blockscreen');
            parent.insertBefore(_block, obj);
        }
        _block.style.display = 'inline'; //Установим CSS-свойство
    };

    let initWin = function(width) {
        _win = document.getElementsByClassName('rulesmsg')[0];
        if (!_win) {
            let parent = document.getElementsByTagName('body')[0];
            let obj = parent.firstChild;
            _win = document.createElement('div');
            _win.setAttribute("class", "rulesmsg");
            _win.innerHTML = pugRulesMsg();
            _win.style.padding = '0 0 5px 0';
            parent.insertBefore(_win, obj);
            let button = document.getElementsByClassName("rulesmsg__button")[0];
            button.addEventListener("click", (func => {
                func();
            }).bind(null,close));
        }
        _win.style.width = width + 'px'; //Установим ширину окна
        _win.style.display = 'inline'; //Зададим CSS-свойство

        document.getElementsByClassName("rulesmsg__msg")[0].innerHTML = document.__rules;

        //Установим позицию по центру экрана
        _win.style.left = '50%'; //Позиция по горизонтали
        _win.style.top = '50%'; //Позиция по вертикали
        //Выравнивание по центру путем задания отрицательных отступов
        _win.style.marginTop = -(_win.offsetHeight / 2) + 'px';
        _win.style.marginLeft = -(width / 2) + 'px';
    };

    let close = function() {
        if(_block){
            document.getElementsByClassName('blockscreen')[0].style.display = 'none';
        }
        if(_win){
            document.getElementsByClassName('rulesmsg')[0].style.display = 'none';
        }

    };

    let show = function(width = 550) {
        initBlock();
        initWin(width);
    };

    document.myrules = {show: show, close: close};
};

export default RulesMsg;
