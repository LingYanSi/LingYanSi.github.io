var Utils = {
    // 关于时间
    time: {
        toString(time){
            var date = new Date(+time)
            return `${date.getFullYear()}-${this.fillZero(date.getMonth()+1)}-${this.fillZero(date.getDate())} ${this.fillZero(date.getHours())}:${this.fillZero(date.getMinutes())}:${this.fillZero(date.getSeconds())}`
        },
        fillZero(num){
            if(num < 10) {
                return `0${num}`
            }
            return `${num}`
        }
    }
}
