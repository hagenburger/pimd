const Fragment = require('../fragment')

module.exports = class ProcessingInstruction extends Fragment {
  static get template() {
    return ''
  }

  constructor(renderer, options, name, content) {
    super(...arguments)
    this.name = name
    this.content = content
    this.element = this.parentNode
    if (renderer.config.commands[name]) {
      const html = renderer.config.commands[name](this)
      if (html) this.dom.innerHTML = html
    }
  }
}
