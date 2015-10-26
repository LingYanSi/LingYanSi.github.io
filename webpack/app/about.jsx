/*
* @Author: zikong
* @Date:   2015-10-18 13:21:49
* @Last Modified by:   zikong
* @Last Modified time: 2015-10-19 23:08:47
*/

'use strict';

var React = require('react');
var ReactDom = require('react-dom');

var About = React.createClass({
    getInitialState(){
        return {
            list: [
                '西安-秦汉隋唐',
                '洛阳-汉、魏、晋、北魏',
                '许昌-魏',
                '成都-蜀、etc',
                '南京-吴、东晋、南朝、明、南明、太平天国、民国',
                '大同-北魏',
                '开封-北宋',
                '北京-辽？金、元、明、清、共和国',
                '银川-西夏',
                '杭州-南宋',
                '重庆-民国（抗战）',
                '延安-土共',
                '台北-民国',
                '拉萨-吐蕃',
                '大理-南诏,大理国?',
            ]
        }
    },
    render(){
        return <div>
            <h1>游走天下</h1>
            <ul>
                {this.state.list.map(function(ele,index){
                    return <li key={index}>{ele}</li>
                })}
            </ul>
        </div>
    }
});

ReactDom.render(
    <About/>,
    document.getElementById('bitch')
    );
