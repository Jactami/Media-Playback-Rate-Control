chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "input") {
        changeRate(message.rate, message.strictMode);
    } else if (message.type === "update") {
        respond(sendResponse);
    }
});

function changeRate(rate, strictMode) {
    let videos = document.getElementsByTagName("video");
    let audios = document.getElementsByTagName("audio");
    let media = [...videos, ...audios];

    for (let medium of media) {
        // remove previous listener to avoid "stacking"
        medium.removeEventListener("ratechange", medium.setPlaybackRate);

        // redefine setPlaybackRate AFTER the listener were removed and bind new function to medium to keep global scope
        medium.setPlaybackRate = () => {
            medium.defaultPlaybackRate = rate;
            medium.playbackRate = rate;
        };

        // change actual playback rate
        medium.setPlaybackRate();

        /* 
         * in strict mode overwrite default behaviours of players that reset the playback rate by e.g:
         * pausing the video
         * switching sources, loading new chapters, etc.  
         * Note: users can no longer change the rate via built in tools of these players 
         */
        if (strictMode) {
            medium.addEventListener("ratechange", medium.setPlaybackRate);
        }
    }
}

function respond(sendResponse) {
    let videos = document.getElementsByTagName("video");
    let audios = document.getElementsByTagName("audio");

    let currentRate;
    if (videos.length > 0) {
        currentRate = videos[0].playbackRate;
    } else if (audios.length > 0) {
        currentRate = audios[0].playbackRate;
    }

    // only send response if video or audio element and therefore a rate exists
    if (currentRate !== undefined) {
        let response = {
            currentRate: currentRate
        }
        sendResponse(response);
    }
}