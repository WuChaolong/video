// ==UserScript==
// @name         ! 豆瓣电影 + 资源 || IMDB + Resources
// @version      3
// @description  找百度网盘和种子不用打开一堆新标签,有的话会直接播放 || Show magnet and pan.baidu.com in movie detail page 
// @author       WuChaolong
// @match        *://movie.douban.com/subject/*
// @match        *://*.imdb.com/title/*
// @match        *://m.douban.com/movie/subject/*

// @match    *://*.iqiyi.com/*
// @match    *://*.youku.com/*
// @match    *://*.le.com/*
// @match    *://*.letv.com/*
// @match    *://v.qq.com/*
// @match    *://*.tudou.com/*
// @match    *://*.mgtv.com/*
// @match    *://film.sohu.com/*
// @match    *://tv.sohu.com/*
// @match    *://*.acfun.cn/v/*
// @match    *://*.bilibili.com/*
// @match    *://vip.1905.com/play/*
// @match    *://*.pptv.com/*
// @match    *://v.yinyuetai.com/video/*
// @match    *://v.yinyuetai.com/playlist/*
// @match    *://*.fun.tv/vplay/*
// @match    *://*.wasu.cn/Play/show/*
// @match    *://*.56.com/*

// ==/UserScript==

;(function() {
var site = whatSite(location.host);
var key = site.getKey();
var element = site.createElement(key);
site.insert(element);

function whatSite(host){
  
  var config = {
      'movie.douban.com':{
//       '127.0.0.1:8080':{
           getKey : function(){
              var key = document.querySelector('meta[name="keywords"]').getAttribute('content');
              key = key.split(",")[0];
              return key;
           }
           ,insert:function(element){
              var aside = document.querySelector(".aside");
              aside.insertBefore(element, document.getElementById("subject-others-interests"));
           }
           ,createElement:createElementBy
      }
      ,
      'm.douban.com':{
//       '127.0.0.1:8080':{
           getKey : function(){
              return whatSite('movie.douban.com').getKey();
           }
           ,insert:function(element){
              var aside = document.querySelector(".card");
              aside.insertBefore(element, aside.querySelector(".subject-intro"));
              
           }
           ,createElement:function(key){
              var url = getWuchaolongUrl(key);
              var text = key+" in pan.baidu sharing";
              var html = (dedent  `<section style="margin-top: -20px;" class="subject-mark"><div class="mark-item"><a target="_blank" href="${url}" title="${text}">${text}</a></div></section>`);
              return elementBy(html);
           }
      }
      ,
      'www.imdb.com':{
//       '127.0.0.1:8080':{
           getKey : function(){
              var key = document.querySelector('meta[property="og:title"]').getAttribute('content');
              key = key.split("(");
              if(key.length>1){
                key.length = key.length - 1;
              }
              key = key.join("(");
              return key;
           }
           ,insert:function(element){
              var aside = document.querySelector("#root");
              aside.classList.add("add-back2");
              aside.appendChild(element);
              window.onclick=function(e){
                var wrapper = document.querySelector("div#wrapper");
                if(e.target == wrapper){
                  if(element.classList.contains("hover")){
                    element.classList.remove("hover");
                    aside.classList.remove("back");
                  }else{
                    element.classList.add("hover");
                    aside.classList.add("back");
                    var a = document.querySelector('#wuchaolong [href="#wuchaolong"]');
                    a.click();
                  }
                }
              }
           }
           ,createElement:createElementBy
      }
      ,
      'm.imdb.com':{
//       '127.0.0.1:8080':{
           getKey : function(){
              return whatSite('www.imdb.com').getKey();
           }
           ,insert:function(element){
              var aside = document.querySelector("#titleOverview");
              aside.insertBefore(element,aside.querySelector('[class="media"]+hr'));
              
           }
           ,createElement:function (key){
              var url = getWuchaolongUrl(key);
              var text = key+" in pan.baidu sharing";
              var html = (dedent  `<a class="full-wl-button ribbonize" target="_blank" href="${url}" title="${text}">
                  <div class="wl-ribbon fullsize not-inWL">
                  <div class="container"><span style="
                      color: white;
                      padding-left: 17px;
                  ">${text}
                  </div>
                    </div>
                    <div class="wl-ribbon poster not-inWL" style="
                      background-image: url(https://wuchaolong.github.io/video/img/logo.png);
                      background-position: center;
                      background-size: 70% auto;
                  "></div></a>`);
              return elementBy(html);
            }
      }
      ,"黄盐host":{
//       ,'127.0.0.1:8080':{
            getKey:function(){
              var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
              return document.title.split(pattern)[0].split(/\s|电视剧|电影/)[0];
            }
            ,insert:function(element){
                try{
                  var aside = document.querySelector("#TMHYul");
                  aside.appendChild(element);
                }catch(e){
                  var div = this["create黄盐Element"]();
                  div.querySelector("#TMHYul").appendChild(element);
                  document.body.appendChild(div);
//                   ajaxScript("https://raw.githubusercontent.com/woolition/greasyforks/master/hackVipVideosSet/破解VIP会员视频集合.user.js",function(script){
//                       try{eval(script);}catch(e){
//                         console.log(e);
//                       }
//                       whatSite('黄盐host').insert(element);
//                   });
                }
            }
            ,createElement:function (key){
              var url = getWuchaolongUrl(key);
              var text = key+" in pan.baidu sharing";
              var html = (dedent  `<li class="TM1"><a target="_blank"  href="${url}" title="${text}"><span id="TMSet"><img width="100%" src="https://wuchaolong.github.io/video/img/logo.png"/>
                  </span></a></li>`);
              return elementBy(html);
            }
            ,"create黄盐Element":function(){
              var html = `<div><style>#TMHYul { position: fixed; top: 5em; left: 0; padding: 0; z-index: 999999; } .TM1 { opacity: 0.3; position: relative; padding-right: .5em; width: 1.5em; cursor: pointer; list-style: none; } .TM1:hover { opacity: 1; } .TM1 span { display: block; border-radius: 0 .3em .3em 0; background-color: #ffff00; border: 0; font: bold 1em "微软雅黑"!important; color: #ff0000; margin: 0; padding: 1em .3em; } </style> <ul id="TMHYul"></ul></div>`;

              return elementBy(html);
            }
      }

   };
   return config[host]||config["黄盐host"];
}

// function ajaxScript(sSrc, fOnload,error){
//         var sSrc = "https://charon-node.herokuapp.com/fetch?npm=node-fetch&api="+sSrc;
//         var request = new XMLHttpRequest();
//         request.open("get", sSrc);
//         request.send(null);
//         request.onload = fOnload;
//         request.onload = function(e) {
//             if (this.status == 200) {
//                     fOnload(this.response,error);
//             }else{
//               error();
//             }
//         };
//         request.onerror = error;
// }

function getWuchaolongUrl(key){
  return (dedent `https://wuchaolong.github.io/video/?search=${key}`);
}

function createElementBy(key){
  var url = getWuchaolongUrl(key);
  var config = {
    userLang:navigator.language || navigator.userLanguage
    ,string:function(text){
          return text[config.userLang]||text.default;
      }
    ,source:{
      "zh-CN":"资源"
      ,"default":"Resources"
    }
    ,more:{
      "zh-CN":"更多"
      ,"default":"More"
    }
  }
  var html = (dedent `<div id="wuchaolong"><a href="#wuchaolong"></a>
  <h2><i class="">${config.string(config.source)}</i>
                
    </h2>
  <iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  scrolling="no" src="${url}"></iframe>
  <p class="wuchaolong-more">
  <span class="pl"><a href="${url}" target="_blank">${config.string(config.more)}</a></span>
   <link rel="stylesheet" href="https://wuchaolong.github.io/video/douban/greasyfork.css" />
<!--       <link rel="stylesheet" href="/video/douban/greasyfork.css" /> -->
  </div>
  `);
  return elementBy(html);
}

function elementBy(html){
  var d = document.createElement('div');
  d.innerHTML = html;
  return d.childNodes[0];
}

function dedent(strings, ...values) {

  let result = '';
  for (let i = 0; i < strings.length; i++) {
      if(values&&values[i]){
        result += strings[i].replace(/\n\s+/g, '\n') + values[i];
      }else{
          result += strings[i].replace(/\n\s+/g, '\n');
      }
  }
  return result;
}

})()