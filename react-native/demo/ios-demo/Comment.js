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
  Animated,
  Dimensions
} from 'react-native';
import Carousel from 'react-native-looped-carousel'

var {width, height} = Dimensions.get('window');

class Item extends Component {
    constructor(){
        super()
    }
    render(){
        const props = this.props
        return <View>
            <Text>{props.username}</Text>
            <Text>{props.content}</Text>
            <Text>{props.time}</Text>
        </View>
    }
}


 class Comment extends Component {
    constructor(){
        super()

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource1: ds.cloneWithRows(new Array(6).fill({
                username: '周恩来',
                content: '毛新宇是位好同志',
                time: '2016-02-05'
            })) ,
            dataSource2: ds.cloneWithRows(new Array(20).fill({
                username: '毛泽东',
                content: '毛新宇是位好同志',
                time: '2016-02-05'
            })) ,
            tabIndex: 0 ,
            tabArr: [{
                title: '嘿嘿',
                bc: 'rgb(122, 49, 25)',
                bcC: 'rgba(222, 111, 218, 0.87)'
            },{
                title: '蛤蛤',
                bc: 'rgb(33, 179, 121)',
                bcC: 'rgba(222, 111, 218, 0.87)'
            }]
        }
    }
    tabSwitch(index){
        this.setState({
            tabIndex: index
        })
    }
  render() {
     const props = this.props

    return <ScrollView style={{flex:1}}>
        <Carousel autoplay={false} style={styles.carousel}>
        <View style={styles.carousel}>
            <Image source={ require('./../static/imgs/1.jpg')}
                resizeMode='cover'
                style={ styles.carouselImg }>
            </Image>
        </View>
        <View style={styles.carousel}>
            <Image source={require('./../static/imgs/1.jpg')}
                resizeMode='cover'
                style={ styles.carouselImg}>
            </Image>
        </View>
        <View style={styles.carousel}>
            <Image source={{uri: 'http://ww4.sinaimg.cn/mw1024/69b8b46ejw1el0csuat89j20hs0hsjur.jpg'}}
                resizeMode='cover'
                style={ styles.carouselImg }>
            </Image>
        </View>
      </Carousel>
        <View style={ styles.switchWrap }>
            {this.state.tabArr.map((ele,index)=>{
                return (<TouchableHighlight style={ [styles.switchItem, {backgroundColor:
                    (index == this.state.tabIndex ? ele.bcC : ele.bc)
                 }] }
                    key={index}
                    onPress={this.tabSwitch.bind(this, index)}>
                    <Text style={[styles.textCenter]}>{ele.title}</Text>
                </TouchableHighlight>)
            })}
        </View>
        <Animated.View>
            <View style={{width:187.5, left:187.5, borderBottomWidth: 2, borderBottomColor: 'yellow'}}></View>
        </Animated.View>
        <View style={{width: 750, flex: 1 , flexDirection:'row'}} horizontal={true}>
            {this.state.tabIndex != 0 ? null : <ListView dataSource={this.state.dataSource1}
                style={[{flex: 1}]}
                renderRow={(rowData)=> <Item {...rowData}></Item>}></ListView>
            }
            {this.state.tabIndex != 1 ? null : <ListView dataSource={this.state.dataSource2}
                    style={[{flex: 1}]}
                    renderRow={(rowData)=> <Item {...rowData}></Item>}></ListView>
            }
        </View>
    </ScrollView>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
},
switchWrap: {
    flexDirection: 'row'
},
switchItem: {
    flex:1,
    backgroundColor: 'red',
    paddingTop: 10,
    paddingBottom: 10
},
textCenter: {
    textAlign: 'center'
},
slider: {
    width: 375,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden'
},
carousel:{
    width: width ,
    height: width*3/4
},
carouselImg: {
    width: width ,
    height: width*3/4 ,
    resizeMode: 'cover'
}
});

export default Comment
