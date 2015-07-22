
var router = (function() { // 管理路由，hash的获取，解析，设置
    var obj = {
        init: function(hash) {
            if (this.getHash().length == 0) {
                this.setHash('0/0');
            }
        },
        getHash: function() {
            var hash = (location.hash.slice(2));
            if (hash.length == 0) this.setHash('0/0');
            var arr = location.hash.slice(2).split('/').filter(function(ele) {
                if (parseInt(ele, 10) >= 0) {
                    return true;
                }
            });
            return arr;
        },
        setHash: function(hash) {
            location.href = '#/' + hash;
        }
    };
    obj.init();
    return obj;
})();

var slider = (function(List, router) { // 根据数据，和路由来控制页面的渲染
    var routerArr = router.getHash();
    var currentPage = routerArr[0]; // 当前页码
    var pageIndex = routerArr.length >= 2 ? (routerArr[1] - 1) : -1;
    var $item = document.querySelector('.item');
    var LEN = List.length - 1; // 列表长度，页面总数

    var pageSwitch = {
        next: function() {
            pageIndex++; 
            var arr = List[currentPage];
            if (pageIndex > arr.length - 1) {
                currentPage++;
                if (currentPage > LEN) return currentPage--, pageIndex = arr.length - 1;
                pageIndex = -1;
                this.next();
                return;
            } else {
                this.render(arr);
            }
        },
        prev: function() {
            pageIndex--;
            var arr = List[currentPage];
            if (pageIndex < 0) {
                currentPage--;
                if (currentPage < 0) return currentPage++, pageIndex = 0;
                pageIndex = List[currentPage].length;
                this.prev();
                return;
            } else {
                this.render(arr);
            }
        },
        nextPage: function() {
            currentPage++;
            var arr = List[currentPage];
            if (currentPage > LEN) return currentPage--;
            pageIndex = arr.length - 1;
            this.render(arr);

        },
        prevPage: function() {
            currentPage--;
            var arr = List[currentPage];
            if (currentPage < 0) return currentPage++;
            pageIndex = arr.length - 1;
            this.render(arr);
        },
        render: function(arr) {
            $item.innerHTML = arr.map(function(ele, index) {
                if (index <= pageIndex) return ele
            }).join('');

            router.setHash(currentPage + '/' + pageIndex);
        }
    };

    pageSwitch.next();

    window.addEventListener('keydown', function(event) {
        // console.log(event.keyCode)
        if (event.keyCode == 40) { // 下一步
            pageSwitch.next();
        } else if (event.keyCode == 38) { // 上一步
            pageSwitch.prev();
        } else if (event.keyCode == 37) { // 上一页
            pageSwitch.prevPage();
        } else if (event.keyCode == 39) { // 下一页
            pageSwitch.nextPage();
        }
    });

})(List, router);
