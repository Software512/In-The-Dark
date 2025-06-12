chrome.storage.local.get().then((result) => {
    if (!result.radius) {
        chrome.storage.local.set({ radius: 10});
    }
    if (!result.transparency) {
        chrome.storage.local.set({ transparency: 0});
    }
});

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { command: "toggle" }, function (msg) {
        const err = chrome.runtime.lastError;
        msg = msg || {};
        if (msg.status != 'done') {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["content.js"]
            });
        }
    });

});