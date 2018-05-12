const jsdom = require('jsdom')
const InfoString = require('../info-string')
const { JSDOM } = jsdom

module.exports = class Example {
  constructor (options, source, infoString) {
    this.options = options
    this.source = source
    this.dom = JSDOM.fragment('<div class="pimd-example"><div class="pimd-code"><pre><code>')
    this.element = this.dom.firstChild
    this.codeWrapper = this.dom.querySelector('.pimd-code')
    this.code = this.dom.querySelector('code')
    this.info = new InfoString(infoString)
    this.code.textContent = this.source
    this.addLangClass()
  }

  addLangClass () {
    if (this.info.lang) {
      const className = (this.options.langPrefix || '') + this.info.lang
      this.code.classList.add(className)
    }
  }

  render () {
    return this.element.outerHTML
  }
}
