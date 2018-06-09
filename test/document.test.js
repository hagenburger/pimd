const Document = require('../lib/document')
const Config = require('../lib/config')

describe('Rendering documents', () => {
  it('should render HTML out of Markdown', () => {
    const input = unindent`
      # Test
    `
    const doc = new Document(input)
    const html = doc.render()
    expect(html)
      .to.have.selector('h1')
      .with.text.to.equal('Test')
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

describe('Code blocks', () => {
  const testBothCodeBlockTypes = (input, callback) => {
    callback(input)
    callback(input.replace(/~~~/g, '```'))
  }

  it('should render a code block', () => {
    const input = unindent`
      ~~~
      My code
      ~~~
    `
    testBothCodeBlockTypes(input, (input) => {
      const doc = new Document(input)
      const html = doc.render()
      expect(html)
        .to.have.selector('pre > code')
        .with.text.to.equal('My code')
    })
  })

  it('should render a code block with language', () => {
    const input = unindent`
      ~~~ html
      <p>My code</p>
      ~~~
    `
    testBothCodeBlockTypes(input, (input) => {
      const doc = new Document(input)
      const html = doc.render()
      expect(html)
        .to.have.selector('pre > code.lang-html')
        .with.text.to.match(/<p>My code<\/p>/)
    })
  })

  it('should render a code block with language as file extension', () => {
    const input = unindent`
      ~~~ my-File_name.html
      <p>My code</p>
      ~~~
    `
    testBothCodeBlockTypes(input, (input) => {
      const doc = new Document(input)
      const html = doc.render()
      expect(html)
        .to.have.selector('pre > code.lang-html')
        .with.text.to.match(/<p>My code<\/p>/)
    })
  })

  it('should render a code block with language and additional info string without issues', () => {
    const input = unindent`
      ~~~ html info string
      <p>My code</p>
      ~~~
    `
    testBothCodeBlockTypes(input, (input) => {
      const doc = new Document(input)
      const html = doc.render()
      expect(html)
        .to.have.selector('pre > code.lang-html')
        .with.text.to.match(/<p>My code<\/p>/)
    })
  })
})

describe('options', () => {
  it('should respect options', () => {
    const input = '<hr>'

    const config1 = new Config()
    config1.markdown.html = true
    let doc1 = new Document(input, config1)
    let html1 = doc1.render()
    expect(html1).to.have.selector('hr')

    const config2 = new Config()
    config1.markdown.html = false
    const doc2 = new Document(input, config2)
    const html2 = doc2.render()
    expect(html2).not.have.selector('hr')
  })
})
