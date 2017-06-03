/**
 * Created by pacman29 on 26.05.17.
 */

class ImagesController {
    constructor(){
        if (ImagesController.__instance) {
            return ImagesController.__instance;
        }
        this.__typeimage = "jpg";
        if(navigator.userAgent.indexOf("Chrome") > -1){
            this.__typeimage = "webp";
        };
        if(navigator.userAgent.indexOf("Firefox") > -1){
            this.__typeimage = "jpg";
        };

        this._initImages();

        ImagesController.__instance = this;
    };

    _initImages(){
        this._path = '/images/'+this.__typeimage+"/";
    }


    get_game_img(name){
        return this._path+"game/"+name+"."+this.__typeimage;
    }

    get_menu_img(name){
        return this._path+"menu/"+name+"."+this.__typeimage;
    }

    get_avatar_img(name){
        return this._path+"avatars/"+name+"."+this.__typeimage;
    }
}

const CACHE_NAME = 'app_sw_v0.0.1';

const cacheUrls = [
    '/',
    '/bundle.js',
    '/signin',
    '/signup',
    '/menu',
    '/scorelist',
    '/aboutus',
    '/rules',
    '/lobby',
    '/game',
    '/gameFake',
    '/fonts'
];
var ic = new ImagesController();
cacheUrls.push(ic.get_menu_img('Game'));
cacheUrls.push(ic.get_menu_img('About_rules'));
cacheUrls.push(ic.get_menu_img('Score_btn'));
cacheUrls.push(ic.get_menu_img('Game_hold'));
cacheUrls.push(ic.get_menu_img('Login_btn'));
cacheUrls.push(ic.get_menu_img('Scorelist'));
cacheUrls.push(ic.get_menu_img('Score_btn_hold'));
cacheUrls.push(ic.get_menu_img('We_do_it'));
cacheUrls.push(ic.get_menu_img('GOODFACE'));
cacheUrls.push(ic.get_menu_img('Rules_page'));
cacheUrls.push(ic.get_menu_img('Dance.webp'));
cacheUrls.push(ic.get_menu_img('add_your_data'));
cacheUrls.push(ic.get_menu_img('About_us'));
cacheUrls.push(ic.get_menu_img('About_rules_2'));
cacheUrls.push(ic.get_menu_img('Users-Exit-icon'));

for(let i = 1; i<=10; ++i ){
    cacheUrls.push(ic.get_avatar_img(`${i}`))
}

for (let i = 1; i <= 100; ++i) {
    cacheUrls.push(ic.get_game_img(`${i}`))
}

this.addEventListener('install', function (event) {
    console.log('sw  install', event);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(cacheUrls);
            })
    );
});

var MAX_AGE = 86400000;

self.addEventListener('fetch', function(event) {

    event.respondWith(
        // ищем запрошенный ресурс среди закэшированных
        caches.match(event.request).then(function(cachedResponse) {
            var lastModified, fetchRequest;

            // если ресурс есть в кэше
            if (cachedResponse) {
                // получаем дату последнего обновления
                lastModified = new Date(cachedResponse.headers.get('last-modified'));
                // и если мы считаем ресурс устаревшим
                if (lastModified && (Date.now() - lastModified.getTime()) > MAX_AGE) {

                    fetchRequest = event.request.clone();
                    // создаём новый запрос
                    return fetch(fetchRequest).then(function(response) {
                        // при неудаче всегда можно выдать ресурс из кэша
                        if (!response || response.status !== 200) {
                            return cachedResponse;
                        }
                        // обновляем кэш
                        caches.open(CACHE_NAME).then(function(cache) {
                            cache.put(event.request, response.clone());
                        });
                        // возвращаем свежий ресурс
                        return response;
                    }).catch(function() {
                        return cachedResponse;
                    });
                }
                return cachedResponse;
            }

            // запрашиваем из сети как обычно
            return fetch(event.request);
        })
    );
});
