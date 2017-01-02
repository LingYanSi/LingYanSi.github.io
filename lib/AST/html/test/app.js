let {Component, DOMRender} = window.Rv

let list= [
    {
        title: '今天的哈哈哈',
        content: "☺☺☺☺☺",
        tag: 'today'
    },
    {
        title: '本月的哈哈哈',
        content: "☺☺☺☺☺",
        tag: 'month'
    },
    {
        title: '这周的哈哈哈',
        content: "☺☺☺☺☺",
        tag: 'date'
    }
]
class Name extends Component {
    template = `<span>Rv</span>`
}

class H1 extends Component {
    template = `<h1 onclick={click} class="center"><Name />{state}</h1>`
    data = {
        state: ' Todo List'
    }
    components = {Name}
    method = {
        click(){
            this.state += ' +1s'
        }
    }
}

class App extends Component{
    template = `
        <div aa="cc" dd={ 0 ? "我怎么知道呢" : 22} ee ff ssss="1111">
            <H1></H1>
            <input type="text" value={name} v-if={input} onKeyUp={keyup} ref="input" /><button onClick={add}>提交</button>
            <div bb="dd" v-click="11111" onclick={click} >{name}</div>
            <ul v-for="x in showList">
                <li>{$index + 1} : {x.title} : {x.content} <button onclick={del} data-index={$index}>删除</button></li>
            </ul>
            <div>
                <button class={currentFilter == 'today' && 'current' } onClick={filter.bind(this, 'today')}>今天</button>
                <button class={currentFilter == 'date' && 'current' } onClick={filter.bind(this, 'date')}>本周</button>
                <button class={currentFilter == 'month' && 'current' } onClick={filter.bind(this, 'month')}>本月</button>
                <button class={currentFilter == 'all' && 'current' } onClick={filter.bind(this, 'all')}>全部</button>
            </div>
            <p>倒计时{time}秒 <button onClick={reset}>reset</button></p>
        </div>
    `
    components = {H1}
    data = {
        name: '黄成受贿',
        input: true,
        ll: {
            f: 1
        },
        style: {},
        list,
        showList: list,
        currentFilter: 'all',
        time: 100,
    }
    method = {
        keyup(event) {
            if(event.keyCode == 13) {
                this.add(event)
            }
            this.name = event.target.value
        },
        del(event) {
            this.list = this.list.filter((ele, index) => index != +event.target.dataset['index'])
            this.filter()
        },
        add(event){
            this.list.push({
                title: '我是title',
                tag: 'today',
                content: this.refs.input.value
            })
            this.filter()
        },
        filter(type){
            type = type || this.currentFilter

            this.showList = this.list.filter(i => type != 'all' ? i.tag == type : 1)

            this.currentFilter = type

            console.log(type)
        },
        click() {
            alert("1111")
        },
        reset(){
            this.time = 100
            if (!this.time) this.startTime()
        },
        startTime(){
            let interval = setInterval(()=>{
                if(this.time == 0 )
                    return clearInterval(interval)
                this.time--
            }, 1000)
        }
    }
    // 事件监听
    events = {

    }
    // 生命周期
    componentDidMount(){
        this.startTime()
    }
}


DOMRender(App, document.querySelector('#app'))
