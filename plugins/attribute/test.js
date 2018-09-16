const Config = require('../lib/config')
const Document = require('../lib/document')

 describe('Attributes', () => {
//TEST 1 [attribute = value]→ attribute = "value"
  it('should add a value to an attribute', () => {
    const attribute = unindent`
     # Test <?: [title="Headline title"] ?>
    `
    const doc = new Document(attribute)
    doc.config.use(plugin)
    const html = doc.render()
    expect(html)
      .to.have.selector('title="Headline title"'),
  })


//TEST 2 [attribute = "value"] quotation marks must be stripped → attribute = "value"
    
   xit('should add a value to an attribute', () => {
     const attribute = "value"`
      attribute Test <?: #myvalue ?>
    `
     const doc = new Document(attribute)
     doc.config.use(plugin)
     const html = doc.render()
     expect(html)
       .to.have.selector('attribute#myvalue')
   })

//TEST 3 [attribute = 'value'] quotation marks must be stripped → attribute = "value"

   xit('should add a value to an attribute', () => {
     const attribute = "value"`
      attribute Test <?: #myvalue ?>
    `
     const doc = new Document(attribute)
     doc.config.use(plugin)
     const html = doc.render()
     expect(html)
       .to.have.selector('attribute#myvalue')
   })

//TEST 4 [attribute = '[value]'] quotation marks must be stripped → attribute = "[value]"

   xit('should add a value to an attribute', () => {
     const attribute = "value"`
      attribute Test <?: #myvalue ?>
    `
     const doc = new Document(attribute)
     doc.config.use(plugin)
     const html = doc.render()
     expect(html)
       .to.have.selector('attribute#myvalue')
   }) 

//TEST 5 [attribute] only the attribute name should be set → attribute

   xit('should add a value to an attribute', () => {
     const attribute = "value"`
      attribute Test <?: #myvalue ?>
    `
     const doc = new Document(attribute)
     doc.config.use(plugin)
     const html = doc.render()
     expect(html)
       .to.have.selector('attribute#myvalue')
   })
