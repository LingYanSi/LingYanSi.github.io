function reload(selector, sass, xian, arg) {
    var isPhone = !!navigator.userAgent.toLowerCase().match(/phone|android|pad|pod|touch/g);
    var id = document.querySelector(selector);
    var top = id.offsetTop;
    var body = document.body;
    var touchstart = isPhone ? 'touchstart' : 'mousedown',
        touchmove = isPhone ? 'touchmove' : 'mousemove',
        touchend = isPhone ? 'touchend' : 'mouseup';
    var yy, YY, cha, swipeY;

    function start(event) {
        id.classList.remove('change');
        sass.classList.remove('change');
        // xian.classList.remove('change');
        xian.classList.remove('xian-animation');
        if (body.scrollTop == 0) {
            swipeY = true;
            YY = yy = isPhone ? event.targetTouches[0].clientY : event.clientY;
        }
    };

    function move(event) {
        YY = isPhone ? event.targetTouches[0].clientY : event.clientY;
        cha = YY - yy;
        if (swipeY && cha >0) {
            event.preventDefault();
            // move(cha);
            sass.style.height = top + cha + 'px';
            xian.style.webkitTransform = 'rotateZ(' + cha / 200 * 360 + 'deg)';
            id.style.webkitTransform = 'translate3d(0,' + cha + 'px,0)';
        } else if(cha < 0) {
            swipeY = false;
        }
    }

    function end(event) {
        if (swipeY && cha >= 0) {
            swipeY = false;
            // end();
            id.classList.add('change');
            // xian.classList.add('change');
            sass.classList.add('change');

            id.offsetWidth;
            id.style.webkitTransform = 'translate3d(0,0,0)';
            sass.style.height = top + 'px';
            // xian.style.webkitTransform = 'rotateZ(0deg) translate3d(450px,-200px,0)';
            xian.classList.add('xian-animation');
            // setTimeout(function(){
            //     xian.style.webkitTransform = 'rotateY(180deg) translate3d(0,0,0)';
            // },400);
        }
    }

    id.addEventListener(touchstart, function(event) {
        start(event);
    });
    id.addEventListener(touchmove, function(event) {
        move(event);
    });
    id.addEventListener(touchend, function(event) {
        end(event);
    });
    if (!isPhone) { //如果是电脑端，就再添加一个mouseout事件
        id.addEventListener('mouseout', function(event) {
            end(event);
        });
    }
}
