
// 一般而言，弹幕都需要一个时间基线,用来决定弹幕在不同时间的不同状态

var Danmu = function(id){
    /* id: 元素id
    */
    this.data = []
    this.$ele = $('#'+id)

    this.queue = []
    this.timer = 0
}

// 运动
Danmu.prototype.animate = function(){
    // 从data中获取数据，然后渲染出来
    // 按理说这里应该有个任务队列
    var _self = this ;

    this.queue = this.data.map(function(item,index){
        if( item.time < _self.startTime ) return
        return setTimeout(()=>{
            // 构建元素
            var $dom = $('<div class="danmu-item" style="color:'+item.color+' ; font-size: '+item.fontsize+'px; ">'+item.text+'</div>')
            // 添加到父元素
            _self.$ele.append($dom)

            // 初始位置
            $dom.css(_self.animateType[item.animationType].start).show()

            // 运动起来
            $dom.animate(
                _self.animateType[item.animationType].end
            ,item.duration*1000,'linear', function(){
                $dom.remove()
                if(index == _self.data.length-1){
                    console.log('弹幕结束')
                    // 循环播放
                    _self.play()
                }
            } )

        }, item.time*1000)
    }).filter(function(item){
        return item
    })
}

// 暂停
Danmu.prototype.pause = function(){
    this.queue.forEach(clearTimeout)

    // 所有的dom元素stop
    this.clear()

    this.paused = true
}

// 开始
Danmu.prototype.play = function(time){

    this.startTime = time || 0
    // 所有的dom元素stop

    this.animate()
    this.paused = false
}

// 清空元素内的弹幕元素
Danmu.prototype.clear = function(){
    this.$ele.empty()
}

// 计时器
Danmu.prototype.timer = function(){
    var _self = this
    // 很明显，这种计时器，不准确
    return setInterval(()=>{
        _self.currentTime++
    },1000)
}

// 设置data
Danmu.prototype.setData = function(data){
    this.data = data
    return this
}

// 弹幕类型：左右运动，上下运动，缩放等
Danmu.prototype.animateType = {
    'left-to-right': {
        start:{
            left: '100%',
            top: '30%'
        } ,
        end:{
            left: '-100%',
            top: '30%'
        }
    },
    'scale': {
        start:{
            transform: 'translate(-50%,0) scale(3,3)',
            top: '30%' ,
            left: '50%',
            textAlign: 'center'
        } ,
        end:{
            transform: 'translate(-50%,0) scale(1,1)',
            top: '30%',
            left: '50%',
            textAlign: 'center'
        }
    },
    'bottom-to-top': {
        start:{
            top: '100%',
        } ,
        end:{
            top: '-100%',
        }
    }
}

// 测试
function testrun(){
    var data = [{
        time: 1,// 出现时间
        duration: 4, // 时长
        animationType: 'scale', // 运动类型
        color: 'red', // 字体颜色
        fontsize: 50, // 字体大小
        text: '呵呵呵，王司徒不要啊', //文字内容
    },{
        time: 3,// 出现时间
        duration: 4, // 时长
        animationType: 'left-to-right', // 运动类型
        color: 'blue', // 字体颜色
        fontsize: 36, // 字体大小
        text: '诸葛老贼还不速速寿司', //文字内容
    },{
        time: 4,// 出现时间
        duration: 4, // 时长
        animationType: 'bottom-to-top', // 运动类型
        color: 'black', // 字体颜色
        fontsize: 21, // 字体大小
        text: '😊，我就不想喝了', //文字内容
    },{
        time: 6,// 出现时间
        duration: 4, // 时长
        animationType: 'left-to-right', // 运动类型
        color: 'pink', // 字体颜色
        fontsize: 25, // 字体大小
        text: '我就阿斯顿发撒旦法师放到的法规规定发干活不相信了', //文字内容
    }]
    var DM = new Danmu('danmu')
    DM.setData(data).play()
    return DM
}

var DM = testrun()

// 暂停运动
$('#danmu').on('click', function(){
    DM.paused ? DM.play() : DM.pause()
})
