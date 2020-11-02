"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _prosemirrorModel = require("prosemirror-model");

const DOM_ATTRIBUTE_PAGE_BREAK = 'data-page-break';

function getAttrs(dom) {
  const attrs = {};

  if (dom.getAttribute(DOM_ATTRIBUTE_PAGE_BREAK) || dom.style.pageBreakBefore === 'always') {
    // Google Doc exports page break as HTML:
    // `<hr style="page-break-before:always;display:none; />`.
    attrs.pageBreak = true;
  }

  return attrs;
}

const HorizontalRuleNode = {
  attrs: {
    pageBreak: {
      default: null
    }
  },
  group: 'block',
  parseDOM: [{
    tag: 'hr',
    getAttrs
  }],

  toDOM(node) {
    const domAttrs = {};

    if (node.attrs.pageBreak) {
      domAttrs[DOM_ATTRIBUTE_PAGE_BREAK] = 'true';
    }

    return ['hr', domAttrs];
  }

};
var _default = HorizontalRuleNode;
exports.default = _default;