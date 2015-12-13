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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var GoodsList = __webpack_require__(218);
	var UseGallerNum = __webpack_require__(219);
	var FieldMixins = __webpack_require__(17);
	var Pagination = __webpack_require__(29);
	var Link = __webpack_require__(214);
	var Action = __webpack_require__(212);
	var keyCodeMap = __webpack_require__(213);

	var UniGuideFloatView = __webpack_require__(225);
	var SystemUpdateTipView = __webpack_require__(224);

	__webpack_require__(220);

	var GALLERYSEARCHOPTIONS = {
	    "ALL": 0,
	    "IN": 1,
	    "OUT": 2
	};

	var ContentView = React.createClass({
	    displayName: 'ContentView',

	    mixins: [FieldMixins],
	    getInitialState: function getInitialState() {
	        return {
	            data: {},
	            goodsName: XD.Util.getQueryString('goodsName') || '',
	            goodsCode: XD.Util.getQueryString('goodsCode') || '',
	            gallerySearchOptions: XD.Util.getQueryString('gallerySearchOptions') || 0,
	            currentPage: 1,
	            totalPage: 0
	        };
	    },
	    // 在挂载结束之后马上被调用
	    componentDidMount: function componentDidMount() {
	        this.search();
	    },
	    //按键处理  目前只处理回车
	    handleKeyEvent: function handleKeyEvent(handleFunc, handleKeyCode, e) {
	        var keyCode = e && e.keyCode || 0;

	        if (keyCode === handleKeyCode) {
	            handleFunc(e);
	        }
	    },

	    // 查询
	    search: function search() {
	        var params = {
	            goodsName: this.state.goodsName,
	            goodsCode: this.state.goodsCode,
	            gallerySearchOptions: this.state.gallerySearchOptions,
	            _ajax: 1,
	            type: 1,
	            page: 1
	        };

	        Action.getGoodsList.call(this, params, function (data) {
	            var result = data.result;
	            var totalPage = Math.ceil(result.total / result.pageSize);
	            if (this.isMounted()) {
	                this.setState({
	                    totalPage: totalPage,
	                    data: result,
	                    currentPage: 1
	                });
	            }
	        });
	    },
	    // 切换分页
	    changePage: function changePage(currentPage) {
	        Action.getGoodsList.call(this, {
	            goodsName: this.state.goodsName,
	            goodsCode: this.state.goodsCode,
	            gallerySearchOptions: this.state.gallerySearchOptions,
	            _ajax: 1,
	            type: 1,
	            page: currentPage
	        }, function (data) {
	            var result = data.result;
	            var totalPage = Math.ceil(result.total / result.pageSize);
	            if (this.isMounted()) {
	                this.setState({
	                    totalPage: totalPage,
	                    data: result,
	                    currentPage: currentPage
	                }, function () {
	                    window.scrollTo(0, 0);
	                });
	            }
	        });
	    },
	    render: function render() {
	        var data = this.state.data;
	        var goodsList = data.goodsList || [];
	        var goodsName = this.state.goodsName;
	        var goodsCode = this.state.goodsCode;
	        var gallerySearchOptions = this.state.gallerySearchOptions;
	        var isMagicShop = data.isMagicShop;
	        var beautyApplies = data.beautyApplies || {};
	        var isAllowAddGallery = data.isAllowAddGallery;
	        var maxGallery = data.maxGallery || 0;
	        var usedGallery = data.usedGallery || 0;

	        return React.createElement(
	            'div',
	            { className: 'xd-goods-list-sale xd-page' },
	            React.createElement(UniGuideFloatView, { source: '10' }),
	            React.createElement(
	                'div',
	                { className: 'xd-header' },
	                React.createElement(
	                    'h2',
	                    { className: 'xd-title clearfix' },
	                    React.createElement(
	                        'span',
	                        { className: 'fl' },
	                        '出售中商品'
	                    ),
	                    isMagicShop ? React.createElement(
	                        'a',
	                        { href: '/trade/magic/outlets', className: 'fr xd-btn primary', target: '_blank' },
	                        '美妆特卖'
	                    ) : null
	                ),
	                data.notice ? React.createElement(SystemUpdateTipView, { notice: data.notice }) : null
	            ),
	            React.createElement(
	                'div',
	                { className: 'xd-body' },
	                React.createElement(
	                    'div',
	                    { className: 'mb20' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '您最多可上架',
	                        React.createElement(
	                            'span',
	                            { className: 'high' },
	                            data.shelfCapacity
	                        ),
	                        '个商品，目前已上架',
	                        React.createElement(
	                            'span',
	                            { className: 'high' },
	                            data.shelfCount
	                        ),
	                        '个。'
	                    ),
	                    isAllowAddGallery ? React.createElement(UseGallerNum, { maxGallery: maxGallery, usedGallery: usedGallery }) : null,
	                    React.createElement(
	                        'a',
	                        { href: Link.PUBLISH_GOODS_URL, target: '_blank', className: 'ml20 xd-btn primary' },
	                        '发布新商品'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'xd-search' },
	                    React.createElement(
	                        'form',
	                        { ref: 'searchForm' },
	                        React.createElement(
	                            'ul',
	                            { className: 'clearfix' },
	                            React.createElement(
	                                'li',
	                                null,
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '商品名称：'
	                                ),
	                                React.createElement('input', { className: 'xd-input primary', placeholder: '商品名称', value: goodsName, onKeyDown: this.handleKeyEvent.bind(this, this.search, keyCodeMap.ENTER), onChange: this.handlePathChange('goodsName') })
	                            ),
	                            React.createElement(
	                                'li',
	                                null,
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '商品编码：'
	                                ),
	                                React.createElement('input', { className: 'xd-input primary', placeholder: '商品编码', value: goodsCode, onKeyDown: this.handleKeyEvent.bind(this, this.search, keyCodeMap.ENTER), onChange: this.handlePathChange('goodsCode') })
	                            ),
	                            isAllowAddGallery ? React.createElement(
	                                'li',
	                                null,
	                                React.createElement(
	                                    'div',
	                                    { className: 'xd-label' },
	                                    '橱窗位筛选：'
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'xd-field' },
	                                    React.createElement(
	                                        'select',
	                                        { className: 'xd-select', value: gallerySearchOptions, onChange: this.handlePathChange('gallerySearchOptions') },
	                                        React.createElement(
	                                            'option',
	                                            { value: GALLERYSEARCHOPTIONS.ALL },
	                                            '所有出售中商品'
	                                        ),
	                                        React.createElement(
	                                            'option',
	                                            { value: GALLERYSEARCHOPTIONS.IN },
	                                            '已加入橱窗位商品'
	                                        ),
	                                        React.createElement(
	                                            'option',
	                                            { value: GALLERYSEARCHOPTIONS.OUT },
	                                            '未加入橱窗位商品'
	                                        )
	                                    )
	                                )
	                            ) : null,
	                            React.createElement(
	                                'li',
	                                null,
	                                React.createElement(
	                                    'a',
	                                    { href: 'javascript:;', className: 'xd-btn primary', onClick: this.search },
	                                    '查询'
	                                )
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'xd-goods-list' },
	                    React.createElement(GoodsList, { data: goodsList, isMagicShop: isMagicShop, beautyApplies: beautyApplies, isAllowAddGallery: isAllowAddGallery })
	                ),
	                this.state.totalPage > 1 ? React.createElement(Pagination, { totalPage: this.state.totalPage, currentPage: this.state.currentPage, onChangePage: this.changePage }) : null
	            )
	        );
	    }
	});

	React.render(React.createElement(ContentView, null), document.getElementById('J_Page'));

/***/ },

/***/ 3:
/***/ function(module, exports) {

	module.exports = window.React;

/***/ },

/***/ 5:
/***/ function(module, exports) {

	module.exports = window._;

/***/ },

