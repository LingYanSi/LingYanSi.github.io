/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Header = require('./header.js');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  NavigatorIOS
} = React;

var Dont = React.createClass({
  render: function() {
    return (
      <NavigatorIOS initialRoute={{
                    title: '中纪委',
                    component: Header
                  }}
            style={ styles.container } />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image:{
    width: 100,
    height: 100,
    // border: 1
  }
});

AppRegistry.registerComponent('Dont', () => Dont);
