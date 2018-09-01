const Hooks = require("../lib/hooks")

describe("Hooks", () => {
  describe("Calling Hooks", () => {
    it("should call a hook", () => {
      const hooks = new Hooks()
      const testFunc = sinon.spy()
      hooks.add("x", "my-hook", testFunc)

      hooks.run("x", {})
      expect(testFunc).to.have.been.called
    })

    it("should call several hooks", () => {
      const hooks = new Hooks()
      const testFunc1 = sinon.spy()
      hooks.add("x", "my-hook-1", testFunc1)
      const testFunc2 = sinon.spy()
      hooks.add("x", "my-hook-2", testFunc2)

      hooks.run("x", {})
      expect(testFunc1).to.have.been.called
      expect(testFunc2).to.have.been.called
    })

    it("should inherit parent hooks", () => {
      const parentHooks = new Hooks()
      const testFunc1 = sinon.spy()
      parentHooks.add("x", "my-hook-1", testFunc1)
      const hooks = new Hooks(parentHooks)
      const testFunc2 = sinon.spy()
      hooks.add("x", "my-hook-2", testFunc2)

      hooks.run("x", {})
      expect(testFunc1).to.have.been.called
      expect(testFunc2).to.have.been.called
    })

    it("should not run child hooks", () => {
      const parentHooks = new Hooks()
      const testFunc1 = sinon.spy()
      parentHooks.add("x", "my-hook-1", testFunc1)
      const hooks = new Hooks(parentHooks)
      const testFunc2 = sinon.spy()
      hooks.add("x", "my-hook-2", testFunc2)

      parentHooks.run("x", {})
      expect(testFunc1).to.have.been.called
      expect(testFunc2).to.have.not.been.called
    })
  })

  describe("Calling Hooks with return value", () => {
    it("should use the return value", () => {
      const hooks = new Hooks()
      hooks.add("x", "my-hook", (context, string) => string.toUpperCase())
      hooks.add("x", "my-hook", (context, string) => `<p>${string}</p>`)

      const result = hooks.run("x", {}, "test string")
      expect(result).to.equal("<p>TEST STRING</p>")
    })

    it("should inherit parent hooks", () => {
      const parentHooks = new Hooks()
      parentHooks.add("x", "my-hook", (context, string) => string.toUpperCase())
      const hooks = new Hooks(parentHooks)
      hooks.add("x", "my-hook", (context, string) => `<p>${string}</p>`)

      const result = hooks.run("x", {}, "test string")
      expect(result).to.equal("<p>TEST STRING</p>")
    })

    it("should not run child hooks", () => {
      const parentHooks = new Hooks()
      parentHooks.add("x", "my-hook", (context, string) => string.toUpperCase())
      const hooks = new Hooks(parentHooks)
      hooks.add("x", "my-hook", (context, string) => `<p>${string}</p>`)

      const result = parentHooks.run("x", {}, "test string")
      expect(result).to.equal("TEST STRING")
    })
  })
})
