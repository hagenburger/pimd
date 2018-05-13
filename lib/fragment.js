const jsdom = require('jsdom')
const { JSDOM } = jsdom

module.exports = class Fragment {
  static get template () {
    return '<div></div>'
  }

  constructor (options, content) {
    this.options = options
    this.content = content
    this.hooks = {beforeRender: [], afterRender: []}
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
