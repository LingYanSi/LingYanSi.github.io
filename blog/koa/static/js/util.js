'use strict';

// 简单队列，只执行最后一次被触发的事件
var Queue = function Queue(fn) {
    var time = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    this.queue = [];
    this.fn = fn;
    var that = this;
    this.tick = function () {
        this.queue.forEach(clearTimeout);
        this.queue.push(setTimeout(function () {
            that.fn();
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
            console.log(cache);
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

            trigger: fn
        };

        return scroll;
    }(),
    loadAsyn: function loadAsyn($ele) {
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
    setSrc: function setSrc($ele, data) {
        console.log(data.type);
        switch (data.type) {
            case 'layzImg':
                $ele.src = data.url;
                break;
            case 'lazyBgd':
                $ele.style.backgroundImage = 'url(' + data.url + ')';
                break;
            case 'lazyPoster':
                $ele.poster = data.url;
                break;
        }
    },
    loadImage: function loadImage() {
        var _this = this;

        var $eles = Array.from(document.querySelectorAll('.lazy-load-img'));
        if (!$eles.length) {
            return;
        }

        $eles.some(function ($ele) {
            var data = _this.loadAsyn($ele);

            var src = data.url;
            if (!src) {
                return;
            }
            // console.log($ele.getBoundingClientRect().top);
            // 图片在上面
            if ($ele.getBoundingClientRect().top < -$ele.clientHeight) {
                return;
            }
            // 图片在下面
            if ($ele.getBoundingClientRect().top > window.innerHeight) {
                return true;
            }
            var $img = new Image();
            $img.onload = $img.onerror = $img.onabort = function () {
                // console.log('家再吃个盖饭');
                $img.onload = $img.onerror = $img.onabort = null;
                $img = null;
                // console.log('loaded====>',data);
                _this.setSrc($ele, data);
                $ele.classList.remove('lazy-load-img');
            };

            $img.src = src;

            // 图片已经加载过
            if ($img.with || $img.height || $img.complete) {
                // console.log('fuck');
                $img.onload = $img.onerror = $img.onabort = null;
                $img = null;
                _this.setSrc($ele, data);
                $ele.classList.remove('.lazy-load-img');
            }
        });
    }
};

Utils.scroll.listen('lazy-load-img', Utils.loadImage.bind(Utils));