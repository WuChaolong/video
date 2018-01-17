/* ssp_adx_render_N */
var sspadxN = (function (sspadxN, win, doc) {
	var isLoaded = false,
		onloadFunc = win.onload,
		materialMap = {},
		RENDER_QUEUE = "ssp_render_queue_N",
		PLAYER_URL = "https://static.atm.youku.com/miaozhen/Preview.swf";

	sspadxN.render = function (materials) {
		var i = 0,
			constructor,
			len;
		if (!materials) return;
		constructor = materials.constructor;
		if (constructor == Array) {
			for (len = materials.length; i < len;) {
				sspadxN.render(materials[i++]);
			}
		} else if (constructor == Object) {
			dealTask(materials);
		}
	};

	win.onload = function () {
		isLoaded = true;
		win.onload = onloadFunc;
		onloadFunc && onloadFunc.call(win);
	};

	win.__get_params = function(pid){
		return materialMap[pid];
	};

	function sendToMonitor(arr, type, server, pid) {
		var i = 0,
			img,
			len;
		for (len = arr.length; i < len;) {
			img = win[type + server + pid + i] = new Image();
			img.onload = img.onerror = (function (i) {
				return function () {
					var id = type + server + pid + i;
					win[id] = win[id].onload = win[id].onerror = null;
				};
			})(i);
			img.src = arr[i++];
		}
	}

	function renderMaterial(material, node) {
		var w = material.adw,
			h = material.adh,
			wText = "100%",
			hText = "100%",
			src = material.src,
			ldp = material.ldp,
			imp = material.pm,
			clk = material.cm,
			type = material.type,
			pid = material.pid,
      adText = '<style type="text/css">.yk-playpage-rtb-adflag { left: 0px; }.yk-playpage-rtb-dspflag { right: 0px; }</style><div class="yk-playpage-rtb-adflag" style="position:absolute;bottom:0px;width:30px;height:17px;z-index:99;background:url(https://r2.ykimg.com/051000005604C79D67BC3D7CA2063AD4) 0px 0px no-repeat;"></div>',
      dspText = '<div  class="yk-playpage-rtb-dspflag" style="position:absolute;bottom:0px;padding:0px 3px;margin:0px;height:17px;z-index:99;text-align:right;font-size:12px;line-height:17px;background-color:rgba(0,0,0,0.5);color:white">' + material.alias + '</div>',
			server = "SSP",
			ad = ps = "",
			ldpFunc,
			clkFunc,
			maskDiv,
			needClkEvent = false,
			materialId = material.pid,
			flashId = server + '_OBJ_' + materialId,
			maskId = server + '_MASK_' + materialId,			
			flashCode = getFlashCode(src, ps, w, h, flashId);
		if(material.hasFrame) {
			wText = w + "px";
			hText = h + "px";	
		}	
		var	eventMask = '<div id="' + maskId + '" style="position:absolute;width:' + wText + ';height:' + hText + ';cursor:pointer;background-color:rgb(255,255,255);opacity:0;filter:alpha(opacity=0);"></div>';
		switch (type) {
			case "I":
				ad += eventMask + '<img border="0" src="' + src + '" style="width:' + wText + ';height:' + hText + ';line-height:' + hText + '" />';
				break;
			case "F":
				ad += eventMask + flashCode;
				break;
			case "X":
			case "V":
				material.width = w;
				material.height = h;
				material.hc = 0;
				materialMap[materialId] = material;
				ps = "pid=" + materialId;
				ad = getFlashCode(PLAYER_URL, ps, w, h, flashId);
				break;
			default:
				break;
		}
		/***???改了innerHtml后，再通过getElementById，能得到刚生成的div吗？？？***/
		setNodeAttributes(node, ad, wText, hText, adText, dspText, material.hasFrame);
		if (type == "I" || type == "F") {
			if (imp.constructor == Object) {
				var s0imp = imp["0"];
				if (s0imp && s0imp.constructor == Array) {
					sendToMonitor(s0imp, "imp", server, pid);
					delete imp["0"];
				}
				for (var sec in imp) {
					var sximp = imp[sec];
					if (sximp.constructor == Array) {
						(function (sximp, sec) {
							win.setTimeout(function () {
								sendToMonitor(sximp, "imp", server, pid);
							}, parseInt(sec) * 1000);
						})(sximp, sec);
					}
				}
			}
			maskDiv = doc.getElementById(maskId);
			if (ldp) {
				ldpFunc = function () {
					win.open(ldp, "_blank");
				};
				needClkEvent = true;
			}
			if (clk && clk.constructor == Array) {
				clkFunc = function () {
					sendToMonitor(clk, "clk", server, pid);
				};
				needClkEvent = true;
			}
			if (needClkEvent) {
				maskDiv && (maskDiv.onclick = function () {
					clkFunc && clkFunc();
					ldpFunc && ldpFunc();
				});
			}
		}
	}

	function setNodeAttributes(node, ad, wText, hText, adText, dspText, hasFrame) {
		if( !node || typeof(node) != 'object') return;
		if( null != ad && 0 == ad.length ){
			node.style.display = 'none';
		}else{
			if( null != ad ){
				if(hasFrame) {
				    node.style.display = 'table';
				    node.innerHTML = '<div  id="youku_ad_crazy" class="yk-playpage-ad"><div align="center" style="width:' + wText + ';height:' + hText + ';position:relative;margin:0 auto;"><div id="ssp_adx" style="width:' + wText + ';height:' + hText + ';">' + ad + '</div>' + adText + dspText + '</div></div>';
				} else {
				    node.style.display = 'block';
				    node.innerHTML = '<div  id="youku_ad_crazy" class="yk-playpage-ad" align="center" style="width:' + wText + ';height:' + hText + ';position:relative;margin:0 auto;"><div id="ssp_adx" style="width:' + wText + ';height:' + hText + ';">' + ad + '</div>' + adText + dspText + '</div>';
				}
			}
		}
	}

	function dealTask(material) {
		var src = material.src;
		if (src.replace(/^\s+|\s+$/g, '') == "") return;
		var nodeId = "ab_v_" + material.pid;
		var node = doc.getElementById(nodeId);
		if (node) {
			renderMaterial(material, node);
		} else if (!isLoaded) {
			win.setTimeout(function () {
				dealTask.call(null, material);
			}, 50);
		}
	}

	function RenderQueue() {
		this.push = function (materials) {
			(materials.constructor == Object || materials.constructor == Array) && sspadxN.render(materials);
		};
	}

	function getFlashCode(src, ps, w, h, flashId) {
		return '<object id="' + flashId + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ' + 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" ' + 'align="middle" width="' + w + '" height="' + h + '">' + '<param name="wmode" value="transparent" />' + '<param name="allowScriptAccess" value="always" />' + '<param name="movie" value="' + src + '"/>' + '<param name="quality" value="high"/>' + '<param name="bgcolor" value="#000"/>' + '<param name="width" value="' + w + '" />' + '<param name="height" value="' + h + '" />' + (ps ? '<param name="FlashVars" value="' + ps + '" />' : '') + '<embed src="' + src + '" quality="high" ' + 'bgcolor="#000" width="' + w + '" height="' + h + '" ' + 'type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" ' + 'allowscriptaccess="always" loop="true" wmode="transparent" name="' + flashId + '" ' + (ps ? 'flashvars="' + ps + '" ' : '') + '></embed></object>';
	}

	var queueN = win[RENDER_QUEUE];
	if (queueN && queueN.constructor == Array) {
		sspadxN.render(queueN);
		win[RENDER_QUEUE] = new RenderQueue();
	}
})(sspadxN || {}, window, document);

