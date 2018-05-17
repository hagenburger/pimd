const marked = require('marked')
const Config = require('./config')

module.exports = class Document {
  constructor (source, config) {
    this.source = source
    this.config = config || new Config()
    this.title = null
    this.tokenize()
  }

  tokenize () {
    this.tokens = []
    const lexer = new marked.Lexer(this.config.markedOptions)
    if (this.config.markedOptions.gfm) {
      lexer.rules.fences = /^ *(`{3,}|~{3,})[ .]*(\S+ ?.+?)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/
    }

    lexer.lex(this.source).forEach((token) => {
      if (token.type === 'heading') {
        if (!this.title && token.depth === 1) {
          this.title = token.text
        }
      }
      this.tokens.push(token)
    })

    this.tokens.links = []
  }

  render () {
    const html = marked.parser(this.tokens, this.config.markedOptions)
    return html
  }
}
