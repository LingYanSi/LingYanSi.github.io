/*
* @Author: zikong
* @Date:   2015-12-01 10:35:25
* @Last Modified by:   zikong
* @Last Modified time: 2015-12-11 16:10:49
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

karma start 运行

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

