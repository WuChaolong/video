// var socketurl = "http://127.0.0.1:3000";
var socketurl = "https://socket-taifu.herokuapp.com";
// var socketurl = "https://socket-taifu.herokuapp.com:37936";

var socket = io(socketurl);
var fptime = window.parent.money.fp+'-'+new Date().getTime();
var message = {
  fb:window.parent.money.fp
  ,time:new Date().getTime()
  ,checking:0
}
addPaysapi();
setTimeout(addPaysapi,300000);
makeEr(message);
socket.on('chat message', function(msg){
  try{

    var msg = JSON.parse(msg);
    if(message.fb==msg.fb&&message.time==msg.time){
      if(msg.checking===0){
        message.checking = 1;
        log("支付中...");
      }else if(msg.checking===2){
        log("已成功支付!");
        window.parent.money.change(100);
        setTimeout(
        'location.reload(true)',1000);
      }
    }

  }catch(e){

  }
});

function log(string){
  var qrdiv = document.querySelector(".barcode");
    qrdiv.innerHTML = string;
}
function clearPay(){
   var pay10 = Number(localStorage.getItem("pay10"));
   window.parent.money.change(pay10*10);


}
function pay10(num){
   var pay10 = Number(localStorage.getItem("pay10"));
   localStorage.setItem("pay10",pay10+num);
}
function makeEr(message){
    var qrdiv = document.querySelector(".barcode");
    qrdiv.innerHTML = '<img class="alypay-icon" src="https://static.clewm.net/cli/images/logomb/version2/alipay.png"/>';
    var url = socketurl+'/pay10?emitId='+JSON.stringify(message)+'&redirect=HTTPS://QR.ALIPAY.COM/FKX06210WMHA2IRIKCSW33';
    new QRCode(qrdiv, {text: url, width: 100, height: 100});

}
function addPaysapi(){
  var html = '    <iframe src="'+socketurl+'/payqrcode?price=10&pay=1&phone='+message.fb+'" height="0"  frameborder="0" scrolling="no"></iframe>'
  document.querySelector(".payapi").innerHTML = html;
}