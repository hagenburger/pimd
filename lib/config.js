const defaults = require('markdown-it/lib/presets/default')
const Renderer = require('./renderer')

module.exports = class Config {
  constructor () {
    this.markdown = defaults
    this.markdown.options.html = true
    this.markdown.options.langPrefix = 'lang-'
    this.Renderer = Renderer
  }
}
