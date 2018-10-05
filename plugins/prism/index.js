const Prism = require("prismjs")
const loadLanguages = require("prismjs/components/")

module.exports = function(config) {
  config.highlight = function(code, lang) {
    let isSupportedLanguage = true
    if (!lang) isSupportedLanguage = false
    if (Object.keys(Prism.languages).indexOf(lang) === -1) {
      loadLanguages([lang])
      if (Object.keys(Prism.languages).indexOf(lang) === -1)
        isSupportedLanguage = false
    }
    if (isSupportedLanguage) return Prism.highlight(code, Prism.languages[lang])
    else return null
  }
}
