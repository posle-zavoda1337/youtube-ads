let defaultSettins = {
    isWorkApp: true,
    isAutoClickSkipAdv: true,
    isAdvBanner: true,
    playbackRateAds: 10.0,
    playbackRateDefault: 1.0,
    timerSeconds: 1000,
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    defaultSettins = message.isWorkApp;
});

const interval = setInterval(() => {
    if (!defaultSettins.isWorkApp) return;
    const currentClassName = document.getElementsByClassName('ad-showing');
    if (currentClassName.length){
        try {
            const a = document.getElementsByClassName("video-stream html5-main-video");
            if (a.length){
                console.log("ad_showing is found")
                a[0].playbackRate = defaultSettins.playbackRateAds;

                const skipBtnCollection = document.getElementsByClassName("ytp-skip-ad-button");
                if (skipBtnCollection.length && defaultSettins.isAutoClickSkipAdv){
                    skipBtnCollection[0].click()
                    console.log('CLICK SKIP ADV HAPPEND')
                    const advBanner = document.getElementById("related")
                    if (advBanner && defaultSettins.isAdvBanner){
                        advBanner.parentNode.removeChild(advBanner)
                        console.log("REMOVED ADS BANNER")
                    }
                } 

            }
        } catch (error) {
            console.log("something went wrong", error)
        } 
    } else {
        const b = document.getElementsByClassName("video-stream html5-main-video")
            if (b.length){
                console.log("ad_showing isnt found")
                b[0].playbackRate = defaultSettins.playbackRateDefault;
            }
        console.log("CURRENT CLASSNAME(ad-showing) NOT NOFUND")
    }
}, defaultSettins.timerSeconds);