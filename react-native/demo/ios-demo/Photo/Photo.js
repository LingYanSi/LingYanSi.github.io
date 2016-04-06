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

import Header from './Header.js'
import Navigator from './../NavigatorBar.js'

class Mine extends Component{
    constructor(props){
        // super(props)
        super()
        this.state = {
            headerData: {
                username: '灵岩',
                avatar: '' ,
                bigImg: '' ,
                sum: '国不知有民，民亦不知有国'
            }
        }
    }
    render(){

        const {width, height} = Dimensions.get('window')
        console.log('传递参数', this.props.params )

        const {navigator} = this.props.params

        const nb = {
            title: '相册',
            leftButtonTitle: '<我' ,
            rightButtonTitle: '发一条',
            rightButtonPress(){
                alert('发布新的说说')
            }
        }

        return (
            <View style={ {flex:1} }>
                <Navigator navigator={navigator} {...nb} ></Navigator>
                <ScrollView style={ styles.containers }>
                    <Header data={ this.state.headerData }></Header>
                </ScrollView>

            </View>)
    }
}

const styles = StyleSheet.create({
    containers: {
        backgroundColor: 'rgb(231, 233, 233)' ,
        flex: 1
    },
    listWarp: {
        marginTop: 15
    }
})

export default Mine
