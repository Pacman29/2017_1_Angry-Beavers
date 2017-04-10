/**
 * Created by pacman29 on 08.04.17.
 */
export default class NodeDecorator{
    constructor(node,forNoAuth,forAuth,controlls = {}){
        this._node = node;
        this._controlls = controlls;
        this._forNoAuth = forNoAuth || false;
        this._forAuth = forAuth || false;
    }

    hidden(value){
        this._node.hidden = value;
    }

    set forNoAuth(value) {
        this._forNoAuth = value;
    }

    set forAuth(value) {
        this._forAuth = value;
    }

    addControlls(name,control){
        this.controlls[name] = control;
    }

    get isforNoAuth() {
        return this._forNoAuth;
    }

    get isforAuth() {
        return this._forAuth;
    }

    get node() {
        return this._node;
    }

    get controlls() {
        return this._controlls;
    }
}
