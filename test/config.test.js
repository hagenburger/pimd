const Config = require("../lib/config")
const Fragment = require("../lib/fragment")

describe("Info strings", () => {
  it("should parse simple info strings", () => {
    const infoString = 'test1 test2="my value"'
    const config = new Config()
    const test1Func = sinon.spy()
    const test2Func = sinon.spy()
    config.addInfoStringParser(/test1/, test1Func)
    config.addInfoStringParser(/test2="([^"]+)"/, test2Func)

    config.parseInfoString(infoString, {})

    expect(test1Func).to.have.been.calledWith("test1")
    expect(test2Func).to.have.been.calledWith('test2="my value"', "my value")
  })

  it("should work with fragments", () => {
    const infoString = "test3"
    const config = new Config()
    config.addInfoStringParser(/test3/, function(match) {
      this.element.id = "id1232124"
    })
    const fragment = new Fragment()

    config.parseInfoString(infoString, fragment)
    expect(fragment.render()).to.have.selector('div[id="id1232124"]')
  })

  it("should not mix up info strings", () => {
    // This test makes sure the periods between 1 and 2 won’t call test1Func
    const infoString = "+showmoretest=34..56 .testclass"
    const config = new Config()
    const test1Func = sinon.spy()
    const test2Func = sinon.spy()
    config.addInfoStringParser(/\..+/, test1Func)
    config.addInfoStringCommand("showmoretest", { types: ["range"] }, test2Func)

    config.parseInfoString(infoString, {})

    expect(test2Func).to.have.been.calledWith("34..56")
    expect(test1Func).to.have.been.calledWith(".testclass")
  })
})

describe("Info string commands", () => {
  it("should add commands to info strings", () => {
    const infoString = "xx +test4 xx"
    const config = new Config()
    config.addInfoStringCommand("test4", function(match) {
      this.element.id = "id4"
    })
    const fragment = new Fragment()

    config.parseInfoString(infoString, fragment)
    expect(fragment.render()).to.have.selector('div[id="id4"]')
  })

  it("should add commands to info strings with regexp", () => {
    const infoString = "xx +test5=/ab\\/c/g xx"
    const config = new Config()
    const func = sinon.spy()
    config.addInfoStringCommand("test5", { types: ["regexp"] }, func)
    const fragment = new Fragment()

    config.parseInfoString(infoString, fragment)
    expect(func).to.have.been.calledWith(/ab\/c/g)
  })

  it("should add commands to info strings with double quote string", () => {
    const infoString = 'xx +test7="ab\\"c" xx'
    const config = new Config()
    const func = sinon.spy()
    config.addInfoStringCommand("test7", { types: ["string"] }, func)
    const fragment = new Fragment()

    config.parseInfoString(infoString, fragment)
    expect(func).to.have.been.calledWith('ab"c')
  })

  it("should add commands to info strings with number", () => {
    const infoString = "xx +test9=-1234.5 xx"
    const config = new Config()
    const func = sinon.spy()
    config.addInfoStringCommand("test9", { types: ["number"] }, func)
    const fragment = new Fragment()

    config.parseInfoString(infoString, fragment)
    expect(func).to.have.been.calledWith(-1234.5)
  })

  it("should add commands to info strings with true", () => {
    const infoString = "xx +test10=true xx"
    const config = new Config()
    const func = sinon.spy()
    config.addInfoStringCommand("test10", { types: ["boolean"] }, func)
    const fragment = new Fragment()

    config.parseInfoString(infoString, fragment)
    expect(func).to.have.been.calledWith(true)
  })

  it("should add commands to info strings with false", () => {
    const infoString = "xx +test11=false xx"
    const config = new Config()
    const func = sinon.spy()
    config.addInfoStringCommand("test11", { types: ["boolean"] }, func)
    const fragment = new Fragment()

    config.parseInfoString(infoString, fragment)
    expect(func).to.have.been.calledWith(false)
  })

  it("should add commands to info strings with null", () => {
    const infoString = "xx +test12=null xx"
    const config = new Config()
    const func = sinon.spy()
    config.addInfoStringCommand("test12", { types: ["null"] }, func)
    const fragment = new Fragment()

    config.parseInfoString(infoString, fragment)
    expect(func).to.have.been.calledWith(null)
  })

  it("should add commands to info strings with multiple values", () => {
    const infoString = "xx +test13=23,/a,b,c/gi,true xx"
    const config = new Config()
    const func = sinon.spy()
    config.addInfoStringCommand(
      "test13",
      { types: ["boolean", "number", "regexp"], multiple: true },
      func
    )
    const fragment = new Fragment()

    config.parseInfoString(infoString, fragment)
    expect(func).to.have.been.calledWith(23, /a,b,c/gi, true)
  })
})

describe("Pluings", () => {
  it("should load plugins", () => {
    const testFunction = function(pi) {
      return "Plugin loaded"
    }
    const plugin = function(config) {
      config.commands["plugintest"] = testFunction
    }
    const config = new Config()
    config.use(plugin)
    expect(config.commands).to.include(testFunction)
  })
})
