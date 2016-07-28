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

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(7);

	var _App = __webpack_require__(10);

	var _App2 = _interopRequireDefault(_App);

	var _Home = __webpack_require__(24);

	var _Home2 = _interopRequireDefault(_Home);

	var _About = __webpack_require__(5);

	var _About2 = _interopRequireDefault(_About);

	var _Article = __webpack_require__(14);

	var _Article2 = _interopRequireDefault(_Article);

	var _Details = __webpack_require__(12);

	var _Details2 = _interopRequireDefault(_Details);

	var _New = __webpack_require__(18);

	var _New2 = _interopRequireDefault(_New);

	var _NotFound = __webpack_require__(26);

	var _NotFound2 = _interopRequireDefault(_NotFound);

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
	                { history: _reactRouter.hashHistory },
	                _react2.default.createElement(
	                    _reactRouter.Route,
	                    { path: '/', component: _App2.default },
	                    _react2.default.createElement(_reactRouter.Route, { path: 'about', component: _About2.default }),
	                    _react2.default.createElement(_reactRouter.Route, { path: 'article', component: _Article2.default }),
	                    _react2.default.createElement(_reactRouter.Route, { path: 'article/new', component: _New2.default }),
	                    _react2.default.createElement(_reactRouter.Route, { path: 'article/edit/:id', component: _New2.default }),
	                    _react2.default.createElement(_reactRouter.Route, { path: 'article/:id', component: _Details2.default }),
	                    _react2.default.createElement(_reactRouter.Route, { path: '*', component: _NotFound2.default })
	                )
	            );
	        }
	    }]);

	    return App;
	}(_react2.default.Component);

	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = window.ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// import { Router, Route, Link } from 'module/router/index.js'

	/*
	router:
	    父组件：获取到子组件，子组件拥有一些属性，比如to component等，这些属性
	*/

	/*class List extends Component{
	    render(){
	        return <div>
	            <Link to="/hei/anxiang" className="btn">暗香</Link>
	            <Link to="/hei/shuying" className="btn">疏影</Link>
	            <Link to="/step/shuying" className="btn">疏影</Link>
	            <div>
	                {this.props.children}
	            </div>
	        </div>
	    }
	}

	class Step1 extends Component{

	    render(){
	        const params = this.props.params

	        console.log('疏影',params);

	        if(params.id == 'anxiang'){
	            return <div>
	                暗香<br/>
	                旧时月色，算几番照我，梅边吹笛。 <br/>
	                唤起玉人，不管清寒与攀摘。 <br/>
	                何逊而今渐老，都忘却，春风词笔。 <br/>
	                但怪得竹外疏花，香冷入瑶席。 <br/>
	                <br/>
	                江国，正寂寂。 <br/>
	                叹寄与路遥，夜雪初积。 <br/>
	                翠尊易泣，红萼无言耿相忆。 <br/>
	                长记曾携手处，千树压，西湖寒碧。 <br/>
	                又片片吹尽也，几时见得？
	            </div>
	        }

	        return <div>疏影</div>
	    }
	}

	class Step2 extends Component{
	    render(){
	        return <div>
	            哈哈哈哈哈 {this.props.params.id}
	            <Link to="/step/第三部">下一步</Link>
	            {this.props.children}
	        </div>
	    }
	}

	class Step3 extends Component{
	    render(){
	        return <div>
	            我是地方但不
	        </div>
	    }
	}

	class Home extends Component{
	    render(){
	        return <div id="about">
	            <Router >
	                <Route path="/" component={List}>
	                    <Route path="/hei/:id" component={Step1} />
	                    <Route path="/step/:id" component={Step2} />
	                </Route>
	            </Router>
	        </div>
	    }
	}*/

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
	                { className: 'padding', id: 'about' },
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
	    }]);

	    return Home;
	}(_react.Component);

	exports.default = Home;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = window.React;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = window.ReactRouter;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
	// window.Modal = Modal

	exports.default = Modal;

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(7);

	var _Header = __webpack_require__(22);

	var _Header2 = _interopRequireDefault(_Header);

	var _Footer = __webpack_require__(20);

	var _Footer2 = _interopRequireDefault(_Footer);

	var _Sidebar = __webpack_require__(27);

	var _Sidebar2 = _interopRequireDefault(_Sidebar);

	var _Home = __webpack_require__(24);

	var _Home2 = _interopRequireDefault(_Home);

	var _Modal = __webpack_require__(8);

	var _Modal2 = _interopRequireDefault(_Modal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(11);

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
	                _react2.default.createElement(_Modal2.default, null),
	                _react2.default.createElement(_Header2.default, { sidebar: state.sidebar }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'main' },
	                    _react2.default.createElement(_Sidebar2.default, { sidebar: state.sidebar,
	                        handleSidebarChange: this.handleSidebarChange.bind(this) }),
	                    _react2.default.createElement(
	                        'div',
	                        { className: (state.sidebar ? '' : 'sidebar-hide') + ' content' },
	                        this.props.children ? this.props.children : _react2.default.createElement(_Home2.default, null)
	                    )
	                ),
	                _react2.default.createElement(_Footer2.default, null)
	            );
	        }
	    }]);

	    return Main;
	}(_react.Component);

	exports.default = Main;

/***/ },
/* 11 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(7);

	var _Modal = __webpack_require__(8);

	var _Modal2 = _interopRequireDefault(_Modal);

	__webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

	            var url = './database/article/' + this.props.params.id + '.json';

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
	                _Modal2.default.tips('文章不可删除');
	                return;
	            }

	            _Modal2.default.alert('确认删除？', function () {
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
	                _Modal2.default.tips('距离2016-03-28武汉之行，过去了' + days + '天', 5000);
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
	                            { href: 'javascript:0;', className: 'tag tag-pink cursor', key: item, title: item },
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
/* 13 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(7);

	var _List = __webpack_require__(16);

	var _List2 = _interopRequireDefault(_List);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(15);

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
	                _react2.default.createElement(_List2.default, null)
	            );
	        }
	    }]);

	    return Article;
	}(_react2.default.Component);

	exports.default = Article;

/***/ },
/* 15 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(17);

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

	            fetch('./database/list.json').then(function (response) {
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
	// List.propTypes = {
	//     len: React.PropTypes.number.isRequired,
	// }

	exports.default = List;

/***/ },
/* 17 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(19);

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
	            fetch('/database/article/' + id + '.json').then(function (response) {
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
/* 19 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(21);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
/* 21 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(23);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
/* 23 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(7);

	var _List = __webpack_require__(16);

	var _List2 = _interopRequireDefault(_List);

	var _Modal = __webpack_require__(8);

	var _Modal2 = _interopRequireDefault(_Modal);

	var _Tips = __webpack_require__(3);

	var _Tips2 = _interopRequireDefault(_Tips);

	__webpack_require__(25);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
	                    return _react2.default.createElement(_Tips2.default, _extends({}, item, { close: _this2.tipsClose.bind(_this2, index), key: item.url }));
	                }),
	                _react2.default.createElement(_List2.default, { len: 0 })
	            );
	        }
	    }]);

	    return Home;
	}(_react.Component);

	exports.default = Home;

/***/ },
/* 25 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(7);

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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(7);

	__webpack_require__(28);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
/* 28 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);