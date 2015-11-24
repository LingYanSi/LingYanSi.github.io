/*
* @Author: zikong
* @Date:   2015-11-18 13:54:16
* @Last Modified by:   zikong
* @Last Modified time: 2015-11-18 15:07:52
*/

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Button from '../app/button';

describe('Button',()=>{
    it('测试按钮是否正常',()=>{
        var btnName = '我是按钮' ;
        var btn = ReactTestUtils.renderIntoDocument(
            <Button name="我是按钮" />
        );

        Button.self.setDis();

        console.log(Button.self.state, {disabled:false});
        expect( Button.self.state).toEqual({disabled:false});
        console.log('按钮状态', ReactTestUtils.findRenderedDOMComponentWithTag( btn, 'BUTTON').disabled )

        expect( !!ReactTestUtils.findRenderedDOMComponentWithTag( btn, 'BUTTON')).toBe(true);
        console.log( ReactTestUtils.findRenderedDOMComponentWithTag( btn, 'BUTTON').textContent, btnName )
        expect( ReactTestUtils.findRenderedDOMComponentWithTag( btn, 'BUTTON').textContent).toBe(btnName);
    })
});
