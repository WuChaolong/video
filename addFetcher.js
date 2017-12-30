

setData();
function setData(){

    window.example = {
        key:getURLParameter("search")
        ,payNumber:getURLParameter("payNumber")
    }
    example.url=(dedent `http://tieba.baidu.com/f/search/res?ie=utf-8&qw=${example.key} pan.baidu`);
    example.exampleD=(dedent `Example url:<a target="_blank" onclick="document.addFetcher.example.click()" href="${example.url}"> ${example.url}</a>`);
 
    inner("exampleD");


//     document.querySelector('[name=\"example\"]').onclick = function(){
//         if(this.checked){
//             document.addFetcher.url.value = example.url;
//         }else if(document.addFetcher.url.value == example.url){
            
//             document.addFetcher.url.value = "";
//         }
//     }
//     inner("payNumber");
//     document.querySelector('[name="pay"]').values=example.payNumber;
//     onSeleteType(0);
//     document.addFetcher.url.oninput = function(){
//         onSeleteType();
//     }
    function inner(id){
        document.getElementById(id).innerHTML=example[id];
    }
}

function onSeleteType(checkedIndex){
    var radios = document.getElementsByName("api");
    
    var prev = null;
    for(var i = 0;i<radios.length;i++){
        radios[i].onclick = function() {
            (prev)? console.log(prev.value):null;
            if(this !== prev) {
                prev = this;
                testFetch(this.value);
            }
            console.log(this.value)
        };
        radios[i].checked = false;
        if(i === checkedIndex){
//             radios[i].click();
        }
    }
}
function testFetch(value){
    var testFetchD = document.getElementById("testFetch");
    testFetchD.style.display = "none";
    var iframe = testFetchD.querySelector("iframe");
    iframe.src = value+(document.addFetcher.url.value||example.url);

    var onload=function(){
        testFetchD.style.display = "block";
    }
    onload();
//     iframe.onreadystatechange = function(){
//         if(iframe.readyState == "LOADING"){
//             onload();
//         }
//     }
//     if (iframe.attachEvent){
//         iframe.attachEvent("onload", onload);
//     } else {
//         iframe.onload = onload;
//     }
}
function dedent(strings, ...values) {

  let result = '';
  for (let i = 0; i < strings.length; i++) {
      if(values[i]){
        result += strings[i].replace(/\n\s+/g, '\n') + values[i];
      }else{
          result += strings[i].replace(/\n\s+/g, '\n');
      }
  }
  return result;
}

// console.log(dedent `Hello ${name}, How are you ${time}?`);