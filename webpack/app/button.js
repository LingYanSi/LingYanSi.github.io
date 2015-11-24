/*
* @Author: zikong
* @Date:   2015-11-17 11:51:55
* @Last Modified by:   zikong
* @Last Modified time: 2015-11-18 14:59:52
*/

'use strict';


import React from 'react' ;
import ReactDom from 'react-dom' ;

var Button = React.createClass({
    statics:{
        self: null,
    },
    componentDidMount(){
        Button.self = this ;
    },
    getInitialState(){
        return {
            disabled: true
        }
    },
    setDis(){
        this.setState({
            disabled: false
        })
    },
    render(){
        return <button disabled={ this.state.disabled}>{ this.props.name}</button>
    }
});

export default Button ;
