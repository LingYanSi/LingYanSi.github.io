/*
* 写的有问题：当hashchange的时候，并没有触发渲染
*/
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
            var arr = location.hash.slice(2).split('/').map(function(ele) {
                ele = parseInt(ele,10) ;
                return ele
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
    var pageIndex = routerArr[1]?routerArr[1]:0;
    var $item = document.querySelector('.item');
    var LEN = List.length - 1; // 列表长度，页面总数

    var pageSwitch = {
        checkPageIndex: function(page,index){
            // 超出页码范围
            if(page>List.length-1 || page<0 ) return
            // 如果页码变化
            if(page!=currentPage) index = List[page].length-1 ;

            if(index> List[page].length-1){
                index = -1 ;
                page++ ;
                if(page>List.length-1 || page<0 ) return
                index = page<currentPage?List[page].length-1:(page>currentPage?-1:index) ;
            }else if(index<-1){
                index = -1 ;
                page-- ;
                if(page>List.length-1 || page<0 ) return
                index = page<currentPage?List[page].length-1:(page>currentPage?-1:index) ;
            }

            currentPage = page ;
            pageIndex = index ;
            router.setHash(currentPage + '/' + pageIndex);
        },
        next: function() {
            this.checkPageIndex(currentPage,pageIndex+1);
        },
        prev: function() {
            this.checkPageIndex(currentPage,pageIndex-1);
        },
        nextPage: function() {
            this.checkPageIndex(currentPage+1,pageIndex);
        },
        prevPage: function() {
            this.checkPageIndex(currentPage-1,pageIndex);
        },
        render: function() {
            $item.innerHTML = List[currentPage].map(function(ele, index) {
                if (index <= pageIndex) return ele
            }).join('');
        },
        init: function(){
            this.checkPageIndex(currentPage,pageIndex);
            this.render()
        }
    };

    pageSwitch.init();

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

    window.addEventListener('hashchange',function(){
        currentPage = router.getHash()[0] ;
        pageIndex = router.getHash()[1] ;
        pageSwitch.render();
    })

})(List, router);
