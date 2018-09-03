const showmorePlugin = function(config) {
  config.addInfoStringParser(/showmore=([^\s]+)/, function(match, rules) {
    this.insertions = this.insertions || []
    const c = this.content.split("\n")
    rules = rules.split(";")
    rules.forEach(rule => {
      let matches = rule.match(/(\d+)(?::(\d+))?(?:-(\d+)(?::(\d+))?)?/)
      let lineStart = Number.parseInt(matches[1])
      let offset = 0
      let lineEnd = matches[3] ? Number.parseInt(matches[3]) : line
      for (let i = 0; i < lineStart - 1; i++) offset += c[i].length + 1
      let indent = c[lineStart - 1].match(/^\s*/)[0] || ""
      let onclick = `this.parentNode.nextSibling.style.display = 'block'; this.parentNode.style.display = 'none'`
      this.insertions.push({
        offset: offset,
        html: `<div>${indent}<button onclick="${onclick}">···</button></div><div style="display: none">`
      })
      for (let i = lineStart - 1; i <= lineEnd - 1; i++)
        offset += c[i].length + 1
      this.insertions.push({
        offset: offset,
        html: "</div>"
      })
    })
  })
}

module.exports = showmorePlugin
