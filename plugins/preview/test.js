const {Document} = require('../..')
const plugin = require('.')

describe('Info strings', () => {
  it('should add an HTML preview to the example', () => {
    const input = unindent`
      ~~~ html +preview
      <p>Example</p>
      ~~~
    `
    const doc = new Document(input)
    doc.config.use(plugin)
    const html = doc.render()

    expect(html)
      .to.have.selector('.pimd-example > .pimd-preview > p')
      .with.text.to.equal('Example')
  })
})
