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
    
    panc(key);
    panduoduo(key);
}
function loading(is,id){           
    var loadingDoc = document.getElementById(id?id:"pancLoading");
    loadingDoc.style.display=is?"block":"none";
}

function panduoduo(key){
    var host = "panduoduo";
    var success = function(html){
        var videos = parseList(html,"a[href^='/r/']");
        window[host] = videos;
        loading(false,host+"Loading");

        function parseList(html,select){
            var videos = [];
            var el = document.createElement( 'html' );
            el.innerHTML = html;

            var as = el.querySelectorAll(select);
            el = null;
            for(var i = 0;i<as.length;i++){
                if(i>10){
                    break;
                }
                var video = {ref:host,name:as[i].innerHTML,url:"http://www.panduoduo.net"+as[i].pathname};
                videos.push(video);
                fetchDetal(video,i);

            }
            return videos;
        }
        function fetchDetal(video,i){
            var success = function(html){

                video["url"] = parseDetail(html,"a.dbutton2");
                loading(false,host+"Loading");
                function parseDetail(html,select){
                    var href = html.substring(html.indexOf('"dbutton2" href="')+'"dbutton2" href="'.length,html.indexOf('" rel="nofollow">点击去百度云盘下载资源</a>'));
                    var url = getURLParameter("url",href);
                    return url;
                }
                setIframe([video],i===0);
            }
            fetch("panduoduo",video.url,success);

        }
    };
    fetch(host,"http://www.panduoduo.net/s/comb/n-"+key+"&ty-bd&f-f4",success);
    
}
function panc(key){

    var host = "panc";
    var success = function(html){
        var videos = parseHref(html,".a_url");
        window[host] = videos;
        loading(false,host+"Loading");
        setIframe(videos,true,true);
    }
    fetch(host,"https://www.panc.cc/s/"+key+"/td_1",success);


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
    loading(true,host+"Loading");
    var url = encodeURI("//charon-node.herokuapp.com/fetch");
//     var url = encodeURI("http://127.0.0.1:8888/fetch");
    var data = JSON.stringify({crossUrl:api});
    try{
        var error = function(){
            var videos = [];
            loading(false,host+"Loading");
            setIframe(videos,true,true);
        }
        ajax(url,success,error,"POST",data);

    }catch(e){
        error();
    }
}



function setIframe(videos,isSrc,isNone) {
    var template = document.getElementById("videoTemplate").innerHTML;
    if(isNone&&(!videos||!videos.length)){
        template = document.getElementById("noneTemplate").innerHTML

        var wrapper= document.createElement('div');
        wrapper.innerHTML= template;

        document.body.append(wrapper);
        return;
    }
    var dataBox =  document.getElementById("data");
    for(var i=0;i<videos.length;i++){
        var wrapper= document.createElement('div');
        wrapper.innerHTML= template;
        a = wrapper.children[0];
        a.innerHTML=videos[i].name;
        a.href=videos[i].url;
        var div= wrapper.children[1];
        var url = videos[i].url;
        url = url.substr(url.indexOf("http:")+5);
        div.firstElementChild.dataset.src=url;
        if(isSrc&&i==0){
            div.firstElementChild.src=url;
        }
        addVideosHandler(div.firstElementChild);
        dataBox.append(wrapper);
    }
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
