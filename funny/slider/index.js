'use strict'

const Slider = function(dom, data = [], index = 1, name = '') {
    this.current = index
    this.data = data
    this.name = name
    this.LEN = data.length
    this.$ele = dom
    this.$layer = dom.querySelector('.layer')
    this.$content = dom.querySelector('.content')
    this.cache = {}
    this.animation = ''

    // 动画结束，销毁class
    this.$ele.addEventListener('animationend', () => {
            this.animationend()
        })
        // 初始化
    this.go(index)
}

Slider.prototype = {
    animationend() {
        let classList = this.$content.classList
        let type = this.animation
        classList.remove(`${type}-init`)
        classList.remove(`${type}-animation`)
    },
    next() {
        let index = this.current + 1
        this.go(index)
    },
    prev() {
        let index = this.current - 1
        this.go(index)
    },
    go(index) {
        // 销毁之前所有动画
        this.animationend()

        this.current = this.indexCheck(index, this.LEN)
        let item = this.data[this.current - 1]
        let type = this.animation = item.animation

        // 如果有动画，就执行动画
        // 位置初始化
        type && this.$content.classList.add(`${type}-init`)
            // 渲染内容
        this.render()

        this.$layer.style.backgroundImage = `url(${item.bgd || ''})`
            // 执行动画
        type && this.$content.classList.add(`${type}-animation`)

        // 保存页面状态到路由
        Router.push(this.current)
    },
    indexCheck(index, len) {
        // debugger
        if (index > len) {
            return 1
        }
        if (index < 1) {
            return len
        }
        return index
    },
    getRawHTML(index, data) {
        let item = data[index]
        return new Promise(resolve => {
            if (item.type == 'mark-down') {
                this.fetch(item.data)
                    .then(md => {
                        let html = converter.makeHtml(md)
                        html = `<div class="slider-item"><div style="display: inline-block;">${html}</div></div>`
                        resolve(html)
                    })
            } else {
                let html = `<div class="slider-item center">
                    <h1 style="font-size: 5rem;">${item.data}</h1>
                </div>`
                resolve(html)
            }
        })

    },
    render() {
        this.getRawHTML(this.current - 1, this.data).then(html => {
            this.$content.innerHTML = html
        })
    },
    fetch(page) {
        return new Promise(resolve => {
            let cache = this.cache
            let url = `./${this.name}/${page}.md`
            if (cache[url]) {
                resolve(cache[url])
                return
            }
            // let script = document.createElement('script')
            // script.src = url
            // script.type = 'text/template'
            // script.onload = function(){
            //     cache[url] = script.innerHTML
            //     resolve(cache[url])
            // }
            // document.head.appendChild(script)
            fetch(url)
                .then(res => res.text())
                .then(data => {
                    cache[url] = data
                    resolve(cache[url])
                })
        })
    }
}


// 事件监听
window.addEventListener('keyup', (event) => {
    // 39 -> 38 |^ 37 <- 40 |v
    const keyCode = event.keyCode
    if (keyCode == 39 || keyCode == 40) {
        fuck.next()
    }
    if (keyCode == 38 || keyCode == 37) {
        fuck.prev()
    }
})

// Markdown to html
var converter = new showdown.Converter()

// 获取数据
let fuck = new Slider(document.querySelector('#app'), Data, Router.PAGE, Router.NAME)
