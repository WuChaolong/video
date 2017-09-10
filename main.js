window.onload = function(){
}

    locationParameterChanged();



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

    if(!key){
        return;
    }
    document.getElementsByTagName("input")[0].value=key;
    document.getElementsByTagName("title")[0].innerText=key+" in pan.baidu.com sharing";
    panc(key);
    panduoduo(key);
    thepiratebay(key);
}
function loading(is,id){           
    var loadingDoc = document.getElementById(id?id:"pancLoading");
    loadingDoc.style.display=is?"block":"none";
}
function confirm(id,isImportant){
    try{
        
        var template = document.getElementById(id).innerHTML;
        var confirm;
        if(isImportant){

            confirm = document.getElementById("confirm2");
        }else{

            confirm = document.getElementById("confirm");
        }
        confirm.innerHTML = template;
        if(id=="moreTemplate"){
            confirm.id = "confirm2";
        }
    }catch(e){
        
    }
    
}

function panduoduo(key){
    var host = "panduoduo";
    window[host+"Videos"] = [];
    var success = function(html){
        var videos = parseList(html,"a[href^='/r/']");
        if(!videos||videos.length===0){
            confirm("noneTemplate");
            return;
        }
        window[host+"Videos"] = videos;
        if(!window.showVideos){
            window.showVideos = [];
        }
        panduoduoSetIframe(window[host+"Videos"],3,window.showVideos);
//         setTimeout('confirm("moreTemplate");',5000);
    };
    fetch(host,"http://www.panduoduo.net/s/comb/n-"+key+"&ty-bd&f-f4",success);
    
    function parseList(html,select){
        var videos = [];
        var el = document.createElement( 'html' );
        el.innerHTML = html;

        var as = el.querySelectorAll(select);
        el = null;
        for(var i = 0;i<as.length;i++){
//             if(i>10){
//                 break;
//             }
            var video = {ref:host,name:as[i].innerHTML,url:"http://www.panduoduo.net"+as[i].pathname};
            videos.push(video);
//                 fetchDetal(video,i===0);
            
        }
        return videos;
    }
    function fetchDetal(video,isSrc){
        var success = function(html){
            var url = parseDetail(html,"a.dbutton2");
            if(window.showVideos&&isExist(url,window.showVideos)){
                return;
            }
            video["url"] = url;
            confirm("moreTemplate");
            function parseDetail(html,select){
                var href = html.substring(html.indexOf('"dbutton2" href="')+'"dbutton2" href="'.length,html.indexOf('" rel="nofollow">点击去百度云盘下载资源</a>'));
                var url = getURLParameter("url",href);
                return url;
            }

            setIframe([video],isSrc);
        }
        fetch("panduoduo",video.url,success);

    }
    window.panduoduoSetIframe = function (panduoduoVideos,length,showVideos){
        var videos = panduoduoVideos.splice(0,length);
        videos.forEach(function (item, index, array) {

            showVideos.push(item);
            fetchDetal(item,index===0);
        });
    }
}

