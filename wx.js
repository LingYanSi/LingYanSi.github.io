
// 图片预览
;(function(){

    window.wx = window.wx || {}

    // 当前地址
    var currentUrl = ''
    // 图片地址数组
    var urls = []
    // 元素
    var $ele = null
    // 窗口是否打开
    var open = false
    // 当前位置
    var current = 0
    // 图片预览是否已经加载过
    var isLoad = false
    // 渲染
    function render(urls = []){
        var html = urls.map(function(url, index) {
            if (url === currentUrl) {
                current = index - 1
            }
            return `<div class="img-item">
                <img src="${url}" alt="" />
            </div>`
        }).join('')

        $ele.find('.img-list').html(html)
        $ele.find('.next').click()
        // 显示图片预览
        $ele.show()
        open = true
    }


    // 复写previewImage
    wx.previewImage = function(args) {

        currentUrl = args.current
        urls = args.urls || [currentUrl]

        // 初始化
        if (!isLoad) {
            $('head').append(`<style>${STYLE}</style>`)
            $('body').append(TEMPLATE)
            isLoad = true
            $ele = $('#wx-previewImage')

            $ele.on('click', '.prev', function() {
                // 上一个
                current--
                if (current < 0) {
                    current = urls.length - 1
                }
                $ele.find('.img-item').eq(current).addClass('show').siblings().removeClass('show')
                $ele.find('.status').text(`${current+1}/${urls.length}`)
            }).on('click', '.next', function() {
                // 下一个
                current++
                if (current >= urls.length) {
                    current = 0
                }
                $ele.find('.img-item').eq(current).addClass('show').siblings().removeClass('show')
                $ele.find('.status').text(`${current+1}/${urls.length}`)
            }).on('mousemove', '.img-list', function(event){
                // 修改光标icon

                var cursor = event.clientX/$(window).width() > .5 ? 'url(http://img.t.sinajs.cn/t6/style/images/common/pic_next.cur), pointer' : 'url(http://img.t.sinajs.cn/t6/style/images/common/pic_prev.cur), pointer'
                $(this).css('cursor', cursor)
            }).on('click', '.img-list', function(event){
                // 上一个/下一个
                event.pageX/$('body').width() > .5 ? $ele.find('.next').click() : $ele.find('.prev').click()
            }).on('click', '.close', function(event){
                // 关闭图片预览
                $ele.hide()
                open = false
            })

            $(window).on('keyup', function(event){
                if(!open) return

                var keycode = event.keyCode

                if(keycode == 37){
                    $ele.find('.prev').click()
                }else if(keycode == 39){
                    $ele.find('.next').click()
                }else if(keycode == 27){
                    $ele.find('.close').click()
                }
            })
        }

        // 渲染界面
        render(urls)
    }

    // 样式
    var STYLE = `
        .wx-pI-layer {
            position: fixed; top:0; left:0; width:100%; height: 100%; z-index: 900; background: rgba(0,0,0,.5);
        }

        .wx-pI-main {
            overflow: hidden;
            height: 100%;
        }

        .wx-pI-main button {
            position: absolute;
            top: 50%;
            left: 10%;
            z-index: 1;
            border: none;
            outline: none;
            height: 50px;
            width: 50px;
            margin-top: -25px;
            display: none;
        }
        .wx-pI-main button.next {
            right: 10%;
            left: auto;
        }

        .img-list {
            height: 90%;
            width: 80%;
            margin: 0 auto;
            background: #000;
            cursor: pointer;
            -ms-transform: translate(0, 5.55555%);
            -webkit-transform: translate(0, 5.55555%);
            transform: translate(0, 5.55555%);
        }

        .img-item.show {
            display: block;
        }

        .img-item {
            display: none;
            height: 100%;
            -webkit-user-select:none;
            -moz-user-select:none;
            -ms-user-select:none;
            user-select:none;
        }
        .img-list  img {
            max-width: 100%;
            max-height: 100%;
            height: auto;
            width: auto;
            margin: 0 auto;
            position: absolute;
            top: 50%;
            left: 50%;
            -ms-transform: translate(-50%, -50%);
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }

        .wx-pI-main .status {
            position: absolute;
            bottom: 4%;
            left: 50%;
            color: #fff;
            z-index: 5;
            padding: 10px 20px;
            font-size: 1.2em;
            -ms-transform: translate(-50%, 0);
            -webkit-transform: translate(-50%, 0);
            transform: translate(-50%, 0);
        }

        .wx-pI-main .close {
            position: absolute;
            right: 10%;
            top: 5%;
            margin: -12px -12px 0 0;
            border-radius: 50%;
            height: 38px;
            width: 38px;
            z-index: 22;
            cursor: pointer;
            background-image: url(http://img.t.sinajs.cn/t6/style/images/layer/multipic_ico.png?id=201505071104);
        }
    `

    // 模板
    var TEMPLATE = `<div id="wx-previewImage">
                                    <div class="wx-pI-layer">
                                        <div class="wx-pI-main">
                                            <div class="close"></div>
                                            <button class="prev">上</button>
                                            <div class="img-list"></div>
                                            <button class="next">下</button>
                                            <p class="status"></p>
                                        </div>
                                    </div>
                                </div>`

})();

wx.previewImage({
    current: 'http://ww2.sinaimg.cn/mw1024/69b8b46egw1etud17q77zj20rs0r315z.jpg',
    urls: [
        'http://ww3.sinaimg.cn/mw1024/69b8b46egw1f5h32f4t07j20k00qojwp.jpg',
        'http://ww2.sinaimg.cn/mw1024/69b8b46egw1etud17q77zj20rs0r315z.jpg',
            'http://ww3.sinaimg.cn/mw1024/69b8b46egw1f5h32f4t07j20k00qojwp.jpg',
            `http://ww1.sinaimg.cn/mw1024/d90d1513gw1f71cfayl98j206s06rwel.jpg`,
            `http://ww4.sinaimg.cn/mw690/6aa09e8fjw1f72be9a6ifj20qo14bgvo.jpg`
    ]
})

wx.previewImage({
    current: 'http://ww2.sinaimg.cn/mw1024/69b8b46egw1etud17q77zj20rs0r315z.jpg',
    urls: [
        'http://ww3.sinaimg.cn/mw1024/69b8b46egw1f5h32f4t07j20k00qojwp.jpg',
        'http://ww2.sinaimg.cn/mw1024/69b8b46egw1etud17q77zj20rs0r315z.jpg'
    ]
})
