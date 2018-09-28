const { Document } = require("../..")
const plugin = require(".")
const Config = require("../../lib/config")

describe("HTML injector", () => {
  it("should insert HTML at specific offsets", () => {
    const input = unindent`
      ~~~ html
      <p>Example</p>
      ~~~
    `
    const config = new Config()
    config.highlight = () => "<b>&lt;p&gt;</b>Example&lt;/p&gt;"
    const doc = new Document(input, config)
    doc.config.use(plugin)
    doc.hooks.add("example:beforeRender", "test", example => {
      // Offsets before highlighting:
      // <p>Example</p>
      // 01234567890123
      example.insertAt(5, "</i>")
      example.insertAt(4, "<i>")
    })
    const html = doc.render()
    expect(html)
      .to.have.selector(".pimd-example code")
      .with.innerHTML.to.equal("<b>&lt;p&gt;</b>E<i>x</i>ample&lt;/p&gt;")
    // Offsets after highlighting:
    // <b>&lt;p&gt;</b>E<i>x</i>ample&lt;/p&gt;
    // ...0___12___....3...4....567890___123___
  })
})
