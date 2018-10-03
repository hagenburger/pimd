const { Document } = require("../..")
const plugin = require(".")

describe("Allinc", () => {
  it("should have all plugins loaded", () => {
    const input = unindent`
      # Test <?: .my-class #my-id ?>

      ~~~html +preview +highlight="x" +showmore=1
      <p>x</p>
      ~~~
    `
    const doc = new Document(input)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html).to.have.selector("h1.my-class")
    expect(html).to.have.selector("h1#my-id")
    expect(html).to.have.selector(".pimd-preview p")
    expect(html).to.have.selector(".pimd-highlight")
    expect(html).to.have.selector(".pimd-example div[style='display: none']")
    expect(html).to.have.selector("code span.token.punctuation")
  })
})
