var radius = 10;
var transparency = 0;
var statusTimer

document.getElementById("radius").addEventListener("input", () => {
    radius = document.getElementById("radius").value;
    document.getElementById("radiusLabel").textContent = radius;
    clearTimeout(statusTimer);
    document.getElementById('status').style.color = "orange";
    document.getElementById('status').textContent = "Settings are not saved.";
});

document.getElementById("transparency").addEventListener("input", () => {
    transparency = document.getElementById("transparency").value;
    document.getElementById("transparencyLabel").textContent = transparency + "%";
    clearTimeout(statusTimer);
    document.getElementById('status').style.color = "orange";
    document.getElementById('status').textContent = "Settings are not saved.";
});

document.getElementById("save").addEventListener("click", () => { save("Saved.") });

document.getElementById("reset").addEventListener("click", () => {
    radius = 10;
    transparency = 0;
    document.getElementById("radiusLabel").textContent = 10;
    document.getElementById("radius").value = 10;
    document.getElementById("transparencyLabel").textContent = "0%";
    document.getElementById("transparency").value = 0;
    save("Settings reset.")
});

function save(message) {
    document.getElementById('status').style.color = "limegreen";
    chrome.storage.local.set(
        { radius: radius, transparency: transparency },
        () => {
            document.getElementById('status').textContent = message;
            statusTimer = setTimeout(() => {
                document.getElementById("status").textContent = "";
            }, 1000);
        }
    );
};

chrome.storage.local.get().then((result) => {
    radius = result.radius;
    transparency = result.transparency;
    document.getElementById("radiusLabel").textContent = radius;
    document.getElementById("radius").value = radius;
    document.getElementById("transparencyLabel").textContent = transparency + "%";
    document.getElementById("transparency").value = transparency;
});