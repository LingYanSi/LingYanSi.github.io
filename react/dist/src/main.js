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

	// var WebpackOnBuildPlugin = require('on-build-webpack');
	var notifier = __webpack_require__(104);

	__webpack_require__(157);

	function webpackDone(title, message, sound) {
	    notifier.notify({
	        title: title,
	        message: message,
	        sound: sound
	    }, // icon: path.join(__dirname, 'icon.png')
	    function (err, respond) {
	        if (err) console.error(err);
	    });
	}

	webpackDone('嘿嘿', '完成了啊');

	module.exports = {
	    // 是否缓存
	    cache: true,
	    // 是否监听文件变化
	    watch: true,
	    // 是否在每次打包之前将之前的打包文件
	    // 删除
	    clearBeforeBuild: true,
	    // 入口配置
	    entry: {
	        'index': './react/app/index/indexView.jsx'
	    },
	    // 输出配置
	    output: {
	        // 输出路径
	        path: './react/dist/src/',
	        filename: "[name].js",
	        // 块文件名称？
	        chunkFilename: "[name].js"
	    },
	    module: {
	        // 用来处理文件
	        loaders: [
	        // 对js/jsx文件的处理
	        { test: /\.(js|jsx)$/, loader: 'babel-loader' },
	        // 对less的处理
	        { test: /\.less$/, loader: 'style-loader!css-loader!less-loader!autoprefixer-loader' }, { test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader' }]
	    },
	    // babel需要的 presets / plugins 预设或者插件
	    babel: {
	        presets: ['react', 'es2015', 'stage-0'] // 把es2015转译成es5，这么做的弊端在于有些浏览器已经支持了新特性，却不能使用
	    },
	    // postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
	    // 不需要webpack打包的文件，key: require('key') , value: 全局对象名
	    externals: {
	        'react': 'window.React',
	        'react-dom': 'window.ReactDOM',
	        'react/addons': 'window.React'
	    },
	    // 插件
	    plugins: {

	        // 打印日志
	        // new WebpackOnBuildPlugin(function(stats) {
	        //     var compilation = stats.compilation;
	        //     var errors = compilation.errors;
	        //     if (errors.length > 0) {
	        //         var error = errors[0];
	        //         pushNotification(error.name, error.message, 'Glass');
	        //     }
	        //     else {
	        //         var message = 'takes ' + (stats.endTime - stats.startTime) + 'ms';
	        //
	        //         var warningNumber = compilation.warnings.length;
	        //         if (warningNumber > 0) {
	        //             message += ', with ' + warningNumber + ' warning(s)';
	        //         }
	        //
	        //         pushNotification('webpack building done', message);
	        //     }
	        // })
	    }
	};

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var getNative = __webpack_require__(21),
	    isArguments = __webpack_require__(22),
	    isArray = __webpack_require__(23);

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function (object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = typeof value == 'number' || reIsUint.test(value) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if (allowIndexes && isIndex(key, length) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function (object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if (typeof Ctor == 'function' && Ctor.prototype === object || typeof object != 'function' && isArrayLike(object)) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = length && isLength(length) && (isArray(object) || isArguments(object)) && length || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = index + '';
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = getNative;

/***/ },
/* 22 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * lodash 3.0.5 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function (object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	module.exports = isArguments;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function (value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isArray;

/***/ },
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
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
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var os = __webpack_require__(105);
	var utils = __webpack_require__(106);

	// All notifiers
	var NotifySend = __webpack_require__(123);
	var NotificationCenter = __webpack_require__(135);
	var WindowsToaster = __webpack_require__(155);
	var Growl = __webpack_require__(136);
	var WindowsBalloon = __webpack_require__(156);

	var options = { withFallback: true };

	switch (os.type()) {
	  case 'Linux':
	    module.exports = new NotifySend(options);
	    module.exports.Notification = NotifySend;
	    break;
	  case 'Darwin':
	    module.exports = new NotificationCenter(options);
	    module.exports.Notification = NotificationCenter;
	    break;
	  case 'Windows_NT':
	    if (utils.isLessThanWin8()) {
	      module.exports = new WindowsBalloon(options);
	      module.exports.Notification = WindowsBalloon;
	    } else {
	      module.exports = new WindowsToaster(options);
	      module.exports.Notification = WindowsToaster;
	    }
	    break;
	  default:
	    module.exports = new Growl(options);
	    module.exports.Notification = Growl;
	}

	// Expose notifiers to give full control.
	module.exports.NotifySend = NotifySend;
	module.exports.NotificationCenter = NotificationCenter;
	module.exports.WindowsToaster = WindowsToaster;
	module.exports.WindowsBalloon = WindowsBalloon;
	module.exports.Growl = Growl;

/***/ },
/* 105 */
/***/ function(module, exports) {

	'use strict';

	exports.endianness = function () {
	    return 'LE';
	};

	exports.hostname = function () {
	    if (typeof location !== 'undefined') {
	        return location.hostname;
	    } else return '';
	};

	exports.loadavg = function () {
	    return [];
	};

	exports.uptime = function () {
	    return 0;
	};

	exports.freemem = function () {
	    return Number.MAX_VALUE;
	};

	exports.totalmem = function () {
	    return Number.MAX_VALUE;
	};

	exports.cpus = function () {
	    return [];
	};

	exports.type = function () {
	    return 'Browser';
	};

	exports.release = function () {
	    if (typeof navigator !== 'undefined') {
	        return navigator.appVersion;
	    }
	    return '';
	};

	exports.networkInterfaces = exports.getNetworkInterfaces = function () {
	    return {};
	};

	exports.arch = function () {
	    return 'javascript';
	};

	exports.platform = function () {
	    return 'browser';
	};

	exports.tmpdir = exports.tmpDir = function () {
	    return '/tmp';
	};

	exports.EOL = '\n';

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	var cp = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"child_process\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    os = __webpack_require__(105),
	    fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    path = __webpack_require__(111),
	    shellwords = __webpack_require__(112),
	    semver = __webpack_require__(113),
	    clone = __webpack_require__(115);

	var escapeQuotes = function escapeQuotes(str) {
	  if (typeof str === 'string') {
	    return str.replace(/(["$`\\])/g, '\\$1');
	  } else {
	    return str;
	  }
	};

	var inArray = function inArray(arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i] === val) {
	      return true;
	    }
	  }
	  return false;
	};

	var notifySendFlags = {
	  "u": "urgency",
	  "urgency": "urgency",
	  "t": "expire-time",
	  "e": "expire-time",
	  "expire": "expire-time",
	  "expire-time": "expire-time",
	  "i": "icon",
	  "icon": "icon",
	  "c": "category",
	  "category": "category",
	  "subtitle": "category",
	  "h": "hint",
	  "hint": "hint"
	};

	module.exports.command = function (notifier, options, cb) {
	  notifier = shellwords.escape(notifier);
	  return cp.exec(notifier + ' ' + options.join(' '), function (error, stdout, stderr) {
	    if (error) return cb(error);
	    cb(stderr, stdout);
	  });
	};

	module.exports.fileCommand = function (notifier, options, cb) {
	  return cp.execFile(notifier, options, function (error, stdout, stderr) {
	    if (error) return cb(error, stdout);
	    cb(stderr, stdout);
	  });
	};

	module.exports.immediateFileCommand = function (notifier, options, cb) {
	  notifierExists(notifier, function (exists) {
	    if (!exists) return cb(new Error('Notifier (' + notifier + ') not found on system.'));
	    cp.execFile(notifier, options);
	    cb();
	  });
	};

	function notifierExists(notifier, cb) {
	  return fs.stat(notifier, function (err, stat) {
	    if (!err) return cb(stat.isFile());

	    // Check if Windows alias
	    if (!!path.extname(notifier)) {
	      // Has extentioon, no need to check more
	      return cb(false);
	    }

	    // Check if there is an exe file in the directory
	    return fs.stat(notifier + '.exe', function (err, stat) {
	      cb(stat.isFile());
	    });
	  });
	}

	var mapAppIcon = function mapAppIcon(options) {
	  if (options.appIcon) {
	    options.icon = options.appIcon;
	    delete options.appIcon;
	  }

	  return options;
	};

	var mapText = function mapText(options) {
	  if (options.text) {
	    options.message = options.text;
	    delete options.text;
	  }

	  return options;
	};

	var mapIconShorthand = function mapIconShorthand(options) {
	  if (options.i) {
	    options.icon = options.i;
	    delete options.i;
	  }

	  return options;
	};

	module.exports.mapToNotifySend = function (options) {
	  options = mapAppIcon(options);
	  options = mapText(options);

	  for (var key in options) {
	    if (key === "message" || key === "title") continue;
	    if (options.hasOwnProperty(key) && notifySendFlags[key] != key) {
	      options[notifySendFlags[key]] = options[key];
	      delete options[key];
	    }
	  }

	  return options;
	};

	module.exports.mapToGrowl = function (options) {
	  options = mapAppIcon(options);
	  options = mapIconShorthand(options);

	  if (options.text) {
	    options.message = options.text;
	    delete options.text;
	  }

	  if (options.icon && !Buffer.isBuffer(options.icon)) {
	    options.icon = fs.readFileSync(options.icon);
	  }

	  return options;
	};

	module.exports.mapToMac = function (options) {
	  options = mapIconShorthand(options);
	  options = mapText(options);

	  if (options.icon) {
	    options.appIcon = options.icon;
	    delete options.icon;
	  }

	  if (options.sound === true) {
	    options.sound = 'Bottle';
	  }

	  if (options.sound === false) {
	    delete options.sound;
	  }

	  return options;
	};

	module.exports.actionJackerDecorator = function (emitter, options, fn, mapper) {
	  options = clone(options);
	  fn = fn || function (err, data) {};
	  return function (err, data) {
	    fn.apply(emitter, [err, data]);
	    if (err || !mapper || !data) return;

	    var key = mapper(data);
	    if (!key) return;
	    emitter.emit(key, emitter, options);
	  };
	};

	module.exports.constructArgumentList = function (options, extra) {
	  var args = [];
	  extra = extra || {};

	  // Massive ugly setup. Default args
	  var initial = extra.initial || [];
	  var keyExtra = extra.keyExtra || "";
	  var allowedArguments = extra.allowedArguments || [];
	  var noEscape = extra.noEscape !== void 0;
	  var checkForAllowed = extra.allowedArguments !== void 0;
	  var explicitTrue = !!extra.explicitTrue;
	  var wrapper = extra.wrapper === void 0 ? '"' : extra.wrapper;

	  var escapeFn = noEscape ? function (i) {
	    return i;
	  } : escapeQuotes;

	  initial.forEach(function (val) {
	    args.push(wrapper + escapeFn(val) + wrapper);
	  });
	  for (var key in options) {
	    if (options.hasOwnProperty(key) && (!checkForAllowed || inArray(allowedArguments, key))) {
	      if (explicitTrue && options[key] === true) args.push('-' + keyExtra + key);else if (explicitTrue && options[key] === false) continue;else args.push('-' + keyExtra + key, wrapper + escapeFn(options[key]) + wrapper);
	    }
	  }
	  return args;
	};

	module.exports.mapToWin8 = function (options) {

	  options = mapAppIcon(options);
	  options = mapText(options);

	  if (options.icon) {
	    options.p = options.icon;
	    delete options.icon;
	  }

	  if (options.message) {
	    // Remove escape char to debug "HRESULT : 0xC00CE508" exception
	    options.m = options.message.replace(/\x1b/g, '');
	    delete options.message;
	  }

	  if (options.title) {
	    options.t = options.title;
	    delete options.title;
	  }

	  if (options.quiet || options.silent) {
	    options.q = options.quiet || options.silent;
	    delete options.quiet;
	    delete options.silent;
	  }

	  if (options.q !== false) {
	    options.q = true;
	  } else {
	    delete options.q;
	  }

	  if (options.sound) {
	    delete options.q;
	    delete options.sound;
	  }

	  if (options.wait) {
	    options.w = options.wait;
	    delete options.wait;
	  }

	  return options;
	};

	module.exports.mapToNotifu = function (options) {
	  options = mapAppIcon(options);
	  options = mapText(options);

	  if (options.icon) {
	    options.i = options.icon;
	    delete options.icon;
	  }

	  if (options.message) {
	    options.m = options.message;
	    delete options.message;
	  }

	  if (options.title) {
	    options.p = options.title;
	    delete options.title;
	  }

	  if (options.time) {
	    options.d = options.time;
	    delete options.time;
	  }

	  if (options.q !== false) {
	    options.q = true;
	  } else {
	    delete options.q;
	  }

	  if (options.quiet === false) {
	    delete options.q;
	    delete options.quiet;
	  }

	  if (options.sound) {
	    delete options.q;
	    delete options.sound;
	  }

	  if (options.t) {
	    options.d = options.t;
	    delete options.t;
	  }

	  return options;
	};

	module.exports.isMac = function () {
	  return os.type() === 'Darwin';
	};

	module.exports.isMountainLion = function () {
	  return os.type() === 'Darwin' && semver.satisfies(garanteeSemverFormat(os.release()), '>=12.0.0');
	};

	module.exports.isWin8 = function () {
	  return os.type() === 'Windows_NT' && semver.satisfies(garanteeSemverFormat(os.release()), '>=6.2.9200');
	};

	module.exports.isLessThanWin8 = function () {
	  return os.type() === 'Windows_NT' && semver.satisfies(garanteeSemverFormat(os.release()), '<6.2.9200');
	};

	function garanteeSemverFormat(version) {
	  if (version.split('.').length === 2) {
	    version += '.0';
	  }
	  return version;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(107).Buffer))

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict';

	var base64 = __webpack_require__(108);
	var ieee754 = __webpack_require__(109);
	var isArray = __webpack_require__(110);

	exports.Buffer = Buffer;
	exports.SlowBuffer = SlowBuffer;
	exports.INSPECT_MAX_BYTES = 50;
	Buffer.poolSize = 8192; // not used by this implementation

	var rootParent = {};

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();

	function typedArraySupport() {
	  function Bar() {}
	  try {
	    var arr = new Uint8Array(1);
	    arr.foo = function () {
	      return 42;
	    };
	    arr.constructor = Bar;
	    return arr.foo() === 42 && // typed array instances can be augmented
	    arr.constructor === Bar && // constructor can be set
	    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
	  } catch (e) {
	    return false;
	  }
	}

	function kMaxLength() {
	  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer(arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1]);
	    return new Buffer(arg);
	  }

	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    this.length = 0;
	    this.parent = undefined;
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg);
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8');
	  }

	  // Unusual.
	  return fromObject(this, arg);
	}

	function fromNumber(that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0;
	    }
	  }
	  return that;
	}

	function fromString(that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8';

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0;
	  that = allocate(that, length);

	  that.write(string, encoding);
	  return that;
	}

	function fromObject(that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object);

	  if (isArray(object)) return fromArray(that, object);

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string');
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object);
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object);
	    }
	  }

	  if (object.length) return fromArrayLike(that, object);

	  return fromJsonObject(that, object);
	}

	function fromBuffer(that, buffer) {
	  var length = checked(buffer.length) | 0;
	  that = allocate(that, length);
	  buffer.copy(that, 0, 0, length);
	  return that;
	}

	function fromArray(that, array) {
	  var length = checked(array.length) | 0;
	  that = allocate(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray(that, array) {
	  var length = checked(array.length) | 0;
	  that = allocate(that, length);
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	function fromArrayBuffer(that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength;
	    that = Buffer._augment(new Uint8Array(array));
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array));
	  }
	  return that;
	}

	function fromArrayLike(that, array) {
	  var length = checked(array.length) | 0;
	  that = allocate(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject(that, object) {
	  var array;
	  var length = 0;

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data;
	    length = checked(array.length) | 0;
	  }
	  that = allocate(that, length);

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype;
	  Buffer.__proto__ = Uint8Array;
	} else {
	  // pre-set for values that may exist in the future
	  Buffer.prototype.length = undefined;
	  Buffer.prototype.parent = undefined;
	}

	function allocate(that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length));
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length;
	    that._isBuffer = true;
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1;
	  if (fromPool) that.parent = rootParent;

	  return that;
	}

	function checked(length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
	  }
	  return length | 0;
	}

	function SlowBuffer(subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding);

	  var buf = new Buffer(subject, encoding);
	  delete buf.parent;
	  return buf;
	}

	Buffer.isBuffer = function isBuffer(b) {
	  return !!(b != null && b._isBuffer);
	};

	Buffer.compare = function compare(a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers');
	  }

	  if (a === b) return 0;

	  var x = a.length;
	  var y = b.length;

	  var i = 0;
	  var len = Math.min(x, y);
	  while (i < len) {
	    if (a[i] !== b[i]) break;

	    ++i;
	  }

	  if (i !== len) {
	    x = a[i];
	    y = b[i];
	  }

	  if (x < y) return -1;
	  if (y < x) return 1;
	  return 0;
	};

	Buffer.isEncoding = function isEncoding(encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true;
	    default:
	      return false;
	  }
	};

	Buffer.concat = function concat(list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.');

	  if (list.length === 0) {
	    return new Buffer(0);
	  }

	  var i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length;
	    }
	  }

	  var buf = new Buffer(length);
	  var pos = 0;
	  for (i = 0; i < list.length; i++) {
	    var item = list[i];
	    item.copy(buf, pos);
	    pos += item.length;
	  }
	  return buf;
	};

	function byteLength(string, encoding) {
	  if (typeof string !== 'string') string = '' + string;

	  var len = string.length;
	  if (len === 0) return 0;

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len;
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length;
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2;
	      case 'hex':
	        return len >>> 1;
	      case 'base64':
	        return base64ToBytes(string).length;
	      default:
	        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer.byteLength = byteLength;

	function slowToString(encoding, start, end) {
	  var loweredCase = false;

	  start = start | 0;
	  end = end === undefined || end === Infinity ? this.length : end | 0;

	  if (!encoding) encoding = 'utf8';
	  if (start < 0) start = 0;
	  if (end > this.length) end = this.length;
	  if (end <= start) return '';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end);

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end);

	      case 'ascii':
	        return asciiSlice(this, start, end);

	      case 'binary':
	        return binarySlice(this, start, end);

	      case 'base64':
	        return base64Slice(this, start, end);

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end);

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	Buffer.prototype.toString = function toString() {
	  var length = this.length | 0;
	  if (length === 0) return '';
	  if (arguments.length === 0) return utf8Slice(this, 0, length);
	  return slowToString.apply(this, arguments);
	};

	Buffer.prototype.equals = function equals(b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
	  if (this === b) return true;
	  return Buffer.compare(this, b) === 0;
	};

	Buffer.prototype.inspect = function inspect() {
	  var str = '';
	  var max = exports.INSPECT_MAX_BYTES;
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max) str += ' ... ';
	  }
	  return '<Buffer ' + str + '>';
	};

	Buffer.prototype.compare = function compare(b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
	  if (this === b) return 0;
	  return Buffer.compare(this, b);
	};

	Buffer.prototype.indexOf = function indexOf(val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff;else if (byteOffset < -0x80000000) byteOffset = -0x80000000;
	  byteOffset >>= 0;

	  if (this.length === 0) return -1;
	  if (byteOffset >= this.length) return -1;

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0);

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1; // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset);
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset);
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset);
	    }
	    return arrayIndexOf(this, [val], byteOffset);
	  }

	  function arrayIndexOf(arr, val, byteOffset) {
	    var foundIndex = -1;
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex;
	      } else {
	        foundIndex = -1;
	      }
	    }
	    return -1;
	  }

	  throw new TypeError('val must be string, number or Buffer');
	};

	// `get` is deprecated
	Buffer.prototype.get = function get(offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.');
	  return this.readUInt8(offset);
	};

	// `set` is deprecated
	Buffer.prototype.set = function set(v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.');
	  return this.writeUInt8(v, offset);
	};

	function hexWrite(buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length;
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string');

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(parsed)) throw new Error('Invalid hex string');
	    buf[offset + i] = parsed;
	  }
	  return i;
	}

	function utf8Write(buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
	}

	function asciiWrite(buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length);
	}

	function binaryWrite(buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length);
	}

	function base64Write(buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length);
	}

	function ucs2Write(buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
	}

	Buffer.prototype.write = function write(string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	    // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	      encoding = offset;
	      length = this.length;
	      offset = 0;
	      // Buffer#write(string, offset[, length][, encoding])
	    } else if (isFinite(offset)) {
	        offset = offset | 0;
	        if (isFinite(length)) {
	          length = length | 0;
	          if (encoding === undefined) encoding = 'utf8';
	        } else {
	          encoding = length;
	          length = undefined;
	        }
	        // legacy write(string, encoding, offset, length) - remove in v0.13
	      } else {
	          var swap = encoding;
	          encoding = offset;
	          offset = length | 0;
	          length = swap;
	        }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds');
	  }

	  if (!encoding) encoding = 'utf8';

	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length);

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length);

	      case 'ascii':
	        return asciiWrite(this, string, offset, length);

	      case 'binary':
	        return binaryWrite(this, string, offset, length);

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length);

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length);

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer.prototype.toJSON = function toJSON() {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  };
	};

	function base64Slice(buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf);
	  } else {
	    return base64.fromByteArray(buf.slice(start, end));
	  }
	}

	function utf8Slice(buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];

	  var i = start;
	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break;
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break;
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break;
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }

	    res.push(codePoint);
	    i += bytesPerSequence;
	  }

	  return decodeCodePointsArray(res);
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray(codePoints) {
	  var len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = '';
	  var i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
	  }
	  return res;
	}

	function asciiSlice(buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret;
	}

	function binarySlice(buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret;
	}

	function hexSlice(buf, start, end) {
	  var len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  var out = '';
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i]);
	  }
	  return out;
	}

	function utf16leSlice(buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }
	  return res;
	}

	Buffer.prototype.slice = function slice(start, end) {
	  var len = this.length;
	  start = ~ ~start;
	  end = end === undefined ? len : ~ ~end;

	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }

	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }

	  if (end < start) end = start;

	  var newBuf;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end));
	  } else {
	    var sliceLen = end - start;
	    newBuf = new Buffer(sliceLen, undefined);
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start];
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this;

	  return newBuf;
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset(offset, ext, length) {
	  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
	}

	Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val;
	};

	Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  var val = this[offset + --byteLength];
	  var mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val;
	};

	Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset];
	};

	Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | this[offset + 1] << 8;
	};

	Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] << 8 | this[offset + 1];
	};

	Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
	};

	Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
	};

	Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val;
	};

	Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val;
	};

	Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return this[offset];
	  return (0xff - this[offset] + 1) * -1;
	};

	Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | this[offset + 1] << 8;
	  return val & 0x8000 ? val | 0xFFFF0000 : val;
	};

	Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | this[offset] << 8;
	  return val & 0x8000 ? val | 0xFFFF0000 : val;
	};

	Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
	};

	Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
	};

	Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, true, 23, 4);
	};

	Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, false, 23, 4);
	};

	Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, true, 52, 8);
	};

	Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, false, 52, 8);
	};

	function checkInt(buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance');
	  if (value > max || value < min) throw new RangeError('value is out of bounds');
	  if (offset + ext > buf.length) throw new RangeError('index out of range');
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);

	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = value / mul & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);

	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = value / mul & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  this[offset] = value & 0xff;
	  return offset + 1;
	};

	function objectWriteUInt16(buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 8;
	    this[offset + 1] = value & 0xff;
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2;
	};

	function objectWriteUInt32(buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = value >>> 24;
	    this[offset + 2] = value >>> 16;
	    this[offset + 1] = value >>> 8;
	    this[offset] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 24;
	    this[offset + 1] = value >>> 16;
	    this[offset + 2] = value >>> 8;
	    this[offset + 3] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = 0;
	  var mul = 1;
	  var sub = value < 0 ? 1 : 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = value < 0 ? 1 : 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = value & 0xff;
	  return offset + 1;
	};

	Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 8;
	    this[offset + 1] = value & 0xff;
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	    this[offset + 2] = value >>> 16;
	    this[offset + 3] = value >>> 24;
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 24;
	    this[offset + 1] = value >>> 16;
	    this[offset + 2] = value >>> 8;
	    this[offset + 3] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4;
	};

	function checkIEEE754(buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds');
	  if (offset + ext > buf.length) throw new RangeError('index out of range');
	  if (offset < 0) throw new RangeError('index out of range');
	}

	function writeFloat(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4;
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert);
	};

	Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert);
	};

	function writeDouble(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8;
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert);
	};

	Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert);
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy(target, targetStart, start, end) {
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0;
	  if (target.length === 0 || this.length === 0) return 0;

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds');
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
	  if (end < 0) throw new RangeError('sourceEnd out of bounds');

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  var len = end - start;
	  var i;

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart);
	  }

	  return len;
	};

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill(value, start, end) {
	  if (!value) value = 0;
	  if (!start) start = 0;
	  if (!end) end = this.length;

	  if (end < start) throw new RangeError('end < start');

	  // Fill 0 bytes; we're done
	  if (end === start) return;
	  if (this.length === 0) return;

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds');
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds');

	  var i;
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value;
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString());
	    var len = bytes.length;
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len];
	    }
	  }

	  return this;
	};

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer() {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return new Buffer(this).buffer;
	    } else {
	      var buf = new Uint8Array(this.length);
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i];
	      }
	      return buf.buffer;
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser');
	  }
	};

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype;

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment(arr) {
	  arr.constructor = Buffer;
	  arr._isBuffer = true;

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set;

	  // deprecated
	  arr.get = BP.get;
	  arr.set = BP.set;

	  arr.write = BP.write;
	  arr.toString = BP.toString;
	  arr.toLocaleString = BP.toString;
	  arr.toJSON = BP.toJSON;
	  arr.equals = BP.equals;
	  arr.compare = BP.compare;
	  arr.indexOf = BP.indexOf;
	  arr.copy = BP.copy;
	  arr.slice = BP.slice;
	  arr.readUIntLE = BP.readUIntLE;
	  arr.readUIntBE = BP.readUIntBE;
	  arr.readUInt8 = BP.readUInt8;
	  arr.readUInt16LE = BP.readUInt16LE;
	  arr.readUInt16BE = BP.readUInt16BE;
	  arr.readUInt32LE = BP.readUInt32LE;
	  arr.readUInt32BE = BP.readUInt32BE;
	  arr.readIntLE = BP.readIntLE;
	  arr.readIntBE = BP.readIntBE;
	  arr.readInt8 = BP.readInt8;
	  arr.readInt16LE = BP.readInt16LE;
	  arr.readInt16BE = BP.readInt16BE;
	  arr.readInt32LE = BP.readInt32LE;
	  arr.readInt32BE = BP.readInt32BE;
	  arr.readFloatLE = BP.readFloatLE;
	  arr.readFloatBE = BP.readFloatBE;
	  arr.readDoubleLE = BP.readDoubleLE;
	  arr.readDoubleBE = BP.readDoubleBE;
	  arr.writeUInt8 = BP.writeUInt8;
	  arr.writeUIntLE = BP.writeUIntLE;
	  arr.writeUIntBE = BP.writeUIntBE;
	  arr.writeUInt16LE = BP.writeUInt16LE;
	  arr.writeUInt16BE = BP.writeUInt16BE;
	  arr.writeUInt32LE = BP.writeUInt32LE;
	  arr.writeUInt32BE = BP.writeUInt32BE;
	  arr.writeIntLE = BP.writeIntLE;
	  arr.writeIntBE = BP.writeIntBE;
	  arr.writeInt8 = BP.writeInt8;
	  arr.writeInt16LE = BP.writeInt16LE;
	  arr.writeInt16BE = BP.writeInt16BE;
	  arr.writeInt32LE = BP.writeInt32LE;
	  arr.writeInt32BE = BP.writeInt32BE;
	  arr.writeFloatLE = BP.writeFloatLE;
	  arr.writeFloatBE = BP.writeFloatBE;
	  arr.writeDoubleLE = BP.writeDoubleLE;
	  arr.writeDoubleBE = BP.writeDoubleBE;
	  arr.fill = BP.fill;
	  arr.inspect = BP.inspect;
	  arr.toArrayBuffer = BP.toArrayBuffer;

	  return arr;
	};

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

	function base64clean(str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return '';
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str;
	}

	function stringtrim(str) {
	  if (str.trim) return str.trim();
	  return str.replace(/^\s+|\s+$/g, '');
	}

	function toHex(n) {
	  if (n < 16) return '0' + n.toString(16);
	  return n.toString(16);
	}

	function utf8ToBytes(string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue;
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue;
	        }

	        // valid lead
	        leadSurrogate = codePoint;

	        continue;
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue;
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break;
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break;
	      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break;
	      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break;
	      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
	    } else {
	      throw new Error('Invalid code point');
	    }
	  }

	  return bytes;
	}

	function asciiToBytes(str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray;
	}

	function utf16leToBytes(str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break;

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray;
	}

	function base64ToBytes(str) {
	  return base64.toByteArray(base64clean(str));
	}

	function blitBuffer(src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if (i + offset >= dst.length || i >= src.length) break;
	    dst[i + offset] = src[i];
	  }
	  return i;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(107).Buffer, (function() { return this; }())))

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

		var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

		var PLUS = '+'.charCodeAt(0);
		var SLASH = '/'.charCodeAt(0);
		var NUMBER = '0'.charCodeAt(0);
		var LOWER = 'a'.charCodeAt(0);
		var UPPER = 'A'.charCodeAt(0);
		var PLUS_URL_SAFE = '-'.charCodeAt(0);
		var SLASH_URL_SAFE = '_'.charCodeAt(0);

		function decode(elt) {
			var code = elt.charCodeAt(0);
			if (code === PLUS || code === PLUS_URL_SAFE) return 62; // '+'
			if (code === SLASH || code === SLASH_URL_SAFE) return 63; // '/'
			if (code < NUMBER) return -1; //no match
			if (code < NUMBER + 10) return code - NUMBER + 26 + 26;
			if (code < UPPER + 26) return code - UPPER;
			if (code < LOWER + 26) return code - LOWER + 26;
		}

		function b64ToByteArray(b64) {
			var i, j, l, tmp, placeHolders, arr;

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4');
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length;
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders);

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length;

			var L = 0;

			function push(v) {
				arr[L++] = v;
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
				push((tmp & 0xFF0000) >> 16);
				push((tmp & 0xFF00) >> 8);
				push(tmp & 0xFF);
			}

			if (placeHolders === 2) {
				tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
				push(tmp & 0xFF);
			} else if (placeHolders === 1) {
				tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
				push(tmp >> 8 & 0xFF);
				push(tmp & 0xFF);
			}

			return arr;
		}

		function uint8ToBase64(uint8) {
			var i,
			    extraBytes = uint8.length % 3,
			    // if we have 1 byte left, pad 2 bytes
			output = "",
			    temp,
			    length;

			function encode(num) {
				return lookup.charAt(num);
			}

			function tripletToBase64(num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
				output += tripletToBase64(temp);
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1];
					output += encode(temp >> 2);
					output += encode(temp << 4 & 0x3F);
					output += '==';
					break;
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
					output += encode(temp >> 10);
					output += encode(temp >> 4 & 0x3F);
					output += encode(temp << 2 & 0x3F);
					output += '=';
					break;
			}

			return output;
		}

		exports.toByteArray = b64ToByteArray;
		exports.fromByteArray = uint8ToBase64;
	})( false ? undefined.base64js = {} : exports);

