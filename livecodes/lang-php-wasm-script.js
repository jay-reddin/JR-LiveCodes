"use strict";
(() => {
  // src/livecodes/languages/php-wasm/lang-php-wasm-script.ts
  var php = new phpWasm.PHP();
  php.addEventListener("ready", () => {
    const timeZone = window.Intl?.DateTimeFormat?.().resolvedOptions().timeZone || "UTC";
    php.run(`<?php date_default_timezone_set('${timeZone}');`);
  });
  var runPhpScript = (element) => {
    const inlineCode = element?.innerText?.trim();
    if (!inlineCode)
      return;
    const output = document.createElement("div");
    element.parentNode?.insertBefore(output, element.nextSibling);
    let buffer = "";
    php.addEventListener("output", (event) => buffer += event.detail);
    php.addEventListener("ready", () => {
      php.run(inlineCode).then(() => {
        output.innerHTML = buffer;
      });
    });
    php.addEventListener("error", (event) => {
      event.detail.forEach((error) => {
        error = error.trim();
        if (error)
          console.log(error);
      });
    });
  };
  addEventListener("load", () => {
    const phpSelector = 'script[type="text/php-wasm"]';
    const phpNodes = document.querySelectorAll(phpSelector);
    for (const phpNode of phpNodes) {
      runPhpScript(phpNode);
    }
  });
})();
