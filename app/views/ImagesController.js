/**
 * Created by pacman29 on 28.05.17.
 */
class ImagesController {
    constructor(){
        if (ImagesController.__instance) {
            return ImagesController.__instance;
        }
        this.__typeimage = "jpg";
        if(window.navigator.userAgent.indexOf("Chrome") > -1){
            this.__typeimage = "webp";
        };
        if(window.navigator.userAgent.indexOf("Firefox") > -1){
            this.__typeimage = "jpg";
        };

        this._initImages();

        ImagesController.__instance = this;
        document.imagescontroller =  this;
    };

    _initImages(){
        this._path = '/images/'+this.__typeimage+"/";
    }

    get_avatar_img(name){
        return this._path+"avatars/"+name+"."+this.__typeimage;
    }
    get_game_img(name){
        return this._path+"game/"+name+"."+this.__typeimage;
    }

    get_menu_img(name){
        return this._path+"menu/"+name+"."+this.__typeimage;
    }

}

export default new ImagesController();
