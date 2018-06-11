const MarkdownIt = require('markdown-it')
const Config = require('./config')
const processingInstruction = require('./rules-block/processing-instruction')

module.exports = class Document {
  constructor (source, config) {
    this.source = source
    this.config = config || new Config()
    this.title = null
    this.markdown = new MarkdownIt(this.config.markdown)
    this.extendMarkdown()
    this.tokenize()
  }

  extendMarkdown () {
    this.markdown.block.ruler.before('html_block', 'processing_instruction', processingInstruction, {})
  }

  tokenize () {
    this.markdown.renderer = new this.config.Renderer()
    this.tokens = this.markdown.parse(this.source)

    this.tokens.forEach((token, i) => {
      if (token.type === 'heading_open') {
        if (!this.title && token.markup === '#') {
          this.title = this.tokens[i + 1].content
        }
      }
    })
  }

  render () {
    const html = this.markdown.renderer.render(this.tokens, this.markdown.options, this)
    return html
  }
}
