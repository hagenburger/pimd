module.exports = function (config) {
  config.addInfoStringParser(/\[([a-z0-9-]+)(?:=([^\]]+))?\]/i, function (match, name, value) {
    value = value || name
    if (value.match(/^(".*"|'.*')$/)) value = value.substring(1, value.length - 1)
    this.element.setAttribute(name, value)
  })
}

