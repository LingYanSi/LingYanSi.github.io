/*
* @Author: zikong
* @Date:   2015-10-17 23:45:32
* @Last Modified by:   zikong
* @Last Modified time: 2015-10-19 23:08:58
*/

'use strict';

var React = require('react');
var ReactDom = require('react-dom');

require('./style.less');

var WTF = React.createClass({
    render(){
        return <div id="cao">他妈的
            <p>李倩：身高171，生于1993年，河南焦作人，与她相识于2013年夏<br/></p>
        </div>
    }
});

ReactDom.render(
    <WTF />,
    document.getElementById('bitch')
);
