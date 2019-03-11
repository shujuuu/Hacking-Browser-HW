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


//5. simple one-time request = receive from extension
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		// set the alarm for `request` minutes	
		console.log(request)
		console.log(`set timer for ${request} sec`);
		//5. do the countdown
		function startCountdown(sec) {
			console.log('test2');
			request = sec;
			if(sec){
				let remainingSeconds = sec;

				setInterval(function() {
				  remainingSeconds -= 1;
				  console.log('one sec passed');

				  //tell the popup that the time is now: remainingSeconds
				  //run time send message
				  sendResponse({text: 'one sec passed'});
				}, 1000);
			}
		}
	  return true;	
});

//5. long-lived connections?
let port = chrome.runtime.connect();
	port.postMessage()	//first passed time






setPomodoro = function(){
	chrome.alarms.create("myAlarm",{delayInMinutes:0.1});
	// chrome.alarms.create("myAlarm",{delayInMinutes:${defaultTime}});
}

chrome.alarms.onAlarm.addListener(function(alarm){
	alert('time stop');
});


