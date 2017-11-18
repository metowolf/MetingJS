console.log("\n %c MetingJS 1.0.1 %c https://github.com/metowolf/MetingJS \n\n", "color: #fff; background-image: linear-gradient(90deg, rgb(47, 172, 178) 0%, rgb(45, 190, 96) 100%); padding:5px 1px;", "background-image: linear-gradient(90deg, rgb(45, 190, 96) 0%, rgb(255, 255, 255) 100%); padding:5px 0;");

let aplayers = [];
document.addEventListener('DOMContentLoaded', function(event){
    let api = 'https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r';
    if (typeof meting_api !== 'undefined') api = meting_api;

    let elements = document.querySelectorAll(".aplayer");
    for (const el of elements) {
        let id = el.dataset.id;
        if (id) {
            let url=api;
            url=url.replace(":server", el.dataset.server);
            url=url.replace(":type", el.dataset.type);
            url=url.replace(":id", el.dataset.id);
            url=url.replace(":r", Math.random());

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

        } else {
            let data = [{
                title : el.dataset.title,
                author : el.dataset.author,
                url : el.dataset.url,
                pic : el.dataset.pic,
                lrc : el.dataset.lrc
            }];
            build(el, data);
        }
    }

    function build(element, music) {
        let op = [],
        setting = element.dataset;
        op.element = element;
        op.music = music;
        op.showlrc = op.music[0].lrc ? 3 : 0;
        op.narrow = setting.narrow === "true";
        op.autoplay = setting.autoplay === "true";
        op.mutex = setting.mutex !== "false";
        op.mode = setting.mode || "circulation";
        op.preload = setting.preload || "auto";
        op.listmaxheight = setting.listmaxheight || "340px";
        op.theme = setting.theme || "#ad7a86";
        aplayers.push(new APlayer(op));
    }
}, false);
