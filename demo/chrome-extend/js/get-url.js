/*
 * @Author: 灵岩寺
 * @Date:   2015-08-28 13:53:24
 * @Last Modified by:   灵岩寺
 * @Last Modified time: 2015-08-28 16:28:55
 */

'use strict';
(function() {


    var $a = [].slice.call(document.querySelectorAll('a')).filter(function(ele){
        if (ele.textContent.startsWith('http://www.rmdown.com/link.php?hash=')) {
            return ele ;
        }
    })[0];
    if(!$a) return ;

    var dowonload = '<div id="lingyan-download" style="">下载</div>' ;
    var aa = document.createDocumentFragment()
    var bb = document.createElement('div');
    bb.innerHTML = dowonload ;
    document.body.appendChild(bb);

    var $download = document.querySelector('#lingyan-download');
    $download.addEventListener('click',function(){
        console.log('chrome程序调试',$a)
        $a.click();
    });
})();
