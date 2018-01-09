;(function() {

var key = document.querySelector('meta[name="keywords"]').getAttribute('content');
key = key.split(",")[0];


var html = (dedent `<div id="wuchaolong">
<h2><i class="">资源</i>
              · · · · · ·
            <span class="pl">
          (
          <a href="https://wuchaolong.github.io/video/?search=${key}" target="_blank">更多</a>
          )</span>
  </h2>
<iframe  scrolling="no" src="https://wuchaolong.github.io/video/?search=${key}"></iframe>
<p class="wuchaolong-more">
<span class="pl">
          (
          <a href="https://wuchaolong.github.io/video/?search=${key}" target="_blank">更多</a>
          )</span>
<link rel="stylesheet" href="https://wuchaolong.github.io/video/douban/greasyfork.css" />

</div>
`);
var d = document.createElement('div');
d.innerHTML = html;
var aside = document.querySelector(".aside");
aside.insertBefore(d.childNodes[0], document.getElementById("subject-others-interests"));

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