const {Document} = require('../..')
const plugin = require('.')

describe('Info strings', () => {
  it('should add an id to a headline', () => {
    const input = unindent`
      # Test <?: #myid ?>
    `
    const doc = new Document(input)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html)
      .to.have.selector('h1#myid')
  })

  it('should add an id to a code block', () => {
    const input = unindent`
      ~~~ html #myid
      <p>Lorem</p>
      ~~~
    `
    const doc = new Document(input)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html)
      .to.have.selector('div#myid')
  })

  
  it('should add an id to a table', () => {
    const input = unindent`
      | Table <?: #th-id ?>      | Table                    |
      |-- -- -- -- -- -- -- -- --|-- -- -- -- -- -- -- -- --|
      | Table                    | Table <?: #td-id ?>      |
    `
    const doc = new Document(input)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html)
      .to.have.selector('p#td-id')
  })
  
})
