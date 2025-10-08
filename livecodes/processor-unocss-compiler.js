"use strict";
(() => {
  // src/livecodes/utils/utils.ts
  var getLanguageCustomSettings = (language, config) => ({
    ...config.customSettings[language]
  });

  // src/livecodes/languages/unocss/processor-unocss-compiler.ts
  self.createUnocssCompiler = () => {
    const unocss = self.unocss;
    const { createGenerator, defineConfig } = unocss;
    return async (css, { config, options }) => {
      const html = `<template>${options.html}
<script>${config.script.content}<\/script></template>`;
      const customSettings = getLanguageCustomSettings("unocss", config);
      const loadPresets = (presetsObj = {}) => Object.keys(presetsObj).filter((key) => presetsObj[key] && key in unocss).map((key) => {
        const config2 = presetsObj[key];
        if (typeof config2 === "object") {
          return unocss[key](config2);
        } else {
          return unocss[key]();
        }
      });
      const defaultConfig = defineConfig({
        presets: loadPresets({
          presetUno: true,
          presetAttributify: true,
          presetIcons: {
            cdn: "https://esm.sh/"
          }
        })
      });
      const { presets, ...userConfig } = customSettings;
      if (presets) {
        userConfig.presets = loadPresets(presets);
      }
      const uno = await createGenerator(userConfig, defaultConfig);
      const { css: generatedStyles } = await uno.generate(html);
      return generatedStyles.trim() ? generatedStyles + "\n\n" + css : css;
    };
  };
})();
