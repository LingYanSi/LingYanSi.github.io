/*
* @Author: zikong
* @Date:   2015-09-08 11:43:54
* @Last Modified by:   zikong
* @Last Modified time: 2015-09-08 15:00:48
*/

'use strict';

// 所谓style－inline，jsx内<div style={}></div>可解析对象，然后拼接成字符串
var styleSheet = {
    background : 'rgba(125,104,2,0.3)' ,
    borderTop: '2px solid #fff' ,
}

// mixin 用于功能抽象
var Minixaa =  {
        onCl: function(){
            console.log('minixs')
            this.setState({
                backgroundColor: 'blue'
            });
        }
    };

var Mixin2 = {
    onCl2 : function(){
        var user = this.state.user=='倩女幽魂'?'':'倩女幽魂' ;
        this.setState({
            user : user ,
        });
    }
}

// 子组件
var Item = React.createClass({
    mixins: [Mixin2 ] ,
    getInitialState: function(){
        return {
            user: '',
        }
    },
    onCl: function(){
        this.props.selected(this.props.index);
        this.onCl2();
    },
    render: function(){
        var ele = this.props.item ;
        return <div style={styleSheet} onClick={this.onCl} >
                <div>{this.props.index+':'}{ele.lol}</div>
                <p>{ele.user+' '+this.state.user}</p>
            </div>;
    }
});

// 子组件
var Child = React.createClass({
    getInitialState: function(){
        return {
            currentIndex: '没有选中' ,
        }
    },
    xxx: function(ss){
        this.setState({currentIndex: ss});
    },
    render: function(){
        var items = this.props.list.map(function(ele,index){
            return <Item item={ele} index={index} selected={this.xxx}></Item>
        },this);

        return <div>
            <p>{'当前状态--'+this.state.currentIndex }</p>
            {items}
        </div>
    }
});

// 父组件
var Parent = React.createClass({
    mixins: [Minixaa , Mixin2],
    getInitialState: function(){
        console.log('initial state');
        return {
            backgroundColor: 'red',
            user : '小武' ,
        }
    },
    getDefaultProps: function(){
        console.log('set default props')
        return {
            name: '蟑螂'
        }
    },
    render: function(){
        var nidaye = '周恩来';

        return <div>
            <p onClick={this.onCl}>{nidaye}{this.state.backgroundColor}</p>
            <div onClick={this.onCl2}>{this.props.name}{this.state.user}</div>
            <Child list={this.props.list}></Child>
        </div>
            ;
    },
    componentWillMount: function  () {
        console.log('第一次render前');
    },
    componentDidMount: function  () {
        console.log('第一次render结束，dom渲染成功，可去操作真实dom');
    },
    componentWillUnmount: function(){
        console.log('组建被销毁前')
    },
    componentWillReceiveProps: function(){
        console.log('will receive props')
    },
    componentWillUpdate: function(){
        console.log(' before rende ')
    },
    componentDidUpdate: function(){
        console.log('rende end')
    }
});

var App = React.render(
<Parent name="张子坊" list={[]} />,
document.querySelector('#app')
    );

//  属性修改
App.setProps({name:'maozhedong',
    list: [{lol:'德玛西亚',user:'heihie'}
    ,{lol:'独裁统治',user:'heihie'}
    ,{lol:'共产党',user:'heihie'}]
});
