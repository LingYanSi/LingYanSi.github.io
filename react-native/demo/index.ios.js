/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  NavigatorIOS ,
  Navigator,
  StatusBar,
  View
} from 'react-native';

import Login from './login.js'

class demo extends Component {
    constructor(){
        super()
        this.state = {
            barHidden: true
        }
    }
    setBarState(state=false){
        // alert(state)
        this.setState({
            barHidden: state
        })
    }
  render() {
      //   http://ww1.sinaimg.cn/mw1024/69b8b46egw1eymst7g4g8g20au085npd.gif
    return (

             <Navigator
                 initialRoute={{name: 'My First Scene', index: 0, component: Login}}
                 renderScene={(route, navigator) =>{
                     const Component = route.component
                    return <View style={styles.container}>
                        <StatusBar
                          backgroundColor={'#086'}
                          translucent={true}
                          hidden={false}
                          showHideTransition={this.state.showHideTransition}
                          animated={true}
                          barStyle={'light-content'}
                          networkActivityIndicatorVisible={false}
                        />
                        <Component {...route} navigator={navigator} setBarState={this.setBarState.bind(this)} />
                    </View>
                 }
                 }
                 configureScene={  (route, routeStack) =>
                     Navigator.SceneConfigs.FloatFromRight
                 } />
    )
  }
}


 /*
     <NavigatorIOS initialRoute={{
             component: Login,
             title: '登陆页',
             passProps: { setBarState: this.setBarState.bind(this) }
         }}
         barTintColor='rgb(200,49,103)'
         navigationBarHidden={this.state.barHidden}
         shadowHidden={true}
         style={ styles.container } />
*/
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
AppRegistry.registerComponent('demo', () => demo);
