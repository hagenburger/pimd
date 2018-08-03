const {
  Document
} = require('../..');
const plugin = require('.');
describe('Info strings', () => {
  it('should add an ID to a headline', () => {
      const input = unindent `
  # Test <?: #my-id ?>
`;
      const doc = new Document(input);
      doc.config.use(plugin);
      const html = doc.render();
      expect(html)
          .to.have.selector('h1#my-id');
  });
  it('should add an ID to a code block', () => {
      const input = unindent `
  ~~~ html #my-id
  <p>Lorem</p>
  ~~~
`;
      const doc = new Document(input);
      doc.config.use(plugin);
      const html = doc.render();
      expect(html)
          .to.have.selector('div#my-id');
  });
});
