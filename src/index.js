const copyStatus = document.getElementById("copy-status");

const masked = {
  p: "MjMgOTQgNDU5IDAzIDYzKw==",
};

function unmask(value) {
  return [...atob(value)].reverse().join("");
}

function flash(button, className, message) {
  button.classList.remove("copied", "failed");
  button.classList.add(className);
  copyStatus.textContent = message;

  clearTimeout(button.flashTimer);
  button.flashTimer = setTimeout(function () {
    button.classList.remove(className);
    copyStatus.textContent = "";
  }, 1250);
}

document.querySelectorAll(".copy-chip").forEach(function (button) {
  button.addEventListener("click", function () {
    const code = button.querySelector("code");

    const encoded = masked[button.dataset.reveal];
    if (encoded) {
      const value = unmask(encoded);
      code.textContent = value;
      button.setAttribute("aria-label", "copy to clipboard");
      button.title = "copy to clipboard";
      delete button.dataset.reveal;

      const label = button.closest("li").querySelector("[data-reveal-link]");
      if (label) {
        const link = document.createElement("a");
        link.href = label.dataset.revealLink + ":" + value.replaceAll(" ", "");
        link.textContent = label.textContent;
        label.replaceWith(link);
      }
    }

    navigator.clipboard.writeText(code.textContent).then(
      function () {
        flash(button, "copied", "copied " + code.textContent + " to clipboard");
      },
      function () {
        flash(button, "failed", "copy failed");
      },
    );
  });
});
