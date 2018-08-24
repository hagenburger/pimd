module.exports = function(config) {
  config.addInfoStringParser(/\+preview/, function() {
    const element = this.renderer.dom.window.document.createElement('div')
    element.classList.add('pimd-preview')
    element.innerHTML = this.content
    this.element.insertBefore(element, this.codeWrapper)
  })
}
