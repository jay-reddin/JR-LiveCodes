"use strict";
(() => {
  // src/livecodes/utils/utils.ts
  var getLanguageCustomSettings = (language, config) => ({
    ...config.customSettings[language]
  });

  // src/livecodes/languages/wat/lang-wat-compiler.ts
  var features = {
    exceptions: true,
    mutable_globals: true,
    sat_float_to_int: true,
    sign_extension: true,
    simd: true,
    threads: true,
    multi_value: true,
    tail_call: true,
    bulk_memory: true,
    reference_types: true
  };
  var watToArrayString = async (code, options = features) => {
    if (!code)
      return "";
    const wabt = await self.WabtModule();
    let arrayString = "";
    let module;
    try {
      module = wabt.parseWat("module.wat", code, options);
      module.resolveNames();
      module.validate(options);
      const binaryOutput = module.toBinary({
        log: true,
        write_debug_names: true
      });
      arrayString = binaryOutput.buffer?.toString() || "";
    } catch (e) {
      console.warn(e.toString());
    } finally {
      if (module)
        module.destroy();
    }
    return "Uint8Array [" + arrayString + "]";
  };
  self.createWatCompiler = () => async (code, { config }) => watToArrayString(code, {
    ...features,
    ...getLanguageCustomSettings("wat", config)
  });
})();
