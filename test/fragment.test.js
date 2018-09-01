const Fragment = require("../lib/fragment")

describe("Rendering of fragments", () => {
  it("should render", () => {
    const fragment = new Fragment()
    const html = fragment.render()
    expect(html).to.have.selector("div")
  })

  it("should use template of child class", () => {
    const Child = class Child extends Fragment {
      static get template() {
        return '<p class="test"></p>'
      }
    }
    const fragment = new Child()
    const html = fragment.render()
    expect(html).to.have.selector("p.test")
  })

  it("should render more than one root element", () => {
    const fragment = new Fragment()
    fragment.dom.innerHTML = "<div></div><span></span><p></p>"
    const html = fragment.render()
    expect(html).to.have.selector("div + span + p")
  })
})

describe("Instance hooks", () => {
  it("should execute beforeRender hook", () => {
    const fragment = new Fragment()
    fragment.hooks.add("node:beforeRender", "test", function(context) {
      context.element.textContent = "Hook"
    })
    const html = fragment.render()
    expect(html)
      .to.have.selector("div")
      .with.text.to.equal("Hook")
  })

  it("should execute afterRender hook", () => {
    const fragment = new Fragment()
    fragment.hooks.add("node:afterRender", "test", function() {
      return "<p>Hook</p>"
    })
    const html = fragment.render()
    expect(html)
      .to.have.selector("p")
      .with.text.to.equal("Hook")
  })
})
