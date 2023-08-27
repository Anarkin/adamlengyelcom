function main() {
    document.getElementById("_lastModifiedOn").innerText = new Date(document.lastModified).toISOString().substring(0, 10);
}

// infra
(function () {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", main)
    } else {
        main();
    }
})();

function copyToClipboard(clipboardButton, valueHolderElementId) {

    // copy to clipboard
    const element = document.getElementById(valueHolderElementId);
    const value = element.innerText;
    navigator.clipboard.writeText(value);

    // user feedback
    setTimeout(function () {

        // remove onclick
        const originalOnClick = clipboardButton.getAttribute("onclick");
        clipboardButton.removeAttribute("onclick");

        // display feedback
        const originalInnerText = clipboardButton.innerText;
        clipboardButton.innerText += " (copied!)";

        // restore onclick and remove feedback
        setTimeout(function () {
            clipboardButton.setAttribute("onclick", originalOnClick);
            clipboardButton.innerText = originalInnerText;
        }, 1250);
    }, 0);
}