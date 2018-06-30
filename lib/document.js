const MarkdownIt = require('markdown-it')
const Config = require('./config')
const Contents = require('./contents')
const processingInstructionBlock = require('./rules-block/processing-instruction')
const processingInstructionInline = require('./rules-inline/processing-instruction')

module.exports = class Document {
  constructor (source, config) {
    this.source = source
    this.config = config || new Config()
    this.title = null
    this.markdown = new MarkdownIt(this.config.markdown)
    this.extendMarkdown()
    this.tokenize()
    this.contents = new Contents()
  }

  extendMarkdown () {
    this.markdown.block.ruler.before('html_block', 'processing_instruction_block',
      processingInstructionBlock, {})
    this.markdown.inline.ruler.before('html_inline', 'processing_instruction_inline',
      processingInstructionInline, {})
  }

  tokenize () {
    this.markdown.renderer = new this.config.Renderer(this)
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
