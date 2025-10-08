"use strict";
(() => {
  // src/livecodes/languages/imba/lang-imba-compiler.ts
  self.createImbaCompiler = () => async (code) => {
    if (!code)
      return "";
    try {
      const compiled = self.imbac.compile(code, {
        platform: "web",
        format: "esm",
        sourcePath: "app.imba"
      });
      return compiled.js || "";
    } catch (err) {
      console.warn(err);
      return "";
    }
  };
})();
