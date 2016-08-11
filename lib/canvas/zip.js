// 压缩图片，手机用户直接上传图片，会显得图片有些过大了

function zip(file, width, height){
    let canvas = document.createElement('canvas')
    const url = window.URL.createObjectURL(file)
    let $img = document.createElement('img')
    $img.onload = function(){
        console.log(img.width, img.height)
    }
    $img.src = url

}
