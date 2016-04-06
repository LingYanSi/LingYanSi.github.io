'use strict';

import React , {
    Component ,
    ScrollView ,
    TextInput ,
    ListView ,
    View ,
    Image ,
    Text ,
    TouchableOpacity ,
    StyleSheet,
    Dimensions
} from 'react-native' ;

import Photo from './../Photo/Photo.js'

// 头像信息部分
class List extends Component{
    constructor(){
        super()
    }
    render(){
        const props = this.props
        const {navigator} = props

        return (<ListView
            style={ styles.containers }
            dataSource={ props.dataSource }
            renderRow={(rowData)=> <Item {...rowData} navigator={navigator} ></Item>}
            ></ListView>)
    }
}

class Item extends Component{
    constructor(){
        super()
    }
    go(){
        const {navigator} = this.props

        navigator.push({
            title: '相册',
            component: Photo ,
            params: {
                navigator
            }
        })
    }
    render(){
        const props = this.props

        return (<TouchableOpacity onPress={this.go.bind(this)}>
            <View style={[styles.Item, {borderTopWidth: props.index==0?0:1}] }>
                <Image></Image>
                <View>
                    <Text>{ props.name }</Text>
                </View>
                <Image></Image>
            </View>
        </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    containers: {
        borderBottomColor: 'red' ,
        borderBottomWidth: 1 ,
        borderTopColor: 'red' ,
        borderTopWidth: 1 ,
        paddingLeft: 10 ,
        backgroundColor: '#fff'
    },
    Item: {
        borderTopColor: 'red' ,
        borderTopWidth: 1 ,
        padding: 10
    }
})

export default List
