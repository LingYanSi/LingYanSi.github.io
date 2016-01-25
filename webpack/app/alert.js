/*
* @Author: zikong
* @Date:   2015-11-17 11:51:55
* @Last Modified by:   zikong
* @Last Modified time: 2015-11-17 19:59:50
*/

'use strict';


import React from 'react' ;
import ReactDom from 'react-dom' ;

var Alert = React.createClass({
    getInitialState(){
        return {
            msg: 'huangcheng你大爷的'
        }
    },
    statics: {
        self: null ,
        getData(){
            return Alert.self.state
        }
    },
    componentDidMount(){
        Alert.self = this ;
    },
    handleClick(){
        console.log('我被点击了');
        this.setState({
            msg: '被点击后的数据'
        })
    },
    render(){
        return <div ref="aiya">
            <button ref="button" onClick={ this.handleClick }>哎呀</button>
        </div>
    }
});

module.exports = Alert ;
