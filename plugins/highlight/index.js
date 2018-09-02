const highlightPlugin = function(config) {
  config.addInfoStringParser(/highlight=([^\s]+)/, function(match, rules) {
    this.insertions = this.insertions || []

    rules = rules.split(";")
    rules.forEach(rule => {
      regexpInfo = rule.match(/\/(.+)\/([igm]*)/)
      const regexp = new RegExp(regexpInfo[1], regexpInfo[2])
      this.content.replace(regexp, (match, offset) => {
        this.insertAt(
          offset,
          '<i style="font-style: inherit; background: yellow">'
        )
        this.insertAt(offset + match.length, "</i>")
      })
    })
  })
}

module.exports = highlightPlugin
