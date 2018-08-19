const unindent = function() {
  arguments[0] = { raw: arguments[0] }
  const string = String.raw(...arguments)
    .replace(/^ *\n/, "")
    .replace(/\n *$/, "")
  const allIndents = string.match(/^ *(?!\n)/gm)
  const shortestIndent = allIndents.sort()[0]
  return string.replace(new RegExp(`^${shortestIndent}`, "gm"), "")
}

module.exports = {
  unindent: unindent
}
