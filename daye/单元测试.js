/*
* @Author: zikong
* @Date:   2015-12-01 10:35:25
* @Last Modified by:   zikong
* @Last Modified time: 2015-12-18 15:30:11
*/

'use strict';

karma
karma-coverage
karma-jasmine
karma-chrome-launcher
istanbul
karma-mocha
mocha


babel-loader
babel-preset-react
babel-preset-es2015


http://www.cnblogs.com/wushangjue/p/4539189.html

其他就是写测试文件

karma start / karma start karma.config.js 运行

前面的话：
    代码分为【可被测试的、不可被测试的】
    在React中的测试，所有的库都需要通过 require/import 的形式引入，比如 underscore/lodash
    不然执行karma start时会报错，一开始想的解决方案是，在测试文件中引入这些库，但试了几次好像解决不了这个问题

1. Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.

2. 对于比较深？的数据的console一般使用
    console.log( require('util').inspect( data ) )

3. 奇怪的问题，以下为伪代码
    <select name="" id="">
        <option value="">嘿嘿</option>
        <option value="">蛤蛤</option>
        <option value="">啦啦</option>
    </select>

    var insatnce = ReactTestUtils.renderInDocument(<Select />) ;
    var options = ReactTestUtils.scryRenderedDOMComponentsWithTag(insatnce, 'option');
    console.log( options[0], options[1], options[2] );
    打印出来的结果都是 啦啦，啦啦，啦啦 ； 很奇怪。

4. react测试组件
    一般的jsx文件内部只定义一个组件，输出一个组件
    但有的文件内部定义了多个组件，只输出一个组件，如何测试那些没有被输出地组件？

    比如说
    const Component1 = React.createClass({}) ;
    const Component2 = React.createClass({}) ;
    module.exports = Component2 ;

    如何测试 Component1 ?

    最好，一个文件内只写一个组件，方便测试

5. TypeError: Cannot read property 'classSet' of undefined

    原因：
        React.addons.classSet 爆出来的，没有找到好的解决方案，最后通过三则运算替代带了这种形式解决的，比较挫
        var classes = React.addons.classSet({
            'hei haha ': true ,
            'hei haha aiya': oneVar
        });

6. target.dispatchEvent is not a function

        原因： var input = ReactTestUtils.scryRenderedDOMComponentWithTag('input') ;
               console.log( input )
            在shell中不会打印，且会报错

        解决：类似于深度遍历？
            console.log(require('util').inspect(nav, { depth: null }))

        链接：
            http://stackoverflow.com/questions/31994873/typeerror-on-target-dispatchevent-when-console-log-variable

7. 设置input.value = '1111' , 没有达到预期的效果

    问题：
        let input = ReactTestUtils.findRenderedDOMComponentWithTag('input');
        input.value = '1111' ;
        console.log( require('util').inspect(input, {depth: null} ) );

    解决：
        其value并没有发生变化，主要是因为获取的还是React.refs.input 它不并不是真是的DOM
        React.findDOMNode(input).value = 'sth else' ;

8. jasmine 对异步的测试

    问题：
        小店项目中用了pubsub-js来处理不同组件间的消息传递，而pubsub使用了setTimeout处理【事件流】
    解决：
        也很简单，和promise基本一样，在done被触发后，这条测试才会结束
        it('dulalal',(done)=>{
            setTimeout(()=>{
                dosth ;
                done();
            })
        })

9. Disconnected (1 times), because no message in 10000ms ....

    问题：
        如上
    解决：
        遇到过几次这样的问题，排查原因主要是因为
        var li = ReactTestUtils.scryRenderedDOMComponentsWithTag('li')
        console.log( require('util').inspect(li, {depth:null}) );
        情况有些诡异
        // 似乎是因为，karma在浏览器运行时间过长，迟迟没有响应,
        可能是因为 console.log( require('util').inspect(li, {depth:null}) )
        执行时间过长导致的。 注释掉这段代码即可

10. props/state的模拟数据，不要和比对数据通用

    bad:
        let data = {name: '毛泽东'} ;
        let instance = ReactTestUtils.renderInDocument( <Com data={data} />);
        expect( Com.getData ).toBe( data )

    good:
        let data = {name: '毛泽东'} ;
        let testData = {name: '毛泽东'} ;
        let instance = ReactTestUtils.renderInDocument( <Com data={data} />);
        expect( Com.getData ).toBe( testData )

11. 避免使用jquery去操作view层,修改/获取数据等等


