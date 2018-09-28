const helper = require("../lib/helper")

describe("Helper", () => {
  describe("Escaping", () => {
    it("should escape HTML special characters", () => {
      const source = `
        1 < 2 > 0
        A & B
        "''"
      `
      const html = helper.escape(source)
      expect(html)
        .to.match(/1 &lt; 2 &gt; 0/)
        .to.match(/A &amp; B/)
        .to.match(/&quot;&apos;&apos;&quot;/)
    })
  })
})
