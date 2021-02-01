(function () {
  const NxSlateDeserialize = require('../src');
  const { jsx } = require('slate-hyperscript');

  describe('NxSlateDeserialize.methods', function () {
    test('slate parse(deserialize) html to nodes', () => {
      var process = (el, children) => {
        switch (el.nodeName) {
          case 'BODY':
            return jsx('fragment', {}, children);
          case 'BR':
            return '\n';
          case 'BLOCKQUOTE':
            return jsx('element', { type: 'quote' }, children);
          case 'P':
            return jsx('element', { type: 'paragraph' }, children);
          case 'A':
            return jsx('element', { type: 'link', url: el.getAttribute('href') }, children);
          default:
            return el.textContent;
        }
      };

      var html = `<p>An opening paragraph with a <a href="https://example.com">link</a> in it.</p><blockquote><p>A wise quote.</p></blockquote><p>A closing paragraph!</p>`;
      var nodes = NxSlateDeserialize.parse(html, { process });

      expect(nodes).toEqual([
        {
          type: 'paragraph',
          children: [
            { text: 'An opening paragraph with a ' },
            {
              type: 'link',
              url: 'https://example.com',
              children: [{ text: 'link' }]
            },
            { text: ' in it.' }
          ]
        },
        {
          type: 'quote',
          children: [
            {
              type: 'paragraph',
              children: [{ text: 'A wise quote.' }]
            }
          ]
        },
        {
          type: 'paragraph',
          children: [{ text: 'A closing paragraph!' }]
        },
        { text: '' }
      ]);
    });
  });
})();
