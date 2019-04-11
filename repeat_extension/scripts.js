let h = document.getElementById("h");
let pl = document.getElementById("movie_player");
let youtubeLink = "https://www.youtube.com/watch";


//localStorage.setItem("repeat", false);
let media = { repeat: false, clicked: false };
var nombre = 0;
var bacground = h.style.background;
//var t = 'function zz() { alert("je suis cette fonction zz") };' +
// 'let v=document.getElementsByTagName("video");v[0].play();';
h.addEventListener("click", function(tab) {
    //console.log(chrome.toString());
    nombre++;
    console.log("la valeur de repeat est :" + media.repeat + " et nombre:" + nombre);
    if (media.repeat == false) {
        media.repeat = true;
        //media.clicked = true;
        h.style.border = "1px solid red";
        console.log("la valeur de repeat est :" + media.repeat);
    }
    if (media.repeat == true && nombre % 2 == 0) {
        media.repeat = false;
        h.style.border = "1px solid transparent";
        console.log("la valeur de repeat est :" + media.repeat);
    }
    if (chrome.browserAction.setDefaultIcon)
        chrome.browserAction.setDefaultIcon({ "default_icon": "image/youtube.png" });
    //console.log('Turning ' + tab.url + ' red! ' + tab);

    chrome.tabs.getSelected(null, function(tab) {
        let url = new RegExp(youtubeLink.toString());
        if (url.test(tab.url.toString())) {
            alert("you are watchigeng a video on:" + tab.url);
            let k = "";
            var id = document.querySelector("html");
            //alert(tab);
            if (media.clicked == false) {
                let script_injected = "var t=document.createElement('div');var delf=0;" +
                    'function repeat() {' +
                    'var vd = document.querySelector("video");var diff=(vd.currentTime/vd.duration)*100;console.log("voici :"+vd.currentTime+" et "+vd.duration+" -- "+diff+"%");' +
                    ' if (diff >=99) {' +
                    ' vd.pause();console.log("on restart la video");' +
                    ' vd.currentTime = 0;vd.play();' +
                    ' }' +
                    '}' +
                    "var ch=document.createTextNode('RePlay');" +
                    "var n=0;" +
                    "t.style.textAlign='center';t.style.fontWeight='bold';t.style.borderRadius='3px';t.style.cursor='pointer';" +
                    "t.appendChild(ch);t.style.zIndex=1000000000000000000000;t.style.fontSize='12px';t.style.padding='3px';" +
                    "t.style.background='#774545';t.style.color='white';t.style.position='fixed';t.style.width='70px';" +
                    "t.style.left='12px';t.style.top='20%';" +
                    "t.addEventListener('click',function(){n++;if(n%2!=0){t.style.background='red';delf=setInterval(repeat,300);}" +
                    "if(n%2==0){t.style.background='#774545';clearInterval(delf);}console.log('voici la valeur de n:'+n);},false);" +
                    "document.getElementsByTagName('body')[0].appendChild(t);";
                chrome.tabs.executeScript({
                    code: script_injected
                });
                media.clicked = true;
            }
        }
    });



}, false);