/***/ },
/* 109 */
/***/ function(module, exports) {

	"use strict";

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? nBytes - 1 : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & (1 << -nBits) - 1;
	  s >>= -nBits;
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : (s ? -1 : 1) * Infinity;
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	};

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
	  var i = isLE ? 0 : nBytes - 1;
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = e << mLen | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	};

/***/ },
/* 110 */
/***/ function(module, exports) {

	'use strict';

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function splitPath(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function () {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = i >= 0 ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function (path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function (p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function (path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function () {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function (p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};

	// path.relative(from, to)
	// posix version
	exports.relative = function (from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function (path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};

	exports.basename = function (path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};

	exports.extname = function (path) {
	  return splitPath(path)[3];
	};

	function filter(xs, f) {
	  if (xs.filter) return xs.filter(f);
	  var res = [];
	  for (var i = 0; i < xs.length; i++) {
	    if (f(xs[i], i, xs)) res.push(xs[i]);
	  }
	  return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
	  return str.substr(start, len);
	} : function (str, start, len) {
	  if (start < 0) start = str.length + start;
	  return str.substr(start, len);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41)))

/***/ },
/* 112 */
/***/ function(module, exports) {

	"use strict";

	// Generated by CoffeeScript 1.3.3
	(function () {
	  var scan;

	  scan = function scan(string, pattern, callback) {
	    var match, result;
	    result = "";
	    while (string.length > 0) {
	      match = string.match(pattern);
	      if (match) {
	        result += string.slice(0, match.index);
	        result += callback(match);
	        string = string.slice(match.index + match[0].length);
	      } else {
	        result += string;
	        string = "";
	      }
	    }
	    return result;
	  };

	  exports.split = function (line) {
	    var field, words;
	    if (line == null) {
	      line = "";
	    }
	    words = [];
	    field = "";
	    scan(line, /\s*(?:([^\s\\\'\"]+)|'((?:[^\'\\]|\\.)*)'|"((?:[^\"\\]|\\.)*)"|(\\.?)|(\S))(\s|$)?/, function (match) {
	      var dq, escape, garbage, raw, seperator, sq, word;
	      raw = match[0], word = match[1], sq = match[2], dq = match[3], escape = match[4], garbage = match[5], seperator = match[6];
	      if (garbage != null) {
	        throw new Error("Unmatched quote");
	      }
	      field += word || (sq || dq || escape).replace(/\\(?=.)/, "");
	      if (seperator != null) {
	        words.push(field);
	        return field = "";
	      }
	    });
	    if (field) {
	      words.push(field);
	    }
	    return words;
	  };

	  exports.escape = function (str) {
	    if (str == null) {
	      str = "";
	    }
	    if (str == null) {
	      return "''";
	    }
	    return str.replace(/([^A-Za-z0-9_\-.,:\/@\n])/g, "\\$1").replace(/\n/g, "'\n'");
	  };
	}).call(undefined);

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	;(function (exports) {

	  // export the class if we are in a Node-like system.
	  if (( false ? 'undefined' : _typeof(module)) === 'object' && module.exports === exports) exports = module.exports = SemVer;

	  // The debug function is excluded entirely from the minified version.

	  // Note: this is the semver.org version of the spec that it implements
	  // Not necessarily the package version of this code.
	  exports.SEMVER_SPEC_VERSION = '2.0.0';

	  var MAX_LENGTH = 256;
	  var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

	  // The actual regexps go on exports.re
	  var re = exports.re = [];
	  var src = exports.src = [];
	  var R = 0;

	  // The following Regular Expressions can be used for tokenizing,
	  // validating, and parsing SemVer version strings.

	  // ## Numeric Identifier
	  // A single `0`, or a non-zero digit followed by zero or more digits.

	  var NUMERICIDENTIFIER = R++;
	  src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
	  var NUMERICIDENTIFIERLOOSE = R++;
	  src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';

	  // ## Non-numeric Identifier
	  // Zero or more digits, followed by a letter or hyphen, and then zero or
	  // more letters, digits, or hyphens.

	  var NONNUMERICIDENTIFIER = R++;
	  src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';

	  // ## Main Version
	  // Three dot-separated numeric identifiers.

	  var MAINVERSION = R++;
	  src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')';

	  var MAINVERSIONLOOSE = R++;
	  src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')';

	  // ## Pre-release Version Identifier
	  // A numeric identifier, or a non-numeric identifier.

	  var PRERELEASEIDENTIFIER = R++;
	  src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] + '|' + src[NONNUMERICIDENTIFIER] + ')';

	  var PRERELEASEIDENTIFIERLOOSE = R++;
	  src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] + '|' + src[NONNUMERICIDENTIFIER] + ')';

	  // ## Pre-release Version
	  // Hyphen, followed by one or more dot-separated pre-release version
	  // identifiers.

	  var PRERELEASE = R++;
	  src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] + '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

	  var PRERELEASELOOSE = R++;
	  src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] + '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

	  // ## Build Metadata Identifier
	  // Any combination of digits, letters, or hyphens.

	  var BUILDIDENTIFIER = R++;
	  src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

	  // ## Build Metadata
	  // Plus sign, followed by one or more period-separated build metadata
	  // identifiers.

	  var BUILD = R++;
	  src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] + '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';

	  // ## Full Version String
	  // A main version, followed optionally by a pre-release version and
	  // build metadata.

	  // Note that the only major, minor, patch, and pre-release sections of
	  // the version string are capturing groups.  The build metadata is not a
	  // capturing group, because it should not ever be used in version
	  // comparison.

	  var FULL = R++;
	  var FULLPLAIN = 'v?' + src[MAINVERSION] + src[PRERELEASE] + '?' + src[BUILD] + '?';

	  src[FULL] = '^' + FULLPLAIN + '$';

	  // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
	  // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
	  // common in the npm registry.
	  var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + '?' + src[BUILD] + '?';

	  var LOOSE = R++;
	  src[LOOSE] = '^' + LOOSEPLAIN + '$';

	  var GTLT = R++;
	  src[GTLT] = '((?:<|>)?=?)';

	  // Something like "2.*" or "1.2.x".
	  // Note that "x.x" is a valid xRange identifer, meaning "any version"
	  // Only the first item is strictly required.
	  var XRANGEIDENTIFIERLOOSE = R++;
	  src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
	  var XRANGEIDENTIFIER = R++;
	  src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

	  var XRANGEPLAIN = R++;
	  src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:' + src[PRERELEASE] + ')?' + src[BUILD] + '?' + ')?)?';

	  var XRANGEPLAINLOOSE = R++;
	  src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:' + src[PRERELEASELOOSE] + ')?' + src[BUILD] + '?' + ')?)?';

	  var XRANGE = R++;
	  src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
	  var XRANGELOOSE = R++;
	  src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

	  // Tilde ranges.
	  // Meaning is "reasonably at or greater than"
	  var LONETILDE = R++;
	  src[LONETILDE] = '(?:~>?)';

	  var TILDETRIM = R++;
	  src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
	  re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
	  var tildeTrimReplace = '$1~';

	  var TILDE = R++;
	  src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
	  var TILDELOOSE = R++;
	  src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

	  // Caret ranges.
	  // Meaning is "at least and backwards compatible with"
	  var LONECARET = R++;
	  src[LONECARET] = '(?:\\^)';

	  var CARETTRIM = R++;
	  src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
	  re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
	  var caretTrimReplace = '$1^';

	  var CARET = R++;
	  src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
	  var CARETLOOSE = R++;
	  src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

	  // A simple gt/lt/eq thing, or just "" to indicate "any version"
	  var COMPARATORLOOSE = R++;
	  src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
	  var COMPARATOR = R++;
	  src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';

	  // An expression to strip any whitespace between the gtlt and the thing
	  // it modifies, so that `> 1.2.3` ==> `>1.2.3`
	  var COMPARATORTRIM = R++;
	  src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] + '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

	  // this one has to use the /g flag
	  re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
	  var comparatorTrimReplace = '$1$2$3';

	  // Something like `1.2.3 - 1.2.4`
	  // Note that these all use the loose form, because they'll be
	  // checked against either the strict or loose comparator form
	  // later.
	  var HYPHENRANGE = R++;
	  src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAIN] + ')' + '\\s*$';

	  var HYPHENRANGELOOSE = R++;
	  src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAINLOOSE] + ')' + '\\s*$';

	  // Star ranges basically just allow anything at all.
	  var STAR = R++;
	  src[STAR] = '(<|>)?=?\\s*\\*';

	  // Compile to actual regexp objects.
	  // All are flag-free, unless they were created above with a flag.
	  for (var i = 0; i < R; i++) {
	    ;
	    if (!re[i]) re[i] = new RegExp(src[i]);
	  }

	  exports.parse = parse;
	  function parse(version, loose) {
	    if (version instanceof SemVer) return version;

	    if (typeof version !== 'string') return null;

	    if (version.length > MAX_LENGTH) return null;

	    var r = loose ? re[LOOSE] : re[FULL];
	    if (!r.test(version)) return null;

	    try {
	      return new SemVer(version, loose);
	    } catch (er) {
	      return null;
	    }
	  }

	  exports.valid = valid;
	  function valid(version, loose) {
	    var v = parse(version, loose);
	    return v ? v.version : null;
	  }

	  exports.clean = clean;
	  function clean(version, loose) {
	    var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
	    return s ? s.version : null;
	  }

	  exports.SemVer = SemVer;

	  function SemVer(version, loose) {
	    if (version instanceof SemVer) {
	      if (version.loose === loose) return version;else version = version.version;
	    } else if (typeof version !== 'string') {
	      throw new TypeError('Invalid Version: ' + version);
	    }

	    if (version.length > MAX_LENGTH) throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters');

	    if (!(this instanceof SemVer)) return new SemVer(version, loose);

	    ;
	    this.loose = loose;
	    var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);

	    if (!m) throw new TypeError('Invalid Version: ' + version);

	    this.raw = version;

	    // these are actually numbers
	    this.major = +m[1];
	    this.minor = +m[2];
	    this.patch = +m[3];

	    if (this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError('Invalid major version');

	    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError('Invalid minor version');

	    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError('Invalid patch version');

	    // numberify any prerelease numeric ids
	    if (!m[4]) this.prerelease = [];else this.prerelease = m[4].split('.').map(function (id) {
	      if (/^[0-9]+$/.test(id)) {
	        var num = +id;
	        if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
	      }
	      return id;
	    });

	    this.build = m[5] ? m[5].split('.') : [];
	    this.format();
	  }

	  SemVer.prototype.format = function () {
	    this.version = this.major + '.' + this.minor + '.' + this.patch;
	    if (this.prerelease.length) this.version += '-' + this.prerelease.join('.');
	    return this.version;
	  };

	  SemVer.prototype.inspect = function () {
	    return '<SemVer "' + this + '">';
	  };

	  SemVer.prototype.toString = function () {
	    return this.version;
	  };

	  SemVer.prototype.compare = function (other) {
	    ;
	    if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);

	    return this.compareMain(other) || this.comparePre(other);
	  };

	  SemVer.prototype.compareMain = function (other) {
	    if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);

	    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
	  };

	  SemVer.prototype.comparePre = function (other) {
	    if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);

	    // NOT having a prerelease is > having one
	    if (this.prerelease.length && !other.prerelease.length) return -1;else if (!this.prerelease.length && other.prerelease.length) return 1;else if (!this.prerelease.length && !other.prerelease.length) return 0;

	    var i = 0;
	    do {
	      var a = this.prerelease[i];
	      var b = other.prerelease[i];
	      ;
	      if (a === undefined && b === undefined) return 0;else if (b === undefined) return 1;else if (a === undefined) return -1;else if (a === b) continue;else return compareIdentifiers(a, b);
	    } while (++i);
	  };

	  // preminor will bump the version up to the next minor release, and immediately
	  // down to pre-release. premajor and prepatch work the same way.
	  SemVer.prototype.inc = function (release, identifier) {
	    switch (release) {
	      case 'premajor':
	        this.prerelease.length = 0;
	        this.patch = 0;
	        this.minor = 0;
	        this.major++;
	        this.inc('pre', identifier);
	        break;
	      case 'preminor':
	        this.prerelease.length = 0;
	        this.patch = 0;
	        this.minor++;
	        this.inc('pre', identifier);
	        break;
	      case 'prepatch':
	        // If this is already a prerelease, it will bump to the next version
	        // drop any prereleases that might already exist, since they are not
	        // relevant at this point.
	        this.prerelease.length = 0;
	        this.inc('patch', identifier);
	        this.inc('pre', identifier);
	        break;
	      // If the input is a non-prerelease version, this acts the same as
	      // prepatch.
	      case 'prerelease':
	        if (this.prerelease.length === 0) this.inc('patch', identifier);
	        this.inc('pre', identifier);
	        break;

	      case 'major':
	        // If this is a pre-major version, bump up to the same major version.
	        // Otherwise increment major.
	        // 1.0.0-5 bumps to 1.0.0
	        // 1.1.0 bumps to 2.0.0
	        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) this.major++;
	        this.minor = 0;
	        this.patch = 0;
	        this.prerelease = [];
	        break;
	      case 'minor':
	        // If this is a pre-minor version, bump up to the same minor version.
	        // Otherwise increment minor.
	        // 1.2.0-5 bumps to 1.2.0
	        // 1.2.1 bumps to 1.3.0
	        if (this.patch !== 0 || this.prerelease.length === 0) this.minor++;
	        this.patch = 0;
	        this.prerelease = [];
	        break;
	      case 'patch':
	        // If this is not a pre-release version, it will increment the patch.
	        // If it is a pre-release it will bump up to the same patch version.
	        // 1.2.0-5 patches to 1.2.0
	        // 1.2.0 patches to 1.2.1
	        if (this.prerelease.length === 0) this.patch++;
	        this.prerelease = [];
	        break;
	      // This probably shouldn't be used publicly.
	      // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
	      case 'pre':
	        if (this.prerelease.length === 0) this.prerelease = [0];else {
	          var i = this.prerelease.length;
	          while (--i >= 0) {
	            if (typeof this.prerelease[i] === 'number') {
	              this.prerelease[i]++;
	              i = -2;
	            }
	          }
	          if (i === -1) // didn't increment anything
	            this.prerelease.push(0);
	        }
	        if (identifier) {
	          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
	          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
	          if (this.prerelease[0] === identifier) {
	            if (isNaN(this.prerelease[1])) this.prerelease = [identifier, 0];
	          } else this.prerelease = [identifier, 0];
	        }
	        break;

	      default:
	        throw new Error('invalid increment argument: ' + release);
	    }
	    this.format();
	    return this;
	  };

	  exports.inc = inc;
	  function inc(version, release, loose, identifier) {
	    if (typeof loose === 'string') {
	      identifier = loose;
	      loose = undefined;
	    }

	    try {
	      return new SemVer(version, loose).inc(release, identifier).version;
	    } catch (er) {
	      return null;
	    }
	  }

	  exports.diff = diff;
	  function diff(version1, version2) {
	    if (eq(version1, version2)) {
	      return null;
	    } else {
	      var v1 = parse(version1);
	      var v2 = parse(version2);
	      if (v1.prerelease.length || v2.prerelease.length) {
	        for (var key in v1) {
	          if (key === 'major' || key === 'minor' || key === 'patch') {
	            if (v1[key] !== v2[key]) {
	              return 'pre' + key;
	            }
	          }
	        }
	        return 'prerelease';
	      }
	      for (var key in v1) {
	        if (key === 'major' || key === 'minor' || key === 'patch') {
	          if (v1[key] !== v2[key]) {
	            return key;
	          }
	        }
	      }
	    }
	  }

	  exports.compareIdentifiers = compareIdentifiers;

	  var numeric = /^[0-9]+$/;
	  function compareIdentifiers(a, b) {
	    var anum = numeric.test(a);
	    var bnum = numeric.test(b);

	    if (anum && bnum) {
	      a = +a;
	      b = +b;
	    }

	    return anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : a > b ? 1 : 0;
	  }

	  exports.rcompareIdentifiers = rcompareIdentifiers;
	  function rcompareIdentifiers(a, b) {
	    return compareIdentifiers(b, a);
	  }

	  exports.major = major;
	  function major(a, loose) {
	    return new SemVer(a, loose).major;
	  }

	  exports.minor = minor;
	  function minor(a, loose) {
	    return new SemVer(a, loose).minor;
	  }

	  exports.patch = patch;
	  function patch(a, loose) {
	    return new SemVer(a, loose).patch;
	  }

	  exports.compare = compare;
	  function compare(a, b, loose) {
	    return new SemVer(a, loose).compare(b);
	  }

	  exports.compareLoose = compareLoose;
	  function compareLoose(a, b) {
	    return compare(a, b, true);
	  }

	  exports.rcompare = rcompare;
	  function rcompare(a, b, loose) {
	    return compare(b, a, loose);
	  }

	  exports.sort = sort;
	  function sort(list, loose) {
	    return list.sort(function (a, b) {
	      return exports.compare(a, b, loose);
	    });
	  }

	  exports.rsort = rsort;
	  function rsort(list, loose) {
	    return list.sort(function (a, b) {
	      return exports.rcompare(a, b, loose);
	    });
	  }

	  exports.gt = gt;
	  function gt(a, b, loose) {
	    return compare(a, b, loose) > 0;
	  }

	  exports.lt = lt;
	  function lt(a, b, loose) {
	    return compare(a, b, loose) < 0;
	  }

	  exports.eq = eq;
	  function eq(a, b, loose) {
	    return compare(a, b, loose) === 0;
	  }

	  exports.neq = neq;
	  function neq(a, b, loose) {
	    return compare(a, b, loose) !== 0;
	  }

	  exports.gte = gte;
	  function gte(a, b, loose) {
	    return compare(a, b, loose) >= 0;
	  }

	  exports.lte = lte;
	  function lte(a, b, loose) {
	    return compare(a, b, loose) <= 0;
	  }

	  exports.cmp = cmp;
	  function cmp(a, op, b, loose) {
	    var ret;
	    switch (op) {
	      case '===':
	        if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') a = a.version;
	        if ((typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') b = b.version;
	        ret = a === b;
	        break;
	      case '!==':
	        if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') a = a.version;
	        if ((typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') b = b.version;
	        ret = a !== b;
	        break;
	      case '':case '=':case '==':
	        ret = eq(a, b, loose);break;
	      case '!=':
	        ret = neq(a, b, loose);break;
	      case '>':
	        ret = gt(a, b, loose);break;
	      case '>=':
	        ret = gte(a, b, loose);break;
	      case '<':
	        ret = lt(a, b, loose);break;
	      case '<=':
	        ret = lte(a, b, loose);break;
	      default:
	        throw new TypeError('Invalid operator: ' + op);
	    }
	    return ret;
	  }

	  exports.Comparator = Comparator;
	  function Comparator(comp, loose) {
	    if (comp instanceof Comparator) {
	      if (comp.loose === loose) return comp;else comp = comp.value;
	    }

	    if (!(this instanceof Comparator)) return new Comparator(comp, loose);

	    ;
	    this.loose = loose;
	    this.parse(comp);

	    if (this.semver === ANY) this.value = '';else this.value = this.operator + this.semver.version;

	    ;
	  }

	  var ANY = {};
	  Comparator.prototype.parse = function (comp) {
	    var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
	    var m = comp.match(r);

	    if (!m) throw new TypeError('Invalid comparator: ' + comp);

	    this.operator = m[1];
	    if (this.operator === '=') this.operator = '';

	    // if it literally is just '>' or '' then allow anything.
	    if (!m[2]) this.semver = ANY;else this.semver = new SemVer(m[2], this.loose);
	  };

	  Comparator.prototype.inspect = function () {
	    return '<SemVer Comparator "' + this + '">';
	  };

	  Comparator.prototype.toString = function () {
	    return this.value;
	  };

	  Comparator.prototype.test = function (version) {
	    ;

	    if (this.semver === ANY) return true;

	    if (typeof version === 'string') version = new SemVer(version, this.loose);

	    return cmp(version, this.operator, this.semver, this.loose);
	  };

	  exports.Range = Range;
	  function Range(range, loose) {
	    if (range instanceof Range && range.loose === loose) return range;

	    if (!(this instanceof Range)) return new Range(range, loose);

	    this.loose = loose;

	    // First, split based on boolean or ||
	    this.raw = range;
	    this.set = range.split(/\s*\|\|\s*/).map(function (range) {
	      return this.parseRange(range.trim());
	    }, this).filter(function (c) {
	      // throw out any that are not relevant for whatever reason
	      return c.length;
	    });

	    if (!this.set.length) {
	      throw new TypeError('Invalid SemVer Range: ' + range);
	    }

	    this.format();
	  }

	  Range.prototype.inspect = function () {
	    return '<SemVer Range "' + this.range + '">';
	  };

	  Range.prototype.format = function () {
	    this.range = this.set.map(function (comps) {
	      return comps.join(' ').trim();
	    }).join('||').trim();
	    return this.range;
	  };

	  Range.prototype.toString = function () {
	    return this.range;
	  };

	  Range.prototype.parseRange = function (range) {
	    var loose = this.loose;
	    range = range.trim();
	    ;
	    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
	    var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
	    range = range.replace(hr, hyphenReplace);
	    ;
	    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
	    range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
	    ;

	    // `~ 1.2.3` => `~1.2.3`
	    range = range.replace(re[TILDETRIM], tildeTrimReplace);

	    // `^ 1.2.3` => `^1.2.3`
	    range = range.replace(re[CARETTRIM], caretTrimReplace);

	    // normalize spaces
	    range = range.split(/\s+/).join(' ');

	    // At this point, the range is completely trimmed and
	    // ready to be split into comparators.

	    var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
	    var set = range.split(' ').map(function (comp) {
	      return parseComparator(comp, loose);
	    }).join(' ').split(/\s+/);
	    if (this.loose) {
	      // in loose mode, throw out any that are not valid comparators
	      set = set.filter(function (comp) {
	        return !!comp.match(compRe);
	      });
	    }
	    set = set.map(function (comp) {
	      return new Comparator(comp, loose);
	    });

	    return set;
	  };

	  // Mostly just for testing and legacy API reasons
	  exports.toComparators = toComparators;
	  function toComparators(range, loose) {
	    return new Range(range, loose).set.map(function (comp) {
	      return comp.map(function (c) {
	        return c.value;
	      }).join(' ').trim().split(' ');
	    });
	  }

	  // comprised of xranges, tildes, stars, and gtlt's at this point.
	  // already replaced the hyphen ranges
	  // turn into a set of JUST comparators.
	  function parseComparator(comp, loose) {
	    ;
	    comp = replaceCarets(comp, loose);
	    ;
	    comp = replaceTildes(comp, loose);
	    ;
	    comp = replaceXRanges(comp, loose);
	    ;
	    comp = replaceStars(comp, loose);
	    ;
	    return comp;
	  }

	  function isX(id) {
	    return !id || id.toLowerCase() === 'x' || id === '*';
	  }

	  // ~, ~> --> * (any, kinda silly)
	  // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
	  // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
	  // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
	  // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
	  // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
	  function replaceTildes(comp, loose) {
	    return comp.trim().split(/\s+/).map(function (comp) {
	      return replaceTilde(comp, loose);
	    }).join(' ');
	  }

	  function replaceTilde(comp, loose) {
	    var r = loose ? re[TILDELOOSE] : re[TILDE];
	    return comp.replace(r, function (_, M, m, p, pr) {
	      ;
	      var ret;

	      if (isX(M)) ret = '';else if (isX(m)) ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';else if (isX(p))
	        // ~1.2 == >=1.2.0- <1.3.0-
	        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';else if (pr) {
	        ;
	        if (pr.charAt(0) !== '-') pr = '-' + pr;
	        ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + (+m + 1) + '.0';
	      } else
	        // ~1.2.3 == >=1.2.3 <1.3.0
	        ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';

	      ;
	      return ret;
	    });
	  }

	  // ^ --> * (any, kinda silly)
	  // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
	  // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
	  // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
	  // ^1.2.3 --> >=1.2.3 <2.0.0
	  // ^1.2.0 --> >=1.2.0 <2.0.0
	  function replaceCarets(comp, loose) {
	    return comp.trim().split(/\s+/).map(function (comp) {
	      return replaceCaret(comp, loose);
	    }).join(' ');
	  }

	  function replaceCaret(comp, loose) {
	    ;
	    var r = loose ? re[CARETLOOSE] : re[CARET];
	    return comp.replace(r, function (_, M, m, p, pr) {
	      ;
	      var ret;

	      if (isX(M)) ret = '';else if (isX(m)) ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';else if (isX(p)) {
	        if (M === '0') ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';else ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
	      } else if (pr) {
	        ;
	        if (pr.charAt(0) !== '-') pr = '-' + pr;
	        if (M === '0') {
	          if (m === '0') ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + m + '.' + (+p + 1);else ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + (+m + 1) + '.0';
	        } else ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + (+M + 1) + '.0.0';
	      } else {
	        ;
	        if (M === '0') {
	          if (m === '0') ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + m + '.' + (+p + 1);else ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
	        } else ret = '>=' + M + '.' + m + '.' + p + ' <' + (+M + 1) + '.0.0';
	      }

	      ;
	      return ret;
	    });
	  }

	  function replaceXRanges(comp, loose) {
	    ;
	    return comp.split(/\s+/).map(function (comp) {
	      return replaceXRange(comp, loose);
	    }).join(' ');
	  }

	  function replaceXRange(comp, loose) {
	    comp = comp.trim();
	    var r = loose ? re[XRANGELOOSE] : re[XRANGE];
	    return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
	      ;
	      var xM = isX(M);
	      var xm = xM || isX(m);
	      var xp = xm || isX(p);
	      var anyX = xp;

	      if (gtlt === '=' && anyX) gtlt = '';

	      if (xM) {
	        if (gtlt === '>' || gtlt === '<') {
	          // nothing is allowed
	          ret = '<0.0.0';
	        } else {
	          // nothing is forbidden
	          ret = '*';
	        }
	      } else if (gtlt && anyX) {
	        // replace X with 0
	        if (xm) m = 0;
	        if (xp) p = 0;

	        if (gtlt === '>') {
	          // >1 => >=2.0.0
	          // >1.2 => >=1.3.0
	          // >1.2.3 => >= 1.2.4
	          gtlt = '>=';
	          if (xm) {
	            M = +M + 1;
	            m = 0;
	            p = 0;
	          } else if (xp) {
	            m = +m + 1;
	            p = 0;
	          }
	        } else if (gtlt === '<=') {
	          // <=0.7.x is actually <0.8.0, since any 0.7.x should
	          // pass.  Similarly, <=7.x is actually <8.0.0, etc.
	          gtlt = '<';
	          if (xm) M = +M + 1;else m = +m + 1;
	        }

	        ret = gtlt + M + '.' + m + '.' + p;
	      } else if (xm) {
	        ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
	      } else if (xp) {
	        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
	      }

	      ;

	      return ret;
	    });
	  }

	  // Because * is AND-ed with everything else in the comparator,
	  // and '' means "any version", just remove the *s entirely.
	  function replaceStars(comp, loose) {
	    ;
	    // Looseness is ignored here.  star is always as loose as it gets!
	    return comp.trim().replace(re[STAR], '');
	  }

	  // This function is passed to string.replace(re[HYPHENRANGE])
	  // M, m, patch, prerelease, build
	  // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
	  // 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
	  // 1.2 - 3.4 => >=1.2.0 <3.5.0
	  function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {

	    if (isX(fM)) from = '';else if (isX(fm)) from = '>=' + fM + '.0.0';else if (isX(fp)) from = '>=' + fM + '.' + fm + '.0';else from = '>=' + from;

	    if (isX(tM)) to = '';else if (isX(tm)) to = '<' + (+tM + 1) + '.0.0';else if (isX(tp)) to = '<' + tM + '.' + (+tm + 1) + '.0';else if (tpr) to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;else to = '<=' + to;

	    return (from + ' ' + to).trim();
	  }

	  // if ANY of the sets match ALL of its comparators, then pass
	  Range.prototype.test = function (version) {
	    if (!version) return false;

	    if (typeof version === 'string') version = new SemVer(version, this.loose);

	    for (var i = 0; i < this.set.length; i++) {
	      if (testSet(this.set[i], version)) return true;
	    }
	    return false;
	  };

	  function testSet(set, version) {
	    for (var i = 0; i < set.length; i++) {
	      if (!set[i].test(version)) return false;
	    }

	    if (version.prerelease.length) {
	      // Find the set of versions that are allowed to have prereleases
	      // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
	      // That should allow `1.2.3-pr.2` to pass.
	      // However, `1.2.4-alpha.notready` should NOT be allowed,
	      // even though it's within the range set by the comparators.
	      for (var i = 0; i < set.length; i++) {
	        ;
	        if (set[i].semver === ANY) continue;

	        if (set[i].semver.prerelease.length > 0) {
	          var allowed = set[i].semver;
	          if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return true;
	        }
	      }

	      // Version has a -pre, but it's not one of the ones we like.
	      return false;
	    }

	    return true;
	  }

	  exports.satisfies = satisfies;
	  function satisfies(version, range, loose) {
	    try {
	      range = new Range(range, loose);
	    } catch (er) {
	      return false;
	    }
	    return range.test(version);
	  }

	  exports.maxSatisfying = maxSatisfying;
	  function maxSatisfying(versions, range, loose) {
	    return versions.filter(function (version) {
	      return satisfies(version, range, loose);
	    }).sort(function (a, b) {
	      return rcompare(a, b, loose);
	    })[0] || null;
	  }

	  exports.validRange = validRange;
	  function validRange(range, loose) {
	    try {
	      // Return '*' instead of '' so that truthiness works.
	      // This will throw if it's invalid anyway
	      return new Range(range, loose).range || '*';
	    } catch (er) {
	      return null;
	    }
	  }

	  // Determine if version is less than all the versions possible in the range
	  exports.ltr = ltr;
	  function ltr(version, range, loose) {
	    return outside(version, range, '<', loose);
	  }

	  // Determine if version is greater than all the versions possible in the range.
	  exports.gtr = gtr;
	  function gtr(version, range, loose) {
	    return outside(version, range, '>', loose);
	  }

	  exports.outside = outside;
	  function outside(version, range, hilo, loose) {
	    version = new SemVer(version, loose);
	    range = new Range(range, loose);

	    var gtfn, ltefn, ltfn, comp, ecomp;
	    switch (hilo) {
	      case '>':
	        gtfn = gt;
	        ltefn = lte;
	        ltfn = lt;
	        comp = '>';
	        ecomp = '>=';
	        break;
	      case '<':
	        gtfn = lt;
	        ltefn = gte;
	        ltfn = gt;
	        comp = '<';
	        ecomp = '<=';
	        break;
	      default:
	        throw new TypeError('Must provide a hilo val of "<" or ">"');
	    }

	    // If it satisifes the range it is not outside
	    if (satisfies(version, range, loose)) {
	      return false;
	    }

	    // From now on, variable terms are as if we're in "gtr" mode.
	    // but note that everything is flipped for the "ltr" function.

	    for (var i = 0; i < range.set.length; ++i) {
	      var comparators = range.set[i];

	      var high = null;
	      var low = null;

	      comparators.forEach(function (comparator) {
	        if (comparator.semver === ANY) {
	          comparator = new Comparator('>=0.0.0');
	        }
	        high = high || comparator;
	        low = low || comparator;
	        if (gtfn(comparator.semver, high.semver, loose)) {
	          high = comparator;
	        } else if (ltfn(comparator.semver, low.semver, loose)) {
	          low = comparator;
	        }
	      });

	      // If the edge version comparator has a operator then our version
	      // isn't outside it
	      if (high.operator === comp || high.operator === ecomp) {
	        return false;
	      }

	      // If the lowest version comparator has an operator and our version
	      // is less than it then it isn't higher than the range
	      if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
	        return false;
	      } else if (low.operator === ecomp && ltfn(version, low.semver)) {
	        return false;
	      }
	    }
	    return true;
	  }

	  // Use the define() function if we're in AMD land
	  if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (exports), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(( false ? 'undefined' : _typeof(exports)) === 'object' ? exports :  true ? {} : semver = {});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(114)(module)))

