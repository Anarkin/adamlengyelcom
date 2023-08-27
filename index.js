(function () {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", main)
    } else {
        main();
    }
})();

function copyToClipboard(clipboardButton, valueHolderElementId) {
    const element = document.getElementById(valueHolderElementId);
    const value = element.innerText;
    navigator.clipboard.writeText(value);

    setTimeout(function () {
        const originalOnClick = clipboardButton.getAttribute("onclick");
        clipboardButton.removeAttribute("onclick");

        const originalInnerText = clipboardButton.innerText;
        clipboardButton.innerText += " (copied!)";

        setTimeout(function () {
            clipboardButton.setAttribute("onclick", originalOnClick);
            clipboardButton.innerText = originalInnerText;
        }, 1250);
    }, 0);
}