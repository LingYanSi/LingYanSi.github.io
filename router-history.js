	var Router = {
			cache : [];
			init : function(){
				var pathname = location.pathname ;
				if(/.+(\.html)$/.test(pathname)){
					console.log(pathname)
					pathname = pathname.slice(0,-5);
					this.urlArr = pathname.split('/') ;
				}
			},
			add : function(){

			},
			load : function(){
				
			}
		}