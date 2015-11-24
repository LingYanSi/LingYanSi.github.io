/*
* @Author: zikong
* @Date:   2015-09-28 17:23:06
* @Last Modified by:   zikong
* @Last Modified time: 2015-10-17 20:44:30
*/

'use strict';

// 一般而言，网站数据的存储方式有两种
// cookie 存储大小在4k左右，长度有限制，一般用于存储 uid/token
// token在每次请求服务器时，都会被带上，因此服务器可以校验用户是不是

/*
* encodeURIComponent
  该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。
  其他字符（比如 ：;/?:@&=+$,# 这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的。
*/
var LY = LY || {};
LY.cookie = (function () {

    var cookie = document.cookie;
    var obj = {
        cookieObj: {},
        // 添加一个cookie, timeEnd以秒为单位
        add: function add(name, value, timeEnd) {
            name = name && encodeURIComponent(name);
            value = value && encodeURIComponent(value);
            timeEnd = timeEnd * 1000;
            timeEnd = timeEnd ? new Date(new Date().getTime() + timeEnd).toUTCString() : new Date().toUTCString();
            document.cookie = name + '=' + value + ';expires=' + timeEnd;
        },
        // 移除cookie，可接受多个参数
        remove: function remove() {
            var arr = [].slice.call(arguments);
            for (var i = 0, len = arr.length; i < len; i++) {
                this.add(arr[i], '', 0);
            }
        },
        // 删除所有cookie
        removeAll: function removeAll() {
            var cookieArr = document.cookie.split(';');
            for (var i = 0, len = cookieArr.length; i < len; i++) {
                this.remove(cookieArr[i].split('=')[0]);
            }
        },
        // cookie是否存在
        contains: function contains(name) {
            this.getAll();
            return this.cookieObj[name] === undefined ? false : true;
        },
        // 获取指定key值的cookie
        getItem: function getItem(name) {
            this.getAll();
            return this.cookieObj[name];
        },
        // 获取所有cookie，返回一个 key-value 的对象
        getAll: function getAll() {
            this.cookieObj = {};
            var cookieArr = document.cookie.split(';');
            for (var i = 0, len = cookieArr.length; i < len; i++) {
                this.cookieObj[decodeURIComponent(cookieArr[i].split('=')[0])] = decodeURIComponent(cookieArr[i].split('=')[1]);
            }
            return this.cookieObj;
        }
    };
    return obj;
})();

/*
LY.cookie.add('wife1','songxiaofan',60*60*24);
LY.cookie.add('wife2','liqian',60*60*2);

console.log(LY.cookie.getAll())
LY.cookie.remove('wife1','wife2')
console.log(LY.cookie.getAll(),document.cookie )
*/
/*
* @Author: zikong
* @Date:   2015-10-12 00:12:45
* @Last Modified by:   zikong
* @Last Modified time: 2015-10-17 23:02:12
*/

'use strict';

var LY = LY || {};

LY.device = (function () {
    var nav = window.navigator.userAgent.toLowerCase();

    var obj = {
        isPhone: !!nav.match(/phone|ipad|android|pod/),
        isApp: !!nav.match('appname'),
        isIE: nav.match('ie'),
        isIphone: !!nav.match('iphone'),
        isAndroid: !!nav.match('android'),
        isWphone: !!nav.match('windows phone')
    };
    return obj;
})();
/*
* @Author: zikong
* @Date:   2015-09-29 17:04:38
* @Last Modified by:   zikong
* @Last Modified time: 2015-10-27 00:13:22
*/

'use strict';

