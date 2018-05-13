const Fragment = require('../lib/fragment')

describe('Rendering of fragments', () => {
  it('should render', () => {
    const fragment = new Fragment()
    const html = fragment.render()
    expect(html).to.have.selector('div')
  })

  it('should use template of child class', () => {
    const Child = class Child extends Fragment {
      static get template () {
        return '<p class="test"></p>'
      }
    }
    const fragment = new Child()
    const html = fragment.render()
    expect(html).to.have.selector('p.test')
  })
})
