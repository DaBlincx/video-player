var video = document.getElementById("video");
var playPauseBtn = document.getElementById("play-pause");
var progress = document.getElementById("progress");
var progressbg = document.getElementById("progress-bg");
var progresshover = document.getElementById("progress-hover");
var videoDurationDisplay = document.getElementById("time-video-duration-display");
var videoCurrentTimeDisplay = document.getElementById("time-video-current-time-display");
var volumebar = document.getElementById("volume-bar");
var volumebutton = document.getElementById("volume-button")

function checkURLParams() {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const newVideoSrc = urlParams.get('url')
    console.log(newVideoSrc);
    return newVideoSrc;
}

video.src = checkURLParams();

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
    videoCurrentTimeDisplay.innerText = formTimeString(video.currentTime);
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

function formTimeString(seconds) {
    seconds = Math.floor(seconds)
    var hours = 0;
    var minutes = 0;
    while (seconds >= 60) {
        seconds = seconds - 60;
        minutes = minutes + 1;
    }
    while (minutes >= 60) {
        minutes = minutes - 60;
        hours = hours + 1;
    }

    if (hours > 0) {
        return String(hours).padStart(2, '0') + ":" + String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0')
    } else {
        return String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0')
    }
}

function toggleMute() {

    if (video.muted) {
        video.muted = false;
        volumebutton.className = getVolClasses(video.volume);
    } else {
        video.muted = true;
        volumebutton.className = "fa-solid fa-volume-xmark";
    }
}

function getVolClasses(volume) {
    if (volume == 0) {
        return "fa-solid fa-volume-xmark"
    } else if (0 < volume && volume <= 0.33) {
        return "fa-solid fa-volume-off"
    } else if (0.33 < volume && volume <= 0.66) {
        return "fa-solid fa-volume-low"
    } else if (0.66 < volume && volume <= 1) {
        return "fa-solid fa-volume-high"
    } else {
        return "fa-solid fa-volume-high"
    }
}


/*
ill implement this later lol

function checkBufferSize(element) {
    for (let i = 0; i < element.buffered.length; i++) {
        const startX = element.buffered.start(i) * inc;
        const endX = element.buffered.end(i) * inc;
        const width = endX - startX;
    }
}*/

progressbg.addEventListener("click", function (event) {
    clickUpdate(event);
}, false);

video.addEventListener("timeupdate", function () {
    updateProgress(video.currentTime / video.duration);
    if (video.ended || video.paused) {
        playPauseBtn.className = "fa-solid fa-play";
    } else {
        playPauseBtn.className = "fa-solid fa-pause";
    }
    
}, false);

video.addEventListener("click", function () {
    togglePlayPause()
})

setTimeout(() => videoDurationDisplay.innerText = formTimeString(video.duration), 180)


volumebar.addEventListener("input", function () {
    video.volume = volumebar.value;
    if (!video.muted) {
        volumebutton.className = getVolClasses(video.volume);
    }
}, false);