/***/ 9:
/***/ function(module, exports) {

	"use strict";

	/**
	 * Created by neo on 15/4/15.
	 */

	var localStorage = window.localStorage;

	/**
	 * 默认生命周期（1天）
	 * @type {int}
	 */
	var MAX_AGE = 86400;

	var LocalCache = {
	    /**
	     * 设置缓存
	     * @param {string} key
	     * @param {*} value
	     * @param {int} [lifetime] 缓存生命周期
	     */
	    set: function set(key, value, lifetime) {
	        var item = {
	            value: value,
	            expires: +new Date() + (lifetime || MAX_AGE) * 1000
	        };

	        localStorage.setItem(key, JSON.stringify(item));
	    },

	    /**
	     * 读取缓存
	     * @param {string} key
	     * @returns {*}
	     */
	    get: function get(key) {
	        var value = localStorage.getItem(key);
	        if (value === null) {
	            return null;
	        }

	        var item = JSON.parse(value);
	        if (+new Date() > item.expires) {
	            return null;
	        }

	        return item.value;
	    }
	};

	module.exports = LocalCache;

/***/ },

/***/ 13:
/***/ function(module, exports) {

	module.exports = window.PubSub;

/***/ },

/***/ 17:
/***/ function(module, exports) {

	"use strict";

	/**
	 * Created by neo on 13/4/15.
	 */

	var REGEX_EMAIL = /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$/;
	var REGEX_MOBILE = /^0?[1][34578][0-9]{9}$/;
	var REGEX_PHONE = /(\d{11})|((\d{3,4})-(\d{7,8}))$/;
	var REGEX_REALNAME = /^[\u4E00-\u9FA5\uf900-\ufa2d·]{2,30}$/i;
	var REGEX_PASSWORD = /^.{6,20}$/;

	_.mixin({
	    valueAt: function valueAt(obj, keyPath) {
	        if (keyPath === undefined || keyPath === null) {
	            return undefined;
	        }

	        var keys = keyPath.split('.');
	        if (keys.length === 1) {
	            return obj[keyPath];
	        }

	        var iterator = obj;
	        for (var i = 0, len = keys.length; i < len; i++) {
	            iterator = iterator[keys[i]];
	            if (!iterator) {
	                return undefined;
	            }
	        }

	        return iterator;
	    },

	    setValueAt: function setValueAt(val, obj, keyPath) {
	        if (keyPath === undefined || keyPath === null) {
	            return obj;
	        }

	        var keys = keyPath.split('.');
	        if (keys.length === 1) {
	            obj[keyPath] = val;
	            return obj;
	        }

	        var iterator = obj;
	        for (var i = 0, len = keys.length - 1; i < len; i++) {
	            var key = keys[i];
	            if (!iterator[key]) {
	                iterator[key] = {};
	            }
	            iterator = iterator[key];
	        }

	        iterator[keys[i]] = val;

	        return obj;
	    },

	    isPureObject: function isPureObject(obj) {
	        return Object.prototype.toString.call(obj) === '[object Object]';
	    },

	    merge: function merge(dest, src) {
	        for (var key in src) {
	            if (!src.hasOwnProperty(key)) {
	                continue;
	            }

	            var destVal = dest[key],
	                srcVal = src[key];
	            if (destVal === srcVal) {
	                continue;
	            }

	            if (destVal && _.isPureObject(destVal) && _.isPureObject(srcVal)) {
	                _.merge(destVal, srcVal);
	            } else {
	                dest[key] = srcVal;
	            }
	        }
	    }
	});

	/**
	 * Check whether value matches format; if no format passed in, just check whether value is empty;
	 * @param {string|number} value
	 * @param {string|RegExp} [format]
	 * @returns {boolean}
	 */
	function checkFormat(value, format) {
	    if (!value) {
	        return false;
	    }

	    if (_.isRegExp(format) && !format.test(value)) {
	        return false;
	    }

	    switch (format) {
	        case 'number':
	            return !isNaN(+value);

	        case 'int':
	            value = +value;
	            return !isNaN(value) && Math.floor(value) === value;

	        case '+int':
	            value = +value;
	            return !isNaN(value) && value > 0 && Math.floor(value) === value;

	        case 'mobile':
	            return REGEX_MOBILE.test(value);

	        case 'phone':
	            return REGEX_PHONE.test(value);

	        case 'email':
	            return REGEX_EMAIL.test(value);

	        case 'realname':
	            return REGEX_REALNAME.test(value);

	        case 'password':
	            return REGEX_PASSWORD.test(value);

	        default:
	            return value !== undefined && value !== null && ('' + value).length > 0;
	    }
	}

	function _validateField(fields) {
	    var state = this.state,
	        values = {};

	    if (_.isString(fields)) {
	        fields = [fields];
	    }

	    if (_.isArray(fields)) {
	        _.each(fields, function (keyPath) {
	            values[keyPath] = _.valueAt(state, keyPath);
	        });

	        return _.every(values);
	    } else {
	        _.each(fields, function (field, keyPath) {
	            values[keyPath] = _.valueAt(state, keyPath);
	        });

	        return _.every(values, function (value, key) {
	            return checkFormat(value, fields[key]);
	        });
	    }
	}

	function _getFieldData(fields) {
	    var state = this.state,
	        data = {};

	    if (_.isString(fields)) {
	        fields = [fields];
	    } else if (!_.isArray(fields)) {
	        fields = _.keys(fields);
	    }

	    _.each(fields, function (keyPath) {
	        _.setValueAt(_.valueAt(state, keyPath), data, keyPath);
	    });

	    return data;
	}

	function _handlePathChange(keyPath, valueExtractor, event) {
	    var paths = keyPath.split('.');

	    if (!_.isFunction(valueExtractor)) {
	        event = event === undefined ? valueExtractor : event;
	        valueExtractor = this.extractValue;
	    }

	    _.setValueAt(valueExtractor(event), this.state, keyPath);

	    this.setState(_.pick(this.state, paths[0]));
	}

	module.exports = {
	    /**
	     * Handle change on state for keyPath, which is a string like 'data.user.name'
	     * @param {string} keyPath
	     * @param {function} [valueExtractor]
	     */
	    handlePathChange: function handlePathChange(keyPath, valueExtractor) {
	        return _handlePathChange.bind(this, keyPath, valueExtractor);
	    },

	    extractValue: function extractValue(event) {
	        if (_.isString(event) || _.isNumber(event)) {
	            return event;
	        }

	        var target = event.target;
	        if (_.isElement(target)) {
	            if (target.tagName === 'INPUT' && target.type === 'checkbox') {

	                return target.checked;
	            }

	            return target.value;
	        }

	        return undefined;
	    },

	    /**
	     * 通用校验生成器
	     * @param {string|[string]|{}} fields 需要校验的state下的字段，多个则传入数组
	     * @returns {function}
	     */
	    validateField: function validateField(fields) {
	        return _validateField.bind(this, fields);
	    },

	    /**
	     * 通用获取数据生成器
	     * @param {string|[string]|{}} fields 需要获取的state下的字段，多个则传入数组
	     * @returns {function}
	     */
	    getFieldData: function getFieldData(fields) {
	        return _getFieldData.bind(this, fields);
	    },

	    checkFormat: checkFormat
	};

/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);
	var _ = __webpack_require__(5);

	var styles = __webpack_require__(22);

	var ModalController = React.createClass({
	    displayName: 'ModalController',

	    statics: {
	        prefix: 'xd-',

	        instance: null,
	        modals: [],

	        layoutStyle: {},

	        /**
	         * Open a modal
	         * @param {object} options Modal设置（title、class、id等）
	         */
	        open: function open(options) {
	            var defaultOptions = {
	                // options for modal
	                title: null,
	                body: null,
	                className: null,
	                callback: null,
	                beforeClose: null,

	                // options for modal controller
	                isAbsolute: false,
	                showMask: true,
	                closeByMask: true
	            };

	            if (options.classes !== undefined) {
	                console.warn('Option `classes` is deprecated, use className instead');
	                options.className = options.classes;
	                delete options.classes;
	            }

	            options = _.extend(defaultOptions, options);

	            if (options.id !== undefined) {
	                options.id = String(options.id);
	                if (ModalController._findComponent(options.id) !== null) {
	                    console.warn('A modal with ID %s has existed', options.id);
	                    return null;
	                }
	            } else {
	                options.id = _.uniqueId('ReactModal-');
	            }

	            ModalController.modals.push(options);
	            ModalController._forceUpdate();

	            return options.id;
	        },

	        /**
	         * Close a modal
	         * @param {string} [id] - Modal ID (optional)
	         * @return {ModalController}
	         */
	        close: function close(id) {
	            var index = -1;

	            if (_.isString(id)) {
	                index = _.findIndex(ModalController.modals, function (modal) {
	                    return modal.id === id;
	                });

	                if (index < 0) {
	                    console.warn('modal with ID %s not found', id);
	                    return ModalController;
	                }
	            }

	            var modalComponent = ModalController._findComponent(id);
	            if (modalComponent && modalComponent.handleBeforeClose()) {
	                ModalController.modals.splice(index, 1);
	                ModalController._forceUpdate();
	            }

	            return ModalController;
	        },

	        closeAll: function closeAll() {
	            var activeComponent = ModalController._activeComponent();
	            if (activeComponent.handleBeforeClose()) {
	                ModalController.modals = [];
	                ModalController._forceUpdate();
	            }

	            return ModalController;
	        },

	        /**
	         * Open a alert modal
	         * @param {string} msg
	         * @param {function} [callback=Modal.close]
	         * @param {object} [options] Modal设置（title、class、id等）
	         */
	        alert: function alert(msg, callback, options) {
	            if (!_.isFunction(callback)) {
	                options = options || callback;
	                callback = ModalController.close;
	            }

	            var defaultOptions = {
	                body: React.createElement(
	                    'div',
	                    { style: styles.alertWrap },
	                    React.createElement(
	                        'div',
	                        { style: styles.alertContent },
	                        msg
	                    ),
	                    React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                            'button',
	                            { className: ModalController.prefix + 'btn primary', onClick: callback },
	                            '确认'
	                        )
	                    )
	                ),
	                closeByMask: false,
	                callback: callback
	            };

	            options = _.extend(defaultOptions, options);

	            return ModalController.open(options);
	        },

	        /**
	         * Open a confirm modal
	         * @param {string} msg
	         * @param {function} [callback=_.noop]
	         * @param {object} [options] Modal设置（title、class、id等）
	         */
	        confirm: function confirm(msg, callback, options) {
	            if (!_.isFunction(callback)) {
	                options = options || callback;
	                callback = _.noop;
	            }

	            var defaultOptions = {
	                body: React.createElement(
	                    'div',
	                    { style: styles.alertWrap },
	                    React.createElement(
	                        'div',
	                        { style: styles.alertContent },
	                        msg
	                    ),
	                    React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                            'button',
	                            { className: ModalController.prefix + 'btn primary',
	                                style: { marginRight: 20 }, onClick: callback },
	                            '确认'
	                        ),
	                        React.createElement(
	                            'button',
	                            { className: ModalController.prefix + 'btn', onClick: ModalController.close },
	                            '取消'
	                        )
	                    )
	                ),
	                closeByMask: false,
	                callback: callback
	            };

	            options = _.extend(defaultOptions, options);

	            return ModalController.open(options);
	        },

	        /**
	         * Open a tip modal
	         * @param {string} msg
	         * @param {function|int} [callback]
	         * @param {int|object} [delay=800] time before the tip dismisses
	         * @param {object} [options] Modal设置（title、class、id等）
	         */
	        tip: function tip(msg, callback, delay, options) {
	            if (!_.isFunction(callback)) {
	                options = delay;
	                delay = callback;
	                callback = _.noop;
	            }
	            if (!_.isNumber(delay)) {
	                options = delay;
	                delay = 800;
	            }

	            var defaultOptions = {
	                body: React.createElement(
	                    'div',
	                    { style: styles.alertWrap },
	                    msg
	                ),
	                closeByMask: false
	            };

	            options = _.extend(defaultOptions, options);

	            var modalId = ModalController.open(options);

	            callback = _.compose(callback, ModalController.close.bind(ModalController, modalId));

	            if (delay > 0) {
	                setTimeout(function () {
	                    callback();
	                }, delay);
	            }

	            return modalId;
	        },

	        update: function update(id) {
	            var modalComponent = ModalController._findComponent(id);

	            if (!modalComponent) {
	                return;
	            }

	            modalComponent.forceUpdate();
	        },

	        updateTitle: function updateTitle(title, id) {
	            var modalComponent = id ? ModalController._findComponent(id) : ModalController._activeComponent();

	            if (!modalComponent) {
	                return;
	            }

	            modalComponent.setState({
	                title: title
	            });
	        },

	        v: '0.2.0',
	        noConflict: function noConflict() {
	            window.ReactModal = _previousReactModal;

	            return ModalController;
	        },
	        withPrefix: function withPrefix(prefix) {
	            if (ModalController.prefix !== prefix) {
	                ModalController.prefix = prefix;
	                ModalController._forceUpdate();
	            }

	            return ModalController;
	        },

	        // Private method
	        _activeComponent: function _activeComponent() {
	            try {
	                var activeID = _.last(ModalController.modals).id;
	            } catch (e) {
	                return null;
	            }

	            return ModalController.instance.refs[activeID] || null;
	        },

	        _findComponent: function _findComponent(id) {
	            if (ModalController.instance === null) {
	                return null;
	            }

	            if (!_.isString(id)) {
	                try {
	                    id = _.last(ModalController.modals).id;
	                } catch (e) {
	                    return null;
	                }
	            }

	            return ModalController.instance.refs[id] || null;
	        },

	        _forceUpdate: function _forceUpdate() {
	            if (ModalController.instance === null) {
	                return;
	            }

	            ModalController.instance.forceUpdate();
	        }
	    },

	    componentDidMount: function componentDidMount() {
	        ModalController.instance = this;
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        ModalController.instance = null;
	    },

	    /*componentWillUpdate() {
	        console.time('ModalController render');
	    },
	     componentDidUpdate() {
	        console.timeEnd('ModalController render');
	    },*/

	    render: function render() {
	        ModalController.layoutStyle = {};

	        var modals = ModalController.modals,
	            activeModal = _.last(modals),
	            modalsCount = modals.length;

	        var modalWrapStyle = _.extend({}, styles.modalWrap),
	            modalMaskStyle = _.extend({}, styles.modalMask);

	        if (modalsCount > 0) {
	            modalWrapStyle.display = 'block';

	            if (!activeModal.showMask) {
	                _.extend(modalMaskStyle, styles.modalWithoutMask);
	            }

	            if (activeModal.isAbsolute) {
	                modalWrapStyle.position = 'absolute';
	                var scrollTop = window.pageYOffset || document.body.scrollTop,
	                    windowHeight = window.innerHeight || document.documentElement.clientHeight;

	                ModalController.layoutStyle.top = scrollTop + windowHeight / 2;
	            }
	        }

	        return React.createElement(
	            'div',
	            { className: ModalController.prefix + 'modal-wrap', style: modalWrapStyle },
	            React.createElement('div', { style: modalMaskStyle, onClick: this.handleMaskClick }),
	            modals.map(function (modal) {
	                return React.createElement(Modal, { key: modal.id, ref: modal.id, data: modal, active: modal === activeModal });
	            }, this)
	        );
	    },

	    handleMaskClick: function handleMaskClick() {
	        var activeModal = _.last(ModalController.modals);
	        if (!activeModal.closeByMask) {
	            return;
	        }

	        ModalController.closeAll();
	    }
	});

	var Modal = React.createClass({
	    displayName: 'Modal',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            active: false
	        };
	    },

	    getInitialState: function getInitialState() {
	        var modal = this.props.data;

	        return {
	            title: modal.title,
	            body: modal.body,
	            style: {},
	            width: 0,
	            height: 0
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        this.locate();
	    },

	    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	        if (nextProps.active !== this.props.active) {
	            return true;
	        }

	        var state = this.state;
	        if (nextState.title !== state.title || nextState.width !== state.width || nextState.height !== state.height) {
	            return true;
	        }

	        if (!_.isEqual(ModalController.layoutStyle, this.layoutStyle)) {
	            return true;
	        }

	        return false;
	    },

	    /*componentWillUpdate() {
	        //console.time('Modal ' + this.props.data.id + ' render');
	    },*/

	    componentDidUpdate: function componentDidUpdate() {
	        this.locate();
	        //console.timeEnd('Modal ' + this.props.data.id + ' render');
	    },

	    /*componentWillUnmount: function () {
	        //console.log('Modal with ID %s will unmount', this.props.data.id);
	    },*/

	    render: function render() {
	        var prefix = ModalController.prefix;

	        var _props$data = this.props.data;
	        var id = _props$data.id;
	        var className = _props$data.className;
	        var _state = this.state;
	        var title = _state.title;
	        var body = _state.body;
	        var style = _state.style;

	        this.layoutStyle = ModalController.layoutStyle;

	        var modalStyle = _.extend({}, styles.modal, ModalController.layoutStyle, style);

	        if (this.props.active) {
	            _.extend(modalStyle, styles.modalActive);
	        }

	        var modalClassName = _.compact([prefix + 'modal', className]).join(' ');

	        return React.createElement(
	            'div',
	            { id: id, className: modalClassName, style: modalStyle },
	            title && React.createElement(
	                'div',
	                { className: prefix + 'modal-header', style: styles.modalHeader },
	                React.createElement(
	                    'h2',
	                    { className: prefix + 'title', style: styles.modalTitle },
	                    title
	                ),
	                React.createElement(
	                    'a',
	                    { className: prefix + 'modal-close', style: styles.modalClose, href: 'javascript:',
	                        onClick: this.close },
	                    '×'
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: prefix + 'modal-body', style: styles.modalBody },
	                body
	            )
	        );
	    },

	    locate: function locate() {
	        //console.time('Modal ' + this.props.data.id + ' locate');

	        var modalDOM = React.findDOMNode(this);
	        var height = modalDOM.offsetHeight,
	            width = modalDOM.offsetWidth;
	        var state = this.state;

	        if (Math.abs(width - state.width) > 3 || Math.abs(height - state.height) > 3) {
	            //console.log('Modal ' + this.props.data.id + ' need relocate');
	            var marginTop = height / -2;
	            if (marginTop + ModalController.layoutStyle.top < 0) {
	                marginTop = -ModalController.layoutStyle.top;
	            }

	            this.setState({
	                width: width,
	                height: height,
	                style: {
	                    marginTop: marginTop,
	                    marginLeft: width / -2
	                }
	            });
	        }

	        //console.timeEnd('Modal ' + this.props.data.id + ' locate');
	    },

	    close: function close() {
	        ModalController.close(this.props.data.id);
	    },

	    handleBeforeClose: function handleBeforeClose() {
	        var modal = this.props.data;
	        return !(modal.beforeClose && modal.beforeClose() === false);
	    }
	});

	var _previousReactModal = window.ReactModal;

	if (_previousReactModal === undefined || _previousReactModal !== ModalController) {
	    window.ReactModal = ModalController;

	    var modalContainer = document.createElement('div');

	    document.body.appendChild(modalContainer);
	    React.render(React.createElement(ModalController, null), modalContainer);
	}

	module.exports = ModalController;

