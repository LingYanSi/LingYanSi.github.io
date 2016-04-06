/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View ,
  TextInput,
  AlertIOS ,
  TouchableHighlight,
  Image ,
  Dimensions
} from 'react-native';

import Home from './ios-demo/Home.js'

var {height, width} = Dimensions.get('window')

 class Login extends Component {
    constructor(){
        super()
        this.state = {
            title: '首页'
        }
    }
    login(){
        // var msg = this.refs.name.text
        var msg = `用户名:${this.state.username}密码:${this.state.password}`

        var self = this
        AlertIOS.alert('用户名',msg,[{
            title: '确认',
            onPress(){ self.goHome() }
        }])
    }
    goHome(){
        var props = this.props
        /*props.navigator.push({
            title: '首页',
            component: Home ,
            leftButtonTitle: '登录',
            onLeftButtonPress(){
                props.setBarState(true)
                props.navigator.pop()
            } ,
            passProps: {
                navigator: props.navigator ,
                setBarState: props.setBarState
            }
        })*/

        props.navigator.push({
           name: 'SecondPageComponent',
           component: Home
        })
    }
    cancel(){
        this.setState({
            username: '',
            password: ''
        })

        this.goHome()
    }
    componentDidMount(){
        // this.props.setBarState(true)
    }
  render() {
      //   http://ww1.sinaimg.cn/mw1024/69b8b46egw1eymst7g4g8g20au085npd.gif
    return (
          <Image
              style={[styles.container,{flex:1 , resizeMode: Image.resizeMode.cover}]}
              source={{uri:'http://img4.cache.netease.com/photo/0005/2016-03-07/900x600_BHHOUGQC3SLH0005.jpg'}}
              source={require('./static/imgs/2.gif')}>
              <View>
                  <Image
                      style={{width:100,height:100, borderRadius: 50}}
                      source={{uri:'http://ww3.sinaimg.cn/mw690/48ce4b02jw1f229mb2ur5j20rs0kudhq.jpg'}}
                      ></Image>
              </View>
              <View>
                  <TextInput placeholder="用户名"
                            ref="name"
                            style={[styles.input]}
                            onChangeText={(username)=>{this.setState({username})}}
                            value={this.state.username} />
                  <TextInput placeholder="密码"
                          onChangeText={(password)=>{this.setState({ password})}}
                          value={this.state.password}
                          style={styles.input}
                          secureTextEntry={true}/>
              </View>
              <View style={styles.buttonView}>
                  <TouchableHighlight style={styles.button} onPress={this.login.bind(this)} underlayColor="pink">
                      <Text style={styles.buttonText}>登录</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.button,{marginLeft:6,backgroundColor:'blue'}]} onPress={this.cancel.bind(this)} underlayColor="pink">
                      <Text style={styles.buttonText}>取消</Text>
                  </TouchableHighlight>
              </View>

          </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: height ,
    width: width
  },
  buttonView: {
     marginTop: 4 ,
    width: 300 ,
    flexDirection: 'row'
  },
  button: {
      backgroundColor: 'red',
      padding: 8 ,
      borderRadius: 6,
          flex: 1 ,
  },
  buttonText: {
        textAlign: 'center',
        color: '#fff'
  },
  input: {
      height: 40 ,
      width: 300 ,
      color: 'red',
      borderColor: 'red',
      borderWidth: 1 ,
      borderRadius: 8 ,
      padding: 10 ,
      marginTop: 6 ,
      backgroundColor: 'rgba(255,255,255,0.2)'
  }
});

export default Login
