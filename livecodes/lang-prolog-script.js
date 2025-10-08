"use strict";
(() => {
  // src/livecodes/languages/prolog/lang-prolog-script.ts
  livecodes.prolog = {
    createSession: async (options = {}) => {
      await livecodes.prolog.loaded;
      const limit = options.limit ?? 1e3;
      let code = "";
      const scripts = document.querySelectorAll('script[type="text/prolog"]');
      scripts.forEach((script) => code += script.innerHTML + "\n");
      const session = pl.create(limit);
      await session.promiseConsult(code);
      return session;
    },
    loaded: new Promise((resolve) => {
      window.addEventListener("load", resolve);
    })
  };
})();
