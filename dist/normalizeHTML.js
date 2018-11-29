'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeHTML;

var _patchElementInlineStyles = require('./patchElementInlineStyles');

var _patchElementInlineStyles2 = _interopRequireDefault(_patchElementInlineStyles);

var _patchListElements = require('./patchListElements');

var _patchListElements2 = _interopRequireDefault(_patchListElements);

var _patchStyleElements = require('./patchStyleElements');

var _patchStyleElements2 = _interopRequireDefault(_patchStyleElements);

var _patchTableElements = require('./patchTableElements');

var _patchTableElements2 = _interopRequireDefault(_patchTableElements);

var _BodyNodeSpec = require('./BodyNodeSpec');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BRAILLE_PATTERN_BLANK = '\u2800';

function normalizeHTML(html) {
  var body = null;

  // All space characters will be collapsed. That said, `&nbsp;` should
  // be replace by "\u2800" so we could keep the blank space visible.
  html = html.replace(/(\s*\&nbsp;\s*\&nbsp;\s*)/g, BRAILLE_PATTERN_BLANK);

  var sourceIsPage = /<body[\s>]/i.test(html);
  // if (/<body[\s>]/i.test(html) === false) {
  //   html = `<!doctype><html><body>${html}</body></html>`;
  // }

  // Provides a dom node that will not execute scripts
  // https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation.createHTMLDocument
  // https://developer.mozilla.org/en-US/Add-ons/Code_snippets/HTML_to_DOM
  if (typeof document !== 'undefined' && document.implementation && document.implementation.createHTMLDocument) {
    var doc = document.implementation.createHTMLDocument('');
    doc.open();
    doc.write(html);
    doc.close();
    (0, _patchStyleElements2.default)(doc);
    (0, _patchElementInlineStyles2.default)(doc);
    (0, _patchListElements2.default)(doc);
    (0, _patchTableElements2.default)(doc);
    body = doc.getElementsByTagName('body')[0];

    if (body && sourceIsPage) {
      // Source HMTL contains <body />, assumes thsi to be a complete
      // page HTML.
      var cssText = body.style.cssText;

      if (cssText) {
        var editorBody = doc.createElement(_BodyNodeSpec.TAG_NAME);
        editorBody.style.cssText = cssText;
        editorBody.innerHTML = body.innerHTML;
        body = doc.createElement('body');
        body.appendChild(editorBody);
      }
    }
  }

  if (!body) {
    // <body /> should alway be generated by doc.
    return 'Unsupported HTML content';
  }

  html = body.innerHTML;
  return html;
}