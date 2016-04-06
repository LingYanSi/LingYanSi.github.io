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

import Header from './Mine/Header.js'
import List from './Mine/List.js'

class Mine extends Component{
    constructor(props){
        // super(props)
        super()


        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state= {
            dataSource: ds.cloneWithRows( '0'.repeat(4).split('').map((ele,index)=>{
                    return {
                    name: '相册收藏',
                    content: '毛新宇是位好同志',
                    index: index
                }
            }) )
        }
    }
    render(){
        const {width, height} = Dimensions.get('window')
        const {navigator} = this.props

        return (<ScrollView style={ styles.containers }>
            <Header></Header>
            <View style={ styles.listWarp }>
                <List dataSource={ this.state.dataSource} navigator={navigator}></List>
            </View>
            <View style={ styles.listWarp }>
                <List dataSource={ this.state.dataSource}></List>
            </View>
        </ScrollView>)
    }
}

const styles = StyleSheet.create({
    containers: {
        backgroundColor: 'rgb(231, 233, 233)'
    },
    listWarp: {
        marginTop: 15
    }
})

export default Mine
