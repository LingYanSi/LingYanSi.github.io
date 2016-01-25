/*
* @Author: zikong
* @Date:   2015-11-17 11:51:55
* @Last Modified by:   zikong
* @Last Modified time: 2015-12-04 20:09:46
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
    doIt(x){
        return 100
    },
    render(){
        return <button disabled={ this.state.disabled}>{ this.props.name}</button>
    }
});

export default Button ;
