var $ = function(s){
    return document.querySelector(s)
}

// 一个组件，应该是一个function，在需要他的时候，进行实例化，然后渲染

var ListItem = Ent.createClass({
    data: {
        num: 0
    },
    click(){
        this.data.num++
    },
    template: `
        <div>子组件内部还有子组件 {data.num} <button onClick={this.click.bind(this)}>计数</button></div>
    `
})

var List = Ent.createClass({
    data: {
        title: '我是底部',
    },
    components: {Fuck},
    click(){
        console.log('咦。灭有');
        this.props.onClick()
    },
    template: `<div>
        <p onClick={this.click.bind(this)}>{props.index}:{props.content}</p>
        <span onClick={props.onDel} class="del" >删除</span>
    </div>`
})

// 支持slot，也就是react的props.children
var Header = Ent.createClass( {
    template: '<div><slot></slot></div>'
})

var Footer = Ent.createClass( {
    template: '<div>我是底部</div>'
})

// 创建一个组件
var App = Ent.createClass(  {
    data: {
        title: 'Ent组建技术',
        content: '我是内容',
        comments: [{
            username: '你好吗',
            id: 1,
            avatar: 'http://ww2.sinaimg.cn/mw690/006fecvljw1f6u96pi0qsg30by06h4qs.gif',
            sum: '我是简介'
        }],
        num: 0,
    },
    // 引入组建
    components: {Footer, List, Header},
    componentWillMount(){
        console.log('开始构建');
    },
    componentDidMount(){
        console.log('组件完成');
        // 其实store的作用是生命文档格式，data是真正的store
        var data = this.data
    },
    componentWillUpdate(){
        console.log('组件将要更新');
    },
    componentDidUpdate(){
        console.log('组件更新完毕');
    },
    fuck(event){
        if(event.target == this.refs.comment && event.keyCode != 13 ) return
        this.data.comments.push({
            content: this.refs.comment.value
        })
        this.data.num++
    },
    del(index){
        this.data.comments.splice(index, 1)
    },
    handleFooterClick(index){
        let comment = this.data.comments[index]
        console.log(comment);
        comment.content += '被电击了'
        this.data.comments.splice(index, 1, comment)
    },
    // 对模板的支持还是太弱了
    // 三则运算符，if else/forEach,等等，最好的一个状态是{}内包裹的是js语句
    // react render return前的逻辑操作其实可以前置的，也就是说并不用放在render函数内，并且理论上return的应该是一个比较单纯的字符串？
    template: `
        <div>
            <Header>
                <div>
                    <h1>请叫我顶部大人</h1>
                </div>
            </Header>
            <h2 >{data.title} {data.num}</h2>
            <div>{data.content}</div>
            <input type="text" ref="comment" onKeyUp={fuck.bind(this)} />
            <button class="add" onClick={fuck.bind(this)}>add</button>
            <ul each="$item in data.comments">
                <!-- 对于循环元素，建议使用一个包裹元素 -->
                <List index={$index} content={$item.content} onDel={this.del.bind(this,$index)} onClick={this.handleFooterClick.bind(this,$index)}></List>
            </ul>
            <Footer xx="xx"></Footer>
        </div>
    `
})

//  这里还有一个问题啊，不应立马render (⊙﹏⊙)b，不然有问题
Ent.render(App, {}, document.querySelector('#app'))
