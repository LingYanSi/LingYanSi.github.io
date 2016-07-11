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

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(10);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(5);

	var _index = __webpack_require__(13);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(27);

	var _index4 = _interopRequireDefault(_index3);

	var _index5 = __webpack_require__(4);

	var _index6 = _interopRequireDefault(_index5);

	var _index7 = __webpack_require__(17);

	var _index8 = _interopRequireDefault(_index7);

	var _index9 = __webpack_require__(15);

	var _index10 = _interopRequireDefault(_index9);

	var _index11 = __webpack_require__(21);

	var _index12 = _interopRequireDefault(_index11);

	var _index13 = __webpack_require__(29);

	var _index14 = _interopRequireDefault(_index13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// React.initializeTouchEvents(true)

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App() {
	        _classCallCheck(this, App);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
	    }

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                _reactRouter.Router,
	                { history: _reactRouter.browserHistory },
	                _react2.default.createElement(
	                    _reactRouter.Route,
	                    { path: '/', component: _index2.default },
	                    _react2.default.createElement(_reactRouter.Route, { path: 'about', component: _index6.default }),
	                    _react2.default.createElement(_reactRouter.Route, { path: 'article', component: _index8.default }),
	                    _react2.default.createElement(_reactRouter.Route, { path: 'article/new', component: _index12.default }),
	                    _react2.default.createElement(_reactRouter.Route, { path: 'article/edit/:id', component: _index12.default }),
	                    _react2.default.createElement(_reactRouter.Route, { path: 'article/:id', component: _index10.default }),
	                    _react2.default.createElement(_reactRouter.Route, { path: '*', component: _index14.default })
	                )
	            );
	        }
	    }]);

	    return App;
	}(_react2.default.Component);

	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Link = exports.Route = exports.Router = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _url_match = __webpack_require__(9);

	var _url_match2 = _interopRequireDefault(_url_match);

	var _history = __webpack_require__(8);

	var _history2 = _interopRequireDefault(_history);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Router = function (_Component) {
	    _inherits(Router, _Component);

	    function Router() {
	        _classCallCheck(this, Router);

	        // 返回一个更改url的方法

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Router).call(this));

	        var his = (0, _history2.default)('pathname', Router.forceUpdate);
	        Router.changeUrl = his.changeUrl;
	        Router.currentURL = his.getPath();
	        return _this;
	    }

	    _createClass(Router, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            Router.self = this;
	        }
	    }, {
	        key: 'getChild',
	        value: function getChild(children) {
	            var _this2 = this;

	            var preUrl = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	            var currentURL = arguments[2];

	            // return this.props.children
	            var arr = [];

	            _react2.default.Children.map(children, function (item) {
	                return item;
	            }).some(function (Item) {
	                // 这里是一个路由的匹配校验

	                if (!Item.props) return;
	                var path = preUrl + Item.props.path;
	                var params = (0, _url_match2.default)(path, currentURL);

	                console.log('路径', path, params);

	                if (params) {
	                    var Com = Item.props.component;
	                    // 把url参数传递给组件
	                    arr.push(_react2.default.createElement(
	                        Com,
	                        { params: params },
	                        Item.props.children && _this2.getChild(Item.props.children, path, currentURL)
	                    ));

	                    return true;
	                }
	            });

	            return arr;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var currentURL = Router.currentURL;
	            // console.log('实际路径', currentURL);
	            return _react2.default.createElement(
	                'div',
	                null,
	                this.getChild(this.props.children, '', currentURL)
	            );
	        }
	    }]);

	    return Router;
	}(_react.Component);

	//


	Router.loadTo = function (url) {
	    // url更改函数，他去更改url，url又会触发回掉函数，所以说还需要一个参数，便是修改url，但不触发回掉函数
	    Router.changeUrl && Router.changeUrl(url);
	    Router.forceUpdate(url);
	};

	Router.forceUpdate = function (url) {
	    // url变化后，强制更新Router

	    Router.currentURL = url;
	    Router.self.forceUpdate();
	};

	var Link = function (_Component2) {
	    _inherits(Link, _Component2);

	    function Link() {
	        _classCallCheck(this, Link);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Link).apply(this, arguments));
	    }

	    _createClass(Link, [{
	        key: 'render',
	        value: function render() {
	            var props = this.props;

	            return _react2.default.createElement(
	                'a',
	                _extends({ onClick: Router.loadTo.bind(this, props.to, false) }, props),
	                props.title,
	                props.children
	            );
	        }
	    }]);

	    return Link;
	}(_react.Component);

	var Route = function (_Component3) {
	    _inherits(Route, _Component3);

	    function Route() {
	        _classCallCheck(this, Route);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Route).apply(this, arguments));
	    }

	    _createClass(Route, [{
	        key: 'render',
	        value: function render() {
	            // route不会渲染

	            return null;
	        }
	    }]);

	    return Route;
	}(_react.Component);

	exports.Router = Router;
	exports.Route = Route;
	exports.Link = Link;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(3);

	var Tips = function (_Component) {
	    _inherits(Tips, _Component);

	    function Tips() {
	        _classCallCheck(this, Tips);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Tips).call(this));
	    }

	    _createClass(Tips, [{
	        key: 'render',
	        value: function render() {
	            var props = this.props;

	            return _react2.default.createElement(
	                'div',
	                { className: 'tips' },
	                _react2.default.createElement(
	                    'a',
	                    { href: props.url ? props.url : 'javascript:0;', target: '_blank' },
	                    props.content
	                ),
	                _react2.default.createElement(
	                    'button',
	                    { onClick: props.close },
	                    'x'
	                )
	            );
	        }
	    }]);

	    return Tips;
	}(_react.Component);

	exports.default = Tips;

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _index = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(12);

	/*
	router:
	    父组件：获取到子组件，子组件拥有一些属性，比如to component等，这些属性
	*/

	var List = function (_Component) {
	    _inherits(List, _Component);

	    function List() {
	        _classCallCheck(this, List);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(List).apply(this, arguments));
	    }

	    _createClass(List, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    _index.Link,
	                    { to: '/hei/anxiang', className: 'btn' },
	                    '暗香'
	                ),
	                _react2.default.createElement(
	                    _index.Link,
	                    { to: '/hei/shuying', className: 'btn' },
	                    '疏影'
	                ),
	                _react2.default.createElement(
	                    _index.Link,
	                    { to: '/step/shuying', className: 'btn' },
	                    '疏影'
	                ),
	                _react2.default.createElement(
	                    'div',
	                    null,
	                    this.props.children
	                )
	            );
	        }
	    }]);

	    return List;
	}(_react.Component);

	var Step1 = function (_Component2) {
	    _inherits(Step1, _Component2);

	    function Step1() {
	        _classCallCheck(this, Step1);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Step1).apply(this, arguments));
	    }

	    _createClass(Step1, [{
	        key: 'render',
	        value: function render() {
	            var params = this.props.params;

	            console.log('疏影', params);

	            if (params.id == 'anxiang') {
	                return _react2.default.createElement(
	                    'div',
	                    null,
	                    '暗香',
	                    _react2.default.createElement('br', null),
	                    '旧时月色，算几番照我，梅边吹笛。 ',
	                    _react2.default.createElement('br', null),
	                    '唤起玉人，不管清寒与攀摘。 ',
	                    _react2.default.createElement('br', null),
	                    '何逊而今渐老，都忘却，春风词笔。 ',
	                    _react2.default.createElement('br', null),
	                    '但怪得竹外疏花，香冷入瑶席。 ',
	                    _react2.default.createElement('br', null),
	                    _react2.default.createElement('br', null),
	                    '江国，正寂寂。 ',
	                    _react2.default.createElement('br', null),
	                    '叹寄与路遥，夜雪初积。 ',
	                    _react2.default.createElement('br', null),
	                    '翠尊易泣，红萼无言耿相忆。 ',
	                    _react2.default.createElement('br', null),
	                    '长记曾携手处，千树压，西湖寒碧。 ',
	                    _react2.default.createElement('br', null),
	                    '又片片吹尽也，几时见得？'
	                );
	            }

	            return _react2.default.createElement(
	                'div',
	                null,
	                '疏影'
	            );
	        }
	    }]);

	    return Step1;
	}(_react.Component);

	var Step2 = function (_Component3) {
	    _inherits(Step2, _Component3);

	    function Step2() {
	        _classCallCheck(this, Step2);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Step2).apply(this, arguments));
	    }

	    _createClass(Step2, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                '哈哈哈哈哈 ',
	                this.props.params.id,
	                _react2.default.createElement(
	                    _index.Link,
	                    { to: '/step/第三部' },
	                    '下一步'
	                ),
	                this.props.children
	            );
	        }
	    }]);

	    return Step2;
	}(_react.Component);

	var Step3 = function (_Component4) {
	    _inherits(Step3, _Component4);

	    function Step3() {
	        _classCallCheck(this, Step3);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Step3).apply(this, arguments));
	    }

	    _createClass(Step3, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                '我是地方但不'
	            );
	        }
	    }]);

	    return Step3;
	}(_react.Component);

	var Home = function (_Component5) {
	    _inherits(Home, _Component5);

	    function Home() {
	        _classCallCheck(this, Home);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
	    }

	    _createClass(Home, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { id: 'about' },
	                _react2.default.createElement(
	                    _index.Router,
	                    null,
	                    _react2.default.createElement(
	                        _index.Route,
	                        { path: '/', component: List },
	                        _react2.default.createElement(_index.Route, { path: '/hei/:id', component: Step1 }),
	                        _react2.default.createElement(_index.Route, { path: '/step/:id', component: Step2 })
	                    )
	                )
	            );
	        }
	    }]);

	    return Home;
	}(_react.Component);

	exports.default = Home;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = window.ReactRouter;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(7);

	/*
	modal 在根组件被渲染，其他组件调用的是他的静态方法
	*/

	var Modal = function (_Component) {
	    _inherits(Modal, _Component);

	    function Modal() {
	        _classCallCheck(this, Modal);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Modal).call(this));

	        _this2.state = {
	            queue: []
	        };
	        return _this2;
	    }

	    _createClass(Modal, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            // 把实例化的对象指向静态属性
	            Modal.self = this;
	            Modal.id = 0;
	        }
	    }, {
	        key: 'pipe',
	        value: function pipe(arr) {
	            return arr.map(function (item) {
	                switch (item.type) {
	                    case 'tips':
	                        return _react2.default.createElement(
	                            'div',
	                            { className: 'modal-item modal-item-tips', key: 'modal_' + item.id },
	                            _react2.default.createElement(
	                                'p',
	                                null,
	                                item.component
	                            )
	                        );
	                    case 'alert':
	                        return _react2.default.createElement(
	                            'div',
	                            { className: 'modal-item modal-item-alert', key: 'modal_' + item.id },
	                            _react2.default.createElement(
	                                'p',
	                                null,
	                                item.component
	                            ),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'modal-item-btns' },
	                                _react2.default.createElement(
	                                    'button',
	                                    { onClick: item.success },
	                                    '确认'
	                                ),
	                                _react2.default.createElement(
	                                    'button',
	                                    { onClick: item.cancel },
	                                    '取消'
	                                )
	                            )
	                        );
	                    case 'confirm':
	                        return _react2.default.createElement(
	                            'div',
	                            { className: 'modal-item modal-item-confirm', key: 'modal_' + item.id },
	                            _react2.default.createElement(
	                                'p',
	                                null,
	                                item.component
	                            ),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'modal-item-btns' },
	                                _react2.default.createElement(
	                                    'button',
	                                    { onClick: item.success },
	                                    '确认'
	                                ),
	                                _react2.default.createElement(
	                                    'button',
	                                    { onClick: item.cancel },
	                                    '取消'
	                                )
	                            )
	                        );
	                    case 'open':
	                        return _react2.default.createElement(
	                            'div',
	                            { className: 'modal-item modal-item-open', key: 'modal_' + item.id },
	                            item.component
	                        );
	                }
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var modalItems = this.pipe(this.state.queue);
	            return _react2.default.createElement(
	                'div',
	                { className: 'modal' },
	                modalItems
	            );
	        }
	    }]);

	    return Modal;
	}(_react.Component);

	// 新建弹框


	Modal.open = function () {
	    var component = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	    var _this = this.self;
	    var queue = this.self.state.queue;
	    var id = this.id++;

	    queue.push({
	        type: 'open',
	        component: component,
	        id: id
	    });

	    _this.setState({
	        queue: queue
	    });

	    return id;
	};

	// 提示
	Modal.tips = function () {
	    var str = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	    var time = arguments.length <= 1 || arguments[1] === undefined ? 3000 : arguments[1];

	    var _this = this.self;
	    var queue = this.self.state.queue;
	    var id = this.id++;

	    queue.push({
	        type: 'tips',
	        component: str,
	        id: id
	    });

	    _this.setState({
	        queue: queue
	    });

	    setTimeout(function () {
	        Modal.close(id);
	    }, time);

	    return id;
	};

	// 弹窗
	Modal.alert = function () {
	    var str = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	    var _success = arguments[1];
	    var _cancel = arguments[2];

	    var _this = this.self;
	    var queue = this.self.state.queue;
	    var id = this.id++;

	    queue.push({
	        type: 'alert',
	        component: str,
	        id: id,
	        success: function success() {
	            _success && _success();
	            Modal.close(id);
	        },
	        cancel: function cancel() {
	            _cancel && _cancel();
	            Modal.close(id);
	        }
	    });

	    _this.setState({
	        queue: queue
	    });

	    return id;
	};

	// 需要用户输入
	Modal.confirm = function () {
	    var str = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	    var _success2 = arguments[1];
	    var _cancel2 = arguments[2];

	    var _this = this.self;
	    var queue = this.self.state.queue;
	    var id = this.id++;

	    queue.push({
	        type: 'confirm',
	        component: str,
	        id: id,
	        success: function success() {
	            _success2 && _success2();
	            Modal.close(id);
	        },
	        cancel: function cancel() {
	            _cancel2 && _cancel2();
	            Modal.close(id);
	        }
	    });

	    _this.setState({
	        queue: queue
	    });

	    return id;
	};

	// 关闭弹窗
	Modal.close = function (id) {
	    var _this = this.self;
	    var queue = this.self.state.queue;

	    id ? queue.pop() : queue = queue.filter(function (item) {
	        return item.id != id;
	    });

	    _this.setState({
	        queue: queue
	    });
	};

	// 关闭所有
	Modal.closeAll = function () {
	    this.self.setState({
	        queue: []
	    });
	};

	// 放到全局
	window.Modal = Modal;

	exports.default = Modal;

