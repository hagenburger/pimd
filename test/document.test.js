const Document = require('../lib/document')

describe('Rendering documents', () => {
  it('should output the input', () => {
    const input = `
      # Test
    `
    const output = `
      # Test
    `
    const doc = new Document(unindent(input))
    const html = doc.render()
    expect(html).to.equal(unindent(output))
  })
})
