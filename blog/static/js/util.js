'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// fetch pollify

// 加入缓存机制，cache会被放在sessionStorage里面，如果真实请求的数据和缓存数据一样，则不更新视图
var __fetch = function (__fetch) {
    // 根据 type url data dataType 来作为key
    var STORAGE_KEY = '__ajax_cache__';
    var cache = {
        store: function () {
            var store = sessionStorage.getItem(STORAGE_KEY) || '{}';
            return JSON.parse(store);
        }(),
        get: function get(key) {
            return this.store[key] || '';
        },
        set: function set(key, value) {
            this.store[key] = value;
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.store));
        }
    };

    var fuck = void 0;
    // options = {
    //     method: post/get/delete/put/head etc
    //     body: string/formdata/bob/array etc
    //     header: 自定义头
    //     mode: cros/same-cros/no-cros 跨域相关
    //     cache: default etc缓存相关
    // }

    // 请求进度条，可以通过ajax进度条实现
    var ajax = function ajax(url) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // 一般而言，method/body 就够使用了
        // cache,

        options.method = options.method || 'GET';
        options.body = options.body || '';

        var KEY = [url, options.method, options.body].join('__wpt_ajax__');

        return new Promise(function (resolve) {
            var xhr = new XMLHttpRequest();

            // resolve的数据是一个对象
            var data = {
                OK: false,
                origin: undefined,
                json: function json() {
                    var _this = this;

                    return new Promise(function (resolve, reject) {
                        resolve(JSON.parse(_this.origin));
                    });
                },
                text: function text() {
                    var _this2 = this;

                    return new Promise(function (resolve, reject) {
                        resolve(new String(_this2.origin));
                    });
                }
            };
            if (options.asynRequest && !options.asynRequest.cached) {
                options.asynRequest.cached = true;
                data.OK = true;
                data.fromCache = true;
                data.origin = cache.get(KEY);
                console.log('数据从缓存中获取');
                data.origin && resolve(data);
                console.log('从服务器拉取');
                options.asynRequest.call(options.context);
                return;
            }

            // 如果从服务器拉取的话，就把cached = false，以便下一次继续先从cache取数据
            options.asynRequest && (options.asynRequest.cached = false);
            // 事件监听
            xhr.addEventListener('progress', function (event) {
                // 下载进度条
                options.progress && options.progress(event.loaded / event.total);
            }, false);
            // 上传停止
            xhr.addEventListener('abort', function (xx) {
                resolve(data);
            }, false);
            // 上传失败
            xhr.addEventListener('error', function (xx) {
                resolve(data);
            }, false);
            // 上传成功
            xhr.addEventListener('load', function (xx) {}, false);

            // 上传进度条
            xhr.upload.onprogress = function (event) {
                options.uploadProgress && options.uploadProgress(event.loaded / event.total);
            };

            xhr.open(options.method, url, true);
            options.contentType && xhr.setRequestHeader("Content-Type", options.contentType);

            // 注意，非get请求参数，通过json字符串发送数据
            // 如果是FromData则发送FormData
            var body = options.body;

            xhr.responseType = 'text';
            // 监听state变化
            xhr.addEventListener('readystatechange', function (state) {
                // console.log(xhr.readyState, xhr.responseText, xhr.status);
                if (xhr.readyState == 4) {
                    data.OK = xhr.status == 200;
                    data.origin = xhr.responseText;
                    xhr.status == 200 && options.asynRequest && cache.set(KEY, data.origin);
                    // 因为字符串会被JSON.stringify因此这里需要先parse一边，恢复成正常的json字符串
                    resolve(data);
                }
            });

            // 发送post数据
            xhr.send(body);
        });
    };

    ajax.origin = __fetch;

    return ajax;
}(window.fetch);

// 简单队列，只执行最后一次被触发的事件
var Queue = function Queue(fn) {
    var time = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    this.queue = [];
    this.fn = fn;
    var that = this;
    this.tick = function () {
        this.queue.forEach(clearTimeout);
        this.queue.push(setTimeout(function () {
            // 性能调优
            requestAnimationFrame ? requestAnimationFrame(function () {
                that.fn();
            }) : that.fn();
        }, time));
    };
};

