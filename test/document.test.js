const Document = require('../lib/document')

describe('Rendering documents', () => {
  it('should render HTML out of Markdown', () => {
    const input = unindent`
      # Test
    `
    const output = unindent`
      <h1.*?>Test</h1>
    `
    const doc = new Document(input)
    const html = doc.render()
    expect(html).to.match(new RegExp(output))
  })
})
