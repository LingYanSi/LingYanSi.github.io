import React,{Component} from 'react'

import './index.scss'

/*
modal 在根组件被渲染，其他组件调用的是他的静态方法
*/

class Modal extends Component{
    constructor(){
        super()

        this.state = {
            queue: []
        }
    }
    componentDidMount(){
        // 把实例化的对象指向静态属性
        Modal.self = this
        Modal.id = 0
    }
    pipe(arr){
        return arr.map(item => {
            let Item = null
            switch(item.type) {
                case 'tips':
                    Item = <div className="modal-item modal-item-tips" key={`modal_${item.id}`}>
                        <p style={{textAlign: 'center'}}>{item.component}</p>
                    </div>
                    break
                case 'alert':
                    Item = <div className="modal-item modal-item-alert" key={`modal_${item.id}`}>
                        <p>{item.component}</p>
                        <div className="modal-item-btns">
                            <button onClick={item.success}>确认</button>
                            <button onClick={item.cancel}>取消</button>
                        </div>
                    </div>
                    break
                case 'confirm':
                    Item = <div className="modal-item modal-item-confirm" key={`modal_${item.id}`}>
                        <p>{item.component}</p>
                        <div className="modal-item-btns">
                            <button onClick={item.success}>确认</button>
                            <button onClick={item.cancel}>取消</button>
                        </div>
                    </div>
                    break
                case 'open':
                    Item = <div className="modal-item modal-item-open" key={`modal_${item.id}`}>
                        {item.component}
                    </div>
            }

            return <div key={item.id}>
                {item.layer && <div className="layer" onClick={()=>{Modal.close(item.id)}}></div>}
                {Item}
            </div>
        })
    }
    render(){
        var modalItems = this.pipe(this.state.queue)
        return <div className="modal">
            {modalItems}
        </div>
    }
}

// 新建弹框
Modal.open = function(component='', options={}){
    let _this = this.self
    let queue = this.self.state.queue
    const id = this.id++

    queue.push({
        type: 'open',
        component: component,
        id: id,
        layer: options,
        layerClose: true
    })

    _this.setState({
        queue: queue
    })

    return id
}

// 提示
Modal.tips = function(str='', time=3000){
    let _this = this.self
    let queue = this.self.state.queue
    const id = this.id++

    queue.push({
        type: 'tips',
        component: str,
        id: id,
        layer: false
    })

    _this.setState({
        queue: queue
    })

    setTimeout(()=>{
        Modal.close(id)
    }, time)

    return id
}

// 弹窗
Modal.alert = function(str='', success, cancel){
    let _this = this.self
    let queue = this.self.state.queue
    const id = this.id++

    queue.push({
        type: 'alert',
        component: str,
        id: id,
        layer: false,
        success(){
            success && success()
            Modal.close(id)
        },
        cancel(){
            cancel && cancel()
            Modal.close(id)
        }
    })

    _this.setState({
        queue: queue
    })

    return id
}

// 需要用户输入
Modal.confirm = function(str='', success, cancel){
    let _this = this.self
    let queue = this.self.state.queue
    const id = this.id++

    queue.push({
        type: 'confirm',
        component: str,
        id: id ,
        success(){
            success && success()
            Modal.close(id)
        },
        cancel(){
            cancel && cancel()
            Modal.close(id)
        }
    })

    _this.setState({
        queue: queue
    })

    return id
}

// 关闭弹窗
Modal.close = function(id){
    let _this = this.self
    let queue = this.self.state.queue

    id ? queue.pop() : (queue = queue.filter(item=>{
        return item.id != id
    }))

    _this.setState({
        queue: queue
    })
}

// 关闭所有
Modal.closeAll = function(){
    this.self.setState({
        queue: []
    })
}

// 放到全局
window.Modal = Modal

export default Modal
