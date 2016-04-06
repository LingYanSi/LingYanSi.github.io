/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View ,
  TextInput,
  AlertIOS ,
  TouchableOpacity,
  Image,
  ScrollView,
  ListView ,
  RefreshControl
} from 'react-native';

import Detail from './Detail.js'

 class NavigatorBar extends Component {
    constructor(){
        super()
    }
    leftButtonPress(){
        const props = this.props
        props.leftButtonPress ? props.leftButtonPress() : props.navigator.pop()
    }
    rightButtonPress(){
        const props = this.props
        props.rightButtonPress && props.rightButtonPress()
    }
    componentDidMount(){
        //
    }
  render() {
      //   http://ww1.sinaimg.cn/mw1024/69b8b46egw1eymst7g4g8g20au085npd.gif

    const props = this.props

    return (
        <View style={[styles.wrap, props.backgroundColor && {backgroundColor: props.backgroundColor}]}>
            <View style={ styles.container} >
                <TouchableOpacity style={[styles.button]} onPress={this.leftButtonPress.bind(this)}>
                    <Text style={[styles.buttonText]}>{props.leftButtonTitle}</Text>
                </TouchableOpacity>
                <Text style={[styles.title]}>{props.title}</Text>
                <TouchableOpacity style={[styles.button]} onPress={this.rightButtonPress.bind(this)}>
                    <Text style={[styles.buttonText]}>{props.rightButtonTitle}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 33,
    flexDirection:'row',
  },
  button: {
      width: 50,
      paddingTop: 8 ,
      paddingBottom: 8 ,
  },
  buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 14
  },
  title: {
      fontSize: 18,
      color: '#fff',
      flex: 1,
      textAlign: 'center',
      paddingLeft: 20 ,
      paddingRight: 20 ,
  },
  wrap: {
      height: 50,
      paddingTop: 17,
      backgroundColor: 'rgb(60, 236, 157)',
  }

});

export default NavigatorBar
