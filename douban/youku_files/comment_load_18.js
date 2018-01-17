/**
 * @modified $Author: lixingyuan $
 * @version $Rev: 3590f2441498a66dddd8cac4a7587314f3362530 $
 */
!function(e){require.config({enable_ozma:true});require([],function(){var e=window.location.href;if(e.indexOf("comment_v2=true")>0){console.log("现在是：V2");require.async(["page/find/play/comment_v2"],function(e){})}else if(e.indexOf("comment_v2=false")>0){console.log("现在是：V3");require.async(["page/find/play/comment"],function(e){})}else if(e.indexOf("comment_v3=true")>0){console.log("现在是：V3");require.async(["page/find/play/comment"],function(e){})}else{console.log("现在是：V3 全量");require.async(["page/find/play/comment"],function(e){})}})}(window.jQuery);;