/***/ },

/***/ 22:
/***/ function(module, exports) {

	'use strict';
	/**
	 * Created by neo on 27/7/15.
	 */

	module.exports = {
	    modalWrap: {
	        position: 'fixed',
	        display: 'none',
	        top: 0,
	        right: 0,
	        bottom: 0,
	        left: 0,
	        zIndex: 1000
	    },

	    modalWithoutMask: {
	        background: 'transparent'
	    },

	    modal: {
	        position: 'absolute',
	        minWidth: 400,
	        top: '50%',
	        left: '50%',
	        background: '#fff',
	        border: '1px solid #e8e8e8',
	        WebkitTransition: 'box-shadow 300ms ease',
	        MozTransition: 'box-shadow 300ms ease',
	        transition: 'box-shadow 300ms ease',
	        zIndex: 0
	    },

	    modalActive: {
	        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.4)',
	        zIndex: 10
	    },

	    modalMask: {
	        position: 'absolute',
	        top: 0,
	        bottom: 0,
	        left: 0,
	        right: 0,
	        background: '#000',
	        opacity: 0.5,
	        filter: 'alpha(opacity=50)',
	        zIndex: 5
	    },

	    modalClose: {
	        position: 'absolute',
	        display: 'block',
	        width: 40,
	        top: 0,
	        right: 0,
	        color: '#c4c4c4',
	        fontSize: 30,
	        fontFamily: 'SimSun, sans-serif',
	        textAlign: 'center'
	    },

	    modalHeader: {
	        position: 'relative',
	        height: 45,
	        paddingLeft: 20,
	        background: '#f4f5fa',
	        lineHeight: '44px',
	        WebkitUserSelect: 'none',
	        userSelect: 'none'
	    },
	    modalTitle: {
	        marginRight: 40,
	        fontSize: 16
	    },

	    modalBody: {
	        paddingTop: 40,
	        paddingBottom: 40
	    },

	    alertWrap: {
	        maxWidth: 600,
	        padding: '0 40px',
	        fontSize: 16,
	        textAlign: 'center'
	    },

	    alertContent: {
	        marginBottom: 20
	    }
	};

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	/**
	 * [xd 翻页组件]
	 * @type {[type]}
	 * @author  yefei
	 * @create  2015-04-07
	 * @param {[type]}      [varname]        [description]
	 * @param {int}         [currentPage]    [当前第几页][必填]
	 * @param {int}         [totalPage]      [总共几页] [选填]
	 * @param {int}         [display_num]    [显示多少页数字页码] [选填]
	 * @param {int}         [totalSize]      [总共多少条数据] [选填]
	 * @param {int}         [pageSize]       [每页显示多少条数据] [选填]
	 * @param {function}    [onChangePage]   [翻页回调，返回值为当前选中页码] [选填]
	 * @param {int}         [isEnd]          [是否是最后一页] [选填]
	 * @param {string}      [link]           [跳转链接] [选填]
	 */

	__webpack_require__(30);

	var Pagination = React.createClass({
	    displayName: 'Pagination',

	    getInitialState: function getInitialState() {
	        var newProps = this.updateProps(this.props);
	        return newProps;
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        var newProps = this.updateProps(props);
	        this.setState(newProps);
	    },
	    updateProps: function updateProps(props) {
	        var totalPage = props.totalPage;

	        //不显示最后一页，显示点点点
	        if (props.hideEnd) {
	            totalPage = props.currentPage + 2;
	        }

	        var props = {
	            current: parseInt(props.currentPage) || 1, // 当前页码
	            isEnd: this.props.isEnd, // 是否是最后一页
	            totalPage: totalPage || parseInt(props.currentPage) || 1, // 总共有多少页
	            display_num: parseInt(props.display_num) || 4, // 显示数字的页码数
	            link: props.link, // 页面直接跳转链接
	            changePage: props.onChangePage || '', // 页码选中回调
	            hideEnd: props.hideEnd
	        };
	        return props;
	    },
	    // 显示数字的区间
	    getInterval: function getInterval(current) {
	        var state = this.state;
	        var half_display_num = Math.floor(state.display_num / 2);
	        var upper_limit = state.totalPage - state.display_num;
	        var start = current > half_display_num ? Math.max(Math.min(current - half_display_num, upper_limit), 1) : 1;
	        var end = current > half_display_num ? Math.min(current + half_display_num + state.display_num % 2, state.totalPage) : Math.min(state.display_num, state.totalPage);
	        return { start: start, end: end };
	    },
	    changePage: function changePage(page) {
	        if (this.state.changePage && typeof this.state.changePage == 'function') {
	            this.state.changePage(page);
	        }
	    },
	    createLink: function createLink(current, page_id, text, className, length) {
	        var link = this.state.link ? this.state.link + 'page=' + page_id : 'javascript:;';

	        className = current == page_id ? 'active' : className;
	        return React.createElement(
	            'li',
	            { className: className, key: length, onClick: page_id ? this.changePage.bind(this, page_id) : '' },
	            React.createElement(
	                'a',
	                { href: page_id ? link : 'javascript:;' },
	                text
	            )
	        );
	    },
	    createRangeLink: function createRangeLink(current, start, end) {
	        var arr = [];
	        if (current > 1) {
	            arr.push(this.createLink(current, current - 1, '<', 'btn-opera', arr.length));
	        }
	        if (start > 1) {
	            arr.push(this.createLink(current, 1, 1, '', arr.length));
	            if (start > 2) {
	                arr.push(this.createLink(current, 0, '...', 'disabled', arr.length));
	            }
	        }
	        for (var i = start; i <= end; i++) {
	            arr.push(this.createLink(current, i, i, '', arr.length));
	        }
	        if (this.state.hideEnd) {
	            arr.push(this.createLink(current, 0, '...', 'disabled', arr.length));
	        } else if (end < this.state.totalPage) {
	            if (end < this.state.totalPage - 1) {
	                arr.push(this.createLink(current, 0, '...', 'disabled', arr.length));
	            }
	            arr.push(this.createLink(current, this.state.totalPage, this.state.totalPage, '', arr.length));
	        }

	        if (current < this.state.totalPage) {
	            arr.push(this.createLink(current, current + 1, '>', 'btn-opera', arr.length));
	        }
	        return arr;
	    },

	    createPagination: function createPagination(current) {
	        var interval = this.getInterval(current);
	        return this.createRangeLink(current, interval.start, interval.end);
	    },

	    render: function render() {
	        var arr = this.createPagination(this.state.current);
	        return React.createElement(
	            'ul',
	            { className: 'xd-pagination' },
	            arr.map(function (item) {
	                return item;
	            })
	        );
	    }
	});

	module.exports = Pagination;

