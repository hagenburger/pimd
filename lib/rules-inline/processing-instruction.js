const PI_REG_EXP = /^<\?(.+?)\?>/

module.exports = function processingInstruction (state, startLine, endLine, silent) {
  let pos = state.pos

  if (state.src.charCodeAt(pos) !== 0x3C/* < */ ||
      state.src.charCodeAt(pos + 1) !== 0x3F/* ? */) {
    return false
  }

  const match = state.src.slice(pos).match(PI_REG_EXP)
  if (!match) { return false }

  if (!silent) {
    const token = state.push('processing_instruction_inline', '', 0)

    const inner = match[1]
    const separatorPos = inner.indexOf(' ')
    if (separatorPos === -1) {
      token.name = inner
      token.content = null
    } else {
      token.name = inner.substring(0, separatorPos)
      token.content = inner.substring(separatorPos + 1).trim()
    }
  }

  state.pos += match[0].length
  return true
}
