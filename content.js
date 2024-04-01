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

    if (defaultSettins.isWorkApp === false) {
        return;
    }

    const currentClassName = document.getElementsByClassName('ad-showing');
    if (currentClassName.length){
        try {
            const a = document.getElementsByClassName("video-stream html5-main-video");
            if (a.length){
                // ad_showing is found
                console.log("ad_showing is found")
                a[0].playbackRate = defaultSettins.playbackRateAds;

                const skipBtnCollection = document.getElementsByClassName("ytp-skip-ad-button");
                const skipBtnCollection1 = document.getElementsByClassName("ytp-ad-skip-button-modern");

                if (skipBtnCollection1.length && defaultSettins.isAutoClickSkipAdv){
                    skipBtnCollection1[0].click()
                    console.log("//CLICK SKIP ADV1 HAPPEND")
                    //CLICK SKIP ADV HAPPEND
                    
                }

                if (skipBtnCollection.length && defaultSettins.isAutoClickSkipAdv){
                    skipBtnCollection[0].click()
                    console.log("//CLICK SKIP ADV HAPPEND")
                    //CLICK SKIP ADV HAPPEND
                    const advBanner = document.getElementById("related")
                    if (advBanner && defaultSettins.isAdvBanner){
                        //REMOVED ADS BANNER
                        console.log("REMOVED ADS BANNER")
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
        console.log("CURRENT CLASSNAME(ad-showing) NOT NOFUND")
    }
}, defaultSettins.timerSeconds);



//video path button => video-ads ytp-ad-module - ytp-ad-player-overlay-layout - ytp-preview-ad

// id btn skip - skip-button:3 || document.querySelector("#skip-button\\:3")

// /html/body/ytd-app/div[1]/ytd-page-manager/ytd-watch-flexy/div[5]/div[1]/div/div[1]/div[2]/div/div/ytd-player/div/div/div[20]/div/div[3]/div/button


// ytp-ad-skip-button-modern ytp-button 
// /html/body/ytd-app/div[1]/ytd-page-manager/ytd-watch-flexy/div[5]/div[1]/div/div[1]/div[2]/div/div/ytd-player/div/div/div[20]/div/div[3]/div/div[2]/span/button/div
