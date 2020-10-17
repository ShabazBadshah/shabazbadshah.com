(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "ltWS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("vOnD");
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Wbzz");
/* harmony import */ var _media_query_sizes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("9ix+");
var LinkButton=function LinkButton(_ref){var text=_ref.text,linkToMoveTo=_ref.linkToMoveTo;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledLinkButton,{to:linkToMoveTo},text);};LinkButton.defaultProps={linkToMoveTo:'/'};/* harmony default export */ __webpack_exports__["a"] = (LinkButton);var StyledLinkButton=Object(styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ "d"])(gatsby__WEBPACK_IMPORTED_MODULE_2__["Link"]).withConfig({displayName:"link-button__StyledLinkButton",componentId:"ragout-0"})(["display:block;align-self:center;width:50%;text-decoration:none;font-size:1.2em;background-color:",";color:#f9f8f7;box-shadow:",";padding:0.6rem 1rem;border:",";border-radius:4px;margin:1rem 2rem 0 0;letter-spacing:0.04rem;text-align:center;transition:all 100ms ease-in;&:hover{border:",";color:",";background-color:",";transform:translateY(-0.2rem);transition:all 100ms ease-out;}@media ","{width:100%;margin:1rem 0 0 0;padding:0.7rem 1rem;}"],function(props){return props.theme.primaryThemeColour;},function(props){return props.theme.linkButtonBorder;},function(props){return"2px "+props.theme.primaryThemeColour+" solid";},function(props){return props.theme.linkButtonHoverBorder;},function(props){return props.theme.linkButtonTextColour;},function(props){return props.theme.linkButtonHoverColour;},_media_query_sizes_js__WEBPACK_IMPORTED_MODULE_3__[/* deviceMaxWidth */ "a"].mobileL);

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
/* harmony import */ var _components_layout_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Bl7J");
/* harmony import */ var _components_seo_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("vrFN");
/* harmony import */ var _media_query_sizes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("9ix+");
/* harmony import */ var _components_link_button_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("ltWS");
/* eslint-disable react/no-unescaped-entities */ /* eslint-disable jsx-a11y/accessible-emoji */var NotFoundPage=function NotFoundPage(){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_layout_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"],null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_seo_js__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"],{title:"404"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Styled404Section,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Styled404Wrapper,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledH1,null,"\uD83D\uDE10 404 Page Not Found!"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledParagraph,null,"\"Um.......I swear this page was working on my computer. I'll add this bug to the backlog. Let's forget like this ever happened.\""),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_link_button_js__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"],{text:"\uD83C\uDFE0Go Home?",linkToMoveTo:"/"}))));};/* harmony default export */ __webpack_exports__["default"] = (NotFoundPage);var Styled404Wrapper=styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ "d"].div.withConfig({displayName:"sc-404__Styled404Wrapper",componentId:"sc-1ne5sag-0"})(["display:flex;flex-direction:column;justify-content:center;@media ","{margin:0 1rem 1rem 1rem;}"],_media_query_sizes_js__WEBPACK_IMPORTED_MODULE_5__[/* deviceMaxWidth */ "a"].mobileL);var StyledParagraph=styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ "d"].p.withConfig({displayName:"sc-404__StyledParagraph",componentId:"sc-1ne5sag-1"})(["font-size:1.5em;line-height:1.6;word-spacing:0.1em;font-style:italic;"]);var StyledH1=styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ "d"].h1.withConfig({displayName:"sc-404__StyledH1",componentId:"sc-1ne5sag-2"})(["margin:4rem 0;font-family:'Times New Roman',Times,serif;font-size:8em;font-weight:bold;@media only screen and ","{font-size:3.5em;}"],_media_query_sizes_js__WEBPACK_IMPORTED_MODULE_5__[/* deviceMaxWidth */ "a"].mobileL);var Styled404Section=styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ "d"].div.withConfig({displayName:"sc-404__Styled404Section",componentId:"sc-1ne5sag-3"})(["display:flex;max-width:1024px;animation:"," 400ms ease-in;position:fixed;top:50%;bottom:50%;padding:20px;@media only screen and ","{max-width:800px;}@media only screen and ","{position:initial;padding:0;flex-direction:column-reverse;align-items:center;}"],Object(styled_components__WEBPACK_IMPORTED_MODULE_1__[/* keyframes */ "e"])(["",""],react_animations__WEBPACK_IMPORTED_MODULE_2__["fadeIn"]),_media_query_sizes_js__WEBPACK_IMPORTED_MODULE_5__[/* deviceMaxWidth */ "a"].laptop,_media_query_sizes_js__WEBPACK_IMPORTED_MODULE_5__[/* deviceMaxWidth */ "a"].mobileL);

/***/ })

}]);
//# sourceMappingURL=component---src-pages-404-js-47c447c4cd010f9ab5d7.js.map