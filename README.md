<p align="center">
<img src="https://user-images.githubusercontent.com/2666735/30651452-58ae6c88-9deb-11e7-9e13-6beae3f6c54c.png" alt="Meting">
</p>

## Quick Start
```
<div class="aplayer"
    data-id="60198"
    data-server="netease"
    data-type="playlist">
</div>
<script src="dist/Meting.min.js"></script>
```
https://music.163.com/#/playlist?id=60198


## Option

|option|default|description|
|:-----|:-------------:|:----------|
|data-id|**require**|song id / playlist id / album id / search keyword|
|data-server|**require**|music platform: `netease`,`tencent`,`kugou`,`xiami`,`baidu`|
|data-type|**require**|`song`,`playlist`,`album`,`search`,`artist`|
|data-mode|`circulation`|play mode, `circulation`,`random`,`single`,`order`|
|data-autoplay|`false`|autoplay song(s), not supported by mobile browsers|
|data-mutex|`false`|pause other players when this player playing|
|data-listmaxheight|`false`|max height of play list|
|data-preload|`340px`|max height of play list|
|data-theme|`#ad7a86`|theme color|

## Advanced

Use self music API
```
var meting_api='http://example.com/api.php?server=:server&type=:type&id=:id&r=:r';
```
