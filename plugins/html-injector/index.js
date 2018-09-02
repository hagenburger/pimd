module.exports = function(config) {
  config.hooks.add("example:init", "html-injector", example => {
    example.insertions = []
    example.insertAt = function(offset, html) {
      example.insertions.push({
        offset: offset,
        html: html
      })
    }
  })

  config.hooks.add(
    "example:afterHighlight",
    "html-injector",
    (example, code) => {
      return processInsertions(code, example.insertions)
    }
  )
}

function processInsertions(code, insertions) {
  insertions = insertions.sort(
    (a, b) => (a.offset === b.offset ? 0 : a.offset > b.offset ? 1 : -1)
  )
  let codeWithHighlights = ""
  let offset = 0
  let nextPosition = insertions.shift()
  let insideCharacter = false
  let insideHtml = false

  for (let i = 0; i <= code.length; i++) {
    const character = code[i] || ""
    if (character === "<") {
      insideHtml = true
      if (nextPosition && offset == nextPosition.offset) {
        codeWithHighlights += nextPosition.html
        nextPosition.html = ""
      }
    } else if (insideHtml && character === ">") {
      insideHtml = false
    } else if (!insideHtml) {
      if (nextPosition && offset === nextPosition.offset) {
        codeWithHighlights += nextPosition.html
        nextPosition = insertions.shift()
      }
      if (character === "&") {
        insideCharacter = true
        if (nextPosition && offset == nextPosition.offset) {
          codeWithHighlights += nextPosition.html
          nextPosition.html = ""
        }
      } else if (insideCharacter && character === ";") {
        insideCharacter = false
        offset++
      } else if (!insideCharacter) {
        offset++
      }
    }
    codeWithHighlights += character
  }
  return codeWithHighlights
}
