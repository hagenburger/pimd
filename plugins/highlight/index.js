const highlightPlugin = function(config) {
  config.addInfoStringCommand(
    "highlight",
    { types: ["regexp", "string"], multiple: true },
    function(...rules) {
      this.insertions = this.insertions || []
      rules.forEach((rule, i) => {
        this.content.replace(rule, (match, offset) => {
          this.insertAt(
            offset,
            `<u class="pimd-highlight pimd-highlight-${i + 1}">`
          )
          this.insertAt(offset + match.length, "</u>")
        })
      })
    }
  )
}

module.exports = highlightPlugin
