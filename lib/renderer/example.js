const InfoString = require('../info-string')
const Fragment = require('../fragment')

module.exports = class Example extends Fragment {
  static get template() {
    return '<div class="pimd-example"><div class="pimd-code"><pre><code>'
  }

  constructor(renderer, options, content, infoString) {
    super(...arguments)
    this.codeWrapper = this.dom.querySelector('.pimd-code')
    this.code = this.dom.querySelector('code')
    this.info = new InfoString(infoString)
    this.code.textContent = this.content
    this.addLangClass()
    if (this.info.additionalInfo) {
      renderer.config.parseInfoString(this.info.additionalInfo, this)
    }
  }

  addLangClass() {
    if (this.info.lang) {
      const className = (this.options.langPrefix || '') + this.info.lang
      this.code.classList.add(className)
    }
  }
}
