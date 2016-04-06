/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _history = __webpack_require__(157);

	var _reactRouter = __webpack_require__(172);

	var _Sidebar = __webpack_require__(208);

	var _Sidebar2 = _interopRequireDefault(_Sidebar);

	var _home = __webpack_require__(203);

	var _home2 = _interopRequireDefault(_home);

	var _article = __webpack_require__(199);

	var _article2 = _interopRequireDefault(_article);

	var _articleInfo = __webpack_require__(200);

	var _articleInfo2 = _interopRequireDefault(_articleInfo);

	var _message = __webpack_require__(205);

	var _message2 = _interopRequireDefault(_message);

	var _about = __webpack_require__(198);

	var _about2 = _interopRequireDefault(_about);

	var _Nav = __webpack_require__(206);

	var _Nav2 = _interopRequireDefault(_Nav);

	var _Footer = __webpack_require__(202);

	var _Footer2 = _interopRequireDefault(_Footer);

	var _NotFound = __webpack_require__(207);

	var _NotFound2 = _interopRequireDefault(_NotFound);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// import Calendar from 'rc-calendar' // 日历组件

	__webpack_require__(204);

	// history 用来和React-router配合，使用html5的history API，默认使用的是hash
	var history = (0, _history.useBasename)(_history.createHistory)({
	    basename: ''
	});

	var store = {
	    footer: {
	        optinalArray: 'shmhuoa'
	    }
	};

	var App = function (_Component) {
	    _inherits(App, _Component);

	    function App() {
	        _classCallCheck(this, App);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
	    }

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(_Nav2.default, null),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'main' },
	                    _react2.default.createElement(_Sidebar2.default, null),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'content' },
	                        this.props.children
	                    )
	                ),
	                _react2.default.createElement(_Footer2.default, store.footer)
	            );
	        }
	    }]);

	    return App;
	}(_react.Component);

	(0, _reactDom.render)(_react2.default.createElement(
	    _reactRouter.Router,
	    { history: history },
	    _react2.default.createElement(
	        _reactRouter.Route,
	        { path: '/', component: App },
	        _react2.default.createElement(_reactRouter.Route, { path: 'home', component: _home2.default }),
	        _react2.default.createElement(_reactRouter.Route, { path: 'article', component: _article2.default }),
	        _react2.default.createElement(_reactRouter.Route, { path: 'article/:id', component: _articleInfo2.default }),
	        _react2.default.createElement(_reactRouter.Route, { path: 'message', component: _message2.default }),
	        _react2.default.createElement(_reactRouter.Route, { path: 'about', component: _about2.default }),
	        _react2.default.createElement(_reactRouter.Route, { path: '*', component: _NotFound2.default })
	    )
	), document.getElementById('app'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".main {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n.main > .sidebar {\n  width: 200px;\n}\n.main > .content {\n  -webkit-box-flex: 1 ;\n  -webkit-flex: 1 ;\n  -ms-flex: 1 ;\n  flex: 1 ;\n}\n", ""]);

	// exports


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".sidebar {\n  background: #c8641e;\n  margin-right: 20px ;\n  min-height: 600px;\n}\n.sidebar li {\n  line-height: 2 ;\n  color: #fff ;\n}\n.sidebar li + li {\n  border-top: 1px solid rgba(0, 0, 0, 0.2);\n}\n.sidebar a {\n  color: inherit ;\n  text-decoration: none ;\n  display: block ;\n}\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = window.ReactDOM;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".nav {\n  background: pink ;\n}\n.nav h1 {\n  color: #fff ;\n  font-size: 30px;\n}\n", ""]);

	// exports


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(9);
	var isArguments = __webpack_require__(8);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	    // 7.3. Other pairs that do not both pass typeof value == 'object',
	    // equivalence is determined by ==.
	  } else if (!actual || !expected || (typeof actual === 'undefined' ? 'undefined' : _typeof(actual)) != 'object' && (typeof expected === 'undefined' ? 'undefined' : _typeof(expected)) != 'object') {
	      return opts.strict ? actual === expected : actual == expected;

	      // 7.4. For all other Object pairs, including Array objects, equivalence is
	      // determined by having the same number of owned properties (as verified
	      // with Object.prototype.hasOwnProperty.call), the same set of keys
	      // (although not necessarily the same order), equivalent values for every
	      // corresponding key, and an identical 'prototype' property. Note: this
	      // accounts for both named and indexed properties on Arrays.
	    } else {
	        return objEquiv(actual, expected, opts);
	      }
	};

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer(x) {
	  if (!x || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {
	    //happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length) return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i]) return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === (typeof b === 'undefined' ? 'undefined' : _typeof(b));
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = window.React;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var supportsArgumentsClass = function () {
	  return Object.prototype.toString.call(arguments);
	}() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object) {
	  return object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object' && typeof object.length == 'number' && Object.prototype.hasOwnProperty.call(object, 'callee') && !Object.prototype.propertyIsEnumerable.call(object, 'callee') || false;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	exports = module.exports = typeof Object.keys === 'function' ? Object.keys : shim;

	exports.shim = shim;
	function shim(obj) {
	  var keys = [];
	  for (var key in obj) {
	    keys.push(key);
	  }return keys;
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule adjustBlockDepthForContentState
	 * @typechecks
	 * 
	 */

	'use strict';

	function adjustBlockDepthForContentState(contentState, selectionState, adjustment, maxDepth) {
	  var startKey = selectionState.getStartKey();
	  var endKey = selectionState.getEndKey();
	  var blockMap = contentState.getBlockMap();
	  var blocks = blockMap.toSeq().skipUntil(function (_, k) {
	    return k === startKey;
	  }).takeUntil(function (_, k) {
	    return k === endKey;
	  }).concat([[endKey, blockMap.get(endKey)]]).map(function (block) {
	    var depth = block.getDepth() + adjustment;
	    depth = Math.max(0, Math.min(depth, maxDepth));
	    return block.set('depth', depth);
	  });

	  blockMap = blockMap.merge(blocks);

	  return contentState.merge({
	    blockMap: blockMap,
	    selectionBefore: selectionState,
	    selectionAfter: selectionState
	  });
	}

	module.exports = adjustBlockDepthForContentState;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule applyEntityToContentBlock
	 * @typechecks
	 * 
	 */

	'use strict';

	var CharacterMetadata = __webpack_require__(15);

	function applyEntityToContentBlock(contentBlock, start, end, entityKey) {
	  var characterList = contentBlock.getCharacterList();
	  while (start < end) {
	    characterList = characterList.set(start, CharacterMetadata.applyEntity(characterList.get(start), entityKey));
	    start++;
	  }
	  return contentBlock.set('characterList', characterList);
	}

	module.exports = applyEntityToContentBlock;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule applyEntityToContentState
	 * @typechecks
	 * 
	 */

	'use strict';

	var Immutable = __webpack_require__(163);

	var applyEntityToContentBlock = __webpack_require__(11);

	function applyEntityToContentState(contentState, selectionState, entityKey) {
	  var blockMap = contentState.getBlockMap();
	  var startKey = selectionState.getStartKey();
	  var startOffset = selectionState.getStartOffset();
	  var endKey = selectionState.getEndKey();
	  var endOffset = selectionState.getEndOffset();

	  var newBlocks = blockMap.skipUntil(function (_, k) {
	    return k === startKey;
	  }).takeUntil(function (_, k) {
	    return k === endKey;
	  }).toOrderedMap().merge(Immutable.OrderedMap([[endKey, blockMap.get(endKey)]])).map(function (block, blockKey) {
	    var sliceStart;
	    var sliceEnd;

	    if (startKey === endKey) {
	      sliceStart = startOffset;
	      sliceEnd = endOffset;
	    } else {
	      sliceStart = blockKey === startKey ? startOffset : 0;
	      sliceEnd = blockKey === endKey ? 0 : block.getLength();
	    }

	    return applyEntityToContentBlock(block, sliceStart, sliceEnd, entityKey);
	  });

	  return contentState.merge({
	    blockMap: blockMap.merge(newBlocks),
	    selectionBefore: selectionState,
	    selectionAfter: selectionState
	  });
	}

	module.exports = applyEntityToContentState;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule BlockMapBuilder
	 * 
	 */

	'use strict';

	var Immutable = __webpack_require__(163);

	var OrderedMap = Immutable.OrderedMap;

	var BlockMapBuilder = {
	  createFromArray: function createFromArray(blocks) {
	    return OrderedMap(blocks.map(function (block) {
	      return [block.getKey(), block];
	    }));
	  }
	};

	module.exports = BlockMapBuilder;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule BlockTree
	 * 
	 */

	'use strict';

	var Immutable = __webpack_require__(163);

	var emptyFunction = __webpack_require__(112);
	var findRangesImmutable = __webpack_require__(62);

	var List = Immutable.List;
	var Repeat = Immutable.Repeat;
	var Record = Immutable.Record;

	var returnTrue = emptyFunction.thatReturnsTrue;

	var FINGERPRINT_DELIMITER = '-';

	var defaultLeafRange = {
	  start: null,
	  end: null
	};

	var LeafRange = Record(defaultLeafRange);

	var defaultDecoratorRange = {
	  start: null,
	  end: null,
	  decoratorKey: null,
	  leaves: null
	};

	var DecoratorRange = Record(defaultDecoratorRange);

	var BlockTree = {
	  /**
	   * Generate a block tree for a given ContentBlock/decorator pair.
	   */
	  generate: function generate(block, decorator) {
	    var textLength = block.getLength();
	    if (!textLength) {
	      return List.of(new DecoratorRange({
	        start: 0,
	        end: 0,
	        decoratorKey: null,
	        leaves: List.of(new LeafRange({ start: 0, end: 0 }))
	      }));
	    }

	    var leafSets = [];
	    var decorations = decorator ? decorator.getDecorations(block) : List(Repeat(null, textLength));

	    var chars = block.getCharacterList();

	    findRangesImmutable(decorations, areEqual, returnTrue, function (start, end) {
	      leafSets.push(new DecoratorRange({
	        start: start,
	        end: end,
	        decoratorKey: decorations.get(start),
	        leaves: generateLeaves(chars.slice(start, end).toList(), start)
	      }));
	    });

	    return List(leafSets);
	  },

	  /**
	   * Create a string representation of the given tree map. This allows us
	   * to rapidly determine whether a tree has undergone a significant
	   * structural change.
	   */
	  getFingerprint: function getFingerprint(tree) {
	    return tree.map(function (leafSet) {
	      var decoratorKey = leafSet.get('decoratorKey');
	      var fingerprintString = decoratorKey !== null ? decoratorKey + '.' + (leafSet.get('end') - leafSet.get('start')) : '';
	      return '' + fingerprintString + '.' + leafSet.get('leaves').size;
	    }).join(FINGERPRINT_DELIMITER);
	  }
	};

	/**
	 * Generate LeafRange records for a given character list.
	 */
	function generateLeaves(characters, offset) {
	  var leaves = [];
	  var inlineStyles = characters.map(function (c) {
	    return c.getStyle();
	  }).toList();
	  findRangesImmutable(inlineStyles, areEqual, returnTrue, function (start, end) {
	    leaves.push(new LeafRange({
	      start: start + offset,
	      end: end + offset
	    }));
	  });
	  return List(leaves);
	}

	function areEqual(a, b) {
	  return a === b;
	}

	module.exports = BlockTree;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CharacterMetadata
	 * @typechecks
	 * 
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _require = __webpack_require__(163);

	var Map = _require.Map;
	var OrderedSet = _require.OrderedSet;
	var Record = _require.Record;

	var EMPTY_SET = OrderedSet();

	var defaultRecord = {
	  style: EMPTY_SET,
	  entity: null
	};

	var CharacterMetadataRecord = Record(defaultRecord);

	var CharacterMetadata = function (_CharacterMetadataRecord) {
	  _inherits(CharacterMetadata, _CharacterMetadataRecord);

	  function CharacterMetadata() {
	    _classCallCheck(this, CharacterMetadata);

	    _get(Object.getPrototypeOf(CharacterMetadata.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(CharacterMetadata, [{
	    key: 'getStyle',
	    value: function getStyle() {
	      return this.get('style');
	    }
	  }, {
	    key: 'getEntity',
	    value: function getEntity() {
	      return this.get('entity');
	    }
	  }, {
	    key: 'hasStyle',
	    value: function hasStyle(style) {
	      return this.getStyle().has(style);
	    }
	  }], [{
	    key: 'applyStyle',
	    value: function applyStyle(record, style) {
	      var withStyle = record.set('style', record.getStyle().add(style));
	      return CharacterMetadata.create(withStyle);
	    }
	  }, {
	    key: 'removeStyle',
	    value: function removeStyle(record, style) {
	      var withoutStyle = record.set('style', record.getStyle().remove(style));
	      return CharacterMetadata.create(withoutStyle);
	    }
	  }, {
	    key: 'applyEntity',
	    value: function applyEntity(record, entityKey) {
	      var withEntity = record.getEntity() === entityKey ? record : record.set('entity', entityKey);
	      return CharacterMetadata.create(withEntity);
	    }

	    /**
	     * Use this function instead of the `CharacterMetadata` constructor.
	     * Since most content generally uses only a very small number of
	     * style/entity permutations, we can reuse these objects as often as
	     * possible.
	     */
	  }, {
	    key: 'create',
	    value: function create(config) {
	      if (!config) {
	        return EMPTY;
	      }

	      // Fill in unspecified properties, if necessary.
	      var configMap = Map({ style: EMPTY_SET, entity: null }).merge(config);

	      var existing = pool.get(configMap);
	      if (existing) {
	        return existing;
	      }

	      var newCharacter = new CharacterMetadata(configMap);
	      pool = pool.set(configMap, newCharacter);
	      return newCharacter;
	    }
	  }]);

	  return CharacterMetadata;
	}(CharacterMetadataRecord);

	var EMPTY = new CharacterMetadata();
	var pool = Map([[Map(defaultRecord), EMPTY]]);

	CharacterMetadata.EMPTY = EMPTY;

	module.exports = CharacterMetadata;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CompositeDraftDecorator
	 * @typechecks
	 * 
	 */

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var Immutable = __webpack_require__(163);

	var List = Immutable.List;

	var DELIMITER = '.';

	/**
	 * A CompositeDraftDecorator traverses through a list of DraftDecorator
	 * instances to identify sections of a ContentBlock that should be rendered
	 * in a "decorated" manner. For example, hashtags, mentions, and links may
	 * be intended to stand out visually, be rendered as anchors, etc.
	 *
	 * The list of decorators supplied to the constructor will be used in the
	 * order they are provided. This allows the caller to specify a priority for
	 * string matching, in case of match collisions among decorators.
	 *
	 * For instance, I may have a link with a `#` in its text. Though this section
	 * of text may match our hashtag decorator, it should not be treated as a
	 * hashtag. I should therefore list my link DraftDecorator
	 * before my hashtag DraftDecorator when constructing this composite
	 * decorator instance.
	 *
	 * Thus, when a collision like this is encountered, the earlier match is
	 * preserved and the new match is discarded.
	 */

	var CompositeDraftDecorator = function () {
	  function CompositeDraftDecorator(decorators) {
	    _classCallCheck(this, CompositeDraftDecorator);

	    // Copy the decorator array, since we use this array order to determine
	    // precedence of decoration matching. If the array is mutated externally,
	    // we don't want to be affected here.
	    this._decorators = decorators.slice();
	  }

	  /**
	   * Determine whether we can occupy the specified slice of the decorations
	   * array.
	   */

	  _createClass(CompositeDraftDecorator, [{
	    key: 'getDecorations',
	    value: function getDecorations(block) {
	      var decorations = Array(block.getText().length).fill(null);

	      this._decorators.forEach(function ( /*object*/decorator, /*number*/ii) {
	        var counter = 0;
	        var strategy = decorator.strategy;
	        strategy(block, function ( /*number*/start, /*number*/end) {
	          // Find out if any of our matching range is already occupied
	          // by another decorator. If so, discard the match. Otherwise, store
	          // the component key for rendering.
	          if (canOccupySlice(decorations, start, end)) {
	            occupySlice(decorations, start, end, ii + DELIMITER + counter);
	            counter++;
	          }
	        });
	      });

	      return List(decorations);
	    }
	  }, {
	    key: 'getComponentForKey',
	    value: function getComponentForKey(key) {
	      var componentKey = parseInt(key.split(DELIMITER)[0], 10);
	      return this._decorators[componentKey].component;
	    }
	  }, {
	    key: 'getPropsForKey',
	    value: function getPropsForKey(key) {
	      var componentKey = parseInt(key.split(DELIMITER)[0], 10);
	      return this._decorators[componentKey].props;
	    }
	  }]);

	  return CompositeDraftDecorator;
	}();

	function canOccupySlice(decorations, start, end) {
	  for (var ii = start; ii < end; ii++) {
	    if (decorations[ii] != null) {
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * Splice the specified component into our decoration array at the desired
	 * range.
	 */
	function occupySlice(targetArr, start, end, componentKey) {
	  for (var ii = start; ii < end; ii++) {
	    targetArr[ii] = componentKey;
	  }
	}

	module.exports = CompositeDraftDecorator;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ContentBlock
	 * @typechecks
	 * 
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Immutable = __webpack_require__(163);

	var findRangesImmutable = __webpack_require__(62);

	var List = Immutable.List;
	var OrderedSet = Immutable.OrderedSet;
	var Record = Immutable.Record;

	var EMPTY_SET = OrderedSet();

	var defaultRecord = {
	  key: '',
	  type: 'unstyled',
	  text: '',
	  characterList: List(),
	  depth: 0
	};

	var ContentBlockRecord = Record(defaultRecord);

	var ContentBlock = function (_ContentBlockRecord) {
	  _inherits(ContentBlock, _ContentBlockRecord);

	  function ContentBlock() {
	    _classCallCheck(this, ContentBlock);

	    _get(Object.getPrototypeOf(ContentBlock.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(ContentBlock, [{
	    key: 'getKey',
	    value: function getKey() {
	      return this.get('key');
	    }
	  }, {
	    key: 'getType',
	    value: function getType() {
	      return this.get('type');
	    }
	  }, {
	    key: 'getText',
	    value: function getText() {
	      return this.get('text');
	    }
	  }, {
	    key: 'getCharacterList',
	    value: function getCharacterList() {
	      return this.get('characterList');
	    }
	  }, {
	    key: 'getLength',
	    value: function getLength() {
	      return this.getText().length;
	    }
	  }, {
	    key: 'getDepth',
	    value: function getDepth() {
	      return this.get('depth');
	    }
	  }, {
	    key: 'getInlineStyleAt',
	    value: function getInlineStyleAt(offset) {
	      var character = this.getCharacterList().get(offset);
	      return character ? character.getStyle() : EMPTY_SET;
	    }
	  }, {
	    key: 'getEntityAt',
	    value: function getEntityAt(offset) {
	      var character = this.getCharacterList().get(offset);
	      return character ? character.getEntity() : null;
	    }

	    /**
	     * Execute a callback for every contiguous range of styles within the block.
	     */
	  }, {
	    key: 'findStyleRanges',
	    value: function findStyleRanges(filterFn, callback) {
	      findRangesImmutable(this.getCharacterList(), haveEqualStyle, filterFn, callback);
	    }

	    /**
	     * Execute a callback for every contiguous range of entities within the block.
	     */
	  }, {
	    key: 'findEntityRanges',
	    value: function findEntityRanges(filterFn, callback) {
	      findRangesImmutable(this.getCharacterList(), haveEqualEntity, filterFn, callback);
	    }
	  }]);

	  return ContentBlock;
	}(ContentBlockRecord);

	function haveEqualStyle(charA, charB) {
	  return charA.getStyle() === charB.getStyle();
	}

	function haveEqualEntity(charA, charB) {
	  return charA.getEntity() === charB.getEntity();
	}

	module.exports = ContentBlock;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ContentState
	 * @typechecks
	 * 
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(_x2, _x3, _x4) {
	  var _again = true;_function: while (_again) {
	    var object = _x2,
	        property = _x3,
	        receiver = _x4;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x2 = parent;_x3 = property;_x4 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var BlockMapBuilder = __webpack_require__(13);
	var CharacterMetadata = __webpack_require__(15);
	var ContentBlock = __webpack_require__(17);
	var Immutable = __webpack_require__(163);
	var SelectionState = __webpack_require__(102);

	var generateBlockKey = __webpack_require__(63);
	var sanitizeDraftText = __webpack_require__(100);

	var List = Immutable.List;
	var Record = Immutable.Record;
	var Repeat = Immutable.Repeat;

	var defaultRecord = {
	  blockMap: null,
	  selectionBefore: null,
	  selectionAfter: null
	};

	var ContentStateRecord = Record(defaultRecord);

	var ContentState = function (_ContentStateRecord) {
	  _inherits(ContentState, _ContentStateRecord);

	  function ContentState() {
	    _classCallCheck(this, ContentState);

	    _get(Object.getPrototypeOf(ContentState.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(ContentState, [{
	    key: 'getBlockMap',
	    value: function getBlockMap() {
	      return this.get('blockMap');
	    }
	  }, {
	    key: 'getSelectionBefore',
	    value: function getSelectionBefore() {
	      return this.get('selectionBefore');
	    }
	  }, {
	    key: 'getSelectionAfter',
	    value: function getSelectionAfter() {
	      return this.get('selectionAfter');
	    }
	  }, {
	    key: 'getBlockForKey',
	    value: function getBlockForKey(key) {
	      var block = this.getBlockMap().get(key);
	      return block;
	    }
	  }, {
	    key: 'getKeyBefore',
	    value: function getKeyBefore(key) {
	      return this.getBlockMap().reverse().keySeq().skipUntil(function (v) {
	        return v === key;
	      }).skip(1).first();
	    }
	  }, {
	    key: 'getKeyAfter',
	    value: function getKeyAfter(key) {
	      return this.getBlockMap().keySeq().skipUntil(function (v) {
	        return v === key;
	      }).skip(1).first();
	    }
	  }, {
	    key: 'getBlockAfter',
	    value: function getBlockAfter(key) {
	      return this.getBlockMap().skipUntil(function (_, k) {
	        return k === key;
	      }).skip(1).first();
	    }
	  }, {
	    key: 'getBlockBefore',
	    value: function getBlockBefore(key) {
	      return this.getBlockMap().reverse().skipUntil(function (_, k) {
	        return k === key;
	      }).skip(1).first();
	    }
	  }, {
	    key: 'getBlocksAsArray',
	    value: function getBlocksAsArray() {
	      return this.getBlockMap().toArray();
	    }
	  }, {
	    key: 'getLastBlock',
	    value: function getLastBlock() {
	      return this.getBlockMap().last();
	    }
	  }, {
	    key: 'getPlainText',
	    value: function getPlainText(delimiter) {
	      return this.getBlockMap().map(function (block) {
	        return block ? block.getText() : '';
	      }).join(delimiter || '\n');
	    }
	  }, {
	    key: 'hasText',
	    value: function hasText() {
	      var blockMap = this.getBlockMap();
	      return blockMap.size > 1 || blockMap.first().getLength() > 0;
	    }
	  }], [{
	    key: 'createFromBlockArray',
	    value: function createFromBlockArray(blocks) {
	      var blockMap = BlockMapBuilder.createFromArray(blocks);
	      var selectionState = SelectionState.createEmpty(blockMap.first().getKey());
	      return new ContentState({
	        blockMap: blockMap,
	        selectionBefore: selectionState,
	        selectionAfter: selectionState
	      });
	    }
	  }, {
	    key: 'createFromText',
	    value: function createFromText(text) {
	      var delimiter = arguments.length <= 1 || arguments[1] === undefined ? /\r\n?|\n/g : arguments[1];

	      var strings = text.split(delimiter);
	      var blocks = strings.map(function (block) {
	        block = sanitizeDraftText(block);
	        return new ContentBlock({
	          key: generateBlockKey(),
	          text: block,
	          type: 'unstyled',
	          characterList: List(Repeat(CharacterMetadata.EMPTY, block.length))
	        });
	      });
	      return ContentState.createFromBlockArray(blocks);
	    }
	  }]);

	  return ContentState;
	}(ContentStateRecord);

	module.exports = ContentState;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ContentStateInlineStyle
	 * @typechecks
	 * 
	 */

	'use strict';

	var CharacterMetadata = __webpack_require__(15);

	var _require = __webpack_require__(163);

	var Map = _require.Map;

	var ContentStateInlineStyle = {
	  add: function add(contentState, selectionState, inlineStyle) {
	    return modifyInlineStyle(contentState, selectionState, inlineStyle, true);
	  },

	  remove: function remove(contentState, selectionState, inlineStyle) {
	    return modifyInlineStyle(contentState, selectionState, inlineStyle, false);
	  }
	};

	function modifyInlineStyle(contentState, selectionState, inlineStyle, addOrRemove) {
	  var blockMap = contentState.getBlockMap();
	  var startKey = selectionState.getStartKey();
	  var startOffset = selectionState.getStartOffset();
	  var endKey = selectionState.getEndKey();
	  var endOffset = selectionState.getEndOffset();

	  var newBlocks = blockMap.skipUntil(function (_, k) {
	    return k === startKey;
	  }).takeUntil(function (_, k) {
	    return k === endKey;
	  }).concat(Map([[endKey, blockMap.get(endKey)]])).map(function (block, blockKey) {
	    var sliceStart;
	    var sliceEnd;

	    if (startKey === endKey) {
	      sliceStart = startOffset;
	      sliceEnd = endOffset;
	    } else {
	      sliceStart = blockKey === startKey ? startOffset : 0;
	      sliceEnd = blockKey === endKey ? endOffset : block.getLength();
	    }

	    var chars = block.getCharacterList();
	    var current;
	    while (sliceStart < sliceEnd) {
	      current = chars.get(sliceStart);
	      chars = chars.set(sliceStart, addOrRemove ? CharacterMetadata.applyStyle(current, inlineStyle) : CharacterMetadata.removeStyle(current, inlineStyle));
	      sliceStart++;
	    }

	    return block.set('characterList', chars);
	  });

	  return contentState.merge({
	    blockMap: blockMap.merge(newBlocks),
	    selectionBefore: selectionState,
	    selectionAfter: selectionState
	  });
	}

	module.exports = ContentStateInlineStyle;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule convertFromDraftStateToRaw
	 * 
	 */

	'use strict';

	var DraftEntity = __webpack_require__(36);
	var DraftStringKey = __webpack_require__(43);

	var encodeEntityRanges = __webpack_require__(58);
	var encodeInlineStyleRanges = __webpack_require__(59);

	function convertFromDraftStateToRaw(contentState) {
	  var entityStorageKey = 0;
	  var entityStorageMap = {};
	  var rawBlocks = [];

	  contentState.getBlockMap().forEach(function (block, blockKey) {
	    block.findEntityRanges(function (character) {
	      return character.getEntity() !== null;
	    }, function (start) {
	      // Stringify to maintain order of otherwise numeric keys.
	      var stringifiedEntityKey = DraftStringKey.stringify(block.getEntityAt(start));
	      if (!entityStorageMap.hasOwnProperty(stringifiedEntityKey)) {
	        entityStorageMap[stringifiedEntityKey] = '' + entityStorageKey++;
	      }
	    });

	    rawBlocks.push({
	      key: blockKey,
	      text: block.getText(),
	      type: block.getType(),
	      depth: canHaveDepth(block) ? block.getDepth() : 0,
	      inlineStyleRanges: encodeInlineStyleRanges(block),
	      entityRanges: encodeEntityRanges(block, entityStorageMap)
	    });
	  });

	  // Flip storage map so that our storage keys map to global
	  // DraftEntity keys.
	  var entityKeys = Object.keys(entityStorageMap);
	  var flippedStorageMap = {};
	  entityKeys.forEach(function (key, jj) {
	    var entity = DraftEntity.get(DraftStringKey.unstringify(key));
	    flippedStorageMap[jj] = {
	      type: entity.getType(),
	      mutability: entity.getMutability(),
	      data: entity.getData()
	    };
	  });

	  return {
	    entityMap: flippedStorageMap,
	    blocks: rawBlocks
	  };
	}

	function canHaveDepth(block) {
	  var type = block.getType();
	  return type === 'ordered-list-item' || type === 'unordered-list-item';
	}

	module.exports = convertFromDraftStateToRaw;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule convertFromRawToDraftState
	 * 
	 */

	'use strict';

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	var ContentBlock = __webpack_require__(17);
	var DraftEntity = __webpack_require__(36);

	var createCharacterList = __webpack_require__(22);
	var decodeEntityRanges = __webpack_require__(23);
	var decodeInlineStyleRanges = __webpack_require__(24);
	var generateBlockKey = __webpack_require__(63);

	function convertFromRawToDraftState(rawState) {
	  var blocks = rawState.blocks;
	  var entityMap = rawState.entityMap;

	  var fromStorageToLocal = {};
	  Object.keys(entityMap).forEach(function (storageKey) {
	    var encodedEntity = entityMap[storageKey];
	    var type = encodedEntity.type;
	    var mutability = encodedEntity.mutability;
	    var data = encodedEntity.data;

	    var newKey = DraftEntity.create(type, mutability, data || {});
	    fromStorageToLocal[storageKey] = newKey;
	  });

	  return blocks.map(function (block) {
	    var key = block.key;
	    var type = block.type;
	    var text = block.text;
	    var depth = block.depth;
	    var inlineStyleRanges = block.inlineStyleRanges;
	    var entityRanges = block.entityRanges;

	    key = key || generateBlockKey();
	    depth = depth || 0;
	    inlineStyleRanges = inlineStyleRanges || [];
	    entityRanges = entityRanges || [];

	    var inlineStyles = decodeInlineStyleRanges(text, inlineStyleRanges);

	    // Translate entity range keys to the DraftEntity map.
	    var filteredEntityRanges = entityRanges.filter(function (range) {
	      return fromStorageToLocal.hasOwnProperty(range.key);
	    }).map(function (range) {
	      return _extends({}, range, { key: fromStorageToLocal[range.key] });
	    });

	    var entities = decodeEntityRanges(text, filteredEntityRanges);
	    var characterList = createCharacterList(inlineStyles, entities);

	    return new ContentBlock({ key: key, type: type, text: text, depth: depth, characterList: characterList });
	  });
	}

	module.exports = convertFromRawToDraftState;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule createCharacterList
	 * @typechecks
	 * 
	 */

	'use strict';

	var CharacterMetadata = __webpack_require__(15);
	var Immutable = __webpack_require__(163);

	var List = Immutable.List;

	function createCharacterList(inlineStyles, entities) {
	  var characterArray = inlineStyles.map(function (style, ii) {
	    var entity = entities[ii];
	    return CharacterMetadata.create({ style: style, entity: entity });
	  });
	  return List(characterArray);
	}

	module.exports = createCharacterList;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule decodeEntityRanges
	 * @typechecks
	 * 
	 */

	'use strict';

	var UnicodeUtils = __webpack_require__(137);

	var substr = UnicodeUtils.substr;

	/**
	 * Convert to native JavaScript string lengths to determine ranges.
	 */
	function decodeEntityRanges(text, ranges) {
	  var entities = Array(text.length).fill(null);
	  if (ranges) {
	    ranges.forEach(function (range) {
	      // Using Unicode-enabled substrings converted to JavaScript lengths,
	      // fill the output array with entity keys.
	      var start = substr(text, 0, range.offset).length;
	      var end = start + substr(text, range.offset, range.length).length;
	      for (var ii = start; ii < end; ii++) {
	        entities[ii] = range.key;
	      }
	    });
	  }
	  return entities;
	}

	module.exports = decodeEntityRanges;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule decodeInlineStyleRanges
	 * @typechecks
	 * 
	 */

	'use strict';

	var UnicodeUtils = __webpack_require__(137);

	var _require = __webpack_require__(163);

	var OrderedSet = _require.OrderedSet;
	var substr = UnicodeUtils.substr;

	var EMPTY_SET = OrderedSet();

	/**
	 * Convert to native JavaScript string lengths to determine ranges.
	 */
	function decodeInlineStyleRanges(text, ranges) {
	  var styles = Array(text.length).fill(EMPTY_SET);
	  if (ranges) {
	    ranges.forEach(function ( /*object*/range) {
	      var cursor = substr(text, 0, range.offset).length;
	      var end = cursor + substr(text, range.offset, range.length).length;
	      while (cursor < end) {
	        styles[cursor] = styles[cursor].add(range.style);
	        cursor++;
	      }
	    });
	  }
	  return styles;
	}

	module.exports = decodeInlineStyleRanges;

/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DefaultDraftInlineStyle
	 * 
	 */

	'use strict';

	module.exports = {
	  BOLD: {
	    fontWeight: 'bold'
	  },

	  CODE: {
	    fontFamily: 'monospace',
	    wordWrap: 'break-word'
	  },

	  ITALIC: {
	    fontStyle: 'italic'
	  },

	  STRIKETHROUGH: {
	    textDecoration: 'line-through'
	  },

	  UNDERLINE: {
	    textDecoration: 'underline'
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Draft
	 */

	'use strict';

	var BlockMapBuilder = __webpack_require__(13);
	var CharacterMetadata = __webpack_require__(15);
	var CompositeDraftDecorator = __webpack_require__(16);
	var ContentBlock = __webpack_require__(17);
	var ContentState = __webpack_require__(18);
	var DraftEditor = __webpack_require__(27);
	var DraftModifier = __webpack_require__(39);
	var DraftEntity = __webpack_require__(36);
	var DraftEntityInstance = __webpack_require__(37);
	var EditorState = __webpack_require__(57);
	var RichTextEditorUtil = __webpack_require__(99);
	var SelectionState = __webpack_require__(102);

	var convertFromDraftStateToRaw = __webpack_require__(20);
	var convertFromRawToDraftState = __webpack_require__(21);
	var generateBlockKey = __webpack_require__(63);

	var DraftPublic = {
	  Editor: DraftEditor,
	  EditorState: EditorState,

	  CompositeDecorator: CompositeDraftDecorator,
	  Entity: DraftEntity,
	  EntityInstance: DraftEntityInstance,

	  BlockMapBuilder: BlockMapBuilder,
	  CharacterMetadata: CharacterMetadata,
	  ContentBlock: ContentBlock,
	  ContentState: ContentState,
	  SelectionState: SelectionState,

	  Modifier: DraftModifier,
	  RichUtils: RichTextEditorUtil,

	  convertFromRaw: convertFromRawToDraftState,
	  convertToRaw: convertFromDraftStateToRaw,
	  genKey: generateBlockKey
	};

	module.exports = DraftPublic;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DraftEditor.react
	 * @typechecks
	 * 
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var DefaultDraftInlineStyle = __webpack_require__(25);
	var DraftEditorCompositionHandler = __webpack_require__(29);
	var DraftEditorContents = __webpack_require__(30);
	var DraftEditorDragHandler = __webpack_require__(31);
	var DraftEditorEditHandler = __webpack_require__(32);
	var DraftEditorPlaceholder = __webpack_require__(34);
	var EditorState = __webpack_require__(57);
	var React = __webpack_require__(7);
	var ReactDOM = __webpack_require__(4);
	var Scroll = __webpack_require__(131);
	var Style = __webpack_require__(132);
	var UserAgent = __webpack_require__(139);

	var cx = __webpack_require__(110);
	var emptyFunction = __webpack_require__(112);
	var getDefaultKeyBinding = __webpack_require__(66);
	var nullthrows = __webpack_require__(129);
	var getScrollPosition = __webpack_require__(117);

	var isIE = UserAgent.isBrowser('IE');

	// IE does not support the `input` event on contentEditable, so we can't
	// observe spellcheck behavior.
	var allowSpellCheck = !isIE;

	// Define a set of handler objects to correspond to each possible `mode`
	// of editor behavior.
	var handlerMap = {
	  'edit': DraftEditorEditHandler,
	  'composite': DraftEditorCompositionHandler,
	  'drag': DraftEditorDragHandler,
	  'cut': null,
	  'render': null
	};

	/**
	 * `DraftEditor` is the root editor component. It composes a `contentEditable`
	 * div, and provides a wide variety of useful function props for managing the
	 * state of the editor. See `DraftEditorProps` for details.
	 */

	var DraftEditor = function (_React$Component) {
	  _inherits(DraftEditor, _React$Component);

	  _createClass(DraftEditor, null, [{
	    key: 'defaultProps',
	    value: {
	      blockRendererFn: emptyFunction.thatReturnsNull,
	      blockStyleFn: emptyFunction.thatReturns(''),
	      keyBindingFn: getDefaultKeyBinding,
	      readOnly: false,
	      spellCheck: false,
	      stripPastedStyles: false
	    },
	    enumerable: true
	  }]);

	  function DraftEditor(props) {
	    _classCallCheck(this, DraftEditor);

	    _get(Object.getPrototypeOf(DraftEditor.prototype), 'constructor', this).call(this, props);

	    this._blockSelectEvents = false;
	    this._clipboard = null;
	    this._guardAgainstRender = false;
	    this._handler = null;
	    this._dragCount = 0;

	    this._onBeforeInput = this._buildHandler('onBeforeInput');
	    this._onBlur = this._buildHandler('onBlur');
	    this._onCharacterData = this._buildHandler('onCharacterData');
	    this._onCompositionEnd = this._buildHandler('onCompositionEnd');
	    this._onCompositionStart = this._buildHandler('onCompositionStart');
	    this._onCopy = this._buildHandler('onCopy');
	    this._onCut = this._buildHandler('onCut');
	    this._onDragEnd = this._buildHandler('onDragEnd');
	    this._onDragOver = this._buildHandler('onDragOver');
	    this._onDragStart = this._buildHandler('onDragStart');
	    this._onDrop = this._buildHandler('onDrop');
	    this._onInput = this._buildHandler('onInput');
	    this._onFocus = this._buildHandler('onFocus');
	    this._onKeyDown = this._buildHandler('onKeyDown');
	    this._onKeyPress = this._buildHandler('onKeyPress');
	    this._onKeyUp = this._buildHandler('onKeyUp');
	    this._onMouseDown = this._buildHandler('onMouseDown');
	    this._onMouseUp = this._buildHandler('onMouseUp');
	    this._onPaste = this._buildHandler('onPaste');
	    this._onSelect = this._buildHandler('onSelect');

	    // Manual binding for public and internal methods.
	    this.focus = this._focus.bind(this);
	    this.blur = this._blur.bind(this);
	    this.setMode = this._setMode.bind(this);
	    this.exitCurrentMode = this._exitCurrentMode.bind(this);
	    this.restoreEditorDOM = this._restoreEditorDOM.bind(this);
	    this.setRenderGuard = this._setRenderGuard.bind(this);
	    this.removeRenderGuard = this._removeRenderGuard.bind(this);
	    this.setClipboard = this._setClipboard.bind(this);
	    this.getClipboard = this._getClipboard.bind(this);
	    this.update = this._update.bind(this);
	    this.onDragEnter = this._onDragEnter.bind(this);
	    this.onDragLeave = this._onDragLeave.bind(this);

	    // See `_restoreEditorDOM()`.
	    this.state = { containerKey: 0 };
	  }

	  /**
	   * Build a method that will pass the event to the specified handler method.
	   * This allows us to look up the correct handler function for the current
	   * editor mode, if any has been specified.
	   */

	  _createClass(DraftEditor, [{
	    key: '_buildHandler',
	    value: function _buildHandler(eventName) {
	      var _this = this;

	      return function (e) {
	        if (!_this.props.readOnly) {
	          var method = _this._handler && _this._handler[eventName];
	          method && method.call(_this, e);
	        }
	      };
	    }
	  }, {
	    key: '_renderPlaceholder',
	    value: function _renderPlaceholder() {
	      var content = this.props.editorState.getCurrentContent();
	      var showPlaceholder = this.props.placeholder && !this.props.editorState.isInCompositionMode() && !content.hasText();

	      if (showPlaceholder) {
	        return React.createElement(DraftEditorPlaceholder, {
	          text: nullthrows(this.props.placeholder),
	          editorState: this.props.editorState,
	          textAlignment: this.props.textAlignment
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var readOnly = _props.readOnly;
	      var textAlignment = _props.textAlignment;

	      var rootClass = cx({
	        'DraftEditor/root': true,
	        'DraftEditor/alignLeft': textAlignment === 'left',
	        'DraftEditor/alignRight': textAlignment === 'right',
	        'DraftEditor/alignCenter': textAlignment === 'center'
	      });
	      var hasContent = this.props.editorState.getCurrentContent().hasText();

	      return React.createElement('div', { className: rootClass }, this._renderPlaceholder(), React.createElement('div', {
	        className: cx('DraftEditor/editorContainer'),
	        key: 'editor' + this.state.containerKey,
	        ref: 'editorContainer' }, React.createElement('div', {
	        'aria-activedescendant': readOnly ? null : this.props.ariaActiveDescendantID,
	        'aria-autocomplete': readOnly ? null : this.props.ariaAutoComplete,
	        'aria-describedby': this.props.ariaDescribedBy,
	        'aria-expanded': readOnly ? null : this.props.ariaExpanded,
	        'aria-haspopup': readOnly ? null : this.props.ariaHasPopup,
	        'aria-label': this.props.ariaLabel,
	        'aria-owns': readOnly ? null : this.props.ariaOwneeID,
	        className: cx('public/DraftEditor/content'),
	        contentEditable: !readOnly,
	        'data-testid': this.props.webDriverTestID,
	        onBeforeInput: this._onBeforeInput,
	        onBlur: this._onBlur,
	        onCompositionEnd: this._onCompositionEnd,
	        onCompositionStart: this._onCompositionStart,
	        onCopy: this._onCopy,
	        onCut: this._onCut,
	        onDragEnd: this._onDragEnd,
	        onDragEnter: this.onDragEnter,
	        onDragLeave: this.onDragLeave,
	        onDragOver: this._onDragOver,
	        onDragStart: this._onDragStart,
	        onDrop: this._onDrop,
	        onFocus: this._onFocus,
	        onInput: this._onInput,
	        onKeyDown: this._onKeyDown,
	        onKeyPress: this._onKeyPress,
	        onKeyUp: this._onKeyUp,
	        onMouseUp: this._onMouseUp,
	        onPaste: this._onPaste,
	        onSelect: this._onSelect,
	        ref: 'editor',
	        role: readOnly ? null : this.props.role || 'textbox',
	        spellCheck: allowSpellCheck && this.props.spellCheck,
	        tabIndex: this.props.tabIndex,
	        title: hasContent ? null : this.props.placeholder }, React.createElement(DraftEditorContents, {
	        blockRendererFn: nullthrows(this.props.blockRendererFn),
	        blockStyleFn: nullthrows(this.props.blockStyleFn),
	        customStyleMap: _extends({}, DefaultDraftInlineStyle, this.props.customStyleMap),
	        editorState: this.props.editorState
	      }))));
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setMode('edit');

	      /**
	       * IE has a hardcoded "feature" that attempts to convert link text into
	       * anchors in contentEditable DOM. This breaks the editor's expectations of
	       * the DOM, and control is lost. Disable it to make IE behave.
	       * See: http://blogs.msdn.com/b/ieinternals/archive/2010/09/15/
	       * ie9-beta-minor-change-list.aspx
	       */
	      if (isIE) {
	        document.execCommand('AutoUrlDetect', false, false);
	      }
	    }

	    /**
	     * Prevent selection events from affecting the current editor state. This
	     * is mostly intended to defend against IE, which fires off `selectionchange`
	     * events regardless of whether the selection is set via the browser or
	     * programmatically. We only care about selection events that occur because
	     * of browser interaction, not re-renders and forced selections.
	     */
	  }, {
	    key: 'componentWillUpdate',
	    value: function componentWillUpdate() {
	      this._blockSelectEvents = true;
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this._blockSelectEvents = false;
	    }

	    /**
	     * Used via `this.focus()`.
	     *
	     * Force focus back onto the editor node.
	     *
	     * Forcing focus causes the browser to scroll to the top of the editor, which
	     * may be undesirable when the editor is taller than the viewport. To solve
	     * this, either use a specified scroll position (in cases like `cut` behavior
	     * where it should be restored to a known position) or store the current
	     * scroll state and put it back in place after focus has been forced.
	     */
	  }, {
	    key: '_focus',
	    value: function _focus(scrollPosition) {
	      var editorState = this.props.editorState;

	      var alreadyHasFocus = editorState.getSelection().getHasFocus();
	      var editorNode = ReactDOM.findDOMNode(this.refs.editor);

	      var scrollParent = Style.getScrollParent(editorNode);

	      var _ref = scrollPosition || getScrollPosition(scrollParent);

	      var x = _ref.x;
	      var y = _ref.y;

	      editorNode.focus();
	      if (scrollParent === window) {
	        window.scrollTo(x, y);
	      } else {
	        Scroll.setTop(scrollParent, y);
	      }

	      // On Chrome and Safari, calling focus on contenteditable focuses the
	      // cursor at the first character. This is something you don't expect when
	      // you're clicking on an input element but not directly on a character.
	      // Put the cursor back where it was before the blur.
	      if (!alreadyHasFocus) {
	        this.update(EditorState.forceSelection(editorState, editorState.getSelection()));
	      }
	    }
	  }, {
	    key: '_blur',
	    value: function _blur() {
	      ReactDOM.findDOMNode(this.refs.editor).blur();
	    }

	    /**
	     * Used via `this.setMode(...)`.
	     *
	     * Set the behavior mode for the editor component. This switches the current
	     * handler module to ensure that DOM events are managed appropriately for
	     * the active mode.
	     */
	  }, {
	    key: '_setMode',
	    value: function _setMode(mode) {
	      this._handler = handlerMap[mode];
	    }
	  }, {
	    key: '_exitCurrentMode',
	    value: function _exitCurrentMode() {
	      this.setMode('edit');
	    }

	    /**
	     * Used via `this.restoreEditorDOM()`.
	     *
	     * Force a complete re-render of the editor based on the current EditorState.
	     * This is useful when we know we are going to lose control of the DOM
	     * state (cut command, IME) and we want to make sure that reconciliation
	     * occurs on a version of the DOM that is synchronized with our EditorState.
	     */
	  }, {
	    key: '_restoreEditorDOM',
	    value: function _restoreEditorDOM(scrollPosition) {
	      var _this2 = this;

	      this.setState({ containerKey: this.state.containerKey + 1 }, function () {
	        _this2._focus(scrollPosition);
	      });
	    }

	    /**
	     * Guard against rendering. Intended for use when we need to manually
	     * reset editor contents, to ensure that no outside influences lead to
	     * React reconciliation when we are in an uncertain state.
	     */
	  }, {
	    key: '_setRenderGuard',
	    value: function _setRenderGuard() {
	      this._guardAgainstRender = true;
	    }
	  }, {
	    key: '_removeRenderGuard',
	    value: function _removeRenderGuard() {
	      this._guardAgainstRender = false;
	    }

	    /**
	     * Used via `this.setClipboard(...)`.
	     *
	     * Set the clipboard state for a cut/copy event.
	     */
	  }, {
	    key: '_setClipboard',
	    value: function _setClipboard(clipboard) {
	      this._clipboard = clipboard;
	    }

	    /**
	     * Used via `this.getClipboard()`.
	     *
	     * Retrieve the clipboard state for a cut/copy event.
	     */
	  }, {
	    key: '_getClipboard',
	    value: function _getClipboard() {
	      return this._clipboard;
	    }

	    /**
	     * Used via `this.update(...)`.
	     *
	     * Propagate a new `EditorState` object to higher-level components. This is
	     * the method by which event handlers inform the `DraftEditor` component of
	     * state changes. A component that composes a `DraftEditor` **must** provide
	     * an `onChange` prop to receive state updates passed along from this
	     * function.
	     */
	  }, {
	    key: '_update',
	    value: function _update(editorState) {
	      this.props.onChange(editorState);
	    }

	    /**
	     * Used in conjunction with `_onDragLeave()`, by counting the number of times
	     * a dragged element enters and leaves the editor (or any of its children),
	     * to determine when the dragged element absolutely leaves the editor.
	     */
	  }, {
	    key: '_onDragEnter',
	    value: function _onDragEnter() {
	      this._dragCount++;
	    }

	    /**
	     * See `_onDragEnter()`.
	     */
	  }, {
	    key: '_onDragLeave',
	    value: function _onDragLeave() {
	      this._dragCount--;
	      if (this._dragCount === 0) {
	        this.exitCurrentMode();
	      }
	    }
	  }]);

	  return DraftEditor;
	}(React.Component);

	module.exports = DraftEditor;

	/**
	 * Define proxies that can route events to the current handler.
	 */

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DraftEditorBlock.react
	 * @typechecks
	 * 
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var ContentBlock = __webpack_require__(17);
	var DraftEditorLeaf = __webpack_require__(33);
	var DraftOffsetKey = __webpack_require__(40);
	var React = __webpack_require__(7);
	var ReactDOM = __webpack_require__(4);
	var Scroll = __webpack_require__(131);
	var SelectionState = __webpack_require__(102);
	var Style = __webpack_require__(132);
	var UnicodeBidi = __webpack_require__(134);
	var UnicodeBidiDirection = __webpack_require__(135);

	var cx = __webpack_require__(110);
	var getElementPosition = __webpack_require__(115);
	var getScrollPosition = __webpack_require__(117);
	var getViewportDimensions = __webpack_require__(120);
	var nullthrows = __webpack_require__(129);

	var SCROLL_BUFFER = 10;

	/**
	 * The default block renderer for a `DraftEditor` component.
	 *
	 * A `DraftEditorBlock` is able to render a given `ContentBlock` to its
	 * appropriate decorator and inline style components.
	 */

	var DraftEditorBlock = function (_React$Component) {
	  _inherits(DraftEditorBlock, _React$Component);

	  function DraftEditorBlock() {
	    _classCallCheck(this, DraftEditorBlock);

	    _get(Object.getPrototypeOf(DraftEditorBlock.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * Return whether a block overlaps with either edge of the `SelectionState`.
	   */

	  _createClass(DraftEditorBlock, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return this.props.block !== nextProps.block || this.props.tree !== nextProps.tree || this.props.direction !== nextProps.direction || isBlockOnSelectionEdge(nextProps.selection, nextProps.block.getKey()) && nextProps.forceSelection;
	    }

	    /**
	     * When a block is mounted and overlaps the selection state, we need to make
	     * sure that the cursor is visible to match native behavior. This may not
	     * be the case if the user has pressed `RETURN` or pasted some content, since
	     * programatically creating these new blocks and setting the DOM selection
	     * will miss out on the browser natively scrolling to that position.
	     *
	     * To replicate native behavior, if the block overlaps the selection state
	     * on mount, force the scroll position. Check the scroll state of the scroll
	     * parent, and adjust it to align the entire block to the bottom of the
	     * scroll parent.
	     */
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var selection = this.props.selection;
	      var endKey = selection.getEndKey();
	      if (!selection.getHasFocus() || endKey !== this.props.block.getKey()) {
	        return;
	      }

	      var blockNode = ReactDOM.findDOMNode(this);
	      var scrollParent = Style.getScrollParent(blockNode);
	      var scrollPosition = getScrollPosition(scrollParent);
	      var scrollDelta;

	      if (scrollParent === window) {
	        var nodePosition = getElementPosition(blockNode);
	        var nodeBottom = nodePosition.y + nodePosition.height;
	        var viewportHeight = getViewportDimensions().height;
	        scrollDelta = nodeBottom - viewportHeight;
	        if (scrollDelta > 0) {
	          window.scrollTo(scrollPosition.x, scrollPosition.y + scrollDelta + SCROLL_BUFFER);
	        }
	      } else {
	        var blockBottom = blockNode.offsetHeight + blockNode.offsetTop;
	        var scrollBottom = scrollParent.offsetHeight + scrollPosition.y;
	        scrollDelta = blockBottom - scrollBottom;
	        if (scrollDelta > 0) {
	          Scroll.setTop(scrollParent, Scroll.getTop(scrollParent) + scrollDelta + SCROLL_BUFFER);
	        }
	      }
	    }
	  }, {
	    key: '_renderChildren',
	    value: function _renderChildren() {
	      var _this = this;

	      var block = this.props.block;
	      var blockKey = block.getKey();
	      var text = block.getText();
	      var lastLeafSet = this.props.tree.size - 1;
	      var hasSelection = isBlockOnSelectionEdge(this.props.selection, blockKey);

	      return this.props.tree.map(function (leafSet, ii) {
	        var leavesForLeafSet = leafSet.get('leaves');
	        var lastLeaf = leavesForLeafSet.size - 1;
	        var leaves = leavesForLeafSet.map(function (leaf, jj) {
	          var offsetKey = DraftOffsetKey.encode(blockKey, ii, jj);
	          var start = leaf.get('start');
	          var end = leaf.get('end');
	          return React.createElement(DraftEditorLeaf, {
	            key: offsetKey,
	            offsetKey: offsetKey,
	            blockKey: blockKey,
	            start: start,
	            selection: hasSelection ? _this.props.selection : undefined,
	            forceSelection: _this.props.forceSelection,
	            text: text.slice(start, end),
	            styleSet: block.getInlineStyleAt(start),
	            customStyleMap: _this.props.customStyleMap,
	            isLast: ii === lastLeafSet && jj === lastLeaf
	          });
	        }).toArray();

	        var decoratorKey = leafSet.get('decoratorKey');
	        if (decoratorKey == null) {
	          return leaves;
	        }

	        if (!_this.props.decorator) {
	          return leaves;
	        }

	        var decorator = nullthrows(_this.props.decorator);

	        var DecoratorComponent = decorator.getComponentForKey(decoratorKey);
	        if (!DecoratorComponent) {
	          return leaves;
	        }

	        var decoratorProps = decorator.getPropsForKey(decoratorKey);
	        var decoratorOffsetKey = DraftOffsetKey.encode(blockKey, ii, 0);
	        var decoratedText = text.slice(leavesForLeafSet.first().get('start'), leavesForLeafSet.last().get('end'));

	        // Resetting dir to the same value on a child node makes Chrome/Firefox
	        // confused on cursor movement. See http://jsfiddle.net/d157kLck/3/
	        var dir = UnicodeBidiDirection.getHTMLDirIfDifferent(UnicodeBidi.getDirection(decoratedText), _this.props.direction);

	        return React.createElement(DecoratorComponent, _extends({}, decoratorProps, {
	          dir: dir,
	          key: decoratorOffsetKey,
	          entityKey: block.getEntityAt(leafSet.get('start')),
	          offsetKey: decoratorOffsetKey }), leaves);
	      }).toArray();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var direction = _props.direction;
	      var offsetKey = _props.offsetKey;

	      var className = cx({
	        'public/DraftStyleDefault/block': true,
	        'public/DraftStyleDefault/ltr': direction === 'LTR',
	        'public/DraftStyleDefault/rtl': direction === 'RTL'
	      });

	      return React.createElement('div', { 'data-offset-key': offsetKey, className: className }, this._renderChildren());
	    }
	  }]);

	  return DraftEditorBlock;
	}(React.Component);

	function isBlockOnSelectionEdge(selection, key) {
	  return selection.getAnchorKey() === key || selection.getFocusKey() === key;
	}

	module.exports = DraftEditorBlock;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DraftEditorCompositionHandler
	 * 
	 */

	'use strict';

	var DraftModifier = __webpack_require__(39);
	var EditorState = __webpack_require__(57);
	var Keys = __webpack_require__(126);

	var getEntityKeyForSelection = __webpack_require__(70);
	var isSelectionAtLeafStart = __webpack_require__(82);

	/**
	 * Millisecond delay to allow `compositionstart` to fire again upon
	 * `compositionend`.
	 *
	 * This is used for Korean input to ensure that typing can continue without
	 * the editor trying to render too quickly. More specifically, Safari 7.1+
	 * triggers `compositionstart` a little slower than Chrome/FF, which
	 * leads to composed characters being resolved and re-render occurring
	 * sooner than we want.
	 */
	var RESOLVE_DELAY = 20;

	/**
	 * A handful of variables used to track the current composition and its
	 * resolution status. These exist at the module level because it is not
	 * possible to have compositions occurring in multiple editors simultaneously,
	 * and it simplifies state management with respect to the DraftEditor component.
	 */
	var resolved = false;
	var stillComposing = false;
	var textInputData = '';

	var DraftEditorCompositionHandler = {
	  onBeforeInput: function onBeforeInput(e) {
	    textInputData = (textInputData || '') + e.data;
	  },

	  /**
	   * A `compositionstart` event has fired while we're still in composition
	   * mode. Continue the current composition session to prevent a re-render.
	   */
	  onCompositionStart: function onCompositionStart() {
	    stillComposing = true;
	  },

	  /**
	   * Attempt to end the current composition session.
	   *
	   * Defer handling because browser will still insert the chars into active
	   * element after `compositionend`. If a `compositionstart` event fires
	   * before `resolveComposition` executes, our composition session will
	   * continue.
	   *
	   * The `resolved` flag is useful because certain IME interfaces fire the
	   * `compositionend` event multiple times, thus queueing up multiple attempts
	   * at handling the composition. Since handling the same composition event
	   * twice could break the DOM, we only use the first event. Example: Arabic
	   * Google Input Tools on Windows 8.1 fires `compositionend` three times.
	   */
	  onCompositionEnd: function onCompositionEnd() {
	    var _this = this;

	    resolved = false;
	    stillComposing = false;
	    setTimeout(function () {
	      if (!resolved) {
	        DraftEditorCompositionHandler.resolveComposition.call(_this);
	      }
	    }, RESOLVE_DELAY);
	  },

	  /**
	   * In Safari, keydown events may fire when committing compositions. If
	   * the arrow keys are used to commit, prevent default so that the cursor
	   * doesn't move, otherwise it will jump back noticeably on re-render.
	   */
	  onKeyDown: function onKeyDown(e) {
	    if (e.which === Keys.RIGHT || e.which === Keys.LEFT) {
	      e.preventDefault();
	    }
	  },

	  /**
	   * Keypress events may fire when committing compositions. In Firefox,
	   * pressing RETURN commits the composition and inserts extra newline
	   * characters that we do not want. `preventDefault` allows the composition
	   * to be committed while preventing the extra characters.
	   */
	  onKeyPress: function onKeyPress(e) {
	    if (e.which === Keys.RETURN) {
	      e.preventDefault();
	    }
	  },

	  /**
	   * Attempt to insert composed characters into the document.
	   *
	   * If we are still in a composition session, do nothing. Otherwise, insert
	   * the characters into the document and terminate the composition session.
	   *
	   * If no characters were composed -- for instance, the user
	   * deleted all composed characters and committed nothing new --
	   * force a re-render. We also re-render when the composition occurs
	   * at the beginning of a leaf, to ensure that if the browser has
	   * created a new text node for the composition, we will discard it.
	   *
	   * Resetting innerHTML will move focus to the beginning of the editor,
	   * so we update to force it back to the correct place.
	   */
	  resolveComposition: function resolveComposition() {
	    if (stillComposing) {
	      return;
	    }

	    resolved = true;
	    var composedChars = textInputData;
	    textInputData = '';

	    var editorState = EditorState.set(this.props.editorState, {
	      inCompositionMode: false
	    });

	    var currentStyle = editorState.getCurrentInlineStyle();
	    var entityKey = getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection());

	    var mustReset = !composedChars || isSelectionAtLeafStart(editorState) || currentStyle.size > 0 || entityKey !== null;

	    if (mustReset) {
	      this.restoreEditorDOM();
	    }

	    this.exitCurrentMode();
	    this.removeRenderGuard();

	    if (composedChars) {
	      // If characters have been composed, re-rendering with the update
	      // is sufficient to reset the editor.
	      var contentState = DraftModifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), composedChars, currentStyle, entityKey);
	      this.update(EditorState.push(editorState, contentState, 'insert-characters'));
	      return;
	    }

	    if (mustReset) {
	      this.update(EditorState.set(editorState, {
	        nativelyRenderedContent: null,
	        forceSelection: true
	      }));
	    }
	  }
	};

	module.exports = DraftEditorCompositionHandler;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DraftEditorContents.react
	 * @typechecks
	 * 
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var DraftEditorBlock = __webpack_require__(28);
	var DraftOffsetKey = __webpack_require__(40);
	var EditorState = __webpack_require__(57);
	var React = __webpack_require__(7);

	var cx = __webpack_require__(110);
	var getElementForBlockType = __webpack_require__(69);
	var getWrapperTemplateForBlockType = __webpack_require__(78);
	var joinClasses = __webpack_require__(125);
	var nullthrows = __webpack_require__(129);

	/**
	 * `DraftEditorContents` is the container component for all block components
	 * rendered for a `DraftEditor`. It is optimized to aggressively avoid
	 * re-rendering blocks whenever possible.
	 *
	 * This component is separate from `DraftEditor` because certain props
	 * (for instance, ARIA props) must be allowed to update without affecting
	 * the contents of the editor.
	 */

	var DraftEditorContents = function (_React$Component) {
	  _inherits(DraftEditorContents, _React$Component);

	  function DraftEditorContents() {
	    _classCallCheck(this, DraftEditorContents);

	    _get(Object.getPrototypeOf(DraftEditorContents.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * Provide default styling for list items. This way, lists will be styled with
	   * proper counters and indentation even if the caller does not specify
	   * their own styling at all. If more than five levels of nesting are needed,
	   * the necessary CSS classes can be provided via `blockStyleFn` configuration.
	   */

	  _createClass(DraftEditorContents, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      var prevEditorState = this.props.editorState;
	      var nextEditorState = nextProps.editorState;

	      var prevDirectionMap = prevEditorState.getDirectionMap();
	      var nextDirectionMap = nextEditorState.getDirectionMap();

	      // Text direction has changed for one or more blocks. We must re-render.
	      if (prevDirectionMap !== nextDirectionMap) {
	        return true;
	      }

	      var didHaveFocus = prevEditorState.getSelection().getHasFocus();
	      var nowHasFocus = nextEditorState.getSelection().getHasFocus();

	      if (didHaveFocus !== nowHasFocus) {
	        return true;
	      }

	      var nextNativeContent = nextEditorState.getNativelyRenderedContent();

	      var wasComposing = prevEditorState.isInCompositionMode();
	      var nowComposing = nextEditorState.isInCompositionMode();

	      // If the state is unchanged or we're currently rendering a natively
	      // rendered state, there's nothing new to be done.
	      if (prevEditorState === nextEditorState || nextNativeContent !== null && nextEditorState.getCurrentContent() === nextNativeContent || wasComposing && nowComposing) {
	        return false;
	      }

	      var prevContent = prevEditorState.getCurrentContent();
	      var nextContent = nextEditorState.getCurrentContent();
	      var prevDecorator = prevEditorState.getDecorator();
	      var nextDecorator = nextEditorState.getDecorator();
	      return wasComposing !== nowComposing || prevContent !== nextContent || prevDecorator !== nextDecorator || nextEditorState.mustForceSelection();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var blockRendererFn = _props.blockRendererFn;
	      var customStyleMap = _props.customStyleMap;
	      var editorState = _props.editorState;

	      var content = editorState.getCurrentContent();
	      var selection = editorState.getSelection();
	      var forceSelection = editorState.mustForceSelection();
	      var decorator = editorState.getDecorator();
	      var directionMap = nullthrows(editorState.getDirectionMap());

	      var blocksAsArray = content.getBlocksAsArray();
	      var blocks = [];
	      var currentWrapperElement = null;
	      var currentWrapperTemplate = null;
	      var currentDepth = null;
	      var currentWrappedBlocks = undefined;
	      var block = undefined,
	          key = undefined,
	          blockType = undefined,
	          child = undefined,
	          wrapperTemplate = undefined;

	      for (var ii = 0; ii < blocksAsArray.length; ii++) {
	        block = blocksAsArray[ii];
	        key = block.getKey();
	        blockType = block.getType();

	        var customRenderer = blockRendererFn(block);
	        var CustomComponent = undefined,
	            customProps = undefined;
	        if (customRenderer) {
	          CustomComponent = customRenderer.component;
	          customProps = customRenderer.props;
	        }

	        var direction = directionMap.get(key);
	        var offsetKey = DraftOffsetKey.encode(key, 0, 0);
	        var componentProps = {
	          block: block,
	          blockProps: customProps,
	          customStyleMap: customStyleMap,
	          decorator: decorator,
	          direction: direction,
	          forceSelection: forceSelection,
	          key: key,
	          offsetKey: offsetKey,
	          selection: selection,
	          tree: editorState.getBlockTree(key)
	        };

	        wrapperTemplate = getWrapperTemplateForBlockType(blockType);
	        var useNewWrapper = wrapperTemplate !== currentWrapperTemplate;

	        if (CustomComponent) {
	          child = React.createElement(CustomComponent, componentProps);
	        } else {
	          var _Element = getElementForBlockType(blockType);
	          var depth = block.getDepth();
	          var className = this.props.blockStyleFn(block);

	          // List items are special snowflakes, since we handle nesting and
	          // counters manually.
	          if (_Element === 'li') {
	            var shouldResetCount = useNewWrapper || currentDepth === null || depth > currentDepth;
	            className = joinClasses(className, getListItemClasses(blockType, depth, shouldResetCount, direction));
	          }

	          /* $FlowFixMe - Support DOM elements in React.createElement */
	          child = React.createElement(_Element, {
	            className: className,
	            'data-block': true,
	            'data-offset-key': offsetKey,
	            key: key
	          }, React.createElement(DraftEditorBlock, componentProps));
	        }

	        if (wrapperTemplate) {
	          if (useNewWrapper) {
	            currentWrappedBlocks = [];
	            currentWrapperElement = React.cloneElement(wrapperTemplate, {
	              key: key + '-wrap',
	              'data-offset-key': offsetKey
	            }, currentWrappedBlocks);
	            currentWrapperTemplate = wrapperTemplate;
	            blocks.push(currentWrapperElement);
	          }
	          currentDepth = block.getDepth();
	          nullthrows(currentWrappedBlocks).push(child);
	        } else {
	          currentWrappedBlocks = null;
	          currentWrapperElement = null;
	          currentWrapperTemplate = null;
	          currentDepth = null;
	          blocks.push(child);
	        }
	      }

	      return React.createElement('div', { 'data-contents': 'true' }, blocks);
	    }
	  }]);

	  return DraftEditorContents;
	}(React.Component);

	function getListItemClasses(type, depth, shouldResetCount, direction) {
	  return cx({
	    'public/DraftStyleDefault/unorderedListItem': type === 'unordered-list-item',
	    'public/DraftStyleDefault/orderedListItem': type === 'ordered-list-item',
	    'public/DraftStyleDefault/reset': shouldResetCount,
	    'public/DraftStyleDefault/depth0': depth === 0,
	    'public/DraftStyleDefault/depth1': depth === 1,
	    'public/DraftStyleDefault/depth2': depth === 2,
	    'public/DraftStyleDefault/depth3': depth === 3,
	    'public/DraftStyleDefault/depth4': depth === 4,
	    'public/DraftStyleDefault/listLTR': direction === 'LTR',
	    'public/DraftStyleDefault/listRTL': direction === 'RTL'
	  });
	}

	module.exports = DraftEditorContents;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DraftEditorDragHandler
	 * @typechecks
	 * 
	 */

	/**
	 * Get a SelectionState for the supplied mouse event.
	 */
	'use strict';

	var DataTransfer = __webpack_require__(111);
	var DraftModifier = __webpack_require__(39);
	var EditorState = __webpack_require__(57);

	var findAncestorOffsetKey = __webpack_require__(61);
	var getTextContentFromFiles = __webpack_require__(76);
	var getUpdatedSelectionState = __webpack_require__(77);
	var nullthrows = __webpack_require__(129);

	function getSelectionForEvent(event, editorState) {
	  var node = null;
	  var offset = null;

	  if (document.caretRangeFromPoint) {
	    var dropRange = document.caretRangeFromPoint(event.x, event.y);
	    node = dropRange.startContainer;
	    offset = dropRange.startOffset;
	  } else if (event.rangeParent) {
	    node = event.rangeParent;
	    offset = event.rangeOffset;
	  } else {
	    return null;
	  }

	  node = nullthrows(node);
	  offset = nullthrows(offset);
	  var offsetKey = nullthrows(findAncestorOffsetKey(node));

	  return getUpdatedSelectionState(editorState, offsetKey, offset, offsetKey, offset);
	}

	var DraftEditorDragHandler = {
	  /**
	   * Drag originating from input terminated.
	   */
	  onDragEnd: function onDragEnd() {
	    this.exitCurrentMode();
	  },

	  /**
	   * Handle data being dropped.
	   */
	  onDrop: function onDrop(e) {
	    var _this = this;

	    var data = new DataTransfer(e.nativeEvent.dataTransfer);

	    var editorState = this.props.editorState;
	    var dropSelection = getSelectionForEvent(e.nativeEvent, editorState);

	    e.preventDefault();
	    this.exitCurrentMode();

	    if (dropSelection == null) {
	      return;
	    }

	    var files = data.getFiles();
	    if (files.length > 0) {
	      if (this.props.handleDroppedFiles && this.props.handleDroppedFiles(dropSelection, files)) {
	        return;
	      }

	      getTextContentFromFiles(files, function (fileText) {
	        fileText && _this.update(insertTextAtSelection(editorState, nullthrows(dropSelection), // flow wtf
	        fileText));
	      });
	      return;
	    }

	    if (this._internalDrag) {
	      this.update(moveText(editorState, dropSelection));
	      return;
	    }

	    this.update(insertTextAtSelection(editorState, dropSelection, data.getText()));
	  }

	};

	function moveText(editorState, targetSelection) {
	  var newContentState = DraftModifier.moveText(editorState.getCurrentContent(), editorState.getSelection(), targetSelection);
	  return EditorState.push(editorState, newContentState, 'insert-fragment');
	}

	/**
	 * Insert text at a specified selection.
	 */
	function insertTextAtSelection(editorState, selection, text) {
	  var newContentState = DraftModifier.insertText(editorState.getCurrentContent(), selection, text, editorState.getCurrentInlineStyle());
	  return EditorState.push(editorState, newContentState, 'insert-fragment');
	}

	module.exports = DraftEditorDragHandler;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DraftEditorEditHandler
	 * 
	 */

	'use strict';

	var onBeforeInput = __webpack_require__(44);
	var onBlur = __webpack_require__(45);
	var onCompositionStart = __webpack_require__(46);
	var onCopy = __webpack_require__(47);
	var onCut = __webpack_require__(48);
	var onDragOver = __webpack_require__(49);
	var onDragStart = __webpack_require__(50);
	var onFocus = __webpack_require__(51);
	var onInput = __webpack_require__(52);
	var onKeyDown = __webpack_require__(53);
	var onPaste = __webpack_require__(54);
	var onSelect = __webpack_require__(55);

	var DraftEditorEditHandler = {
	  onBeforeInput: onBeforeInput,
	  onBlur: onBlur,
	  onCompositionStart: onCompositionStart,
	  onCopy: onCopy,
	  onCut: onCut,
	  onDragOver: onDragOver,
	  onDragStart: onDragStart,
	  onFocus: onFocus,
	  onInput: onInput,
	  onKeyDown: onKeyDown,
	  onPaste: onPaste,
	  onSelect: onSelect
	};

	module.exports = DraftEditorEditHandler;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DraftEditorLeaf.react
	 * @typechecks
	 * 
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var DraftEditorTextNode = __webpack_require__(35);
	var React = __webpack_require__(7);
	var ReactDOM = __webpack_require__(4);
	var SelectionState = __webpack_require__(102);

	var setDraftEditorSelection = __webpack_require__(104);

	/**
	 * All leaf nodes in the editor are spans with single text nodes. Leaf
	 * elements are styled based on the merging of an optional custom style map
	 * and a default style map.
	 *
	 * `DraftEditorLeaf` also provides a wrapper for calling into the imperative
	 * DOM Selection API. In this way, top-level components can declaratively
	 * maintain the selection state.
	 */

	var DraftEditorLeaf = function (_React$Component) {
	  _inherits(DraftEditorLeaf, _React$Component);

	  function DraftEditorLeaf() {
	    _classCallCheck(this, DraftEditorLeaf);

	    _get(Object.getPrototypeOf(DraftEditorLeaf.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(DraftEditorLeaf, [{
	    key: '_setSelection',

	    /**
	     * By making individual leaf instances aware of their context within
	     * the text of the editor, we can set our selection range more
	     * easily than we could in the non-React world.
	     *
	     * Note that this depends on our maintaining tight control over the
	     * DOM structure of the TextEditor component. If leaves had multiple
	     * text nodes, this would be harder.
	     */
	    value: function _setSelection() {
	      var selection = this.props.selection;

	      // If selection state is irrelevant to the parent block, no-op.
	      if (selection == null || !selection.getHasFocus()) {
	        return;
	      }

	      var _props = this.props;
	      var blockKey = _props.blockKey;
	      var start = _props.start;
	      var text = _props.text;

	      var end = start + text.length;
	      if (!selection.hasEdgeWithin(blockKey, start, end)) {
	        return;
	      }

	      // Determine the appropriate target node for selection. If the child
	      // is not a text node, it is a <br /> spacer. In this case, use the
	      // <span> itself as the selection target.
	      var node = ReactDOM.findDOMNode(this);
	      var child = node.firstChild;
	      var targetNode = undefined;

	      if (child.nodeType === Node.TEXT_NODE) {
	        targetNode = child;
	      } else if (child.tagName === 'BR') {
	        targetNode = node;
	      } else {
	        targetNode = child.firstChild;
	      }

	      setDraftEditorSelection(selection, targetNode, blockKey, start, end);
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return ReactDOM.findDOMNode(this.refs.leaf).textContent !== nextProps.text || nextProps.forceSelection;
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this._setSelection();
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._setSelection();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var text = this.props.text;

	      // If the leaf is at the end of its block and ends in a soft newline, append
	      // an extra line feed character. Browsers collapse trailing newline
	      // characters, which leaves the cursor in the wrong place after a
	      // shift+enter. The extra character repairs this.
	      if (text.endsWith('\n') && this.props.isLast) {
	        text += '\n';
	      }

	      var _props2 = this.props;
	      var customStyleMap = _props2.customStyleMap;
	      var offsetKey = _props2.offsetKey;
	      var styleSet = _props2.styleSet;

	      var styleObj = styleSet.reduce(function (map, styleName) {
	        var mergedStyles = {};
	        var style = customStyleMap[styleName];

	        if (style !== undefined && map.textDecoration !== style.textDecoration) {
	          mergedStyles.textDecoration = [map.textDecoration, style.textDecoration].join(' ');
	        }

	        return Object.assign(map, style, mergedStyles);
	      }, {});

	      return React.createElement('span', {
	        'data-offset-key': offsetKey,
	        ref: 'leaf',
	        style: styleObj }, React.createElement(DraftEditorTextNode, null, text));
	    }
	  }]);

	  return DraftEditorLeaf;
	}(React.Component);

	module.exports = DraftEditorLeaf;

	// A function passed through from the the top level to define a cx
	// style map for the provided style value.

	// Mapping of style names to CSS declarations.

	// Whether to force the DOM selection after render.

	// Whether this leaf is the last in its block. Used for a DOM hack.

	// The current `SelectionState`, used to

	// The offset of this string within its block.

	// The set of style(s) names to apply to the node.

	// The full text to be rendered within this node.

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DraftEditorPlaceholder.react
	 * @typechecks
	 * 
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var React = __webpack_require__(7);

	var cx = __webpack_require__(110);

	/**
	 * This component is responsible for rendering placeholder text for the
	 * `DraftEditor` component.
	 *
	 * Override placeholder style via CSS.
	 */

	var DraftEditorPlaceholder = function (_React$Component) {
	  _inherits(DraftEditorPlaceholder, _React$Component);

	  function DraftEditorPlaceholder() {
	    _classCallCheck(this, DraftEditorPlaceholder);

	    _get(Object.getPrototypeOf(DraftEditorPlaceholder.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(DraftEditorPlaceholder, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return this.props.text !== nextProps.text || this.props.editorState.getSelection().getHasFocus() !== nextProps.editorState.getSelection().getHasFocus();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var hasFocus = this.props.editorState.getSelection().getHasFocus();

	      var className = cx({
	        'public/DraftEditorPlaceholder/root': true,
	        'public/DraftEditorPlaceholder/hasFocus': hasFocus
	      });

	      return React.createElement('div', { className: className }, React.createElement('div', { className: cx('public/DraftEditorPlaceholder/inner') }, this.props.text));
	    }
	  }]);

	  return DraftEditorPlaceholder;
	}(React.Component);

	module.exports = DraftEditorPlaceholder;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DraftEditorTextNode.react
	 * @typechecks
	 * 
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var React = __webpack_require__(7);
	var ReactDOM = __webpack_require__(4);
	var UserAgent = __webpack_require__(139);

	// In IE, spans with <br> tags render as two newlines. By rendering a span
	// with only a newline character, we can be sure to render a single line.
	var useNewlineChar = UserAgent.isBrowser('IE <= 11');

	/**
	 * Check whether the node should be considered a newline.
	 */
	function isNewline(node) {
	  return useNewlineChar ? node.textContent === '\n' : node.tagName === 'BR';
	}

	/**
	 * Placeholder elements for empty text content.
	 *
	 * What is this `data-text` attribute, anyway? It turns out that we need to
	 * put an attribute on the lowest-level text node in order to preserve correct
	 * spellcheck handling. If the <span> is naked, Chrome and Safari may do
	 * bizarre things to do the DOM -- split text nodes, create extra spans, etc.
	 * If the <span> has an attribute, this appears not to happen.
	 * See http://jsfiddle.net/9khdavod/ for the failure case, and
	 * http://jsfiddle.net/7pg143f7/ for the fixed case.
	 */
	var NEWLINE_A = useNewlineChar ? React.createElement('span', { key: 'A', 'data-text': 'true' }, '\n') : React.createElement('br', { key: 'A', 'data-text': 'true' });

	var NEWLINE_B = useNewlineChar ? React.createElement('span', { key: 'B', 'data-text': 'true' }, '\n') : React.createElement('br', { key: 'B', 'data-text': 'true' });

	/**
	 * The lowest-level component in a `DraftEditor`, the text node component
	 * replaces the default React text node implementation. This allows us to
	 * perform custom handling of newline behavior and avoid re-rendering text
	 * nodes with DOM state that already matches the expectations of our immutable
	 * editor state.
	 */

	var DraftEditorTextNode = function (_React$Component) {
	  _inherits(DraftEditorTextNode, _React$Component);

	  function DraftEditorTextNode(props) {
	    _classCallCheck(this, DraftEditorTextNode);

	    _get(Object.getPrototypeOf(DraftEditorTextNode.prototype), 'constructor', this).call(this, props);
	    this._forceFlag = false;
	  }

	  _createClass(DraftEditorTextNode, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      var node = ReactDOM.findDOMNode(this);
	      var shouldBeNewline = nextProps.children === '';
	      if (shouldBeNewline) {
	        return !isNewline(node);
	      }
	      return node.textContent !== nextProps.children;
	    }
	  }, {
	    key: 'componentWillUpdate',
	    value: function componentWillUpdate() {
	      // By flipping this flag, we also keep flipping keys which forces
	      // React to remount this node every time it rerenders.
	      this._forceFlag = !this._forceFlag;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.props.children === '') {
	        return this._forceFlag ? NEWLINE_A : NEWLINE_B;
	      }
	      return React.createElement('span', { key: this._forceFlag ? 'A' : 'B', 'data-text': 'true' }, this.props.children);
	    }
	  }]);

	  return DraftEditorTextNode;
	}(React.Component);

	module.exports = DraftEditorTextNode;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DraftEntity
	 * @typechecks
	 * 
	 */

	'use strict';

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	var DraftEntityInstance = __webpack_require__(37);
	var Immutable = __webpack_require__(163);

	var invariant = __webpack_require__(122);

	var Map = Immutable.Map;

	var instances = Map();
	var instanceKey = 0;

	/**
	 * A "document entity" is an object containing metadata associated with a
	 * piece of text in a ContentBlock.
	 *
	 * For example, a `link` entity might include a `uri` property. When a
	 * ContentBlock is rendered in the browser, text that refers to that link
	 * entity may be rendered as an anchor, with the `uri` as the href value.
	 *
	 * In a ContentBlock, every position in the text may correspond to zero
	 * or one entities. This correspondence is tracked using a key string,
	 * generated via DraftEntity.create() and used to obtain entity metadata
	 * via DraftEntity.get().
	 */
	var DraftEntity = {
	  /**
	   * Create a DraftEntityInstance and store it for later retrieval.
	   *
	   * A random key string will be generated and returned. This key may
	   * be used to track the entity's usage in a ContentBlock, and for
	   * retrieving data about the entity at render time.
	   */
	  create: function create(type, mutability, data) {
	    return DraftEntity.add(new DraftEntityInstance({ type: type, mutability: mutability, data: data || {} }));
	  },

	  /**
	   * Add an existing DraftEntityInstance to the DraftEntity map. This is
	   * useful when restoring instances from the server.
	   */
	  add: function add(instance) {
	    var key = '' + ++instanceKey;
	    instances = instances.set(key, instance);
	    return key;
	  },

	  /**
	   * Retrieve the entity corresponding to the supplied key string.
	   */
	  get: function get(key) {
	    var instance = instances.get(key);
	    !!!instance ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Unknown DraftEntity key.') : invariant(false) : undefined;
	    return instance;
	  },

	  /**
	   * Entity instances are immutable. If you need to update the data for an
	   * instance, this method will merge your data updates and return a new
	   * instance.
	   */
	  mergeData: function mergeData(key, toMerge) {
	    var instance = DraftEntity.get(key);
	    var newData = _extends({}, instance.getData(), toMerge);
	    var newInstance = instance.set('data', newData);
	    instances = instances.set(key, newInstance);
	    return newInstance;
	  },

	  /**
	   * Completely replace the data for a given instance.
	   */
	  replaceData: function replaceData(key, newData) {
	    var instance = DraftEntity.get(key);
	    var newInstance = instance.set('data', newData);
	    instances = instances.set(key, newInstance);
	    return newInstance;
	  }
	};

	module.exports = DraftEntity;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DraftEntityInstance
	 * 
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Immutable = __webpack_require__(163);

	var Record = Immutable.Record;

	var DraftEntityInstanceRecord = Record({
	  type: 'TOKEN',
	  mutability: 'IMMUTABLE',
	  data: Object
	});

	/**
	 * An instance of a document entity, consisting of a `type` and relevant
	 * `data`, metadata about the entity.
	 *
	 * For instance, a "link" entity might provide a URI, and a "mention"
	 * entity might provide the mentioned user's ID. These pieces of data
	 * may be used when rendering the entity as part of a ContentBlock DOM
	 * representation. For a link, the data would be used as an href for
	 * the rendered anchor. For a mention, the ID could be used to retrieve
	 * a hovercard.
	 */

	var DraftEntityInstance = function (_DraftEntityInstanceRecord) {
	  _inherits(DraftEntityInstance, _DraftEntityInstanceRecord);

	  function DraftEntityInstance() {
	    _classCallCheck(this, DraftEntityInstance);

	    _get(Object.getPrototypeOf(DraftEntityInstance.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(DraftEntityInstance, [{
	    key: 'getType',
	    value: function getType() {
	      return this.get('type');
	    }
	  }, {
	    key: 'getMutability',
	    value: function getMutability() {
	      return this.get('mutability');
	    }
	  }, {
	    key: 'getData',
	    value: function getData() {
	      return this.get('data');
	    }
	  }]);

	  return DraftEntityInstance;
	}(DraftEntityInstanceRecord);

	module.exports = DraftEntityInstance;

/***/ },
/* 38 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DraftEntitySegments
	 * @typechecks
	 * 
	 */

	/**
	 * Identify the range to delete from a segmented entity.
	 *
	 * Rules:
	 *
	 *  Example: 'John F. Kennedy'
	 *
	 *   - Deletion from within any non-whitespace (i.e. ['John', 'F.', 'Kennedy'])
	 *     will return the range of that text.
	 *
	 *       'John F. Kennedy' -> 'John F.'
	 *                  ^
	 *
	 *   - Forward deletion of whitespace will remove the following section:
	 *
	 *       'John F. Kennedy' -> 'John Kennedy'
	 *            ^
	 *
	 *   - Backward deletion of whitespace will remove the previous section:
	 *
	 *       'John F. Kennedy' -> 'F. Kennedy'
	 *            ^
	 */
	'use strict';

	var DraftEntitySegments = {
	  getRemovalRange: function getRemovalRange(selectionStart, selectionEnd, text, entityStart, direction) {
	    var segments = text.split(' ');
	    segments = segments.map(function ( /*string*/segment, /*number*/ii) {
	      if (direction === 'forward') {
	        if (ii > 0) {
	          return ' ' + segment;
	        }
	      } else if (ii < segments.length - 1) {
	        return segment + ' ';
	      }
	      return segment;
	    });

	    var segmentStart = entityStart;
	    var segmentEnd;
	    var segment;
	    var removalStart = null;
	    var removalEnd = null;

	    for (var jj = 0; jj < segments.length; jj++) {
	      segment = segments[jj];
	      segmentEnd = segmentStart + segment.length;

	      // Our selection overlaps this segment.
	      if (selectionStart < segmentEnd && segmentStart < selectionEnd) {
	        if (removalStart !== null) {
	          removalEnd = segmentEnd;
	        } else {
	          removalStart = segmentStart;
	          removalEnd = segmentEnd;
	        }
	      } else if (removalStart !== null) {
	        break;
	      }

	      segmentStart = segmentEnd;
	    }

	    var entityEnd = entityStart + text.length;
	    var atStart = removalStart === entityStart;
	    var atEnd = removalEnd === entityEnd;

	    if (!atStart && atEnd || atStart && !atEnd) {
	      if (direction === 'forward') {
	        if (removalEnd !== entityEnd) {
	          removalEnd++;
	        }
	      } else if (removalStart !== entityStart) {
	        removalStart--;
	      }
	    }

	    return {
	      start: removalStart,
	      end: removalEnd
	    };
	  }
	};

	module.exports = DraftEntitySegments;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DraftModifier
	 * @typechecks
	 * 
	 */

	/**
	 * `DraftModifier` provides a set of convenience methods that apply
	 * modifications to a `ContentState` object based on a target `SelectionState`.
	 *
	 * Any change to a `ContentState` should be decomposable into a series of
	 * transaction functions that apply the required changes and return output
	 * `ContentState` objects.
	 *
	 * These functions encapsulate some of the most common transaction sequences.
	 */
	'use strict';

	var CharacterMetadata = __webpack_require__(15);
	var ContentStateInlineStyle = __webpack_require__(19);

	var _require = __webpack_require__(163);

	var OrderedSet = _require.OrderedSet;

	var applyEntityToContentState = __webpack_require__(12);
	var getCharacterRemovalRange = __webpack_require__(64);
	var getContentStateFragment = __webpack_require__(65);
	var insertFragmentIntoContentState = __webpack_require__(79);
	var insertTextIntoContentState = __webpack_require__(81);
	var invariant = __webpack_require__(122);
	var removeEntitiesAtEdges = __webpack_require__(96);
	var removeRangeFromContentState = __webpack_require__(97);
	var setBlockTypeForContentState = __webpack_require__(103);
	var splitBlockInContentState = __webpack_require__(105);

	var DraftModifier = {
	  replaceText: function replaceText(contentState, rangeToReplace, text, inlineStyle, entityKey) {
	    var withoutEntities = removeEntitiesAtEdges(contentState, rangeToReplace);
	    var withoutText = removeRangeFromContentState(withoutEntities, rangeToReplace);

	    var character = CharacterMetadata.create({
	      style: inlineStyle || OrderedSet(),
	      entity: entityKey || null
	    });

	    return insertTextIntoContentState(withoutText, withoutText.getSelectionAfter(), text, character);
	  },

	  insertText: function insertText(contentState, targetRange, text, inlineStyle, entityKey) {
	    !targetRange.isCollapsed() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Target range must be collapsed for `insertText`.') : invariant(false) : undefined;
	    return DraftModifier.replaceText(contentState, targetRange, text, inlineStyle, entityKey);
	  },

	  moveText: function moveText(contentState, removalRange, targetRange) {
	    var movedFragment = getContentStateFragment(contentState, removalRange);

	    var afterRemoval = DraftModifier.removeRange(contentState, removalRange, 'backward');

	    return DraftModifier.replaceWithFragment(afterRemoval, targetRange, movedFragment);
	  },

	  replaceWithFragment: function replaceWithFragment(contentState, targetRange, fragment) {
	    var withoutEntities = removeEntitiesAtEdges(contentState, targetRange);
	    var withoutText = removeRangeFromContentState(withoutEntities, targetRange);

	    return insertFragmentIntoContentState(withoutText, withoutText.getSelectionAfter(), fragment);
	  },

	  removeRange: function removeRange(contentState, rangeToRemove, removalDirection) {
	    // Check whether the selection state overlaps with a single entity.
	    // If so, try to remove the appropriate substring of the entity text.
	    if (rangeToRemove.getAnchorKey() === rangeToRemove.getFocusKey()) {
	      var key = rangeToRemove.getAnchorKey();
	      var startOffset = rangeToRemove.getStartOffset();
	      var endOffset = rangeToRemove.getEndOffset();
	      var block = contentState.getBlockForKey(key);

	      var startEntity = block.getEntityAt(startOffset);
	      var endEntity = block.getEntityAt(endOffset - 1);
	      if (startEntity && startEntity === endEntity) {
	        var adjustedRemovalRange = getCharacterRemovalRange(block, rangeToRemove, removalDirection);
	        return removeRangeFromContentState(contentState, adjustedRemovalRange);
	      }
	    }

	    var withoutEntities = removeEntitiesAtEdges(contentState, rangeToRemove);
	    return removeRangeFromContentState(withoutEntities, rangeToRemove);
	  },

	  splitBlock: function splitBlock(contentState, selectionState) {
	    var withoutEntities = removeEntitiesAtEdges(contentState, selectionState);
	    var withoutText = removeRangeFromContentState(withoutEntities, selectionState);

	    return splitBlockInContentState(withoutText, withoutText.getSelectionAfter());
	  },

	  applyInlineStyle: function applyInlineStyle(contentState, selectionState, inlineStyle) {
	    return ContentStateInlineStyle.add(contentState, selectionState, inlineStyle);
	  },

	  removeInlineStyle: function removeInlineStyle(contentState, selectionState, inlineStyle) {
	    return ContentStateInlineStyle.remove(contentState, selectionState, inlineStyle);
	  },

	  setBlockType: function setBlockType(contentState, selectionState, blockType) {
	    return setBlockTypeForContentState(contentState, selectionState, blockType);
	  },

	  applyEntity: function applyEntity(contentState, selectionState, entityKey) {
	    var withoutEntities = removeEntitiesAtEdges(contentState, selectionState);
	    return applyEntityToContentState(withoutEntities, selectionState, entityKey);
	  }
	};

	module.exports = DraftModifier;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DraftOffsetKey
	 * 
	 */

	'use strict';

	var _slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;_e = err;
	    } finally {
	      try {
	        if (!_n && _i['return']) _i['return']();
	      } finally {
	        if (_d) throw _e;
	      }
	    }return _arr;
	  }return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError('Invalid attempt to destructure non-iterable instance');
	    }
	  };
	}();

	var KEY_DELIMITER = '-';

	var DraftOffsetKey = {
	  encode: function encode(blockKey, decoratorKey, leafKey) {
	    return blockKey + KEY_DELIMITER + decoratorKey + KEY_DELIMITER + leafKey;
	  },

	  decode: function decode(offsetKey) {
	    var _offsetKey$split = offsetKey.split(KEY_DELIMITER);

	    var _offsetKey$split2 = _slicedToArray(_offsetKey$split, 3);

	    var blockKey = _offsetKey$split2[0];
	    var decoratorKey = _offsetKey$split2[1];
	    var leafKey = _offsetKey$split2[2];

	    return {
	      blockKey: blockKey,
	      decoratorKey: parseInt(decoratorKey, 10),
	      leafKey: parseInt(leafKey, 10)
	    };
	  }
	};

	module.exports = DraftOffsetKey;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DraftPasteProcessor
	 * @typechecks
	 * 
	 */

	'use strict';

	var CharacterMetadata = __webpack_require__(15);
	var ContentBlock = __webpack_require__(17);
	var DraftEntity = __webpack_require__(36);
	var Immutable = __webpack_require__(163);
	var URI = __webpack_require__(138);

	var generateBlockKey = __webpack_require__(63);
	var getSafeBodyFromHTML = __webpack_require__(74);
	var invariant = __webpack_require__(122);
	var nullthrows = __webpack_require__(129);
	var sanitizeDraftText = __webpack_require__(100);

	var List = Immutable.List;
	var OrderedSet = Immutable.OrderedSet;
	var Repeat = Immutable.Repeat;

	var NBSP = '&nbsp;';
	var SPACE = ' ';

	// Corresponds to max indent in campfire editor
	var MAX_DEPTH = 4;

	// used for replacing characters in HTML
	var REGEX_CR = new RegExp('\r', 'g');
	var REGEX_LF = new RegExp('\n', 'g');
	var REGEX_NBSP = new RegExp(NBSP, 'g');

	// Block tag flow is different because LIs do not have
	// a deterministic style ;_;
	var blockTags = ['p', 'h1', 'h2', 'h3', 'li', 'blockquote', 'pre'];
	var inlineTags = {
	  b: 'BOLD',
	  code: 'CODE',
	  del: 'STRIKETHROUGH',
	  em: 'ITALIC',
	  i: 'ITALIC',
	  s: 'STRIKETHROUGH',
	  strike: 'STRIKETHROUGH',
	  strong: 'BOLD',
	  u: 'UNDERLINE'
	};

	var lastBlock;

	function getEmptyChunk() {
	  return {
	    text: '',
	    inlines: [],
	    entities: [],
	    blocks: []
	  };
	}

	function getWhitespaceChunk(inEntity) {
	  var entities = new Array(1);
	  if (inEntity) {
	    entities[0] = inEntity;
	  }
	  return {
	    text: SPACE,
	    inlines: [OrderedSet()],
	    entities: entities,
	    blocks: []
	  };
	}

	function getSoftNewlineChunk() {
	  return {
	    text: '\n',
	    inlines: [OrderedSet()],
	    entities: new Array(1),
	    blocks: []
	  };
	}

	function getBlockDividerChunk(block, depth) {
	  return {
	    text: '\r',
	    inlines: [OrderedSet()],
	    entities: new Array(1),
	    blocks: [{
	      type: block,
	      depth: Math.max(0, Math.min(MAX_DEPTH, depth))
	    }]
	  };
	}

	function getBlockTypeForTag(tag, lastList) {
	  switch (tag) {
	    case 'h1':
	      return 'header-one';
	    case 'h2':
	      return 'header-two';
	    case 'li':
	      if (lastList === 'ol') {
	        return 'ordered-list-item';
	      }
	      return 'unordered-list-item';
	    case 'blockquote':
	      return 'blockquote';
	    case 'pre':
	      return 'code-block';
	    default:
	      return 'unstyled';
	  }
	}

	function processInlineTag(tag, node, currentStyle) {
	  var styleToCheck = inlineTags[tag];
	  if (styleToCheck) {
	    currentStyle = currentStyle.add(styleToCheck).toOrderedSet();
	  } else if (node instanceof HTMLElement) {
	    (function () {
	      var htmlElement = node;
	      currentStyle = currentStyle.withMutations(function (style) {
	        if (htmlElement.style.fontWeight === 'bold') {
	          style.add('BOLD');
	        }

	        if (htmlElement.style.fontStyle === 'italic') {
	          style.add('ITALIC');
	        }

	        if (htmlElement.style.textDecoration === 'underline') {
	          style.add('UNDERLINE');
	        }

	        if (htmlElement.style.textDecoration === 'line-through') {
	          style.add('STRIKETHROUGH');
	        }
	      }).toOrderedSet();
	    })();
	  }
	  return currentStyle;
	}

	function joinChunks(A, B) {
	  // Sometimes two blocks will touch in the DOM and we need to strip the
	  // extra delimiter to preserve niceness.
	  var lastInB = B.text.slice(0, 1);

	  if (A.text.slice(-1) === '\r' && lastInB === '\r') {
	    A.text = A.text.slice(0, -1);
	    A.inlines.pop();
	    A.entities.pop();
	    A.blocks.pop();
	  }

	  // Kill whitespace after blocks
	  if (A.text.slice(-1) === '\r') {
	    if (B.text === SPACE || B.text === '\n') {
	      return A;
	    } else if (lastInB === SPACE || lastInB === '\n') {
	      B.text = B.text.slice(1);
	      B.inlines.shift();
	      B.entities.shift();
	    }
	  }

	  return {
	    text: A.text + B.text,
	    inlines: A.inlines.concat(B.inlines),
	    entities: A.entities.concat(B.entities),
	    blocks: A.blocks.concat(B.blocks)
	  };
	}

	/**
	 * Check to see if we have anything like <p> <blockquote> <h1>... to create
	 * block tags from. If we do, we can use those and ignore <div> tags. If we
	 * don't, we can treat <div> tags as meaningful (unstyled) blocks.
	 */
	function containsSemanticBlockMarkup(html) {
	  return blockTags.some(function (tag) {
	    return html.indexOf('<' + tag) !== -1;
	  });
	}

	function hasValidLinkText(link) {
	  !(link instanceof HTMLAnchorElement) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Link must be an HTMLAnchorElement.') : invariant(false) : undefined;
	  var protocol = link.protocol;
	  return protocol === 'http:' || protocol === 'https:';
	}

	function genFragment(node, inlineStyle, lastList, inBlock, blockTags, depth, inEntity) {
	  var nodeName = node.nodeName.toLowerCase();
	  var newBlock = false;
	  var nextBlockType = 'unstyled';
	  var lastLastBlock = lastBlock;

	  // Base Case
	  if (nodeName === '#text') {
	    var text = node.textContent;
	    if (text.trim() === '' && inBlock !== 'pre') {
	      return getWhitespaceChunk(inEntity);
	    }
	    if (inBlock !== 'pre') {
	      // Can't use empty string because MSWord
	      text = text.replace(REGEX_LF, SPACE);
	    }

	    // save the last block so we can use it later
	    lastBlock = nodeName;

	    return {
	      text: text,
	      inlines: Array(text.length).fill(inlineStyle),
	      entities: Array(text.length).fill(inEntity),
	      blocks: []
	    };
	  }

	  // save the last block so we can use it later
	  lastBlock = nodeName;

	  // BR tags
	  if (nodeName === 'br') {
	    if (lastLastBlock === 'br' && (!inBlock || getBlockTypeForTag(inBlock, lastList) === 'unstyled')) {
	      return getBlockDividerChunk('unstyled', depth);
	    }
	    return getSoftNewlineChunk();
	  }

	  var chunk = getEmptyChunk();
	  var newChunk = null;

	  // Inline tags
	  inlineStyle = processInlineTag(nodeName, node, inlineStyle);

	  // Handle lists
	  if (nodeName === 'ul' || nodeName === 'ol') {
	    if (lastList) {
	      depth += 1;
	    }
	    lastList = nodeName;
	  }

	  // Block Tags
	  if (!inBlock && blockTags.indexOf(nodeName) !== -1) {
	    chunk = getBlockDividerChunk(getBlockTypeForTag(nodeName, lastList), depth);
	    inBlock = nodeName;
	    newBlock = true;
	  } else if (lastList && inBlock === 'li' && nodeName === 'li') {
	    chunk = getBlockDividerChunk(getBlockTypeForTag(nodeName, lastList), depth);
	    inBlock = nodeName;
	    newBlock = true;
	    nextBlockType = lastList === 'ul' ? 'unordered-list-item' : 'ordered-list-item';
	  }

	  // Recurse through children
	  var child = node.firstChild;
	  if (child != null) {
	    nodeName = child.nodeName.toLowerCase();
	  }

	  var entityId = null;
	  var href = null;

	  while (child) {
	    if (nodeName === 'a' && child.href && hasValidLinkText(child)) {
	      href = new URI(child.href).toString();
	      entityId = DraftEntity.create('LINK', 'MUTABLE', { url: href });
	    } else {
	      entityId = undefined;
	    }

	    newChunk = genFragment(child, inlineStyle, lastList, inBlock, blockTags, depth, entityId || inEntity);

	    chunk = joinChunks(chunk, newChunk);
	    var sibling = child.nextSibling;

	    // Put in a newline to break up blocks inside blocks
	    if (sibling && blockTags.indexOf(nodeName) >= 0 && inBlock) {
	      chunk = joinChunks(chunk, getSoftNewlineChunk());
	    }
	    if (sibling) {
	      nodeName = sibling.nodeName.toLowerCase();
	    }
	    child = sibling;
	  }

	  if (newBlock) {
	    chunk = joinChunks(chunk, getBlockDividerChunk(nextBlockType, depth));
	  }

	  return chunk;
	}

	function getChunkForHTML(html) {
	  html = html.trim().replace(REGEX_CR, '').replace(REGEX_NBSP, SPACE);

	  var safeBody = getSafeBodyFromHTML(html);
	  if (!safeBody) {
	    return null;
	  }
	  lastBlock = null;

	  // Sometimes we aren't dealing with content that contains nice semantic
	  // tags. In this case, use divs to separate everything out into paragraphs
	  // and hope for the best.
	  var workingBlocks = containsSemanticBlockMarkup(html) ? blockTags : ['div'];

	  // Start with -1 block depth to offset the fact that we are passing in a fake
	  // UL block to start with.
	  var chunk = genFragment(safeBody, OrderedSet(), 'ul', null, workingBlocks, -1);

	  // join with previous block to prevent weirdness on paste
	  if (chunk.text.indexOf('\r') === 0) {
	    chunk = {
	      text: chunk.text.slice(1),
	      inlines: chunk.inlines.slice(1),
	      entities: chunk.entities.slice(1),
	      blocks: chunk.blocks
	    };
	  }

	  // Kill block delimiter at the end
	  if (chunk.text.slice(-1) === '\r') {
	    chunk.text = chunk.text.slice(0, -1);
	    chunk.inlines = chunk.inlines.slice(0, -1);
	    chunk.entities = chunk.entities.slice(0, -1);
	    chunk.blocks.pop();
	  }

	  // If we saw no block tags, put an unstyled one in
	  if (chunk.blocks.length === 0) {
	    chunk.blocks.push({ type: 'unstyled', depth: 0 });
	  }

	  // Sometimes we start with text that isn't in a block, which is then
	  // followed by blocks. Need to fix up the blocks to add in
	  // an unstyled block for this content
	  if (chunk.text.split('\r').length === chunk.blocks.length + 1) {
	    chunk.blocks.unshift({ type: 'unstyled', depth: 0 });
	  }

	  return chunk;
	}

	var DraftPasteProcessor = {
	  processHTML: function processHTML(html) {
	    var chunk = getChunkForHTML(html);
	    if (chunk == null) {
	      return null;
	    }
	    var start = 0;
	    return chunk.text.split('\r').map(function (textBlock, ii) {
	      // Make absolutely certain that our text is acceptable.
	      textBlock = sanitizeDraftText(textBlock);
	      var end = start + textBlock.length;
	      var inlines = nullthrows(chunk).inlines.slice(start, end);
	      var entities = nullthrows(chunk).entities.slice(start, end);
	      var characterList = List(inlines.map(function (style, ii) {
	        var data = { style: style, entity: null };
	        if (entities[ii]) {
	          data.entity = entities[ii];
	        }
	        return CharacterMetadata.create(data);
	      }));
	      start = end + 1;

	      return new ContentBlock({
	        key: generateBlockKey(),
	        type: nullthrows(chunk).blocks[ii].type,
	        depth: nullthrows(chunk).blocks[ii].depth,
	        text: textBlock,
	        characterList: characterList
	      });
	    });
	  },

	  processText: function processText(textBlocks, character) {
	    return textBlocks.map(function (textLine) {
	      textLine = sanitizeDraftText(textLine);
	      return new ContentBlock({
	        key: generateBlockKey(),
	        type: 'unstyled',
	        text: textLine,
	        characterList: List(Repeat(character, textLine.length))
	      });
	    });
	  }
	};

	module.exports = DraftPasteProcessor;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DraftRemovableWord
	 * @typechecks
	 * 
	 */

	'use strict';

	var TokenizeUtil = __webpack_require__(133);

	var punctuation = TokenizeUtil.getPunctuation();

	// The apostrophe and curly single quotes behave in a curious way: when
	// surrounded on both sides by word characters, they behave as word chars; when
	// either neighbor is punctuation or an end of the string, they behave as
	// punctuation.
	var CHAMELEON_CHARS = '[\'‘’]';

	// Remove the underscore, which should count as part of the removable word. The
	// "chameleon chars" also count as punctuation in this regex.
	var WHITESPACE_AND_PUNCTUATION = '\\s|(?![_])' + punctuation;

	var DELETE_STRING = '^' + '(?:' + WHITESPACE_AND_PUNCTUATION + ')*' + '(?:' + CHAMELEON_CHARS + '|(?!' + WHITESPACE_AND_PUNCTUATION + ').)*' + '(?:(?!' + WHITESPACE_AND_PUNCTUATION + ').)';
	var DELETE_REGEX = new RegExp(DELETE_STRING);

	var BACKSPACE_STRING = '(?:(?!' + WHITESPACE_AND_PUNCTUATION + ').)' + '(?:' + CHAMELEON_CHARS + '|(?!' + WHITESPACE_AND_PUNCTUATION + ').)*' + '(?:' + WHITESPACE_AND_PUNCTUATION + ')*' + '$';
	var BACKSPACE_REGEX = new RegExp(BACKSPACE_STRING);

	function getRemovableWord(text, isBackward) {
	  var matches = isBackward ? BACKSPACE_REGEX.exec(text) : DELETE_REGEX.exec(text);
	  return matches ? matches[0] : text;
	}

	var DraftRemovableWord = {
	  getBackward: function getBackward(text) {
	    return getRemovableWord(text, true);
	  },

	  getForward: function getForward(text) {
	    return getRemovableWord(text, false);
	  }
	};

	module.exports = DraftRemovableWord;

/***/ },
/* 43 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DraftStringKey
	 * @typechecks
	 * 
	 */

	'use strict';

	var DraftStringKey = {
	  stringify: function stringify(key) {
	    return '_' + String(key);
	  },

	  unstringify: function unstringify(key) {
	    return key.slice(1);
	  }
	};

	module.exports = DraftStringKey;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule editOnBeforeInput
	 * 
	 */

	// When nothing is focused, Firefox regards two characters, `'` and `/`, as
	// commands that should open and focus the "quickfind" search bar. This should
	// *never* happen while a contenteditable is focused, but as of v28, it
	// sometimes does, even when the keypress event target is the contenteditable.
	// This breaks the input. Special case these characters to ensure that when
	// they are typed, we prevent default on the event to make sure not to
	// trigger quickfind.
	'use strict';

	var BlockTree = __webpack_require__(14);
	var DraftModifier = __webpack_require__(39);
	var EditorState = __webpack_require__(57);
	var UserAgent = __webpack_require__(139);

	var getEntityKeyForSelection = __webpack_require__(70);
	var isSelectionAtLeafStart = __webpack_require__(82);
	var nullthrows = __webpack_require__(129);

	var FF_QUICKFIND_CHAR = '\'';
	var FF_QUICKFIND_LINK_CHAR = '\/';
	var isFirefox = UserAgent.isBrowser('Firefox');

	function mustPreventDefaultForCharacter(character) {
	  return isFirefox && (character == FF_QUICKFIND_CHAR || character == FF_QUICKFIND_LINK_CHAR);
	}

	/**
	 * Replace the current selection with the specified text string, with the
	 * inline style and entity key applied to the newly inserted text.
	 */
	function replaceText(editorState, text, inlineStyle, entityKey) {
	  var contentState = DraftModifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), text, inlineStyle, entityKey);
	  return EditorState.push(editorState, contentState, 'insert-characters');
	}

	/**
	 * When `onBeforeInput` executes, the browser is attempting to insert a
	 * character into the editor. Apply this character data to the document,
	 * allowing native insertion if possible.
	 *
	 * Native insertion is encouraged in order to limit re-rendering and to
	 * preserve spellcheck highlighting, which disappears or flashes if re-render
	 * occurs on the relevant text nodes.
	 */
	function editOnBeforeInput(e) {
	  var chars = e.data;

	  // In some cases (ex: IE ideographic space insertion) no character data
	  // is provided. There's nothing to do when this happens.
	  if (!chars) {
	    return;
	  }

	  // Allow the top-level component to handle the insertion manually. This is
	  // useful when triggering interesting behaviors for a character insertion,
	  // Simple examples: replacing a raw text ':)' with a smile emoji or image
	  // decorator, or setting a block to be a list item after typing '- ' at the
	  // start of the block.
	  if (this.props.handleBeforeInput && this.props.handleBeforeInput(chars)) {
	    e.preventDefault();
	    return;
	  }

	  // If selection is collapsed, conditionally allow native behavior. This
	  // reduces re-renders and preserves spellcheck highlighting. If the selection
	  // is not collapsed, we will re-render.
	  var editorState = this.props.editorState;
	  var selection = editorState.getSelection();

	  if (!selection.isCollapsed()) {
	    e.preventDefault();
	    this.update(replaceText(editorState, chars, editorState.getCurrentInlineStyle(), getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection())));
	    return;
	  }

	  var mayAllowNative = !isSelectionAtLeafStart(editorState);
	  var newEditorState = replaceText(editorState, chars, editorState.getCurrentInlineStyle(), getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection()));

	  if (!mayAllowNative) {
	    e.preventDefault();
	    this.update(newEditorState);
	    return;
	  }

	  var anchorKey = selection.getAnchorKey();
	  var anchorTree = editorState.getBlockTree(anchorKey);

	  // Check the old and new "fingerprints" of the current block to determine
	  // whether this insertion requires any addition or removal of text nodes,
	  // in which case we would prevent the native character insertion.
	  var originalFingerprint = BlockTree.getFingerprint(anchorTree);
	  var newFingerprint = BlockTree.getFingerprint(newEditorState.getBlockTree(anchorKey));

	  if (mustPreventDefaultForCharacter(chars) || originalFingerprint !== newFingerprint || nullthrows(newEditorState.getDirectionMap()).get(anchorKey) !== nullthrows(editorState.getDirectionMap()).get(anchorKey)) {
	    e.preventDefault();
	  } else {
	    // The native event is allowed to occur.
	    newEditorState = EditorState.set(newEditorState, {
	      nativelyRenderedContent: newEditorState.getCurrentContent()
	    });
	  }

	  this.update(newEditorState);
	}

	module.exports = editOnBeforeInput;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule editOnBlur
	 * 
	 */

	'use strict';

	var EditorState = __webpack_require__(57);
	var UserAgent = __webpack_require__(139);

	var getActiveElement = __webpack_require__(113);

	var isWebKit = UserAgent.isEngine('WebKit');

	function editOnBlur(e) {
	  // Webkit has a bug in which blurring a contenteditable by clicking on
	  // other active elements will trigger the `blur` event but will not remove
	  // the DOM selection from the contenteditable. We therefore force the
	  // issue to be certain, checking whether the active element is `body`
	  // to force it when blurring occurs within the window (as opposed to
	  // clicking to another tab or window).
	  if (isWebKit && getActiveElement() === document.body) {
	    global.getSelection().removeAllRanges();
	  }

	  var editorState = this.props.editorState;
	  var currentSelection = editorState.getSelection();
	  if (!currentSelection.getHasFocus()) {
	    return;
	  }

	  var selection = currentSelection.set('hasFocus', false);
	  this.props.onBlur && this.props.onBlur(e);
	  this.update(EditorState.acceptSelection(editorState, selection));
	}

	module.exports = editOnBlur;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule editOnCompositionStart
	 * 
	 */

	'use strict';

	var EditorState = __webpack_require__(57);

	/**
	 * The user has begun using an IME input system. Switching to `composite` mode
	 * allows handling composition input and disables other edit behavior.
	 */
	function editOnCompositionStart() {
	  this.setRenderGuard();
	  this.setMode('composite');
	  this.update(EditorState.set(this.props.editorState, { inCompositionMode: true }));
	}

	module.exports = editOnCompositionStart;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule editOnCopy
	 * 
	 */

	'use strict';

	var getFragmentFromSelection = __webpack_require__(71);

	/**
	 * If we have a selection, create a ContentState fragment and store
	 * it in our internal clipboard. Subsequent paste events will use this
	 * fragment if no external clipboard data is supplied.
	 */
	function editOnCopy(e) {
	  var editorState = this.props.editorState;
	  var selection = editorState.getSelection();

	  // No selection, so there's nothing to copy.
	  if (selection.isCollapsed()) {
	    e.preventDefault();
	    return;
	  }

	  this.setClipboard(getFragmentFromSelection(this.props.editorState));
	}

	module.exports = editOnCopy;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule editOnCut
	 * 
	 */

	'use strict';

	var DraftModifier = __webpack_require__(39);
	var EditorState = __webpack_require__(57);
	var Style = __webpack_require__(132);

	var getFragmentFromSelection = __webpack_require__(71);
	var getScrollPosition = __webpack_require__(117);

	/**
	 * On `cut` events, native behavior is allowed to occur so that the system
	 * clipboard is set properly. This means that we need to take steps to recover
	 * the editor DOM state after the `cut` has occurred in order to maintain
	 * control of the component.
	 *
	 * In addition, we can keep a copy of the removed fragment, including all
	 * styles and entities, for use as an internal paste.
	 */
	function editOnCut(e) {
	  var _this = this;

	  var editorState = this.props.editorState;
	  var selection = editorState.getSelection();

	  // No selection, so there's nothing to cut.
	  if (selection.isCollapsed()) {
	    e.preventDefault();
	    return;
	  }

	  // Track the current scroll position so that it can be forced back in place
	  // after the editor regains control of the DOM.
	  var scrollParent = Style.getScrollParent(e.target);

	  var _getScrollPosition = getScrollPosition(scrollParent);

	  var x = _getScrollPosition.x;
	  var y = _getScrollPosition.y;

	  var fragment = getFragmentFromSelection(editorState);
	  this.setClipboard(fragment);

	  // Set `cut` mode to disable all event handling temporarily.
	  this.setRenderGuard();
	  this.setMode('cut');

	  // Let native `cut` behavior occur, then recover control.
	  setTimeout(function () {
	    _this.restoreEditorDOM({ x: x, y: y });
	    _this.removeRenderGuard();
	    _this.exitCurrentMode();
	    _this.update(removeFragment(editorState));
	  }, 0);
	}

	function removeFragment(editorState) {
	  var newContent = DraftModifier.removeRange(editorState.getCurrentContent(), editorState.getSelection(), 'forward');
	  return EditorState.push(editorState, newContent, 'remove-range');
	}

	module.exports = editOnCut;

/***/ },
/* 49 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule editOnDragOver
	 * 
	 */

	'use strict';

	/**
	 * Drag behavior has begun from outside the editor element.
	 */

	function editOnDragOver(e) {
	  this._internalDrag = false;
	  this.setMode('drag');
	  e.preventDefault();
	}

	module.exports = editOnDragOver;

/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule editOnDragStart
	 * 
	 */

	'use strict';

	/**
	 * A `dragstart` event has begun within the text editor component.
	 */

	function editOnDragStart() {
	  this._internalDrag = true;
	  this.setMode('drag');
	}

	module.exports = editOnDragStart;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule editOnFocus
	 * 
	 */

	'use strict';

	var EditorState = __webpack_require__(57);

	function editOnFocus(e) {
	  var editorState = this.props.editorState;
	  var currentSelection = editorState.getSelection();
	  if (currentSelection.getHasFocus()) {
	    return;
	  }

	  var selection = currentSelection.set('hasFocus', true);
	  this.props.onFocus && this.props.onFocus(e);

	  // When the tab containing this text editor is hidden and the user does a
	  // find-in-page in a _different_ tab, Chrome on Mac likes to forget what the
	  // selection was right after sending this focus event and (if you let it)
	  // moves the cursor back to the beginning of the editor, so we force the
	  // selection here instead of simply accepting it in order to preserve the
	  // old cursor position. See https://crbug.com/540004.
	  this.update(EditorState.forceSelection(editorState, selection));
	}

	module.exports = editOnFocus;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule editOnInput
	 * 
	 */

	'use strict';

	var DraftModifier = __webpack_require__(39);
	var DraftOffsetKey = __webpack_require__(40);
	var EditorState = __webpack_require__(57);
	var UserAgent = __webpack_require__(139);

	var findAncestorOffsetKey = __webpack_require__(61);
	var nullthrows = __webpack_require__(129);

	var isGecko = UserAgent.isEngine('Gecko');

	var DOUBLE_NEWLINE = '\n\n';

	/**
	 * This function is intended to handle spellcheck and autocorrect changes,
	 * which occur in the DOM natively without any opportunity to observe or
	 * interpret the changes before they occur.
	 *
	 * The `input` event fires in contentEditable elements reliably for non-IE
	 * browsers, immediately after changes occur to the editor DOM. Since our other
	 * handlers override or otherwise handle cover other varieties of text input,
	 * the DOM state should match the model in all controlled input cases. Thus,
	 * when an `input` change leads to a DOM/model mismatch, the change should be
	 * due to a spellcheck change, and we can incorporate it into our model.
	 */
	function editOnInput() {
	  var domSelection = global.getSelection();

	  var anchorNode = domSelection.anchorNode;
	  var isCollapsed = domSelection.isCollapsed;

	  if (anchorNode.nodeType !== Node.TEXT_NODE) {
	    return;
	  }

	  var domText = anchorNode.textContent;
	  var editorState = this.props.editorState;

	  var offsetKey = nullthrows(findAncestorOffsetKey(anchorNode));

	  var _DraftOffsetKey$decode = DraftOffsetKey.decode(offsetKey);

	  var blockKey = _DraftOffsetKey$decode.blockKey;
	  var decoratorKey = _DraftOffsetKey$decode.decoratorKey;
	  var leafKey = _DraftOffsetKey$decode.leafKey;

	  var _editorState$getBlockTree$getIn = editorState.getBlockTree(blockKey).getIn([decoratorKey, 'leaves', leafKey]);

	  var start = _editorState$getBlockTree$getIn.start;
	  var end = _editorState$getBlockTree$getIn.end;

	  var content = editorState.getCurrentContent();
	  var block = content.getBlockForKey(blockKey);
	  var modelText = block.getText().slice(start, end);

	  // Special-case soft newlines here. If the DOM text ends in a soft newline,
	  // we will have manually inserted an extra soft newline in DraftEditorLeaf.
	  // We want to remove this extra newline for the purpose of our comparison
	  // of DOM and model text.
	  if (domText.endsWith(DOUBLE_NEWLINE)) {
	    domText = domText.slice(0, -1);
	  }

	  // No change -- the DOM is up to date. Nothing to do here.
	  if (domText === modelText) {
	    return;
	  }

	  var selection = editorState.getSelection();

	  // We'll replace the entire leaf with the text content of the target.
	  var targetRange = selection.merge({
	    anchorOffset: start,
	    focusOffset: end,
	    isBackward: false
	  });

	  var newContent = DraftModifier.replaceText(content, targetRange, domText, block.getInlineStyleAt(start));

	  var anchorOffset, focusOffset, startOffset, endOffset;

	  if (isGecko) {
	    // Firefox selection does not change while the context menu is open, so
	    // we preserve the anchor and focus values of the DOM selection.
	    anchorOffset = domSelection.anchorOffset;
	    focusOffset = domSelection.focusOffset;
	    startOffset = start + Math.min(anchorOffset, focusOffset);
	    endOffset = startOffset + Math.abs(anchorOffset - focusOffset);
	    anchorOffset = startOffset;
	    focusOffset = endOffset;
	  } else {
	    // Browsers other than Firefox may adjust DOM selection while the context
	    // menu is open, and Safari autocorrect is prone to providing an inaccurate
	    // DOM selection. Don't trust it. Instead, use our existing SelectionState
	    // and adjust it based on the number of characters changed during the
	    // mutation.
	    var charDelta = domText.length - modelText.length;
	    startOffset = selection.getStartOffset();
	    endOffset = selection.getEndOffset();

	    anchorOffset = isCollapsed ? endOffset + charDelta : startOffset;
	    focusOffset = endOffset + charDelta;
	  }

	  var contentWithAdjustedDOMSelection = newContent.merge({
	    selectionBefore: content.getSelectionAfter(),
	    selectionAfter: selection.merge({ anchorOffset: anchorOffset, focusOffset: focusOffset })
	  });

	  this.update(EditorState.push(editorState, contentWithAdjustedDOMSelection, 'spellcheck-change'));
	}

	module.exports = editOnInput;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule editOnKeyDown
	 * 
	 */

	/**
	 * Map a `DraftEditorCommand` command value to a corresponding function.
	 */
	'use strict';

	var EditorState = __webpack_require__(57);
	var Keys = __webpack_require__(126);
	var SecondaryClipboard = __webpack_require__(101);

	var keyCommandBackspaceToStartOfLine = __webpack_require__(84);
	var keyCommandBackspaceWord = __webpack_require__(85);
	var keyCommandDeleteWord = __webpack_require__(86);
	var keyCommandInsertNewline = __webpack_require__(87);
	var keyCommandPlainBackspace = __webpack_require__(90);
	var keyCommandPlainDelete = __webpack_require__(91);
	var keyCommandMoveSelectionToEndOfBlock = __webpack_require__(88);
	var keyCommandMoveSelectionToStartOfBlock = __webpack_require__(89);
	var keyCommandTransposeCharacters = __webpack_require__(92);
	var keyCommandUndo = __webpack_require__(93);

	function onKeyCommand(command, editorState) {
	  switch (command) {
	    case 'redo':
	      return EditorState.redo(editorState);
	    case 'delete':
	      return keyCommandPlainDelete(editorState);
	    case 'delete-word':
	      return keyCommandDeleteWord(editorState);
	    case 'backspace':
	      return keyCommandPlainBackspace(editorState);
	    case 'backspace-word':
	      return keyCommandBackspaceWord(editorState);
	    case 'backspace-to-start-of-line':
	      return keyCommandBackspaceToStartOfLine(editorState);
	    case 'split-block':
	      return keyCommandInsertNewline(editorState);
	    case 'transpose-characters':
	      return keyCommandTransposeCharacters(editorState);
	    case 'move-selection-to-start-of-block':
	      return keyCommandMoveSelectionToStartOfBlock(editorState);
	    case 'move-selection-to-end-of-block':
	      return keyCommandMoveSelectionToEndOfBlock(editorState);
	    case 'secondary-cut':
	      return SecondaryClipboard.cut(editorState);
	    case 'secondary-paste':
	      return SecondaryClipboard.paste(editorState);
	    default:
	      return editorState;
	  }
	}

	/**
	 * Intercept keydown behavior to handle keys and commands manually, if desired.
	 *
	 * Keydown combinations may be mapped to `DraftCommand` values, which may
	 * correspond to command functions that modify the editor or its contents.
	 *
	 * See `getDefaultKeyBinding` for defaults. Alternatively, the top-level
	 * component may provide a custom mapping via the `keyBindingFn` prop.
	 */
	function editOnKeyDown(e) {
	  var keyCode = e.which;
	  var editorState = this.props.editorState;

	  switch (keyCode) {
	    case Keys.RETURN:
	      e.preventDefault();
	      // The top-level component may manually handle newline insertion. If
	      // no special handling is performed, insert a newline.
	      if (!this.props.handleReturn || !this.props.handleReturn(e)) {
	        this.update(keyCommandInsertNewline(editorState));
	      }
	      return;
	    case Keys.ESC:
	      e.preventDefault();
	      this.props.onEscape && this.props.onEscape(e);
	      return;
	    case Keys.TAB:
	      this.props.onTab && this.props.onTab(e);
	      return;
	    case Keys.UP:
	      this.props.onUpArrow && this.props.onUpArrow(e);
	      return;
	    case Keys.DOWN:
	      this.props.onDownArrow && this.props.onDownArrow(e);
	      return;
	  }

	  var command = this.props.keyBindingFn(e);

	  // If no command is specified, allow keydown event to continue.
	  if (!command) {
	    return;
	  }

	  if (command === 'undo') {
	    // Since undo requires some special updating behavior to keep the editor
	    // in sync, handle it separately.
	    keyCommandUndo(e, editorState, this.update);
	    return;
	  }

	  // At this point, we know that we're handling a command of some kind, so
	  // we don't want to insert a character following the keydown.
	  e.preventDefault();

	  // Allow components higher up the tree to handle the command first.
	  if (this.props.handleKeyCommand && this.props.handleKeyCommand(command)) {
	    return;
	  }

	  var newState = onKeyCommand(command, editorState);
	  if (newState !== editorState) {
	    this.update(newState);
	  }
	}

	module.exports = editOnKeyDown;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule editOnPaste
	 * 
	 */

	/**
	 * Paste content.
	 */
	'use strict';

	var BlockMapBuilder = __webpack_require__(13);
	var CharacterMetadata = __webpack_require__(15);
	var DataTransfer = __webpack_require__(111);
	var DraftModifier = __webpack_require__(39);
	var DraftPasteProcessor = __webpack_require__(41);
	var EditorState = __webpack_require__(57);

	var getEntityKeyForSelection = __webpack_require__(70);
	var getTextContentFromFiles = __webpack_require__(76);
	var nullthrows = __webpack_require__(129);
	var splitTextIntoTextBlocks = __webpack_require__(106);

	function editOnPaste(e) {
	  var _this = this;

	  e.preventDefault();
	  var data = new DataTransfer(e.clipboardData);

	  // Get files, unless this is likely to be a string the user wants inline.
	  if (!data.isRichText()) {
	    var files = data.getFiles();
	    var defaultFileText = data.getText();
	    if (files.length > 0) {
	      // Allow customized paste handling for images, etc. Otherwise, fall
	      // through to insert text contents into the editor.
	      if (this.props.handlePastedFiles && this.props.handlePastedFiles(files)) {
	        return;
	      }

	      getTextContentFromFiles(files, function ( /*string*/fileText) {
	        fileText = fileText || defaultFileText;
	        if (!fileText) {
	          return;
	        }

	        var editorState = _this.props.editorState;

	        var blocks = splitTextIntoTextBlocks(fileText);
	        var character = CharacterMetadata.create({
	          style: editorState.getCurrentInlineStyle(),
	          entity: getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection())
	        });

	        var text = DraftPasteProcessor.processText(blocks, character);
	        var fragment = BlockMapBuilder.createFromArray(text);

	        var withInsertedText = DraftModifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), fragment);

	        _this.update(EditorState.push(editorState, withInsertedText, 'insert-fragment'));
	      });

	      return;
	    }
	  }

	  var textBlocks = null;
	  var text = data.getText();
	  this.props.onPasteRawText && this.props.onPasteRawText(text);
	  if (text) {
	    textBlocks = splitTextIntoTextBlocks(text);
	  }

	  if (!this.props.stripPastedStyles) {
	    // If the text from the paste event is rich content that matches what we
	    // already have on the internal clipboard, assume that we should just use
	    // the clipboard fragment for the paste. This will allow us to preserve
	    // styling and entities, if any are present. Note that newlines are
	    // stripped during comparison -- this is because copy/paste within the
	    // editor in Firefox and IE will not include empty lines. The resulting
	    // paste will preserve the newlines correctly.
	    if (data.isRichText() && this.getClipboard()) {
	      textBlocks = nullthrows(textBlocks);
	      var textBlocksWithoutNewlines = textBlocks.filter(filterOutNewlines);
	      var currentClipboard = this.getClipboard();
	      var clipboardWithoutNewlines = currentClipboard.toSeq().map(function (clipBlock) {
	        return clipBlock.getText();
	      }).filter(filterOutNewlines).toArray();

	      var clipboardMatch = textBlocksWithoutNewlines.every(function (line, ii) {
	        return line === clipboardWithoutNewlines[ii];
	      });

	      if (clipboardMatch) {
	        this.update(insertFragment(this.props.editorState, currentClipboard));
	        return;
	      }
	    }

	    // If there is html paste data, try to parse that.
	    var htmlData = data.getHTML();
	    if (htmlData) {
	      var htmlFragment = DraftPasteProcessor.processHTML(htmlData);

	      if (htmlFragment) {
	        var htmlMap = BlockMapBuilder.createFromArray(htmlFragment);
	        this.update(insertFragment(this.props.editorState, htmlMap));
	        return;
	      }
	    }
	    // Otherwise, create a new fragment from our pasted text. Also
	    // empty the internal clipboard, since it's no longer valid.
	    this.setClipboard(null);
	  }

	  if (textBlocks) {
	    var editorState = this.props.editorState;

	    var character = CharacterMetadata.create({
	      style: editorState.getCurrentInlineStyle(),
	      entity: getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection())
	    });

	    var textFragment = DraftPasteProcessor.processText(textBlocks, character);

	    var textMap = BlockMapBuilder.createFromArray(textFragment);
	    this.update(insertFragment(this.props.editorState, textMap));
	  }
	}

	function filterOutNewlines(str) {
	  return str.length > 0;
	}

	function insertFragment(editorState, fragment) {
	  var newContent = DraftModifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), fragment);
	  return EditorState.push(editorState, newContent, 'insert-fragment');
	}

	module.exports = editOnPaste;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule editOnSelect
	 * 
	 */

	'use strict';

	var EditorState = __webpack_require__(57);
	var ReactDOM = __webpack_require__(4);

	var getDraftEditorSelection = __webpack_require__(67);

	function editOnSelect() {
	  if (this._blockSelectEvents) {
	    return;
	  }

	  var editorState = this.props.editorState;
	  var documentSelection = getDraftEditorSelection(editorState, ReactDOM.findDOMNode(this.refs.editorContainer).firstChild);
	  var updatedSelectionState = documentSelection.selectionState;

	  if (updatedSelectionState !== editorState.getSelection()) {
	    if (documentSelection.needsRecovery) {
	      editorState = EditorState.forceSelection(editorState, updatedSelectionState);
	    } else {
	      editorState = EditorState.acceptSelection(editorState, updatedSelectionState);
	    }
	    this.update(editorState);
	  }
	}

	module.exports = editOnSelect;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule EditorBidiService
	 * @typechecks
	 * 
	 */

	'use strict';

	var Immutable = __webpack_require__(163);
	var UnicodeBidiService = __webpack_require__(136);

	var nullthrows = __webpack_require__(129);

	var OrderedMap = Immutable.OrderedMap;

	var bidiService;

	var EditorBidiService = {
	  getDirectionMap: function getDirectionMap(content, prevBidiMap) {
	    if (!bidiService) {
	      bidiService = new UnicodeBidiService();
	    } else {
	      bidiService.reset();
	    }

	    var blockMap = content.getBlockMap();
	    var nextBidi = blockMap.valueSeq().map(function (block) {
	      return nullthrows(bidiService).getDirection(block.getText());
	    });
	    var bidiMap = OrderedMap(blockMap.keySeq().zip(nextBidi));

	    if (prevBidiMap != null && Immutable.is(prevBidiMap, bidiMap)) {
	      return prevBidiMap;
	    }

	    return bidiMap;
	  }
	};

	module.exports = EditorBidiService;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule EditorState
	 * 
	 */

	'use strict';

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var BlockTree = __webpack_require__(14);
	var ContentState = __webpack_require__(18);
	var EditorBidiService = __webpack_require__(56);
	var Immutable = __webpack_require__(163);
	var SelectionState = __webpack_require__(102);

	var OrderedSet = Immutable.OrderedSet;
	var Record = Immutable.Record;
	var Stack = Immutable.Stack;

	var defaultRecord = {
	  allowUndo: true,
	  currentContent: null,
	  decorator: null,
	  directionMap: null,
	  forceSelection: false,
	  inCompositionMode: false,
	  inlineStyleOverride: null,
	  lastChangeType: null,
	  nativelyRenderedContent: null,
	  redoStack: Stack(),
	  selection: null,
	  treeMap: null,
	  undoStack: Stack()
	};

	var EditorStateRecord = Record(defaultRecord);

	var EditorState = function () {
	  _createClass(EditorState, [{
	    key: 'toJS',
	    value: function toJS() {
	      return this.getImmutable().toJS();
	    }
	  }, {
	    key: 'getAllowUndo',
	    value: function getAllowUndo() {
	      return this.getImmutable().get('allowUndo');
	    }
	  }, {
	    key: 'getCurrentContent',
	    value: function getCurrentContent() {
	      return this.getImmutable().get('currentContent');
	    }
	  }, {
	    key: 'getUndoStack',
	    value: function getUndoStack() {
	      return this.getImmutable().get('undoStack');
	    }
	  }, {
	    key: 'getRedoStack',
	    value: function getRedoStack() {
	      return this.getImmutable().get('redoStack');
	    }
	  }, {
	    key: 'getSelection',
	    value: function getSelection() {
	      return this.getImmutable().get('selection');
	    }
	  }, {
	    key: 'getDecorator',
	    value: function getDecorator() {
	      return this.getImmutable().get('decorator');
	    }
	  }, {
	    key: 'isInCompositionMode',
	    value: function isInCompositionMode() {
	      return this.getImmutable().get('inCompositionMode');
	    }
	  }, {
	    key: 'mustForceSelection',
	    value: function mustForceSelection() {
	      return this.getImmutable().get('forceSelection');
	    }
	  }, {
	    key: 'getNativelyRenderedContent',
	    value: function getNativelyRenderedContent() {
	      return this.getImmutable().get('nativelyRenderedContent');
	    }
	  }, {
	    key: 'getLastChangeType',
	    value: function getLastChangeType() {
	      return this.getImmutable().get('lastChangeType');
	    }

	    /**
	     * While editing, the user may apply inline style commands with a collapsed
	     * cursor, intending to type text that adopts the specified style. In this
	     * case, we track the specified style as an "override" that takes precedence
	     * over the inline style of the text adjacent to the cursor.
	     *
	     * If null, there is no override in place.
	     */
	  }, {
	    key: 'getInlineStyleOverride',
	    value: function getInlineStyleOverride() {
	      return this.getImmutable().get('inlineStyleOverride');
	    }

	    /**
	     * Get the appropriate inline style for the editor state. If an
	     * override is in place, use it. Otherwise, the current style is
	     * based on the location of the selection state.
	     */
	  }, {
	    key: 'getCurrentInlineStyle',
	    value: function getCurrentInlineStyle() {
	      var override = this.getInlineStyleOverride();
	      if (override != null) {
	        return override;
	      }

	      var content = this.getCurrentContent();
	      var selection = this.getSelection();

	      if (selection.isCollapsed()) {
	        return getInlineStyleForCollapsedSelection(content, selection);
	      }

	      return getInlineStyleForNonCollapsedSelection(content, selection);
	    }
	  }, {
	    key: 'getBlockTree',
	    value: function getBlockTree(blockKey) {
	      return this.getImmutable().getIn(['treeMap', blockKey]);
	    }
	  }, {
	    key: 'isSelectionAtStartOfContent',
	    value: function isSelectionAtStartOfContent() {
	      var firstKey = this.getCurrentContent().getBlockMap().first().getKey();
	      return this.getSelection().hasEdgeWithin(firstKey, 0, 0);
	    }
	  }, {
	    key: 'isSelectionAtEndOfContent',
	    value: function isSelectionAtEndOfContent() {
	      var content = this.getCurrentContent();
	      var blockMap = content.getBlockMap();
	      var last = blockMap.last();
	      var end = last.getLength();
	      return this.getSelection().hasEdgeWithin(last.getKey(), end, end);
	    }
	  }, {
	    key: 'getDirectionMap',
	    value: function getDirectionMap() {
	      return this.getImmutable().get('directionMap');
	    }

	    /**
	     * Incorporate native DOM selection changes into the EditorState. This
	     * method can be used when we simply want to accept whatever the DOM
	     * has given us to represent selection, and we do not need to re-render
	     * the editor.
	     *
	     * To forcibly move the DOM selection, see `EditorState.forceSelection`.
	     */
	  }], [{
	    key: 'createEmpty',
	    value: function createEmpty(decorator) {
	      return EditorState.createWithContent(ContentState.createFromText(''), decorator);
	    }
	  }, {
	    key: 'createWithContent',
	    value: function createWithContent(contentState, decorator) {
	      var firstKey = contentState.getBlockMap().first().getKey();
	      return EditorState.create({
	        currentContent: contentState,
	        undoStack: Stack(),
	        redoStack: Stack(),
	        decorator: decorator || null,
	        selection: SelectionState.createEmpty(firstKey)
	      });
	    }
	  }, {
	    key: 'create',
	    value: function create(config) {
	      var currentContent = config.currentContent;
	      var decorator = config.decorator;

	      var recordConfig = _extends({}, config, {
	        treeMap: generateNewTreeMap(currentContent, decorator),
	        directionMap: EditorBidiService.getDirectionMap(currentContent)
	      });
	      return new EditorState(new EditorStateRecord(recordConfig));
	    }
	  }, {
	    key: 'set',
	    value: function set(editorState, put) {
	      var map = editorState.getImmutable().withMutations(function (state) {
	        var existingDecorator = state.get('decorator');
	        var decorator = existingDecorator;
	        if (put.decorator === null) {
	          decorator = null;
	        } else if (put.decorator) {
	          decorator = put.decorator;
	        }

	        var newContent = put.currentContent || editorState.getCurrentContent();

	        if (decorator !== existingDecorator) {
	          var treeMap = state.get('treeMap');
	          var newTreeMap;
	          if (decorator && existingDecorator) {
	            newTreeMap = regenerateTreeForNewDecorator(newContent.getBlockMap(), treeMap, decorator, existingDecorator);
	          } else {
	            newTreeMap = generateNewTreeMap(newContent, decorator);
	          }

	          state.merge({
	            decorator: decorator,
	            treeMap: newTreeMap,
	            nativelyRenderedContent: null
	          });
	          return;
	        }

	        var existingContent = editorState.getCurrentContent();
	        if (newContent !== existingContent) {
	          state.set('treeMap', regenerateTreeForNewBlocks(editorState, newContent.getBlockMap(), decorator));
	        }

	        state.merge(put);
	      });

	      return new EditorState(map);
	    }
	  }, {
	    key: 'acceptSelection',
	    value: function acceptSelection(editorState, selection) {
	      return updateSelection(editorState, selection, false);
	    }

	    /**
	     * At times, we need to force the DOM selection to be where we
	     * need it to be. This can occur when the anchor or focus nodes
	     * are non-text nodes, for instance. In this case, we want to trigger
	     * a re-render of the editor, which in turn forces selection into
	     * the correct place in the DOM. The `forceSelection` method
	     * accomplishes this.
	     *
	     * This method should be used in cases where you need to explicitly
	     * move the DOM selection from one place to another without a change
	     * in ContentState.
	     */
	  }, {
	    key: 'forceSelection',
	    value: function forceSelection(editorState, selection) {
	      if (!selection.getHasFocus()) {
	        selection = selection.set('hasFocus', true);
	      }
	      return updateSelection(editorState, selection, true);
	    }

	    /**
	     * Move selection to the end of the editor without forcing focus.
	     */
	  }, {
	    key: 'moveSelectionToEnd',
	    value: function moveSelectionToEnd(editorState) {
	      var content = editorState.getCurrentContent();
	      var lastBlock = content.getLastBlock();
	      var lastKey = lastBlock.getKey();
	      var length = lastBlock.getLength();

	      return EditorState.acceptSelection(editorState, new SelectionState({
	        anchorKey: lastKey,
	        anchorOffset: length,
	        focusKey: lastKey,
	        focusOffset: length,
	        isBackward: false
	      }));
	    }

	    /**
	     * Force focus to the end of the editor. This is useful in scenarios
	     * where we want to programatically focus the input and it makes sense
	     * to allow the user to continue working seamlessly.
	     */
	  }, {
	    key: 'moveFocusToEnd',
	    value: function moveFocusToEnd(editorState) {
	      var afterSelectionMove = EditorState.moveSelectionToEnd(editorState);
	      return EditorState.forceSelection(afterSelectionMove, afterSelectionMove.getSelection());
	    }

	    /**
	     * Push the current ContentState onto the undo stack if it should be
	     * considered a boundary state, and set the provided ContentState as the
	     * new current content.
	     */
	  }, {
	    key: 'push',
	    value: function push(editorState, contentState, changeType) {
	      if (editorState.getCurrentContent() === contentState) {
	        return editorState;
	      }

	      var forceSelection = changeType !== 'insert-characters';
	      var directionMap = EditorBidiService.getDirectionMap(contentState, editorState.getDirectionMap());

	      if (!editorState.getAllowUndo()) {
	        return EditorState.set(editorState, {
	          currentContent: contentState,
	          directionMap: directionMap,
	          lastChangeType: changeType,
	          selection: contentState.getSelectionAfter(),
	          forceSelection: forceSelection,
	          inlineStyleOverride: null
	        });
	      }

	      var selection = editorState.getSelection();
	      var currentContent = editorState.getCurrentContent();
	      var undoStack = editorState.getUndoStack();
	      var newContent = contentState;

	      if (selection !== currentContent.getSelectionAfter() || mustBecomeBoundary(editorState, changeType)) {
	        undoStack = undoStack.push(currentContent);
	        newContent = newContent.set('selectionBefore', selection);
	      } else if (changeType === 'insert-characters' || changeType === 'backspace-character' || changeType === 'delete-character') {
	        // Preserve the previous selection.
	        newContent = newContent.set('selectionBefore', currentContent.getSelectionBefore());
	      }

	      return EditorState.set(editorState, {
	        currentContent: newContent,
	        directionMap: directionMap,
	        undoStack: undoStack,
	        redoStack: Stack(),
	        lastChangeType: changeType,
	        selection: contentState.getSelectionAfter(),
	        forceSelection: forceSelection,
	        inlineStyleOverride: null
	      });
	    }

	    /**
	     * Make the top ContentState in the undo stack the new current content and
	     * push the current content onto the redo stack.
	     */
	  }, {
	    key: 'undo',
	    value: function undo(editorState) {
	      if (!editorState.getAllowUndo()) {
	        return editorState;
	      }

	      var undoStack = editorState.getUndoStack();
	      var newCurrentContent = undoStack.peek();
	      if (!newCurrentContent) {
	        return editorState;
	      }

	      var currentContent = editorState.getCurrentContent();
	      var directionMap = EditorBidiService.getDirectionMap(newCurrentContent, editorState.getDirectionMap());

	      return EditorState.set(editorState, {
	        currentContent: newCurrentContent,
	        directionMap: directionMap,
	        undoStack: undoStack.shift(),
	        redoStack: editorState.getRedoStack().push(currentContent),
	        forceSelection: true,
	        inlineStyleOverride: null,
	        lastChangeType: 'undo',
	        nativelyRenderedContent: null,
	        selection: currentContent.getSelectionBefore()
	      });
	    }

	    /**
	     * Make the top ContentState in the redo stack the new current content and
	     * push the current content onto the undo stack.
	     */
	  }, {
	    key: 'redo',
	    value: function redo(editorState) {
	      if (!editorState.getAllowUndo()) {
	        return editorState;
	      }

	      var redoStack = editorState.getRedoStack();
	      var newCurrentContent = redoStack.peek();
	      if (!newCurrentContent) {
	        return editorState;
	      }

	      var currentContent = editorState.getCurrentContent();
	      var directionMap = EditorBidiService.getDirectionMap(newCurrentContent, editorState.getDirectionMap());

	      return EditorState.set(editorState, {
	        currentContent: newCurrentContent,
	        directionMap: directionMap,
	        undoStack: editorState.getUndoStack().push(currentContent),
	        redoStack: redoStack.shift(),
	        forceSelection: true,
	        inlineStyleOverride: null,
	        lastChangeType: 'redo',
	        nativelyRenderedContent: null,
	        selection: newCurrentContent.getSelectionAfter()
	      });
	    }

	    /**
	     * Not for public consumption.
	     */
	  }]);

	  function EditorState(immutable) {
	    _classCallCheck(this, EditorState);

	    this._immutable = immutable;
	  }

	  /**
	   * Set the supplied SelectionState as the new current selection, and set
	   * the `force` flag to trigger manual selection placement by the view.
	   */

	  /**
	   * Not for public consumption.
	   */

	  _createClass(EditorState, [{
	    key: 'getImmutable',
	    value: function getImmutable() {
	      return this._immutable;
	    }
	  }]);

	  return EditorState;
	}();

	function updateSelection(editorState, selection, forceSelection) {
	  return EditorState.set(editorState, {
	    selection: selection,
	    forceSelection: forceSelection,
	    nativelyRenderedContent: null,
	    inlineStyleOverride: null
	  });
	}

	/**
	 * Regenerate the entire tree map for a given ContentState and decorator.
	 * Returns an OrderedMap that maps all available ContentBlock objects.
	 */
	function generateNewTreeMap(contentState, decorator) {
	  return contentState.getBlockMap().map(function (block) {
	    return BlockTree.generate(block, decorator);
	  }).toOrderedMap();
	}

	/**
	 * Regenerate tree map objects for all ContentBlocks that have changed
	 * between the current editorState and newContent. Returns an OrderedMap
	 * with only changed regenerated tree map objects.
	 */
	function regenerateTreeForNewBlocks(editorState, newBlockMap, decorator) {
	  var prevBlockMap = editorState.getCurrentContent().getBlockMap();
	  var prevTreeMap = editorState.getImmutable().get('treeMap');
	  return prevTreeMap.merge(newBlockMap.toSeq().filter(function (block, key) {
	    return block !== prevBlockMap.get(key);
	  }).map(function (block) {
	    return BlockTree.generate(block, decorator);
	  }));
	}

	/**
	 * Generate tree map objects for a new decorator object, preserving any
	 * decorations that are unchanged from the previous decorator.
	 *
	 * Note that in order for this to perform optimally, decoration Lists for
	 * decorators should be preserved when possible to allow for direct immutable
	 * List comparison.
	 */
	function regenerateTreeForNewDecorator(blockMap, previousTreeMap, decorator, existingDecorator) {
	  return previousTreeMap.merge(blockMap.toSeq().filter(function (block) {
	    return decorator.getDecorations(block) !== existingDecorator.getDecorations(block);
	  }).map(function (block) {
	    return BlockTree.generate(block, decorator);
	  }));
	}

	/**
	 * Return whether a change should be considered a boundary state, given
	 * the previous change type. Allows us to discard potential boundary states
	 * during standard typing or deletion behavior.
	 */
	function mustBecomeBoundary(editorState, changeType) {
	  var lastChangeType = editorState.getLastChangeType();
	  return changeType !== lastChangeType || changeType !== 'insert-characters' && changeType !== 'backspace-character' && changeType !== 'delete-character';
	}

	function getInlineStyleForCollapsedSelection(content, selection) {
	  var startKey = selection.getStartKey();
	  var startOffset = selection.getStartOffset();
	  var startBlock = content.getBlockForKey(startKey);

	  // If the cursor is not at the start of the block, look backward to
	  // preserve the style of the preceding character.
	  if (startOffset > 0) {
	    return startBlock.getInlineStyleAt(startOffset - 1);
	  }

	  // The caret is at position zero in this block. If the block has any
	  // text at all, use the style of the first character.
	  if (startBlock.getLength()) {
	    return startBlock.getInlineStyleAt(0);
	  }

	  // Otherwise, look upward in the document to find the closest character.
	  return lookUpwardForInlineStyle(content, startKey);
	}

	function getInlineStyleForNonCollapsedSelection(content, selection) {
	  var startKey = selection.getStartKey();
	  var startOffset = selection.getStartOffset();
	  var startBlock = content.getBlockForKey(startKey);

	  // If there is a character just inside the selection, use its style.
	  if (startOffset < startBlock.getLength()) {
	    return startBlock.getInlineStyleAt(startOffset);
	  }

	  // Check if the selection at the end of a non-empty block. Use the last
	  // style in the block.
	  if (startOffset > 0) {
	    return startBlock.getInlineStyleAt(startOffset - 1);
	  }

	  // Otherwise, look upward in the document to find the closest character.
	  return lookUpwardForInlineStyle(content, startKey);
	}

	function lookUpwardForInlineStyle(content, fromKey) {
	  var previousBlock = content.getBlockBefore(fromKey);
	  var previousLength;

	  while (previousBlock) {
	    previousLength = previousBlock.getLength();
	    if (previousLength) {
	      return previousBlock.getInlineStyleAt(previousLength - 1);
	    }
	    previousBlock = content.getBlockBefore(previousBlock.getKey());
	  }

	  return OrderedSet();
	}

	module.exports = EditorState;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule encodeEntityRanges
	 * @typechecks
	 * 
	 */

	'use strict';

	var DraftStringKey = __webpack_require__(43);
	var UnicodeUtils = __webpack_require__(137);

	var strlen = UnicodeUtils.strlen;

	/**
	 * Convert to UTF-8 character counts for storage.
	 */
	function encodeEntityRanges(block, storageMap) {
	  var encoded = [];
	  block.findEntityRanges(function (character) {
	    return !!character.getEntity();
	  }, function ( /*number*/start, /*number*/end) {
	    var text = block.getText();
	    var key = block.getEntityAt(start);
	    encoded.push({
	      offset: strlen(text.slice(0, start)),
	      length: strlen(text.slice(start, end)),
	      // Encode the key as a number for range storage.
	      key: Number(storageMap[DraftStringKey.stringify(key)])
	    });
	  });
	  return encoded;
	}

	module.exports = encodeEntityRanges;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule encodeInlineStyleRanges
	 * 
	 */

	'use strict';

	var DefaultDraftInlineStyle = __webpack_require__(25);
	var UnicodeUtils = __webpack_require__(137);

	var findRangesImmutable = __webpack_require__(62);

	var areEqual = function areEqual(a, b) {
	  return a === b;
	};
	var isTruthy = function isTruthy(a) {
	  return !!a;
	};
	var EMPTY_ARRAY = [];

	/**
	 * Helper function for getting encoded styles for each inline style. Convert
	 * to UTF-8 character counts for storage.
	 */
	function getEncodedInlinesForType(block, styleList, styleToEncode) {
	  var ranges = [];

	  // Obtain an array with ranges for only the specified style.
	  var filteredInlines = styleList.map(function (style) {
	    return style.has(styleToEncode);
	  }).toList();

	  findRangesImmutable(filteredInlines, areEqual,
	  // We only want to keep ranges with nonzero style values.
	  isTruthy, function (start, end) {
	    var text = block.getText();
	    ranges.push({
	      offset: UnicodeUtils.strlen(text.slice(0, start)),
	      length: UnicodeUtils.strlen(text.slice(start, end)),
	      style: styleToEncode
	    });
	  });

	  return ranges;
	}

	/*
	 * Retrieve the encoded arrays of inline styles, with each individual style
	 * treated separately.
	 */
	function encodeInlineStyleRanges(block) {
	  var styleList = block.getCharacterList().map(function (c) {
	    return c.getStyle();
	  }).toList();
	  var styles = Object.keys(DefaultDraftInlineStyle);
	  var ranges = styles.map(function (style) {
	    return getEncodedInlinesForType(block, styleList, style);
	  });

	  return Array.prototype.concat.apply(EMPTY_ARRAY, ranges);
	}

	module.exports = encodeInlineStyleRanges;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule expandRangeToStartOfLine
	 * @typechecks
	 * 
	 */

	'use strict';

	var UnicodeUtils = __webpack_require__(137);

	var getRangeClientRects = __webpack_require__(72);
	var invariant = __webpack_require__(122);

	/**
	 * Return the computed line height, in pixels, for the provided element.
	 */
	function getLineHeightPx(element) {
	  var computed = getComputedStyle(element);
	  var div = document.createElement('div');
	  div.style.fontFamily = computed.fontFamily;
	  div.style.fontSize = computed.fontSize;
	  div.style.fontStyle = computed.fontStyle;
	  div.style.fontWeight = computed.fontWeight;
	  div.style.lineHeight = computed.lineHeight;
	  div.style.position = 'absolute';
	  div.textContent = 'M';

	  // forced layout here
	  document.body.appendChild(div);
	  var rect = div.getBoundingClientRect();
	  document.body.removeChild(div);

	  return rect.height;
	}

	/**
	 * Return whether every ClientRect in the provided list lies on the same line.
	 *
	 * We assume that the rects on the same line all contain the baseline, so the
	 * lowest top line needs to be above the highest bottom line (i.e., if you were
	 * to project the rects onto the y-axis, their intersection would be nonempty).
	 *
	 * In addition, we require that no two boxes are lineHeight (or more) apart at
	 * either top or bottom, which helps protect against false positives for fonts
	 * with extremely large glyph heights (e.g., with a font size of 17px, Zapfino
	 * produces rects of height 58px!).
	 */
	function areRectsOnOneLine(rects, lineHeight) {
	  var minTop = Infinity;
	  var minBottom = Infinity;
	  var maxTop = -Infinity;
	  var maxBottom = -Infinity;

	  for (var ii = 0; ii < rects.length; ii++) {
	    var rect = rects[ii];
	    if (rect.width === 0 || rect.width === 1) {
	      // When a range starts or ends a soft wrap, many browsers (Chrome, IE,
	      // Safari) include an empty rect on the previous or next line. When the
	      // text lies in a container whose position is not integral (e.g., from
	      // margin: auto), Safari makes these empty rects have width 1 (instead of
	      // 0). Having one-pixel-wide characters seems unlikely (and most browsers
	      // report widths in subpixel precision anyway) so it's relatively safe to
	      // skip over them.
	      continue;
	    }
	    minTop = Math.min(minTop, rect.top);
	    minBottom = Math.min(minBottom, rect.bottom);
	    maxTop = Math.max(maxTop, rect.top);
	    maxBottom = Math.max(maxBottom, rect.bottom);
	  }

	  return maxTop <= minBottom && maxTop - minTop < lineHeight && maxBottom - minBottom < lineHeight;
	}

	/**
	 * Return the length of a node, as used by Range offsets.
	 */
	function getNodeLength(node) {
	  // http://www.w3.org/TR/dom/#concept-node-length
	  switch (node.nodeType) {
	    case Node.DOCUMENT_TYPE_NODE:
	      return 0;
	    case Node.TEXT_NODE:
	    case Node.PROCESSING_INSTRUCTION_NODE:
	    case Node.COMMENT_NODE:
	      return node.length;
	    default:
	      return node.childNodes.length;
	  }
	}

	/**
	 * Given a collapsed range, move the start position backwards as far as
	 * possible while the range still spans only a single line.
	 */
	function expandRangeToStartOfLine(range) {
	  !range.collapsed ? process.env.NODE_ENV !== 'production' ? invariant(false, 'expandRangeToStartOfLine: Provided range is not collapsed.') : invariant(false) : undefined;
	  range = range.cloneRange();

	  var containingElement = range.startContainer;
	  if (containingElement.nodeType !== 1) {
	    containingElement = containingElement.parentNode;
	  }
	  var lineHeight = getLineHeightPx(containingElement);

	  // Imagine our text looks like:
	  //   <div><span>once upon a time, there was a <em>boy
	  //   who lived</em> </span><q><strong>under^ the
	  //   stairs</strong> in a small closet.</q></div>
	  // where the caret represents the cursor. First, we crawl up the tree until
	  // the range spans multiple lines (setting the start point to before
	  // "<strong>", then before "<div>"), then at each level we do a search to
	  // find the latest point which is still on a previous line. We'll find that
	  // the break point is inside the span, then inside the <em>, then in its text
	  // node child, the actual break point before "who".

	  var bestContainer = range.endContainer;
	  var bestOffset = range.endOffset;
	  range.setStart(range.startContainer, 0);

	  while (areRectsOnOneLine(getRangeClientRects(range), lineHeight)) {
	    bestContainer = range.startContainer;
	    bestOffset = range.startOffset;
	    !bestContainer.parentNode ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Found unexpected detached subtree when traversing.') : invariant(false) : undefined;
	    range.setStartBefore(bestContainer);
	    if (bestContainer.nodeType === 1 && getComputedStyle(bestContainer).display !== 'inline') {
	      // The start of the line is never in a different block-level container.
	      break;
	    }
	  }

	  // In the above example, range now spans from "<div>" to "under",
	  // bestContainer is <div>, and bestOffset is 1 (index of <q> inside <div>)].
	  // Picking out which child to recurse into here is a special case since we
	  // don't want to check past <q> -- once we find that the final range starts
	  // in <span>, we can look at all of its children (and all of their children)
	  // to find the break point.

	  // At all times, (bestContainer, bestOffset) is the latest single-line start
	  // point that we know of.
	  var currentContainer = bestContainer;
	  var maxIndexToConsider = bestOffset - 1;

	  do {
	    var nodeValue = currentContainer.nodeValue;

	    for (var ii = maxIndexToConsider; ii >= 0; ii--) {
	      if (nodeValue != null && ii > 0 && UnicodeUtils.isSurrogatePair(nodeValue, ii - 1)) {
	        // We're in the middle of a surrogate pair -- skip over so we never
	        // return a range with an endpoint in the middle of a code point.
	        continue;
	      }

	      range.setStart(currentContainer, ii);
	      if (areRectsOnOneLine(getRangeClientRects(range), lineHeight)) {
	        bestContainer = currentContainer;
	        bestOffset = ii;
	      } else {
	        break;
	      }
	    }

	    if (ii === -1 || currentContainer.childNodes.length === 0) {
	      // If ii === -1, then (bestContainer, bestOffset), which is equal to
	      // (currentContainer, 0), was a single-line start point but a start
	      // point before currentContainer wasn't, so the line break seems to
	      // have occurred immediately after currentContainer's start tag
	      //
	      // If currentContainer.childNodes.length === 0, we're already at a
	      // terminal node (e.g., text node) and should return our current best.
	      break;
	    }

	    currentContainer = currentContainer.childNodes[ii];
	    maxIndexToConsider = getNodeLength(currentContainer);
	  } while (true);

	  range.setStart(bestContainer, bestOffset);
	  return range;
	}

	module.exports = expandRangeToStartOfLine;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule findAncestorOffsetKey
	 * @typechecks
	 * 
	 */

	'use strict';

	var getSelectionOffsetKeyForNode = __webpack_require__(75);

	/**
	 * Get the key from the node's nearest offset-aware ancestor.
	 */
	function findAncestorOffsetKey(node) {
	  while (node && node !== document.documentElement) {
	    var key = getSelectionOffsetKeyForNode(node);
	    if (key != null) {
	      return key;
	    }
	    node = node.parentNode;
	  }
	  return null;
	}

	module.exports = findAncestorOffsetKey;

/***/ },
/* 62 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule findRangesImmutable
	 * 
	 */

	/**
	 * Search through an array to find contiguous stretches of elements that
	 * match a specified filter function.
	 *
	 * When ranges are found, execute a specified `found` function to supply
	 * the values to the caller.
	 */
	'use strict';

	function findRangesImmutable(haystack, areEqualFn, filterFn, foundFn) {
	  if (!haystack.size) {
	    return;
	  }

	  var cursor = 0;

	  haystack.reduce(function (value, nextValue, nextIndex) {
	    if (!areEqualFn(value, nextValue)) {
	      if (filterFn(value)) {
	        foundFn(cursor, nextIndex);
	      }
	      cursor = nextIndex;
	    }
	    return nextValue;
	  });

	  filterFn(haystack.last()) && foundFn(cursor, haystack.count());
	}

	module.exports = findRangesImmutable;

/***/ },
/* 63 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule generateBlockKey
	 * @typechecks
	 * 
	 */

	'use strict';

	var seenKeys = {};
	var MULTIPLIER = Math.pow(2, 24);

	function generateBlockKey() {
	  var key;
	  while (key === undefined || seenKeys.hasOwnProperty(key) || !isNaN(+key)) {
	    key = Math.floor(Math.random() * MULTIPLIER).toString(32);
	  }
	  seenKeys[key] = true;
	  return key;
	}

	module.exports = generateBlockKey;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getCharacterRemovalRange
	 * @typechecks
	 * 
	 */

	/**
	 * Given a SelectionState and a removal direction, determine the entire range
	 * that should be removed from a ContentState. This is based on any entities
	 * within the target, with their `mutability` values taken into account.
	 *
	 * For instance, if we are attempting to remove part of an "immutable" entity
	 * range, the entire entity must be removed. The returned `SelectionState`
	 * will be adjusted accordingly.
	 */
	'use strict';

	var DraftEntity = __webpack_require__(36);
	var DraftEntitySegments = __webpack_require__(38);

	var getRangesForDraftEntity = __webpack_require__(73);
	var invariant = __webpack_require__(122);

	function getCharacterRemovalRange(block, selectionState, direction) {
	  var start = selectionState.getStartOffset();
	  var end = selectionState.getEndOffset();
	  var entityKey = block.getEntityAt(start);
	  if (!entityKey) {
	    return selectionState;
	  }

	  var entity = DraftEntity.get(entityKey);
	  var mutability = entity.getMutability();

	  // `MUTABLE` entities can just have the specified range of text removed
	  // directly. No adjustments are needed.
	  if (mutability === 'MUTABLE') {
	    return selectionState;
	  }

	  // Find the entity range that overlaps with our removal range.
	  var entityRanges = getRangesForDraftEntity(block, entityKey).filter(function (range) {
	    return start < range.end && end > range.start;
	  });

	  !(entityRanges.length == 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'There should only be one entity range within this removal range.') : invariant(false) : undefined;

	  var entityRange = entityRanges[0];

	  // For `IMMUTABLE` entity types, we will remove the entire entity range.
	  if (mutability === 'IMMUTABLE') {
	    return selectionState.merge({
	      anchorOffset: entityRange.start,
	      focusOffset: entityRange.end,
	      isBackward: false
	    });
	  }

	  // For `SEGMENTED` entity types, determine the appropriate segment to
	  // remove.
	  var removalRange = DraftEntitySegments.getRemovalRange(start, end, block.getText().slice(entityRange.start, entityRange.end), entityRange.start, direction);

	  return selectionState.merge({
	    anchorOffset: removalRange.start,
	    focusOffset: removalRange.end,
	    isBackward: false
	  });
	}

	module.exports = getCharacterRemovalRange;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getContentStateFragment
	 * @typechecks
	 * 
	 */

	'use strict';

	var generateBlockKey = __webpack_require__(63);
	var removeEntitiesAtEdges = __webpack_require__(96);

	function getContentStateFragment(contentState, selectionState) {
	  var startKey = selectionState.getStartKey();
	  var startOffset = selectionState.getStartOffset();
	  var endKey = selectionState.getEndKey();
	  var endOffset = selectionState.getEndOffset();

	  // Edge entities should be stripped to ensure that we don't preserve
	  // invalid partial entities when the fragment is reused. We do, however,
	  // preserve entities that are entirely within the selection range.
	  var contentWithoutEdgeEntities = removeEntitiesAtEdges(contentState, selectionState);

	  var blockMap = contentWithoutEdgeEntities.getBlockMap();
	  var blockKeys = blockMap.keySeq();
	  var startIndex = blockKeys.indexOf(startKey);
	  var endIndex = blockKeys.indexOf(endKey) + 1;

	  var slice = blockMap.slice(startIndex, endIndex).map(function (block, blockKey) {
	    var newKey = generateBlockKey();

	    var text = block.getText();
	    var chars = block.getCharacterList();

	    if (startKey === endKey) {
	      return block.merge({
	        key: newKey,
	        text: text.slice(startOffset, endOffset),
	        characterList: chars.slice(startOffset, endOffset)
	      });
	    }

	    if (blockKey === startKey) {
	      return block.merge({
	        key: newKey,
	        text: text.slice(startOffset),
	        characterList: chars.slice(startOffset)
	      });
	    }

	    if (blockKey === endKey) {
	      return block.merge({
	        key: newKey,
	        text: text.slice(0, endOffset),
	        characterList: chars.slice(0, endOffset)
	      });
	    }

	    return block.set('key', newKey);
	  });

	  return slice.toOrderedMap();
	}

	module.exports = getContentStateFragment;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getDefaultKeyBinding
	 * @typechecks
	 * 
	 */

	'use strict';

	var KeyBindingUtil = __webpack_require__(83);
	var Keys = __webpack_require__(126);
	var UserAgent = __webpack_require__(139);

	var isOSX = UserAgent.isPlatform('Mac OS X');
	var isWindows = UserAgent.isPlatform('Windows');

	// Firefox on OSX had a bug resulting in navigation instead of cursor movement.
	// This bug was fixed in Firefox 29. Feature detection is virtually impossible
	// so we just check the version number. See #342765.
	var shouldFixFirefoxMovement = isOSX && UserAgent.isBrowser('Firefox < 29');

	var hasCommandModifier = KeyBindingUtil.hasCommandModifier;
	var isCtrlKeyCommand = KeyBindingUtil.isCtrlKeyCommand;

	function shouldRemoveWord(e) {
	  return isOSX && e.altKey || isCtrlKeyCommand(e);
	}

	/**
	 * Get the appropriate undo/redo command for a Z key command.
	 */
	function getZCommand(e) {
	  if (hasCommandModifier(e)) {
	    return e.shiftKey ? 'redo' : 'undo';
	  }
	}

	function getDeleteCommand(e) {
	  // Allow default "cut" behavior for Windows on Shift + Delete.
	  if (isWindows && e.shiftKey) {
	    return null;
	  }
	  return shouldRemoveWord(e) ? 'delete-word' : 'delete';
	}

	function getBackspaceCommand(e) {
	  if (hasCommandModifier(e) && isOSX) {
	    return 'backspace-to-start-of-line';
	  }
	  return shouldRemoveWord(e) ? 'backspace-word' : 'backspace';
	}

	/**
	 * Retrieve a bound key command for the given event.
	 */
	function getDefaultKeyBinding(e) {
	  switch (e.keyCode) {
	    case 66:
	      // B
	      return hasCommandModifier(e) ? 'bold' : null;
	    case 68:
	      // D
	      return isCtrlKeyCommand(e) ? 'delete' : null;
	    case 72:
	      // H
	      return isCtrlKeyCommand(e) ? 'backspace' : null;
	    case 73:
	      // I
	      return hasCommandModifier(e) ? 'italic' : null;
	    case 74:
	      // J
	      return hasCommandModifier(e) ? 'code' : null;
	    case 75:
	      // K
	      return !isWindows && isCtrlKeyCommand(e) ? 'secondary-cut' : null;
	    case 79:
	      // O
	      return isCtrlKeyCommand(e) ? 'split-block' : null;
	    case 84:
	      // T
	      return isOSX && isCtrlKeyCommand(e) ? 'transpose-characters' : null;
	    case 85:
	      // U
	      return hasCommandModifier(e) ? 'underline' : null;
	    case 87:
	      // W
	      return isOSX && isCtrlKeyCommand(e) ? 'backspace-word' : null;
	    case 89:
	      // Y
	      if (isCtrlKeyCommand(e)) {
	        return isWindows ? 'redo' : 'secondary-paste';
	      }
	      return null;
	    case 90:
	      // Z
	      return getZCommand(e) || null;
	    case Keys.DELETE:
	      return getDeleteCommand(e);
	    case Keys.BACKSPACE:
	      return getBackspaceCommand(e);
	    // LEFT/RIGHT handlers serve as a workaround for a Firefox bug.
	    case Keys.LEFT:
	      return shouldFixFirefoxMovement && hasCommandModifier(e) ? 'move-selection-to-start-of-block' : null;
	    case Keys.RIGHT:
	      return shouldFixFirefoxMovement && hasCommandModifier(e) ? 'move-selection-to-end-of-block' : null;
	    default:
	      return null;
	  }
	}

	module.exports = getDefaultKeyBinding;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getDraftEditorSelection
	 * @typechecks
	 * 
	 */

	/**
	 * Convert the current selection range to an anchor/focus pair of offset keys
	 * and values that can be interpreted by components.
	 */
	'use strict';

	var getDraftEditorSelectionWithNodes = __webpack_require__(68);

	function getDraftEditorSelection(editorState, root) {
	  var selection = global.getSelection();

	  // No active selection.
	  if (selection.rangeCount === 0) {
	    return {
	      selectionState: editorState.getSelection().set('hasFocus', false),
	      needsRecovery: false
	    };
	  }

	  return getDraftEditorSelectionWithNodes(editorState, root, selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);
	}

	module.exports = getDraftEditorSelection;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getDraftEditorSelectionWithNodes
	 * @typechecks
	 * 
	 */

	'use strict';

	var findAncestorOffsetKey = __webpack_require__(61);
	var getSelectionOffsetKeyForNode = __webpack_require__(75);
	var getUpdatedSelectionState = __webpack_require__(77);
	var invariant = __webpack_require__(122);
	var nullthrows = __webpack_require__(129);

	/**
	 * Convert the current selection range to an anchor/focus pair of offset keys
	 * and values that can be interpreted by components.
	 */
	function getDraftEditorSelectionWithNodes(editorState, root, anchorNode, anchorOffset, focusNode, focusOffset) {
	  var anchorIsTextNode = anchorNode.nodeType === Node.TEXT_NODE;
	  var focusIsTextNode = focusNode.nodeType === Node.TEXT_NODE;

	  // If the selection range lies only on text nodes, the task is simple.
	  // Find the nearest offset-aware elements and use the
	  // offset values supplied by the selection range.
	  if (anchorIsTextNode && focusIsTextNode) {
	    return {
	      selectionState: getUpdatedSelectionState(editorState, nullthrows(findAncestorOffsetKey(anchorNode)), anchorOffset, nullthrows(findAncestorOffsetKey(focusNode)), focusOffset),
	      needsRecovery: false
	    };
	  }

	  var anchorPoint = null;
	  var focusPoint = null;
	  var needsRecovery = true;

	  // An element is selected. Convert this selection range into leaf offset
	  // keys and offset values for consumption at the component level. This
	  // is common in Firefox, where select-all and triple click behavior leads
	  // to entire elements being selected.
	  //
	  // Note that we use the `needsRecovery` parameter in the callback here. This
	  // is because when certain elements are selected, the behavior for subsequent
	  // cursor movement (e.g. via arrow keys) is uncertain and may not match
	  // expectations at the component level. For example, if an entire <div> is
	  // selected and the user presses the right arrow, Firefox keeps the selection
	  // on the <div>. If we allow subsequent keypresses to insert characters
	  // natively, they will be inserted into a browser-created text node to the
	  // right of that <div>. This is obviously undesirable.
	  //
	  // With the `needsRecovery` flag, we inform the caller that it is responsible
	  // for manually setting the selection state on the rendered document to
	  // ensure proper selection state maintenance.

	  if (anchorIsTextNode) {
	    anchorPoint = {
	      key: nullthrows(findAncestorOffsetKey(anchorNode)),
	      offset: anchorOffset
	    };
	    focusPoint = getPointForNonTextNode(root, focusNode, focusOffset);
	  } else if (focusIsTextNode) {
	    focusPoint = {
	      key: nullthrows(findAncestorOffsetKey(focusNode)),
	      offset: focusOffset
	    };
	    anchorPoint = getPointForNonTextNode(root, anchorNode, anchorOffset);
	  } else {
	    anchorPoint = getPointForNonTextNode(root, anchorNode, anchorOffset);
	    focusPoint = getPointForNonTextNode(root, focusNode, focusOffset);

	    // If the selection is collapsed on an empty block, don't force recovery.
	    // This way, on arrow key selection changes, the browser can move the
	    // cursor from a non-zero offset on one block, through empty blocks,
	    // to a matching non-zero offset on other text blocks.
	    if (anchorNode === focusNode && anchorOffset === focusOffset) {
	      needsRecovery = anchorNode.firstChild.nodeName !== 'BR';
	    }
	  }

	  return {
	    selectionState: getUpdatedSelectionState(editorState, anchorPoint.key, anchorPoint.offset, focusPoint.key, focusPoint.offset),
	    needsRecovery: needsRecovery
	  };
	}

	/**
	 * Identify the first leaf descendant for the given node.
	 */
	function getFirstLeaf(node) {
	  while (node.firstChild && getSelectionOffsetKeyForNode(node.firstChild)) {
	    node = node.firstChild;
	  }
	  return node;
	}

	/**
	 * Identify the last leaf descendant for the given node.
	 */
	function getLastLeaf(node) {
	  while (node.lastChild && getSelectionOffsetKeyForNode(node.lastChild)) {
	    node = node.lastChild;
	  }
	  return node;
	}

	function getPointForNonTextNode(editorRoot, node, childOffset) {
	  var offsetKey = findAncestorOffsetKey(node);

	  !(offsetKey != null || editorRoot && (editorRoot === node || editorRoot.firstChild === node)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Unknown node in selection range.') : invariant(false) : undefined;

	  // If the editorRoot is the selection, step downward into the content
	  // wrapper.
	  if (editorRoot === node) {
	    node = node.firstChild;
	    !(node instanceof Element && node.getAttribute('data-contents') === 'true') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Invalid DraftEditorContents structure.') : invariant(false) : undefined;
	    if (childOffset > 0) {
	      childOffset = node.childNodes.length;
	    }
	  }

	  // If the child offset is zero and we have an offset key, we're done.
	  // If there's no offset key because the entire editor is selected,
	  // find the leftmost ("first") leaf in the tree and use that as the offset
	  // key.
	  if (childOffset === 0) {
	    var key = null;
	    if (offsetKey != null) {
	      key = offsetKey;
	    } else {
	      var firstLeaf = getFirstLeaf(node);
	      key = nullthrows(getSelectionOffsetKeyForNode(firstLeaf));
	    }
	    return { key: key, offset: 0 };
	  }

	  var nodeBeforeCursor = node.childNodes[childOffset - 1];
	  var leafKey = null;
	  var textLength = null;

	  if (!getSelectionOffsetKeyForNode(nodeBeforeCursor)) {
	    // Our target node may be a leaf or a text node, in which case we're
	    // already where we want to be and can just use the child's length as
	    // our offset.
	    leafKey = nullthrows(offsetKey);
	    textLength = getTextContentLength(nodeBeforeCursor);
	  } else {
	    // Otherwise, we'll look at the child to the left of the cursor and find
	    // the last leaf node in its subtree.
	    var lastLeaf = getLastLeaf(nodeBeforeCursor);
	    leafKey = nullthrows(getSelectionOffsetKeyForNode(lastLeaf));
	    textLength = getTextContentLength(lastLeaf);
	  }

	  return {
	    key: leafKey,
	    offset: textLength
	  };
	}

	/**
	 * Return the length of a node's textContent, regarding single newline
	 * characters as zero-length. This allows us to avoid problems with identifying
	 * the correct selection offset for empty blocks in IE, in which we
	 * render newlines instead of break tags.
	 */
	function getTextContentLength(node) {
	  var textContent = node.textContent;
	  return textContent === '\n' ? 0 : textContent.length;
	}

	module.exports = getDraftEditorSelectionWithNodes;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 69 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getElementForBlockType
	 * 
	 */

	'use strict';

	function getElementForBlockType(blockType) {
	  switch (blockType) {
	    case 'header-one':
	      return 'h2';
	    case 'header-two':
	      return 'h3';
	    case 'unordered-list-item':
	    case 'ordered-list-item':
	      return 'li';
	    case 'blockquote':
	      return 'blockquote';
	    case 'media':
	      return 'figure';
	    default:
	      return 'div';
	  }
	}

	module.exports = getElementForBlockType;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getEntityKeyForSelection
	 * @typechecks
	 * 
	 */

	/**
	 * Return the entity key that should be used when inserting text for the
	 * specified target selection, only if the entity is `MUTABLE`. `IMMUTABLE`
	 * and `SEGMENTED` entities should not be used for insertion behavior.
	 */
	'use strict';

	var DraftEntity = __webpack_require__(36);

	function getEntityKeyForSelection(contentState, targetSelection) {
	  var entityKey;

	  if (targetSelection.isCollapsed()) {
	    var key = targetSelection.getAnchorKey();
	    var offset = targetSelection.getAnchorOffset();
	    if (offset > 0) {
	      entityKey = contentState.getBlockForKey(key).getEntityAt(offset - 1);
	      return filterKey(entityKey);
	    }
	    return null;
	  }

	  var startKey = targetSelection.getStartKey();
	  var startOffset = targetSelection.getStartOffset();
	  var startBlock = contentState.getBlockForKey(startKey);

	  entityKey = startOffset === startBlock.getLength() ? null : startBlock.getEntityAt(startOffset);

	  return filterKey(entityKey);
	}

	/**
	 * Determine whether an entity key corresponds to a `MUTABLE` entity. If so,
	 * return it. If not, return null.
	 */
	function filterKey(entityKey) {
	  if (entityKey) {
	    var entity = DraftEntity.get(entityKey);
	    return entity.getMutability() === 'MUTABLE' ? entityKey : null;
	  }
	  return null;
	}

	module.exports = getEntityKeyForSelection;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getFragmentFromSelection
	 * 
	 */

	'use strict';

	var getContentStateFragment = __webpack_require__(65);

	function getFragmentFromSelection(editorState) {
	  var selectionState = editorState.getSelection();
	  if (!selectionState.isCollapsed()) {
	    return getContentStateFragment(editorState.getCurrentContent(), selectionState);
	  }
	}

	module.exports = getFragmentFromSelection;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getRangeClientRects
	 * @typechecks
	 * 
	 */

	'use strict';

	var UserAgent = __webpack_require__(139);

	var invariant = __webpack_require__(122);

	var isChrome = UserAgent.isBrowser('Chrome');

	// In Chrome, the client rects will include the entire bounds of all nodes that
	// begin (have a start tag) within the selection, even if the selection does
	// not overlap the entire node. To resolve this, we split the range at each
	// start tag and join the client rects together.
	// https://code.google.com/p/chromium/issues/detail?id=324437
	function getRangeClientRectsChrome(range) {
	  var tempRange = range.cloneRange();
	  var clientRects = [];

	  for (var ancestor = range.endContainer; ancestor != null; ancestor = ancestor.parentNode) {
	    // If we've climbed up to the common ancestor, we can now use the
	    // original start point and stop climbing the tree.
	    var atCommonAncestor = ancestor === range.commonAncestorContainer;
	    if (atCommonAncestor) {
	      tempRange.setStart(range.startContainer, range.startOffset);
	    } else {
	      tempRange.setStart(tempRange.endContainer, 0);
	    }
	    var rects = Array.from(tempRange.getClientRects());
	    clientRects.push(rects);
	    if (atCommonAncestor) {
	      var _ref;

	      clientRects.reverse();
	      return (_ref = []).concat.apply(_ref, clientRects);
	    }
	    tempRange.setEndBefore(ancestor);
	  }

	   true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Found an unexpected detached subtree when getting range client rects.') : invariant(false) : undefined;
	}

	/**
	 * Like range.getClientRects() but normalizes for browser bugs.
	 */
	var getRangeClientRects = isChrome ? getRangeClientRectsChrome : function (range) {
	  return Array.from(range.getClientRects());
	};

	module.exports = getRangeClientRects;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getRangesForDraftEntity
	 * @typechecks
	 * 
	 */

	/**
	 * Obtain the start and end positions of the range that has the
	 * specified entity applied to it.
	 *
	 * Entity keys are applied only to contiguous stretches of text, so this
	 * method searches for the first instance of the entity key and returns
	 * the subsequent range.
	 */
	'use strict';

	var invariant = __webpack_require__(122);

	function getRangesForDraftEntity(block, key) {
	  var ranges = [];
	  block.findEntityRanges(function (c) {
	    return c.getEntity() === key;
	  }, function (start, end) {
	    ranges.push({ start: start, end: end });
	  });

	  !!!ranges.length ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Entity key not found in this range.') : invariant(false) : undefined;

	  return ranges;
	}

	module.exports = getRangesForDraftEntity;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getSafeBodyFromHTML
	 * 
	 */

	'use strict';

	var UserAgent = __webpack_require__(139);

	var isOldIE = UserAgent.isBrowser('IE <= 9');

	// Provides a dom node that will not execute scripts
	// https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation.createHTMLDocument
	// https://developer.mozilla.org/en-US/Add-ons/Code_snippets/HTML_to_DOM

	function getSafeBodyFromHTML(html) {
	  var doc;
	  var root = null;
	  // Provides a safe context
	  if (!isOldIE && document.implementation && document.implementation.createHTMLDocument) {
	    doc = document.implementation.createHTMLDocument('foo');
	    doc.documentElement.innerHTML = html;
	    root = doc.getElementsByTagName('body')[0];
	  }
	  return root;
	}

	module.exports = getSafeBodyFromHTML;

/***/ },
/* 75 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getSelectionOffsetKeyForNode
	 * @typechecks
	 * 
	 */

	'use strict';

	/**
	 * Get offset key from a node.
	 */

	function getSelectionOffsetKeyForNode(node) {
	  return node instanceof Element ? node.getAttribute('data-offset-key') : null;
	}

	module.exports = getSelectionOffsetKeyForNode;

/***/ },
/* 76 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getTextContentFromFiles
	 * 
	 */

	'use strict';

	var TEXT_CLIPPING_REGEX = /\.textClipping$/;

	var TEXT_TYPES = {
	  'text/plain': true,
	  'text/html': true,
	  'text/rtf': true
	};

	// Somewhat arbitrary upper bound on text size. Let's not lock up the browser.
	var TEXT_SIZE_UPPER_BOUND = 5000;

	/**
	 * Extract the text content from a file list.
	 */
	function getTextContentFromFiles(files, callback) {
	  var readCount = 0;
	  var results = [];
	  files.forEach(function ( /*blob*/file) {
	    readFile(file, function ( /*string*/text) {
	      readCount++;
	      text && results.push(text.slice(0, TEXT_SIZE_UPPER_BOUND));
	      if (readCount == files.length) {
	        callback(results.join('\r'));
	      }
	    });
	  });
	}

	/**
	 * todo isaac: Do work to turn html/rtf into a content fragment.
	 */
	function readFile(file, callback) {
	  if (!global.FileReader || file.type && !(file.type in TEXT_TYPES)) {
	    callback('');
	    return;
	  }

	  if (file.type === '') {
	    var contents = '';
	    // Special-case text clippings, which have an empty type but include
	    // `.textClipping` in the file name. `readAsText` results in an empty
	    // string for text clippings, so we force the file name to serve
	    // as the text value for the file.
	    if (TEXT_CLIPPING_REGEX.test(file.name)) {
	      contents = file.name.replace(TEXT_CLIPPING_REGEX, '');
	    }
	    callback(contents);
	    return;
	  }

	  var reader = new FileReader();
	  reader.onload = function () {
	    callback(reader.result);
	  };
	  reader.onerror = function () {
	    callback('');
	  };
	  reader.readAsText(file);
	}

	module.exports = getTextContentFromFiles;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getUpdatedSelectionState
	 * 
	 */

	'use strict';

	var DraftOffsetKey = __webpack_require__(40);

	var nullthrows = __webpack_require__(129);

	function getUpdatedSelectionState(editorState, anchorKey, anchorOffset, focusKey, focusOffset) {
	  var selection = nullthrows(editorState.getSelection());
	  if (process.env.NODE_ENV !== 'production') {
	    if (!anchorKey || !focusKey) {
	      /*eslint-disable no-console */
	      console.warn('Invalid selection state.', arguments, editorState.toJS());
	      /*eslint-enable no-console */
	      return selection;
	    }
	  }

	  var anchorPath = DraftOffsetKey.decode(anchorKey);
	  var anchorBlockKey = anchorPath.blockKey;
	  var anchorLeaf = editorState.getBlockTree(anchorBlockKey).getIn([anchorPath.decoratorKey, 'leaves', anchorPath.leafKey]);

	  var focusPath = DraftOffsetKey.decode(focusKey);
	  var focusBlockKey = focusPath.blockKey;
	  var focusLeaf = editorState.getBlockTree(focusBlockKey).getIn([focusPath.decoratorKey, 'leaves', focusPath.leafKey]);

	  var anchorLeafStart = anchorLeaf.get('start');
	  var focusLeafStart = focusLeaf.get('start');

	  var anchorBlockOffset = anchorLeaf ? anchorLeafStart + anchorOffset : null;
	  var focusBlockOffset = focusLeaf ? focusLeafStart + focusOffset : null;

	  var areEqual = selection.getAnchorKey() === anchorBlockKey && selection.getAnchorOffset() === anchorBlockOffset && selection.getFocusKey() === focusBlockKey && selection.getFocusOffset() === focusBlockOffset;

	  if (areEqual) {
	    return selection;
	  }

	  var isBackward = false;
	  if (anchorBlockKey === focusBlockKey) {
	    var anchorLeafEnd = anchorLeaf.get('end');
	    var focusLeafEnd = focusLeaf.get('end');
	    if (focusLeafStart === anchorLeafStart && focusLeafEnd === anchorLeafEnd) {
	      isBackward = focusOffset < anchorOffset;
	    } else {
	      isBackward = focusLeafStart < anchorLeafStart;
	    }
	  } else {
	    var startKey = editorState.getCurrentContent().getBlockMap().keySeq().skipUntil(function (v) {
	      return v === anchorBlockKey || v === focusBlockKey;
	    }).first();
	    isBackward = startKey === focusBlockKey;
	  }

	  return selection.merge({
	    anchorKey: anchorBlockKey,
	    anchorOffset: anchorBlockOffset,
	    focusKey: focusBlockKey,
	    focusOffset: focusBlockOffset,
	    isBackward: isBackward
	  });
	}

	module.exports = getUpdatedSelectionState;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getWrapperTemplateForBlockType
	 * 
	 */

	/**
	 * Create these elements once and cache them so they're reference-equal.
	 */
	'use strict';

	var React = __webpack_require__(7);

	var cx = __webpack_require__(110);

	var UL_WRAP = React.createElement('ul', { className: cx('public/DraftStyleDefault/ul') });
	var OL_WRAP = React.createElement('ol', { className: cx('public/DraftStyleDefault/ol') });
	var PRE_WRAP = React.createElement('pre', { className: cx('public/DraftStyleDefault/pre') });

	function getWrapperTemplateForBlockType(blockType) {
	  switch (blockType) {
	    case 'unordered-list-item':
	      return UL_WRAP;
	    case 'ordered-list-item':
	      return OL_WRAP;
	    case 'code-block':
	      return PRE_WRAP;
	    default:
	      return null;
	  }
	}

	module.exports = getWrapperTemplateForBlockType;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule insertFragmentIntoContentState
	 * @typechecks
	 * 
	 */

	'use strict';

	var BlockMapBuilder = __webpack_require__(13);

	var generateBlockKey = __webpack_require__(63);
	var insertIntoList = __webpack_require__(80);
	var invariant = __webpack_require__(122);

	function insertFragmentIntoContentState(contentState, selectionState, fragment) {
	  !selectionState.isCollapsed() ? process.env.NODE_ENV !== 'production' ? invariant(false, '`insertFragment` should only be called with a collapsed selection state.') : invariant(false) : undefined;

	  var targetKey = selectionState.getStartKey();
	  var targetOffset = selectionState.getStartOffset();

	  var blockMap = contentState.getBlockMap();

	  var fragmentSize = fragment.size;
	  var finalKey;
	  var finalOffset;

	  if (fragmentSize === 1) {
	    var targetBlock = blockMap.get(targetKey);
	    var pastedBlock = fragment.first();
	    var text = targetBlock.getText();
	    var chars = targetBlock.getCharacterList();

	    var newBlock = targetBlock.merge({
	      text: text.slice(0, targetOffset) + pastedBlock.getText() + text.slice(targetOffset),
	      characterList: insertIntoList(chars, pastedBlock.getCharacterList(), targetOffset)
	    });

	    blockMap = blockMap.set(targetKey, newBlock);

	    finalKey = targetKey;
	    finalOffset = targetOffset + pastedBlock.getText().length;

	    return contentState.merge({
	      blockMap: blockMap.set(targetKey, newBlock),
	      selectionBefore: selectionState,
	      selectionAfter: selectionState.merge({
	        anchorKey: finalKey,
	        anchorOffset: finalOffset,
	        focusKey: finalKey,
	        focusOffset: finalOffset,
	        isBackward: false
	      })
	    });
	  }

	  var newBlockArr = [];

	  contentState.getBlockMap().forEach(function (block, blockKey) {
	    if (blockKey !== targetKey) {
	      newBlockArr.push(block);
	      return;
	    }

	    var text = block.getText();
	    var chars = block.getCharacterList();

	    // Modify head portion of block.
	    var blockSize = text.length;
	    var headText = text.slice(0, targetOffset);
	    var headCharacters = chars.slice(0, targetOffset);
	    var appendToHead = fragment.first();

	    var modifiedHead = block.merge({
	      text: headText + appendToHead.getText(),
	      characterList: headCharacters.concat(appendToHead.getCharacterList())
	    });

	    newBlockArr.push(modifiedHead);

	    // Insert fragment blocks after the head and before the tail.
	    fragment.slice(1, fragmentSize - 1).forEach(function (fragmentBlock) {
	      newBlockArr.push(fragmentBlock.set('key', generateBlockKey()));
	    });

	    // Modify tail portion of block.
	    var tailText = text.slice(targetOffset, blockSize);
	    var tailCharacters = chars.slice(targetOffset, blockSize);
	    var prependToTail = fragment.last();
	    finalKey = generateBlockKey();

	    var modifiedTail = prependToTail.merge({
	      key: finalKey,
	      text: prependToTail.getText() + tailText,
	      characterList: prependToTail.getCharacterList().concat(tailCharacters)
	    });

	    newBlockArr.push(modifiedTail);
	  });

	  finalOffset = fragment.last().getLength();

	  return contentState.merge({
	    blockMap: BlockMapBuilder.createFromArray(newBlockArr),
	    selectionBefore: selectionState,
	    selectionAfter: selectionState.merge({
	      anchorKey: finalKey,
	      anchorOffset: finalOffset,
	      focusKey: finalKey,
	      focusOffset: finalOffset,
	      isBackward: false
	    })
	  });
	}

	module.exports = insertFragmentIntoContentState;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 80 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule insertIntoList
	 * 
	 */

	/**
	 * Maintain persistence for target list when appending and prepending.
	 */
	'use strict';

	function insertIntoList(targetList, toInsert, offset) {
	  if (offset === targetList.count()) {
	    toInsert.forEach(function (c) {
	      targetList = targetList.push(c);
	    });
	  } else if (offset === 0) {
	    toInsert.reverse().forEach(function (c) {
	      targetList = targetList.unshift(c);
	    });
	  } else {
	    var head = targetList.slice(0, offset);
	    var tail = targetList.slice(offset);
	    targetList = head.concat(toInsert, tail).toList();
	  }
	  return targetList;
	}

	module.exports = insertIntoList;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule insertTextIntoContentState
	 * @typechecks
	 * 
	 */

	'use strict';

	var Immutable = __webpack_require__(163);

	var insertIntoList = __webpack_require__(80);
	var invariant = __webpack_require__(122);

	var Repeat = Immutable.Repeat;

	function insertTextIntoContentState(contentState, selectionState, text, characterMetadata) {
	  !selectionState.isCollapsed() ? process.env.NODE_ENV !== 'production' ? invariant(false, '`insertText` should only be called with a collapsed range.') : invariant(false) : undefined;

	  var len = text.length;
	  if (!len) {
	    return contentState;
	  }

	  var blockMap = contentState.getBlockMap();
	  var key = selectionState.getStartKey();
	  var offset = selectionState.getStartOffset();
	  var block = blockMap.get(key);
	  var blockText = block.getText();

	  var newBlock = block.merge({
	    text: blockText.slice(0, offset) + text + blockText.slice(offset, block.getLength()),
	    characterList: insertIntoList(block.getCharacterList(), Repeat(characterMetadata, len).toList(), offset)
	  });

	  var newOffset = offset + len;

	  return contentState.merge({
	    blockMap: blockMap.set(key, newBlock),
	    selectionAfter: selectionState.merge({
	      anchorOffset: newOffset,
	      focusOffset: newOffset
	    })
	  });
	}

	module.exports = insertTextIntoContentState;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 82 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isSelectionAtLeafStart
	 * @typechecks
	 * 
	 */

	'use strict';

	function isSelectionAtLeafStart(editorState) {
	  var selection = editorState.getSelection();
	  var anchorKey = selection.getAnchorKey();
	  var blockTree = editorState.getBlockTree(anchorKey);
	  var offset = selection.getStartOffset();

	  var isAtStart = false;

	  blockTree.some(function (leafSet) {
	    if (offset === leafSet.get('start')) {
	      isAtStart = true;
	      return true;
	    }

	    if (offset < leafSet.get('end')) {
	      return leafSet.get('leaves').some(function (leaf) {
	        var leafStart = leaf.get('start');
	        if (offset === leafStart) {
	          isAtStart = true;
	          return true;
	        }
	        if (offset < leafStart) {
	          return false;
	        }
	      });
	    }

	    return false;
	  });

	  return isAtStart;
	}

	module.exports = isSelectionAtLeafStart;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule KeyBindingUtil
	 * @typechecks
	 * 
	 */

	'use strict';

	var UserAgent = __webpack_require__(139);

	var isOSX = UserAgent.isPlatform('Mac OS X');

	var KeyBindingUtil = {
	  /**
	   * Check whether the ctrlKey modifier is *not* being used in conjunction with
	   * the altKey modifier. If they are combined, the result is an `altGraph`
	   * key modifier, which should not be handled by this set of key bindings.
	   */
	  isCtrlKeyCommand: function isCtrlKeyCommand(e) {
	    return !!e.ctrlKey && !e.altKey;
	  },

	  hasCommandModifier: function hasCommandModifier(e) {
	    return isOSX ? !!e.metaKey && !e.altKey : KeyBindingUtil.isCtrlKeyCommand(e);
	  }
	};

	module.exports = KeyBindingUtil;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyCommandBackspaceToStartOfLine
	 * 
	 */

	'use strict';

	var EditorState = __webpack_require__(57);

	var expandRangeToStartOfLine = __webpack_require__(60);
	var getDraftEditorSelectionWithNodes = __webpack_require__(68);
	var removeTextWithStrategy = __webpack_require__(98);

	function keyCommandBackspaceToStartOfLine(editorState) {
	  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
	    var domSelection = global.getSelection();
	    var range = domSelection.getRangeAt(0);
	    range = expandRangeToStartOfLine(range);

	    var selection = getDraftEditorSelectionWithNodes(strategyState, null, range.endContainer, range.endOffset, range.startContainer, range.startOffset).selectionState;
	    return selection;
	  }, 'backward');

	  if (afterRemoval === editorState.getCurrentContent()) {
	    return editorState;
	  }

	  return EditorState.push(editorState, afterRemoval, 'remove-range');
	}

	module.exports = keyCommandBackspaceToStartOfLine;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyCommandBackspaceWord
	 * 
	 */

	'use strict';

	var DraftRemovableWord = __webpack_require__(42);
	var EditorState = __webpack_require__(57);

	var moveSelectionBackward = __webpack_require__(94);
	var removeTextWithStrategy = __webpack_require__(98);

	/**
	 * Delete the word that is left of the cursor, as well as any spaces or
	 * punctuation after the word.
	 */
	function keyCommandBackspaceWord(editorState) {
	  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
	    var selection = strategyState.getSelection();
	    var offset = selection.getStartOffset();
	    // If there are no words before the cursor, remove the preceding newline.
	    if (offset === 0) {
	      return moveSelectionBackward(strategyState, 1);
	    }
	    var key = selection.getStartKey();
	    var content = strategyState.getCurrentContent();
	    var text = content.getBlockForKey(key).getText().slice(0, offset);
	    var toRemove = DraftRemovableWord.getBackward(text);
	    return moveSelectionBackward(strategyState, toRemove.length || 1);
	  }, 'backward');

	  if (afterRemoval === editorState.getCurrentContent()) {
	    return editorState;
	  }

	  return EditorState.push(editorState, afterRemoval, 'remove-range');
	}

	module.exports = keyCommandBackspaceWord;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyCommandDeleteWord
	 * 
	 */

	'use strict';

	var DraftRemovableWord = __webpack_require__(42);
	var EditorState = __webpack_require__(57);

	var moveSelectionForward = __webpack_require__(95);
	var removeTextWithStrategy = __webpack_require__(98);

	/**
	 * Delete the word that is right of the cursor, as well as any spaces or
	 * punctuation before the word.
	 */
	function keyCommandDeleteWord(editorState) {
	  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
	    var selection = strategyState.getSelection();
	    var offset = selection.getStartOffset();
	    var key = selection.getStartKey();
	    var content = strategyState.getCurrentContent();
	    var text = content.getBlockForKey(key).getText().slice(offset);
	    var toRemove = DraftRemovableWord.getForward(text);

	    // If there are no words in front of the cursor, remove the newline.
	    return moveSelectionForward(strategyState, toRemove.length || 1);
	  }, 'forward');

	  if (afterRemoval === editorState.getCurrentContent()) {
	    return editorState;
	  }

	  return EditorState.push(editorState, afterRemoval, 'remove-range');
	}

	module.exports = keyCommandDeleteWord;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyCommandInsertNewline
	 * 
	 */

	'use strict';

	var DraftModifier = __webpack_require__(39);
	var EditorState = __webpack_require__(57);

	function keyCommandInsertNewline(editorState) {
	  var contentState = DraftModifier.splitBlock(editorState.getCurrentContent(), editorState.getSelection());
	  return EditorState.push(editorState, contentState, 'split-block');
	}

	module.exports = keyCommandInsertNewline;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyCommandMoveSelectionToEndOfBlock
	 * 
	 */

	'use strict';

	var EditorState = __webpack_require__(57);

	/**
	 * See comment for `moveSelectionToStartOfBlock`.
	 */
	function keyCommandMoveSelectionToEndOfBlock(editorState) {
	  var selection = editorState.getSelection();
	  var endKey = selection.getEndKey();
	  var content = editorState.getCurrentContent();
	  var textLength = content.getBlockForKey(endKey).getLength();
	  return EditorState.set(editorState, {
	    selection: selection.merge({
	      anchorKey: endKey,
	      anchorOffset: textLength,
	      focusKey: endKey,
	      focusOffset: textLength,
	      isBackward: false
	    }),
	    forceSelection: true
	  });
	}

	module.exports = keyCommandMoveSelectionToEndOfBlock;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyCommandMoveSelectionToStartOfBlock
	 * 
	 */

	'use strict';

	var EditorState = __webpack_require__(57);

	/**
	 * Collapse selection at the start of the first selected block. This is used
	 * for Firefox versions that attempt to navigate forward/backward instead of
	 * moving the cursor. Other browsers are able to move the cursor natively.
	 */
	function keyCommandMoveSelectionToStartOfBlock(editorState) {
	  var selection = editorState.getSelection();
	  var startKey = selection.getStartKey();
	  return EditorState.set(editorState, {
	    selection: selection.merge({
	      anchorKey: startKey,
	      anchorOffset: 0,
	      focusKey: startKey,
	      focusOffset: 0,
	      isBackward: false
	    }),
	    forceSelection: true
	  });
	}

	module.exports = keyCommandMoveSelectionToStartOfBlock;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyCommandPlainBackspace
	 * 
	 */

	'use strict';

	var EditorState = __webpack_require__(57);
	var UnicodeUtils = __webpack_require__(137);

	var moveSelectionBackward = __webpack_require__(94);
	var removeTextWithStrategy = __webpack_require__(98);

	/**
	 * Remove the selected range. If the cursor is collapsed, remove the preceding
	 * character. This operation is Unicode-aware, so removing a single character
	 * will remove a surrogate pair properly as well.
	 */
	function keyCommandPlainBackspace(editorState) {
	  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
	    var selection = strategyState.getSelection();
	    var content = strategyState.getCurrentContent();
	    var key = selection.getAnchorKey();
	    var offset = selection.getAnchorOffset();
	    var charBehind = content.getBlockForKey(key).getText()[offset - 1];
	    return moveSelectionBackward(strategyState, charBehind ? UnicodeUtils.getUTF16Length(charBehind, 0) : 1);
	  }, 'backward');

	  if (afterRemoval === editorState.getCurrentContent()) {
	    return editorState;
	  }

	  var selection = editorState.getSelection();
	  return EditorState.push(editorState, afterRemoval.set('selectionBefore', selection), selection.isCollapsed() ? 'backspace-character' : 'remove-range');
	}

	module.exports = keyCommandPlainBackspace;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyCommandPlainDelete
	 * 
	 */

	'use strict';

	var EditorState = __webpack_require__(57);
	var UnicodeUtils = __webpack_require__(137);

	var moveSelectionForward = __webpack_require__(95);
	var removeTextWithStrategy = __webpack_require__(98);

	/**
	 * Remove the selected range. If the cursor is collapsed, remove the following
	 * character. This operation is Unicode-aware, so removing a single character
	 * will remove a surrogate pair properly as well.
	 */
	function keyCommandPlainDelete(editorState) {
	  var afterRemoval = removeTextWithStrategy(editorState, function (strategyState) {
	    var selection = strategyState.getSelection();
	    var content = strategyState.getCurrentContent();
	    var key = selection.getAnchorKey();
	    var offset = selection.getAnchorOffset();
	    var charAhead = content.getBlockForKey(key).getText()[offset];
	    return moveSelectionForward(strategyState, charAhead ? UnicodeUtils.getUTF16Length(charAhead, 0) : 1);
	  }, 'forward');

	  if (afterRemoval === editorState.getCurrentContent()) {
	    return editorState;
	  }

	  var selection = editorState.getSelection();

	  return EditorState.push(editorState, afterRemoval.set('selectionBefore', selection), selection.isCollapsed() ? 'delete-character' : 'remove-range');
	}

	module.exports = keyCommandPlainDelete;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyCommandTransposeCharacters
	 * 
	 */

	'use strict';

	var DraftModifier = __webpack_require__(39);
	var EditorState = __webpack_require__(57);

	var getContentStateFragment = __webpack_require__(65);

	/**
	 * Transpose the characters on either side of a collapsed cursor, or
	 * if the cursor is at the end of the block, transpose the last two
	 * characters.
	 */
	function keyCommandTransposeCharacters(editorState) {
	  var selection = editorState.getSelection();
	  if (!selection.isCollapsed()) {
	    return editorState;
	  }

	  var offset = selection.getAnchorOffset();
	  if (offset === 0) {
	    return editorState;
	  }

	  var blockKey = selection.getAnchorKey();
	  var content = editorState.getCurrentContent();
	  var block = content.getBlockForKey(blockKey);
	  var length = block.getLength();

	  // Nothing to transpose if there aren't two characters.
	  if (length <= 1) {
	    return editorState;
	  }

	  var removalRange;
	  var finalSelection;

	  if (offset === length) {
	    // The cursor is at the end of the block. Swap the last two characters.
	    removalRange = selection.set('anchorOffset', offset - 1);
	    finalSelection = selection;
	  } else {
	    removalRange = selection.set('focusOffset', offset + 1);
	    finalSelection = removalRange.set('anchorOffset', offset + 1);
	  }

	  // Extract the character to move as a fragment. This preserves its
	  // styling and entity, if any.
	  var movedFragment = getContentStateFragment(content, removalRange);
	  var afterRemoval = DraftModifier.removeRange(content, removalRange, 'backward');

	  // After the removal, the insertion target is one character back.
	  var selectionAfter = afterRemoval.getSelectionAfter();
	  var targetOffset = selectionAfter.getAnchorOffset() - 1;
	  var targetRange = selectionAfter.merge({
	    anchorOffset: targetOffset,
	    focusOffset: targetOffset
	  });

	  var afterInsert = DraftModifier.replaceWithFragment(afterRemoval, targetRange, movedFragment);

	  var newEditorState = EditorState.push(editorState, afterInsert, 'insert-fragment');

	  return EditorState.acceptSelection(newEditorState, finalSelection);
	}

	module.exports = keyCommandTransposeCharacters;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyCommandUndo
	 * 
	 */

	'use strict';

	var EditorState = __webpack_require__(57);

	function keyCommandUndo(e, editorState, updateFn) {
	  var undoneState = EditorState.undo(editorState);

	  // If the last change to occur was a spellcheck change, allow the undo
	  // event to fall through to the browser. This allows the browser to record
	  // the unwanted change, which should soon lead it to learn not to suggest
	  // the correction again.
	  if (editorState.getLastChangeType() === 'spellcheck-change') {
	    var nativelyRenderedContent = undoneState.getCurrentContent();
	    updateFn(EditorState.set(undoneState, { nativelyRenderedContent: nativelyRenderedContent }));
	    return;
	  }

	  // Otheriwse, manage the undo behavior manually.
	  e.preventDefault();
	  if (!editorState.getNativelyRenderedContent()) {
	    updateFn(undoneState);
	    return;
	  }

	  // Trigger a re-render with the current content state to ensure that the
	  // component tree has up-to-date props for comparison.
	  updateFn(EditorState.set(editorState, { nativelyRenderedContent: null }));

	  // Wait to ensure that the re-render has occurred before performing
	  // the undo action.
	  setTimeout(function () {
	    updateFn(undoneState);
	  }, 0);
	}

	module.exports = keyCommandUndo;

/***/ },
/* 94 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule moveSelectionBackward
	 * 
	 */

	/**
	 * Given a collapsed selection, move the focus `maxDistance` backward within
	 * the selected block. If the selection will go beyond the start of the block,
	 * move focus to the end of the previous block, but no further.
	 *
	 * This function is not Unicode-aware, so surrogate pairs will be treated
	 * as having length 2.
	 */
	'use strict';

	function moveSelectionBackward(editorState, maxDistance) {
	  var selection = editorState.getSelection();
	  var content = editorState.getCurrentContent();
	  var key = selection.getStartKey();
	  var offset = selection.getStartOffset();

	  var focusKey = key;
	  var focusOffset = 0;

	  if (maxDistance > offset) {
	    var keyBefore = content.getKeyBefore(key);
	    if (keyBefore == null) {
	      focusKey = key;
	    } else {
	      focusKey = keyBefore;
	      var blockBefore = content.getBlockForKey(keyBefore);
	      focusOffset = blockBefore.getText().length;
	    }
	  } else {
	    focusOffset = offset - maxDistance;
	  }

	  return selection.merge({
	    focusKey: focusKey,
	    focusOffset: focusOffset,
	    isBackward: true
	  });
	}

	module.exports = moveSelectionBackward;

/***/ },
/* 95 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule moveSelectionForward
	 * 
	 */

	/**
	 * Given a collapsed selection, move the focus `maxDistance` forward within
	 * the selected block. If the selection will go beyond the end of the block,
	 * move focus to the start of the next block, but no further.
	 *
	 * This function is not Unicode-aware, so surrogate pairs will be treated
	 * as having length 2.
	 */
	'use strict';

	function moveSelectionForward(editorState, maxDistance) {
	  var selection = editorState.getSelection();
	  var key = selection.getStartKey();
	  var offset = selection.getStartOffset();
	  var content = editorState.getCurrentContent();

	  var focusKey = key;
	  var focusOffset;

	  var block = content.getBlockForKey(key);

	  if (maxDistance > block.getText().length - offset) {
	    focusKey = content.getKeyAfter(key);
	    focusOffset = 0;
	  } else {
	    focusOffset = offset + maxDistance;
	  }

	  return selection.merge({ focusKey: focusKey, focusOffset: focusOffset });
	}

	module.exports = moveSelectionForward;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule removeEntitiesAtEdges
	 * 
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var CharacterMetadata = __webpack_require__(15);
	var DraftEntity = __webpack_require__(36);

	var findRangesImmutable = __webpack_require__(62);
	var invariant = __webpack_require__(122);

	function removeEntitiesAtEdges(contentState, selectionState) {
	  var blockMap = contentState.getBlockMap();

	  var updatedBlocks = {};

	  var startKey = selectionState.getStartKey();
	  var startOffset = selectionState.getStartOffset();
	  var startBlock = blockMap.get(startKey);
	  var updatedStart = removeForBlock(startBlock, startOffset);

	  if (updatedStart !== startBlock) {
	    updatedBlocks[startKey] = updatedStart;
	  }

	  var endKey = selectionState.getEndKey();
	  var endOffset = selectionState.getEndOffset();
	  var endBlock = blockMap.get(endKey);
	  if (startKey === endKey) {
	    endBlock = updatedStart;
	  }

	  var updatedEnd = removeForBlock(endBlock, endOffset);

	  if (updatedEnd !== endBlock) {
	    updatedBlocks[endKey] = updatedEnd;
	  }

	  if (!Object.keys(updatedBlocks).length) {
	    return contentState.set('selectionAfter', selectionState);
	  }

	  return contentState.merge({
	    blockMap: blockMap.merge(updatedBlocks),
	    selectionAfter: selectionState
	  });
	}

	function getRemovalRange(characters, key, offset) {
	  var removalRange;
	  findRangesImmutable(characters, function (a, b) {
	    return a.getEntity() === b.getEntity();
	  }, function (element) {
	    return element.getEntity() === key;
	  }, function (start, end) {
	    if (start <= offset && end >= offset) {
	      removalRange = { start: start, end: end };
	    }
	  });
	  !((typeof removalRange === 'undefined' ? 'undefined' : _typeof(removalRange)) === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Removal range must exist within character list.') : invariant(false) : undefined;
	  return removalRange;
	}

	function removeForBlock(block, offset) {
	  var chars = block.getCharacterList();
	  var charBefore = offset > 0 ? chars.get(offset - 1) : undefined;
	  var charAfter = offset < chars.count() ? chars.get(offset) : undefined;
	  var entityBeforeCursor = charBefore ? charBefore.getEntity() : undefined;
	  var entityAfterCursor = charAfter ? charAfter.getEntity() : undefined;

	  if (entityAfterCursor && entityAfterCursor === entityBeforeCursor) {
	    var entity = DraftEntity.get(entityAfterCursor);
	    if (entity.getMutability() !== 'MUTABLE') {
	      var _getRemovalRange = getRemovalRange(chars, entityAfterCursor, offset);

	      var start = _getRemovalRange.start;
	      var end = _getRemovalRange.end;

	      var current;
	      while (start < end) {
	        current = chars.get(start);
	        chars = chars.set(start, CharacterMetadata.applyEntity(current, null));
	        start++;
	      }
	      return block.set('characterList', chars);
	    }
	  }

	  return block;
	}

	module.exports = removeEntitiesAtEdges;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule removeRangeFromContentState
	 * 
	 */

	'use strict';

	var Immutable = __webpack_require__(163);

	function removeRangeFromContentState(contentState, selectionState) {
	  if (selectionState.isCollapsed()) {
	    return contentState;
	  }

	  var blockMap = contentState.getBlockMap();
	  var startKey = selectionState.getStartKey();
	  var startOffset = selectionState.getStartOffset();
	  var endKey = selectionState.getEndKey();
	  var endOffset = selectionState.getEndOffset();

	  var startBlock = blockMap.get(startKey);
	  var endBlock = blockMap.get(endKey);
	  var characterList;

	  if (startBlock === endBlock) {
	    characterList = removeFromList(startBlock.getCharacterList(), startOffset, endOffset);
	  } else {
	    characterList = startBlock.getCharacterList().slice(0, startOffset).concat(endBlock.getCharacterList().slice(endOffset));
	  }

	  var modifiedStart = startBlock.merge({
	    text: startBlock.getText().slice(0, startOffset) + endBlock.getText().slice(endOffset),
	    characterList: characterList
	  });

	  var newBlocks = blockMap.toSeq().skipUntil(function (_, k) {
	    return k === startKey;
	  }).takeUntil(function (_, k) {
	    return k === endKey;
	  }).concat(Immutable.Map([[endKey, null]])).map(function (_, k) {
	    return k === startKey ? modifiedStart : null;
	  });

	  blockMap = blockMap.merge(newBlocks).filter(function (block) {
	    return !!block;
	  });

	  return contentState.merge({
	    blockMap: blockMap,
	    selectionBefore: selectionState,
	    selectionAfter: selectionState.merge({
	      anchorKey: startKey,
	      anchorOffset: startOffset,
	      focusKey: startKey,
	      focusOffset: startOffset,
	      isBackward: false
	    })
	  });
	}

	/**
	 * Maintain persistence for target list when removing characters on the
	 * head and tail of the character list.
	 */
	function removeFromList(targetList, startOffset, endOffset) {
	  if (startOffset === 0) {
	    while (startOffset < endOffset) {
	      targetList = targetList.shift();
	      startOffset++;
	    }
	  } else if (endOffset === targetList.count()) {
	    while (endOffset > startOffset) {
	      targetList = targetList.pop();
	      endOffset--;
	    }
	  } else {
	    var head = targetList.slice(0, startOffset);
	    var tail = targetList.slice(endOffset);
	    targetList = head.concat(tail).toList();
	  }
	  return targetList;
	}

	module.exports = removeRangeFromContentState;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule removeTextWithStrategy
	 * 
	 */

	/**
	 * For a collapsed selection state, remove text based on the specified strategy.
	 * If the selection state is not collapsed, remove the entire selected range.
	 */
	'use strict';

	var DraftModifier = __webpack_require__(39);

	function removeTextWithStrategy(editorState, strategy, direction) {
	  var selection = editorState.getSelection();
	  var content = editorState.getCurrentContent();
	  var target = selection;
	  if (selection.isCollapsed()) {
	    if (direction === 'forward') {
	      if (editorState.isSelectionAtEndOfContent()) {
	        return content;
	      }
	    } else if (editorState.isSelectionAtStartOfContent()) {
	      return content;
	    }

	    target = strategy(editorState);
	    if (target === selection) {
	      return content;
	    }
	  }
	  return DraftModifier.removeRange(content, target, direction);
	}

	module.exports = removeTextWithStrategy;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule RichTextEditorUtil
	 * @typechecks
	 * 
	 */

	'use strict';

	var DraftEntity = __webpack_require__(36);
	var DraftModifier = __webpack_require__(39);
	var EditorState = __webpack_require__(57);

	var adjustBlockDepthForContentState = __webpack_require__(10);

	var RichTextEditorUtil = {
	  currentBlockContainsLink: function currentBlockContainsLink(editorState) {
	    var selection = editorState.getSelection();
	    return editorState.getCurrentContent().getBlockForKey(selection.getAnchorKey()).getCharacterList().slice(selection.getStartOffset(), selection.getEndOffset()).some(function (v) {
	      var entity = v.getEntity();
	      return !!entity && DraftEntity.get(entity).getType() === 'LINK';
	    });
	  },

	  getCurrentBlockType: function getCurrentBlockType(editorState) {
	    var selection = editorState.getSelection();
	    return editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
	  },

	  getDataObjectForLinkURL: function getDataObjectForLinkURL(uri) {
	    return { url: uri.toString() };
	  },

	  handleKeyCommand: function handleKeyCommand(editorState, command) {
	    switch (command) {
	      case 'bold':
	        return RichTextEditorUtil.toggleInlineStyle(editorState, 'BOLD');
	      case 'italic':
	        return RichTextEditorUtil.toggleInlineStyle(editorState, 'ITALIC');
	      case 'underline':
	        return RichTextEditorUtil.toggleInlineStyle(editorState, 'UNDERLINE');
	      case 'code':
	        return RichTextEditorUtil.toggleCode(editorState);
	      case 'backspace':
	      case 'backspace-word':
	      case 'backspace-to-start-of-line':
	        return RichTextEditorUtil.onBackspace(editorState);
	      case 'delete':
	      case 'delete-word':
	      case 'delete-to-end-of-block':
	        return RichTextEditorUtil.onDelete(editorState);
	      default:
	        return null;
	    }
	  },

	  insertSoftNewline: function insertSoftNewline(editorState) {
	    var contentState = DraftModifier.insertText(editorState.getCurrentContent(), editorState.getSelection(), '\n', editorState.getCurrentInlineStyle(), null);

	    return EditorState.push(editorState, contentState, 'insert-characters');
	  },

	  /**
	   * For collapsed selections at the start of styled blocks, backspace should
	   * just remove the existing style.
	   */
	  onBackspace: function onBackspace(editorState) {
	    var selection = editorState.getSelection();
	    if (!selection.isCollapsed() || selection.getAnchorOffset() || selection.getFocusOffset()) {
	      return null;
	    }

	    // First, try to remove a preceding media block.
	    var content = editorState.getCurrentContent();
	    var startKey = selection.getStartKey();
	    var blockAfter = content.getBlockAfter(startKey);

	    // If the current block is empty, just delete it.
	    if (blockAfter && content.getBlockForKey(startKey).getLength() === 0) {
	      return null;
	    }

	    var blockBefore = content.getBlockBefore(startKey);

	    if (blockBefore && blockBefore.getType() === 'media') {
	      var mediaBlockTarget = selection.merge({
	        anchorKey: blockBefore.getKey(),
	        anchorOffset: 0
	      });
	      var asCurrentStyle = DraftModifier.setBlockType(content, mediaBlockTarget, content.getBlockForKey(startKey).getType());
	      var withoutMedia = DraftModifier.removeRange(asCurrentStyle, mediaBlockTarget, 'backward');
	      if (withoutMedia !== content) {
	        return EditorState.push(editorState, withoutMedia, 'remove-range');
	      }
	    }

	    // If that doesn't succeed, try to remove the current block style.
	    var withoutBlockStyle = RichTextEditorUtil.tryToRemoveBlockStyle(editorState);

	    if (withoutBlockStyle) {
	      return EditorState.push(editorState, withoutBlockStyle, 'change-block-type');
	    }

	    return null;
	  },

	  onDelete: function onDelete(editorState) {
	    var selection = editorState.getSelection();
	    if (!selection.isCollapsed()) {
	      return null;
	    }

	    var content = editorState.getCurrentContent();
	    var startKey = selection.getStartKey();
	    var block = content.getBlockForKey(startKey);
	    var length = block.getLength();

	    // The cursor is somewhere within the text. Behave normally.
	    if (selection.getStartOffset() < length) {
	      return null;
	    }

	    var blockAfter = content.getBlockAfter(startKey);

	    if (!blockAfter || blockAfter.getType() !== 'media') {
	      return null;
	    }

	    // If the current block is empty, delete it.
	    if (length === 0) {
	      var target = selection.merge({
	        focusKey: blockAfter.getKey(),
	        focusOffset: 0
	      });

	      var withoutEmptyBlock = DraftModifier.removeRange(content, target, 'forward');

	      var preserveMedia = DraftModifier.setBlockType(withoutEmptyBlock, withoutEmptyBlock.getSelectionAfter(), 'media');

	      return EditorState.push(editorState, preserveMedia, 'remove-range');
	    }

	    // Otherwise, delete the media block.
	    var mediaBlockTarget = selection.merge({
	      focusKey: blockAfter.getKey(),
	      focusOffset: blockAfter.getLength()
	    });

	    var withoutMedia = DraftModifier.removeRange(content, mediaBlockTarget, 'forward');

	    if (withoutMedia !== content) {
	      return EditorState.push(editorState, withoutMedia, 'remove-range');
	    }

	    return null;
	  },

	  onTab: function onTab(event, editorState, maxDepth) {
	    var selection = editorState.getSelection();
	    var key = selection.getAnchorKey();
	    if (key !== selection.getFocusKey()) {
	      return editorState;
	    }

	    var content = editorState.getCurrentContent();
	    var block = content.getBlockForKey(key);
	    var type = block.getType();
	    if (type !== 'unordered-list-item' && type !== 'ordered-list-item') {
	      return editorState;
	    }

	    event.preventDefault();

	    var blockAbove = content.getBlockBefore(key);
	    var depth = maxDepth;

	    // Only allow indenting one level beyond the block above, and only if
	    // the block above is a list item as well. Always allow unindenting
	    // if depth is greater than zero.
	    if (event.shiftKey) {
	      if (block.getDepth() === 0) {
	        return editorState;
	      }
	    } else {
	      if (!blockAbove || block.getDepth() === maxDepth) {
	        return editorState;
	      }

	      var typeAbove = blockAbove.getType();
	      if (typeAbove !== 'unordered-list-item' && typeAbove !== 'ordered-list-item') {
	        return editorState;
	      }

	      depth = Math.min(blockAbove.getDepth() + 1, maxDepth);
	    }

	    var withAdjustment = adjustBlockDepthForContentState(content, selection, event.shiftKey ? -1 : 1, depth);

	    return EditorState.push(editorState, withAdjustment, 'adjust-depth');
	  },

	  toggleBlockType: function toggleBlockType(editorState, blockType) {
	    var selection = editorState.getSelection();
	    var startKey = selection.getStartKey();
	    var endKey = selection.getEndKey();
	    var content = editorState.getCurrentContent();

	    var hasMedia = content.getBlockMap().skipWhile(function (_, k) {
	      return k !== startKey;
	    }).takeWhile(function (_, k) {
	      return k !== endKey;
	    }).some(function (v) {
	      return v.getType() === 'media';
	    });

	    if (hasMedia) {
	      return editorState;
	    }

	    var typeToSet = content.getBlockForKey(startKey).getType() === blockType ? 'unstyled' : blockType;

	    return EditorState.push(editorState, DraftModifier.setBlockType(content, selection, typeToSet), 'change-block-type');
	  },

	  toggleCode: function toggleCode(editorState) {
	    var selection = editorState.getSelection();
	    var anchorKey = selection.getAnchorKey();
	    var focusKey = selection.getFocusKey();

	    if (selection.isCollapsed() || anchorKey !== focusKey) {
	      return RichTextEditorUtil.toggleBlockType(editorState, 'code-block');
	    }

	    return RichTextEditorUtil.toggleInlineStyle(editorState, 'CODE');
	  },

	  /**
	   * Toggle the specified inline style for the selection. If the
	   * user's selection is collapsed, apply or remove the style for the
	   * internal state. If it is not collapsed, apply the change directly
	   * to the document state.
	   */
	  toggleInlineStyle: function toggleInlineStyle(editorState, inlineStyle) {
	    var selection = editorState.getSelection();
	    var currentStyle = editorState.getCurrentInlineStyle();

	    // If the selection is collapsed, toggle the specified style on or off and
	    // set the result as the new inline style override. This will then be
	    // used as the inline style for the next character to be inserted.
	    if (selection.isCollapsed()) {
	      return EditorState.set(editorState, {
	        inlineStyleOverride: currentStyle.has(inlineStyle) ? currentStyle.remove(inlineStyle) : currentStyle.add(inlineStyle)
	      });
	    }

	    // If characters are selected, immediately apply or remove the
	    // inline style on the document state itself.
	    var content = editorState.getCurrentContent();
	    var newContent;

	    // If the style is already present for the selection range, remove it.
	    // Otherwise, apply it.
	    if (currentStyle.has(inlineStyle)) {
	      newContent = DraftModifier.removeInlineStyle(content, selection, inlineStyle);
	    } else {
	      newContent = DraftModifier.applyInlineStyle(content, selection, inlineStyle);
	    }

	    return EditorState.push(editorState, newContent, 'change-inline-style');
	  },

	  toggleLink: function toggleLink(editorState, targetSelection, entityKey) {
	    var withoutLink = DraftModifier.applyEntity(editorState.getCurrentContent(), targetSelection, entityKey);

	    return EditorState.push(editorState, withoutLink, 'apply-entity');
	  },

	  /**
	   * When a collapsed cursor is at the start of an empty styled block, allow
	   * certain key commands (newline, backspace) to simply change the
	   * style of the block instead of the default behavior.
	   */
	  tryToRemoveBlockStyle: function tryToRemoveBlockStyle(editorState) {
	    var selection = editorState.getSelection();
	    var offset = selection.getAnchorOffset();
	    if (selection.isCollapsed() && offset === 0) {
	      var key = selection.getAnchorKey();
	      var content = editorState.getCurrentContent();
	      var block = content.getBlockForKey(key);
	      if (block.getLength() > 0) {
	        return null;
	      }

	      var type = block.getType();
	      if (type !== 'unstyled' && type !== 'code-block') {
	        return DraftModifier.setBlockType(content, selection, 'unstyled');
	      }
	    }
	    return null;
	  }
	};

	module.exports = RichTextEditorUtil;

/***/ },
/* 100 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule sanitizeDraftText
	 * 
	 */

	'use strict';

	var REGEX_BLOCK_DELIMITER = new RegExp('\r', 'g');

	function sanitizeDraftText(input) {
	  return input.replace(REGEX_BLOCK_DELIMITER, '');
	}

	module.exports = sanitizeDraftText;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SecondaryClipboard
	 * 
	 */

	'use strict';

	var DraftModifier = __webpack_require__(39);
	var EditorState = __webpack_require__(57);

	var getContentStateFragment = __webpack_require__(65);
	var nullthrows = __webpack_require__(129);

	var clipboard = null;

	/**
	 * Some systems offer a "secondary" clipboard to allow quick internal cut
	 * and paste behavior. For instance, Ctrl+K (cut) and Ctrl+Y (paste).
	 */
	var SecondaryClipboard = {
	  cut: function cut(editorState) {
	    var content = editorState.getCurrentContent();
	    var selection = editorState.getSelection();
	    var targetRange = null;

	    if (selection.isCollapsed()) {
	      var anchorKey = selection.getAnchorKey();
	      var blockEnd = content.getBlockForKey(anchorKey).getLength();

	      if (blockEnd === selection.getAnchorOffset()) {
	        return editorState;
	      }

	      targetRange = selection.set('focusOffset', blockEnd);
	    } else {
	      targetRange = selection;
	    }

	    targetRange = nullthrows(targetRange);
	    clipboard = getContentStateFragment(content, targetRange);

	    var afterRemoval = DraftModifier.removeRange(content, targetRange, 'forward');

	    if (afterRemoval === content) {
	      return editorState;
	    }

	    return EditorState.push(editorState, afterRemoval, 'remove-range');
	  },

	  paste: function paste(editorState) {
	    if (!clipboard) {
	      return editorState;
	    }

	    var newContent = DraftModifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), clipboard);

	    return EditorState.push(editorState, newContent, 'insert-fragment');
	  }
	};

	module.exports = SecondaryClipboard;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SelectionState
	 * @typechecks
	 * 
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Immutable = __webpack_require__(163);

	var Record = Immutable.Record;

	var defaultRecord = {
	  anchorKey: '',
	  anchorOffset: 0,
	  focusKey: '',
	  focusOffset: 0,
	  isBackward: false,
	  hasFocus: false
	};

	var SelectionStateRecord = Record(defaultRecord);

	var SelectionState = function (_SelectionStateRecord) {
	  _inherits(SelectionState, _SelectionStateRecord);

	  function SelectionState() {
	    _classCallCheck(this, SelectionState);

	    _get(Object.getPrototypeOf(SelectionState.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(SelectionState, [{
	    key: 'serialize',
	    value: function serialize() {
	      return 'Anchor: ' + this.getAnchorKey() + ':' + this.getAnchorOffset() + ', ' + 'Focus: ' + this.getFocusKey() + ':' + this.getFocusOffset() + ', ' + 'Is Backward: ' + String(this.getIsBackward()) + ', ' + 'Has Focus: ' + String(this.getHasFocus());
	    }
	  }, {
	    key: 'getAnchorKey',
	    value: function getAnchorKey() {
	      return this.get('anchorKey');
	    }
	  }, {
	    key: 'getAnchorOffset',
	    value: function getAnchorOffset() {
	      return this.get('anchorOffset');
	    }
	  }, {
	    key: 'getFocusKey',
	    value: function getFocusKey() {
	      return this.get('focusKey');
	    }
	  }, {
	    key: 'getFocusOffset',
	    value: function getFocusOffset() {
	      return this.get('focusOffset');
	    }
	  }, {
	    key: 'getIsBackward',
	    value: function getIsBackward() {
	      return this.get('isBackward');
	    }
	  }, {
	    key: 'getHasFocus',
	    value: function getHasFocus() {
	      return this.get('hasFocus');
	    }

	    /**
	     * Return whether the specified range overlaps with an edge of the
	     * SelectionState.
	     */
	  }, {
	    key: 'hasEdgeWithin',
	    value: function hasEdgeWithin(blockKey, start, end) {
	      var anchorKey = this.getAnchorKey();
	      var focusKey = this.getFocusKey();

	      if (anchorKey === focusKey && anchorKey === blockKey) {
	        var selectionStart = this.getStartOffset();
	        var selectionEnd = this.getEndOffset();
	        return start <= selectionEnd && selectionStart <= end;
	      }

	      if (blockKey !== anchorKey && blockKey !== focusKey) {
	        return false;
	      }

	      var offsetToCheck = blockKey === anchorKey ? this.getAnchorOffset() : this.getFocusOffset();

	      return start <= offsetToCheck && end >= offsetToCheck;
	    }
	  }, {
	    key: 'isCollapsed',
	    value: function isCollapsed() {
	      return this.getAnchorKey() === this.getFocusKey() && this.getAnchorOffset() === this.getFocusOffset();
	    }
	  }, {
	    key: 'getStartKey',
	    value: function getStartKey() {
	      return this.getIsBackward() ? this.getFocusKey() : this.getAnchorKey();
	    }
	  }, {
	    key: 'getStartOffset',
	    value: function getStartOffset() {
	      return this.getIsBackward() ? this.getFocusOffset() : this.getAnchorOffset();
	    }
	  }, {
	    key: 'getEndKey',
	    value: function getEndKey() {
	      return this.getIsBackward() ? this.getAnchorKey() : this.getFocusKey();
	    }
	  }, {
	    key: 'getEndOffset',
	    value: function getEndOffset() {
	      return this.getIsBackward() ? this.getAnchorOffset() : this.getFocusOffset();
	    }
	  }], [{
	    key: 'createEmpty',
	    value: function createEmpty(key) {
	      return new SelectionState({
	        anchorKey: key,
	        anchorOffset: 0,
	        focusKey: key,
	        focusOffset: 0,
	        isBackward: false,
	        hasFocus: false
	      });
	    }
	  }]);

	  return SelectionState;
	}(SelectionStateRecord);

	module.exports = SelectionState;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule setBlockTypeForContentState
	 * @typechecks
	 * 
	 */

	'use strict';

	var Immutable = __webpack_require__(163);

	function setBlockTypeForContentState(contentState, selectionState, blockType) {
	  var startKey = selectionState.getStartKey();
	  var endKey = selectionState.getEndKey();
	  var blockMap = contentState.getBlockMap();
	  var newBlocks = blockMap.toSeq().skipUntil(function (_, k) {
	    return k === startKey;
	  }).takeUntil(function (_, k) {
	    return k === endKey;
	  }).concat(Immutable.Map([[endKey, blockMap.get(endKey)]])).map(function (block) {
	    return block.merge({ type: blockType, depth: 0 });
	  });

	  return contentState.merge({
	    blockMap: blockMap.merge(newBlocks),
	    selectionBefore: selectionState,
	    selectionAfter: selectionState
	  });
	}

	module.exports = setBlockTypeForContentState;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule setDraftEditorSelection
	 * @typechecks
	 * 
	 */

	/**
	 * In modern non-IE browsers, we can support both forward and backward
	 * selections.
	 *
	 * Note: IE10+ supports the Selection object, but it does not support
	 * the `extend` method, which means that even in modern IE, it's not possible
	 * to programatically create a backward selection. Thus, for all IE
	 * versions, we use the old IE API to create our selections.
	 */
	'use strict';

	var containsNode = __webpack_require__(108);
	var getActiveElement = __webpack_require__(113);

	function setDraftEditorSelection(selectionState, node, blockKey, nodeStart, nodeEnd) {
	  // It's possible that the editor has been removed from the DOM but
	  // our selection code doesn't know it yet. Forcing selection in
	  // this case may lead to errors, so just bail now.
	  if (!containsNode(document.documentElement, node)) {
	    return;
	  }

	  var selection = global.getSelection();
	  var anchorKey = selectionState.getAnchorKey();
	  var anchorOffset = selectionState.getAnchorOffset();
	  var focusKey = selectionState.getFocusKey();
	  var focusOffset = selectionState.getFocusOffset();
	  var isBackward = selectionState.getIsBackward();

	  // IE doesn't support backward selection. Swap key/offset pairs.
	  if (!selection.extend && isBackward) {
	    var tempKey = anchorKey;
	    var tempOffset = anchorOffset;
	    anchorKey = focusKey;
	    anchorOffset = focusOffset;
	    focusKey = tempKey;
	    focusOffset = tempOffset;
	    isBackward = false;
	  }

	  var hasAnchor = anchorKey === blockKey && nodeStart <= anchorOffset && nodeEnd >= anchorOffset;

	  var hasFocus = focusKey === blockKey && nodeStart <= focusOffset && nodeEnd >= focusOffset;

	  // If the selection is entirely bound within this node, set the selection
	  // and be done.
	  if (hasAnchor && hasFocus) {
	    selection.removeAllRanges();
	    addPointToSelection(selection, node, anchorOffset - nodeStart);
	    addFocusToSelection(selection, node, focusOffset - nodeStart);
	    return;
	  }

	  if (!isBackward) {
	    // If the anchor is within this node, set the range start.
	    if (hasAnchor) {
	      selection.removeAllRanges();
	      addPointToSelection(selection, node, anchorOffset - nodeStart);
	    }

	    // If the focus is within this node, we can assume that we have
	    // already set the appropriate start range on the selection, and
	    // can simply extend the selection.
	    if (hasFocus) {
	      addFocusToSelection(selection, node, focusOffset - nodeStart);
	    }
	  } else {
	    // If this node has the focus, set the selection range to be a
	    // collapsed range beginning here. Later, when we encounter the anchor,
	    // we'll use this information to extend the selection.
	    if (hasFocus) {
	      selection.removeAllRanges();
	      addPointToSelection(selection, node, focusOffset - nodeStart);
	    }

	    // If this node has the anchor, we may assume that the correct
	    // focus information is already stored on the selection object.
	    // We keep track of it, reset the selection range, and extend it
	    // back to the focus point.
	    if (hasAnchor) {
	      var storedFocusNode = selection.focusNode;
	      var storedFocusOffset = selection.focusOffset;

	      selection.removeAllRanges();
	      addPointToSelection(selection, node, anchorOffset - nodeStart);
	      addFocusToSelection(selection, storedFocusNode, storedFocusOffset);
	    }
	  }
	}

	/**
	 * Extend selection towards focus point.
	 */
	function addFocusToSelection(selection, node, offset) {
	  if (selection.extend && containsNode(getActiveElement(), node)) {
	    // If `extend` is called while another element has focus, an error is
	    // thrown. We therefore disable `extend` if the active element is somewhere
	    // other than the node we are selecting. This should only occur in Firefox,
	    // since it is the only browser to support multiple selections.
	    // See https://bugzilla.mozilla.org/show_bug.cgi?id=921444.
	    selection.extend(node, offset);
	  } else {
	    // IE doesn't support extend. This will mean no backward selection.
	    // Extract the existing selection range and add focus to it.
	    // Additionally, clone the selection range. IE11 throws an
	    // InvalidStateError when attempting to access selection properties
	    // after the range is detached.
	    var range = selection.getRangeAt(0);
	    range.setEnd(node, offset);
	    selection.addRange(range.cloneRange());
	  }
	}

	function addPointToSelection(selection, node, offset) {
	  var range = document.createRange();
	  range.setStart(node, offset);
	  selection.addRange(range);
	}

	module.exports = setDraftEditorSelection;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule splitBlockInContentState
	 * @typechecks
	 * 
	 */

	'use strict';

	var generateBlockKey = __webpack_require__(63);
	var invariant = __webpack_require__(122);

	function splitBlockInContentState(contentState, selectionState) {
	  !selectionState.isCollapsed() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Selection range must be collapsed.') : invariant(false) : undefined;

	  var key = selectionState.getAnchorKey();
	  var offset = selectionState.getAnchorOffset();
	  var blockMap = contentState.getBlockMap();
	  var blockToSplit = blockMap.get(key);

	  var text = blockToSplit.getText();
	  var chars = blockToSplit.getCharacterList();

	  var blockAbove = blockToSplit.merge({
	    text: text.slice(0, offset),
	    characterList: chars.slice(0, offset)
	  });

	  var keyBelow = generateBlockKey();
	  var blockBelow = blockAbove.merge({
	    key: keyBelow,
	    text: text.slice(offset),
	    characterList: chars.slice(offset)
	  });

	  var blocksBefore = blockMap.toSeq().takeUntil(function (v) {
	    return v === blockToSplit;
	  });
	  var blocksAfter = blockMap.toSeq().skipUntil(function (v) {
	    return v === blockToSplit;
	  }).rest();
	  var newBlocks = blocksBefore.concat([[blockAbove.getKey(), blockAbove], [blockBelow.getKey(), blockBelow]], blocksAfter).toOrderedMap();

	  return contentState.merge({
	    blockMap: newBlocks,
	    selectionBefore: selectionState,
	    selectionAfter: selectionState.merge({
	      anchorKey: keyBelow,
	      anchorOffset: 0,
	      focusKey: keyBelow,
	      focusOffset: 0,
	      isBackward: false
	    })
	  });
	}

	module.exports = splitBlockInContentState;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 106 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule splitTextIntoTextBlocks
	 * 
	 */

	'use strict';

	var NEWLINE_REGEX = /\r\n?|\n/g;

	function splitTextIntoTextBlocks(text) {
	  return text.split(NEWLINE_REGEX);
	}

	module.exports = splitTextIntoTextBlocks;

/***/ },
/* 107 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	"use strict";

	var _hyphenPattern = /-(.)/g;

	/**
	 * Camelcases a hyphenated string, for example:
	 *
	 *   > camelize('background-color')
	 *   < "backgroundColor"
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelize(string) {
	  return string.replace(_hyphenPattern, function (_, character) {
	    return character.toUpperCase();
	  });
	}

	module.exports = camelize;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var isTextNode = __webpack_require__(124);

	/*eslint-disable no-bitwise */

	/**
	 * Checks if a given DOM node contains or is another DOM node.
	 *
	 * @param {?DOMNode} outerNode Outer DOM node.
	 * @param {?DOMNode} innerNode Inner DOM node.
	 * @return {boolean} True if `outerNode` contains or is `innerNode`.
	 */
	function containsNode(_x, _x2) {
	  var _again = true;

	  _function: while (_again) {
	    var outerNode = _x,
	        innerNode = _x2;
	    _again = false;

	    if (!outerNode || !innerNode) {
	      return false;
	    } else if (outerNode === innerNode) {
	      return true;
	    } else if (isTextNode(outerNode)) {
	      return false;
	    } else if (isTextNode(innerNode)) {
	      _x = outerNode;
	      _x2 = innerNode.parentNode;
	      _again = true;
	      continue _function;
	    } else if (outerNode.contains) {
	      return outerNode.contains(innerNode);
	    } else if (outerNode.compareDocumentPosition) {
	      return !!(outerNode.compareDocumentPosition(innerNode) & 16);
	    } else {
	      return false;
	    }
	  }
	}

	module.exports = containsNode;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var invariant = __webpack_require__(122);

	/**
	 * Convert array-like objects to arrays.
	 *
	 * This API assumes the caller knows the contents of the data type. For less
	 * well defined inputs use createArrayFromMixed.
	 *
	 * @param {object|function|filelist} obj
	 * @return {array}
	 */
	function toArray(obj) {
	  var length = obj.length;

	  // Some browsers builtin objects can report typeof 'function' (e.g. NodeList
	  // in old versions of Safari).
	  !(!Array.isArray(obj) && ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function')) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'toArray: Array-like object expected') : invariant(false) : undefined;

	  !(typeof length === 'number') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'toArray: Object needs a length property') : invariant(false) : undefined;

	  !(length === 0 || length - 1 in obj) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'toArray: Object should have keys for indices') : invariant(false) : undefined;

	  !(typeof obj.callee !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'toArray: Object can\'t be `arguments`. Use rest params ' + '(function(...args) {}) or Array.from() instead.') : invariant(false) : undefined;

	  // Old IE doesn't give collections access to hasOwnProperty. Assume inputs
	  // without method will throw during the slice call and skip straight to the
	  // fallback.
	  if (obj.hasOwnProperty) {
	    try {
	      return Array.prototype.slice.call(obj);
	    } catch (e) {
	      // IE < 9 does not support Array#slice on collections objects
	    }
	  }

	  // Fall back to copying key by key. This assumes all keys have a value,
	  // so will not preserve sparsely populated inputs.
	  var ret = Array(length);
	  for (var ii = 0; ii < length; ii++) {
	    ret[ii] = obj[ii];
	  }
	  return ret;
	}

	/**
	 * Perform a heuristic test to determine if an object is "array-like".
	 *
	 *   A monk asked Joshu, a Zen master, "Has a dog Buddha nature?"
	 *   Joshu replied: "Mu."
	 *
	 * This function determines if its argument has "array nature": it returns
	 * true if the argument is an actual array, an `arguments' object, or an
	 * HTMLCollection (e.g. node.childNodes or node.getElementsByTagName()).
	 *
	 * It will return false for other array-like objects like Filelist.
	 *
	 * @param {*} obj
	 * @return {boolean}
	 */
	function hasArrayNature(obj) {
	  return(
	    // not null/false
	    !!obj && (
	    // arrays are objects, NodeLists are functions in Safari
	    (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == 'object' || typeof obj == 'function') &&
	    // quacks like an array
	    'length' in obj &&
	    // not window
	    !('setInterval' in obj) &&
	    // no DOM node should be considered an array-like
	    // a 'select' element has 'length' and 'item' properties on IE8
	    typeof obj.nodeType != 'number' && (
	    // a real array
	    Array.isArray(obj) ||
	    // arguments
	    'callee' in obj ||
	    // HTMLCollection/NodeList
	    'item' in obj)
	  );
	}

	/**
	 * Ensure that the argument is an array by wrapping it in an array if it is not.
	 * Creates a copy of the argument if it is already an array.
	 *
	 * This is mostly useful idiomatically:
	 *
	 *   var createArrayFromMixed = require('createArrayFromMixed');
	 *
	 *   function takesOneOrMoreThings(things) {
	 *     things = createArrayFromMixed(things);
	 *     ...
	 *   }
	 *
	 * This allows you to treat `things' as an array, but accept scalars in the API.
	 *
	 * If you need to convert an array-like object, like `arguments`, into an array
	 * use toArray instead.
	 *
	 * @param {*} obj
	 * @return {array}
	 */
	function createArrayFromMixed(obj) {
	  if (!hasArrayNature(obj)) {
	    return [obj];
	  } else if (Array.isArray(obj)) {
	    return obj.slice();
	  } else {
	    return toArray(obj);
	  }
	}

	module.exports = createArrayFromMixed;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 110 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function cx(classNames) {
	  if ((typeof classNames === 'undefined' ? 'undefined' : _typeof(classNames)) == 'object') {
	    return Object.keys(classNames).filter(function (className) {
	      return classNames[className];
	    }).map(replace).join(' ');
	  }
	  return Array.prototype.map.call(arguments, replace).join(' ');
	}

	function replace(str) {
	  return str.replace(/\//g, '-');
	}

	module.exports = cx;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var PhotosMimeType = __webpack_require__(130);

	var createArrayFromMixed = __webpack_require__(109);
	var emptyFunction = __webpack_require__(112);

	var CR_LF_REGEX = new RegExp('\r\n', 'g');
	var LF_ONLY = '\n';

	var RICH_TEXT_TYPES = {
	  'text/rtf': 1,
	  'text/html': 1
	};

	/**
	 * If DataTransferItem is a file then return the Blob of data.
	 *
	 * @param {object} item
	 * @return {?blob}
	 */
	function getFileFromDataTransfer(item) {
	  if (item.kind == 'file') {
	    return item.getAsFile();
	  }
	}

	var DataTransfer = function () {
	  /**
	   * @param {object} data
	   */

	  function DataTransfer(data) {
	    _classCallCheck(this, DataTransfer);

	    this.data = data;

	    // Types could be DOMStringList or array
	    this.types = data.types ? createArrayFromMixed(data.types) : [];
	  }

	  /**
	   * Is this likely to be a rich text data transfer?
	   *
	   * @return {boolean}
	   */

	  DataTransfer.prototype.isRichText = function isRichText() {
	    // If HTML is available, treat this data as rich text. This way, we avoid
	    // using a pasted image if it is packaged with HTML -- this may occur with
	    // pastes from MS Word, for example.
	    if (this.getHTML()) {
	      return true;
	    }

	    // When an image is copied from a preview window, you end up with two
	    // DataTransferItems one of which is a file's metadata as text.  Skip those.
	    if (this.isImage()) {
	      return false;
	    }

	    return this.types.some(function (type) {
	      return RICH_TEXT_TYPES[type];
	    });
	  };

	  /**
	   * Get raw text.
	   *
	   * @return {?string}
	   */

	  DataTransfer.prototype.getText = function getText() {
	    var text;
	    if (this.data.getData) {
	      if (!this.types.length) {
	        text = this.data.getData('Text');
	      } else if (this.types.indexOf('text/plain') != -1) {
	        text = this.data.getData('text/plain');
	      }
	    }
	    return text ? text.replace(CR_LF_REGEX, LF_ONLY) : null;
	  };

	  /**
	   * Get HTML paste data
	   *
	   * @return {?string}
	   */

	  DataTransfer.prototype.getHTML = function getHTML() {
	    if (this.data.getData) {
	      if (!this.types.length) {
	        return this.data.getData('Text');
	      } else if (this.types.indexOf('text/html') != -1) {
	        return this.data.getData('text/html');
	      }
	    }
	  };

	  /**
	   * Is this a link data transfer?
	   *
	   * @return {boolean}
	   */

	  DataTransfer.prototype.isLink = function isLink() {
	    return this.types.some(function (type) {
	      return type.indexOf('Url') != -1 || type.indexOf('text/uri-list') != -1;
	    });
	  };

	  /**
	   * Get a link url.
	   *
	   * @return {?string}
	   */

	  DataTransfer.prototype.getLink = function getLink() {
	    if (this.data.getData) {
	      return this.types.indexOf('text/uri-list') != -1 ? this.data.getData('text/uri-list') : this.data.getData('url');
	    }

	    return null;
	  };

	  /**
	   * Is this an image data transfer?
	   *
	   * @return {boolean}
	   */

	  DataTransfer.prototype.isImage = function isImage() {
	    var isImage = this.types.some(function (type) {
	      // Firefox will have a type of application/x-moz-file for images during
	      // dragging
	      return type.indexOf('application/x-moz-file') != -1;
	    });

	    if (isImage) {
	      return true;
	    }

	    var items = this.getFiles();
	    for (var i = 0; i < items.length; i++) {
	      var type = items[i].type;
	      if (!PhotosMimeType(type).isImage()) {
	        return false;
	      }
	    }

	    return true;
	  };

	  DataTransfer.prototype.getCount = function getCount() {
	    if (this.data.hasOwnProperty('items')) {
	      return this.data.items.length;
	    } else if (this.data.hasOwnProperty('mozItemCount')) {
	      return this.data.mozItemCount;
	    } else if (this.data.files) {
	      return this.data.files.length;
	    }
	    return null;
	  };

	  /**
	   * Get files.
	   *
	   * @return {array}
	   */

	  DataTransfer.prototype.getFiles = function getFiles() {
	    if (this.data.items) {
	      // createArrayFromMixed doesn't properly handle DataTransferItemLists.
	      return Array.prototype.slice.call(this.data.items).map(getFileFromDataTransfer).filter(emptyFunction.thatReturnsArgument);
	    } else if (this.data.files) {
	      return Array.prototype.slice.call(this.data.files);
	    } else {
	      return [];
	    }
	  };

	  /**
	   * Are there any files to fetch?
	   *
	   * @return {boolean}
	   */

	  DataTransfer.prototype.hasFiles = function hasFiles() {
	    return this.getFiles().length > 0;
	  };

	  return DataTransfer;
	}();

	module.exports = DataTransfer;

/***/ },
/* 112 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	"use strict";

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 113 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	/* eslint-disable fb-www/typeof-undefined */

	/**
	 * Same as document.activeElement but wraps in a try-catch block. In IE it is
	 * not safe to call document.activeElement if there is nothing focused.
	 *
	 * The activeElement will be null only if the document or document body is not
	 * yet defined.
	 */
	'use strict';

	function getActiveElement() /*?DOMElement*/{
	  if (typeof document === 'undefined') {
	    return null;
	  }
	  try {
	    return document.activeElement || document.body;
	  } catch (e) {
	    return document.body;
	  }
	}

	module.exports = getActiveElement;

/***/ },
/* 114 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var isWebkit = typeof navigator !== 'undefined' && navigator.userAgent.indexOf('AppleWebKit') > -1;

	/**
	 * Gets the element with the document scroll properties such as `scrollLeft` and
	 * `scrollHeight`. This may differ across different browsers.
	 *
	 * NOTE: The return value can be null if the DOM is not yet ready.
	 *
	 * @param {?DOMDocument} doc Defaults to current document.
	 * @return {?DOMElement}
	 */
	function getDocumentScrollElement(doc) {
	  doc = doc || document;
	  return !isWebkit && doc.compatMode === 'CSS1Compat' ? doc.documentElement : doc.body;
	}

	module.exports = getDocumentScrollElement;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var getElementRect = __webpack_require__(116);

	/**
	 * Gets an element's position in pixels relative to the viewport. The returned
	 * object represents the position of the element's top left corner.
	 *
	 * @param {DOMElement} element
	 * @return {object}
	 */
	function getElementPosition(element) {
	  var rect = getElementRect(element);
	  return {
	    x: rect.left,
	    y: rect.top,
	    width: rect.right - rect.left,
	    height: rect.bottom - rect.top
	  };
	}

	module.exports = getElementPosition;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var containsNode = __webpack_require__(108);

	/**
	 * Gets an element's bounding rect in pixels relative to the viewport.
	 *
	 * @param {DOMElement} elem
	 * @return {object}
	 */
	function getElementRect(elem) {
	  var docElem = document.documentElement;

	  // FF 2, Safari 3 and Opera 9.5- do not support getBoundingClientRect().
	  // IE9- will throw if the element is not in the document.
	  if (!('getBoundingClientRect' in elem) || !containsNode(docElem, elem)) {
	    return {
	      left: 0,
	      right: 0,
	      top: 0,
	      bottom: 0
	    };
	  }

	  // Subtracts clientTop/Left because IE8- added a 2px border to the
	  // <html> element (see http://fburl.com/1493213). IE 7 in
	  // Quicksmode does not report clientLeft/clientTop so there
	  // will be an unaccounted offset of 2px when in quirksmode
	  var rect = elem.getBoundingClientRect();

	  return {
	    left: Math.round(rect.left) - docElem.clientLeft,
	    right: Math.round(rect.right) - docElem.clientLeft,
	    top: Math.round(rect.top) - docElem.clientTop,
	    bottom: Math.round(rect.bottom) - docElem.clientTop
	  };
	}

	module.exports = getElementRect;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var getDocumentScrollElement = __webpack_require__(114);
	var getUnboundedScrollPosition = __webpack_require__(119);

	/**
	 * Gets the scroll position of the supplied element or window.
	 *
	 * The return values are bounded. This means that if the scroll position is
	 * negative or exceeds the element boundaries (which is possible using inertial
	 * scrolling), you will get zero or the maximum scroll position, respectively.
	 *
	 * If you need the unbound scroll position, use `getUnboundedScrollPosition`.
	 *
	 * @param {DOMWindow|DOMElement} scrollable
	 * @return {object} Map with `x` and `y` keys.
	 */
	function getScrollPosition(scrollable) {
	  var documentScrollElement = getDocumentScrollElement();
	  if (scrollable === window) {
	    scrollable = documentScrollElement;
	  }
	  var scrollPosition = getUnboundedScrollPosition(scrollable);

	  var viewport = scrollable === documentScrollElement ? document.documentElement : scrollable;

	  var xMax = scrollable.scrollWidth - viewport.clientWidth;
	  var yMax = scrollable.scrollHeight - viewport.clientHeight;

	  scrollPosition.x = Math.max(0, Math.min(scrollPosition.x, xMax));
	  scrollPosition.y = Math.max(0, Math.min(scrollPosition.y, yMax));

	  return scrollPosition;
	}

	module.exports = getScrollPosition;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var camelize = __webpack_require__(107);
	var hyphenate = __webpack_require__(121);

	function asString(value) /*?string*/{
	  return value == null ? value : String(value);
	}

	function getStyleProperty( /*DOMNode*/node, /*string*/name) /*?string*/{
	  var computedStyle = undefined;

	  // W3C Standard
	  if (window.getComputedStyle) {
	    // In certain cases such as within an iframe in FF3, this returns null.
	    computedStyle = window.getComputedStyle(node, null);
	    if (computedStyle) {
	      return asString(computedStyle.getPropertyValue(hyphenate(name)));
	    }
	  }
	  // Safari
	  if (document.defaultView && document.defaultView.getComputedStyle) {
	    computedStyle = document.defaultView.getComputedStyle(node, null);
	    // A Safari bug causes this to return null for `display: none` elements.
	    if (computedStyle) {
	      return asString(computedStyle.getPropertyValue(hyphenate(name)));
	    }
	    if (name === 'display') {
	      return 'none';
	    }
	  }
	  // Internet Explorer
	  if (node.currentStyle) {
	    if (name === 'float') {
	      return asString(node.currentStyle.cssFloat || node.currentStyle.styleFloat);
	    }
	    return asString(node.currentStyle[camelize(name)]);
	  }
	  return asString(node.style && node.style[camelize(name)]);
	}

	module.exports = getStyleProperty;

/***/ },
/* 119 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	/**
	 * Gets the scroll position of the supplied element or window.
	 *
	 * The return values are unbounded, unlike `getScrollPosition`. This means they
	 * may be negative or exceed the element boundaries (which is possible using
	 * inertial scrolling).
	 *
	 * @param {DOMWindow|DOMElement} scrollable
	 * @return {object} Map with `x` and `y` keys.
	 */

	function getUnboundedScrollPosition(scrollable) {
	  if (scrollable === window) {
	    return {
	      x: window.pageXOffset || document.documentElement.scrollLeft,
	      y: window.pageYOffset || document.documentElement.scrollTop
	    };
	  }
	  return {
	    x: scrollable.scrollLeft,
	    y: scrollable.scrollTop
	  };
	}

	module.exports = getUnboundedScrollPosition;

/***/ },
/* 120 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @typechecks
	 */

	"use strict";

	function getViewportWidth() {
	  var width = undefined;
	  if (document.documentElement) {
	    width = document.documentElement.clientWidth;
	  }

	  if (!width && document.body) {
	    width = document.body.clientWidth;
	  }

	  return width || 0;
	}

	function getViewportHeight() {
	  var height = undefined;
	  if (document.documentElement) {
	    height = document.documentElement.clientHeight;
	  }

	  if (!height && document.body) {
	    height = document.body.clientHeight;
	  }

	  return height || 0;
	}

	/**
	 * Gets the viewport dimensions including any scrollbars.
	 */
	function getViewportDimensions() {
	  return {
	    width: window.innerWidth || getViewportWidth(),
	    height: window.innerHeight || getViewportHeight()
	  };
	}

	/**
	 * Gets the viewport dimensions excluding any scrollbars.
	 */
	getViewportDimensions.withoutScrollbars = function () {
	  return {
	    width: getViewportWidth(),
	    height: getViewportHeight()
	  };
	};

	module.exports = getViewportDimensions;

/***/ },
/* 121 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var _uppercasePattern = /([A-Z])/g;

	/**
	 * Hyphenates a camelcased string, for example:
	 *
	 *   > hyphenate('backgroundColor')
	 *   < "background-color"
	 *
	 * For CSS style names, use `hyphenateStyleName` instead which works properly
	 * with all vendor prefixes, including `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenate(string) {
	  return string.replace(_uppercasePattern, '-$1').toLowerCase();
	}

	module.exports = hyphenate;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 123 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM node.
	 */
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function isNode(object) {
	  return !!(object && (typeof Node === 'function' ? object instanceof Node : (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
	}

	module.exports = isNode;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var isNode = __webpack_require__(123);

	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM text node.
	 */
	function isTextNode(object) {
	  return isNode(object) && object.nodeType == 3;
	}

	module.exports = isTextNode;

/***/ },
/* 125 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Combines multiple className strings into one.
	 * http://jsperf.com/joinclasses-args-vs-array
	 *
	 * @param {...?string} className
	 * @return {string}
	 */

	function joinClasses(className /*, ... */) {
	  if (!className) {
	    className = '';
	  }
	  var nextClass = undefined;
	  var argLength = arguments.length;
	  if (argLength > 1) {
	    for (var ii = 1; ii < argLength; ii++) {
	      nextClass = arguments[ii];
	      if (nextClass) {
	        className = (className ? className + ' ' : '') + nextClass;
	      }
	    }
	  }
	  return className;
	}

	module.exports = joinClasses;

/***/ },
/* 126 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	"use strict";

	module.exports = {
	  BACKSPACE: 8,
	  TAB: 9,
	  RETURN: 13,
	  ALT: 18,
	  ESC: 27,
	  SPACE: 32,
	  PAGE_UP: 33,
	  PAGE_DOWN: 34,
	  END: 35,
	  HOME: 36,
	  LEFT: 37,
	  UP: 38,
	  RIGHT: 39,
	  DOWN: 40,
	  DELETE: 46,
	  COMMA: 188,
	  PERIOD: 190,
	  A: 65,
	  Z: 90,
	  ZERO: 48,
	  NUMPAD_0: 96,
	  NUMPAD_9: 105
	};

/***/ },
/* 127 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Executes the provided `callback` once for each enumerable own property in the
	 * object and constructs a new object from the results. The `callback` is
	 * invoked with three arguments:
	 *
	 *  - the property value
	 *  - the property name
	 *  - the object being traversed
	 *
	 * Properties that are added after the call to `mapObject` will not be visited
	 * by `callback`. If the values of existing properties are changed, the value
	 * passed to `callback` will be the value at the time `mapObject` visits them.
	 * Properties that are deleted before being visited are not visited.
	 *
	 * @grep function objectMap()
	 * @grep function objMap()
	 *
	 * @param {?object} object
	 * @param {function} callback
	 * @param {*} context
	 * @return {?object}
	 */
	function mapObject(object, callback, context) {
	  if (!object) {
	    return null;
	  }
	  var result = {};
	  for (var name in object) {
	    if (hasOwnProperty.call(object, name)) {
	      result[name] = callback.call(context, object[name], name, object);
	    }
	  }
	  return result;
	}

	module.exports = mapObject;

/***/ },
/* 128 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Memoizes the return value of a function that accepts one string argument.
	 *
	 * @param {function} callback
	 * @return {function}
	 */

	function memoizeStringOnly(callback) {
	  var cache = {};
	  return function (string) {
	    if (!cache.hasOwnProperty(string)) {
	      cache[string] = callback.call(this, string);
	    }
	    return cache[string];
	  };
	}

	module.exports = memoizeStringOnly;

/***/ },
/* 129 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	"use strict";

	var nullthrows = function nullthrows(x) {
	  if (x != null) {
	    return x;
	  }
	  throw new Error("Got unexpected null or undefined");
	};

	module.exports = nullthrows;

/***/ },
/* 130 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	'use strict';

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var PhotosMimeType = function () {
	  function PhotosMimeType(mimeString) {
	    _classCallCheck(this, PhotosMimeType);

	    // Allow this to be used as a function
	    if (this instanceof PhotosMimeType === false) {
	      return new PhotosMimeType(mimeString);
	    }
	    this._parts = mimeString.split('/');
	  }

	  PhotosMimeType.prototype.isImage = function isImage() {
	    return this._parts[0] === 'image';
	  };

	  PhotosMimeType.prototype.isJpeg = function isJpeg() {
	    return this.isImage() && (
	    // see http://fburl.com/10972194
	    this._parts[1] === 'jpeg' || this._parts[1] === 'pjpeg');
	  };

	  return PhotosMimeType;
	}();

	module.exports = PhotosMimeType;

/***/ },
/* 131 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	/**
	 * @param {DOMElement} element
	 * @param {DOMDocument} doc
	 * @return {boolean}
	 */
	"use strict";

	function _isViewportScrollElement(element, doc) {
	  return !!doc && (element === doc.documentElement || element === doc.body);
	}

	/**
	 * Scroll Module. This class contains 4 simple static functions
	 * to be used to access Element.scrollTop/scrollLeft properties.
	 * To solve the inconsistencies between browsers when either
	 * document.body or document.documentElement is supplied,
	 * below logic will be used to alleviate the issue:
	 *
	 * 1. If 'element' is either 'document.body' or 'document.documentElement,
	 *    get whichever element's 'scroll{Top,Left}' is larger.
	 * 2. If 'element' is either 'document.body' or 'document.documentElement',
	 *    set the 'scroll{Top,Left}' on both elements.
	 */

	var Scroll = {
	  /**
	   * @param {DOMElement} element
	   * @return {number}
	   */
	  getTop: function getTop(element) {
	    var doc = element.ownerDocument;
	    return _isViewportScrollElement(element, doc) ?
	    // In practice, they will either both have the same value,
	    // or one will be zero and the other will be the scroll position
	    // of the viewport. So we can use `X || Y` instead of `Math.max(X, Y)`
	    doc.body.scrollTop || doc.documentElement.scrollTop : element.scrollTop;
	  },

	  /**
	   * @param {DOMElement} element
	   * @param {number} newTop
	   */
	  setTop: function setTop(element, newTop) {
	    var doc = element.ownerDocument;
	    if (_isViewportScrollElement(element, doc)) {
	      doc.body.scrollTop = doc.documentElement.scrollTop = newTop;
	    } else {
	      element.scrollTop = newTop;
	    }
	  },

	  /**
	   * @param {DOMElement} element
	   * @return {number}
	   */
	  getLeft: function getLeft(element) {
	    var doc = element.ownerDocument;
	    return _isViewportScrollElement(element, doc) ? doc.body.scrollLeft || doc.documentElement.scrollLeft : element.scrollLeft;
	  },

	  /**
	   * @param {DOMElement} element
	   * @param {number} newLeft
	   */
	  setLeft: function setLeft(element, newLeft) {
	    var doc = element.ownerDocument;
	    if (_isViewportScrollElement(element, doc)) {
	      doc.body.scrollLeft = doc.documentElement.scrollLeft = newLeft;
	    } else {
	      element.scrollLeft = newLeft;
	    }
	  }
	};

	module.exports = Scroll;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var getStyleProperty = __webpack_require__(118);

	/**
	 * @param {DOMNode} element [description]
	 * @param {string} name Overflow style property name.
	 * @return {boolean} True if the supplied ndoe is scrollable.
	 */
	function _isNodeScrollable(element, name) {
	  var overflow = Style.get(element, name);
	  return overflow === 'auto' || overflow === 'scroll';
	}

	/**
	 * Utilities for querying and mutating style properties.
	 */
	var Style = {
	  /**
	   * Gets the style property for the supplied node. This will return either the
	   * computed style, if available, or the declared style.
	   *
	   * @param {DOMNode} node
	   * @param {string} name Style property name.
	   * @return {?string} Style property value.
	   */
	  get: getStyleProperty,

	  /**
	   * Determines the nearest ancestor of a node that is scrollable.
	   *
	   * NOTE: This can be expensive if used repeatedly or on a node nested deeply.
	   *
	   * @param {?DOMNode} node Node from which to start searching.
	   * @return {?DOMWindow|DOMElement} Scroll parent of the supplied node.
	   */
	  getScrollParent: function getScrollParent(node) {
	    if (!node) {
	      return null;
	    }
	    while (node && node !== document.body) {
	      if (_isNodeScrollable(node, 'overflow') || _isNodeScrollable(node, 'overflowY') || _isNodeScrollable(node, 'overflowX')) {
	        return node;
	      }
	      node = node.parentNode;
	    }
	    return window;
	  }

	};

	module.exports = Style;

/***/ },
/* 133 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 * @stub
	 * 
	 */

	'use strict';

	// \u00a1-\u00b1\u00b4-\u00b8\u00ba\u00bb\u00bf
	//             is latin supplement punctuation except fractions and superscript
	//             numbers
	// \u2010-\u2027\u2030-\u205e
	//             is punctuation from the general punctuation block:
	//             weird quotes, commas, bullets, dashes, etc.
	// \u30fb\u3001\u3002\u3008-\u3011\u3014-\u301f
	//             is CJK punctuation
	// \uff1a-\uff1f\uff01-\uff0f\uff3b-\uff40\uff5b-\uff65
	//             is some full-width/half-width punctuation
	// \u2E2E\u061f\u066a-\u066c\u061b\u060c\u060d\uFD3e\uFD3F
	//             is some Arabic punctuation marks
	// \u1801\u0964\u104a\u104b
	//             is misc. other language punctuation marks

	var PUNCTUATION = '[.,+*?$|#{}()\'\\^\\-\\[\\]\\\\\\/!@%"~=<>_:;' + '・、。〈-】〔-〟：-？！-／' + '［-｀｛-･⸮؟٪-٬؛،؍' + '﴾﴿᠁।၊။‐-‧‰-⁞' + '¡-±´-¸º»¿]';

	module.exports = {
	  getPunctuation: function getPunctuation() {
	    return PUNCTUATION;
	  }
	};

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 * 
	 */

	/**
	 * Basic (stateless) API for text direction detection
	 *
	 * Part of our implementation of Unicode Bidirectional Algorithm (UBA)
	 * Unicode Standard Annex #9 (UAX9)
	 * http://www.unicode.org/reports/tr9/
	 */

	/**
	 * RegExp ranges of characters with a *Strong* Bidi_Class value.
	 *
	 * Data is based on DerivedBidiClass.txt in UCD version 7.0.0.
	 *
	 * NOTE: For performance reasons, we only support Unicode's
	 *       Basic Multilingual Plane (BMP) for now.
	 */
	'use strict';

	var UnicodeBidiDirection = __webpack_require__(135);

	var invariant = __webpack_require__(122);

	var RANGE_BY_BIDI_TYPE = {

	  L: 'A-Za-zªµºÀ-ÖØ-öø-ƺƻ' + 'Ƽ-ƿǀ-ǃǄ-ʓʔʕ-ʯʰ-ʸ' + 'ʻ-ˁː-ˑˠ-ˤˮͰ-ͳͶ-ͷ' + 'ͺͻ-ͽͿΆΈ-ΊΌΎ-Ρ' + 'Σ-ϵϷ-ҁ҂Ҋ-ԯԱ-Ֆՙ' + '՚-՟ա-և։ःऄ-हऻऽ' + 'ा-ीॉ-ौॎ-ॏॐक़-ॡ।-॥' + '०-९॰ॱॲ-ঀং-ঃঅ-ঌ' + 'এ-ঐও-নপ-রলশ-হঽ' + 'া-ীে-ৈো-ৌৎৗড়-ঢ়' + 'য়-ৡ০-৯ৰ-ৱ৴-৹৺ਃ' + 'ਅ-ਊਏ-ਐਓ-ਨਪ-ਰਲ-ਲ਼' + 'ਵ-ਸ਼ਸ-ਹਾ-ੀਖ਼-ੜਫ਼੦-੯' + 'ੲ-ੴઃઅ-ઍએ-ઑઓ-નપ-ર' + 'લ-ળવ-હઽા-ીૉો-ૌૐ' + 'ૠ-ૡ૦-૯૰ଂ-ଃଅ-ଌଏ-ଐ' + 'ଓ-ନପ-ରଲ-ଳଵ-ହଽାୀ' + 'େ-ୈୋ-ୌୗଡ଼-ଢ଼ୟ-ୡ୦-୯' + '୰ୱ୲-୷ஃஅ-ஊஎ-ஐஒ-க' + 'ங-சஜஞ-டண-தந-பம-ஹ' + 'ா-ிு-ூெ-ைொ-ௌௐௗ' + '௦-௯௰-௲ఁ-ఃఅ-ఌఎ-ఐ' + 'ఒ-నప-హఽు-ౄౘ-ౙౠ-ౡ' + '౦-౯౿ಂ-ಃಅ-ಌಎ-ಐಒ-ನ' + 'ಪ-ಳವ-ಹಽಾಿೀ-ೄೆ' + 'ೇ-ೈೊ-ೋೕ-ೖೞೠ-ೡ೦-೯' + 'ೱ-ೲം-ഃഅ-ഌഎ-ഐഒ-ഺഽ' + 'ാ-ീെ-ൈൊ-ൌൎൗൠ-ൡ' + '൦-൯൰-൵൹ൺ-ൿං-ඃඅ-ඖ' + 'ක-නඳ-රලව-ෆා-ෑෘ-ෟ' + '෦-෯ෲ-ෳ෴ก-ะา-ำเ-ๅ' + 'ๆ๏๐-๙๚-๛ກ-ຂຄງ-ຈ' + 'ຊຍດ-ທນ-ຟມ-ຣລວ' + 'ສ-ຫອ-ະາ-ຳຽເ-ໄໆ' + '໐-໙ໜ-ໟༀ༁-༃༄-༒༓༔' + '༕-༗༚-༟༠-༩༪-༳༴༶༸' + '༾-༿ཀ-ཇཉ-ཬཿ྅ྈ-ྌ' + '྾-࿅࿇-࿌࿎-࿏࿐-࿔࿕-࿘' + '࿙-࿚က-ဪါ-ာေးျ-ြဿ' + '၀-၉၊-၏ၐ-ၕၖ-ၗၚ-ၝၡ' + 'ၢ-ၤၥ-ၦၧ-ၭၮ-ၰၵ-ႁ' + 'ႃ-ႄႇ-ႌႎႏ႐-႙ႚ-ႜ' + '႞-႟Ⴀ-ჅჇჍა-ჺ჻ჼ' + 'ჽ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈ' + 'ኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅ' + 'ወ-ዖዘ-ጐጒ-ጕጘ-ፚ፠-፨' + '፩-፼ᎀ-ᎏᎠ-Ᏼᐁ-ᙬ᙭-᙮' + 'ᙯ-ᙿᚁ-ᚚᚠ-ᛪ᛫-᛭ᛮ-ᛰ' + 'ᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱ᜵-᜶' + 'ᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳាើ-ៅ' + 'ះ-ៈ។-៖ៗ៘-៚ៜ០-៩' + '᠐-᠙ᠠ-ᡂᡃᡄ-ᡷᢀ-ᢨᢪ' + 'ᢰ-ᣵᤀ-ᤞᤣ-ᤦᤩ-ᤫᤰ-ᤱ' + 'ᤳ-ᤸ᥆-᥏ᥐ-ᥭᥰ-ᥴᦀ-ᦫ' + 'ᦰ-ᧀᧁ-ᧇᧈ-ᧉ᧐-᧙᧚ᨀ-ᨖ' + 'ᨙ-ᨚ᨞-᨟ᨠ-ᩔᩕᩗᩡᩣ-ᩤ' + 'ᩭ-ᩲ᪀-᪉᪐-᪙᪠-᪦ᪧ᪨-᪭' + 'ᬄᬅ-ᬳᬵᬻᬽ-ᭁᭃ-᭄ᭅ-ᭋ' + '᭐-᭙᭚-᭠᭡-᭪᭴-᭼ᮂᮃ-ᮠ' + 'ᮡᮦ-ᮧ᮪ᮮ-ᮯ᮰-᮹ᮺ-ᯥᯧ' + 'ᯪ-ᯬᯮ᯲-᯳᯼-᯿ᰀ-ᰣᰤ-ᰫ' + 'ᰴ-ᰵ᰻-᰿᱀-᱉ᱍ-ᱏ᱐-᱙' + 'ᱚ-ᱷᱸ-ᱽ᱾-᱿᳀-᳇᳓᳡' + 'ᳩ-ᳬᳮ-ᳱᳲ-ᳳᳵ-ᳶᴀ-ᴫ' + 'ᴬ-ᵪᵫ-ᵷᵸᵹ-ᶚᶛ-ᶿḀ-ἕ' + 'Ἐ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝ' + 'Ὗ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌ' + 'ῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‎' + 'ⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝ' + 'ℤΩℨK-ℭℯ-ℴℵ-ℸℹ' + 'ℼ-ℿⅅ-ⅉⅎ⅏Ⅰ-ↂↃ-ↄ' + 'ↅ-ↈ⌶-⍺⎕⒜-ⓩ⚬⠀-⣿' + 'Ⰰ-Ⱞⰰ-ⱞⱠ-ⱻⱼ-ⱽⱾ-ⳤ' + 'Ⳬ-ⳮⳲ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ' + '⵰ⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾ' + 'ⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々〆〇' + '〡-〩〮-〯〱-〵〸-〺〻〼' + 'ぁ-ゖゝ-ゞゟァ-ヺー-ヾヿ' + 'ㄅ-ㄭㄱ-ㆎ㆐-㆑㆒-㆕㆖-㆟' + 'ㆠ-ㆺㇰ-ㇿ㈀-㈜㈠-㈩㈪-㉇' + '㉈-㉏㉠-㉻㉿㊀-㊉㊊-㊰㋀-㋋' + '㋐-㋾㌀-㍶㍻-㏝㏠-㏾㐀-䶵' + '一-鿌ꀀ-ꀔꀕꀖ-ꒌꓐ-ꓷꓸ-ꓽ' + '꓾-꓿ꔀ-ꘋꘌꘐ-ꘟ꘠-꘩ꘪ-ꘫ' + 'Ꙁ-ꙭꙮꚀ-ꚛꚜ-ꚝꚠ-ꛥꛦ-ꛯ' + '꛲-꛷Ꜣ-ꝯꝰꝱ-ꞇ꞉-꞊Ꞌ-ꞎ' + 'Ꞑ-ꞭꞰ-Ʇꟷꟸ-ꟹꟺꟻ-ꠁ' + 'ꠃ-ꠅꠇ-ꠊꠌ-ꠢꠣ-ꠤꠧ꠰-꠵' + '꠶-꠷ꡀ-ꡳꢀ-ꢁꢂ-ꢳꢴ-ꣃ' + '꣎-꣏꣐-꣙ꣲ-ꣷ꣸-꣺ꣻ꤀-꤉' + 'ꤊ-ꤥ꤮-꤯ꤰ-ꥆꥒ-꥓꥟ꥠ-ꥼ' + 'ꦃꦄ-ꦲꦴ-ꦵꦺ-ꦻꦽ-꧀꧁-꧍' + 'ꧏ꧐-꧙꧞-꧟ꧠ-ꧤꧦꧧ-ꧯ' + '꧰-꧹ꧺ-ꧾꨀ-ꨨꨯ-ꨰꨳ-ꨴ' + 'ꩀ-ꩂꩄ-ꩋꩍ꩐-꩙꩜-꩟ꩠ-ꩯ' + 'ꩰꩱ-ꩶ꩷-꩹ꩺꩻꩽꩾ-ꪯꪱ' + 'ꪵ-ꪶꪹ-ꪽꫀꫂꫛ-ꫜꫝ꫞-꫟' + 'ꫠ-ꫪꫫꫮ-ꫯ꫰-꫱ꫲꫳ-ꫴꫵ' + 'ꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮ' + 'ꬰ-ꭚ꭛ꭜ-ꭟꭤ-ꭥꯀ-ꯢꯣ-ꯤ' + 'ꯦ-ꯧꯩ-ꯪ꯫꯬꯰-꯹가-힣' + 'ힰ-ퟆퟋ-ퟻ-豈-舘並-龎' + 'ﬀ-ﬆﬓ-ﬗＡ-Ｚａ-ｚｦ-ｯｰ' + 'ｱ-ﾝﾞ-ﾟﾠ-ﾾￂ-ￇￊ-ￏ' + 'ￒ-ￗￚ-ￜ',

	  R: '֐־׀׃׆׈-׏א-ת׫-ׯ' + 'װ-ײ׳-״׵-׿߀-߉ߊ-ߪ' + 'ߴ-ߵߺ߻-߿ࠀ-ࠕࠚࠤࠨ' + '࠮-࠯࠰-࠾࠿ࡀ-ࡘ࡜-࡝࡞' + '࡟-࢟‏יִײַ-ﬨשׁ-זּ﬷טּ-לּ' + '﬽מּ﬿נּ-סּ﭂ףּ-פּ﭅צּ-ﭏ',

	  AL: '؈؋؍؛؜؝؞-؟ؠ-ؿـ' + 'ف-ي٭ٮ-ٯٱ-ۓ۔ەۥ-ۦ' + 'ۮ-ۯۺ-ۼ۽-۾ۿ܀-܍܎܏' + 'ܐܒ-ܯ݋-݌ݍ-ޥޱ޲-޿' + 'ࢠ-ࢲࢳ-ࣣﭐ-ﮱ﮲-﯁﯂-﯒' + 'ﯓ-ﴽ﵀-﵏ﵐ-ﶏ﶐-﶑ﶒ-ﷇ' + '﷈-﷏ﷰ-ﷻ﷼﷾-﷿ﹰ-ﹴ﹵' + 'ﹶ-ﻼ﻽-﻾'

	};

	var REGEX_STRONG = new RegExp('[' + RANGE_BY_BIDI_TYPE.L + RANGE_BY_BIDI_TYPE.R + RANGE_BY_BIDI_TYPE.AL + ']');

	var REGEX_RTL = new RegExp('[' + RANGE_BY_BIDI_TYPE.R + RANGE_BY_BIDI_TYPE.AL + ']');

	/**
	 * Returns the first strong character (has Bidi_Class value of L, R, or AL).
	 *
	 * @param str  A text block; e.g. paragraph, table cell, tag
	 * @return     A character with strong bidi direction, or null if not found
	 */
	function firstStrongChar(str) {
	  var match = REGEX_STRONG.exec(str);
	  return match == null ? null : match[0];
	}

	/**
	 * Returns the direction of a block of text, based on the direction of its
	 * first strong character (has Bidi_Class value of L, R, or AL).
	 *
	 * @param str  A text block; e.g. paragraph, table cell, tag
	 * @return     The resolved direction
	 */
	function firstStrongCharDir(str) {
	  var strongChar = firstStrongChar(str);
	  if (strongChar == null) {
	    return UnicodeBidiDirection.NEUTRAL;
	  }
	  return REGEX_RTL.exec(strongChar) ? UnicodeBidiDirection.RTL : UnicodeBidiDirection.LTR;
	}

	/**
	 * Returns the direction of a block of text, based on the direction of its
	 * first strong character (has Bidi_Class value of L, R, or AL), or a fallback
	 * direction, if no strong character is found.
	 *
	 * This function is supposed to be used in respect to Higher-Level Protocol
	 * rule HL1. (http://www.unicode.org/reports/tr9/#HL1)
	 *
	 * @param str       A text block; e.g. paragraph, table cell, tag
	 * @param fallback  Fallback direction, used if no strong direction detected
	 *                  for the block (default = NEUTRAL)
	 * @return          The resolved direction
	 */
	function resolveBlockDir(str, fallback) {
	  fallback = fallback || UnicodeBidiDirection.NEUTRAL;
	  if (!str.length) {
	    return fallback;
	  }
	  var blockDir = firstStrongCharDir(str);
	  return blockDir === UnicodeBidiDirection.NEUTRAL ? fallback : blockDir;
	}

	/**
	 * Returns the direction of a block of text, based on the direction of its
	 * first strong character (has Bidi_Class value of L, R, or AL), or a fallback
	 * direction, if no strong character is found.
	 *
	 * NOTE: This function is similar to resolveBlockDir(), but uses the global
	 * direction as the fallback, so it *always* returns a Strong direction,
	 * making it useful for integration in places that you need to make the final
	 * decision, like setting some CSS class.
	 *
	 * This function is supposed to be used in respect to Higher-Level Protocol
	 * rule HL1. (http://www.unicode.org/reports/tr9/#HL1)
	 *
	 * @param str             A text block; e.g. paragraph, table cell
	 * @param strongFallback  Fallback direction, used if no strong direction
	 *                        detected for the block (default = global direction)
	 * @return                The resolved Strong direction
	 */
	function getDirection(str, strongFallback) {
	  if (!strongFallback) {
	    strongFallback = UnicodeBidiDirection.getGlobalDir();
	  }
	  !UnicodeBidiDirection.isStrong(strongFallback) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Fallback direction must be a strong direction') : invariant(false) : undefined;
	  return resolveBlockDir(str, strongFallback);
	}

	/**
	 * Returns true if getDirection(arguments...) returns LTR.
	 *
	 * @param str             A text block; e.g. paragraph, table cell
	 * @param strongFallback  Fallback direction, used if no strong direction
	 *                        detected for the block (default = global direction)
	 * @return                True if the resolved direction is LTR
	 */
	function isDirectionLTR(str, strongFallback) {
	  return getDirection(str, strongFallback) === UnicodeBidiDirection.LTR;
	}

	/**
	 * Returns true if getDirection(arguments...) returns RTL.
	 *
	 * @param str             A text block; e.g. paragraph, table cell
	 * @param strongFallback  Fallback direction, used if no strong direction
	 *                        detected for the block (default = global direction)
	 * @return                True if the resolved direction is RTL
	 */
	function isDirectionRTL(str, strongFallback) {
	  return getDirection(str, strongFallback) === UnicodeBidiDirection.RTL;
	}

	var UnicodeBidi = {
	  firstStrongChar: firstStrongChar,
	  firstStrongCharDir: firstStrongCharDir,
	  resolveBlockDir: resolveBlockDir,
	  getDirection: getDirection,
	  isDirectionLTR: isDirectionLTR,
	  isDirectionRTL: isDirectionRTL
	};

	module.exports = UnicodeBidi;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 * 
	 */

	/**
	 * Constants to represent text directionality
	 *
	 * Also defines a *global* direciton, to be used in bidi algorithms as a
	 * default fallback direciton, when no better direction is found or provided.
	 *
	 * NOTE: Use `setGlobalDir()`, or update `initGlobalDir()`, to set the initial
	 *       global direction value based on the application.
	 *
	 * Part of the implementation of Unicode Bidirectional Algorithm (UBA)
	 * Unicode Standard Annex #9 (UAX9)
	 * http://www.unicode.org/reports/tr9/
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var invariant = __webpack_require__(122);

	var NEUTRAL = 'NEUTRAL'; // No strong direction
	var LTR = 'LTR'; // Left-to-Right direction
	var RTL = 'RTL'; // Right-to-Left direction

	var globalDir = null;

	// == Helpers ==

	/**
	 * Check if a directionality value is a Strong one
	 */
	function isStrong(dir) {
	  return dir === LTR || dir === RTL;
	}

	/**
	 * Get string value to be used for `dir` HTML attribute or `direction` CSS
	 * property.
	 */
	function getHTMLDir(dir) {
	  !isStrong(dir) ? process.env.NODE_ENV !== 'production' ? invariant(false, '`dir` must be a strong direction to be converted to HTML Direction') : invariant(false) : undefined;
	  return dir === LTR ? 'ltr' : 'rtl';
	}

	/**
	 * Get string value to be used for `dir` HTML attribute or `direction` CSS
	 * property, but returns null if `dir` has same value as `otherDir`.
	 * `null`.
	 */
	function getHTMLDirIfDifferent(dir, otherDir) {
	  !isStrong(dir) ? process.env.NODE_ENV !== 'production' ? invariant(false, '`dir` must be a strong direction to be converted to HTML Direction') : invariant(false) : undefined;
	  !isStrong(otherDir) ? process.env.NODE_ENV !== 'production' ? invariant(false, '`otherDir` must be a strong direction to be converted to HTML Direction') : invariant(false) : undefined;
	  return dir === otherDir ? null : getHTMLDir(dir);
	}

	// == Global Direction ==

	/**
	 * Set the global direction.
	 */
	function setGlobalDir(dir) {
	  globalDir = dir;
	}

	/**
	 * Initialize the global direction
	 */
	function initGlobalDir() {
	  setGlobalDir(LTR);
	}

	/**
	 * Get the global direction
	 */
	function getGlobalDir() {
	  if (!globalDir) {
	    this.initGlobalDir();
	  }
	  !globalDir ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Global direction not set.') : invariant(false) : undefined;
	  return globalDir;
	}

	var UnicodeBidiDirection = {
	  // Values
	  NEUTRAL: NEUTRAL,
	  LTR: LTR,
	  RTL: RTL,
	  // Helpers
	  isStrong: isStrong,
	  getHTMLDir: getHTMLDir,
	  getHTMLDirIfDifferent: getHTMLDirIfDifferent,
	  // Global Direction
	  setGlobalDir: setGlobalDir,
	  initGlobalDir: initGlobalDir,
	  getGlobalDir: getGlobalDir
	};

	module.exports = UnicodeBidiDirection;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 * 
	 */

	/**
	 * Stateful API for text direction detection
	 *
	 * This class can be used in applications where you need to detect the
	 * direction of a sequence of text blocks, where each direction shall be used
	 * as the fallback direction for the next one.
	 *
	 * NOTE: A default direction, if not provided, is set based on the global
	 *       direction, as defined by `UnicodeBidiDirection`.
	 *
	 * == Example ==
	 * ```
	 * var UnicodeBidiService = require('UnicodeBidiService');
	 *
	 * var bidiService = new UnicodeBidiService();
	 *
	 * ...
	 *
	 * bidiService.reset();
	 * for (var para in paragraphs) {
	 *   var dir = bidiService.getDirection(para);
	 *   ...
	 * }
	 * ```
	 *
	 * Part of our implementation of Unicode Bidirectional Algorithm (UBA)
	 * Unicode Standard Annex #9 (UAX9)
	 * http://www.unicode.org/reports/tr9/
	 */

	'use strict';

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var UnicodeBidi = __webpack_require__(134);
	var UnicodeBidiDirection = __webpack_require__(135);

	var invariant = __webpack_require__(122);

	var UnicodeBidiService = function () {

	  /**
	   * Stateful class for paragraph direction detection
	   *
	   * @param defaultDir  Default direction of the service
	   */

	  function UnicodeBidiService(defaultDir) {
	    _classCallCheck(this, UnicodeBidiService);

	    if (!defaultDir) {
	      defaultDir = UnicodeBidiDirection.getGlobalDir();
	    } else {
	      !UnicodeBidiDirection.isStrong(defaultDir) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Default direction must be a strong direction (LTR or RTL)') : invariant(false) : undefined;
	    }
	    this._defaultDir = defaultDir;
	    this.reset();
	  }

	  /**
	   * Reset the interal state
	   *
	   * Instead of creating a new instance, You can just reset() your instance
	   * everytime you start a new loop.
	   */

	  UnicodeBidiService.prototype.reset = function reset() {
	    this._lastDir = this._defaultDir;
	  };

	  /**
	   * Returnes the direction of a block of text, and remembers it as the
	   * fall-back direction for the next paragraph.
	   *
	   * @param str  A text block, e.g. paragraph, table cell, tag
	   * @return     The resolved direction
	   */

	  UnicodeBidiService.prototype.getDirection = function getDirection(str) {
	    this._lastDir = UnicodeBidi.getDirection(str, this._lastDir);
	    return this._lastDir;
	  };

	  return UnicodeBidiService;
	}();

	module.exports = UnicodeBidiService;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	/**
	 * Unicode-enabled replacesments for basic String functions.
	 *
	 * All the functions in this module assume that the input string is a valid
	 * UTF-16 encoding of a Unicode sequence. If it's not the case, the behavior
	 * will be undefined.
	 *
	 * WARNING: Since this module is typechecks-enforced, you may find new bugs
	 * when replacing normal String functions with ones provided here.
	 */

	'use strict';

	var invariant = __webpack_require__(122);

	// These two ranges are consecutive so anything in [HIGH_START, LOW_END] is a
	// surrogate code unit.
	var SURROGATE_HIGH_START = 0xD800;
	var SURROGATE_HIGH_END = 0xDBFF;
	var SURROGATE_LOW_START = 0xDC00;
	var SURROGATE_LOW_END = 0xDFFF;
	var SURROGATE_UNITS_REGEX = /[\uD800-\uDFFF]/;

	/**
	 * @param {number} codeUnit   A Unicode code-unit, in range [0, 0x10FFFF]
	 * @return {boolean}          Whether code-unit is in a surrogate (hi/low) range
	 */
	function isCodeUnitInSurrogateRange(codeUnit) {
	  return SURROGATE_HIGH_START <= codeUnit && codeUnit <= SURROGATE_LOW_END;
	}

	/**
	 * Returns whether the two characters starting at `index` form a surrogate pair.
	 * For example, given the string s = "\uD83D\uDE0A", (s, 0) returns true and
	 * (s, 1) returns false.
	 *
	 * @param {string} str
	 * @param {number} index
	 * @return {boolean}
	 */
	function isSurrogatePair(str, index) {
	  !(0 <= index && index < str.length) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'isSurrogatePair: Invalid index %s for string length %s.', index, str.length) : invariant(false) : undefined;
	  if (index + 1 === str.length) {
	    return false;
	  }
	  var first = str.charCodeAt(index);
	  var second = str.charCodeAt(index + 1);
	  return SURROGATE_HIGH_START <= first && first <= SURROGATE_HIGH_END && SURROGATE_LOW_START <= second && second <= SURROGATE_LOW_END;
	}

	/**
	 * @param {string} str  Non-empty string
	 * @return {boolean}    True if the input includes any surrogate code units
	 */
	function hasSurrogateUnit(str) {
	  return SURROGATE_UNITS_REGEX.test(str);
	}

	/**
	 * Return the length of the original Unicode character at given position in the
	 * String by looking into the UTF-16 code unit; that is equal to 1 for any
	 * non-surrogate characters in BMP ([U+0000..U+D7FF] and [U+E000, U+FFFF]); and
	 * returns 2 for the hi/low surrogates ([U+D800..U+DFFF]), which are in fact
	 * representing non-BMP characters ([U+10000..U+10FFFF]).
	 *
	 * Examples:
	 * - '\u0020' => 1
	 * - '\u3020' => 1
	 * - '\uD835' => 2
	 * - '\uD835\uDDEF' => 2
	 * - '\uDDEF' => 2
	 *
	 * @param {string} str  Non-empty string
	 * @param {number} pos  Position in the string to look for one code unit
	 * @return {number}      Number 1 or 2
	 */
	function getUTF16Length(str, pos) {
	  return 1 + isCodeUnitInSurrogateRange(str.charCodeAt(pos));
	}

	/**
	 * Fully Unicode-enabled replacement for String#length
	 *
	 * @param {string} str  Valid Unicode string
	 * @return {number}     The number of Unicode characters in the string
	 */
	function strlen(str) {
	  // Call the native functions if there's no surrogate char
	  if (!hasSurrogateUnit(str)) {
	    return str.length;
	  }

	  var len = 0;
	  for (var pos = 0; pos < str.length; pos += getUTF16Length(str, pos)) {
	    len++;
	  }
	  return len;
	}

	/**
	 * Fully Unicode-enabled replacement for String#substr()
	 *
	 * @param {string} str      Valid Unicode string
	 * @param {number} start    Location in Unicode sequence to begin extracting
	 * @param {?number} length  The number of Unicode characters to extract
	 *                          (default: to the end of the string)
	 * @return {string}         Extracted sub-string
	 */
	function substr(str, start, length) {
	  start = start || 0;
	  length = length === undefined ? Infinity : length || 0;

	  // Call the native functions if there's no surrogate char
	  if (!hasSurrogateUnit(str)) {
	    return str.substr(start, length);
	  }

	  // Obvious cases
	  var size = str.length;
	  if (size <= 0 || start > size || length <= 0) {
	    return '';
	  }

	  // Find the actual starting position
	  var posA = 0;
	  if (start > 0) {
	    for (; start > 0 && posA < size; start--) {
	      posA += getUTF16Length(str, posA);
	    }
	    if (posA >= size) {
	      return '';
	    }
	  } else if (start < 0) {
	    for (posA = size; start < 0 && 0 < posA; start++) {
	      posA -= getUTF16Length(str, posA - 1);
	    }
	    if (posA < 0) {
	      posA = 0;
	    }
	  }

	  // Find the actual ending position
	  var posB = size;
	  if (length < size) {
	    for (posB = posA; length > 0 && posB < size; length--) {
	      posB += getUTF16Length(str, posB);
	    }
	  }

	  return str.substring(posA, posB);
	}

	/**
	 * Fully Unicode-enabled replacement for String#substring()
	 *
	 * @param {string} str    Valid Unicode string
	 * @param {number} start  Location in Unicode sequence to begin extracting
	 * @param {?number} end   Location in Unicode sequence to end extracting
	 *                        (default: end of the string)
	 * @return {string}       Extracted sub-string
	 */
	function substring(str, start, end) {
	  start = start || 0;
	  end = end === undefined ? Infinity : end || 0;

	  if (start < 0) {
	    start = 0;
	  }
	  if (end < 0) {
	    end = 0;
	  }

	  var length = Math.abs(end - start);
	  start = start < end ? start : end;
	  return substr(str, start, length);
	}

	/**
	 * Get a list of Unicode code-points from a String
	 *
	 * @param {string} str        Valid Unicode string
	 * @return {array<number>}    A list of code-points in [0..0x10FFFF]
	 */
	function getCodePoints(str) {
	  var codePoints = [];
	  for (var pos = 0; pos < str.length; pos += getUTF16Length(str, pos)) {
	    codePoints.push(str.codePointAt(pos));
	  }
	  return codePoints;
	}

	var UnicodeUtils = {
	  getCodePoints: getCodePoints,
	  getUTF16Length: getUTF16Length,
	  hasSurrogateUnit: hasSurrogateUnit,
	  isCodeUnitInSurrogateRange: isCodeUnitInSurrogateRange,
	  isSurrogatePair: isSurrogatePair,
	  strlen: strlen,
	  substring: substring,
	  substr: substr
	};

	module.exports = UnicodeUtils;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 138 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var URI = function () {
	  function URI(uri) {
	    _classCallCheck(this, URI);

	    this._uri = uri;
	  }

	  URI.prototype.toString = function toString() {
	    return this._uri;
	  };

	  return URI;
	}();

	module.exports = URI;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var UserAgentData = __webpack_require__(140);
	var VersionRange = __webpack_require__(141);

	var mapObject = __webpack_require__(127);
	var memoizeStringOnly = __webpack_require__(128);

	/**
	 * Checks to see whether `name` and `version` satisfy `query`.
	 *
	 * @param {string} name Name of the browser, device, engine or platform
	 * @param {?string} version Version of the browser, engine or platform
	 * @param {string} query Query of form "Name [range expression]"
	 * @param {?function} normalizer Optional pre-processor for range expression
	 * @return {boolean}
	 */
	function compare(name, version, query, normalizer) {
	  // check for exact match with no version
	  if (name === query) {
	    return true;
	  }

	  // check for non-matching names
	  if (!query.startsWith(name)) {
	    return false;
	  }

	  // full comparison with version
	  var range = query.slice(name.length);
	  if (version) {
	    range = normalizer ? normalizer(range) : range;
	    return VersionRange.contains(range, version);
	  }

	  return false;
	}

	/**
	 * Normalizes `version` by stripping any "NT" prefix, but only on the Windows
	 * platform.
	 *
	 * Mimics the stripping performed by the `UserAgentWindowsPlatform` PHP class.
	 *
	 * @param {string} version
	 * @return {string}
	 */
	function normalizePlatformVersion(version) {
	  if (UserAgentData.platformName === 'Windows') {
	    return version.replace(/^\s*NT/, '');
	  }

	  return version;
	}

	/**
	 * Provides client-side access to the authoritative PHP-generated User Agent
	 * information supplied by the server.
	 */
	var UserAgent = {
	  /**
	   * Check if the User Agent browser matches `query`.
	   *
	   * `query` should be a string like "Chrome" or "Chrome > 33".
	   *
	   * Valid browser names include:
	   *
	   * - ACCESS NetFront
	   * - AOL
	   * - Amazon Silk
	   * - Android
	   * - BlackBerry
	   * - BlackBerry PlayBook
	   * - Chrome
	   * - Chrome for iOS
	   * - Chrome frame
	   * - Facebook PHP SDK
	   * - Facebook for iOS
	   * - Firefox
	   * - IE
	   * - IE Mobile
	   * - Mobile Safari
	   * - Motorola Internet Browser
	   * - Nokia
	   * - Openwave Mobile Browser
	   * - Opera
	   * - Opera Mini
	   * - Opera Mobile
	   * - Safari
	   * - UIWebView
	   * - Unknown
	   * - webOS
	   * - etc...
	   *
	   * An authoritative list can be found in the PHP `BrowserDetector` class and
	   * related classes in the same file (see calls to `new UserAgentBrowser` here:
	   * https://fburl.com/50728104).
	   *
	   * @note Function results are memoized
	   *
	   * @param {string} query Query of the form "Name [range expression]"
	   * @return {boolean}
	   */
	  isBrowser: function isBrowser(query) {
	    return compare(UserAgentData.browserName, UserAgentData.browserFullVersion, query);
	  },

	  /**
	   * Check if the User Agent browser uses a 32 or 64 bit architecture.
	   *
	   * @note Function results are memoized
	   *
	   * @param {string} query Query of the form "32" or "64".
	   * @return {boolean}
	   */
	  isBrowserArchitecture: function isBrowserArchitecture(query) {
	    return compare(UserAgentData.browserArchitecture, null, query);
	  },

	  /**
	   * Check if the User Agent device matches `query`.
	   *
	   * `query` should be a string like "iPhone" or "iPad".
	   *
	   * Valid device names include:
	   *
	   * - Kindle
	   * - Kindle Fire
	   * - Unknown
	   * - iPad
	   * - iPhone
	   * - iPod
	   * - etc...
	   *
	   * An authoritative list can be found in the PHP `DeviceDetector` class and
	   * related classes in the same file (see calls to `new UserAgentDevice` here:
	   * https://fburl.com/50728332).
	   *
	   * @note Function results are memoized
	   *
	   * @param {string} query Query of the form "Name"
	   * @return {boolean}
	   */
	  isDevice: function isDevice(query) {
	    return compare(UserAgentData.deviceName, null, query);
	  },

	  /**
	   * Check if the User Agent rendering engine matches `query`.
	   *
	   * `query` should be a string like "WebKit" or "WebKit >= 537".
	   *
	   * Valid engine names include:
	   *
	   * - Gecko
	   * - Presto
	   * - Trident
	   * - WebKit
	   * - etc...
	   *
	   * An authoritative list can be found in the PHP `RenderingEngineDetector`
	   * class related classes in the same file (see calls to `new
	   * UserAgentRenderingEngine` here: https://fburl.com/50728617).
	   *
	   * @note Function results are memoized
	   *
	   * @param {string} query Query of the form "Name [range expression]"
	   * @return {boolean}
	   */
	  isEngine: function isEngine(query) {
	    return compare(UserAgentData.engineName, UserAgentData.engineVersion, query);
	  },

	  /**
	   * Check if the User Agent platform matches `query`.
	   *
	   * `query` should be a string like "Windows" or "iOS 5 - 6".
	   *
	   * Valid platform names include:
	   *
	   * - Android
	   * - BlackBerry OS
	   * - Java ME
	   * - Linux
	   * - Mac OS X
	   * - Mac OS X Calendar
	   * - Mac OS X Internet Account
	   * - Symbian
	   * - SymbianOS
	   * - Windows
	   * - Windows Mobile
	   * - Windows Phone
	   * - iOS
	   * - iOS Facebook Integration Account
	   * - iOS Facebook Social Sharing UI
	   * - webOS
	   * - Chrome OS
	   * - etc...
	   *
	   * An authoritative list can be found in the PHP `PlatformDetector` class and
	   * related classes in the same file (see calls to `new UserAgentPlatform`
	   * here: https://fburl.com/50729226).
	   *
	   * @note Function results are memoized
	   *
	   * @param {string} query Query of the form "Name [range expression]"
	   * @return {boolean}
	   */
	  isPlatform: function isPlatform(query) {
	    return compare(UserAgentData.platformName, UserAgentData.platformFullVersion, query, normalizePlatformVersion);
	  },

	  /**
	   * Check if the User Agent platform is a 32 or 64 bit architecture.
	   *
	   * @note Function results are memoized
	   *
	   * @param {string} query Query of the form "32" or "64".
	   * @return {boolean}
	   */
	  isPlatformArchitecture: function isPlatformArchitecture(query) {
	    return compare(UserAgentData.platformArchitecture, null, query);
	  }

	};

	module.exports = mapObject(UserAgent, memoizeStringOnly);

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	/**
	 * Usage note:
	 * This module makes a best effort to export the same data we would internally.
	 * At Facebook we use a server-generated module that does the parsing and
	 * exports the data for the client to use. We can't rely on a server-side
	 * implementation in open source so instead we make use of an open source
	 * library to do the heavy lifting and then make some adjustments as necessary.
	 * It's likely there will be some differences. Some we can smooth over.
	 * Others are going to be harder.
	 */

	'use strict';

	var UAParser = __webpack_require__(193);

	var UNKNOWN = 'Unknown';

	var PLATFORM_MAP = {
	  'Mac OS': 'Mac OS X'
	};

	/**
	 * Convert from UAParser platform name to what we expect.
	 */
	function convertPlatformName(name) {
	  return PLATFORM_MAP[name] || name;
	}

	/**
	 * Get the version number in parts. This is very naive. We actually get major
	 * version as a part of UAParser already, which is generally good enough, but
	 * let's get the minor just in case.
	 */
	function getBrowserVersion(version) {
	  if (!version) {
	    return {
	      major: '',
	      minor: ''
	    };
	  }
	  var parts = version.split('.');
	  return {
	    major: parts[0],
	    minor: parts[1]
	  };
	}

	/**
	 * Get the UA data fom UAParser and then convert it to the format we're
	 * expecting for our APIS.
	 */
	var parser = new UAParser();
	var results = parser.getResult();

	// Do some conversion first.
	var browserVersionData = getBrowserVersion(results.browser.version);
	var uaData = {
	  browserArchitecture: results.cpu.architecture || UNKNOWN,
	  browserFullVersion: results.browser.version || UNKNOWN,
	  browserMinorVersion: browserVersionData.minor || UNKNOWN,
	  browserName: results.browser.name || UNKNOWN,
	  browserVersion: results.browser.major || UNKNOWN,
	  deviceName: results.device.model || UNKNOWN,
	  engineName: results.engine.name || UNKNOWN,
	  engineVersion: results.engine.version || UNKNOWN,
	  platformArchitecture: results.cpu.architecture || UNKNOWN,
	  platformName: convertPlatformName(results.os.name) || UNKNOWN,
	  platformVersion: results.os.version || UNKNOWN,
	  platformFullVersion: results.os.version || UNKNOWN
	};

	module.exports = uaData;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;_e = err;
	    } finally {
	      try {
	        if (!_n && _i['return']) _i['return']();
	      } finally {
	        if (_d) throw _e;
	      }
	    }return _arr;
	  }return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError('Invalid attempt to destructure non-iterable instance');
	    }
	  };
	}();

	var invariant = __webpack_require__(122);

	var componentRegex = /\./;
	var orRegex = /\|\|/;
	var rangeRegex = /\s+\-\s+/;
	var modifierRegex = /^(<=|<|=|>=|~>|~|>|)?\s*(.+)/;
	var numericRegex = /^(\d*)(.*)/;

	/**
	 * Splits input `range` on "||" and returns true if any subrange matches
	 * `version`.
	 *
	 * @param {string} range
	 * @param {string} version
	 * @returns {boolean}
	 */
	function checkOrExpression(range, version) {
	  var expressions = range.split(orRegex);

	  if (expressions.length > 1) {
	    return expressions.some(function (range) {
	      return VersionRange.contains(range, version);
	    });
	  } else {
	    range = expressions[0].trim();
	    return checkRangeExpression(range, version);
	  }
	}

	/**
	 * Splits input `range` on " - " (the surrounding whitespace is required) and
	 * returns true if version falls between the two operands.
	 *
	 * @param {string} range
	 * @param {string} version
	 * @returns {boolean}
	 */
	function checkRangeExpression(range, version) {
	  var expressions = range.split(rangeRegex);

	  !(expressions.length > 0 && expressions.length <= 2) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'the "-" operator expects exactly 2 operands') : invariant(false) : undefined;

	  if (expressions.length === 1) {
	    return checkSimpleExpression(expressions[0], version);
	  } else {
	    var _expressions = _slicedToArray(expressions, 2);

	    var startVersion = _expressions[0];
	    var endVersion = _expressions[1];

	    !(isSimpleVersion(startVersion) && isSimpleVersion(endVersion)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'operands to the "-" operator must be simple (no modifiers)') : invariant(false) : undefined;

	    return checkSimpleExpression('>=' + startVersion, version) && checkSimpleExpression('<=' + endVersion, version);
	  }
	}

	/**
	 * Checks if `range` matches `version`. `range` should be a "simple" range (ie.
	 * not a compound range using the " - " or "||" operators).
	 *
	 * @param {string} range
	 * @param {string} version
	 * @returns {boolean}
	 */
	function checkSimpleExpression(range, version) {
	  range = range.trim();
	  if (range === '') {
	    return true;
	  }

	  var versionComponents = version.split(componentRegex);

	  var _getModifierAndComponents = getModifierAndComponents(range);

	  var modifier = _getModifierAndComponents.modifier;
	  var rangeComponents = _getModifierAndComponents.rangeComponents;

	  switch (modifier) {
	    case '<':
	      return checkLessThan(versionComponents, rangeComponents);
	    case '<=':
	      return checkLessThanOrEqual(versionComponents, rangeComponents);
	    case '>=':
	      return checkGreaterThanOrEqual(versionComponents, rangeComponents);
	    case '>':
	      return checkGreaterThan(versionComponents, rangeComponents);
	    case '~':
	    case '~>':
	      return checkApproximateVersion(versionComponents, rangeComponents);
	    default:
	      return checkEqual(versionComponents, rangeComponents);
	  }
	}

	/**
	 * Checks whether `a` is less than `b`.
	 *
	 * @param {array<string>} a
	 * @param {array<string>} b
	 * @returns {boolean}
	 */
	function checkLessThan(a, b) {
	  return compareComponents(a, b) === -1;
	}

	/**
	 * Checks whether `a` is less than or equal to `b`.
	 *
	 * @param {array<string>} a
	 * @param {array<string>} b
	 * @returns {boolean}
	 */
	function checkLessThanOrEqual(a, b) {
	  var result = compareComponents(a, b);
	  return result === -1 || result === 0;
	}

	/**
	 * Checks whether `a` is equal to `b`.
	 *
	 * @param {array<string>} a
	 * @param {array<string>} b
	 * @returns {boolean}
	 */
	function checkEqual(a, b) {
	  return compareComponents(a, b) === 0;
	}

	/**
	 * Checks whether `a` is greater than or equal to `b`.
	 *
	 * @param {array<string>} a
	 * @param {array<string>} b
	 * @returns {boolean}
	 */
	function checkGreaterThanOrEqual(a, b) {
	  var result = compareComponents(a, b);
	  return result === 1 || result === 0;
	}

	/**
	 * Checks whether `a` is greater than `b`.
	 *
	 * @param {array<string>} a
	 * @param {array<string>} b
	 * @returns {boolean}
	 */
	function checkGreaterThan(a, b) {
	  return compareComponents(a, b) === 1;
	}

	/**
	 * Checks whether `a` is "reasonably close" to `b` (as described in
	 * https://www.npmjs.org/doc/misc/semver.html). For example, if `b` is "1.3.1"
	 * then "reasonably close" is defined as ">= 1.3.1 and < 1.4".
	 *
	 * @param {array<string>} a
	 * @param {array<string>} b
	 * @returns {boolean}
	 */
	function checkApproximateVersion(a, b) {
	  var lowerBound = b.slice();
	  var upperBound = b.slice();

	  if (upperBound.length > 1) {
	    upperBound.pop();
	  }
	  var lastIndex = upperBound.length - 1;
	  var numeric = parseInt(upperBound[lastIndex], 10);
	  if (isNumber(numeric)) {
	    upperBound[lastIndex] = numeric + 1 + '';
	  }

	  return checkGreaterThanOrEqual(a, lowerBound) && checkLessThan(a, upperBound);
	}

	/**
	 * Extracts the optional modifier (<, <=, =, >=, >, ~, ~>) and version
	 * components from `range`.
	 *
	 * For example, given `range` ">= 1.2.3" returns an object with a `modifier` of
	 * `">="` and `components` of `[1, 2, 3]`.
	 *
	 * @param {string} range
	 * @returns {object}
	 */
	function getModifierAndComponents(range) {
	  var rangeComponents = range.split(componentRegex);
	  var matches = rangeComponents[0].match(modifierRegex);
	  !matches ? process.env.NODE_ENV !== 'production' ? invariant(false, 'expected regex to match but it did not') : invariant(false) : undefined;

	  return {
	    modifier: matches[1],
	    rangeComponents: [matches[2]].concat(rangeComponents.slice(1))
	  };
	}

	/**
	 * Determines if `number` is a number.
	 *
	 * @param {mixed} number
	 * @returns {boolean}
	 */
	function isNumber(number) {
	  return !isNaN(number) && isFinite(number);
	}

	/**
	 * Tests whether `range` is a "simple" version number without any modifiers
	 * (">", "~" etc).
	 *
	 * @param {string} range
	 * @returns {boolean}
	 */
	function isSimpleVersion(range) {
	  return !getModifierAndComponents(range).modifier;
	}

	/**
	 * Zero-pads array `array` until it is at least `length` long.
	 *
	 * @param {array} array
	 * @param {number} length
	 */
	function zeroPad(array, length) {
	  for (var i = array.length; i < length; i++) {
	    array[i] = '0';
	  }
	}

	/**
	 * Normalizes `a` and `b` in preparation for comparison by doing the following:
	 *
	 * - zero-pads `a` and `b`
	 * - marks any "x", "X" or "*" component in `b` as equivalent by zero-ing it out
	 *   in both `a` and `b`
	 * - marks any final "*" component in `b` as a greedy wildcard by zero-ing it
	 *   and all of its successors in `a`
	 *
	 * @param {array<string>} a
	 * @param {array<string>} b
	 * @returns {array<array<string>>}
	 */
	function normalizeVersions(a, b) {
	  a = a.slice();
	  b = b.slice();

	  zeroPad(a, b.length);

	  // mark "x" and "*" components as equal
	  for (var i = 0; i < b.length; i++) {
	    var matches = b[i].match(/^[x*]$/i);
	    if (matches) {
	      b[i] = a[i] = '0';

	      // final "*" greedily zeros all remaining components
	      if (matches[0] === '*' && i === b.length - 1) {
	        for (var j = i; j < a.length; j++) {
	          a[j] = '0';
	        }
	      }
	    }
	  }

	  zeroPad(b, a.length);

	  return [a, b];
	}

	/**
	 * Returns the numerical -- not the lexicographical -- ordering of `a` and `b`.
	 *
	 * For example, `10-alpha` is greater than `2-beta`.
	 *
	 * @param {string} a
	 * @param {string} b
	 * @returns {number} -1, 0 or 1 to indicate whether `a` is less than, equal to,
	 * or greater than `b`, respectively
	 */
	function compareNumeric(a, b) {
	  var aPrefix = a.match(numericRegex)[1];
	  var bPrefix = b.match(numericRegex)[1];
	  var aNumeric = parseInt(aPrefix, 10);
	  var bNumeric = parseInt(bPrefix, 10);

	  if (isNumber(aNumeric) && isNumber(bNumeric) && aNumeric !== bNumeric) {
	    return compare(aNumeric, bNumeric);
	  } else {
	    return compare(a, b);
	  }
	}

	/**
	 * Returns the ordering of `a` and `b`.
	 *
	 * @param {string|number} a
	 * @param {string|number} b
	 * @returns {number} -1, 0 or 1 to indicate whether `a` is less than, equal to,
	 * or greater than `b`, respectively
	 */
	function compare(a, b) {
	  !((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === (typeof b === 'undefined' ? 'undefined' : _typeof(b))) ? process.env.NODE_ENV !== 'production' ? invariant(false, '"a" and "b" must be of the same type') : invariant(false) : undefined;

	  if (a > b) {
	    return 1;
	  } else if (a < b) {
	    return -1;
	  } else {
	    return 0;
	  }
	}

	/**
	 * Compares arrays of version components.
	 *
	 * @param {array<string>} a
	 * @param {array<string>} b
	 * @returns {number} -1, 0 or 1 to indicate whether `a` is less than, equal to,
	 * or greater than `b`, respectively
	 */
	function compareComponents(a, b) {
	  var _normalizeVersions = normalizeVersions(a, b);

	  var _normalizeVersions2 = _slicedToArray(_normalizeVersions, 2);

	  var aNormalized = _normalizeVersions2[0];
	  var bNormalized = _normalizeVersions2[1];

	  for (var i = 0; i < bNormalized.length; i++) {
	    var result = compareNumeric(aNormalized[i], bNormalized[i]);
	    if (result) {
	      return result;
	    }
	  }

	  return 0;
	}

	var VersionRange = {
	  /**
	   * Checks whether `version` satisfies the `range` specification.
	   *
	   * We support a subset of the expressions defined in
	   * https://www.npmjs.org/doc/misc/semver.html:
	   *
	   *    version   Must match version exactly
	   *    =version  Same as just version
	   *    >version  Must be greater than version
	   *    >=version Must be greater than or equal to version
	   *    <version  Must be less than version
	   *    <=version Must be less than or equal to version
	   *    ~version  Must be at least version, but less than the next significant
	   *              revision above version:
	   *              "~1.2.3" is equivalent to ">= 1.2.3 and < 1.3"
	   *    ~>version Equivalent to ~version
	   *    1.2.x     Must match "1.2.x", where "x" is a wildcard that matches
	   *              anything
	   *    1.2.*     Similar to "1.2.x", but "*" in the trailing position is a
	   *              "greedy" wildcard, so will match any number of additional
	   *              components:
	   *              "1.2.*" will match "1.2.1", "1.2.1.1", "1.2.1.1.1" etc
	   *    *         Any version
	   *    ""        (Empty string) Same as *
	   *    v1 - v2   Equivalent to ">= v1 and <= v2"
	   *    r1 || r2  Passes if either r1 or r2 are satisfied
	   *
	   * @param {string} range
	   * @param {string} version
	   * @returns {boolean}
	   */
	  contains: function contains(range, version) {
	    return checkOrExpression(range.trim(), version.trim());
	  }
	};

	module.exports = VersionRange;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 142 */
/***/ function(module, exports) {

	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	'use strict';

	exports.__esModule = true;
	var PUSH = 'PUSH';

	exports.PUSH = PUSH;
	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = 'REPLACE';

	exports.REPLACE = REPLACE;
	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = 'POP';

	exports.POP = POP;
	exports['default'] = {
	  PUSH: PUSH,
	  REPLACE: REPLACE,
	  POP: POP
	};

/***/ },
/* 143 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.loopAsync = loopAsync;

	function loopAsync(turns, work, callback) {
	  var currentTurn = 0;
	  var isDone = false;

	  function done() {
	    isDone = true;
	    callback.apply(this, arguments);
	  }

	  function next() {
	    if (isDone) return;

	    if (currentTurn < turns) {
	      work.call(this, currentTurn++, next, done);
	    } else {
	      done.apply(this, arguments);
	    }
	  }

	  next();
	}

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _invariant = __webpack_require__(164);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(142);

	var _ExecutionEnvironment = __webpack_require__(155);

	var _DOMUtils = __webpack_require__(152);

	var _DOMStateStorage = __webpack_require__(151);

	var _createDOMHistory = __webpack_require__(145);

	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

	var _parsePath = __webpack_require__(158);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve URLs.
	 */
	function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;

	  var forceRefresh = options.forceRefresh;

	  var isSupported = _DOMUtils.supportsHistory();
	  var useRefresh = !isSupported || forceRefresh;

	  function getCurrentLocation(historyState) {
	    historyState = historyState || window.history.state || {};

	    var path = _DOMUtils.getWindowPath();
	    var _historyState = historyState;
	    var key = _historyState.key;

	    var state = undefined;
	    if (key) {
	      state = _DOMStateStorage.readState(key);
	    } else {
	      state = null;
	      key = history.createKey();

	      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null, path);
	    }

	    var location = _parsePath2['default'](path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function startPopStateListener(_ref) {
	    var transitionTo = _ref.transitionTo;

	    function popStateListener(event) {
	      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

	      transitionTo(getCurrentLocation(event.state));
	    }

	    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

	    return function () {
	      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
	    };
	  }

	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;

	    if (action === _Actions.POP) return; // Nothing to do.

	    _DOMStateStorage.saveState(key, state);

	    var path = (basename || '') + pathname + search + hash;
	    var historyState = {
	      key: key
	    };

	    if (action === _Actions.PUSH) {
	      if (useRefresh) {
	        window.location.href = path;
	        return false; // Prevent location update.
	      } else {
	          window.history.pushState(historyState, null, path);
	        }
	    } else {
	      // REPLACE
	      if (useRefresh) {
	        window.location.replace(path);
	        return false; // Prevent location update.
	      } else {
	          window.history.replaceState(historyState, null, path);
	        }
	    }
	  }

	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));

	  var listenerCount = 0,
	      stopPopStateListener = undefined;

	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    var unlisten = history.listenBefore(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }

	  function listen(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    var unlisten = history.listen(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    history.registerTransitionHook(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);

	    if (--listenerCount === 0) stopPopStateListener();
	  }

	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    registerTransitionHook: registerTransitionHook,
	    unregisterTransitionHook: unregisterTransitionHook
	  });
	}

	exports['default'] = createBrowserHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _invariant = __webpack_require__(164);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _ExecutionEnvironment = __webpack_require__(155);

	var _DOMUtils = __webpack_require__(152);

	var _createHistory = __webpack_require__(147);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	function createDOMHistory(options) {
	  var history = _createHistory2['default'](_extends({
	    getUserConfirmation: _DOMUtils.getUserConfirmation
	  }, options, {
	    go: _DOMUtils.go
	  }));

	  function listen(listener) {
	    !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

	    return history.listen(listener);
	  }

	  return _extends({}, history, {
	    listen: listen
	  });
	}

	exports['default'] = createDOMHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _warning = __webpack_require__(194);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(164);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(142);

	var _ExecutionEnvironment = __webpack_require__(155);

	var _DOMUtils = __webpack_require__(152);

	var _DOMStateStorage = __webpack_require__(151);

	var _createDOMHistory = __webpack_require__(145);

	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

	var _parsePath = __webpack_require__(158);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	function isAbsolutePath(path) {
	  return typeof path === 'string' && path.charAt(0) === '/';
	}

	function ensureSlash() {
	  var path = _DOMUtils.getHashPath();

	  if (isAbsolutePath(path)) return true;

	  _DOMUtils.replaceHashPath('/' + path);

	  return false;
	}

	function addQueryStringValueToPath(path, key, value) {
	  return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
	}

	function stripQueryStringValueFromPath(path, key) {
	  return path.replace(new RegExp('[?&]?' + key + '=[a-zA-Z0-9]+'), '');
	}

	function getQueryStringValueFromPath(path, key) {
	  var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
	  return match && match[1];
	}

	var DefaultQueryKey = '_k';

	function createHashHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Hash history needs a DOM') : _invariant2['default'](false) : undefined;

	  var queryKey = options.queryKey;

	  if (queryKey === undefined || !!queryKey) queryKey = typeof queryKey === 'string' ? queryKey : DefaultQueryKey;

	  function getCurrentLocation() {
	    var path = _DOMUtils.getHashPath();

	    var key = undefined,
	        state = undefined;
	    if (queryKey) {
	      key = getQueryStringValueFromPath(path, queryKey);
	      path = stripQueryStringValueFromPath(path, queryKey);

	      if (key) {
	        state = _DOMStateStorage.readState(key);
	      } else {
	        state = null;
	        key = history.createKey();
	        _DOMUtils.replaceHashPath(addQueryStringValueToPath(path, queryKey, key));
	      }
	    } else {
	      key = state = null;
	    }

	    var location = _parsePath2['default'](path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function startHashChangeListener(_ref) {
	    var transitionTo = _ref.transitionTo;

	    function hashChangeListener() {
	      if (!ensureSlash()) return; // Always make sure hashes are preceeded with a /.

	      transitionTo(getCurrentLocation());
	    }

	    ensureSlash();
	    _DOMUtils.addEventListener(window, 'hashchange', hashChangeListener);

	    return function () {
	      _DOMUtils.removeEventListener(window, 'hashchange', hashChangeListener);
	    };
	  }

	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;

	    if (action === _Actions.POP) return; // Nothing to do.

	    var path = (basename || '') + pathname + search;

	    if (queryKey) {
	      path = addQueryStringValueToPath(path, queryKey, key);
	      _DOMStateStorage.saveState(key, state);
	    } else {
	      // Drop key and state.
	      location.key = location.state = null;
	    }

	    var currentHash = _DOMUtils.getHashPath();

	    if (action === _Actions.PUSH) {
	      if (currentHash !== path) {
	        window.location.hash = path;
	      } else {
	        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'You cannot PUSH the same path using hash history') : undefined;
	      }
	    } else if (currentHash !== path) {
	      // REPLACE
	      _DOMUtils.replaceHashPath(path);
	    }
	  }

	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));

	  var listenerCount = 0,
	      stopHashChangeListener = undefined;

	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    var unlisten = history.listenBefore(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }

	  function listen(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    var unlisten = history.listen(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }

	  function push(location) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.push(location);
	  }

	  function replace(location) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.replace(location);
	  }

	  var goIsSupportedWithoutReload = _DOMUtils.supportsGoWithoutReloadUsingHash();

	  function go(n) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : undefined;

	    history.go(n);
	  }

	  function createHref(path) {
	    return '#' + history.createHref(path);
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    history.registerTransitionHook(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);

	    if (--listenerCount === 0) stopHashChangeListener();
	  }

	  // deprecated
	  function pushState(state, path) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.pushState(state, path);
	  }

	  // deprecated
	  function replaceState(state, path) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.replaceState(state, path);
	  }

	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    push: push,
	    replace: replace,
	    go: go,
	    createHref: createHref,

	    registerTransitionHook: registerTransitionHook, // deprecated - warning is in createHistory
	    unregisterTransitionHook: unregisterTransitionHook, // deprecated - warning is in createHistory
	    pushState: pushState, // deprecated - warning is in createHistory
	    replaceState: replaceState // deprecated - warning is in createHistory
	  });
	}

	exports['default'] = createHashHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	//import warning from 'warning'
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _deepEqual = __webpack_require__(6);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _AsyncUtils = __webpack_require__(143);

	var _Actions = __webpack_require__(142);

	var _createLocation2 = __webpack_require__(148);

	var _createLocation3 = _interopRequireDefault(_createLocation2);

	var _runTransitionHook = __webpack_require__(159);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _parsePath = __webpack_require__(158);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	var _deprecate = __webpack_require__(150);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	function createRandomKey(length) {
	  return Math.random().toString(36).substr(2, length);
	}

	function locationsAreEqual(a, b) {
	  return a.pathname === b.pathname && a.search === b.search &&
	  //a.action === b.action && // Different action !== location change.
	  a.key === b.key && _deepEqual2['default'](a.state, b.state);
	}

	var DefaultKeyLength = 6;

	function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var finishTransition = options.finishTransition;
	  var saveState = options.saveState;
	  var go = options.go;
	  var keyLength = options.keyLength;
	  var getUserConfirmation = options.getUserConfirmation;

	  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

	  var transitionHooks = [];

	  function listenBefore(hook) {
	    transitionHooks.push(hook);

	    return function () {
	      transitionHooks = transitionHooks.filter(function (item) {
	        return item !== hook;
	      });
	    };
	  }

	  var allKeys = [];
	  var changeListeners = [];
	  var location = undefined;

	  function getCurrent() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) {
	      return allKeys.indexOf(pendingLocation.key);
	    } else if (location) {
	      return allKeys.indexOf(location.key);
	    } else {
	      return -1;
	    }
	  }

	  function updateLocation(newLocation) {
	    var current = getCurrent();

	    location = newLocation;

	    if (location.action === _Actions.PUSH) {
	      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
	    } else if (location.action === _Actions.REPLACE) {
	      allKeys[current] = location.key;
	    }

	    changeListeners.forEach(function (listener) {
	      listener(location);
	    });
	  }

	  function listen(listener) {
	    changeListeners.push(listener);

	    if (location) {
	      listener(location);
	    } else {
	      var _location = getCurrentLocation();
	      allKeys = [_location.key];
	      updateLocation(_location);
	    }

	    return function () {
	      changeListeners = changeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  }

	  function confirmTransitionTo(location, callback) {
	    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
	      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
	        if (result != null) {
	          done(result);
	        } else {
	          next();
	        }
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  }

	  var pendingLocation = undefined;

	  function transitionTo(nextLocation) {
	    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

	    pendingLocation = nextLocation;

	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

	      if (ok) {
	        // treat PUSH to current path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = createPath(location);
	          var nextPath = createPath(nextLocation);

	          if (nextPath === prevPath) nextLocation.action = _Actions.REPLACE;
	        }

	        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
	      } else if (location && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(location.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);

	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
	      }
	    });
	  }

	  function push(location) {
	    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
	  }

	  function replace(location) {
	    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
	  }

	  function goBack() {
	    go(-1);
	  }

	  function goForward() {
	    go(1);
	  }

	  function createKey() {
	    return createRandomKey(keyLength);
	  }

	  function createPath(location) {
	    if (location == null || typeof location === 'string') return location;

	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;

	    var result = pathname;

	    if (search) result += search;

	    if (hash) result += hash;

	    return result;
	  }

	  function createHref(location) {
	    return createPath(location);
	  }

	  function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];

	    if ((typeof action === 'undefined' ? 'undefined' : _typeof(action)) === 'object') {
	      //warning(
	      //  false,
	      //  'The state (2nd) argument to history.createLocation is deprecated; use a ' +
	      //  'location descriptor instead'
	      //)

	      if (typeof location === 'string') location = _parsePath2['default'](location);

	      location = _extends({}, location, { state: action });

	      action = key;
	      key = arguments[3] || createKey();
	    }

	    return _createLocation3['default'](location, action, key);
	  }

	  // deprecated
	  function setState(state) {
	    if (location) {
	      updateLocationState(location, state);
	      updateLocation(location);
	    } else {
	      updateLocationState(getCurrentLocation(), state);
	    }
	  }

	  function updateLocationState(location, state) {
	    location.state = _extends({}, location.state, state);
	    saveState(location.key, location.state);
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    transitionHooks = transitionHooks.filter(function (item) {
	      return item !== hook;
	    });
	  }

	  // deprecated
	  function pushState(state, path) {
	    if (typeof path === 'string') path = _parsePath2['default'](path);

	    push(_extends({ state: state }, path));
	  }

	  // deprecated
	  function replaceState(state, path) {
	    if (typeof path === 'string') path = _parsePath2['default'](path);

	    replace(_extends({ state: state }, path));
	  }

	  return {
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: createPath,
	    createHref: createHref,
	    createLocation: createLocation,

	    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
	    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
	    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
	    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	  };
	}

	exports['default'] = createHistory;
	module.exports = exports['default'];

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	//import warning from 'warning'
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _Actions = __webpack_require__(142);

	var _parsePath = __webpack_require__(158);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	function createLocation() {
	  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

	  if (typeof location === 'string') location = _parsePath2['default'](location);

	  if ((typeof action === 'undefined' ? 'undefined' : _typeof(action)) === 'object') {
	    //warning(
	    //  false,
	    //  'The state (2nd) argument to createLocation is deprecated; use a ' +
	    //  'location descriptor instead'
	    //)

	    location = _extends({}, location, { state: action });

	    action = key || _Actions.POP;
	    key = _fourthArg;
	  }

	  var pathname = location.pathname || '/';
	  var search = location.search || '';
	  var hash = location.hash || '';
	  var state = location.state || null;

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	}

	exports['default'] = createLocation;
	module.exports = exports['default'];

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _warning = __webpack_require__(194);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(164);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(142);

	var _createHistory = __webpack_require__(147);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	var _parsePath = __webpack_require__(158);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	function createStateStorage(entries) {
	  return entries.filter(function (entry) {
	    return entry.state;
	  }).reduce(function (memo, entry) {
	    memo[entry.key] = entry.state;
	    return memo;
	  }, {});
	}

	function createMemoryHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  if (Array.isArray(options)) {
	    options = { entries: options };
	  } else if (typeof options === 'string') {
	    options = { entries: [options] };
	  }

	  var history = _createHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: saveState,
	    go: go
	  }));

	  var _options = options;
	  var entries = _options.entries;
	  var current = _options.current;

	  if (typeof entries === 'string') {
	    entries = [entries];
	  } else if (!Array.isArray(entries)) {
	    entries = ['/'];
	  }

	  entries = entries.map(function (entry) {
	    var key = history.createKey();

	    if (typeof entry === 'string') return { pathname: entry, key: key };

	    if ((typeof entry === 'undefined' ? 'undefined' : _typeof(entry)) === 'object' && entry) return _extends({}, entry, { key: key });

	     true ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Unable to create history entry from %s', entry) : _invariant2['default'](false) : undefined;
	  });

	  if (current == null) {
	    current = entries.length - 1;
	  } else {
	    !(current >= 0 && current < entries.length) ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : _invariant2['default'](false) : undefined;
	  }

	  var storage = createStateStorage(entries);

	  function saveState(key, state) {
	    storage[key] = state;
	  }

	  function readState(key) {
	    return storage[key];
	  }

	  function getCurrentLocation() {
	    var entry = entries[current];
	    var key = entry.key;
	    var basename = entry.basename;
	    var pathname = entry.pathname;
	    var search = entry.search;

	    var path = (basename || '') + pathname + (search || '');

	    var state = undefined;
	    if (key) {
	      state = readState(key);
	    } else {
	      state = null;
	      key = history.createKey();
	      entry.key = key;
	    }

	    var location = _parsePath2['default'](path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function canGo(n) {
	    var index = current + n;
	    return index >= 0 && index < entries.length;
	  }

	  function go(n) {
	    if (n) {
	      if (!canGo(n)) {
	        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'Cannot go(%s) there is not enough history', n) : undefined;
	        return;
	      }

	      current += n;

	      var currentLocation = getCurrentLocation();

	      // change action to POP
	      history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
	    }
	  }

	  function finishTransition(location) {
	    switch (location.action) {
	      case _Actions.PUSH:
	        current += 1;

	        // if we are not on the top of stack
	        // remove rest and push new
	        if (current < entries.length) entries.splice(current);

	        entries.push(location);
	        saveState(location.key, location.state);
	        break;
	      case _Actions.REPLACE:
	        entries[current] = location;
	        saveState(location.key, location.state);
	        break;
	    }
	  }

	  return history;
	}

	exports['default'] = createMemoryHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 150 */
/***/ function(module, exports) {

	//import warning from 'warning'

	"use strict";

	exports.__esModule = true;
	function deprecate(fn) {
	  return fn;
	  //return function () {
	  //  warning(false, '[history] ' + message)
	  //  return fn.apply(this, arguments)
	  //}
	}

	exports["default"] = deprecate;
	module.exports = exports["default"];

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*eslint-disable no-empty */
	'use strict';

	exports.__esModule = true;
	exports.saveState = saveState;
	exports.readState = readState;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _warning = __webpack_require__(194);

	var _warning2 = _interopRequireDefault(_warning);

	var KeyPrefix = '@@History/';
	var QuotaExceededError = 'QuotaExceededError';
	var SecurityError = 'SecurityError';

	function createKey(key) {
	  return KeyPrefix + key;
	}

	function saveState(key, state) {
	  try {
	    window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

	      return;
	    }

	    if (error.name === QuotaExceededError && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

	      return;
	    }

	    throw error;
	  }
	}

	function readState(key) {
	  var json = undefined;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

	      return null;
	    }
	  }

	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }

	  return null;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 152 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.addEventListener = addEventListener;
	exports.removeEventListener = removeEventListener;
	exports.getHashPath = getHashPath;
	exports.replaceHashPath = replaceHashPath;
	exports.getWindowPath = getWindowPath;
	exports.go = go;
	exports.getUserConfirmation = getUserConfirmation;
	exports.supportsHistory = supportsHistory;
	exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

	function addEventListener(node, event, listener) {
	  if (node.addEventListener) {
	    node.addEventListener(event, listener, false);
	  } else {
	    node.attachEvent('on' + event, listener);
	  }
	}

	function removeEventListener(node, event, listener) {
	  if (node.removeEventListener) {
	    node.removeEventListener(event, listener, false);
	  } else {
	    node.detachEvent('on' + event, listener);
	  }
	}

	function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  return window.location.href.split('#')[1] || '';
	}

	function replaceHashPath(path) {
	  window.location.replace(window.location.pathname + window.location.search + '#' + path);
	}

	function getWindowPath() {
	  return window.location.pathname + window.location.search + window.location.hash;
	}

	function go(n) {
	  if (n) window.history.go(n);
	}

	function getUserConfirmation(message, callback) {
	  callback(window.confirm(message));
	}

	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
	 */

	function supportsHistory() {
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	    return false;
	  }
	  // FIXME: Work around our browser history not working correctly on Chrome
	  // iOS: https://github.com/rackt/react-router/issues/2565
	  if (ua.indexOf('CriOS') !== -1) {
	    return false;
	  }
	  return window.history && 'pushState' in window.history;
	}

	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */

	function supportsGoWithoutReloadUsingHash() {
	  var ua = navigator.userAgent;
	  return ua.indexOf('Firefox') === -1;
	}

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _deprecate = __webpack_require__(150);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	var _useBeforeUnload = __webpack_require__(161);

	var _useBeforeUnload2 = _interopRequireDefault(_useBeforeUnload);

	exports['default'] = _deprecate2['default'](_useBeforeUnload2['default'], 'enableBeforeUnload is deprecated, use useBeforeUnload instead');
	module.exports = exports['default'];

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _deprecate = __webpack_require__(150);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	var _useQueries = __webpack_require__(162);

	var _useQueries2 = _interopRequireDefault(_useQueries);

	exports['default'] = _deprecate2['default'](_useQueries2['default'], 'enableQueries is deprecated, use useQueries instead');
	module.exports = exports['default'];

/***/ },
/* 155 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	exports.canUseDOM = canUseDOM;

/***/ },
/* 156 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	function extractPath(string) {
	  var match = string.match(/^https?:\/\/[^\/]*/);

	  if (match == null) return string;

	  return string.substring(match[0].length);
	}

	exports["default"] = extractPath;
	module.exports = exports["default"];

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _deprecate = __webpack_require__(150);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	var _createLocation2 = __webpack_require__(148);

	var _createLocation3 = _interopRequireDefault(_createLocation2);

	var _createBrowserHistory = __webpack_require__(144);

	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

	exports.createHistory = _createBrowserHistory2['default'];

	var _createHashHistory2 = __webpack_require__(146);

	var _createHashHistory3 = _interopRequireDefault(_createHashHistory2);

	exports.createHashHistory = _createHashHistory3['default'];

	var _createMemoryHistory2 = __webpack_require__(149);

	var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);

	exports.createMemoryHistory = _createMemoryHistory3['default'];

	var _useBasename2 = __webpack_require__(160);

	var _useBasename3 = _interopRequireDefault(_useBasename2);

	exports.useBasename = _useBasename3['default'];

	var _useBeforeUnload2 = __webpack_require__(161);

	var _useBeforeUnload3 = _interopRequireDefault(_useBeforeUnload2);

	exports.useBeforeUnload = _useBeforeUnload3['default'];

	var _useQueries2 = __webpack_require__(162);

	var _useQueries3 = _interopRequireDefault(_useQueries2);

	exports.useQueries = _useQueries3['default'];

	var _Actions2 = __webpack_require__(142);

	var _Actions3 = _interopRequireDefault(_Actions2);

	exports.Actions = _Actions3['default'];

	// deprecated

	var _enableBeforeUnload2 = __webpack_require__(153);

	var _enableBeforeUnload3 = _interopRequireDefault(_enableBeforeUnload2);

	exports.enableBeforeUnload = _enableBeforeUnload3['default'];

	var _enableQueries2 = __webpack_require__(154);

	var _enableQueries3 = _interopRequireDefault(_enableQueries2);

	exports.enableQueries = _enableQueries3['default'];
	var createLocation = _deprecate2['default'](_createLocation3['default'], 'Using createLocation without a history instance is deprecated; please use history.createLocation instead');
	exports.createLocation = createLocation;

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _warning = __webpack_require__(194);

	var _warning2 = _interopRequireDefault(_warning);

	var _extractPath = __webpack_require__(156);

	var _extractPath2 = _interopRequireDefault(_extractPath);

	function parsePath(path) {
	  var pathname = _extractPath2['default'](path);
	  var search = '';
	  var hash = '';

	  process.env.NODE_ENV !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }

	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }

	  if (pathname === '') pathname = '/';

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	}

	exports['default'] = parsePath;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _warning = __webpack_require__(194);

	var _warning2 = _interopRequireDefault(_warning);

	function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);

	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
	  }
	}

	exports['default'] = runTransitionHook;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _objectWithoutProperties(obj, keys) {
	  var target = {};for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	  }return target;
	}

	var _ExecutionEnvironment = __webpack_require__(155);

	var _runTransitionHook = __webpack_require__(159);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _extractPath = __webpack_require__(156);

	var _extractPath2 = _interopRequireDefault(_extractPath);

	var _parsePath = __webpack_require__(158);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	var _deprecate = __webpack_require__(150);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	function useBasename(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var basename = options.basename;

	    var historyOptions = _objectWithoutProperties(options, ['basename']);

	    var history = createHistory(historyOptions);

	    // Automatically use the value of <base href> in HTML
	    // documents as basename if it's not explicitly given.
	    if (basename == null && _ExecutionEnvironment.canUseDOM) {
	      var base = document.getElementsByTagName('base')[0];

	      if (base) basename = _extractPath2['default'](base.href);
	    }

	    function addBasename(location) {
	      if (basename && location.basename == null) {
	        if (location.pathname.indexOf(basename) === 0) {
	          location.pathname = location.pathname.substring(basename.length);
	          location.basename = basename;

	          if (location.pathname === '') location.pathname = '/';
	        } else {
	          location.basename = '';
	        }
	      }

	      return location;
	    }

	    function prependBasename(location) {
	      if (!basename) return location;

	      if (typeof location === 'string') location = _parsePath2['default'](location);

	      var pname = location.pathname;
	      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
	      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
	      var pathname = normalizedBasename + normalizedPathname;

	      return _extends({}, location, {
	        pathname: pathname
	      });
	    }

	    // Override all read methods with basename-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addBasename(location), callback);
	      });
	    }

	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addBasename(location));
	      });
	    }

	    // Override all write methods with basename-aware versions.
	    function push(location) {
	      history.push(prependBasename(location));
	    }

	    function replace(location) {
	      history.replace(prependBasename(location));
	    }

	    function createPath(location) {
	      return history.createPath(prependBasename(location));
	    }

	    function createHref(location) {
	      return history.createHref(prependBasename(location));
	    }

	    function createLocation() {
	      return addBasename(history.createLocation.apply(history, arguments));
	    }

	    // deprecated
	    function pushState(state, path) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);

	      push(_extends({ state: state }, path));
	    }

	    // deprecated
	    function replaceState(state, path) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);

	      replace(_extends({ state: state }, path));
	    }

	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,

	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}

	exports['default'] = useBasename;
	module.exports = exports['default'];

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _warning = __webpack_require__(194);

	var _warning2 = _interopRequireDefault(_warning);

	var _ExecutionEnvironment = __webpack_require__(155);

	var _DOMUtils = __webpack_require__(152);

	var _deprecate = __webpack_require__(150);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	function startBeforeUnloadListener(getBeforeUnloadPromptMessage) {
	  function listener(event) {
	    var message = getBeforeUnloadPromptMessage();

	    if (typeof message === 'string') {
	      (event || window.event).returnValue = message;
	      return message;
	    }
	  }

	  _DOMUtils.addEventListener(window, 'beforeunload', listener);

	  return function () {
	    _DOMUtils.removeEventListener(window, 'beforeunload', listener);
	  };
	}

	/**
	 * Returns a new createHistory function that can be used to create
	 * history objects that know how to use the beforeunload event in web
	 * browsers to cancel navigation.
	 */
	function useBeforeUnload(createHistory) {
	  return function (options) {
	    var history = createHistory(options);

	    var stopBeforeUnloadListener = undefined;
	    var beforeUnloadHooks = [];

	    function getBeforeUnloadPromptMessage() {
	      var message = undefined;

	      for (var i = 0, len = beforeUnloadHooks.length; message == null && i < len; ++i) {
	        message = beforeUnloadHooks[i].call();
	      }return message;
	    }

	    function listenBeforeUnload(hook) {
	      beforeUnloadHooks.push(hook);

	      if (beforeUnloadHooks.length === 1) {
	        if (_ExecutionEnvironment.canUseDOM) {
	          stopBeforeUnloadListener = startBeforeUnloadListener(getBeforeUnloadPromptMessage);
	        } else {
	          process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'listenBeforeUnload only works in DOM environments') : undefined;
	        }
	      }

	      return function () {
	        beforeUnloadHooks = beforeUnloadHooks.filter(function (item) {
	          return item !== hook;
	        });

	        if (beforeUnloadHooks.length === 0 && stopBeforeUnloadListener) {
	          stopBeforeUnloadListener();
	          stopBeforeUnloadListener = null;
	        }
	      };
	    }

	    // deprecated
	    function registerBeforeUnloadHook(hook) {
	      if (_ExecutionEnvironment.canUseDOM && beforeUnloadHooks.indexOf(hook) === -1) {
	        beforeUnloadHooks.push(hook);

	        if (beforeUnloadHooks.length === 1) stopBeforeUnloadListener = startBeforeUnloadListener(getBeforeUnloadPromptMessage);
	      }
	    }

	    // deprecated
	    function unregisterBeforeUnloadHook(hook) {
	      if (beforeUnloadHooks.length > 0) {
	        beforeUnloadHooks = beforeUnloadHooks.filter(function (item) {
	          return item !== hook;
	        });

	        if (beforeUnloadHooks.length === 0) stopBeforeUnloadListener();
	      }
	    }

	    return _extends({}, history, {
	      listenBeforeUnload: listenBeforeUnload,

	      registerBeforeUnloadHook: _deprecate2['default'](registerBeforeUnloadHook, 'registerBeforeUnloadHook is deprecated; use listenBeforeUnload instead'),
	      unregisterBeforeUnloadHook: _deprecate2['default'](unregisterBeforeUnloadHook, 'unregisterBeforeUnloadHook is deprecated; use the callback returned from listenBeforeUnload instead')
	    });
	  };
	}

	exports['default'] = useBeforeUnload;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _objectWithoutProperties(obj, keys) {
	  var target = {};for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	  }return target;
	}

	var _warning = __webpack_require__(194);

	var _warning2 = _interopRequireDefault(_warning);

	var _queryString = __webpack_require__(166);

	var _runTransitionHook = __webpack_require__(159);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _parsePath = __webpack_require__(158);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	var _deprecate = __webpack_require__(150);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	var SEARCH_BASE_KEY = '$searchBase';

	function defaultStringifyQuery(query) {
	  return _queryString.stringify(query).replace(/%20/g, '+');
	}

	var defaultParseQueryString = _queryString.parse;

	function isNestedObject(object) {
	  for (var p in object) {
	    if (object.hasOwnProperty(p) && _typeof(object[p]) === 'object' && !Array.isArray(object[p]) && object[p] !== null) return true;
	  }return false;
	}

	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know how to handle URL queries.
	 */
	function useQueries(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var stringifyQuery = options.stringifyQuery;
	    var parseQueryString = options.parseQueryString;

	    var historyOptions = _objectWithoutProperties(options, ['stringifyQuery', 'parseQueryString']);

	    var history = createHistory(historyOptions);

	    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;

	    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;

	    function addQuery(location) {
	      if (location.query == null) {
	        var search = location.search;

	        location.query = parseQueryString(search.substring(1));
	        location[SEARCH_BASE_KEY] = { search: search, searchBase: '' };
	      }

	      // TODO: Instead of all the book-keeping here, this should just strip the
	      // stringified query from the search.

	      return location;
	    }

	    function appendQuery(location, query) {
	      var _extends2;

	      var queryString = undefined;
	      if (!query || (queryString = stringifyQuery(query)) === '') return location;

	      process.env.NODE_ENV !== 'production' ? _warning2['default'](stringifyQuery !== defaultStringifyQuery || !isNestedObject(query), 'useQueries does not stringify nested query objects by default; ' + 'use a custom stringifyQuery function') : undefined;

	      if (typeof location === 'string') location = _parsePath2['default'](location);

	      var searchBaseSpec = location[SEARCH_BASE_KEY];
	      var searchBase = undefined;
	      if (searchBaseSpec && location.search === searchBaseSpec.search) {
	        searchBase = searchBaseSpec.searchBase;
	      } else {
	        searchBase = location.search || '';
	      }

	      var search = searchBase + (searchBase ? '&' : '?') + queryString;

	      return _extends({}, location, (_extends2 = {
	        search: search
	      }, _extends2[SEARCH_BASE_KEY] = { search: search, searchBase: searchBase }, _extends2));
	    }

	    // Override all read methods with query-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addQuery(location), callback);
	      });
	    }

	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addQuery(location));
	      });
	    }

	    // Override all write methods with query-aware versions.
	    function push(location) {
	      history.push(appendQuery(location, location.query));
	    }

	    function replace(location) {
	      history.replace(appendQuery(location, location.query));
	    }

	    function createPath(location, query) {
	      //warning(
	      //  !query,
	      //  'the query argument to createPath is deprecated; use a location descriptor instead'
	      //)
	      return history.createPath(appendQuery(location, query || location.query));
	    }

	    function createHref(location, query) {
	      //warning(
	      //  !query,
	      //  'the query argument to createHref is deprecated; use a location descriptor instead'
	      //)
	      return history.createHref(appendQuery(location, query || location.query));
	    }

	    function createLocation() {
	      return addQuery(history.createLocation.apply(history, arguments));
	    }

	    // deprecated
	    function pushState(state, path, query) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);

	      push(_extends({ state: state }, path, { query: query }));
	    }

	    // deprecated
	    function replaceState(state, path, query) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);

	      replace(_extends({ state: state }, path, { query: query }));
	    }

	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,

	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}

	exports['default'] = useQueries;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;}; /**
	 *  Copyright (c) 2014-2015, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */(function(global,factory){( false?'undefined':_typeof(exports))==='object'&&typeof module!=='undefined'?module.exports=factory(): true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):global.Immutable=factory();})(undefined,function(){'use strict';var SLICE$0=Array.prototype.slice;function createClass(ctor,superClass){if(superClass){ctor.prototype=Object.create(superClass.prototype);}ctor.prototype.constructor=ctor;}function Iterable(value){return isIterable(value)?value:Seq(value);}createClass(KeyedIterable,Iterable);function KeyedIterable(value){return isKeyed(value)?value:KeyedSeq(value);}createClass(IndexedIterable,Iterable);function IndexedIterable(value){return isIndexed(value)?value:IndexedSeq(value);}createClass(SetIterable,Iterable);function SetIterable(value){return isIterable(value)&&!isAssociative(value)?value:SetSeq(value);}function isIterable(maybeIterable){return !!(maybeIterable&&maybeIterable[IS_ITERABLE_SENTINEL]);}function isKeyed(maybeKeyed){return !!(maybeKeyed&&maybeKeyed[IS_KEYED_SENTINEL]);}function isIndexed(maybeIndexed){return !!(maybeIndexed&&maybeIndexed[IS_INDEXED_SENTINEL]);}function isAssociative(maybeAssociative){return isKeyed(maybeAssociative)||isIndexed(maybeAssociative);}function isOrdered(maybeOrdered){return !!(maybeOrdered&&maybeOrdered[IS_ORDERED_SENTINEL]);}Iterable.isIterable=isIterable;Iterable.isKeyed=isKeyed;Iterable.isIndexed=isIndexed;Iterable.isAssociative=isAssociative;Iterable.isOrdered=isOrdered;Iterable.Keyed=KeyedIterable;Iterable.Indexed=IndexedIterable;Iterable.Set=SetIterable;var IS_ITERABLE_SENTINEL='@@__IMMUTABLE_ITERABLE__@@';var IS_KEYED_SENTINEL='@@__IMMUTABLE_KEYED__@@';var IS_INDEXED_SENTINEL='@@__IMMUTABLE_INDEXED__@@';var IS_ORDERED_SENTINEL='@@__IMMUTABLE_ORDERED__@@'; // Used for setting prototype methods that IE8 chokes on.
	var DELETE='delete'; // Constants describing the size of trie nodes.
	var SHIFT=5; // Resulted in best performance after ______?
	var SIZE=1<<SHIFT;var MASK=SIZE-1; // A consistent shared value representing "not set" which equals nothing other
	// than itself, and nothing that could be provided externally.
	var NOT_SET={}; // Boolean references, Rough equivalent of `bool &`.
	var CHANGE_LENGTH={value:false};var DID_ALTER={value:false};function MakeRef(ref){ref.value=false;return ref;}function SetRef(ref){ref&&(ref.value=true);} // A function which returns a value representing an "owner" for transient writes
	// to tries. The return value will only ever equal itself, and will not equal
	// the return of any subsequent call of this function.
	function OwnerID(){} // http://jsperf.com/copy-array-inline
	function arrCopy(arr,offset){offset=offset||0;var len=Math.max(0,arr.length-offset);var newArr=new Array(len);for(var ii=0;ii<len;ii++){newArr[ii]=arr[ii+offset];}return newArr;}function ensureSize(iter){if(iter.size===undefined){iter.size=iter.__iterate(returnTrue);}return iter.size;}function wrapIndex(iter,index){ // This implements "is array index" which the ECMAString spec defines as:
	//
	//     A String property name P is an array index if and only if
	//     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
	//     to 2^32−1.
	//
	// http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
	if(typeof index!=='number'){var uint32Index=index>>>0; // N >>> 0 is shorthand for ToUint32
	if(''+uint32Index!==index||uint32Index===4294967295){return NaN;}index=uint32Index;}return index<0?ensureSize(iter)+index:index;}function returnTrue(){return true;}function wholeSlice(begin,end,size){return (begin===0||size!==undefined&&begin<=-size)&&(end===undefined||size!==undefined&&end>=size);}function resolveBegin(begin,size){return resolveIndex(begin,size,0);}function resolveEnd(end,size){return resolveIndex(end,size,size);}function resolveIndex(index,size,defaultIndex){return index===undefined?defaultIndex:index<0?Math.max(0,size+index):size===undefined?index:Math.min(size,index);} /* global Symbol */var ITERATE_KEYS=0;var ITERATE_VALUES=1;var ITERATE_ENTRIES=2;var REAL_ITERATOR_SYMBOL=typeof Symbol==='function'&&Symbol.iterator;var FAUX_ITERATOR_SYMBOL='@@iterator';var ITERATOR_SYMBOL=REAL_ITERATOR_SYMBOL||FAUX_ITERATOR_SYMBOL;function Iterator(next){this.next=next;}Iterator.prototype.toString=function(){return '[Iterator]';};Iterator.KEYS=ITERATE_KEYS;Iterator.VALUES=ITERATE_VALUES;Iterator.ENTRIES=ITERATE_ENTRIES;Iterator.prototype.inspect=Iterator.prototype.toSource=function(){return this.toString();};Iterator.prototype[ITERATOR_SYMBOL]=function(){return this;};function iteratorValue(type,k,v,iteratorResult){var value=type===0?k:type===1?v:[k,v];iteratorResult?iteratorResult.value=value:iteratorResult={value:value,done:false};return iteratorResult;}function iteratorDone(){return {value:undefined,done:true};}function hasIterator(maybeIterable){return !!getIteratorFn(maybeIterable);}function isIterator(maybeIterator){return maybeIterator&&typeof maybeIterator.next==='function';}function getIterator(iterable){var iteratorFn=getIteratorFn(iterable);return iteratorFn&&iteratorFn.call(iterable);}function getIteratorFn(iterable){var iteratorFn=iterable&&(REAL_ITERATOR_SYMBOL&&iterable[REAL_ITERATOR_SYMBOL]||iterable[FAUX_ITERATOR_SYMBOL]);if(typeof iteratorFn==='function'){return iteratorFn;}}function isArrayLike(value){return value&&typeof value.length==='number';}createClass(Seq,Iterable);function Seq(value){return value===null||value===undefined?emptySequence():isIterable(value)?value.toSeq():seqFromValue(value);}Seq.of=function() /*...values*/{return Seq(arguments);};Seq.prototype.toSeq=function(){return this;};Seq.prototype.toString=function(){return this.__toString('Seq {','}');};Seq.prototype.cacheResult=function(){if(!this._cache&&this.__iterateUncached){this._cache=this.entrySeq().toArray();this.size=this._cache.length;}return this;}; // abstract __iterateUncached(fn, reverse)
	Seq.prototype.__iterate=function(fn,reverse){return seqIterate(this,fn,reverse,true);}; // abstract __iteratorUncached(type, reverse)
	Seq.prototype.__iterator=function(type,reverse){return seqIterator(this,type,reverse,true);};createClass(KeyedSeq,Seq);function KeyedSeq(value){return value===null||value===undefined?emptySequence().toKeyedSeq():isIterable(value)?isKeyed(value)?value.toSeq():value.fromEntrySeq():keyedSeqFromValue(value);}KeyedSeq.prototype.toKeyedSeq=function(){return this;};createClass(IndexedSeq,Seq);function IndexedSeq(value){return value===null||value===undefined?emptySequence():!isIterable(value)?indexedSeqFromValue(value):isKeyed(value)?value.entrySeq():value.toIndexedSeq();}IndexedSeq.of=function() /*...values*/{return IndexedSeq(arguments);};IndexedSeq.prototype.toIndexedSeq=function(){return this;};IndexedSeq.prototype.toString=function(){return this.__toString('Seq [',']');};IndexedSeq.prototype.__iterate=function(fn,reverse){return seqIterate(this,fn,reverse,false);};IndexedSeq.prototype.__iterator=function(type,reverse){return seqIterator(this,type,reverse,false);};createClass(SetSeq,Seq);function SetSeq(value){return (value===null||value===undefined?emptySequence():!isIterable(value)?indexedSeqFromValue(value):isKeyed(value)?value.entrySeq():value).toSetSeq();}SetSeq.of=function() /*...values*/{return SetSeq(arguments);};SetSeq.prototype.toSetSeq=function(){return this;};Seq.isSeq=isSeq;Seq.Keyed=KeyedSeq;Seq.Set=SetSeq;Seq.Indexed=IndexedSeq;var IS_SEQ_SENTINEL='@@__IMMUTABLE_SEQ__@@';Seq.prototype[IS_SEQ_SENTINEL]=true;createClass(ArraySeq,IndexedSeq);function ArraySeq(array){this._array=array;this.size=array.length;}ArraySeq.prototype.get=function(index,notSetValue){return this.has(index)?this._array[wrapIndex(this,index)]:notSetValue;};ArraySeq.prototype.__iterate=function(fn,reverse){var array=this._array;var maxIndex=array.length-1;for(var ii=0;ii<=maxIndex;ii++){if(fn(array[reverse?maxIndex-ii:ii],ii,this)===false){return ii+1;}}return ii;};ArraySeq.prototype.__iterator=function(type,reverse){var array=this._array;var maxIndex=array.length-1;var ii=0;return new Iterator(function(){return ii>maxIndex?iteratorDone():iteratorValue(type,ii,array[reverse?maxIndex-ii++:ii++]);});};createClass(ObjectSeq,KeyedSeq);function ObjectSeq(object){var keys=Object.keys(object);this._object=object;this._keys=keys;this.size=keys.length;}ObjectSeq.prototype.get=function(key,notSetValue){if(notSetValue!==undefined&&!this.has(key)){return notSetValue;}return this._object[key];};ObjectSeq.prototype.has=function(key){return this._object.hasOwnProperty(key);};ObjectSeq.prototype.__iterate=function(fn,reverse){var object=this._object;var keys=this._keys;var maxIndex=keys.length-1;for(var ii=0;ii<=maxIndex;ii++){var key=keys[reverse?maxIndex-ii:ii];if(fn(object[key],key,this)===false){return ii+1;}}return ii;};ObjectSeq.prototype.__iterator=function(type,reverse){var object=this._object;var keys=this._keys;var maxIndex=keys.length-1;var ii=0;return new Iterator(function(){var key=keys[reverse?maxIndex-ii:ii];return ii++>maxIndex?iteratorDone():iteratorValue(type,key,object[key]);});};ObjectSeq.prototype[IS_ORDERED_SENTINEL]=true;createClass(IterableSeq,IndexedSeq);function IterableSeq(iterable){this._iterable=iterable;this.size=iterable.length||iterable.size;}IterableSeq.prototype.__iterateUncached=function(fn,reverse){if(reverse){return this.cacheResult().__iterate(fn,reverse);}var iterable=this._iterable;var iterator=getIterator(iterable);var iterations=0;if(isIterator(iterator)){var step;while(!(step=iterator.next()).done){if(fn(step.value,iterations++,this)===false){break;}}}return iterations;};IterableSeq.prototype.__iteratorUncached=function(type,reverse){if(reverse){return this.cacheResult().__iterator(type,reverse);}var iterable=this._iterable;var iterator=getIterator(iterable);if(!isIterator(iterator)){return new Iterator(iteratorDone);}var iterations=0;return new Iterator(function(){var step=iterator.next();return step.done?step:iteratorValue(type,iterations++,step.value);});};createClass(IteratorSeq,IndexedSeq);function IteratorSeq(iterator){this._iterator=iterator;this._iteratorCache=[];}IteratorSeq.prototype.__iterateUncached=function(fn,reverse){if(reverse){return this.cacheResult().__iterate(fn,reverse);}var iterator=this._iterator;var cache=this._iteratorCache;var iterations=0;while(iterations<cache.length){if(fn(cache[iterations],iterations++,this)===false){return iterations;}}var step;while(!(step=iterator.next()).done){var val=step.value;cache[iterations]=val;if(fn(val,iterations++,this)===false){break;}}return iterations;};IteratorSeq.prototype.__iteratorUncached=function(type,reverse){if(reverse){return this.cacheResult().__iterator(type,reverse);}var iterator=this._iterator;var cache=this._iteratorCache;var iterations=0;return new Iterator(function(){if(iterations>=cache.length){var step=iterator.next();if(step.done){return step;}cache[iterations]=step.value;}return iteratorValue(type,iterations,cache[iterations++]);});}; // # pragma Helper functions
	function isSeq(maybeSeq){return !!(maybeSeq&&maybeSeq[IS_SEQ_SENTINEL]);}var EMPTY_SEQ;function emptySequence(){return EMPTY_SEQ||(EMPTY_SEQ=new ArraySeq([]));}function keyedSeqFromValue(value){var seq=Array.isArray(value)?new ArraySeq(value).fromEntrySeq():isIterator(value)?new IteratorSeq(value).fromEntrySeq():hasIterator(value)?new IterableSeq(value).fromEntrySeq():(typeof value==='undefined'?'undefined':_typeof(value))==='object'?new ObjectSeq(value):undefined;if(!seq){throw new TypeError('Expected Array or iterable object of [k, v] entries, '+'or keyed object: '+value);}return seq;}function indexedSeqFromValue(value){var seq=maybeIndexedSeqFromValue(value);if(!seq){throw new TypeError('Expected Array or iterable object of values: '+value);}return seq;}function seqFromValue(value){var seq=maybeIndexedSeqFromValue(value)||(typeof value==='undefined'?'undefined':_typeof(value))==='object'&&new ObjectSeq(value);if(!seq){throw new TypeError('Expected Array or iterable object of values, or keyed object: '+value);}return seq;}function maybeIndexedSeqFromValue(value){return isArrayLike(value)?new ArraySeq(value):isIterator(value)?new IteratorSeq(value):hasIterator(value)?new IterableSeq(value):undefined;}function seqIterate(seq,fn,reverse,useKeys){var cache=seq._cache;if(cache){var maxIndex=cache.length-1;for(var ii=0;ii<=maxIndex;ii++){var entry=cache[reverse?maxIndex-ii:ii];if(fn(entry[1],useKeys?entry[0]:ii,seq)===false){return ii+1;}}return ii;}return seq.__iterateUncached(fn,reverse);}function seqIterator(seq,type,reverse,useKeys){var cache=seq._cache;if(cache){var maxIndex=cache.length-1;var ii=0;return new Iterator(function(){var entry=cache[reverse?maxIndex-ii:ii];return ii++>maxIndex?iteratorDone():iteratorValue(type,useKeys?entry[0]:ii-1,entry[1]);});}return seq.__iteratorUncached(type,reverse);}function fromJS(json,converter){return converter?fromJSWith(converter,json,'',{'':json}):fromJSDefault(json);}function fromJSWith(converter,json,key,parentJSON){if(Array.isArray(json)){return converter.call(parentJSON,key,IndexedSeq(json).map(function(v,k){return fromJSWith(converter,v,k,json);}));}if(isPlainObj(json)){return converter.call(parentJSON,key,KeyedSeq(json).map(function(v,k){return fromJSWith(converter,v,k,json);}));}return json;}function fromJSDefault(json){if(Array.isArray(json)){return IndexedSeq(json).map(fromJSDefault).toList();}if(isPlainObj(json)){return KeyedSeq(json).map(fromJSDefault).toMap();}return json;}function isPlainObj(value){return value&&(value.constructor===Object||value.constructor===undefined);} /**
	   * An extension of the "same-value" algorithm as [described for use by ES6 Map
	   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
	   *
	   * NaN is considered the same as NaN, however -0 and 0 are considered the same
	   * value, which is different from the algorithm described by
	   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
	   *
	   * This is extended further to allow Objects to describe the values they
	   * represent, by way of `valueOf` or `equals` (and `hashCode`).
	   *
	   * Note: because of this extension, the key equality of Immutable.Map and the
	   * value equality of Immutable.Set will differ from ES6 Map and Set.
	   *
	   * ### Defining custom values
	   *
	   * The easiest way to describe the value an object represents is by implementing
	   * `valueOf`. For example, `Date` represents a value by returning a unix
	   * timestamp for `valueOf`:
	   *
	   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
	   *     var date2 = new Date(1234567890000);
	   *     date1.valueOf(); // 1234567890000
	   *     assert( date1 !== date2 );
	   *     assert( Immutable.is( date1, date2 ) );
	   *
	   * Note: overriding `valueOf` may have other implications if you use this object
	   * where JavaScript expects a primitive, such as implicit string coercion.
	   *
	   * For more complex types, especially collections, implementing `valueOf` may
	   * not be performant. An alternative is to implement `equals` and `hashCode`.
	   *
	   * `equals` takes another object, presumably of similar type, and returns true
	   * if the it is equal. Equality is symmetrical, so the same result should be
	   * returned if this and the argument are flipped.
	   *
	   *     assert( a.equals(b) === b.equals(a) );
	   *
	   * `hashCode` returns a 32bit integer number representing the object which will
	   * be used to determine how to store the value object in a Map or Set. You must
	   * provide both or neither methods, one must not exist without the other.
	   *
	   * Also, an important relationship between these methods must be upheld: if two
	   * values are equal, they *must* return the same hashCode. If the values are not
	   * equal, they might have the same hashCode; this is called a hash collision,
	   * and while undesirable for performance reasons, it is acceptable.
	   *
	   *     if (a.equals(b)) {
	   *       assert( a.hashCode() === b.hashCode() );
	   *     }
	   *
	   * All Immutable collections implement `equals` and `hashCode`.
	   *
	   */function is(valueA,valueB){if(valueA===valueB||valueA!==valueA&&valueB!==valueB){return true;}if(!valueA||!valueB){return false;}if(typeof valueA.valueOf==='function'&&typeof valueB.valueOf==='function'){valueA=valueA.valueOf();valueB=valueB.valueOf();if(valueA===valueB||valueA!==valueA&&valueB!==valueB){return true;}if(!valueA||!valueB){return false;}}if(typeof valueA.equals==='function'&&typeof valueB.equals==='function'&&valueA.equals(valueB)){return true;}return false;}function deepEqual(a,b){if(a===b){return true;}if(!isIterable(b)||a.size!==undefined&&b.size!==undefined&&a.size!==b.size||a.__hash!==undefined&&b.__hash!==undefined&&a.__hash!==b.__hash||isKeyed(a)!==isKeyed(b)||isIndexed(a)!==isIndexed(b)||isOrdered(a)!==isOrdered(b)){return false;}if(a.size===0&&b.size===0){return true;}var notAssociative=!isAssociative(a);if(isOrdered(a)){var entries=a.entries();return b.every(function(v,k){var entry=entries.next().value;return entry&&is(entry[1],v)&&(notAssociative||is(entry[0],k));})&&entries.next().done;}var flipped=false;if(a.size===undefined){if(b.size===undefined){if(typeof a.cacheResult==='function'){a.cacheResult();}}else {flipped=true;var _=a;a=b;b=_;}}var allEqual=true;var bSize=b.__iterate(function(v,k){if(notAssociative?!a.has(v):flipped?!is(v,a.get(k,NOT_SET)):!is(a.get(k,NOT_SET),v)){allEqual=false;return false;}});return allEqual&&a.size===bSize;}createClass(Repeat,IndexedSeq);function Repeat(value,times){if(!(this instanceof Repeat)){return new Repeat(value,times);}this._value=value;this.size=times===undefined?Infinity:Math.max(0,times);if(this.size===0){if(EMPTY_REPEAT){return EMPTY_REPEAT;}EMPTY_REPEAT=this;}}Repeat.prototype.toString=function(){if(this.size===0){return 'Repeat []';}return 'Repeat [ '+this._value+' '+this.size+' times ]';};Repeat.prototype.get=function(index,notSetValue){return this.has(index)?this._value:notSetValue;};Repeat.prototype.includes=function(searchValue){return is(this._value,searchValue);};Repeat.prototype.slice=function(begin,end){var size=this.size;return wholeSlice(begin,end,size)?this:new Repeat(this._value,resolveEnd(end,size)-resolveBegin(begin,size));};Repeat.prototype.reverse=function(){return this;};Repeat.prototype.indexOf=function(searchValue){if(is(this._value,searchValue)){return 0;}return -1;};Repeat.prototype.lastIndexOf=function(searchValue){if(is(this._value,searchValue)){return this.size;}return -1;};Repeat.prototype.__iterate=function(fn,reverse){for(var ii=0;ii<this.size;ii++){if(fn(this._value,ii,this)===false){return ii+1;}}return ii;};Repeat.prototype.__iterator=function(type,reverse){var this$0=this;var ii=0;return new Iterator(function(){return ii<this$0.size?iteratorValue(type,ii++,this$0._value):iteratorDone();});};Repeat.prototype.equals=function(other){return other instanceof Repeat?is(this._value,other._value):deepEqual(other);};var EMPTY_REPEAT;function invariant(condition,error){if(!condition)throw new Error(error);}createClass(Range,IndexedSeq);function Range(start,end,step){if(!(this instanceof Range)){return new Range(start,end,step);}invariant(step!==0,'Cannot step a Range by 0');start=start||0;if(end===undefined){end=Infinity;}step=step===undefined?1:Math.abs(step);if(end<start){step=-step;}this._start=start;this._end=end;this._step=step;this.size=Math.max(0,Math.ceil((end-start)/step-1)+1);if(this.size===0){if(EMPTY_RANGE){return EMPTY_RANGE;}EMPTY_RANGE=this;}}Range.prototype.toString=function(){if(this.size===0){return 'Range []';}return 'Range [ '+this._start+'...'+this._end+(this._step>1?' by '+this._step:'')+' ]';};Range.prototype.get=function(index,notSetValue){return this.has(index)?this._start+wrapIndex(this,index)*this._step:notSetValue;};Range.prototype.includes=function(searchValue){var possibleIndex=(searchValue-this._start)/this._step;return possibleIndex>=0&&possibleIndex<this.size&&possibleIndex===Math.floor(possibleIndex);};Range.prototype.slice=function(begin,end){if(wholeSlice(begin,end,this.size)){return this;}begin=resolveBegin(begin,this.size);end=resolveEnd(end,this.size);if(end<=begin){return new Range(0,0);}return new Range(this.get(begin,this._end),this.get(end,this._end),this._step);};Range.prototype.indexOf=function(searchValue){var offsetValue=searchValue-this._start;if(offsetValue%this._step===0){var index=offsetValue/this._step;if(index>=0&&index<this.size){return index;}}return -1;};Range.prototype.lastIndexOf=function(searchValue){return this.indexOf(searchValue);};Range.prototype.__iterate=function(fn,reverse){var maxIndex=this.size-1;var step=this._step;var value=reverse?this._start+maxIndex*step:this._start;for(var ii=0;ii<=maxIndex;ii++){if(fn(value,ii,this)===false){return ii+1;}value+=reverse?-step:step;}return ii;};Range.prototype.__iterator=function(type,reverse){var maxIndex=this.size-1;var step=this._step;var value=reverse?this._start+maxIndex*step:this._start;var ii=0;return new Iterator(function(){var v=value;value+=reverse?-step:step;return ii>maxIndex?iteratorDone():iteratorValue(type,ii++,v);});};Range.prototype.equals=function(other){return other instanceof Range?this._start===other._start&&this._end===other._end&&this._step===other._step:deepEqual(this,other);};var EMPTY_RANGE;createClass(Collection,Iterable);function Collection(){throw TypeError('Abstract');}createClass(KeyedCollection,Collection);function KeyedCollection(){}createClass(IndexedCollection,Collection);function IndexedCollection(){}createClass(SetCollection,Collection);function SetCollection(){}Collection.Keyed=KeyedCollection;Collection.Indexed=IndexedCollection;Collection.Set=SetCollection;var imul=typeof Math.imul==='function'&&Math.imul(0xffffffff,2)===-2?Math.imul:function imul(a,b){a=a|0; // int
	b=b|0; // int
	var c=a&0xffff;var d=b&0xffff; // Shift by 0 fixes the sign on the high part.
	return c*d+((a>>>16)*d+c*(b>>>16)<<16>>>0)|0; // int
	}; // v8 has an optimization for storing 31-bit signed numbers.
	// Values which have either 00 or 11 as the high order bits qualify.
	// This function drops the highest order bit in a signed number, maintaining
	// the sign bit.
	function smi(i32){return i32>>>1&0x40000000|i32&0xBFFFFFFF;}function hash(o){if(o===false||o===null||o===undefined){return 0;}if(typeof o.valueOf==='function'){o=o.valueOf();if(o===false||o===null||o===undefined){return 0;}}if(o===true){return 1;}var type=typeof o==='undefined'?'undefined':_typeof(o);if(type==='number'){var h=o|0;if(h!==o){h^=o*0xFFFFFFFF;}while(o>0xFFFFFFFF){o/=0xFFFFFFFF;h^=o;}return smi(h);}if(type==='string'){return o.length>STRING_HASH_CACHE_MIN_STRLEN?cachedHashString(o):hashString(o);}if(typeof o.hashCode==='function'){return o.hashCode();}if(type==='object'){return hashJSObj(o);}if(typeof o.toString==='function'){return hashString(o.toString());}throw new Error('Value type '+type+' cannot be hashed.');}function cachedHashString(string){var hash=stringHashCache[string];if(hash===undefined){hash=hashString(string);if(STRING_HASH_CACHE_SIZE===STRING_HASH_CACHE_MAX_SIZE){STRING_HASH_CACHE_SIZE=0;stringHashCache={};}STRING_HASH_CACHE_SIZE++;stringHashCache[string]=hash;}return hash;} // http://jsperf.com/hashing-strings
	function hashString(string){ // This is the hash from JVM
	// The hash code for a string is computed as
	// s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	// where s[i] is the ith character of the string and n is the length of
	// the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	// (exclusive) by dropping high bits.
	var hash=0;for(var ii=0;ii<string.length;ii++){hash=31*hash+string.charCodeAt(ii)|0;}return smi(hash);}function hashJSObj(obj){var hash;if(usingWeakMap){hash=weakMap.get(obj);if(hash!==undefined){return hash;}}hash=obj[UID_HASH_KEY];if(hash!==undefined){return hash;}if(!canDefineProperty){hash=obj.propertyIsEnumerable&&obj.propertyIsEnumerable[UID_HASH_KEY];if(hash!==undefined){return hash;}hash=getIENodeHash(obj);if(hash!==undefined){return hash;}}hash=++objHashUID;if(objHashUID&0x40000000){objHashUID=0;}if(usingWeakMap){weakMap.set(obj,hash);}else if(isExtensible!==undefined&&isExtensible(obj)===false){throw new Error('Non-extensible objects are not allowed as keys.');}else if(canDefineProperty){Object.defineProperty(obj,UID_HASH_KEY,{'enumerable':false,'configurable':false,'writable':false,'value':hash});}else if(obj.propertyIsEnumerable!==undefined&&obj.propertyIsEnumerable===obj.constructor.prototype.propertyIsEnumerable){ // Since we can't define a non-enumerable property on the object
	// we'll hijack one of the less-used non-enumerable properties to
	// save our hash on it. Since this is a function it will not show up in
	// `JSON.stringify` which is what we want.
	obj.propertyIsEnumerable=function(){return this.constructor.prototype.propertyIsEnumerable.apply(this,arguments);};obj.propertyIsEnumerable[UID_HASH_KEY]=hash;}else if(obj.nodeType!==undefined){ // At this point we couldn't get the IE `uniqueID` to use as a hash
	// and we couldn't use a non-enumerable property to exploit the
	// dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	// itself.
	obj[UID_HASH_KEY]=hash;}else {throw new Error('Unable to set a non-enumerable property on object.');}return hash;} // Get references to ES5 object methods.
	var isExtensible=Object.isExtensible; // True if Object.defineProperty works as expected. IE8 fails this test.
	var canDefineProperty=function(){try{Object.defineProperty({},'@',{});return true;}catch(e){return false;}}(); // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	// and avoid memory leaks from the IE cloneNode bug.
	function getIENodeHash(node){if(node&&node.nodeType>0){switch(node.nodeType){case 1: // Element
	return node.uniqueID;case 9: // Document
	return node.documentElement&&node.documentElement.uniqueID;}}} // If possible, use a WeakMap.
	var usingWeakMap=typeof WeakMap==='function';var weakMap;if(usingWeakMap){weakMap=new WeakMap();}var objHashUID=0;var UID_HASH_KEY='__immutablehash__';if(typeof Symbol==='function'){UID_HASH_KEY=Symbol(UID_HASH_KEY);}var STRING_HASH_CACHE_MIN_STRLEN=16;var STRING_HASH_CACHE_MAX_SIZE=255;var STRING_HASH_CACHE_SIZE=0;var stringHashCache={};function assertNotInfinite(size){invariant(size!==Infinity,'Cannot perform this action with an infinite size.');}createClass(Map,KeyedCollection); // @pragma Construction
	function Map(value){return value===null||value===undefined?emptyMap():isMap(value)&&!isOrdered(value)?value:emptyMap().withMutations(function(map){var iter=KeyedIterable(value);assertNotInfinite(iter.size);iter.forEach(function(v,k){return map.set(k,v);});});}Map.prototype.toString=function(){return this.__toString('Map {','}');}; // @pragma Access
	Map.prototype.get=function(k,notSetValue){return this._root?this._root.get(0,undefined,k,notSetValue):notSetValue;}; // @pragma Modification
	Map.prototype.set=function(k,v){return updateMap(this,k,v);};Map.prototype.setIn=function(keyPath,v){return this.updateIn(keyPath,NOT_SET,function(){return v;});};Map.prototype.remove=function(k){return updateMap(this,k,NOT_SET);};Map.prototype.deleteIn=function(keyPath){return this.updateIn(keyPath,function(){return NOT_SET;});};Map.prototype.update=function(k,notSetValue,updater){return arguments.length===1?k(this):this.updateIn([k],notSetValue,updater);};Map.prototype.updateIn=function(keyPath,notSetValue,updater){if(!updater){updater=notSetValue;notSetValue=undefined;}var updatedValue=updateInDeepMap(this,forceIterator(keyPath),notSetValue,updater);return updatedValue===NOT_SET?undefined:updatedValue;};Map.prototype.clear=function(){if(this.size===0){return this;}if(this.__ownerID){this.size=0;this._root=null;this.__hash=undefined;this.__altered=true;return this;}return emptyMap();}; // @pragma Composition
	Map.prototype.merge=function() /*...iters*/{return mergeIntoMapWith(this,undefined,arguments);};Map.prototype.mergeWith=function(merger){var iters=SLICE$0.call(arguments,1);return mergeIntoMapWith(this,merger,iters);};Map.prototype.mergeIn=function(keyPath){var iters=SLICE$0.call(arguments,1);return this.updateIn(keyPath,emptyMap(),function(m){return typeof m.merge==='function'?m.merge.apply(m,iters):iters[iters.length-1];});};Map.prototype.mergeDeep=function() /*...iters*/{return mergeIntoMapWith(this,deepMerger,arguments);};Map.prototype.mergeDeepWith=function(merger){var iters=SLICE$0.call(arguments,1);return mergeIntoMapWith(this,deepMergerWith(merger),iters);};Map.prototype.mergeDeepIn=function(keyPath){var iters=SLICE$0.call(arguments,1);return this.updateIn(keyPath,emptyMap(),function(m){return typeof m.mergeDeep==='function'?m.mergeDeep.apply(m,iters):iters[iters.length-1];});};Map.prototype.sort=function(comparator){ // Late binding
	return OrderedMap(sortFactory(this,comparator));};Map.prototype.sortBy=function(mapper,comparator){ // Late binding
	return OrderedMap(sortFactory(this,comparator,mapper));}; // @pragma Mutability
	Map.prototype.withMutations=function(fn){var mutable=this.asMutable();fn(mutable);return mutable.wasAltered()?mutable.__ensureOwner(this.__ownerID):this;};Map.prototype.asMutable=function(){return this.__ownerID?this:this.__ensureOwner(new OwnerID());};Map.prototype.asImmutable=function(){return this.__ensureOwner();};Map.prototype.wasAltered=function(){return this.__altered;};Map.prototype.__iterator=function(type,reverse){return new MapIterator(this,type,reverse);};Map.prototype.__iterate=function(fn,reverse){var this$0=this;var iterations=0;this._root&&this._root.iterate(function(entry){iterations++;return fn(entry[1],entry[0],this$0);},reverse);return iterations;};Map.prototype.__ensureOwner=function(ownerID){if(ownerID===this.__ownerID){return this;}if(!ownerID){this.__ownerID=ownerID;this.__altered=false;return this;}return makeMap(this.size,this._root,ownerID,this.__hash);};function isMap(maybeMap){return !!(maybeMap&&maybeMap[IS_MAP_SENTINEL]);}Map.isMap=isMap;var IS_MAP_SENTINEL='@@__IMMUTABLE_MAP__@@';var MapPrototype=Map.prototype;MapPrototype[IS_MAP_SENTINEL]=true;MapPrototype[DELETE]=MapPrototype.remove;MapPrototype.removeIn=MapPrototype.deleteIn; // #pragma Trie Nodes
	function ArrayMapNode(ownerID,entries){this.ownerID=ownerID;this.entries=entries;}ArrayMapNode.prototype.get=function(shift,keyHash,key,notSetValue){var entries=this.entries;for(var ii=0,len=entries.length;ii<len;ii++){if(is(key,entries[ii][0])){return entries[ii][1];}}return notSetValue;};ArrayMapNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){var removed=value===NOT_SET;var entries=this.entries;var idx=0;for(var len=entries.length;idx<len;idx++){if(is(key,entries[idx][0])){break;}}var exists=idx<len;if(exists?entries[idx][1]===value:removed){return this;}SetRef(didAlter);(removed||!exists)&&SetRef(didChangeSize);if(removed&&entries.length===1){return; // undefined
	}if(!exists&&!removed&&entries.length>=MAX_ARRAY_MAP_SIZE){return createNodes(ownerID,entries,key,value);}var isEditable=ownerID&&ownerID===this.ownerID;var newEntries=isEditable?entries:arrCopy(entries);if(exists){if(removed){idx===len-1?newEntries.pop():newEntries[idx]=newEntries.pop();}else {newEntries[idx]=[key,value];}}else {newEntries.push([key,value]);}if(isEditable){this.entries=newEntries;return this;}return new ArrayMapNode(ownerID,newEntries);};function BitmapIndexedNode(ownerID,bitmap,nodes){this.ownerID=ownerID;this.bitmap=bitmap;this.nodes=nodes;}BitmapIndexedNode.prototype.get=function(shift,keyHash,key,notSetValue){if(keyHash===undefined){keyHash=hash(key);}var bit=1<<((shift===0?keyHash:keyHash>>>shift)&MASK);var bitmap=this.bitmap;return (bitmap&bit)===0?notSetValue:this.nodes[popCount(bitmap&bit-1)].get(shift+SHIFT,keyHash,key,notSetValue);};BitmapIndexedNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){if(keyHash===undefined){keyHash=hash(key);}var keyHashFrag=(shift===0?keyHash:keyHash>>>shift)&MASK;var bit=1<<keyHashFrag;var bitmap=this.bitmap;var exists=(bitmap&bit)!==0;if(!exists&&value===NOT_SET){return this;}var idx=popCount(bitmap&bit-1);var nodes=this.nodes;var node=exists?nodes[idx]:undefined;var newNode=updateNode(node,ownerID,shift+SHIFT,keyHash,key,value,didChangeSize,didAlter);if(newNode===node){return this;}if(!exists&&newNode&&nodes.length>=MAX_BITMAP_INDEXED_SIZE){return expandNodes(ownerID,nodes,bitmap,keyHashFrag,newNode);}if(exists&&!newNode&&nodes.length===2&&isLeafNode(nodes[idx^1])){return nodes[idx^1];}if(exists&&newNode&&nodes.length===1&&isLeafNode(newNode)){return newNode;}var isEditable=ownerID&&ownerID===this.ownerID;var newBitmap=exists?newNode?bitmap:bitmap^bit:bitmap|bit;var newNodes=exists?newNode?setIn(nodes,idx,newNode,isEditable):spliceOut(nodes,idx,isEditable):spliceIn(nodes,idx,newNode,isEditable);if(isEditable){this.bitmap=newBitmap;this.nodes=newNodes;return this;}return new BitmapIndexedNode(ownerID,newBitmap,newNodes);};function HashArrayMapNode(ownerID,count,nodes){this.ownerID=ownerID;this.count=count;this.nodes=nodes;}HashArrayMapNode.prototype.get=function(shift,keyHash,key,notSetValue){if(keyHash===undefined){keyHash=hash(key);}var idx=(shift===0?keyHash:keyHash>>>shift)&MASK;var node=this.nodes[idx];return node?node.get(shift+SHIFT,keyHash,key,notSetValue):notSetValue;};HashArrayMapNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){if(keyHash===undefined){keyHash=hash(key);}var idx=(shift===0?keyHash:keyHash>>>shift)&MASK;var removed=value===NOT_SET;var nodes=this.nodes;var node=nodes[idx];if(removed&&!node){return this;}var newNode=updateNode(node,ownerID,shift+SHIFT,keyHash,key,value,didChangeSize,didAlter);if(newNode===node){return this;}var newCount=this.count;if(!node){newCount++;}else if(!newNode){newCount--;if(newCount<MIN_HASH_ARRAY_MAP_SIZE){return packNodes(ownerID,nodes,newCount,idx);}}var isEditable=ownerID&&ownerID===this.ownerID;var newNodes=setIn(nodes,idx,newNode,isEditable);if(isEditable){this.count=newCount;this.nodes=newNodes;return this;}return new HashArrayMapNode(ownerID,newCount,newNodes);};function HashCollisionNode(ownerID,keyHash,entries){this.ownerID=ownerID;this.keyHash=keyHash;this.entries=entries;}HashCollisionNode.prototype.get=function(shift,keyHash,key,notSetValue){var entries=this.entries;for(var ii=0,len=entries.length;ii<len;ii++){if(is(key,entries[ii][0])){return entries[ii][1];}}return notSetValue;};HashCollisionNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){if(keyHash===undefined){keyHash=hash(key);}var removed=value===NOT_SET;if(keyHash!==this.keyHash){if(removed){return this;}SetRef(didAlter);SetRef(didChangeSize);return mergeIntoNode(this,ownerID,shift,keyHash,[key,value]);}var entries=this.entries;var idx=0;for(var len=entries.length;idx<len;idx++){if(is(key,entries[idx][0])){break;}}var exists=idx<len;if(exists?entries[idx][1]===value:removed){return this;}SetRef(didAlter);(removed||!exists)&&SetRef(didChangeSize);if(removed&&len===2){return new ValueNode(ownerID,this.keyHash,entries[idx^1]);}var isEditable=ownerID&&ownerID===this.ownerID;var newEntries=isEditable?entries:arrCopy(entries);if(exists){if(removed){idx===len-1?newEntries.pop():newEntries[idx]=newEntries.pop();}else {newEntries[idx]=[key,value];}}else {newEntries.push([key,value]);}if(isEditable){this.entries=newEntries;return this;}return new HashCollisionNode(ownerID,this.keyHash,newEntries);};function ValueNode(ownerID,keyHash,entry){this.ownerID=ownerID;this.keyHash=keyHash;this.entry=entry;}ValueNode.prototype.get=function(shift,keyHash,key,notSetValue){return is(key,this.entry[0])?this.entry[1]:notSetValue;};ValueNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){var removed=value===NOT_SET;var keyMatch=is(key,this.entry[0]);if(keyMatch?value===this.entry[1]:removed){return this;}SetRef(didAlter);if(removed){SetRef(didChangeSize);return; // undefined
	}if(keyMatch){if(ownerID&&ownerID===this.ownerID){this.entry[1]=value;return this;}return new ValueNode(ownerID,this.keyHash,[key,value]);}SetRef(didChangeSize);return mergeIntoNode(this,ownerID,shift,hash(key),[key,value]);}; // #pragma Iterators
	ArrayMapNode.prototype.iterate=HashCollisionNode.prototype.iterate=function(fn,reverse){var entries=this.entries;for(var ii=0,maxIndex=entries.length-1;ii<=maxIndex;ii++){if(fn(entries[reverse?maxIndex-ii:ii])===false){return false;}}};BitmapIndexedNode.prototype.iterate=HashArrayMapNode.prototype.iterate=function(fn,reverse){var nodes=this.nodes;for(var ii=0,maxIndex=nodes.length-1;ii<=maxIndex;ii++){var node=nodes[reverse?maxIndex-ii:ii];if(node&&node.iterate(fn,reverse)===false){return false;}}};ValueNode.prototype.iterate=function(fn,reverse){return fn(this.entry);};createClass(MapIterator,Iterator);function MapIterator(map,type,reverse){this._type=type;this._reverse=reverse;this._stack=map._root&&mapIteratorFrame(map._root);}MapIterator.prototype.next=function(){var type=this._type;var stack=this._stack;while(stack){var node=stack.node;var index=stack.index++;var maxIndex;if(node.entry){if(index===0){return mapIteratorValue(type,node.entry);}}else if(node.entries){maxIndex=node.entries.length-1;if(index<=maxIndex){return mapIteratorValue(type,node.entries[this._reverse?maxIndex-index:index]);}}else {maxIndex=node.nodes.length-1;if(index<=maxIndex){var subNode=node.nodes[this._reverse?maxIndex-index:index];if(subNode){if(subNode.entry){return mapIteratorValue(type,subNode.entry);}stack=this._stack=mapIteratorFrame(subNode,stack);}continue;}}stack=this._stack=this._stack.__prev;}return iteratorDone();};function mapIteratorValue(type,entry){return iteratorValue(type,entry[0],entry[1]);}function mapIteratorFrame(node,prev){return {node:node,index:0,__prev:prev};}function makeMap(size,root,ownerID,hash){var map=Object.create(MapPrototype);map.size=size;map._root=root;map.__ownerID=ownerID;map.__hash=hash;map.__altered=false;return map;}var EMPTY_MAP;function emptyMap(){return EMPTY_MAP||(EMPTY_MAP=makeMap(0));}function updateMap(map,k,v){var newRoot;var newSize;if(!map._root){if(v===NOT_SET){return map;}newSize=1;newRoot=new ArrayMapNode(map.__ownerID,[[k,v]]);}else {var didChangeSize=MakeRef(CHANGE_LENGTH);var didAlter=MakeRef(DID_ALTER);newRoot=updateNode(map._root,map.__ownerID,0,undefined,k,v,didChangeSize,didAlter);if(!didAlter.value){return map;}newSize=map.size+(didChangeSize.value?v===NOT_SET?-1:1:0);}if(map.__ownerID){map.size=newSize;map._root=newRoot;map.__hash=undefined;map.__altered=true;return map;}return newRoot?makeMap(newSize,newRoot):emptyMap();}function updateNode(node,ownerID,shift,keyHash,key,value,didChangeSize,didAlter){if(!node){if(value===NOT_SET){return node;}SetRef(didAlter);SetRef(didChangeSize);return new ValueNode(ownerID,keyHash,[key,value]);}return node.update(ownerID,shift,keyHash,key,value,didChangeSize,didAlter);}function isLeafNode(node){return node.constructor===ValueNode||node.constructor===HashCollisionNode;}function mergeIntoNode(node,ownerID,shift,keyHash,entry){if(node.keyHash===keyHash){return new HashCollisionNode(ownerID,keyHash,[node.entry,entry]);}var idx1=(shift===0?node.keyHash:node.keyHash>>>shift)&MASK;var idx2=(shift===0?keyHash:keyHash>>>shift)&MASK;var newNode;var nodes=idx1===idx2?[mergeIntoNode(node,ownerID,shift+SHIFT,keyHash,entry)]:(newNode=new ValueNode(ownerID,keyHash,entry),idx1<idx2?[node,newNode]:[newNode,node]);return new BitmapIndexedNode(ownerID,1<<idx1|1<<idx2,nodes);}function createNodes(ownerID,entries,key,value){if(!ownerID){ownerID=new OwnerID();}var node=new ValueNode(ownerID,hash(key),[key,value]);for(var ii=0;ii<entries.length;ii++){var entry=entries[ii];node=node.update(ownerID,0,undefined,entry[0],entry[1]);}return node;}function packNodes(ownerID,nodes,count,excluding){var bitmap=0;var packedII=0;var packedNodes=new Array(count);for(var ii=0,bit=1,len=nodes.length;ii<len;ii++,bit<<=1){var node=nodes[ii];if(node!==undefined&&ii!==excluding){bitmap|=bit;packedNodes[packedII++]=node;}}return new BitmapIndexedNode(ownerID,bitmap,packedNodes);}function expandNodes(ownerID,nodes,bitmap,including,node){var count=0;var expandedNodes=new Array(SIZE);for(var ii=0;bitmap!==0;ii++,bitmap>>>=1){expandedNodes[ii]=bitmap&1?nodes[count++]:undefined;}expandedNodes[including]=node;return new HashArrayMapNode(ownerID,count+1,expandedNodes);}function mergeIntoMapWith(map,merger,iterables){var iters=[];for(var ii=0;ii<iterables.length;ii++){var value=iterables[ii];var iter=KeyedIterable(value);if(!isIterable(value)){iter=iter.map(function(v){return fromJS(v);});}iters.push(iter);}return mergeIntoCollectionWith(map,merger,iters);}function deepMerger(existing,value,key){return existing&&existing.mergeDeep&&isIterable(value)?existing.mergeDeep(value):is(existing,value)?existing:value;}function deepMergerWith(merger){return function(existing,value,key){if(existing&&existing.mergeDeepWith&&isIterable(value)){return existing.mergeDeepWith(merger,value);}var nextValue=merger(existing,value,key);return is(existing,nextValue)?existing:nextValue;};}function mergeIntoCollectionWith(collection,merger,iters){iters=iters.filter(function(x){return x.size!==0;});if(iters.length===0){return collection;}if(collection.size===0&&!collection.__ownerID&&iters.length===1){return collection.constructor(iters[0]);}return collection.withMutations(function(collection){var mergeIntoMap=merger?function(value,key){collection.update(key,NOT_SET,function(existing){return existing===NOT_SET?value:merger(existing,value,key);});}:function(value,key){collection.set(key,value);};for(var ii=0;ii<iters.length;ii++){iters[ii].forEach(mergeIntoMap);}});}function updateInDeepMap(existing,keyPathIter,notSetValue,updater){var isNotSet=existing===NOT_SET;var step=keyPathIter.next();if(step.done){var existingValue=isNotSet?notSetValue:existing;var newValue=updater(existingValue);return newValue===existingValue?existing:newValue;}invariant(isNotSet||existing&&existing.set,'invalid keyPath');var key=step.value;var nextExisting=isNotSet?NOT_SET:existing.get(key,NOT_SET);var nextUpdated=updateInDeepMap(nextExisting,keyPathIter,notSetValue,updater);return nextUpdated===nextExisting?existing:nextUpdated===NOT_SET?existing.remove(key):(isNotSet?emptyMap():existing).set(key,nextUpdated);}function popCount(x){x=x-(x>>1&0x55555555);x=(x&0x33333333)+(x>>2&0x33333333);x=x+(x>>4)&0x0f0f0f0f;x=x+(x>>8);x=x+(x>>16);return x&0x7f;}function setIn(array,idx,val,canEdit){var newArray=canEdit?array:arrCopy(array);newArray[idx]=val;return newArray;}function spliceIn(array,idx,val,canEdit){var newLen=array.length+1;if(canEdit&&idx+1===newLen){array[idx]=val;return array;}var newArray=new Array(newLen);var after=0;for(var ii=0;ii<newLen;ii++){if(ii===idx){newArray[ii]=val;after=-1;}else {newArray[ii]=array[ii+after];}}return newArray;}function spliceOut(array,idx,canEdit){var newLen=array.length-1;if(canEdit&&idx===newLen){array.pop();return array;}var newArray=new Array(newLen);var after=0;for(var ii=0;ii<newLen;ii++){if(ii===idx){after=1;}newArray[ii]=array[ii+after];}return newArray;}var MAX_ARRAY_MAP_SIZE=SIZE/4;var MAX_BITMAP_INDEXED_SIZE=SIZE/2;var MIN_HASH_ARRAY_MAP_SIZE=SIZE/4;createClass(List,IndexedCollection); // @pragma Construction
	function List(value){var empty=emptyList();if(value===null||value===undefined){return empty;}if(isList(value)){return value;}var iter=IndexedIterable(value);var size=iter.size;if(size===0){return empty;}assertNotInfinite(size);if(size>0&&size<SIZE){return makeList(0,size,SHIFT,null,new VNode(iter.toArray()));}return empty.withMutations(function(list){list.setSize(size);iter.forEach(function(v,i){return list.set(i,v);});});}List.of=function() /*...values*/{return this(arguments);};List.prototype.toString=function(){return this.__toString('List [',']');}; // @pragma Access
	List.prototype.get=function(index,notSetValue){index=wrapIndex(this,index);if(index>=0&&index<this.size){index+=this._origin;var node=listNodeFor(this,index);return node&&node.array[index&MASK];}return notSetValue;}; // @pragma Modification
	List.prototype.set=function(index,value){return updateList(this,index,value);};List.prototype.remove=function(index){return !this.has(index)?this:index===0?this.shift():index===this.size-1?this.pop():this.splice(index,1);};List.prototype.insert=function(index,value){return this.splice(index,0,value);};List.prototype.clear=function(){if(this.size===0){return this;}if(this.__ownerID){this.size=this._origin=this._capacity=0;this._level=SHIFT;this._root=this._tail=null;this.__hash=undefined;this.__altered=true;return this;}return emptyList();};List.prototype.push=function() /*...values*/{var values=arguments;var oldSize=this.size;return this.withMutations(function(list){setListBounds(list,0,oldSize+values.length);for(var ii=0;ii<values.length;ii++){list.set(oldSize+ii,values[ii]);}});};List.prototype.pop=function(){return setListBounds(this,0,-1);};List.prototype.unshift=function() /*...values*/{var values=arguments;return this.withMutations(function(list){setListBounds(list,-values.length);for(var ii=0;ii<values.length;ii++){list.set(ii,values[ii]);}});};List.prototype.shift=function(){return setListBounds(this,1);}; // @pragma Composition
	List.prototype.merge=function() /*...iters*/{return mergeIntoListWith(this,undefined,arguments);};List.prototype.mergeWith=function(merger){var iters=SLICE$0.call(arguments,1);return mergeIntoListWith(this,merger,iters);};List.prototype.mergeDeep=function() /*...iters*/{return mergeIntoListWith(this,deepMerger,arguments);};List.prototype.mergeDeepWith=function(merger){var iters=SLICE$0.call(arguments,1);return mergeIntoListWith(this,deepMergerWith(merger),iters);};List.prototype.setSize=function(size){return setListBounds(this,0,size);}; // @pragma Iteration
	List.prototype.slice=function(begin,end){var size=this.size;if(wholeSlice(begin,end,size)){return this;}return setListBounds(this,resolveBegin(begin,size),resolveEnd(end,size));};List.prototype.__iterator=function(type,reverse){var index=0;var values=iterateList(this,reverse);return new Iterator(function(){var value=values();return value===DONE?iteratorDone():iteratorValue(type,index++,value);});};List.prototype.__iterate=function(fn,reverse){var index=0;var values=iterateList(this,reverse);var value;while((value=values())!==DONE){if(fn(value,index++,this)===false){break;}}return index;};List.prototype.__ensureOwner=function(ownerID){if(ownerID===this.__ownerID){return this;}if(!ownerID){this.__ownerID=ownerID;return this;}return makeList(this._origin,this._capacity,this._level,this._root,this._tail,ownerID,this.__hash);};function isList(maybeList){return !!(maybeList&&maybeList[IS_LIST_SENTINEL]);}List.isList=isList;var IS_LIST_SENTINEL='@@__IMMUTABLE_LIST__@@';var ListPrototype=List.prototype;ListPrototype[IS_LIST_SENTINEL]=true;ListPrototype[DELETE]=ListPrototype.remove;ListPrototype.setIn=MapPrototype.setIn;ListPrototype.deleteIn=ListPrototype.removeIn=MapPrototype.removeIn;ListPrototype.update=MapPrototype.update;ListPrototype.updateIn=MapPrototype.updateIn;ListPrototype.mergeIn=MapPrototype.mergeIn;ListPrototype.mergeDeepIn=MapPrototype.mergeDeepIn;ListPrototype.withMutations=MapPrototype.withMutations;ListPrototype.asMutable=MapPrototype.asMutable;ListPrototype.asImmutable=MapPrototype.asImmutable;ListPrototype.wasAltered=MapPrototype.wasAltered;function VNode(array,ownerID){this.array=array;this.ownerID=ownerID;} // TODO: seems like these methods are very similar
	VNode.prototype.removeBefore=function(ownerID,level,index){if(index===level?1<<level:0||this.array.length===0){return this;}var originIndex=index>>>level&MASK;if(originIndex>=this.array.length){return new VNode([],ownerID);}var removingFirst=originIndex===0;var newChild;if(level>0){var oldChild=this.array[originIndex];newChild=oldChild&&oldChild.removeBefore(ownerID,level-SHIFT,index);if(newChild===oldChild&&removingFirst){return this;}}if(removingFirst&&!newChild){return this;}var editable=editableVNode(this,ownerID);if(!removingFirst){for(var ii=0;ii<originIndex;ii++){editable.array[ii]=undefined;}}if(newChild){editable.array[originIndex]=newChild;}return editable;};VNode.prototype.removeAfter=function(ownerID,level,index){if(index===(level?1<<level:0)||this.array.length===0){return this;}var sizeIndex=index-1>>>level&MASK;if(sizeIndex>=this.array.length){return this;}var newChild;if(level>0){var oldChild=this.array[sizeIndex];newChild=oldChild&&oldChild.removeAfter(ownerID,level-SHIFT,index);if(newChild===oldChild&&sizeIndex===this.array.length-1){return this;}}var editable=editableVNode(this,ownerID);editable.array.splice(sizeIndex+1);if(newChild){editable.array[sizeIndex]=newChild;}return editable;};var DONE={};function iterateList(list,reverse){var left=list._origin;var right=list._capacity;var tailPos=getTailOffset(right);var tail=list._tail;return iterateNodeOrLeaf(list._root,list._level,0);function iterateNodeOrLeaf(node,level,offset){return level===0?iterateLeaf(node,offset):iterateNode(node,level,offset);}function iterateLeaf(node,offset){var array=offset===tailPos?tail&&tail.array:node&&node.array;var from=offset>left?0:left-offset;var to=right-offset;if(to>SIZE){to=SIZE;}return function(){if(from===to){return DONE;}var idx=reverse?--to:from++;return array&&array[idx];};}function iterateNode(node,level,offset){var values;var array=node&&node.array;var from=offset>left?0:left-offset>>level;var to=(right-offset>>level)+1;if(to>SIZE){to=SIZE;}return function(){do {if(values){var value=values();if(value!==DONE){return value;}values=null;}if(from===to){return DONE;}var idx=reverse?--to:from++;values=iterateNodeOrLeaf(array&&array[idx],level-SHIFT,offset+(idx<<level));}while(true);};}}function makeList(origin,capacity,level,root,tail,ownerID,hash){var list=Object.create(ListPrototype);list.size=capacity-origin;list._origin=origin;list._capacity=capacity;list._level=level;list._root=root;list._tail=tail;list.__ownerID=ownerID;list.__hash=hash;list.__altered=false;return list;}var EMPTY_LIST;function emptyList(){return EMPTY_LIST||(EMPTY_LIST=makeList(0,0,SHIFT));}function updateList(list,index,value){index=wrapIndex(list,index);if(index!==index){return list;}if(index>=list.size||index<0){return list.withMutations(function(list){index<0?setListBounds(list,index).set(0,value):setListBounds(list,0,index+1).set(index,value);});}index+=list._origin;var newTail=list._tail;var newRoot=list._root;var didAlter=MakeRef(DID_ALTER);if(index>=getTailOffset(list._capacity)){newTail=updateVNode(newTail,list.__ownerID,0,index,value,didAlter);}else {newRoot=updateVNode(newRoot,list.__ownerID,list._level,index,value,didAlter);}if(!didAlter.value){return list;}if(list.__ownerID){list._root=newRoot;list._tail=newTail;list.__hash=undefined;list.__altered=true;return list;}return makeList(list._origin,list._capacity,list._level,newRoot,newTail);}function updateVNode(node,ownerID,level,index,value,didAlter){var idx=index>>>level&MASK;var nodeHas=node&&idx<node.array.length;if(!nodeHas&&value===undefined){return node;}var newNode;if(level>0){var lowerNode=node&&node.array[idx];var newLowerNode=updateVNode(lowerNode,ownerID,level-SHIFT,index,value,didAlter);if(newLowerNode===lowerNode){return node;}newNode=editableVNode(node,ownerID);newNode.array[idx]=newLowerNode;return newNode;}if(nodeHas&&node.array[idx]===value){return node;}SetRef(didAlter);newNode=editableVNode(node,ownerID);if(value===undefined&&idx===newNode.array.length-1){newNode.array.pop();}else {newNode.array[idx]=value;}return newNode;}function editableVNode(node,ownerID){if(ownerID&&node&&ownerID===node.ownerID){return node;}return new VNode(node?node.array.slice():[],ownerID);}function listNodeFor(list,rawIndex){if(rawIndex>=getTailOffset(list._capacity)){return list._tail;}if(rawIndex<1<<list._level+SHIFT){var node=list._root;var level=list._level;while(node&&level>0){node=node.array[rawIndex>>>level&MASK];level-=SHIFT;}return node;}}function setListBounds(list,begin,end){ // Sanitize begin & end using this shorthand for ToInt32(argument)
	// http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	if(begin!==undefined){begin=begin|0;}if(end!==undefined){end=end|0;}var owner=list.__ownerID||new OwnerID();var oldOrigin=list._origin;var oldCapacity=list._capacity;var newOrigin=oldOrigin+begin;var newCapacity=end===undefined?oldCapacity:end<0?oldCapacity+end:oldOrigin+end;if(newOrigin===oldOrigin&&newCapacity===oldCapacity){return list;} // If it's going to end after it starts, it's empty.
	if(newOrigin>=newCapacity){return list.clear();}var newLevel=list._level;var newRoot=list._root; // New origin might need creating a higher root.
	var offsetShift=0;while(newOrigin+offsetShift<0){newRoot=new VNode(newRoot&&newRoot.array.length?[undefined,newRoot]:[],owner);newLevel+=SHIFT;offsetShift+=1<<newLevel;}if(offsetShift){newOrigin+=offsetShift;oldOrigin+=offsetShift;newCapacity+=offsetShift;oldCapacity+=offsetShift;}var oldTailOffset=getTailOffset(oldCapacity);var newTailOffset=getTailOffset(newCapacity); // New size might need creating a higher root.
	while(newTailOffset>=1<<newLevel+SHIFT){newRoot=new VNode(newRoot&&newRoot.array.length?[newRoot]:[],owner);newLevel+=SHIFT;} // Locate or create the new tail.
	var oldTail=list._tail;var newTail=newTailOffset<oldTailOffset?listNodeFor(list,newCapacity-1):newTailOffset>oldTailOffset?new VNode([],owner):oldTail; // Merge Tail into tree.
	if(oldTail&&newTailOffset>oldTailOffset&&newOrigin<oldCapacity&&oldTail.array.length){newRoot=editableVNode(newRoot,owner);var node=newRoot;for(var level=newLevel;level>SHIFT;level-=SHIFT){var idx=oldTailOffset>>>level&MASK;node=node.array[idx]=editableVNode(node.array[idx],owner);}node.array[oldTailOffset>>>SHIFT&MASK]=oldTail;} // If the size has been reduced, there's a chance the tail needs to be trimmed.
	if(newCapacity<oldCapacity){newTail=newTail&&newTail.removeAfter(owner,0,newCapacity);} // If the new origin is within the tail, then we do not need a root.
	if(newOrigin>=newTailOffset){newOrigin-=newTailOffset;newCapacity-=newTailOffset;newLevel=SHIFT;newRoot=null;newTail=newTail&&newTail.removeBefore(owner,0,newOrigin); // Otherwise, if the root has been trimmed, garbage collect.
	}else if(newOrigin>oldOrigin||newTailOffset<oldTailOffset){offsetShift=0; // Identify the new top root node of the subtree of the old root.
	while(newRoot){var beginIndex=newOrigin>>>newLevel&MASK;if(beginIndex!==newTailOffset>>>newLevel&MASK){break;}if(beginIndex){offsetShift+=(1<<newLevel)*beginIndex;}newLevel-=SHIFT;newRoot=newRoot.array[beginIndex];} // Trim the new sides of the new root.
	if(newRoot&&newOrigin>oldOrigin){newRoot=newRoot.removeBefore(owner,newLevel,newOrigin-offsetShift);}if(newRoot&&newTailOffset<oldTailOffset){newRoot=newRoot.removeAfter(owner,newLevel,newTailOffset-offsetShift);}if(offsetShift){newOrigin-=offsetShift;newCapacity-=offsetShift;}}if(list.__ownerID){list.size=newCapacity-newOrigin;list._origin=newOrigin;list._capacity=newCapacity;list._level=newLevel;list._root=newRoot;list._tail=newTail;list.__hash=undefined;list.__altered=true;return list;}return makeList(newOrigin,newCapacity,newLevel,newRoot,newTail);}function mergeIntoListWith(list,merger,iterables){var iters=[];var maxSize=0;for(var ii=0;ii<iterables.length;ii++){var value=iterables[ii];var iter=IndexedIterable(value);if(iter.size>maxSize){maxSize=iter.size;}if(!isIterable(value)){iter=iter.map(function(v){return fromJS(v);});}iters.push(iter);}if(maxSize>list.size){list=list.setSize(maxSize);}return mergeIntoCollectionWith(list,merger,iters);}function getTailOffset(size){return size<SIZE?0:size-1>>>SHIFT<<SHIFT;}createClass(OrderedMap,Map); // @pragma Construction
	function OrderedMap(value){return value===null||value===undefined?emptyOrderedMap():isOrderedMap(value)?value:emptyOrderedMap().withMutations(function(map){var iter=KeyedIterable(value);assertNotInfinite(iter.size);iter.forEach(function(v,k){return map.set(k,v);});});}OrderedMap.of=function() /*...values*/{return this(arguments);};OrderedMap.prototype.toString=function(){return this.__toString('OrderedMap {','}');}; // @pragma Access
	OrderedMap.prototype.get=function(k,notSetValue){var index=this._map.get(k);return index!==undefined?this._list.get(index)[1]:notSetValue;}; // @pragma Modification
	OrderedMap.prototype.clear=function(){if(this.size===0){return this;}if(this.__ownerID){this.size=0;this._map.clear();this._list.clear();return this;}return emptyOrderedMap();};OrderedMap.prototype.set=function(k,v){return updateOrderedMap(this,k,v);};OrderedMap.prototype.remove=function(k){return updateOrderedMap(this,k,NOT_SET);};OrderedMap.prototype.wasAltered=function(){return this._map.wasAltered()||this._list.wasAltered();};OrderedMap.prototype.__iterate=function(fn,reverse){var this$0=this;return this._list.__iterate(function(entry){return entry&&fn(entry[1],entry[0],this$0);},reverse);};OrderedMap.prototype.__iterator=function(type,reverse){return this._list.fromEntrySeq().__iterator(type,reverse);};OrderedMap.prototype.__ensureOwner=function(ownerID){if(ownerID===this.__ownerID){return this;}var newMap=this._map.__ensureOwner(ownerID);var newList=this._list.__ensureOwner(ownerID);if(!ownerID){this.__ownerID=ownerID;this._map=newMap;this._list=newList;return this;}return makeOrderedMap(newMap,newList,ownerID,this.__hash);};function isOrderedMap(maybeOrderedMap){return isMap(maybeOrderedMap)&&isOrdered(maybeOrderedMap);}OrderedMap.isOrderedMap=isOrderedMap;OrderedMap.prototype[IS_ORDERED_SENTINEL]=true;OrderedMap.prototype[DELETE]=OrderedMap.prototype.remove;function makeOrderedMap(map,list,ownerID,hash){var omap=Object.create(OrderedMap.prototype);omap.size=map?map.size:0;omap._map=map;omap._list=list;omap.__ownerID=ownerID;omap.__hash=hash;return omap;}var EMPTY_ORDERED_MAP;function emptyOrderedMap(){return EMPTY_ORDERED_MAP||(EMPTY_ORDERED_MAP=makeOrderedMap(emptyMap(),emptyList()));}function updateOrderedMap(omap,k,v){var map=omap._map;var list=omap._list;var i=map.get(k);var has=i!==undefined;var newMap;var newList;if(v===NOT_SET){ // removed
	if(!has){return omap;}if(list.size>=SIZE&&list.size>=map.size*2){newList=list.filter(function(entry,idx){return entry!==undefined&&i!==idx;});newMap=newList.toKeyedSeq().map(function(entry){return entry[0];}).flip().toMap();if(omap.__ownerID){newMap.__ownerID=newList.__ownerID=omap.__ownerID;}}else {newMap=map.remove(k);newList=i===list.size-1?list.pop():list.set(i,undefined);}}else {if(has){if(v===list.get(i)[1]){return omap;}newMap=map;newList=list.set(i,[k,v]);}else {newMap=map.set(k,list.size);newList=list.set(list.size,[k,v]);}}if(omap.__ownerID){omap.size=newMap.size;omap._map=newMap;omap._list=newList;omap.__hash=undefined;return omap;}return makeOrderedMap(newMap,newList);}createClass(ToKeyedSequence,KeyedSeq);function ToKeyedSequence(indexed,useKeys){this._iter=indexed;this._useKeys=useKeys;this.size=indexed.size;}ToKeyedSequence.prototype.get=function(key,notSetValue){return this._iter.get(key,notSetValue);};ToKeyedSequence.prototype.has=function(key){return this._iter.has(key);};ToKeyedSequence.prototype.valueSeq=function(){return this._iter.valueSeq();};ToKeyedSequence.prototype.reverse=function(){var this$0=this;var reversedSequence=reverseFactory(this,true);if(!this._useKeys){reversedSequence.valueSeq=function(){return this$0._iter.toSeq().reverse();};}return reversedSequence;};ToKeyedSequence.prototype.map=function(mapper,context){var this$0=this;var mappedSequence=mapFactory(this,mapper,context);if(!this._useKeys){mappedSequence.valueSeq=function(){return this$0._iter.toSeq().map(mapper,context);};}return mappedSequence;};ToKeyedSequence.prototype.__iterate=function(fn,reverse){var this$0=this;var ii;return this._iter.__iterate(this._useKeys?function(v,k){return fn(v,k,this$0);}:(ii=reverse?resolveSize(this):0,function(v){return fn(v,reverse?--ii:ii++,this$0);}),reverse);};ToKeyedSequence.prototype.__iterator=function(type,reverse){if(this._useKeys){return this._iter.__iterator(type,reverse);}var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);var ii=reverse?resolveSize(this):0;return new Iterator(function(){var step=iterator.next();return step.done?step:iteratorValue(type,reverse?--ii:ii++,step.value,step);});};ToKeyedSequence.prototype[IS_ORDERED_SENTINEL]=true;createClass(ToIndexedSequence,IndexedSeq);function ToIndexedSequence(iter){this._iter=iter;this.size=iter.size;}ToIndexedSequence.prototype.includes=function(value){return this._iter.includes(value);};ToIndexedSequence.prototype.__iterate=function(fn,reverse){var this$0=this;var iterations=0;return this._iter.__iterate(function(v){return fn(v,iterations++,this$0);},reverse);};ToIndexedSequence.prototype.__iterator=function(type,reverse){var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);var iterations=0;return new Iterator(function(){var step=iterator.next();return step.done?step:iteratorValue(type,iterations++,step.value,step);});};createClass(ToSetSequence,SetSeq);function ToSetSequence(iter){this._iter=iter;this.size=iter.size;}ToSetSequence.prototype.has=function(key){return this._iter.includes(key);};ToSetSequence.prototype.__iterate=function(fn,reverse){var this$0=this;return this._iter.__iterate(function(v){return fn(v,v,this$0);},reverse);};ToSetSequence.prototype.__iterator=function(type,reverse){var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);return new Iterator(function(){var step=iterator.next();return step.done?step:iteratorValue(type,step.value,step.value,step);});};createClass(FromEntriesSequence,KeyedSeq);function FromEntriesSequence(entries){this._iter=entries;this.size=entries.size;}FromEntriesSequence.prototype.entrySeq=function(){return this._iter.toSeq();};FromEntriesSequence.prototype.__iterate=function(fn,reverse){var this$0=this;return this._iter.__iterate(function(entry){ // Check if entry exists first so array access doesn't throw for holes
	// in the parent iteration.
	if(entry){validateEntry(entry);var indexedIterable=isIterable(entry);return fn(indexedIterable?entry.get(1):entry[1],indexedIterable?entry.get(0):entry[0],this$0);}},reverse);};FromEntriesSequence.prototype.__iterator=function(type,reverse){var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);return new Iterator(function(){while(true){var step=iterator.next();if(step.done){return step;}var entry=step.value; // Check if entry exists first so array access doesn't throw for holes
	// in the parent iteration.
	if(entry){validateEntry(entry);var indexedIterable=isIterable(entry);return iteratorValue(type,indexedIterable?entry.get(0):entry[0],indexedIterable?entry.get(1):entry[1],step);}}});};ToIndexedSequence.prototype.cacheResult=ToKeyedSequence.prototype.cacheResult=ToSetSequence.prototype.cacheResult=FromEntriesSequence.prototype.cacheResult=cacheResultThrough;function flipFactory(iterable){var flipSequence=makeSequence(iterable);flipSequence._iter=iterable;flipSequence.size=iterable.size;flipSequence.flip=function(){return iterable;};flipSequence.reverse=function(){var reversedSequence=iterable.reverse.apply(this); // super.reverse()
	reversedSequence.flip=function(){return iterable.reverse();};return reversedSequence;};flipSequence.has=function(key){return iterable.includes(key);};flipSequence.includes=function(key){return iterable.has(key);};flipSequence.cacheResult=cacheResultThrough;flipSequence.__iterateUncached=function(fn,reverse){var this$0=this;return iterable.__iterate(function(v,k){return fn(k,v,this$0)!==false;},reverse);};flipSequence.__iteratorUncached=function(type,reverse){if(type===ITERATE_ENTRIES){var iterator=iterable.__iterator(type,reverse);return new Iterator(function(){var step=iterator.next();if(!step.done){var k=step.value[0];step.value[0]=step.value[1];step.value[1]=k;}return step;});}return iterable.__iterator(type===ITERATE_VALUES?ITERATE_KEYS:ITERATE_VALUES,reverse);};return flipSequence;}function mapFactory(iterable,mapper,context){var mappedSequence=makeSequence(iterable);mappedSequence.size=iterable.size;mappedSequence.has=function(key){return iterable.has(key);};mappedSequence.get=function(key,notSetValue){var v=iterable.get(key,NOT_SET);return v===NOT_SET?notSetValue:mapper.call(context,v,key,iterable);};mappedSequence.__iterateUncached=function(fn,reverse){var this$0=this;return iterable.__iterate(function(v,k,c){return fn(mapper.call(context,v,k,c),k,this$0)!==false;},reverse);};mappedSequence.__iteratorUncached=function(type,reverse){var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);return new Iterator(function(){var step=iterator.next();if(step.done){return step;}var entry=step.value;var key=entry[0];return iteratorValue(type,key,mapper.call(context,entry[1],key,iterable),step);});};return mappedSequence;}function reverseFactory(iterable,useKeys){var reversedSequence=makeSequence(iterable);reversedSequence._iter=iterable;reversedSequence.size=iterable.size;reversedSequence.reverse=function(){return iterable;};if(iterable.flip){reversedSequence.flip=function(){var flipSequence=flipFactory(iterable);flipSequence.reverse=function(){return iterable.flip();};return flipSequence;};}reversedSequence.get=function(key,notSetValue){return iterable.get(useKeys?key:-1-key,notSetValue);};reversedSequence.has=function(key){return iterable.has(useKeys?key:-1-key);};reversedSequence.includes=function(value){return iterable.includes(value);};reversedSequence.cacheResult=cacheResultThrough;reversedSequence.__iterate=function(fn,reverse){var this$0=this;return iterable.__iterate(function(v,k){return fn(v,k,this$0);},!reverse);};reversedSequence.__iterator=function(type,reverse){return iterable.__iterator(type,!reverse);};return reversedSequence;}function filterFactory(iterable,predicate,context,useKeys){var filterSequence=makeSequence(iterable);if(useKeys){filterSequence.has=function(key){var v=iterable.get(key,NOT_SET);return v!==NOT_SET&&!!predicate.call(context,v,key,iterable);};filterSequence.get=function(key,notSetValue){var v=iterable.get(key,NOT_SET);return v!==NOT_SET&&predicate.call(context,v,key,iterable)?v:notSetValue;};}filterSequence.__iterateUncached=function(fn,reverse){var this$0=this;var iterations=0;iterable.__iterate(function(v,k,c){if(predicate.call(context,v,k,c)){iterations++;return fn(v,useKeys?k:iterations-1,this$0);}},reverse);return iterations;};filterSequence.__iteratorUncached=function(type,reverse){var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);var iterations=0;return new Iterator(function(){while(true){var step=iterator.next();if(step.done){return step;}var entry=step.value;var key=entry[0];var value=entry[1];if(predicate.call(context,value,key,iterable)){return iteratorValue(type,useKeys?key:iterations++,value,step);}}});};return filterSequence;}function countByFactory(iterable,grouper,context){var groups=Map().asMutable();iterable.__iterate(function(v,k){groups.update(grouper.call(context,v,k,iterable),0,function(a){return a+1;});});return groups.asImmutable();}function groupByFactory(iterable,grouper,context){var isKeyedIter=isKeyed(iterable);var groups=(isOrdered(iterable)?OrderedMap():Map()).asMutable();iterable.__iterate(function(v,k){groups.update(grouper.call(context,v,k,iterable),function(a){return a=a||[],a.push(isKeyedIter?[k,v]:v),a;});});var coerce=iterableClass(iterable);return groups.map(function(arr){return reify(iterable,coerce(arr));});}function sliceFactory(iterable,begin,end,useKeys){var originalSize=iterable.size; // Sanitize begin & end using this shorthand for ToInt32(argument)
	// http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	if(begin!==undefined){begin=begin|0;}if(end!==undefined){end=end|0;}if(wholeSlice(begin,end,originalSize)){return iterable;}var resolvedBegin=resolveBegin(begin,originalSize);var resolvedEnd=resolveEnd(end,originalSize); // begin or end will be NaN if they were provided as negative numbers and
	// this iterable's size is unknown. In that case, cache first so there is
	// a known size and these do not resolve to NaN.
	if(resolvedBegin!==resolvedBegin||resolvedEnd!==resolvedEnd){return sliceFactory(iterable.toSeq().cacheResult(),begin,end,useKeys);} // Note: resolvedEnd is undefined when the original sequence's length is
	// unknown and this slice did not supply an end and should contain all
	// elements after resolvedBegin.
	// In that case, resolvedSize will be NaN and sliceSize will remain undefined.
	var resolvedSize=resolvedEnd-resolvedBegin;var sliceSize;if(resolvedSize===resolvedSize){sliceSize=resolvedSize<0?0:resolvedSize;}var sliceSeq=makeSequence(iterable); // If iterable.size is undefined, the size of the realized sliceSeq is
	// unknown at this point unless the number of items to slice is 0
	sliceSeq.size=sliceSize===0?sliceSize:iterable.size&&sliceSize||undefined;if(!useKeys&&isSeq(iterable)&&sliceSize>=0){sliceSeq.get=function(index,notSetValue){index=wrapIndex(this,index);return index>=0&&index<sliceSize?iterable.get(index+resolvedBegin,notSetValue):notSetValue;};}sliceSeq.__iterateUncached=function(fn,reverse){var this$0=this;if(sliceSize===0){return 0;}if(reverse){return this.cacheResult().__iterate(fn,reverse);}var skipped=0;var isSkipping=true;var iterations=0;iterable.__iterate(function(v,k){if(!(isSkipping&&(isSkipping=skipped++<resolvedBegin))){iterations++;return fn(v,useKeys?k:iterations-1,this$0)!==false&&iterations!==sliceSize;}});return iterations;};sliceSeq.__iteratorUncached=function(type,reverse){if(sliceSize!==0&&reverse){return this.cacheResult().__iterator(type,reverse);} // Don't bother instantiating parent iterator if taking 0.
	var iterator=sliceSize!==0&&iterable.__iterator(type,reverse);var skipped=0;var iterations=0;return new Iterator(function(){while(skipped++<resolvedBegin){iterator.next();}if(++iterations>sliceSize){return iteratorDone();}var step=iterator.next();if(useKeys||type===ITERATE_VALUES){return step;}else if(type===ITERATE_KEYS){return iteratorValue(type,iterations-1,undefined,step);}else {return iteratorValue(type,iterations-1,step.value[1],step);}});};return sliceSeq;}function takeWhileFactory(iterable,predicate,context){var takeSequence=makeSequence(iterable);takeSequence.__iterateUncached=function(fn,reverse){var this$0=this;if(reverse){return this.cacheResult().__iterate(fn,reverse);}var iterations=0;iterable.__iterate(function(v,k,c){return predicate.call(context,v,k,c)&&++iterations&&fn(v,k,this$0);});return iterations;};takeSequence.__iteratorUncached=function(type,reverse){var this$0=this;if(reverse){return this.cacheResult().__iterator(type,reverse);}var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);var iterating=true;return new Iterator(function(){if(!iterating){return iteratorDone();}var step=iterator.next();if(step.done){return step;}var entry=step.value;var k=entry[0];var v=entry[1];if(!predicate.call(context,v,k,this$0)){iterating=false;return iteratorDone();}return type===ITERATE_ENTRIES?step:iteratorValue(type,k,v,step);});};return takeSequence;}function skipWhileFactory(iterable,predicate,context,useKeys){var skipSequence=makeSequence(iterable);skipSequence.__iterateUncached=function(fn,reverse){var this$0=this;if(reverse){return this.cacheResult().__iterate(fn,reverse);}var isSkipping=true;var iterations=0;iterable.__iterate(function(v,k,c){if(!(isSkipping&&(isSkipping=predicate.call(context,v,k,c)))){iterations++;return fn(v,useKeys?k:iterations-1,this$0);}});return iterations;};skipSequence.__iteratorUncached=function(type,reverse){var this$0=this;if(reverse){return this.cacheResult().__iterator(type,reverse);}var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);var skipping=true;var iterations=0;return new Iterator(function(){var step,k,v;do {step=iterator.next();if(step.done){if(useKeys||type===ITERATE_VALUES){return step;}else if(type===ITERATE_KEYS){return iteratorValue(type,iterations++,undefined,step);}else {return iteratorValue(type,iterations++,step.value[1],step);}}var entry=step.value;k=entry[0];v=entry[1];skipping&&(skipping=predicate.call(context,v,k,this$0));}while(skipping);return type===ITERATE_ENTRIES?step:iteratorValue(type,k,v,step);});};return skipSequence;}function concatFactory(iterable,values){var isKeyedIterable=isKeyed(iterable);var iters=[iterable].concat(values).map(function(v){if(!isIterable(v)){v=isKeyedIterable?keyedSeqFromValue(v):indexedSeqFromValue(Array.isArray(v)?v:[v]);}else if(isKeyedIterable){v=KeyedIterable(v);}return v;}).filter(function(v){return v.size!==0;});if(iters.length===0){return iterable;}if(iters.length===1){var singleton=iters[0];if(singleton===iterable||isKeyedIterable&&isKeyed(singleton)||isIndexed(iterable)&&isIndexed(singleton)){return singleton;}}var concatSeq=new ArraySeq(iters);if(isKeyedIterable){concatSeq=concatSeq.toKeyedSeq();}else if(!isIndexed(iterable)){concatSeq=concatSeq.toSetSeq();}concatSeq=concatSeq.flatten(true);concatSeq.size=iters.reduce(function(sum,seq){if(sum!==undefined){var size=seq.size;if(size!==undefined){return sum+size;}}},0);return concatSeq;}function flattenFactory(iterable,depth,useKeys){var flatSequence=makeSequence(iterable);flatSequence.__iterateUncached=function(fn,reverse){var iterations=0;var stopped=false;function flatDeep(iter,currentDepth){var this$0=this;iter.__iterate(function(v,k){if((!depth||currentDepth<depth)&&isIterable(v)){flatDeep(v,currentDepth+1);}else if(fn(v,useKeys?k:iterations++,this$0)===false){stopped=true;}return !stopped;},reverse);}flatDeep(iterable,0);return iterations;};flatSequence.__iteratorUncached=function(type,reverse){var iterator=iterable.__iterator(type,reverse);var stack=[];var iterations=0;return new Iterator(function(){while(iterator){var step=iterator.next();if(step.done!==false){iterator=stack.pop();continue;}var v=step.value;if(type===ITERATE_ENTRIES){v=v[1];}if((!depth||stack.length<depth)&&isIterable(v)){stack.push(iterator);iterator=v.__iterator(type,reverse);}else {return useKeys?step:iteratorValue(type,iterations++,v,step);}}return iteratorDone();});};return flatSequence;}function flatMapFactory(iterable,mapper,context){var coerce=iterableClass(iterable);return iterable.toSeq().map(function(v,k){return coerce(mapper.call(context,v,k,iterable));}).flatten(true);}function interposeFactory(iterable,separator){var interposedSequence=makeSequence(iterable);interposedSequence.size=iterable.size&&iterable.size*2-1;interposedSequence.__iterateUncached=function(fn,reverse){var this$0=this;var iterations=0;iterable.__iterate(function(v,k){return (!iterations||fn(separator,iterations++,this$0)!==false)&&fn(v,iterations++,this$0)!==false;},reverse);return iterations;};interposedSequence.__iteratorUncached=function(type,reverse){var iterator=iterable.__iterator(ITERATE_VALUES,reverse);var iterations=0;var step;return new Iterator(function(){if(!step||iterations%2){step=iterator.next();if(step.done){return step;}}return iterations%2?iteratorValue(type,iterations++,separator):iteratorValue(type,iterations++,step.value,step);});};return interposedSequence;}function sortFactory(iterable,comparator,mapper){if(!comparator){comparator=defaultComparator;}var isKeyedIterable=isKeyed(iterable);var index=0;var entries=iterable.toSeq().map(function(v,k){return [k,v,index++,mapper?mapper(v,k,iterable):v];}).toArray();entries.sort(function(a,b){return comparator(a[3],b[3])||a[2]-b[2];}).forEach(isKeyedIterable?function(v,i){entries[i].length=2;}:function(v,i){entries[i]=v[1];});return isKeyedIterable?KeyedSeq(entries):isIndexed(iterable)?IndexedSeq(entries):SetSeq(entries);}function maxFactory(iterable,comparator,mapper){if(!comparator){comparator=defaultComparator;}if(mapper){var entry=iterable.toSeq().map(function(v,k){return [v,mapper(v,k,iterable)];}).reduce(function(a,b){return maxCompare(comparator,a[1],b[1])?b:a;});return entry&&entry[0];}else {return iterable.reduce(function(a,b){return maxCompare(comparator,a,b)?b:a;});}}function maxCompare(comparator,a,b){var comp=comparator(b,a); // b is considered the new max if the comparator declares them equal, but
	// they are not equal and b is in fact a nullish value.
	return comp===0&&b!==a&&(b===undefined||b===null||b!==b)||comp>0;}function zipWithFactory(keyIter,zipper,iters){var zipSequence=makeSequence(keyIter);zipSequence.size=new ArraySeq(iters).map(function(i){return i.size;}).min(); // Note: this a generic base implementation of __iterate in terms of
	// __iterator which may be more generically useful in the future.
	zipSequence.__iterate=function(fn,reverse){ /* generic:
	      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        iterations++;
	        if (fn(step.value[1], step.value[0], this) === false) {
	          break;
	        }
	      }
	      return iterations;
	      */ // indexed:
	var iterator=this.__iterator(ITERATE_VALUES,reverse);var step;var iterations=0;while(!(step=iterator.next()).done){if(fn(step.value,iterations++,this)===false){break;}}return iterations;};zipSequence.__iteratorUncached=function(type,reverse){var iterators=iters.map(function(i){return i=Iterable(i),getIterator(reverse?i.reverse():i);});var iterations=0;var isDone=false;return new Iterator(function(){var steps;if(!isDone){steps=iterators.map(function(i){return i.next();});isDone=steps.some(function(s){return s.done;});}if(isDone){return iteratorDone();}return iteratorValue(type,iterations++,zipper.apply(null,steps.map(function(s){return s.value;})));});};return zipSequence;} // #pragma Helper Functions
	function reify(iter,seq){return isSeq(iter)?seq:iter.constructor(seq);}function validateEntry(entry){if(entry!==Object(entry)){throw new TypeError('Expected [K, V] tuple: '+entry);}}function resolveSize(iter){assertNotInfinite(iter.size);return ensureSize(iter);}function iterableClass(iterable){return isKeyed(iterable)?KeyedIterable:isIndexed(iterable)?IndexedIterable:SetIterable;}function makeSequence(iterable){return Object.create((isKeyed(iterable)?KeyedSeq:isIndexed(iterable)?IndexedSeq:SetSeq).prototype);}function cacheResultThrough(){if(this._iter.cacheResult){this._iter.cacheResult();this.size=this._iter.size;return this;}else {return Seq.prototype.cacheResult.call(this);}}function defaultComparator(a,b){return a>b?1:a<b?-1:0;}function forceIterator(keyPath){var iter=getIterator(keyPath);if(!iter){ // Array might not be iterable in this environment, so we need a fallback
	// to our wrapped type.
	if(!isArrayLike(keyPath)){throw new TypeError('Expected iterable or array-like: '+keyPath);}iter=getIterator(Iterable(keyPath));}return iter;}createClass(Record,KeyedCollection);function Record(defaultValues,name){var hasInitialized;var RecordType=function Record(values){if(values instanceof RecordType){return values;}if(!(this instanceof RecordType)){return new RecordType(values);}if(!hasInitialized){hasInitialized=true;var keys=Object.keys(defaultValues);setProps(RecordTypePrototype,keys);RecordTypePrototype.size=keys.length;RecordTypePrototype._name=name;RecordTypePrototype._keys=keys;RecordTypePrototype._defaultValues=defaultValues;}this._map=Map(values);};var RecordTypePrototype=RecordType.prototype=Object.create(RecordPrototype);RecordTypePrototype.constructor=RecordType;return RecordType;}Record.prototype.toString=function(){return this.__toString(recordName(this)+' {','}');}; // @pragma Access
	Record.prototype.has=function(k){return this._defaultValues.hasOwnProperty(k);};Record.prototype.get=function(k,notSetValue){if(!this.has(k)){return notSetValue;}var defaultVal=this._defaultValues[k];return this._map?this._map.get(k,defaultVal):defaultVal;}; // @pragma Modification
	Record.prototype.clear=function(){if(this.__ownerID){this._map&&this._map.clear();return this;}var RecordType=this.constructor;return RecordType._empty||(RecordType._empty=makeRecord(this,emptyMap()));};Record.prototype.set=function(k,v){if(!this.has(k)){throw new Error('Cannot set unknown key "'+k+'" on '+recordName(this));}var newMap=this._map&&this._map.set(k,v);if(this.__ownerID||newMap===this._map){return this;}return makeRecord(this,newMap);};Record.prototype.remove=function(k){if(!this.has(k)){return this;}var newMap=this._map&&this._map.remove(k);if(this.__ownerID||newMap===this._map){return this;}return makeRecord(this,newMap);};Record.prototype.wasAltered=function(){return this._map.wasAltered();};Record.prototype.__iterator=function(type,reverse){var this$0=this;return KeyedIterable(this._defaultValues).map(function(_,k){return this$0.get(k);}).__iterator(type,reverse);};Record.prototype.__iterate=function(fn,reverse){var this$0=this;return KeyedIterable(this._defaultValues).map(function(_,k){return this$0.get(k);}).__iterate(fn,reverse);};Record.prototype.__ensureOwner=function(ownerID){if(ownerID===this.__ownerID){return this;}var newMap=this._map&&this._map.__ensureOwner(ownerID);if(!ownerID){this.__ownerID=ownerID;this._map=newMap;return this;}return makeRecord(this,newMap,ownerID);};var RecordPrototype=Record.prototype;RecordPrototype[DELETE]=RecordPrototype.remove;RecordPrototype.deleteIn=RecordPrototype.removeIn=MapPrototype.removeIn;RecordPrototype.merge=MapPrototype.merge;RecordPrototype.mergeWith=MapPrototype.mergeWith;RecordPrototype.mergeIn=MapPrototype.mergeIn;RecordPrototype.mergeDeep=MapPrototype.mergeDeep;RecordPrototype.mergeDeepWith=MapPrototype.mergeDeepWith;RecordPrototype.mergeDeepIn=MapPrototype.mergeDeepIn;RecordPrototype.setIn=MapPrototype.setIn;RecordPrototype.update=MapPrototype.update;RecordPrototype.updateIn=MapPrototype.updateIn;RecordPrototype.withMutations=MapPrototype.withMutations;RecordPrototype.asMutable=MapPrototype.asMutable;RecordPrototype.asImmutable=MapPrototype.asImmutable;function makeRecord(likeRecord,map,ownerID){var record=Object.create(Object.getPrototypeOf(likeRecord));record._map=map;record.__ownerID=ownerID;return record;}function recordName(record){return record._name||record.constructor.name||'Record';}function setProps(prototype,names){try{names.forEach(setProp.bind(undefined,prototype));}catch(error){ // Object.defineProperty failed. Probably IE8.
	}}function setProp(prototype,name){Object.defineProperty(prototype,name,{get:function get(){return this.get(name);},set:function set(value){invariant(this.__ownerID,'Cannot set on an immutable record.');this.set(name,value);}});}createClass(Set,SetCollection); // @pragma Construction
	function Set(value){return value===null||value===undefined?emptySet():isSet(value)&&!isOrdered(value)?value:emptySet().withMutations(function(set){var iter=SetIterable(value);assertNotInfinite(iter.size);iter.forEach(function(v){return set.add(v);});});}Set.of=function() /*...values*/{return this(arguments);};Set.fromKeys=function(value){return this(KeyedIterable(value).keySeq());};Set.prototype.toString=function(){return this.__toString('Set {','}');}; // @pragma Access
	Set.prototype.has=function(value){return this._map.has(value);}; // @pragma Modification
	Set.prototype.add=function(value){return updateSet(this,this._map.set(value,true));};Set.prototype.remove=function(value){return updateSet(this,this._map.remove(value));};Set.prototype.clear=function(){return updateSet(this,this._map.clear());}; // @pragma Composition
	Set.prototype.union=function(){var iters=SLICE$0.call(arguments,0);iters=iters.filter(function(x){return x.size!==0;});if(iters.length===0){return this;}if(this.size===0&&!this.__ownerID&&iters.length===1){return this.constructor(iters[0]);}return this.withMutations(function(set){for(var ii=0;ii<iters.length;ii++){SetIterable(iters[ii]).forEach(function(value){return set.add(value);});}});};Set.prototype.intersect=function(){var iters=SLICE$0.call(arguments,0);if(iters.length===0){return this;}iters=iters.map(function(iter){return SetIterable(iter);});var originalSet=this;return this.withMutations(function(set){originalSet.forEach(function(value){if(!iters.every(function(iter){return iter.includes(value);})){set.remove(value);}});});};Set.prototype.subtract=function(){var iters=SLICE$0.call(arguments,0);if(iters.length===0){return this;}iters=iters.map(function(iter){return SetIterable(iter);});var originalSet=this;return this.withMutations(function(set){originalSet.forEach(function(value){if(iters.some(function(iter){return iter.includes(value);})){set.remove(value);}});});};Set.prototype.merge=function(){return this.union.apply(this,arguments);};Set.prototype.mergeWith=function(merger){var iters=SLICE$0.call(arguments,1);return this.union.apply(this,iters);};Set.prototype.sort=function(comparator){ // Late binding
	return OrderedSet(sortFactory(this,comparator));};Set.prototype.sortBy=function(mapper,comparator){ // Late binding
	return OrderedSet(sortFactory(this,comparator,mapper));};Set.prototype.wasAltered=function(){return this._map.wasAltered();};Set.prototype.__iterate=function(fn,reverse){var this$0=this;return this._map.__iterate(function(_,k){return fn(k,k,this$0);},reverse);};Set.prototype.__iterator=function(type,reverse){return this._map.map(function(_,k){return k;}).__iterator(type,reverse);};Set.prototype.__ensureOwner=function(ownerID){if(ownerID===this.__ownerID){return this;}var newMap=this._map.__ensureOwner(ownerID);if(!ownerID){this.__ownerID=ownerID;this._map=newMap;return this;}return this.__make(newMap,ownerID);};function isSet(maybeSet){return !!(maybeSet&&maybeSet[IS_SET_SENTINEL]);}Set.isSet=isSet;var IS_SET_SENTINEL='@@__IMMUTABLE_SET__@@';var SetPrototype=Set.prototype;SetPrototype[IS_SET_SENTINEL]=true;SetPrototype[DELETE]=SetPrototype.remove;SetPrototype.mergeDeep=SetPrototype.merge;SetPrototype.mergeDeepWith=SetPrototype.mergeWith;SetPrototype.withMutations=MapPrototype.withMutations;SetPrototype.asMutable=MapPrototype.asMutable;SetPrototype.asImmutable=MapPrototype.asImmutable;SetPrototype.__empty=emptySet;SetPrototype.__make=makeSet;function updateSet(set,newMap){if(set.__ownerID){set.size=newMap.size;set._map=newMap;return set;}return newMap===set._map?set:newMap.size===0?set.__empty():set.__make(newMap);}function makeSet(map,ownerID){var set=Object.create(SetPrototype);set.size=map?map.size:0;set._map=map;set.__ownerID=ownerID;return set;}var EMPTY_SET;function emptySet(){return EMPTY_SET||(EMPTY_SET=makeSet(emptyMap()));}createClass(OrderedSet,Set); // @pragma Construction
	function OrderedSet(value){return value===null||value===undefined?emptyOrderedSet():isOrderedSet(value)?value:emptyOrderedSet().withMutations(function(set){var iter=SetIterable(value);assertNotInfinite(iter.size);iter.forEach(function(v){return set.add(v);});});}OrderedSet.of=function() /*...values*/{return this(arguments);};OrderedSet.fromKeys=function(value){return this(KeyedIterable(value).keySeq());};OrderedSet.prototype.toString=function(){return this.__toString('OrderedSet {','}');};function isOrderedSet(maybeOrderedSet){return isSet(maybeOrderedSet)&&isOrdered(maybeOrderedSet);}OrderedSet.isOrderedSet=isOrderedSet;var OrderedSetPrototype=OrderedSet.prototype;OrderedSetPrototype[IS_ORDERED_SENTINEL]=true;OrderedSetPrototype.__empty=emptyOrderedSet;OrderedSetPrototype.__make=makeOrderedSet;function makeOrderedSet(map,ownerID){var set=Object.create(OrderedSetPrototype);set.size=map?map.size:0;set._map=map;set.__ownerID=ownerID;return set;}var EMPTY_ORDERED_SET;function emptyOrderedSet(){return EMPTY_ORDERED_SET||(EMPTY_ORDERED_SET=makeOrderedSet(emptyOrderedMap()));}createClass(Stack,IndexedCollection); // @pragma Construction
	function Stack(value){return value===null||value===undefined?emptyStack():isStack(value)?value:emptyStack().unshiftAll(value);}Stack.of=function() /*...values*/{return this(arguments);};Stack.prototype.toString=function(){return this.__toString('Stack [',']');}; // @pragma Access
	Stack.prototype.get=function(index,notSetValue){var head=this._head;index=wrapIndex(this,index);while(head&&index--){head=head.next;}return head?head.value:notSetValue;};Stack.prototype.peek=function(){return this._head&&this._head.value;}; // @pragma Modification
	Stack.prototype.push=function() /*...values*/{if(arguments.length===0){return this;}var newSize=this.size+arguments.length;var head=this._head;for(var ii=arguments.length-1;ii>=0;ii--){head={value:arguments[ii],next:head};}if(this.__ownerID){this.size=newSize;this._head=head;this.__hash=undefined;this.__altered=true;return this;}return makeStack(newSize,head);};Stack.prototype.pushAll=function(iter){iter=IndexedIterable(iter);if(iter.size===0){return this;}assertNotInfinite(iter.size);var newSize=this.size;var head=this._head;iter.reverse().forEach(function(value){newSize++;head={value:value,next:head};});if(this.__ownerID){this.size=newSize;this._head=head;this.__hash=undefined;this.__altered=true;return this;}return makeStack(newSize,head);};Stack.prototype.pop=function(){return this.slice(1);};Stack.prototype.unshift=function() /*...values*/{return this.push.apply(this,arguments);};Stack.prototype.unshiftAll=function(iter){return this.pushAll(iter);};Stack.prototype.shift=function(){return this.pop.apply(this,arguments);};Stack.prototype.clear=function(){if(this.size===0){return this;}if(this.__ownerID){this.size=0;this._head=undefined;this.__hash=undefined;this.__altered=true;return this;}return emptyStack();};Stack.prototype.slice=function(begin,end){if(wholeSlice(begin,end,this.size)){return this;}var resolvedBegin=resolveBegin(begin,this.size);var resolvedEnd=resolveEnd(end,this.size);if(resolvedEnd!==this.size){ // super.slice(begin, end);
	return IndexedCollection.prototype.slice.call(this,begin,end);}var newSize=this.size-resolvedBegin;var head=this._head;while(resolvedBegin--){head=head.next;}if(this.__ownerID){this.size=newSize;this._head=head;this.__hash=undefined;this.__altered=true;return this;}return makeStack(newSize,head);}; // @pragma Mutability
	Stack.prototype.__ensureOwner=function(ownerID){if(ownerID===this.__ownerID){return this;}if(!ownerID){this.__ownerID=ownerID;this.__altered=false;return this;}return makeStack(this.size,this._head,ownerID,this.__hash);}; // @pragma Iteration
	Stack.prototype.__iterate=function(fn,reverse){if(reverse){return this.reverse().__iterate(fn);}var iterations=0;var node=this._head;while(node){if(fn(node.value,iterations++,this)===false){break;}node=node.next;}return iterations;};Stack.prototype.__iterator=function(type,reverse){if(reverse){return this.reverse().__iterator(type);}var iterations=0;var node=this._head;return new Iterator(function(){if(node){var value=node.value;node=node.next;return iteratorValue(type,iterations++,value);}return iteratorDone();});};function isStack(maybeStack){return !!(maybeStack&&maybeStack[IS_STACK_SENTINEL]);}Stack.isStack=isStack;var IS_STACK_SENTINEL='@@__IMMUTABLE_STACK__@@';var StackPrototype=Stack.prototype;StackPrototype[IS_STACK_SENTINEL]=true;StackPrototype.withMutations=MapPrototype.withMutations;StackPrototype.asMutable=MapPrototype.asMutable;StackPrototype.asImmutable=MapPrototype.asImmutable;StackPrototype.wasAltered=MapPrototype.wasAltered;function makeStack(size,head,ownerID,hash){var map=Object.create(StackPrototype);map.size=size;map._head=head;map.__ownerID=ownerID;map.__hash=hash;map.__altered=false;return map;}var EMPTY_STACK;function emptyStack(){return EMPTY_STACK||(EMPTY_STACK=makeStack(0));} /**
	   * Contributes additional methods to a constructor
	   */function mixin(ctor,methods){var keyCopier=function keyCopier(key){ctor.prototype[key]=methods[key];};Object.keys(methods).forEach(keyCopier);Object.getOwnPropertySymbols&&Object.getOwnPropertySymbols(methods).forEach(keyCopier);return ctor;}Iterable.Iterator=Iterator;mixin(Iterable,{ // ### Conversion to other types
	toArray:function toArray(){assertNotInfinite(this.size);var array=new Array(this.size||0);this.valueSeq().__iterate(function(v,i){array[i]=v;});return array;},toIndexedSeq:function toIndexedSeq(){return new ToIndexedSequence(this);},toJS:function toJS(){return this.toSeq().map(function(value){return value&&typeof value.toJS==='function'?value.toJS():value;}).__toJS();},toJSON:function toJSON(){return this.toSeq().map(function(value){return value&&typeof value.toJSON==='function'?value.toJSON():value;}).__toJS();},toKeyedSeq:function toKeyedSeq(){return new ToKeyedSequence(this,true);},toMap:function toMap(){ // Use Late Binding here to solve the circular dependency.
	return Map(this.toKeyedSeq());},toObject:function toObject(){assertNotInfinite(this.size);var object={};this.__iterate(function(v,k){object[k]=v;});return object;},toOrderedMap:function toOrderedMap(){ // Use Late Binding here to solve the circular dependency.
	return OrderedMap(this.toKeyedSeq());},toOrderedSet:function toOrderedSet(){ // Use Late Binding here to solve the circular dependency.
	return OrderedSet(isKeyed(this)?this.valueSeq():this);},toSet:function toSet(){ // Use Late Binding here to solve the circular dependency.
	return Set(isKeyed(this)?this.valueSeq():this);},toSetSeq:function toSetSeq(){return new ToSetSequence(this);},toSeq:function toSeq(){return isIndexed(this)?this.toIndexedSeq():isKeyed(this)?this.toKeyedSeq():this.toSetSeq();},toStack:function toStack(){ // Use Late Binding here to solve the circular dependency.
	return Stack(isKeyed(this)?this.valueSeq():this);},toList:function toList(){ // Use Late Binding here to solve the circular dependency.
	return List(isKeyed(this)?this.valueSeq():this);}, // ### Common JavaScript methods and properties
	toString:function toString(){return '[Iterable]';},__toString:function __toString(head,tail){if(this.size===0){return head+tail;}return head+' '+this.toSeq().map(this.__toStringMapper).join(', ')+' '+tail;}, // ### ES6 Collection methods (ES6 Array and Map)
	concat:function concat(){var values=SLICE$0.call(arguments,0);return reify(this,concatFactory(this,values));},includes:function includes(searchValue){return this.some(function(value){return is(value,searchValue);});},entries:function entries(){return this.__iterator(ITERATE_ENTRIES);},every:function every(predicate,context){assertNotInfinite(this.size);var returnValue=true;this.__iterate(function(v,k,c){if(!predicate.call(context,v,k,c)){returnValue=false;return false;}});return returnValue;},filter:function filter(predicate,context){return reify(this,filterFactory(this,predicate,context,true));},find:function find(predicate,context,notSetValue){var entry=this.findEntry(predicate,context);return entry?entry[1]:notSetValue;},findEntry:function findEntry(predicate,context){var found;this.__iterate(function(v,k,c){if(predicate.call(context,v,k,c)){found=[k,v];return false;}});return found;},findLastEntry:function findLastEntry(predicate,context){return this.toSeq().reverse().findEntry(predicate,context);},forEach:function forEach(sideEffect,context){assertNotInfinite(this.size);return this.__iterate(context?sideEffect.bind(context):sideEffect);},join:function join(separator){assertNotInfinite(this.size);separator=separator!==undefined?''+separator:',';var joined='';var isFirst=true;this.__iterate(function(v){isFirst?isFirst=false:joined+=separator;joined+=v!==null&&v!==undefined?v.toString():'';});return joined;},keys:function keys(){return this.__iterator(ITERATE_KEYS);},map:function map(mapper,context){return reify(this,mapFactory(this,mapper,context));},reduce:function reduce(reducer,initialReduction,context){assertNotInfinite(this.size);var reduction;var useFirst;if(arguments.length<2){useFirst=true;}else {reduction=initialReduction;}this.__iterate(function(v,k,c){if(useFirst){useFirst=false;reduction=v;}else {reduction=reducer.call(context,reduction,v,k,c);}});return reduction;},reduceRight:function reduceRight(reducer,initialReduction,context){var reversed=this.toKeyedSeq().reverse();return reversed.reduce.apply(reversed,arguments);},reverse:function reverse(){return reify(this,reverseFactory(this,true));},slice:function slice(begin,end){return reify(this,sliceFactory(this,begin,end,true));},some:function some(predicate,context){return !this.every(not(predicate),context);},sort:function sort(comparator){return reify(this,sortFactory(this,comparator));},values:function values(){return this.__iterator(ITERATE_VALUES);}, // ### More sequential methods
	butLast:function butLast(){return this.slice(0,-1);},isEmpty:function isEmpty(){return this.size!==undefined?this.size===0:!this.some(function(){return true;});},count:function count(predicate,context){return ensureSize(predicate?this.toSeq().filter(predicate,context):this);},countBy:function countBy(grouper,context){return countByFactory(this,grouper,context);},equals:function equals(other){return deepEqual(this,other);},entrySeq:function entrySeq(){var iterable=this;if(iterable._cache){ // We cache as an entries array, so we can just return the cache!
	return new ArraySeq(iterable._cache);}var entriesSequence=iterable.toSeq().map(entryMapper).toIndexedSeq();entriesSequence.fromEntrySeq=function(){return iterable.toSeq();};return entriesSequence;},filterNot:function filterNot(predicate,context){return this.filter(not(predicate),context);},findLast:function findLast(predicate,context,notSetValue){return this.toKeyedSeq().reverse().find(predicate,context,notSetValue);},first:function first(){return this.find(returnTrue);},flatMap:function flatMap(mapper,context){return reify(this,flatMapFactory(this,mapper,context));},flatten:function flatten(depth){return reify(this,flattenFactory(this,depth,true));},fromEntrySeq:function fromEntrySeq(){return new FromEntriesSequence(this);},get:function get(searchKey,notSetValue){return this.find(function(_,key){return is(key,searchKey);},undefined,notSetValue);},getIn:function getIn(searchKeyPath,notSetValue){var nested=this; // Note: in an ES6 environment, we would prefer:
	// for (var key of searchKeyPath) {
	var iter=forceIterator(searchKeyPath);var step;while(!(step=iter.next()).done){var key=step.value;nested=nested&&nested.get?nested.get(key,NOT_SET):NOT_SET;if(nested===NOT_SET){return notSetValue;}}return nested;},groupBy:function groupBy(grouper,context){return groupByFactory(this,grouper,context);},has:function has(searchKey){return this.get(searchKey,NOT_SET)!==NOT_SET;},hasIn:function hasIn(searchKeyPath){return this.getIn(searchKeyPath,NOT_SET)!==NOT_SET;},isSubset:function isSubset(iter){iter=typeof iter.includes==='function'?iter:Iterable(iter);return this.every(function(value){return iter.includes(value);});},isSuperset:function isSuperset(iter){iter=typeof iter.isSubset==='function'?iter:Iterable(iter);return iter.isSubset(this);},keySeq:function keySeq(){return this.toSeq().map(keyMapper).toIndexedSeq();},last:function last(){return this.toSeq().reverse().first();},max:function max(comparator){return maxFactory(this,comparator);},maxBy:function maxBy(mapper,comparator){return maxFactory(this,comparator,mapper);},min:function min(comparator){return maxFactory(this,comparator?neg(comparator):defaultNegComparator);},minBy:function minBy(mapper,comparator){return maxFactory(this,comparator?neg(comparator):defaultNegComparator,mapper);},rest:function rest(){return this.slice(1);},skip:function skip(amount){return this.slice(Math.max(0,amount));},skipLast:function skipLast(amount){return reify(this,this.toSeq().reverse().skip(amount).reverse());},skipWhile:function skipWhile(predicate,context){return reify(this,skipWhileFactory(this,predicate,context,true));},skipUntil:function skipUntil(predicate,context){return this.skipWhile(not(predicate),context);},sortBy:function sortBy(mapper,comparator){return reify(this,sortFactory(this,comparator,mapper));},take:function take(amount){return this.slice(0,Math.max(0,amount));},takeLast:function takeLast(amount){return reify(this,this.toSeq().reverse().take(amount).reverse());},takeWhile:function takeWhile(predicate,context){return reify(this,takeWhileFactory(this,predicate,context));},takeUntil:function takeUntil(predicate,context){return this.takeWhile(not(predicate),context);},valueSeq:function valueSeq(){return this.toIndexedSeq();}, // ### Hashable Object
	hashCode:function hashCode(){return this.__hash||(this.__hash=hashIterable(this));} // ### Internal
	// abstract __iterate(fn, reverse)
	// abstract __iterator(type, reverse)
	}); // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	// var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	// var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	// var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';
	var IterablePrototype=Iterable.prototype;IterablePrototype[IS_ITERABLE_SENTINEL]=true;IterablePrototype[ITERATOR_SYMBOL]=IterablePrototype.values;IterablePrototype.__toJS=IterablePrototype.toArray;IterablePrototype.__toStringMapper=quoteString;IterablePrototype.inspect=IterablePrototype.toSource=function(){return this.toString();};IterablePrototype.chain=IterablePrototype.flatMap;IterablePrototype.contains=IterablePrototype.includes; // Temporary warning about using length
	(function(){try{Object.defineProperty(IterablePrototype,'length',{get:function get(){if(!Iterable.noLengthWarning){var stack;try{throw new Error();}catch(error){stack=error.stack;}if(stack.indexOf('_wrapObject')===-1){console&&console.warn&&console.warn('iterable.length has been deprecated, '+'use iterable.size or iterable.count(). '+'This warning will become a silent error in a future version. '+stack);return this.size;}}}});}catch(e){}})();mixin(KeyedIterable,{ // ### More sequential methods
	flip:function flip(){return reify(this,flipFactory(this));},findKey:function findKey(predicate,context){var entry=this.findEntry(predicate,context);return entry&&entry[0];},findLastKey:function findLastKey(predicate,context){return this.toSeq().reverse().findKey(predicate,context);},keyOf:function keyOf(searchValue){return this.findKey(function(value){return is(value,searchValue);});},lastKeyOf:function lastKeyOf(searchValue){return this.findLastKey(function(value){return is(value,searchValue);});},mapEntries:function mapEntries(mapper,context){var this$0=this;var iterations=0;return reify(this,this.toSeq().map(function(v,k){return mapper.call(context,[k,v],iterations++,this$0);}).fromEntrySeq());},mapKeys:function mapKeys(mapper,context){var this$0=this;return reify(this,this.toSeq().flip().map(function(k,v){return mapper.call(context,k,v,this$0);}).flip());}});var KeyedIterablePrototype=KeyedIterable.prototype;KeyedIterablePrototype[IS_KEYED_SENTINEL]=true;KeyedIterablePrototype[ITERATOR_SYMBOL]=IterablePrototype.entries;KeyedIterablePrototype.__toJS=IterablePrototype.toObject;KeyedIterablePrototype.__toStringMapper=function(v,k){return JSON.stringify(k)+': '+quoteString(v);};mixin(IndexedIterable,{ // ### Conversion to other types
	toKeyedSeq:function toKeyedSeq(){return new ToKeyedSequence(this,false);}, // ### ES6 Collection methods (ES6 Array and Map)
	filter:function filter(predicate,context){return reify(this,filterFactory(this,predicate,context,false));},findIndex:function findIndex(predicate,context){var entry=this.findEntry(predicate,context);return entry?entry[0]:-1;},indexOf:function indexOf(searchValue){var key=this.toKeyedSeq().keyOf(searchValue);return key===undefined?-1:key;},lastIndexOf:function lastIndexOf(searchValue){var key=this.toKeyedSeq().reverse().keyOf(searchValue);return key===undefined?-1:key; // var index =
	// return this.toSeq().reverse().indexOf(searchValue);
	},reverse:function reverse(){return reify(this,reverseFactory(this,false));},slice:function slice(begin,end){return reify(this,sliceFactory(this,begin,end,false));},splice:function splice(index,removeNum /*, ...values*/){var numArgs=arguments.length;removeNum=Math.max(removeNum|0,0);if(numArgs===0||numArgs===2&&!removeNum){return this;} // If index is negative, it should resolve relative to the size of the
	// collection. However size may be expensive to compute if not cached, so
	// only call count() if the number is in fact negative.
	index=resolveBegin(index,index<0?this.count():this.size);var spliced=this.slice(0,index);return reify(this,numArgs===1?spliced:spliced.concat(arrCopy(arguments,2),this.slice(index+removeNum)));}, // ### More collection methods
	findLastIndex:function findLastIndex(predicate,context){var key=this.toKeyedSeq().findLastKey(predicate,context);return key===undefined?-1:key;},first:function first(){return this.get(0);},flatten:function flatten(depth){return reify(this,flattenFactory(this,depth,false));},get:function get(index,notSetValue){index=wrapIndex(this,index);return index<0||this.size===Infinity||this.size!==undefined&&index>this.size?notSetValue:this.find(function(_,key){return key===index;},undefined,notSetValue);},has:function has(index){index=wrapIndex(this,index);return index>=0&&(this.size!==undefined?this.size===Infinity||index<this.size:this.indexOf(index)!==-1);},interpose:function interpose(separator){return reify(this,interposeFactory(this,separator));},interleave:function interleave() /*...iterables*/{var iterables=[this].concat(arrCopy(arguments));var zipped=zipWithFactory(this.toSeq(),IndexedSeq.of,iterables);var interleaved=zipped.flatten(true);if(zipped.size){interleaved.size=zipped.size*iterables.length;}return reify(this,interleaved);},last:function last(){return this.get(-1);},skipWhile:function skipWhile(predicate,context){return reify(this,skipWhileFactory(this,predicate,context,false));},zip:function zip() /*, ...iterables */{var iterables=[this].concat(arrCopy(arguments));return reify(this,zipWithFactory(this,defaultZipper,iterables));},zipWith:function zipWith(zipper /*, ...iterables */){var iterables=arrCopy(arguments);iterables[0]=this;return reify(this,zipWithFactory(this,zipper,iterables));}});IndexedIterable.prototype[IS_INDEXED_SENTINEL]=true;IndexedIterable.prototype[IS_ORDERED_SENTINEL]=true;mixin(SetIterable,{ // ### ES6 Collection methods (ES6 Array and Map)
	get:function get(value,notSetValue){return this.has(value)?value:notSetValue;},includes:function includes(value){return this.has(value);}, // ### More sequential methods
	keySeq:function keySeq(){return this.valueSeq();}});SetIterable.prototype.has=IterablePrototype.includes; // Mixin subclasses
	mixin(KeyedSeq,KeyedIterable.prototype);mixin(IndexedSeq,IndexedIterable.prototype);mixin(SetSeq,SetIterable.prototype);mixin(KeyedCollection,KeyedIterable.prototype);mixin(IndexedCollection,IndexedIterable.prototype);mixin(SetCollection,SetIterable.prototype); // #pragma Helper functions
	function keyMapper(v,k){return k;}function entryMapper(v,k){return [k,v];}function not(predicate){return function(){return !predicate.apply(this,arguments);};}function neg(predicate){return function(){return -predicate.apply(this,arguments);};}function quoteString(value){return typeof value==='string'?JSON.stringify(value):value;}function defaultZipper(){return arrCopy(arguments);}function defaultNegComparator(a,b){return a<b?1:a>b?-1:0;}function hashIterable(iterable){if(iterable.size===Infinity){return 0;}var ordered=isOrdered(iterable);var keyed=isKeyed(iterable);var h=ordered?1:0;var size=iterable.__iterate(keyed?ordered?function(v,k){h=31*h+hashMerge(hash(v),hash(k))|0;}:function(v,k){h=h+hashMerge(hash(v),hash(k))|0;}:ordered?function(v){h=31*h+hash(v)|0;}:function(v){h=h+hash(v)|0;});return murmurHashOfSize(size,h);}function murmurHashOfSize(size,h){h=imul(h,0xCC9E2D51);h=imul(h<<15|h>>>-15,0x1B873593);h=imul(h<<13|h>>>-13,5);h=(h+0xE6546B64|0)^size;h=imul(h^h>>>16,0x85EBCA6B);h=imul(h^h>>>13,0xC2B2AE35);h=smi(h^h>>>16);return h;}function hashMerge(a,b){return a^b+0x9E3779B9+(a<<6)+(a>>2)|0; // int
	}var Immutable={Iterable:Iterable,Seq:Seq,Collection:Collection,Map:Map,OrderedMap:OrderedMap,List:List,Stack:Stack,Set:Set,OrderedSet:OrderedSet,Record:Record,Range:Range,Repeat:Repeat,is:is,fromJS:fromJS};return Immutable;});

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 165 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var strictUriEncode = __webpack_require__(191);

	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};

	exports.parse = function (str) {
		if (typeof str !== 'string') {
			return {};
		}

		str = str.trim().replace(/^(\?|#|&)/, '');

		if (!str) {
			return {};
		}

		return str.split('&').reduce(function (ret, param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;

			key = decodeURIComponent(key);

			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);

			if (!ret.hasOwnProperty(key)) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}

			return ret;
		}, {});
	};

	exports.stringify = function (obj) {
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];

			if (val === undefined) {
				return '';
			}

			if (val === null) {
				return key;
			}

			if (Array.isArray(val)) {
				return val.sort().map(function (val2) {
					return strictUriEncode(key) + '=' + strictUriEncode(val2);
				}).join('&');
			}

			return strictUriEncode(key) + '=' + strictUriEncode(val);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};

/***/ },
/* 167 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.loopAsync = loopAsync;
	exports.mapAsync = mapAsync;

	function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;

	  function done() {
	    isDone = true;
	    callback.apply(this, arguments);
	  }

	  function next() {
	    if (isDone) return;

	    if (currentTurn < turns) {
	      work.call(this, currentTurn++, next, done);
	    } else {
	      done.apply(this, arguments);
	    }
	  }

	  next();
	}

	function mapAsync(array, work, callback) {
	  var length = array.length;
	  var values = [];

	  if (length === 0) return callback(null, values);

	  var isDone = false,
	      doneCount = 0;

	  function done(index, error, value) {
	    if (isDone) return;

	    if (error) {
	      isDone = true;
	      callback(error);
	    } else {
	      values[index] = value;

	      isDone = ++doneCount === length;

	      if (isDone) callback(null, values);
	    }
	  }

	  array.forEach(function (item, index) {
	    work(item, index, function (error, value) {
	      done(index, error, value);
	    });
	  });
	}

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _PatternUtils = __webpack_require__(181);

	function routeParamsChanged(route, prevState, nextState) {
	  if (!route.path) return false;

	  var paramNames = _PatternUtils.getParamNames(route.path);

	  return paramNames.some(function (paramName) {
	    return prevState.params[paramName] !== nextState.params[paramName];
	  });
	}

	/**
	 * Returns an object of { leaveRoutes, enterRoutes } determined by
	 * the change from prevState to nextState. We leave routes if either
	 * 1) they are not in the next state or 2) they are in the next state
	 * but their params have changed (i.e. /users/123 => /users/456).
	 *
	 * leaveRoutes are ordered starting at the leaf route of the tree
	 * we're leaving up to the common parent route. enterRoutes are ordered
	 * from the top of the tree we're entering down to the leaf route.
	 */
	function computeChangedRoutes(prevState, nextState) {
	  var prevRoutes = prevState && prevState.routes;
	  var nextRoutes = nextState.routes;

	  var leaveRoutes = undefined,
	      enterRoutes = undefined;
	  if (prevRoutes) {
	    leaveRoutes = prevRoutes.filter(function (route) {
	      return nextRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState);
	    });

	    // onLeave hooks start at the leaf route.
	    leaveRoutes.reverse();

	    enterRoutes = nextRoutes.filter(function (route) {
	      return prevRoutes.indexOf(route) === -1 || leaveRoutes.indexOf(route) !== -1;
	    });
	  } else {
	    leaveRoutes = [];
	    enterRoutes = nextRoutes;
	  }

	  return {
	    leaveRoutes: leaveRoutes,
	    enterRoutes: enterRoutes
	  };
	}

	exports['default'] = computeChangedRoutes;
	module.exports = exports['default'];

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _AsyncUtils = __webpack_require__(167);

	function getComponentsForRoute(location, route, callback) {
	  if (route.component || route.components) {
	    callback(null, route.component || route.components);
	  } else if (route.getComponent) {
	    route.getComponent(location, callback);
	  } else if (route.getComponents) {
	    route.getComponents(location, callback);
	  } else {
	    callback();
	  }
	}

	/**
	 * Asynchronously fetches all components needed for the given router
	 * state and calls callback(error, components) when finished.
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getComponents method.
	 */
	function getComponents(nextState, callback) {
	  _AsyncUtils.mapAsync(nextState.routes, function (route, index, callback) {
	    getComponentsForRoute(nextState.location, route, callback);
	  }, callback);
	}

	exports['default'] = getComponents;
	module.exports = exports['default'];

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _PatternUtils = __webpack_require__(181);

	/**
	 * Extracts an object of params the given route cares about from
	 * the given params object.
	 */
	function getRouteParams(route, params) {
	  var routeParams = {};

	  if (!route.path) return routeParams;

	  var paramNames = _PatternUtils.getParamNames(route.path);

	  for (var p in params) {
	    if (params.hasOwnProperty(p) && paramNames.indexOf(p) !== -1) routeParams[p] = params[p];
	  }return routeParams;
	}

	exports['default'] = getRouteParams;
	module.exports = exports['default'];

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _PropTypes = __webpack_require__(182);

	/**
	 * A mixin that adds the "history" instance variable to components.
	 */
	var History = {

	  contextTypes: {
	    history: _PropTypes.history
	  },

	  componentWillMount: function componentWillMount() {
	    this.history = this.context.history;
	  }

	};

	exports['default'] = History;
	module.exports = exports['default'];

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	/* components */
	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _Router2 = __webpack_require__(186);

	var _Router3 = _interopRequireDefault(_Router2);

	exports.Router = _Router3['default'];

	var _Link2 = __webpack_require__(178);

	var _Link3 = _interopRequireDefault(_Link2);

	exports.Link = _Link3['default'];

	var _IndexLink2 = __webpack_require__(173);

	var _IndexLink3 = _interopRequireDefault(_IndexLink2);

	exports.IndexLink = _IndexLink3['default'];

	/* components (configuration) */

	var _IndexRedirect2 = __webpack_require__(174);

	var _IndexRedirect3 = _interopRequireDefault(_IndexRedirect2);

	exports.IndexRedirect = _IndexRedirect3['default'];

	var _IndexRoute2 = __webpack_require__(175);

	var _IndexRoute3 = _interopRequireDefault(_IndexRoute2);

	exports.IndexRoute = _IndexRoute3['default'];

	var _Redirect2 = __webpack_require__(183);

	var _Redirect3 = _interopRequireDefault(_Redirect2);

	exports.Redirect = _Redirect3['default'];

	var _Route2 = __webpack_require__(184);

	var _Route3 = _interopRequireDefault(_Route2);

	exports.Route = _Route3['default'];

	/* mixins */

	var _History2 = __webpack_require__(171);

	var _History3 = _interopRequireDefault(_History2);

	exports.History = _History3['default'];

	var _Lifecycle2 = __webpack_require__(177);

	var _Lifecycle3 = _interopRequireDefault(_Lifecycle2);

	exports.Lifecycle = _Lifecycle3['default'];

	var _RouteContext2 = __webpack_require__(185);

	var _RouteContext3 = _interopRequireDefault(_RouteContext2);

	exports.RouteContext = _RouteContext3['default'];

	/* utils */

	var _useRoutes2 = __webpack_require__(190);

	var _useRoutes3 = _interopRequireDefault(_useRoutes2);

	exports.useRoutes = _useRoutes3['default'];

	var _RouteUtils = __webpack_require__(187);

	exports.createRoutes = _RouteUtils.createRoutes;

	var _RoutingContext2 = __webpack_require__(188);

	var _RoutingContext3 = _interopRequireDefault(_RoutingContext2);

	exports.RoutingContext = _RoutingContext3['default'];

	var _PropTypes2 = __webpack_require__(182);

	var _PropTypes3 = _interopRequireDefault(_PropTypes2);

	exports.PropTypes = _PropTypes3['default'];

	var _match2 = __webpack_require__(179);

	var _match3 = _interopRequireDefault(_match2);

	exports.match = _match3['default'];

	var _Router4 = _interopRequireDefault(_Router2);

	exports['default'] = _Router4['default'];

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _Link = __webpack_require__(178);

	var _Link2 = _interopRequireDefault(_Link);

	/**
	 * An <IndexLink> is used to link to an <IndexRoute>.
	 */

	var IndexLink = function (_Component) {
	  _inherits(IndexLink, _Component);

	  function IndexLink() {
	    _classCallCheck(this, IndexLink);

	    _Component.apply(this, arguments);
	  }

	  IndexLink.prototype.render = function render() {
	    return _react2['default'].createElement(_Link2['default'], _extends({}, this.props, { onlyActiveOnIndex: true }));
	  };

	  return IndexLink;
	}(_react.Component);

	exports['default'] = IndexLink;
	module.exports = exports['default'];

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _warning = __webpack_require__(194);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(164);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _Redirect = __webpack_require__(183);

	var _Redirect2 = _interopRequireDefault(_Redirect);

	var _PropTypes = __webpack_require__(182);

	var _React$PropTypes = _react2['default'].PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;

	/**
	 * An <IndexRedirect> is used to redirect from an indexRoute.
	 */

	var IndexRedirect = function (_Component) {
	  _inherits(IndexRedirect, _Component);

	  function IndexRedirect() {
	    _classCallCheck(this, IndexRedirect);

	    _Component.apply(this, arguments);
	  }

	  /* istanbul ignore next: sanity check */

	  IndexRedirect.prototype.render = function render() {
	     true ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
	  };

	  return IndexRedirect;
	}(_react.Component);

	IndexRedirect.propTypes = {
	  to: string.isRequired,
	  query: object,
	  state: object,
	  onEnter: _PropTypes.falsy,
	  children: _PropTypes.falsy
	};

	IndexRedirect.createRouteFromReactElement = function (element, parentRoute) {
	  /* istanbul ignore else: sanity check */
	  if (parentRoute) {
	    parentRoute.indexRoute = _Redirect2['default'].createRouteFromReactElement(element);
	  } else {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'An <IndexRedirect> does not make sense at the root of your route config') : undefined;
	  }
	};

	exports['default'] = IndexRedirect;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _warning = __webpack_require__(194);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(164);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _RouteUtils = __webpack_require__(187);

	var _PropTypes = __webpack_require__(182);

	var func = _react2['default'].PropTypes.func;

	/**
	 * An <IndexRoute> is used to specify its parent's <Route indexRoute> in
	 * a JSX route config.
	 */

	var IndexRoute = function (_Component) {
	  _inherits(IndexRoute, _Component);

	  function IndexRoute() {
	    _classCallCheck(this, IndexRoute);

	    _Component.apply(this, arguments);
	  }

	  /* istanbul ignore next: sanity check */

	  IndexRoute.prototype.render = function render() {
	     true ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, '<IndexRoute> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
	  };

	  return IndexRoute;
	}(_react.Component);

	IndexRoute.propTypes = {
	  path: _PropTypes.falsy,
	  component: _PropTypes.component,
	  components: _PropTypes.components,
	  getComponent: func,
	  getComponents: func
	};

	IndexRoute.createRouteFromReactElement = function (element, parentRoute) {
	  /* istanbul ignore else: sanity check */
	  if (parentRoute) {
	    parentRoute.indexRoute = _RouteUtils.createRouteFromReactElement(element);
	  } else {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'An <IndexRoute> does not make sense at the root of your route config') : undefined;
	  }
	};

	exports['default'] = IndexRoute;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	var _PatternUtils = __webpack_require__(181);

	function deepEqual(a, b) {
	  if (a == b) return true;

	  if (a == null || b == null) return false;

	  if (Array.isArray(a)) {
	    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
	      return deepEqual(item, b[index]);
	    });
	  }

	  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
	    for (var p in a) {
	      if (!a.hasOwnProperty(p)) {
	        continue;
	      }

	      if (a[p] === undefined) {
	        if (b[p] !== undefined) {
	          return false;
	        }
	      } else if (!b.hasOwnProperty(p)) {
	        return false;
	      } else if (!deepEqual(a[p], b[p])) {
	        return false;
	      }
	    }

	    return true;
	  }

	  return String(a) === String(b);
	}

	function paramsAreActive(paramNames, paramValues, activeParams) {
	  // FIXME: This doesn't work on repeated params in activeParams.
	  return paramNames.every(function (paramName, index) {
	    return String(paramValues[index]) === String(activeParams[paramName]);
	  });
	}

	function getMatchingRouteIndex(pathname, activeRoutes, activeParams) {
	  var remainingPathname = pathname,
	      paramNames = [],
	      paramValues = [];

	  for (var i = 0, len = activeRoutes.length; i < len; ++i) {
	    var route = activeRoutes[i];
	    var pattern = route.path || '';

	    if (pattern.charAt(0) === '/') {
	      remainingPathname = pathname;
	      paramNames = [];
	      paramValues = [];
	    }

	    if (remainingPathname !== null) {
	      var matched = _PatternUtils.matchPattern(pattern, remainingPathname);
	      remainingPathname = matched.remainingPathname;
	      paramNames = [].concat(paramNames, matched.paramNames);
	      paramValues = [].concat(paramValues, matched.paramValues);
	    }

	    if (remainingPathname === '' && route.path && paramsAreActive(paramNames, paramValues, activeParams)) return i;
	  }

	  return null;
	}

	/**
	 * Returns true if the given pathname matches the active routes
	 * and params.
	 */
	function routeIsActive(pathname, routes, params, indexOnly) {
	  var i = getMatchingRouteIndex(pathname, routes, params);

	  if (i === null) {
	    // No match.
	    return false;
	  } else if (!indexOnly) {
	    // Any match is good enough.
	    return true;
	  }

	  // If any remaining routes past the match index have paths, then we can't
	  // be on the index route.
	  return routes.slice(i + 1).every(function (route) {
	    return !route.path;
	  });
	}

	/**
	 * Returns true if all key/value pairs in the given query are
	 * currently active.
	 */
	function queryIsActive(query, activeQuery) {
	  if (activeQuery == null) return query == null;

	  if (query == null) return true;

	  return deepEqual(query, activeQuery);
	}

	/**
	 * Returns true if a <Link> to the given pathname/query combination is
	 * currently active.
	 */
	function isActive(pathname, query, indexOnly, location, routes, params) {
	  if (location == null) return false;

	  if (!routeIsActive(pathname, routes, params, indexOnly)) return false;

	  return queryIsActive(query, location.query);
	}

	exports['default'] = isActive;
	module.exports = exports['default'];

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(164);

	var _invariant2 = _interopRequireDefault(_invariant);

	var object = _react2['default'].PropTypes.object;

	/**
	 * The Lifecycle mixin adds the routerWillLeave lifecycle method to a
	 * component that may be used to cancel a transition or prompt the user
	 * for confirmation.
	 *
	 * On standard transitions, routerWillLeave receives a single argument: the
	 * location we're transitioning to. To cancel the transition, return false.
	 * To prompt the user for confirmation, return a prompt message (string).
	 *
	 * During the beforeunload event (assuming you're using the useBeforeUnload
	 * history enhancer), routerWillLeave does not receive a location object
	 * because it isn't possible for us to know the location we're transitioning
	 * to. In this case routerWillLeave must return a prompt message to prevent
	 * the user from closing the window/tab.
	 */
	var Lifecycle = {

	  contextTypes: {
	    history: object.isRequired,
	    // Nested children receive the route as context, either
	    // set by the route component using the RouteContext mixin
	    // or by some other ancestor.
	    route: object
	  },

	  propTypes: {
	    // Route components receive the route object as a prop.
	    route: object
	  },

	  componentDidMount: function componentDidMount() {
	    !this.routerWillLeave ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'The Lifecycle mixin requires you to define a routerWillLeave method') : _invariant2['default'](false) : undefined;

	    var route = this.props.route || this.context.route;

	    !route ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'The Lifecycle mixin must be used on either a) a <Route component> or ' + 'b) a descendant of a <Route component> that uses the RouteContext mixin') : _invariant2['default'](false) : undefined;

	    this._unlistenBeforeLeavingRoute = this.context.history.listenBeforeLeavingRoute(route, this.routerWillLeave);
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlistenBeforeLeavingRoute) this._unlistenBeforeLeavingRoute();
	  }

	};

	exports['default'] = Lifecycle;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _objectWithoutProperties(obj, keys) {
	  var target = {};for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	  }return target;
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _React$PropTypes = _react2['default'].PropTypes;
	var bool = _React$PropTypes.bool;
	var object = _React$PropTypes.object;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;

	function isLeftClickEvent(event) {
	  return event.button === 0;
	}

	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}

	function isEmptyObject(object) {
	  for (var p in object) {
	    if (object.hasOwnProperty(p)) return false;
	  }return true;
	}

	/**
	 * A <Link> is used to create an <a> element that links to a route.
	 * When that route is active, the link gets the value of its
	 * `activeClassName` prop
	 *
	 * For example, assuming you have the following route:
	 *
	 *   <Route path="/posts/:postID" component={Post} />
	 *
	 * You could use the following component to link to that route:
	 *
	 *   <Link to={`/posts/${post.id}`} />
	 *
	 * Links may pass along location state and/or query string parameters
	 * in the state/query props, respectively.
	 *
	 *   <Link ... query={{ show: true }} state={{ the: 'state' }} />
	 */

	var Link = function (_Component) {
	  _inherits(Link, _Component);

	  function Link() {
	    _classCallCheck(this, Link);

	    _Component.apply(this, arguments);
	  }

	  Link.prototype.handleClick = function handleClick(event) {
	    var allowTransition = true;

	    if (this.props.onClick) this.props.onClick(event);

	    if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;

	    if (event.defaultPrevented === true) allowTransition = false;

	    // If target prop is set (e.g. to "_blank") let browser handle link.
	    /* istanbul ignore if: untestable with Karma */
	    if (this.props.target) {
	      if (!allowTransition) event.preventDefault();

	      return;
	    }

	    event.preventDefault();

	    if (allowTransition) {
	      var _props = this.props;
	      var state = _props.state;
	      var to = _props.to;
	      var query = _props.query;
	      var hash = _props.hash;

	      if (hash) to += hash;

	      this.context.history.pushState(state, to, query);
	    }
	  };

	  Link.prototype.render = function render() {
	    var _this = this;

	    var _props2 = this.props;
	    var to = _props2.to;
	    var query = _props2.query;
	    var hash = _props2.hash;
	    var state = _props2.state;
	    var activeClassName = _props2.activeClassName;
	    var activeStyle = _props2.activeStyle;
	    var onlyActiveOnIndex = _props2.onlyActiveOnIndex;

	    var props = _objectWithoutProperties(_props2, ['to', 'query', 'hash', 'state', 'activeClassName', 'activeStyle', 'onlyActiveOnIndex']);

	    // Manually override onClick.
	    props.onClick = function (e) {
	      return _this.handleClick(e);
	    };

	    // Ignore if rendered outside the context of history, simplifies unit testing.
	    var history = this.context.history;

	    if (history) {
	      props.href = history.createHref(to, query);

	      if (hash) props.href += hash;

	      if (activeClassName || activeStyle != null && !isEmptyObject(activeStyle)) {
	        if (history.isActive(to, query, onlyActiveOnIndex)) {
	          if (activeClassName) props.className += props.className === '' ? activeClassName : ' ' + activeClassName;

	          if (activeStyle) props.style = _extends({}, props.style, activeStyle);
	        }
	      }
	    }

	    return _react2['default'].createElement('a', props);
	  };

	  return Link;
	}(_react.Component);

	Link.contextTypes = {
	  history: object
	};

	Link.propTypes = {
	  to: string.isRequired,
	  query: object,
	  hash: string,
	  state: object,
	  activeStyle: object,
	  activeClassName: string,
	  onlyActiveOnIndex: bool.isRequired,
	  onClick: func
	};

	Link.defaultProps = {
	  onlyActiveOnIndex: false,
	  className: '',
	  style: {}
	};

	exports['default'] = Link;
	module.exports = exports['default'];

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _invariant = __webpack_require__(164);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _historyLibCreateMemoryHistory = __webpack_require__(149);

	var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);

	var _historyLibUseBasename = __webpack_require__(160);

	var _historyLibUseBasename2 = _interopRequireDefault(_historyLibUseBasename);

	var _RouteUtils = __webpack_require__(187);

	var _useRoutes = __webpack_require__(190);

	var _useRoutes2 = _interopRequireDefault(_useRoutes);

	var createHistory = _useRoutes2['default'](_historyLibUseBasename2['default'](_historyLibCreateMemoryHistory2['default']));

	/**
	 * A high-level API to be used for server-side rendering.
	 *
	 * This function matches a location to a set of routes and calls
	 * callback(error, redirectLocation, renderProps) when finished.
	 *
	 * Note: You probably don't want to use this in a browser. Use
	 * the history.listen API instead.
	 */
	function match(_ref, callback) {
	  var routes = _ref.routes;
	  var location = _ref.location;
	  var parseQueryString = _ref.parseQueryString;
	  var stringifyQuery = _ref.stringifyQuery;
	  var basename = _ref.basename;

	  !location ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'match needs a location') : _invariant2['default'](false) : undefined;

	  var history = createHistory({
	    routes: _RouteUtils.createRoutes(routes),
	    parseQueryString: parseQueryString,
	    stringifyQuery: stringifyQuery,
	    basename: basename
	  });

	  // Allow match({ location: '/the/path', ... })
	  if (typeof location === 'string') location = history.createLocation(location);

	  history.match(location, function (error, redirectLocation, nextState) {
	    callback(error, redirectLocation, nextState && _extends({}, nextState, { history: history }));
	  });
	}

	exports['default'] = match;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _warning = __webpack_require__(194);

	var _warning2 = _interopRequireDefault(_warning);

	var _AsyncUtils = __webpack_require__(167);

	var _PatternUtils = __webpack_require__(181);

	var _RouteUtils = __webpack_require__(187);

	function getChildRoutes(route, location, callback) {
	  if (route.childRoutes) {
	    callback(null, route.childRoutes);
	  } else if (route.getChildRoutes) {
	    route.getChildRoutes(location, function (error, childRoutes) {
	      callback(error, !error && _RouteUtils.createRoutes(childRoutes));
	    });
	  } else {
	    callback();
	  }
	}

	function getIndexRoute(route, location, callback) {
	  if (route.indexRoute) {
	    callback(null, route.indexRoute);
	  } else if (route.getIndexRoute) {
	    route.getIndexRoute(location, function (error, indexRoute) {
	      callback(error, !error && _RouteUtils.createRoutes(indexRoute)[0]);
	    });
	  } else if (route.childRoutes) {
	    (function () {
	      var pathless = route.childRoutes.filter(function (obj) {
	        return !obj.hasOwnProperty('path');
	      });

	      _AsyncUtils.loopAsync(pathless.length, function (index, next, done) {
	        getIndexRoute(pathless[index], location, function (error, indexRoute) {
	          if (error || indexRoute) {
	            var routes = [pathless[index]].concat(Array.isArray(indexRoute) ? indexRoute : [indexRoute]);
	            done(error, routes);
	          } else {
	            next();
	          }
	        });
	      }, function (err, routes) {
	        callback(null, routes);
	      });
	    })();
	  } else {
	    callback();
	  }
	}

	function assignParams(params, paramNames, paramValues) {
	  return paramNames.reduce(function (params, paramName, index) {
	    var paramValue = paramValues && paramValues[index];

	    if (Array.isArray(params[paramName])) {
	      params[paramName].push(paramValue);
	    } else if (paramName in params) {
	      params[paramName] = [params[paramName], paramValue];
	    } else {
	      params[paramName] = paramValue;
	    }

	    return params;
	  }, params);
	}

	function createParams(paramNames, paramValues) {
	  return assignParams({}, paramNames, paramValues);
	}

	function matchRouteDeep(route, location, remainingPathname, paramNames, paramValues, callback) {
	  var pattern = route.path || '';

	  if (pattern.charAt(0) === '/') {
	    remainingPathname = location.pathname;
	    paramNames = [];
	    paramValues = [];
	  }

	  if (remainingPathname !== null) {
	    var matched = _PatternUtils.matchPattern(pattern, remainingPathname);
	    remainingPathname = matched.remainingPathname;
	    paramNames = [].concat(paramNames, matched.paramNames);
	    paramValues = [].concat(paramValues, matched.paramValues);

	    if (remainingPathname === '' && route.path) {
	      var _ret2 = function () {
	        var match = {
	          routes: [route],
	          params: createParams(paramNames, paramValues)
	        };

	        getIndexRoute(route, location, function (error, indexRoute) {
	          if (error) {
	            callback(error);
	          } else {
	            if (Array.isArray(indexRoute)) {
	              var _match$routes;

	              process.env.NODE_ENV !== 'production' ? _warning2['default'](indexRoute.every(function (route) {
	                return !route.path;
	              }), 'Index routes should not have paths') : undefined;
	              (_match$routes = match.routes).push.apply(_match$routes, indexRoute);
	            } else if (indexRoute) {
	              process.env.NODE_ENV !== 'production' ? _warning2['default'](!indexRoute.path, 'Index routes should not have paths') : undefined;
	              match.routes.push(indexRoute);
	            }

	            callback(null, match);
	          }
	        });
	        return {
	          v: undefined
	        };
	      }();

	      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === 'object') return _ret2.v;
	    }
	  }

	  if (remainingPathname != null || route.childRoutes) {
	    // Either a) this route matched at least some of the path or b)
	    // we don't have to load this route's children asynchronously. In
	    // either case continue checking for matches in the subtree.
	    getChildRoutes(route, location, function (error, childRoutes) {
	      if (error) {
	        callback(error);
	      } else if (childRoutes) {
	        // Check the child routes to see if any of them match.
	        matchRoutes(childRoutes, location, function (error, match) {
	          if (error) {
	            callback(error);
	          } else if (match) {
	            // A child route matched! Augment the match and pass it up the stack.
	            match.routes.unshift(route);
	            callback(null, match);
	          } else {
	            callback();
	          }
	        }, remainingPathname, paramNames, paramValues);
	      } else {
	        callback();
	      }
	    });
	  } else {
	    callback();
	  }
	}

	/**
	 * Asynchronously matches the given location to a set of routes and calls
	 * callback(error, state) when finished. The state object will have the
	 * following properties:
	 *
	 * - routes       An array of routes that matched, in hierarchical order
	 * - params       An object of URL parameters
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getChildRoutes method.
	 */
	function matchRoutes(routes, location, callback) {
	  var remainingPathname = arguments.length <= 3 || arguments[3] === undefined ? location.pathname : arguments[3];
	  var paramNames = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
	  var paramValues = arguments.length <= 5 || arguments[5] === undefined ? [] : arguments[5];
	  return function () {
	    _AsyncUtils.loopAsync(routes.length, function (index, next, done) {
	      matchRouteDeep(routes[index], location, remainingPathname, paramNames, paramValues, function (error, match) {
	        if (error || match) {
	          done(error, match);
	        } else {
	          next();
	        }
	      });
	    }, callback);
	  }();
	}

	exports['default'] = matchRoutes;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.compilePattern = compilePattern;
	exports.matchPattern = matchPattern;
	exports.getParamNames = getParamNames;
	exports.getParams = getParams;
	exports.formatPattern = formatPattern;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _invariant = __webpack_require__(164);

	var _invariant2 = _interopRequireDefault(_invariant);

	function escapeRegExp(string) {
	  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	function escapeSource(string) {
	  return escapeRegExp(string).replace(/\/+/g, '/+');
	}

	function _compilePattern(pattern) {
	  var regexpSource = '';
	  var paramNames = [];
	  var tokens = [];

	  var match = undefined,
	      lastIndex = 0,
	      matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)/g;
	  while (match = matcher.exec(pattern)) {
	    if (match.index !== lastIndex) {
	      tokens.push(pattern.slice(lastIndex, match.index));
	      regexpSource += escapeSource(pattern.slice(lastIndex, match.index));
	    }

	    if (match[1]) {
	      regexpSource += '([^/?#]+)';
	      paramNames.push(match[1]);
	    } else if (match[0] === '**') {
	      regexpSource += '([\\s\\S]*)';
	      paramNames.push('splat');
	    } else if (match[0] === '*') {
	      regexpSource += '([\\s\\S]*?)';
	      paramNames.push('splat');
	    } else if (match[0] === '(') {
	      regexpSource += '(?:';
	    } else if (match[0] === ')') {
	      regexpSource += ')?';
	    }

	    tokens.push(match[0]);

	    lastIndex = matcher.lastIndex;
	  }

	  if (lastIndex !== pattern.length) {
	    tokens.push(pattern.slice(lastIndex, pattern.length));
	    regexpSource += escapeSource(pattern.slice(lastIndex, pattern.length));
	  }

	  return {
	    pattern: pattern,
	    regexpSource: regexpSource,
	    paramNames: paramNames,
	    tokens: tokens
	  };
	}

	var CompiledPatternsCache = {};

	function compilePattern(pattern) {
	  if (!(pattern in CompiledPatternsCache)) CompiledPatternsCache[pattern] = _compilePattern(pattern);

	  return CompiledPatternsCache[pattern];
	}

	/**
	 * Attempts to match a pattern on the given pathname. Patterns may use
	 * the following special characters:
	 *
	 * - :paramName     Matches a URL segment up to the next /, ?, or #. The
	 *                  captured string is considered a "param"
	 * - ()             Wraps a segment of the URL that is optional
	 * - *              Consumes (non-greedy) all characters up to the next
	 *                  character in the pattern, or to the end of the URL if
	 *                  there is none
	 * - **             Consumes (greedy) all characters up to the next character
	 *                  in the pattern, or to the end of the URL if there is none
	 *
	 * The return value is an object with the following properties:
	 *
	 * - remainingPathname
	 * - paramNames
	 * - paramValues
	 */

	function matchPattern(pattern, pathname) {
	  // Make leading slashes consistent between pattern and pathname.
	  if (pattern.charAt(0) !== '/') {
	    pattern = '/' + pattern;
	  }
	  if (pathname.charAt(0) !== '/') {
	    pathname = '/' + pathname;
	  }

	  var _compilePattern2 = compilePattern(pattern);

	  var regexpSource = _compilePattern2.regexpSource;
	  var paramNames = _compilePattern2.paramNames;
	  var tokens = _compilePattern2.tokens;

	  regexpSource += '/*'; // Capture path separators

	  // Special-case patterns like '*' for catch-all routes.
	  var captureRemaining = tokens[tokens.length - 1] !== '*';

	  if (captureRemaining) {
	    // This will match newlines in the remaining path.
	    regexpSource += '([\\s\\S]*?)';
	  }

	  var match = pathname.match(new RegExp('^' + regexpSource + '$', 'i'));

	  var remainingPathname = undefined,
	      paramValues = undefined;
	  if (match != null) {
	    if (captureRemaining) {
	      remainingPathname = match.pop();
	      var matchedPath = match[0].substr(0, match[0].length - remainingPathname.length);

	      // If we didn't match the entire pathname, then make sure that the match
	      // we did get ends at a path separator (potentially the one we added
	      // above at the beginning of the path, if the actual match was empty).
	      if (remainingPathname && matchedPath.charAt(matchedPath.length - 1) !== '/') {
	        return {
	          remainingPathname: null,
	          paramNames: paramNames,
	          paramValues: null
	        };
	      }
	    } else {
	      // If this matched at all, then the match was the entire pathname.
	      remainingPathname = '';
	    }

	    paramValues = match.slice(1).map(function (v) {
	      return v != null ? decodeURIComponent(v) : v;
	    });
	  } else {
	    remainingPathname = paramValues = null;
	  }

	  return {
	    remainingPathname: remainingPathname,
	    paramNames: paramNames,
	    paramValues: paramValues
	  };
	}

	function getParamNames(pattern) {
	  return compilePattern(pattern).paramNames;
	}

	function getParams(pattern, pathname) {
	  var _matchPattern = matchPattern(pattern, pathname);

	  var paramNames = _matchPattern.paramNames;
	  var paramValues = _matchPattern.paramValues;

	  if (paramValues != null) {
	    return paramNames.reduce(function (memo, paramName, index) {
	      memo[paramName] = paramValues[index];
	      return memo;
	    }, {});
	  }

	  return null;
	}

	/**
	 * Returns a version of the given pattern with params interpolated. Throws
	 * if there is a dynamic segment of the pattern for which there is no param.
	 */

	function formatPattern(pattern, params) {
	  params = params || {};

	  var _compilePattern3 = compilePattern(pattern);

	  var tokens = _compilePattern3.tokens;

	  var parenCount = 0,
	      pathname = '',
	      splatIndex = 0;

	  var token = undefined,
	      paramName = undefined,
	      paramValue = undefined;
	  for (var i = 0, len = tokens.length; i < len; ++i) {
	    token = tokens[i];

	    if (token === '*' || token === '**') {
	      paramValue = Array.isArray(params.splat) ? params.splat[splatIndex++] : params.splat;

	      !(paramValue != null || parenCount > 0) ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Missing splat #%s for path "%s"', splatIndex, pattern) : _invariant2['default'](false) : undefined;

	      if (paramValue != null) pathname += encodeURI(paramValue);
	    } else if (token === '(') {
	      parenCount += 1;
	    } else if (token === ')') {
	      parenCount -= 1;
	    } else if (token.charAt(0) === ':') {
	      paramName = token.substring(1);
	      paramValue = params[paramName];

	      !(paramValue != null || parenCount > 0) ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Missing "%s" parameter for path "%s"', paramName, pattern) : _invariant2['default'](false) : undefined;

	      if (paramValue != null) pathname += encodeURIComponent(paramValue);
	    } else {
	      pathname += token;
	    }
	  }

	  return pathname.replace(/\/+/g, '/');
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.falsy = falsy;

	var _react = __webpack_require__(7);

	var func = _react.PropTypes.func;
	var object = _react.PropTypes.object;
	var arrayOf = _react.PropTypes.arrayOf;
	var oneOfType = _react.PropTypes.oneOfType;
	var element = _react.PropTypes.element;
	var shape = _react.PropTypes.shape;
	var string = _react.PropTypes.string;

	function falsy(props, propName, componentName) {
	  if (props[propName]) return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
	}

	var history = shape({
	  listen: func.isRequired,
	  pushState: func.isRequired,
	  replaceState: func.isRequired,
	  go: func.isRequired
	});

	exports.history = history;
	var location = shape({
	  pathname: string.isRequired,
	  search: string.isRequired,
	  state: object,
	  action: string.isRequired,
	  key: string
	});

	exports.location = location;
	var component = oneOfType([func, string]);
	exports.component = component;
	var components = oneOfType([component, object]);
	exports.components = components;
	var route = oneOfType([object, element]);
	exports.route = route;
	var routes = oneOfType([route, arrayOf(route)]);

	exports.routes = routes;
	exports['default'] = {
	  falsy: falsy,
	  history: history,
	  location: location,
	  component: component,
	  components: components,
	  route: route
	};

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _invariant = __webpack_require__(164);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _RouteUtils = __webpack_require__(187);

	var _PatternUtils = __webpack_require__(181);

	var _PropTypes = __webpack_require__(182);

	var _React$PropTypes = _react2['default'].PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;

	/**
	 * A <Redirect> is used to declare another URL path a client should
	 * be sent to when they request a given URL.
	 *
	 * Redirects are placed alongside routes in the route configuration
	 * and are traversed in the same manner.
	 */

	var Redirect = function (_Component) {
	  _inherits(Redirect, _Component);

	  function Redirect() {
	    _classCallCheck(this, Redirect);

	    _Component.apply(this, arguments);
	  }

	  /* istanbul ignore next: sanity check */

	  Redirect.prototype.render = function render() {
	     true ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, '<Redirect> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
	  };

	  return Redirect;
	}(_react.Component);

	Redirect.createRouteFromReactElement = function (element) {
	  var route = _RouteUtils.createRouteFromReactElement(element);

	  if (route.from) route.path = route.from;

	  route.onEnter = function (nextState, replaceState) {
	    var location = nextState.location;
	    var params = nextState.params;

	    var pathname = undefined;
	    if (route.to.charAt(0) === '/') {
	      pathname = _PatternUtils.formatPattern(route.to, params);
	    } else if (!route.to) {
	      pathname = location.pathname;
	    } else {
	      var routeIndex = nextState.routes.indexOf(route);
	      var parentPattern = Redirect.getRoutePattern(nextState.routes, routeIndex - 1);
	      var pattern = parentPattern.replace(/\/*$/, '/') + route.to;
	      pathname = _PatternUtils.formatPattern(pattern, params);
	    }

	    replaceState(route.state || location.state, pathname, route.query || location.query);
	  };

	  return route;
	};

	Redirect.getRoutePattern = function (routes, routeIndex) {
	  var parentPattern = '';

	  for (var i = routeIndex; i >= 0; i--) {
	    var route = routes[i];
	    var pattern = route.path || '';
	    parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;

	    if (pattern.indexOf('/') === 0) break;
	  }

	  return '/' + parentPattern;
	};

	Redirect.propTypes = {
	  path: string,
	  from: string, // Alias for path
	  to: string.isRequired,
	  query: object,
	  state: object,
	  onEnter: _PropTypes.falsy,
	  children: _PropTypes.falsy
	};

	exports['default'] = Redirect;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _invariant = __webpack_require__(164);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _RouteUtils = __webpack_require__(187);

	var _PropTypes = __webpack_require__(182);

	var _React$PropTypes = _react2['default'].PropTypes;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;

	/**
	 * A <Route> is used to declare which components are rendered to the
	 * page when the URL matches a given pattern.
	 *
	 * Routes are arranged in a nested tree structure. When a new URL is
	 * requested, the tree is searched depth-first to find a route whose
	 * path matches the URL.  When one is found, all routes in the tree
	 * that lead to it are considered "active" and their components are
	 * rendered into the DOM, nested in the same order as in the tree.
	 */

	var Route = function (_Component) {
	  _inherits(Route, _Component);

	  function Route() {
	    _classCallCheck(this, Route);

	    _Component.apply(this, arguments);
	  }

	  /* istanbul ignore next: sanity check */

	  Route.prototype.render = function render() {
	     true ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, '<Route> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
	  };

	  return Route;
	}(_react.Component);

	Route.createRouteFromReactElement = _RouteUtils.createRouteFromReactElement;

	Route.propTypes = {
	  path: string,
	  component: _PropTypes.component,
	  components: _PropTypes.components,
	  getComponent: func,
	  getComponents: func
	};

	exports['default'] = Route;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var object = _react2['default'].PropTypes.object;

	/**
	 * The RouteContext mixin provides a convenient way for route
	 * components to set the route in context. This is needed for
	 * routes that render elements that want to use the Lifecycle
	 * mixin to prevent transitions.
	 */
	var RouteContext = {

	  propTypes: {
	    route: object.isRequired
	  },

	  childContextTypes: {
	    route: object.isRequired
	  },

	  getChildContext: function getChildContext() {
	    return {
	      route: this.props.route
	    };
	  }

	};

	exports['default'] = RouteContext;
	module.exports = exports['default'];

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _objectWithoutProperties(obj, keys) {
	  var target = {};for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	  }return target;
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _warning = __webpack_require__(194);

	var _warning2 = _interopRequireDefault(_warning);

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _historyLibCreateHashHistory = __webpack_require__(146);

	var _historyLibCreateHashHistory2 = _interopRequireDefault(_historyLibCreateHashHistory);

	var _RouteUtils = __webpack_require__(187);

	var _RoutingContext = __webpack_require__(188);

	var _RoutingContext2 = _interopRequireDefault(_RoutingContext);

	var _useRoutes = __webpack_require__(190);

	var _useRoutes2 = _interopRequireDefault(_useRoutes);

	var _PropTypes = __webpack_require__(182);

	var _React$PropTypes = _react2['default'].PropTypes;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;

	/**
	 * A <Router> is a high-level API for automatically setting up
	 * a router that renders a <RoutingContext> with all the props
	 * it needs each time the URL changes.
	 */

	var Router = function (_Component) {
	  _inherits(Router, _Component);

	  function Router(props, context) {
	    _classCallCheck(this, Router);

	    _Component.call(this, props, context);

	    this.state = {
	      location: null,
	      routes: null,
	      params: null,
	      components: null
	    };
	  }

	  Router.prototype.handleError = function handleError(error) {
	    if (this.props.onError) {
	      this.props.onError.call(this, error);
	    } else {
	      // Throw errors by default so we don't silently swallow them!
	      throw error; // This error probably occurred in getChildRoutes or getComponents.
	    }
	  };

	  Router.prototype.componentWillMount = function componentWillMount() {
	    var _this = this;

	    var _props = this.props;
	    var history = _props.history;
	    var children = _props.children;
	    var routes = _props.routes;
	    var parseQueryString = _props.parseQueryString;
	    var stringifyQuery = _props.stringifyQuery;

	    var createHistory = history ? function () {
	      return history;
	    } : _historyLibCreateHashHistory2['default'];

	    this.history = _useRoutes2['default'](createHistory)({
	      routes: _RouteUtils.createRoutes(routes || children),
	      parseQueryString: parseQueryString,
	      stringifyQuery: stringifyQuery
	    });

	    this._unlisten = this.history.listen(function (error, state) {
	      if (error) {
	        _this.handleError(error);
	      } else {
	        _this.setState(state, _this.props.onUpdate);
	      }
	    });
	  };

	  /* istanbul ignore next: sanity check */

	  Router.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](nextProps.history === this.props.history, 'You cannot change <Router history>; it will be ignored') : undefined;

	    process.env.NODE_ENV !== 'production' ? _warning2['default']((nextProps.routes || nextProps.children) === (this.props.routes || this.props.children), 'You cannot change <Router routes>; it will be ignored') : undefined;
	  };

	  Router.prototype.componentWillUnmount = function componentWillUnmount() {
	    if (this._unlisten) this._unlisten();
	  };

	  Router.prototype.render = function render() {
	    var _state = this.state;
	    var location = _state.location;
	    var routes = _state.routes;
	    var params = _state.params;
	    var components = _state.components;
	    var _props2 = this.props;
	    var RoutingContext = _props2.RoutingContext;
	    var createElement = _props2.createElement;

	    var props = _objectWithoutProperties(_props2, ['RoutingContext', 'createElement']);

	    if (location == null) return null; // Async match

	    // Only forward non-Router-specific props to routing context, as those are
	    // the only ones that might be custom routing context props.
	    Object.keys(Router.propTypes).forEach(function (propType) {
	      return delete props[propType];
	    });

	    return _react2['default'].createElement(RoutingContext, _extends({}, props, {
	      history: this.history,
	      createElement: createElement,
	      location: location,
	      routes: routes,
	      params: params,
	      components: components
	    }));
	  };

	  return Router;
	}(_react.Component);

	Router.propTypes = {
	  history: object,
	  children: _PropTypes.routes,
	  routes: _PropTypes.routes, // alias for children
	  RoutingContext: func.isRequired,
	  createElement: func,
	  onError: func,
	  onUpdate: func,
	  parseQueryString: func,
	  stringifyQuery: func
	};

	Router.defaultProps = {
	  RoutingContext: _RoutingContext2['default']
	};

	exports['default'] = Router;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	exports.isReactChildren = isReactChildren;
	exports.createRouteFromReactElement = createRouteFromReactElement;
	exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
	exports.createRoutes = createRoutes;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _warning = __webpack_require__(194);

	var _warning2 = _interopRequireDefault(_warning);

	function isValidChild(object) {
	  return object == null || _react2['default'].isValidElement(object);
	}

	function isReactChildren(object) {
	  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
	}

	function checkPropTypes(componentName, propTypes, props) {
	  componentName = componentName || 'UnknownComponent';

	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error = propTypes[propName](props, propName, componentName);

	      /* istanbul ignore if: error logging */
	      if (error instanceof Error) process.env.NODE_ENV !== 'production' ? _warning2['default'](false, error.message) : undefined;
	    }
	  }
	}

	function createRoute(defaultProps, props) {
	  return _extends({}, defaultProps, props);
	}

	function createRouteFromReactElement(element) {
	  var type = element.type;
	  var route = createRoute(type.defaultProps, element.props);

	  if (type.propTypes) checkPropTypes(type.displayName || type.name, type.propTypes, route);

	  if (route.children) {
	    var childRoutes = createRoutesFromReactChildren(route.children, route);

	    if (childRoutes.length) route.childRoutes = childRoutes;

	    delete route.children;
	  }

	  return route;
	}

	/**
	 * Creates and returns a routes object from the given ReactChildren. JSX
	 * provides a convenient way to visualize how routes in the hierarchy are
	 * nested.
	 *
	 *   import { Route, createRoutesFromReactChildren } from 'react-router'
	 *   
	 *   const routes = createRoutesFromReactChildren(
	 *     <Route component={App}>
	 *       <Route path="home" component={Dashboard}/>
	 *       <Route path="news" component={NewsFeed}/>
	 *     </Route>
	 *   )
	 *
	 * Note: This method is automatically used when you provide <Route> children
	 * to a <Router> component.
	 */

	function createRoutesFromReactChildren(children, parentRoute) {
	  var routes = [];

	  _react2['default'].Children.forEach(children, function (element) {
	    if (_react2['default'].isValidElement(element)) {
	      // Component classes may have a static create* method.
	      if (element.type.createRouteFromReactElement) {
	        var route = element.type.createRouteFromReactElement(element, parentRoute);

	        if (route) routes.push(route);
	      } else {
	        routes.push(createRouteFromReactElement(element));
	      }
	    }
	  });

	  return routes;
	}

	/**
	 * Creates and returns an array of routes from the given object which
	 * may be a JSX route, a plain object route, or an array of either.
	 */

	function createRoutes(routes) {
	  if (isReactChildren(routes)) {
	    routes = createRoutesFromReactChildren(routes);
	  } else if (routes && !Array.isArray(routes)) {
	    routes = [routes];
	  }

	  return routes;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _invariant = __webpack_require__(164);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _RouteUtils = __webpack_require__(187);

	var _getRouteParams = __webpack_require__(170);

	var _getRouteParams2 = _interopRequireDefault(_getRouteParams);

	var _React$PropTypes = _react2['default'].PropTypes;
	var array = _React$PropTypes.array;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;

	/**
	 * A <RoutingContext> renders the component tree for a given router state
	 * and sets the history object and the current location in context.
	 */

	var RoutingContext = function (_Component) {
	  _inherits(RoutingContext, _Component);

	  function RoutingContext() {
	    _classCallCheck(this, RoutingContext);

	    _Component.apply(this, arguments);
	  }

	  RoutingContext.prototype.getChildContext = function getChildContext() {
	    var _props = this.props;
	    var history = _props.history;
	    var location = _props.location;

	    return { history: history, location: location };
	  };

	  RoutingContext.prototype.createElement = function createElement(component, props) {
	    return component == null ? null : this.props.createElement(component, props);
	  };

	  RoutingContext.prototype.render = function render() {
	    var _this = this;

	    var _props2 = this.props;
	    var history = _props2.history;
	    var location = _props2.location;
	    var routes = _props2.routes;
	    var params = _props2.params;
	    var components = _props2.components;

	    var element = null;

	    if (components) {
	      element = components.reduceRight(function (element, components, index) {
	        if (components == null) return element; // Don't create new children; use the grandchildren.

	        var route = routes[index];
	        var routeParams = _getRouteParams2['default'](route, params);
	        var props = {
	          history: history,
	          location: location,
	          params: params,
	          route: route,
	          routeParams: routeParams,
	          routes: routes
	        };

	        if (_RouteUtils.isReactChildren(element)) {
	          props.children = element;
	        } else if (element) {
	          for (var prop in element) {
	            if (element.hasOwnProperty(prop)) props[prop] = element[prop];
	          }
	        }

	        if ((typeof components === 'undefined' ? 'undefined' : _typeof(components)) === 'object') {
	          var elements = {};

	          for (var key in components) {
	            if (components.hasOwnProperty(key)) {
	              // Pass through the key as a prop to createElement to allow
	              // custom createElement functions to know which named component
	              // they're rendering, for e.g. matching up to fetched data.
	              elements[key] = _this.createElement(components[key], _extends({
	                key: key }, props));
	            }
	          }

	          return elements;
	        }

	        return _this.createElement(components, props);
	      }, element);
	    }

	    !(element === null || element === false || _react2['default'].isValidElement(element)) ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'The root route must render a single element') : _invariant2['default'](false) : undefined;

	    return element;
	  };

	  return RoutingContext;
	}(_react.Component);

	RoutingContext.propTypes = {
	  history: object.isRequired,
	  createElement: func.isRequired,
	  location: object.isRequired,
	  routes: array.isRequired,
	  params: object.isRequired,
	  components: array.isRequired
	};

	RoutingContext.defaultProps = {
	  createElement: _react2['default'].createElement
	};

	RoutingContext.childContextTypes = {
	  history: object.isRequired,
	  location: object.isRequired
	};

	exports['default'] = RoutingContext;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.runEnterHooks = runEnterHooks;
	exports.runLeaveHooks = runLeaveHooks;

	var _AsyncUtils = __webpack_require__(167);

	function createEnterHook(hook, route) {
	  return function (a, b, callback) {
	    hook.apply(route, arguments);

	    if (hook.length < 3) {
	      // Assume hook executes synchronously and
	      // automatically call the callback.
	      callback();
	    }
	  };
	}

	function getEnterHooks(routes) {
	  return routes.reduce(function (hooks, route) {
	    if (route.onEnter) hooks.push(createEnterHook(route.onEnter, route));

	    return hooks;
	  }, []);
	}

	/**
	 * Runs all onEnter hooks in the given array of routes in order
	 * with onEnter(nextState, replaceState, callback) and calls
	 * callback(error, redirectInfo) when finished. The first hook
	 * to use replaceState short-circuits the loop.
	 *
	 * If a hook needs to run asynchronously, it may use the callback
	 * function. However, doing so will cause the transition to pause,
	 * which could lead to a non-responsive UI if the hook is slow.
	 */

	function runEnterHooks(routes, nextState, callback) {
	  var hooks = getEnterHooks(routes);

	  if (!hooks.length) {
	    callback();
	    return;
	  }

	  var redirectInfo = undefined;
	  function replaceState(state, pathname, query) {
	    redirectInfo = { pathname: pathname, query: query, state: state };
	  }

	  _AsyncUtils.loopAsync(hooks.length, function (index, next, done) {
	    hooks[index](nextState, replaceState, function (error) {
	      if (error || redirectInfo) {
	        done(error, redirectInfo); // No need to continue.
	      } else {
	          next();
	        }
	    });
	  }, callback);
	}

	/**
	 * Runs all onLeave hooks in the given array of routes in order.
	 */

	function runLeaveHooks(routes) {
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    if (routes[i].onLeave) routes[i].onLeave.call(routes[i]);
	  }
	}

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _objectWithoutProperties(obj, keys) {
	  var target = {};for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	  }return target;
	}

	var _warning = __webpack_require__(194);

	var _warning2 = _interopRequireDefault(_warning);

	var _historyLibActions = __webpack_require__(142);

	var _historyLibUseQueries = __webpack_require__(162);

	var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);

	var _computeChangedRoutes2 = __webpack_require__(168);

	var _computeChangedRoutes3 = _interopRequireDefault(_computeChangedRoutes2);

	var _TransitionUtils = __webpack_require__(189);

	var _isActive2 = __webpack_require__(176);

	var _isActive3 = _interopRequireDefault(_isActive2);

	var _getComponents = __webpack_require__(169);

	var _getComponents2 = _interopRequireDefault(_getComponents);

	var _matchRoutes = __webpack_require__(180);

	var _matchRoutes2 = _interopRequireDefault(_matchRoutes);

	function hasAnyProperties(object) {
	  for (var p in object) {
	    if (object.hasOwnProperty(p)) return true;
	  }return false;
	}

	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know about routing.
	 *
	 * Enhances history objects with the following methods:
	 *
	 * - listen((error, nextState) => {})
	 * - listenBeforeLeavingRoute(route, (nextLocation) => {})
	 * - match(location, (error, redirectLocation, nextState) => {})
	 * - isActive(pathname, query, indexOnly=false)
	 */
	function useRoutes(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var routes = options.routes;

	    var historyOptions = _objectWithoutProperties(options, ['routes']);

	    var history = _historyLibUseQueries2['default'](createHistory)(historyOptions);
	    var state = {};

	    function isActive(pathname, query) {
	      var indexOnly = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	      return _isActive3['default'](pathname, query, indexOnly, state.location, state.routes, state.params);
	    }

	    function createLocationFromRedirectInfo(_ref) {
	      var pathname = _ref.pathname;
	      var query = _ref.query;
	      var state = _ref.state;

	      return history.createLocation(history.createPath(pathname, query), state, _historyLibActions.REPLACE);
	    }

	    var partialNextState = undefined;

	    function match(location, callback) {
	      if (partialNextState && partialNextState.location === location) {
	        // Continue from where we left off.
	        finishMatch(partialNextState, callback);
	      } else {
	        _matchRoutes2['default'](routes, location, function (error, nextState) {
	          if (error) {
	            callback(error);
	          } else if (nextState) {
	            finishMatch(_extends({}, nextState, { location: location }), callback);
	          } else {
	            callback();
	          }
	        });
	      }
	    }

	    function finishMatch(nextState, callback) {
	      var _computeChangedRoutes = _computeChangedRoutes3['default'](state, nextState);

	      var leaveRoutes = _computeChangedRoutes.leaveRoutes;
	      var enterRoutes = _computeChangedRoutes.enterRoutes;

	      _TransitionUtils.runLeaveHooks(leaveRoutes);

	      _TransitionUtils.runEnterHooks(enterRoutes, nextState, function (error, redirectInfo) {
	        if (error) {
	          callback(error);
	        } else if (redirectInfo) {
	          callback(null, createLocationFromRedirectInfo(redirectInfo));
	        } else {
	          // TODO: Fetch components after state is updated.
	          _getComponents2['default'](nextState, function (error, components) {
	            if (error) {
	              callback(error);
	            } else {
	              // TODO: Make match a pure function and have some other API
	              // for "match and update state".
	              callback(null, null, state = _extends({}, nextState, { components: components }));
	            }
	          });
	        }
	      });
	    }

	    var RouteGuid = 1;

	    function getRouteID(route) {
	      return route.__id__ || (route.__id__ = RouteGuid++);
	    }

	    var RouteHooks = {};

	    function getRouteHooksForRoutes(routes) {
	      return routes.reduce(function (hooks, route) {
	        hooks.push.apply(hooks, RouteHooks[getRouteID(route)]);
	        return hooks;
	      }, []);
	    }

	    function transitionHook(location, callback) {
	      _matchRoutes2['default'](routes, location, function (error, nextState) {
	        if (nextState == null) {
	          // TODO: We didn't actually match anything, but hang
	          // onto error/nextState so we don't have to matchRoutes
	          // again in the listen callback.
	          callback();
	          return;
	        }

	        // Cache some state here so we don't have to
	        // matchRoutes() again in the listen callback.
	        partialNextState = _extends({}, nextState, { location: location });

	        var hooks = getRouteHooksForRoutes(_computeChangedRoutes3['default'](state, partialNextState).leaveRoutes);

	        var result = undefined;
	        for (var i = 0, len = hooks.length; result == null && i < len; ++i) {
	          // Passing the location arg here indicates to
	          // the user that this is a transition hook.
	          result = hooks[i](location);
	        }

	        callback(result);
	      });
	    }

	    function beforeUnloadHook() {
	      // Synchronously check to see if any route hooks want
	      // to prevent the current window/tab from closing.
	      if (state.routes) {
	        var hooks = getRouteHooksForRoutes(state.routes);

	        var message = undefined;
	        for (var i = 0, len = hooks.length; typeof message !== 'string' && i < len; ++i) {
	          // Passing no args indicates to the user that this is a
	          // beforeunload hook. We don't know the next location.
	          message = hooks[i]();
	        }

	        return message;
	      }
	    }

	    var unlistenBefore = undefined,
	        unlistenBeforeUnload = undefined;

	    /**
	     * Registers the given hook function to run before leaving the given route.
	     *
	     * During a normal transition, the hook function receives the next location
	     * as its only argument and must return either a) a prompt message to show
	     * the user, to make sure they want to leave the page or b) false, to prevent
	     * the transition.
	     *
	     * During the beforeunload event (in browsers) the hook receives no arguments.
	     * In this case it must return a prompt message to prevent the transition.
	     *
	     * Returns a function that may be used to unbind the listener.
	     */
	    function listenBeforeLeavingRoute(route, hook) {
	      // TODO: Warn if they register for a route that isn't currently
	      // active. They're probably doing something wrong, like re-creating
	      // route objects on every location change.
	      var routeID = getRouteID(route);
	      var hooks = RouteHooks[routeID];

	      if (hooks == null) {
	        var thereWereNoRouteHooks = !hasAnyProperties(RouteHooks);

	        hooks = RouteHooks[routeID] = [hook];

	        if (thereWereNoRouteHooks) {
	          // setup transition & beforeunload hooks
	          unlistenBefore = history.listenBefore(transitionHook);

	          if (history.listenBeforeUnload) unlistenBeforeUnload = history.listenBeforeUnload(beforeUnloadHook);
	        }
	      } else if (hooks.indexOf(hook) === -1) {
	        hooks.push(hook);
	      }

	      return function () {
	        var hooks = RouteHooks[routeID];

	        if (hooks != null) {
	          var newHooks = hooks.filter(function (item) {
	            return item !== hook;
	          });

	          if (newHooks.length === 0) {
	            delete RouteHooks[routeID];

	            if (!hasAnyProperties(RouteHooks)) {
	              // teardown transition & beforeunload hooks
	              if (unlistenBefore) {
	                unlistenBefore();
	                unlistenBefore = null;
	              }

	              if (unlistenBeforeUnload) {
	                unlistenBeforeUnload();
	                unlistenBeforeUnload = null;
	              }
	            }
	          } else {
	            RouteHooks[routeID] = newHooks;
	          }
	        }
	      };
	    }

	    /**
	     * This is the API for stateful environments. As the location
	     * changes, we update state and call the listener. We can also
	     * gracefully handle errors and redirects.
	     */
	    function listen(listener) {
	      // TODO: Only use a single history listener. Otherwise we'll
	      // end up with multiple concurrent calls to match.
	      return history.listen(function (location) {
	        if (state.location === location) {
	          listener(null, state);
	        } else {
	          match(location, function (error, redirectLocation, nextState) {
	            if (error) {
	              listener(error);
	            } else if (redirectLocation) {
	              history.transitionTo(redirectLocation);
	            } else if (nextState) {
	              listener(null, nextState);
	            } else {
	              process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'Location "%s" did not match any routes', location.pathname + location.search + location.hash) : undefined;
	            }
	          });
	        }
	      });
	    }

	    return _extends({}, history, {
	      isActive: isActive,
	      match: match,
	      listenBeforeLeavingRoute: listenBeforeLeavingRoute,
	      listen: listen
	    });
	  };
	}

	exports['default'] = useRoutes;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 191 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * UAParser.js v0.7.10
	 * Lightweight JavaScript-based User-Agent string parser
	 * https://github.com/faisalman/ua-parser-js
	 *
	 * Copyright © 2012-2015 Faisal Salman <fyzlman@gmail.com>
	 * Dual licensed under GPLv2 & MIT
	 */

	(function (window, undefined) {

	            'use strict';

	            //////////////
	            // Constants
	            /////////////

	            var LIBVERSION = '0.7.10',
	                EMPTY = '',
	                UNKNOWN = '?',
	                FUNC_TYPE = 'function',
	                UNDEF_TYPE = 'undefined',
	                OBJ_TYPE = 'object',
	                STR_TYPE = 'string',
	                MAJOR = 'major',
	                // deprecated
	            MODEL = 'model',
	                NAME = 'name',
	                TYPE = 'type',
	                VENDOR = 'vendor',
	                VERSION = 'version',
	                ARCHITECTURE = 'architecture',
	                CONSOLE = 'console',
	                MOBILE = 'mobile',
	                TABLET = 'tablet',
	                SMARTTV = 'smarttv',
	                WEARABLE = 'wearable',
	                EMBEDDED = 'embedded';

	            ///////////
	            // Helper
	            //////////

	            var util = {
	                        extend: function extend(regexes, extensions) {
	                                    for (var i in extensions) {
	                                                if ("browser cpu device engine os".indexOf(i) !== -1 && extensions[i].length % 2 === 0) {
	                                                            regexes[i] = extensions[i].concat(regexes[i]);
	                                                }
	                                    }
	                                    return regexes;
	                        },
	                        has: function has(str1, str2) {
	                                    if (typeof str1 === "string") {
	                                                return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
	                                    } else {
	                                                return false;
	                                    }
	                        },
	                        lowerize: function lowerize(str) {
	                                    return str.toLowerCase();
	                        },
	                        major: function major(version) {
	                                    return (typeof version === 'undefined' ? 'undefined' : _typeof(version)) === STR_TYPE ? version.split(".")[0] : undefined;
	                        }
	            };

	            ///////////////
	            // Map helper
	            //////////////

	            var mapper = {

	                        rgx: function rgx() {

	                                    var result,
	                                        i = 0,
	                                        j,
	                                        k,
	                                        p,
	                                        q,
	                                        matches,
	                                        match,
	                                        args = arguments;

	                                    // loop through all regexes maps
	                                    while (i < args.length && !matches) {

	                                                var regex = args[i],
	                                                    // even sequence (0,2,4,..)
	                                                props = args[i + 1]; // odd sequence (1,3,5,..)

	                                                // construct object barebones
	                                                if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === UNDEF_TYPE) {
	                                                            result = {};
	                                                            for (p in props) {
	                                                                        if (props.hasOwnProperty(p)) {
	                                                                                    q = props[p];
	                                                                                    if ((typeof q === 'undefined' ? 'undefined' : _typeof(q)) === OBJ_TYPE) {
	                                                                                                result[q[0]] = undefined;
	                                                                                    } else {
	                                                                                                result[q] = undefined;
	                                                                                    }
	                                                                        }
	                                                            }
	                                                }

	                                                // try matching uastring with regexes
	                                                j = k = 0;
	                                                while (j < regex.length && !matches) {
	                                                            matches = regex[j++].exec(this.getUA());
	                                                            if (!!matches) {
	                                                                        for (p = 0; p < props.length; p++) {
	                                                                                    match = matches[++k];
	                                                                                    q = props[p];
	                                                                                    // check if given property is actually array
	                                                                                    if ((typeof q === 'undefined' ? 'undefined' : _typeof(q)) === OBJ_TYPE && q.length > 0) {
	                                                                                                if (q.length == 2) {
	                                                                                                            if (_typeof(q[1]) == FUNC_TYPE) {
	                                                                                                                        // assign modified match
	                                                                                                                        result[q[0]] = q[1].call(this, match);
	                                                                                                            } else {
	                                                                                                                        // assign given value, ignore regex match
	                                                                                                                        result[q[0]] = q[1];
	                                                                                                            }
	                                                                                                } else if (q.length == 3) {
	                                                                                                            // check whether function or regex
	                                                                                                            if (_typeof(q[1]) === FUNC_TYPE && !(q[1].exec && q[1].test)) {
	                                                                                                                        // call function (usually string mapper)
	                                                                                                                        result[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
	                                                                                                            } else {
	                                                                                                                        // sanitize match using given regex
	                                                                                                                        result[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
	                                                                                                            }
	                                                                                                } else if (q.length == 4) {
	                                                                                                            result[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
	                                                                                                }
	                                                                                    } else {
	                                                                                                result[q] = match ? match : undefined;
	                                                                                    }
	                                                                        }
	                                                            }
	                                                }
	                                                i += 2;
	                                    }
	                                    return result;
	                        },

	                        str: function str(_str, map) {

	                                    for (var i in map) {
	                                                // check if array
	                                                if (_typeof(map[i]) === OBJ_TYPE && map[i].length > 0) {
	                                                            for (var j = 0; j < map[i].length; j++) {
	                                                                        if (util.has(map[i][j], _str)) {
	                                                                                    return i === UNKNOWN ? undefined : i;
	                                                                        }
	                                                            }
	                                                } else if (util.has(map[i], _str)) {
	                                                            return i === UNKNOWN ? undefined : i;
	                                                }
	                                    }
	                                    return _str;
	                        }
	            };

	            ///////////////
	            // String map
	            //////////////

	            var maps = {

	                        browser: {
	                                    oldsafari: {
	                                                version: {
	                                                            '1.0': '/8',
	                                                            '1.2': '/1',
	                                                            '1.3': '/3',
	                                                            '2.0': '/412',
	                                                            '2.0.2': '/416',
	                                                            '2.0.3': '/417',
	                                                            '2.0.4': '/419',
	                                                            '?': '/'
	                                                }
	                                    }
	                        },

	                        device: {
	                                    amazon: {
	                                                model: {
	                                                            'Fire Phone': ['SD', 'KF']
	                                                }
	                                    },
	                                    sprint: {
	                                                model: {
	                                                            'Evo Shift 4G': '7373KT'
	                                                },
	                                                vendor: {
	                                                            'HTC': 'APA',
	                                                            'Sprint': 'Sprint'
	                                                }
	                                    }
	                        },

	                        os: {
	                                    windows: {
	                                                version: {
	                                                            'ME': '4.90',
	                                                            'NT 3.11': 'NT3.51',
	                                                            'NT 4.0': 'NT4.0',
	                                                            '2000': 'NT 5.0',
	                                                            'XP': ['NT 5.1', 'NT 5.2'],
	                                                            'Vista': 'NT 6.0',
	                                                            '7': 'NT 6.1',
	                                                            '8': 'NT 6.2',
	                                                            '8.1': 'NT 6.3',
	                                                            '10': ['NT 6.4', 'NT 10.0'],
	                                                            'RT': 'ARM'
	                                                }
	                                    }
	                        }
	            };

	            //////////////
	            // Regex map
	            /////////////

	            var regexes = {

	                        browser: [[

	                        // Presto based
	                        /(opera\smini)\/([\w\.-]+)/i, // Opera Mini
	                        /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, // Opera Mobi/Tablet
	                        /(opera).+version\/([\w\.]+)/i, // Opera > 9.80
	                        /(opera)[\/\s]+([\w\.]+)/i // Opera < 9.80

	                        ], [NAME, VERSION], [/\s(opr)\/([\w\.]+)/i // Opera Webkit
	                        ], [[NAME, 'Opera'], VERSION], [

	                        // Mixed
	                        /(kindle)\/([\w\.]+)/i, // Kindle
	                        /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,
	                        // Lunascape/Maxthon/Netfront/Jasmine/Blazer

	                        // Trident based
	                        /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
	                        // Avant/IEMobile/SlimBrowser/Baidu
	                        /(?:ms|\()(ie)\s([\w\.]+)/i, // Internet Explorer

	                        // Webkit/KHTML based
	                        /(rekonq)\/([\w\.]+)*/i, // Rekonq
	                        /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs)\/([\w\.-]+)/i
	                        // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS
	                        ], [NAME, VERSION], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i // IE11
	                        ], [[NAME, 'IE'], VERSION], [/(edge)\/((\d+)?[\w\.]+)/i // Microsoft Edge
	                        ], [NAME, VERSION], [/(yabrowser)\/([\w\.]+)/i // Yandex
	                        ], [[NAME, 'Yandex'], VERSION], [/(comodo_dragon)\/([\w\.]+)/i // Comodo Dragon
	                        ], [[NAME, /_/g, ' '], VERSION], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i,
	                        // Chrome/OmniWeb/Arora/Tizen/Nokia
	                        /(qqbrowser)[\/\s]?([\w\.]+)/i
	                        // QQBrowser
	                        ], [NAME, VERSION], [/(uc\s?browser)[\/\s]?([\w\.]+)/i, /ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i, /JUC.+(ucweb)[\/\s]?([\w\.]+)/i
	                        // UCBrowser
	                        ], [[NAME, 'UCBrowser'], VERSION], [/(dolfin)\/([\w\.]+)/i // Dolphin
	                        ], [[NAME, 'Dolphin'], VERSION], [/((?:android.+)crmo|crios)\/([\w\.]+)/i // Chrome for Android/iOS
	                        ], [[NAME, 'Chrome'], VERSION], [/XiaoMi\/MiuiBrowser\/([\w\.]+)/i // MIUI Browser
	                        ], [VERSION, [NAME, 'MIUI Browser']], [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i // Android Browser
	                        ], [VERSION, [NAME, 'Android Browser']], [/FBAV\/([\w\.]+);/i // Facebook App for iOS
	                        ], [VERSION, [NAME, 'Facebook']], [/fxios\/([\w\.-]+)/i // Firefox for iOS
	                        ], [VERSION, [NAME, 'Firefox']], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i // Mobile Safari
	                        ], [VERSION, [NAME, 'Mobile Safari']], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i // Safari & Safari Mobile
	                        ], [VERSION, NAME], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Safari < 3.0
	                        ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [/(konqueror)\/([\w\.]+)/i, // Konqueror
	                        /(webkit|khtml)\/([\w\.]+)/i], [NAME, VERSION], [

	                        // Gecko based
	                        /(navigator|netscape)\/([\w\.-]+)/i // Netscape
	                        ], [[NAME, 'Netscape'], VERSION], [/(swiftfox)/i, // Swiftfox
	                        /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
	                        // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
	                        /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,
	                        // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
	                        /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, // Mozilla

	                        // Other
	                        /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
	                        // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
	                        /(links)\s\(([\w\.]+)/i, // Links
	                        /(gobrowser)\/?([\w\.]+)*/i, // GoBrowser
	                        /(ice\s?browser)\/v?([\w\._]+)/i, // ICE Browser
	                        /(mosaic)[\/\s]([\w\.]+)/i // Mosaic
	                        ], [NAME, VERSION]

	                        /* /////////////////////
	                        // Media players BEGIN
	                        ////////////////////////
	                          , [
	                          /(apple(?:coremedia|))\/((\d+)[\w\._]+)/i,                          // Generic Apple CoreMedia
	                        /(coremedia) v((\d+)[\w\._]+)/i
	                        ], [NAME, VERSION], [
	                          /(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i                     // Aqualung/Lyssna/BSPlayer
	                        ], [NAME, VERSION], [
	                          /(ares|ossproxy)\s((\d+)[\w\.-]+)/i                                 // Ares/OSSProxy
	                        ], [NAME, VERSION], [
	                          /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i,
	                                                                                            // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
	                                                                                            // NSPlayer/PSP-InternetRadioPlayer/Videos
	                        /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i,               // Clementine/MPD
	                        /(lg player|nexplayer)\s((\d+)[\d\.]+)/i,
	                        /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i                   // NexPlayer/LG Player
	                        ], [NAME, VERSION], [
	                        /(nexplayer)\s((\d+)[\w\.-]+)/i                                     // Nexplayer
	                        ], [NAME, VERSION], [
	                          /(flrp)\/((\d+)[\w\.-]+)/i                                          // Flip Player
	                        ], [[NAME, 'Flip Player'], VERSION], [
	                          /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
	                                                                                            // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
	                        ], [NAME], [
	                          /(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i
	                                                                                            // Gstreamer
	                        ], [NAME, VERSION], [
	                          /(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i,              // HTC Streaming Player
	                        /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i,
	                                                                                            // Java/urllib/requests/wget/cURL
	                        /(lavf)((\d+)[\d\.]+)/i                                             // Lavf (FFMPEG)
	                        ], [NAME, VERSION], [
	                          /(htc_one_s)\/((\d+)[\d\.]+)/i                                      // HTC One S
	                        ], [[NAME, /_/g, ' '], VERSION], [
	                          /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i
	                                                                                            // MPlayer SVN
	                        ], [NAME, VERSION], [
	                          /(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i                      // MPlayer
	                        ], [NAME, VERSION], [
	                          /(mplayer)/i,                                                       // MPlayer (no other info)
	                        /(yourmuze)/i,                                                      // YourMuze
	                        /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
	                        ], [NAME], [
	                          /(nero (?:home|scout))\/((\d+)[\w\.-]+)/i                           // Nero Home/Nero Scout
	                        ], [NAME, VERSION], [
	                          /(nokia\d+)\/((\d+)[\w\.-]+)/i                                      // Nokia
	                        ], [NAME, VERSION], [
	                          /\s(songbird)\/((\d+)[\w\.-]+)/i                                    // Songbird/Philips-Songbird
	                        ], [NAME, VERSION], [
	                          /(winamp)3 version ((\d+)[\w\.-]+)/i,                               // Winamp
	                        /(winamp)\s((\d+)[\w\.-]+)/i,
	                        /(winamp)mpeg\/((\d+)[\w\.-]+)/i
	                        ], [NAME, VERSION], [
	                          /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
	                                                                                            // inlight radio
	                        ], [NAME], [
	                          /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i
	                                                                                            // QuickTime/RealMedia/RadioApp/RadioClientApplication/
	                                                                                            // SoundTap/Totem/Stagefright/Streamium
	                        ], [NAME, VERSION], [
	                          /(smp)((\d+)[\d\.]+)/i                                              // SMP
	                        ], [NAME, VERSION], [
	                          /(vlc) media player - version ((\d+)[\w\.]+)/i,                     // VLC Videolan
	                        /(vlc)\/((\d+)[\w\.-]+)/i,
	                        /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i,                    // XBMC/gvfs/Xine/XMMS/irapp
	                        /(foobar2000)\/((\d+)[\d\.]+)/i,                                    // Foobar2000
	                        /(itunes)\/((\d+)[\d\.]+)/i                                         // iTunes
	                        ], [NAME, VERSION], [
	                          /(wmplayer)\/((\d+)[\w\.-]+)/i,                                     // Windows Media Player
	                        /(windows-media-player)\/((\d+)[\w\.-]+)/i
	                        ], [[NAME, /-/g, ' '], VERSION], [
	                          /windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i
	                                                                                            // Windows Media Server
	                        ], [VERSION, [NAME, 'Windows']], [
	                          /(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i                          // RiseUP Radio Alarm
	                        ], [NAME, VERSION], [
	                          /(rad.io)\s((\d+)[\d\.]+)/i,                                        // Rad.io
	                        /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i
	                        ], [[NAME, 'rad.io'], VERSION]
	                          //////////////////////
	                        // Media players END
	                        ////////////////////*/

	                        ],

	                        cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i // AMD64
	                        ], [[ARCHITECTURE, 'amd64']], [/(ia32(?=;))/i // IA32 (quicktime)
	                        ], [[ARCHITECTURE, util.lowerize]], [/((?:i[346]|x)86)[;\)]/i // IA32
	                        ], [[ARCHITECTURE, 'ia32']], [

	                        // PocketPC mistakenly identified as PowerPC
	                        /windows\s(ce|mobile);\sppc;/i], [[ARCHITECTURE, 'arm']], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i // PowerPC
	                        ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [/(sun4\w)[;\)]/i // SPARC
	                        ], [[ARCHITECTURE, 'sparc']], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
	                        // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
	                        ], [[ARCHITECTURE, util.lowerize]]],

	                        device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i // iPad/PlayBook
	                        ], [MODEL, VENDOR, [TYPE, TABLET]], [/applecoremedia\/[\w\.]+ \((ipad)/ // iPad
	                        ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [/(apple\s{0,1}tv)/i // Apple TV
	                        ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple']], [/(archos)\s(gamepad2?)/i, // Archos
	                        /(hp).+(touchpad)/i, // HP TouchPad
	                        /(kindle)\/([\w\.]+)/i, // Kindle
	                        /\s(nook)[\w\s]+build\/(\w+)/i, // Nook
	                        /(dell)\s(strea[kpr\s\d]*[\dko])/i // Dell Streak
	                        ], [VENDOR, MODEL, [TYPE, TABLET]], [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i // Kindle Fire HD
	                        ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i // Fire Phone
	                        ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [/\((ip[honed|\s\w*]+);.+(apple)/i // iPod/iPhone
	                        ], [MODEL, VENDOR, [TYPE, MOBILE]], [/\((ip[honed|\s\w*]+);/i // iPod/iPhone
	                        ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [/(blackberry)[\s-]?(\w+)/i, // BlackBerry
	                        /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,
	                        // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Huawei/Meizu/Motorola/Polytron
	                        /(hp)\s([\w\s]+\w)/i, // HP iPAQ
	                        /(asus)-?(\w+)/i // Asus
	                        ], [VENDOR, MODEL, [TYPE, MOBILE]], [/\(bb10;\s(\w+)/i // BlackBerry 10
	                        ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
	                        // Asus Tablets
	                        /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [/(sony)\s(tablet\s[ps])\sbuild\//i, // Sony
	                        /(sony)?(?:sgp.+)\sbuild\//i], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i], [[VENDOR, 'Sony'], [MODEL, 'Xperia Phone'], [TYPE, MOBILE]], [/\s(ouya)\s/i, // Ouya
	                        /(nintendo)\s([wids3u]+)/i // Nintendo
	                        ], [VENDOR, MODEL, [TYPE, CONSOLE]], [/android.+;\s(shield)\sbuild/i // Nvidia
	                        ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [/(playstation\s[34portablevi]+)/i // Playstation
	                        ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [/(sprint\s(\w+))/i // Sprint Phones
	                        ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i // Lenovo tablets
	                        ], [VENDOR, MODEL, [TYPE, TABLET]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, // HTC
	                        /(zte)-(\w+)*/i, // ZTE
	                        /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i
	                        // Alcatel/GeeksPhone/Huawei/Lenovo/Nexian/Panasonic/Sony
	                        ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [/(nexus\s9)/i // HTC Nexus 9
	                        ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i // Microsoft Xbox
	                        ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [/(kin\.[onetw]{3})/i // Microsoft Kin
	                        ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [

	                        // Motorola
	                        /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w+)*/i, /(XT\d{3,4}) build\//i, /(nexus\s[6])/i], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [// Samsung
	                        /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [/(samsung);smarttv/i], [VENDOR, MODEL, [TYPE, SMARTTV]], [/\(dtv[\);].+(aquos)/i // Sharp
	                        ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [/sie-(\w+)*/i // Siemens
	                        ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, // Nokia
	                        /(nokia)[\s_-]?([\w-]+)*/i], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [/android\s3\.[\s\w;-]{10}(a\d{3})/i // Acer
	                        ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i // LG Tablet
	                        ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [/(lg) netcast\.tv/i // LG SmartTV
	                        ], [VENDOR, MODEL, [TYPE, SMARTTV]], [/(nexus\s[45])/i, // LG
	                        /lg[e;\s\/-]+(\w+)*/i], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [/android.+(ideatab[a-z0-9\-\s]+)/i // Lenovo
	                        ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [/linux;.+((jolla));/i // Jolla
	                        ], [VENDOR, MODEL, [TYPE, MOBILE]], [/((pebble))app\/[\d\.]+\s/i // Pebble
	                        ], [VENDOR, MODEL, [TYPE, WEARABLE]], [/android.+;\s(glass)\s\d/i // Google Glass
	                        ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [/android.+(\w+)\s+build\/hm\1/i, // Xiaomi Hongmi 'numeric' models
	                        /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, // Xiaomi Hongmi
	                        /android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i // Xiaomi Mi
	                        ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [/\s(tablet)[;\/\s]/i, // Unidentifiable Tablet
	                        /\s(mobile)[;\/\s]/i // Unidentifiable Mobile
	                        ], [[TYPE, util.lowerize], VENDOR, MODEL]

	                        /*//////////////////////////
	                        // TODO: move to string map
	                        ////////////////////////////
	                          /(C6603)/i                                                          // Sony Xperia Z C6603
	                        ], [[MODEL, 'Xperia Z C6603'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
	                        /(C6903)/i                                                          // Sony Xperia Z 1
	                        ], [[MODEL, 'Xperia Z 1'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
	                          /(SM-G900[F|H])/i                                                   // Samsung Galaxy S5
	                        ], [[MODEL, 'Galaxy S5'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	                        /(SM-G7102)/i                                                       // Samsung Galaxy Grand 2
	                        ], [[MODEL, 'Galaxy Grand 2'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	                        /(SM-G530H)/i                                                       // Samsung Galaxy Grand Prime
	                        ], [[MODEL, 'Galaxy Grand Prime'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	                        /(SM-G313HZ)/i                                                      // Samsung Galaxy V
	                        ], [[MODEL, 'Galaxy V'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	                        /(SM-T805)/i                                                        // Samsung Galaxy Tab S 10.5
	                        ], [[MODEL, 'Galaxy Tab S 10.5'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
	                        /(SM-G800F)/i                                                       // Samsung Galaxy S5 Mini
	                        ], [[MODEL, 'Galaxy S5 Mini'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	                        /(SM-T311)/i                                                        // Samsung Galaxy Tab 3 8.0
	                        ], [[MODEL, 'Galaxy Tab 3 8.0'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
	                          /(R1001)/i                                                          // Oppo R1001
	                        ], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [
	                        /(X9006)/i                                                          // Oppo Find 7a
	                        ], [[MODEL, 'Find 7a'], [VENDOR, 'Oppo'], [TYPE, MOBILE]], [
	                        /(R2001)/i                                                          // Oppo YOYO R2001
	                        ], [[MODEL, 'Yoyo R2001'], [VENDOR, 'Oppo'], [TYPE, MOBILE]], [
	                        /(R815)/i                                                           // Oppo Clover R815
	                        ], [[MODEL, 'Clover R815'], [VENDOR, 'Oppo'], [TYPE, MOBILE]], [
	                         /(U707)/i                                                          // Oppo Find Way S
	                        ], [[MODEL, 'Find Way S'], [VENDOR, 'Oppo'], [TYPE, MOBILE]], [
	                          /(T3C)/i                                                            // Advan Vandroid T3C
	                        ], [MODEL, [VENDOR, 'Advan'], [TYPE, TABLET]], [
	                        /(ADVAN T1J\+)/i                                                    // Advan Vandroid T1J+
	                        ], [[MODEL, 'Vandroid T1J+'], [VENDOR, 'Advan'], [TYPE, TABLET]], [
	                        /(ADVAN S4A)/i                                                      // Advan Vandroid S4A
	                        ], [[MODEL, 'Vandroid S4A'], [VENDOR, 'Advan'], [TYPE, MOBILE]], [
	                          /(V972M)/i                                                          // ZTE V972M
	                        ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [
	                          /(i-mobile)\s(IQ\s[\d\.]+)/i                                        // i-mobile IQ
	                        ], [VENDOR, MODEL, [TYPE, MOBILE]], [
	                        /(IQ6.3)/i                                                          // i-mobile IQ IQ 6.3
	                        ], [[MODEL, 'IQ 6.3'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
	                        /(i-mobile)\s(i-style\s[\d\.]+)/i                                   // i-mobile i-STYLE
	                        ], [VENDOR, MODEL, [TYPE, MOBILE]], [
	                        /(i-STYLE2.1)/i                                                     // i-mobile i-STYLE 2.1
	                        ], [[MODEL, 'i-STYLE 2.1'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
	                        
	                        /(mobiistar touch LAI 512)/i                                        // mobiistar touch LAI 512
	                        ], [[MODEL, 'Touch LAI 512'], [VENDOR, 'mobiistar'], [TYPE, MOBILE]], [
	                          /////////////
	                        // END TODO
	                        ///////////*/

	                        ],

	                        engine: [[/windows.+\sedge\/([\w\.]+)/i // EdgeHTML
	                        ], [VERSION, [NAME, 'EdgeHTML']], [/(presto)\/([\w\.]+)/i, // Presto
	                        /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
	                        /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, // KHTML/Tasman/Links
	                        /(icab)[\/\s]([23]\.[\d\.]+)/i // iCab
	                        ], [NAME, VERSION], [/rv\:([\w\.]+).*(gecko)/i // Gecko
	                        ], [VERSION, NAME]],

	                        os: [[

	                        // Windows based
	                        /microsoft\s(windows)\s(vista|xp)/i // Windows (iTunes)
	                        ], [NAME, VERSION], [/(windows)\snt\s6\.2;\s(arm)/i, // Windows RT
	                        /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

	                        // Mobile/Embedded OS
	                        /\((bb)(10);/i // BlackBerry 10
	                        ], [[NAME, 'BlackBerry'], VERSION], [/(blackberry)\w*\/?([\w\.]+)*/i, // Blackberry
	                        /(tizen)[\/\s]([\w\.]+)/i, // Tizen
	                        /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,
	                        // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
	                        /linux;.+(sailfish);/i // Sailfish OS
	                        ], [NAME, VERSION], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i // Symbian
	                        ], [[NAME, 'Symbian'], VERSION], [/\((series40);/i // Series 40
	                        ], [NAME], [/mozilla.+\(mobile;.+gecko.+firefox/i // Firefox OS
	                        ], [[NAME, 'Firefox OS'], VERSION], [

	                        // Console
	                        /(nintendo|playstation)\s([wids34portablevu]+)/i, // Nintendo/Playstation

	                        // GNU/Linux based
	                        /(mint)[\/\s\(]?(\w+)*/i, // Mint
	                        /(mageia|vectorlinux)[;\s]/i, // Mageia/VectorLinux
	                        /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i,
	                        // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
	                        // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
	                        /(hurd|linux)\s?([\w\.]+)*/i, // Hurd/Linux
	                        /(gnu)\s?([\w\.]+)*/i // GNU
	                        ], [NAME, VERSION], [/(cros)\s[\w]+\s([\w\.]+\w)/i // Chromium OS
	                        ], [[NAME, 'Chromium OS'], VERSION], [

	                        // Solaris
	                        /(sunos)\s?([\w\.]+\d)*/i // Solaris
	                        ], [[NAME, 'Solaris'], VERSION], [

	                        // BSD based
	                        /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
	                        ], [NAME, VERSION], [/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i // iOS
	                        ], [[NAME, 'iOS'], [VERSION, /_/g, '.']], [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i // Mac OS
	                        ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

	                        // Other
	                        /((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, // Solaris
	                        /(haiku)\s(\w+)/i, // Haiku
	                        /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, // AIX
	                        /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
	                        // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS
	                        /(unix)\s?([\w\.]+)*/i // UNIX
	                        ], [NAME, VERSION]]
	            };

	            /////////////////
	            // Constructor
	            ////////////////

	            var UAParser = function UAParser(uastring, extensions) {

	                        if (!(this instanceof UAParser)) {
	                                    return new UAParser(uastring, extensions).getResult();
	                        }

	                        var ua = uastring || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);
	                        var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;

	                        this.getBrowser = function () {
	                                    var browser = mapper.rgx.apply(this, rgxmap.browser);
	                                    browser.major = util.major(browser.version);
	                                    return browser;
	                        };
	                        this.getCPU = function () {
	                                    return mapper.rgx.apply(this, rgxmap.cpu);
	                        };
	                        this.getDevice = function () {
	                                    return mapper.rgx.apply(this, rgxmap.device);
	                        };
	                        this.getEngine = function () {
	                                    return mapper.rgx.apply(this, rgxmap.engine);
	                        };
	                        this.getOS = function () {
	                                    return mapper.rgx.apply(this, rgxmap.os);
	                        };
	                        this.getResult = function () {
	                                    return {
	                                                ua: this.getUA(),
	                                                browser: this.getBrowser(),
	                                                engine: this.getEngine(),
	                                                os: this.getOS(),
	                                                device: this.getDevice(),
	                                                cpu: this.getCPU()
	                                    };
	                        };
	                        this.getUA = function () {
	                                    return ua;
	                        };
	                        this.setUA = function (uastring) {
	                                    ua = uastring;
	                                    return this;
	                        };
	                        this.setUA(ua);
	                        return this;
	            };

	            UAParser.VERSION = LIBVERSION;
	            UAParser.BROWSER = {
	                        NAME: NAME,
	                        MAJOR: MAJOR, // deprecated
	                        VERSION: VERSION
	            };
	            UAParser.CPU = {
	                        ARCHITECTURE: ARCHITECTURE
	            };
	            UAParser.DEVICE = {
	                        MODEL: MODEL,
	                        VENDOR: VENDOR,
	                        TYPE: TYPE,
	                        CONSOLE: CONSOLE,
	                        MOBILE: MOBILE,
	                        SMARTTV: SMARTTV,
	                        TABLET: TABLET,
	                        WEARABLE: WEARABLE,
	                        EMBEDDED: EMBEDDED
	            };
	            UAParser.ENGINE = {
	                        NAME: NAME,
	                        VERSION: VERSION
	            };
	            UAParser.OS = {
	                        NAME: NAME,
	                        VERSION: VERSION
	            };

	            ///////////
	            // Export
	            //////////

	            // check js environment
	            if (( false ? 'undefined' : _typeof(exports)) !== UNDEF_TYPE) {
	                        // nodejs env
	                        if (( false ? 'undefined' : _typeof(module)) !== UNDEF_TYPE && module.exports) {
	                                    exports = module.exports = UAParser;
	                        }
	                        exports.UAParser = UAParser;
	            } else {
	                        // requirejs env (optional)
	                        if (( false ? 'undefined' : _typeof(__webpack_require__(195))) === FUNC_TYPE && __webpack_require__(196)) {
	                                    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	                                                return UAParser;
	                                    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	                        } else {
	                                    // browser env
	                                    window.UAParser = UAParser;
	                        }
	            }

	            // jQuery/Zepto specific (optional)
	            // Note:
	            //   In AMD env the global scope should be kept clean, but jQuery is an exception.
	            //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
	            //   and we should catch that.
	            var $ = window.jQuery || window.Zepto;
	            if ((typeof $ === 'undefined' ? 'undefined' : _typeof($)) !== UNDEF_TYPE) {
	                        var parser = new UAParser();
	                        $.ua = parser.getResult();
	                        $.ua.get = function () {
	                                    return parser.getUA();
	                        };
	                        $.ua.set = function (uastring) {
	                                    parser.setUA(uastring);
	                                    var result = parser.getResult();
	                                    for (var prop in result) {
	                                                $.ua[prop] = result[prop];
	                                    }
	                        };
	            }
	})((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' ? window : undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(197)(module)))

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function warning() {};

	if (process.env.NODE_ENV !== 'production') {
	  warning = function warning(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.length < 10 || /^[s\W]*$/.test(format)) {
	      throw new Error('The warning format should be able to uniquely identify this ' + 'warning. Please, use a more descriptive format than: ' + format);
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(165)))

/***/ },
/* 195 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 196 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 197 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var About = _react2.default.createClass({
	    displayName: 'About',
	    getInitialState: function getInitialState() {
	        // react-router会每次重新构建组件
	        console.log('重新渲染了？');
	        return {
	            option: [],
	            list: []
	        };
	    },
	    search: function search() {
	        this.setState({
	            list: [{ name: 'ss', title: '222' }],
	            option: [{ key: '22', value: 'ddd' }],
	            value: ''
	        });
	    },
	    selectChange: function selectChange() {
	        this.setState({
	            value: this.refs.heihei.value
	        });
	    },
	    render: function render() {
	        var _this = this;

	        var P = this.state.list.map(function (item, index) {
	            return _react2.default.createElement(
	                'div',
	                { key: _this.keyNum++ },
	                _react2.default.createElement(
	                    'span',
	                    null,
	                    item.name
	                ),
	                _react2.default.createElement(
	                    'span',
	                    null,
	                    item.title
	                ),
	                _react2.default.createElement(
	                    'select',
	                    { name: '', id: '', value: _this.state.value, ref: 'heihei', onChange: _this.selectChange },
	                    _react2.default.createElement(
	                        'option',
	                        { value: '' },
	                        '选择'
	                    ),
	                    _this.state.option.map(function (ele) {
	                        return _react2.default.createElement(
	                            'option',
	                            { value: ele.value },
	                            ele.key
	                        );
	                    })
	                )
	            );
	        });

	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'h1',
	                null,
	                '关于'
	            ),
	            _react2.default.createElement(
	                'button',
	                { onClick: this.search },
	                'Search'
	            ),
	            P,
	            '念桥边红药，年年知为谁生？'
	        );
	    }
	});

	exports.default = About;

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Article = _react2.default.createClass({
	    displayName: 'Article',
	    render: function render() {
	        var LIST = [{ id: 1, title: '蒋门神' }, { id: 2, title: '潘金莲' }, { id: 3, title: '宋江山' }, { id: 4, title: '蔡京' }];
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'h1',
	                null,
	                '文章'
	            ),
	            _react2.default.createElement(
	                'div',
	                null,
	                LIST.map(function (item) {
	                    var url = '/article/' + item.id;
	                    return _react2.default.createElement(
	                        'li',
	                        null,
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: url },
	                            ' ',
	                            item.title,
	                            ' '
	                        )
	                    );
	                })
	            )
	        );
	    }
	});

	exports.default = Article;

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(172);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ArticleInfo = _react2.default.createClass({
	    displayName: 'ArticleInfo',
	    getInitialState: function getInitialState() {
	        return {};
	    },
	    search: function search() {
	        var _this = this;

	        var form = document.querySelector('#form');
	        var fd = new FormData(form);

	        Ajax({
	            type: 'put',
	            // url: '/test/'+this.props.params.id ,
	            // url: '/upload',
	            url: "/static/data/" + this.props.params.id + ".json",
	            dataType: 'string'
	        }). // data: fd,
	        // timeout: 1000 ,
	        // upload: function( precent ){
	        //     console.log('不得了',precent)
	        // }
	        then(function (data) {
	            console.log('数据请求成功了呢', data);
	            _this.setState(JSON.parse(data));
	        }, function (msg) {
	            console.log(msg);
	        });
	    },
	    componentDidMount: function componentDidMount() {
	        var _this2 = this;

	        Ajax({
	            type: 'get',
	            url: "/static/data/" + this.props.params.id + ".json",
	            dataType: 'string'
	        }).then(function (data) {
	            console.log('数据请求成功了呢', data);
	            _this2.setState(JSON.parse(data));
	        }, function (msg) {
	            console.log(msg);
	        });
	    },
	    render: function render() {
	        var state = this.state;

	        return _react2.default.createElement(
	            'div',
	            null,
	            '文章ID:',
	            this.props.params.id,
	            _react2.default.createElement(
	                'button',
	                { onClick: this.search },
	                '搜搜'
	            ),
	            _react2.default.createElement(
	                'form',
	                { action: '', id: 'form' },
	                _react2.default.createElement('input', { type: 'file', name: 'heihei' })
	            ),
	            _react2.default.createElement(
	                'h2',
	                null,
	                state.title
	            ),
	            _react2.default.createElement(
	                'div',
	                null,
	                state.content
	            )
	        );
	    }
	});

	exports.default = ArticleInfo;

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _draftJs = __webpack_require__(26);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// draft-js : react rich editor，详见github

	var MyEditor = function (_React$Component) {
	    _inherits(MyEditor, _React$Component);

	    function MyEditor(props) {
	        _classCallCheck(this, MyEditor);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MyEditor).call(this, props));

	        _this.state = {
	            editorState: _draftJs.EditorState.createEmpty()
	        };

	        _this.focus = function () {
	            return _this.refs.editor.focus();
	        };
	        _this.onChange = function (editorState) {
	            return _this.setState({ editorState: editorState });
	        };

	        _this.handleKeyCommand = function (command) {
	            return _this._handleKeyCommand(command);
	        };
	        _this.toggleBlockType = function (type) {
	            return _this._toggleBlockType(type);
	        };
	        _this.toggleInlineStyle = function (style) {
	            return _this._toggleInlineStyle(style);
	        };
	        return _this;
	    }

	    _createClass(MyEditor, [{
	        key: '_handleKeyCommand',
	        value: function _handleKeyCommand(command) {
	            var editorState = this.state.editorState;

	            var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
	            if (newState) {
	                this.onChange(newState);
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: '_toggleBlockType',
	        value: function _toggleBlockType(blockType) {
	            this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, blockType));
	        }
	    }, {
	        key: '_toggleInlineStyle',
	        value: function _toggleInlineStyle(inlineStyle) {
	            this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var editorState = this.state.editorState;

	            // If the user changes block type before entering any text, we can
	            // either style the placeholder or hide it. Let's just hide it now.

	            var className = 'RichEditor-editor';
	            var contentState = editorState.getCurrentContent();
	            if (!contentState.hasText()) {
	                if (contentState.getBlockMap().first().getType() !== 'unstyled') {
	                    className += ' RichEditor-hidePlaceholder';
	                }
	            }

	            return _react2.default.createElement(
	                'div',
	                { className: 'RichEditor-root' },
	                _react2.default.createElement(BlockStyleControls, { editorState: editorState, onToggle: this.toggleBlockType }),
	                _react2.default.createElement(InlineStyleControls, { editorState: editorState, onToggle: this.toggleInlineStyle }),
	                _react2.default.createElement(
	                    'div',
	                    { className: className, onClick: this.focus },
	                    _react2.default.createElement(_draftJs.Editor, { blockStyleFn: getBlockStyle, customStyleMap: styleMap, editorState: editorState, handleKeyCommand: this.handleKeyCommand, onChange: this.onChange, placeholder: 'Tell a story...', ref: 'editor', spellCheck: true })
	                )
	            );
	        }
	    }]);

	    return MyEditor;
	}(_react2.default.Component);

	// Custom overrides for "code" style.

	var styleMap = {
	    CODE: {
	        backgroundColor: 'rgba(0, 0, 0, 0.05)',
	        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
	        fontSize: 16,
	        padding: 2
	    }
	};

	function getBlockStyle(block) {
	    switch (block.getType()) {
	        case 'blockquote':
	            return 'RichEditor-blockquote';
	        default:
	            return null;
	    }
	}

	var StyleButton = function (_React$Component2) {
	    _inherits(StyleButton, _React$Component2);

	    function StyleButton() {
	        _classCallCheck(this, StyleButton);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(StyleButton).call(this));

	        _this2.onToggle = function (e) {
	            e.preventDefault();
	            _this2.props.onToggle(_this2.props.style);
	        };
	        return _this2;
	    }

	    _createClass(StyleButton, [{
	        key: 'render',
	        value: function render() {
	            var className = 'RichEditor-styleButton';
	            if (this.props.active) {
	                className += ' RichEditor-activeButton';
	            }

	            return _react2.default.createElement(
	                'span',
	                { className: className, onMouseDown: this.onToggle },
	                this.props.label
	            );
	        }
	    }]);

	    return StyleButton;
	}(_react2.default.Component);

	var BLOCK_TYPES = [{
	    label: 'H1',
	    style: 'header-one'
	}, {
	    label: 'H2',
	    style: 'header-two'
	}, {
	    label: 'Blockquote',
	    style: 'blockquote'
	}, {
	    label: 'UL',
	    style: 'unordered-list-item'
	}, {
	    label: 'OL',
	    style: 'ordered-list-item'
	}, {
	    label: 'Code Block',
	    style: 'code-block'
	}];

	var BlockStyleControls = function BlockStyleControls(props) {
	    var editorState = props.editorState;

	    var selection = editorState.getSelection();
	    var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

	    return _react2.default.createElement(
	        'div',
	        { className: 'RichEditor-controls' },
	        BLOCK_TYPES.map(function (type) {
	            return _react2.default.createElement(StyleButton, { key: type.label, active: type.style === blockType, label: type.label, onToggle: props.onToggle, style: type.style });
	        })
	    );
	};

	var INLINE_STYLES = [{
	    label: 'Bold',
	    style: 'BOLD'
	}, {
	    label: 'Italic',
	    style: 'ITALIC'
	}, {
	    label: 'Underline',
	    style: 'UNDERLINE'
	}, {
	    label: 'Monospace',
	    style: 'CODE'
	}];

	var InlineStyleControls = function InlineStyleControls(props) {
	    var currentStyle = props.editorState.getCurrentInlineStyle();
	    return _react2.default.createElement(
	        'div',
	        { className: 'RichEditor-controls' },
	        INLINE_STYLES.map(function (type) {
	            return _react2.default.createElement(StyleButton, { key: type.label, active: currentStyle.has(type.style), label: type.label, onToggle: props.onToggle, style: type.style });
	        })
	    );
	};

	exports.default = MyEditor;

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Footer = (0, _react.createClass)({
	    // 只在开版本，会抛出错误
	    propTypes: {
	        optinalArray: _react2.default.PropTypes.array
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            optinalArray: '222'
	        };
	    },
	    render: function render() {
	        return _react2.default.createElement(
	            'div',
	            { style: { color: 'rgb(200,200,200)', lineHeight: '2' } },
	            _react2.default.createElement(
	                'i',
	                null,
	                'react & react-router @ copyright Facebook ',
	                this.props.optinalArray,
	                ' '
	            )
	        );
	    }
	});

	exports.default = Footer;

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var data = [{
	    title: '红颜旧',
	    summary: '知之不知，望向这什么？'
	}, {
	    title: '红颜旧',
	    summary: '知之不知，望向这什么？'
	}, {
	    title: '红颜旧',
	    summary: '知之不知，望向这什么？'
	}, {
	    title: '红颜旧',
	    summary: '知之不知，望向这什么？'
	}, {
	    title: '红颜旧',
	    summary: '知之不知，望向这什么？'
	}];

	var Home = _react2.default.createClass({
	    displayName: 'Home',
	    getInitialState: function getInitialState() {
	        return {
	            upload: [1]
	        };
	    },
	    render: function render() {
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'h1',
	                null,
	                '主页/Home'
	            ),
	            _react2.default.createElement(
	                'div',
	                null,
	                data.map(function (item) {
	                    return _react2.default.createElement(
	                        'div',
	                        null,
	                        _react2.default.createElement(
	                            'h3',
	                            null,
	                            item.title
	                        ),
	                        _react2.default.createElement(
	                            'p',
	                            null,
	                            item.summary
	                        )
	                    );
	                })
	            )
	        );
	    }
	});

	exports.default = Home;

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(192)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/less-loader/index.js!./../../../../node_modules/autoprefixer-loader/index.js!./index.less", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/less-loader/index.js!./../../../../node_modules/autoprefixer-loader/index.js!./index.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _edit = __webpack_require__(201);

	var _edit2 = _interopRequireDefault(_edit);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Message = _react2.default.createClass({
	    displayName: 'Message',
	    componentDidMount: function componentDidMount() {
	        // 这个也可以用嘛，哈哈哈
	        _reactDom2.default.render(_react2.default.createElement(_edit2.default, null), document.getElementById('container'));
	    },
	    render: function render() {
	        var LIST = [{ time: '2007-9-1', username: '枫叶', content: '很高兴认识你' }, { time: '2007-11-1', username: '枫叶', content: '血雾迷尘，念去去，千里烟波，暮霭沉沉楚天阔' }];
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'h2',
	                null,
	                '留言板'
	            ),
	            _react2.default.createElement(
	                'div',
	                null,
	                LIST.map(function (item, index) {
	                    return _react2.default.createElement(
	                        'div',
	                        null,
	                        _react2.default.createElement(
	                            'span',
	                            null,
	                            index + 1,
	                            '楼'
	                        ),
	                        _react2.default.createElement(
	                            'p',
	                            null,
	                            item.username
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            null,
	                            item.content
	                        ),
	                        _react2.default.createElement(
	                            'span',
	                            null,
	                            item.time
	                        )
	                    );
	                })
	            ),
	            _react2.default.createElement(
	                'h1',
	                null,
	                '编辑器'
	            ),
	            _react2.default.createElement('div', { id: 'container' })
	        );
	    }
	});

	exports.default = Message;

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(209);

	var Nav = (0, _react.createClass)({
	    render: function render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'nav' },
	            _react2.default.createElement(
	                'h1',
	                null,
	                'React 单页面应用'
	            )
	        );
	    }
	});

	exports.default = Nav;

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var NotFound = _react2.default.createClass({
	    displayName: 'NotFound',
	    render: function render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'sidebar' },
	            'e 这倒不到这个页面 你来到了荒漠'
	        );
	    }
	});

	exports.default = NotFound;

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(172);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(210);

	var Nav = _react2.default.createClass({
	    displayName: 'Nav',
	    render: function render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'sidebar' },
	            _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: '/home' },
	                    '主页'
	                )
	            ),
	            _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: '/article' },
	                    '文章'
	                )
	            ),
	            _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: '/message' },
	                    '留言'
	                )
	            ),
	            _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: '/about' },
	                    '关于'
	                )
	            )
	        );
	    }
	});

	exports.default = Nav;

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(192)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/less-loader/index.js!./../../../../../node_modules/autoprefixer-loader/index.js!./nav.less", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/less-loader/index.js!./../../../../../node_modules/autoprefixer-loader/index.js!./nav.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(192)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/less-loader/index.js!./../../../../../node_modules/autoprefixer-loader/index.js!./sidebar.less", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/less-loader/index.js!./../../../../../node_modules/autoprefixer-loader/index.js!./sidebar.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }
/******/ ]);