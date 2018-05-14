const jsdom = require('jsdom')
const { JSDOM } = jsdom

module.exports = class Fragment {
  static get template () {
    return '<div></div>'
  }

  static get hooks () {
    this._hooks = this._hooks || {}
    this._hooks[this.name] = this._hooks[this.name] || {beforeRender: [], afterRender: []}
    return this._hooks[this.name]
  }

  static addHook (type, callback) {
    this.hooks[type].push(callback)
  }

  constructor (options, content) {
    this.options = options
    this.content = content
    this.hooks = Object.assign({}, this.constructor.hooks)
    this.dom = JSDOM.fragment(this.constructor.template)
    this.element = this.dom.firstChild
  }

  addHook (type, callback) {
    this.hooks[type].push(callback)
  }

  render () {
    this._runHooks('beforeRender')
    this.outerHTML = this.element.outerHTML
    this._runHooks('afterRender')
    return this.outerHTML
  }

  _runHooks (type, ...args) {
    this.hooks[type].forEach((callback) => callback.apply(this, args))
  }
}
