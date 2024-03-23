let defaultSettins = {
    isWorkApp: true,
    isAutoClickSkipAdv: true,
    isAdvBanner: true,
    playbackRateAds: 10.0,
    playbackRateDefault: 1.0,
    timerSeconds: 1000,
}

const switchButton = document.querySelector(".switch");
const btns = document.querySelectorAll(".btn");
const currentOn = document.querySelector(".current_on");
const currentOnSpeed = document.querySelector(".current_speed");

//if (!switchButton || !currentOn || !btns) return;

switchButton.addEventListener("click", () => {
    defaultSettins.isWorkApp = !defaultSettins.isWorkApp;
    currentOn.innerHTML = defaultSettins.isWorkApp ? "ON" : "OFF";
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {isWorkApp: defaultSettins});
    });
});

btns.forEach((item) => {
    item.addEventListener("click", (e) => {
        currentOnSpeed.innerHTML = item.innerHTML;
        defaultSettins.playbackRateDefault = parseFloat(item.innerHTML);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {isWorkApp: defaultSettins});
        });
    });
})
