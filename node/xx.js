var cdn = require('./cdn.js')

// 批量上传
Promise.all(
        ['./cdn.js', './xx.js', './node-mysql.js'].map(filepath => {
            return cdn(filepath)
        })
    ).then(all => {
            console.log(all);
        },
        fuck => console.log)
    .catch(msg => console.log)