function ShowMore(){

    var length = window.showVideos.length;
//         window.pancVideos.splice(0,length);
    var thanPanc = window.pancVideos.length - length;
    var pancNum = thanPanc>0?length:window.pancVideos.length;
    var panduoduoNum = thanPanc<0?-thanPanc:0;
    var thanPancAndPanduoduo = window.pancVideos.length+window.panduoduoVideos.length-length;
    var thepiratebayNum = thanPancAndPanduoduo<0?-thanPanc:0;
    if(window.pancVideos.length){
        pancSetIframe(window.pancVideos,pancNum,window.showVideos);
    }
    if(panduoduoNum>0){
        panduoduoSetIframe(window.panduoduoVideos,panduoduoNum,window.showVideos);
    }
    if(thepiratebayNum>0){
        thepiratebaySetIframe(window.thepiratebayVideos,thepiratebayNum,window.showVideos);
    }
    if(window.pancVideos.length===0&&window.panduoduoVideos.length===0&&window.thepiratebayVideos.length===0){
        confirm("noneTemplate",true);
    }
}
function panc(key){

    var host = "panc";
    window[host+"Videos"] = [];
    var success = function(html){
        var videos = parseHref(html,".a_url");
        if(!videos||videos.length===0){
            confirm("noneTemplate");
            return;
        }
        window[host+"Videos"] = videos;
//         setIframe(videos,true,true);
        if(!window.showVideos){
            window.showVideos = [];
        }
        pancSetIframe(window[host+"Videos"],3,window.showVideos);
        confirm("moreTemplate"); 
    }
    fetch(host,"https://www.panc.cc/s/"+key+"/td_1",success);

    window.pancSetIframe = function (pancVideos,length){
        var videos = pancVideos.splice(0,length);
        window.showVideos = window.showVideos.concat(videos);
        setIframe(videos,true,true);
    }
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

function fetch(host,api,success){

    confirm("loadingTemplate");
    var url = encodeURI("//charon-node.herokuapp.com/fetch");
//     var url = encodeURI("http://127.0.0.1:8888/fetch");
    var data = JSON.stringify({crossUrl:api});
    try{
        var error = function(){
            var videos = [];
            confirm("noneTemplate");
//             setIframe(videos,true,true);
        }
        ajax(url,success,error,"POST",data);

    }catch(e){
        error();
    }
}
function cross(host,api,success){

    confirm("loadingTemplate");
    var url = encodeURI("//charon-node.herokuapp.com/cross?api="+api);
    try{
        var error = function(){
            var videos = [];
            confirm("noneTemplate");
//             setIframe(videos,true,true);
        }
        ajax(url,success,error);

    }catch(e){
        error();
    }
}



function setIframe(videos,isSrc,isNone,templateId) {
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
        var url = videos[i].url;
        a.href=url;
        var div= wrapper.children[1];
        if(templateId=="videoTemplate"){
            if(isDisableScript(url)){
                div.firstElementChild.sandbox="allow-same-origin allow-popups allow-forms allow-pointer-lock";
            }

            url = url.substr(url.indexOf("http:")+5);
            div.firstElementChild.dataset.src=url;
            if(isSrc&&i==0){
                div.firstElementChild.src=url;
            }
            addVideosHandler(div.firstElementChild);
        }else if(templateId=="magnetTemplate"){
            div.firstElementChild.innerHTML = url;
        }
        
        dataBox.appendChild(wrapper);
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
          fn(this.response,error);
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

function thepiratebay(key){
    var host = "thepiratebay";
    window[host+"Videos"] = [];
    
    var success = function(html){

        var videos = parseList(html);
        if(!videos||videos.length===0){
            confirm("noneTemplate");
            return;
        }
        window[host+"Videos"] = videos;
        if(!window.showVideos){
            window.showVideos = [];
        }
        thepiratebaySetIframe(window[host+"Videos"],3,window.showVideos);
//         setTimeout('confirm("moreTemplate");',5000);
    };
    if(isEnglish(key)){
        cross(host,"https://thepiratebay.org/search/"+key+"/0/99/0",success);

    }
    
    function parseList(html){

        var videos = [];
        var el = document.createElement( 'html' );
        el.innerHTML = html;

        var els = el.querySelectorAll("#searchResult tbody tr");
        el = null;
        for(var i = 0;i<els.length;i++){
//             if(i>10){
//                 break;
//             }
            var name = els[i].querySelector(".detLink").innerHTML;
            var url = els[i].querySelector("a[href^='magnet:']").href;
            var video = {ref:host,name:name,url:url};
            videos.push(video);
//                 fetchDetal(video,i===0);
            
        }
        return videos;
    }
    window.thepiratebaySetIframe = function (thepiratebayVideos,length,showVideos){
        var videos = thepiratebayVideos.splice(0,length);
        window.showVideos = window.showVideos.concat(videos);
        setIframe(videos,true,true,"magnetTemplate");
    }
}