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
    this.infoStringCommands = {}
    this.infoStringParsers = []
    this.loadDefaultCommands()
    this.datatypes = {
      regexp: "(\\/(?:[^\\/\\\\]*(?:\\\\.[^\\/\\\\]*)*)\\/[gmiuy]*)",
      string: '"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"',
      number: "(-?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+-]?\\d+)?)",
      boolean: "(true|false)",
      null: "(null)"
    }
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

  addInfoStringCommand(name, options = {}, func) {
    if (typeof options === "function") {
      func = options
      options = {}
    }
    let regexpString = `^\\+${name}`
    let parameters
    if (options.types) {
      parameters =
        "(" + options.types.map(type => this.datatypes[type]).join("|") + ")"
      if (options.multiple) {
        parameters += `((?:,${parameters})*)`
      }
      regexpString += "=(" + parameters + ")"
    }
    const regexp = new RegExp(regexpString, "g")

    const getArguments = argumentsString => {
      const regexp = new RegExp(parameters)
      const currentArgument = argumentsString.match(regexp)[1]
      const moreArguments = argumentsString.substr(currentArgument.length + 1)
      const argumentsArray = []
      options.types.forEach(type => {
        if (currentArgument.match(new RegExp(`^${this.datatypes[type]}$`))) {
          switch (type) {
            case "regexp":
              argumentsArray.push(
                new RegExp(
                  ...currentArgument.match(/^\/(.*?)\/([gmiuy]*)$/).slice(1)
                )
              )
              break
            default:
              argumentsArray.push(JSON.parse(currentArgument))
          }
        }
      })
      if (moreArguments) {
        argumentsArray.push(...getArguments(moreArguments))
      }
      return argumentsArray
    }

    this.infoStringParsers.push({
      regexp: regexp,
      func: function(...matches) {
        let argumentsString = matches[1]
        let argumentsArray = []
        if (options.types) {
          argumentsArray.push(...getArguments(argumentsString))
        }
        func.call(this, ...argumentsArray)
      }
    })
  }

  parseInfoString(infoString, target) {
    if (!infoString) return
    let keepGoing = true
    while (infoString.length && keepGoing) {
      keepGoing = false
      infoString = infoString.trimLeft()
      let infoStringBefore = infoString
      this.infoStringParsers.forEach(parser => {
        infoString = infoString.replace(parser.regexp, (...matches) => {
          keepGoing = true
          parser.func.apply(target, matches)
          return ""
        })
      })
      if (infoString === infoStringBefore) {
        const spacePosition = infoString.indexOf(" ")
        if (spacePosition !== -1) {
          const unknown = infoString.substr(0, spacePosition)
          console.warn(`Unknown part in info string found: ${unknown}.`)
          infoString = infoString.substr(infoString.indexOf(" ") + 1)
          keepGoing = true
        }
      }
    }
  }
}
