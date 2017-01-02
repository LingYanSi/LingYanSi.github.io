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

	var _tokenizer = __webpack_require__(3);

	var _tokenizer2 = _interopRequireDefault(_tokenizer);

	var _parser = __webpack_require__(2);

	var _parser2 = _interopRequireDefault(_parser);

	var _transform2 = __webpack_require__(4);

	var _transform3 = _interopRequireDefault(_transform2);

	var _observe = __webpack_require__(1);

	var _observe2 = _interopRequireDefault(_observe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // let tokenizer = require('./tokenizer')
	// let parser = require('./parser')

	// scope 作用域问题
	// expr : expr ? expr : expr
	//      | element &&

	// 为什么我们需要把数据处理写到jsx中
	// 按理说jsx应该是只一个view层，只负责数据的渲染吗？

	function DOMRender(Component, ele) {
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

	    var tokens = (0, _tokenizer2.default)(addQuote(template));
	    var ast = (0, _parser2.default)(tokens);

	    var _transform = (0, _transform3.default)(ast, newState, listeners, ele, components),
	        node = _transform.node,
	        refs = _transform.refs;

	    // 添加refs，组件不直接调用dom


	    newState.refs = refs;

	    // ele.appendChild(node)
	    console.log('componentDidMount', newState.componentDidMount);
	    newState.componentDidMount && newState.componentDidMount();
	}

	// 给标签内的字符串添加双引号，方便token解析
	function addQuote(template) {
	    var str = template.replace(/>([^<]+)</g, function ($0, $1) {
	        var str = $1.trim().replace(/\{([^}]+)\}/g, function ($0) {
	            return '"' + $0 + '"';
	        });

	        return str ? '>"' + str + '"<' : $0;
	    });

	    return str;
	}

	// 生成可以observe的数据，并新增一个事件监听器，用来监听数据的变化
	function Ob(state) {
	    var listeners = [];

	    var newState = window.fuck = (0, _observe2.default)(state, true, function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        listeners.forEach(function (listener) {
	            return listener.apply(undefined, args);
	        });
	    });

	    return { newState: newState, listeners: listeners };
	}

	// 组件卸载，移除事件监听，移除

	// 单组件可以运行，下面还是有组件嵌套，组件通信、样式隔离，作用域隔离等等

	var Component = function Component() {
	    _classCallCheck(this, Component);

	    console.log('初始化了');
	    console.log(this);
	};

	window.Rv = {
	    Component: Component,
	    DOMRender: DOMRender
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
	                console.log('闭合标签', JSON.stringify(cacheNode), JSON.stringify(currentNode));
	                currentNode = cacheNode;
	                return true;
	            }

	            while (Child()) {}
	            console.log('我是子节点', JSON.stringify(currentNode));

	            if (closeTag()) {
	                cacheNode.children.push(currentNode);
	                console.log('闭合标签', JSON.stringify(cacheNode), JSON.stringify(currentNode));
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
	                    console.info('close self');
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
	            console.log('节点名称', token);
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
	                console.log('属性---------', value, JSON.stringify(currentNode), attrValue);
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

	var _watch = __webpack_require__(5);

	var _watch2 = _interopRequireDefault(_watch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * [transform description]
	 * @method transform
	 * @param  {[type]}  ast [description]
	 * @return {[type]}      [description]
	 */
	function transform(ast, state, listeners, $parent, components) {

	    // 处理子元素
	    function handleChildren(array, $ele, node, ctx) {
	        var VFOR = node.atrributes && node.atrributes['v-for'];

	        if (VFOR) {
	            return handleVFor(VFOR, $ele, array[0], ctx);
	        }

	        var eles = array.map(function (i) {
	            return handleElement(i, [].concat(_toConsumableArray(ctx)), $ele);
	        }).filter(function (i) {
	            return i;
	        }).forEach(function (i) {
	            $ele.appendChild(i);
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
	                window.Rv.DOMRender(components[name], $parent);
	                return;
	            }
	            ele = document.createElement(name);
	            handleAttributes(atrributes, ele, ctx);
	            handleChildren(children, ele, node, [].concat(_toConsumableArray(ctx)));
	        } else {
	            ele = handleTextNode(node, ctx);
	        }

	        return ele;
	    }

	    // 处理文本节点
	    function handleTextNode(node, ctx) {
	        var type = node.type,
	            value = node.value;

	        var ele = document.createTextNode("");
	        if (type == 'Expr') {
	            value = handleExpr(value, {
	                type: 'TEXT_NODE',
	                node: ele
	            }, ctx);
	        }
	        ele.textContent = value;

	        return ele;
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

	                return handleElement(node, [].concat(_toConsumableArray(ctx), [newCtx]));
	            }).forEach(function (i) {
	                $ele.appendChild(i);
	            });

	            return $ele;
	        }

	        render(state);

	        listeners.push(function (key, newValue, oldValue) {
	            key = key.trim();
	            var keys = key.split(',').filter(function (i) {
	                return i;
	            });
	            if (keys[0] == LIST) {
	                render(state);
	            }
	        });
	    }

	    // 处理表达式
	    function handleExpr(expr, watchParams, ctx) {
	        var param = Object.assign.apply(Object, [{}].concat(_toConsumableArray(ctx)));
	        var a = new Function('param', '\n            with(param){\n                return ' + expr + '\n            }\n        ');
	        watchParams.cache = a;

	        var exprKeys = Analysis(expr);

	        listeners.push(function (key, newValue, oldValue) {
	            var node = watchParams.node,
	                type = watchParams.type,
	                cache = watchParams.cache;


	            var keys = key.split(',').filter(function (i) {
	                return i;
	            }).join('.');
	            var matched = exprKeys.some(function (i) {
	                return i.startsWith(keys);
	            });

	            if (!matched) return;

	            // 更新文本节点
	            if (type == 'TEXT_NODE') {
	                var newCtx = ctx.slice(1);
	                newCtx.unshift(state);
	                var newParam = Object.assign.apply(Object, [{}].concat(_toConsumableArray(newCtx)));
	                node.textContent = a(newParam);
	            }

	            // 更新属性
	            if (type == 'ATTR') {
	                var _newCtx2 = ctx.slice(1);
	                _newCtx2.unshift(state);
	                var _newParam = Object.assign.apply(Object, [{}].concat(_toConsumableArray(_newCtx2)));
	                var _newValue = a(_newParam) || '';
	                node.setAttribute(watchParams.attributeName, _newValue);
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
	                        node: $ele,
	                        attributeName: key
	                    }, ctx);

	                    if (key.startsWith('on')) {
	                        $ele.addEventListener(key.slice(2).toLowerCase(), value);
	                        console.log('绑定事件', key, currentNode);
	                    } else {
	                        $ele.setAttribute(key, value);
	                    }
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
	            } else {
	                $ele.setAttribute(key, "");
	            }
	        });
	    }

	    var refs = {};
	    var ctx = [state];
	    var events = void 0;

	    var currentNode = $parent;
	    handleChildren(ast.children, currentNode, ast, ctx);
	    return { node: currentNode, refs: refs, events: events };
	}

	// 返回element list
	function handleEvents(currentNode) {}

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