/*
* @Author: zikong
* @Date:   2015-12-12 22:33:13
* @Last Modified by:   zikong
* @Last Modified time: 2015-12-14 09:32:00
*/

'use strict';

var React = require('react-native');

var {
    StyleSheet ,
    ScrollView,
    View ,
    Text ,
    Image ,
    ListView,
    TouchableHighlight
} = React ;

var Result = React.createClass({
    getInitialState(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows([{
                        name: '哎呀啊',
                        sum: '封锁石凳'
                    },{
                        name:'哎呀啊',
                        sum:'封锁石凳'
                    },{
                        name:'哎呀啊',
                        sum:'封锁石凳'
                    }])
        }
    },
    scroll(event){
        console.log( event )
    },
    renderList(rowData){
        // console.log( ...arguments)
        return <TouchableHighlight underlayColor="rgba(200,100,30,1)">
            <View style={{borderBottomWidth: 0.5, borderColor: 'green', flex:1, flexDirection:'row', padding:8 }} >
            <Image source={{uri:'http://ww1.sinaimg.cn/large/69b8b46ejw1ewsr8sgec4j20go09ddh6.jpg'}}
                        style={{width: 50, height:50} } />
            <View style={{ flex:1, height: 50 , flexDirection:'column', paddingLeft: 8 }}>
                <View style={{ height: 30, justifyContent: 'center'}}>
                    <Text style={{fontSize: 16 }}>{rowData.sum}</Text>
                </View>
                <View style={{flex:1, justifyContent: 'center'}}>
                    <Text style={{color: 'rgb(210,210,210)' }}>{rowData.sum}</Text>
                </View>
            </View>
            </View>
        </TouchableHighlight>
    },
    render(){
        return <ScrollView style={ styles.container }
                            onScroll={ this.scroll } >
            <View style={{flex: 1}}>
                <Image source={{uri:'http://ww1.sinaimg.cn/large/69b8b46ejw1ewsr8sgec4j20go09ddh6.jpg'}}
                        style={ styles.image } />
                <View style={ styles.view }>
                    <Text style={ styles.text } >{ this.props.text}</Text>
                    <Text style={ styles.text }>呜呜呜呜呜呜</Text>
                </View>
            </View>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={ this.renderList }   />
        </ScrollView>
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 200,
        // backgroundColor: 'rgba(247,105,105,0.2)'
    },
    view: {
        position: 'relative',
        marginTop:-40,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    text: {
        fontSize: 10,
        color: 'red' ,
        height: 20
    },
    image: {
        height: 300
    }
});

module.exports = Result ;
