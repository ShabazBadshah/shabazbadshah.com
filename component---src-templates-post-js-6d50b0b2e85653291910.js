(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "0jh0":
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "2klF":
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = _isNativeReflectConstruct;

/***/ }),

/***/ "6qSS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query", function() { return query; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9Hrx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("vOnD");
/* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("A2+M");
/* harmony import */ var gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Bl7J");
/* harmony import */ var react_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("l2P8");
/* harmony import */ var react_animations__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_animations__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _contextProviders_global_state_context_provider_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("JKlR");
/* harmony import */ var _assets_global_style_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("yf23");
/* harmony import */ var _media_query_sizes_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("9ix+");
/* harmony import */ var _github_markdown_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("hNsZ");
/* harmony import */ var _github_markdown_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_github_markdown_css__WEBPACK_IMPORTED_MODULE_9__);
var PostTemplate=/*#__PURE__*/function(_Component){Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(PostTemplate,_Component);function PostTemplate(){return _Component.apply(this,arguments)||this;}var _proto=PostTemplate.prototype;_proto.render=function render(){var _this$props$data$mdx=this.props.data.mdx,frontmatter=_this$props$data$mdx.frontmatter,tableOfContents=_this$props$data$mdx.tableOfContents,body=_this$props$data$mdx.body,slug=_this$props$data$mdx.slug;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_contextProviders_global_state_context_provider_js__WEBPACK_IMPORTED_MODULE_6__[/* globalStateContext */ "b"].Consumer,null,function(globalState){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_layout__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"],null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StyledArticleWrapper,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StyledMarkdownBodyContainer,{enableDarkMode:globalState.darkMode.isDarkModeEnabled},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div",{className:"markdown-body"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StyledArticleTitle,null,frontmatter.title),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(gatsby_plugin_mdx__WEBPACK_IMPORTED_MODULE_3__["MDXRenderer"],null,body)))));}));};return PostTemplate;}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);var query="2194277666";/* harmony default export */ __webpack_exports__["default"] = (PostTemplate);var StyledArticleWrapper=styled_components__WEBPACK_IMPORTED_MODULE_2__[/* default */ "c"].div.withConfig({displayName:"post__StyledArticleWrapper",componentId:"sc-1f621m4-0"})(["display:flex;flex-direction:row;"]);var StyledArticleTitle=styled_components__WEBPACK_IMPORTED_MODULE_2__[/* default */ "c"].h1.withConfig({displayName:"post__StyledArticleTitle",componentId:"sc-1f621m4-1"})(["font-size:3rem;margin-bottom:3rem;text-align:left;width:100%;"]);var StyledMarkdownBodyContainer=styled_components__WEBPACK_IMPORTED_MODULE_2__[/* default */ "c"].div.withConfig({displayName:"post__StyledMarkdownBodyContainer",componentId:"sc-1f621m4-2"})(["min-width:320px;max-width:768px;padding:2rem 2rem 2rem 2rem;margin:2rem 2rem 4rem 2rem;p,h2,h3,h4,h5,h6,li{font-size:1rem;line-height:1.5rem;color:",";}p{margin-bottom:1rem;margin-top:0;}h2{color:",";border-bottom:0.5px solid #c5c3c1;margin-top:3rem;margin-bottom:1.5rem;padding-bottom:0.5rem;font-weight:700;font-size:2rem;line-height:2.5rem;}h3{line-height:1.5rem;font-size:1.5rem;margin-bottom:1rem;margin-top:3rem;}h4{font-size:1.25rem;border-bottom:0.5px solid #c5c3c1;margin-top:3rem;margin-bottom:1rem;padding-bottom:0.25rem;}a{display:inline-block;color:",";text-decoration:underline;text-underline-offset:0.15rem;cursor:pointer;&:hover{animation:"," 800ms ease-in-out;}}ul,ol{padding-left:2rem;margin-bottom:1.5rem;margin-top:0;li{line-height:1.75rem;}}table{border-spacing:0;width:100%;overflow-x:scroll;border-radius:0.35rem;margin:2rem 0 2rem 0;border:1px solid #c5c3c1;border-radius:8px;}tbody{& tr:last-child{& td{border-bottom:none;}}}th{border-bottom:1px solid #d6d9de;}td{border-bottom:1px solid #d6d9de;}th,td{text-align:left;padding:0.75rem !important;hyphens:auto;word-break:break-word;}@media only screen and ","{max-width:100%;padding:0;margin:0.25rem;}"],function(props){return props.enableDarkMode?'#ced4da':'#41484f';},_assets_global_style_constants__WEBPACK_IMPORTED_MODULE_7__[/* globalThemeColour */ "b"],_assets_global_style_constants__WEBPACK_IMPORTED_MODULE_7__[/* globalThemeColour */ "b"],Object(styled_components__WEBPACK_IMPORTED_MODULE_2__[/* keyframes */ "d"])(["",""],react_animations__WEBPACK_IMPORTED_MODULE_5__["headShake"]),_media_query_sizes_js__WEBPACK_IMPORTED_MODULE_8__[/* deviceMaxWidth */ "a"].mobileL);

/***/ }),

/***/ "A2+M":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Welcome to gatsby-plugin-mdx!
 *
 * Start reading in gatsby-node.js
 */var MDXRenderer=__webpack_require__("X8hv");module.exports={MDXRenderer:MDXRenderer};

/***/ }),

/***/ "Ck4i":
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__("Q83E");

var isNativeReflectConstruct = __webpack_require__("2klF");

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;

/***/ }),

/***/ "Q83E":
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "R7tm":
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__("qHws");

var iterableToArray = __webpack_require__("gC2u");

var unsupportedIterableToArray = __webpack_require__("dQcQ");

var nonIterableSpread = __webpack_require__("m7BV");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "X8hv":
/***/ (function(module, exports, __webpack_require__) {

var _construct=__webpack_require__("Ck4i");var _toConsumableArray=__webpack_require__("R7tm");var _defineProperty=__webpack_require__("0jh0");var _objectWithoutPropertiesLoose=__webpack_require__("uDP2");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}var React=__webpack_require__("q1tI");var _require=__webpack_require__("7ljp"),useMDXComponents=_require.useMDXComponents,mdx=_require.mdx;var _require2=__webpack_require__("BfwJ"),useMDXScope=_require2.useMDXScope;module.exports=function MDXRenderer(_ref){var scope=_ref.scope,components=_ref.components,children=_ref.children,props=_objectWithoutPropertiesLoose(_ref,["scope","components","children"]);var mdxComponents=useMDXComponents(components);var mdxScope=useMDXScope(scope);// Memoize the compiled component
var End=React.useMemo(function(){if(!children){return null;}var fullScope=_objectSpread({// React is here just in case the user doesn't pass them in
// in a manual usage of the renderer
React:React,mdx:mdx},mdxScope);var keys=Object.keys(fullScope);var values=keys.map(function(key){return fullScope[key];});var fn=_construct(Function,["_fn"].concat(_toConsumableArray(keys),[""+children]));return fn.apply(void 0,[{}].concat(_toConsumableArray(values)));},[children,scope]);return React.createElement(End,_objectSpread({components:mdxComponents},props));};

/***/ }),

/***/ "dQcQ":
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__("hMe3");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ }),

/***/ "gC2u":
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "hMe3":
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),

/***/ "hNsZ":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "m7BV":
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "qHws":
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__("hMe3");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ })

}]);
//# sourceMappingURL=component---src-templates-post-js-6d50b0b2e85653291910.js.map