// 常去网站渲染
document.querySelector('.nav').innerHTML = data.map(function(ele, index, arr) {
    return '<li><a href="' + ele.url + '" target="_blank" >' + ele.name + '</a></li>'
}).join('');

(function() {
    var $searchInput = document.querySelector('.search-input');

    $searchInput.addEventListener('keydown', search);
    document.querySelector('.search-butt').addEventListener('click', search);

    // 搜索
    function search(event) {
        if (event.currentTarget.className === 'search-input' && event.keyCode != 13) return
        var value = $searchInput.value;
        if (value) {
            window.open('https://www.baidu.com/s?wd=' + value);
        }
    }
})();
