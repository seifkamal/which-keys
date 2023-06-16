window.addEventListener("DOMContentLoaded", () => {
  const output = document.querySelector("output");
  if (!(output instanceof HTMLOutputElement)) {
    throw new Error("could not find output element");
  }

  /** @type {{ [key: string]: HTMLElement }} */
  let keys = {};
  const reset = () => {
    keys = {};
    output.innerHTML = "";
  };

  window.addEventListener("keydown", ({ key, code, repeat }) => {
    if (repeat || code in keys) {
      return;
    }
    const el = document.createElement("kbd");
    el.textContent = key;
    el.setAttribute("data-code", code);
    keys[code] = el;
    output.appendChild(el);
  });

  window.addEventListener("keyup", ({ key, code }) => {
    // Macos does not fire this event for keys released after the CMD key, so
    // as a workaround we just remove them all to avoid ghost keys.
    if (key === "Meta") {
      reset();
      return;
    }
    keys[code].remove();
    delete keys[code];
  });

  window.addEventListener("blur", reset);
});
