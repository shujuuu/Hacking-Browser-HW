console.log('hello from background-script');


//call back functions?
// chrome.browserAction.onClicked.addListener(function(){
// 	console.log('Clicked the browser action!');

// 	//inject jquery and content script ------------why????????
// 	chrome.tabs.executeScript({file:'jquery.js'},function(){
// 		console.log('background script injected jquery');

// 		chrome.tabs.executeScript({file:'content_script.js'},function(){
// 			console.log('background script injected content_script');
// 		});
// 	});
// })


//chrome alarm
//https://developer.chrome.com/extensions/background_pages
//https://developer.chrome.com/extensions/alarms#method-create
//https://developer.chrome.com/extensions/samples#search:
//https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/messaging/timer
let now = Date.now();
let time = 10000;	//10seconds


//receive from extension
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	  console.log('I got a message!',{request,sender,sendResponse});
	  // set the alarm for `request` minutes

});

setPomodoro = function(){
	chrome.alarms.create("myAlarm",{delayInMinutes:0.1});
}

chrome.alarms.onAlarm.addListener(function(alarm){
	alert('time stop');
});
