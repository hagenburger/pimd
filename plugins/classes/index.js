module.exports = function (config) {
  config.addInfoStringParser(/\.([^ ]+)/, function (match, className) {
    this.element.classList.add(className)
  })
}
