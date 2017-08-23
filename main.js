window.onload = function(){
    locationParameterChanged();
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
    if(!key){
        return;
    }
    document.getElementsByTagName("input")[0].value=key;
    loading(true);
    window.videos = panc(key);
    loading(false);
    setIframe(videos);
}
function loading(is){           
    var loadingDoc = document.getElementById("loading");
    loadingDoc.style.display=is?"block":"none";
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
        div.firstElementChild.src=url;
        document.body.append(wrapper);
    }
}
function panc(key){
    var videos=[];
    if(key=="#记忆大师"){
        videos = [{name:"记忆大师",url:"https://pan.baidu.com/share/link?uk=107049535&shareid=1591164568"}];
    }else if(key=="#绝世高手"){
        videos = [{name:"绝世高手",url:"https://pan.baidu.com/share/link?uk=1177627517&shareid=1395519671"}];
    }else{
        
        videos = getVideos(key);
    }
    return videos;


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