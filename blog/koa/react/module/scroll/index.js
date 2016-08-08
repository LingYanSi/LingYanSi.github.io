import {Component} from 'react'

import './index.scss'

class Scroll extends Component {
    render(){
        // width num height rowidth
        const props = this.props

        // 计算宽度
        let innerWidth = props.num * (props.width + props.rowWidth) + props.rowWidth

        // 设置row
        const children = React.Children.map(props.children, (item)=>{
            return <div style={{display: 'inline-block', 'marginLeft': props.rowWidth}}>
                {item}
            </div>
        })

        // 获取视窗宽度
        let windowsWidth = window.innerWidth

        return <div style={{ height: props.height + 2 * props.rowWidth, 'overflowY': 'hidden'}}>
            <div className="overflow-scrolling" style={{width: windowsWidth , paddingTop: props.rowWidth}}>
                <div style={{width: innerWidth, 'boxSizing': 'border-box', height: props.height + 2 * props.rowWidth + 40}}>
                    {children}
                </div>
            </div>
        </div>
    }
}

export default Scroll
