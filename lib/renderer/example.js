const InfoString = require("../info-string")
const Fragment = require("../fragment")

module.exports = class Example extends Fragment {
  static get template() {
    return '<div class="pimd-example"><div class="pimd-code"><pre><code>'
  }

  static get fragmentType() {
    return "example"
  }

  constructor(renderer, options, content, infoString) {
    super(...arguments)
    this.codeWrapper = this.dom.querySelector(".pimd-code")
    this.code = this.dom.querySelector("code")
    this.info = new InfoString(infoString)
    this.addLangClass()
    if (this.info.additionalInfo) {
      renderer.config.parseInfoString(this.info.additionalInfo, this)
    }
    this.hooks.add("example:beforeRender", "highlight", () => {
      const highlight =
        this.renderer && this.renderer.config && this.renderer.config.highlight
      let code = this.content
      code = this.hooks.run("example:beforeHighlight", this, code)
      let highlightedCode = null
      if (highlight) highlightedCode = highlight(code, this.info.lang)
      if (highlightedCode !== null) {
        code = highlightedCode
      } else {
        this.code.textContent = code
        code = this.code.innerHTML
      }

      this.code.innerHTML = this.hooks.run("example:afterHighlight", this, code)
    })
  }

  addLangClass() {
    if (this.info.lang) {
      const className = (this.options.langPrefix || "") + this.info.lang
      this.code.classList.add(className)
    }
  }
}
