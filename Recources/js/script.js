var video = document.getElementById("video");
var MuteBtn = document.getElementById("up-mute");
var playPauseBtn = document.getElementById("play-pausebtn");
var progress = document.getElementById("progress");
var progressbg = document.getElementById("progress-bg");
var progresshover = document.getElementById("progress-hover");
var slider = document.getElementById("volume-slider");
var rangeslider = document.getElementById("sliderRange");
var Voloutput = 1;
let isMuted = false;
Voloutput = rangeslider.value;

function togglePlayPause() {
    if (video.paused || video.ended) {
        playPauseBtn.className = "fa-solid fa-pause white";
        video.play();
    } else {
        playPauseBtn.className = "fa-solid fa-play white";
        video.pause();
    }
}

function toggleMute() {
    if (!Boolean(isMuted) ) {
        isMuted = true;
        MuteBtn.className = "fa-solid fa-volume-mute button";
        video.volume = 0;
        console.log("Muted");
    } 
    else if(Boolean(isMuted))
    {
        isMuted = false;
        MuteBtn.className = "fa-solid fa-volume-up button";
        video.volume = 1;
        console.log("UnMuted");
    }
}

function updateProgress(progpercent) {
    progress.style.width = progpercent * 100 + "%";
}

function clickUpdate(event) {
    var pos = event.offsetX;
    var pospercent = pos / progressbg.offsetWidth;
    updateProgress(pospercent);
    newtime = pospercent * video.duration;
    video.currentTime = newtime;
}

function updateHoverBar(event) {
    var hovpos = event.offsetX;
    var nposperc = hovpos / progressbg.offsetWidth;
    progresshover.style.width = nposperc * 100 + "%";
}

function rmHoverBar() {
    progresshover.style.width = 0;
}

progressbg.addEventListener("click", function (event) {
    clickUpdate(event);
}, false);

video.addEventListener("timeupdate", function () {
    var timepercent = video.currentTime / video.duration;
    updateProgress(timepercent);
    if (video.ended || video.paused) {
        playPauseBtn.className = "fa-solid fa-play white";
    } else {
        playPauseBtn.className = "fa-solid fa-pause white";
    }
}, false);



rangeslider.oninput = function() {
  Voloutput = this.value;
  console.log("Volume Changed!")
  console.log("Not Normal = " + this.value / 10 + "  Curent Volume = " + this.value);

  video.volume = this.value / 10;
}