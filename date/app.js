
$('#render').on('click', function() { // 渲染
    LY_date.render(this.previousElementSibling.value, {
        arr: [{
            date: 1,
            LYDateId: '陈',
        }, {
            date: 2,
            LYDateId: '宋',
        }, {
            date: 3,
            LYDateId: '李',
        }],
        className: 'nidaye',
    }, {
        arr: [{
            date: 12,
            LYDateId: '周芷若',
        }, {
            date: 21,
            LYDateId: '神仙姐姐',
        }, {
            date: 18,
            LYDateId: '月明人倚楼',
        }],
        className: 'tamabi',
    });
});
$('#LY-date').on('click', 'td', function() { // 获取有用信息
    var lid = this.getAttribute('LYDateId');
    if (lid) {
        console.log(lid, typeof(lid));
    }
});
