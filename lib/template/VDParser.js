/*
 * HTML Parser By John Resig (ejohn.org)
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 *
 * // Use like so:
 * HTMLParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 * // or to get an XML string:
 * HTMLtoXML(htmlString);
 *
 * // or to get an XML DOM Document
 * HTMLtoDOM(htmlString);
 *
 * // or to inject into an existing document/DOM node
 * HTMLtoDOM(htmlString, document);
 * HTMLtoDOM(htmlString, document.body);
 *
 */

(function(){

	// Regular Expressions for parsing tags and attributes
	var startTag = /^<([-A-Za-z0-9_]+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
		endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
		attr = /([-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

	// Empty Elements - HTML 4.01
	var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");

	// Block Elements - HTML 4.01
	var block = makeMap("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul");

	// Inline Elements - HTML 4.01
	var inline = makeMap("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

	// Attributes that have their values filled in disabled="disabled"
	var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

	// Special Elements (can contain anything)
	var special = makeMap("script,style");

	var HTMLParser = this.HTMLParser = function( html, handler ) {
		var index, chars, match, stack = [], last = html;
		stack.last = function(){
			return this[ this.length - 1 ];
		};

		while ( html ) {
			chars = true;

			// Make sure we're not in a script or style element
			if ( !stack.last() || !special[ stack.last() ] ) {

				// Comment
				if ( html.indexOf("<!--") == 0 ) {
					index = html.indexOf("-->");

					if ( index >= 0 ) {
						if ( handler.comment )
							handler.comment( html.substring( 4, index ) );
						html = html.substring( index + 3 );
						chars = false;
					}

				// end tag
				} else if ( html.indexOf("</") == 0 ) {
					match = html.match( endTag );

					if ( match ) {
						html = html.substring( match[0].length );
						match[0].replace( endTag, parseEndTag );
						chars = false;
					}

				// start tag
				} else if ( html.indexOf("<") == 0 ) {
					match = html.match( startTag );

					if ( match ) {
						html = html.substring( match[0].length );
						match[0].replace( startTag, parseStartTag );
						chars = false;
					}
				}

				if ( chars ) {
					index = html.indexOf("<");

					var text = index < 0 ? html : html.substring( 0, index );
					html = index < 0 ? "" : html.substring( index );

					if ( handler.chars )
						handler.chars( text );
				}

			} else {
				html = html.replace(new RegExp("(.*)<\/" + stack.last() + "[^>]*>"), function(all, text){
					text = text.replace(/<!--(.*?)-->/g, "$1")
						.replace(/<!\[CDATA\[(.*?)]]>/g, "$1");

					if ( handler.chars )
						handler.chars( text );

					return "";
				});

				parseEndTag( "", stack.last() );
			}

			if ( html == last )
				throw "Parse Error: " + html;
			last = html;
		}

		// Clean up any remaining tags
		parseEndTag();

		function parseStartTag( tag, tagName, rest, unary ) {
			// tagName = tagName.toLowerCase();

			if ( block[ tagName ] ) {
				while ( stack.last() && inline[ stack.last() ] ) {
					parseEndTag( "", stack.last() );
				}
			}

			if ( closeSelf[ tagName ] && stack.last() == tagName ) {
				parseEndTag( "", tagName );
			}

			unary = empty[ tagName ] || !!unary;

			if ( !unary )
				stack.push( tagName );

			if ( handler.start ) {
				// var attrs = [];
				var attrs = {}

				rest.replace(attr, function(match, name) {
					var value = arguments[2] ? arguments[2] :
						arguments[3] ? arguments[3] :
						arguments[4] ? arguments[4] :
						fillAttrs[name] ? name : "";

					// attrs.push({
					// 	name: name,
					// 	value: value,
					// 	escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
					// });
					attrs[name] = value
				});

				if ( handler.start )
					handler.start( tagName, attrs, unary );
			}
		}

		function parseEndTag( tag, tagName ) {
			// If no tag name is provided, clean shop
			if ( !tagName )
				var pos = 0;

			// Find the closest opened tag of the same type
			else
				for ( var pos = stack.length - 1; pos >= 0; pos-- )
					if ( stack[ pos ] == tagName )
						break;

			if ( pos >= 0 ) {
				// Close all the open elements, up the stack
				for ( var i = stack.length - 1; i >= pos; i-- )
					if ( handler.end )
						handler.end( stack[ i ] );

				// Remove the open elements from the stack
				stack.length = pos;
			}
		}
	};

	this.HTMLtoXML = function( html ) {
		var results = "";

		HTMLParser(html, {
			start: function( tag, attrs, unary ) {
				results += "<" + tag;

				for ( var i = 0; i < attrs.length; i++ )
					results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';

				results += (unary ? "/" : "") + ">";
			},
			end: function( tag ) {
				results += "</" + tag + ">";
			},
			chars: function( text ) {
				results += text;
			},
			comment: function( text ) {
				results += "<!--" + text + "-->";
			}
		});

		return results;
	};

	this.HTMLtoDOM = function( html, doc ) {
		// There can be only one of these elements
		var one = makeMap("html,head,body,title");

		// Enforce a structure for the document
		var structure = {
			link: "head",
			base: "head"
		};

		if ( !doc ) {
			if ( typeof DOMDocument != "undefined" )
				doc = new DOMDocument();
			else if ( typeof document != "undefined" && document.implementation && document.implementation.createDocument )
				doc = document.implementation.createDocument("", "", null);
			else if ( typeof ActiveX != "undefined" )
				doc = new ActiveXObject("Msxml.DOMDocument");

		} else
			doc = doc.ownerDocument ||
				doc.getOwnerDocument && doc.getOwnerDocument() ||
				doc;

		var elems = [],
			documentElement = doc.documentElement ||
				doc.getDocumentElement && doc.getDocumentElement();

		// If we're dealing with an empty document then we
		// need to pre-populate it with the HTML document structure
		if ( !documentElement && doc.createElement ) (function(){
			var html = doc.createElement("html");
			var head = doc.createElement("head");
			head.appendChild( doc.createElement("title") );
			html.appendChild( head );
			html.appendChild( doc.createElement("body") );
			doc.appendChild( html );
		})();

		// Find all the unique elements
		if ( doc.getElementsByTagName )
			for ( var i in one )
				one[ i ] = doc.getElementsByTagName( i )[0];

		// If we're working with a document, inject contents into
		// the body element
		var curParentNode = one.body;

		HTMLParser( html, {
			start: function( tagName, attrs, unary ) {
				// If it's a pre-built element, then we can ignore
				// its construction
				if ( one[ tagName ] ) {
					curParentNode = one[ tagName ];
					if ( !unary ) {
						elems.push( curParentNode );
					}
					return;
				}

				var elem = doc.createElement( tagName );

				for ( var attr in attrs )
					elem.setAttribute( attrs[ attr ].name, attrs[ attr ].value );

				if ( structure[ tagName ] && typeof one[ structure[ tagName ] ] != "boolean" )
					one[ structure[ tagName ] ].appendChild( elem );

				else if ( curParentNode && curParentNode.appendChild )
					curParentNode.appendChild( elem );

				if ( !unary ) {
					elems.push( elem );
					curParentNode = elem;
				}
			},
			end: function( tag ) {
				elems.length -= 1;

				// Init the new parentNode
				curParentNode = elems[ elems.length - 1 ];
			},
			chars: function( text ) {
				curParentNode.appendChild( doc.createTextNode( text ) );
			},
			comment: function( text ) {
				// create comment node
			}
		});

		return doc;
	};

	function makeMap(str){
		var obj = {}, items = str.split(",");
		for ( var i = 0; i < items.length; i++ )
			obj[ items[i] ] = true;
		return obj;
	}
})();


function Parser(HTMLStr, ctx){
    // 生成一个dom数
    HTMLStr = HTMLStr.trim()
    var Dom = []
    let currentNode = null
    HTMLParser(HTMLStr, {
        start: function(tag, attrs, unary) {
            //  console.log(tag, attrs, unary);

             let node = {
                 tag ,
                 attrs,
                 children: [],
                 parent: currentNode
             }

			 currentNode ? currentNode.children.push(node) : Dom.push(node)
			//  如果是半闭合标签
			 if(!Parser.empty.includes(tag)){
	             currentNode = node
			 }

        },
        end: function(tag) {

            // 切换到currentNode的父节点
            currentNode = currentNode.parent
        },
        chars: function(text) {
            text = text.trim()
            // 文本字节
            // results += text;
            text && currentNode.children.push({
                text,
                tag: null,
                parent: currentNode,
                attrs: {}
            })
        },
        comment: function(text) {
            // 注释字节不用处理
            // results += "";
        }
    })

    // 还需要对dom数种的一些数据做处理
    BindDataToStr(Dom, ctx)

	console.log(Dom);
    return Dom
}

Parser.empty = ["area","base","basefont","br","col","frame","hr","img","input","isindex","link","meta","param","embed"]

// 数据绑定转 字符串
function BindDataToStr(Dom, ctx){
    Dom.forEach(child => {
        if(child.tag){
            BindDataToStr.handleEach(child, ctx)

			let attrs = child.attrs
			for(let key in attrs){
				attrs[key] = BindDataToStr.matchTag(key, attrs, child, ctx)
			}

            child.children && BindDataToStr(child.children, ctx)
        }else {
			// 文本节点
            child.text = BindDataToStr.matchTag('xx' ,{xx: child.text}, child, ctx)
        }
    })
}

BindDataToStr.matchTag = function(key, attrs, node, ctx){
    // console.log('上下文', ctx);
    const IS_EVENT =  key.startsWith('on')
    let fn
	let str = attrs[key]


	// 只有字符串才有替换的必要
    str = ( typeof str === 'string') ? str.replace(/{[^}]+}/g, function(matched, index, str){
        let expression = matched.slice(1, -1)
        let result

        // 主要处理 bind方法
        BindDataToStr.bindCTX(function(){
            // 把作用域合并
            ctx = Object.assign({}, ctx, ...BindDataToStr.getAllCTX(node))
            with(ctx){
                result = eval(expression)
            }
        }, ctx)

		// 如果是一个方法，就返回function
        fn = IS_EVENT && result
        return result
    }) : str

    return IS_EVENT ? fn : str
}

// 把方法的this指向作用域
BindDataToStr.bindCTX = function(fn, ctx){
    fn.call(ctx)
}

// 合并一个节点的ctx与其所有父节点的ctx
BindDataToStr.getAllCTX = function(node){
    let ctx = []
    while (node) {
        node.ctx && ctx.push(node.ctx)
        node = node.parent
    }

    return ctx
}

// 深度clone html Tree 深度【attrs, children】
BindDataToStr.deepClone = function(target, parent){
    let newTarget = Object.assign({}, target)
    newTarget.attrs = Object.assign({}, target.attrs)

    parent && (newTarget.parent = parent)

	newTarget.children = []
    target.children && target.children.forEach(child => {
        newTarget.children.push( BindDataToStr.deepClone(child, newTarget) )
    })

    return newTarget
}

// 把方法的this指向作用域
BindDataToStr.handleEach = function(node, ctx){
    // fn.call(ctx)
	let attrs = node.attrs
	for(let key in node.attrs){
		if(key == 'each'){
            let [name, expression] = attrs[key].split('in').map(item => item.trim())
            // console.log('each:debugger', key, attr.value);
			let __data
			with(ctx){
                __data = eval(expression)
            }

            node.children = new Array(__data.length).fill(node.children[0]).map(function(child, index){
                // clone child 需要深度clone
                child = BindDataToStr.deepClone(child)

                child.ctx = {
                    [name]: __data[index],
                    $index: index
                }

                return child
            })

            // console.log(node);
            break
        }
	}
}

// var test = {name: 'test'}
// var hei = {name: 'call'}
// function fuck(){
//     console.log(this)
//     console.log(eval('this'))
//     with(test){
//         console.log(this)
//     }
// }
//
// fuck.call(hei)
