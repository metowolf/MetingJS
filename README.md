<p align="center">
<img src="https://user-images.githubusercontent.com/2666735/30651452-58ae6c88-9deb-11e7-9e13-6beae3f6c54c.png" alt="Meting">
</p>

<p align="center">
<a href="https://i-meto.com"><img alt="Author" src="https://img.shields.io/badge/Author-METO-blue.svg?style=flat-square"/></a>
<a href="https://www.npmjs.com/package/meting"><img alt="Version" src="https://img.shields.io/npm/v/meting.svg?style=flat-square"/></a>
<a href="https://travis-ci.org/metowolf/MetingJS"><img alt="Travis" src="https://img.shields.io/travis/metowolf/MetingJS.svg?style=flat-square"></a>
<img alt="License" src="https://img.shields.io/npm/l/meting.svg?style=flat-square"/>
</p>

## Requirement

https://github.com/MoePlayer/APlayer

|Version|API Status|APlayer|
|---|---|---|
|1.0.x|Deprecated|[![](https://img.shields.io/badge/APlayer-^1.6.0-red.svg?longCache=true&style=for-the-badge)](https://github.com/MoePlayer/APlayer/tree/1.6.0)|
|1.1.x|Compatibility|[![](https://img.shields.io/badge/APlayer-^1.7.0-green.svg?longCache=true&style=for-the-badge)](https://github.com/MoePlayer/APlayer/tree/1.7.0)|
|1.2.x|Latest|[![](https://img.shields.io/badge/APlayer-^1.10.0-green.svg?longCache=true&style=for-the-badge)](https://github.com/MoePlayer/APlayer)|

## CDN
 - https://cdn.jsdelivr.net/npm/meting@1.2/dist/Meting.min.js
 - https://unpkg.com/meting@1.2/dist/Meting.min.js

## Quick Start
```html
<!-- require APlayer -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.10/dist/APlayer.min.css">
<script src="https://cdn.jsdelivr.net/npm/aplayer@1.10/dist/APlayer.min.js"></script>

<div class="aplayer"
    data-id="60198"
    data-server="netease"
    data-type="playlist">
</div>

<script src="dist/Meting.min.js"></script>
```
https://music.163.com/#/playlist?id=60198

```html
<div class="aplayer"
    data-name="rainymood"
    data-artist="rainymood"
    data-url="https://rainymood.com/audio1110/0.m4a"
    data-cover="https://rainymood.com/i/badge.jpg">
</div>
```
for self-hosted media

```html
<div class="aplayer"
    data-name="广东珠江经济电台"
    data-artist="FM97.4"
    data-url="http://lhttp.qingting.fm/live/1259/64k.mp3"
    data-cover="http://pic.qingting.fm/2015/0209/20150209212831195.jpg!200"
    data-fixed="true">
</div>
```
Fixed mode


## Option

|option               |default      |description|
|:--------------------|:------------:|:----------|
|data-id              |**require**   |song id / playlist id / album id / search keyword|
|data-server          |**require**   |music platform: `netease`, `tencent`, `kugou`, `xiami`, `baidu`|
|data-type            |**require**   |`song`, `playlist`, `album`, `search`, `artist`|
|data-fixed           |`false`       |enable fixed mode|
|data-mini            |`false`       |enable mini mode|
|data-autoplay        |`false`       |audio autoplay|
|data-theme           |`#2980b9`     |main color|
|data-loop            |`all`         |player loop play, values: 'all', 'one', 'none'|
|data-order           |`list`        |player play order, values: 'list', 'random'|
|data-preload         |`auto`        |values: 'none', 'metadata', 'auto'|
|data-volume          |`0.7`         |default volume, notice that player will remember user setting, default volume will not work after user set volume themselves|
|data-mutex           |`true`        |prevent to play multiple player at the same time, pause other players when this player start play|
|data-lrctype         |`0`           |lyric type|
|data-listfolded      |`false`       |indicate whether list should folded at first|
|data-listmaxheight   |`340px`       |list max height|
|data-storagename     |`metingjs`    |localStorage key that store player setting|
|~~data-mode~~        |**deprecated**|Instead `data-loop`, `data-order` should be used|

Documentation for APlayer can be found at https://aplayer.js.org/#/home?id=options

## Advanced

MetingJS allow you to use self-hosted API, [more information about Meting](https://github.com/metowolf/Meting).

```html
<script>
var meting_api='http://example.com/api.php?server=:server&type=:type&id=:id&auth=:auth&r=:r';
</script>

<script src="dist/Meting.min.js"></script>
```

## Author

**MetingJS** © [metowolf](https://github.com/metowolf), Released under the [MIT](./LICENSE) License.<br>

> Blog [@meto](https://i-meto.com) · GitHub [@metowolf](https://github.com/metowolf) · Twitter [@metowolf](https://twitter.com/metowolf) · Telegram Channel [@metooooo](https://t.me/metooooo)
