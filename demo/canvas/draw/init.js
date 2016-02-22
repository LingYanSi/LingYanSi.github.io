function $(s){
    return document.querySelector(s)
}

var cv = $('#canvas')
var ct = cv.getContext('2d')

var img = document.createElement('img')

// 图片加载成功后，画图到canvas
img.onload = function(){
    ct.drawImage(img,0,0,300,300)
    // 使用跨域图片，toDataURL会报错
}

// 本地选中文件后
$('input#file').onchange = function(){
    var file = this.files[0]
    if(!file) return
    img.src = URL.createObjectURL(file)
}

// 下载图片
$('a').addEventListener('click', function(){
    var url = cv.toDataURL('image/png')
    $('a').href = url
})
