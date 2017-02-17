/**
 * 因为在移动端，会有恶心人的边框等，因此可以使用canvas来模拟一个video
 * 好处： 可以用canvas来播放一些比较酷炫的效果，还可以与声音同步
 */
class Video {
    constructor($canvas, $video, fps = 1000 / 60) {
        this.width = $video.width
        this.height = $video.height
        this.fps = fps

        this.$canvas = $canvas
        this.$video = $video

        // 添加事件
        this.events()
    }
    start() {
        this.$video.play()
    }
    stop() {
        this.$video.pause()
    }
    mute() {
        this.$video.volume = 0
    }
    draw() {
        console.log('播放中')
        let { width, height, $canvas, $video, fps } = this

        let ctx = $canvas.getContext('2d')
        ctx.drawImage($video, 0, 0, width, height)

        this.setTimeout = setTimeout(() => {
            this.draw()
        }, fps)
    }
    stopDraw() {
        console.log('展厅')
        this.setTimeout && clearTimeout(this.setTimeout)
    }
    events() {
        $video.addEventListener('play', () => {
            this.draw()
        })

        $video.addEventListener('pause', () => {
            this.stopDraw()
        })
    }
}