
/*
    $ele: 父元素
    arr: 图片数组
    url: 当前图片
*/
function Slider($ele, arr, url){
    this.$ele = $ele
    this.arr = arr

    this.$items = [].slice.call($ele.querySelectorAll('.preview-item'))
    this.endNum = 0
    this.currentIndex = arr.indexOf(url) || 0

    // 图片加载成功的毁掉函数
    this.load = ()=>{
        // 创建一个Pinch 捏合
        this.pinch = new Pinch(this.$ele, this.$img, (TX, TY, dimension)=>{
            // 滑动中回调函数
            if(TX == 0) return
            if(TX<0){
                this.$next.style.cssText += `;transform: translate3D( ${TX + dimension.width}px , -50%, 0);`
                this.$prev.style.cssText += `;transform: translate3D( -100% , -50%, 0);`

            }else {
                this.$prev.style.cssText += `;transform: translate3D( ${TX - dimension.width}px , -50%, 0);`
                this.$next.style.cssText += `;transform: translate3D( 100% , -50%, 0);`

            }
        } ,
        (TX, TY, dimension) => {
            // 滑动结束回调函数

            // 当Math.abs(TX) > 100 时候才切换
            const MAX = 100
            if(TX == 0) return

            // 因为我们改变的是img的transform，因此在这里要改变其父元素的transform
            this.$current.style.cssText += `;transform: translate3D( ${TX}px, -50%, 0);`
            // 强制浏览器paint
            this.$next.clientHeight

            this.$current.style.cssText += `;transition: .3s;`
            if(TX<0){
                this.$next.style.cssText += `;transition: .3s;`
                this.$next.clientHeight
                this.$next.style.cssText += Math.abs(TX) > MAX ? `;transform: translate3D( 0% , -50%, 0);` : `;transform: translate3D( 100% , -50%, 0);`
            }else {
                this.$prev.style.cssText += `;transition: .3s;`
                this.$prev.clientHeight
                this.$prev.style.cssText += Math.abs(TX) > MAX ? `;transform: translate3D( 0% , -50%, 0);` : `;transform: translate3D( -100% , -50%, 0);`
            }

            // 方向 向左 -1 向右 +1
            this.direction = Math.abs(TX) > MAX ? -TX/Math.abs(TX) : 0
            this.$current.style.cssText += Math.abs(TX) > MAX ? `;transform: translate3D( ${TX/Math.abs(TX)*100}% , -50%, 0);` : `;transform: translate3D( 0, -50%, 0);`

        })
        // 双击事件监听
        this.tap = Tap(this.$img, ()=> {
            this.pinch.toggle()
        }, 2, 600)
    }

    // transitionend事件，因此事件的冒泡性，我们不必监听具体的某两个子元素，而是去监听父元素，这样可减少逻辑复杂性
    this.end = ()=>{
        this.endNum++
        if(this.endNum < 2) return
        this.endNum = 0

        let $dom = this.direction == 0 ? this.$current : (this.direction<0 ? this.$prev : this.$next)
        // 如果新的元素和老元素是同一个，就不必卸载事件
        if($dom != this.$current){
            this.$img.style.cssText += `;transform: none;`
            // debugger
            this.$img.removeEventListener('load', this.load)
            this.$ele.removeEventListener('transitionend', this.end)

            this.pinch.destory()
            this.tap.destory()
        }

        this.$current.style.cssText += `;transition: none;`
        this.$current.classList.remove('current')
        this.$prev.style.cssText += `;transition: none;`
        this.$prev.querySelector('img').style.cssText += `;transform: none;`

        this.$next.style.cssText += `;transition: none;`
        this.$next.querySelector('img').style.cssText += `;transform: none;`

        this.currentIndex = this.checkIndex(this.currentIndex + this.direction)

        this.init($dom)
    }
    this.init()
}

// 校验index，并返回合法的index
Slider.prototype.checkIndex = function(index){
    if(index < 0) {
        return this.arr.length - 1
    }
    if( index > this.arr.length - 1) {
        return 0
    }
    return index
}

// 初始化，完成事件绑定等一些列事情
Slider.prototype.init = function($dom){
    // 如果新元素和老元素一样，就不必执行
    if($dom){
        if($dom == this.$current ) return
    }

    // 当前元素
    this.$current = $dom || this.$items[0]
    this.$current.classList.add('current')
    this.$current.style.cssText += `;transform: translate3D(0, -50%, 0);`
    this.$ele.addEventListener('transitionend', this.end)

    let $img = this.$img = this.$current.querySelector('img')
    // 图片加载成功，事件监听
    $img.addEventListener('load', this.load)
    $img.src = this.arr[this.currentIndex]
    if($img.complete){
        $img.removeEventListener('load', this.load)
        this.load()
    }

    // 下一个
    this.$next = this.$current.nextElementSibling || this.$items[0]
    this.$next.style.cssText += `;transform: translate3D(100%, -50%, 0);`
    this.$next.querySelector('img').src = this.arr[this.currentIndex + 1] || this.arr[0]

    // 上一个
    this.$prev = this.$current.previousElementSibling || this.$items[this.$items.length - 1]
    this.$prev.style.cssText += `;transform: translate3D(-100%, -50%, 0);`
    this.$prev.querySelector('img').src = this.arr[this.currentIndex - 1] || this.arr[this.arr.length - 1]

}
