let defaultSettins = {
    isWorkApp: true,
    playbackRateDefault: 1.0,
    isAutoClickSkipAdv: true,
    isAdvBanner: true,
    playbackRateAds: 10.0,
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
                // ad_showing is found
                a[0].playbackRate = defaultSettins.playbackRateAds;

                const skipBtnCollection = document.getElementsByClassName("ytp-skip-ad-button");
                if (skipBtnCollection.length && defaultSettins.isAutoClickSkipAdv){
                    skipBtnCollection[0].click()
                    //CLICK SKIP ADV HAPPEND
                    const advBanner = document.getElementById("related")
                    if (advBanner && defaultSettins.isAdvBanner){
                        //REMOVED ADS BANNER
                        advBanner.parentNode.removeChild(advBanner)
                    }
                } 

            }
        } catch (error) {
            console.log("something went wrong", error)
        } 
    } else {
        const b = document.getElementsByClassName("video-stream html5-main-video")
            if (b.length){
                b[0].playbackRate = defaultSettins.playbackRateDefault;
            }
        // CURRENT CLASSNAME(ad-showing) NOT NOFUND
    }
}, defaultSettins.timerSeconds);