
    ;(function(){
        window.subject_id = window.subject_id || 26862829;
        "use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GalleryTopicsSelection = function (_React$Component) {
  _inherits(GalleryTopicsSelection, _React$Component);

  function GalleryTopicsSelection() {
    _classCallCheck(this, GalleryTopicsSelection);

    var _this = _possibleConstructorReturn(this, (GalleryTopicsSelection.__proto__ || Object.getPrototypeOf(GalleryTopicsSelection)).call(this));

    _this.state = {
      topics: []
    };
    return _this;
  }

  _createClass(GalleryTopicsSelection, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      $.ajax({
        url: "https://m.douban.com/rexxar/api/v2/gallery/subject_feed?start=0&subject_id=" + window.subject_id + "&ck=" + get_cookie('ck'),
        xhrFields: { withCredentials: true },
        success: function success(res) {
          _this2.setState({
            topics: res.items
          });
          if (res.total) {
            window.has_gallery_topics = true;
          }
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var topics = this.state.topics;

      return React.createElement(
        "section",
        null,
        React.createElement(
          "a",
          { href: "new_review?from=gallery-topics-selection&click=close", rel: "nofollow", className: "close_selection" },
          "\u8DF3\u8FC7"
        ),
        React.createElement(
          "h1",
          null,
          "\u4E0B\u9762\u662F\u5426\u6709\u4F60\u60F3\u5199\u7684\u8BDD\u9898\uFF1F"
        ),
        topics.length ? React.createElement(
          "ul",
          { className: "gl_topics" },
          topics.map(function (item) {
            return React.createElement(
              "li",
              { className: "topic" },
              React.createElement(
                "a",
                { href: "new_review?from=gallery-topics-selection&click=create&tag_from_gallery=" + item.topic.name,
                  className: "comment_btn write_review",
                  rel: "nofollow" },
                React.createElement("img", { src: window.write_icon }),
                React.createElement(
                  "span",
                  null,
                  window.join_label_text
                )
              ),
              React.createElement(
                "h2",
                { className: "topic_name" },
                item.topic.name
              ),
              React.createElement(
                "div",
                { className: "topic_meta" },
                item.topic.card_subtitle
              )
            );
          })
        ) : React.createElement(
          "div",
          null,
          "\u52A0\u8F7D\u4E2D"
        ),
        React.createElement(
          "a",
          { href: "new_review?from=gallery-topics-selection&click=skip", rel: "nofollow", className: "topics_skip" },
          React.createElement(
            "span",
            null,
            "\u4E0A\u9762\u6CA1\u6709\u6211\u60F3\u5199\u7684\u8BDD\u9898\uFF0C\u53BB\u5199\u5F71\u8BC4 \uFF1E "
          )
        )
      );
    }
  }]);

  return GalleryTopicsSelection;
}(React.Component);

$(function () {
  var glRoot = document.getElementById('gallery-topics-selection');

  ReactDOM.render(React.createElement(GalleryTopicsSelection, null), glRoot);
});;
    })();
