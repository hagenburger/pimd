const jsdom = require('jsdom')
const marked = require('marked')
const Example = require('./renderer/example')
const { JSDOM } = jsdom

module.exports = class Renderer {
  constructor (options) {
    this.options = options || {}
    const originalRenderers = Object.getOwnPropertyNames(marked.Renderer.prototype)
    originalRenderers.forEach((key) => {
      if (this[key]) return
      this[key] = function () {
        const html = marked.Renderer.prototype[key].apply(this, arguments)
        const dom = JSDOM.fragment(html)
        return dom.firstChild.outerHTML
      }
    })
  }

  text (text) {
    return text
  }

  code (source, infoString, escapedSource) {
    const example = new Example(this.options, source, infoString)
    return example.render()
  }
}
