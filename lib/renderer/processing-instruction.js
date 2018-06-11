const Fragment = require('../fragment')

module.exports = class ProcessingInstruction extends Fragment {
  static get template () {
    return ''
  }

  constructor (options, content) {
    super(...arguments)
    this.element = this.renderer.dom.window.document.createTextNode('')
  }
}
