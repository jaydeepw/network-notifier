console.log('background js is running.');


var DEVELOPMENT = true;
var NAVIGATOR_ONLINE = 1,
    NAVIGATOR_OFFLINE = 0;

var screemAudio = document.createElement('audio');
  screemAudio.src = chrome.extension.getURL("screamwoman.ogg");
  screemAudio.load();

function updateOnlineStatus() {
    var networkStatus = navigator.onLine ? NAVIGATOR_ONLINE : NAVIGATOR_OFFLINE;
    console.log(networkStatus);
    chrome.browserAction.setBadgeBackgroundColor({color:[0, 200, 0, 100]});

    if( DEVELOPMENT )
      chrome.browserAction.setBadgeText({text: String(networkStatus)});

    if( networkStatus == NAVIGATOR_OFFLINE ){
      chrome.browserAction.setIcon({path: chrome.extension.getURL("offline.png")});
      screemAudio.play();
    }
    else{
      chrome.browserAction.setIcon({path: chrome.extension.getURL("online.png")});
    }

    //chrome.browserAction.setIcon({"path": chrome.extension.getURL("icon_16.png")});
}

updateOnlineStatus();

  window.addEventListener("offline", function () {
    updateOnlineStatus();
  }, false);

  window.addEventListener("online", function () {
    updateOnlineStatus();
  }, false);


/*chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(
      null, {code:"document.body.style.background='red !important'"});

  console.log('Browser action has been clicked.');
});*/

//chrome.browserAction.setBadgeBackgroundColor({color:[0, 200, 0, 100]});


/*chrome.extension.onConnect.addListener(function(port) {

	console.log('Connection established with the background script.' + port);
  console.log(port);

  port.onMessage.addListener(function(msg) {

  	console.log(msg);

    var rules = JSON.parse(localStorage.getItem('rules'));
  	
    if( msg.visitors && rules != null && msg.visitors >= rules.visitor_count ){

          if( !rules.silent )
            audioElement.play();

          lastVisitorCount = msg.visitors;
    }

    chrome.browserAction.setBadgeText({text: String(msg.visitors)});
    
  });
});*/
