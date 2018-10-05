const { Document } = require("../..")
const plugin = require(".")

describe("Prism plugin", () => {
  it("should highlight code with default language", () => {
    const input = unindent`
      ~~~html
      <p>
      ~~~
    `
    const doc = new Document(input)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html)
      .to.have.selector("code span.token.punctuation")
      .with.text.to.equal("<")
  })

  it("should highlight code with additional language", () => {
    const input = unindent`
      ~~~markdown
      # H1
      ~~~
    `
    const doc = new Document(input)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html)
      .to.have.selector("code span.token.punctuation")
      .with.text.to.equal("#")
  })

  it("should not highlight code without language specific", () => {
    const input = unindent`
      ~~~
      <p>
      ~~~
    `
    const doc = new Document(input)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html)
      .to.have.selector(".pimd-example code")
      .with.innerHTML.to.equal("&lt;p&gt;")
  })

  it("should not highlight code with unsupported language", () => {
    const input = unindent`
      ~~~superjs
      <p>
      ~~~
    `
    const doc = new Document(input)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html)
      .to.have.selector(".pimd-example code")
      .with.innerHTML.to.equal("&lt;p&gt;")
  })
})
