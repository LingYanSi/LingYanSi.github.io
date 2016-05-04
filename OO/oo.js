// 面向对象编程，继承的实现
// 所谓继承就是，返回一个新的类
// 这个类继承了父类的方法与属性，自己的属性与方法为extend内传递的参数

var OO = (function(){
    var _mixin = function(prototype, item){
        for(var key in item){
            // 避免继承原型链上的属性
            if(item.hasOwnProperty(key)) prototype[key] = item[key]
        }
    }
    var _extend = function(){
        var arg = [].slice.call(arguments)
        var item

        // 我去，构造函数会返回一个对象，竟然这都不知道😢

        // this指向上一个newFunc，我们当然不希望在原型链的构造过程中,init方法被执行
        this.prototypebuilding = true
        var prototype = new this()
        this.prototypebuilding = false

        // 支持function 也支持{}
        while( item = arg.shift() ){
            // 这岂不是有坑，如果{}有一个prototype属性岂不是抓瞎了？？
            _mixin(prototype, item.prototype || item )
        }

        // 每次继承就会返回一个新的函数
        var newFunc = function(){
            // 有初始化函数
            if( !newFunc.prototypebuilding && this.init ){
                this.init.apply(this, arguments)
            }
        }

        newFunc.prototype = prototype
        // constructor指向newFunc
        newFunc.prototype.constructor = newFunc
        newFunc.extend = _extend

        return newFunc
    }

    var cc = function(){}

    cc.extend = _extend

    return cc
})() ;

var Base = OO.extend({
    init: function(){

        this.render.apply(this, arguments)
        this.bind()
    },
    bind: function(){

    },
    off: function(){
        // 移除事件监听
    },
    // 组件销毁
    destory: function(){
        this.off()
        // dom销毁
    },
    // 事件订阅
    pub: function(name, data){
        this._pubsub = this._pubsub || {}
        this._pubsub[name] && this._pubsub[name](name, data)
    },
    sub: function(name, func){
        this._pubsub = this._pubsub || {}
        this._pubsub[name] = func
    }
})

var Ins = Base.extend({
    template: 'tpl',
    render: function(id){

        var html = template(this.template, {title:'你大爷', body:'共产党最牛逼'})

        document.querySelector(id).innerHTML = html
    }
})

var ins = new Ins('#dom')
ins.sub('animal.run',function(msg, data){
    console.log('泡起来了啊',msg , data)
})

ins.pub('animal.run', {name:'猪八戒'})
