console.log(`${'\n'} %c MetingJS v1.2.0 %c https://github.com/metowolf/MetingJS ${'\n'}`, 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');

let aplayers = [];
let loadMeting = () => {
    let api = 'https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r';
    if (typeof meting_api !== 'undefined') api = meting_api;

    for (let i = 0; i < aplayers.length; i++) {
        try {
            aplayers[i].destroy();
        } catch (e) {
            console.log(e);
        }
    }
    aplayers = [];

    let elements = document.querySelectorAll(".aplayer");

    for (var i = 0; i < elements.length; i++) {
        const el = elements[i];
        let id = el.dataset.id;
        if (id) {
            let url = el.dataset.api || api;
            url = url.replace(":server", el.dataset.server);
            url = url.replace(":type", el.dataset.type);
            url = url.replace(":id", el.dataset.id);
            url = url.replace(":auth", el.dataset.auth);
            url = url.replace(":r", Math.random());

            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        let response = JSON.parse(xhr.responseText);
                        build(el, response);
                    }
                }
            };
            xhr.open('get', url, true);
            xhr.send(null);

        } else if (el.dataset.url) {
            let data = [{
                name: el.dataset.name || el.dataset.title || 'Audio name',
                artist: el.dataset.artist || el.dataset.author || 'Audio artist',
                url: el.dataset.url,
                cover: el.dataset.cover || el.dataset.pic,
                lrc: el.dataset.lrc,
                type: el.dataset.type || 'auto'
            }];

            build(el, data);
        }
    }

    function build(element, music) {

        let defaultOption = {
            container: element,
            audio: music,
            mini: null,
            fixed: null,
            autoplay: false,
            mutex: true,
            lrcType: 3,
            listFolded: false,
            preload: 'auto',
            theme: '#2980b9',
            loop: 'all',
            order: 'list',
            volume: null,
            listMaxHeight: null,
            customAudioType: null,
            storageName: 'metingjs'
        };

        if (!music.length) {
            return;
        }

        if (!music[0].lrc) {
            defaultOption['lrcType'] = 0;
        }

        let options = {};
        for (const defaultKey in defaultOption) {
            let eleKey = defaultKey.toLowerCase();
            if (element.dataset.hasOwnProperty(eleKey) || element.dataset.hasOwnProperty(defaultKey) || defaultOption[defaultKey] !== null) {
                options[defaultKey] = element.dataset[eleKey] || element.dataset[defaultKey] || defaultOption[defaultKey];
                if (options[defaultKey] === 'true' || options[defaultKey] === 'false') {
                    options[defaultKey] = (options[defaultKey] == 'true');
                }
            }
        }

        aplayers.push(new APlayer(options));
    }
}

document.addEventListener('DOMContentLoaded', loadMeting, false);
