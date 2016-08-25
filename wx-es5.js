'use strict';

// 图片预览
;(function () {

    window.wx = window.wx || {};

    // 当前地址
    var currentUrl = '';
    // 图片地址数组
    var urls = [];
    // 元素
    var $ele = null;
    // 窗口是否打开
    var open = false;
    // 当前位置
    var current = 0;
    // 图片预览是否已经加载过
    var isLoad = false;
    // 渲染
    function render() {
        var urls = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        var html = urls.map(function (url, index) {
            if (url === currentUrl) {
                current = index - 1;
            }
            return '<div class="img-item">\n                <img src="' + url + '" alt="" />\n            </div>';
        }).join('');

        $ele.find('.img-list').html(html);
        $ele.find('.next').click();
        // 显示图片预览
        $ele.show();
        open = true;
    }

    // 复写previewImage
    wx.previewImage = function (args) {

        currentUrl = args.current;
        urls = args.urls || [currentUrl];

        // 初始化
        if (!isLoad) {
            $('head').append('<style>' + STYLE + '</style>');
            $('body').append(TEMPLATE);
            isLoad = true;
            $ele = $('#wx-previewImage');

            $ele.on('click', '.prev', function () {
                // 上一个
                current--;
                if (current < 0) {
                    current = urls.length - 1;
                }
                $ele.find('.img-item').eq(current).addClass('show').siblings().removeClass('show');
                $ele.find('.status').text(current + 1 + '/' + urls.length);
            }).on('click', '.next', function () {
                // 下一个
                current++;
                if (current >= urls.length) {
                    current = 0;
                }
                $ele.find('.img-item').eq(current).addClass('show').siblings().removeClass('show');
                $ele.find('.status').text(current + 1 + '/' + urls.length);
            }).on('mousemove', '.img-list', function (event) {
                // 修改光标icon

                var cursor = event.clientX / $(window).width() > .5 ? 'url(http://img.t.sinajs.cn/t6/style/images/common/pic_next.cur), pointer' : 'url(http://img.t.sinajs.cn/t6/style/images/common/pic_prev.cur), pointer';
                $(this).css('cursor', cursor);
            }).on('click', '.img-list', function (event) {
                // 上一个/下一个
                event.pageX / $('body').width() > .5 ? $ele.find('.next').click() : $ele.find('.prev').click();
            }).on('click', '.close', function (event) {
                // 关闭图片预览
                $ele.hide();
                open = false;
            });

            $(window).on('keyup', function (event) {
                if (!open) return;

                var keycode = event.keyCode;

                if (keycode == 37) {
                    $ele.find('.prev').click();
                } else if (keycode == 39) {
                    $ele.find('.next').click();
                } else if (keycode == 27) {
                    $ele.find('.close').click();
                }
            });
        }

        // 渲染界面
        render(urls);
    };

    // 样式
    var STYLE = '\n        .wx-pI-layer {\n            position: fixed; top:0; left:0; width:100%; height: 100%; z-index: 900; background: rgba(0,0,0,.5);\n        }\n\n        .wx-pI-main {\n            overflow: hidden;\n            height: 100%;\n        }\n\n        .wx-pI-main button {\n            position: absolute;\n            top: 50%;\n            left: 10%;\n            z-index: 1;\n            border: none;\n            outline: none;\n            height: 50px;\n            width: 50px;\n            margin-top: -25px;\n            display: none;\n        }\n        .wx-pI-main button.next {\n            right: 10%;\n            left: auto;\n        }\n\n        .img-list {\n            height: 90%;\n            width: 80%;\n            margin: 0 auto;\n            background: #000;\n            cursor: pointer;\n            -ms-transform: translate(0, 5.55555%);\n            -webkit-transform: translate(0, 5.55555%);\n            transform: translate(0, 5.55555%);\n        }\n\n        .img-item.show {\n            display: block;\n        }\n\n        .img-item {\n            display: none;\n            height: 100%;\n            -webkit-user-select:none;\n            -moz-user-select:none;\n            -ms-user-select:none;\n            user-select:none;\n        }\n        .img-list  img {\n            max-width: 100%;\n            max-height: 100%;\n            height: auto;\n            width: auto;\n            margin: 0 auto;\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            -ms-transform: translate(-50%, -50%);\n            -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n        }\n\n        .wx-pI-main .status {\n            position: absolute;\n            bottom: 4%;\n            left: 50%;\n            color: #fff;\n            z-index: 5;\n            padding: 10px 20px;\n            font-size: 1.2em;\n            -ms-transform: translate(-50%, 0);\n            -webkit-transform: translate(-50%, 0);\n            transform: translate(-50%, 0);\n        }\n\n        .wx-pI-main .close {\n            position: absolute;\n            right: 10%;\n            top: 5%;\n            margin: -12px -12px 0 0;\n            border-radius: 50%;\n            height: 38px;\n            width: 38px;\n            z-index: 22;\n            cursor: pointer;\n            background-image: url(http://img.t.sinajs.cn/t6/style/images/layer/multipic_ico.png?id=201505071104);\n        }\n    ';

    // 模板
    var TEMPLATE = '<div id="wx-previewImage">\n                                    <div class="wx-pI-layer">\n                                        <div class="wx-pI-main">\n                                            <div class="close"></div>\n                                            <button class="prev">上</button>\n                                            <div class="img-list"></div>\n                                            <button class="next">下</button>\n                                            <p class="status"></p>\n                                        </div>\n                                    </div>\n                                </div>';
})();

wx.previewImage({
    current: 'http://ww2.sinaimg.cn/mw1024/69b8b46egw1etud17q77zj20rs0r315z.jpg',
    urls: ['http://ww3.sinaimg.cn/mw1024/69b8b46egw1f5h32f4t07j20k00qojwp.jpg', 'http://ww2.sinaimg.cn/mw1024/69b8b46egw1etud17q77zj20rs0r315z.jpg', 'http://ww3.sinaimg.cn/mw1024/69b8b46egw1f5h32f4t07j20k00qojwp.jpg', 'http://ww1.sinaimg.cn/mw1024/d90d1513gw1f71cfayl98j206s06rwel.jpg', 'http://ww4.sinaimg.cn/mw690/6aa09e8fjw1f72be9a6ifj20qo14bgvo.jpg']
});
 
