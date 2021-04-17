web.kit.form帮助文档
===========================================
<a id="web.kit"></a>
web.kit 成员列表
-------------------------------------------------------------------------------------------------

<h6 id="web.kit.form">web.kit.form </h6>
 webkit窗体

<h6 id="web.kit.form">web.kit.form() </h6>
 [返回对象:webKitViewObject](#webKitViewObject)

<h6 id="web.kit.form">web.kit.form(winform) </h6>
 参数为窗口对象

<a id="webKitViewObject"></a>
webKitViewObject 成员列表
-------------------------------------------------------------------------------------------------

<h6 id="webKitViewObject.			if">webKitViewObject.			if( winform.isForm ? winform.onEraseBkgnd </h6>
 
    == null ){
    				winform.onEraseBkgnd  = function(hwnd,message,wParam,lParam){
        				return 0;
    				}
    			}

<h6 id="webKitViewObject.			var rc">webKitViewObject.			var rc </h6>
 
    winform.getClientRect();

<h6 id="webKitViewObject.	getForm">webKitViewObject.	getForm </h6>
 
    function(){ return this._form; };

<h6 id="webKitViewObject.	wkeSetMediaVolume">webKitViewObject.	wkeSetMediaVolume </h6>
 
    wke.api("wkeSetMediaVolume","void(addr hView,float volume)")

<h6 id="webKitViewObject.["select"]">webKitViewObject.["select"] </h6>
 
    function(eleName,v,sel=true){ 
            	var opt,child,value,text;
            	var ele = owner.getEle(eleName);
             
            	if(ele){
                	if(type(v)==type.number and v < ele.length){
                    	opt = ele.options[i];
                	}else{
                    	for(i=0;ele.length-1;1){
                        	child = ele.options[i]; 
                        	if( child ? ( (child.value==v) or (child.innerText==v) ) ){
    							opt=child;
    						}
                    	}
                	}
            	} 
            	if( opt ){
                	opt.selected = sel;
                	if( ele.onchange ) owner.dispatchEvent(ele,"change");
            	}
            	return opt; 
        	};

<h6 id="webKitViewObject.["setEle"]">webKitViewObject.["setEle"] </h6>
 function(eleName,val,name){ 
        	var ele = owner.getEle(eleName);
        	if(!ele) return null,"未找到节点";
         	
        	if( type(val) == type.table ){
            	for(k,v in val) 
                	owner.setEle(eleName,v,k); 
        	}
        	elseif(name){ 
            	ele[name] = val; 
        	}
        	elseif( ..string.cmp(ele.tagName,"textArea") == 0  ){
            	ele.innerHTML = val;
        	}
        	elseif( !..string.cmp(ele.tagName,"input") ){
            	select(ele.type) { 
                	case "radio","checkbox" {
                    	ele.checked = val;
                	};
                	else {
                    	ele.value = val;
                	};
            	};
        	}; 
        	elseif(  ..string.cmp(ele.tagName,"select") == 0 ){
            	owner.select( ele,val );
        	}
        	return ele;
    	};

<h6 id="webKitViewObject._WKE_CONTROL">webKitViewObject._WKE_CONTROL </h6>
 
    8/*_WKE_CONTROL*/

<h6 id="webKitViewObject._WKE_EXTENDED">webKitViewObject._WKE_EXTENDED </h6>
 
    0x100/*_WKE_EXTENDED*/

<h6 id="webKitViewObject._WKE_LBUTTON">webKitViewObject._WKE_LBUTTON </h6>
 
    1/*_WKE_LBUTTON*/

<h6 id="webKitViewObject._WKE_MBUTTON">webKitViewObject._WKE_MBUTTON </h6>
 
    0x10/*_WKE_MBUTTON*/

<h6 id="webKitViewObject._WKE_NAVIGATION_TYPE_BACKFORWARD">webKitViewObject._WKE_NAVIGATION_TYPE_BACKFORWARD </h6>
 
    2/*_WKE_NAVIGATION_TYPE_BACKFORWARD*/

<h6 id="webKitViewObject._WKE_NAVIGATION_TYPE_FORMRESUBMITT">webKitViewObject._WKE_NAVIGATION_TYPE_FORMRESUBMITT </h6>
 
    4/*_WKE_NAVIGATION_TYPE_FORMRESUBMITT*/

<h6 id="webKitViewObject._WKE_NAVIGATION_TYPE_FORMSUBMITTE">webKitViewObject._WKE_NAVIGATION_TYPE_FORMSUBMITTE </h6>
 
    1/*_WKE_NAVIGATION_TYPE_FORMSUBMITTE*/

<h6 id="webKitViewObject._WKE_NAVIGATION_TYPE_LINKCLICK">webKitViewObject._WKE_NAVIGATION_TYPE_LINKCLICK </h6>
 
    0/*_WKE_NAVIGATION_TYPE_LINKCLICK*/

<h6 id="webKitViewObject._WKE_NAVIGATION_TYPE_OTHER">webKitViewObject._WKE_NAVIGATION_TYPE_OTHER </h6>
 
    5/*_WKE_NAVIGATION_TYPE_OTHER*/

<h6 id="webKitViewObject._WKE_NAVIGATION_TYPE_RELOAD">webKitViewObject._WKE_NAVIGATION_TYPE_RELOAD </h6>
 
    3/*_WKE_NAVIGATION_TYPE_RELOAD*/

<h6 id="webKitViewObject._WKE_RBUTTON">webKitViewObject._WKE_RBUTTON </h6>
 
    2/*_WKE_RBUTTON*/

<h6 id="webKitViewObject._WKE_REPEAT">webKitViewObject._WKE_REPEAT </h6>
 
    0x4000/*_WKE_REPEAT*/

<h6 id="webKitViewObject._WKE_SHIFT">webKitViewObject._WKE_SHIFT </h6>
 
    4/*_WKE_SHIFT*/

<h6 id="webKitViewObject._cache_views__">webKitViewObject._cache_views__ </h6>
 
    { /*@{_weak="kv"}*/ }

<h6 id="webKitViewObject._metaProperty">webKitViewObject._metaProperty </h6>
 
    ..util.metaProperty(

<h6 id="webKitViewObject._serialize">webKitViewObject._serialize </h6>
 
    ..thread._callableSerialize;

<h6 id="webKitViewObject.addDirtyArea">webKitViewObject.addDirtyArea </h6>
 function(x,y,w,h){
			if(type(h)!=type.number) error("请指定高度参数",2);
			return wke.wkeAddDirtyArea(owner.hWebView,x,y,w,h); 
		};

<h6 id="webKitViewObject.addDirtyArea">webKitViewObject.addDirtyArea(x,y,w,h) </h6>
 设置无效区域

<h6 id="webKitViewObject.attach">webKitViewObject.attach </h6>
 
    webKitViewObject.attach(  
    	function(event){  
    		io.print("点击坐标", event.screenX,event.screenY )  
    		io.print("触发节点", event.srcElement.innerText )  
    	}  
    	,"onclick",ele/*也可输入getEle()所需参数,省略表示doc*/   
    )

<h6 id="webKitViewObject.attachAll">webKitViewObject.attachAll </h6>
 
    webKitViewObject.attachAll(    
    	/* html节点ID = 事件触发函数表 */  
    	caption_button_min = {  
    		onclick = function(event){  
    			wb._form.hitmin();	  
    		}   
    	}  
    )

<h6 id="webKitViewObject.canGoBack">webKitViewObject.canGoBack </h6>
 
    function(){
    			if( owner.hWebView ){
    				return !!( wke.wkeCanGoBackB(owner.hWebView)  );
    			}
    		};

<h6 id="webKitViewObject.canGoBack">webKitViewObject.canGoBack() </h6>
 能否后退

<h6 id="webKitViewObject.canGoForward">webKitViewObject.canGoForward </h6>
 
    function(){
    			if( owner.hWebView ){
    				return !!( wke.wkeCanGoForwardB(owner.hWebView) );
    			}
    		};

<h6 id="webKitViewObject.canGoForward">webKitViewObject.canGoForward() </h6>
 能否前进

<h6 id="webKitViewObject.click">webKitViewObject.click </h6>
 
    function( eleName,min=1,max=500 ){
            	var ele = owner.getEle(eleName); 
    			owner.dispatchEvent(ele,"mousemove"); 
    			owner.dispatchEvent(ele,"mouseenter"); 
    			owner.dispatchEvent(ele,"mouseover");  
    			
        		..win.delay( ..math.random(min,max) );
        		owner.dispatchEvent(ele,"keydown");
        		owner.dispatchEvent(ele,"keyup");
        		owner.dispatchEvent(ele,"mousedown");
        		owner.dispatchEvent(ele,"mouseup") 
        		
        		if(ele.click) ele.click(); 
        		owner.dispatchEvent(ele,"click");
        		if(ele.tagName=="INPUT"){ ele.focus();}
        		owner.dispatchEvent(ele,"focus");
        		
        		owner.dispatchEvent(ele,"mousemove"); 
        		owner.dispatchEvent(ele,"mouseleave");
        		owner.wait(); 
        	};

<h6 id="webKitViewObject.click">webKitViewObject.click(控件名字,随机延时最小值,延时最大值,框架名) </h6>
 模拟点击控件,  
第一个参数也可以是ele对象,  
随机延时值为可选参数,默认为1,500.  
框架名为可选参数

<h6 id="webKitViewObject.contextMenuEvent">webKitViewObject.contextMenuEvent </h6>
 
    function(x,y,flags){
    			if(flags===null)flags=2/*_WKE_RBUTTON*/
    			if(owner.hWebView)wke.wkeFireContextMenuEvent(owner.hWebView,x,y,flags); 
    		};

<h6 id="webKitViewObject.contextMenuEvent">webKitViewObject.contextMenuEvent(x,y,flags) </h6>
 转发右键菜单事件到网页  
x,y 参数为相对于窗口左上角的坐标值,  
  
flags 参数为_WKE_前缀常量,可省略,支持的选项如下  
_WKE_CONTROL 表示按下Ctrl键_WKE_SHIFT 表示按下Shift键  
_WKE_LBUTTON 表示按下鼠标左键  
_WKE_MBUTTON 表示按下鼠标左键  
_WKE_RBUTTON 表示按下鼠标右键  
多个选项以 | 连接  
不指定则默认为_WKE_RBUTTON

<h6 id="webKitViewObject.cookie">webKitViewObject.cookie </h6>
 返回网页cookie，文本

<h6 id="webKitViewObject.cookieClear">webKitViewObject.cookieClear </h6>
 
    function(){
    			if(owner.hWebView) wke.wkeCurlSetOptString(10135/*CURLOPT_COOKIELIST*/, "ALL"); 
    		};

<h6 id="webKitViewObject.cookieClear">webKitViewObject.cookieClear() </h6>
 清空cookie

<h6 id="webKitViewObject.cookieClearSession">webKitViewObject.cookieClearSession </h6>
 
    function(){
    			if(owner.hWebView) wke.wkeCurlSetOptString(10135/*CURLOPT_COOKIELIST*/, "SESS");
    		};

<h6 id="webKitViewObject.cookieClearSession">webKitViewObject.cookieClearSession() </h6>
 清空会话cookie

<h6 id="webKitViewObject.cookieData">webKitViewObject.cookieData </h6>
 
    function(){
    			var cookieFile = ..fsys.cookies();
    			owner.enumCookie(
        			function(sData,pData){ 
            			cookieFile.parseLine(sData)
        			}
    			)
    			return cookieFile;
    		};

<h6 id="webKitViewObject.cookieData">webKitViewObject.cookieData() </h6>
 返回所有cookie,返回值为fsys.cookies对象  
  
[返回对象:fsyscookiesObject](#fsyscookiesObject)

<h6 id="webKitViewObject.cookieEnabled">webKitViewObject.cookieEnabled </h6>
 是否允许使用cookie

<h6 id="webKitViewObject.cookieReload">webKitViewObject.cookieReload </h6>
 
    function(){
    			if(owner.hWebView) wke.wkeCurlSetOptString(10135/*CURLOPT_COOKIELIST*/, "RELOAD");
    		};

<h6 id="webKitViewObject.cookieReload">webKitViewObject.cookieReload() </h6>
 自文件重新载入cookie

<h6 id="webKitViewObject.cookieSave">webKitViewObject.cookieSave </h6>
 
    function(){
    			if(owner.hWebView) wke.wkeCurlSetOptString(10135/*CURLOPT_COOKIELIST*/, "FLUSH");
    		};

<h6 id="webKitViewObject.cookieSave">webKitViewObject.cookieSave() </h6>
 保存cookie

<h6 id="webKitViewObject.cookieSet">webKitViewObject.cookieSet </h6>
 function(cookie){
			if(!owner.hWebView)return;
			
			if(type(cookie) == type.table){
				if(#cookie ){
					if( cookie.stringifySetCookieLine){
						var s;
						for(i=1;#cookie;1){
							s = cookie.stringifySetCookieLine(i);
							if(#s) wke.wkeCurlSetOptString(10135/*CURLOPT_COOKIELIST*/, s); 
						} 
					}
					else {
						error("参数请指定fsys.cookies对象",2)
					}
					
					return;
				};
				
				var fc = ..fsys.cookies();
				cookie = fc.stringifySetCookieLine(cookie); 
			}
			if(#cookie) wke.wkeCurlSetOptString(10135/*CURLOPT_COOKIELIST*/, cookie); 
		};

<h6 id="webKitViewObject.cookieSet">webKitViewObject.cookieSet(__) </h6>
 设置cookie,  
参数可以是单个cookie的字段键值对组成的表,  
也可以是符合HTTP响应头中设置Cookie格式相同的字符串  
也可以指定fsys.cookies对象  
了解cookie格式的细节，请查看fsys.cookies库

<h6 id="webKitViewObject.copy">webKitViewObject.copy </h6>
 
    function(){
    			if(owner.hWebView)wke.wkeEditorCopy(owner.hWebView); 
    		};

<h6 id="webKitViewObject.copy">webKitViewObject.copy() </h6>
 复制

<h6 id="webKitViewObject.cut">webKitViewObject.cut </h6>
 
    function(){
    			if(owner.hWebView)wke.wkeEditorCut(owner.hWebView); 
    		};

<h6 id="webKitViewObject.cut">webKitViewObject.cut() </h6>
 剪切

<h6 id="webKitViewObject.delete">webKitViewObject.delete </h6>
 
    function(){
    			if(owner.hWebView)wke.wkeDelete(owner.hWebView); 
    		};

<h6 id="webKitViewObject.delete">webKitViewObject.delete() </h6>
 删除

<h6 id="webKitViewObject.destroy">webKitViewObject.destroy </h6>
 
    function(){
    			if( owner.hWebView ){
    				wke.wkeDestroyWebView(owner.hWebView );
    				_cache_views__[owner.hWebView] = null;
    				owner.hWebView = null;
    			}
    		};

<h6 id="webKitViewObject.destroy">webKitViewObject.destroy() </h6>
 销毁对象

<h6 id="webKitViewObject.dispatchEvent">webKitViewObject.dispatchEvent </h6>
 
    function(ele,event){ 
    			ele = owner.getEle(ele);
                var evt = owner.document.createEvent( 'Events' );  
                evt.initEvent(event, true, true);  
                return !ele.dispatchEvent(evt);   
        	};

<h6 id="webKitViewObject.dispatchEvent">webKitViewObject.dispatchEvent("__/*节点ID*/","click") </h6>
 触发事件

<h6 id="webKitViewObject.doScript">webKitViewObject.doScript </h6>
 function(js){
			if( type(js) != type.string ) error("参数必须指定脚本代码",2);
			if(owner.hWebView)wke.wkeRunJS(owner.hWebView,js ); 
		};

<h6 id="webKitViewObject.doScript">webKitViewObject.doScript(js代码) </h6>
 执行JS脚本

<h6 id="webKitViewObject.document">webKitViewObject.document </h6>
 Javascript网页文档对象  
document.

<h6 id="webKitViewObject.enumCookie">webKitViewObject.enumCookie </h6>
 
    webKitViewObject.enumCookie(  
    	function(sData,pData){  
    		/*pData为cookie指针,sData为Cookie文本*/  
    	}  
    )

<h6 id="webKitViewObject.eval">webKitViewObject.eval </h6>
 function(js){
			if( type(js) != type.string ) error("参数必须指定脚本代码",2);
			return ..web.kit.jsParseValue(owner.jsExecState, ..web.kit.jsEval(owner.jsExecState,js) );
		};

<h6 id="webKitViewObject.eval">webKitViewObject.eval(JS表达式) </h6>
 计算JS表达式并返回值

<h6 id="webKitViewObject.external">webKitViewObject.external </h6>
 
    webKitViewObject.external = {  
    	/*external的成员函数可在JS中调用*/  
    };

<h6 id="webKitViewObject.focus">webKitViewObject.focus </h6>
 
    function(){
    			if(owner.hWebView)wke.wkeSetFocus(owner.hWebView); 
    		};

<h6 id="webKitViewObject.focus">webKitViewObject.focus() </h6>
 设置焦点

<h6 id="webKitViewObject.fromJsExecState">webKitViewObject.fromJsExecState </h6>
 function(jsExecState){
 		if(!jsExecState) error("参数错误",2)
 		var hWebView = wke.wkeJSGetWebView(jsExecState);
 		if( _cache_views__[hWebView] ) {
 			return  _cache_views__[hWebView]
 		}
 		var view = { @_metaProperty;hWebView = hWebView };
 	}

<h6 id="webKitViewObject.getContentsHeight">webKitViewObject.getContentsHeight </h6>
 
    function(){
    			if( owner.hWebView ){
    				return wke.wkeGetContentHeight(owner.hWebView ); 
    			}
    		};

<h6 id="webKitViewObject.getContentsHeight">webKitViewObject.getContentsHeight() </h6>
 文档高度

<h6 id="webKitViewObject.getContentsWidth">webKitViewObject.getContentsWidth </h6>
 
    function(){
    			if( owner.hWebView ){
    				return wke.wkeGetContentWidth(owner.hWebView ); 
    			}
    		};

<h6 id="webKitViewObject.getContentsWidth">webKitViewObject.getContentsWidth() </h6>
 文档宽度

<h6 id="webKitViewObject.getEle">webKitViewObject.getEle </h6>
 
    function( id ){
            	if( type(id) == "table" ) return id;
            	var doc = owner.document;
            	var ele = doc.getElementById(id);
            	if( ele ) return ele;
            	ele = doc.getElementsByName(id);
            	if(ele) return doc[0];
        	};

<h6 id="webKitViewObject.getForm">webKitViewObject.getForm() </h6>
 返回该视图所在窗体对象  
  
[返回对象:winform](#winform)

<h6 id="webKitViewObject.getForm">webKitViewObject.getForm(false) </h6>
 返回该视图所在窗口或控件对象

<h6 id="webKitViewObject.getHeight">webKitViewObject.getHeight </h6>
 
    function(){
    			if( owner.hWebView ){
    				return wke.wkeGetHeight(owner.hWebView ); 
    			}
    		};

<h6 id="webKitViewObject.getHeight">webKitViewObject.getHeight() </h6>
 视图高度

<h6 id="webKitViewObject.getWidth">webKitViewObject.getWidth </h6>
 
    function(){
    			if( owner.hWebView ){
    				return wke.wkeGetWidth(owner.hWebView ); 
    			}
    		};

<h6 id="webKitViewObject.getWidth">webKitViewObject.getWidth() </h6>
 视图宽度

<h6 id="webKitViewObject.go">webKitViewObject.go </h6>
 function(url){
			if( type(url) != type.string ) error("URL参数错误",2);
			
			if( owner.hWebView ){
				if( ..io.exist(url) ){
					url = "file:///" + ..io.fullpath(url);   
				}
				elseif( ..io.localpath(url) ){
					url = "file://" + url;  
				} 
				wke.wkeLoadURL(owner.hWebView,..inet.url.encodeMbcs(url,false) );
			}
		};

<h6 id="webKitViewObject.go">webKitViewObject.go("__/*网址*/") </h6>
 打开网址

<h6 id="webKitViewObject.goBack">webKitViewObject.goBack </h6>
 
    function(){
    			if( owner.hWebView ){
    				wke.wkeGoBack(owner.hWebView);
    			}
    		};

<h6 id="webKitViewObject.goBack">webKitViewObject.goBack() </h6>
 后退

<h6 id="webKitViewObject.goForward">webKitViewObject.goForward </h6>
 
    function(){
    			if( owner.hWebView ){
    				wke.wkeGoForward(owner.hWebView);
    			}
    		};

<h6 id="webKitViewObject.goForward">webKitViewObject.goForward() </h6>
 前进

<h6 id="webKitViewObject.hWkeWindow">webKitViewObject.hWkeWindow </h6>
 如果在创建web.kit.view对象时指定了父窗口参数,并由WKE创建控件显示窗口  
此属性返回WKE创建的窗口句柄

<h6 id="webKitViewObject.html">webKitViewObject.html </h6>
 
    webKitViewObject.html = /**  
    <!doctype html>  
    <html>  
    <head>  
        <style type="text/css">  
        html,body{ height:100%; margin:0; }   
        </style>  
        <script type="text/javascript"></script>  
    </head>  
    <body>  
        <div id="header"></div>  
        <div id="container">   
            <div class="lside"> </div>   
            <div class="rside"> </div>    
        </div>  
    </body>  
    </html>  
    **/

<h6 id="webKitViewObject.if">webKitViewObject.if( _STUDIO_INVOKED && _STUDIO_INVOKED ! </h6>
 "process" ){ 
	error("web.kit不能在IDE嵌入线程模式下启动!",2);
}

<h6 id="webKitViewObject.initClientHandler">webKitViewObject.initClientHandler </h6>
 
    function(){
    			if( !owner.hWebView ) return;
    			if( owner.clientHandlerPtr ) return;
    			
    			var this = owner;
    			this.clientHandler = {
    				pointer onTitleChanged = ..raw.tocdecl(
    					function(p,param,s){
    						if( this[["onTitleChanged"]] ) {
    							s = wke.wkeGetString(s);
    							this.onTitleChanged( s ? ..raw.str(topointer(s)) : null );
    						}
    					},"void(pointer webView,pointer param,pointer title)");
    				pointer onURLChanged = ..raw.tocdecl(
    					function(p,param,s){
    						if( this[["onURLChanged"]] ) { 
    							s = wke.wkeGetString(s); 
    							this.onURLChanged( s ? ..raw.str(topointer(s)) : null );
    						}
    					},"void(pointer webView,pointer param,pointer url)");
    					
    				pointer onNavigation = ..raw.tocdecl(
    					function(p,param,navigationType,s){
    						if( this[["onNavigation"]] ) { 
    							s = wke.wkeGetString(s); 
    							return this.onNavigation( s ? ..raw.str(topointer(s)) : null,navigationType );
    						}
    						return true;
    					},"bool(pointer webView,pointer param,int navigationType,pointer url)");
    					
    				pointer onDocumentReady = ..raw.tocdecl(
    					function(p,param,info){
    						if( this[["onDocumentReady"]] ) { 
    							info = ..raw.convert(info,{
    								ptr url;
    								ptr frameJSState;
    								ptr mainFrameJSState;
    							});
    							if(info.url){
    								var s = wke.wkeGetString(info.url);
    								info.url=s ? ..raw.str(topointer(s)) : null;
    							}
    							return this.onDocumentReady( info.url,info.mainFrameJSState,info.frameJSState );
    						}
    						return true;
    					},"bool(pointer webView,pointer param,pointer info)");
    			}
    		};

<h6 id="webKitViewObject.isAwake">webKitViewObject.isAwake </h6>
 
    function(){
    			if(owner.hWebView) return wke.wkeIsAwakeB(owner.hWebView); 
    		};

<h6 id="webKitViewObject.isAwake">webKitViewObject.isAwake() </h6>
 是否运行

<h6 id="webKitViewObject.isDirty">webKitViewObject.isDirty </h6>
 
    function(){
    			if( owner.hWebView ) return wke.wkeIsDirtyB( owner.hWebView ); 
    		};

<h6 id="webKitViewObject.isDirty">webKitViewObject.isDirty() </h6>
 是否需要重绘

<h6 id="webKitViewObject.isDocumentReady">webKitViewObject.isDocumentReady </h6>
 
    function(){
    			if( owner.hWebView ){
    				return wke.wkeIsDocumentReadyB(owner.hWebView );
    			}
    		};

<h6 id="webKitViewObject.isDocumentReady">webKitViewObject.isDocumentReady() </h6>
 文档对象是否准备就绪

<h6 id="webKitViewObject.isLoadComplete">webKitViewObject.isLoadComplete </h6>
 
    function(){
    			if( owner.hWebView ){
    				return wke.wkeIsLoadingCompletedB(owner.hWebView );
    			}
    		};

<h6 id="webKitViewObject.isLoadComplete">webKitViewObject.isLoadComplete() </h6>
 是否加载完成  
即isLoaded或isLoadFailed函数返回true

<h6 id="webKitViewObject.isLoadFailed">webKitViewObject.isLoadFailed </h6>
 
    function(){
    			if( owner.hWebView ){
    				return wke.wkeIsLoadingFailedB(owner.hWebView );
    			}
    		};

<h6 id="webKitViewObject.isLoadFailed">webKitViewObject.isLoadFailed() </h6>
 是否加载失败

<h6 id="webKitViewObject.isLoaded">webKitViewObject.isLoaded </h6>
 
    function(){
    			if( owner.hWebView ){
    				return wke.wkeIsLoadingSucceededB(owner.hWebView );
    			}
    		};

<h6 id="webKitViewObject.isLoaded">webKitViewObject.isLoaded() </h6>
 是否加载成功

<h6 id="webKitViewObject.jQuery">webKitViewObject.jQuery </h6>
 
    {
    			_get = function(){ 
    				owner.waitDoc();
    				return owner.script.jQuery || owner.loadScript( {
    					jQuery = {
    						"/res/js/jQuery/jQuery.min.js";
    						"/view/js/jQuery/jQuery.min.js";
    						"http://libs.baidu.com/jquery/1.10.2/jquery.min.js";
    						"http://lib.sinaapp.com/js/jquery/1.10.2/jquery-1.10.2.min.js";
    						"http://code.jquery.com/jquery-1.10.2.min.js" 
    					}
    				}, ,"utf-8" ).jQuery; 
    			} 
    		};

<h6 id="webKitViewObject.jQuery">webKitViewObject.jQuery("__") </h6>
 jQuery选择器,并可自动载入jQuery库  
n首次调用按需加载jQuery v1.9:  
 "/res/js/jQuery/jQuery.min.js"  
失败则通过网络CDN服务器下载jquery-1.9.0.min.js

<h6 id="webKitViewObject.jQuery">webKitViewObject.jQuery() </h6>
 无参数时返回jQuery类对象  
首次调用按需加载 jQuery v1.9:  
 "/res/js/jQuery/jQuery.min.js"  
失败则通过网络CDN服务器下载jquery-1.9.0.min.js  
  
[返回对象:jQueryObject](#jQueryObject)

<h6 id="webKitViewObject.jsExecState">webKitViewObject.jsExecState </h6>
 
    {
    			_get = function(){
    				if(owner.hWebView) return topointer( wke.wkeGlobalExec(owner.hWebView) )
    			} 
    		};

<h6 id="webKitViewObject.keyDown">webKitViewObject.keyDown </h6>
 
    function(vkCode,flags,sysKey){
    			if(owner.hWebView)wke.wkeFireKeyDownEvent(owner.hWebView,vkCode,flags,sysKey); 
    		};

<h6 id="webKitViewObject.keyDown">webKitViewObject.keyDown(vkCode,flags,sysKey) </h6>
 转发按键释放事件到网页  
  
vkCode 参数指定虚拟键码,请参考标准库key.VK  
  
flags 参数可用指定一个或多个以下选项:  
       _WKE_REPEAT表示重复按键,  
       _WKE_EXTENDED表示扩展键,  
       多个选项以 | 连接  
  
sysKey 参数指定是否同时按下ALT键,

<h6 id="webKitViewObject.keyPress">webKitViewObject.keyPress </h6>
 
    function(charCode,flags,sysKey){
    			if(owner.hWebView)wke.wkeFireKeyPressEvent(owner.hWebView,charCode,flags,sysKey); 
    		};

<h6 id="webKitViewObject.keyPress">webKitViewObject.keyPress(charCode,flags,sysKey) </h6>
 转发WM_CHAR事件到网页  
  
charCode 参数指定字符代码,  
  
flags 参数可用指定一个或多个以下选项:  
       _WKE_REPEAT表示重复按键,  
       _WKE_EXTENDED表示扩展键,  
       多个选项以 | 连接  
  
sysKey 参数指定是否同时按下ALT键,

<h6 id="webKitViewObject.keyUp">webKitViewObject.keyUp </h6>
 
    function(vkCode,flags,sysKey){
    			if(owner.hWebView)wke.wkeFireKeyUpEvent(owner.hWebView,vkCode,flags,sysKey); 
    		};

<h6 id="webKitViewObject.keyUp">webKitViewObject.keyUp(vkCode,flags,sysKey) </h6>
 转发按键释放事件到网页  
  
vkCode 参数指定虚拟键码,请参考标准库key.VK  
  
flags 参数可用指定一个或多个以下选项:  
       _WKE_REPEAT表示重复按键,  
       _WKE_EXTENDED表示扩展键,  
       多个选项以 | 连接  
  
sysKey 参数指定是否同时按下ALT键,

<h6 id="webKitViewObject.load">webKitViewObject.load </h6>
 function(url){
			if( type(url) != type.string ) error("文件路径参数错误",2);
			
			if( owner.hWebView ){
				if( ..io.exist(url) ){
					url = "file:///" + ..io.fullpath( url);   
				}
				elseif( ..io.localpath(url) ){
					url = "file://" + url;  
				} 
				wke.wkeLoadURL(owner.hWebView,..inet.url.encodeMbcs(url,false) );
			}
		};

<h6 id="webKitViewObject.load">webKitViewObject.load( filename) </h6>
 加载文件

<h6 id="webKitViewObject.loadScript">webKitViewObject.loadScript </h6>
 
    function(path,frame,charset,prop ){   
    			var doc = owner.waitDoc()  
    			if(!doc) return; 
    		  
    		  	if( type(path) == "table" ){
    		  		var r = {} 
    		  		for(n,p in path){
    		  			for(i=1;#p ){ 
    		  				if( owner.script[n] )
    		  					break; 
    		  				 	
    		  				owner.loadScript( p[i],frame,charset,prop );
    		  			}
    		  			r[n] = owner.script[n];
    		  		} 
    		  		return r ;
    		  	} 
        				
    			if( (!charset) && (doc.charSet == "utf-8") ){
    				charset = "utf-8"
    			}
    			
    			var s = ..string.load( path ); 
    			if( #s ){ 
    				if( s[1] == 0xEF  && s[2] == 0xBB && s[3] == 0xBF) {
    					s = ..string.fromto( ..string.sub(s,4 ) );
    				}
    				else if ( charset ?  ..string.cmp(charset,"utf-8") != 0 ){
    					s = ..string.fromto( s,0,65001 );
    				};
    				
    				return owner.doScript( s ); 
    			}
    			else {
    				if( ..io.localpath(path) )
    					return;
    			}
    			
    			var ele = doc.createElement("script");
    			ele.type = "text/javascript"; 
    			ele.charset = charset;
    			
    			if( prop ) ..table.mixin( ele,prop ) 
        		ele.src = path;
        		
        		var loaded;
        		ele.onload = function(){
        			loaded = true;
        		};
        	 
        	 	var ele = doc.getElementsByTagName('head')[0].appendChild(ele) ;
        	 	var delay = ..win.delay;
        	 	if( ! prop[["async"]] ){ 
        			while( !loaded ){ 
        				if(!delay(10)) return false;
        			}
        			owner.waitDoc(); 
        		}
        		
        		return ele;
    		};

<h6 id="webKitViewObject.loadScript">webKitViewObject.loadScript("js地址","","utf-8") </h6>
 动态加载js文件\N可选用第三个参数指定文件编码

<h6 id="webKitViewObject.location">webKitViewObject.location </h6>
 当前网址

<h6 id="webKitViewObject.mediaVolume">webKitViewObject.mediaVolume </h6>
 音量,范微0.0到1.0

<h6 id="webKitViewObject.mouseEvent">webKitViewObject.mouseEvent </h6>
 
    function(message,x,y,flags){
    			if(flags===null)flags=1/*_WKE_LBUTTON*/
    			if(owner.hWebView)wke.wkeFireMouseEvent(owner.hWebView,message,x,y,flags); 
    		};

<h6 id="webKitViewObject.mouseEvent">webKitViewObject.mouseEvent(message,x,y,flags) </h6>
 转发鼠标事件到网页  
message为_WM_前缀的窗口鼠标消息常量  
x,y 参数为相对于窗口左上角的坐标值,  
  
flags 参数为_WKE_前缀常量,可省略,支持的选项如下  
_WKE_CONTROL 表示按下Ctrl键_WKE_SHIFT 表示按下Shift键  
_WKE_LBUTTON 表示按下鼠标左键  
_WKE_MBUTTON 表示按下鼠标左键  
_WKE_RBUTTON 表示按下鼠标右键  
多个选项以 | 连接  
不指定则默认为_WKE_LBUTTON

<h6 id="webKitViewObject.mouseWheel">webKitViewObject.mouseWheel </h6>
 
    function(x,y,delta,flags){
    			if(flags===null)flags=0x10/*_WKE_MBUTTON*/
    			if(owner.hWebView)wke.wkeFireMouseWheelEvent(owner.hWebView,x,y,delta,flags); 
    		};

<h6 id="webKitViewObject.mouseWheel">webKitViewObject.mouseWheel(x,y,delta,flags) </h6>
 转发滚轮事件到网页  
x,y 参数为相对于屏幕左上角的坐标值,  
delta为120的倍数,负数向下滚动,正数向上滚动,  
  
flags 参数为_WKE_前缀常量,可省略,支持的选项如下  
_WKE_CONTROL 表示按下Ctrl键_WKE_SHIFT 表示按下Shift键  
_WKE_LBUTTON 表示按下鼠标左键  
_WKE_MBUTTON 表示按下鼠标左键  
_WKE_RBUTTON 表示按下鼠标右键  
多个选项以 | 连接  
不指定则默认为_WKE_MBUTTON

<h6 id="webKitViewObject.onAlertBox">webKitViewObject.onAlertBox </h6>
 
    webKitViewObject.onAlertBox = function(str){
        /*alert对话框触发此事件,返回true不显示默认对话框*/	 
        return true;   
    }

<h6 id="webKitViewObject.onConfirmBox">webKitViewObject.onConfirmBox </h6>
 
    webKitViewObject.onConfirmBox = function(str){
        /*确认对话框触发此事件,  
    定义此事件后不再显示确认对话框,可在这里修改返回值*/	
       return result; 
    }

<h6 id="webKitViewObject.onDocumentReady">webKitViewObject.onDocumentReady </h6>
 
    webKitViewObject.onDocumentReady = function(url,mainFrameJSState,frameJSState){
    	if( mainFrameJSState == frameJSState ){
    		/*主框架加载完成*/
    	}
    }

<h6 id="webKitViewObject.onNavigation">webKitViewObject.onNavigation </h6>
 
    webKitViewObject.onNavigation = function(url,navigationType){ 
    	if( navigationType == _WKE_NAVIGATION_TYPE ){
    		
    	}
    	return true;
    }

<h6 id="webKitViewObject.onPromptBox">webKitViewObject.onPromptBox </h6>
 
    webKitViewObject.onPromptBox = function(title, default){
        /*输入对话框,可选返回输入的字符串  
    title为标题,default为默认显示在输入框的文本*/
        return;
    }

<h6 id="webKitViewObject.onTitleChanged">webKitViewObject.onTitleChanged </h6>
 
    webKitViewObject.onTitleChanged = function(title){ 
    	owner.getForm().text = title;
    }

<h6 id="webKitViewObject.onURLChanged">webKitViewObject.onURLChanged </h6>
 
    webKitViewObject.onURLChanged = function(url){ 
    	if(#url) owner.getForm().msgbox( url )
    }

<h6 id="webKitViewObject.paint">webKitViewObject.paint </h6>
 
    function(bits,pitch){
    			return wke.wkePaint2(owner.hWebView,bits,pitch:0); 
    		};

<h6 id="webKitViewObject.paint">webKitViewObject.paint(bits,pitch) </h6>
 绘图,参数@1为位图像素数组指针  
关于这个函数的用法请参考web.kit.gdiRender

<h6 id="webKitViewObject.paste">webKitViewObject.paste </h6>
 
    function(){
    			if(owner.hWebView)wke.wkeEditorPaste(owner.hWebView); 
    		};

<h6 id="webKitViewObject.paste">webKitViewObject.paste() </h6>
 复制

<h6 id="webKitViewObject.post">webKitViewObject.post </h6>
 
    function(url,postData){
    			wke.wkePostURL(owner.hWebView,url,postData,#postData);
    		};

<h6 id="webKitViewObject.post">webKitViewObject.post(网址,POST数据) </h6>
 POST提交数据

<h6 id="webKitViewObject.print">webKitViewObject.print </h6>
 function(hdc,scale){
			error("使用web.kit.form打开网页才能支持此函数",2);	
		};

<h6 id="webKitViewObject.print">webKitViewObject.print(hdc,scale) </h6>
 用于GDI打印输出,hdc为打印机设备DC，  
scale指定缩放比例,正数为缩放文档,负数按输出页面缩放  
例如-0.5为缩放至页面的50%

<h6 id="webKitViewObject.queryEles">webKitViewObject.queryEles </h6>
 搜索节点对象,该函数返回的是一个数组,  
但可以通过调用数组的成员函数批量调用节点的同名成员函数,支持click函数,  
即使找不到节点,此函数也会返回一个空数组,

<h6 id="webKitViewObject.queryEles">webKitViewObject.queryEles() </h6>
 [返回对象:eleObject](#eleObject)

<h6 id="webKitViewObject.queryEles">webKitViewObject.queryEles(CSS选择器,查询参数表,超时值) </h6>
 搜索节点对象,该函数返回的是一个数组,  
但可以通过调用数组的成员函数批量调用节点的同名成员函数,支持click函数  
  
参数@1指定一个表对象，  
该参数表可包含一个或多个键值，用于匹配节点的属性值,  
属性值使用 string.cmpMatch函数进行比对，  
等价于调用string.cmp函数进行忽略大小写的比较,  
并且在失败后调用 string.match函数使用模式匹配语法进行比较。  
  
注意在匹配节点属性时有几个例外：  
tagName,id,name属性如果匹配值不含标点则使用忽略大小写的完全比对（禁用模式匹配和部分匹配）  
  
  
可选使用参数@2指定获取网页文档对象的超时值，单位毫秒，此参数一般不需要指定

<h6 id="webKitViewObject.querySelector">webKitViewObject.querySelector </h6>
 
    function(...){
    			var doc = owner.waitDoc();
    			if(doc) return doc.querySelector(...);
    		};

<h6 id="webKitViewObject.querySelector">webKitViewObject.querySelector("CSS选择器") </h6>
 查询并返回节点

<h6 id="webKitViewObject.querySelector">webKitViewObject.querySelector() </h6>
 [返回对象:eleObject](#eleObject)

<h6 id="webKitViewObject.querySelectorAll">webKitViewObject.querySelectorAll </h6>
 
    function(...){
    			var doc = owner.waitDoc();
    			if(doc) return doc.querySelectorAll(...);
    		};

<h6 id="webKitViewObject.querySelectorAll">webKitViewObject.querySelectorAll("CSS选择器") </h6>
 查询并返回节点集合,length属性获取节点个数

<h6 id="webKitViewObject.querySelectorAll">webKitViewObject.querySelectorAll() </h6>
 [返回对象:eleObject](#eleObject)

<h6 id="webKitViewObject.reload">webKitViewObject.reload </h6>
 
    function(){
    			if( owner.hWebView ){
    				wke.wkeReload(owner.hWebView );
    			}
    		};

<h6 id="webKitViewObject.reload">webKitViewObject.reload() </h6>
 重新载入

<h6 id="webKitViewObject.resize">webKitViewObject.resize </h6>
 function(w,h){
			if(type(h)!=type.number) error("请指定高度参数",2);
			
			if( owner.hWebView ){
				wke.wkeResize(owner.hWebView,w,h ); 
			}
		};

<h6 id="webKitViewObject.resize">webKitViewObject.resize(w,h) </h6>
 调整大小

<h6 id="webKitViewObject.script">webKitViewObject.script </h6>
 Javascript全局对象  
  
[返回对象:jsGlobalObject](#jsGlobalObject)

<h6 id="webKitViewObject.select">webKitViewObject.select("控件名字",__/*输入选项索引,或选项值、选项文本*/) </h6>
 查找下拉选框的指定选项,选中并返回选项节点  
第一个参数也可以是ele对象

<h6 id="webKitViewObject.selectAll">webKitViewObject.selectAll </h6>
 
    function(){
    			if(owner.hWebView)wke.wkeEditorSelectAll(owner.hWebView); 
    		};

<h6 id="webKitViewObject.selectAll">webKitViewObject.selectAll() </h6>
 全选

<h6 id="webKitViewObject.setDirty">webKitViewObject.setDirty </h6>
 
    function(d){
    			wke.wkeSetDirty(owner.hWebView,!!d); 
    		};

<h6 id="webKitViewObject.setDirty">webKitViewObject.setDirty(dirty) </h6>
 设置是否需要重绘

<h6 id="webKitViewObject.setEditable">webKitViewObject.setEditable </h6>
 
    function(editable){
    			if(owner.hWebView)wke.wkeSetEditable(owner.hWebView,!!editable); 
    		};

<h6 id="webKitViewObject.setEditable">webKitViewObject.setEditable(editable) </h6>
 设置编辑状态

<h6 id="webKitViewObject.setEle">webKitViewObject.setEle(控件名字,属性值,属性名) </h6>
 更新控件值,成节返回节点,失败返回null空值  
第一个参数也可以是ele对象,  
属性名,框架名为可选参数.  
属性值可以是一个指定多个属性键值对的table对象

<h6 id="webKitViewObject.sleep">webKitViewObject.sleep </h6>
 
    function(){
    			if(owner.hWebView)wke.wkeSleep(owner.hWebView); 
    		};

<h6 id="webKitViewObject.sleep">webKitViewObject.sleep() </h6>
 休眠

<h6 id="webKitViewObject.stopLoading">webKitViewObject.stopLoading </h6>
 
    function(){
    			if( owner.hWebView ){
    				wke.wkeStopLoading(owner.hWebView );
    			}
    		};

<h6 id="webKitViewObject.stopLoading">webKitViewObject.stopLoading() </h6>
 停止加载

<h6 id="webKitViewObject.transparent">webKitViewObject.transparent </h6>
 背景是否透明  
不透明则使用白色背景

<h6 id="webKitViewObject.unfocus">webKitViewObject.unfocus </h6>
 
    function(){
    			if(owner.hWebView)wke.wkeKillFocus(owner.hWebView); 
    		};

<h6 id="webKitViewObject.unfocus">webKitViewObject.unfocus() </h6>
 取消焦点

<h6 id="webKitViewObject.userAgent">webKitViewObject.userAgent </h6>
 设置User Agent

<h6 id="webKitViewObject.var wke">webKitViewObject.var wke </h6>
 
    _dll;

<h6 id="webKitViewObject.wait">webKitViewObject.wait </h6>
 该函数等待网页完全加载完成,  
因为部份网页遇到问题可能部份内容无法完全加载,  
建议大家尽可能使用等待部份加载的waitEle或waitDoc等函数替代

<h6 id="webKitViewObject.wait">webKitViewObject.wait("网址",超时值) </h6>
 等待指定的网页加载完成,所有参数可选,  
等待的网址支持模式语法,参数@2指定最大超时值,单位毫秒

<h6 id="webKitViewObject.waitDoc">webKitViewObject.waitDoc </h6>
 
    function(timeout){
    			var delay = ..win.delay;
    			var isWnd = ..win.isWindow;
    			var hwnd = owner._form.hwnd;
    			var tk = 0;
    			
    			while( delay(200) && isWnd(hwnd)  ){
    		  		if( owner.hWebView && (wke.wkeIsDocumentReadyB( owner.hWebView ) ) ){
    		  			return owner.document;
    				}		
    					
    				if( timeout ) {
    					tk+=201;
    					if( tk>timeout )
    						return null,"Timeout!"  
    				};
    			} 
    		};

<h6 id="webKitViewObject.waitDoc">webKitViewObject.waitDoc() </h6>
 等待文档对象准备就绪,并返回文档对象  
document.

<h6 id="webKitViewObject.waitEle">webKitViewObject.waitEle </h6>
 
    function(name,frame,timeout,waitState){
    			var wb = owner;
    			return ( ..win.wait(
    				function(){
    					return ( wb.getEle(name) );
    				},owner.getForm().hwnd,timeout,200
    			) ); 
    		};

<h6 id="webKitViewObject.waitEle">webKitViewObject.waitEle("ID或名称",,超时值) </h6>
 返回一个节点对象,除参数一以外,其他能数可选  
第三个参数指定超时值(单位为毫秒)  
参数@2必须为空

<h6 id="webKitViewObject.waitQueryEles">webKitViewObject.waitQueryEles </h6>
 函数等待queryEles()返回有效节点,  
即使找不到节点,此函数也会返回一个空数组,  
web窗体关闭或超时返回null空值

<h6 id="webKitViewObject.waitQueryEles">webKitViewObject.waitQueryEles() </h6>
 [返回对象:eleObject](#eleObject)

<h6 id="webKitViewObject.waitQueryEles">webKitViewObject.waitQueryEles(CSS选择器,查询参数表,超时值,时间间隔,节点完全加载) </h6>
 函数等待wb.queryEles()返回有效节点,  
web窗体关闭或超时返回null空值  
  
该函数返回的是一个数组,但可以通过调用数组的成员函数  
批量调用节点的同名成员函数,支持click函数  
  
  
  
参数@1指定一个表对象，  
该参数表可包含一个或多个键值，用于匹配节点的属性值,  
属性值使用 string.cmpMatch函数进行比对，  
等价于调用string.cmp函数进行忽略大小写的比较。  
并且在失败后调用 string.match函数使用模式匹配语法进行比较。  
  
注意在匹配节点属性时有几个例外：  
tagName,id,name属性如果匹配值不含标点则使用忽略大小写的完全比对（禁用模式匹配和部分匹配）  
  
  
可选使用参数@2指定超时值，单位毫秒，,其他参数可选

<h6 id="webKitViewObject.wake">webKitViewObject.wake </h6>
 
    function(){
    			if(owner.hWebView) wke.wkeWake(owner.hWebView); 
    		};

<h6 id="webKitViewObject.wake">webKitViewObject.wake() </h6>
 恢复运行

<h6 id="webKitViewObject.window">webKitViewObject.window </h6>
 Javascript全局对象  
  
[返回对象:jsGlobalObject](#jsGlobalObject)

<h6 id="webKitViewObject.wkeGetMediaVolume">webKitViewObject.wkeGetMediaVolume </h6>
 
    wke.api("wkeGetMediaVolume","float(addr hView)")

<h6 id="webKitViewObject.wkeGetZoomFactor">webKitViewObject.wkeGetZoomFactor </h6>
 
    wke.api("wkeGetZoomFactor","float(addr hView)")

<h6 id="webKitViewObject.wkeSetZoomFactor">webKitViewObject.wkeSetZoomFactor </h6>
 
    wke.api("wkeSetZoomFactor","void(addr hView,float volume)")

<h6 id="webKitViewObject.wkeWebView">webKitViewObject.wkeWebView </h6>
 [返回对象:webKitViewObject](#webKitViewObject)

<h6 id="webKitViewObject.wndproc">webKitViewObject.wndproc(hwnd,message,wParam,lParam) </h6>
 处理窗口消息  
返回值为真表示不再需要后续默认消息处理

<h6 id="webKitViewObject.write">webKitViewObject.write </h6>
 function(html){
			if( type(html) != type.string ) error("html参数错误",2);
			
			if( owner.hWebView ){
				wke.wkeLoadHTML(owner.hWebView,html );
			}
		};

<h6 id="webKitViewObject.write">webKitViewObject.write(html) </h6>
 写入HTML

<h6 id="webKitViewObject.zoomFactor">webKitViewObject.zoomFactor </h6>
 缩放百分比  
浮点数,1.0为实际大小

<a id="webKitViewObject.			this"></a>
webKitViewObject.			this 成员列表
-------------------------------------------------------------------------------------------------

<h6 id="webKitViewObject.			this._form">webKitViewObject.			this._form </h6>
 
    winform;

<h6 id="webKitViewObject.			this.hWebView">webKitViewObject.			this.hWebView </h6>
 
    wke.wkeCreateWebView();

<a id="webKitViewObject.		_cache_views__[this"></a>
webKitViewObject.		_cache_views__[this 成员列表
-------------------------------------------------------------------------------------------------

<h6 id="webKitViewObject.		_cache_views__[this.hWebView]">webKitViewObject.		_cache_views__[this.hWebView] </h6>
 
    this;

<a id="webKitViewObject.this"></a>
webKitViewObject.this 成员列表
-------------------------------------------------------------------------------------------------

<h6 id="webKitViewObject.this.hWebView">webKitViewObject.this.hWebView </h6>
 
    wke.wkeCreateWebWindow(2/*WKE_WINDOW_TYPE_CONTROL*/, winform.hwnd, 0, 0, rc.width(), rc.height());

<h6 id="webKitViewObject.this.hWkeWindow">webKitViewObject.this.hWkeWindow </h6>
 
    wke.wkeGetWindowHandle(this.hWebView);

<a id="webKitViewObject.web.kit"></a>
webKitViewObject.web.kit 成员列表
-------------------------------------------------------------------------------------------------

<h6 id="webKitViewObject.web.kit.view">webKitViewObject.web.kit.view </h6>
 webkit视图

<h6 id="webKitViewObject.web.kit.view">webKitViewObject.web.kit.view() </h6>
 创建WebKit视图,  
如果不指定参数视图不负责创建显示窗口,  
如果在参数中直接指定一个窗口对象,则创建默认的显示窗口,  
控件创建的窗口句柄可通过hWkeWindow属性获取  
  
[返回对象:webKitViewObject](#webKitViewObject)

<a id="webKitViewObject.winform"></a>
webKitViewObject.winform 成员列表
-------------------------------------------------------------------------------------------------

<h6 id="webKitViewObject.winform._adjust">webKitViewObject.winform._adjust </h6>
 
    function( cx,cy,wParam ) {	 
    				wke.wkeResizeWindow(this.hWebView, cx, cy); 
    				wke.wkeRepaintIfNeeded(this.hWebView);
    			};
