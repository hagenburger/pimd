const {Document} = require('../..')
const plugin = require('.')

describe('ID-plugin', () => {
  it('should add an id to a headline', () => {
    const input = unindent`
      # Test <?: #my-id ?>
    `
    const doc = new Document(input)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html)
      .to.have.selector('h1#my-id')
  })

  it('should add an id to a paragraph', () => {
    const input = unindent`
      p Test <?: #my-id ?>
    `
    const doc = new Document(input)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html)
      .to.have.selector('p#my-id')
  })

  it('should add an id to a code block', () => {
    const input = unindent`
      ~~~ html #my-id
      <p> Lorem ipsum dolor sit amet.</p>
      ~~~
    `
    const doc = new Document(input)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html)
    .to.have.selector('div#my-id')
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