window.wx = window.wx || {}

wx.previewImage = function(URL, urlArr) {
    // 去创建一个区域
    var pI = wx.previewImage
    if (!pI.isLoad) {
        $('head').append(`<style>${pI.STYLE}</style>`)
        $('body').append(wx.previewImage.TEMPLATE)
        pI.isLoad = true
        pI.open = true
        pI.$ele = $('#wx-previewImage')

        pI.$ele.on('click', '.prev', function() {
            pI.current--
                if (pI.current < 0) {
                    pI.current = urlArr.length - 1
                }
            $ele.find('.img-item').eq(pI.current).addClass('show').siblings().removeClass('show')
        }).on('click', '.next', function() {
            pI.current++
                if (pI.current >= urlArr.length) {
                    pI.current = 0
                }
            $ele.find('.img-item').eq(pI.current).addClass('show').siblings().removeClass('show')
        })

        $(window).on('keyup', function(event){
            if(!pI.open) return

            var keycode = event.keyCode

            if(keycode == 37){
                $ele.find('.prev').click()
            }else if(keycode == 39){
                $ele.find('.next').click()
            }else if(keycode == 27){
                $ele.hide()
            }
        })
    }

    $ele = pI.$ele
    $ele.show()
        // 渲染图片
    var html = urlArr.map(function(url, index) {
        if (url === URL) {
            pI.current = index
        }
        return `<div class="img-item">
            <img src="${url}" alt="" />
        </div>`
    }).join('')

    $ele.find('.img-list').html(html)

    $ele.find('.img-item').eq(pI.current).addClass('show')



}
wx.previewImage.$ele = null
wx.previewImage.open = false
wx.previewImage.current = 0
wx.previewImage.isLoad = false
wx.previewImage.STYLE = `
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
    }
    .wx-pI-main button.next {
        right: 10%;
        left: auto;
    }

    .img-list {
        height: 100%;
    }

    .img-item.show {
        display: block;
    }

    .img-item {
        display: none;
        height: 100%;
    }
    .img-list  img {
        max-width: 80%;
        max-height: 90%;
        height: auto;
        width: auto;
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`
wx.previewImage.TEMPLATE = `<div id="wx-previewImage">
                                <div class="wx-pI-layer">
                                    <div class="wx-pI-main">
                                        <button class="prev">上</button>
                                        <div class="img-list"></div>
                                        <button class="next">下</button>
                                    </div>
                                </div>
                            </div>`

wx.previewImage('http://ww2.sinaimg.cn/mw1024/69b8b46egw1etud17q77zj20rs0r315z.jpg', [
    'http://ww3.sinaimg.cn/mw1024/69b8b46egw1f5h32f4t07j20k00qojwp.jpg',
    'http://ww2.sinaimg.cn/mw1024/69b8b46egw1etud17q77zj20rs0r315z.jpg'
])
