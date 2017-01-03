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
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _window$Rv = window.Rv,
	    Component = _window$Rv.Component,
	    DOMRender = _window$Rv.DOMRender;


	var list = [{
	    title: '今天的哈哈哈',
	    content: "☺☺☺☺☺",
	    tag: 'today'
	}, {
	    title: '本月的哈哈哈',
	    content: "☺☺☺☺☺",
	    tag: 'month'
	}, {
	    title: '这周的哈哈哈',
	    content: "☺☺☺☺☺",
	    tag: 'date'
	}];

	var Name = function (_Component) {
	    _inherits(Name, _Component);

	    function Name() {
	        var _ref;

	        var _temp, _this, _ret;

	        _classCallCheck(this, Name);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Name.__proto__ || Object.getPrototypeOf(Name)).call.apply(_ref, [this].concat(args))), _this), _this.template = '<span>Rv</span>', _temp), _possibleConstructorReturn(_this, _ret);
	    }

	    return Name;
	}(Component);

	var H1 = function (_Component2) {
	    _inherits(H1, _Component2);

	    function H1() {
	        var _ref2;

	        var _temp2, _this2, _ret2;

	        _classCallCheck(this, H1);

	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	        }

	        return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = H1.__proto__ || Object.getPrototypeOf(H1)).call.apply(_ref2, [this].concat(args))), _this2), _this2.template = '<h1 onclick={click} class="center"><Name />{state} {props.width} <slot></slot></h1>', _this2.data = {
	            state: ' Todo List'
	        }, _this2.components = { Name: Name }, _this2.method = {
	            click: function click() {
	                this.state += ' +1s';
	            }
	        }, _temp2), _possibleConstructorReturn(_this2, _ret2);
	    }

	    return H1;
	}(Component);

	var App = function (_Component3) {
	    _inherits(App, _Component3);

	    function App() {
	        var _ref3;

	        var _temp3, _this3, _ret3;

	        _classCallCheck(this, App);

	        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	            args[_key3] = arguments[_key3];
	        }

	        return _ret3 = (_temp3 = (_this3 = _possibleConstructorReturn(this, (_ref3 = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref3, [this].concat(args))), _this3), _this3.template = '\n        <div aa="cc" dd={ 0 ? "\u6211\u600E\u4E48\u77E5\u9053\u5462" : 22} ee ff ssss="1111" onClick={parentClick}>\n            <H1 width="100">\n                <span onClick={slotClick}>\u6211\u662F\u6807\u9898</span>\n            </H1>\n            <input type="text" placeholder={name} value={input} v-if={true} onKeyUp={keyup} ref="input" /><button onClick={add}>\u63D0\u4EA4</button>\n            <div bb="dd" v-click="11111" onclick={click} >{input}</div>\n            <ul v-for="x in showList">\n                <li>{$index + 1} : {x.title} : {x.content} <button onclick={del} data-index={$index}>\u5220\u9664</button></li>\n            </ul>\n            <div>\n                <button class={currentFilter == \'today\' && \'current\' } onClick={filter.bind(this, \'today\')}>\u4ECA\u5929</button>\n                <button class={currentFilter == \'date\' && \'current\' } onClick={filter.bind(this, \'date\')}>\u672C\u5468</button>\n                <button class={currentFilter == \'month\' && \'current\' } onClick={filter.bind(this, \'month\')}>\u672C\u6708</button>\n                <button class={currentFilter == \'all\' && \'current\' } onClick={filter.bind(this, \'all\')}>\u5168\u90E8</button>\n            </div>\n            <p style={styles}>\u5012\u8BA1\u65F6{time}\u79D2 <button onClick={reset}>reset</button></p>\n        </div>\n    ', _this3.components = { H1: H1 }, _this3.data = {
	            name: '西方哪个国家',
	            input: '',
	            ll: {
	                f: 1
	            },
	            styles: {
	                background: 'rgb(144, 203, 132)',
	                paddingLeft: '100px',
	                height: '200px'
	            },
	            list: list,
	            showList: list,
	            currentFilter: 'all',
	            time: 3,
	            left: 0
	        }, _this3.method = {
	            slotClick: function slotClick() {
	                alert('slotClick');
	            },
	            parentClick: function parentClick() {
	                console.log('播放啦');
	            },
	            keyup: function keyup(event) {
	                if (event.keyCode == 13) {
	                    this.add(event);
	                }
	                this.input = event.target.value;
	            },
	            del: function del(event) {
	                this.list = this.list.filter(function (ele, index) {
	                    return index != +event.target.dataset['index'];
	                });
	                this.filter();
	            },
	            add: function add(event) {
	                this.list.push({
	                    title: '我是title',
	                    tag: this.currentFilter,
	                    content: this.refs.input.value
	                });

	                this.input = this.refs.input.value = '';

	                this.filter();
	            },
	            filter: function filter(type) {
	                type = type || this.currentFilter;

	                this.showList = this.list.filter(function (i) {
	                    return type != 'all' ? i.tag == type : 1;
	                });

	                this.currentFilter = type;

	                console.log(type);
	            },
	            click: function click() {
	                alert("1111");
	            },
	            reset: function reset() {
	                if (!this.time) {
	                    this.time = 3;
	                    this.startTime();
	                }
	            },
	            startTime: function startTime() {
	                var _this4 = this;

	                var interval = setInterval(function () {
	                    if (_this4.time == 0) return clearInterval(interval);
	                    _this4.time--;
	                }, 1000);
	            }
	        }, _this3.events = {}, _temp3), _possibleConstructorReturn(_this3, _ret3);
	    }
	    // 事件监听


	    _createClass(App, [{
	        key: 'componentDidMount',

	        // 生命周期
	        value: function componentDidMount() {
	            this.startTime();
	        }
	    }]);

	    return App;
	}(Component);

	DOMRender(App, document.querySelector('#app'));

/***/ }
/******/ ]);