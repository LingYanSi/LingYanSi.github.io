
const NAME = 'mock'
const Slider = function(dom, data = [], index = 1){
    this.current = index
    this.data = data
    this.name = NAME
    this.LEN = data.length
    this.$ele = dom

    // 初始化
    this.go(index)
}

Slider.prototype = {
    next(){
        let index = this.current + 1
        this.go(index)
    },
    prev(){
        let index = this.current - 1
        this.go(index)
    },
    go(index){
        this.current = this.indexCheck(index, this.LEN)
        this.render()
    },
    indexCheck(index, len){
        // debugger
        if(index > len){
            return 1
        }
        if(index < 1){
            return len
        }
        return index
    },
    getRawHTML(index, data){
        let item = data[index]
        return new Promise(resolve => {
            if(item.type == 'mark-down'){
                this.fetch(item.data)
                    .then(md => {
                        console.log(md)
                        let html = converter.makeHtml(md)
                        html = `<div class="slider-item"><div style="display: inline-block;">${html}</div></div>`
                        resolve(html)
                    })
            }else{
                let html = `<div class="slider-item center">
                    <h1>${item.data}</h1>
                </div>`
                resolve(html)
            }
        })

    },
    render(){
        this.getRawHTML(this.current-1, this.data).then(html => {
            this.$ele.innerHTML = html
        })
    },
    fetch(page){
        return new Promise(resolve => {
            let url = `./${this.name}/${page}.md`
            fetch(url)
                .then(res => res.text())
                .then(data => {
                    resolve(data)
                })
        })
    }
}

var Data = [
    {
        type: 'html',
        data: `Mock`,
        animation: ''
    },
    {
        type: 'mark-down',
        data: 1,
        animation: ''
    },
    {
        type: 'mark-down',
        data: 2,
        animation: ''
    },
    {
        type: 'mark-down',
        data: 3,
        animation: ''
    }
]



// 事件监听
window.addEventListener('keyup', (event)=>{
    // 39 -> 38 |^ 37 <- 40 |v
    const keyCode = event.keyCode
    if(keyCode == 39 || keyCode == 40) {
        fuck.next()
    }
    if(keyCode == 38 || keyCode == 37) {
        fuck.prev()
    }
})
var converter = new showdown.Converter()

// 获取数据
let fuck = new Slider(document.querySelector('#app'), Data)
