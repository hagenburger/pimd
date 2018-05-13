const jsdom = require('jsdom')
const { JSDOM } = jsdom

module.exports = class Fragment {
  static get template () {
    return '<div></div>'
  }

  constructor (options, content) {
    this.options = options
    this.content = content
    this.dom = JSDOM.fragment(this.constructor.template)
    this.element = this.dom.firstChild
  }

  render () {
    this.outerHTML = this.element.outerHTML
    return this.outerHTML
  }
}
