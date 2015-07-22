/*
 * 并没有做好模块化，其实应该只提供一个骨架，也就是上下/左右滑动的监听
 * 1.初始化
        获取父元素/子元素，而后初始化子元素的位置，【这方面的工作，也可以让css3来做】
 * 2.事件
        touchstart
        touchmove
        touchend
 * 3.接口，对外提供的接口有三
        其实也就是滑动前，滑动中，滑动结束
        每一次滑动结束后，需要对一些dom进行一些重置工作，虽然说这些充值工作，也可以在touchstart的时候进行
        但那样会影响用户体现
   4.参数，有时候需要另外一些参数
        初始化的时候，需要外界传递一个currentPage当前页面，也可以通过参数来传递进来的
 */
var Lunbo = function(arg) { //以对象形式传递参数
    var idname = arg.idname,
        top = arg.top,
        autoPlay = !!arg.autoPlay,
        loop = !!arg.loop,
        dianNav = !!arg.dianNav,
        callback = arg.callback,
        buttPrev = arg.buttPrev,
        buttNext = arg.buttNext,
        keyEvent = arg.keyEvent
        currentPage = isNaN(parseInt(arg.currentPage,10))?0:arg.currentPage ;
    var isPhone = !!navigator.userAgent.toLowerCase().match(/android|phone|pad/g);
    var $id = document.querySelector('#' + idname);

    var $item = [].slice.call($id.firstElementChild.children);
    var $dianItem;
    var idWidth = $id.offsetWidth,
        idHeight = $id.offsetHeight;

    var topMin = -idHeight,
        topCurrent = 0,
        topMax = idHeight,
        leftMin = 0,
        leftMax = 0,
        leftCurrent = 0,
        toLeft = false,
        len = $item.length,
        timeIn ;

    if (top == 'left') //左右滑动
    {
        toLeft = true,
        topMin = 0,
        topMax = 0,
        topCureent = 0,
        leftMin = -idWidth,
        leftMax = idWidth,
        leftCurrent = 0;
    }

    $item.forEach(function(ele, index) {
        if (index != currentPage) ele.style.webkitTransform = 'translate3d(' + leftMax + 'px,' + topMax + 'px,0)';
    });

 /*   if (dianNav) dianInit();
    if (autoPlay) start();

    buttEvent(); // 按钮事件*/

    // if (!isPhone) {
    //     window.addEventListener('keyup', function(event) { // 按键监听
    //         if (!keyEvent) return
    //         var index;
    //         if (event.keyCode == 40 || event.keyCode == 39) index = setPage((currentPage + 1)), toWhere(index, 'next');
    //         else if (event.keyCode == 38 || event.keyCode == 37) index = setPage((currentPage - 1)), toWhere(index, 'prev');
    //     });
    // }

    var id = $id ;
    var xx, XX, currentDom, prevDom, nextDom, swipeX, swipeY, cha, chaCache;
    var mouseStart, mouseMove, mouseEnd, isPhone;
    var time = toLeft ? (400 + 50) : (400 + 200);
    var time1 = new Date().getTime();
    var time2 = 0;
    var TRANSTION = 'all 0.4s ease' ;

    mouseStart = isPhone ? 'touchstart' : 'mousedown';
    mouseMove = isPhone ? 'touchmove' : 'mousemove';
    mouseEnd = isPhone ? 'touchend' : 'mouseup';

    /*----------初始化一下----------*/
    prevDom = $item[currentPage - 1] ? $item[currentPage - 1] : $item[len - 1];
    nextDom = $item[currentPage + 1] ? $item[currentPage + 1] : $item[0];
    currentDom = $item[currentPage];
    resetStyle();

    id.addEventListener(mouseStart, function(event) {
        touchStart(event);
    });
    id.addEventListener(mouseMove, function(event) {
        touchMove(event);
    });
    id.addEventListener(mouseEnd, function(event) {
        touchEnd(event);
    });

    function touchStart(event) { // 开始滑动
        cha = 0;
        timeMend = timeMstart = time1 = new Date().getTime();
        if (time1 - time2 <= time) {
            swipeX = false;
            swipeY = false;
            return
        }
        if (autoPlay) stop();
        xx = isPhone ? event.targetTouches[0].screenX : event.pageX;
        yy = isPhone ? event.targetTouches[0].screenY : event.pageY;
        XX = xx;
        YY = yy;

        swipeY = true;
        swipeX = true;
    }

    function touchMove(event) { // 滑动中
        XX = isPhone ? event.targetTouches[0].screenX : event.pageX;
        YY = isPhone ? event.targetTouches[0].screenY : event.pageY;

        if (swipeY && (!swipeX || Math.abs(XX - xx) - Math.abs(YY - yy) < 0)) {
            swipeX = false;
            if (!toLeft) {
                event.stopPropagation();
                event.preventDefault();
                cha = YY - yy;
                if (cha >= 0) {
                    if (len > 2) nextDom.style.cssText += ';-webkit-transform:translate3d(0,' + (topMax) + 'px,0);'; // 避免因为滑动过快引起的bug
                    if (!loop && currentPage == 0) return cha = 0;
                    currentDom.style.webkitTransformOrigin = 'center 125%';
                    currentDom.style.cssText += ';-webkit-transform:translate3d(0,0,0) scale3d(' + (1 - cha / topMax / 4) + ',' + (1 - cha / topMax / 4) + ',1);';
                    prevDom.style.cssText += ';-webkit-transform:translate3d(0,' + (cha + topMin) + 'px,0);';
                } else {
                    if (len > 2) prevDom.style.cssText += ';-webkit-transform:translate3d(0,' + (topMax) + 'px,0);'; // 避免因为滑动过快引起的bug
                    if (!loop && currentPage == len - 1) return cha = 0;
                    currentDom.style.webkitTransformOrigin = 'center -25%';
                    currentDom.style.cssText += ';-webkit-transform:translate3d(0,0,0) scale3d(' + (1 + cha / topMax / 4) + ',' + (1 + cha / topMax / 4) + ',1);';
                    nextDom.style.cssText += ';-webkit-transform:translate3d(0,' + (topMax + cha) + 'px,0); ';
                }
            }
        }
        
        if (swipeX && (!swipeY || Math.abs(XX - xx) - Math.abs(YY - yy) > 0)) {
            swipeY = false;
            if (toLeft) {
                event.stopPropagation();
                event.preventDefault();
                cha = XX - xx;
                if (cha >= 0) {
                    if (len > 2) nextDom.style.cssText += ';-webkit-transform:translate3d(' + leftMax + 'px,0,0);'; // 避免因为滑动过快引起的bug
                    if (!loop && currentPage == 0) return cha = 0;
                    currentDom.style.cssText += '-webkit-transform:translate3d(' + (cha) + 'px,0,0);';
                    prevDom.style.cssText += ';-webkit-transform:translate3d(' + (leftMin + cha) + 'px,0,0);';
                } else {
                    if (len > 2) prevDom.style.cssText += ';-webkit-transform:translate3d(' + leftMax + 'px,0,0);'; // 避免因为滑动过快引起的bug
                    if (!loop && currentPage == len - 1) return cha = 0;
                    currentDom.style.cssText += ';-webkit-transform:translate3d(' + cha + 'px,0,0);';
                    nextDom.style.cssText += ';-webkit-transform:translate3d(' + (leftMax + cha) + 'px,0,0);';
                }
            }
        }
    }

    function touchEnd(event) { // 滑动结束
        if (cha == 0) {
            swipeY = false;
            swipeX = false;
            return;
        }
        var scale = cha > 0 ? (1 - cha / topMax / 4 * 1.4) : (1 + cha / topMax / 4 * 1.4);
        scale.toFixed(1);
        if (!toLeft && swipeY) // 上下滑动
        {
            time2 = new Date().getTime();
            if (cha > 0) {
                currentDom.style.webkitTransition = TRANSTION ;
                prevDom.style.webkitTransition = TRANSTION ;
                if (cha > 50) {
                    currentDom.style.webkitTransform = 'scale3d(' + scale + ',' + scale + ',1)';
                    prevDom.style.webkitTransform = 'translate3d(0,0,0)';

                    currentPage--;
                    currentPage = setPage(currentPage);
                } else {
                    currentDom.style.webkitTransform = 'translate3d(0,0,0)';
                    prevDom.style.webkitTransform = 'translate3d(0,0,0)';
                }
            } else {
                currentDom.style.webkitTransition = TRANSTION ;
                nextDom.style.webkitTransition = TRANSTION ;
                if (cha < -50) {
                    currentDom.style.webkitTransform = 'scale3d(' + scale + ',' + scale + ',1)';
                    nextDom.style.webkitTransform = 'translate3d(0,0,0)';
                    currentPage++;
                    currentPage = setPage(currentPage);
                } else {
                    currentDom.style.webkitTransform = 'translate3d(0,0,0)';
                    nextDom.style.webkitTransform = 'translate3d(0,' + (topMax) + 'px,0)';
                }
            }
        }
        if (toLeft && swipeX) // 左右滑动
        {
            time2 = new Date().getTime();
            if (cha > 0) {
                currentDom.style.webkitTransition = TRANSTION ;
                prevDom.style.webkitTransition = TRANSTION ;
                if (cha > 50) {
                    currentDom.style.webkitTransform = 'translate3d(' + leftMax + 'px,0,0)';
                    prevDom.style.webkitTransform = 'translate3d(0,0,0)';
                    currentPage--;
                    currentPage = setPage(currentPage);
                } else {
                    currentDom.style.webkitTransform = 'translate3d(0,0,0)';
                    prevDom.style.webkitTransform = 'translate3d(' + leftMin + 'px,0,0)';
                }
            } else {
                currentDom.style.webkitTransition = TRANSTION ;
                nextDom.style.webkitTransition = TRANSTION ;
                if (cha < -50) {
                    currentDom.style.webkitTransform = 'translate3d(' + leftMin + 'px,0,0)';
                    nextDom.style.webkitTransform = 'translate3d(0,0,0)';
                    currentPage++;
                    currentPage = setPage(currentPage);
                } else {
                    currentDom.style.webkitTransform = 'translate3d(0,0,0)';
                    nextDom.style.webkitTransform = 'translate3d(' + leftMax + 'px,0,0)';
                }
            }
        }
        swipeY = false;
        swipeX = false;
        if (autoPlay) start();
        if (dianNav) dianMove();
        chaCache = cha;

        if (callback) {
            setTimeout(function() {
                callback(currentPage);
            }, 100)
        }
    }
    /*---------------------------------------问题在这里------------------------------------------------------------*/
    $item.forEach(function(ele) {
        ele.addEventListener('webkitTransitionEnd', function() {
            if (chaCache != 0) { // 因为有两个dom会发生transition，这样做是为了让其只执行一次
                var cha = chaCache;
                chaCache = 0;
                setDom(cha); //在mx3系统浏览器，uc浏览器中，滑动结束后prevDom,nextDom，表现为transform没改变，z-index的改变也显得很滞后
                // alert(111); // 阻塞滞后
            }
        });
    });

    // 通过设置z-index来解决层级问题
    function setDom(chaCa) { // 初始化工作，不放在touchstart时执行，而是在滑动结束的时候执行，这样体验会更好些

        currentDom.style.webkitTransition = 'none';
        prevDom.style.webkitTransition = 'none';
        nextDom.style.webkitTransition = 'none';

        if (cha < 50 && cha > -50) return;
        prevNextHidden(chaCa); // 修改visibility/z-index，
        prevDom = $item[currentPage - 1] ? $item[currentPage - 1] : $item[len - 1]; // 重置 上一个/当前/下一个
        nextDom = $item[currentPage + 1] ? $item[currentPage + 1] : $item[0];
        currentDom = $item[currentPage];

        resetStyle();
    };

    function prevNextHidden(cha) {
        var dom;
        if (cha >= 50) dom = nextDom;
        else if (cha <= -50) dom = prevDom;

        if (toLeft) dom.style.visibility = 'hidden';
        else dom.style.cssText += ';visibility:hidden; z-index:none;';
    };
    function resetStyle() {
        if (!toLeft) // 
        {
            currentDom.style.cssText += '; visibility:visible; -webkit-transform:translate3d(0,0,0); z-index:1;';
            prevDom.style.cssText += '; visibility:visible; -webkit-transform:translate3d(' + leftMin + 'px,' + topMin + 'px,0); z-index:2;  ';
            nextDom.style.cssText += '; visibility:visible; -webkit-transform:translate3d(' + leftMin + 'px,' + topMax + 'px,0); z-index:2;  ';
        } else {
            currentDom.style.cssText += ';-webkit-transform:translate3d(0,0,0); visibility:visible;';
            prevDom.style.cssText += ';-webkit-transform:translate3d(' + leftMin + 'px,' + topMin + 'px,0); visibility:visible; ';
            nextDom.style.cssText += ';-webkit-transform:translate3d(' + leftMin + 'px,' + topMax + 'px,0); visibility:visible; ';
        }
    }

    function setPage(page) { //设置page
        if (page > len - 1) {
            page = 0;
            if (!loop) page = len - 1;
        } else if (page < 0) {
            page = len - 1;
            if (!loop) page = 0;
        }
        return page;
    }
/*
    function toWhere(index, dir) { //主要是给左右点击事件使用
        var index = setPage(index);
        if (index === currentPage) return

        currentDom.style.webkitTransition = 'none';
        prevDom.style.webkitTransition = 'none';
        nextDom.style.webkitTransition = 'none';

        currentDom = $item[currentPage];
        nextDom = $item[index];
        if (autoPlay) stop();
        var leftPrev, leftNext, topPrev, topNext;
        if (dir == 'next') //下一张
        {
            leftPrev = leftMax,
            topPrev = topMax,
            leftNext = leftMin,
             topNext = topMin;
            chaCache = 100;
        } else {
            leftPrev = leftMin,
            topPrev = topMin,
            leftNext = leftMax,
            topNext = topMax;
            chaCache = -100;
        }
        nextDom.style.cssText += '; visibility:visible; -webkit-transform:translate3d(' + leftPrev + 'px,' + topPrev + 'px,0);  ';
        // console.log(nextDom.getBoundingClientRect().width);

        currentDom.style.webkitTransition = TRANSTION ;
        nextDom.style.webkitTransition = TRANSTION ;

        currentDom.style.cssText += ';-webkit-transform:translate3d(' + leftNext + 'px,' + topNext + 'px,0);';
        nextDom.style.cssText += ';-webkit-transform:translate3d(0,0,0);';

        currentPage = index;

        if (dianNav) dianMove();
        if (autoPlay) start();

        if (callback) {
            setTimeout(function() {
                callback(currentPage);
            }, 100)
        }
    }
    this.toWhere = toWhere;

    function buttEvent() {
        if (!!buttPrev) {
            var click = isPhone ? 'touchend' : 'click';
            document.querySelector('#' + buttPrev).addEventListener(click, function() {
                var index = currentPage - 1;
                toWhere(index, 'prev');
            });
        }
        if (!!buttNext) {
            var click = isPhone ? 'touchend' : 'click';
            document.querySelector('#' + buttNext).addEventListener(click, function() {
                var index = currentPage + 1;
                toWhere(index, 'next');
            });
        }
    }


    function dianMove() { //下面小点的运动
        $dianItem.forEach(function(ele, index) {
            if (index == currentPage) ele.classList.add('dian-item-current')
            else ele.classList.remove('dian-item-current')
        });
    }

    function appendDian() { //添加点
        var dian = [];
        for (var i = 0; i < len; i++) {
            dian.push('<span class="dian-item"></span>');
        }
        var innerHTML = dian.join('');
        var fg = document.createDocumentFragment();
        var div = document.createElement('div');
        div.className = 'dian';
        fg.appendChild(div);
        var fgDian = fg.querySelector('div');
        fgDian.innerHTML = innerHTML;
        $id.appendChild(fgDian);
    }

    function dianInit() {
        appendDian();
        $dianItem = [].slice.call(document.querySelector('#' + idname).querySelectorAll('.dian-item'));
        dianMove();
    }

    function start() { //自动轮播
        timeIn = setInterval(move, 1000);
    }

    function stop() { //清除自动轮播
        clearInterval(timeIn);
    }

    function move() {
        toWhere(currentPage + 1, 'next')
    }*/
}
