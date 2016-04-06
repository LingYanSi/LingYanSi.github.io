'use strict';

import React , {
    Component ,
    ScrollView ,
    TextInput ,
    View ,
    Dimensions
} from 'react-native' ;
import NavigatorBar from './NavigatorBar.js'

class Mine extends Component{
    constructor(props){
        // super(props)
        super()
    }
    render(){
        const {width, height} = Dimensions.get('window')

        const props = this.props.params

        const nb = {
            title: '编辑页2222',
            leftButtonTitle: '<返回',
            rightButtonTitle: '布啦啦'
        }

        return (
        <View  style={{backgroundColor: '#fff', flex: 1} }>
            <NavigatorBar {...nb} navigator={props.navigator} />
            <ScrollView>
                <View style={{padding: 10}}>
                    <TextInput style={{  width: (width-20), borderWidth: 1 ,height:30, fontSize:12 , paddingLeft: 6, paddingRight: 6}}
                        maxLength={10}
                        ref='title'
                        placeholder='标题，最多10字'
                        placeholderTextColor="rgb(58, 236, 204)"/>
                    <TextInput style={{  width: (width-20), height:300, borderWidth: 1 , lineHeight: 20, fontSize: 12, padding: 6, paddingTop:0, marginTop: 10}}
                        ref='title'
                        placeholder='文章...'
                        multiline={true}
                        placeholderTextColor="rgb(58, 236, 204)"/>

                </View>
            </ScrollView>
        </View>)
    }
}

export default Mine