;
                var cur_sort = '';
                $('.review_filter a').on('click', function () {
                    var sort = $(this).data('sort');
                    if(sort === cur_sort) return;

                    if(sort === 'follow' && true){
                        window.location.href = '//www.douban.com/accounts/login?source=movie';
                        return;
                    }

                    if($('.review_filter').data('doing')) return;
                    $('.review_filter').data('doing', true);

                    cur_sort = sort;
                    
                    $('.review_filter a').removeClass('cur');
                    $(this).addClass('cur');

                    $.getJSON('reviews', { sort: sort }, function(res){
                        $('.review-list').remove();
                        $('[href="reviews?sort=follow"]').parent().remove();
                        $('.reviews .review_filter').after(res.html);
                        $('.review_filter').data('doing', false);
                        $('.review_filter').removeData('doing');
                        
                        if(res.count === 0){
                            $('.review-list').html('<span class="no-review">你关注的人还没写过长评</span>');
                        }
                    });
                });
            ;
        Do(function() {
            if (window.__init_review_list) return;
            __init_review_list = true;
            var _URL_LIBS = 'https://img3.doubanio.com/f/zerkalo/ae843e402115c5d933e23bd04c55523a1951bae6/js/review/editor/libs.js';
            var _URL_SETTING_JS = 'https://img3.doubanio.com/f/zerkalo/97f440e1da665c7aa2fc1aafdb29da5822fed144/js/review/editor/ng/setting_standalone.js';
            var _URL_SETTING_CSS = 'https://img3.doubanio.com/f/zerkalo/43e29c1661d06f69562f25ed0d887bb5a889d225/css/review/editor/ng/setting_standalone.css';
            !function(t){function e(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=71)}({17:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(35),r=o(i);e.default=r.default},31:function(t,e,n){"use strict";t.exports=function(t){"complete"===document.readyState||"interactive"===document.readyState?t.call():document.attachEvent?document.attachEvent("onreadystatechange",function(){"interactive"===document.readyState&&t.call()}):document.addEventListener&&document.addEventListener("DOMContentLoaded",t)}},33:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e,n){return t.addEventListener?(t.addEventListener(e,n,!1),{remove:function(){t.removeEventListener(e,n,!1)}}):t.attachEvent?(t.attachEvent("on"+e,n),{remove:function(){t.detachEvent("on"+e,n)}}):void 0}},34:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function i(t){arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("undefined"!=typeof t&&null!=t){if(!(this instanceof i))return new i(t);var e=t.getAttribute("data-inited");e||(this.options={el:t,container:t.parentNode,prefetch:Boolean(t.getAttribute("prefetch")),previewUrl:t.getAttribute("src"),originUrl:t.getAttribute("data-original-url")},this._fetchUrl=this.options.originUrl,this.init())}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(33),a=o(r);i.prototype.prefetch=function(t){if(t&&this.options.prefetch){var e=document.createElement("link");e.rel="prefetch",e.href=t;var n=document.getElementsByTagName("link")[0];n.parentNode.insertBefore(e,n)}},i.prototype.play=function(){var t=this.options.el;t.src=this._fetchUrl,this._buttonPlay.style.display="none",this._buttonReload.style.display="none",this._loading.style.display="block"},i.prototype.reload=function(){this._buttonPlay.style.display="none",this._buttonReload.style.display="none",this._loading.style.display="block";var t=this.options.originUrl,e="_r="+Math.random();this._fetchUrl=t.indexOf("?")+1?t+"&"+e:t+"?"+e,this.play()},i.prototype.loaded=function(t){var e=this.options,t=e.el,n=e.container;t.src===this._fetchUrl&&(this._buttonPlay_click.remove(),this._buttonReload_click.remove(),this._img_load_error.remove(),this._img_load.remove(),n.removeChild(this._panel))},i.prototype.notFound=function(){var t=this.options,e=t.el,n=t.previewUrl;e.src=n,this._buttonPlay.style.display="none",this._buttonReload.style.display="block",this._loading.style.display="none"},i.prototype.init=function(){var t=this,e=this.options,n=e.el,o=e.container,i=(e.originUrl,this._panel=document.createElement("div")),r="image-gif-button-play",l="image-gif-loading",s="image-gif-button-reload";i.className="image-gif-panel",i.innerHTML='\n    <div class="image-gif-panel-inner">\n      <a href="javascript:;" class="'+r+'">GIF</a>\n      <a href="javascript:;" class="'+s+'" style="display: none">重新加载</a>\n      <span class="'+l+'" style="display: none;">加载中</span>\n    </div>\n  ',o.appendChild(i),this._buttonPlay=i.getElementsByClassName(r)[0],this._buttonReload=i.getElementsByClassName(s)[0],this._loading=i.getElementsByClassName(l)[0],this.prefetch(this._fetchUrl);var u=function(e){return function(n){n.preventDefault?n.preventDefault():n.returnValue=!1,e.call(t,n.target||n.srcElement,n.loaded?n.loaded/n.total:-1)}};this._buttonPlay_click=(0,a.default)(this._buttonPlay,"click",u(this.play)),this._buttonReload_click=(0,a.default)(this._buttonReload,"click",u(this.reload)),this._img_load=(0,a.default)(n,"load",u(this.loaded)),this._img_load_error=(0,a.default)(n,"error",u(this.notFound)),n.setAttribute("data-inited",!0)},e.default=i},35:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function i(){r=[];for(var t,e=document.querySelectorAll("img[data-render-type=gif]"),n=0;t=e[n];)r.push((0,c.default)(t)),n++;if("object"===("undefined"==typeof a?"undefined":l(a))&&"preloadNum"in a)for(var o=a.preloadNum;o--;)r[o]&&r[o].play()}Object.defineProperty(e,"__esModule",{value:!0});var r,a,l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s=n(31),u=o(s),d=n(34),c=o(d);e.default=function(t){a=t,(0,u.default)(i)}},67:function(t,e){},71:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}var i=n(17),r=o(i);n(67),window._IMAGE_GIF_RENDER=r.default}});
            (function(){var F=8;var B=window.dui||{},e="dui-dialog",x=[],t=null,f=($.browser.msie&&$.browser.version==="6.0")?true:false,D="ontouchstart" in window,d={},r={},E="j_close_dialog",c="dui-dialog",m="dui-dialog-close",a="dui-dialog-shd",q="dui-dialog-content",n="dui-dialog-iframe",j="dui-dialog-msk",p="确定",b="取消",w="提示",l="下载中，请稍候...",i='<div id="{ID}" class="'+c+' {CLS}" style="{CSS_ISHIDE}">                <span class="'+a+'"></span>                <div class="'+q+'">                    {BN_CLOSE}                    {TITLE}                    <div class="bd">{BODY}</div>                </div>            </div>',g='<a href="#" class="'+E+" "+m+'">X</a>',k='<div class="hd"><h3>{TITLE}</h3></div>',y='<iframe class="'+n+'"></iframe>',u='<div class="'+j+'"></div>',o={confirm:{text:p,method:function(G){G.close()}},cancel:{text:b,method:function(G){G.close()}}},C={url:"",nodeId:"",cls:"",content:"",title:w,width:0,height:0,visible:false,modal:false,iframe:false,maxWidth:960,autoupdate:false,cache:true,buttons:[],callback:null,dataType:"text",isStick:false,isHideClose:false,isHideTitle:false},h=function(J,I){var G={},H;for(H in I){if(I.hasOwnProperty(H)){G[H]=J[H]===undefined?I[H]:J[H]}}return G},A=function(L){var I=L.elements,H=0,J,K=[],G={"select-one":function(M){return encodeURIComponent(M.name)+"="+encodeURIComponent(M.options[M.selectedIndex].value)},"select-multiple":function(P){var O=0,N,M=[];for(;N=P.options[O++];){if(N.selected){M.push(encodeURIComponent(P.name)+"="+encodeURIComponent(N.value))}}return M.join("&")},radio:function(M){if(M.checked){return encodeURIComponent(M.name)+"="+encodeURIComponent(M.value)}},checkbox:function(M){if(M.checked){return encodeURIComponent(M.name)+"="+encodeURIComponent(M.value)}}};for(;J=I[H++];){if(G[J.type]){K.push(G[J.type](J))}else{K.push(encodeURIComponent(J.name)+"="+encodeURIComponent(J.value))}}return K.join("&").replace(/\&{2,}/g,"&")},v=function(G){var H=G||{};this.config=h(H,C);this.init()};v.prototype={init:function(){if(!this.config){return}this.render();this.bind();return this},render:function(J){var G=this.config,L=G.nodeId||e+x.length;x.push(L);var I=$("body"),K=I.find("."+j),H=typeof G.content==="object"?$(G.content).html():G.content;I.append(i.replace("{ID}",L).replace("{CSS_ISHIDE}",G.visible?"":"visibility:hidden;top:-999em;left:-999em;").replace("{CLS}",G.cls).replace("{TITLE}",k.replace("{TITLE}",G.title)).replace("{BN_CLOSE}",g).replace("{BODY}",H||J||""));if(G.modal&&!K.length){I.append(u);this.msk=$("."+j)}else{this.msk=K.eq(0)}this.nodeId=L;this.node=$("#"+L);this.title=$(".hd",this.node);this.body=$(".bd",this.node);this.btnClose=$("."+m,this.node);this.shadow=$("."+a,this.node);this.iframe=$("."+n,this.node);this.set(G);return this},bind:function(){var G=this;if(!f){$(window).bind({resize:s(function(){G.updatePosition()},"pos"),scroll:s(function(){G.updatePosition()},"pos")})}G.node.delegate("."+E,"click",function(H){G.close();H.preventDefault()});G.node.find("."+m).bind("click",function(H){G.close();H.preventDefault()});$("body").keypress(function(H){if(H.keyCode===27){G.close()}});return this},updateSize:function(){var I=this.node.width(),J,G=$(window).width(),K=$(window).height(),H=this.config;$(".bd",this.node).css({height:"auto","overflow-x":"visible","overflow-y":"visible"});J=this.node.height();var L=2*F;H.maxWidth=Math.min(H.maxWidth,G-L);if(I>H.maxWidth){I=H.maxWidth;this.node.css("width",I+"px")}if(J>K){$(".bd",this.node).css({height:(K-150)+"px","overflow-x":"hidden","overflow-y":"auto"})}J=this.node.height();this.shadow.width(I);this.shadow.height(J);this.iframe.width(I+L).height(J+L);return this},updatePosition:function(){if(this.config.isStick){return}var G=this.node.width(),I=this.node.height(),J=$(window),H=f?J.scrollTop():0;this.node.css({left:Math.floor(J.width()/2-G/2)+"px",top:Math.floor(J.height()/2-I/2-F)+H+"px"});return this},set:function(L){var N,Q,H,I,G=this.nodeId,O=this.nodeId||O,J=[],K=this,P=function(R){J.push(0);return G+"-"+R+"-"+J.length};if(!L){return this}if(L.width){this.node.css("width",L.width+"px");this.config.width=L.width}if(L.height){this.node.css("height",L.height+"px");this.config.height=L.height}if($.isArray(L.buttons)&&L.buttons[0]){I=$(".ft",this.node);H=[];$(L.buttons).each(function(){var S=arguments[1],R=P("bn");if(typeof S==="string"){S=o[S]}if(!S.text){return}if(S.href){H.push('<a class="'+(S.cls||"")+'" id="'+R+'" href="'+S.href+'">'+S.text+"</a> ")}else{H.push('<span class="bn-flat '+(S.cls||"")+'"><input type="button" id="'+R+'" class="'+O+'-bn" value="'+S.text+'" /></span> ')}r[R]=S.method});if(!I[0]){I=this.body.parent().append('<div class="ft">'+H.join("")+"</div>")}else{I.html(H.join(""))}this.footer=$(".ft",this.node);$(".ft input, .ft a",this.node).click(function(T){var S=this.id&&r[this.id];if(S){var R=S.call(this,K)}if(R){T.preventDefault();if(typeof R=="string"){alert(R)}}})}else{this.footer=$(".ft",this.node);this.footer.html("")}if(typeof L.isHideClose!=="undefined"){if(L.isHideClose){this.btnClose.hide()}else{this.btnClose.show()}this.config.isHideClose=L.isHideClose}if(typeof L.isHideTitle!=="undefined"){if(L.isHideTitle){this.title.hide()}else{this.title.show()}this.config.isHideTitle=L.isHideTitle}if(L.title){this.setTitle(L.title);this.config.title=L.title}if(typeof L.iframe!=="undefined"){if(!L.iframe){this.iframe.hide()}else{if(!this.iframe[0]){this.node.prepend(y);this.iframe=$("."+n,this.node)}else{this.iframe.show()}}this.config.iframe=L.iframe}if(L.content){this.body.html(typeof L.content==="object"?$(L.content).html():L.content);this.config.content=L.content}if(L.url){if(L.cache&&d[L.url]){if(L.dataType==="text"||!L.dataType){this.setContent(d[L.url])}if(L.callback){L.callback(d[L.url],this)}}else{if(L.dataType==="json"){this.setContent(l);if(this.footer){this.footer.hide()}$.getJSON(L.url,function(R){K.footer.show();d[L.url]=R;if(L.callback){L.callback(R,K)}})}else{this.setContent(l);if(this.footer){this.footer.hide()}$.ajax({url:L.url,dataType:L.dataType,success:function(R){d[L.url]=R;if(K.footer){K.footer.show()}K.setContent(R);if(L.callback){L.callback(R,K)}}})}}}var M=L.position;if(M){this.node.css({left:M[0]+"px",top:M[1]+"px"})}if(typeof L.autoupdate==="boolean"){this.config.autoupdate=L.autoupdate}if(typeof L.isStick==="boolean"){if(L.isStick){this.node.css("position","absolute")}else{this.node.css("position","fixed")}this.config.isStick=L.isStick}return this.update()},update:function(){this.updateSize();this.updatePosition();return this},setContent:function(G){this.body.html(G);return this.update()},setTitle:function(G){$("h3",this.title).html(G);return this},submit:function(I){var G=this,H=$("form",this.node);H.submit(function(M){M.preventDefault();var J=this.getAttribute("action",2),K=this.getAttribute("method")||"get",L=A(this);$[K.toLowerCase()](J,L,function(N){if(I){I(N)}},"json")});H.submit()},open:function(){this.node.appendTo("body").css("visibility","visible").show();var H=this,G=this.config,I=H.body[0];H.contentHeight=I.offsetHeight;this.watcher=!G.autoupdate?0:setInterval(function(){if(I.offsetHeight===H.contentHeight){return}H.update();H.contentHeight=I.offsetHeight},100);if(G.modal){this.msk.show().css({height:$(document).height()})}return this},close:function(){this.node.hide();this.msk.hide();this.node.trigger("dialog:close",this);clearInterval(this.watcher);return this}};B.Dialog=function(G,H){if(!H&&t){return G?t.set(G):t}if(!t&&!H){t=new v(G);return t}return new v(G)};window.dui=B;var z={};function s(G,H){return function(){var K=z[H];var J=arguments;var I=this;if(K){clearTimeout(K)}z[H]=setTimeout(function(){G.apply(I,arguments)},300)}}})();
            !function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var i=n(2),o=r(i);!function(){"loading"!==document.readyState?(0,o.default)(document):document.addEventListener?document.addEventListener("DOMContentLoaded",function(){return(0,o.default)(document)},!1):window.attachEvent("onreadystatechange",function(){"loading"!==document.readyState&&(0,o.default)(document)})}()},,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var i=n(3),o=r(i);e.exports=function(){for(var e=void 0,t=document.querySelectorAll(".review-list .toggle_review")||[],n=t.length,r=(function(){return"_IMAGE_GIF_RENDER"in window&&setTimeout(function(){return window._IMAGE_GIF_RENDER()},300)}),i=function(t){var n=t.target,i=n.className,a=t.target.id,l=a.split("-")[1]||"",u=$("#toggle-"+l+".indicator"),d=i.match(/unfold/g),c=document.getElementById("review_"+l+"_short"),s=document.getElementById("review_"+l+"_full"),f=document.getElementById("review_"+l+"_full_content"),g=s.className.match(/loaded/g);e="/j/review/"+l+"/full",t.preventDefault(),d&&!g?($.ajaxSetup({cache:!0}),$.getJSON(e,function(e,t){f.innerHTML=e.body,s.classList.add("loaded"),s.classList.toggle("hidden"),c.classList.toggle("hidden"),u.toggleClass("unfold"),n.setAttribute("title","收起全文"),(0,o.default)(document),r()})):(s.classList.toggle("hidden"),c.classList.toggle("hidden"),u.toggleClass("unfold"),n.setAttribute("title","展开全文"))},a=0;a<n;a++)t&&t[a].addEventListener("click",i,!1);$(".btn-unfold").bind("click",function(e){e.preventDefault();var t=$(e.target),n=t.parent(".fold-hd");n.slideUp().next().slideDown()})}},function(e,t){"use strict";e.exports=function(){var e={useful_count:["有用","/j/review/{REVIEW_ID}/useful"],useless_count:["没用","/j/review/{REVIEW_ID}/useless"],spoiler:["剧透提醒已提交，谢谢","/j/review/{REVIEW_ID}/spoiler"]},t=/disabled/,n=/(\w+_count)/,r=/spoiler/,i=document.querySelectorAll(".main-panel-useful"),o=null,a="",l=function(e){return e&&"true"===e.getAttribute("data-is_owner")},u=function(e){return e&&"true"===e.getAttribute("data-can_vote")},d=function(i){i.stopPropagation();var o=i.target,d=o.className,f=d.match(n)||d.match(r),g="",m="",v="";if(!d.match(t)){if(f){if(l(i.currentTarget))return alert("不能给自己投票噢");if(!u(i.currentTarget))return alert("该电影还未上映，不能投票噢");g=f[0],v=e[g][0],m=e[g][1],a=i.currentTarget.getAttribute("data-rid"),m=m.replace("{REVIEW_ID}",a)}else if(!f||!a)return;var _=$.post(m,{ck:get_cookie("ck")},function(e){if(0==e.r){if("spoiler"===g)return c();s(e,g)}});_.fail(function(){alert("网络错误")}).always(function(){})}},c=function(t){var n=document.getElementById(a),r=n.querySelector(".spoiler");r.innerText=e.spoiler[0],r.className=r.className.replace("not-reported","disabled")},s=function(n,r){var i=document.getElementById(a);for(var o in e)if(void 0!==n[o]){var l=e[o][0]+" "+n[o],u=i.querySelector("."+o),d=u.className;(o===r||o!==r&&d.match(t))&&u.classList.toggle("disabled"),u.innerHTML=l}},f=i.length;if(1===f)o=i[0],a=o.getAttribute("data-rid"),o&&o.addEventListener("click",d,!1);else for(var g=0;g<f;g++)o=i[g],o&&o.addEventListener("click",d,!1)}}]);
            'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var visible = function () {
    function visible() {
        var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

        _classCallCheck(this, visible);

        this.container = container;
        this.containerHeight = container.innerHeight;
        this.eleList = [];
        this.lastVisibleEle = null;
        this.cbs = [];
        this.__start();
    }

    _createClass(visible, [{
        key: '__start',
        value: function __start() {
            var _this = this;

            this.container.addEventListener('scroll', function () {
                _this.__detect();
            });

            this.container.addEventListener('resize', function () {
                _this.containerHeight = _this.container.innerHeight;
                _this.__detect();
            });
        }
    }, {
        key: '__detect',
        value: function __detect() {
            var _this2 = this;

            if (!this.eleList.length && this.lastVisibleEle) {
                if (this.lastVisibleEle === null) return;
                this.cbs.forEach(function (cb) {
                    return cb(_this2.lastVisibleEle, null);
                });
                this.lastVisibleEle = null;
                return;
            };

            var inview = this.eleList.filter(function (ele) {
                var rect = ele.getBoundingClientRect();
                if (rect.height > _this2.containerHeight && rect.top < _this2.containerHeight && _this2.containerHeight < rect.bottom) return true;
                return false;
            });

            if (inview.length === 0) {
                if (this.lastVisibleEle === null) return;
                this.cbs.forEach(function (cb) {
                    return cb(_this2.lastVisibleEle, null);
                });
                this.lastVisibleEle = null;
            } else {
                if (this.lastVisibleEle === inview[0]) return;
                this.cbs.forEach(function (cb) {
                    return cb(_this2.lastVisibleEle, inview[0]);
                });
                this.lastVisibleEle = inview[0];
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(cb) {
            this.cbs.push(cb);
        }
    }, {
        key: 'add',
        value: function add(ele) {
            this.eleList.push(ele);
            this.__detect();
        }
    }, {
        key: 'remove',
        value: function remove(ele) {
            this.eleList.splice(this.eleList.indexOf(ele), 1);
            this.__detect();
        }
    }]);

    return visible;
}();

Do.ready(function () {
    if ('_REVIEW_COPY_OPTIONS' in window) {
        return;
    }
    _REVIEW_COPY_OPTIONS = {
        targetNode: '.review-content',
        handleCopy: function handleCopy(text, node) {
            var da = node.data();
            if (!da || !da.original) {
                return;
            }
            var copyright = ['版权归作者所有，任何形式转载请联系作者。', '作者：' + da.author + '（来自豆瓣）', '来源：' + da.url, '\n\n'].join('\r\n');
            return copyright + text;
        }
    };
    ;(function (options) {
        if (typeof options == 'undefined') {
            return;
        }
        var getSelectionText = function getSelectionText() {
            if (window.getSelection) {
                return window.getSelection().toString();
            }
            if (document.selection && document.selection.type != 'Control') {
                return document.selection.createRange().htmlText.replace(/<br>/gi, '\r\n');
            }
            return '';
        };

        var setSelectionText = function setSelectionText(clipboardData, text) {
            if (clipboardData) {
                try {
                    clipboardData.setData('Text', text);
                    if (clipboardData.getData('Text').length > 0) {
                        return;
                    }
                } catch (e) {
                    clipboardData.setData('text/plain', text);
                    if (clipboardData.getData('text/plain').length > 0) {
                        return;
                    }
                }
            }
            var div = $('<div>').css({ position: 'absolute', left: '-99999px' }).appendTo('body');
            div.html(text);
            window.getSelection().selectAllChildren(div[0]);
            window.setTimeout(function () {
                div.remove();
            }, 200);
        };

        $('body').delegate(options.targetNode, 'copy cut', function (e) {
            var selectionText = getSelectionText();
            if (selectionText.length <= 42) {
                return;
            }
            var newText = options.handleCopy && options.handleCopy(selectionText, $(this)) || null;
            if (!newText) {
                return;
            }
            e.preventDefault();
            var clipboardData = e.originalEvent.clipboardData || window.clipboardData;
            setSelectionText(clipboardData, newText);
        });
    })(window._REVIEW_COPY_OPTIONS);
});

Do.global(_URL_LIBS);
Do.ready(_URL_SETTING_CSS, _URL_SETTING_JS, function () {
    var get_cookie = function get_cookie(name) {
        var nameEQ = name + '=',
            ca = document.cookie.split(';'),
            i,
            c;
        for (i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length).replace(/\"/g, '');
            }
        }
        return null;
    };
    $('body').delegate('.review-footer-action-setting a[data-rid]', 'click', function (e) {
        e.preventDefault();
        var da = $(this).data();
        var setting = {
            review_id: da.rid,
            setting: {
                rating: da.rating,
                is_original: da.original,
                is_spoiler: da.spoiler,
                is_accept_reward: da.donate,
                is_open_reward: da.openDonate
            },
            subjectTitle: da.subjectTitle,
            displayRating: da.displayRating,
            displaySpoiler: da.displaySpoiler,
            onSubmit: function onSubmit(e) {
                var params = {
                    ck: get_cookie('ck')
                };
                params['review[original]'] = e.is_original ? 'on' : '';
                params['review[donate]'] = e.is_accept_reward ? 'on' : '';
                if (setting.displayRating) {
                    params['review[rating]'] = e.rating;
                }
                if (setting.displaySpoiler) {
                    params['review[spoiler]'] = e.is_spoiler ? 'on' : '';
                }
                $.post(da.url, params, function (e) {
                    self.location.reload();
                });
            }
        };
        globalReviewSetting.open(setting);
    });
});;

