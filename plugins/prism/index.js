const Prism = require("prismjs")
const loadLanguages = require("prismjs/components/")

module.exports = function(config) {
  config.highlight = function(code, lang) {
    if (!lang) return code
    if (Object.keys(Prism.languages).indexOf(lang) === -1) {
      loadLanguages([lang])
      if (Object.keys(Prism.languages).indexOf(lang) === -1) return code
    }
    return Prism.highlight(code, Prism.languages[lang])
  }
}
