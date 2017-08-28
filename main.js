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
}
function loading(is){           
    var loadingDoc = document.getElementById("loading");
    loadingDoc.style.display=is?"block":"none";
}

function panc(key){
    loading(true);
//     var api = "https://www.panc.cc/s/"+key+"/td_1";
    
    var api = "https://www.panc.cc/s/"+key;
    var url = encodeURI("//charon-node.herokuapp.com/fetch");
//     var url = encodeURI("http://127.0.0.1:8888/fetch");
    var data = JSON.stringify({crossUrl:api});
    try{
        var error = function(){
            var videos = [];
            window.videos = videos;
            loading(false);
            setIframe(videos);
        }
        ajax(url,function(html){
            var videos = parseHref(html,".a_url");
            window.videos = videos;
            loading(false);
            setIframe(videos);
        },error,"POST",data);

    }catch(e){
        error();
    }
    function setIframe(videos) {
        var template = document.getElementById("videoTemplate").innerHTML;
        if(!videos||!videos.length){
            template = document.getElementById("noneTemplate").innerHTML

            var wrapper= document.createElement('div');
            wrapper.innerHTML= template;

            document.body.append(wrapper);
            return;
        }
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
            if(i==0){
                div.firstElementChild.src=url;
            }
            addVideosHandler(div.firstElementChild);
            document.body.append(wrapper);
        }
        if(videos.length>=10){
            insetMore(api);
        }
    }
    function insetMore(url){
            var template = document.getElementById("adTemplate").innerHTML;
            var wrapper= document.createElement('div');
            wrapper.innerHTML= template;
            wrapper.children[0].firstElementChild.firstElementChild.href = url;
            
            document.body.append(wrapper);
    }

    function getVideos(key){
        var url = encodeURI("//charon-node.herokuapp.com/cross?api=https://www.panc.cc/s/"+key+"/td_1");
        try{
            var videos = parseHref(load(url),".a_url");
        }catch(e){
            return [];
        }
        return videos;
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

function load(uri,fn){
    var request = new XMLHttpRequest();
    request.open('PUT', uri, false); 
    request.send(null);
    if (request.status === 200) {
      return request.responseText;
    }
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
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
    request.timeout = 8000; // time in milliseconds
    request.ontimeout = function (e) {
      // XMLHttpRequest timed out. Do something here.
      request.abort();
      error();
    };
}
