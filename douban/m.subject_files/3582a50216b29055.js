
    ;(function () {
        window.setMeta = function (name, val) {
          var meta = document.querySelectorAll('meta[property="' + name + '"], meta[name="' + name + '"]')
          if (!meta.length) {
            meta = document.createElement('meta')
            meta.name = name
            document.head.appendChild(meta)
          }
         meta[0].content = val || ''
        }
        window.getMeta = function (name) {
          var meta = document.querySelectorAll('meta[property="' + name + '"], meta[name="' + name + '"]')
          if (!meta.length) {
            return ''
          } else {
            return meta[0].content
          }
        }
        !getMeta('weixin:chat_title') && setMeta('weixin:chat_title', document.title)
        !getMeta('weixin:timeline_title') && setMeta('weixin:timeline_title', document.title)
        !getMeta('weixin:description') && setMeta('weixin:description', getMeta('og:description'))
    })();
    ;
        function resizeIframe (frame_id, height, width) {
            var adIframe = document.getElementById(frame_id);
            if (adIframe) {
                var _height = height;
                var _width = width;

                try {
                    var adIframeBody = adIframe.contentDocument.body;
                    var _height = height || Math.max(adIframeBody.clientHeight, adIframeBody.scrollHeight);
                    var _width = width || Math.max(adIframeBody.clientWidth, adIframeBody.scrollWidth);
                } catch (e) {}

                var adIframeParentBox = $(adIframe).parents('div')[0];
                var hasIcon = !$(adIframeParentBox).hasClass('Advertisement');
                if (hasIcon) {
                    $(adIframeParentBox).width(_width).height(_height);
                }
                $(adIframe).css({
                  width: _width + 'px',
                  height: _height + 'px'
                })
                adIframe.height = _height;
                adIframe.width = _width;
            }
        };
    ;
    ;(window.DoubanAdSlots = window.DoubanAdSlots || []).push('dale_talion_subject_movie_top')
    window.DoubanAdLoaders = window.DoubanAdLoaders || {};
    window.adElements = window.adElements || [];
    window.adElements.push({'id': '', 'el': 'dale_talion_subject_movie_top'});
    window.addEventListener('load', function () {
        resizeIframe('dale_talion_subject_movie_top_frame')
    })
    window.addEventListener('message', function (e) {
        var payload = e.data.payload;
        if (payload && payload.height) {
            resizeIframe(payload.source, payload.height, payload.width);
        }
    })
    ;
    ;(window.DoubanAdSlots = window.DoubanAdSlots || []).push('dale_talion_subject_movie_center')
    window.DoubanAdLoaders = window.DoubanAdLoaders || {};
    window.adElements = window.adElements || [];
    window.adElements.push({'id': '', 'el': 'dale_talion_subject_movie_center'});
    window.addEventListener('load', function () {
        resizeIframe('dale_talion_subject_movie_center_frame')
    })
    window.addEventListener('message', function (e) {
        var payload = e.data.payload;
        if (payload && payload.height) {
            resizeIframe(payload.source, payload.height, payload.width);
        }
    })
    ;
    ;(function(){
      
  var _DEFAULT_COVER = "https://img3.doubanio.com/f/talion/edb4a934937733a0163b69e6cc3ad3f689c92d1c/pics/card/defaults/cover.png"
  var _DEFAULT_AVATAR = "https://img3.doubanio.com/f/talion/9c85529e7a0fbe585a2091edd8b9751a1db10ca9/pics/card/defaults/avatar.jpg"

      Date.now||(Date.now=function(){return(new Date).getTime()}),function(){"use strict";for(var e=["webkit","moz"],t=0;t<e.length&&!window.requestAnimationFrame;++t){var n=e[t];window.requestAnimationFrame=window[n+"RequestAnimationFrame"],window.cancelAnimationFrame=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var i=0;window.requestAnimationFrame=function(e){var t=Date.now(),n=Math.max(i+16,t);return setTimeout(function(){e(i=n)},n-t)},window.cancelAnimationFrame=clearTimeout}}(),function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e.Lazify=e.Lazify||t()}(window,function(){return function(e){function t(){return window.scrollY||window.pageYOffset}function n(){w=t(),i()}function i(){l||(requestAnimationFrame(function(){s()}),l=!0)}function r(e){return e.getBoundingClientRect().top+w}function o(e){const t=w,n=t+m,i=r(e),o=i+e.offsetHeight,a=h.threshold/100*m;return o>=t-a&&i<=n+a}function a(e,t){"IMG"===e.tagName.toUpperCase()?e.setAttribute("src",t):e.style.backgroundImage='url("'+t+'")'}function c(e){return e&&(e.match(/^http/)||e.match(/^\//))}function u(e){try{return new Event(e)}catch(n){var t=document.createEvent("Event");return t.initEvent(e,!0,!0),t}}function d(e){function t(){a(e,n),o.removeEventListener("load",t),e.addEventListener("load",function t(n){e.removeEventListener("load",t);var i=u("lazyload");i.originalEvent=n,e.dispatchEvent(i)})}var n=e.getAttribute(h.selector);if(c(n)){if(h.defaultPics){var i=e.getAttribute(h.typeAttr)||"cover",r=h.defaultPics[i];r&&a(e,r)}var o=document.createElement("img");o.addEventListener("load",t),o.addEventListener("error",function(){o.removeEventListener("load",t)}),o.src=n,e.removeAttribute(h.selector),f()}}function s(){return m=window.innerHeight,v.forEach(function(e){o(e)&&d(e)}),l=!1,this}function f(){return v=Array.prototype.slice.call(document.querySelectorAll("["+h.selector+"]")),this}e=e||{};var l,m,w=t(),v=[],h={selector:e.selector||"data-src",threshold:e.threshold||0,defaultPics:e.defaultPics,typeAttr:e.typeAttr||"data-type"};this.check=s,this.update=f;var A=document.querySelector(".page");A.addEventListener("scroll",n),["scroll","resize"].forEach(function(e){window.addEventListener(e,n)})}});
        var lazify = new Lazify({
          defaultPics: {
            avatar: _DEFAULT_AVATAR,
            cover: _DEFAULT_COVER,
          },
          threshold: 10,
        })
        $(function(){
            lazify.update().check()
        })
    })();
  ;
    ;(window.DoubanAdSlots = window.DoubanAdSlots || []).push('dale_talion_subject_movie_after_reviews')
    window.DoubanAdLoaders = window.DoubanAdLoaders || {};
    window.adElements = window.adElements || [];
    window.adElements.push({'id': '', 'el': 'dale_talion_subject_movie_after_reviews'});
    window.addEventListener('load', function () {
        resizeIframe('dale_talion_subject_movie_after_reviews_frame')
    })
    window.addEventListener('message', function (e) {
        var payload = e.data.payload;
        if (payload && payload.height) {
            resizeIframe(payload.source, payload.height, payload.width);
        }
    })
    ;
    "use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function stopEvent(e){e.stopPropagation(),e.preventDefault()}function ajax(e){e.data=e.data||{},e.withCk!==!1&&(e.data.ck=get_cookie("ck")),e.data.for_mobile=1,e.error=e.error||function(e){return dui.toast.warn(e)};var t=e.ajaxError||function(){return dui.toast.networkError()};e.ajaxError=function(e){e=e||new Error("无网络连接"),e.isAjaxError=!0,t(e)},$.ajax($.extend({type:e.type||e.method||"GET",url:e.url,data:e.data,dataType:e.dataType||"json",xhrFields:{withCredentials:!0},success:function(t){t.error?e.error?e.error(t.error,t.data,t):alert(t.error):e.success&&e.success(t)},error:function(t){if(console.error(t),0===t.status)e.ajaxError&&e.ajaxError();else{var r=$.parseJSON(t.response);1e3===r.code&&(r.localized_message="没有登录",tryLoginMSite()),e.error&&e.error(r.localized_message,r)}},complete:function(t,r){e.complete&&e.complete(t,r)}},e.extra))}function autoBind(e){for(var t={},r=function(t){return e[t]instanceof Function&&!t.match(/^component|^render$|^constructor$/)},n=[].concat(_toConsumableArray(Object.keys(e).filter(r))),o=e;o=Object.getPrototypeOf(o);){var a=Object.getOwnPropertyNames(o);if(a.indexOf("setState")>=0)break;n=n.concat(a.filter(r))}return n.forEach(function(r){t[r]=e[r],e[r]=e[r].bind(e)}),t}function flatten(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(e){return e.id},r={ids:null,entities:{}};return r.ids=e.map(function(e){var n=t(e);return r.entities[n]=e,n}),r}function getQuery(e,t){e&&(/^http/.test(e)||e.indexOf("?")!==-1)||(t=e,e=location.href);var r=e.indexOf("?"),n={};if(r<0)return void 0===t?n:"";for(var o=e.substring(r+1),a=o.split("&"),c=void 0,i=void 0,l=void 0,u=0,s=a.length;u<s;u++)if(c=a[u].indexOf("="),c!==-1&&(i=a[u].substring(0,c),l=a[u].substring(c+1),n[i]=decodeURIComponent(l),t===i))return n[i];return void 0===t?n:""}function appendQuery(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=/(#.*)$/;t=_extends({},getQuery(e),t);var n=e.match(r),o=n?n[1]:"";e=e.replace(r,"").replace(/\?.*$/,"");var a=Object.keys(t).filter(function(e){return null!=t[e]}).map(function(r){return e=e.replace(new RegExp(r+"=[^&]+&?","g"),""),r+"="+encodeURIComponent(t[r])}).join("&");return e+"?"+a+o}function tryLoginMSite(){try{location.hostname.indexOf("dae-pre")>=0&&get_cookie("ck")&&ajax({url:"https://m.douban.com/pwa/offline",dataType:"html",extra:{timeout:1e4,error:function(e){return console.error(e)}}})}catch(e){window.console&&console.warn&&console.warn(e)}}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},PropTypes=window.React&&React.PropTypes,REXXAR_API="https://m.douban.com/rexxar/api",DISPATCH_URL="https://www.douban.com/doubanapp/dispatch?from=mdouban&download=0&uri=",DOUBAN_URI_SCHEMA="douban://douban.com";ajax.all=function(e,t){var r=0,n={},o=function(o,a){return["success","error","ajaxError","complete"].reduce(function(c,i){return n[i]=[],c[i]=function(){for(var c,l=arguments.length,u=Array(l),s=0;s<l;s++)u[s]=arguments[s];n[i][a]=u,o[i]&&(c=o[i]).call.apply(c,[null].concat(u)),"complete"===i&&(r++,r===e.length&&Object.keys(t).forEach(function(e){var r;return(r=t[e]).call.apply(r,[null].concat(_toConsumableArray(n[e])))}))},c},{})};e.forEach(function(e,t){return ajax(_extends({},e,o(e,t)))})},document.referrer&&document.referrer.indexOf("https://accounts.douban.com/")>=0&&tryLoginMSite();var TopicSelections=function(e){function t(e){_classCallCheck(this,t);var r=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.state={topics:[]},r}return _inherits(t,e),_createClass(t,[{key:"componentDidMount",value:function(){var e=this;ajax({url:REXXAR_API+"/v2/gallery/topic_selections",type:"GET",success:function(t){e.setState({topics:t.items})},error:function(e){console.log(e)}})}},{key:"render",value:function(){var e=this.state.topics;return React.createElement("ul",null,e.map(function(e,t){return React.createElement("li",{key:t},React.createElement("a",{className:"gl-topic-item",href:e.uri},e.cover_url?React.createElement("div",{className:"gl-topic-cover",style:{backgroundImage:"url("+e.cover_url+")"}}):null,React.createElement("div",{className:"gl-topic-title"},e.title),React.createElement("div",{className:"gl-topic-info"},e.label?React.createElement("span",{className:"gl-topic-label"},e.label):"",React.createElement("span",{className:"gl-topic-subtitle"},e.subtitle))))}))}}]),t}(React.Component),$root=document.getElementById("TopicSelections");$root&&ReactDOM.render(React.createElement(TopicSelections,null),$root);
;
    ;(window.DoubanAdSlots = window.DoubanAdSlots || []).push('dale_talion_subject_movie_bottom')
    window.DoubanAdLoaders = window.DoubanAdLoaders || {};
    window.adElements = window.adElements || [];
    window.adElements.push({'id': '', 'el': 'dale_talion_subject_movie_bottom'});
    window.addEventListener('load', function () {
        resizeIframe('dale_talion_subject_movie_bottom_frame')
    })
    window.addEventListener('message', function (e) {
        var payload = e.data.payload;
        if (payload && payload.height) {
            resizeIframe(payload.source, payload.height, payload.width);
        }
    })
    ;
    ;(window.DoubanAdSlots = window.DoubanAdSlots || []).push('dale_tailon_movie_bottom_floating_inner')
    window.DoubanAdLoaders = window.DoubanAdLoaders || {};
    window.adElements = window.adElements || [];
    window.adElements.push({'id': '', 'el': 'dale_tailon_movie_bottom_floating_inner'});
    window.addEventListener('load', function () {
        resizeIframe('dale_tailon_movie_bottom_floating_inner_frame')
    })
    window.addEventListener('message', function (e) {
        var payload = e.data.payload;
        if (payload && payload.height) {
            resizeIframe(payload.source, payload.height, payload.width);
        }
    })
    ;
      "use strict";$(function(){var o=$(".bottom_ad_download");o.on("click",".close",function(t){t.preventDefault(),o.removeClass("show")})});
    ;
        ;(function() {
            function getBtn() {
                return document.querySelector('.open-in-app-float')
            }
            var $btn = getBtn()
            var winHeight = window.innerHeight
            // Fix wechat browser issue in some iOS device
            var visible = false
            var $page = document.querySelector('.page')
            var bottomBarHeight = null
            var bottom = 50
            // detect iPhoneX https://github.com/Wscats/iPhone-X
            if (/iPhone/i.test(navigator.userAgent) && (window.screen.width * window.devicePixelRatio) === 1125) {
                bottom = 100
            }
            function onScroll(e) {
                const scrollY = window.scrollY || $page.scrollTop
                if (!visible && scrollY > winHeight) {
                    visible = true
                    if (bottomBarHeight === null) {
                        var $bar = document.querySelector('.comment-button') || document.querySelector('.open-in-app-fixed-bottom')
                        if ($bar) {
                            bottomBarHeight = 50
                        } else {
                            bottomBarHeight = 0
                        }
                    }
                    getBtn().style.bottom = (bottom + bottomBarHeight) + 'px'
                } else if (visible && scrollY < winHeight) {
                    visible = false
                    getBtn().style.bottom = '-50px'
                }
            }
            window.addEventListener('scroll', onScroll)
            $page.addEventListener('scroll', onScroll)

        }());
    ;
      ;(function(){
          ;(function(doc, $) {
  var curUrl = document.location.href,
    CK = get_cookie('ck'),
    STATUS = {
      'wish': 'F',
      'do': 'N',
      'collect': 'P'
    },
    ISSCROLL = 'is-scrolling-disabled',
    HIDE = 'hide',
    DISABLE = 'disable',
    ERR = 'error',
    $html = $('html'),
    $dialog = $('div.douban-dialog'),
    $tagComment = $('section.subject-mark'),
    $inputTag = $('#input-tag'),
    id = $tagComment.attr('data-id'),
    type = $tagComment.attr('data-type'),
    isBlur = true;
    type = type == 'tv' ? 'movie': type;

  function bindEvent() {
    $tagComment.on('click', 'a.update-btn', function(e) {
      e.preventDefault();
      var $self = $(this);
      getDialog($self.attr('data-status'));
    }).on('click', 'a.delete-btn', function(e) {
      e.preventDefault();
      if(confirm('确信删除吗？')){
        ajaxFn('/j/interest/remove_interest', {ck: CK, subjectId: id, type: type}, function(data) {
          data = $.parseJSON(data);
          $tagComment.html(data.html);
        });
      }
    }).on('click', 'div.mark-item a', function() {
    // 是否想看、看过
      var $self = $(this),
        user = $('#user').val();
      if($self.hasClass(DISABLE)) {
        return;
      }
      if (user) {
        var mark = $self.attr('name').split('-')[2];
        getDialog(mark);
      }else {
        location.href = 'https://accounts.douban.com/login?redir=' + curUrl;
      }
    });

    // 对当前影视添加评论
    $dialog.on('click', 'a.btn-ok', function(e) {
      e.preventDefault();
      var $self = $(this),
        tags = [];
      if($self.hasClass(DISABLE)) {
        return;
      }
      $self.addClass(DISABLE);

      var comment = $('textarea', $dialog).val(),
        star = $('div.star span.rating-star-max-full', $dialog).length,
        url = null,
        data = {},
        status = STATUS[$self.attr('data-status')],
        shareWeibo = $('input[name=sina]', $dialog).is(':checked') ? 'sina' : '',
        shareDouban = $('input[name=douban]', $dialog).is(':checked') ? 'douban' : '';
        // 判断如果短评超出则不提交
      if($dialog.hasClass(ERR) || $('.remark', $dialog).hasClass(ERR)) {
        $self.removeClass(DISABLE);
        return;
      }

      tags = getElVal($('div.remark a.selected'));

      data = {
        ck: CK,
        subjectId: id,
        type: type,
        interest: status,
        foldcollect: 'F',
        tags: tags,
        comment: comment, 
        'share-shuo': shareDouban
      };
      if(shareWeibo) {
        data = $.extend({}, data, {'share-sina': shareWeibo});
      }
      if(status != 'F') {
        data = $.extend({}, data, {rating: star});
      }

      // url = type + id + (mark == 'collect' ? '/done' : (mark == 'do' ? '/doing' : '/mark'));
      url = '/j/interest/interest';
      ajaxFn(url, data, function(data) {
        $dialog.addClass(HIDE);
        // $mask.addClass(HIDE)
        // location.href = curUrl;
        // 显示短评结果
        data = $.parseJSON(data);
        $tagComment.html(data.html);

        $self.removeClass(DISABLE);
        $html.removeClass(ISSCROLL);
      },function(){
        $self.removeClass(DISABLE);
      });

    // 取消评论
    }).on('click', 'a.btn-cancel', function() {
      $dialog.addClass(HIDE);
      $html.removeClass(ISSCROLL);
    // 对当前影视打标签
    }).on('click', 'div.remark a', function() {
      var $self = $(this);
       //添加标签 
      if($self.hasClass('add-tag')) {
        $("#input-tag").removeClass(HIDE).focus();
      }else {
        $self.toggleClass('selected');
      }
        
    // 对当前影视评星
    }).on('touchend', 'div.star span', function(e) {
      e.preventDefault();
      var $self = $(this),
        rating = $self.index(),
        curClass = 'rating-star-max-full';

      for(var i=0; i<5; i++){
        if (i <= rating) {
          curClass = 'rating-star-max-full';
        }else {
          curClass = 'rating-star-max-gray';
        }
        $('div.star span', $dialog).eq(i).attr('class', '').addClass(curClass);
      }
    // 文本框字数限制
    }).on('keyup paste', 'div.douban-dialog textarea', function() {
      var $self = $(this),
        text = $.trim($self.val()),
        strLen = 0,
        textNum = '',
        maxLen = 140,
        curLen = 0,
        $maxLen = $('span.max-length', $dialog);
        for(var i=0;i<text.length;i++){
          if(text.charCodeAt(i)<27||text.charCodeAt(i)>126){ //中文和中文字符
            strLen+=2;
          }
          else{
            strLen ++;
          }
        }
        curLen = Math.ceil(strLen/2);
      if(curLen <= maxLen) {
        $maxLen.removeClass(ERR);
        $dialog.removeClass(ERR);
        textNum = '';
      }else {
        $maxLen.addClass(ERR);
        $dialog.addClass(ERR);
        $('a.btn-ok', $dialog).addClass(DISABLE);
        textNum = '-';
      }
      $maxLen.text(textNum + Math.ceil(maxLen-curLen));
    }).on('keyup', '#input-tag', function(e) {
      var $self = $(this),
        val = $self.val(),
        iCount = 0;
      if(e.keyCode == '13') {
        isBlur = false;
        checkTag($self);
        return;
      }else{
        isBlur = true;
      }
      if(val) {
        iCount = $self.val().replace(/[^\u0000-\u00ff]/g,"aa");
        $self.attr('size',iCount.length+2);
      }
    }).on('blur', '#input-tag', function() {
      var $self = $(this);
      if(isBlur) {
        checkTag($self);
      }
      
      return;
    }).on('focus', '#input-tag', function() {
      $(this).parent().removeClass(ERR);
    });
  }

  function ajaxFn(url, data, callback, errback) {
    var data = $.extend({},data, {ck: CK});
    $.post(url, data, function(ret) {
        callback(ret);
    }, function() {
         errback();
    });
  }

  function getDialog(status) {
    ajaxFn('/j/interest/get_dialog', {ck: CK, subjectId: id, type: type}, function(data) {
      data = $.parseJSON(data);
      $('.bd', $dialog).html(data.html);

      $dialog.removeClass(HIDE).find('a.btn-ok').attr('data-status', status);
      $html.addClass(ISSCROLL);

      // 判断点的那个按钮（想看、在看、看过）
      if(status != 'wish') {
        $('div.star', $dialog).removeClass(HIDE);
      }
    });
  }
  // get all elements value
  function getElVal($elements) {
    var results = [];
    for(var i=0, len=$elements.length; i<len; i++){
      results.push($elements.eq(i).text());
    }
    return results.join(',');
  }

  function checkTag($el) {
    // 标签长度为12，必须为汉字、字符、数字
    var tagVal = $el.val(),
      $parent = $el.parent(),
      iCount = 0;

    $('.error', $parent).text('');
    $parent.addClass(ERR);
    $('a.btn-ok', $dialog).addClass(DISABLE);

    if(!tagVal) {
      $el.val('').addClass(HIDE);
      return;
    }
    iCount = tagVal.replace(/[^\u0000-\u00ff]/g,"aa");
    if(iCount.length > 24){
      alert('标签最长24个字符');
      return;
    }else if(tagVal && !/^[a-zA-Z|\d|\u0391-\uFFE5]*$/.test(tagVal)) {
      alert('标签必须为汉字、字符或数字');
      return;
    }
    for(var i=0,len=$('.remark a').length; i<len; i++) {
      if(tagVal == $('.remark a').eq(i).text()) {
        alert('已存在这个tag了');
        return;
      }
    }
    $parent.removeClass(ERR);
    $('a.btn-ok', $dialog).removeClass(DISABLE);
    $el.before('<a href="javascript:;" class="selected">' + tagVal + '</a>');
    $el.val('').addClass(HIDE);
  }

  bindEvent();

})(document, Zepto);

          "use strict";function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function stopEvent(e){e.stopPropagation(),e.preventDefault()}function ajax(e){e.data=e.data||{},e.withCk!==!1&&(e.data.ck=get_cookie("ck")),e.data.for_mobile=1,e.error=e.error||function(e){return dui.toast.warn(e)};var t=e.ajaxError||function(){return dui.toast.networkError()};e.ajaxError=function(e){e=e||new Error("无网络连接"),e.isAjaxError=!0,t(e)},$.ajax($.extend({type:e.type||e.method||"GET",url:e.url,data:e.data,dataType:e.dataType||"json",xhrFields:{withCredentials:!0},success:function(t){t.error?e.error?e.error(t.error,t.data,t):alert(t.error):e.success&&e.success(t)},error:function(t){if(console.error(t),0===t.status)e.ajaxError&&e.ajaxError();else{var n=$.parseJSON(t.response);1e3===n.code&&(n.localized_message="没有登录",tryLoginMSite()),e.error&&e.error(n.localized_message,n)}},complete:function(t,n){e.complete&&e.complete(t,n)}},e.extra))}function autoBind(e){for(var t={},n=function(t){return e[t]instanceof Function&&!t.match(/^component|^render$|^constructor$/)},r=[].concat(_toConsumableArray(Object.keys(e).filter(n))),o=e;o=Object.getPrototypeOf(o);){var a=Object.getOwnPropertyNames(o);if(a.indexOf("setState")>=0)break;r=r.concat(a.filter(n))}return r.forEach(function(n){t[n]=e[n],e[n]=e[n].bind(e)}),t}function flatten(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(e){return e.id},n={ids:null,entities:{}};return n.ids=e.map(function(e){var r=t(e);return n.entities[r]=e,r}),n}function getQuery(e,t){e&&(/^http/.test(e)||e.indexOf("?")!==-1)||(t=e,e=location.href);var n=e.indexOf("?"),r={};if(n<0)return void 0===t?r:"";for(var o=e.substring(n+1),a=o.split("&"),i=void 0,s=void 0,c=void 0,l=0,u=a.length;l<u;l++)if(i=a[l].indexOf("="),i!==-1&&(s=a[l].substring(0,i),c=a[l].substring(i+1),r[s]=decodeURIComponent(c),t===s))return r[s];return void 0===t?r:""}function appendQuery(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=/(#.*)$/;t=_extends({},getQuery(e),t);var r=e.match(n),o=r?r[1]:"";e=e.replace(n,"").replace(/\?.*$/,"");var a=Object.keys(t).filter(function(e){return null!=t[e]}).map(function(n){return e=e.replace(new RegExp(n+"=[^&]+&?","g"),""),n+"="+encodeURIComponent(t[n])}).join("&");return e+"?"+a+o}function tryLoginMSite(){try{location.hostname.indexOf("dae-pre")>=0&&get_cookie("ck")&&ajax({url:"https://m.douban.com/pwa/offline",dataType:"html",extra:{timeout:1e4,error:function(e){return console.error(e)}}})}catch(e){window.console&&console.warn&&console.warn(e)}}function makeRootDom(e,t){t={containerId:t&&t.containerId||null,containerClass:t&&t.containerClass||null};var n=0,r=function(r){function o(e){_classCallCheck(this,o);var t=_possibleConstructorReturn(this,(o.__proto__||Object.getPrototypeOf(o)).call(this,e));return t._renderSubtree=t._renderSubtree.bind(t),t._copyMethods=t._copyMethods.bind(t),t}return _inherits(o,r),_createClass(o,[{key:"componentWillMount",value:function(){n++,this.container=document.createElement("div"),t.containerId&&(this.container.id=t.containerId+"_"+n),t.containerClass&&(this.container.className=t.containerClass),document.body.appendChild(this.container),this._renderSubtree(this.props,this._copyMethods,!1)}},{key:"_renderSubtree",value:function(t,n){function r(){a.container&&ReactDOM.unstable_renderSubtreeIntoContainer(a,React.createElement(e,t,t.children),a.container,function(){this&&this!==window&&(a.instance=this),n&&n.call(this)})}var o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],a=this;o?setTimeout(r):r()}},{key:"_copyMethods",value:function(){var t=this,n=this.instance;n&&[].concat(_toConsumableArray(Object.getOwnPropertyNames(e.prototype)),_toConsumableArray(Object.keys(n))).forEach(function(e){if(n[e]instanceof Function&&!(e in t)&&!e.match(/^component/)&&!e.match(/^_/)){var r=n[e];t[e]=function(){var e=arguments;this._renderSubtree(this.props,function(){r.apply(n,[].slice.call(e))})}}})}},{key:"componentWillReceiveProps",value:function(e){this._renderSubtree(e)}},{key:"render",value:function(){return null}},{key:"componentWillUnmount",value:function(){this._clearContainer()}},{key:"_clearContainer",value:function(){ReactDOM.unmountComponentAtNode(this.container),document.body.removeChild(this.container),this.instance=null,this.container=null}}]),o}(React.Component),o=e.displayName||e.name||"Component";return r.displayName="RootDomWrapper("+o+")",r}var _slicedToArray=function(){function e(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(r=(i=s.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{!r&&s.return&&s.return()}finally{if(o)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},PropTypes=window.React&&React.PropTypes,REXXAR_API="https://m.douban.com/rexxar/api",DISPATCH_URL="https://www.douban.com/doubanapp/dispatch?from=mdouban&download=0&uri=",DOUBAN_URI_SCHEMA="douban://douban.com";ajax.all=function(e,t){var n=0,r={},o=function(o,a){return["success","error","ajaxError","complete"].reduce(function(i,s){return r[s]=[],i[s]=function(){for(var i,c=arguments.length,l=Array(c),u=0;u<c;u++)l[u]=arguments[u];r[s][a]=l,o[s]&&(i=o[s]).call.apply(i,[null].concat(l)),"complete"===s&&(n++,n===e.length&&Object.keys(t).forEach(function(e){var n;return(n=t[e]).call.apply(n,[null].concat(_toConsumableArray(r[e])))}))},i},{})};e.forEach(function(e,t){return ajax(_extends({},e,o(e,t)))})},document.referrer&&document.referrer.indexOf("https://accounts.douban.com/")>=0&&tryLoginMSite();var DateUtil={format:function(e,t){var n={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length)));for(var r in n)new RegExp("("+r+")").test(t)&&(t=t.replace(RegExp.$1,1===RegExp.$1.length?n[r]:("00"+n[r]).substr((""+n[r]).length)));return t},parse:function(e,t){var n={"y+":0,"M+":1,"d+":2,"h+":3,"m+":4,"s+":5},r=Array.apply(null,Array(6)).map(function(){return 0}),o=0;for(var a in n){var i=new RegExp("("+a+")"),s=t.match(i);if(s){var c=s.index+o,l=c+s[1].length,u=e.substring(c,l),p=parseInt(u,10);if(1===s[1].length){var d=void 0;switch(a){case"M+":d=12;break;case"d+":d=31;break;case"h+":case"m+":case"s+":d=60}if(d){u=e.substring(c,l+1);var m=parseInt(u,10);m<=d&&m>=10&&(o++,p=m)}}isNaN(p)&&(p=0,console.error(new Error("DateUtil.parse error: parse('"+e+", "+t+"') "+u+" is not integer!"))),"y+"===a&&p<100?p+=100*parseInt((new Date).getFullYear()/100,10):"M+"===a&&(p-=1),r[n[a]]=p}}return new(Function.prototype.bind.apply(Date,[null].concat(_toConsumableArray(r))))},_agoType:function(){var e=6e4,t=60*e,n=24*t,r=7*n,o=30*n,a=365*n;return{seconds:{label:"秒前",ms:1},minute:{label:"分钟前",ms:e},hour:{label:"小时前",ms:t},day:{label:"天前",ms:n},week:{label:"周前",ms:r},month:{label:"个月前",ms:o},year:{label:"年前",ms:a}}}(),getAgo:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.maxDays,r=void 0===n?30:n,o=t.fallbackFormat,a=void 0===o?"yyyy-MM-dd hh:mm:ss":o,i=t.types,s=void 0===i?["year","month","week","day","hour","minute"]:i;"string"==typeof e&&(e=Date.parse(e.replace(/-/g,"/"))),e instanceof Date&&(e=e.getTime());var c=(new Date).getTime(),l=c-e;if(!(l<0)){var u=(l/DateUtil._agoType.day.ms|0)<=r,p=void 0;return u&&s.some(function(e){var t=DateUtil._agoType[e],n=l/t.ms|0;return n>0&&(p=n+t.label,!0)}),!p&&a&&(p=DateUtil.format(new Date(e),a)),p}}},IconBtn=function(e){var t=["ic-btn","ic-btn-"+e.name,e.active?"active":"",e.left?"left":"",e.right?"right":""].join(" ");return React.createElement("div",{className:t,onClick:e.onClick},null!==e.text?React.createElement("span",{className:"text"},e.text):null,e.children)};IconBtn.propTypes={name:PropTypes.string.isRequired,active:PropTypes.bool,left:PropTypes.bool,right:PropTypes.bool,onClick:PropTypes.func,children:PropTypes.node,text:PropTypes.oneOfType([PropTypes.string,PropTypes.number])},IconBtn.defaultProps={text:null};var popBoundType=PropTypes.shape({x:PropTypes.number,y:PropTypes.number,width:PropTypes.number,height:PropTypes.number}),defaultBound={x:0,y:0,width:window.innerWidth,height:window.innerHeight-53},PopMenuItem=function(e){return React.createElement("div",{onClick:e.onClick,className:"item"},e.text)};PopMenuItem.propTypes={onChange:PropTypes.func,onClick:PropTypes.func,defaultValue:PropTypes.string},PopMenuItem.defaultProps={defaultValue:""};var PopMenu=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return _inherits(t,e),_createClass(t,[{key:"componentDidUpdate",value:function(e,t){this.updateWidth(),this.props.triggerPos!==e.triggerPos&&this.updatePosition(this.props.triggerPos)}},{key:"render",value:function(){var e=["pop-menu-wrapper",this.props.show?"show":""].join(" ");return React.createElement("div",{className:e,onClick:this.props.onRequestHide,onTouchMove:this.props.onRequestHide},React.createElement("div",{className:"pop-menu",ref:"popMenuDiv",onClick:stopEvent},this.props.children))}},{key:"updatePosition",value:function(e){var t=ReactDOM.findDOMNode(this.refs.popMenuDiv),n=this.props.bound,r=n.x,o=n.y,a=n.width,i=n.height,s=t.offsetWidth,c=t.offsetHeight,l={x:0,y:0};l.x=Math.max(r,e.x+10),l.x=Math.min(l.x,a-s-10),l.y=Math.max(o,e.y-c-20),l.y=Math.min(l.y,i-c-10),t.style.left=l.x+"px",t.style.top=l.y+"px"}},{key:"updateWidth",value:function(){var e=ReactDOM.findDOMNode(this.refs.popMenuDiv),t=[].slice.call(e.children).reduce(function(e,t){return e+t.clientWidth},0);e.style.width=t+2+"px"}}]),t}(React.Component);PopMenu.propTypes={children:PropTypes.node,bound:popBoundType,onRequestHide:PropTypes.func,show:PropTypes.bool,triggerPos:PropTypes.shape({x:PropTypes.number.isRequired,y:PropTypes.number.isRequired})},PopMenu.defaultProps={bound:defaultBound,show:!1},PopMenu=makeRootDom(PopMenu,{containerId:"pop-menu"}),function(e,t,n){var r={DEL_PIC_CUSTOM:"DEL_PIC_CUSTOM",DEL_PIC_DETAULT_SUCCESS:"DEL_PIC_DETAULT_SUCCESS",DEL_PIC_DETAULT_ERROR:"DEL_PIC_DETAULT_ERROR",DEL_PIC_DETAULT_COMPLETE:"DEL_PIC_DETAULT_COMPLETE",REPORT_CUSTOM:"REPORT_CUSTOM",REPORT_DEFAULT_SUCCESS:"REPORT_DEFAULT_SUCCESS",REPORT_DEFAULT_ERROR:"REPORT_DEFAULT_ERROR",REPORT_DEFAULT_COMPLETE:"REPORT_DEFAULT_COMPLETE",DEL_COMMENT_CUSTOM:"DEL_COMMENT_CUSTOM",DEL_COMMENT_DEFAULT_SUCCESS:"DEL_COMMENT_DEFAULT_SUCCESS",DEL_COMMENT_DEFAULT_ERROR:"DEL_COMMENT_DEFAULT_ERROR",DEL_COMMENT_DEFAULT_COMPLETE:"DEL_COMMENT_DEFAULT_COMPLETE"},o=e.createClass({displayName:"ReportMenu",componentDidMount:function(){var e=t.findDOMNode(this).parentElement;n(e).on("click",function(t){"DIV"===t.target.nodeName&&this.remove(e)}.bind(this))},remove:function(e){e=e||t.findDOMNode(this).parentElement,t.unmountComponentAtNode(e),n(e).off().remove()},handleClick:function(e){var t=this.props.container;n.ajax({url:"/j/report",type:"post",dataType:"json",data:{reason:e,url:t.data("report-url"),ck:get_cookie("ck")},success:function(e){0===e.r?dui&&dui.toast.success("举报成功"):dui&&dui.toast.error("举报失败"),MenuRender.trigger(r.REPORT_DEFAULT_SUCCESS,e)},error:function(e,t,n){dui&&dui.toast.error("举报失败"),MenuRender.trigger(r.REPORT_DEFAULT_ERROR,[e,t,n])},complete:function(e,t){this.remove(),MenuRender.trigger(r.REPORT_DEFAULT_COMPLETE,t)}.bind(this)})},render:function(){return e.createElement("ul",null,e.createElement("li",{onClick:this.handleClick.bind(this,0)},"广告等垃圾信息"),e.createElement("li",{onClick:this.handleClick.bind(this,1)},"色情或低俗内容"),e.createElement("li",{onClick:this.handleClick.bind(this,2)},"激进时政或意识形态话题"),e.createElement("li",{onClick:this.handleClick.bind(this,3)},"其他原因"))}}),a=e.createClass({displayName:"MenuItem",report:function(r){n("body").append('<div id="report-box"></div>'),t.render(e.createElement(o,{container:r}),n("#report-box")[0])},del:function(e){n.ajax({url:"/j/remove_comment/",type:"post",dataType:"json",data:{tid:e.data("tid"),cid:e.data("cid"),ck:get_cookie("ck")},success:function(n){0===n.r?dui&&dui.toast.success("删除成功"):dui&&dui.toast.error("删除失败"),t.unmountComponentAtNode(e[0]),MenuRender.trigger(r.DEL_COMMENT_DEFAULT_SUCCESS,[n,e])},error:function(e,t,n){dui&&dui.toast.error("删除失败"),MenuRender.trigger(r.DEL_COMMENT_DEFAULT_ERROR,[e,t,n])},complete:function(e,t){MenuRender.trigger(r.DEL_COMMENT_DEFAULT_COMPLETE,t)}})},del_pic:function(e){n.ajax({url:"https://m.douban.com/rexxar/api/v2/photo/"+e.data("tid")+"/delete",type:"POST",dataType:"json",data:{ck:get_cookie("ck")},xhrFields:{withCredentials:!0},success:function(){MenuRender.trigger(r.DEL_PIC_DETAULT_SUCCESS,e),dui&&dui.toast.success("删除成功")},error:function(t,n,o){MenuRender.trigger(r.DEL_PIC_DETAULT_ERROR,e),dui&&dui.toast.error("删除失败")},complete:function(){MenuRender.trigger(r.DEL_PIC_DETAULT_COMPLETE,e)}})},handleClick:function(e,t){if(!t.data("islogin"))return void dui.LoginUtil.checkLogin();switch(e){case"report":t.data("report-default")===!1?MenuRender.trigger(r.REPORT_CUSTOM,t):this.report(t);break;case"delete":t.data("delete-default")===!1?MenuRender.trigger(r.DEL_COMMENT_CUSTOM,t):this.del(t);break;case"delete_pic":t.data("delete-pic-default")===!1?MenuRender.trigger(r.DEL_PIC_CUSTOM,t):this.del_pic(t)}},render:function(){var t=this.handleClick.bind(this,this.props.action,this.props.container);return e.createElement("li",{className:"more-menu-item",onClick:t},this.props.text)}}),i=e.createClass({displayName:"MainMenu",render:function(){var t=this.props.container,n=t.data("can-report"),r=t.data("can-delete"),o=t.data("can-delete-pic");return e.createElement("ul",{className:"more-menu"},o?e.createElement(a,{text:"删除图片",action:"delete_pic",container:t}):null,r?e.createElement(a,{text:"删除",action:"delete",container:t}):null,n?e.createElement(a,{text:"举报",action:"report",container:t}):null)}});window.MenuRender=function(r){return n(r).each(function(){t.render(e.createElement(i,{container:n(this)}),this)}),MenuRender},MenuRender.eventCenter={},MenuRender.on=function(e,t){return Array.isArray(e)||(e=[e]),e.forEach(function(e){MenuRender.eventCenter[e]=MenuRender.eventCenter[e]||[],MenuRender.eventCenter[e].push(t)}),MenuRender},MenuRender.trigger=function(e,t){var n=MenuRender.eventCenter[e];if(n)return MenuRender.eventCenter[e].forEach(function(e){e[Array.isArray(t)?"apply":"call"](null,t)}),MenuRender},MenuRender.EVENT_TYPE=r,MenuRender.version="0.2"}(React,ReactDOM,Zepto);var Dialog=function(e){var t=e.children,n=e.top,r=e.show,o=e.onRequestHide,a=e.moreClass,i=e.className,s=void 0===i?a:i,c=(e.moreWrapperClass,e.stopScroll),l=e.transparent,u={top:"number"==typeof n?n+"px":n},p=["dialog-container",r?"show":"",l?"transparent":"",s].join(" ");return React.createElement("div",{className:p,onClick:function(e){e.target.className.indexOf("dialog-overlay")>=0&&o&&o()}},React.createElement("div",{className:"dialog-overlay",onTouchMove:c?stopEvent:null}),React.createElement("div",{style:u,className:"dialog-wrapper"},React.createElement("div",{className:"dialog"},t)))};Dialog.propTypes={children:PropTypes.node,top:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),show:PropTypes.bool,onRequestHide:PropTypes.func,moreClass:PropTypes.string,className:PropTypes.string,stopScroll:PropTypes.bool,transparent:PropTypes.bool},Dialog.defaultProps={show:!1,moreClass:"",stopScroll:!0,transparent:!1},Dialog=makeRootDom(Dialog,{containerId:"dialog"});var ReportDialog=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return _inherits(t,e),_createClass(t,[{key:"handleItemClick",value:function(e){var t=this;ajax({type:"POST",url:this.props.reportUrl,data:this.props.reportData(e,this.props),success:function(e){dui.toast.success("举报成功"),t.onSuccess&&t.onSuccess(e),t.props.onRequestHide&&t.props.onRequestHide()},error:function(e){e=e||"举报失败",dui.toast.warn(e),t.onError&&t.onError(e)}})}},{key:"render",value:function(){var e=this,t=this.props,n=t.show,r=t.onRequestHide,o=t.reasonList;return React.createElement(Dialog,{show:n,onRequestHide:r,moreClass:"report-dialog"},o.map(function(t){return React.createElement("div",{key:t.value,className:"reason-item",onClick:e.handleItemClick.bind(e,t.value)},t.label)}))}}]),t}(React.Component);ReportDialog.propTypes={show:PropTypes.bool,url:PropTypes.string,reportData:PropTypes.func,reportUrl:PropTypes.string,reasonList:PropTypes.arrayOf(PropTypes.shape({value:PropTypes.string.isRequired,label:PropTypes.string.isRequired})),onRequestHide:PropTypes.func,onSuccess:PropTypes.func,onError:PropTypes.func,onAjaxError:PropTypes.func},ReportDialog.defaultProps={show:!1,url:"",reportData:function(e,t){return{reason:e,url:t.url}},reportUrl:"/j/report",reasonList:[{value:"0",label:"广告或垃圾信息"},{value:"1",label:"色情或低俗内容"},{value:"2",label:"激进时政或意识形态话题"},{value:"3",label:"其他原因"}]},function(){function e(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.className,n=void 0===t?"":t,r=e.style,o=void 0===r?"":r,a=e.color,i=void 0===a?"#42BD56":a;return'\n  <svg width="13px" height="17px" class="'+n+'" style="'+o+'" viewBox="0 0 25 34" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n          <g id="吸底按钮（查看影评）" transform="translate(-185.000000, -1269.000000)" stroke="'+i+'" stroke-width="2">\n              <g id="Group-2" transform="translate(186.000000, 1266.000000)">\n                  <path d="M-1.77635684e-15,24.995212 C-1.77635684e-15,30.3710132 4.88378906,34.5263672 9.07641602,35 C7.89538574,32.045166 9.29394531,28.5505371 11.3920645,26.869049 C13.7368164,28.8355713 14.8319092,31.9631348 13.6361084,35 C18.7408447,34.3273926 22.784129,29.4827361 22.784129,23.8055105 C22.784129,18.6281924 20.1739358,13.7479461 15.249743,10.7129177 C16.4201963,13.9706955 14.8638233,16.94718 13.3500892,17.9725671 C13.4398152,13.8007225 11.9260811,7.61085781 7.12004032,5 C7.89187981,13.986474 -1.77635684e-15,17.0799373 -1.77635684e-15,24.995212 Z" id="Fill-1"></path>\n              </g>\n          </g>\n      </g>\n  </svg>'}function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.className,n=void 0===t?"":t,r=e.style,o=void 0===r?"":r,a=e.color,i=void 0===a?"#42BD56":a;return'\n  <svg class="'+n+'" style="'+o+'" width="19px" height="15px" viewBox="0 0 38 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n          <g id="吸底按钮（日记回应、小组回应、影评回应））" transform="translate(-178.000000, -1183.000000)" stroke="'+i+'" stroke-width="2">\n              <g id="Group" transform="translate(178.000000, 1176.000000)">\n                  <g id="Group-24" transform="translate(0.000000, 7.000000)">\n                      <path d="M16.7700913,20.2581588 L27.249849,11.0079963 L27.249849,5.22657899 C27.249849,2.89607791 25.3582028,1 23.0309625,1 L8.13287555,1 C5.80407889,1 3.91398905,2.89191497 3.91398905,5.22499682 L3.91398905,17.2839062 L3.851937,17.4517425 L1.6793174,23.3277246 C1.56220701,23.6624334 1.57131814,23.7810996 1.52298344,23.7348835 C1.47350666,23.6875755 1.58894654,23.6910894 1.89907115,23.5657376 L9.73536752,20.2581589 L16.7700913,20.2581588 Z" id="Rectangle-11"></path>\n                      <path d="M19.2028041,23.5207129 L19.2028041,14.482435 C19.2028041,12.8206394 20.5391031,11.4744572 22.1986296,11.475661 L33.9857706,11.4842111 C35.6403193,11.4854112 36.9815961,12.8282583 36.9815961,14.4802809 L36.9815961,23.4648535 C36.9815961,25.118337 35.6378461,26.4587503 33.990253,26.4587503 L24.084184,26.4587505 L17.672076,29.3142765 C17.167891,29.538807 16.9232966,29.3043906 17.1250053,28.7926055 L19.2028041,23.5207129 Z" id="Rectangle-11" fill="#FFFFFF" transform="translate(27.017953, 20.437597) scale(-1, 1) translate(-27.017953, -20.437597) "></path>\n                  </g>\n              </g>\n          </g>\n      </g>\n  </svg>\n  '}function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"douban://douban.com/",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.from,r=void 0===n?"mdouban":n,o=t.source,a=void 0===o?"":o,i=t.promo_type,s=void 0===i?"":i,c=t.promo_copy_no,l=void 0===c?"1":c,u=t.is_download_url,p=void 0!==u&&u,d=t.direct_dl,m=void 0===d?"1":d,h=t.returnUrl,f=void 0!==h&&h,v=t.fallback,y=void 0===v?"":v,g=t.android_dispatch,_=void 0!==g&&g,E=void 0;if(p)E="https://www.douban.com/doubanapp/app?from="+r+"&page="+s+"&model=B&copy="+l+"&channel="+a+"&direct_dl="+m;else{var R=navigator.userAgent.toLowerCase(),C=/(iphone|ipad|ipod|ios)/i.test(R),b=R.match(/(android);?[\s\/]+([\d.]+)?/),T=function(){var e=R.match(/os ([0-9]+)_/);return e?+e[1]:0};e.match(/^douban:\/\//)||(e="douban://douban.com"+e),E="https://www.douban.com/doubanapp/card/get_app?client_uri="+encodeURIComponent(e)+"&from="+r+"&page="+s+"&model=B&copy="+l+"&channel="+a+"&fallback="+encodeURIComponent(y);var M=e.replace("douban://douban.com","")||"/";if("/"===M&&(M="/recommend_feed"),b&&_){var w="https://www.douban.com/doubanapp/dispatch?uri="+encodeURIComponent(M)+"&fallback="+encodeURIComponent(y),P="douban://douban.com/webview?url="+encodeURIComponent(w);E="https://www.douban.com/doubanapp/card/get_app?client_uri="+encodeURIComponent(P)}else C&&T()>=9&&(E=""+DISPATCH_URL.replace("download=0","download=1").replace(/from=\w+/,"")+encodeURIComponent(M)+"&from="+r+"&page="+s+"&model=B&copy="+l+"&channel="+a+"&fallback="+encodeURIComponent(y))}return f?E:void(location.href=E)}function r(e){var t=void 0;for(var n in c)if(t=location.pathname.match(c[n]))return l=n,u=t[1],!document.querySelector("."+s);return!1}function o(){var e=document.querySelector(".comment-button");return e?dui.LoginUtil.isLogin()?[!1,!1]:(e.style.display="none",[!0,!1]):[!0,!0]}function a(){function r(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return e.match(/^douban:\/\//)&&e.match(/^http/)||(e=""+DOUBAN_URI_SCHEMA+e),n(e,{source:t,promo_type:r,returnUrl:!0})}var o=document.createElement("a");switch(o.className=s+" msite-fixed-max-width",o.innerHTML="movie_reviews"===l?e({className:"icon"})+"<span>打开豆瓣，查看热门影评</span>":t({className:"icon"})+"<span>打开豆瓣，说说你的观点</span>",l){case"movie_reviews":o.href=r("/movie/"+u+"/reviews","card_movie_review","movie");break;case"movie_review_comments":o.href=r("/review/"+u+"/comments","card_movie_comments","movie");break;case"note":o.href=r("/note/"+u+"/comments","card_note_comments","note");break;case"group":o.href=r("/group/topic/"+u+"/comments","card_group_comments","topic");break;default:console.error(new Error("Unknown type for promo button(fixed bottom) :"+l))}document.body.appendChild(o)}function i(){if(r()){var e=o(),t=_slicedToArray(e,2),n=t[0],i=t[1];if(n&&a(),i){var s=parseInt(document.body.style.paddingBottom||0)||0;document.body.style.paddingBottom=s+50+"px"}}}var s="open-in-app-fixed-bottom",c={movie_reviews:"^/movie/subject/(\\d+)/reviews/?$",movie_review_comments:"^/movie/review/(\\d+)/comments/?$",group:"^/group/topic/(\\d+)/comments/?$",note:"^/note/(\\d+)/comments/?$"},l=void 0,u=void 0;setTimeout(i,10)}();var CommentList=function(e){function t(e){_classCallCheck(this,t);var n=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state=_defineProperty({subject:e.subject,commentList:e.commentList,hasMore:e.hasMore,hasAd:e.hasAd,ref_comment:null,popMenuIsShow:!1,currentComment:null,reportUrl:null,reportDialogIsShow:!1,inputDialogIsShow:!1},"currentComment",null),autoBind(n),n}return _inherits(t,e),_createClass(t,[{key:"isSelf",value:function(e){var t=dui.LoginUtil.getUserInfo();return!(!t||e.id!==t.id)}},{key:"showPopMenu",value:function(e,t){this.setState({currentComment:e,popMenuIsShow:!0,popMenuTriggerPos:{x:t.clientX,y:t.clientY}})}},{key:"hidePopMenu",value:function(){this.setState({popMenuIsShow:!1})}},{key:"handleUsefull",value:function(e,t){var n=this,r=dui.toast;return get_cookie("ck")||dui.LoginUtil.checkLogin(),this.isSelf(e.user)?void r.success("不能给自己投票"):e.is_voted?void r.success("你已经投过票了"):void ajax({url:REXXAR_API+"/v2/"+this.state.subject.type+"/"+t+"/vote_interest",type:"POST",data:{ck:get_cookie("ck"),interest_id:e.id},success:function(t){for(var r=n.state.commentList,o=null,a=0,i=r.length;a<i;a++)o=r[a],o.id==e.id&&(o.vote_count=t.vote_count,o.is_voted=t.is_voted,n.setState({commentList:r}))}})}},{key:"renderIcons",value:function(e,t){var n=[React.createElement(IconBtn,{name:"like",key:"like",text:e.vote_count,active:e.is_voted,left:!0,onClick:this.handleUsefull.bind(this,e,t)})];return this.isSelf(e.user)||n.push(React.createElement(IconBtn,{name:"more",key:"more",right:!0,onClick:this.showPopMenu.bind(this,e)})),n}},{key:"showReportDialog",value:function(){if(dui.LoginUtil.checkLogin()){var e=this.state.currentComment;this.setState({reportDialogIsShow:!0,reportUrl:e.uri})}}},{key:"hideReportDialog",value:function(){this.setState({reportDialogIsShow:!1,popMenuIsShow:!1})}},{key:"renderPopMenu",value:function(){var e=this.state,t=(e.currentComment,e.popMenuIsShow),n=e.popMenuTriggerPos;return React.createElement(PopMenu,{show:t,onRequestHide:this.hidePopMenu,triggerPos:n},React.createElement(PopMenuItem,{text:"举报",onClick:this.showReportDialog}))}},{key:"renderReportDialog",value:function(){var e=this.state,t=e.reportDialogIsShow,n=e.reportUrl;return React.createElement(ReportDialog,{show:t,onRequestHide:this.hideReportDialog,reportUrl:REXXAR_API+"/v2/report",reportData:function(e){return{reason:e,uri:n}}})}},{key:"createMarkup",value:function(e,t){return{__html:e.replace(/{([^{|^}]+)}/g,function(e,n){return t[n]||""})}}},{key:"renderAd",value:function(e){if(this.state.hasAd){if(5==e)return React.createElement("div",{className:"center",dangerouslySetInnerHTML:$("div.ad-1").html});if(13==e)return React.createElement("div",{className:"center",dangerouslySetInnerHTML:$("div.ad-1").html})}}},{key:"renderComment",value:function(e,t){var n=this.state.subject;if($("#commentTpl").size()>0){var r=$("#commentTpl").html();return React.createElement("li",{className:this.props.liClass,key:e.id},React.createElement("div",{dangerouslySetInnerHTML:this.createMarkup(r,e)}),this.renderIcons(e,this.state.subject.sid))}var o=e.user||{},a=e.rating&&e.rating.value||0;return React.createElement("li",{className:this.props.liClass,key:e.id},React.createElement("div",{className:"desc"},React.createElement("a",{href:"/people/"+o.id+"/"},React.createElement("img",{src:o.avatar||"",alt:o.name||""})),React.createElement("div",{className:"user-info"},React.createElement("strong",null,o.name||""),!n.hasNotShow&&React.createElement("span",{className:"rating-stars","data-rating":a},this.renderStar(a)),React.createElement("div",{className:"date"},DateUtil.getAgo(e.create_time,{maxDays:1/0})))),React.createElement("p",null,e.comment),React.createElement("div",{className:"btn-info"},this.renderIcons(e,this.state.subject.sid)),this.renderAd(t))}},{key:"renderStar",value:function(e){for(var t=[],n=Math.round(e),r="rating-star-medium-full",o="rating-star-medium-gray",a=1;a<=5;a++){var i=o;a<=n&&(i=r),t.push(React.createElement("span",{key:a,className:"rating-star "+i}))}return t}},{key:"renderMore",value:function(){if(this.state.hasMore){var e=this.state.subject,t=e.type;"tv"===t?t="movie":"app"===t&&(t="mobileapp");var n="/"+t+"/subject/"+e.sid+"/comments?from=subject";return React.createElement("li",{className:"go-comment-list"},React.createElement("a",{href:n},"查看全部短评"))}}},{key:"render",value:function(){var e=this,t=this.props;t.commentList,t.subject;return React.createElement("ul",{className:this.props.ulClass},this.state.commentList.map(function(t,n){return e.renderComment(t)}),this.renderMore(),this.renderPopMenu(),this.renderReportDialog())}}]),t}(React.Component);CommentList.defaultProps={commentList:[],hasMore:!1,hasAd:!1,ulClass:"list comment-list",liClass:""};var subject=TalionData.subject||{},SID=subject.sid,CID=subject.cid,TYPE=subject.type,SORT="time"===getQuery("sort")?"latest":"hot",data={count:TalionData.count||4,order_by:SORT,start:getQuery("start")||0};document.getElementById("comment-list")&&ajax({url:REXXAR_API+"/v2/"+TYPE+"/"+SID+"/interests",type:"GET",data:data,success:function(e){ReactDOM.render(React.createElement(CommentList,{commentList:e.interests,subject:TalionData.subject,hasMore:TalionData.hasMore,hasAd:TalionData.hasAd,count:TalionData.count}),document.getElementById("comment-list"))}});var cList=document.getElementById("celebrities"),getClbs=function(){return fetch(REXXAR_API+"/v2/"+TYPE+"/"+SID+"/credits").then(function(e){return e.json()})};cList&&getClbs().then(function(e){function t(e,t){return""+e.map(function(e){return'\n         <li class="item item__'+e.type+'">\n          <a href="'+e.url+'">\n            <div class="item-poster" style="background-image: url('+e.cover_url+')">\n            </div>\n            <span class="item-title name">'+e.name+'</span>\n            <span class="item-title role">'+t+"</span>\n          </a>\n        </li>"}).join("")}var n=e.credits,r=[].concat(_toConsumableArray(n)),o=function(e){return"\n        "+e.map(function(e){return""+t(e.celebrities,e.title)}).join("")};$(cList).find("ul").append(o(r))}).catch(function(e){return console.log("Err: "+e.message)});var SubjectForumTopics=function(e){function t(){var e,n,r,o;_classCallCheck(this,t);for(var a=arguments.length,i=Array(a),s=0;s<a;s++)i[s]=arguments[s];return n=r=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),r.state={start:0,count:5,total:-1,forum_topics:[],episode:{}},o=n,_possibleConstructorReturn(r,o)}return _inherits(t,e),_createClass(t,[{key:"componentDidMount",value:function(){this.fetchToForumTopics()}},{key:"fetchToForumTopics",value:function(){var e=this;ajax({url:REXXAR_API+"/v2/"+this.props.type+"/"+this.props.id+"/forum_topics",data:{start:this.state.start,count:this.state.count},success:function(t){e.setState(_extends({},t))}})}},{key:"render",value:function(){var e="tv"===this.props.type?"movie":this.props.type;return this.state.total===-1?React.createElement("div",{className:"loading"}):0===this.state.total?null:React.createElement("div",{className:"subject-forum-topics"},React.createElement("h2",null,"讨论(",this.state.total,")"),React.createElement("ul",{className:"list"},this.state.forum_topics.map(function(t){return React.createElement("li",{key:t.id},React.createElement("a",{
href:"/"+e+"/discussion/"+t.id},React.createElement("h3",null,t.title),React.createElement("div",{className:"info"},t.comments_count,"回应")))}),React.createElement("li",{className:"go-list"},React.createElement("a",{href:"/"+e+"/subject/"+this.props.id+"/discussions"},"查看全部讨论"))))}}]),t}(React.Component),$root=document.getElementById("discussions-root");$root&&ReactDOM.render(React.createElement(SubjectForumTopics,{type:TalionData.subject.type,id:TalionData.subject.sid}),$root);
      })();
   ;
  ;(function() {

    "use strict";function _defineProperty(e,o,n){return o in e?Object.defineProperty(e,o,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[o]=n,e}var _extends=Object.assign||function(e){for(var o=1;o<arguments.length;o++){var n=arguments[o];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e,o){"function"==typeof define&&define.amd?define([],o):"object"===("undefined"==typeof exports?"undefined":_typeof(exports))?module.exports=o():(e.SWCache&&e.console&&console.warn&&console.warn("window.Lazify already exists! Skipped"),e.SWCache=e.SWCache||o())}(window,function(){function e(e){var o=0;for(var n in e)o=(o<<5)-o+e.charCodeAt(n),o|=0;return o}function o(e,n){var r=void 0;n&&(o.state[e]=!0);var t=e in o.state?o.state[e]:o.defaultState;if(t===!1)r=o.noop;else{var i=o.selectColor(e);r=function(){for(var o,n=arguments.length,r=Array(n),t=0;t<n;t++)r[t]=arguments[t];(o=console).log.apply(o,["%c"+e+"%c","color: "+i+";","color: inherit;"].concat(r))},r.isEnable=!0}return r}function n(e){return Object.keys(e).reduce(function(o,n){var r=_typeof(e[n]);return"function"!==r&&(o[n]=e[n]),o},{})}function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=navigator,a=r.serviceWorker;a&&(s=_extends({},s,e),s.debug&&(i=o("pwa:cache",!0)),i("settings",s),a.register(s.serviceWorkerUrl,{scope:s.scope}).then(function(e){if(i("register",e),t.isFrodo()||t.isWeixin()||t.isWeibo()||t.isXiaomi()||t.isBaidu()||"undefined"!=typeof DISABLE_SERVICE_WORKER)return e.unregister().then(function(e){return i("Unregister Service Worker["+s.serviceWorkerUrl+"]: "+e)});var o=e.installing||e.active||a.controller;o.postMessage({action:"set-settings",settings:n(s)})}).catch(o.logErr))}var t=function(){function e(e){return function(){return e.test(o)}}var o=navigator.userAgent||"";return{isWeixin:e(/micromessenger/i),isWeibo:e(/weibo/i),isXiaomi:e(/xiaomi/i),isBaidu:e(/baiduboxapp|baidubrowser/i),isIOS:e(/iphone|ipad|ipod/i),isAndroid:e(/android/i),isMobile:e(/(iphone|ipod|((?:android)?.*?mobile)|blackberry|nokia)/i),isFrodo:e(/com\.douban\.frodo/i)}}();o.noop=function(){},o.noop.isEnable=!0,o.state={},o.defaultState=!1,o.enable=function(e){if("object"===("undefined"==typeof e?"undefined":_typeof(e)))o.state=_extends({},o.state,e);else{if("string"==typeof e)return o.state=_extends({},o.state,_defineProperty({},e,!0)),o(e);o.defaultState=e}},o.selectColor=function(n){return o.colors[Math.abs(e(n))%o.colors.length]},o.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson","yellow"],o.logErr=function(){if("undefined"!=typeof console&&console.error){var e;(e=console).error.apply(e,arguments)}};var i=o.noop,a={serviceWorkerUrl:"/pwa/cache_worker",scope:"/",debug:!1,precache:[],currentPath:location.pathname,offlineUrl:"/pwa/offline",onNetworkChange:null},s=_extends({},a);return{start:r}});

    SWCache.start({
      // debug: false,
      currentPath: location.pathname,
      precache: [
        'https://img3.doubanio.com/f/talion/f8b8fa66f110083144daf3f89367db3ef5a0bee1/pics/card/offline/ic_offline.png',
        'https://img3.doubanio.com/f/talion/6cd76c90e48131ae42f06eaa7026efaf8e741758/pics/card/offline/ic_refresh.png',
        'https://img3.doubanio.com/f/talion/081c0eb66c87f15598d7ffb5e42e62b4449b8dfc/css/card/base.css',
        'https://img3.doubanio.com/f/talion/ee8e0c54293aefb5709ececbdf082f8091ad5e49/js/lib/zepto/zepto.min.js',
        'https://img3.doubanio.com/f/talion/4ca44cd18b26fd8f7b96a0db1b62077049808bef/js/card/main.js',
        'https://img3.doubanio.com/f/talion/edb4a934937733a0163b69e6cc3ad3f689c92d1c/pics/card/defaults/cover.png',
        'https://img3.doubanio.com/f/talion/9c85529e7a0fbe585a2091edd8b9751a1db10ca9/pics/card/defaults/avatar.jpg',
      ],
      offlineUrl: '/pwa/offline',
    })
  }());
  