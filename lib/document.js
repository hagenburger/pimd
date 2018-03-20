module.exports = class Document {
  constructor (source) {
    this.source = source
  }

  render () {
    return this.source
  }
}
