// ==UserScript==
// @name         ! 豆瓣电影 + 百度网盘 |!' IMDB + Magnet |!' 各大视频网站 +
// @version      4.2
// @description  找资源不用打开一堆新标签,有的话会直接播放 |!' Show magnet and pan.baidu.com in movie detail page |!' 当破解VIP会员电视剧失败?没准有网盘和磁力种子在分享呢.兼容黄岩Style.
// @author       WuChaolong
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAS1BMVEX////ycnLyampuu25muGby8nLy8mrl5eXk5OT8DAz8/AzPz8/z8zONvY3Nzc3d3d3b29v/AAAMnAwAmQD//wDMzMz19SmIu4j///+ks1oiAAAAEXRSTlMAwMfg5cDHgIj+/vD7/v7AxxKKtKIAAAABYktHRACIBR1IAAAACW9GRnMAAAEtAAABagBZv0KIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH4gERCw82Bupv1AAAAAl2cEFnAAADGgAABGMAz64W0QAAAItJREFUaN7t2UkKgEAQBEF13Pfd///UQ4n0YQRBBIXMYzEaD+ggIPpZYaRCO7pYObMlqUrswyxX2TVQDKqw4zip0WzlrEr7sFpUBQAAAAAAAAAAAHBWr6p+C/D+CwAAAAAAAAAA4BnQbKp5C2iP71oAAAAAAAAAAID/AN6Ddderzmze2/SNgzXRJ9sBPp3K24JPMHQAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDEtMTdUMTk6MTQ6NDIrMDg6MDBqGWm5AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTAxLTE3VDE5OjE0OjQyKzA4OjAwG0TRBQAAAABJRU5ErkJggg==

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

// @grant    GM_openInTab
// ==/UserScript==

;(function() {
var site = whatSite(location.host);
var key = site.getKey();
var element = site.createElement(key);
if(!isExist()) {
  site.insert(element);
}else{
  isExist() = element;
}

function whatSite(host){
  var icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAS1BMVEX////ycnLyampuu25muGby8nLy8mrl5eXk5OT8DAz8/AzPz8/z8zONvY3Nzc3d3d3b29v/AAAMnAwAmQD//wDMzMz19SmIu4j///+ks1oiAAAAEXRSTlMAwMfg5cDHgIj+/vD7/v7AxxKKtKIAAAABYktHRACIBR1IAAAACW9GRnMAAAEtAAABagBZv0KIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH4gERCw82Bupv1AAAAAl2cEFnAAADGgAABGMAz64W0QAAAItJREFUaN7t2UkKgEAQBEF13Pfd///UQ4n0YQRBBIXMYzEaD+ggIPpZYaRCO7pYObMlqUrswyxX2TVQDKqw4zip0WzlrEr7sFpUBQAAAAAAAAAAAHBWr6p+C/D+CwAAAAAAAAAA4BnQbKp5C2iP71oAAAAAAAAAAID/AN6Ddderzmze2/SNgzXRJ9sBPp3K24JPMHQAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDEtMTdUMTk6MTQ6NDIrMDg6MDBqGWm5AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTAxLTE3VDE5OjE0OjQyKzA4OjAwG0TRBQAAAABJRU5ErkJggg=="
  var sites = {
      "default":{
	  		insert:function(element){
                var aside = document.body||document.html;
                  aside.appendChild(element);
            }
            ,createElement:createElementBy
            ,getKey:function(){
              return getKey(/\s|-|_|电视剧|电影|《|》|第/);
            }
	  }
   };
   var site = sites["default"];
   site.getKey = site.getKey || getKey;
   return site;


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
      
      <iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" src="${url}"></iframe>
      <p class="wuchaolong-more">
      <span class="pl"><a href="${url}" target="_blank">${config.string(config.more)}</a></span>
       <!--<link rel="stylesheet" href="https://wuchaolong.github.io/video/douban/greasyfork.css" />-->
           <link rel="stylesheet" href="/video/extend/greasyfork.css" /> 
      </div>
      `);
      return elementBy(html);
   }

}
function isExist(){
  return document.getElementById("wuchaolong");
}
function getKey(reg,t){
  try{
    var title = document.querySelector('meta[property="og:title"]').content
      ||document.querySelector('meta[name="keywords"]').content;
  }catch(e){
    title = document.title;
  }
  title = title.replace(/\【(.*?)\】/,"【】");
//   var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
  var pattern = /[\`\~\!\@\#\$\^\&\*\(\)\=\|\{\}\'\:\;\'\,\\\\\[\\\\\]\.\<\>\/\?\~\！\@\#\￥\……\&\*\（\）\——\|\{\}\【\】\‘\；\：\”\“\'\。\，\、\？]/
  
  var value = getValue(title.split(pattern));
  value = reg?getValue(value.split(reg)):value;
  return value;
}
function getValue(array,index){
  var index = index || 0;
  try{
    var value = array[index];
    return value||getValue(array,index+1);
  }catch(e){
    return "";
  }
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