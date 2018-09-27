const Config = require('../../lib/config')
const Document = require('../../lib/document')
const plugin = require(".")

//TEST 1 [attribute = value]→ attribute = "value"
describe("Attribute name and value", () => {

  it('should add an attribute name and an attribute value, if value is not quote', () => {
    // Arrange
    const attribute = unindent`
     some content <?: [align=right] ?>
    `
    const doc = new Document(attribute)
    doc.config.use(plugin)
    
    // Act (execute)
    const html = doc.render()
    
    //Assert
    expect(html)
      .to.contain('align="right"')
  })

  //TEST 2 [attribute = "value"] quotation marks must be stripped → attribute = "value"  
  it('should add a value to an attribute when value is double quoted', () => {
    const attribute = unindent`
    some content <?: [align="right"] ?>
    `
    const doc = new Document(attribute)
    doc.config.use(plugin)
    
    const html = doc.render()
    
    expect(html)
      .to.contain('align="right"')
   })

//TEST 3 [attribute = 'value'] quotation marks must be stripped → attribute = "value"
  it('should add a value to an attribute when value is single quoted', () => {
    const attribute = unindent`
    some content <?: [align='right'] ?>
    `
    const doc = new Document(attribute)
    doc.config.use(plugin)

    const html = doc.render()

    expect(html)
      .to.contain('align="right"')
   })

//TEST 4 [attribute = '[value]'] quotation marks must be stripped → attribute = "[value]"
  it('should add a name and a value to an attribute', () => {
    const attribute = unindent`
    some content <?: [align='[right]'] ?>
    `
    const doc = new Document(attribute)
    doc.config.use(plugin)
  
    const html = doc.render()

    expect(html)
      .to.contain('align="[right]"')
  }) 

//TEST 5 [attribute] only the attribute name should be set → attribute
  it('should add only a name to an attribute', () => {
  const attribute = unindent`
  some content <?: [align=[right]] ?>
    `
  const doc = new Document(attribute)
  doc.config.use(plugin)

  const html = doc.render()

  expect(html)
    .to.contain('align=[right]') 
  )
})