(function () {

    ;(function () {
        var TMPL = ['<div class="popup-container hide">', '<div class="popup-wrap">', '<div class="popup-small">', '<a class="close"></a>', '<p class="popup-info">你的帐号存在安全风险<br/>写评论前请先输入验证码以证明是本人使用</p>', '<div class="popup-btns">', ' <a class="btn" href="javascript:;">前往验证</a>', '</div>', '</div>', '</div>', '</div>'].join('');
        $('body').delegate('a.create-review, .top-tab .btn', 'click', function (e) {
            e.preventDefault();
            var $this = $(this),
                $el = $this;
            if (!$this.attr('href')) {
                $el = $this.find('a');
            }
            var $popup = $('div.popup-container'),
                isverify = $el.attr('data-isverify'),
                verifyUrl = $el.attr('data-verify-url');
            if (!isverify || isverify.toLowerCase() == 'false') {
                if ($popup.size() < 1) {
                    $('body').append(TMPL);
                    $popup = $('div.popup-container');
                }
                $popup.find('.btn').attr('href', verifyUrl);
                $popup.removeClass('hide');
            } else {
                var glRoot = document.getElementById('gallery-topics-selection');
                if (window.has_gallery_topics && glRoot) {
                    glRoot.style.display = 'block';
                } else {
                    location.href = $el.attr('href');
                }
            }
        }).on('click', 'div.popup-container .close', function () {
            $('div.popup-container').addClass('hide');
        });
    })();

    $('body').delegate('.review-footer-action-remove a', 'click', function (e) {
        e.preventDefault();
        if (!confirm('真的就删了吗?')) {
            return;
        }
        var da = $(this).data();
        var frm = $('<form action="' + da.url + '" method="POST"><input type="hidden" name="ck" value="' + get_cookie('ck') + '"/></form>').appendTo('body');
        frm[0].submit();
    });
})();;

