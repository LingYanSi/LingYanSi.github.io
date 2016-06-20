function testWebp(){
    var webp = new Image()
    webp.onload = function(){
        console.log('支持webp');
    }
    webp.onerror = function(){
        console.log('不支持webp')
    }
    webp.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vlAAAA='
}

testWebp()
