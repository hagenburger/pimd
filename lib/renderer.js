const jsdom = require("jsdom")
const MarkdownItRenderer = require("markdown-it/lib/renderer")
const Example = require("./renderer/example")
const ProcessingInstruction = require("./renderer/processing-instruction")
const { JSDOM } = jsdom

module.exports = class Renderer extends MarkdownItRenderer {
  constructor(document) {
    super()
    this.document = document
    this.config = document.config
    this.dom = new JSDOM()
    this.contentNode = this.dom.window.document.querySelector("body")
    this.currentNode = this.contentNode

    this.rules["text"] = function(tokens, idx, options, env, renderer) {
      const textNode = renderer.dom.window.document.createTextNode(
        tokens[idx].content
      )
      renderer.currentNode.appendChild(textNode)
    }

    this.rules["fence"] = function(tokens, idx, options, env, renderer) {
      const token = tokens[idx]
      const example = new Example(
        renderer,
        options,
        token.content,
        token.info.trim()
      )
      example.append()
    }

    this.rules["processing_instruction_block"] = function(
      tokens,
      idx,
      options,
      env,
      renderer
    ) {
      const token = tokens[idx]
      const example = new ProcessingInstruction(
        renderer,
        options,
        token.name,
        token.content
      )
      example.append()
    }

    this.rules["processing_instruction_inline"] = function(
      tokens,
      idx,
      options,
      env,
      renderer
    ) {
      const token = tokens[idx]
      const example = new ProcessingInstruction(
        renderer,
        options,
        token.name,
        token.content
      )
      example.append()
    }
  }

  render(tokens, options, env) {
    this.renderInline(tokens, options, env)
    return this.contentNode.innerHTML
  }

  renderDocument(tokens, options, env) {
    this.renderInline(tokens, options, env)
    return new Promise((resolve, reject) => {
      Promise.all([
        new Promise((resolve, reject) => {
          this.document.contents.get("css").then(css => {
            const element = this.dom.window.document.createElement("style")
            element.textContent = css
            this.dom.window.document.querySelector("head").appendChild(element)
            resolve()
          })
        }),
        new Promise((resolve, reject) => {
          this.document.contents.get("javascript").then(javascript => {
            const element = this.dom.window.document.createElement("script")
            element.textContent = javascript
            this.dom.window.document.querySelector("head").appendChild(element)
            resolve()
          })
        })
      ]).then(() => {
        resolve(this.dom.serialize())
      })
    })
  }

  renderInline(tokens, options, env) {
    let i
    let len
    let rules = this.rules
    const stack = []

    for (i = 0, len = tokens.length; i < len; i++) {
      let token = tokens[i]
      let type = token.type
      let hidden = token.hidden

      if (type.match(/_open$/) && !hidden) {
        stack.push(this.currentNode)
        const nextNodeHTML = this.renderToken(tokens, i, options, env)
        const nextNode = JSDOM.fragment(nextNodeHTML).firstChild
        if (nextNode) {
          this.currentNode.appendChild(nextNode)
          this.currentNode = nextNode
        }
      } else if (type.match(/_close$/) && !hidden) {
        this.currentNode = stack.pop()
      } else {
        let html
        if (type === "inline") {
          html = this.renderInline(token.children, options, env)
        } else if (typeof rules[type] !== "undefined") {
          html = rules[token.type](tokens, i, options, env, this)
        }
        if (typeof html === "string") {
          this.currentNode.appendChild(JSDOM.fragment(html))
        }
      }
    }
  }
}
