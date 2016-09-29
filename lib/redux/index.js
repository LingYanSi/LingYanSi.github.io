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

	var _redux = __webpack_require__(1);

	var _store = __webpack_require__(2);

	var _store2 = _interopRequireDefault(_store);

	var _logger = __webpack_require__(3);

	var _logger2 = _interopRequireDefault(_logger);

	var _chunk = __webpack_require__(4);

	var _chunk2 = _interopRequireDefault(_chunk);

	var _history = __webpack_require__(5);

	var _history2 = _interopRequireDefault(_history);

	var _change_user_name = __webpack_require__(6);

	var _change_user_name2 = _interopRequireDefault(_change_user_name);

	var _delete_list_item = __webpack_require__(7);

	var _delete_list_item2 = _interopRequireDefault(_delete_list_item);

	var _fetch_start = __webpack_require__(8);

	var _fetch_start2 = _interopRequireDefault(_fetch_start);

	var _prev_step = __webpack_require__(9);

	var _prev_step2 = _interopRequireDefault(_prev_step);

	var _change_num = __webpack_require__(10);

	var _change_num2 = _interopRequireDefault(_change_num);

	var _async_data = __webpack_require__(11);

	var _async_data2 = _interopRequireDefault(_async_data);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// action
	(0, _redux.createStore)(_store2.default);

	// 中间件

	var dispatch = (0, _redux.addMiddlewares)(_logger2.default, _chunk2.default, _history2.default);

	// 用户触发的动作
	document.querySelector('button').onclick = function (event) {
	    var name = event.target.previousElementSibling.value;
	    dispatch((0, _change_user_name2.default)(name));
	};

	document.querySelector('body').onclick = function (event) {
	    var $ele = event.target;
	    var classList = $ele.classList;
	    if (classList.contains('del')) {
	        dispatch((0, _delete_list_item2.default)($ele.dataset['id']));
	    }

	    if (classList.contains('history')) {
	        var id = $ele.dataset['id'];
	        console.log('历史版本', id);
	        dispatch((0, _prev_step2.default)(_history.appHistory[id].state, +id));
	    }

	    if (classList.contains('add')) {
	        dispatch((0, _change_num2.default)(1));
	    }

	    if (classList.contains('sum')) {
	        dispatch((0, _change_num2.default)(-1));
	    }
	};

	document.querySelector('.async').onclick = function (event) {
	    // 同步任务
	    dispatch((0, _fetch_start2.default)());

	    // 异步任务
	    dispatch((0, _async_data2.default)());
	};

	// render
	function render(state) {
	    console.log(state);

	    document.querySelector('#app').innerHTML = '\n        <h1>' + state.user.name + '</h1>\n        <h2>' + state.fetch + '</h2>\n        <img src="' + state.user.avatar + '" alt="" style="width: 100px; height: 100px; object-fit: cover;" />\n        <span>' + state.num + '</span> <button class="add">+1</button> <button class="sum">-1</button>\n        <ul>\n            ' + state.list.map(function (item, index) {
	        return '<li>\n                    <b>' + item.title + '</b>\n                    <span>' + item.content + '</span>\n                    <span class="del" data-id="' + index + '">del</span>\n                </li>';
	    }).join('') + '\n        </ul>\n        <ul>\n            ' + _history.appHistory.map(function (item, index) {
	        return '<span style="display: inline-block; padding: .5em; margin: 0 1em; background: red; cursor: pointer;" data-id="' + index + '" class="history">' + index + '</span>';
	    }).join('') + '\n        </ul>\n    ';
	}

	// 订阅更新
	(0, _redux.sub)(render);
	// 初始化渲染
	render(_store2.default);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// 处理订阅
	function sub(fn) {
	    sub.arr = sub.arr || [];
	    sub.arr.push(fn);
	}
	// dispatch 一个action， reducer接收到action，返回一个新的state， 然后执行更新程序
	function dispatch(action) {
	    // 获取的state后
	    // 如果是函数就执行函数
	    state = combineReducer(state, action);
	    // 更新UI，是异步的，其作用在于把同步的改变收集到一起，再去更新，效率更高

	    // 这里应该是异步的
	    sub.arr.forEach(function (item) {
	        return item(state);
	    });
	}

	var state = null;
	// 处理store
	function createStore(newStore) {
	    state = newStore;
	}

	var store = {
	    getState: function getState() {
	        return state;
	    },

	    dispatch: dispatch,
	    sub: sub
	};

	// 添加中间件
	function addMiddlewares() {
	    for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	        middlewares[_key] = arguments[_key];
	    }

	    middlewares.reverse();
	    middlewares.forEach(function (md) {
	        // 返回一个新的dispatch
	        exports.dispatch = dispatch = md(store)(dispatch);
	    });
	    return dispatch;
	}

	// 混合后的reducer
	function combineReducer() {
	    for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        arg[_key2] = arguments[_key2];
	    }

	    var result = null;
	    combine.arr.some(function (item) {
	        result = item.apply(undefined, arg);
	        return result;
	    });
	    // 如果是null，就使用原来的state
	    return result ? result : state;
	}

	// 收集多个reducer
	function combine() {
	    var arr = combine.arr = combine.arr || [];
	    arr.push.apply(arr, arguments);
	}

	// 然而，目前这种处理方式还会有一些问题，因为此redux无法复用
	exports.combine = combine;
	exports.addMiddlewares = addMiddlewares;
	exports.dispatch = dispatch;
	exports.createStore = createStore;
	exports.sub = sub;
	exports.store = store;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	// store
	var store = {
	    user: {
	        name: 'Redux',
	        avatar: 'https://odj7gwx6q.qnssl.com/img/2016/file014721778749070.480x800.jpeg?imageView2/2/q/75/format/webp'
	    },
	    fetch: '',
	    list: [{ title: '我不是潘金莲', content: '都是几个啦风格类似风格' }, { title: '大空头', content: '都是几个啦风格类似风格' }, { title: '谁是', content: '都是几个啦风格类似风格' }, { title: '明日边境', content: '都是几个啦风格类似风格' }, { title: '罪恶值夜', content: '都是几个啦风格类似风格' }],
	    history: [],
	    num: 0
	};

	exports.default = store;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var logger = function logger(store) {
	    return function (next) {
	        return function (action) {
	            console.log('进入: 1', store.getState());
	            next(action);
	            console.log('出去: 1', store.getState());
	        };
	    };
	};

	exports.default = logger;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var chunck = function chunck(store) {
	    return function (next) {
	        return function (action) {

	            if (typeof action == 'function') {
	                return action(store.dispatch);
	            } else {
	                next(action);
	            }
	        };
	    };
	};

	exports.default = chunck;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var appHistory = [];
	var id = 0;
	var index = 0;
	window.fuck = appHistory;

	function clone(obj) {
	    var state = JSON.parse(JSON.stringify(obj));
	    appHistory.push({
	        id: id,
	        state: state
	    });
	    // index = appHistory.length
	    return state;
	}

	var prevStepIsHistory = false;

	var history = function history(store) {
	    return function (next) {
	        return function (action) {
	            if (!prevStepIsHistory) {
	                // 上一步不是历史版本，就缓存当前state
	                clone(store.getState());
	            } else {
	                // 当前action不是上一步 && 上一步是历史版本，那就切割历史
	                if (action.type != 'PREV_STEP') {
	                    appHistory.splice(index + 1);
	                    console.log('切割了', appHistory, index);
	                }
	            }
	            // 缓存当前action是不是PREV_STEP
	            prevStepIsHistory = action.type == 'PREV_STEP';
	            // 如果是历史action，就缓存版本号
	            if (prevStepIsHistory) {
	                index = action.data.index !== undefined ? action.data.index : index;
	            }

	            next(action);
	        };
	    };
	};

	exports.default = history;
	exports.appHistory = appHistory;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(1);

	var CHANGE_USER_NAME = 'CHANGE_USER_NAME';

	// action生成器
	function action(name) {
	    return {
	        type: CHANGE_USER_NAME,
	        data: {
	            name: name
	        }
	    };
	}

	// reducer
	function reducer(state, action) {
	    var type = action.type;
	    var data = action.data;


	    var user = state.user;
	    user = Object.assign({}, user, {
	        name: data.name
	    });

	    switch (type) {
	        case CHANGE_USER_NAME:
	            // 因为assign只是浅copy，因此并不是最佳选择，因此让我们使用不可变数据immutable
	            return Object.assign({}, state, {
	                user: user,
	                fetch: "数据加载结束"
	            });
	        default:
	            return null;
	    }
	}

	// 混合生成一个
	(0, _redux.combine)(reducer);

	// 导出 action
	exports.default = action;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(1);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var DELETE_LIST_ITEM = 'DELETE_LIST_ITEM';

	// action生成器
	function action(index) {
	    return {
	        type: DELETE_LIST_ITEM,
	        data: {
	            index: index
	        }
	    };
	}

	// reducer
	function reducer(state, action) {
	    var type = action.type;
	    var data = action.data;


	    switch (type) {
	        case DELETE_LIST_ITEM:
	            // 因为assign只是浅copy，因此并不是最佳选择，因此让我们使用不可变数据immutable
	            var list = [].concat(_toConsumableArray(state.list));
	            list.splice(data.index, 1);

	            return Object.assign({}, state, {
	                list: list
	            });
	        default:
	            return null;
	    }
	}

	// 混合生成一个
	(0, _redux.combine)(reducer);

	// 导出 action
	exports.default = action;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(1);

	var FETCH_START = 'FETCH_START';

	// action生成器
	function action(index) {
	    return {
	        type: FETCH_START,
	        data: {
	            index: index
	        }
	    };
	}

	// reducer
	function reducer(state, action) {
	    var type = action.type;
	    var data = action.data;


	    switch (type) {
	        case FETCH_START:
	            return Object.assign({}, state, {
	                fetch: "数据加载中。。。。"
	            });
	        default:
	            return null;
	    }
	}

	// 混合生成一个
	(0, _redux.combine)(reducer);

	// 导出 action
	exports.default = action;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ACTION_NAME = undefined;

	var _redux = __webpack_require__(1);

	// 上一步
	var ACTION_NAME = 'PREV_STEP';

	// action生成器
	function action(PREV_STATE, index) {
	    return {
	        type: ACTION_NAME,
	        data: {
	            PREV_STATE: PREV_STATE,
	            index: index
	        }
	    };
	}

	// reducer
	function reducer(state, action) {
	    var type = action.type;
	    var data = action.data;


	    switch (type) {
	        case ACTION_NAME:
	            return Object.assign({}, data.PREV_STATE);
	        default:
	            return null;
	    }
	}

	// 混合生成一个
	(0, _redux.combine)(reducer);

	// 导出 action
	exports.default = action;
	exports.ACTION_NAME = ACTION_NAME;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(1);

	var ACTION_NAME = 'CHANGE_NUM';

	// action生成器
	function action(value) {
	    return {
	        type: ACTION_NAME,
	        data: {
	            value: value
	        }
	    };
	}

	// reducer
	function reducer(state, action) {
	    var type = action.type;
	    var data = action.data;


	    switch (type) {
	        case ACTION_NAME:
	            // 因为assign只是浅copy，因此并不是最佳选择，因此让我们使用不可变数据immutable
	            return Object.assign({}, state, {
	                num: state.num + data.value
	            });
	        default:
	            return null;
	    }
	}

	// 混合生成一个
	(0, _redux.combine)(reducer);

	// 导出 action
	exports.default = action;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(1);

	var _change_user_name = __webpack_require__(6);

	var _change_user_name2 = _interopRequireDefault(_change_user_name);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ACTION_NAME = 'ASYNC_DATA';

	// action生成器
	function action(value) {
	    return function (dispatch) {
	        // 异步任务
	        var time = Date.now();
	        setTimeout(function () {
	            dispatch((0, _change_user_name2.default)('async的直播'));
	            console.log(Date.now() - time);
	        }, 1000);
	    };
	}

	// reducer
	function reducer(state, action) {
	    var type = action.type;
	    var data = action.data;


	    switch (type) {
	        case ACTION_NAME:
	            // 因为assign只是浅copy，因此并不是最佳选择，因此让我们使用不可变数据immutable
	            return Object.assign({}, state, {
	                num: state.num + data.value
	            });
	        default:
	            return null;
	    }
	}

	// 混合生成一个
	(0, _redux.combine)(reducer);

	// 导出 action
	exports.default = action;

/***/ }
/******/ ]);