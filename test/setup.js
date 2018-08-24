const jsdom = require("jsdom")
const { JSDOM } = jsdom

const chai = require("chai")
const sinon = require("sinon")
const sinonChai = require("sinon-chai")
chai.use(sinonChai)
global.expect = chai.expect
global.sinon = sinon
global.unindent = require("./helper").unindent

chai.Assertion.addChainableMethod("selector", function(selector) {
  const dom = new JSDOM(this._obj)
  this._obj = dom.window.document.querySelector(selector)
  this.assert(this._obj, `expected to find an element matching \`${selector}\``)
})

chai.Assertion.addProperty("text", function(text) {
  this._obj = this._obj.textContent.trim()
})

chai.Assertion.addProperty("innerHTML", function(text) {
  this._obj = this._obj.innerHTML.trim()
})
