/*
* @Author: zikong
* @Date:   2015-12-12 22:33:13
* @Last Modified by:   zikong
* @Last Modified time: 2015-12-13 20:40:54
*/

'use strict';

var React = require('react-native');

var {
    StyleSheet ,
    ScrollView,
    View ,
    Text ,
    Image ,
} = React ;

var Result = React.createClass({
    render(){
        return <ScrollView style={ styles.container } >
            <View style={{flex: 1}}>
                <Image source={{uri:'http://ww1.sinaimg.cn/large/69b8b46ejw1ewsr8sgec4j20go09ddh6.jpg'}}
                        style={ styles.image } />
                <View style={ styles.view }>
                    <Text style={ styles.text } >{ this.props.text}</Text>
                    <Text style={ styles.text }>呜呜呜呜呜呜</Text>
                </View>
            </View>
            <Text>你大舅你二舅都是你舅</Text>
        </ScrollView>
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 200,
        backgroundColor: 'gray'
    },
    view: {
        position: 'absolute',
        flex: 1,
        // width:
        bottom: 0 ,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    text: {
        fontSize: 20,
        color: 'red' ,
        height: 20
    },
    image: {
        height: 300
    }
});

module.exports = Result ;
