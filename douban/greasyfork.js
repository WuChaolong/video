// ==UserScript==
// @name         豆瓣电影 + 资源 || IMDB + Resources
// @version      3
// @description  找百度网盘和种子不用打开一堆新标签,有的话会直接播放 || Show magnet and pan.baidu.com in movie detail page 
// @author       WuChaolong
// @match        *://movie.douban.com/subject/*
// @match        *://*.imdb.com/title/*
// @match        *://m.douban.com/movie/subject/*

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
                      background-image: url(https://yun.baidu.com/res/static/images/favicon.ico);
                  "></div></a>`);
              return elementBy(html);
            }
      }

   };
   return config[host]
}
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