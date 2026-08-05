const copyStatus = document.getElementById("copy-status");

const masked = {
  p: "MjMgOTQgNDU5IDAzIDYzKw==",
};

function unmask(value) {
  return [...atob(value)].reverse().join("");
}

const FLASH_MS = 1250;
let statusTimer;

function flash(button, className, message) {
  button.classList.remove("copied", "failed");
  button.classList.add(className);
  copyStatus.textContent = message;

  clearTimeout(button.flashTimer);
  button.flashTimer = setTimeout(function () {
    button.classList.remove(className);
  }, FLASH_MS);

  // The status region is shared between buttons, so it needs its own timer.
  clearTimeout(statusTimer);
  statusTimer = setTimeout(function () {
    copyStatus.textContent = "";
  }, FLASH_MS);
}

document.querySelectorAll(".copy-chip").forEach(function (button) {
  button.addEventListener("click", function () {
    const code = button.querySelector("code");

    const encoded = masked[button.dataset.reveal];
    let revealed = false;
    if (encoded) {
      revealed = true;
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

    // The reveal above succeeds even when copying can't, so say so.
    const failMessage = revealed
      ? "phone number revealed, copy failed"
      : "copy failed";

    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      flash(button, "failed", failMessage);
      return;
    }

    navigator.clipboard.writeText(code.textContent).then(
      function () {
        flash(button, "copied", "copied " + code.textContent + " to clipboard");
      },
      function () {
        flash(button, "failed", failMessage);
      },
    );
  });
});
