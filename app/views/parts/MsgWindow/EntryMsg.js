/**
 * Created by pacman29 on 01.06.17.
 */
import pugEntryMsg from './EntryMsg.pug';
import "./MsgWindow.scss";

const EntryMsg = function () {

    let _block = null;
    let _win = null;

    let _msg = "Входим";
    let _dot_count = 1;
    let __timerid = null;

    let __loop = function(){
        let text_value = _msg;
        for (let i = 0; i < _dot_count; ++i){
            text_value = text_value.concat(".");
        }
        _win.childNodes[0].textContent = text_value;
        _dot_count = _dot_count < 3 ? _dot_count+1 : 0;
    };


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
        _win = document.getElementsByClassName('entrymsg')[0];
        if (!_win) {
            let parent = document.getElementsByTagName('body')[0];
            let obj = parent.firstChild;
            _win = document.createElement('div');
            _win.setAttribute("class", "entrymsg");
            _win.innerHTML = pugEntryMsg();
            _win.style.padding = '0 0 5px 0';
            parent.insertBefore(_win, obj);
        }
        _win.style.width = width + 'px'; //Установим ширину окна
        _win.style.display = 'inline'; //Зададим CSS-свойство

        // document.getElementsByClassName("alertmsg__msg")[0].textContent = msg;

        _dot_count = 1;
        _win.childNodes[0].textContent = _msg;
        __timerid = setInterval(__loop,1000);

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
            document.getElementsByClassName('entrymsg')[0].style.display = 'none';
        }

        clearTimeout(__timerid);
    };

    let show = function(msg,width = 200) {
        _msg = msg;
        initBlock();
        initWin(width);
    };

    document.myentrymsg = {show: show, close: close};
};

export default EntryMsg;
