const marked = require('marked')

module.exports = class Document {
  constructor (source) {
    this.source = source
    this.tokenize()
  }

  tokenize () {
    this.tokens = []
    const lexer = new marked.Lexer()

    lexer.lex(this.source).forEach((token) => {
      this.tokens.push(token)
    })

    this.tokens.links = []
  }

  render () {
    const renderer = new marked.Renderer()
    const markedOptions = marked.defaults
    markedOptions.renderer = renderer
    const html = marked.parser(this.tokens, markedOptions)
    return html
  }
}
