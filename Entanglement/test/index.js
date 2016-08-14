var $ = function(s){
    return document.querySelector(s)
}

// Fuck组件，渲染一次

// 创建一个组件
var App = new Component({
    data: {
        title: '什么',
        content: '我是内容',
        comments: [
            {content:'评论已'},
            {content:'评论2'},
        ],
        num: 0,
    },
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
        this.data.title = '傻逼吗'+ this.data.num++
    },
    // 对模板的支持还是太弱了
    // 三则运算符，if else/forEach,等等，最好的一个状态是{}内包裹的是js语句
    template: `
        <div>
            <h1 >ToDo</h1>
            <h2 >{title}</h2>
            <div>{content}</div>
            <input type="text" ref="comment" />
            <button class="add" onClick={fuck}>add</button>
            <Fuck name="周永康" style={style}></Fuck>
            <!-- 执行结果 -->
            <ol v-for="x in comments">
                <li>{x.content}</li>
            </ol>
        </div>
    `,
    render(){
        var data = this.data

        console.log('--------');
        // 单纯的字符串模板无法完成功能，需要自定义一套语法
        return `
            <h1>ToDo</h1>
            <h2>{data.title}</h2>
            <div>{data.content}</div>
            <input type="text" ref="comment" />
            <button class="add" onClick={this.fuck.bind(this)}>add</button>
        `
    }
})

//  这里还有一个问题啊，不应立马render (⊙﹏⊙)b，不然有问题
Ent.render(App, document.querySelector('#app'))
