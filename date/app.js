
$('#render').on('click', function() { // 渲染
    LY_date.render(this.previousElementSibling.value, {
        arr: [{
            date: 1,
            LYDateId: '陈:念去去千里烟波',
        }, {
            date: 2,
            LYDateId: '宋:暮霭沉沉楚天阔',
        }, {
            date: 3,
            LYDateId: '李:杨柳岸晓风残月',
        }],
        className: 'nidaye',
    }, {
        arr: [{
            date: 12,
            LYDateId: '周芷若',
        }, {
            date: 21,
            LYDateId: '汴水流,泗水流,流到瓜洲古渡头。吴山点点愁。\n\r 思悠悠,恨悠悠,恨到归时方始休。明月人倚楼。',
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
        $('#info').text(lid);
        console.log(lid, typeof(lid));
    }
});