/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(666);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(934)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/data/app/gitlab/f-day/node_modules/css-loader/index.js!/data/app/gitlab/f-day/node_modules/less-loader/index.js!/data/app/gitlab/f-day/app/module/pagination/style/index.less", function() {
			var newContent = require("!!/data/app/gitlab/f-day/node_modules/css-loader/index.js!/data/app/gitlab/f-day/node_modules/less-loader/index.js!/data/app/gitlab/f-day/app/module/pagination/style/index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 212:
/***/ function(module, exports) {

	/**
	 * 商品列表页面接口配置
	 */
	'use strict';

	module.exports = {
	    // 获取商品列表
	    getGoodsList: function getGoodsList(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/list', 'get', params, successFn, failFn);
	    },

	    //获取浮窗数据
	    getTip: function getTip(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/similarInfo', 'get', params, successFn, failFn);
	    },

	    // 下架
	    offline: function offline(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/downShelf', 'post', params, successFn, failFn);
	    },

	    // 上架
	    online: function online(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/onShelf', 'post', params, successFn, failFn);
	    },

	    getGalleryGoods: function getGalleryGoods(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/onShelf', 'post', params, successFn, failFn);
	    },

	    // 加入橱窗
	    putGallery: function putGallery(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/XDPutGallery', 'post', params, successFn, failFn);
	    },

	    // 取消橱窗
	    cancelGallery: function cancelGallery(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/XDCancelGallery', 'post', params, successFn, failFn);
	    },

	    // 删除
	    del: function del(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/delete', 'post', params, successFn, failFn);
	    },

	    //实拍审核
	    realShotApply: function realShotApply(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/apply', 'post', params, successFn, failFn);
	    }
	};

	// 请求数据
	var postData = function postData(url, type, params, successFn, failFn) {
	    var that = this;
	    $.ajax({
	        url: url,
	        type: type,
	        dataType: 'json',
	        data: params
	    }).done(function (data) {
	        if (data.status.code == 1001) {
	            _.isFunction(successFn) && successFn.call(that, data);
	        } else {
	            _.isFunction(failFn) && failFn.call(that, data);
	        }
	    }).fail(function () {
	        //console.log("系统繁忙");
	    }).always(function () {
	        //console.log("complete："+ url);
	    });
	};

/***/ },

/***/ 213:
/***/ function(module, exports) {

	"use strict";

	module.exports = {
		ENTER: 0x0D
	};

/***/ },

/***/ 214:
/***/ function(module, exports) {

	/**
	 * 商品列表页面中链接配置
	 */
	'use strict';

	module.exports = {
	    // 商品详情页
	    GOODS_DETAIL_URL: 'http://shop.mogujie.com/detail/',

	    // 特卖
	    TEMAI_URL: '/trade/magic/outlets/newsale?itemId=',

	    // 发布新商品
	    PUBLISH_GOODS_URL: '/pc/itemmanager/item/category',

	    // 编辑商品
	    EDIT_GOODS_URL: '/pc/itemmanager/item/edit/',

	    // 万灵
	    WANLING_URL: '/cps/item/list4seller?from=itemlist&queryKey=tradeItem&queryValue=http://shop.mogujie.com/detail/',

	    // 图灵
	    TULING_URL: '/union/cpc',

	    // 图灵-推广管理
	    TULING_ADMANAGE_URL: '/union/cpc/admanage?from=itemlist&queryKey=tradeItem&onlineOnly=0&queryValue=http://shop.mogujie.com/detail/'
	};

/***/ },

/***/ 218:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var Modal = __webpack_require__(21);
	var Link = __webpack_require__(214);
	var Action = __webpack_require__(212);

	// 商品
	var Goods = React.createClass({
	    displayName: 'Goods',

	    getInitialState: function getInitialState() {
	        return {
	            tipInfo: {},
	            shootTip: false,
	            isApplying: true
	        };
	    },

	    // 下架
	    offline: function offline(itemId, index, event) {
	        Modal.confirm('您确定下架吗', function () {
	            Action.offline.call(this, { itemId: itemId }, function (data) {
	                PubSub.publish('offline.update', {
	                    index: index
	                });
	                Modal.close();
	                Modal.tip('下架成功');
	            }, function (data) {
	                Modal.close();
	                Modal.alert(data.status.msg);
	            });
	        });
	    },
	    // 添加橱窗
	    putGallery: function putGallery(itemId, index, event) {
	        Action.putGallery.call(this, { itemId: itemId }, function (data) {
	            PubSub.publish('gallery.update', {
	                index: index,
	                hasAddGallery: true
	            });
	            Modal.tip(data.result.msg);
	        }, function (data) {
	            Modal.alert(data.result.error);
	        });
	    },

	    // 取消橱窗
	    cancelGallery: function cancelGallery(itemId, index, event) {
	        Action.cancelGallery.call(this, { itemId: itemId }, function (data) {
	            PubSub.publish('gallery.update', {
	                index: index,
	                hasAddGallery: false
	            });
	            Modal.tip(data.result.msg);
	        }, function (data) {
	            Modal.alert(data.result.error);
	        });
	    },
	    index: 0,
	    getTipData: function getTipData(itemId) {
	        Action.getTip.call(this, { itemId: itemId }, function (data) {
	            this.state.tipInfo = data.result;
	            this.setState(this.state);
	        }, function (data) {
	            Modal.alert(data.result);
	        });
	    },

	    //实拍加权
	    handleRealPicWeight: function handleRealPicWeight(itemId, index, event) {
	        var obj = event.srcElement || event.target;
	        var params = {
	            tradeItemId: itemId
	        };
	        Action.realShotApply.call(this, params, function (data) {
	            this.setState({
	                isApplying: false
	            });
	        }, function (data) {
	            var code = data.status.code;
	            if (code == 19100001) {
	                PubSub.publish('dialogInfo.update', {
	                    userDialog: false,
	                    notUserDialog: true,
	                    nullOrder: false
	                });
	            } else if (code == 19100002) {
	                PubSub.publish('dialogInfo.update', {
	                    userDialog: true,
	                    notUserDialog: false,
	                    nullOrder: false
	                });
	            } else if (code == 19100003) {
	                PubSub.publish('dialogInfo.update', {
	                    userDialog: false,
	                    notUserDialog: false,
	                    nullOrder: true
	                });
	            } else if (code == 4004) {
	                Modal.alert(data.result.message);
	            } else if (code == 19100010) {
	                Modal.alert('uni系统升级中，升级时间：2015.09.16 02:00-04:00');
	            }
	        });
	    },

	    //实拍加权详情介绍
	    realPicDetail: function realPicDetail() {
	        window.open("http://www.mogujie.com/act/150813jiuzhi?source=40");
	    },
	    openAlertTip: function openAlertTip() {
	        this.setState({
	            shootTip: true
	        });
	    },
	    closeAlertTip: function closeAlertTip() {
	        this.setState({
	            shootTip: false
	        });
	    },
	    render: function render() {
	        var goods = this.props.data;
	        var index = this.props.index;
	        var tips = this.state.tipInfo;
	        var shootTip = this.state.shootTip;
	        var galleryBtn = null;
	        var isApplying = this.state.isApplying;

	        //  商品已经审核通过可以加入到橱窗位
	        if (GoodsList.isAllowAddGallery && goods.canGalleryStatus && !goods.hasAddGallery) {
	            galleryBtn = React.createElement(
	                'a',
	                { href: 'javascript:;', className: '', onClick: this.putGallery.bind(this, goods.itemId, index) },
	                '加入橱窗'
	            );
	        } else if (goods.hasAddGallery) {
	            galleryBtn = React.createElement(
	                'a',
	                { href: 'javascript:;', className: '', onClick: this.cancelGallery.bind(this, goods.itemId, index) },
	                '取消橱窗'
	            );
	        }

	        return React.createElement(
	            'tr',
	            null,
	            React.createElement(
	                'td',
	                { className: 'goods', width: '280' },
	                React.createElement(
	                    'div',
	                    { className: 'clearfix' },
	                    React.createElement(
	                        'a',
	                        { href: Link.GOODS_DETAIL_URL + goods.itemId, className: 'fl face', target: '_blank' },
	                        React.createElement('img', { src: goods.image, width: '70' }),
	                        goods.isShoot ? React.createElement('i', { className: 'realPicIcon' }) : ''
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'info ml10 fl' },
	                        React.createElement(
	                            'a',
	                            { href: Link.GOODS_DETAIL_URL + goods.itemId, className: 'name', target: '_blank' },
	                            goods.title
	                        ),
	                        goods.code != '' ? React.createElement(
	                            'p',
	                            null,
	                            '商品编码：',
	                            goods.code
	                        ) : '',
	                        goods.hasAddGallery ? React.createElement(
	                            'p',
	                            { className: 'galler' },
	                            React.createElement('img', { src: 'http://s7.mogucdn.com/pic/141028/fffff_ieydoytghfstayzsmqytambqmmyde_16x16.png' }),
	                            React.createElement(
	                                'span',
	                                null,
	                                '已加入橱窗位'
	                            )
	                        ) : null
	                    ),
	                    React.createElement(
	                        'ul',
	                        { className: 'fr tips' },
	                        goods.similarItemToReview ? React.createElement(
	                            'li',
	                            { className: 'tip' },
	                            React.createElement(
	                                'p',
	                                null,
	                                '同款审核中'
	                            )
	                        ) : goods.similarItemMerged ? React.createElement(
	                            'li',
	                            { className: 'tip' },
	                            React.createElement(
	                                'p',
	                                null,
	                                '同款合并'
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'tip-detail' },
	                                React.createElement(
	                                    'p',
	                                    null,
	                                    '状态：该商品已被其他同款商品合并。'
	                                ),
	                                React.createElement(
	                                    'p',
	                                    null,
	                                    '结果：不在图墙和搜索页面展示。'
	                                ),
	                                React.createElement(
	                                    'p',
	                                    null,
	                                    '建议：换封面图，或进行实拍。',
	                                    React.createElement(
	                                        'a',
	                                        { href: 'http://www.xiaodian.com/pc/shopadmin/help/detail?id=720', target: '_blank' },
	                                        '【详情】'
	                                    )
	                                ),
	                                React.createElement(
	                                    'p',
	                                    null,
	                                    '同款商品：',
	                                    React.createElement(
	                                        'a',
	                                        { target: '_blank', href: goods.similarItemUrl },
	                                        '点击这里'
	                                    )
	                                )
	                            )
	                        ) : null
	                    )
	                )
	            ),
	            React.createElement(
	                'td',
	                { className: 'price', width: '80' },
	                '￥',
	                goods.price
	            ),
	            React.createElement(
	                'td',
	                { className: 'stock', width: '80' },
	                goods.stock
	            ),
	            React.createElement(
	                'td',
	                { className: 'sale-count', width: '80' },
	                goods.sale
	            ),
	            React.createElement(
	                'td',
	                { className: 'action', width: '160' },
	                React.createElement(
	                    'a',
	                    { href: Link.EDIT_GOODS_URL + goods.itemId, target: '_blank' },
	                    '编辑'
	                ),
	                React.createElement(
	                    'a',
	                    { href: 'javascript:;', style: { display: "block" }, onClick: this.offline.bind(this, goods.itemId, index) },
	                    '下架'
	                ),
	                goods.isShoot ? '' : React.createElement(
	                    'div',
	                    null,
	                    goods.isApply && isApplying ? React.createElement(
	                        'a',
	                        { href: 'javascript:;', className: 'realPicBtn' },
	                        React.createElement(
	                            'span',
	                            { onClick: this.handleRealPicWeight.bind(this, goods.itemId, index) },
	                            '实拍加权'
	                        ),
	                        React.createElement('i', { className: 'alertIcon', onClick: this.realPicDetail, onMouseOver: this.openAlertTip, onMouseOut: this.closeAlertTip }),
	                        shootTip ? React.createElement('i', { className: 'alertTip' }) : ''
	                    ) : React.createElement(
	                        'a',
	                        { href: 'javascript:;', className: 'audit' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '审核中...'
	                        ),
	                        React.createElement('i', { className: 'alertIcon', onClick: this.realPicDetail, onMouseOver: this.openAlertTip, onMouseOut: this.closeAlertTip }),
	                        shootTip ? React.createElement('i', { className: 'alertTip' }) : ''
	                    )
	                ),
	                galleryBtn
	            ),
	            React.createElement(
	                'td',
	                { className: 'promotion', width: '80' },
	                goods.isBeauty && GoodsList.isMagicShop ? !GoodsList.beautyApplies[goods.itemId] ? React.createElement(
	                    'a',
	                    { href: Link.TEMAI_URL + goods.itemId },
	                    '特卖'
	                ) : "已申请" : React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'a',
	                        { href: Link.WANLING_URL + goods.itemId },
	                        '万灵'
	                    ),
	                    React.createElement('br', null),
	                    React.createElement(
	                        'a',
	                        { href: Link.TULING_ADMANAGE_URL + goods.itemId },
	                        '图灵'
	                    )
	                )
	            )
	        );
	    }
	});

	// 商品
	var GoodsRow = React.createClass({
	    displayName: 'GoodsRow',

	    render: function render() {
	        var item = this.props.data;
	        var index = this.props.index;
	        return React.createElement(
	            'div',
	            { className: 'xd-section-content' },
	            React.createElement(
	                'table',
	                { className: 'xd-table' },
	                React.createElement(
	                    'thead',
	                    null,
	                    React.createElement(
	                        'tr',
	                        null,
	                        React.createElement(
	                            'th',
	                            { width: '280' },
	                            '商品',
	                            item.newItemLabel ? React.createElement(
	                                'a',
	                                { href: item.newItemLabel.link || '', target: '_blank', className: 'high' },
	                                '（',
	                                item.newItemLabel.name || '',
	                                '）'
	                            ) : null
	                        ),
	                        React.createElement(
	                            'th',
	                            { width: '80' },
	                            '价格'
	                        ),
	                        React.createElement(
	                            'th',
	                            { width: '80' },
	                            '库存'
	                        ),
	                        React.createElement(
	                            'th',
	                            { width: '80' },
	                            '销量'
	                        ),
	                        React.createElement(
	                            'th',
	                            { width: '160' },
	                            '操作'
	                        ),
	                        React.createElement(
	                            'th',
	                            { width: '80' },
	                            '推广'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'tbody',
	                    null,
	                    React.createElement(Goods, { data: item, index: index })
	                )
	            )
	        );
	    }
	});

	var GoodsList = React.createClass({
	    displayName: 'GoodsList',

	    statics: {
	        isAjax: true
	    },
	    getInitialState: function getInitialState() {
	        return {
	            data: [],
	            dialogInfo: {}
	        };
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            data: props.data
	        });
	        GoodsList.isAjax = false;
	    },
	    componentDidMount: function componentDidMount() {
	        PubSub.subscribe('offline.update', this.offlineUpdate);
	        PubSub.subscribe('gallery.update', this.galleryUpdate);
	        PubSub.subscribe('dialogInfo.update', this.dialogInfoUpdate);
	    },
	    dialogInfoUpdate: function dialogInfoUpdate(topic, data) {
	        this.setState({
	            dialogInfo: data
	        });
	    },
	    galleryUpdate: function galleryUpdate(msg, data) {
	        var goodsList = this.state.data;
	        goodsList[data.index].hasAddGallery = data.hasAddGallery;
	        this.setState({
	            data: goodsList
	        });
	    },
	    offlineUpdate: function offlineUpdate(msg, data) {
	        var goodsList = this.state.data;
	        goodsList.splice(data.index, 1);
	        this.setState({
	            data: goodsList
	        });
	    },
	    closedialog: function closedialog() {
	        this.setState({
	            dialogInfo: {
	                userDialog: false,
	                notUserDialog: false,
	                nullOrder: false
	            }
	        });
	    },
	    render: function render() {
	        var goodsList = this.state.data || [];
	        var dialogInfo = this.state.dialogInfo;
	        GoodsList['isMagicShop'] = this.props.isMagicShop;
	        GoodsList['beautyApplies'] = this.props.beautyApplies;
	        GoodsList['isAllowAddGallery'] = this.props.isAllowAddGallery;

	        if (GoodsList.isAjax) {
	            return React.createElement(
	                'p',
	                { className: 'loading' },
	                '正在加载数据...'
	            );
	        } else {
	            return React.createElement(
	                'div',
	                { className: 'xd-section' },
	                dialogInfo.userDialog || dialogInfo.notUserDialog || dialogInfo.nullOrder ? React.createElement('div', { className: 'mask' }) : '',
	                dialogInfo.userDialog ? React.createElement(
	                    'div',
	                    { className: 'dialog_user' },
	                    React.createElement('div', { className: 'dialog_close', onClick: this.closedialog }),
	                    React.createElement('a', { className: 'dialog_link', href: 'http://www.mogujie.com/act/150813jiuzhi?source=50', target: '_blank', onClick: this.closedialog })
	                ) : '',
	                dialogInfo.notUserDialog ? React.createElement(
	                    'div',
	                    { className: 'dialog_notUser' },
	                    React.createElement('div', { className: 'dialog_close', onClick: this.closedialog }),
	                    React.createElement('a', { className: 'dialog_link', href: 'http://www.mogujie.com/act/150813jiuzhi?source=50', target: '_blank', onClick: this.closedialog })
	                ) : '',
	                dialogInfo.nullOrder ? React.createElement(
	                    'div',
	                    { className: 'dialog_nullOrder' },
	                    React.createElement('div', { className: 'dialog_close', onClick: this.closedialog }),
	                    React.createElement('div', { className: 'dialog_sure', onClick: this.closedialog })
	                ) : '',
	                goodsList.length ? goodsList.map((function (item, i) {
	                    return React.createElement(GoodsRow, { data: item, index: i });
	                }).bind(this)) : React.createElement(
	                    'p',
	                    { className: 'no-result' },
	                    'Sorry，未查询到相应商品~'
	                )
	            );
	        }
	    }
	});

	module.exports = GoodsList;

