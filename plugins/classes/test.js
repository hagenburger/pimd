const { Document } = require('../..')
const plugin = require('.')

describe('Info strings', () => {
  it('should add a class to a headline', () => {
    const input = unindent`
      # Test <?: .my-class ?>
    `
    const doc = new Document(input)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html).to.have.selector('h1.my-class')
  })

  it('should add multiple classes to a paragraph', () => {
    const input = unindent`
      Test <?: .my-class .my-second-class ?>
    `
    const doc = new Document(input)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html).to.have.selector('p.my-class.my-second-class')
  })

  it('should add a class to a code block', () => {
    const input = unindent`
      ~~~ html .my-class
      <p>Lorem</p>
      ~~~
    `
    const doc = new Document(input)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html).to.have.selector('div.my-class')
  })
})
