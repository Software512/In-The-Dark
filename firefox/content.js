var dark = true;

var shadow = document.body.appendChild(document.createElement("div")).attachShadow({ mode: "open" });
shadow.innerHTML = '<svg style="pointer-events: none; position: fixed; top: 0; left: 0; z-index: 10000; width: 100%; height: 100%" height="100%" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><radialGradient id="flashlightGradient"><stop offset="70%" stop-color="black"></stop><stop offset="100%" stop-color="white"></stop></radialGradient><mask id="darknessMask"><rect width="100%" height="100%" fill="white"></rect><circle style="cx: 50%; cy: 50%; r: 10%;" fill="url(#flashlightGradient)"></circle></mask></defs><rect x="0" y="0" width="100%" height="100%" fill="black" mask="url(#darknessMask)"></rect></svg>';
var overlay = shadow.firstChild;
const light = overlay.querySelector("circle").style;
updateSettings();
document.addEventListener("mousemove", (e) => {
    light.cx = e.clientX + "px";
    light.cy = e.clientY + "px";
});
document.addEventListener("touchmove", (e) => {
    light.cx = e.touches[0].clientX + "px";
    light.cy = e.touches[0].clientY + "px";
});
browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.command === "toggle") {
            if (dark) {
                overlay.style.visibility = "hidden";
                dark = false;
            } else {
                overlay.style.visibility = "visible";
                dark = true;
            }
            sendResponse({ status: "done" });
        }
    }
);

browser.storage.onChanged.addListener(() => {
    updateSettings();
})

function updateSettings() {
    browser.storage.local.get().then((result) => {
        light.r = result.radius + "%";
        overlay.querySelector("rect").setAttribute("fill", "hsl(0 0 " + (100 - result.transparency) + ")");
        overlay.querySelectorAll("stop")[1].setAttribute("stop-color", "hsl(0 0 " + (100 - result.transparency) + ")");
    });
}