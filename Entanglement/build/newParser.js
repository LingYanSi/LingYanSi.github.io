function Parser(str){

    str.split('').some(item => {

    })
}

Parser.prototype = {
    read(W){
        // 没有匹配成功，就跳出
        if (expectWord.test(W)) {

        } else {
            console.log('语法错误，停止解析');
        }
    },
    expectWord: /\</,
    exceptCache: {},
    state: {},
    TOKEN: {
        TAG_OPEN_START: '<',
        TAG_OPEN_END: '>',
        TAG_NAME: /[a-zA-Z]/,
        COMPONENT_NAME: /[A-Z]/,
        PROPERTY: '', // 字符串 也期望
        // tagName 匹配模式，遇到终结处，切换到其他匹配模式
        // = 期望 "/{
        // " 期望 "/[^"] 进入字符串匹配模式
        // { 期望 进入表达式匹配模式
        // > 进入
    }
}

`<App>
    <div name="ssss" xx="dddd">ssss</div>
    <span onClick={this.click}>{xxxxx}</span>
</App>`

`<div name="ssss" xx="dddd">ssss</div>`


/*
第一步进入 Open Tag匹配
    < 期望String/\s
        |-- String String/\s//>/> 否则报错
        ||
        进入下一步
*/
