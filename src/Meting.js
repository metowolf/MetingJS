console.log(`\n %c MetingJS 1.1.1 %c https://github.com/metowolf/MetingJS \n\n`, `color: #fadfa3; background: #030307; padding:5px 0;`, `background: #fadfa3; padding:5px 0;`);

let aplayers = [];
let loadMeting = () => {
    let api = 'https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r';
    if (typeof meting_api !== 'undefined') api = meting_api;

    for (let i = 0; i < aplayers.length; i++) {
        try {
            aplayers[i].destroy();
        } catch(e){
            console.log(e);
        }
    }
    aplayers = [];

    let elements = document.querySelectorAll(".aplayer");
    for (let i = 0; i < elements.length; i++) {
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
                name: el.dataset.name || el.dataset.title,
                artist: el.dataset.artist || el.dataset.author,
                url: el.dataset.url,
                cover: el.dataset.cover || el.dataset.pic,
                lrc: el.dataset.lrc
            }];
            build(el, data);
        }
    }

    function build(element, music) {
        let options = {
            container: element,
            audio: music,
            mini: false,
            autoplay: false,
            mutex: true,
            lrc: 3,
            preload: 'auto',
            theme: '#2980b9',
            loop: 'all',
            order: 'list',
            volume: 0.7,
            listFolded: false,
            listMaxHeight: '340px'
        };

        for (const defaultKey in options) {
            if (options.hasOwnProperty(defaultKey) && element.dataset.hasOwnProperty(defaultKey)) {
                options[defaultKey] = element.dataset[defaultKey];
                if (options[defaultKey] === 'true' || options[defaultKey] === 'false') {
                    options[defaultKey] = (options[defaultKey] == 'true');
                }
            }
        }

        if (!music.length) {
            return;
        }

        if (options.mini === true) {
            options.lrc = 0;
            options.listFolded = true;
        }

        aplayers.push(new APlayer(options));
    }
}

document.addEventListener('DOMContentLoaded', loadMeting, false);
