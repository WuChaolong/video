
var ably = new Ably.Realtime('_3qhhQ.TgD5uw:wZaB42O93CVl382e');
ably.init = function (){
    ably.connection.on('connected', function() {
      console.log("That was simple, you're now connected to Ably in realtime");
    });
    var channel = ably.channels.get('quickstart');
    channel.subscribe('greeting', function(message) {
      console.log("Received a greeting message in realtime: " + message.data);
    });
    channel.publish('greeting', 'hello!');
}
ably.init();

function syncIsIt(key,data){
    key = key|| getURLParameter("search");
    data = data|| JSON.parse(localStorage.getItem(key)||"{}");


    var isItChannel = ably.channels.get('isIt');
    isItChannel.subscribe(key, function(message) {
      console.log("Received a greeting message in realtime: " + JSON.stringify(message.data));
    });
    
    isItChannel.publish(key, data);
}

function isItClick(isIt){
    var key = getURLParameter("search");
    storageItTrue(key,isIt,!isIt.checked)
}

function storageItTrue(key,isIt,remove){
    var video = JSON.parse(isIt.value);
    var values = JSON.parse(localStorage.getItem(key)||"{}");
    values[video.url] = remove?false:video;
    localStorage.setItem(key, JSON.stringify(values));
    syncIsIt(key,values);
}
function isItTrue(isIt){
    var key = getURLParameter("search");
    var video = JSON.parse(isIt.value);
    var values = JSON.parse(localStorage.getItem(key)||"{}");
    if(values[video.url]){
        return true;
    }
    return false;
}