/* ssp_adx_render_C */
var sspadxC = (function(sspadxC, win, doc){
	var page_loaded = 0,
		_onload = win.onload,
		RENDER_QUEUE_C = "ssp_render_queue_C";

	sspadxC.render = function(materials){
		var i=0, constructor, len;
		if(!materials) return ;
		constructor = materials.constructor;
		if(constructor == Array){
			for(len=materials.length; i<len;){
				sspadxC.render(materials[i++]);
			}
		}else if(constructor == Object){
			deal_task(materials);
		}
	};
	win.onload = function(){
		page_loaded = 1;
		win.onload = _onload;
		_onload && _onload.call(win);
	};
	function monitor_send(arr, type, server, pid){
		var i=0, img, len, url;
		for(len=arr.length; i<len;){
			img = win[server + type + pid + i] = new Image();
			img.onload = img.onerror = (function(i){return function(){var id = server + type + pid + i; win[id] = win[id].onload = win[id].onerror = null;};})(i);
			url = arr[i++];
			if(type === "clk" && url.indexOf("[timestamp]")){
				url = url.replace("[timestamp]", Math.floor(Math.random()*100));
			}
			img.src = url;
		}
	}
	function render_material(material, node){
		var type = material.type,
			imp = material.pm,
			clk = material.cm,
			w = material.adw,
			h = material.adh,
			pid = material.pid,
			wText = "100%",
			hText = "100%",			
			server = "SSP",
      adText = '<style type="text/css">.yk-playpage-rtb-adflag { left: 0px; }.yk-playpage-rtb-dspflag { right: 0px; }</style><div class="yk-playpage-rtb-adflag" style="position:absolute;bottom:0px;width:30px;height:17px;z-index:99;background:url(https://r2.ykimg.com/051000005604C79D67BC3D7CA2063AD4) 0px 0px no-repeat;"></div>',
			ad;
		if(material.hasFrame){
			wText = w + "px";
			hText = h + "px";	
		}			
		if(imp.constructor == Object){
			var s0imp = imp["0"];
			if(s0imp && s0imp.constructor == Array){
				monitor_send(s0imp, "imp", server, pid);
				delete imp["0"];
			}
			for(var sec in imp){
				var sximp = imp[sec];
				if(sximp.constructor == Array){
					(function(sximp, sec){
						win.setTimeout(function(){
							monitor_send(sximp, "imp", server, pid);
						}, parseInt(sec) * 1000);
					})(sximp, sec);
				}
			}
		}

		if (material.src.toLowerCase().indexOf("<iframe") == 0) {
			ad = material.src;
		} else {
			ad = '<iframe width="100%" height="100%" frameborder="0" marginwidth="0" marginheight="0" allowTransparency="true" src="https://r1.ykimg.com/material/0A03/201611/1115/RTB/ssp_adx_iframed_0.1.html#' + encodeURIComponent(material.src.split('').reverse().join('')) + '"></iframe>';
		}
		if(material.hasFrame) {
	        node.innerHTML = '<div  id="youku_ad_crazy" class="yk-playpage-ad"><div  align="center" style="width:' + wText + ';height:' + hText + ';position:relative;margin:0 auto;">' + ad + adText + '</div></div>';
		} else {
	        node.innerHTML = '<div  id="youku_ad_crazy" class="yk-playpage-ad" align="center" style="width:' + wText + ';height:' + hText + ';position:relative;margin:0 auto;">' + ad + adText + '</div>';
		}
	}
	function deal_task(material){
		var src = material.src;
		if (src.replace(/^\s+|\s+$/g, '') == "") return;
		var nodeId = "ab_v_" + material.pid;
		var node = document.getElementById(nodeId);
		if(node){
			render_material(material, node);
		}else if(!page_loaded){
			win.setTimeout(function(){deal_task.call(null, material);}, 50);
		}
	};
	function __render_queue(){
		this.push = function(materials){
			(materials.constructor == Object || materials.constructor == Array) && sspadxC.render(materials);
		};
	}
	var data_queue_C = win[RENDER_QUEUE_C];
	if(data_queue_C && data_queue_C.constructor == Array){
		sspadxC.render(data_queue_C);
		win[RENDER_QUEUE_C] = new __render_queue();
	}
})(sspadxC || {}, window, document);
