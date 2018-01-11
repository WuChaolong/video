// ==UserScript==
// @name         豆瓣电影 + 资源 || IMDB + Resources
// @version      2.7
// @description  找百度网盘和种子不用打开一堆新标签,有的话会直接播放 || Show magnet and pan.baidu.com in movie detail page 
// @author       WuChaolong
// @match        *://movie.douban.com/subject/*
// @match        *://www.imdb.com/title/*

// ==/UserScript==

;(function() {


var site = whatSite(location.host);
var key = site.getKey();
var element = createElementBy(key);
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
              aside.classList.add("add-back");
              aside.appendChild(element);
              window.onclick=function(e){
                if(e.target == element){
                  element.classList.add("hover");
                }else{
                  element.classList.remove("hover");
                }
              }
              element.onmouseover = function(){
                  element.classList.add("hover");
              }
           }
      }

   };
   return config[host]
}

function createElementBy(key){
  var url = (dedent `https://wuchaolong.github.io/video/?search=${key}`);
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
      ,"default":"more"
    }
  }
  var html = (dedent `<div id="wuchaolong">
  <h2><i class="">${config.string(config.source)}</i>
                
    </h2>
  <iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  scrolling="no" src="https://wuchaolong.github.io/video/?search=${key}"></iframe>
  <p class="wuchaolong-more">
  <span class="pl"><a href="${url}" target="_blank">${config.string(config.more)}</a></span>
  <link rel="stylesheet" href="http://wuchaolong.github.io/video/douban/greasyfork.css" />

  </div>
  `);
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