/***/ },
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (listenHash, callback) {
	    __listenHash = listenHash == 'hash';
	    __callback = callback;

	    return {
	        changeUrl: function changeUrl(url) {
	            if (__listenHash) {
	                location.href = '#' + url;
	            } else {
	                history.pushState(null, '', url);
	            }
	        },
	        getPath: function getPath() {
	            return __listenHash ? location.hash.slice(1) : location.pathname;
	        }
	    };
	};

	// 监听hash变化

	var __listenHash = true;
	var __callback = void 0;

	window.addEventListener('hashchange', function () {
	    __listenHash && __callback && __callback(location.hash.slice(1));
	});

	window.addEventListener('popstate', function () {
	    !__listenHash && __callback && __callback(location.pathname);
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// url_match(`aaa/:id/:title`, `aaa/21/eeeee/111111`)

	function url_match() {
	    var url_1 = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	    var url_2 = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	    // 把重复的//替换成单个/
	    url_1 = url_1.trim().replace(/\/{2,}/g, '/');
	    url_2 = url_2.trim().replace(/\/{2,}/g, '/');

	    if (url_1 == '*') return {};

	    var arr_1 = url_1.split('/');
	    var arr_2 = url_2.split('/');

	    // 实际参数小于声明参数，必然不匹配
	    if (arr_2.length < arr_1.length) return;

	    // 获取参数
	    var params = {};
	    var matched = true;
	    arr_1.forEach(function (item, index) {
	        if (/:.+/.test(item) && arr_2[index]) {
	            params[item.slice(1)] = arr_2[index];
	        } else {
	            // / 可以匹配 /index
	            matched = item === arr_2[index] || !item;
	        }
	    });

	    return matched && params;
	}

	// url_match(`aaa/:：/:title`, `aaa/21/eeeee/111111`)

	exports.default = url_match;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = window.ReactDOM;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = window.React;

/***/ },
/* 12 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	var _index = __webpack_require__(25);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(23);

	var _index4 = _interopRequireDefault(_index3);

	var _index5 = __webpack_require__(30);

	var _index6 = _interopRequireDefault(_index5);

	var _index7 = __webpack_require__(27);

	var _index8 = _interopRequireDefault(_index7);

	var _index9 = __webpack_require__(6);

	var _index10 = _interopRequireDefault(_index9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(14);

	var Main = function (_Component) {
	    _inherits(Main, _Component);

	    function Main() {
	        _classCallCheck(this, Main);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Main).call(this));

	        _this.state = {
	            sidebar: false
	        };
	        return _this;
	    }

	    _createClass(Main, [{
	        key: 'handleSidebarChange',
	        value: function handleSidebarChange() {
	            this.setState({
	                sidebar: !this.state.sidebar
	            });
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'render',
	        value: function render() {
	            var state = this.state;

	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(_index10.default, null),
	                _react2.default.createElement(_index2.default, { sidebar: state.sidebar }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'main' },
	                    _react2.default.createElement(_index6.default, { sidebar: state.sidebar,
	                        handleSidebarChange: this.handleSidebarChange.bind(this) }),
	                    _react2.default.createElement(
	                        'div',
	                        { className: (state.sidebar ? '' : 'sidebar-hide') + ' content' },
	                        this.props.children ? this.props.children : _react2.default.createElement(_index8.default, null)
	                    )
	                ),
	                _react2.default.createElement(_index4.default, null)
	            );
	        }
	    }]);

	    return Main;
	}(_react.Component);

	exports.default = Main;

/***/ },
/* 14 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	var _index = __webpack_require__(6);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(16);

	// 特殊文章id
	var ID = '1465987421552';

	var Details = function (_Component) {
	    _inherits(Details, _Component);

	    function Details() {
	        _classCallCheck(this, Details);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Details).call(this));

	        _this.state = {
	            title: '',
	            content: '',
	            time: '',
	            tags: [],
	            id: 0
	        };
	        return _this;
	    }

	    _createClass(Details, [{
	        key: 'getData',
	        value: function getData() {
	            var _this2 = this;

	            var url = 'database/article/' + this.props.params.id + '.json';

	            fetch(url).then(function (response) {
	                return response.json();
	            }).then(function (data) {
	                _this2.setState(data);
	            });
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.getData();
	            this.showLoveDays();
	        }
	    }, {
	        key: 'del',
	        value: function del() {
	            var id = this.state.id;
	            if (ID == id) {
	                _index2.default.tips('文章不可删除');
	                return;
	            }

	            _index2.default.alert('确认删除？', function () {
	                fetch('./article/del?id=' + id).then(function (response) {
	                    return response.json();
	                }).then(function (data) {
	                    console.log('删除成功');
	                    location.href = '#/';
	                });
	            });
	        }
	    }, {
	        key: 'rawHtml',
	        value: function rawHtml(str) {
	            return { __html: str };
	        }
	        // 线上删除/编辑按钮不显示

	    }, {
	        key: 'getToolBar',
	        value: function getToolBar() {
	            var HOSTNAME = 'lingyansi.github.io';
	            if (HOSTNAME != location.hostname) {
	                return _react2.default.createElement(
	                    'div',
	                    { className: 'details-tool' },
	                    _react2.default.createElement(
	                        'button',
	                        { onClick: this.del.bind(this) },
	                        'DEL'
	                    ),
	                    _react2.default.createElement(
	                        _reactRouter.Link,
	                        { to: '/article/edit/' + this.state.id },
	                        _react2.default.createElement(
	                            'button',
	                            null,
	                            '编辑'
	                        )
	                    )
	                );
	            }

	            return null;
	        }
	    }, {
	        key: 'showLoveDays',
	        value: function showLoveDays() {

	            if (ID == this.props.params.id) {
	                var days = Math.ceil((new Date() - new Date('2016-03-28')) / (1000 * 60 * 60 * 24));
	                _index2.default.tips('距离2016-03-28武汉之行，过去了' + days + '天', 5000);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var state = this.state;

	            document.body.scrollTop = 0;

	            return _react2.default.createElement(
	                'div',
	                { id: 'article-details' },
	                _react2.default.createElement(
	                    'h1',
	                    null,
	                    state.title
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'tags-wrap' },
	                    '标签：',
	                    state.tags.map(function (item) {
	                        return _react2.default.createElement(
	                            'a',
	                            { href: 'javascript:0;', className: 'tag tag-pink cursor', title: item },
	                            item
	                        );
	                    })
	                ),
	                this.getToolBar(),
	                _react2.default.createElement('div', { className: 'details-content', dangerouslySetInnerHTML: this.rawHtml(state.content) }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'details-time' },
	                    '时间：',
	                    Utils.time.toString(state.time)
	                )
	            );
	        }
	    }]);

	    return Details;
	}(_react.Component);

	exports.default = Details;

/***/ },
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(10);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(5);

	var _index = __webpack_require__(19);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(18);

	var Article = function (_React$Component) {
	    _inherits(Article, _React$Component);

	    function Article() {
	        _classCallCheck(this, Article);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Article).apply(this, arguments));
	    }

	    _createClass(Article, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    { className: 'tool' },
	                    _react2.default.createElement(
	                        _reactRouter.Link,
	                        { to: 'article/new' },
	                        _react2.default.createElement(
	                            'button',
	                            null,
	                            '新建'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'button',
	                        null,
	                        '管理'
	                    )
	                ),
	                _react2.default.createElement(_index2.default, null)
	            );
	        }
	    }]);

	    return Article;
	}(_react2.default.Component);

	exports.default = Article;

