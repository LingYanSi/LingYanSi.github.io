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

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(17);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(5);

	var _index = __webpack_require__(6);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(18);

	var _index4 = _interopRequireDefault(_index3);

	var _index5 = __webpack_require__(1);

	var _index6 = _interopRequireDefault(_index5);

	var _index7 = __webpack_require__(8);

	var _index8 = _interopRequireDefault(_index7);

	var _index9 = __webpack_require__(2);

	var _index10 = _interopRequireDefault(_index9);

	var _index11 = __webpack_require__(11);

	var _index12 = _interopRequireDefault(_index11);

	var _index13 = __webpack_require__(20);

	var _index14 = _interopRequireDefault(_index13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

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
	                null,
	                _react2.default.createElement(
	                    'h1',
	                    null,
	                    '关于'
	                ),
	                _react2.default.createElement(
	                    'div',
	                    null,
	                    '纯手工打造'
	                )
	            );
	        }
	    }]);

	    return Home;
	}(_react.Component);

	exports.default = Home;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(7);

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
	            var url = 'database/article/' + this.props.params.id + '.json';
	            var that = this;

	            fetch(url).then(function (response) {
	                return response.json();
	            }).then(function (data) {
	                data.time = new Date(+data.time).toString();

	                that.setState(data);
	            });
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.getData();
	        }
	    }, {
	        key: 'del',
	        value: function del() {
	            var is_del = confirm('确认删除？');
	            if (!is_del) {
	                return;
	            }

	            fetch('./article/del?id=' + this.state.id).then(function (response) {
	                return response.json();
	            }).then(function (data) {
	                console.log('删除成功');
	                location.href = '#/';
	            });
	        }
	    }, {
	        key: 'rawHtml',
	        value: function rawHtml(str) {
	            return { __html: str };
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var state = this.state;

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
	                            'span',
	                            { className: 'tag tag-pink cursor', title: item },
	                            item
	                        );
	                    })
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'details-tool' },
	                    _react2.default.createElement(
	                        'button',
	                        { onClick: this.del.bind(this) },
	                        'DEL'
	                    ),
	                    _react2.default.createElement(
	                        _reactRouter.Link,
	                        { to: '/article/edit/' + state.id },
	                        _react2.default.createElement(
	                            'button',
	                            null,
	                            '编辑'
	                        )
	                    )
	                ),
	                _react2.default.createElement('div', { className: 'details-content', dangerouslySetInnerHTML: this.rawHtml(state.content) }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'details-time' },
	                    '时间：',
	                    state.time
	                )
	            );
	        }
	    }]);

	    return Details;
	}(_react.Component);

	exports.default = Details;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = window.React;

/***/ },
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

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

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	var _index = __webpack_require__(15);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(13);

	var _index4 = _interopRequireDefault(_index3);

	var _index5 = __webpack_require__(21);

	var _index6 = _interopRequireDefault(_index5);

	var _index7 = __webpack_require__(18);

	var _index8 = _interopRequireDefault(_index7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(4);

	var Main = function (_Component) {
	    _inherits(Main, _Component);

	    function Main() {
	        _classCallCheck(this, Main);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Main).apply(this, arguments));
	    }

	    _createClass(Main, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(_index2.default, null),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'main' },
	                    _react2.default.createElement(_index6.default, null),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'content' },
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
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(17);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(5);

	var _index = __webpack_require__(9);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
	                ),
	                _react2.default.createElement(_index2.default, null)
	            );
	        }
	    }]);

	    return Article;
	}(_react2.default.Component);

	exports.default = Article;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(10);

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
	                console.log(data);
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

	            return _react2.default.createElement(
	                'div',
	                { id: 'article-list' },
	                _react2.default.createElement(
	                    'h1',
	                    null,
	                    '-------文章列表-----'
	                ),
	                _react2.default.createElement(
	                    'ul',
	                    null,
	                    this.state.list.map(function (item) {
	                        return _react2.default.createElement(
	                            'li',
	                            null,
	                            _react2.default.createElement(
	                                _reactRouter.Link,
	                                { to: '/article/' + item.id },
	                                _react2.default.createElement(
	                                    'h3',
	                                    null,
	                                    item.title
	                                ),
	                                _react2.default.createElement('p', { dangerouslySetInnerHTML: _this2.rawHtml(item.content) })
	                            )
	                        );
	                    })
	                )
	            );
	        }
	    }]);

	    return List;
	}(_react.Component);

	exports.default = List;

/***/ },
/* 10 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(17);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(12);

	var New = function (_React$Component) {
	    _inherits(New, _React$Component);

	    function New() {
	        _classCallCheck(this, New);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(New).call(this));

	        _this.state = {
	            title: '',
	            content: '',
	            tags: ''
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

	            console.log('time2');
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            // $('.article-new').remove('.editor-wrap')
	            $('#editor').remove();
	        }
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
	                    _react2.default.createElement('input', { type: 'text', name: 'tags', placeholder: '标签', defaultValue: state.tags }),
	                    _react2.default.createElement('br', null),
	                    _react2.default.createElement(
	                        'div',
	                        { 'class': 'btn-toolbar', 'data-role': 'editor-toolbar',
	                            'data-target': '#editor' },
	                        _react2.default.createElement(
	                            'a',
	                            { 'data-edit': 'bold', className: 'btn' },
	                            '粗'
	                        ),
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

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(14);

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

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(16);

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
	                { id: 'header' },
	                '灵岩寺'
	            );
	        }
	    }]);

	    return Home;
	}(_react.Component);

	exports.default = Home;

/***/ },
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = window.ReactDOM;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	var _index = __webpack_require__(9);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(19);

	var Home = function (_Component) {
	    _inherits(Home, _Component);

	    function Home() {
	        _classCallCheck(this, Home);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Home).call(this));

	        console.log(_this);
	        _this.state = {
	            list: []
	        };
	        return _this;
	    }

	    _createClass(Home, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { id: 'home' },
	                _react2.default.createElement(_index2.default, null)
	            );
	        }
	    }]);

	    return Home;
	}(_react.Component);

	exports.default = Home;

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

	var _react = __webpack_require__(3);

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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(22);

	var Sidebar = function (_Component) {
	    _inherits(Sidebar, _Component);

	    function Sidebar() {
	        _classCallCheck(this, Sidebar);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sidebar).call(this));

	        var LIST = [{ url: '/', title: '首页' }, { url: '/article', title: '文章' }, { url: '/about', title: '关于' }];
	        _this.state = {
	            list: LIST,
	            current: 0,
	            show: false
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
	        key: 'toggle',
	        value: function toggle() {
	            var show = this.state.show;
	            $('.content,#header').toggleClass('sidebar-hide', !show);
	            this.setState({
	                show: !show
	            });
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

	            return _react2.default.createElement(
	                'div',
	                { id: 'sidebar', className: state.show ? 'show' : '' },
	                _react2.default.createElement(
	                    'button',
	                    { onClick: this.toggle.bind(this) },
	                    '三'
	                ),
	                _react2.default.createElement(
	                    'ul',
	                    null,
	                    state.list.map(function (item, index) {
	                        return _react2.default.createElement(
	                            'li',
	                            { className: index == state.current ? 'current' : '' },
	                            _react2.default.createElement(
	                                _reactRouter.Link,
	                                { to: item.url },
	                                item.title
	                            )
	                        );
	                    })
	                )
	            );
	        }
	    }]);

	    return Sidebar;
	}(_react.Component);

	exports.default = Sidebar;

/***/ },
/* 22 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);