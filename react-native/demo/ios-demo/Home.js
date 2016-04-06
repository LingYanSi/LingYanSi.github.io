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
  ListView ,
  RefreshControl,
  StatusBar,
  TabBarIOS,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

import Detail from './Detail.js'
import NavigatorBar from './NavigatorBar.js'
import Mine from './Mine.js'
import Edit from './Edit.js'

const base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

class Item extends Component {
    constructor(){
        super()
    }
    goDetail(){
        this.props.navigator.push({
            name: '详情页-'+this.props.title ,
            component: Detail ,
            params: this.props
        })
    }
    render(){
        var props = this.props

        const {width, height} = props

        return <TouchableHighlight onPress={this.goDetail.bind(this)}>
                <View style={{height, width}}>
                    <Image source={require('./../static/imgs/1.jpg')}
                        style={{resizeMode:'cover', flex:1, height,width }} >
                        <Image source={{uri: props.source.trim()}}
                               style={{  resizeMode: 'cover' , flex: 1, height, width ,justifyContent: 'flex-end',}}>
                            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']} >
                                <Text  numberOfLines={1}
                                    style={{fontSize: 20, padding: 5, backgroundColor: 'rgba(0,0,0,0)', color: '#fff' }}>{ props.title+props.height }</Text>
                                <Text style={{fontSize: 12, padding:5 , backgroundColor: 'rgba(0,0,0,0)', color: '#fff' }} numberOfLines={1}>{ props.summary }</Text>
                            </LinearGradient>
                        </Image>
                    </Image>
                </View>
            </TouchableHighlight>
    }
}