/***/ },

/***/ 219:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);

	var UseGallerNum = React.createClass({
	    displayName: 'UseGallerNum',

	    getInitialState: function getInitialState() {
	        return {
	            maxNum: this.props.maxGallery || 0,
	            useNum: this.props.usedGallery || 0
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        PubSub.subscribe('gallery.update', this.galleryUpdate);
	    },
	    galleryUpdate: function galleryUpdate(msg, data) {
	        var useNum = this.state.useNum;
	        this.setState({
	            useNum: data.hasAddGallery ? ++useNum : --useNum
	        });
	    },
	    render: function render() {
	        return React.createElement(
	            'span',
	            null,
	            '您目前拥有',
	            React.createElement(
	                'span',
	                { className: 'high' },
	                this.state.maxNum || 0
	            ),
	            '个橱窗位，已使用',
	            React.createElement(
	                'span',
	                { className: 'high' },
	                this.state.useNum || 0
	            ),
	            '个。'
	        );
	    }
	});

	module.exports = UseGallerNum;

/***/ },

/***/ 220:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(738);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(934)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/data/app/gitlab/f-day/node_modules/css-loader/index.js!/data/app/gitlab/f-day/node_modules/less-loader/index.js!/data/app/gitlab/f-day/app/pages/goods/list/style/index.less", function() {
			var newContent = require("!!/data/app/gitlab/f-day/node_modules/css-loader/index.js!/data/app/gitlab/f-day/node_modules/less-loader/index.js!/data/app/gitlab/f-day/app/pages/goods/list/style/index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 222:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(739);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(934)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/data/app/gitlab/f-day/node_modules/css-loader/index.js!/data/app/gitlab/f-day/node_modules/less-loader/index.js!/data/app/gitlab/f-day/app/pages/goods/module/style/index.less", function() {
			var newContent = require("!!/data/app/gitlab/f-day/node_modules/css-loader/index.js!/data/app/gitlab/f-day/node_modules/less-loader/index.js!/data/app/gitlab/f-day/app/pages/goods/module/style/index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 224:
/***/ function(module, exports, __webpack_require__) {

	/*
	    [需求说明]:9月24日凌晨维护通知
	*/
	'use strict';

	var React = __webpack_require__(3);

	__webpack_require__(222);

	var SystemUpdateTipView = React.createClass({
	    displayName: 'SystemUpdateTipView',

	    getInitialState: function getInitialState() {
	        return {
	            notice: ''
	        };
	    },

	    componentWillMount: function componentWillMount() {
	        var me = this,
	            props = me.props;

	        me.setState({
	            notice: props.notice
	        });
	    },

	    render: function render() {
	        var me = this,
	            state = me.state;

	        return React.createElement(
	            'p',
	            { className: 'system-update-tip' },
	            state.notice
	        );
	    }
	});

	module.exports = SystemUpdateTipView;

/***/ },

/***/ 225:
/***/ function(module, exports, __webpack_require__) {

	/*
	    [需求说明]:uni130版本添加实拍图功能，在app审核上线后在小店商家后台加上这个浮窗做推广
	    [加上浮窗的页面]:商品管理页面（出售中、仓库中、发布新商品）三个页面
	*/
	'use strict';

	var React = __webpack_require__(3);
	var LocalCache = __webpack_require__(9);

	__webpack_require__(222);

	var UniGuideFloatView = React.createClass({
	    displayName: 'UniGuideFloatView',

	    getInitialState: function getInitialState() {
	        return {
	            show: true
	        };
	    },

	    componentWillMount: function componentWillMount() {
	        this.show();
	    },

	    render: function render() {
	        var me = this,
	            state = me.state,
	            source = me.props.source;

	        if (state.show === false) {
	            return React.createElement('span', null);
	        }

	        return React.createElement(
	            'div',
	            { className: 'uni-right-sidebar' },
	            React.createElement(
	                'span',
	                { className: 'close-btn', onClick: this.hide },
	                '×'
	            ),
	            React.createElement(
	                'a',
	                { href: 'http://www.mogujie.com/act/150813jiuzhi?source=' + source, target: '_blank' },
	                React.createElement('img', { src: 'http://s17.mogucdn.com/p1/150827/upload_ieztsoldmqytenjugmzdambqgyyde_100x100.png', alt: 'uni' })
	            )
	        );
	    },

	    show: function show() {
	        var me = this,
	            state = me.state,
	            localStorage = window.localStorage;

	        if (localStorage && LocalCache.get('UniGuideFloatShow')) {
	            state.show = false;
	            me.setState(state);
	        }
	    },

	    hide: function hide(name) {
	        var me = this,
	            state = me.state,
	            localStorage = window.localStorage;

	        state.show = false;
	        me.setState(state);

	        localStorage && LocalCache.set('UniGuideFloatShow', 1); //localCache中默认是缓存一天
	    }
	});

	module.exports = UniGuideFloatView;

/***/ },

/***/ 658:
/***/ function(module, exports) {

	"use strict";

	module.exports = function () {
		var list = [];
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
		return list;
	};

/***/ },

/***/ 666:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(658)();
	exports.push([module.id, "/**\n * @name xd-pagination\n * @desc xd module\n * @create 2015-04-07 @yefei\n */\n.xd-pagination {\n  margin: 0 auto;\n  border-radius: 0;\n  font-size: 0;\n  text-align: center;\n}\n.xd-pagination > li {\n  display: inline-block;\n  margin-left: 1px;\n  font-size: 12px;\n}\n.xd-pagination > li.disabled a {\n  cursor: not-allowed;\n}\n.xd-pagination > li.disabled a:hover {\n  background: none;\n  color: #333;\n}\n.xd-pagination > li.btn-opera {\n  margin-left: 0;\n}\n.xd-pagination > li.btn-opera a {\n  border: 1px solid #c4c4c4;\n  background: #fff;\n  color: #333;\n}\n.xd-pagination > li > a,\n.xd-pagination > li > span {\n  float: none;\n  margin-left: 0;\n  border: 0;\n  display: block;\n  color: #333;\n  font-weight: 400;\n  border-radius: 2px;\n  background: none;\n  padding: 2px 10px;\n  margin-right: 10px;\n  font-size: 15px;\n}\n.xd-pagination > li:first-child > a,\n.xd-pagination > li:first-child > span,\n.xd-pagination-lg > li:first-child > a,\n.xd-pagination-lg > li:first-child > span,\n.xd-pagination-sm > li:first-child > a,\n.xd-pagination-sm > li:first-child > span,\n.xd-pagination > li:last-child > a,\n.xd-pagination > li:last-child > span,\n.xd-pagination-lg > li:last-child > a,\n.xd-pagination-lg > li:last-child > span,\n.xd-pagination-sm > li:last-child > a,\n.xd-pagination-sm > li:last-child > span {\n  border-radius: 2px;\n}\n.xd-pagination > .active > a,\n.xd-pagination > .active > span,\n.xd-pagination > .active > a:hover,\n.xd-pagination > .active > span:hover {\n  background-color: #f55;\n  cursor: default;\n  color: #fff;\n}\n", ""]);

/***/ },

/***/ 738:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(658)();
	exports.push([module.id, ".xd-page .high {\n  color: #ff5555;\n}\n.xd-page .loading,\n.xd-page .no-result {\n  text-align: center;\n  color: #888888;\n  background: #f3f3f3;\n  padding: 10px;\n  margin-bottom: 20px;\n}\n.xd-page .xd-search {\n  margin-bottom: 40px;\n}\n.xd-page .xd-search li {\n  float: left;\n  margin-right: 10px;\n  margin-bottom: 10px;\n}\n.xd-page .xd-search .xd-input {\n  width: 150px;\n  height: 30px;\n}\n.xd-page .xd-section-content {\n  margin-bottom: 20px;\n}\n.xd-page .xd-goods-list table td {\n  vertical-align: top;\n}\n.xd-page .xd-goods-list .name {\n  color: #333;\n}\n.xd-page .xd-goods-list .info {\n  width: 160px;\n}\n.xd-page .xd-goods-list .galler {\n  color: #00b41e;\n}\n.xd-page .xd-goods-list .galler img,\n.xd-page .xd-goods-list .galler span {\n  vertical-align: middle;\n  margin-right: 5px;\n}\n.xd-page .xd-pagination {\n  padding-bottom: 40px;\n}\n.xd-goods-list-sale .xd-title {\n  display: block!important;\n}\n.xd-goods-list-sale .info {\n  width: 220px !important;\n}\n.xd-goods-list-sale .tip {\n  position: relative;\n}\n.xd-goods-list-sale .tip p {\n  color: #666;\n}\n.xd-goods-list-sale .tip:hover .tip-detail {\n  display: block;\n}\n.xd-goods-list-sale .tip .tip-detail {\n  display: none;\n  position: absolute;\n  top: -85px;\n  left: -100px;\n  width: 300px;\n  padding: 10px;\n  background: #fff;\n  border: 1px solid #ddd;\n  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);\n}\n.realPicIcon {\n  background: url(http://s18.mogucdn.com/p1/150807/upload_iezdqzbvmmzdezlegizdambqmmyde_71x20.png);\n  display: block;\n  width: 70px;\n  height: 20px;\n  margin-top: -5px;\n  cursor: default;\n}\n.realPicBtn {\n  display: block;\n  color: #00cc99;\n  position: relative;\n}\n.realPicBtn .alertIcon {\n  background: url(http://s18.mogucdn.com/p1/150807/upload_ie2demlghe4gmzdegizdambqgiyde_16x16.png);\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  position: absolute;\n  top: 2px;\n  left: 62px;\n}\n.realPicBtn .alertTip {\n  background: url(http://s17.mogucdn.com/p1/150812/upload_ieztgzbsgqzwcodggizdambqgyyde_83x26.png);\n  width: 83px;\n  height: 26px;\n  position: absolute;\n  top: 19px;\n  left: -3px;\n}\n.audit {\n  display: block;\n  color: #ff6666;\n  cursor: default;\n  position: relative;\n}\n.audit .alertIcon {\n  cursor: pointer;\n  background: url(http://s18.mogucdn.com/p1/150807/upload_ie2demlghe4gmzdegizdambqgiyde_16x16.png);\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  position: absolute;\n  top: 2px;\n  left: 62px;\n}\n.audit .alertTip {\n  background: url(http://s17.mogucdn.com/p1/150812/upload_ieztgzbsgqzwcodggizdambqgyyde_83x26.png);\n  width: 83px;\n  height: 26px;\n  position: absolute;\n  top: 19px;\n  left: -3px;\n}\n.mask {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: #000;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n  z-index: 5;\n}\n.dialog_close {\n  width: 50px;\n  height: 50px;\n  float: right;\n  cursor: pointer;\n}\n.dialog_user {\n  width: 440px;\n  height: 382px;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  margin-left: -220px;\n  margin-top: -196px;\n  z-index: 10;\n  background: url(http://s16.mogucdn.com/p1/150813/upload_ie2gmndemzqtezdggizdambqgiyde_440x382.png) no-repeat;\n}\n.dialog_user .dialog_link {\n  display: block;\n  top: 308px;\n  left: 160px;\n  width: 120px;\n  height: 35px;\n  cursor: pointer;\n  position: absolute;\n}\n.dialog_notUser {\n  width: 440px;\n  height: 649px;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  margin-left: -220px;\n  margin-top: -325px;\n  z-index: 10;\n  background: url(http://s17.mogucdn.com/p1/150813/upload_ieytozrrmzqtezdggizdambqmeyde_440x649.png) no-repeat;\n}\n.dialog_notUser .dialog_link {\n  display: block;\n  top: 575px;\n  left: 160px;\n  width: 120px;\n  height: 35px;\n  cursor: pointer;\n  position: absolute;\n}\n.dialog_nullOrder {\n  width: 440px;\n  height: 352px;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  margin-left: -220px;\n  margin-top: -176px;\n  z-index: 10;\n  background: url(http://s18.mogucdn.com/p1/150812/upload_ieywkolggyzdaodggizdambqmeyde_440x352.png) no-repeat;\n}\n.dialog_nullOrder .dialog_sure {\n  width: 120px;\n  height: 38px;\n  cursor: pointer;\n  margin-top: 276px;\n  margin-left: 160px;\n}\n", ""]);

/***/ },

/***/ 739:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(658)();
	exports.push([module.id, "/*侧边banner展示部分*/\n.uni-right-sidebar {\n  width: 100px;\n  height: 100px;\n  position: fixed;\n  bottom: 50px;\n  right: 10px;\n}\n.uni-right-sidebar img {\n  width: 100px;\n  height: 100px;\n}\n.uni-right-sidebar .close-btn {\n  position: absolute;\n  top: -10px;\n  left: 0;\n  padding: 0 5px;\n  cursor: pointer;\n  font-size: 14px;\n  color: #666;\n}\n.system-update-tip {\n  margin-top: 10px;\n  color: #FC6868;\n  font-size: 13px;\n}\n", ""]);

/***/ },

/***/ 934:
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
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();

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

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
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

	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
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

		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}

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


/***/ }

/******/ });