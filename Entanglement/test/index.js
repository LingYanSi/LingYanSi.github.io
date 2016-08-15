var $ = function(s){
    return document.querySelector(s)
}

// Fuck组件，渲染一次

var Footer = new Component('Footer', {
    template: '<div>{props.xx}:我是底部</div>'
})

// 支持slot，也就是react的props.children
var Header = new Component('Header', {
    template: '<div>我是顶部<slot></slot></div>'
})

// 创建一个组件
var App = new Component('App', {
    data: {
        title: '什么',
        content: '我是内容',
        comments: [],
        num: 0,
    },
    // 引入组建
    components: {Footer, Header},
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
        this.data.comments.push({
            content: this.refs.comment.value
        })
        this.data.num++
    },
    del(index){
        this.data.comments.splice(index, 1)
    },
    // 对模板的支持还是太弱了
    // 三则运算符，if else/forEach,等等，最好的一个状态是{}内包裹的是js语句
    template: `
        <div>
            <Header>
                <div>
                    <h1>我才是顶不能呢</h1>
                    <ss>你个下流胚子</ss>
                </div>
                我也不太清楚呢
            </Header>

            <h1 >ToDo</h1>
            <h2 >{data.title} {data.num}</h2>
            <div>{data.content}</div>
            <input type="text" ref="comment" />
            <button class="add" onClick={fuck.bind(this)}>add</button>
            <ul each="x in data.comments">
                <li>
                    {$index}:{x.content}
                    <span onClick={this.del.bind(this,$index)} class="del" >删除</span>
                    <Footer xx={$index}></Footer>
                </li>
            </ul>
            
            <Footer xx="xx"></Footer>
        </div>
    `,
    // render(){
    //     var data = this.data
    //
    //     console.log('--------');
    //     // 单纯的字符串模板无法完成功能，需要自定义一套语法
    //     return `
    //         <h1>ToDo</h1>
    //         <h2>{data.title}</h2>
    //         <div>{data.content}</div>
    //         <input type="text" ref="comment" />
    //         <button class="add" onClick={this.fuck.bind(this)}>add</button>
    //     `
    // }
})

//  这里还有一个问题啊，不应立马render (⊙﹏⊙)b，不然有问题
Ent.render(App, {}, document.querySelector('#app'))
