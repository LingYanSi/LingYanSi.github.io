
// 组件构造函数
// 返回的应该是一个构造函数
(function(){
    function Component(option){
        function Com($ele, props, parent, key){
            // 需要clone option因为组件的实例不应该共享option
            this.parent = parent
            this.key = key

            var newOption = {}
            for(var key in option){
                newOption[key] = option[key]
            }

            // 给方法bind this
            for(var key in newOption){
                var value = newOption[key]
                if(typeof value == 'function'){
                    newOption[key] = value.bind(this)
                }
            }
            // 合并option和this
            this.merge(this, newOption)
            // 渲染组件
            this.render($ele, props)
        }

        Com.prototype = {
            // 修改state
            setState(state, callback){

                this.state = this.merge(this.state, state)
                // 渲染过后，还要找到子组件，渲染子组件
                this.__render__()

                callback && callback()
            },
            diff(oldTree, newTree){
                diff(oldTree, newTree)
            },
            patch(){

            },
            // 对象合并
            merge(object, obj){
                for(var key in obj){
                    object[key] = obj[key]
                }
                return object
            },
            // 渲染
            __render__(){
                // 渲染内容
                this.$ele.innerHTML = Parser(this.template, this.state, this.props)

                this.tree =
                // 渲染子组件
                this.Components && this.renderChildren()
            },
            // 组件渲染
            render($ele, props){
                this.$ele = $ele

                this.props = props || {}
                this.state = this.getState ? this.getState() : {}

                this.componentWillMount()

                this.__render__()
                // 绑定事件，因为我们使用的事件委托，因此组件在一个生命周期中，事件只会被绑定一次

                this.bindEvents()
                this.componentDidMount()

                return this
            },
            bindEvents(){
                var events = this.events
                for (var key in events) {
                    var arr = key.split(/\s+/)
                    var event = arr[0]
                    var selector = arr[1]
                    $(this.$ele).on(event, selector, this[events[key]])
                }
            },
            unbindEvents(){
                // 卸载已绑定的事件
                var events = this.events
                for (var key in events) {
                    var arr = key.split(/\s+/)
                    var event = arr[0]
                    var selector = arr[1]
                    $(this.$ele).off(event, selector, this[events[key]])
                }
            },
            update($ele, props){
                this.$ele = $ele
                this.props = props || {}
                this.bindEvents()
                this.__render__()
            },
            renderChildren(){
                var $ele = $(this.$ele)

                var children = this.children || {}
                this.Components().forEach(item => {
                    const {ele, component, props} = item
                    if(children[ele]){
                        // 如果存在就更新
                        children[ele].update($ele.find(ele)[0], props)
                    }else {
                        // 不存在，就渲染一个新的
                        children[ele] = Ent.render($ele.find(ele)[0], component, props, this, ele)
                    }
                })
                this.children = children

            },
            // 销毁组件
            destory(){
                this.componentWillUnmount()
                // 卸载事件
                this.$ele.innerHTML = ''

                this.unbindEvents()

                this.componentDidUnmount()

                // 需要移除在父组件中的引用
                try{
                    delete this.parent.children[this.key]
                }catch(msg){
                    console.log(msg)
                }

            },
            componentWillMount(){
                console.log('组件将要构建')
            },
            componentDidMount(){
                console.log('组件构建完成')
            },
            componentWillUnmount(){
                console.log('组件卸载前')
            },
            componentDidUnmount(){
                console.log('组件已经卸载')
            }
        }

        return Com
    }
    window.Ent = {
        createClass: Component,
        render($ele, Component, props, parent, key){
            if( $ele ){
                 return new Component($ele, props, parent, key)
            }
        }
    }
})()
