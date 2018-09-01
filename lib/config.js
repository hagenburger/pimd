const defaults = require("markdown-it/lib/presets/default")
const Hooks = require("./hooks")
const Renderer = require("./renderer")

module.exports = class Config {
  constructor() {
    this.markdown = defaults
    this.markdown.options.html = true
    this.markdown.options.langPrefix = "lang-"
    this.Renderer = Renderer
    this.commands = {}
    this.infoStringParsers = []
    this.loadDefaultCommands()
  }

  get hooks() {
    this._hooks = this._hooks || new Hooks()
    return this._hooks
  }

  loadDefaultCommands() {
    this.commands[":"] = function(pi) {
      pi.renderer.config.parseInfoString(pi.content.trim(), pi)
    }
  }

  use(plugin) {
    plugin.call(this, this)
  }

  addInfoStringParser(regexp, func) {
    this.infoStringParsers.push({ regexp: regexp, func: func })
  }

  parseInfoString(infoString, target) {
    if (!infoString) return
    let keepGoing = true
    while (infoString.length && keepGoing) {
      keepGoing = false
      infoString = infoString.trimLeft()
      this.infoStringParsers.forEach(parser => {
        infoString = infoString.replace(parser.regexp, (...matches) => {
          keepGoing = true
          parser.func.apply(target, matches)
          return ""
        })
      })
    }
  }
}