/***/ },
/* 18 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(20);

	var List = function (_Component) {
	    _inherits(List, _Component);

	    function List() {
	        _classCallCheck(this, List);

	        // console.log(this)

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(List).call(this));

	        _this.state = {
	            list: []
	        };
	        return _this;
	    }

	    _createClass(List, [{
	        key: 'getList',
	        value: function getList() {
	            var that = this;

	            fetch('database/list.json').then(function (response) {
	                return response.json();
	            }).then(function (data) {
	                that.setState({
	                    list: data.list
	                });
	            });
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.getList();
	        }
	    }, {
	        key: 'rawHtml',
	        value: function rawHtml() {
	            var str = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	            return {
	                __html: str
	            };
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var len = this.props.len;
	            var list = len ? this.state.list.slice(0, len) : this.state.list;

	            return _react2.default.createElement(
	                'div',
	                { className: 'article-list' },
	                _react2.default.createElement(
	                    'ul',
	                    null,
	                    list.map(function (item) {
	                        return _react2.default.createElement(
	                            'li',
	                            { key: item.id },
	                            _react2.default.createElement(
	                                _reactRouter.Link,
	                                { to: '/article/' + item.id },
	                                _react2.default.createElement(
	                                    'h3',
	                                    null,
	                                    item.title
	                                ),
	                                _react2.default.createElement('div', { className: 'summary', dangerouslySetInnerHTML: _this2.rawHtml(item.content) }),
	                                _react2.default.createElement(
	                                    'p',
	                                    { className: 'bott' },
	                                    _react2.default.createElement(
	                                        'span',
	                                        { className: 'time' },
	                                        Utils.time.toString(item.time)
	                                    )
	                                )
	                            )
	                        );
	                    })
	                )
	            );
	        }
	    }]);

	    return List;
	}(_react.Component);

	// 用于检测类型，类型检测只能是class的静态方法


	List.propTypes = {
	    len: _react2.default.PropTypes.number.isRequired
	};

	exports.default = List;

/***/ },
/* 20 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(10);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(22);

	var New = function (_React$Component) {
	    _inherits(New, _React$Component);

	    function New() {
	        _classCallCheck(this, New);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(New).call(this));

	        _this.state = {
	            title: '',
	            content: '',
	            tags: []
	        };
	        return _this;
	    }

	    _createClass(New, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var id = this.props.params.id;
	            if (id !== undefined) {
	                this.getData(id);
	            }

	            setTimeout(function () {
	                $('#editor').wysiwyg();
	            }, 1000);
	        }
	        // 卸载前

	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            // $('.article-new').remove('.editor-wrap')
	            // 移除window上的事件
	            $('#editor').remove();
	        }
	        // 获取文章信息

	    }, {
	        key: 'getData',
	        value: function getData(id) {
	            var that = this;
	            fetch('database/article/' + id + '.json').then(function (response) {
	                return response.json();
	            }).then(function (data) {
	                that.setState(data);
	            });
	        }
	        // 提交

	    }, {
	        key: 'submit',
	        value: function submit(event) {
	            event.preventDefault();
	            var fd = new FormData(document.querySelector('#fd'));
	            fd.set('content', $('#editor').html());

	            var state = this.state;
	            for (var key in state) {
	                if (!fd.has(key)) {
	                    fd.set(key, state[key]);
	                }
	            }

	            fetch('/newArticle', {
	                method: 'POST',
	                body: fd
	            }).then(function (response) {
	                return response.json();
	            }).then(function (data) {
	                console.log(data);
	                location.href = '#/';
	            });
	        }
	        // 返回html

	    }, {
	        key: 'rawHtml',
	        value: function rawHtml() {
	            var str = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	            return { __html: str };
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var state = this.state;

	            if (!state.id && this.props.params.id != undefined) {
	                return null;
	            }

	            return _react2.default.createElement(
	                'div',
	                { className: 'article-new' },
	                _react2.default.createElement(
	                    'form',
	                    { action: '/newArticle?name=ssss', method: 'POST', id: 'fd' },
	                    _react2.default.createElement('input', { type: 'text', name: 'title',
	                        placeholder: '标题',
	                        defaultValue: state.title }),
	                    _react2.default.createElement('br', null),
	                    _react2.default.createElement('input', { type: 'text', name: 'tags', placeholder: '标签', defaultValue: state.tags.join(' ') }),
	                    _react2.default.createElement('br', null),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'btn-toolbar', 'data-role': 'editor-toolbar',
	                            'data-target': '#editor' },
	                        _react2.default.createElement(
	                            'a',
	                            { 'data-edit': 'bold', className: 'btn' },
	                            'B'
	                        ),
	                        _react2.default.createElement(
	                            'a',
	                            { 'data-edit': 'underline', className: 'btn' },
	                            '_'
	                        ),
	                        _react2.default.createElement('input', { type: 'text', 'data-edit': 'createLink', placeholder: '插入url' }),
	                        _react2.default.createElement('input', { type: 'file', 'data-edit': 'insertImage' })
	                    ),
	                    _react2.default.createElement('div', { id: 'editor', 'data-placeholder': 'fuck u please write sth ', dangerouslySetInnerHTML: this.rawHtml(state.content) }),
	                    _react2.default.createElement(
	                        'button',
	                        { type: 'submit', onClick: this.submit.bind(this) },
	                        '提交'
	                    )
	                )
	            );
	        }
	    }]);

	    return New;
	}(_react2.default.Component);

	exports.default = New;

/***/ },
/* 22 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(24);

	var Home = function (_Component) {
	    _inherits(Home, _Component);

	    function Home() {
	        _classCallCheck(this, Home);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
	    }

	    _createClass(Home, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { id: 'footer' },
	                'lingyansi.github.io about all right @2016'
	            );
	        }
	    }]);

	    return Home;
	}(_react.Component);

	exports.default = Home;

/***/ },
/* 24 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(26);

	var Home = function (_Component) {
	    _inherits(Home, _Component);

	    function Home() {
	        _classCallCheck(this, Home);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
	    }

	    _createClass(Home, [{
	        key: 'render',
	        value: function render() {
	            var props = this.props;

	            return _react2.default.createElement(
	                'div',
	                { id: 'header', className: props.sidebar ? '' : 'sidebar-hide' },
	                '灵岩寺'
	            );
	        }
	    }]);

	    return Home;
	}(_react.Component);

	exports.default = Home;

/***/ },
/* 26 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	var _index = __webpack_require__(19);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(6);

	var _index4 = _interopRequireDefault(_index3);

	var _index5 = __webpack_require__(2);

	var _index6 = _interopRequireDefault(_index5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(28);

	var Home = function (_Component) {
	    _inherits(Home, _Component);

	    function Home() {
	        _classCallCheck(this, Home);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Home).call(this));

	        _this.state = {
	            tips: [{
	                content: '硬汉 ⇨ 腰',
	                url: 'http://www.xiami.com/song/1772580840?spm=a1z1s.7154410.1996860142.3.7qJGVJ'
	            }, {
	                content: 'Crusade ⇨ Pentatonic',
	                url: 'http://www.xiami.com/song/1768980046?spm=a1z1s.7154410.1996860142.1.7qJGVJ'
	            }]
	        };
	        return _this;
	    }

	    _createClass(Home, [{
	        key: 'tipsClose',
	        value: function tipsClose(index) {
	            var tips = this.state.tips;
	            tips.splice(index, 1);

	            console.log(tips);
	            this.setState({
	                tips: tips
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            return _react2.default.createElement(
	                'div',
	                { id: 'home' },
	                this.state.tips.map(function (item, index) {
	                    return _react2.default.createElement(_index6.default, _extends({}, item, { close: _this2.tipsClose.bind(_this2, index) }));
	                }),
	                _react2.default.createElement(_index2.default, { len: 0 })
	            );
	        }
	    }]);

	    return Home;
	}(_react.Component);

	exports.default = Home;

/***/ },
/* 28 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// require('./index.scss')

	var NotFound = function (_Component) {
	    _inherits(NotFound, _Component);

	    function NotFound() {
	        _classCallCheck(this, NotFound);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NotFound).apply(this, arguments));
	    }

	    _createClass(NotFound, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { id: 'notfound' },
	                '404找不到页面'
	            );
	        }
	    }]);

	    return NotFound;
	}(_react.Component);

	exports.default = NotFound;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(31);

	var Sidebar = function (_Component) {
	    _inherits(Sidebar, _Component);

	    function Sidebar() {
	        _classCallCheck(this, Sidebar);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sidebar).call(this));

	        var LIST = [{ url: '/', title: '首页' }, { url: '/article', title: '文章' }, { url: '/about', title: '关于' }];
	        _this.state = {
	            list: LIST,
	            current: 0,
	            // avatar: 'http://ww1.sinaimg.cn/mw1024/69b8b46egw1f5gv71trm4j21ho1hon94.jpg'
	            avatar: 'http://ww3.sinaimg.cn/mw1024/69b8b46egw1f5h32f4t07j20k00qojwp.jpg'
	        };
	        return _this;
	    }

	    _createClass(Sidebar, [{
	        key: 'hashChange',
	        value: function hashChange() {
	            var hash = location.hash.slice(1);
	            var current = 0;
	            this.state.list.forEach(function (item, index) {
	                hash.startsWith(item.url) && (current = index);
	            });

	            this.setState({
	                current: current
	            });
	        }
	    }, {
	        key: 'addHashChange',
	        value: function addHashChange() {
	            window.addEventListener('hashchange', this.hashChange.bind(this));
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.hashChange();
	            this.addHashChange();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var state = this.state;
	            var props = this.props;

	            return _react2.default.createElement(
	                'div',
	                { id: 'sidebar', className: props.sidebar ? 'show' : '' },
	                _react2.default.createElement(
	                    'button',
	                    { className: props.sidebar ? 'show' : '',
	                        onClick: props.handleSidebarChange },
	                    '三'
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'sidebar-content' },
	                    _react2.default.createElement('div', { className: 'avatar', style: { backgroundImage: 'url(' + state.avatar + ')' } }),
	                    _react2.default.createElement(
	                        'ul',
	                        null,
	                        state.list.map(function (item, index) {
	                            return _react2.default.createElement(
	                                'li',
	                                { className: index == state.current ? 'current' : '', key: item.url },
	                                _react2.default.createElement(
	                                    _reactRouter.Link,
	                                    { to: item.url },
	                                    item.title
	                                )
	                            );
	                        })
	                    )
	                )
	            );
	        }
	    }]);

	    return Sidebar;
	}(_react.Component);

	exports.default = Sidebar;

/***/ },
/* 31 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);