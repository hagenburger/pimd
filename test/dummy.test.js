describe('dummy test', () => {
  it('compare a string', () => {
    const input = `
      # Test
    `
    const output = `
      # Test
    `
    expect(unindent(input)).to.equal(unindent(output))
  })
})