/***/ },
/* 114 */
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
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseClone = __webpack_require__(116),
	    bindCallback = __webpack_require__(122);

	/**
	 * Creates a deep clone of `value`. If `customizer` is provided it's invoked
	 * to produce the cloned values. If `customizer` returns `undefined` cloning
	 * is handled by the method instead. The `customizer` is bound to `thisArg`
	 * and invoked with up to three argument; (value [, index|key, object]).
	 *
	 * **Note:** This method is loosely based on the
	 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	 * The enumerable properties of `arguments` objects and objects created by
	 * constructors other than `Object` are cloned to plain `Object` objects. An
	 * empty object is returned for uncloneable values such as functions, DOM nodes,
	 * Maps, Sets, and WeakMaps.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to deep clone.
	 * @param {Function} [customizer] The function to customize cloning values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {*} Returns the deep cloned value.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * var deep = _.cloneDeep(users);
	 * deep[0] === users[0];
	 * // => false
	 *
	 * // using a customizer callback
	 * var el = _.cloneDeep(document.body, function(value) {
	 *   if (_.isElement(value)) {
	 *     return value.cloneNode(true);
	 *   }
	 * });
	 *
	 * el === document.body
	 * // => false
	 * el.nodeName
	 * // => BODY
	 * el.childNodes.length;
	 * // => 20
	 */
	function cloneDeep(value, customizer, thisArg) {
	  return typeof customizer == 'function' ? baseClone(value, true, bindCallback(customizer, thisArg, 3)) : baseClone(value, true);
	}

	module.exports = cloneDeep;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * lodash 3.3.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var arrayCopy = __webpack_require__(117),
	    arrayEach = __webpack_require__(118),
	    baseAssign = __webpack_require__(119),
	    baseFor = __webpack_require__(121),
	    isArray = __webpack_require__(23),
	    keys = __webpack_require__(20);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[stringTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[mapTag] = cloneableTags[setTag] = cloneableTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Native method references. */
	var ArrayBuffer = global.ArrayBuffer,
	    Uint8Array = global.Uint8Array;

	/**
	 * The base implementation of `_.clone` without support for argument juggling
	 * and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {Function} [customizer] The function to customize cloning values.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The object `value` belongs to.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates clones with source counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return arrayCopy(value, result);
	    }
	  } else {
	    var tag = objToString.call(value),
	        isFunc = tag == funcTag;

	    if (tag == objectTag || tag == argsTag || isFunc && !object) {
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return baseAssign(result, value);
	      }
	    } else {
	      return cloneableTags[tag] ? initCloneByTag(value, tag, isDeep) : object ? value : {};
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == value) {
	      return stackB[length];
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate it with its clone.
	  stackA.push(value);
	  stackB.push(result);

	  // Recursively populate clone (susceptible to call stack limits).
	  (isArr ? arrayEach : baseForOwn)(value, function (subValue, key) {
	    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
	  });
	  return result;
	}

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	/**
	 * Creates a clone of the given array buffer.
	 *
	 * @private
	 * @param {ArrayBuffer} buffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function bufferClone(buffer) {
	  var result = new ArrayBuffer(buffer.byteLength),
	      view = new Uint8Array(result);

	  view.set(new Uint8Array(buffer));
	  return result;
	}

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = new array.constructor(length);

	  // Add array properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  var Ctor = object.constructor;
	  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
	    Ctor = Object;
	  }
	  return new Ctor();
	}

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return bufferClone(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case float32Tag:case float64Tag:
	    case int8Tag:case int16Tag:case int32Tag:
	    case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:
	      var buffer = object.buffer;
	      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      var result = new Ctor(object.source, reFlags.exec(object));
	      result.lastIndex = object.lastIndex;
	  }
	  return result;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = baseClone;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 117 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = arrayCopy;

/***/ },
/* 118 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands or `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseCopy = __webpack_require__(120),
	    keys = __webpack_require__(20);

	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return source == null ? object : baseCopy(source, keys(source), object);
	}

	module.exports = baseAssign;

/***/ },
/* 120 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;

/***/ },
/* 121 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function (object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = baseFor;

/***/ },
/* 122 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1:
	      return function (value) {
	        return func.call(thisArg, value);
	      };
	    case 3:
	      return function (value, index, collection) {
	        return func.call(thisArg, value, index, collection);
	      };
	    case 4:
	      return function (accumulator, value, index, collection) {
	        return func.call(thisArg, accumulator, value, index, collection);
	      };
	    case 5:
	      return function (value, other, key, object, source) {
	        return func.call(thisArg, value, other, key, object, source);
	      };
	  }
	  return function () {
	    return func.apply(thisArg, arguments);
	  };
	}

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = bindCallback;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Node.js wrapper for "notify-send".
	 */
	var os = __webpack_require__(105),
	    which = __webpack_require__(124),
	    utils = __webpack_require__(106),
	    cloneDeep = __webpack_require__(115);

	var EventEmitter = __webpack_require__(131).EventEmitter;
	var util = __webpack_require__(132);

	var notifier = 'notify-send',
	    hasNotifier = void 0;

	module.exports = NotifySend;

	function NotifySend(options) {
	  options = cloneDeep(options || {});
	  if (!(this instanceof NotifySend)) {
	    return new NotifySend(options);
	  }

	  this.options = options;

	  EventEmitter.call(this);
	}
	util.inherits(NotifySend, EventEmitter);

	NotifySend.prototype.notify = function (options, callback) {
	  options = cloneDeep(options || {});
	  callback = callback || function () {};

	  if (!options.message) {
	    callback(new Error('Message is required.'));
	    return this;
	  }

	  if (os.type() !== 'Linux') {
	    callback(new Error('Only supported on Linux systems'));
	    return this;
	  }

	  if (hasNotifier === false) {
	    callback(new Error('notify-send must be installed on the system.'));
	    return this;
	  }

	  if (hasNotifier || !!this.options.suppressOsdCheck) {
	    doNotification(options, callback);
	    return this;
	  }

	  try {
	    hasNotifier = !!which.sync(notifier);
	    doNotification(options, callback);
	  } catch (err) {
	    hasNotifier = false;
	    return callback(err);
	  };

	  return this;
	};

	var allowedArguments = ["urgency", "expire-time", "icon", "category", "hint"];

	function doNotification(options, callback) {
	  var initial, argsList;

	  options = utils.mapToNotifySend(options);
	  options.title = options.title || 'Node Notification:';

	  initial = [options.title, options.message];
	  delete options.title;
	  delete options.message;

	  argsList = utils.constructArgumentList(options, {
	    initial: initial,
	    keyExtra: '-',
	    allowedArguments: allowedArguments
	  });

	  utils.command(notifier, argsList, callback);
	}

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	module.exports = which;
	which.sync = whichSync;

	var isWindows = process.platform === 'win32' || process.env.OSTYPE === 'cygwin' || process.env.OSTYPE === 'msys';

	var path = __webpack_require__(111);
	var COLON = isWindows ? ';' : ':';
	var isexe = __webpack_require__(125);
	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var isAbsolute = __webpack_require__(129);

	function getPathInfo(cmd, opt) {
	  var colon = opt.colon || COLON;
	  var pathEnv = opt.path || process.env.Path || process.env.PATH || '';
	  var pathExt = [''];

	  pathEnv = pathEnv.split(colon);

	  var pathExtExe = '';
	  if (isWindows) {
	    pathEnv.unshift(process.cwd());
	    pathExtExe = opt.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM';
	    pathExt = pathExtExe.split(colon);

	    // Always test the cmd itself first.  isexe will check to make sure
	    // it's found in the pathExt set.
	    if (cmd.indexOf('.') !== -1 && pathExt[0] !== '') pathExt.unshift('');
	  }

	  // If it's absolute, then we don't bother searching the pathenv.
	  // just check the file itself, and that's it.
	  if (isAbsolute(cmd)) pathEnv = [''];

	  return {
	    env: pathEnv,
	    ext: pathExt,
	    extExe: pathExtExe
	  };
	}

	function which(cmd, opt, cb) {
	  if (typeof opt === 'function') {
	    cb = opt;
	    opt = {};
	  }

	  var info = getPathInfo(cmd, opt);
	  var pathEnv = info.env;
	  var pathExt = info.ext;
	  var pathExtExe = info.extExe;
	  var found = [];(function F(i, l) {
	    if (i === l) {
	      if (opt.all && found.length) return cb(null, found);else return cb(new Error('not found: ' + cmd));
	    }

	    var pathPart = pathEnv[i];
	    if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"') pathPart = pathPart.slice(1, -1);

	    var p = path.resolve(pathPart, cmd);(function E(ii, ll) {
	      if (ii === ll) return F(i + 1, l);
	      var ext = pathExt[ii];
	      isexe(p + ext, { pathExt: pathExtExe }, function (er, is) {
	        if (!er && is) {
	          if (opt.all) found.push(p + ext);else return cb(null, p + ext);
	        }
	        return E(ii + 1, ll);
	      });
	    })(0, pathExt.length);
	  })(0, pathEnv.length);
	}

	function whichSync(cmd, opt) {
	  opt = opt || {};

	  var info = getPathInfo(cmd, opt);
	  var pathEnv = info.env;
	  var pathExt = info.ext;
	  var pathExtExe = info.extExe;
	  var found = [];

	  for (var i = 0, l = pathEnv.length; i < l; i++) {
	    var pathPart = pathEnv[i];
	    if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"') pathPart = pathPart.slice(1, -1);

	    var p = path.join(pathPart, cmd);
	    for (var j = 0, ll = pathExt.length; j < ll; j++) {
	      var cur = p + pathExt[j];
	      var is;
	      try {
	        is = isexe.sync(cur, { pathExt: pathExtExe });
	        if (is) {
	          if (opt.all) found.push(cur);else return cur;
	        }
	      } catch (ex) {}
	    }
	  }

	  if (opt.all && found.length) return found;

	  throw new Error('not found: ' + cmd);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41)))

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';

	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var core;
	if (process.platform === 'win32' || global.TESTING_WINDOWS) {
	  core = __webpack_require__(126);
	} else if (typeof fs.access === 'function') {
	  core = __webpack_require__(127);
	} else {
	  core = __webpack_require__(128);
	}

	module.exports = isexe;
	isexe.sync = sync;

	function isexe(path, options, cb) {
	  if (typeof options === 'function') {
	    cb = options;
	    options = {};
	  }

	  if (!cb) {
	    if (typeof Promise !== 'function') {
	      throw new TypeError('callback not provided');
	    }

	    return new Promise(function (resolve, reject) {
	      isexe(path, options || {}, function (er, is) {
	        if (er) {
	          reject(er);
	        } else {
	          resolve(is);
	        }
	      });
	    });
	  }

	  core(path, options || {}, function (er, is) {
	    // ignore EACCES because that just means we aren't allowed to run it
	    if (er) {
	      if (er.code === 'EACCES' || options && options.ignoreErrors) {
	        er = null;
	        is = false;
	      }
	    }
	    cb(er, is);
	  });
	}

	function sync(path, options) {
	  // my kingdom for a filtered catch
	  try {
	    return core.sync(path, options || {});
	  } catch (er) {
	    if (options && options.ignoreErrors || er.code === 'EACCES') {
	      return false;
	    } else {
	      throw er;
	    }
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41), (function() { return this; }())))

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	module.exports = isexe;
	isexe.sync = sync;

	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	function checkPathExt(path, options) {
	  var pathext = options.pathExt !== undefined ? options.pathExt : process.env.PATHEXT;

	  if (!pathext) {
	    return true;
	  }

	  pathext = pathext.split(';');
	  if (pathext.indexOf('') !== -1) {
	    return true;
	  }
	  for (var i = 0; i < pathext.length; i++) {
	    var p = pathext[i].toLowerCase();
	    if (p && path.substr(-p.length).toLowerCase() === p) {
	      return true;
	    }
	  }
	  return false;
	}

	function isexe(path, options, cb) {
	  fs.stat(path, function (er, st) {
	    cb(er, er ? false : checkPathExt(path, options));
	  });
	}

	function sync(path, options) {
	  fs.statSync(path);
	  return checkPathExt(path, options);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41)))

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = isexe;
	isexe.sync = sync;

	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	function isexe(path, _, cb) {
	  fs.access(path, fs.X_OK, function (er) {
	    cb(er, !er);
	  });
	}

	function sync(path, _) {
	  fs.accessSync(path, fs.X_OK);
	  return true;
	}

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	module.exports = isexe;
	isexe.sync = sync;

	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	function isexe(path, options, cb) {
	  fs.stat(path, function (er, st) {
	    cb(er, er ? false : checkMode(st, options));
	  });
	}

	function sync(path, options) {
	  return checkMode(fs.statSync(path), options);
	}

	function checkMode(stat, options) {
	  var mod = stat.mode;
	  var uid = stat.uid;
	  var gid = stat.gid;

	  var myUid = options.uid !== undefined ? options.uid : process.getuid && process.getuid();
	  var myGid = options.gid !== undefined ? options.gid : process.getgid && process.getgid();

	  var u = parseInt('100', 8);
	  var g = parseInt('010', 8);
	  var o = parseInt('001', 8);
	  var ug = u | g;

	  var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;

	  return ret;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41)))

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-absolute <https://github.com/jonschlinkert/is-absolute>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var isRelative = __webpack_require__(130);

	module.exports = function isAbsolute(filepath) {
	  if ('/' === filepath[0]) {
	    return true;
	  }
	  if (':' === filepath[1] && '\\' === filepath[2]) {
	    return true;
	  }
	  // Microsoft Azure absolute filepath
	  if ('\\\\' == filepath.substring(0, 2)) {
	    return true;
	  }
	  if (!isRelative(filepath)) {
	    return true;
	  }
	};

