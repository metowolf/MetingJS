class MetingJSElement extends HTMLElement {

  connectedCallback() {
    if (window.APlayer && window.fetch) {
      this._init()
      this._parse()
    }
  }

  disconnectedCallback() {
    if (!this.lock) {
      this.aplayer.destroy()
    }
  }

  _camelize(str) {
    return str
      .replace(/^[_.\- ]+/, '')
      .toLowerCase()
      .replace(/[_.\- ]+(\w|$)/g, (m, p1) => p1.toUpperCase())
  }

  _init() {
    let config = {}
    for (let i = 0; i < this.attributes.length; i += 1) {
      config[this._camelize(this.attributes[i].name)] = this.attributes[i].value
    }
    let keys = [
      'server', 'type', 'id', 'api', 'auth',
      'auto', 'lock',
      'name', 'title', 'artist', 'author', 'url', 'cover', 'pic', 'lyric', 'lrc',
    ]
    for (let key of keys) {
      this[key] = config[key]
      delete config[key]
    }
    this.config = config

    this.api = this.api || window.meting_api || 'https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r'
    if (this.auto) this._parse_link()
  }

  _parse_link() {
    let rules = [
      ['music.163.com.*song.*id=(\\d+)', 'netease', 'song'],
      ['music.163.com.*album.*id=(\\d+)', 'netease', 'album'],
      ['music.163.com.*artist.*id=(\\d+)', 'netease', 'artist'],
      ['music.163.com.*playlist.*id=(\\d+)', 'netease', 'playlist'],
      ['music.163.com.*discover/toplist.*id=(\\d+)', 'netease', 'playlist'],
      ['y.qq.com.*song/(\\w+).html', 'tencent', 'song'],
      ['y.qq.com.*album/(\\w+).html', 'tencent', 'album'],
      ['y.qq.com.*singer/(\\w+).html', 'tencent', 'artist'],
      ['y.qq.com.*playsquare/(\\w+).html', 'tencent', 'playlist'],
      ['y.qq.com.*playlist/(\\w+).html', 'tencent', 'playlist'],
      ['xiami.com.*song/(\\w+)', 'xiami', 'song'],
      ['xiami.com.*album/(\\w+)', 'xiami', 'album'],
      ['xiami.com.*artist/(\\w+)', 'xiami', 'artist'],
      ['xiami.com.*collect/(\\w+)', 'xiami', 'playlist'],
    ]

    for (let rule of rules) {
      let patt = new RegExp(rule[0])
      let res = patt.exec(this.auto)
      if (res !== null) {
        this.server = rule[1]
        this.type = rule[2]
        this.id = res[1]
        return
      }
    }
  }

  _parse() {
    if (this.url) {
      let result = {
        name: this.name || this.title || 'Audio name',
        artist: this.artist || this.author || 'Audio artist',
        url: this.url,
        cover: this.cover || this.pic,
        lrc: this.lrc || this.lyric || '',
        type: this.type || 'auto',
      }
      if (!result.lrc) {
        this.lrcType = 0
      }
      if (this.innerText) {
        result.lrc = this.innerText
        this.lrcType = 2
      }
      this._loadPlayer([result])
      return
    }

    let url = this.api
      .replace(':server', this.server)
      .replace(':type', this.type)
      .replace(':id', this.id)
      .replace(':auth', this.auth)
      .replace(':r', Math.random())

    fetch(url)
      .then(res => res.json())
      .then(result => this._loadPlayer(result))
  }

  _loadPlayer(data) {

    let defaultOption = {
      audio: data,
      mutex: true,
      lrcType: this.lrcType || 3,
      storageName: 'metingjs'
    }

    if (!data.length) return

    let options = {
      ...defaultOption,
      ...this.config,
    }
    for (let optkey in options) {
      if (options[optkey] === 'true' || options[optkey] === 'false') {
        options[optkey] = (options[optkey] === 'true')
      }
    }

    let div = document.createElement('div')
    options.container = div
    this.appendChild(div)

    this.aplayer = new APlayer(options)
  }

}

console.log('\n %c MetingJS v2.0.0 %c https://github.com/metowolf/MetingJS \n', 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;')

if (window.customElements && !window.customElements.get('meting-js')) {
  window.MetingJSElement = MetingJSElement
  window.customElements.define('meting-js', MetingJSElement)
}
