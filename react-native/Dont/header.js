
'use strict';

var React = require('react-native');
var Result = require('./result.js') ;
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  AlertIOS,
  ActivityIndicatorIOS,
  Image,
  TouchableHighlight
} = React;

var Lists = React.createClass({
    getInitialState(){
        return {
            arr: [{
                name:'哎呀呀受不了了',
                sum: '你好啊哦哦嗷嗷嗷哦啊哦哦是东方红'
            },{
                name:'hello',
                sum: '你好啊哦哦嗷嗷嗷哦啊哦哦是东方红'
            },{
                name:'hello',
                sum: '你好啊哦哦嗷嗷嗷哦啊哦哦是东方红'
            }]
        }
    },
    render(){
        return <View style={{flex: 1, height:600, backgroundColor:'pink' }} >
            { this.state.arr.map((ele, index)=>{
                return <View style={{ flexDirection: 'row',borderTopWidth:1 , borderColor:'rgb(0,0,0)' }} key={index}>
                    <Text style={{ width: 100 , flex:2, backgroundColor: 'red',height:80, lineHeight: 40}}>{ ele.name}</Text>
                    <Text style={{ flex: 10, backgroundColor: 'blue',height:40, lineHeight: 40 }}>{ ele.sum}</Text>
                </View>
              })
            }
            <Text numberOfLines={1}>
                我是超长文字
                我是超长文字
                我是超长文字
                我是超长文字
                我是超长文字
                我是超长文字
                我是超长文字
                我是超长文字
                我是超长文字
                我是超长文字
                我是超长文字
                我是超长文字
                我是超长文字
                我是超长文字
            </Text>
        </View>
    }
});

var Header = React.createClass({
    getInitialState(){
        return {
            title: '你谁呢',
            placeholder: '点击我呢'
        }
    },
    alert(){
        var _this = this ;
        AlertIOS.alert('警告',
                        '确认要放弃输入码',
                        [{
                            text:'确定',
                            onPress(){
                                _this.setState({
                                    title: ''
                                })
                            }
                        },{
                            text:'取消',
                            onPress(){
                                return
                            }
                        }]
                    )
    },
    _jump(){
        console.log( this.props);
        this.props.navigator.push({
            title: '河南省',
            component: Result,
            passProps: {text: 1234}
        })
    },
    render(){
        return <ScrollView>
            <Lists></Lists>
            <Text style={ styles.header }>
                { this.state.title }
            </Text>
            <TextInput style={{height: 20, width: 300, borderColor: 'pink', borderWidth: 1}}
                       onChangeText={(text)=>{ this.setState({title: text})}}
                       placeholder={this.state.placeholder}
                       onBlur={this.alert}></TextInput>
            <TouchableHighlight onPress={this._jump}>
                <Image source={{uri:'http://ww3.sinaimg.cn/bmiddle/5657d033jw1eyqzj9h11gg20b408ck7j.gif'}}
                        style={{borderWidth:2, borderColor:'blue', height:200, resizeMode:Image.resizeMode.contain }}/>
            </TouchableHighlight>
        </ScrollView>
    }
});

var styles = StyleSheet.create({
    header: {
        fontSize: 20,
        // margin: 10,
        // position: 'absolute',
        backgroundColor: 'red' ,
        color: '#fff',
        top: 0,
        left:0,
        textAlign: 'left',
        height: 100,
        flex: 1,
    }
});

module.exports = Header ;

