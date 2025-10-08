"use strict";
(() => {
  // src/livecodes/utils/utils.ts
  var getLanguageCustomSettings = (language, config) => ({
    ...config.customSettings[language]
  });

  // src/livecodes/languages/assemblyscript/lang-assemblyscript-compiler.ts
  var watHeader = `;; WebAssembly Text Format (module.wat)

`;
  var wasmHeader = `

;; WebAssembly Binary (module.wasm)
;; `;
  var compile = async (code, options) => {
    await self.assemblyscriptLoaded;
    try {
      const { text, binary } = await self.assemblyscript.asc.compileString(code, options);
      if (!binary)
        return "";
      const arrayString = binary.toString();
      return watHeader + text + wasmHeader + "Uint8Array [" + arrayString + "]";
    } catch (err) {
      console.error(err);
      return "";
    }
  };
  self.createAssemblyscriptCompiler = () => (code, { config }) => compile(code, {
    optimizeLevel: 3,
    ...getLanguageCustomSettings("assemblyscript", config)
  });
})();
