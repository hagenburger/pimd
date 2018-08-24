const Example = require('../../lib/renderer/example')

describe('Rendering of example blocks', () => {
  it('should render', () => {
    const code = new Example({}, {}, 'My code', 'text')
    const html = code.render()
    expect(html)
      .to.have.selector('code')
      .with.text.to.equal('My code')
  })

  it('should escape HTML', () => {
    const code = new Example({}, {}, '<p>My code</p>', 'text')
    const html = code.render()
    expect(html)
      .to.have.selector('code')
      .with.text.to.equal('<p>My code</p>')
    expect(html)
      .to.have.selector('code')
      .with.innerHTML.to.equal('&lt;p&gt;My code&lt;/p&gt;')
  })

  it('should render with class names', () => {
    const code = new Example({}, { langPrefix: 'lang-' }, 'My code', 'mycustomlang')
    const html = code.render()
    expect(html)
      .to.have.selector('.pimd-example .pimd-code pre > code.lang-mycustomlang')
      .with.text.to.equal('My code')
  })

  it('should use a custom lang prefix', () => {
    const code = new Example({}, { langPrefix: 'langlang-' }, 'My code', 'text')
    const html = code.render()
    expect(html).to.have.selector('.pimd-example .pimd-code pre > code.langlang-text')
  })

  it('should ignore lang prefix', () => {
    const code = new Example({}, { langPrefix: undefined }, 'My code', 'text')
    const html = code.render()
    expect(html).to.have.selector('.pimd-example .pimd-code pre > code.text')
  })
})