/***/ },
/* 130 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * ```js
	 * var isRelative = require('is-relative');
	 * isRelative('README.md');
	 * //=> true
	 * ```
	 *
	 * @name isRelative
	 * @param {String} `filepath` Path to test.
	 * @return {Boolean}
	 * @api public
	 */

	module.exports = function isRelative(filepath) {
	  if (typeof filepath !== 'string') {
	    throw new Error('isRelative expects a string.');
	  }
	  return !/^([a-z]+:)?[\\\/]/i.test(filepath);
	};

/***/ },
/* 131 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function (n) {
	  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function (type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events) this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler)) return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++) {
	      listeners[i].apply(this, args);
	    }
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function (type, listener) {
	  var m;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events) this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function (type, listener) {
	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function (type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type]) return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener || isFunction(list.listener) && list.listener === listener) {
	    delete this._events[type];
	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0) return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function (type) {
	  var key, listeners;

	  if (!this._events) return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length) {
	      this.removeListener(type, listeners[listeners.length - 1]);
	    }
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function (type) {
	  var ret;
	  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function (type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function (emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function (f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function (x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s':
	        return String(args[i++]);
	      case '%d':
	        return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};

	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function (fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function () {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};

	var debugs = {};
	var debugEnviron;
	exports.debuglog = function (set) {
	  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function () {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function () {};
	    }
	  }
	  return debugs[set];
	};

	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;

	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold': [1, 22],
	  'italic': [3, 23],
	  'underline': [4, 24],
	  'inverse': [7, 27],
	  'white': [37, 39],
	  'grey': [90, 39],
	  'black': [30, 39],
	  'blue': [34, 39],
	  'cyan': [36, 39],
	  'green': [32, 39],
	  'magenta': [35, 39],
	  'red': [31, 39],
	  'yellow': [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};

	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}

	function stylizeNoColor(str, styleType) {
	  return str;
	}

	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function (val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}

	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect && value && isFunction(value.inspect) &&
	  // Filter out the util module, it's inspect function is special
	  value.inspect !== exports.inspect &&
	  // Also filter out any prototype objects using the circular check.
	  !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '',
	      array = false,
	      braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function (key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}

	function formatPrimitive(ctx, value) {
	  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value)) return ctx.stylize('' + value, 'number');
	  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value)) return ctx.stylize('null', 'null');
	}

	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}

	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function (key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
	    }
	  });
	  return output;
	}

	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function (line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function (line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}

	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function (prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'symbol' || // ES6 symbol
	  typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(133);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}

	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}

	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}

	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function () {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};

	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(134);

	exports._extend = function (origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(41)))

/***/ },
/* 133 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	module.exports = function isBuffer(arg) {
	  return arg && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
	};

/***/ },
/* 134 */
/***/ function(module, exports) {

	'use strict';

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function TempCtor() {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	/**
	 * A Node.js wrapper for terminal-notify (with fallback).
	 */
	var path = __webpack_require__(111),
	    notifier = path.join(__dirname, '../vendor/terminal-notifier.app/Contents/MacOS/terminal-notifier'),
	    utils = __webpack_require__(106),
	    Growl = __webpack_require__(136),
	    cloneDeep = __webpack_require__(115);

	var EventEmitter = __webpack_require__(131).EventEmitter;
	var util = __webpack_require__(132);

	var errorMessageOsX = 'You need Mac OS X 10.8 or above to use NotificationCenter,' + ' or use Growl fallback with constructor option {withFallback: true}.';

	module.exports = NotificationCenter;

	function NotificationCenter(options) {
	  options = cloneDeep(options || {});
	  if (!(this instanceof NotificationCenter)) {
	    return new NotificationCenter(options);
	  }
	  this.options = options;

	  EventEmitter.call(this);
	}
	util.inherits(NotificationCenter, EventEmitter);
	var activeId = null;

	NotificationCenter.prototype.notify = function (options, callback) {
	  var fallbackNotifier = null,
	      id = identificator();
	  options = cloneDeep(options || {});
	  activeId = id;

	  callback = callback || function () {};
	  var actionJackedCallback = utils.actionJackerDecorator(this, options, callback, function (data) {
	    if (activeId !== id) return false;

	    var cleaned = data.toLowerCase().trim();
	    if (cleaned === 'activate') {
	      return 'click';
	    }
	    if (cleaned === 'timeout') {
	      return 'timeout';
	    }
	    return false;
	  });

	  options = utils.mapToMac(options);
	  if (!!options.wait) {
	    options.wait = 'YES';
	  }

	  if (!options.message && !options.group && !options.list && !options.remove) {
	    callback(new Error('Message, group, remove or list property is required.'));
	    return this;
	  }

	  var argsList = utils.constructArgumentList(options);

	  if (utils.isMountainLion()) {
	    utils.fileCommand(this.options.customPath || notifier, argsList, actionJackedCallback);
	    return this;
	  }

	  if (fallbackNotifier || !!this.options.withFallback) {
	    fallbackNotifier = fallbackNotifier || new Growl(this.options);
	    return fallbackNotifier.notify(options, callback);
	  }

	  callback(new Error(errorMessageOsX));
	  return this;
	};

	function identificator() {
	  return { _ref: 'val' };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Wrapper for the growly module
	 */
	var utils = __webpack_require__(106),
	    checkGrowl = __webpack_require__(137),
	    growly = __webpack_require__(138),
	    cloneDeep = __webpack_require__(115);

	var EventEmitter = __webpack_require__(131).EventEmitter;
	var util = __webpack_require__(132);

	var errorMessageNotFound = 'Couldn\'t connect to growl (might be used as a fallback). Make sure it is running';

	module.exports = Growl;

	var hasGrowl = void 0;

	function Growl(options) {
	  options = cloneDeep(options || {});
	  if (!(this instanceof Growl)) {
	    return new Growl(options);
	  }

	  growly.appname = options.name || 'Node';
	  this.options = options;

	  EventEmitter.call(this);
	}
	util.inherits(Growl, EventEmitter);

	Growl.prototype.notify = function (options, callback) {
	  growly.setHost(this.options.host, this.options.port);
	  options = cloneDeep(options || {});

	  callback = utils.actionJackerDecorator(this, options, callback, function (data) {
	    var cleaned = data.toLowerCase().trim();
	    if (cleaned === 'click') {
	      return 'click';
	    }
	    if (cleaned === 'timedout') {
	      return 'timeout';
	    }
	    return false;
	  });

	  options = utils.mapToGrowl(options);

	  if (!options.message) {
	    callback(new Error('Message is required.'));
	    return this;
	  }

	  options.title = options.title || 'Node Notification:';

	  if (hasGrowl || !!options.wait) {
	    var localCallback = !!options.wait ? callback : function () {};
	    growly.notify(options.message, options, localCallback);
	    if (!options.wait) callback();
	    return this;
	  }

	  checkGrowl(growly, function (didHaveGrowl) {
	    hasGrowl = didHaveGrowl;
	    if (!didHaveGrowl) return callback(new Error(errorMessageNotFound));
	    growly.notify(options.message, options);
	    callback();
	  });
	  return this;
	};

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var net = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"net\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var hasGrowl = false;

	module.exports = function (growlConfig, cb) {
	  if (typeof cb == 'undefined') {
	    cb = growlConfig;
	    growlConfig = {};
	  }
	  if (hasGrowl) return cb(hasGrowl);
	  var port = growlConfig.port || 23053;
	  var host = growlConfig.host || 'localhost';
	  var socket = net.connect(port, host);
	  socket.setTimeout(100);

	  socket.on('connect', function () {
	    socket.end();
	    cb(true);
	  });

	  socket.on('error', function () {
	    socket.end();
	    cb(false);
	  });
	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var GNTP = __webpack_require__(139);

	/**
	 * Interface for registering Growl applications and sending Growl notifications.
	 *
	 * @api private
	 */

	function Growly() {
	    this.appname = 'Growly';
	    this.notifications = undefined;
	    this.labels = undefined;
	    this.count = 0;
	    this.registered = false;
	    this.host = undefined;
	    this.port = undefined;
	}

	/**
	 * Returns an array of label strings extracted from each notification object in 
	 * `Growly.notifications`.
	 *
	 * @param {Array} notifications
	 * @return {Array} notification labels
	 * @api private
	 */

	Growly.prototype.getLabels = function () {
	    return this.notifications.map(function (notif) {
	        return notif.label;
	    });
	};

	/**
	 * Set the host to be used by GNTP requests.
	 *
	 * @param {String} host
	 * @param {Number} port
	 * @api public
	 */

	Growly.prototype.setHost = function (host, port) {
	    this.host = host;
	    this.port = port;
	};

	/**
	 * Register an application with the name `appname` (required), icon `appicon`, and 
	 * a list of notification types `notifications`. If provided, `callback` will be 
	 * called when the request completes with the first argument being an `err` error
	 * object if the request failed.
	 *
	 * Each object in the `notifications` array defines a type of notification the
	 * application will have with the following properties:
	 *
	 *  - `.label` name used to identify the type of notification being used (required)
	 *  - `.dispname` name users will see in Growl's preference panel (defaults to `.label`)
	 *  - `.enabled` whether or not notifications of this type are enabled (defaults to true)
	 *  - `.icon` default icon notifications of this type should use (url, file path, or Buffer object)
	 *
	 *  Example registration:
	 *      
	 *      growl.register('My Application', 'path/to/icon.png', [
	 *          { label: 'success', dispname: 'Success', icon: 'path/to/success.png' },
	 *          { label: 'warning', dispname: 'Warning', icon: 'path/to/warning.png', enabled: false }
	 *      ], function(err) { console.log(err || 'Registration successful!'); });
	 *
	 * @param {String} appname
	 * @param {String|Buffer} appicon
	 * @param {Array} notifications
	 * @param {Function} callback
	 * @api public
	 */

	Growly.prototype.register = function (appname, appicon, notifications, callback) {
	    var gntp;

	    if ((typeof appicon === 'undefined' ? 'undefined' : _typeof(appicon)) === 'object') {
	        notifications = appicon;
	        appicon = undefined;
	    }

	    if (notifications === undefined || !notifications.length) {
	        notifications = [{ label: 'default', dispname: 'Default Notification', enabled: true }];
	    }

	    if (typeof arguments[arguments.length - 1] === 'function') {
	        callback = arguments[arguments.length - 1];
	    } else {
	        callback = function callback() {};
	    }

	    this.appname = appname;
	    this.notifications = notifications;
	    this.labels = this.getLabels();
	    this.registered = true;

	    gntp = new GNTP('REGISTER', { host: this.host, port: this.port });
	    gntp.add('Application-Name', appname);
	    gntp.add('Application-Icon', appicon);
	    gntp.add('Notifications-Count', notifications.length);
	    gntp.newline();

	    notifications.forEach(function (notif) {
	        if (notif.enabled === undefined) notif.enabled = true;
	        gntp.add('Notification-Name', notif.label);
	        gntp.add('Notification-Display-Name', notif.dispname);
	        gntp.add('Notification-Enabled', notif.enabled ? 'True' : 'False');
	        gntp.add('Notification-Icon', notif.icon);
	        gntp.newline();
	    });

	    gntp.send(callback);
	};

	/**
	 * Send a notification with `text` content. Growly will lazily register itself
	 * if the user hasn't already before sending the notification.
	 *
	 * A notification can have the following `opts` options:
	 *
	 *  - `.label` type of notification to use (defaults to the first registered type)
	 *  - `.title` title of the notification
	 *  - `.icon` url, file path, or Buffer instance for the notification's icon.
	 *  - `.sticky` whether or not to sticky the notification (defaults to false)
	 *  - `.priority` the priority of the notification from lowest (-2) to highest (2)
	 *
	 * If provided, `callback` will be called when the user interacts with the notification.
	 * The first argument will be an `err` error object, and the second argument an `action`
	 * string equal to either 'clicked' or 'closed' (whichever action the user took.)
	 *
	 * Example notification:
	 *
	 *     growl.notify('Stuffs broken!', { label: 'warning' }, function(err, action) {
	 *         console.log('Action:', action);
	 *     });
	 *
	 * @param {String} text
	 * @param {Object} opts
	 * @param {Function} callback
	 * @api public
	 */

	Growly.prototype.notify = function (text, opts, callback) {
	    var self = this,
	        gntp;

	    /* Lazy registration. */
	    if (!this.registered) {
	        this.register(this.appname, function (err) {
	            if (err) console.log(err);
	            self.notify.call(self, text, opts, callback);
	        });
	        return;
	    }

	    opts = opts || {};

	    if (typeof opts === 'function') {
	        callback = opts;
	        opts = {};
	    }

	    gntp = new GNTP('NOTIFY', { host: this.host, port: this.port });
	    gntp.add('Application-Name', this.appname);
	    gntp.add('Notification-Name', opts.label || this.labels[0]);
	    gntp.add('Notification-ID', ++this.count);
	    gntp.add('Notification-Title', opts.title);
	    gntp.add('Notification-Text', text);
	    gntp.add('Notification-Sticky', opts.sticky ? 'True' : 'False');
	    gntp.add('Notification-Priority', opts.priority);
	    gntp.add('Notification-Icon', opts.icon);
	    gntp.add('Notification-Coalescing-ID', undefined);
	    gntp.add('Notification-Callback-Context', callback ? 'context' : undefined);
	    gntp.add('Notification-Callback-Context-Type', callback ? 'string' : undefined);
	    gntp.add('Notification-Callback-Target', undefined);
	    gntp.newline();

	    gntp.send(function (err, resp) {
	        if (callback && err) {
	            callback(err);
	        } else if (callback && resp.state === 'CALLBACK') {
	            callback(undefined, resp['Notification-Callback-Result'].toLowerCase());
	        }
	    });
	};

	/**
	 * Expose an instance of the Growly object.
	 */

	module.exports = new Growly();

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	var net = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"net\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    crypto = __webpack_require__(140),
	    format = __webpack_require__(132).format,
	    fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var nl = '\r\n';

	/**
	 * Create a new GNTP request of the given `type`.
	 *
	 * @param {String} type either NOTIFY or REGISTER
	 * @api private
	 */

	function GNTP(type, opts) {
	    opts = opts || {};
	    this.type = type;
	    this.host = opts.host || 'localhost';
	    this.port = opts.port || 23053;
	    this.request = 'GNTP/1.0 ' + type + ' NONE' + nl;
	    this.resources = [];
	    this.attempts = 0;
	    this.maxAttempts = 5;
	}

	/**
	 * Build a response object from the given `resp` response string.
	 *
	 * The response object has a key/value pair for every header in the response, and 
	 * a `.state` property equal to either OK, ERROR, or CALLBACK.
	 *
	 * An example GNTP response:
	 *
	 *     GNTP/1.0 -OK NONE\r\n
	 *     Response-Action: REGISTER\r\n
	 *     \r\n
	 *
	 *  Which would parse to:
	 *      
	 *      { state: 'OK', 'Response-Action': 'REGISTER' }
	 *
	 * @param {String} resp
	 * @return {Object}
	 * @api private
	 */

	GNTP.prototype.parseResp = function (resp) {
	    var parsed = {},
	        head,
	        body;
	    resp = resp.slice(0, resp.indexOf(nl + nl)).split(nl);
	    head = resp[0];
	    body = resp.slice(1);

	    parsed.state = head.match(/-(OK|ERROR|CALLBACK)/)[0].slice(1);
	    body.forEach(function (ln) {
	        ln = ln.split(': ');
	        parsed[ln[0]] = ln[1];
	    });

	    return parsed;
	};

	/**
	 * Call `GNTP.send()` with the given arguments after a certain delay.
	 *
	 * @api private
	 */

	GNTP.prototype.retry = function () {
	    var self = this,
	        args = arguments;
	    setTimeout(function () {
	        self.send.apply(self, args);
	    }, 750);
	};

	/**
	 * Add a resource to the GNTP request.
	 *
	 * @param {Buffer} file
	 * @return {String}
	 * @api private
	 */

	GNTP.prototype.addResource = function (file) {
	    var id = crypto.createHash('md5').update(file).digest('hex'),
	        header = 'Identifier: ' + id + nl + 'Length: ' + file.length + nl + nl;
	    this.resources.push({ header: header, file: file });
	    return 'x-growl-resource://' + id;
	};

	/**
	 * Append another header `name` with a value of `val` to the request. If `val` is
	 * undefined, the header will be left out.
	 *
	 * @param {String} name
	 * @param {String} val
	 * @api public
	 */

	GNTP.prototype.add = function (name, val) {
	    if (val === undefined) return;

	    /* Handle icon files when they're image paths or Buffers. */
	    if (/-Icon/.test(name) && !/^https?:\/\//.test(val)) {
	        if (/\.(png|gif|jpe?g)$/.test(val)) val = this.addResource(fs.readFileSync(val));else if (val instanceof Buffer) val = this.addResource(val);
	    }

	    this.request += name + ': ' + val + nl;
	};

	/**
	 * Append a newline to the request.
	 *
	 * @api public
	 */

	GNTP.prototype.newline = function () {
	    this.request += nl;
	};

	/**
	 * Send the GNTP request, calling `callback` after successfully sending the 
	 * request.
	 *
	 * An example GNTP request:
	 *
	 *     GNTP/1.0 REGISTER NONE\r\n
	 *     Application-Name: Growly.js\r\n
	 *     Notifications-Count: 1\r\n
	 *     \r\n
	 *     Notification-Name: default\r\n
	 *     Notification-Display-Name: Default Notification\r\n
	 *     Notification-Enabled: True\r\n
	 *     \r\n
	 * 
	 * @param {Function} callback which will be passed the parsed response
	 * @api public
	 */

	GNTP.prototype.send = function (callback) {
	    var self = this,
	        socket = net.connect(this.port, this.host),
	        resp = '';

	    callback = callback || function () {};

	    this.attempts += 1;

	    socket.on('connect', function () {
	        socket.write(self.request);

	        self.resources.forEach(function (res) {
	            socket.write(res.header);
	            socket.write(res.file);
	            socket.write(nl + nl);
	        });
	    });

	    socket.on('data', function (data) {
	        resp += data.toString();

	        /* Wait until we have a complete response which is signaled by two CRLF's. */
	        if (resp.slice(resp.length - 4) !== nl + nl) return;

	        resp = self.parseResp(resp);

	        /* We have to manually close the connection for certain responses; otherwise,
	           reset `resp` to prepare for the next response chunk.  */
	        if (resp.state === 'ERROR' || resp.state === 'CALLBACK') socket.end();else resp = '';
	    });

	    socket.on('end', function () {
	        /* Retry on 200 (timed out), 401 (unknown app), or 402 (unknown notification). */
	        if (['200', '401', '402'].indexOf(resp['Error-Code']) >= 0) {
	            if (self.attempts <= self.maxAttempts) {
	                self.retry(callback);
	            } else {
	                var msg = 'GNTP request to "%s:%d" failed with error code %s (%s)';
	                callback(new Error(format(msg, self.host, self.port, resp['Error-Code'], resp['Error-Description'])));
	            }
	        } else {
	            callback(undefined, resp);
	        }
	    });

	    socket.on('error', function () {
	        callback(new Error(format('Error while sending GNTP request to "%s:%d"', self.host, self.port)));
	        socket.destroy();
	    });
	};

	module.exports = GNTP;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(107).Buffer))

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	var rng = __webpack_require__(141);

	function error() {
	  var m = [].slice.call(arguments).join(' ');
	  throw new Error([m, 'we accept pull requests', 'http://github.com/dominictarr/crypto-browserify'].join('\n'));
	}

	exports.createHash = __webpack_require__(143);

	exports.createHmac = __webpack_require__(152);

	exports.randomBytes = function (size, callback) {
	  if (callback && callback.call) {
	    try {
	      callback.call(this, undefined, new Buffer(rng(size)));
	    } catch (err) {
	      callback(err);
	    }
	  } else {
	    return new Buffer(rng(size));
	  }
	};

	function each(a, f) {
	  for (var i in a) {
	    f(a[i], i);
	  }
	}

	exports.getHashes = function () {
	  return ['sha1', 'sha256', 'sha512', 'md5', 'rmd160'];
	};

	var p = __webpack_require__(153)(exports);
	exports.pbkdf2 = p.pbkdf2;
	exports.pbkdf2Sync = p.pbkdf2Sync;

	// the least I can do is make error messages for the rest of the node.js/crypto api.
	each(['createCredentials', 'createCipher', 'createCipheriv', 'createDecipher', 'createDecipheriv', 'createSign', 'createVerify', 'createDiffieHellman'], function (name) {
	  exports[name] = function () {
	    error('sorry,', name, 'is not implemented yet');
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(107).Buffer))

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {'use strict';

	(function () {
	  var g = ('undefined' === typeof window ? global : window) || {};
	  _crypto = g.crypto || g.msCrypto || __webpack_require__(142);
	  module.exports = function (size) {
	    // Modern Browsers
	    if (_crypto.getRandomValues) {
	      var bytes = new Buffer(size); //in browserify, this is an extended Uint8Array
	      /* This will not work in older browsers.
	       * See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
	       */

	      _crypto.getRandomValues(bytes);
	      return bytes;
	    } else if (_crypto.randomBytes) {
	      return _crypto.randomBytes(size);
	    } else throw new Error('secure random number generation not supported by this browser\n' + 'use chrome, FireFox or Internet Explorer 11');
	  };
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(107).Buffer))

/***/ },
/* 142 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	var createHash = __webpack_require__(144);

	var md5 = toConstructor(__webpack_require__(149));
	var rmd160 = toConstructor(__webpack_require__(151));

	function toConstructor(fn) {
	  return function () {
	    var buffers = [];
	    var m = {
	      update: function update(data, enc) {
	        if (!Buffer.isBuffer(data)) data = new Buffer(data, enc);
	        buffers.push(data);
	        return this;
	      },
	      digest: function digest(enc) {
	        var buf = Buffer.concat(buffers);
	        var r = fn(buf);
	        buffers = null;
	        return enc ? r.toString(enc) : r;
	      }
	    };
	    return m;
	  };
	}

	module.exports = function (alg) {
	  if ('md5' === alg) return new md5();
	  if ('rmd160' === alg) return new rmd160();
	  return createHash(alg);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(107).Buffer))

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _exports = module.exports = function (alg) {
	  var Alg = _exports[alg];
	  if (!Alg) throw new Error(alg + ' is not supported (we accept pull requests)');
	  return new Alg();
	};

	var Buffer = __webpack_require__(107).Buffer;
	var Hash = __webpack_require__(145)(Buffer);

	_exports.sha1 = __webpack_require__(146)(Buffer, Hash);
	_exports.sha256 = __webpack_require__(147)(Buffer, Hash);
	_exports.sha512 = __webpack_require__(148)(Buffer, Hash);

/***/ },
/* 145 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (Buffer) {

	  //prototype class for hash functions
	  function Hash(blockSize, finalSize) {
	    this._block = new Buffer(blockSize); //new Uint32Array(blockSize/4)
	    this._finalSize = finalSize;
	    this._blockSize = blockSize;
	    this._len = 0;
	    this._s = 0;
	  }

	  Hash.prototype.init = function () {
	    this._s = 0;
	    this._len = 0;
	  };

	  Hash.prototype.update = function (data, enc) {
	    if ("string" === typeof data) {
	      enc = enc || "utf8";
	      data = new Buffer(data, enc);
	    }

	    var l = this._len += data.length;
	    var s = this._s = this._s || 0;
	    var f = 0;
	    var buffer = this._block;

	    while (s < l) {
	      var t = Math.min(data.length, f + this._blockSize - s % this._blockSize);
	      var ch = t - f;

	      for (var i = 0; i < ch; i++) {
	        buffer[s % this._blockSize + i] = data[i + f];
	      }

	      s += ch;
	      f += ch;

	      if (s % this._blockSize === 0) {
	        this._update(buffer);
	      }
	    }
	    this._s = s;

	    return this;
	  };

	  Hash.prototype.digest = function (enc) {
	    // Suppose the length of the message M, in bits, is l
	    var l = this._len * 8;

	    // Append the bit 1 to the end of the message
	    this._block[this._len % this._blockSize] = 0x80;

	    // and then k zero bits, where k is the smallest non-negative solution to the equation (l + 1 + k) === finalSize mod blockSize
	    this._block.fill(0, this._len % this._blockSize + 1);

	    if (l % (this._blockSize * 8) >= this._finalSize * 8) {
	      this._update(this._block);
	      this._block.fill(0);
	    }

	    // to this append the block which is equal to the number l written in binary
	    // TODO: handle case where l is > Math.pow(2, 29)
	    this._block.writeInt32BE(l, this._blockSize - 4);

	    var hash = this._update(this._block) || this._hash();

	    return enc ? hash.toString(enc) : hash;
	  };

	  Hash.prototype._update = function () {
	    throw new Error('_update must be implemented by subclass');
	  };

	  return Hash;
	};

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
	 * in FIPS PUB 180-1
	 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for details.
	 */

	var inherits = __webpack_require__(132).inherits;

	module.exports = function (Buffer, Hash) {

	  var A = 0 | 0;
	  var B = 4 | 0;
	  var C = 8 | 0;
	  var D = 12 | 0;
	  var E = 16 | 0;

	  var W = new (typeof Int32Array === 'undefined' ? Array : Int32Array)(80);

	  var POOL = [];

	  function Sha1() {
	    if (POOL.length) return POOL.pop().init();

	    if (!(this instanceof Sha1)) return new Sha1();
	    this._w = W;
	    Hash.call(this, 16 * 4, 14 * 4);

	    this._h = null;
	    this.init();
	  }

	  inherits(Sha1, Hash);

	  Sha1.prototype.init = function () {
	    this._a = 0x67452301;
	    this._b = 0xefcdab89;
	    this._c = 0x98badcfe;
	    this._d = 0x10325476;
	    this._e = 0xc3d2e1f0;

	    Hash.prototype.init.call(this);
	    return this;
	  };

	  Sha1.prototype._POOL = POOL;
	  Sha1.prototype._update = function (X) {

	    var a, b, c, d, e, _a, _b, _c, _d, _e;

	    a = _a = this._a;
	    b = _b = this._b;
	    c = _c = this._c;
	    d = _d = this._d;
	    e = _e = this._e;

	    var w = this._w;

	    for (var j = 0; j < 80; j++) {
	      var W = w[j] = j < 16 ? X.readInt32BE(j * 4) : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);

	      var t = add(add(rol(a, 5), sha1_ft(j, b, c, d)), add(add(e, W), sha1_kt(j)));

	      e = d;
	      d = c;
	      c = rol(b, 30);
	      b = a;
	      a = t;
	    }

	    this._a = add(a, _a);
	    this._b = add(b, _b);
	    this._c = add(c, _c);
	    this._d = add(d, _d);
	    this._e = add(e, _e);
	  };

	  Sha1.prototype._hash = function () {
	    if (POOL.length < 100) POOL.push(this);
	    var H = new Buffer(20);
	    //console.log(this._a|0, this._b|0, this._c|0, this._d|0, this._e|0)
	    H.writeInt32BE(this._a | 0, A);
	    H.writeInt32BE(this._b | 0, B);
	    H.writeInt32BE(this._c | 0, C);
	    H.writeInt32BE(this._d | 0, D);
	    H.writeInt32BE(this._e | 0, E);
	    return H;
	  };

	  /*
	   * Perform the appropriate triplet combination function for the current
	   * iteration
	   */
	  function sha1_ft(t, b, c, d) {
	    if (t < 20) return b & c | ~b & d;
	    if (t < 40) return b ^ c ^ d;
	    if (t < 60) return b & c | b & d | c & d;
	    return b ^ c ^ d;
	  }

	  /*
	   * Determine the appropriate additive constant for the current iteration
	   */
	  function sha1_kt(t) {
	    return t < 20 ? 1518500249 : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514;
	  }

	  /*
	   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	   * to work around bugs in some JS interpreters.
	   * //dominictarr: this is 10 years old, so maybe this can be dropped?)
	   *
	   */
	  function add(x, y) {
	    return x + y | 0;
	    //lets see how this goes on testling.
	    //  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	    //  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	    //  return (msw << 16) | (lsw & 0xFFFF);
	  }

	  /*
	   * Bitwise rotate a 32-bit number to the left.
	   */
	  function rol(num, cnt) {
	    return num << cnt | num >>> 32 - cnt;
	  }

	  return Sha1;
	};

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
	 * in FIPS 180-2
	 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 *
	 */

	var inherits = __webpack_require__(132).inherits;

	module.exports = function (Buffer, Hash) {

	  var K = [0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2];

	  var W = new Array(64);

	  function Sha256() {
	    this.init();

	    this._w = W; //new Array(64)

	    Hash.call(this, 16 * 4, 14 * 4);
	  }

	  inherits(Sha256, Hash);

	  Sha256.prototype.init = function () {

	    this._a = 0x6a09e667 | 0;
	    this._b = 0xbb67ae85 | 0;
	    this._c = 0x3c6ef372 | 0;
	    this._d = 0xa54ff53a | 0;
	    this._e = 0x510e527f | 0;
	    this._f = 0x9b05688c | 0;
	    this._g = 0x1f83d9ab | 0;
	    this._h = 0x5be0cd19 | 0;

	    this._len = this._s = 0;

	    return this;
	  };

	  function S(X, n) {
	    return X >>> n | X << 32 - n;
	  }

	  function R(X, n) {
	    return X >>> n;
	  }

	  function Ch(x, y, z) {
	    return x & y ^ ~x & z;
	  }

	  function Maj(x, y, z) {
	    return x & y ^ x & z ^ y & z;
	  }

	  function Sigma0256(x) {
	    return S(x, 2) ^ S(x, 13) ^ S(x, 22);
	  }

	  function Sigma1256(x) {
	    return S(x, 6) ^ S(x, 11) ^ S(x, 25);
	  }

	  function Gamma0256(x) {
	    return S(x, 7) ^ S(x, 18) ^ R(x, 3);
	  }

	  function Gamma1256(x) {
	    return S(x, 17) ^ S(x, 19) ^ R(x, 10);
	  }

	  Sha256.prototype._update = function (M) {

	    var W = this._w;
	    var a, b, c, d, e, f, g, h;
	    var T1, T2;

	    a = this._a | 0;
	    b = this._b | 0;
	    c = this._c | 0;
	    d = this._d | 0;
	    e = this._e | 0;
	    f = this._f | 0;
	    g = this._g | 0;
	    h = this._h | 0;

	    for (var j = 0; j < 64; j++) {
	      var w = W[j] = j < 16 ? M.readInt32BE(j * 4) : Gamma1256(W[j - 2]) + W[j - 7] + Gamma0256(W[j - 15]) + W[j - 16];

	      T1 = h + Sigma1256(e) + Ch(e, f, g) + K[j] + w;

	      T2 = Sigma0256(a) + Maj(a, b, c);
	      h = g;g = f;f = e;e = d + T1;d = c;c = b;b = a;a = T1 + T2;
	    }

	    this._a = a + this._a | 0;
	    this._b = b + this._b | 0;
	    this._c = c + this._c | 0;
	    this._d = d + this._d | 0;
	    this._e = e + this._e | 0;
	    this._f = f + this._f | 0;
	    this._g = g + this._g | 0;
	    this._h = h + this._h | 0;
	  };

	  Sha256.prototype._hash = function () {
	    var H = new Buffer(32);

	    H.writeInt32BE(this._a, 0);
	    H.writeInt32BE(this._b, 4);
	    H.writeInt32BE(this._c, 8);
	    H.writeInt32BE(this._d, 12);
	    H.writeInt32BE(this._e, 16);
	    H.writeInt32BE(this._f, 20);
	    H.writeInt32BE(this._g, 24);
	    H.writeInt32BE(this._h, 28);

	    return H;
	  };

	  return Sha256;
	};

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var inherits = __webpack_require__(132).inherits;

	module.exports = function (Buffer, Hash) {
	  var K = [0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc, 0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118, 0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe, 0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2, 0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694, 0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3, 0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65, 0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5, 0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4, 0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725, 0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70, 0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926, 0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df, 0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8, 0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b, 0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001, 0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30, 0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8, 0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53, 0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8, 0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3, 0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec, 0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b, 0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178, 0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6, 0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b, 0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c, 0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817];

	  var W = new Array(160);

	  function Sha512() {
	    this.init();
	    this._w = W;

	    Hash.call(this, 128, 112);
	  }

	  inherits(Sha512, Hash);

	  Sha512.prototype.init = function () {

	    this._a = 0x6a09e667 | 0;
	    this._b = 0xbb67ae85 | 0;
	    this._c = 0x3c6ef372 | 0;
	    this._d = 0xa54ff53a | 0;
	    this._e = 0x510e527f | 0;
	    this._f = 0x9b05688c | 0;
	    this._g = 0x1f83d9ab | 0;
	    this._h = 0x5be0cd19 | 0;

	    this._al = 0xf3bcc908 | 0;
	    this._bl = 0x84caa73b | 0;
	    this._cl = 0xfe94f82b | 0;
	    this._dl = 0x5f1d36f1 | 0;
	    this._el = 0xade682d1 | 0;
	    this._fl = 0x2b3e6c1f | 0;
	    this._gl = 0xfb41bd6b | 0;
	    this._hl = 0x137e2179 | 0;

	    this._len = this._s = 0;

	    return this;
	  };

	  function S(X, Xl, n) {
	    return X >>> n | Xl << 32 - n;
	  }

	  function Ch(x, y, z) {
	    return x & y ^ ~x & z;
	  }

	  function Maj(x, y, z) {
	    return x & y ^ x & z ^ y & z;
	  }

	  Sha512.prototype._update = function (M) {

	    var W = this._w;
	    var a, b, c, d, e, f, g, h;
	    var al, bl, cl, dl, el, fl, gl, hl;

	    a = this._a | 0;
	    b = this._b | 0;
	    c = this._c | 0;
	    d = this._d | 0;
	    e = this._e | 0;
	    f = this._f | 0;
	    g = this._g | 0;
	    h = this._h | 0;

	    al = this._al | 0;
	    bl = this._bl | 0;
	    cl = this._cl | 0;
	    dl = this._dl | 0;
	    el = this._el | 0;
	    fl = this._fl | 0;
	    gl = this._gl | 0;
	    hl = this._hl | 0;

	    for (var i = 0; i < 80; i++) {
	      var j = i * 2;

	      var Wi, Wil;

	      if (i < 16) {
	        Wi = W[j] = M.readInt32BE(j * 4);
	        Wil = W[j + 1] = M.readInt32BE(j * 4 + 4);
	      } else {
	        var x = W[j - 15 * 2];
	        var xl = W[j - 15 * 2 + 1];
	        var gamma0 = S(x, xl, 1) ^ S(x, xl, 8) ^ x >>> 7;
	        var gamma0l = S(xl, x, 1) ^ S(xl, x, 8) ^ S(xl, x, 7);

	        x = W[j - 2 * 2];
	        xl = W[j - 2 * 2 + 1];
	        var gamma1 = S(x, xl, 19) ^ S(xl, x, 29) ^ x >>> 6;
	        var gamma1l = S(xl, x, 19) ^ S(x, xl, 29) ^ S(xl, x, 6);

	        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	        var Wi7 = W[j - 7 * 2];
	        var Wi7l = W[j - 7 * 2 + 1];

	        var Wi16 = W[j - 16 * 2];
	        var Wi16l = W[j - 16 * 2 + 1];

	        Wil = gamma0l + Wi7l;
	        Wi = gamma0 + Wi7 + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
	        Wil = Wil + gamma1l;
	        Wi = Wi + gamma1 + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
	        Wil = Wil + Wi16l;
	        Wi = Wi + Wi16 + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);

	        W[j] = Wi;
	        W[j + 1] = Wil;
	      }

	      var maj = Maj(a, b, c);
	      var majl = Maj(al, bl, cl);

	      var sigma0h = S(a, al, 28) ^ S(al, a, 2) ^ S(al, a, 7);
	      var sigma0l = S(al, a, 28) ^ S(a, al, 2) ^ S(a, al, 7);
	      var sigma1h = S(e, el, 14) ^ S(e, el, 18) ^ S(el, e, 9);
	      var sigma1l = S(el, e, 14) ^ S(el, e, 18) ^ S(e, el, 9);

	      // t1 = h + sigma1 + ch + K[i] + W[i]
	      var Ki = K[j];
	      var Kil = K[j + 1];

	      var ch = Ch(e, f, g);
	      var chl = Ch(el, fl, gl);

	      var t1l = hl + sigma1l;
	      var t1 = h + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
	      t1l = t1l + chl;
	      t1 = t1 + ch + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
	      t1l = t1l + Kil;
	      t1 = t1 + Ki + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
	      t1l = t1l + Wil;
	      t1 = t1 + Wi + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);

	      // t2 = sigma0 + maj
	      var t2l = sigma0l + majl;
	      var t2 = sigma0h + maj + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);

	      h = g;
	      hl = gl;
	      g = f;
	      gl = fl;
	      f = e;
	      fl = el;
	      el = dl + t1l | 0;
	      e = d + t1 + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
	      d = c;
	      dl = cl;
	      c = b;
	      cl = bl;
	      b = a;
	      bl = al;
	      al = t1l + t2l | 0;
	      a = t1 + t2 + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
	    }

	    this._al = this._al + al | 0;
	    this._bl = this._bl + bl | 0;
	    this._cl = this._cl + cl | 0;
	    this._dl = this._dl + dl | 0;
	    this._el = this._el + el | 0;
	    this._fl = this._fl + fl | 0;
	    this._gl = this._gl + gl | 0;
	    this._hl = this._hl + hl | 0;

	    this._a = this._a + a + (this._al >>> 0 < al >>> 0 ? 1 : 0) | 0;
	    this._b = this._b + b + (this._bl >>> 0 < bl >>> 0 ? 1 : 0) | 0;
	    this._c = this._c + c + (this._cl >>> 0 < cl >>> 0 ? 1 : 0) | 0;
	    this._d = this._d + d + (this._dl >>> 0 < dl >>> 0 ? 1 : 0) | 0;
	    this._e = this._e + e + (this._el >>> 0 < el >>> 0 ? 1 : 0) | 0;
	    this._f = this._f + f + (this._fl >>> 0 < fl >>> 0 ? 1 : 0) | 0;
	    this._g = this._g + g + (this._gl >>> 0 < gl >>> 0 ? 1 : 0) | 0;
	    this._h = this._h + h + (this._hl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
	  };

	  Sha512.prototype._hash = function () {
	    var H = new Buffer(64);

	    function writeInt64BE(h, l, offset) {
	      H.writeInt32BE(h, offset);
	      H.writeInt32BE(l, offset + 4);
	    }

	    writeInt64BE(this._a, this._al, 0);
	    writeInt64BE(this._b, this._bl, 8);
	    writeInt64BE(this._c, this._cl, 16);
	    writeInt64BE(this._d, this._dl, 24);
	    writeInt64BE(this._e, this._el, 32);
	    writeInt64BE(this._f, this._fl, 40);
	    writeInt64BE(this._g, this._gl, 48);
	    writeInt64BE(this._h, this._hl, 56);

	    return H;
	  };

	  return Sha512;
	};

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */

	var helpers = __webpack_require__(150);

	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len) {
	  /* append padding */
	  x[len >> 5] |= 0x80 << len % 32;
	  x[(len + 64 >>> 9 << 4) + 14] = len;

	  var a = 1732584193;
	  var b = -271733879;
	  var c = -1732584194;
	  var d = 271733878;

	  for (var i = 0; i < x.length; i += 16) {
	    var olda = a;
	    var oldb = b;
	    var oldc = c;
	    var oldd = d;

	    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
	    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
	    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
	    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
	    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
	    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
	    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
	    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
	    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
	    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
	    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
	    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
	    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
	    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
	    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
	    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

	    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
	    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
	    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
	    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
	    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
	    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
	    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
	    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
	    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
	    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
	    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
	    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
	    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
	    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
	    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
	    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

	    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
	    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
	    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
	    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
	    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
	    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
	    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
	    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
	    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
	    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
	    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
	    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
	    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
	    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
	    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
	    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

	    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
	    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
	    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
	    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
	    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
	    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
	    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
	    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
	    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
	    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
	    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
	    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
	    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
	    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
	    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
	    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

	    a = safe_add(a, olda);
	    b = safe_add(b, oldb);
	    c = safe_add(c, oldc);
	    d = safe_add(d, oldd);
	  }
	  return Array(a, b, c, d);
	}

	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t) {
	  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
	}
	function md5_ff(a, b, c, d, x, s, t) {
	  return md5_cmn(b & c | ~b & d, a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t) {
	  return md5_cmn(b & d | c & ~d, a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t) {
	  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t) {
	  return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
	}

	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y) {
	  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return msw << 16 | lsw & 0xFFFF;
	}

	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt) {
	  return num << cnt | num >>> 32 - cnt;
	}

	module.exports = function md5(buf) {
	  return helpers.hash(buf, core_md5, 16);
	};

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {"use strict";

	var intSize = 4;
	var zeroBuffer = new Buffer(intSize);zeroBuffer.fill(0);
	var chrsz = 8;

	function toArray(buf, bigEndian) {
	  if (buf.length % intSize !== 0) {
	    var len = buf.length + (intSize - buf.length % intSize);
	    buf = Buffer.concat([buf, zeroBuffer], len);
	  }

	  var arr = [];
	  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
	  for (var i = 0; i < buf.length; i += intSize) {
	    arr.push(fn.call(buf, i));
	  }
	  return arr;
	}

	function toBuffer(arr, size, bigEndian) {
	  var buf = new Buffer(size);
	  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
	  for (var i = 0; i < arr.length; i++) {
	    fn.call(buf, arr[i], i * 4, true);
	  }
	  return buf;
	}

	function hash(buf, fn, hashSize, bigEndian) {
	  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
	  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
	  return toBuffer(arr, hashSize, bigEndian);
	}

	module.exports = { hash: hash };
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(107).Buffer))

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	module.exports = ripemd160;

	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	// Constants table
	var zl = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13];
	var zr = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11];
	var sl = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6];
	var sr = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];

	var hl = [0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E];
	var hr = [0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000];

	var bytesToWords = function bytesToWords(bytes) {
	  var words = [];
	  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
	    words[b >>> 5] |= bytes[i] << 24 - b % 32;
	  }
	  return words;
	};

	var wordsToBytes = function wordsToBytes(words) {
	  var bytes = [];
	  for (var b = 0; b < words.length * 32; b += 8) {
	    bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);
	  }
	  return bytes;
	};

	var processBlock = function processBlock(H, M, offset) {

	  // Swap endian
	  for (var i = 0; i < 16; i++) {
	    var offset_i = offset + i;
	    var M_offset_i = M[offset_i];

	    // Swap
	    M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 0x00ff00ff | (M_offset_i << 24 | M_offset_i >>> 8) & 0xff00ff00;
	  }

	  // Working variables
	  var al, bl, cl, dl, el;
	  var ar, br, cr, dr, er;

	  ar = al = H[0];
	  br = bl = H[1];
	  cr = cl = H[2];
	  dr = dl = H[3];
	  er = el = H[4];
	  // Computation
	  var t;
	  for (var i = 0; i < 80; i += 1) {
	    t = al + M[offset + zl[i]] | 0;
	    if (i < 16) {
	      t += f1(bl, cl, dl) + hl[0];
	    } else if (i < 32) {
	      t += f2(bl, cl, dl) + hl[1];
	    } else if (i < 48) {
	      t += f3(bl, cl, dl) + hl[2];
	    } else if (i < 64) {
	      t += f4(bl, cl, dl) + hl[3];
	    } else {
	      // if (i<80) {
	      t += f5(bl, cl, dl) + hl[4];
	    }
	    t = t | 0;
	    t = rotl(t, sl[i]);
	    t = t + el | 0;
	    al = el;
	    el = dl;
	    dl = rotl(cl, 10);
	    cl = bl;
	    bl = t;

	    t = ar + M[offset + zr[i]] | 0;
	    if (i < 16) {
	      t += f5(br, cr, dr) + hr[0];
	    } else if (i < 32) {
	      t += f4(br, cr, dr) + hr[1];
	    } else if (i < 48) {
	      t += f3(br, cr, dr) + hr[2];
	    } else if (i < 64) {
	      t += f2(br, cr, dr) + hr[3];
	    } else {
	      // if (i<80) {
	      t += f1(br, cr, dr) + hr[4];
	    }
	    t = t | 0;
	    t = rotl(t, sr[i]);
	    t = t + er | 0;
	    ar = er;
	    er = dr;
	    dr = rotl(cr, 10);
	    cr = br;
	    br = t;
	  }
	  // Intermediate hash value
	  t = H[1] + cl + dr | 0;
	  H[1] = H[2] + dl + er | 0;
	  H[2] = H[3] + el + ar | 0;
	  H[3] = H[4] + al + br | 0;
	  H[4] = H[0] + bl + cr | 0;
	  H[0] = t;
	};

	function f1(x, y, z) {
	  return x ^ y ^ z;
	}

	function f2(x, y, z) {
	  return x & y | ~x & z;
	}

	function f3(x, y, z) {
	  return (x | ~y) ^ z;
	}

	function f4(x, y, z) {
	  return x & z | y & ~z;
	}

	function f5(x, y, z) {
	  return x ^ (y | ~z);
	}

	function rotl(x, n) {
	  return x << n | x >>> 32 - n;
	}

	function ripemd160(message) {
	  var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];

	  if (typeof message == 'string') message = new Buffer(message, 'utf8');

	  var m = bytesToWords(message);

	  var nBitsLeft = message.length * 8;
	  var nBitsTotal = message.length * 8;

	  // Add padding
	  m[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
	  m[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 0x00ff00ff | (nBitsTotal << 24 | nBitsTotal >>> 8) & 0xff00ff00;

	  for (var i = 0; i < m.length; i += 16) {
	    processBlock(H, m, i);
	  }

	  // Swap endian
	  for (var i = 0; i < 5; i++) {
	    // Shortcut
	    var H_i = H[i];

	    // Swap
	    H[i] = (H_i << 8 | H_i >>> 24) & 0x00ff00ff | (H_i << 24 | H_i >>> 8) & 0xff00ff00;
	  }

	  var digestbytes = wordsToBytes(H);
	  return new Buffer(digestbytes);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(107).Buffer))

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	var createHash = __webpack_require__(143);

	var zeroBuffer = new Buffer(128);
	zeroBuffer.fill(0);

	module.exports = Hmac;

	function Hmac(alg, key) {
	  if (!(this instanceof Hmac)) return new Hmac(alg, key);
	  this._opad = opad;
	  this._alg = alg;

	  var blocksize = alg === 'sha512' ? 128 : 64;

	  key = this._key = !Buffer.isBuffer(key) ? new Buffer(key) : key;

	  if (key.length > blocksize) {
	    key = createHash(alg).update(key).digest();
	  } else if (key.length < blocksize) {
	    key = Buffer.concat([key, zeroBuffer], blocksize);
	  }

	  var ipad = this._ipad = new Buffer(blocksize);
	  var opad = this._opad = new Buffer(blocksize);

	  for (var i = 0; i < blocksize; i++) {
	    ipad[i] = key[i] ^ 0x36;
	    opad[i] = key[i] ^ 0x5C;
	  }

	  this._hash = createHash(alg).update(ipad);
	}

	Hmac.prototype.update = function (data, enc) {
	  this._hash.update(data, enc);
	  return this;
	};

	Hmac.prototype.digest = function (enc) {
	  var h = this._hash.digest();
	  return createHash(this._alg).update(this._opad).update(h).digest(enc);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(107).Buffer))

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var pbkdf2Export = __webpack_require__(154);

	module.exports = function (crypto, exports) {
	  exports = exports || {};

	  var exported = pbkdf2Export(crypto);

	  exports.pbkdf2 = exported.pbkdf2;
	  exports.pbkdf2Sync = exported.pbkdf2Sync;

	  return exports;
	};

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';

	module.exports = function (crypto) {
	  function pbkdf2(password, salt, iterations, keylen, digest, callback) {
	    if ('function' === typeof digest) {
	      callback = digest;
	      digest = undefined;
	    }

	    if ('function' !== typeof callback) throw new Error('No callback provided to pbkdf2');

	    setTimeout(function () {
	      var result;

	      try {
	        result = pbkdf2Sync(password, salt, iterations, keylen, digest);
	      } catch (e) {
	        return callback(e);
	      }

	      callback(undefined, result);
	    });
	  }

	  function pbkdf2Sync(password, salt, iterations, keylen, digest) {
	    if ('number' !== typeof iterations) throw new TypeError('Iterations not a number');

	    if (iterations < 0) throw new TypeError('Bad iterations');

	    if ('number' !== typeof keylen) throw new TypeError('Key length not a number');

	    if (keylen < 0) throw new TypeError('Bad key length');

	    digest = digest || 'sha1';

	    if (!Buffer.isBuffer(password)) password = new Buffer(password);
	    if (!Buffer.isBuffer(salt)) salt = new Buffer(salt);

	    var hLen,
	        l = 1,
	        r,
	        T;
	    var DK = new Buffer(keylen);
	    var block1 = new Buffer(salt.length + 4);
	    salt.copy(block1, 0, 0, salt.length);

	    for (var i = 1; i <= l; i++) {
	      block1.writeUInt32BE(i, salt.length);

	      var U = crypto.createHmac(digest, password).update(block1).digest();

	      if (!hLen) {
	        hLen = U.length;
	        T = new Buffer(hLen);
	        l = Math.ceil(keylen / hLen);
	        r = keylen - (l - 1) * hLen;

	        if (keylen > (Math.pow(2, 32) - 1) * hLen) throw new TypeError('keylen exceeds maximum length');
	      }

	      U.copy(T, 0, 0, hLen);

	      for (var j = 1; j < iterations; j++) {
	        U = crypto.createHmac(digest, password).update(U).digest();

	        for (var k = 0; k < hLen; k++) {
	          T[k] ^= U[k];
	        }
	      }

	      var destPos = (i - 1) * hLen;
	      var len = i == l ? r : hLen;
	      T.copy(DK, destPos, 0, len);
	    }

	    return DK;
	  }

	  return {
	    pbkdf2: pbkdf2,
	    pbkdf2Sync: pbkdf2Sync
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(107).Buffer))

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	/**
	 * Wrapper for the toaster (https://github.com/nels-o/toaster)
	 */
	var path = __webpack_require__(111),
	    notifier = path.resolve(__dirname, '../vendor/toaster/toast.exe'),
	    utils = __webpack_require__(106),
	    Balloon = __webpack_require__(156),
	    cloneDeep = __webpack_require__(115);

	var EventEmitter = __webpack_require__(131).EventEmitter;
	var util = __webpack_require__(132);

	var fallback = void 0;

	module.exports = WindowsToaster;

	function WindowsToaster(options) {
	  options = cloneDeep(options || {});
	  if (!(this instanceof WindowsToaster)) {
	    return new WindowsToaster(options);
	  }

	  this.options = options;

	  EventEmitter.call(this);
	}
	util.inherits(WindowsToaster, EventEmitter);

	WindowsToaster.prototype.notify = function (options, callback) {
	  options = cloneDeep(options || {});

	  callback = callback || function () {};
	  var actionJackedCallback = utils.actionJackerDecorator(this, options, callback, function (data) {
	    var cleaned = data.toLowerCase().trim();
	    if (cleaned === 'activated') {
	      return 'click';
	    }
	    if (cleaned === 'timeout') {
	      return 'timeout';
	    }
	    return false;
	  });

	  options.title = options.title || 'Node Notification:';

	  if (!options.message) {
	    callback(new Error('Message is required.'));
	    return this;
	  }

	  if (!utils.isWin8() && !!this.options.withFallback) {
	    fallback = fallback || new Balloon(this.options);
	    return fallback.notify(options, callback);
	  }

	  options = utils.mapToWin8(options);
	  var argsList = utils.constructArgumentList(options, {
	    wrapper: '',
	    noEscape: true
	  });
	  utils.fileCommand(this.options.customPath || notifier, argsList, actionJackedCallback);
	  return this;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	/**
	 * Wrapper for the notifu 1.6 (http://www.paralint.com/projects/notifu/)

	Usage
	/t <value>      The type of message to display values are:
	                    info      The message is an informational message
	                    warn      The message is an warning message
	                    error     The message is an error message
	/d <value>      The number of milliseconds to display (omit or 0 for infinit)
	/p <value>      The title (or prompt) of the ballon
	/m <value>      The message text
	/i <value>      Specify an icon to use ("parent" uses the icon of the parent process)
	/e              Enable ballon tips in the registry (for this user only)
	/q              Do not play a sound when the tooltip is displayed
	/w              Show the tooltip even if the user is in the quiet period that follows his very first login (Windows 7 and up)
	/xp             Use IUserNotification interface event when IUserNotification2 is available


	// Kill codes:
	  2 = Timeout
	  3 = Clicked
	  4 = Closed or faded out

	 */
	var path = __webpack_require__(111),
	    notifier = path.resolve(__dirname, '../vendor/notifu/notifu'),
	    utils = __webpack_require__(106),
	    checkGrowl = __webpack_require__(137),
	    Toaster = __webpack_require__(155),
	    Growl = __webpack_require__(136),
	    os = __webpack_require__(105),
	    cloneDeep = __webpack_require__(115);

	var EventEmitter = __webpack_require__(131).EventEmitter;
	var util = __webpack_require__(132);

	var hasGrowl = void 0;

	module.exports = WindowsBalloon;

	function WindowsBalloon(options) {
	  options = cloneDeep(options || {});
	  if (!(this instanceof WindowsBalloon)) {
	    return new WindowsBalloon(options);
	  }

	  this.options = options;

	  EventEmitter.call(this);
	}
	util.inherits(WindowsBalloon, EventEmitter);

	WindowsBalloon.prototype.notify = function (options, callback) {
	  var fallback,
	      notifierOptions = this.options;
	  options = cloneDeep(options || {});
	  callback = callback || function () {};
	  var actionJackedCallback = utils.actionJackerDecorator(this, options, callback, function (data) {
	    var cleaned = data.toLowerCase().trim();
	    if (cleaned === 'activate') {
	      return 'click';
	    }
	    if (cleaned === 'timeout') {
	      return 'timeout';
	    }
	    return false;
	  });

	  if (!!this.options.withFallback && utils.isWin8()) {
	    fallback = fallback || new Toaster(notifierOptions);
	    return fallback.notify(options, callback);
	  }

	  if (!!this.options.withFallback && (!utils.isLessThanWin8() || hasGrowl === true)) {
	    fallback = fallback || new Growl(notifierOptions);
	    return fallback.notify(options, callback);
	  }

	  if (!this.options.withFallback || hasGrowl === false) {
	    doNotification(options, notifierOptions, actionJackedCallback);
	    return this;
	  }

	  checkGrowl(notifierOptions, function (hasGrowlResult) {
	    hasGrowl = hasGrowlResult;

	    if (hasGrowl) {
	      fallback = fallback || new Growl(notifierOptions);
	      return fallback.notify(options, callback);
	    }

	    doNotification(options, notifierOptions, actionJackedCallback);
	  });

	  return this;
	};

	var allowedArguments = ["t", "d", "p", "m", "i", "e", "q", "w", "xp"];

	function doNotification(options, notifierOptions, callback) {
	  var is64Bit = os.arch() === 'x64';
	  options = options || {};
	  options = utils.mapToNotifu(options);
	  options.p = options.p || 'Node Notification:';

	  var fullNotifierPath = notifier + (is64Bit ? '64' : '') + '.exe';
	  var localNotifier = notifierOptions.customPath || fullNotifierPath;

	  if (!options.m) {
	    callback(new Error('Message is required.'));
	    return this;
	  }

	  var argsList = utils.constructArgumentList(options, {
	    wrapper: '',
	    noEscape: true,
	    explicitTrue: true,
	    allowedArguments: allowedArguments
	  });

	  if (!!options.wait) {
	    return utils.fileCommand(localNotifier, argsList, function (error, data) {
	      var action = fromErrorCodeToAction(error.code);
	      if (action === 'error') return callback(error, data);

	      return callback(null, action);
	    });
	  }
	  utils.immediateFileCommand(localNotifier, argsList, callback);
	}

	function fromErrorCodeToAction(errorCode) {
	  switch (errorCode) {
	    case 2:
	      return 'timeout';
	    case 3:
	    case 6:
	    case 7:
	      return 'activate';
	    case 4:
	      return 'close';
	    default:
	      return 'error';
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 157 */
/***/ function(module, exports) {

	"use strict";

/***/ }
/******/ ]);