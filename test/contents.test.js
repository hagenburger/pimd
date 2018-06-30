const Contents = require('../lib/contents')

describe('Storing contents', () => {
  it('should store a content', (done) => {
    const contents = new Contents()
    contents.add('css', 'p { color: red; }')
    contents.get('css').then((css) => {
      expect(css).to.equal('p { color: red; }')
      done()
    })
  })

  it('should store multiple contents of the same kind', (done) => {
    const contents = new Contents()
    contents.add('css', 'p { color: blue; }')
    contents.add('css', 'a { text-decoration: none; }')
    contents.get('css').then((css) => {
      expect(css).to.include('p { color: blue; }')
      expect(css).to.include('a { text-decoration: none; }')
      done()
    })
  })

  it('should accept promises', (done) => {
    const contents = new Contents()
    contents.add('css', 'p { color: green; }')
    contents.add('css', new Promise((resolve, reject) => {
      resolve('h1 { font-weight: bold }')
    }))
    contents.get('css').then((css) => {
      expect(css).to.include('p { color: green; }')
      expect(css).to.include('h1 { font-weight: bold }')
      done()
    })
  })

  it('should store contents of a different kind', (done) => {
    const contents = new Contents()
    contents.add('css', 'p { color: pink; }')
    contents.add('css', 'table { border-spacing: 0; }')
    contents.add('javascript', 'alert("Hello world!")')
    contents.get('css').then((css) => {
      expect(css).to.include('p { color: pink; }')
      expect(css).to.include('table { border-spacing: 0; }')
      expect(css).to.not.include('alert("Hello world!")')
      contents.get('javascript').then((javascript) => {
        expect(javascript).to.not.include('p { color: pink; }')
        expect(javascript).to.not.include('table { border-spacing: 0; }')
        expect(javascript).to.include('alert("Hello world!")')
        done()
      })
    })
  })
})
