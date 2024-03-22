const interval = setInterval(() => {
    const currentClassName = document.getElementsByClassName('ad-showing');

    if (currentClassName.length){
        try {
            const a = document.getElementsByClassName("video-stream html5-main-video")
            if (a.length){
                console.log("ad_showing is found")
                a[0].playbackRate = 10.0;
            }
        } catch (error) {
            const b = document.getElementsByClassName("video-stream html5-main-video")
            if (b.length){
                console.log("ad_showing isnt found")
                b[0].playbackRate = 1.0;
            }
        } 
    } else {
        console.log("CURRENT CLASSNAME(ad-showing) NOT NOFUND")
    }
}, 1000);

 
document.addEventListener("DOMContentLoaded", interval);
//player-ads -> banner after ads on the right 
//skip btn -> classname=ytp-skip-ad-button(Возвращает колецию, 1 элемент), id=skip-button:4