(function () {
    var visibleClient = new visible();

    visibleClient.onChange(function (lastEle, nextEle) {
        if (lastEle) {
            $(lastEle).find('.action').removeClass('fixed-action');
            $(lastEle).find('.action-placeholder').remove();
        }
        if (nextEle) {
            $(nextEle).append('<div class="action-placeholder" style="height: 46px;"></div>');
            var $action = $(nextEle).find('.action');
            $action.addClass('fixed-action');
            $action.css({
                width: $(nextEle).width() + 'px',
                left: nextEle.getBoundingClientRect().left + 'px'
            });
        }
    });

    function update(res, rid, mode) {
        var $useful_btn = $('#r-useful_count-' + rid + '');
        var $useless_btn = $('#r-useless_count-' + rid + '');
        $useful_btn.text(res.useful_count === 0 ? '' : res.useful_count);
        $useless_btn.text(res.useless_count === 0 ? '' : res.useless_count);
        if (mode === 'useful') {
            $useful_btn.prev().attr('src', window.usefuled_icon);
            $useless_btn.prev().attr('src', window.useless_icon);
        } else {
            $useful_btn.prev().attr('src', window.useful_icon);
            $useless_btn.prev().attr('src', window.uselessed_icon);
        }
    }

    $('body').delegate('.review-item .action .up', 'click', function () {
        var rid = $(this).data('rid');
        $.post('/j/review/' + rid + '/useful', {
            ck: get_cookie('ck')
        }, function (res) {
            update(res, rid, 'useful');
        });
    });

    $('body').delegate('.review-item .action .down', 'click', function () {
        var rid = $(this).data('rid');
        $.post('/j/review/' + rid + '/useless', {
            ck: get_cookie('ck')
        }, function (res) {
            update(res, rid, 'useless');
        });
    });

    function unfold(rid, html) {
        $('#review_' + rid + '_short').addClass('hidden');
        $('#review_' + rid + '_full').removeClass('hidden').addClass('loaded');
        if (html) $('#review_' + rid + '_full_content').html(html);
        $('.review-item#' + rid + ' .action .fold').removeClass('hidden');
    }

    function fold(rid) {
        $('#review_' + rid + '_short').removeClass('hidden');
        $('#review_' + rid + '_full').addClass('hidden');
        $('#' + rid).get(0).scrollIntoViewIfNeeded();
        $('#review_' + rid + '_short').find('.unfold').text('展开');
        $('#' + rid).find('.action-placeholder').remove();
        $('#' + rid).find('.action').removeClass('fixed-action');
        $('#' + rid).find('.action .fold').addClass('hidden');
    }

    $('body').delegate('.review-short', 'click', function () {
        var _this3 = this;

        var rid = $(this).data('rid');
        if ($(this).data('loaded')) {
            unfold(rid);
            visibleClient.add($(this).closest('.review-item').get(0));
            return;
        }
        if ($(this).data('loading')) return;
        $(this).data('loading', true);
        $(this).find('.unfold').text('加载中...');
        $.getJSON('/j/review/' + rid + '/full', {}, function (res) {
            unfold(rid, res.body);
            $(_this3).data('loading', false).data('loaded', true);
            visibleClient.add($(_this3).closest('.review-item').get(0));
            $(_this3).closest('.review-item').find('.action-btn.up img').attr('src', res.votes.is_useful ? window.usefuled_icon : window.useful_icon);
            $(_this3).closest('.review-item').find('.action-btn.down img').attr('src', res.votes.is_useless ? window.uselessed_icon : window.useless_icon);
        });
    });

    $('body').delegate('.action .fold', 'click', function () {
        var rid = $(this).closest('.review-item').find('.review-short').data('rid');
        fold(rid);
    });

    $('body').delegate('a.report', 'click', function () {
        var report_url = $(this).siblings('.review-content').data('url');
        var dlg = dui.Dialog({
            width: 442,
            cls: 'report-dialog'
        });
        var reportDlgTmpl = document.getElementById('template-report-popup').innerHTML;
        var report_commit_success_html = '<span class="up">举报已提交</span>';
        var help_url = 'http://help.douban.com/help/ask';
        var report_more_detail_html = '<span>为了便于工作人员进行受理，请您通过豆瓣帮助中心<br ><a target="_blank" href="' + help_url + '">' + help_url + '</a>详细描述举报内容</span>';
        var report_more_detail_title = '<h3>提交详细信息</h3>';
        dlg.body.one('click', '.btn-report', function () {
            var reason = $('#report_value input[type=radio]:checked').val();
            if (reason == 'other') {
                dlg.node.find('.hd').html(report_more_detail_title);
                dlg.node.find('.bd').html(report_more_detail_html);
                dlg.update();
                dlg.setTitle('提交详细信息');
                dlg.body.on('click', '.bd a', function () {
                    dlg.close();
                });
            } else {
                $.ajax({
                    url: '//www.douban.com/misc/audit_report',
                    type: 'POST',
                    data: {
                        url: report_url,
                        ck: get_cookie('ck'),
                        reason: reason
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function success() {
                        dlg.node.find('.hd').hide();
                        dlg.node.find('.bd').html(report_commit_success_html);
                        dlg.update();
                        setTimeout(function () {
                            dlg.close();
                            $('.report-dialog').remove();
                        }, 1000);
                    }
                });
            }
        });
        dlg.setContent(reportDlgTmpl);
        dlg.setTitle('选择举报原因');
        dlg.open();
        dlg.update();
    });
})();
        });

        window.useful_icon = "https://img3.doubanio.com/f/zerkalo/536fd337139250b5fb3cf9e79cb65c6193f8b20b/pics/up.png";
        window.usefuled_icon = "https://img3.doubanio.com/f/zerkalo/635290bb14771c97270037be21ad50514d57acc3/pics/up-full.png";
        window.useless_icon = "https://img3.doubanio.com/f/zerkalo/68849027911140623cf338c9845893c4566db851/pics/down.png";
        window.uselessed_icon = "https://img3.doubanio.com/f/zerkalo/23cee7343568ca814238f5ef18bf8aadbe959df2/pics/down-full.png";
    