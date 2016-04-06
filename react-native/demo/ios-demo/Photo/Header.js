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

const {width, height} = Dimensions.get('window')

class Header extends Component{
    constructor(props){
        // super(props)
        super()

    }
    render(){
        const {width, height} = Dimensions.get('window')

        const data = this.props.data

        return (<View style={styles.containers}>
            <Image source={ require('./../../static/imgs/1.jpg') } style={[styles.bigImg]}></Image>
            <View style={[ styles.usernameAvatar ]}>
                <Text style={ styles.username }>{ data.username }</Text>
                <Image source={ require('./../../static/imgs/1.jpg') } style={ styles.avatar }></Image>
            </View>
            <Text style={ styles.sum }>{ data.sum }</Text>
        </View>)
    }
}

const styles = StyleSheet.create({
    containers: {
        backgroundColor: 'rgb(231, 233, 233)' ,
        marginTop: -width/3
    },
    bigImg: {
        width: width ,
        height: width ,
        resizeMode: 'cover'
    },
    usernameAvatar: {
        flex: 1 ,
        flexDirection: 'row',
        marginTop: - 70/4*3,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    username: {
        fontSize: 20 ,
        textAlign: 'right',
        lineHeight: 70/2 ,
        height: 70 ,
        flex: 1 ,
        color: '#fff' ,
        paddingLeft: 5 ,
        paddingRight: 10
    },
    avatar: {
        width: 70 ,
        height: 70 ,
        marginRight: 10*2,
        borderWidth: 1 ,
        borderRadius: 6 ,
        borderColor: 'red'
    },
    sum: {
        fontSize: 14 ,
        textAlign: 'right' ,
        padding: 10
    }
})

export default Header
