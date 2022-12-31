var video = document.getElementById("video");
var playPauseBtn = document.getElementById("play-pause");
var progress = document.getElementById("progress");
var progressbg = document.getElementById("progress-bg");
var progresshover = document.getElementById("progress-hover");
var volumebar = document.getElementById("volume-bar");

function togglePlayPause() {
    if (video.paused || video.ended) {
        playPauseBtn.className = "fa-solid fa-pause";
        video.play();
    } else {
        playPauseBtn.className = "fa-solid fa-play";
        video.pause();
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
        playPauseBtn.className = "fa-solid fa-play";
    } else {
        playPauseBtn.className = "fa-solid fa-pause";
    }
}, false);

volumebar.addEventListener("input", function () {
    video.volume = volumebar.value;
}, false);