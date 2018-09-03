const { Document } = require("../..")
const htmlInjector = require("../html-injector")
const plugin = require(".")

describe("Highlighter plugin", () => {
  it("should hide lines", () => {
    const input = unindent`
      ~~~ html showmore=3-4
      <ul>
        <li>Visible</li>
        <li>Hidden</li>
        <li>Hidden</li>
      </ul>
      ~~~
    `
    const doc = new Document(input)
    doc.config.use(htmlInjector)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html)
      // TODO: Write helper to imporve this test and avoid dependency on a <div>:
      .to.have.selector(".pimd-example div[style='display: none']")
      .with.text.to.match(/Hidden(.|\n)+Hidden/m)
  })
})