// modal的层级 z-index 设置为 1000 ;
var LY = LY || {};
LY.modal = (function () {
    var $modal, $bgd, $main, $close, $content;
    // 样式
    var styleStr = '\n        #modal{\n            height:100%; width:100%;\n            position:fixed; top:0; left:0; z-index:1000; display:none;\n        }\n        .modal-bgd{\n            position:fixed;top:0;left:0;height:100%;width:100%;background:rgba(0,0,0,0.2);\n        }\n        .modal-main{\n            position:absolute; top:40%; left:50%;\n            -webkit-transform: translate(-50%,-50%) scale(0.1,0.1);\n            -ms-transform: translate(-50%,-50%) scale(0.1,0.1);\n            -moz-transform: translate(-50%,-50%) scale(0.1,0.1);\n            transform: translate(-50%,-50%) scale(0.1,0.1);\n            transition: all 0.1s linear ;\n            transform-origin: center;\n            padding:20px 10px;\n            background-color:#fff; background-clip: padding-box;\n            width:600px; max-height:60%;\n            box-shadow:0 0 8px rgb(0,100,200);\n            /*border: 4px solid rgba(0,0,0,0.2);*/\n            text-align:center;\n            overflow: hidden;\n        }\n        .modal-main-show{\n            -webkit-transform: translate(-50%,-50%) scale(1,1);\n            -ms-transform: translate(-50%,-50%) scale(1,1);\n            -moz-transform: translate(-50%,-50%) scale(1,1);\n            transform: translate(-50%,-50%) scale(1,1);\n        }\n        #modal-close{\n            position:absolute;\n            top:0; right: 0;\n            line-height:2em;\n            width:2em;\n            text-decoration:none;\n            color: inherit;\n        }\n        #modal-close:hover{\n            background: rgba(247,105,104,0.3);\n            border-bottom-left-radius: 100%;\n        }\n        #modal-butt{\n            padding-top:1em;\n        }\n        #modal-continue,#modal-cancel{\n            border:none; outline:none;\n            background: rgb(247,105,105);\n            color:#fff; line-height:1.8em; width: 6em;\n            display:inline-block;\n        }\n        #modal-cancel+#modal-continue{\n            margin-left:2em;\n        }\n    ';

    var modal = {
        init: function init() {
            // 添加样式
            var style = document.createElement('style');
            style.innerHTML = styleStr;
            style.id = 'modalStyle';
            document.head.appendChild(style);

            // 添加dom结构
            var dfg = document.createDocumentFragment();
            var container = document.createElement('div');
            container.style.cssText = '';
            container.id = 'modal';

            container.innerHTML = '<div class="modal-bgd" style=""></div>\n            <div class="modal-main" style="">\n                <a href="javascript:;" id="modal-close" class="modal-close" title="关闭">x</a>\n                <div class="modal-content">\n                </div>\n            </div>';
            dfg.appendChild(container);
            document.body.appendChild(dfg.querySelector('#modal'));

            $modal = document.querySelector('#modal');
            $bgd = document.querySelector('.modal-bgd');
            $main = document.querySelector('.modal-main');
            $content = document.querySelector('.modal-content');

            $close = document.querySelector('.modal-main>a');

            $modal.addEventListener('click', function (event) {
                var idName = event.target.id;
                if (event.target.classList.contains('modal-close')) {
                    modal.close();
                } else if (idName == 'modal-continue') {
                    modal.close();
                    modal.alertCb && modal.alertCb();
                } else if (idName == 'modal-cancel') {
                    modal.close();
                    modal.cancelCb && modal.cancelCb();
                } else if (event.target.className === 'modal-bgd') {
                    modal.close();
                }
            });
            window.addEventListener('keydown', function (event) {
                if (event.keyCode === 27) {
                    modal.close();
                }
            });
        },
        alertCb: null,
        cancelCb: null,
        alert: function alert(msg, callback) {
            // this.hideCloseBtn();
            var str = '<p>' + msg + '</p><div id="modal-butt"><button id="modal-continue">确认</button></div>';
            $content.innerHTML = str;
            this.open();
            this.alertCb = callback;
        },
        confirm: function confirm(msg, continueCb, cancelCb) {
            this.hideCloseBtn();
            var str = '<p>' + msg + '</p><div id="modal-butt"><button id="modal-cancel">取消</button><button id="modal-continue">确认</button></div>';
            $content.innerHTML = str;
            this.open();
            this.alertCb = continueCb;
            this.cancelCb = cancelCb;
        },
        tips: function tips(msg, time) {
            $content.innerHTML = msg || '';
            time = time || 1000;
            this.hideCloseBtn();
            this.open();
            setTimeout(this.close, time);
        },
        diy: function diy(html) {
            $content.innerHTML = html;
            console.log(111111111);
            this.open();
        },
        open: function open() {
            $modal.style.display = 'block';
            $modal.offsetWidth;
            $main.classList.add('modal-main-show');
        },
        hideCloseBtn: function hideCloseBtn() {
            $close.style.display = 'none';
        },
        close: function close() {
            $main.classList.remove('modal-main-show');
            $modal.style.display = 'none';
            $close.style.display = 'block';
        }
    };
    modal.init();
    return modal;
})();
/*
* @Author: zikong
* @Date:   2015-10-27 17:31:49
* @Last Modified by:   zikong
* @Last Modified time: 2015-11-01 18:53:35
*/

