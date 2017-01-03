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

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DOMRender = exports.Component = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // let tokenizer = require('./tokenizer')
	// let parser = require('./parser')

	// scope 作用域问题
	// expr : expr ? expr : expr
	//      | element &&

	// 为什么我们需要把数据处理写到jsx中
	// 按理说jsx应该是只一个view层，只负责数据的渲染吗？

	var _tokenizer = __webpack_require__(3);

	var _tokenizer2 = _interopRequireDefault(_tokenizer);

	var _parser = __webpack_require__(2);

	var _parser2 = _interopRequireDefault(_parser);

	var _transform2 = __webpack_require__(4);

	var _transform3 = _interopRequireDefault(_transform2);

	var _observe = __webpack_require__(1);

	var _observe2 = _interopRequireDefault(_observe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function DOMRender(Component, $parent) {
	    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    var fuck = new Component();
	    var data = fuck.data,
	        method = fuck.method,
	        template = fuck.template,
	        components = fuck.components;


	    var state = Object.assign({}, data, method);

	    var _Ob = Ob(state),
	        newState = _Ob.newState,
	        listeners = _Ob.listeners;

	    // 更该function指向newState


	    for (var key in newState) {
	        if (newState.hasOwnProperty(key) && typeof newState[key] == 'function') {
	            newState[key] = newState[key].bind(newState);
	        }
	    }

	    ;['componentDidMount', 'componentWillMount', 'componentWillUnMount', 'componentUnMount'].forEach(function (key) {
	        var fun = fuck[key] || function () {};
	        newState[key] = fun.bind(newState);
	    });

	    newState.props = props;

	    var tokens = (0, _tokenizer2.default)(addQuote(template));
	    var ast = (0, _parser2.default)(tokens);

	    var _transform = (0, _transform3.default)(ast, newState, listeners, $parent, components, props),
	        refs = _transform.refs,
	        events = _transform.events,
	        children = _transform.children,
	        exprAtrributeQueue = _transform.exprAtrributeQueue;

	    // 添加refs，组件不直接调用dom


	    newState.refs = refs;

	    // ele.appendChild(node)
	    newState.componentDidMount && newState.componentDidMount();

	    return {
	        refs: refs,
	        events: events,
	        children: children,
	        exprAtrributeQueue: exprAtrributeQueue
	    };
	}

	// 给标签内的字符串添加双引号，方便token解析
	function addQuote(template) {
	    var str = template.replace(/>([^<]+)</g, function ($0, $1) {
	        var str = $1.trim().replace(/\{([^}]+)\}/g, function ($0) {
	            return '"' + $0 + '"';
	        });

	        str = str ? '>"' + str + '"<' : $0;
	        return str.replace(/""/g, '');
	    });

	    return str;
	}

	// 生成可以observe的数据，并新增一个事件监听器，用来监听数据的变化
	function Ob(state) {
	    var listeners = new ExprAtrributeQueue();

	    var newState = (0, _observe2.default)(state, true, function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        listeners.cache.forEach(function (listener, index) {
	            listener.callback.apply(listener, args);
	        });
	    });

	    return { newState: newState, listeners: listeners };
	}

	// 属性为一个表达式的情况
	// 一个组件的所有属性都在其中

	var ExprAtrributeQueue = function () {
	    function ExprAtrributeQueue() {
	        _classCallCheck(this, ExprAtrributeQueue);

	        this.cache = [];
	    }

	    _createClass(ExprAtrributeQueue, [{
	        key: 'push',
	        value: function push($ele, id, callback) {
	            this.cache.push({
	                id: id,
	                callback: callback,
	                $ele: $ele
	            });
	        }
	    }, {
	        key: 'remove',
	        value: function remove(id, callback) {
	            this.cache = this.cache.filter(function (i) {
	                if (callback) {
	                    return i.id != id && i.callback != callback;
	                }

	                return i.id != id;
	            });
	        }
	        // 卸载子元素上的无属性监听

	    }, {
	        key: 'unmountChildrenAttrs',
	        value: function unmountChildrenAttrs($parent) {
	            var _this = this;

	            $parent.children && [].concat(_toConsumableArray($parent.children)).forEach(function ($child) {
	                _this.unmount($child.__RVID);
	                _this.unmountElementAttrs($child);
	            });
	        }
	        // 卸载元素、及其子元素的属性监听

	    }, {
	        key: 'unmountElementAttrs',
	        value: function unmountElementAttrs($parent) {
	            this.unmount($parent.__RVID);
	            this.unmountChildrenAttrs($parent);
	        }
	        // 卸载指定id的事件监听

	    }, {
	        key: 'unmount',
	        value: function unmount(ID) {
	            this.remove(ID);
	        }
	    }]);

	    return ExprAtrributeQueue;
	}();

	// 组件卸载，移除事件监听，移除

	// 单组件可以运行，下面还是有组件嵌套，组件通信、样式隔离，作用域隔离等等

	var Component = function Component() {
	    _classCallCheck(this, Component);

	    console.log('初始化了');
	    console.log(this);
	};

	window.Rv = {
	    Component: Component,
	    DOMRender: DOMRender,
	    __id: 0
	};
	exports.Component = Component;
	exports.DOMRender = DOMRender;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	// 监听数据变化
	// vue会追踪数据变化，react不会，react在setState的时候，就会更新页面，
	// 我们可以通过componentShouldUpdate方法来决定，是否更新组件
	// 本着自动化的目标，我们也期望对数据依赖做出追踪，然后当state变化的时候，自动更新

	// let obj = {name: 1}
	//
	// let value = '111'
	// Object.defineProperty(obj , 'name', {
	//     get(){
	//         return value
	//     },
	//     set(newValue){
	//         console.log('设置新值', newValue)
	//         value = newValue
	//     }
	// })

	var util = {
	    isFunction: function isFunction(arg) {
	        return !!Object.prototype.toString.call(arg).match('Function');
	    },
	    isObject: function isObject(arg) {
	        return !!Object.prototype.toString.call(arg).match('Object');
	    },
	    isArray: function isArray(arg) {
	        return !!Object.prototype.toString.call(arg).match('Array');
	    },
	    isBoolean: function isBoolean(arg) {
	        return !!Object.prototype.toString.call(arg).match('Boolean');
	    }
	};

	// 监听数据
	/**
	 * [observe description]
	 * @param  {[type]}   data                [需要监听的对象]
	 * @param  {Boolean}  [deepObserve=false] [是否深度监听]
	 * @param  {Function} callback            [数据变化后，的毁掉函数]
	 * @param  {String}   [prevKey='']        [传递完整的key->key->key]
	 * @return {[type]}                       [返回observe data]
	 */
	function observe(data) {
	    var deepObserve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    var callback = arguments[2];
	    var prevKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

	    var newData = {};
	    Object.keys(data).forEach(function (key) {
	        if (data.hasOwnProperty(key)) {
	            (function () {
	                var value = data[key];

	                var itemPrevKey = prevKey + key + ',';
	                // 深度监听
	                if (deepObserve) {
	                    if (util.isObject(value)) {
	                        value = observe(value, deepObserve, callback, itemPrevKey);
	                    } else if (util.isArray(value)) {
	                        value = observeArray(value, deepObserve, callback, itemPrevKey);
	                    }
	                }

	                Object.defineProperty(newData, key, {
	                    get: function get() {
	                        return value;
	                    },
	                    set: function set(newValue) {

	                        var oldValue = value;
	                        value = newValue;

	                        // 如果新值还是obj，那就继续监听
	                        if (deepObserve) {
	                            if (util.isObject(value)) {
	                                value = observe(value, deepObserve, callback, itemPrevKey);
	                            } else if (util.isArray(value)) {
	                                value = observeArray(value, deepObserve, callback, itemPrevKey);
	                            }
	                        }

	                        // 回调函数
	                        callback && callback(itemPrevKey, newValue, oldValue);
	                    },

	                    enumerable: true
	                });
	            })();
	        }
	    });

	    return newData;
	}

	// 监听数组变化
	function observeArray(array, deepObserve, callback, itemPrevKey) {
	    array = [].concat(_toConsumableArray(array))
	    // 监听数组push,pop,splice,reverse,shift,unshift
	    ;['push', 'pop', 'splice', 'reverse', 'shift', 'unshift'].forEach(function (key) {
	        Object.defineProperty(array, key, {
	            get: function get() {
	                return function () {
	                    var _Array$prototype$key;

	                    console.log('数组变化', key);
	                    var oldValue = [].concat(_toConsumableArray(array));

	                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                        args[_key] = arguments[_key];
	                    }

	                    var result = (_Array$prototype$key = Array.prototype[key]).call.apply(_Array$prototype$key, [array].concat(args));
	                    callback && callback(itemPrevKey, array, oldValue);
	                    return result;
	                };
	            }
	        });
	    });

	    return array;
	}

	exports.default = observe;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * [parser 词法分析器]
	 * @method parser
	 * @param  {Array} token [token数组]
	 * @return {Object}       [AST Tree]
	 */
	function parser(tokens) {
	    var current = 0;
	    var token = tokens[current];
	    var ast = {
	        children: [],
	        type: 'root'
	    };
	    var currentNode = ast;

	    function next(index) {
	        if (index !== undefined) {
	            current = index;
	            return tokens[index];
	        }
	        return tokens[++current];
	    }

	    ELement();
	    function ELement() {
	        // openTag children closeTag
	        var cacheNode = currentNode;
	        currentNode = {
	            name: '',
	            children: [],
	            atrributes: {}
	        };

	        var openTag = OpenTag();
	        if (openTag) {
	            if (openTag.closeSelf) {
	                cacheNode.children.push(currentNode);
	                // console.log('闭合标签', JSON.stringify(cacheNode), JSON.stringify(currentNode))
	                currentNode = cacheNode;
	                return true;
	            }

	            while (Child()) {}

	            if (closeTag()) {
	                cacheNode.children.push(currentNode);
	                // console.log('闭合标签', JSON.stringify(cacheNode), JSON.stringify(currentNode))
	                currentNode = cacheNode;
	                return true;
	            }

	            throw new Error('cannot match a close tag');
	        }

	        currentNode = cacheNode;
	    }

	    function OpenTag() {
	        // OpenStart atrributes openEnd
	        var index = current;

	        if (OpenTagStart()) {
	            if (OpenTagName()) {
	                // 这里有个问题，你可以向前看，前面是不是符合某种要求
	                // 但如果不满足的话，指针是不能移动的，你的明白？
	                while (Attribute()) {}

	                if (openTagEnd()) {
	                    return {
	                        closeSelf: false
	                    };
	                }

	                if (closeSelfTagEnd()) {
	                    // console.info('close self')
	                    return {
	                        closeSelf: true
	                    };
	                }
	            }
	        }

	        token = next(index);

	        return false;
	    }

	    // 开始
	    function OpenTagStart() {
	        var index = current;

	        var _token = token,
	            type = _token.type,
	            value = _token.value;


	        if (type == 'ARROW_LEFT') {
	            token = next();
	            // 校验
	            return true;
	        }

	        token = next(index);
	        return false;
	    }

	    // 标签名
	    function OpenTagName() {
	        var _token2 = token,
	            type = _token2.type,
	            value = _token2.value;


	        if (type == 'VAR') {
	            currentNode.name = value;
	            // console.log('节点名称', token)
	            token = next();
	            return true;
	        }

	        return false;
	    }

	    // 属性
	    function Attribute() {
	        var _token3 = token,
	            type = _token3.type,
	            value = _token3.value;


	        if (AttributeName()) {
	            var attrValue = AttributesEnd();
	            if ((typeof attrValue === 'undefined' ? 'undefined' : _typeof(attrValue)) == 'object') {
	                currentNode.atrributes[value] = attrValue;
	                //  console.log('属性---------', value, JSON.stringify(currentNode), attrValue)
	                return true;
	            } else {
	                currentNode.atrributes[value] = undefined;
	                return true;
	            }
	        }

	        return false;
	    }

	    // 属性名
	    function AttributeName() {
	        var _token4 = token,
	            type = _token4.type,
	            value = _token4.value;

	        if (type == 'VAR') {
	            token = next();
	            return value;
	        }
	    }

	    // 属性值
	    function AttributesEnd() {
	        var _token5 = token,
	            type = _token5.type,
	            value = _token5.value;


	        if (type == 'EQUAL') {
	            token = next();
	            var _token6 = token,
	                _type = _token6.type,
	                _value = _token6.value;

	            if (_type == 'String') {
	                token = next();
	                return { value: _value, type: 'String' };
	            }

	            if (_type == 'EXPR') {
	                token = next();
	                return { value: _value, type: 'Expr' };
	            }

	            var error = _type + 'parse error, 期望一个VAR';
	            throw new Error(error);
	        }

	        return true;
	    }

	    // 开标签结束
	    function openTagEnd() {
	        var _token7 = token,
	            type = _token7.type,
	            value = _token7.value;


	        if (type == 'ARROW_RIGHT') {
	            token = next();
	            return true;
	        }
	        return false;
	    }

	    function closeSelfTagEnd() {
	        var _token8 = token,
	            type = _token8.type,
	            value = _token8.value;


	        if (type == 'CLOSE_SELF_TAG_END') {
	            token = next();
	            return true;
	        }
	        return false;
	    }

	    function Child() {
	        var index = current;

	        if (ELement()) {
	            return true;
	        }
	        token = next(index);

	        var _token9 = token,
	            value = _token9.value,
	            type = _token9.type;

	        if (type == 'String') {

	            currentNode.children.push({
	                type: 'String',
	                value: value
	            });

	            token = next();

	            return true;
	        }

	        if (type == 'EXPR') {

	            currentNode.children.push({
	                type: 'Expr',
	                value: value
	            });

	            token = next();

	            return true;
	        }

	        token = next(index);

	        return false;
	    }

	    function closeTagStart() {
	        var _token10 = token,
	            type = _token10.type,
	            value = _token10.value;


	        if (type == 'CLOSE_TAG_START') {
	            token = next();
	            return true;
	        }

	        return false;
	    }

	    function CloseTagName() {
	        var _token11 = token,
	            type = _token11.type,
	            value = _token11.value;


	        if (type == 'VAR' && value == currentNode.name) {
	            token = next();
	            return true;
	        }

	        throw new Error('cannot match close tag of ' + currentNode.name);

	        return false;
	    }

	    function closeTag() {
	        var index = current;

	        if (closeTagStart()) {
	            var _token12 = token,
	                value = _token12.value,
	                type = _token12.type;

	            if (CloseTagName()) {
	                if (openTagEnd()) {
	                    return true;
	                }
	            }
	        }

	        token = next(index);
	        console.log('闭合', token, tokens[index - 1]);
	        return false;
	    }

	    return ast;
	}

	module.exports = parser;

	/**
	 * ELement : OpenE Child CloseE
	 * OpenE: < TagName {Attributes} >
	 * Child: ELement | String | Null
	 * CloseE: </ TagName >
	 *
	 * Attributes: AttributesName AttributesEnd
	 * AttributesEnd: = String
	 *              | NULL
	 *
	 * TagName : VAR
	 *
	 */

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	function tokenizer(str) {
	    var current = 0;
	    var char = str[current];
	    var token = [];
	    var y = 0;
	    var x = 0;

	    function next() {
	        x++;
	        var char = str[++current];
	        if (char == '\n') {
	            y++;
	        }

	        return char;
	    }

	    while (current < str.length) {
	        // console.log(current, char)
	        var ARROW_LEFT = /</;
	        if (ARROW_LEFT.test(char)) {
	            char = next();

	            while (/\s/.test(char)) {
	                chars += char;
	                char = next();
	            }
	            // 匹配close tag
	            if (/\//.test(char)) {
	                char = next();

	                token.push({
	                    type: 'CLOSE_TAG_START',
	                    value: '</'
	                });
	            } else {
	                token.push({
	                    type: 'ARROW_LEFT',
	                    value: '<'
	                });
	            }

	            continue;
	        }

	        var ARROW_RIGHT = />/;
	        if (ARROW_RIGHT.test(char)) {
	            token.push({
	                type: 'ARROW_RIGHT',
	                value: char
	            });
	            char = next();
	            continue;
	        }

	        var SPACE = /\s/;
	        if (SPACE.test(char)) {
	            // token.push({
	            //     type: 'ARROW_RIGHT',
	            //     value: char
	            // })
	            char = next();
	            continue;
	        }

	        var SLASH = /\//;
	        if (SLASH.test(char)) {
	            char = next();

	            while (/\s/.test(char)) {
	                chars += char;
	                char = next();
	            }
	            // 匹配close tag
	            if (/>/.test(char)) {
	                char = next();

	                token.push({
	                    type: 'CLOSE_SELF_TAG_END',
	                    value: '/>'
	                });
	            } else {
	                token.push({
	                    type: 'SLASH',
	                    value: '/'
	                });
	            }
	            continue;
	        }

	        var QUOTE = /"/;
	        if (QUOTE.test(char)) {
	            char = next();
	            var _chars = '';
	            while (!QUOTE.test(char)) {
	                _chars += char;
	                char = next();
	            }
	            char = next();
	            token.push({
	                type: 'String',
	                value: _chars
	            });
	            continue;
	        }

	        var VAR = /[a-zA-Z]/;
	        if (VAR.test(char)) {
	            var _chars2 = char;
	            char = next();
	            while (/[a-zA-Z0-9\-]/.test(char)) {
	                _chars2 += char;
	                char = next();
	            }
	            token.push({
	                type: 'VAR',
	                value: _chars2
	            });
	            continue;
	        }

	        var EQUAL = /=/;
	        if (EQUAL.test(char)) {
	            token.push({
	                type: 'EQUAL',
	                value: char
	            });
	            char = next();
	            continue;
	        }

	        var EXPR_START = /\{/;
	        if (EXPR_START.test(char)) {
	            var _chars3 = "";
	            char = next();
	            while (!/\}/.test(char)) {
	                _chars3 += char;
	                char = next();
	            }
	            token.push({
	                type: 'EXPR',
	                value: _chars3
	            });
	            char = next();
	            continue;
	        }

	        throw new Error('cannot handle char ' + char);
	    }
	    return token;
	}

	module.exports = tokenizer;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _watch = __webpack_require__(5);

	var _watch2 = _interopRequireDefault(_watch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * [transform description]
	 * @method transform
	 * @param  {[type]}  ast [description]
	 * @return {[type]}      [description]
	 */
	function transform(ast, state, listeners, $parent, components, props) {

	    // 处理子元素
	    function handleChildren(array, $ele, node, ctx) {
	        var VFOR = node.atrributes && node.atrributes['v-for'];

	        if (VFOR) {
	            return handleVFor(VFOR, $ele, array[0], ctx);
	        }

	        var eles = array.map(function (i) {
	            return handleElement(i, [].concat(_toConsumableArray(ctx)), $ele);
	        });

	        return $ele;
	    }

	    // 处理元素
	    function handleElement(node, ctx, $parent) {
	        // 可以访问父节点
	        var ele = void 0;
	        var children = node.children,
	            atrributes = node.atrributes,
	            name = node.name,
	            type = node.type;

	        if (name) {
	            // 处理子组件
	            if (/^[A-Z]/.test(name)) {
	                // throw new Error(`cannot handle tagName of ${name}`)
	                var _props = Object.assign({}, getAttributes(atrributes), {
	                    children: children,
	                    ctx: ctx
	                });
	                var child = window.Rv.DOMRender(components[name], $parent, _props);
	                // 子组件放在父组件的children中，方便卸载
	                // 组件卸载：事件 + dom
	                children.push(child);
	                return;
	            }
	            // 处理slot
	            if (name == 'slot') {
	                handleChildren(props.children, $parent, node, props.ctx);
	                return;
	            }

	            ele = document.createElement(name);
	            handleEvents(ele);
	            handleAttributes(atrributes, ele, ctx);
	            handleChildren(children, ele, node, [].concat(_toConsumableArray(ctx)));
	        } else {
	            ele = handleTextNode(node, ctx);
	        }

	        $parent.appendChild(ele);

	        return ele;
	    }

	    // 处理文本节点
	    function handleTextNode(node, ctx) {
	        var type = node.type,
	            value = node.value;

	        var $ele = document.createTextNode("");
	        handleEvents($ele);
	        if (type == 'Expr') {
	            value = handleExpr(value, {
	                type: 'TEXT_NODE',
	                $ele: $ele
	            }, ctx);
	        }
	        $ele.textContent = value;

	        return $ele;
	    }

	    function handleVFor(VFOR, $ele, node, ctx) {
	        var value = VFOR.value;

	        var arr = value.split(/\s+/).filter(function (i) {
	            return i;
	        });
	        var VAR = arr[0];
	        var LIST = arr[arr.length - 1];

	        function render(state) {
	            $ele.innerHTML = '';

	            var eles = state[LIST].map(function (i, index) {
	                var _newCtx;

	                var newCtx = (_newCtx = {}, _defineProperty(_newCtx, VAR, i), _defineProperty(_newCtx, '$index', index), _newCtx);

	                return handleElement(node, [].concat(_toConsumableArray(ctx), [newCtx]), $ele);
	            });

	            return $ele;
	        }

	        render(state);

	        listeners.push($ele, $ele.__RVID, function (key, newValue, oldValue) {
	            key = key.trim();
	            var keys = key.split(',').filter(function (i) {
	                return i;
	            });
	            if (keys[0] == LIST) {
	                // 卸载元素上的事件
	                unmountChildren($ele);
	                render(state);
	            }
	        });
	    }

	    // 处理表达式
	    function handleExpr(expr, watchParams, ctx) {
	        var param = Object.assign.apply(Object, [{}].concat(_toConsumableArray(ctx)));
	        var a = new Function('param', '\n            with(param){\n                return ' + expr + '\n            }\n        ');
	        watchParams.cacheAtrribute = a;

	        var exprKeys = Analysis(expr);

	        var $ele = watchParams.$ele,
	            type = watchParams.type,
	            attributeName = watchParams.attributeName;


	        listeners.push($ele, $ele.__RVID, function (key, newValue, oldValue) {
	            var keys = key.split(',').filter(function (i) {
	                return i;
	            }).join('.');
	            var matched = exprKeys.some(function (i) {
	                return keys.startsWith(i);
	            });

	            if (!matched) return;

	            var cacheAtrribute = watchParams.cacheAtrribute;
	            // 更新文本节点

	            if (type == 'TEXT_NODE') {
	                var newCtx = ctx.slice(1);
	                newCtx.unshift(state);
	                var newParam = Object.assign.apply(Object, [{}].concat(_toConsumableArray(newCtx)));
	                $ele.textContent = a(newParam);
	            }

	            // 更新属性
	            if (type == 'ATTR') {
	                var _newCtx2 = ctx.slice(1);
	                _newCtx2.unshift(state);
	                var _newParam = Object.assign.apply(Object, [{}].concat(_toConsumableArray(_newCtx2)));
	                var _newValue = a(_newParam) || '';
	                handleSpecialAttr(attributeName, _newValue, $ele, cacheAtrribute);
	            }
	        });

	        // 去监听数据
	        return a(param);
	    }

	    // expr : String
	    //      | Number
	    //      | Variables
	    //      | ()
	    // operator : + | - | * | / | && | || | ++ | -- | ! | !!!

	    function Analysis(expr) {
	        // return expr.replace(/"[^"]*"/g, "").replace(/[\-+]/g, '').split('.')
	        return (0, _watch2.default)(expr);
	    }

	    function getAttributes(atrributes) {
	        var atts = {};
	        Object.keys(atrributes).map(function (key) {
	            var v = atrributes[key];
	            if (v) {
	                var type = v.type,
	                    value = v.value;

	                value = value || '';
	                if (type == 'String') {
	                    atts[key] = value;
	                }
	            }
	        });

	        return atts;
	    }

	    // 处理属性
	    function handleAttributes(atrributes, $ele, ctx) {
	        Object.keys(atrributes).map(function (key) {
	            var v = atrributes[key];
	            if (v) {
	                var type = v.type,
	                    value = v.value;

	                value = value || '';
	                if (type == 'String') {
	                    $ele.setAttribute(key, value);
	                }

	                if (type == 'Expr') {
	                    // 处理事件监听
	                    value = handleExpr(value, {
	                        type: 'ATTR',
	                        $ele: $ele,
	                        attributeName: key
	                    }, ctx);
	                }

	                // 处理特殊的属性
	                handleSpecialAttr(key, value, $ele);
	            } else {
	                $ele.setAttribute(key, "");
	            }
	        });
	    }

	    // 处理特殊的属性
	    function handleSpecialAttr(key, value, $ele) {
	        if (key.startsWith('on')) {
	            // 移除掉之前的事件
	            events.off(key.slice(2).toLowerCase(), $ele.__RVID);
	            // 新增事件监听
	            events.on(key.slice(2).toLowerCase(), $ele.__RVID, value);
	        } else if (key == 'style') {
	            var style = '';
	            if (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
	                for (var propertyName in value) {
	                    if (value.hasOwnProperty(propertyName)) {
	                        // 处理驼峰形式的css
	                        var newPropertyName = propertyName.replace(/[A-Z]/g, function (char) {
	                            return '-' + char.toLowerCase();
	                        });
	                        style += ';' + newPropertyName + ' : ' + value[propertyName];
	                    }
	                }
	            } else {
	                style = value || '';
	            }

	            $ele.style.cssText += style;
	        } else {
	            $ele.setAttribute(key, value);
	        }

	        // 处理v-if指令
	        if (key == 'v-if' && !value) {
	            $ele.style.display = 'none';
	        }

	        if (key == 'v-for') {
	            var VAR = value.split(/\s/).filter(function (i) {
	                return i;
	            })[0];
	        }

	        if (key == 'ref') {
	            refs[value] = $ele;
	        }
	    }

	    // 返回element list
	    // 每个组件在实例上都会维护一个事件委托
	    // 但是有些事件是可以委托的，有些事件是无法委托的：scroll onpause onplay等
	    function handleEvents($ele) {
	        // 每个元素的id应该是唯一的
	        $ele.__RVID = window.Rv.__id++;
	        if (events) {
	            return;
	        }
	        events = new Event($ele);
	    }

	    // 卸载元素
	    function unmountChildren($parent) {
	        // 卸载属性
	        listeners.unmountChildrenAttrs($parent);
	        // 卸载事件
	        events.unmountChildrenEvents($parent);
	    }

	    var refs = {};
	    var ctx = [state];
	    var events = void 0;
	    var children = [];

	    handleChildren(ast.children, $parent, ast, ctx);
	    return { refs: refs, events: events, children: children };
	}

	// 事件

	var Event = function () {
	    function Event($ele) {
	        _classCallCheck(this, Event);

	        this.cache = {};
	        this.$ele = $ele;
	    }

	    _createClass(Event, [{
	        key: 'off',
	        value: function off(type, id, callback) {
	            var arr = this.getTypeCache(type);
	            arr.filter(function (i) {
	                if (callback) {
	                    return i.id != id && i.callback != callback;
	                } else {
	                    return i.id != id;
	                }
	            });
	            this.cache[type] = arr;

	            return this;
	        }
	    }, {
	        key: 'on',
	        value: function on(type, id, callback) {
	            var arr = this.getTypeCache(type);
	            arr.push({
	                id: id,
	                callback: callback
	            });
	            this.cache[type] = arr;

	            this.addEventToParent(type, id, callback);

	            return this;
	        }
	    }, {
	        key: 'trigger',
	        value: function trigger(type, id) {}
	    }, {
	        key: 'addEventToParent',
	        value: function addEventToParent(type, id, callback) {
	            var _this = this;

	            if (this['__' + type]) return;

	            this['__' + type] = true;

	            this.$ele.addEventListener(type, function (event) {
	                // 在事件系统内冒泡上去到当前文件内
	                var target = event.target,
	                    currentTarget = event.currentTarget;

	                var cbs = [];

	                var _loop = function _loop() {
	                    var id = target.__RVID;
	                    _this.cache[type].forEach(function (i) {
	                        if (i.id === id) {
	                            cbs.push(i.callback);
	                        }
	                    });
	                    target = target.parentElement;
	                };

	                while (target && target != currentTarget.parentElement) {
	                    _loop();
	                }
	                cbs.forEach(function (cb) {
	                    return cb(event);
	                });
	            });
	        }
	        // 卸载事件

	    }, {
	        key: 'unmountChildrenEvents',
	        value: function unmountChildrenEvents($parent) {
	            var _this2 = this;

	            $parent.children && [].concat(_toConsumableArray($parent.children)).forEach(function ($child) {
	                $child.__RVID && _this2.unmount($child.__RVID);
	                _this2.unmountChildrenEvents($child);
	            });
	        }
	    }, {
	        key: 'unmountElementEvents',
	        value: function unmountElementEvents($parent) {
	            this.unmount($parent.__RVID);
	            this.unmountChildrenEvents($parent);
	        }
	    }, {
	        key: 'unmount',
	        value: function unmount(ID) {
	            var cache = this.cache;

	            Object.keys(cache).forEach(function (i) {
	                cache[i] = cache[i].filter(function (ele) {
	                    return ele.id != ID;
	                });
	            });
	        }
	    }, {
	        key: 'getTypeCache',
	        value: function getTypeCache(type) {
	            var cache = this.cache;

	            return cache[type] || [];
	        }
	    }]);

	    return Event;
	}();

	exports.default = transform;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * [getWatchedVarible 获取可被监听到的变量]
	 * @method getWatchedVarible
	 * @param  {[type]}          str [description]
	 * @return {[type]}              [description]
	 */
	function getWatchedVarible(str) {
	    var current = 0;
	    var token = [];

	    function next() {
	        return str[current++];
	    }
	    var char = next();

	    while (current <= str.length) {

	        var VARIABLE = /[a-zA-Z_$]/;
	        if (VARIABLE.test(char)) {
	            var chars = char;
	            char = next();
	            while (/[\w_$\.]/.test(char) && current <= str.length) {
	                chars += char;
	                char = next();
	            }

	            if (chars.endsWith('.')) {
	                throw new Error(chars + ' should not endsWith .');
	            }
	            token.push({
	                type: 'VARIABLE',
	                value: chars
	            });
	            continue;
	        }

	        var DOUBLE_QUET = /"/;
	        if (DOUBLE_QUET.test(char)) {
	            var _chars = '';
	            char = next();
	            while (!/"/.test(char) && current <= str.length) {
	                _chars += char;
	                char = next();
	            }
	            char = next();
	            token.push({
	                type: 'STRING',
	                value: _chars
	            });
	            continue;
	        }

	        var SINGLE_QUET = /'/;
	        if (SINGLE_QUET.test(char)) {
	            var _chars2 = '';
	            char = next();
	            while (!/'/.test(char) && current <= str.length) {
	                _chars2 += char;
	                char = next();
	            }
	            char = next();
	            token.push({
	                type: 'STRING',
	                value: _chars2
	            });
	            continue;
	        }

	        var OPERATOR = /[\+\-\*\/\%\!\=?:]/;
	        if (OPERATOR.test(char)) {
	            token.push({
	                type: 'OPERATOR',
	                value: char
	            });
	            char = next();
	            continue;
	        }

	        var AND = /&/;
	        if (AND.test(char)) {
	            char = next();
	            if (/&/.test(char)) {
	                char = next();
	                token.push({
	                    type: 'AND',
	                    value: '&&'
	                });
	                continue;
	            }
	            throw new Error('the behind of & should be a &');
	        }

	        var OR = /\|/;
	        if (OR.test(char)) {
	            char = next();
	            if (/\|/.test(char)) {
	                char = next();
	                token.push({
	                    type: 'OR',
	                    value: '||'
	                });
	                continue;
	            }
	            throw new Error('the behind of | should be a |');
	        }

	        var SPACE = /\s/;
	        if (SPACE.test(char)) {
	            char = next();
	            continue;
	        }

	        var DOT = /\./;
	        if (DOT.test(char)) {
	            token.push({
	                type: 'DOT',
	                value: char
	            });
	            char = next();
	            continue;
	        }

	        var NUMBER = /\d/;
	        if (NUMBER.test(char)) {
	            var _chars3 = char;
	            char = next();
	            while (/[\d\.]/.test(char)) {
	                _chars3 += char;
	                char = next();
	            }
	            token.push({
	                type: 'NUMBER',
	                value: _chars3
	            });
	            continue;
	        }

	        var EXPR_START = /\(/;
	        if (EXPR_START.test(char)) {
	            var _chars4 = '(';
	            char = next();
	            while (!/\)/.test(char) && current <= str.length) {
	                _chars4 += char;
	                char = next();
	            }
	            char = next();
	            token.push({
	                type: 'EXPR',
	                value: _chars4 + ')'
	            });
	            continue;
	        }

	        throw new Error('cannot handle ' + str + ' char ' + char + ' at ' + current);
	    }

	    return token.filter(function (i) {
	        return i.type == 'VARIABLE';
	    }).map(function (i) {
	        return i.value;
	    });
	}

	exports.default = getWatchedVarible;

/***/ }
/******/ ]);