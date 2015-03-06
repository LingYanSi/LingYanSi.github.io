var run = function(){
	var landline = 600 ;
	$('[ixf-g]').each(function(){
		var $this = $(this);
		dropDown($this);
	});
	function dropDown(who){
		var g = parseInt(who.attr('ixf-g'));
		var whoTop = who.position().top ,
			whoHeight = who.height(),
			maxTop = $('#main').height() - who.height();
		var topCurrent = $('#main').height() - whoTop - whoHeight ;
		var topEnd = 0 ;
		var v0 = getV(who);
		var t = 0 ;
		var h = topCurrent - topEnd ;
			//console.log(v0)
		var drop25 = setInterval(function(){
			t = t+(10/1000)
			var moveH = v0*t + 0.5*g*t*t ;
			if ( moveH <= h)
			{
				who.css({'top':whoTop+moveH}).attr({'ixf-v':(v0+g)*t});
			}else{
				var v = Math.sqrt(moveH*1*g + v0*v0);
				who.css({'top':maxTop}).attr({'ixf-v':v/1.1});
				clearInterval(drop25);
				//console.log(getV(who))
				if (getV(who)>1)
				{
					dropUp(who);
				}
			}
		},10)
	}
	function dropUp(who){
		var g = parseInt(who.attr('ixf-g'));
		var whoTop = who.position().top ,
			whoHeight = who.height(),
			maxTop = $('#main').height() - who.height();
		var topCurrent = $('#main').height() - whoTop - whoHeight ;
		var topEnd = 0 ;
		var v0 = getV(who);
		var t = 0 ;
		var h = topCurrent - topEnd ,
			minTop = $('#main').height() - whoHeight - v0*v0/2/g ;
			//console.log(v0)
		var drop25 = setInterval(function(){
			t = t+(10/1000)
			var moveH = v0*t - 0.5*g*t*t ;
			var nowV = v0 - g*t ;
			if ( nowV >= 0)
			{
				who.css({'top':whoTop-moveH}).attr({'ixf-v':(v0+g)*t});
			}else{
				who.css({'top':minTop}).attr({'ixf-v':0});
				clearInterval(drop25);
				if ( Math.round(minTop) != maxTop )
				{
					dropDown(who);
					console.log(minTop)
				}
			}
		},10)
	}
	function knockEvent(knocker,knocked){
		var knocker_v = getV(knocker);
		var knocked_v = getV(knocked);
		var knocker_weight = getWeight(knocker);
		var knocked_weight = getWeight(knocked);
		var now_v = (knocker_v*knocker_weight + knocked_v*knocked_weight)/(knocker_weight + knocked_weight) ;
		setV(knocker,now_v);
		setV(knocked,now_v);
		drop(knocker);
		drop(knocked);
	}
	function getV(who){
		return parseInt(who.attr('ixf-v'));
	}
	function setV(who,v){
		who.attr({'ixf-v':v});
	}
	function getWeight(who){
		return parseInt(who.attr('ixf-weight'));
	}

	var $qiu = $('#qiu')
	function knockIf(who){
		var who_top = who.offset().top ,
			who_left = who.offset.left ,
			who_height = who.height() ,
			who_width = who.width() ;
		$('[ixf-g]').not('#qiu').each(function(){
			//console.log(1111)
			var $this = $(this) ;
			var this_top = $this.offset().top ,
				this_left = $this.offset.left ,
				this_height = $this.height() ,
				this_width = $this.width() ;
			if ( (who_top>this_top && who_top<this_top+this_height) && (this_left>who_left && this_left<who_left+who_width) )
			{
				console.log(1111111)
				knockEvent(who,$this);
			}
		})
	}

}