'use strict';

var PubSub = (function () {
    var cache = {};
    return {
        sub: function sub(key, fun) {
            cache[key] = fun;
        },
        removeSub: function removeSub(key) {
            delete cache[key];
        },
        removeAllSub: function removeAllSub() {
            for (key in cache) {
                delete cache[key];
            }
        },
        pub: function pub(key, data) {
            cache[key] && cache[key](key, data);
        }
    };
})();
/*
* @Author: zikong
* @Date:   2015-09-29 15:32:25
* @Last Modified by:   zikong
* @Last Modified time: 2015-10-17 22:53:28
*/

'use strict';

//   序列化表单
/*
* 其实说到form表单，提交的时候 name-value 这是一般的键值对形式
* method = get 的提交为显式的，提交数据会在url上以search形式表现
* method = post 为隐式的，提交数据不会在url上表现
*/
var LY = LY || {};

LY.serialize = (function () {
    var fn = function fn(id) {
        var $form = document.getElementById(id);

        var obj = {};
        var inputArr = [].slice.call($form.querySelectorAll('*'));

        var requireArr = [];
        inputArr.forEach(function (ele) {
            if (!ele.name) return;

            if (ele.type == "radio") {
                if (!obj[ele.name] && ele.checked) obj[ele.name] = ele.value;
            } else if (ele.type == 'checkbox') {
                obj[ele.name] = ele.checked;
            } else {
                obj[ele.name] = ele.value;
            }

            // 把必须要填的元素 统计缓存起来
            ele.hasAttribute('require') && requireArr.push(ele);
        });

        //
        var isSubmitAbel = true;
        requireArr.forEach(function (ele) {
            if (isSubmitAbel && !obj[ele.name]) {
                isSubmitAbel = false;
                if (ele.getAttribute('errormsg')) ;
                LY.modal.alert(ele.getAttribute('errormsg'));
            }
        });

        return obj;
    };

    return fn;
})();
/*
 * @Author: zikong
 * @Date:   2015-09-28 23:10:20
 * @Last Modified by:   zikong
 * @Last Modified time: 2015-10-17 20:42:35
 */

'use strict';

/*
    hash: "#11=2222222"
    host: "192.168.1.12:8000"
    hostname: "192.168.1.12"
    href: "http://192.168.1.12:8000/demo/flexable/index.html?a=b&c=1111#11=2222222"
    origin: "http://192.168.1.12:8000"
    pathname: "/demo/flexable/index.html"
    port: "8000"
    protocol: "http:"
    reload: reload()
    search: "?a=b&c=1111"
*/

var LY = LY || {};

LY.url = (function () {

    var obj = {
        // 获取当前url中的search字符串，并将其转换成对象
        getSearchObj: function getSearchObj() {
            return this.strToObj(location.search.slice(1));
        },
        // 获取当前url中的hash字符串，并将其转换成对象
        getHashObj: function getHashObj() {
            return this.strToObj(location.hash.slice(1));
        },
        // 把字符串转换成对象，并对字符串进行 decodeURIComponent 解码
        strToObj: function strToObj(str) {
            var arr = str.split('&');
            var obj = {};
            arr.forEach(function (ele) {
                var arr = ele.split('=');
                obj[arr[0]] = decodeURIComponent(arr[1]);
            });
            return obj;
        },
        // 对象转换成对象，并对字符串进行 encodeURIComponent 编码
        objToStr: function objToStr(obj) {
            var arr = [];
            for (var key in obj) {
                arr.push(key + '=' + encodeURIComponent(obj[key]));
            }
            return arr.join('&');
        }
    };
    return obj;
})();

/*
console.log(location)
console.log(location,LyURL.getSearchObj(),LyURL.getHashObj())

var str = LyURL.objToStr({name:'周恩来',refer:'http://www.baidu.com?s=嘿嘿'}) ;
console.log( LyURL.strToObj(str) );
*/