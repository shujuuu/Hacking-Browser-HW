let button = document.getElementById('button');
let buttonState = false;
let defaultTime = document.getElementById('defaultTime').innerText;
let toMillis = 60000;
let toSec = 60;
let increment = 5;
let timeCounter = 1;

let min, sec;
let serial;
let portName = '/dev/cu.usbmodemFA131' //the usb name number changes everytime; so make sure to check the ports that is plugin first
let inData;
let buttonL,buttonR,buttonS;

//Step 1. parse javascript data
let secString = defaultTime[3]+defaultTime[4];
let minString = defaultTime[0]+defaultTime[1];
let timeInt = (parseInt(minString, 10)); 
let timeInt2 = (parseInt(secString, 10)); 
console.log(minString, secString);
console.log(timeInt, timeInt2);

//Step 2. arrows = increment time
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
  defaultTime = timeInt;
  document.getElementById('defaultTime').innerText=`${defaultTime}:00`;
});

arrowRight.addEventListener('click',()=>{
  if(timeInt >= 55){
    timeInt = 60;
  }else{
    timeInt = timeInt + increment;
    console.log('add 5 mins');
  }
  console.log(timeInt);
  defaultTime = timeInt; 
  document.getElementById('defaultTime').innerText=`${defaultTime}:00`;
});


//Step 3. when button clicked, send a message to bg w/ number of minutes to count
function isThereATimer() {
  return getRemainingSeconds();
}

function getRemainingSeconds() {
  let data = window.localStorage['remainingSeconds'];
  if (data) {
    return parseInt(data, 10);//10 is optional; 10 = decimal
  }
}

function maybeStartCountdown() {
  if (isThereATimer()) {
    let remainingSeconds = getRemainingSeconds();
    setInterval(() => {
      remainingSeconds -= 1;
      //PROBLEM - not printing
        console.log('3. one sec passed', remainingSeconds);
      }, 1000);
      updateTime();
  }
}

function setRemainingSeconds(seconds) {
  window.localStorage['remainingSeconds'] = seconds;
}
maybeStartCountdown();

button.addEventListener('click',()=>{
  let timeIntToSec = timeInt * toSec;

  console.log('timer button is clicked');
  console.log(`1. Time to Set: ${defaultTime}`);
  console.log(`1. Time in seconds: ${timeIntToSec}`);

  chrome.runtime.sendMessage(timeIntToSec); 
  buttonState = true;

  updateTime();
});


//Step 5. update countdown every 1 second
let count2Time = new Date(`00:${defaultTime}:00`).getTime();

function updateTime(){
  setInterval(()=>{
    console.log('3. one sec passed');
    let now = new Date().getTime();
    distance = count2Time - now;
    document.getElementById('defaultTime').innerText = Math.floor(distance%(1000 * 60 * 60)/(1000 * 60));
    document.getElementById('defaultTime').innerText = Math.floor(distance%(1000 * 60)/1000);
  },1000);
};

//Step 7. serial communication
function setup() {
  serial = new p5.SerialPort();

  //list the ports//
  serial.on('list', printList);
  serial.on('data', serialEvent);
  
  //open a serial port
  serial.open(portName);
  noCanvas();
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    print(i + '' + portList[i]);
  }
}

function serialEvent(){
  inData = serial.readLine();
  print('Got: '+ inData);

  //parse code from arduino
  let buttons = split(inData, ",");
  if(buttons.length>2){
    buttonL = int(buttons[0]);
    buttonR = int(buttons[1]);
    buttonS = int(buttons[2]);
  // console.log(buttonL,buttonR,buttonS);
  }
  
  if(buttonL==1){
    //where I left off
    //continue after spring break
    //if button is pressed add/minus counter
    if(timeInt <= 5){
      timeInt = 0;
    }else{
      timeInt = timeInt - increment;
      console.log('minus 5 mins');
    }
    console.log(timeInt);
    defaultTime = timeInt;
    document.getElementById('defaultTime').innerText=`${defaultTime}:00`;
  }

  if(buttonR==1){
    if(timeInt >= 55){
      timeInt = 60;
    }else{
      timeInt = timeInt + increment;
      console.log('add 5 mins');
    }
    console.log(timeInt);
    defaultTime = timeInt; 
    document.getElementById('defaultTime').innerText=`${defaultTime}:00`;
  }

  if(buttonS==1){
    let timeIntToSec = timeInt * toSec;

    console.log('timer button is clicked');
    console.log(`1. Time to Set: ${defaultTime}`);
    console.log(`1. Time in seconds: ${timeIntToSec}`);

    chrome.runtime.sendMessage(timeIntToSec); 
    updateTime();
    buttonState = true;
  }
}



