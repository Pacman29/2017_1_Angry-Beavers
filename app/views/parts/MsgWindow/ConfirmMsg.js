/**
 * Created by pacman29 on 27.05.17.
 */

import pugConfirmMsg from './ConfirmMsg.pug';
import "./MsgWindow.scss";

const ConfirmMsg = function () {

    let _block = null;
    let _win = null;
    let _button_cancle = null;
    let _button_ok = null;
    let _resfunc = null;

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

    let initWin = function(width, msg, _resfunc) {
        _win = document.getElementsByClassName('confirmmsg')[0];
        if (!_win) {
            let parent = document.getElementsByTagName('body')[0];
            let obj = parent.firstChild;
            _win = document.createElement('div');
            _win.setAttribute("class", "confirmmsg");
            _win.innerHTML = pugConfirmMsg();
            _win.style.padding = '0 0 5px 0';
            parent.insertBefore(_win, obj);
            _button_cancle = document.getElementsByClassName("confirmmsg__button")[0];
            _button_cancle.addEventListener("click", (func => {
                func();
                if(_resfunc){
                    _resfunc(false);
                }

            }).bind(null,close,_resfunc));
            _button_ok = document.getElementsByClassName("confirmmsg__button")[1];
            _button_ok.addEventListener("click", (func => {
                func();
                if(_resfunc){
                    _resfunc(true);
                }
            }).bind(null,close,_resfunc));
        }
        _win.style.width = width + 'px'; //Установим ширину окна
        _win.style.display = 'inline'; //Зададим CSS-свойство

        document.getElementsByClassName("confirmmsg__msg")[0].textContent = msg;

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
            document.getElementsByClassName('confirmmsg')[0].style.display = 'none';
        }
    };

    let show = function(msg,result_function, width = 300) {
        initBlock();
        initWin(width, msg, result_function);
    };

    document.myconfirm = {show: show, close: close};
};

export default ConfirmMsg;
