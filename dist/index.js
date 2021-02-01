/*!
 * name: @jswork/next-slate-deserialize
 * description: Deserializing html to slate nodes.
 * homepage: https://github.com/afeiship/next-slate-deserialize
 * version: 1.0.2
 * date: 2021-02-01 18:01:11
 * license: MIT
 */

(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var DEFAULT_OPTIONS = {
    process: nx.stubValue
  };

  var NxSlateDeserialize = nx.declare('nx.SlateDeserialize', {
    statics: {
      parse: function (inString, inOptions) {
        var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
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

        return processNode(document.body, options).concat({ text: '' });
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxSlateDeserialize;
  }
})();
