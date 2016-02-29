
import React,{Component, createClass} from 'react'

const Footer = createClass({
    // 只在开版本，会抛出错误
    propTypes: {
        optinalArray:  React.PropTypes.array
    },
    getDefaultProps: function(){
        return {
            optinalArray: '222'
        }
    },
    render(){
        return <div style={{color:'rgb(200,200,200)',lineHeight:'2'}}>
            <i>react & react-router @ copyright Facebook {this.props.optinalArray} </i>
        </div>
    }
})

export default Footer
