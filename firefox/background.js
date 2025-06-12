browser.storage.local.get().then((result) => {
    if (!result.radius) {
        browser.storage.local.set({ radius: 10});
    }
    if (!result.transparency) {
        browser.storage.local.set({ transparency: 0});
    }
});

browser.action.onClicked.addListener((tab) => {
    browser.tabs.sendMessage(tab.id, { command: "toggle" }, function (msg) {
        const err = browser.runtime.lastError;
        msg = msg || {};
        if (msg.status != 'done') {
            browser.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["content.js"]
            });
        }
    });

});