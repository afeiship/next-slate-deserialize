# next-slate-deserialize
> Deserializing html to slate nodes.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-slate-deserialize
```

## apis
| api   | params | description                |
| ----- | ------ | -------------------------- |
| parse | -      | Parse html to slate nodes. |

## usage
```js
import NxSlateDeserialize from '@jswork/next-slate-deserialize';

const process = (el, children) => {
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

const html = `<p>An opening paragraph with a <a href="https://example.com">link</a> in it.</p><blockquote><p>A wise quote.</p></blockquote><p>A closing paragraph!</p>`;

const nodes = NxSlateDeserialize.parse(html, { process });

/*
[
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
  }
]
*/
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-slate-deserialize/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-slate-deserialize
[version-url]: https://npmjs.org/package/@jswork/next-slate-deserialize

[license-image]: https://img.shields.io/npm/l/@jswork/next-slate-deserialize
[license-url]: https://github.com/afeiship/next-slate-deserialize/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-slate-deserialize
[size-url]: https://github.com/afeiship/next-slate-deserialize/blob/master/dist/next-slate-deserialize.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-slate-deserialize
[download-url]: https://www.npmjs.com/package/@jswork/next-slate-deserialize
