"use strict";
(() => {
  // src/livecodes/utils/utils.ts
  var typedArrayToBuffer = (array) => array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);

  // src/livecodes/languages/assemblyscript/lang-assemblyscript-script.ts
  var scriptType = "application/wasm-uint8";
  var watHeader = `;; WebAssembly Text Format (module.wat)

`;
  var wasmHeader = `

;; WebAssembly Binary (module.wasm)
;; `;
  window.livecodes.loadWasm = (importObject = {}) => new Promise((resolve) => {
    const stringToWasm = (code = "") => {
      if (!code) {
        return { text: "", binary: null };
      }
      const text = code.split(`${watHeader}`)[1].split(`${wasmHeader}`)[0];
      const arrayString = code.split(`${wasmHeader}`)[1].split("[")[1].slice(0, -1);
      const binary = new Uint8Array(arrayString.split(",").map(Number));
      return { text, binary };
    };
    window.addEventListener("load", () => {
      const script = document.querySelector(`script[type="${scriptType}"]`);
      const { text, binary } = stringToWasm(script?.innerHTML);
      if (!binary) {
        resolve({ wasmModule: { exports: {} }, text, binary });
      } else {
        const binaryBuffer = typedArrayToBuffer(binary);
        loader.instantiate(binaryBuffer, importObject).then((wasmModule) => {
          resolve({ wasmModule, text, binary });
        });
      }
    });
  });
})();
