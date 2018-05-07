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

describe('Meta information', () => {
  it('should use the first headline as the title', () => {
    const input = unindent`
      # Hello

      # World
    `
    const doc = new Document(input)
    expect(doc.title).to.equal('Hello')
  })

  it('should not have a title when no headline is used', () => {
    const input = unindent`
      Hello

      World
    `
    const doc = new Document(input)
    expect(doc.title).to.be.null
  })
})
