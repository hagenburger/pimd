module.exports = class Contents {
  constructor() {
    this.contents = {}
  }

  add(what, content) {
    this.contents[what] = this.contents[what] || []
    this.contents[what].push(content)
  }

  get(what) {
    return Promise.all(this.contents[what] || [])
      .then((contents) => contents.map((c) => (typeof c === 'function' ? c() : c)).join(''))
      .catch(console.log.bind(console))
  }
}
