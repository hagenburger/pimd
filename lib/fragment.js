const jsdom = require("jsdom")
const { JSDOM } = jsdom
const Hooks = require("./hooks")

module.exports = class Fragment {
  static get template() {
    return "<div></div>"
  }

  static get fragmentType() {
    return "node"
  }

  constructor(renderer, options, content) {
    this.renderer = renderer
    this.options = options
    this.content = content
    this.dom = JSDOM.fragment("<fragment></fragment>").firstChild
    this.dom.innerHTML = this.constructor.template
    this.element = this.dom.firstChild
    if (renderer) this.parentNode = renderer.currentNode
  }

  get hooks() {
    const parentHooks =
      this.renderer && this.renderer.document && this.renderer.document.hooks
    this._hooks = this._hooks || new Hooks(parentHooks)
    return this._hooks
  }

  append() {
    this.hooks.run(`${this.constructor.fragmentType}:beforeRender`, this)
    this.dom.childNodes.forEach(childNode => {
      this.renderer.currentNode.appendChild(childNode)
    })
  }

  render() {
    this.hooks.run(`${this.constructor.fragmentType}:beforeRender`, this)
    const html = this.hooks.run(
      `${this.constructor.fragmentType}:afterRender`,
      this,
      this.dom.innerHTML
    )
    return html
  }
}
