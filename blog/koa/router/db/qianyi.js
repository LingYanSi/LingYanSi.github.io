// return
let db = require('./connect')
db.delete(`DELETE from article where id > 0`).then(ss => {

    // 数据迁移
    let fs = require('fs')
    let PATH = `../../../static1/database/article/`
    let data = fs.readdirSync(PATH).map(item => {
        let str = fs.readFileSync(PATH + item)
        let data = JSON.parse(str)
        data.author = '灵岩'
        data.create_time = data.time
        data.update_time = data.create_time
        data.tags = data.tags.join(' ')
        data.summary = data.content.slice(0, 300)
        delete data.time
        delete data.id

        return data
    }).sort((a, b) => {
        return a.create_time - b.create_time
    })
    let index = 0
    const LEN = data.length
    console.log('数据长度', LEN);


    function readAndWrite(index) {
        if (index == LEN) return
        db.insert(`INSERT INTO article SET ?`, data[index]).then(msg => {
            index++
            console.log('执行次数', index);
            readAndWrite(index)
        })
    }

    readAndWrite(index)
})
