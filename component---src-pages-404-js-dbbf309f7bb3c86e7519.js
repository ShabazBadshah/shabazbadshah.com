(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "mD08":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ link_button; });

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js
var styled_components_browser_esm = __webpack_require__("vOnD");

// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js
var gatsby_browser_entry = __webpack_require__("Wbzz");

// EXTERNAL MODULE: ./src/assets/media-query-sizes.js
var media_query_sizes = __webpack_require__("zCNn");

// CONCATENATED MODULE: ./src/components/buttons/link-button.js
var link_button_LinkButton=function LinkButton(_ref){var text=_ref.text,linkToMoveTo=_ref.linkToMoveTo;return/*#__PURE__*/react_default.a.createElement(StyledLinkButton,{to:linkToMoveTo},text);};link_button_LinkButton.defaultProps={linkToMoveTo:'/'};/* harmony default export */ var link_button = (link_button_LinkButton);var StyledLinkButton=Object(styled_components_browser_esm["c" /* default */])(gatsby_browser_entry["Link"]).withConfig({displayName:"link-button__StyledLinkButton",componentId:"sc-8j2oab-0"})(["display:block;align-self:center;width:50%;text-decoration:none;font-size:1.2em;background-color:",";color:#f9f8f7;box-shadow:",";padding:0.6rem 1rem;border:",";border-radius:4px;margin:1rem 2rem 0 0;letter-spacing:0.04rem;text-align:center;transition:all 100ms ease-in;&:hover{border:",";color:",";background-color:",";transform:translateY(-0.2rem);transition:all 100ms ease-out;}@media ","{width:100%;margin:1rem 0 0 0;padding:0.7rem 1rem;}"],function(props){return props.theme.primaryThemeColour;},function(props){return props.theme.linkButtonBorder;},function(props){return"1.5px "+props.theme.primaryThemeColour+" solid";},function(props){return props.theme.linkButtonHoverBorder;},function(props){return props.theme.linkButtonTextColour;},function(props){return props.theme.linkButtonHoverColour;},media_query_sizes["a" /* deviceMaxWidth */].mobileL);
// CONCATENATED MODULE: ./src/components/buttons/index.js


/***/ }),

/***/ "w2l6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("vOnD");
/* harmony import */ var react_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("l2P8");
/* harmony import */ var react_animations__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_animations__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_layouts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Knq1");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("jNNy");
/* harmony import */ var _assets_media_query_sizes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("zCNn");
/* harmony import */ var _components_buttons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("mD08");
/* eslint-disable react/no-unescaped-entities */ /* eslint-disable jsx-a11y/accessible-emoji */var NotFoundPage=function NotFoundPage(){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_layouts__WEBPACK_IMPORTED_MODULE_3__[/* Layout */ "a"],null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_seo__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"],{title:"404"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Styled404Section,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Styled404Wrapper,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledH1,null,"\uD83D\uDE10 404 Page Not Found!"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledParagraph,null,"\"Um.......I swear this page was working on my computer. I'll add this bug to the backlog. Let's forget like this ever happened.\""),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_buttons__WEBPACK_IMPORTED_MODULE_6__[/* LinkButton */ "a"],{text:"\uD83C\uDFE0Go Home?",linkToMoveTo:"/"}))));};/* harmony default export */ __webpack_exports__["default"] = (NotFoundPage);var Styled404Wrapper=styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ "c"].div.withConfig({displayName:"sc-404__Styled404Wrapper",componentId:"sc-1ne5sag-0"})(["display:flex;flex-direction:column;justify-content:center;@media ","{margin:0 1rem 1rem 1rem;}"],_assets_media_query_sizes_js__WEBPACK_IMPORTED_MODULE_5__[/* deviceMaxWidth */ "a"].mobileL);var StyledParagraph=styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ "c"].p.withConfig({displayName:"sc-404__StyledParagraph",componentId:"sc-1ne5sag-1"})(["font-size:1.5rem;line-height:1.6;word-spacing:0.1rem;font-style:italic;"]);var StyledH1=styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ "c"].h1.withConfig({displayName:"sc-404__StyledH1",componentId:"sc-1ne5sag-2"})(["margin:4rem 0;font-family:'Times New Roman',Times,serif;font-size:8rem;font-weight:bold;text-align:center;@media only screen and ","{font-size:3.5rem;}"],_assets_media_query_sizes_js__WEBPACK_IMPORTED_MODULE_5__[/* deviceMaxWidth */ "a"].mobileL);var Styled404Section=styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ "c"].div.withConfig({displayName:"sc-404__Styled404Section",componentId:"sc-1ne5sag-3"})(["display:flex;max-width:1024px;animation:"," 400ms ease-in;padding:20px;padding-bottom:60px;@media only screen and ","{max-width:800px;}@media only screen and ","{position:initial;padding:0;padding-bottom:60px;flex-direction:column-reverse;align-items:center;}"],Object(styled_components__WEBPACK_IMPORTED_MODULE_1__[/* keyframes */ "d"])(["",""],react_animations__WEBPACK_IMPORTED_MODULE_2__["fadeIn"]),_assets_media_query_sizes_js__WEBPACK_IMPORTED_MODULE_5__[/* deviceMaxWidth */ "a"].laptop,_assets_media_query_sizes_js__WEBPACK_IMPORTED_MODULE_5__[/* deviceMaxWidth */ "a"].mobileL);

/***/ })

}]);
//# sourceMappingURL=component---src-pages-404-js-dbbf309f7bb3c86e7519.js.map