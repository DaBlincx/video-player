var video = document.getElementById("video");
var playPauseBtn = document.getElementById("play-pause");
var progress = document.getElementById("progress");
var progressbar = document.getElementById("progress-bar");

function togglePlayPause() {
    if (video.paused) {
        playPauseBtn.className = "fa-solid fa-pause";
        video.play();
        console.log("play");
    } else {
        playPauseBtn.className = "fa-solid fa-play";
        video.pause();
        console.log("pause");
    }
}

function updateProgress(progpercent) {
    progress.style.width = progpercent * 100 + "%";
    console.log("updated to " + progpercent);
}

function clickUpdate(event) {
    var pos = event.offsetX;
    console.log(pos);

    var pospercent = pos / progressbar.offsetWidth;

    console.log(progressbar.offsetWidth);
    console.log("clicked at " + pospercent);

    updateProgress(pospercent);
    console.log(video.currentTime);

    newtime = pospercent * video.duration;

    console.log(newtime);

    video.currentTime = 200;
    
    
    console.log(video.duration);
    console.log(pospercent)
    console.log(video.currentTime);
}

progressbar.addEventListener("click", function (event) {
    console.log("clicked");
    clickUpdate(event);
}, false);

video.addEventListener("timeupdate", function () {
    var timepercent = video.currentTime / video.duration;
    console.log(video.currentTime, video.duration, timepercent);
    updateProgress(timepercent);
}, false);