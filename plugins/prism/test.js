const { Document } = require("../..")
const plugin = require(".")

describe("Prism plugin", () => {
  it("highlight code with default language", () => {
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

  it("highlight code with additional language", () => {
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
})
