console.log('hello from background-script');

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		//4. get a message from popup with the request time
		console.log('4. got msg from popup',request);

		let sec = request;
		//6. if time is up, pop alarm
		chrome.alarms.create("myAlarm",{delayInMinutes: sec/60});

		//if time is up, close
		if(sec/60===0){
			//close all tabs
			chrome.windows.getAll(function(windows) {
			  for (let win of windows) {
			    chrome.windows.remove(win.id)
				}
			});
			//close current tab
			// chrome.windows.getCurrent(function(win) {
			//   	chrome.windows.remove(win.id)
			// })
		}
		return true
});

chrome.alarms.onAlarm.addListener(function(alarm){
	alert('Time is up! Get some rest!');
});



// closeAllTabs = function(){
// 	console.log('closing all tabs...');
// }

//close all tabs; getAll
// chrome.windows.getAll(function(windows) {
//   for (let win of windows) {
//     chrome.windows.remove(win.id)
//   }
// });

// chrome.windows.getCurrent(function(win) {
//   chrome.windows.remove(win.id)
// })


