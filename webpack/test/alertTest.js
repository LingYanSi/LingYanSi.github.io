/*
* @Author: zikong
* @Date:   2015-11-17 10:30:01
* @Last Modified by:   zikong
* @Last Modified time: 2015-11-18 09:33:17
*/

'use strict';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Alert from '../app/alert';

describe('Alert', () => {
    it('获取组件State.msg', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <Alert />
        );
        // expect(!!ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'div')).toBe(true);
        console.log( Alert.getData() )
        expect( Alert.getData().msg).toBe( 'huangcheng你大爷的');

    });

    it('should call onPress as being clicked', function () {
        let instance = ReactTestUtils.renderIntoDocument(
            <Alert />
        );

        var node = Alert.self.refs.button ;

        ReactTestUtils.Simulate.click( node);
        console.log( Alert.getData() )
        expect( Alert.getData().msg).toBe( '被点击后的数据');

    })
});

/*
    单元测试，正确的输入，数据以props的形式传入，getData获取数据，辅以点击事件，模拟用户输入

*/
