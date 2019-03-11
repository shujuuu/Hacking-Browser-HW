let button = document.getElementById('button');
let buttonState = false;
let defaultTime = document.getElementById('defaultTime').innerText;
let toMillis = 60000;
let toSec = 60;
let increment = 5;


//1. parse javascript data
// let secString = defaultTime[3]+defaultTime[4];
let minString = defaultTime[0]+defaultTime[1];
// let timeString = defaultTime[0]+defaultTime[1];
let timeInt = (parseInt(minString, 10)); //time in millis

console.log(minString);


//2. arrows = increment time
let arrowLeft = document.getElementById('left');
let arrowRight = document.getElementById('right');

arrowLeft.addEventListener('click',()=>{
	if(timeInt <= 5){
		timeInt = 0;
	}else{
		timeInt = timeInt - increment;
		console.log('minus 5 mins');
	}
	console.log(timeInt);
	defaultTime = timeInt; //timeInt not updating in HTML???
});

arrowRight.addEventListener('click',()=>{
	if(timeInt >= 55){
		timeInt = 60;
	}else{
		timeInt = timeInt + increment;
		console.log('add 5 mins');
	}
	console.log(timeInt);
	defaultTime = timeInt; //timeInt not updating in HTML???
});


//3. make into millis
let now = Date.now();
let secCounter, minCounter;


//4. when button clicked, send message to background-script to start sending back every seconds passed
button.addEventListener('click',()=>{
	let timeIntToSec = timeInt * toSec; //timeInt not updating???

	console.log('timer button is clicked');
	console.log(`Time to Set: ${defaultTime}`);
	console.log(`Time in seconds: ${timeIntToSec}`);	//not updated

	//one-time request; from content script to background
	//(1) = 'request' from popup; can add a callback param
	// chrome.runtime.sendMessage(timeIntToSec); 
	chrome.runtime.sendMessage(timeIntToSec,function(response){
		if(response.text){
			console.log(response.text);	//print and start countdown
		}	
	}); 
	buttonState = true;
});

//start countdown when button is clicked
function startCountDown(){
	secCounter = secString % 60;
}


//close all tabs; getAll
chrome.windows.getAll(function(windows) {
	for (let win of windows) {
		// chrome.windows.remove(win.id)
	}
});

chrome.windows.getCurrent(function(win) {
// chrome.windows.remove(win.id)
})
