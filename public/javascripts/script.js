document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);


//This code is for the text animation from bootstrap

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 120 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #000}";
  document.body.appendChild(css);
};

//Here ends the javascript for the animation

//jQuery for the music

let audio = document.getElementById("myAudio");
let audio2 = document.getElementById("myAudio2");
let audio3 = document.getElementById("myAudio3");
let audio4 = document.getElementById("myAudio4");
let audio5 = document.getElementById("myAudio5");
let audio6 = document.getElementById("myAudio6");

function playAudio() { 
  audio.play(); 
};
function playAudio2() { 
  audio2.play(); 
};
function playAudio3() { 
  audio3.play(); 
};
function playAudio4() { 
  audio4.play(); 
};
function playAudio5() { 
  audio5.play(); 
};
function playAudio6() { 
  audio6.play(); 
};

let count = 1;
let previousSong = 0;

$(".loading").click(()=>{

  let stopAndRestartMusic = (()=>{
      audio.pause();
      audio.currentTime = 0;
      audio2.pause();
      audio2.currentTime = 0;
      audio3.pause();
      audio3.currentTime = 0;
      audio4.pause();
      audio4.currentTime = 0;
      audio5.pause();
      audio5.currentTime = 0;
      audio6.pause();
      audio6.currentTime = 0;
    });

  if(count % 2 != 0){
    $(".loading").addClass('loadingFaster').removeClass('loading');
    stopAndRestartMusic();
 
    let randomNumber = Math.floor(Math.random() * 5 + 1);
   

    if(randomNumber == 1 && previousSong != 1){
      playAudio();
      previousSong = randomNumber;
    } else if(randomNumber == 2 && previousSong != 2){
      playAudio2();
      previousSong = randomNumber;
    } else if(randomNumber == 3 && previousSong != 3){
      playAudio3();
      previousSong = randomNumber;
    } else if(randomNumber == 4 && previousSong != 4){
      playAudio4();
      previousSong = randomNumber;
    } else if(randomNumber == 5 && previousSong != 5){
      playAudio5();
      previousSong = randomNumber;
    } else {
      playAudio6();
      previousSong = 0;
    };

     

  } else if(count % 2 == 0){
    $(".loadingFaster").addClass('loading').removeClass('loadingFaster');
    stopAndRestartMusic();
  };

  count++;
  
});


