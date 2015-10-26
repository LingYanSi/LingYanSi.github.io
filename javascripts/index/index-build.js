/*
 * @Author: zikong
 * @Date:   2015-10-17 20:49:42
 * @Last Modified by:   zikong
 * @Last Modified time: 2015-10-25 18:59:44
 */

'use strict';
$(function() {
    var navHeight = (LY.device.isPhone ? document.body.offsetWidth * 3 / 4 : window.screen.width * 4 / 16) + 'px';
    $('.nav').height(navHeight);
    $('a').attr({
        target: '_blank'
    });
    $('h2').on('click', function() {
        $(this).siblings().toggle();
    });
    var navBgd = new Slider({
        id: 'nav-bgd',
        autoPlay: true,
        loop: true,
        time: 8000,
        num: 1,
        isNavShow: false,
        isPrevNextShow: false,
        currentPage: 2,
        animationStyle: 1,
        onPageChange: function(prevIndex, currentIndex, len) {
            // console.log(prevIndex,currentIndex,len);
        }.bind(this),
    });
    $('body').css({
        opacity: '1'
    });


    $('.head-img').on('click', function() {
        LY.modal.confirm('要去西方的哪一个国家吗？', function() {
            location.href = 'http://cl.ueos.pw'
        }, function() {
            // location.href = 'http://www.zhihu.com'
        });
    })
});
console.log(new Date(1447343999*1000))
console.log(new Date(1447084799*1000))

function tpl(data){
    return `<div class="content-item">
            <h2>${data.title}</h2>
            <ul>
                ${data.list.map(function(ele){
                    return `<li><a href="${ele.link?ele.link:"javascript:void(0);"}">${ele.title}</a></li>`
                }).join('')}
            </ul>
        </div>`
}
var str = data.map(function(ele){
    return tpl(ele)
}).join('');
$('.content').append(str);
