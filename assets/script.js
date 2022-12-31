var video = document.getElementById("video");
var playPauseBtn = document.getElementById("play-pause");
var progress = document.getElementById("progress");
var progressbg = document.getElementById("progress-bg");

function togglePlayPause() {
    if (video.paused || video.ended) {
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

    var pospercent = pos / progressbg.offsetWidth;

    console.log(progressbg.offsetWidth);
    console.log("clicked at " + pospercent);

    updateProgress(pospercent);
    console.log(video.currentTime);

    newtime = pospercent * video.duration;

    console.log(newtime);

    video.currentTime = newtime;
    
    
    console.log(video.duration);
    console.log(pospercent)
    console.log(video.currentTime);
}

progressbg.addEventListener("click", function (event) {
    console.log("clicked");
    clickUpdate(event);
}, false);

video.addEventListener("timeupdate", function () {
    var timepercent = video.currentTime / video.duration;
    console.log(video.currentTime, video.duration, timepercent);
    updateProgress(timepercent);
    if (video.ended || video.paused) {
        playPauseBtn.className = "fa-solid fa-play";
    } else {
        playPauseBtn.className = "fa-solid fa-pause";
    }
}, false);