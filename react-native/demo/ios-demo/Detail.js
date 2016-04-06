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
  TouchableHighlight,
  Image,
  ScrollView,
  ListView
} from 'react-native';
import NavigatorBar from './NavigatorBar.js'

import Comment from './Comment.js'

 class Detail extends Component {
    constructor(){
        super()
    }
  render() {
     const props = this.props.params

     const nb = {
         title: `详情页${props.title}`,
         leftButtonTitle: '首页'
     }

    return <View style={{flex:1}}>
        <NavigatorBar {...nb} navigator={props.navigator} />
        <ScrollView style={{backgroundColor: '#fff'}}>
            <Image source={{uri: props.source}}
                style={{height: 400, marginTop: -200}}>
            </Image>
            <Text>{props.title}</Text>
            <Text>{props.summary}</Text>
            <Comment></Comment>
        </ScrollView>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default Detail
