const marked = require('marked')
const Renderer = require('./renderer')

module.exports = class Config {
  constructor () {
    this.markedOptions = marked.defaults
    this.markedOptions.renderer = new Renderer(this.markedOptions)
  }
}
