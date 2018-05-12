const marked = require('marked')
const Renderer = require('./renderer')

module.exports = class Document {
  constructor (source) {
    this.source = source
    this.title = null
    this.tokenize()
  }

  tokenize () {
    this.tokens = []
    const lexer = new marked.Lexer()
    lexer.rules.fences = /^ *(`{3,}|~{3,})[ .]*(\S+ ?.+?)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/

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
    const renderer = new Renderer()
    const markedOptions = marked.defaults
    markedOptions.renderer = renderer
    const html = marked.parser(this.tokens, markedOptions)
    return html
  }
}
