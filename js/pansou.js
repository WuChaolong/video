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
                videos.push({ref:parameter.host,name:as[i].previousElementSibling.innerHTML,url:as[i].href});
            }
            return videos;
        }
        return videos;
    }
//     parameter.checkInvalid = true;
    
    
    return fetcher(parameter);

}

window["pancFetcher"] = pan({
    host:"panc"
    ,forEachCode:'"https://www.panc.cc/s/"+key+"/td"'
    ,select:".a_url"
    ,parseVideos:'videos.push({ref:parameter.host,name:as[i].previousElementSibling.innerHTML,url:as[i].href});'
});

window["pansouFetcher"] = pan({
    host:"pansou"
    ,fetchUrlCode:'"http://pansou.com/?q="+key'
    ,jsonUrlCode:'"http://106.15.195.249:8011/search_new?q="+key'
    ,parseVideos:function(json){
        var videos = [];
        try{
            json = JSON.parse(json).list.data;
            json.map(function(o){
                videos.push({ref:parameter.host,name:o.title,url:o.link});
            });
        }catch(e){}
        return videos;

    }
});

function pan(param){

    return function(key,cache){

        var parameter = {};     parameter.cache = cache;
        parameter.host = param.host;
        parameter.fetchUrl = eval(param.fetchUrlCode);
        parameter.fetch = nodeFetch;
        parameter.fetchJsonUrl = eval(param.jsonUrlCode);
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

        parameter.parseVideos = param.parseVideos || function(html){
            var videos = parseHref(html,param.select);


            function parseHref(html,select){
                var videos = [];
                var el = document.createElement( 'html' );
                el.innerHTML = html;
                var as = el.querySelectorAll(select);
                for(var i = 0;i<as.length;i++){
                    eval(param.forEachCode);
                }
                return videos;
            }
            return videos;
        }
    //     parameter.checkInvalid = true;


        return fetcher(parameter);

    }
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
                videos.push({ref:parameter.host,name:as[i].previousElementSibling.innerHTML,url:as[i].href});
            }
            return videos;
        }
        return videos;
    }
//     parameter.checkInvalid = true;
    
    
    return fetcher(parameter);

}