/*!
 * name: @jswork/next-slate-deserialize
 * description: Deserializing html to slate nodes.
 * homepage: https://github.com/afeiship/next-slate-deserialize
 * version: 1.0.7
 * date: 2021-02-02 09:09:21
 * license: MIT
 */

(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var DEFAULT_OPTIONS = {
    type: 'rich',
    process: nx.stubValue
  };
  var DEFAULT_TEXT = {
    rich: [{ type: 'paragraph', children: [{ text: '' }] }],
    text: [{ children: [{ text: '' }] }]
  };

  var NxSlateDeserialize = nx.declare('nx.SlateDeserialize', {
    statics: {
      parse: function (inString, inOptions) {
        var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
        if (!inString) return DEFAULT_TEXT[options.type];
        var document = new DOMParser().parseFromString(inString, 'text/html');
        var processNode = function (el, opt) {
          var el = el || document.body;
          var children = [];
          if (el.nodeType === 3) return el.textContent;
          if (el.nodeType !== 1) return null;

          children = nx.slice(el.childNodes).map(function (node) {
            return processNode(node, opt);
          });
          return opt.process(el, children);
        };

        // buggy code
        var nodes = processNode(document.body, options);
        var len = nodes.length;
        var children = nodes[len - 1].children;
        len > 0 && children && children.push({ text: '' });
        return nodes;
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxSlateDeserialize;
  }
})();
