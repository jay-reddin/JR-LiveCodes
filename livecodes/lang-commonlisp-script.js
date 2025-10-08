"use strict";
(() => {
  // src/livecodes/languages/commonlisp/lang-commonlisp-script.ts
  window.addEventListener("load", function() {
    const script = document.querySelector('script[type="text/commonlisp"]');
    const source = script?.innerHTML;
    if (source?.trim()) {
      window.jscl.evaluateString("(progn " + source + ")");
    }
  });
})();
