function $(s) {
    return document.querySelector(s)
}

Ent.create({
    data: {
        hah: '哈个屁',
        lala: '你还想上天不成？《》<>',
        a: {
            b: '深层次的数据'
        }
    },
    ele: '#tpl',
    template: `
          <div onClick={click} props={我是props} id="shm" className="heihei">
               {a.b}<我是文>我是文本>元>素<sdfsdfasdf<sadfasdf>
               <img src="http://ww2.sinaimg.cn/bmiddle/795bf814gw1f17aec5kytj20go05aaap.jpg" alt="" />
               <input type="text" />
               wodayeshihsui<!-- ent 1.0 -->你大爷是谁？？？
               <span>{hah}</span>
               <!-- ent 1.1 -->
               <div onClick="up" className="bitch">
                   <!-- ent 1.1.0 -->
                   呵呵呵呵>sdfsdf< sdfsdsdf
                   <!-- ent 1.1.1 -->我是你
                   <div><div>{lala}</div></div>
                   <p onClick={pClick}>
                       <!-- ent 1.1.1.0 -->
                       什么鬼啊
                   </p>
               </div>
          </div>
      `,
    events: {
        click: function() {
            console.log('点击事件')
        },
        pClick: function() {
            console.log('什么鬼被点击了');
            this.hah = '你在说什么呢'+ new Date().getTime()
        },
        up: function() {
            console.log('鼠标抬起来了');
        }
    },
    methods: {
        what: function() {
            return 'sth else';
        }
    }
})
