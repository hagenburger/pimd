module.exports = function (config) {
  config.addInfoStringParser(/#([^ ]+)/, function (match, id) {
      this.element.id = id;
    })
}