const TABBAR_ARR = ['home','find','message','mine']
class Home extends Component {
    constructor(){
        super()
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            refreshing: false,
            title: TABBAR_ARR[0],
            selectedTabBar: 'home', // home , heihei, mine
            dataSource: ds.cloneWithRows(new Array(6).fill({
                source: 'http://ww4.sinaimg.cn/mw1024/69b8b46ejw1el0csuat89j20hs0hsjur.jpg',
                title: '嘿嘿',
                summary: '撒地方是规范和的风格和地方干活电视剧跟你说点附近那你就舒服的功能是对方公司的那个'}) ),
        }
    }
    componentDidMount(){
        // this.props.setBarState()
        // this.na
    }
    refresh(){
        this.setState({refreshing: true})

        setTimeout(function(){
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

            var arr = ['蛤蛤','习近平','胡锦涛','周呢来','宋祖英','哈萨克斯坦','俄罗斯'].map(item=>{
                return {
                    title:item ,
                    summary: '撒地方是规范和的风格和地方干活电视剧跟你说点附近那你就舒服的功能是对方公司的那个',
                    source: 'http://p4.music.126.net/VjuJ1WpW2MFtp1XE3ns1MA==/269380348822591.jpg?param=640y300'
                }
            })
            this.setState({
                refreshing: false ,
                dataSource : ds.cloneWithRows( arr )
            })
        }.bind(this),2000)

    }
    iconSelect(){
        alert(111)
    }
    _render(){
        // 获取设备高、宽，pt非物理像素
        const {height, width} = Dimensions.get('window')

        return (<ListView dataSource={this.state.dataSource}
                    refreshControl={
                        <RefreshControl
                            title="loading..."
                            refreshing={this.state.refreshing}
                            progressBackgroundColor="#ffff00"
                            onRefresh={this.refresh.bind(this) } />
                    }
                    style={{ }}
                    renderRow={(rowData) =>
                        <Item {...rowData}
                            width={width}
                            height={Math.floor(width*8/16)}
                            navigator={this.props.navigator}></Item>}
            />)
    }
    getNavigator( type ){
        const { navigator } = this.props

        let navigatorBar = {}

        switch(type){
            case TABBAR_ARR[0]:
                navigatorBar = {
                    title: '首页',
                    leftButtonTitle: '登录页',
                    rightButtonTitle: 'Edit' ,
                    rightButtonPress(){
                        navigator.push({
                            name: '编辑页',
                            component: Edit  ,
                            params: {navigator}
                        })
                    },
                    backgroundColor: ''
                }
                break
            case TABBAR_ARR[1]:
                navigatorBar = {
                    title: '发现',
                    backgroundColor: 'rgb(45, 88, 139)'
                }
                break
            case TABBAR_ARR[2]:
                navigatorBar = {
                    title: '消息',
                    leftButtonTitle: '联系人',
                    rightButtonTitle: '未读',
                    backgroundColor: 'rgb(14, 186, 124)'
                }
                break
            case TABBAR_ARR[3]:
                navigatorBar = {
                    title: '我的',
                    backgroundColor: 'rgb(204, 110, 214)'
                }
                break
        }

        return navigatorBar
    }
    navigatorSwitch(type){

        let navigatorBar = this.getNavigator(type)

        this.setState({ navigatorBar })
    }
  render() {
      //   http://ww1.sinaimg.cn/mw1024/69b8b46egw1eymst7g4g8g20au085npd.gif


    const {navigator} = this.props

    const nb = this.state.navigatorBar || this.getNavigator('home')
    // 注意：
    // 每个TabBarIOS都需要包裹一个View，这个View会在这个Item被点击的时候，显示出来

    return (
        <View style={{flex:1, backgroundColor: '#fff'}}>
            <NavigatorBar {...nb} navigator={navigator} />
            <View style={{flex:1}}>
                <TabBarIOS
                    barTintColor='rgb(126, 190, 231)'
                    tintColor='white'
                    translucent={true} >
                    <TabBarIOS.Item
                        title="首页"
                        selected={ this.state.selectedTabBar === TABBAR_ARR[0] }
                        onPress={()=>{
                            this.setState({
                                selectedTabBar: TABBAR_ARR[0]
                            })
                            this.navigatorSwitch( TABBAR_ARR[0])
                        }}
                        icon={{uri: base64Icon , scale: 3}}>
                        {this._render()}
                    </TabBarIOS.Item>

                    <TabBarIOS.Item
                        title="发现"
                        selected={ this.state.selectedTabBar === TABBAR_ARR[1] }
                        onPress={()=>{
                            this.setState({
                                selectedTabBar: TABBAR_ARR[1]
                            })
                            this.navigatorSwitch( TABBAR_ARR[1])
                        }}
                        icon={{uri: base64Icon , scale: 3}}>
                        <Text>发现这个世界</Text>
                    </TabBarIOS.Item>

                    <TabBarIOS.Item
                        title="消息"
                        onPress={ ()=>{
                            this.setState({
                                selectedTabBar: TABBAR_ARR[2]
                            })
                            this.navigatorSwitch( TABBAR_ARR[2])
                        } }
                        badge={'999+'}
                        selected={ this.state.selectedTabBar === TABBAR_ARR[2] }
                        selectedIcon={{uri: base64Icon , scale: 3}}
                        icon={{uri: base64Icon , scale: 3}}>
                        <View>
                            <Text>我的，我的</Text>
                            <Image source={{uri:'http://p4.music.126.net/VjuJ1WpW2MFtp1XE3ns1MA==/269380348822591.jpg?param=640y300'}}
                                style={{width:50, height:50}}></Image>
                        </View>
                    </TabBarIOS.Item>

                    <TabBarIOS.Item
                        title="我"
                        onPress={ ()=>{
                            this.setState({
                                selectedTabBar: TABBAR_ARR[3]
                            })
                            this.navigatorSwitch( TABBAR_ARR[3])
                        } }
                        selected={ this.state.selectedTabBar === TABBAR_ARR[3] }
                        selectedIcon={{uri: base64Icon , scale: 3}}
                        icon={{uri: base64Icon , scale: 3}}>
                        <Mine navigator={navigator}></Mine>
                    </TabBarIOS.Item>
                </TabBarIOS>
            </View>
        </View>
    );
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

export default Home
