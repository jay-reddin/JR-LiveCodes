"use strict";
(() => {
  // src/livecodes/utils/utils.ts
  var isMac = () => navigator.userAgent.includes("Mac") || navigator.platform.includes("Mac");
  var ctrl = (e) => isMac() ? e.metaKey : e.ctrlKey;

  // src/livecodes/editor/custom-editor-utils.ts
  document.addEventListener("keydown", function(e) {
    if (ctrl(e) && e.shiftKey && e.code === "KeyS") {
      e.preventDefault();
      parent.postMessage({ type: "customEditorCommand", payload: "fork" }, "*");
      return;
    }
    if (ctrl(e) && e.code === "KeyS") {
      e.preventDefault();
      parent.postMessage({ type: "customEditorCommand", payload: "save" }, "*");
      return;
    }
  });
})();