var Utils = {
    // 关于时间
    time: {
        toString: function toString(time) {
            var date = new Date(+time);
            return date.getFullYear() + '-' + this.fillZero(date.getMonth() + 1) + '-' + this.fillZero(date.getDate()) + ' ' + this.fillZero(date.getHours()) + ':' + this.fillZero(date.getMinutes()) + ':' + this.fillZero(date.getSeconds());
        },
        fillZero: function fillZero(num) {
            if (num < 10) {
                return '0' + num;
            }
            return '' + num;
        }
    },
    lastPosition: {
        set: function set(key, value) {
            var lastPosition = Utils.getSessionStorage('lastPosition');
            lastPosition[key] = value;
            Utils.setSessionStorage('lastPosition', lastPosition);
        },
        get: function get(key) {
            var lastPosition = Utils.getSessionStorage('lastPosition');
            var value = lastPosition[key] || {};
            return value;
        }
    },
    getSessionStorage: function getSessionStorage(key) {
        var value = window.sessionStorage.getItem(key) || '{}';
        try {
            value = JSON.parse(value);
        } catch (e) {
            value = {};
        }
        return value;
    },
    setSessionStorage: function setSessionStorage(key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    },

    // scrill事件统一派发
    scroll: function () {
        var cache = {};
        var fn = function fn() {
            // console.log(cache );
            for (var key in cache) {
                cache[key] && cache[key]();
            }
        };
        // 队列延时
        var fuck = new Queue(fn, 50);
        // 是不是应该把scrollTop给出来
        window.addEventListener('scroll', function () {
            fuck.tick();
        });

        var scroll = {
            listen: function listen(key, callback) {
                cache[key] = callback;
                return {
                    detory: function detory() {
                        scroll.remove(key);
                    },

                    key: key
                };
            },
            remove: function remove(key) {
                delete cache[key];
            },

            // 立即执行
            trigger: fn,
            // 延时50ms执行
            tick: fuck.tick.bind(fuck)
        };

        return scroll;
    }(),
    // 获取cdn图片路径
    getImageCDNSrc: function getImageCDNSrc(url) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // 获取
        var a = document.createElement('a');
        a.href = url;
        url = a.pathname;
        a = null;

        options = this.assign({
            q: 75,
            format: Utils.__webp_surport__ ? 'webp' : ''
        }, options);

        var optionsStr = Object.keys(options).map(function (key) {
            return options[key] ? '/' + key + '/' + options[key] : '';
        }).reduce(function (a, b) {
            return a + b;
        });
        // merge一下就可以了
        return this.CDN.qiniu + url + '?imageView2/2' + optionsStr;
    },
    assign: function assign() {
        var target = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        for (var _len = arguments.length, arr = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            arr[_key - 1] = arguments[_key];
        }

        arr.forEach(function (item) {
            for (var key in item) {
                target[key] = item[key];
            }
        });

        return target;
    },

    // 返回cdn域名
    CDN: function () {
        var fn = function fn() {
            // 返回一个随机域名
            var index = Math.round(Math.random() * len);
            index = Math.max(index, 0);
            return fn.all[index];
        };
        fn.qiniu = 'http://o9fl7r0ix.bkt.clouddn.com';
        fn.all = [fn.qiniu];
        var len = fn.all.length - 1;

        return fn;
    }(),
    // 加载图片工具
    loadImageUtil: {
        // 获取懒加载类型，与资源路径

        data: function data($ele) {
            var data = $ele.dataset;
            var src = data['lazyImg'];
            if (src) {
                return {
                    type: 'layzImg',
                    url: src
                };
            }

            var bgd = data['lazyBgd'];
            if (bgd) {
                return {
                    type: 'lazyBgd',
                    url: bgd
                };
            }

            var poster = data['lazyPoster'];
            if (poster) {
                return {
                    type: 'lazyPoster',
                    url: poster
                };
            }
        },

        // 设置资源路径
        setSrc: function setSrc($ele, data) {
            switch (data.type) {
                case 'layzImg':
                    $ele.src = data.url;
                    $ele.removeAttribute('data-lazy-img');
                    break;
                case 'lazyBgd':
                    $ele.style.backgroundImage = 'url(' + data.url + ')';
                    break;
                case 'lazyPoster':
                    $ele.poster = data.url;
                    break;
            }
        },

        //

        webp: function () {
            var __webp_surport__ = void 0;

            return function () {

                return new Promise(function (resolve, reject) {
                    if (__webp_surport__ === true) {
                        resolve(true);
                        return;
                    }
                    if (__webp_surport__ === false) {
                        resolve(false);
                        return;
                    }

                    var $img = new Image();
                    $img.onload = function () {
                        Utils.__webp_surport__ = __webp_surport__ = true;
                        resolve(true);
                        $img = null;
                    };
                    $img.onerror = function () {
                        __webp_surport__ = false;
                        resolve(false);
                        $img = null;
                    };

                    $img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vlAAAA=';
                });
            };
        }()
    },
    // 加载图片
    loadImage: function loadImage() {
        var _this3 = this;

        console.log(Utils.__webp_surport__);
        // 优化
        var $eles = Array.from(document.querySelectorAll('.lazy-load-img'));
        if (!$eles.length) {
            return;
        }

        $eles.some(function ($ele) {
            var data = _this3.loadImageUtil.data($ele);

            var src = data.url;
            if (!src) {
                return;
            }
            // 图片在上面

            var TOP = $ele.getBoundingClientRect().top;
            var eleHeight = $ele.clientHeight;

            if (TOP < -eleHeight) {
                return;
            }
            // 图片在下面，如果图片在视窗下面的话，就不用加载了
            if (TOP > window.innerHeight) {
                return true;
            }

            var $img = new Image();

            $img.onload = $img.onerror = $img.onabort = function () {
                // console.log('家再吃个盖饭');
                $img.onload = $img.onerror = $img.onabort = null;
                $img = null;
                // console.log('loaded====>',data);
                _this3.loadImageUtil.setSrc($ele, data);
            };
            // 移除掉class，下一次就不加载了
            $ele.classList.remove('lazy-load-img');

            // 根据是不是支持webp， 对图片做一些处理，加载图片
            _this3.loadImageUtil.webp().then(function (webp) {
                var options = {
                    format: webp ? 'webp' : ''
                };
                // 修改文件路径
                $img.src = data.url = _this3.getImageCDNSrc(src, options);
                // 图片已经加载过
                if ($img.width || $img.height || $img.complete) {
                    // console.log('fuck');
                    $img.onload = $img.onerror = $img.onabort = null;
                    $img = null;
                    _this3.loadImageUtil.setSrc($ele, data);
                }
            });
        });
    },

    // ajax/fetch
    fetch: __fetch,

    getKey: function getKey(data) {
        return new Promise(function (res) {
            fetch('http://dev.weipaitang.com/manage/getUploadUrl?package=' + JSON.stringify(data)).then(function (res) {
                return res.json();
            }).then(function (data) {
                res(data.requestUrl);
            });
        });
    },
    upload: function upload() {
        var _this4 = this;

        var files = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
        var fn = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var onStart = fn.onStart;
        var onEnd = fn.onEnd;
        var onError = fn.onError;
        var onProgress = fn.onProgress;

        var f = new FormData();
        Promise.all(Array.from(files).map(function (file) {
            return _this4.zip(file, 1);
        })).then(function (res) {
            res.forEach(function (file, index) {
                // 对文件名进行编码，避免中文乱码
                // file.name = encodeURIComponent(file.name)
                f.append('file' + index, file);
            });

            onStart && onStart();
            Utils.fetch('/upload', {
                method: 'POST',
                body: f,
                uploadProgress: function uploadProgress(percent) {
                    onProgress && onProgress(percent);
                }
            }).then(function (res) {
                onEnd && onEnd(res);
            });
            return;
        });
    },
    sort: function sort(obj, arr) {
        var str = arr.map(function (item) {
            return item + '=' + (obj[item] || '');
            return obj[item] ? item + '=' + obj[item] : '';
        }).filter(function (item) {
            return item;
        }).join('&');

        return str;
    },
    query: function query(url) {
        url = new URL(url);
        var search = url.search.slice(1);
        var query = {};
        search.split('&').map(function (item) {
            var _item$split = item.split('=');

            var _item$split2 = _slicedToArray(_item$split, 2);

            var key = _item$split2[0];
            var value = _item$split2[1];

            query[key] = value;
        });
        return query;
    },

    // 图片压缩，文件类型转换 etc
    zip: function zip(file) {
        var quality = arguments.length <= 1 || arguments[1] === undefined ? .01 : arguments[1];

        // canvas toBlob polyfill
        if (!HTMLCanvasElement.prototype.toBlob) {
            Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
                value: function value(callback, type, quality) {

                    var binStr = atob(this.toDataURL(type, quality).split(',')[1]),
                        len = binStr.length,
                        arr = new Uint8Array(len);

                    for (var i = 0; i < len; i++) {
                        arr[i] = binStr.charCodeAt(i);
                    }

                    callback(new Blob([arr], {
                        type: type || 'image/png'
                    }));
                }
            });
        }

        // 对于大于1.5M的图片做一个强制压缩
        var SIZE = file.size / 1024 / 1024;
        if (quality != 1 && SIZE >= 1.5) {
            quality = .5;
        }

        return new Promise(function (resolve, reject) {
            // alert(file.type)
            // 对于非图片文件，直接上传
            if (SIZE < 1.5 || quality >= 1 || quality <= 0 || !file.type.startsWith('image/')) return resolve(file);
            var canvas = document.createElement('canvas');

            // 获取到图片的宽高
            var url = window.URL.createObjectURL(file);
            // console.log('图片路径', url, file);
            // alert(file.type)
            var $img = document.createElement('img');
            $img.onload = function () {
                var _$img = $img;
                var width = _$img.width;
                var height = _$img.height;

                canvas.width = width;
                canvas.height = height;
                // document.body.appendChild(canvas)
                var cxt = canvas.getContext('2d');
                cxt.drawImage($img, 0, 0, canvas.width, canvas.height);
                $img = null;
                canvas.toBlob(function (Bob) {
                    resolve(Bob);
                }, file.type || "image/jpeg", quality);
            };

            // 加载错误，不是图片类型，直接返回原文件
            $img.onerror = function () {
                resolve(file);
            };
            $img.src = url;
        });
    },
    init: function init() {
        return new Promise(function (res) {
            Utils.loadImageUtil.webp().then(function (webp) {
                Utils.scroll.listen('lazy-load-img', Utils.loadImage.bind(Utils));
                res('异步执行完');
            });
        });
    }
};

// 在加载图片前，先加载校验是不是支持webp