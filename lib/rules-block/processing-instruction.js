var HTML_SEQUENCES = [
  [ /^<\?/, /\?>/, true ]
]

module.exports = function processingInstruction (state, startLine, endLine, silent) {
  let i
  let nextLine
  let token
  let lineText
  let pos = state.bMarks[startLine] + state.tShift[startLine]
  let max = state.eMarks[startLine]

  // If it’s indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

  if (state.src.charCodeAt(pos) !== 0x3C/* < */ ||
      state.src.charCodeAt(pos + 1) !== 0x3F/* ? */) {
    return false
  }

  lineText = state.src.slice(pos, max)

  for (i = 0; i < HTML_SEQUENCES.length; i++) {
    if (HTML_SEQUENCES[i][0].test(lineText)) { break }
  }

  if (i === HTML_SEQUENCES.length) { return false }

  nextLine = startLine + 1

  if (!HTML_SEQUENCES[i][1].test(lineText)) {
    for (; nextLine < endLine; nextLine++) {
      if (state.sCount[nextLine] < state.blkIndent) { break }

      pos = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]
      lineText = state.src.slice(pos, max)

      if (HTML_SEQUENCES[i][1].test(lineText)) {
        if (lineText.length !== 0) { nextLine++ }
        break
      }
    }
  }

  state.line = nextLine

  token = state.push('processing_instruction_block', '', 0)
  token.map = [ startLine, nextLine ]

  let content = state.getLines(startLine, nextLine, state.blkIndent, true)
  content = content.substring(2, content.length - 3)
  token.content = content

  return true
}
