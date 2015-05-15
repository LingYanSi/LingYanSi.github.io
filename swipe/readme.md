## swipe 图片滑动切换
使用很简单 
==var bitch = new Lunbo({idname:'bitch',top:'left',autoPlay:false,loop:true,dianNav:true,keyEvent:false})==
* **idname** :使用一下规范
>
`<div id="bitch" class="sass">
    <div id="" class="item-wrap">  
	<div class="sass-item color-1"></div>  
	<div class="sass-item color-2"></div>  
	<div class="sass-item color-3"></div>  
	<div class="sass-item color-4"></div>  
    </div>  
</div>`  
* **top** :上下滑动还是左右滑动两个值【top/left】
* **autoplay** :是否自动滑动
* **loop** :是否循环滑动
* **dianNav** :要不要出现导航小点
* **keyEvent** :可使用上下左右按键来切换页面