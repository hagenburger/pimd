const InfoString = require('../lib/info-string')

describe('Info strings', () => {
  it('should parse nothing', () => {
    const infoString = new InfoString()
    expect(infoString.lang).to.be.null
    expect(infoString.filename).to.be.null
    expect(infoString.infos).to.be.an('array').that.is.empty
  })

  it('should parse empty string', () => {
    const infoString = new InfoString('')
    expect(infoString.lang).to.be.null
    expect(infoString.filename).to.be.null
    expect(infoString.infos).to.be.an('array').that.is.empty
  })

  it('should parse a simple language', () => {
    const infoString = new InfoString('html')
    expect(infoString.lang).to.equal('html')
    expect(infoString.filename).to.be.null
    expect(infoString.infos).to.be.an('array').that.is.empty
  })

  it('should parse another simple language', () => {
    const infoString = new InfoString('javascript')
    expect(infoString.lang).to.equal('javascript')
    expect(infoString.filename).to.be.null
    expect(infoString.infos).to.be.an('array').that.is.empty
  })

  it('should ignore case for languages', () => {
    const infoString = new InfoString('JavaScript')
    expect(infoString.lang).to.equal('javascript')
    expect(infoString.filename).to.be.null
    expect(infoString.infos).to.be.an('array').that.is.empty
  })

  it('should parse infos', () => {
    const infoString = new InfoString('javascript info1 info2')
    expect(infoString.lang).to.equal('javascript')
    expect(infoString.filename).to.be.null
    expect(infoString.infos).to.have.lengthOf(2)
  })

  it('should parse infos with filename', () => {
    const infoString = new InfoString('test.js info1 info2')
    expect(infoString.lang).to.equal('js')
    expect(infoString.filename).to.equal('test.js')
    expect(infoString.infos).to.have.lengthOf(2)
    expect(infoString.infos).to.include.ordered.members(['info1', 'info2'])
  })

  it('should parse various filenames', () => {
    const tests = [
      'test.js', 'test2.js', 'test_3.js', 'test-4.js', 'test.5.js', 'TEST6.js',
      'te/st7.js', '.test9', 'test10.c', '11.test.js', 'test12.sketch',
      'test13.123', 'test14.ABC', '~/test.15'
    ]
    tests.forEach((test) => {
      let infoString = new InfoString(test)
      expect(infoString.filename).to.equal(test)
      infoString = new InfoString(`${test} info1 info2`)
      expect(infoString.filename).to.equal(test)
    })
  })
})
