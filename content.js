chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.message); 
});

let timerSeconds = 1000;
let playbackRateDefault = 1.0;
let playbackRateAds = 10.0;
let isAdvBanner = true;
let isWorkApp = true;
let isAutoClickSkipAdv = true;

document.getElementById('button').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {message: "Hello from popup!"});
    });
});

const interval = setInterval(() => {
    const currentClassName = document.getElementsByClassName('ad-showing');

    if (currentClassName.length){
        try {
            const a = document.getElementsByClassName("video-stream html5-main-video")
            if (a.length){
                console.log("ad_showing is found")
                a[0].playbackRate = playbackRateAds;

                const skipBtnCollection = document.getElementsByClassName("ytp-skip-ad-button")
                if (skipBtnCollection.length){
                    skipBtnCollection[0].click()
                    console.log('CLICK SKIP ADV HAPPEND')
                    const advBanner = document.getElementById("related")
                    if (advBanner){
                        advBanner.parentNode.removeChild(advBanner)
                        console.log("REMOVED ADS BANNER")
                    }
                } 

            }
        } catch (error) {
            const b = document.getElementsByClassName("video-stream html5-main-video")
            if (b.length){
                console.log("ad_showing isnt found")
                b[0].playbackRate = playbackRateDefault;
            }
        } 
    } else {
        console.log("CURRENT CLASSNAME(ad-showing) NOT NOFUND")
    }
}, timerSeconds);

 
document.addEventListener("DOMContentLoaded", interval)

// banner id -> player-ads 

// how to delete div? a.parentNode.removeChild(a)