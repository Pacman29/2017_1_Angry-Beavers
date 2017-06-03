/**
 * Created by pacman29 on 27.05.17.
 */

import pugAlertMsg from './AlertMsg.pug';
import "./MsgWindow.scss";

const AlertMsg = function () {

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

    let initWin = function(width, msg) {
        _win = document.getElementsByClassName('alertmsg')[0];
        if (!_win) {
            let parent = document.getElementsByTagName('body')[0];
            let obj = parent.firstChild;
            _win = document.createElement('div');
            _win.setAttribute("class", "alertmsg");
            _win.innerHTML = pugAlertMsg();
            _win.style.padding = '0 0 5px 0';
            parent.insertBefore(_win, obj);
            let button = document.getElementsByClassName("alertmsg__button")[0];
            button.addEventListener("click", (func => {
                func();
            }).bind(null,close));
        }
        _win.style.width = width + 'px'; //Установим ширину окна
        _win.style.display = 'inline'; //Зададим CSS-свойство

        document.getElementsByClassName("alertmsg__msg")[0].textContent = msg;

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
            document.getElementsByClassName('alertmsg')[0].style.display = 'none';
        }

    };

    let show = function(msg,width = 300) {
        initBlock();
        initWin(width, msg);
    };

    document.myalert = {show: show, close: close};
};

export default AlertMsg;
