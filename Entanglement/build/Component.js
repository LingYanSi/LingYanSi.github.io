var Component = function(arg){

    // 继承所有的方法
    Object.keys(arg).forEach(item=>{
        this[item] = arg[item]
    })

    this.render = function(){
        this._componentWillUpdate()

        // var html = arg.render.call(this)
        // this.$ele.innerHTML = html

        this._componentDidUpdate()
    }

    // 每触发一次，就会有一个异步render被加入到队列中，但最终只会执行一次
    var trigger = new Queue(this.render.bind(this)).push
    this.data = Observe(arg.data , trigger);

    // 初始化钩子
    this.init = function(ele){
        // 元素从Ent.render中获取
        // render的时候，会有一个问题，就是如何处理依赖的component
        // 默认规定，component需要以大写字母开头
        this.$ele = ele
        // 渲染前
        this._componentWillMount()
        // 默认render一次
        this.render()
        // 渲染后
        this._componentDidMount()
    }

}

Component.prototype = {
    // 渲染前
    _componentWillMount: function(){
        this.componentWillMount()
    },
    // 渲染后
    _componentDidMount: function(){
        this.componentDidMount()
    },
    // 卸载
    _componentWillUnmount: function(){
        this.componentWillUnmount()
    },
    _componentMount: function(){
        this._componentWillUnmount()
        // 移除各种事件监听
        this.$ele.innerHTML = ''
    },
    // 更新前
    _componentWillUpdate: function(){
        // 不可以在更新前修改data
        this.componentWillUpdate()

        // 去parser字符串,获取dom树
        var tree = getVDom(this.template)

        var node = render(tree, this)

        console.log( tree);
        this.$ele.innerHTML = ''
        this.$ele.appendChild(node)

        // 渲染tree
    },
    // 更新前
    _componentDidUpdate: function(){
        this.componentDidUpdate()
    }

}
