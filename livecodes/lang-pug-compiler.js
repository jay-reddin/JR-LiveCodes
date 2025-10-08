"use strict";
(() => {
  // src/livecodes/utils/utils.ts
  var escapeCode = (code, slash = true) => code.replace(/\\/g, slash ? "\\\\" : "\\").replace(/`/g, "\\`").replace(/<\/script>/g, "<\\/script>");
  var getLanguageCustomSettings = (language, config) => ({
    ...config.customSettings[language]
  });

  // src/livecodes/languages/pug/lang-pug-compiler.ts
  self.createPugCompiler = () => async (code, { config }) => {
    const options = getLanguageCustomSettings("pug", config);
    const data = config.customSettings.template?.data || {};
    if (config.customSettings.template?.prerender !== false) {
      const fn = window.pug.compile(code, options);
      return fn(data);
    }
    const clientFnSrc = window.pug.compileClient(code, {
      ...options,
      name: "clientFn"
    });
    return `<!-- ... compiling ... -->

<script>
window.addEventListener("load", () => {
${clientFnSrc}
const content = clientFn({
...${escapeCode(JSON.stringify(data))},
...window.livecodes?.templateData,
});
document.body.innerHTML += content;
parent.postMessage({type: 'compiled', payload: {language: 'pug', content}}, '*');
});
<\/script>
`;
  };
})();
