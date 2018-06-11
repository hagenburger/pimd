const Config = require('../lib/config')
const Fragment = require('../lib/fragment')

describe('Info strings', () => {
  it('should parse simple info strings', () => {
    const infoString = 'test1 test2="my value"'
    const config = new Config()
    const test1Func = sinon.spy()
    const test2Func = sinon.spy()
    config.addInfoStringParser(/test1/, test1Func)
    config.addInfoStringParser(/test2="([^"]+)"/, test2Func)

    config.parseInfoString(infoString, {})

    expect(test1Func).to.have.been.calledWith('test1')
    expect(test2Func).to.have.been.calledWith('test2="my value"', 'my value')
  })

  it('should work with fragments', () => {
    const infoString = 'test3'
    const config = new Config()
    config.addInfoStringParser(/test3/, function (match) {
      this.element.id = 'id1232124'
    })
    const fragment = new Fragment()

    config.parseInfoString(infoString, fragment)
    expect(fragment.render())
      .to.have.selector('div[id="id1232124"]')
  })
})
