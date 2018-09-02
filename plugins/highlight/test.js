const { Document } = require("../..")
const htmlInjector = require("../html-injector")
const plugin = require(".")

describe("Highlighter plugin", () => {
  it("should highlight a given string", () => {
    const input = unindent`
      ~~~ html +highlight=/my-class/
      <p class="my-class">Example</p>
      ~~~
    `
    const doc = new Document(input)
    doc.config.use(htmlInjector)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html)
      .to.have.selector(".pimd-example code .pimd-highlight")
      .with.text.to.equal("my-class")
  })

  it("should highlight a RegExp", () => {
    const input = unindent`
      ~~~ html +highlight=/my-\\w+/
      <p class="my-class">Example</p>
      ~~~
    `
    const doc = new Document(input)
    doc.config.use(htmlInjector)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html)
      .to.have.selector(".pimd-example code .pimd-highlight")
      .with.text.to.equal("my-class")
  })

  it("should use RegExp modifiers", () => {
    const input = unindent`
      ~~~ html +highlight=/my-\\w+/i
      <p class="MY-CLASS">Example</p>
      ~~~
    `
    const doc = new Document(input)
    doc.config.use(htmlInjector)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html)
      .to.have.selector(".pimd-example code .pimd-highlight")
      .with.text.to.equal("MY-CLASS")
  })

  it("should use multiple RegExp", () => {
    const input = unindent`
      ~~~ html +highlight=/my-\\w+/i,/other-class/
      <p class="MY-CLASS other-class">Example</p>
      ~~~
    `
    const doc = new Document(input)
    doc.config.use(htmlInjector)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html)
      .to.have.selector(".pimd-example code .pimd-highlight")
      .with.text.to.equal("MY-CLASS")
    expect(html)
      .to.have.selector(".pimd-example code .pimd-highlight + .pimd-highlight")
      .with.text.to.equal("other-class")
  })
})
