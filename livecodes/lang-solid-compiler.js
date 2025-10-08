"use strict";
(() => {
  // src/livecodes/utils/utils.ts
  var getLanguageCustomSettings = (language, config) => ({
    ...config.customSettings[language]
  });

  // src/livecodes/languages/solid/lang-solid-compiler.ts
  self.createSolidCompiler = () => {
    const Babel = self.Babel;
    Babel.registerPreset("solid", self.babelPresetSolid.solid);
    return async (code, { config, language }) => {
      const isTsx = language === "solid.tsx";
      const customSettings = getLanguageCustomSettings("solid", config);
      return window.Babel.transform(code, {
        ...customSettings,
        filename: "script." + (isTsx ? "tsx" : "jsx"),
        presets: [
          ["env", { modules: false }],
          ...Array.isArray(customSettings.presets) ? customSettings.presets : [],
          ...isTsx ? ["typescript"] : [],
          ["solid", { generate: "dom", hydratable: true }]
        ]
      }).code;
    };
  };
})();
