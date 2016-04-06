'use strict';

import React , {
    Component ,
    ScrollView ,
    TextInput ,
    ListView ,
    View ,
    Image ,
    Text ,
    StyleSheet,
    Dimensions
} from 'react-native' ;

// 头像信息部分
class Header extends Component{
    constructor(){
        super()
    }
    render(){
        return (<View style={ styles.containers }>
            <Image style={ styles.header }
                source={require('./../../static/imgs/1.jpg')}></Image>
            <View style={ styles.info }>
                <Text style={ styles.infoTitle }>蛤蛤</Text>
                <Text style={ styles.infoSum }>念去去千里烟波</Text>
            </View>
            <Image style={ styles.rightIcon }
                source={require('./../../static/imgs/1.jpg')}></Image>
        </View>)
    }
}

const styles = StyleSheet.create({
    containers: {
        flex: 1 ,
        flexDirection: 'row',
        padding: 10 ,
        marginTop: 15 ,
        backgroundColor: '#fff',
        borderTopWidth: 1 ,
        borderBottomWidth: 1 ,
        borderTopColor: 'red',
        borderBottomColor: 'red',
    },
    header: {
        width: 60,
        height: 60 ,
        borderWidth: 1 ,
        borderColor: 'red',
        borderRadius: 10
    },
    info: {
        height: 60 ,
        flex: 1 ,
        paddingLeft: 10 ,
        paddingRight: 10
    },
    infoTitle: {
        height: 30 ,
        fontWeight: 'bold',
        lineHeight: 26 ,
        fontSize: 16
    },
    infoSum: {
        height: 30 ,
        fontSize: 14 ,
        lineHeight: 20
    },
    rightIcon: {
        height: 60 ,
        width: 20
    }
})

export default Header
