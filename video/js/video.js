
    var winHeight = $(window).height(),
        winWidth = $(window).width();
    var video = document.getElementById('video');
    video.volume = 0.5;
    $('#video-volume-line').width($('#video-volume-line-wrap').width() * (video.volume));
    videoPlay();
    var duration;
    var videoWrapWidth = $('#video-wrap').width();
    //console.log(videoWrapWidth)
    video.ondurationchange = function() { //获取到视频的整体长度
        duration = video.duration;
        $('#duration-time').text(formatTime(duration));
        //console.log(video.height)
    }
    video.ontimeupdate = function() { //当currentTime变化
        var time = video.currentTime;
        $('#current-time').text(formatTime(time));
        $('#video-time-range-current').css({
                'width': time / duration * 100 + '%'
            }).siblings().css({
                'width': video.buffered.end(0) / duration * 100 + '%'
            })
            //$('#video-time-range-current').width(time/duration*videoWrapWidth).siblings().width(video.buffered.end(0)/duration*videoWrapWidth);
        if (time == duration) {
            videoPause();
        }
    }
    video.onvolumechange = function() { //当音量volume变化时
        //$('#video-volume-line').text(video.volume);
    }

    $('#video-playPause').on('click', function() {
        if (video.paused) {
            videoPlay();
        } else {
            videoPause();
        }
    });
    var mouseupTime1 = 0,
        mouseupTime2 = 0;
    $('#video').on('mouseup', function() {
        mouseupTime2 = new Date().getTime();
        if (mouseupTime2 - mouseupTime1 > 300) {
            videoClick()
            mouseupTime1 = mouseupTime2;
        } else {
            videoDblclick();
            fullScreenToggle();
            mouseupTime1 = 0;
        }
    });
    $('#video-wrap').attr('tabindex', 1); //因为html中能够监听键盘的元素是有限的，【input,textarea,window,document,a】等，对于不支持的元素可以通过添加tabindex属性来扩展，当然首先要获取focus后，才能触发key事件
    $('#video-wrap').on("keydown", function(event) {
        if (event.keyCode == 32) {
            if (video.paused) {
                videoPlay();
            } else {
                videoPause();
            }
        }
    });
    var videoMouseMove = false;
    var videoSetInterval
    $('#video').on("mouseover", function(event) {
        videoSetInterval = setInterval(function() {
            if (!videoMouseMove) {
                $('#video')[0].style.cursor = "none";
                videoControlHide();
            }
            videoMouseMove = false;
        }, 2000)
    });
    $('#video-wrap').on("mousemove", function(event) {
        videoMouseMove = true;
        $('#video')[0].style.cursor = "default";
        videoControlShow();
    });
    $('#video-wrap').on("mouseout", function(event) {
        videoControlHide();
        clearInterval(videoSetInterval);
    });

    function videoClick() {
        clickEvent = setTimeout(function() {
            if (video.paused) {
                videoPlay();
            } else {
                videoPause();
            }
        }, 300)
    }

    function videoDblclick() {
        clearTimeout(clickEvent);
    }
    $('#video-time-range').on('click', function(event) {
        var width = event.pageX - $(this).offset().left;
        var videoWrapWidth = $('#video-wrap').width();
        //$('#video-time-range-current').width(width);
        $('#video-time-range-current').css({
            'width': width / videoWrapWidth * 100 + '%'
        });
        video.currentTime = width / videoWrapWidth * duration;
    });

    var fullScreen = false;
    var videoWrapWidth = $('#video-wrap').width(),
        videoWrapHeight = $('#video-wrap').height();
    $('#video-fullScreen-toggle').on('click', function(event) {
        fullScreenToggle();
    });

    function videoControlShow() {
        $('#video-control').addClass('video-control-show');
    }

    function videoControlHide() {
        $('#video-control').removeClass('video-control-show');
    }
    document.addEventListener("keydown", function(event) {
        if (event.keyCode == 27 && fullScreen) {
            console.log(111111)
            cancelFullScreen()
        }
        console.log(event.which)
        var fullscreenEnabled = document.webkitFullscreenEnabled;
        console.log(fullscreenEnabled);
    }, false);

    function fullScreenToggle() {
        if (!fullScreen) {
            requestFullscreen()
        } else {
            cancelFullScreen()
        }
    }
    setInterval(function() {
        console.log(fullScreen && !document.webkitIsFullScreen)
        if (!document.webkitIsFullScreen) {
            cancelFullScreen()
        }
    }, 200)

    function cancelFullScreen() {
        fullScreen = false;
        document.webkitCancelFullScreen();
        $('#video-wrap').css({
            'width': videoWrapWidth,
            'height': videoWrapHeight
        }).removeClass('video-wrap-fullScreen');
        $(video).attr({
            'width': videoWrapWidth,
            'height': videoWrapHeight
        });
        $('#video-fullScreen-toggle').text('全屏');
    }

    function requestFullscreen() {
        $('#video-wrap')[0].webkitRequestFullscreen();
        $('#video-wrap').css({
            'width': window.screen.width,
            'height': window.screen.height
        }).addClass('video-wrap-fullScreen');
        $(video).attr({
            'width': window.screen.width,
            'height': window.screen.height
        });
        $('#video-fullScreen-toggle').text('退出');
        fullScreen = true;
    }

    function videoPlay() {
        if (video.currentTIme == duration) {
            video.currentTime = 0;
        }
        video.play();
        $('#video-playPause').text('pause');
    }

    function videoPause() {
        video.pause();
        $('#video-playPause').text('play');
    }

    function formatTime(time) {
        var sec = Math.floor(time);
        var min = Math.floor(sec / 60);
        sec = sec % 60;
        var timeStr = ''
        if (min < 10) {
            timeStr = timeStr + '0' + min
        } else {
            timeStr = timeStr + min
        }
        timeStr = timeStr + ':'
        if (sec < 10) {
            timeStr = timeStr + '0' + sec
        } else {
            timeStr = timeStr + sec
        }
        return timeStr;
    }
    drap('video-volume-line-circle')

    function drap(idname, doSth) {
        var id = document.getElementById(idname);
        var $id = $(id);
        var $parent = $id.parent();
        var $grand = $id.parent().parent();
        var parentLeft = $parent.offsetLeft,
            parentLeftMin = $grand.offset().left,
            parentWidthMax = $grand.width(),
            parentWidth;
        var moving;
        var xx, XX;
        id.addEventListener('mousedown', function(event) {
            xx = event.pageX;
            XX = xx;
            parentWidth = $parent.width();
            moving = true;
        })
        document.addEventListener('mousemove', function(event) {
            XX = event.pageX;
            var width = parentWidth + XX - xx;
            if (moving && width >= 0 && width <= parentWidthMax) {
                $parent.width(width);
            }
        })
        document.addEventListener('mouseup', function(event) {
            moving = false;
            volumeDrap();
        })
    }

    function volumeDrap() {
        video.volume = $('#video-volume-line').width() / $('#video-volume').width();
    }
    addList(videoList);

    function addList(all) {
        // var all = JSON.parse(json);
        var $videoListOl = $('#video-list-ol');
        for (var i = 0, len = all.length; i < len; i++) {
            // alert(all[i])
            $videoListOl.append('<li class="video-list-li">' + all[i] + '</li>');
        }
        $videoListOl.find('li').dblclick(function() {
            video.src = $(this).text();
            videoPlay();
        });
    }
    $('#video-time-range').on('mousemove', function(event) {
        var width = event.pageX - $(this).offset().left;
        var $tips = $('#video-time-range-tips');
        var videoWrapWidth = $('#video-wrap').width();
        $tips.children('.vtrt-content').text(formatTime((width / videoWrapWidth * duration)));
        var pianyi = $tips.width() / 2,
            width = event.pageX - $(this).offset().left,
            leftMin = 0,
            leftMax = $(this).width() - pianyi * 2;
        var left = width - pianyi;
        if (left < leftMin) {
            left = 0;
            $tips.find('.vtrt-arrow').css({
                'left': width
            });
        } else if (left > leftMax) {
            left = leftMax;
            $tips.find('.vtrt-arrow').css({
                'left': width - left
            });
        } else {
            $tips.find('.vtrt-arrow').css({
                'left': '50%'
            });
        }
        $tips.show().css({
            'left': left
        });
    })
    $('#video-time-range').on('mouseout', function(event) {
        $('#video-time-range-tips').hide();
    })

