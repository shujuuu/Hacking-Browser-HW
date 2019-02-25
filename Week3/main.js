console.log('this is main js');

//load all image from unsplash link

//get one random number
let url = "https://source.unsplash.com/random";
// let param = "/weekly?nature,city,life";
let wholeURL = url;

//change css
let bgImg = document.getElementById('body');
// bgImg.style.backgroundImage = `url(${wholeURL})`;
bgImg.setAttribute('style',`background-position: center center`);
bgImg.setAttribute('style',`background-image: url(${wholeURL})`);
