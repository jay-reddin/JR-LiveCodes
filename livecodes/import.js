var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/lz-string/libs/lz-string.js
var require_lz_string = __commonJS({
  "node_modules/lz-string/libs/lz-string.js"(exports, module) {
    var LZString = function() {
      var f = String.fromCharCode;
      var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
      var baseReverseDic = {};
      function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
          baseReverseDic[alphabet] = {};
          for (var i = 0; i < alphabet.length; i++) {
            baseReverseDic[alphabet][alphabet.charAt(i)] = i;
          }
        }
        return baseReverseDic[alphabet][character];
      }
      var LZString2 = {
        compressToBase64: function(input) {
          if (input == null)
            return "";
          var res = LZString2._compress(input, 6, function(a) {
            return keyStrBase64.charAt(a);
          });
          switch (res.length % 4) {
            default:
            case 0:
              return res;
            case 1:
              return res + "===";
            case 2:
              return res + "==";
            case 3:
              return res + "=";
          }
        },
        decompressFromBase64: function(input) {
          if (input == null)
            return "";
          if (input == "")
            return null;
          return LZString2._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrBase64, input.charAt(index));
          });
        },
        compressToUTF16: function(input) {
          if (input == null)
            return "";
          return LZString2._compress(input, 15, function(a) {
            return f(a + 32);
          }) + " ";
        },
        decompressFromUTF16: function(compressed) {
          if (compressed == null)
            return "";
          if (compressed == "")
            return null;
          return LZString2._decompress(compressed.length, 16384, function(index) {
            return compressed.charCodeAt(index) - 32;
          });
        },
        //compress into uint8array (UCS-2 big endian format)
        compressToUint8Array: function(uncompressed) {
          var compressed = LZString2.compress(uncompressed);
          var buf = new Uint8Array(compressed.length * 2);
          for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
            var current_value = compressed.charCodeAt(i);
            buf[i * 2] = current_value >>> 8;
            buf[i * 2 + 1] = current_value % 256;
          }
          return buf;
        },
        //decompress from uint8array (UCS-2 big endian format)
        decompressFromUint8Array: function(compressed) {
          if (compressed === null || compressed === void 0) {
            return LZString2.decompress(compressed);
          } else {
            var buf = new Array(compressed.length / 2);
            for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
              buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
            }
            var result = [];
            buf.forEach(function(c) {
              result.push(f(c));
            });
            return LZString2.decompress(result.join(""));
          }
        },
        //compress into a string that is already URI encoded
        compressToEncodedURIComponent: function(input) {
          if (input == null)
            return "";
          return LZString2._compress(input, 6, function(a) {
            return keyStrUriSafe.charAt(a);
          });
        },
        //decompress from an output of compressToEncodedURIComponent
        decompressFromEncodedURIComponent: function(input) {
          if (input == null)
            return "";
          if (input == "")
            return null;
          input = input.replace(/ /g, "+");
          return LZString2._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrUriSafe, input.charAt(index));
          });
        },
        compress: function(uncompressed) {
          return LZString2._compress(uncompressed, 16, function(a) {
            return f(a);
          });
        },
        _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
          if (uncompressed == null)
            return "";
          var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
          for (ii = 0; ii < uncompressed.length; ii += 1) {
            context_c = uncompressed.charAt(ii);
            if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
              context_dictionary[context_c] = context_dictSize++;
              context_dictionaryToCreate[context_c] = true;
            }
            context_wc = context_w + context_c;
            if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
              context_w = context_wc;
            } else {
              if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 8; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                } else {
                  value = 1;
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = 0;
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 16; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }
                delete context_dictionaryToCreate[context_w];
              } else {
                value = context_dictionary[context_w];
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              context_dictionary[context_wc] = context_dictSize++;
              context_w = String(context_c);
            }
          }
          if (context_w !== "") {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
              if (context_w.charCodeAt(0) < 256) {
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 8; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              } else {
                value = 1;
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = 0;
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 16; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              delete context_dictionaryToCreate[context_w];
            } else {
              value = context_dictionary[context_w];
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
          }
          value = 2;
          for (i = 0; i < context_numBits; i++) {
            context_data_val = context_data_val << 1 | value & 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
          while (true) {
            context_data_val = context_data_val << 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data.push(getCharFromInt(context_data_val));
              break;
            } else
              context_data_position++;
          }
          return context_data.join("");
        },
        decompress: function(compressed) {
          if (compressed == null)
            return "";
          if (compressed == "")
            return null;
          return LZString2._decompress(compressed.length, 32768, function(index) {
            return compressed.charCodeAt(index);
          });
        },
        _decompress: function(length, resetValue, getNextValue) {
          var dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = { val: getNextValue(0), position: resetValue, index: 1 };
          for (i = 0; i < 3; i += 1) {
            dictionary[i] = i;
          }
          bits = 0;
          maxpower = Math.pow(2, 2);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          switch (next = bits) {
            case 0:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 1:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 2:
              return "";
          }
          dictionary[3] = c;
          w = c;
          result.push(c);
          while (true) {
            if (data.index > length) {
              return "";
            }
            bits = 0;
            maxpower = Math.pow(2, numBits);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            switch (c = bits) {
              case 0:
                bits = 0;
                maxpower = Math.pow(2, 8);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 1:
                bits = 0;
                maxpower = Math.pow(2, 16);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 2:
                return result.join("");
            }
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
            if (dictionary[c]) {
              entry = dictionary[c];
            } else {
              if (c === dictSize) {
                entry = w + w.charAt(0);
              } else {
                return null;
              }
            }
            result.push(entry);
            dictionary[dictSize++] = w + entry.charAt(0);
            enlargeIn--;
            w = entry;
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
          }
        }
      };
      return LZString2;
    }();
    if (false) {
      (void 0)(function() {
        return LZString;
      });
    } else if (typeof module !== "undefined" && module != null) {
      module.exports = LZString;
    }
  }
});

// src/livecodes/config/default-config.ts
var defaultConfig = {
  title: "Untitled Project",
  description: "",
  head: `<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
  htmlAttrs: 'lang="en" class=""',
  tags: [],
  autoupdate: true,
  autosave: false,
  autotest: false,
  delay: 1500,
  formatOnsave: false,
  view: "split",
  mode: "full",
  theme: "dark",
  themeColor: void 0,
  layout: "responsive",
  editorTheme: void 0,
  appLanguage: void 0,
  recoverUnsaved: true,
  showSpacing: false,
  welcome: true,
  readonly: false,
  allowLangChange: true,
  activeEditor: void 0,
  languages: void 0,
  markup: {
    language: "html",
    content: ""
  },
  style: {
    language: "css",
    content: ""
  },
  script: {
    language: "javascript",
    content: ""
  },
  stylesheets: [],
  scripts: [],
  cssPreset: "",
  imports: {},
  types: {},
  tests: {
    language: "typescript",
    content: ""
  },
  tools: {
    enabled: "all",
    active: "",
    status: ""
  },
  zoom: 1,
  processors: [],
  customSettings: {},
  editor: void 0,
  fontFamily: void 0,
  fontSize: void 0,
  useTabs: false,
  tabSize: 2,
  lineNumbers: true,
  wordWrap: false,
  closeBrackets: true,
  foldRegions: false,
  semicolons: true,
  singleQuote: false,
  trailingComma: true,
  emmet: true,
  enableAI: false,
  editorMode: void 0,
  version: "47"
};

// src/livecodes/utils/utils.ts
var escapeCode = (code, slash = true) => code.replace(/\\/g, slash ? "\\\\" : "\\").replace(/`/g, "\\`").replace(/<\/script>/g, "<\\/script>");
var loadScript = (url3, name) => new Promise((resolve, reject) => {
  if (name && globalThis[name]) {
    return resolve(globalThis[name]);
  }
  if (typeof globalThis.importScripts === "function") {
    globalThis.importScripts(url3);
    if (name && globalThis[name]) {
      return resolve(globalThis[name]);
    }
    return resolve(globalThis);
  }
  const script = document.createElement("script");
  script.src = url3;
  script.async = true;
  const removeEventListeners = () => {
    script.removeEventListener("load", onLoad);
    script.removeEventListener("error", onError);
  };
  const onLoad = () => {
    removeEventListeners();
    if (!name) {
      return resolve("loaded: " + url3);
    }
    const i = setInterval(() => {
      if (window[name]) {
        clearInterval(i);
        return resolve(window[name]);
      }
    }, 5);
  };
  const onError = () => {
    removeEventListeners();
    reject("failed to load: " + url3);
  };
  script.addEventListener("load", onLoad);
  script.addEventListener("error", onError);
  document.head.appendChild(script);
});
var handleFetchError = (res) => res.ok ? res : Promise.reject();
var fetchWithHandler = (input, init) => fetch(input, init).then(handleFetchError);
var blobToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject();
  reader.onerror = (error) => reject(error);
});
var getLanguageCustomSettings = (language, config) => ({
  ...config.customSettings[language]
});
var getValidUrl = (url3) => {
  if (!url3)
    return null;
  let validUrl = null;
  if (url3.startsWith("http") || url3.startsWith("data:")) {
    try {
      validUrl = new URL(url3).href;
    } catch {
      try {
        validUrl = new URL(decodeURIComponent(url3)).href;
      } catch {
      }
    }
  }
  return validUrl;
};
var predefinedValues = {
  APP_VERSION: "47",
  SDK_VERSION: "0.12.0",
  COMMIT_SHA: "7b4906d",
  REPO_URL: "https://github.com/live-codes/livecodes",
  DOCS_BASE_URL: "http://localhost:3000/docs/"
};

// src/livecodes/html/import.html?raw
var import_default = '<div id="import-container" class="modal-container">\r\n  <div class="modal-title" data-i18n="import.heading">Import</div>\r\n  <div id="import-screens" class="modal-screen-container">\r\n    <ul id="import-tabs" class="modal-tabs">\r\n      <li class="active">\r\n        <a href="#" data-target="import-code" data-i18n="import.code.heading">Import Code</a>\r\n      </li>\r\n      <li>\r\n        <a href="#" data-target="import-json" data-i18n="import.json.heading"\r\n          >Import Project JSON</a\r\n        >\r\n      </li>\r\n      <li>\r\n        <a href="#" data-target="bulk-import-json" data-i18n="import.bulk.heading">Bulk Import</a>\r\n      </li>\r\n    </ul>\r\n\r\n    <div id="import-code" class="tab-content active">\r\n      <div class="modal-screen">\r\n        <form id="url-import-form">\r\n          <label for="code-url" data-i18n="import.generic.url">URL</label>\r\n          <br />\r\n          <input type="text" dir="ltr" id="code-url" placeholder="https://" />\r\n          <button\r\n            id="url-import-btn"\r\n            class="wide-button"\r\n            type="submit"\r\n            data-i18n="import.code.fromURL"\r\n          >\r\n            Import from URL\r\n          </button>\r\n        </form>\r\n        <form id="local-code-import-form">\r\n          <label for="local-code-input" data-i18n="import.generic.file">Local file</label>\r\n          <br />\r\n          <label\r\n            for="local-code-input"\r\n            class="file-input-label"\r\n            data-i18n="import.code.fromFile"\r\n            tabindex="0"\r\n            >Import local files</label\r\n          >\r\n          <input type="file" id="local-code-input" class="file-input" multiple />\r\n        </form>\r\n        <div class="description help" data-i18n="import.code.desc" data-i18n-prop="innerHTML">\r\n          Supported Sources:\r\n          <ul>\r\n            <li>GitHub gist</li>\r\n            <li>GitHub file</li>\r\n            <li>Directory in a GitHub repo</li>\r\n            <li>Gitlab snippet</li>\r\n            <li>Gitlab file</li>\r\n            <li>Directory in a Gitlab repo</li>\r\n            <li>JS Bin</li>\r\n            <li>Raw code</li>\r\n            <li>Code in web page DOM</li>\r\n            <li>Code in zip file</li>\r\n            <li>Code in image (OCR)</li>\r\n            <li>Official playgrounds<br />(TypeScript and Vue)</li>\r\n          </ul>\r\n          Please visit the\r\n          <a href="{{DOCS_BASE_URL}}features/import" target="_blank" rel="noopener"\r\n            >documentations</a\r\n          >\r\n          for details.\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div id="import-json" class="tab-content">\r\n      <div class="modal-screen">\r\n        <div class="description confirm" data-i18n="import.json.desc" data-i18n-prop="innerHTML">\r\n          Import a single project JSON to editor. A project can be exported from\r\n          app&nbsp;menu&nbsp;\u2192 Export&nbsp;\u2192 Export&nbsp;Project&nbsp;(JSON).\r\n        </div>\r\n        <form id="json-url-import-form">\r\n          <label for="json-url" data-i18n="import.generic.url">URL</label>\r\n          <br />\r\n          <input type="text" dir="ltr" id="json-url" placeholder="https://" />\r\n          <button\r\n            id="json-url-import-btn"\r\n            class="wide-button"\r\n            type="submit"\r\n            data-i18n="import.json.fromURL"\r\n          >\r\n            Import project from URL\r\n          </button>\r\n        </form>\r\n        <form id="file-url-import-form">\r\n          <label for="file-input" data-i18n="import.generic.file">Local file</label>\r\n          <br />\r\n          <label\r\n            for="file-input"\r\n            class="file-input-label"\r\n            data-i18n="import.json.fromFile"\r\n            tabindex="0"\r\n            >Import project from local file</label\r\n          >\r\n          <input type="file" id="file-input" class="file-input" accept="application/json" />\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div id="bulk-import-json" class="tab-content">\r\n      <div class="modal-screen">\r\n        <div class="description help" data-i18n="import.bulk.desc" data-i18n-prop="innerHTML">\r\n          Bulk import multiple projects to your saved projects. Projects can be exported from the\r\n          <a href="#" id="link-to-saved-projects">Saved Projects</a> screen.\r\n        </div>\r\n        <form id="bulk-json-url-import-form">\r\n          <label for="bulk-json-url" data-i18n="import.generic.url">URL</label>\r\n          <br />\r\n          <input type="text" dir="ltr" id="bulk-json-url" placeholder="https://" />\r\n          <button\r\n            id="bulk-json-url-import-btn"\r\n            class="wide-button"\r\n            type="submit"\r\n            data-i18n="import.bulk.fromURL"\r\n          >\r\n            Bulk import from URL\r\n          </button>\r\n        </form>\r\n        <form id="bulk-file-url-import-form">\r\n          <label for="bulk-file-input" data-i18n="import.generic.file">Local file</label>\r\n          <br />\r\n          <label\r\n            for="bulk-file-input"\r\n            class="file-input-label"\r\n            data-i18n="import.bulk.fromFile"\r\n            tabindex="0"\r\n            >Bulk import from local file</label\r\n          >\r\n          <input type="file" id="bulk-file-input" class="file-input" accept="application/json" />\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n';

// src/livecodes/html/index.ts
var replaceValues = (str) => Object.entries(predefinedValues).reduce(
  (str2, [key, value]) => str2.replace(new RegExp(`{{${key}}}`, "g"), value),
  str
);
var importScreen = /* @__PURE__ */ replaceValues(import_default);

// src/livecodes/services/modules.ts
var moduleCDNs = [
  "esm.sh",
  "skypack",
  "esm.run",
  "jsdelivr.esm",
  "fastly.jsdelivr.esm",
  "gcore.jsdelivr.esm",
  "testingcf.jsdelivr.esm",
  "jsdelivr.b-cdn.esm",
  "jspm"
];
var npmCDNs = [
  "jsdelivr",
  "fastly.jsdelivr",
  "unpkg",
  "gcore.jsdelivr",
  "testingcf.jsdelivr",
  "jsdelivr.b-cdn",
  "npmcdn"
];
var ghCDNs = [
  "jsdelivr.gh",
  "fastly.jsdelivr.gh",
  "statically",
  "gcore.jsdelivr.gh",
  "testingcf.jsdelivr.gh",
  "jsdelivr.b-cdn.gh"
];
var modulesService = {
  getModuleUrl: (moduleName, {
    isModule = true,
    defaultCDN = "esm.sh",
    external
  } = {}) => {
    moduleName = moduleName.replace(/#nobundle/g, "");
    const addExternalParam = (url3) => !external || !url3.includes("https://esm.sh") ? url3 : url3.includes("?") ? `${url3}&external=${external}` : `${url3}?external=${external}`;
    const moduleUrl = getCdnUrl(moduleName, isModule, defaultCDN);
    if (moduleUrl) {
      return addExternalParam(moduleUrl);
    }
    return isModule ? addExternalParam("https://esm.sh/" + moduleName) : "https://cdn.jsdelivr.net/npm/" + moduleName;
  },
  getUrl: (path, cdn) => path.startsWith("http") || path.startsWith("data:") ? path : getCdnUrl(path, false, cdn || getAppCDN()) || path,
  cdnLists: { npm: npmCDNs, module: moduleCDNs, gh: ghCDNs },
  checkCDNs: async (testModule, preferredCDN) => {
    const cdns = [preferredCDN, ...modulesService.cdnLists.npm].filter(Boolean);
    for (const cdn of cdns) {
      try {
        const res = await fetch(modulesService.getUrl(testModule, cdn), {
          method: "HEAD"
        });
        if (res.ok)
          return cdn;
      } catch {
      }
    }
    return modulesService.cdnLists.npm[0];
  }
};
var getAppCDN = () => {
  if (globalThis.appCDN)
    return globalThis.appCDN;
  try {
    const url3 = new URL(location.href);
    return url3.searchParams.get("appCDN") || modulesService.cdnLists.npm[0];
  } catch {
    return modulesService.cdnLists.npm[0];
  }
};
var getCdnUrl = (modName, isModule, defaultCDN) => {
  const post = isModule && modName.startsWith("unpkg:") ? "?module" : "";
  if (modName.startsWith("gh:")) {
    modName = modName.replace("gh", ghCDNs[0]);
  } else if (!modName.includes(":")) {
    const prefix = defaultCDN || (isModule ? moduleCDNs[0] : npmCDNs[0]);
    modName = prefix + ":" + modName;
  }
  for (const i of TEMPLATES) {
    const [pattern, template] = i;
    if (pattern.test(modName)) {
      return modName.replace(pattern, template) + post;
    }
  }
  return null;
};
var TEMPLATES = [
  [/^(esm\.sh:)(.+)/i, "https://esm.sh/$2"],
  [/^(npm:)(.+)/i, "https://esm.sh/$2"],
  [/^(node:)(.+)/i, "https://esm.sh/$2"],
  [/^(jsr:)(.+)/i, "https://esm.sh/jsr/$2"],
  [/^(pr:)(.+)/i, "https://esm.sh/pr/$2"],
  [/^(pkg\.pr\.new:)(.+)/i, "https://esm.sh/pkg.pr.new/$2"],
  [/^(skypack:)(.+)/i, "https://cdn.skypack.dev/$2"],
  [/^(jsdelivr:)(.+)/i, "https://cdn.jsdelivr.net/npm/$2"],
  [/^(fastly\.jsdelivr:)(.+)/i, "https://fastly.jsdelivr.net/npm/$2"],
  [/^(gcore\.jsdelivr:)(.+)/i, "https://gcore.jsdelivr.net/npm/$2"],
  [/^(testingcf\.jsdelivr:)(.+)/i, "https://testingcf.jsdelivr.net/npm/$2"],
  [/^(jsdelivr\.b-cdn:)(.+)/i, "https://jsdelivr.b-cdn.net/npm/$2"],
  [/^(jsdelivr\.gh:)(.+)/i, "https://cdn.jsdelivr.net/gh/$2"],
  [/^(fastly\.jsdelivr\.gh:)(.+)/i, "https://fastly.jsdelivr.net/gh/$2"],
  [/^(gcore\.jsdelivr\.gh:)(.+)/i, "https://gcore.jsdelivr.net/gh/$2"],
  [/^(testingcf\.jsdelivr\.gh:)(.+)/i, "https://testingcf.jsdelivr.net/gh/$2"],
  [/^(jsdelivr\.b-cdn\.gh:)(.+)/i, "https://jsdelivr.b-cdn.net/gh/$2"],
  [/^(statically:)(.+)/i, "https://cdn.statically.io/gh/$2"],
  [/^(esm\.run:)(.+)/i, "https://esm.run/$2"],
  [/^(jsdelivr\.esm:)(.+)/i, "https://cdn.jsdelivr.net/npm/$2/+esm"],
  [/^(fastly\.jsdelivr\.esm:)(.+)/i, "https://fastly.jsdelivr.net/npm/$2/+esm"],
  [/^(gcore\.jsdelivr\.esm:)(.+)/i, "https://gcore.jsdelivr.net/npm/$2/+esm"],
  [/^(testingcf\.jsdelivr\.esm:)(.+)/i, "https://testingcf.jsdelivr.net/npm/$2/+esm"],
  [/^(jsdelivr\.b-cdn\.esm:)(.+)/i, "https://jsdelivr.b-cdn.net/npm/$2/+esm"],
  [/^(jspm:)(.+)/i, "https://jspm.dev/$2"],
  [/^(esbuild:)(.+)/i, "https://esbuild.vercel.app/$2"],
  [/^(bundle\.run:)(.+)/i, "https://bundle.run/$2"],
  [/^(unpkg:)(.+)/i, "https://unpkg.com/$2"],
  [/^(npmcdn:)(.+)/i, "https://npmcdn.com/$2"],
  [/^(bundlejs:)(.+)/i, "https://deno.bundlejs.com/?file&q=$2"],
  [/^(bundle:)(.+)/i, "https://deno.bundlejs.com/?file&q=$2"],
  [/^(deno:)(.+)/i, "https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],
  [/^(https:\/\/deno\.land\/.+)/i, "https://deno.bundlejs.com/?file&q=$1"],
  [
    /^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,
    "https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"
  ],
  [/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i, "https://gist.githack.com/$2"],
  [
    /^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,
    "https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"
  ],
  [
    /^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,
    "https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"
  ],
  // snippet file URL from web interface, with revision
  [
    /^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,
    "https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"
  ],
  // snippet file URL from web interface, no revision
  [
    /^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,
    "https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"
  ],
  // snippet file URLs from REST API
  [
    /^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,
    "https://bb.githack.com/!api/2.0/snippets/$2/files/$3"
  ],
  [
    /^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,
    "https://bb.githack.com/!api/2.0/snippets/$2/files/$3"
  ],
  [/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i, "https://gist.githack.com/$2"],
  [
    /^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,
    "https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"
  ]
];

// src/livecodes/vendors.ts
var { getUrl, getModuleUrl } = modulesService;
var vendorsBaseUrl = (
  // 'http://127.0.0.1:8081/';
  /* @__PURE__ */ getUrl("@live-codes/browser-compilers@0.22.3/dist/")
);
var artTemplateUrl = /* @__PURE__ */ getUrl("art-template@4.13.2/lib/template-web.js");
var assemblyscriptLoaderUrl = /* @__PURE__ */ getUrl(
  "@assemblyscript/loader@0.27.29/umd/index.js"
);
var astroBaseUrl = /* @__PURE__ */ getUrl("@hatemhosny/astro-internal@0.0.4/");
var babelUrl = /* @__PURE__ */ getUrl("@babel/standalone@7.26.4/babel.js");
var brythonBaseUrl = /* @__PURE__ */ getUrl("brython@3.12.4/");
var cherryCljsBaseUrl = /* @__PURE__ */ getUrl("cherry-cljs@0.2.19/");
var clioBaseUrl = /* @__PURE__ */ getUrl(
  "@live-codes/clio-browser-compiler@0.0.3/public/build/"
);
var dotUrl = /* @__PURE__ */ getUrl("dot@1.1.3/doT.js");
var ejsUrl = /* @__PURE__ */ getUrl("ejs@3.1.10/ejs.js");
var etaUrl = /* @__PURE__ */ getUrl("eta@3.4.0/dist/eta.umd.js");
var go2jsBaseUrl = /* @__PURE__ */ getUrl("@live-codes/go2js@0.5.0/build/");
var handlebarsBaseUrl = /* @__PURE__ */ getUrl("handlebars@4.7.8/dist/");
var highlightjsUrl = /* @__PURE__ */ getModuleUrl("highlight.js@11.11.1");
var imbaBaseUrl = /* @__PURE__ */ getUrl("imba@2.0.0-alpha.229/dist/");
var jsZipUrl = /* @__PURE__ */ getUrl("jszip@3.10.1/dist/jszip.js");
var liquidJsUrl = /* @__PURE__ */ getUrl("liquidjs@10.14.0/dist/liquid.browser.min.js");
var malinaBaseUrl = /* @__PURE__ */ getUrl(`malinajs@0.7.19/`);
var markedUrl = /* @__PURE__ */ getUrl("marked@13.0.2/marked.min.js");
var metaPngUrl = /* @__PURE__ */ getUrl("meta-png@1.0.6/dist/meta-png.umd.js");
var mjmlUrl = /* @__PURE__ */ getUrl("mjml-browser@4.15.3/lib/index.js");
var mustacheUrl = /* @__PURE__ */ getUrl("mustache@4.2.0/mustache.js");
var nunjucksBaseUrl = /* @__PURE__ */ getUrl("nunjucks@3.2.4/browser/");
var opalBaseUrl = /* @__PURE__ */ getUrl("https://cdn.opalrb.com/opal/1.8.2/");
var parinferUrl = /* @__PURE__ */ getUrl("parinfer@3.13.1/parinfer.js");
var prettierBaseUrl = /* @__PURE__ */ getUrl("prettier@3.3.2/");
var prettierPhpUrl = /* @__PURE__ */ getUrl("@prettier/plugin-php@0.22.2/standalone.js");
var riotBaseUrl = /* @__PURE__ */ getUrl("riot@9.2.2/");
var sqlFormatterUrl = /* @__PURE__ */ getUrl(
  "sql-formatter@12.2.1/dist/sql-formatter.min.js"
);
var sqljsBaseUrl = /* @__PURE__ */ getUrl("sql.js@1.10.3/dist/");
var squintCljsBaseUrl = /* @__PURE__ */ getUrl("squint-cljs@0.4.81/");
var stencilUrl = /* @__PURE__ */ getUrl("@stencil/core@3.2.2/compiler/stencil.js");
var svelteBaseUrl = /* @__PURE__ */ getUrl("svelte@5.12.0/");
var tesseractUrl = /* @__PURE__ */ getUrl("tesseract.js@6.0.1/dist/tesseract.esm.min.js");
var twigUrl = /* @__PURE__ */ getUrl("twig@1.17.1/twig.min.js");
var typescriptUrl = /* @__PURE__ */ getUrl(`typescript@5.6.2/lib/typescript.js`);
var uniterUrl = /* @__PURE__ */ getUrl("uniter@2.18.0/dist/uniter.js");
var vue2CdnUrl = /* @__PURE__ */ getUrl("vue@2");
var vueRuntimeUrl = /* @__PURE__ */ getUrl("vue@3/dist/vue.runtime.esm-browser.prod.js");
var vueSDKUrl = /* @__PURE__ */ getUrl(`livecodes@${"0.12.0"}/vue.js`);
var vueSfcLoaderCdnBaseUrl = /* @__PURE__ */ getUrl("vue3-sfc-loader@0.9.5/dist/");

// src/livecodes/languages/prettier.ts
var prettierUrl = prettierBaseUrl + "standalone.js";
var parserPlugins = {
  babel: prettierBaseUrl + "plugins/babel.js",
  estree: prettierBaseUrl + "plugins/estree.js",
  glimmer: prettierBaseUrl + "plugins/glimmer.js",
  html: prettierBaseUrl + "plugins/html.js",
  markdown: prettierBaseUrl + "plugins/markdown.js",
  postcss: prettierBaseUrl + "plugins/postcss.js",
  php: prettierPhpUrl,
  pug: vendorsBaseUrl + "prettier/parser-pug.js",
  java: vendorsBaseUrl + "prettier/parser-java.js"
};

// src/livecodes/languages/art-template/lang-art-template.ts
var artTemplate = {
  name: "art-template",
  title: "art",
  longTitle: "art-template",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    url: artTemplateUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-art-template-compiler.js");
      return self.createArtTemplateCompiler();
    }
  },
  extensions: ["art", "art-template"],
  editor: "markup",
  editorLanguage: "html"
};

// src/livecodes/languages/utils.ts
var getLanguageByAlias = (alias = "") => {
  if (!alias)
    return;
  const aliasLowerCase = alias?.toLowerCase();
  return window.deps.languages.find(
    (language) => language.name === aliasLowerCase || language.title.toLowerCase() === aliasLowerCase || language.extensions.map((ext) => ext.toLowerCase()).includes(aliasLowerCase)
  )?.name;
};
var getLanguageEditorId = (alias = "") => window.deps.languages.find((lang) => lang.name === getLanguageByAlias(alias))?.editor;
var detectLanguage = async (code, languages) => {
  window.HighlightJS = window.HighlightJS || (await import(highlightjsUrl)).default;
  const result = window.HighlightJS.highlightAuto(code, languages);
  return {
    language: result.language,
    secondBest: result.secondBest.language
  };
};

// src/livecodes/languages/assemblyscript/lang-assemblyscript.ts
var assemblyscriptUrl = vendorsBaseUrl + "assemblyscript/assemblyscript.js";
var assemblyscript = {
  name: "assemblyscript",
  title: "AS",
  longTitle: "AssemblyScript",
  parser: {
    name: "babel-ts",
    pluginUrls: [parserPlugins.babel]
  },
  compiler: {
    url: assemblyscriptUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-assemblyscript-compiler.js");
      return self.createAssemblyscriptCompiler();
    },
    scripts: ({ baseUrl }) => [
      assemblyscriptLoaderUrl,
      baseUrl + "lang-assemblyscript-script.js"
    ],
    scriptType: "application/wasm-uint8",
    compiledCodeLanguage: "wat",
    types: {
      assemblyscript: {
        url: vendorsBaseUrl + "types/assemblyscript.d.ts",
        declareAsModule: false,
        autoload: true
      }
    }
  },
  extensions: ["as", "ts"],
  editor: "script",
  editorLanguage: "typescript"
};

// src/livecodes/languages/astro/lang-astro.ts
var compilerURL = astroBaseUrl + "compiler.min.js";
var astro = {
  name: "astro",
  title: "Astro",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html, parserPlugins.babel]
  },
  compiler: {
    url: compilerURL,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-astro-compiler.js");
      return self.createAstroCompiler();
    }
  },
  extensions: ["astro"],
  editor: "markup"
};

// src/livecodes/languages/babel/lang-babel.ts
var babel = {
  name: "babel",
  title: "Babel",
  parser: {
    name: "babel",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: {
    url: babelUrl,
    factory: () => async (code, { config }) => {
      const babelConfig = getLanguageCustomSettings("babel", config);
      const presetEnvConfig = getLanguageCustomSettings("@babel/preset-env", config);
      const presetTsConfig = getLanguageCustomSettings("@babel/preset-typescript", config);
      const presetReactConfig = getLanguageCustomSettings("@babel/preset-react", config);
      return window.Babel.transform(code, {
        filename: "script.tsx",
        presets: [
          ["env", { modules: false, ...presetEnvConfig }],
          ["typescript", presetTsConfig],
          ["react", presetReactConfig]
        ],
        ...babelConfig
      }).code;
    }
  },
  extensions: ["es", "babel"],
  editor: "script",
  editorLanguage: "typescript"
};

// src/livecodes/languages/bbcode/lang-bbcode.ts
var bbcode = {
  name: "bbcode",
  title: "BBCode",
  compiler: {
    url: vendorsBaseUrl + "bbob/bbob.js",
    factory: () => async (code) => self.BBob.bbobHTML(code, self.BBob.presetHTML5())
  },
  extensions: ["bbcode", "bb"],
  editor: "markup"
};

// src/livecodes/languages/civet/lang-civet.ts
var civetUrl = vendorsBaseUrl + "civet/civet.js";

// src/livecodes/languages/clio/lang-clio.ts
var clio = {
  name: "clio",
  title: "Clio",
  compiler: {
    url: clioBaseUrl + "compile.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-clio-compiler.js");
      return self.createClioCompiler();
    },
    scripts: [clioBaseUrl + "exec.js"]
  },
  extensions: ["clio"],
  editor: "script",
  editorLanguage: "coffeescript"
};

// src/livecodes/compiler/utils.ts
var getCompileResult = (result) => {
  if (typeof result === "string") {
    return { code: result, info: {} };
  }
  return result;
};

// src/livecodes/compiler/compile-in-compiler.ts
var compileInCompiler = async (content, language, config, options = {}, worker = self) => new Promise((resolve) => {
  if (!content || !language || !config) {
    return resolve(getCompileResult(""));
  }
  const handler = async function(ev) {
    const message = ev.data.payload;
    if (ev.data.trigger === "compileInCompiler" && message?.content === content && message?.language === language) {
      worker.removeEventListener("message", handler);
      resolve(getCompileResult(message.compiled));
    }
  };
  worker.addEventListener("message", handler);
  worker.postMessage({
    type: "compileInCompiler",
    payload: { content, language, config, options }
  });
});

// src/livecodes/services/allowed-origin.ts
var allowedOrigin = (origin = location.origin) => Boolean(
  origin && (origin.endsWith("livecodes.io") || origin.endsWith("livecodes.pages.dev") || origin.endsWith("localpen.pages.dev") || origin.includes("127.0.0.1") || origin.includes("localhost:") || origin.endsWith("localhost") || origin.endsWith(".test"))
);

// src/livecodes/utils/compression.ts
var import_lz_string = __toESM(require_lz_string());
var decompress = (compressed, isJSON = true) => {
  const decoded = (0, import_lz_string.decompressFromEncodedURIComponent)(compressed);
  if (decoded) {
    if (!isJSON)
      return decoded;
    try {
      if (JSON.parse(decoded)) {
        return decoded;
      }
    } catch {
    }
  }
  return (0, import_lz_string.decompressFromBase64)(compressed);
};

// src/livecodes/services/share.ts
var dpasteGetUrl = "https://dpaste.com/";
var dpastePostUrl = "https://dpaste.com/api/v2/";
var apiUrl = "https://api2.livecodes.io/share";
var dpasteService = {
  getProject: async (id) => {
    try {
      const res = await fetch(dpasteGetUrl + id + ".txt");
      if (!res.ok)
        return {};
      return JSON.parse(await res.text());
    } catch {
      return {};
    }
  },
  shareProject: async (config) => {
    try {
      const res = await fetch(dpastePostUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "LiveCodes / https://livecodes.io/"
        },
        body: `content=${encodeURIComponent(JSON.stringify(config))}&title=${encodeURIComponent(
          config.title || ""
        )}&syntax=json&expiry_days=365`
      });
      if (!res.ok)
        return "";
      const url3 = await res.text();
      return url3.replace(dpasteGetUrl, "");
    } catch {
      return "";
    }
  }
};
var apiService = {
  getProject: async (id) => {
    if (id.length < 11)
      return dpasteService.getProject(id);
    try {
      const res = await fetch(apiUrl + "?id=" + id);
      if (!res.ok)
        return {};
      return JSON.parse(await res.text());
    } catch {
      return {};
    }
  },
  shareProject: async (config) => {
    if (!allowedOrigin())
      return "";
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(config)
      });
      if (!res.ok)
        return "";
      return res.text();
    } catch {
      return "";
    }
  }
};
var shareService = false ? false ? selfHostedService : dpasteService : allowedOrigin() ? apiService : dpasteService;

// src/livecodes/languages/commonlisp/lang-commonlisp.ts
var parenFormatter = () => {
  const url3 = parinferUrl;
  self.importScripts(url3);
  return async (value) => ({
    formatted: window.parinfer.parenMode(value).text,
    cursorOffset: 0
  });
};

// src/livecodes/languages/clojurescript/lang-clojurescript.ts
var clojurescript = {
  name: "clojurescript",
  title: "CLJS (cherry)",
  longTitle: "ClojureScript (cherry)",
  formatter: {
    factory: parenFormatter
  },
  compiler: {
    url: cherryCljsBaseUrl + "lib/cherry.umd.js",
    factory: () => async (code, { config, options }) => {
      const compiled = self.CherryCljs.compileString(code);
      return code.includes("#jsx") ? (await compileInCompiler(compiled, "jsx", config, options)).code : compiled;
    },
    imports: {
      "cherry-cljs": cherryCljsBaseUrl + "index.js",
      "cherry-cljs/cljs.core.js": cherryCljsBaseUrl + "cljs.core.js",
      "cherry-cljs/lib/clojure.string.js": "lib/clojure.string.js",
      "cherry-cljs/lib/clojure.set.js": "lib/clojure.set.js",
      "cherry-cljs/lib/clojure.walk.js": "lib/clojure.walk.js",
      "squint-cljs": squintCljsBaseUrl + "index.js",
      "squint-cljs/core.js": squintCljsBaseUrl + "core.js",
      "squint-cljs/string.js": squintCljsBaseUrl + "string.js",
      "squint-cljs/src/squint/string.js": squintCljsBaseUrl + "src/squint/string.js",
      "squint-cljs/src/squint/set.js": squintCljsBaseUrl + "src/squint/set.js"
    }
  },
  extensions: ["cljs", "clj", "cljc", "edn", "clojure"],
  editor: "script",
  editorLanguage: "clojure"
};

// src/livecodes/languages/cpp/lang-cpp.ts
var cdnUrl = vendorsBaseUrl + "jscpp/JSCPP.es5.min.js";

// src/livecodes/languages/csharp-wasm/lang-csharp-wasm.ts
var csharpWasm = {
  name: "csharp-wasm",
  title: "C# (Wasm)",
  parser: {
    name: "java",
    pluginUrls: [parserPlugins.java]
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + "lang-csharp-wasm-script.js"],
    scriptType: "text/csharp-wasm",
    compiledCodeLanguage: "csharp-wasm",
    liveReload: true
  },
  extensions: ["cs", "csharp", "wasm.cs", "cs-wasm"],
  editor: "script",
  editorLanguage: "csharp",
  largeDownload: true
};

// src/livecodes/languages/css/lang-css.ts
var css = {
  name: "css",
  title: "CSS",
  info: false,
  parser: {
    name: "css",
    pluginUrls: [parserPlugins.postcss]
  },
  compiler: {
    factory: () => async (code) => code
  },
  extensions: ["css"],
  editor: "style"
};

// src/livecodes/languages/diagrams/lang-diagrams.ts
var runOutsideWorker = async (code, { baseUrl, config }) => {
  const { diagramsCompiler } = await import(baseUrl + "lang-diagrams-compiler-esm.js");
  return diagramsCompiler(code, { config });
};
var diagrams = {
  name: "diagrams",
  title: "Diagrams",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    factory: () => async (code) => code || "",
    runOutsideWorker
  },
  extensions: ["diagrams", "diagram", "graph", "plt"],
  editor: "markup",
  editorLanguage: "html"
};

// src/livecodes/languages/dot/lang-dot.ts
var dot = {
  name: "dot",
  title: "doT",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    url: dotUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-dot-compiler.js");
      return self.createDotCompiler();
    }
  },
  extensions: ["dot"],
  editor: "markup",
  editorLanguage: "html"
};

// src/livecodes/languages/ejs/lang-ejs.ts
var ejs = {
  name: "ejs",
  title: "EJS",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    url: ejsUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-ejs-compiler.js");
      return self.createEjsCompiler();
    }
  },
  extensions: ["ejs"],
  editor: "markup",
  editorLanguage: "html"
};

// src/livecodes/languages/eta/lang-eta.ts
var eta = {
  name: "eta",
  title: "Eta",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    url: etaUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-eta-compiler.js");
      return self.createEtaCompiler();
    }
  },
  extensions: ["eta"],
  editor: "markup",
  editorLanguage: "html"
};

// src/livecodes/languages/flow/lang-flow.ts
var flow = {
  name: "flow",
  title: "Flow",
  parser: {
    name: "babel-flow",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: {
    url: vendorsBaseUrl + "flow-remove-types/flow-remove-types.js",
    factory: () => async (code, { config }) => window.flowRemoveTypes.transpile(code, {
      all: true,
      ...getLanguageCustomSettings("flow", config)
    }).toString()
  },
  extensions: ["flow"],
  editor: "script",
  editorLanguage: "typescript"
};

// src/livecodes/languages/go/lang-go.ts
var go = {
  name: "go",
  title: "Go",
  formatter: {
    factory: () => {
      importScripts(go2jsBaseUrl + "go2js-format.js");
      return async (code) => {
        if (!code)
          return { formatted: "", cursorOffset: 0 };
        const [formatted, err] = globalThis.go2jsFormat(code);
        if (err) {
          console.error(err);
          return { formatted: code, cursorOffset: 0 };
        }
        return { formatted, cursorOffset: 0 };
      };
    }
  },
  compiler: {
    url: go2jsBaseUrl + "go2js-compile.js",
    factory: () => (code) => new Promise((resolve) => {
      if (!code) {
        resolve("");
        return;
      }
      const url3 = go2jsBaseUrl.endsWith("/") ? go2jsBaseUrl.slice(0, -1) : go2jsBaseUrl;
      globalThis.go2jsCompile(code, url3, (err, jsCode) => {
        if (err) {
          console.error(err);
          resolve("");
        } else {
          resolve(jsCode);
        }
      });
    })
  },
  extensions: ["go", "golang"],
  editor: "script"
};

// src/livecodes/languages/go-wasm/lang-go-wasm.ts
var goWasm = {
  name: "go-wasm",
  title: "Go (Wasm)",
  formatter: go.formatter,
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + "lang-go-wasm-script.js"],
    liveReload: true,
    scriptType: "text/go-wasm",
    compiledCodeLanguage: "go"
  },
  extensions: ["wasm.go", "go-wasm", "gowasm"],
  editor: "script",
  editorLanguage: "go",
  largeDownload: true
};

// src/livecodes/languages/haml/lang-haml.ts
var haml = {
  name: "haml",
  title: "Haml",
  compiler: {
    url: vendorsBaseUrl + "clientside-haml-js/haml.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-haml-compiler.js");
      return self.createHamlCompiler();
    }
  },
  extensions: ["haml"],
  editor: "markup"
};

// src/livecodes/languages/handlebars/lang-handlebars.ts
var url = handlebarsBaseUrl + "handlebars.min.js";
var runtimeUrl = handlebarsBaseUrl + "handlebars.runtime.min.js";
var handlebars = {
  name: "handlebars",
  title: "Handlebars",
  parser: {
    name: "glimmer",
    pluginUrls: [parserPlugins.glimmer]
  },
  compiler: {
    url,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-handlebars-compiler.js");
      return self.createHandlebarsCompiler();
    }
  },
  extensions: ["hbs", "handlebars"],
  editor: "markup",
  editorLanguage: "html"
};

// src/livecodes/languages/html/lang-html.ts
var html = {
  name: "html",
  title: "HTML",
  info: false,
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    factory: () => async (code) => code
  },
  extensions: ["html", "htm"],
  editor: "markup"
};

// src/livecodes/languages/imba/lang-imba.ts
var imba = {
  name: "imba",
  title: "Imba",
  compiler: {
    url: imbaBaseUrl + "compiler.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-imba-compiler.js");
      return self.createImbaCompiler();
    },
    imports: {
      imba: imbaBaseUrl + "imba.mjs"
    }
  },
  extensions: ["imba"],
  editor: "script"
};

// src/livecodes/languages/java/lang-java.ts
var java = {
  name: "java",
  title: "Java",
  parser: {
    name: "java",
    pluginUrls: [parserPlugins.java]
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + "lang-java-script.js"],
    scriptType: "text/java",
    compiledCodeLanguage: "java",
    liveReload: true
  },
  extensions: ["java"],
  editor: "script",
  largeDownload: true
};

// src/livecodes/languages/javascript/lang-javascript.ts
var javascript = {
  name: "javascript",
  title: "JS",
  longTitle: "JavaScript",
  info: false,
  parser: {
    name: "babel",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: {
    factory: () => async (code) => code
  },
  extensions: ["js"],
  editor: "script"
};

// src/livecodes/languages/jinja/lang-jinja.ts
var jinjaUrl = `${vendorsBaseUrl}jinja/jinja.js`;

// src/livecodes/languages/jsx/lang-jsx.ts
var jsx = {
  name: "jsx",
  title: "JSX",
  parser: {
    name: "babel",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: "typescript",
  extensions: ["jsx"],
  editor: "script",
  editorLanguage: "javascript"
};

// src/livecodes/languages/jsx/lang-tsx.ts
var tsx = {
  name: "tsx",
  title: "TSX",
  parser: {
    name: "babel-ts",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: "typescript",
  extensions: ["tsx"],
  editor: "script",
  editorLanguage: "typescript"
};

// src/livecodes/languages/less/lang-less.ts
var less = {
  name: "less",
  title: "Less",
  parser: {
    name: "less",
    pluginUrls: [parserPlugins.postcss]
  },
  compiler: {
    url: vendorsBaseUrl + "less/less.js",
    factory: () => async (code, { config }) => (await window.less.render(code, {
      ...getLanguageCustomSettings("less", config)
    })).css
  },
  extensions: ["less"],
  editor: "style"
};

// src/livecodes/languages/liquid/lang-liquid.ts
var liquid = {
  name: "liquid",
  title: "Liquid",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    url: liquidJsUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-liquid-compiler.js");
      return self.createLiquidCompiler();
    }
  },
  extensions: ["liquid", "liquidjs"],
  editor: "markup",
  editorLanguage: "html"
};

// src/livecodes/languages/livescript/lang-livescript.ts
var livescript = {
  name: "livescript",
  title: "LiveScript",
  compiler: {
    url: vendorsBaseUrl + "livescript/livescript-min.js",
    factory: () => async (code, { config }) => window.require("livescript").compile(code, {
      bare: true,
      ...getLanguageCustomSettings("livescript", config)
    }),
    scripts: [vendorsBaseUrl + "livescript/prelude-browser-min.js"]
  },
  extensions: ["ls"],
  editor: "script"
};

// src/livecodes/languages/lua/lang-lua.ts
var luaFmtUrl = vendorsBaseUrl + "lua-fmt/lua-fmt.js";

// src/livecodes/languages/malina/lang-malina.ts
var malina = {
  name: "malina",
  title: "Malina.js",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html, parserPlugins.babel]
  },
  compiler: {
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-malina-compiler.js");
      return self.createMalinaCompiler();
    },
    imports: {
      "malinajs/runtime.js": `${malinaBaseUrl}runtime.js`
    }
  },
  extensions: ["xht"],
  editor: "script"
};

// src/livecodes/languages/markdown/lang-markdown.ts
var markdown = {
  name: "markdown",
  title: "Markdown",
  parser: {
    name: "markdown",
    pluginUrls: [parserPlugins.markdown, parserPlugins.html]
  },
  compiler: {
    url: markedUrl,
    factory: () => async (code, { config }) => window.marked.parse(code, { ...getLanguageCustomSettings("markdown", config) })
  },
  extensions: ["md", "markdown", "mdown", "mkdn"],
  editor: "markup"
};

// src/livecodes/languages/mdx/lang-mdx.ts
var runOutsideWorker2 = async (code, { config, worker }) => new Promise(async (resolve) => {
  if (!code)
    return resolve("");
  const [mdx2, { default: remarkGfm }] = await Promise.all([
    import(vendorsBaseUrl + "mdx/mdx.js"),
    import(vendorsBaseUrl + "remark-gfm/remark-gfm.js")
  ]);
  const compiled = (await mdx2.compile(code, {
    remarkPlugins: [remarkGfm],
    ...getLanguageCustomSettings("mdx", config)
  })).value;
  const removeComponentDeclaration = (str) => str.replace(/, {[^}]*} = _components/g, "").replace(/const {[^:]*} = props.components[^;]*;/g, "");
  const jsx2 = removeComponentDeclaration(compiled);
  const result = `import React from "react";
import { createRoot } from "react-dom/client";
${escapeCode(jsx2, false)}
createRoot(document.querySelector('#__livecodes_mdx_root__')).render(<MDXContent />,);
`;
  const js = (await compileInCompiler(result, "jsx", config, {}, worker)).code;
  resolve(`<div id="__livecodes_mdx_root__"></div><script type="module">${js}<\/script>`);
});
var mdx = {
  name: "mdx",
  title: "MDX",
  parser: {
    name: "markdown",
    pluginUrls: [parserPlugins.markdown, parserPlugins.html]
  },
  compiler: {
    factory: () => async (code) => code,
    runOutsideWorker: runOutsideWorker2,
    compiledCodeLanguage: "javascript"
  },
  extensions: ["mdx"],
  editor: "markup",
  editorLanguage: "markdown"
};

// src/livecodes/languages/mjml/lang-mjml.ts
var mjml = {
  name: "mjml",
  title: "MJML",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    url: mjmlUrl,
    factory: () => async (code, { config }) => {
      if (!code.trim())
        return "";
      const { html: html2, errors } = self.mjml(
        code,
        getLanguageCustomSettings("mjml", config)
      );
      errors?.forEach(
        (err) => {
          console.warn(err.formattedMessage);
        }
      );
      return html2;
    }
  },
  extensions: ["mjml"],
  editor: "markup",
  editorLanguage: "xml"
};

// src/livecodes/languages/mustache/lang-mustache.ts
var mustache = {
  name: "mustache",
  title: "Mustache",
  parser: {
    name: "glimmer",
    pluginUrls: [parserPlugins.glimmer]
  },
  compiler: {
    url: mustacheUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-mustache-compiler.js");
      return self.createMustacheCompiler();
    }
  },
  extensions: ["mustache"],
  editor: "markup",
  editorLanguage: "html"
};

// src/livecodes/languages/nunjucks/lang-nunjucks.ts
var url2 = nunjucksBaseUrl + "nunjucks.min.js";
var runtimeUrl2 = nunjucksBaseUrl + "nunjucks-slim.min.js";
var nunjucks = {
  name: "nunjucks",
  title: "Nunjucks",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    url: url2,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-nunjucks-compiler.js");
      return self.createNunjucksCompiler();
    }
  },
  extensions: ["njk", "nunjucks"],
  editor: "markup",
  editorLanguage: "html"
};

// src/livecodes/languages/php/lang-php.ts
var php = {
  name: "php",
  title: "PHP",
  parser: {
    name: "php",
    pluginUrls: [parserPlugins.php]
  },
  compiler: {
    factory: () => async (code) => {
      code = code.trim();
      if (code.startsWith("<?php")) {
        code = code.replace("<?php", "/* <?php */");
        if (code.endsWith("?>")) {
          code = code.replace("?>", "/* ?> */");
        }
      }
      return code;
    },
    scripts: [uniterUrl],
    deferScripts: true,
    scriptType: "text/x-uniter-php",
    compiledCodeLanguage: "php"
  },
  extensions: ["php"],
  editor: "script"
};

// src/livecodes/languages/php-wasm/lang-php-wasm.ts
var phpWasm = {
  name: "php-wasm",
  title: "PHP (Wasm)",
  parser: {
    name: "php",
    pluginUrls: [parserPlugins.php]
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [
      vendorsBaseUrl + "php-wasm/php-wasm.js",
      baseUrl + "lang-php-wasm-script.js"
    ],
    scriptType: "text/php-wasm",
    compiledCodeLanguage: "php"
  },
  extensions: ["wasm.php", "phpwasm"],
  editor: "script",
  editorLanguage: "php"
};

// src/livecodes/languages/pug/lang-pug.ts
var pug = {
  name: "pug",
  title: "Pug",
  // disable formatter, till @prettier/plugin-pug supports prettier v3
  // (https://github.com/prettier/plugin-pug/pull/411)
  parser: {
    name: "pug",
    pluginUrls: [parserPlugins.pug]
  },
  compiler: {
    url: vendorsBaseUrl + "pug/pug.min.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-pug-compiler.js");
      return self.createPugCompiler();
    }
  },
  extensions: ["pug", "jade"],
  editor: "markup"
};

// src/livecodes/languages/python/lang-python.ts
var brythonUrl = brythonBaseUrl + "brython.min.js";
var stdlibUrl = brythonBaseUrl + "brython_stdlib.js";

// src/livecodes/languages/react/lang-react.ts
var react = {
  name: "react",
  title: "React",
  parser: {
    name: "babel",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: {
    dependencies: ["babel"],
    url: vendorsBaseUrl + "babel-plugin-react-compiler/babel-plugin-react-compiler.js",
    factory: () => async (code, { config, language }) => {
      const babelConfig = getLanguageCustomSettings("babel", config);
      const presetEnvConfig = getLanguageCustomSettings("@babel/preset-env", config);
      const presetTsConfig = getLanguageCustomSettings("@babel/preset-typescript", config);
      const presetReactConfig = getLanguageCustomSettings("@babel/preset-react", config);
      const reactCompilerConfig = getLanguageCustomSettings(
        "babel-plugin-react-compiler",
        config
      );
      return window.Babel.transform(code, {
        filename: "script.tsx",
        presets: [
          ["env", { modules: false, ...presetEnvConfig }],
          ...language === "react-tsx" ? ["typescript", presetTsConfig] : [],
          ["react", { runtime: "automatic", ...presetReactConfig }]
        ],
        plugins: [[window.reactCompiler.reactCompiler, reactCompilerConfig]],
        ...babelConfig
      }).code;
    }
  },
  extensions: ["react.jsx", "react-jsx"],
  editor: "script",
  editorLanguage: "javascript"
};

// src/livecodes/languages/react/lang-react-tsx.ts
var reactTsx = {
  name: "react-tsx",
  title: "React (TSX)",
  parser: {
    name: "babel-ts",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: "react",
  extensions: ["react.tsx"],
  editor: "script",
  editorLanguage: "typescript"
};

// src/livecodes/languages/typescript/lang-typescript.ts
var hasCustomJsxRuntime = (code, config) => {
  const customTSConfig = {
    ...getLanguageCustomSettings("typescript", config),
    ...getLanguageCustomSettings(config.script.language, config)
  };
  return Boolean(
    customTSConfig.jsx || customTSConfig.jsxFactory || new RegExp(/\/\*\*[\s\*]*@jsx\s/g).test(code)
  );
};
var typescriptOptions = {
  target: "es2020",
  jsx: "react",
  allowUmdGlobalAccess: true,
  esModuleInterop: true
};
var typescript = {
  name: "typescript",
  title: "TS",
  longTitle: "TypeScript",
  parser: {
    name: "babel-ts",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: {
    url: typescriptUrl,
    factory: () => async (code, { config }) => window.ts.transpile(code, {
      ...typescriptOptions,
      ...["jsx", "tsx"].includes(config.script.language) && !hasCustomJsxRuntime(code, config) ? { jsx: "react-jsx" } : {},
      ...getLanguageCustomSettings("typescript", config),
      ...getLanguageCustomSettings(config.script.language, config)
    })
  },
  extensions: ["ts", "typescript"],
  editor: "script"
};

// src/livecodes/languages/react-native/lang-react-native.ts
var reactNativeWebUrl = vendorsBaseUrl + "react-native-web/react-native-web.js";
var reactNative = {
  name: "react-native",
  title: "RN",
  longTitle: "React Native",
  parser: {
    name: "babel",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: {
    dependencies: ["typescript"],
    factory: () => async (code, { config, language }) => window.ts.transpile(code, {
      ...typescriptOptions,
      ...{ jsx: "react-jsx" },
      ...getLanguageCustomSettings("typescript", config),
      ...getLanguageCustomSettings(language, config)
    }),
    imports: {
      react: reactNativeWebUrl,
      "react-native": reactNativeWebUrl
    }
  },
  extensions: ["react-native.jsx"],
  editor: "script",
  editorLanguage: "javascript"
};

// src/livecodes/languages/react-native/lang-react-native-tsx.ts
var reactNativeTsx = {
  name: "react-native-tsx",
  title: "RN (TSX)",
  longTitle: "React Native (TSX)",
  parser: {
    name: "babel-ts",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: "react-native",
  extensions: ["react-native.tsx"],
  editor: "script",
  editorLanguage: "typescript"
};

// src/livecodes/languages/riot/lang-riot.ts
var compilerCdnUrl = riotBaseUrl + "riot+compiler.min.js";
var cdnUrl2 = riotBaseUrl + "riot.min.js";
var riot = {
  name: "riot",
  title: "Riot.js",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html, parserPlugins.babel]
  },
  compiler: {
    url: compilerCdnUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-riot-compiler.js");
      return self.createRiotCompiler();
    },
    scripts: [cdnUrl2],
    scriptType: "module"
  },
  extensions: ["riot", "riotjs"],
  editor: "script"
};

// src/livecodes/languages/ruby/lang-ruby.ts
var getImports = (code, requireMap = {}) => Array.from(
  new Set(
    [...code.matchAll(new RegExp(/^\s*self\.\$require\("(\S+)"\);/gm))].map((arr) => arr[1]).map((mod) => mod.split("/")[0]).filter((mod) => requireMap.hasOwnProperty(mod) || mod !== "opal").map((mod) => requireMap[mod] || `${opalBaseUrl + mod}.min.js`)
  )
);
var ruby = {
  name: "ruby",
  title: "Ruby",
  compiler: {
    url: opalBaseUrl + "opal.min.js",
    factory: () => {
      importScripts(opalBaseUrl + "opal-parser.min.js");
      self.Opal.config.unsupported_features_severity = "ignore";
      self.Opal.load("opal-parser");
      return async (code, { config }) => {
        const { autoloadStdlib, requireMap, ...options } = getLanguageCustomSettings(
          "ruby",
          config
        );
        const patch = code.includes("$0") ? "$0 = __FILE__\n" : "";
        return self.Opal.compile(patch + code, options);
      };
    },
    scripts: ({ compiled, config }) => {
      const { autoloadStdlib, requireMap } = getLanguageCustomSettings("ruby", config);
      const imports = getImports(compiled, requireMap);
      const stdlib = autoloadStdlib !== false ? imports : [];
      return [opalBaseUrl + "opal.min.js", ...stdlib];
    }
  },
  extensions: ["rb"],
  editor: "script"
};

// src/livecodes/languages/scss/lang-scss.ts
var scss = {
  name: "scss",
  title: "SCSS",
  parser: {
    name: "scss",
    pluginUrls: [parserPlugins.postcss]
  },
  compiler: {
    url: vendorsBaseUrl + "sass/sass.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-scss-compiler.js");
      return self.createScssCompiler();
    }
  },
  extensions: ["scss"],
  editor: "style"
};

// src/livecodes/languages/solid/lang-solid.ts
var solid = {
  name: "solid",
  title: "Solid",
  parser: {
    name: "babel",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: {
    dependencies: ["babel"],
    url: vendorsBaseUrl + "babel-preset-solid/babel-preset-solid.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-solid-compiler.js");
      return self.createSolidCompiler();
    }
  },
  extensions: ["solid.jsx"],
  editor: "script",
  editorLanguage: "javascript"
};

// src/livecodes/languages/solid/lang-solid-tsx.ts
var solidTsx = {
  name: "solid.tsx",
  title: "Solid (TS)",
  parser: {
    name: "babel-ts",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: "solid",
  extensions: ["solid.tsx"],
  editor: "script",
  editorLanguage: "typescript"
};

// src/livecodes/languages/sql/lang-sql.ts
var scriptType = "application/json";
var sql = {
  name: "sql",
  title: "SQL",
  formatter: {
    factory: () => {
      importScripts(sqlFormatterUrl);
      return async (value) => ({
        formatted: await self.sqlFormatter.format(value, { linesBetweenQueries: 2 }),
        cursorOffset: 0
      });
    }
  },
  compiler: {
    url: sqljsBaseUrl + "sql-wasm.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-sql-compiler.js");
      return self.createSqlCompiler();
    },
    scripts: ({ baseUrl }) => [baseUrl + "lang-sql-script.js"],
    scriptType,
    compiledCodeLanguage: "json"
  },
  extensions: ["sql", "sqlite", "sqlite3"],
  editor: "script"
};

// src/livecodes/languages/stencil/lang-stencil.ts
var stencil = {
  name: "stencil",
  title: "Stencil",
  parser: {
    name: "babel-ts",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: {
    url: stencilUrl,
    factory: () => async (code, { config }) => {
      const result = await window.stencil.transpile(code, {
        // TranspileOptions interface
        // https://github.com/ionic-team/stencil/blob/1b8b7ec21f2622d05c9aafa417b2abdd4f2597a4/src/declarations/stencil-public-compiler.ts#L2311
        sourceMap: false,
        target: "es2019",
        ...getLanguageCustomSettings("stencil", config)
      });
      return result.code;
    },
    types: {
      "@stencil/core": {
        url: vendorsBaseUrl + "types/stencil-core.d.ts",
        declareAsModule: false
      }
    }
  },
  extensions: ["stencil.tsx"],
  editor: "script",
  editorLanguage: "typescript"
};

// src/livecodes/languages/stylus/lang-stylus.ts
var stylus = {
  name: "stylus",
  title: "Stylus",
  compiler: {
    url: vendorsBaseUrl + "stylus/stylus.min.js",
    factory: () => async (code) => window.stylus.render(code)
  },
  extensions: ["styl"],
  editor: "style"
};

// src/livecodes/languages/sucrase/lang-sucrase.ts
var sucrase = {
  name: "sucrase",
  title: "Sucrase",
  parser: {
    name: "babel",
    pluginUrls: [parserPlugins.babel, parserPlugins.html]
  },
  compiler: {
    url: vendorsBaseUrl + "sucrase/sucrase.js",
    factory: () => async (code, { config }) => window.sucrase.transform(code, {
      transforms: ["jsx", "typescript"],
      ...getLanguageCustomSettings("sucrase", config)
    }).code
  },
  extensions: ["sucrase"],
  editor: "script",
  editorLanguage: "typescript"
};

// src/livecodes/languages/svelte/lang-svelte.ts
var svelte = {
  name: "svelte",
  title: "Svelte",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html, parserPlugins.babel]
  },
  compiler: {
    url: svelteBaseUrl + "compiler/index.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-svelte-compiler.js");
      return self.createSvelteCompiler();
    },
    imports: {
      // from https://unpkg.com/svelte/package.json => "exports"
      svelte: svelteBaseUrl + "src/index-client.js",
      "svelte/animate": svelteBaseUrl + "src/animate/index.js",
      "svelte/easing": svelteBaseUrl + "src/easing/index.js",
      "svelte/internal": svelteBaseUrl + "src/internal/index.js",
      "svelte/internal/client": svelteBaseUrl + "src/internal/client/index.js",
      "svelte/internal/disclose-version": svelteBaseUrl + "src/internal/disclose-version.js",
      "svelte/internal/flags/legacy": svelteBaseUrl + "src/internal/flags/legacy.js",
      "svelte/internal/server": svelteBaseUrl + "src/internal/server/index.js",
      "svelte/legacy": svelteBaseUrl + "src/legacy/legacy-client.js",
      "svelte/motion": svelteBaseUrl + "src/motion/index.js",
      "svelte/reactivity": svelteBaseUrl + "src/reactivity/index-client.js",
      "svelte/reactivity/window": svelteBaseUrl + "src/reactivity/window/index.js",
      "svelte/server": svelteBaseUrl + "src/server/index.js",
      "svelte/store": svelteBaseUrl + "src/store/index-client.js",
      "svelte/transition": svelteBaseUrl + "src/transition/index.js",
      "svelte/events": svelteBaseUrl + "src/events/index.js",
      "esm-env": "https://esm.sh/esm-env"
    },
    inlineScript: 'globalThis.process = { env: { NODE_ENV: "production" } };'
  },
  extensions: ["svelte"],
  editor: "script"
};
var svelteApp = {
  ...svelte,
  name: "svelte-app",
  compiler: "svelte",
  extensions: ["app.svelte"],
  editor: "markup",
  editorLanguage: "html"
};

// src/livecodes/languages/twig/lang-twig.ts
var twig = {
  name: "twig",
  title: "Twig",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    url: twigUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-twig-compiler.js");
      return self.createTwigCompiler();
    }
  },
  extensions: ["twig"],
  editor: "markup",
  editorLanguage: "html"
};

// src/livecodes/languages/vento/lang-vento.ts
var vento = {
  name: "vento",
  title: "Vento",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    url: vendorsBaseUrl + "vento/vento.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-vento-compiler.js");
      return self.createVentoCompiler();
    }
  },
  extensions: ["vto", "vento"],
  editor: "markup",
  editorLanguage: "html"
};

// src/livecodes/languages/vue/lang-vue.ts
var compilerUrl = vendorsBaseUrl + "vue-compiler-sfc/vue-compiler-sfc.js";
var vue = {
  name: "vue",
  title: "Vue",
  longTitle: "Vue SFC",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    url: compilerUrl,
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-vue-compiler.js");
      return self.createVueCompiler();
    },
    imports: {
      vue: vueRuntimeUrl,
      "livecodes/vue": vueSDKUrl
    }
  },
  extensions: ["vue", "vue3"],
  editor: "script",
  editorLanguage: "html"
};
var vueApp = {
  ...vue,
  name: "vue-app",
  compiler: "vue",
  extensions: ["app.vue"],
  editor: "markup",
  editorLanguage: "html"
};

// src/livecodes/languages/vue2/lang-vue2.ts
var loaderCdnUrl = vueSfcLoaderCdnBaseUrl + "vue2-sfc-loader.js";
var vue2 = {
  name: "vue2",
  title: "Vue 2",
  longTitle: "Vue 2 SFC",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html]
  },
  compiler: {
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "lang-vue2-compiler.js");
      return self.createVue2Compiler();
    },
    scripts: [vue2CdnUrl, loaderCdnUrl],
    imports: {
      vue: vue2CdnUrl + "/dist/vue.runtime.esm-browser.prod.js"
    }
  },
  extensions: ["vue2"],
  editor: "script",
  editorLanguage: "html"
};

// src/livecodes/languages/wat/lang-wat.ts
var formatterUrl = vendorsBaseUrl + "wast-refmt/wast-refmt.js";

// src/livecodes/languages/postcss/postcss-plugins.ts
var autoprefixer = {
  name: "autoprefixer",
  title: "Autoprefixer",
  isPostcssPlugin: true,
  compiler: {
    url: vendorsBaseUrl + "autoprefixer/autoprefixer.js",
    factory: (config) => self.autoprefixer.autoprefixer({
      ...getLanguageCustomSettings("autoprefixer", config)
    })
  },
  editor: "style"
};
var cssnano = {
  name: "cssnano",
  title: "cssnano",
  isPostcssPlugin: true,
  compiler: {
    url: vendorsBaseUrl + "cssnano/cssnano.js",
    factory: () => {
      const nanoPlugins = self.cssnano.cssnanoPresetDefault().plugins;
      const postcssPlugins = [];
      for (const plugin of nanoPlugins) {
        const [processor, opts] = plugin;
        if (typeof opts === "undefined" || typeof opts === "object" && !opts.exclude || typeof opts === "boolean" && opts === true) {
          postcssPlugins.push(processor(opts));
        }
      }
      return postcssPlugins;
    }
  },
  editor: "style"
};
var postcssPresetEnv = {
  name: "postcssPresetEnv",
  title: "Preset Env",
  isPostcssPlugin: true,
  compiler: {
    url: vendorsBaseUrl + "postcss-preset-env/postcss-preset-env.js",
    factory: (config) => self.postcssPresetEnv.postcssPresetEnv({
      autoprefixer: false,
      ...getLanguageCustomSettings("postcssPresetEnv", config)
    })
  },
  editor: "style"
};
var purgecss = {
  name: "purgecss",
  title: "PurgeCSS",
  isPostcssPlugin: true,
  needsHTML: true,
  compiler: {
    url: vendorsBaseUrl + "purgecss/purgecss.js",
    factory: (config, _baseUrl, options) => self.purgecss.purgecss({
      ...getLanguageCustomSettings("purgecss", config),
      content: [
        {
          raw: `<template>${options.html}
<script>${config.script.content}<\/script></template>`,
          extension: "html"
        }
      ]
    })
  },
  editor: "style"
};
var tokencss = {
  name: "tokencss",
  title: "Token CSS",
  isPostcssPlugin: true,
  compiler: {
    url: vendorsBaseUrl + "tokencss/tokencss.js",
    factory: (config) => {
      const customSettings = getLanguageCustomSettings("tokencss", config);
      if (Object.keys(customSettings).length === 0) {
        customSettings.$schema = "https://tokencss.com/schema@0.0.1";
        customSettings.extends = "@tokencss/core/preset";
      }
      const extendTokens = (base, tokens) => {
        const result = JSON.parse(JSON.stringify(base));
        Object.keys(tokens).forEach((key) => {
          result[key] = typeof tokens[key] !== "object" || Array.isArray(tokens[key]) ? tokens[key] : {
            ...result[key],
            ...tokens[key]
          };
        });
        return result;
      };
      const tokensConfig = customSettings.extends?.includes("@tokencss/core/preset") ? extendTokens(self.tokencss.preset, customSettings) : customSettings;
      return self.tokencss.tokencss({ config: tokensConfig });
    }
  },
  editor: "style"
};
var cssModules = {
  name: "cssmodules",
  title: "CSS Modules",
  isPostcssPlugin: true,
  needsHTML: true,
  compiler: {
    url: vendorsBaseUrl + "postcss-modules/postcss-modules.js",
    factory: (config, _baseUrl, options) => {
      const customSettings = getLanguageCustomSettings("cssmodules", config);
      return self.postcssModules.postcssModules({
        localsConvention: "camelCase",
        ...customSettings,
        getJSON(_cssFileName, json, _outputFileName) {
          const addClasses = customSettings.addClassesToHTML !== false;
          const removeClasses = customSettings.removeOriginalClasses === true;
          if (addClasses) {
            options.html = self.postcssModules.addClassesToHtml(
              options.html,
              json,
              removeClasses
            );
          }
          options.compileInfo = {
            ...options.compileInfo,
            cssModules: json,
            ...addClasses ? { modifiedHTML: options.html } : {}
          };
        }
      });
    }
  },
  editor: "style"
};

// src/livecodes/languages/postcss/processor-postcss.ts
var postcss = {
  name: "postcss",
  title: "Processors:",
  isPostcssPlugin: false,
  compiler: {
    url: vendorsBaseUrl + "postcss/postcss.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "processor-postcss-compiler.js");
      return self.createPostcssCompiler();
    }
  },
  editor: "style",
  hidden: true
};

// src/livecodes/languages/lightningcss/processor-lightningcss.ts
var lightningcss = {
  name: "lightningcss",
  title: "Lightning CSS",
  isPostcssPlugin: false,
  compiler: {
    url: vendorsBaseUrl + "lightningcss/lightningcss.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "processor-lightningcss-compiler.js");
      return self.createLightningcssCompiler();
    }
  },
  editor: "style"
};

// src/livecodes/languages/tailwindcss/processor-tailwindcss.ts
var tailwindcss = {
  name: "tailwindcss",
  title: "Tailwind CSS",
  isPostcssPlugin: false,
  needsHTML: true,
  compiler: {
    url: vendorsBaseUrl + "tailwindcss/tailwindcss.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "processor-tailwindcss-compiler.js");
      return self.createTailwindcssCompiler();
    }
  },
  editor: "style"
};

// src/livecodes/languages/unocss/processor-unocss.ts
var unocss = {
  name: "unocss",
  title: "UnoCSS",
  isPostcssPlugin: false,
  needsHTML: true,
  compiler: {
    url: vendorsBaseUrl + "unocss/unocss.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "processor-unocss-compiler.js");
      return self.createUnocssCompiler();
    }
  },
  editor: "style"
};

// src/livecodes/languages/windicss/processor-windicss.ts
var windicss = {
  name: "windicss",
  title: "Windi CSS",
  isPostcssPlugin: false,
  needsHTML: true,
  compiler: {
    url: vendorsBaseUrl + "windicss/windicss.js",
    factory: (_config, baseUrl) => {
      self.importScripts(baseUrl + "processor-windicss-compiler.js");
      return self.createWindicssCompiler();
    }
  },
  editor: "style"
};

// src/livecodes/import/check-src.ts
var getValidUrl2 = (url3) => {
  try {
    return url3.startsWith("https://") ? new URL(url3) : new URL("https://" + url3);
  } catch (error) {
    return;
  }
};
var hostPatterns = {
  github: /^(?:(?:http|https):\/\/)?github\.com\/(?:.*)/g,
  githubGist: /^(?:(?:http|https):\/\/)?gist\.github\.com(?:\/\S*)?\/(\w+)/g,
  gitlab: /^(?:(?:http|https):\/\/)?gitlab\.com\/(?:.*)/g,
  codepen: /^(?:(?:http|https):\/\/)?codepen\.io\/(\w+)\/pen\/(\w+)/g,
  jsbin: /^(?:(?:(?:http|https):\/\/)?(?:\w+.)?)?jsbin\.com\/((\w)+(\/\d+)?)(?:.*)/g,
  typescriptPlayground: /^(?:(?:http|https):\/\/)?(?:www\.)?typescriptlang\.org\/play(?:.*)/g,
  vuePlayground: /^(?:(?:http|https):\/\/)?play\.vuejs\.org(?:.*)/g,
  sveltePlayground: /^(?:(?:http|https):\/\/)?svelte\.dev\/repl\/(?:.*)/g
};
var isCompressedCode = (url3) => url3.startsWith("code/");
var isCodepen = (url3, pattern = new RegExp(hostPatterns.codepen)) => pattern.test(url3);
var isDom = (url3) => url3.startsWith("dom/");
var isGithubUrl = (url3, pattern = new RegExp(hostPatterns.github)) => {
  if (!pattern.test(url3))
    return;
  try {
    const urlObj = getValidUrl2(url3);
    if (!urlObj)
      return;
    const pathSplit = urlObj.pathname.split("/");
    return pathSplit[3] === "blob";
  } catch (error) {
    return;
  }
};
var isGithubDir = (url3, pattern = new RegExp(hostPatterns.github)) => {
  if (!pattern.test(url3))
    return;
  try {
    const urlObj = getValidUrl2(url3);
    if (!urlObj)
      return;
    let pathname = urlObj.pathname;
    if (urlObj.pathname.endsWith("/")) {
      pathname = urlObj.pathname.slice(0, -1);
    }
    const pathSplit = pathname.split("/");
    return pathSplit[3] === "tree" || pathSplit.length === 3;
  } catch (error) {
    return;
  }
};
var isGithubGist = (url3, pattern = new RegExp(hostPatterns.githubGist)) => pattern.test(url3);
var isGitlabUrl = (url3, pattern = new RegExp(hostPatterns.gitlab)) => {
  if (!pattern.test(url3))
    return;
  try {
    const urlObj = getValidUrl2(url3);
    if (!urlObj)
      return;
    const pathSplit = urlObj.pathname.split("/");
    return pathSplit[4] === "blob";
  } catch (error) {
    return;
  }
};
var isGitlabDir = (url3, pattern = new RegExp(hostPatterns.gitlab)) => {
  if (!pattern.test(url3))
    return;
  try {
    const urlObj = getValidUrl2(url3);
    if (!urlObj)
      return;
    let pathname = urlObj.pathname;
    if (urlObj.pathname.endsWith("/")) {
      pathname = urlObj.pathname.slice(0, -1);
    }
    const pathSplit = pathname.split("/");
    return pathSplit[4] === "tree" || pathSplit.length === 3;
  } catch (error) {
    return;
  }
};
var isGitlabSnippet = (url3, pattern = new RegExp(hostPatterns.gitlab)) => {
  if (!pattern.test(url3))
    return;
  const urlObj = getValidUrl2(url3);
  if (!urlObj)
    return;
  const pathSplit = urlObj.pathname.split("/");
  return pathSplit[pathSplit.length - 2] === "snippets";
};
var isJsbin = (url3, pattern = new RegExp(hostPatterns.jsbin)) => pattern.test(url3);
var isProjectId = (url3) => url3.startsWith("id/");
var isTypescriptPlayground = (url3, pattern = new RegExp(hostPatterns.typescriptPlayground)) => pattern.test(url3);
var isVuePlayground = (url3, pattern = new RegExp(hostPatterns.vuePlayground)) => pattern.test(url3);

// src/livecodes/import/code.ts
var importCompressedCode = (url3) => {
  if (!isCompressedCode(url3))
    return {};
  const code = url3.slice("code/".length);
  let config;
  try {
    config = JSON.parse(decompress(code) || "{}");
  } catch (error) {
    config = {};
  }
  return config;
};

// src/livecodes/import/project-id.ts
var importProject = (url3) => {
  const id = url3.slice("id/".length);
  return shareService.getProject(id);
};

// src/livecodes/import/image.ts
var Tesseract;
var ocr = async (image) => {
  Tesseract = Tesseract ?? (await import(tesseractUrl)).default;
  if (!Tesseract)
    return "";
  const worker = await Tesseract.createWorker("eng");
  const ret = await worker.recognize(image);
  worker.terminate();
  return ret.data.text;
};
var getConfigFromShareUrl = (text, isShareUrl = false) => {
  const shareUrlPattern = /\?x=(id\/\S{11,20})/g;
  let projectId = [...text.matchAll(new RegExp(shareUrlPattern))].at(-1)?.[1];
  if (projectId) {
    projectId = projectId.replace(/]/g, "j");
    const alphabet = "23456789abcdefghijkmnpqrstuvwxyz";
    if (projectId.slice("id/".length).split("").every((c) => alphabet.includes(c))) {
      return importProject(projectId);
    }
  }
  if (isShareUrl) {
    try {
      const url3 = new URL(text.trim());
      const code = decodeURIComponent(url3.href.split("#config=")[1] || "");
      if (code) {
        return importCompressedCode(code);
      }
    } catch {
    }
  }
  return null;
};
var cleanUpCode = async (code) => {
  if (!code?.trim())
    return "";
  let lines = code.trim().split("\n");
  const [firstLine, ...rest] = lines;
  const lastLines = lines.slice(-2).join("\n");
  const config = await getConfigFromShareUrl(lastLines);
  if (config)
    return config;
  const buttonCharacters = ["0", "C", "N", "J", "X", "(", ")", "[", "]", "|"];
  const charactersFound = firstLine.slice(0, 6).split("").filter((c) => buttonCharacters.includes(c)).length;
  const hasButtons = charactersFound > 2 || charactersFound / firstLine.length > 0.6;
  if (hasButtons) {
    code = rest.join("\n");
  }
  lines = code.trim().split("\n");
  if (lines.filter((l) => l.match(/^[0-9]{1,4}\s?/)).length / lines.length > 0.3) {
    code = lines.map((l) => l.replace(/^\S{1,4}\s?/, "")).join("\n");
  }
  code = code.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
  return code;
};
var importFromImage = async (blob) => {
  try {
    const metaPng = await loadScript(metaPngUrl, "MetaPNG");
    const arrayBuffer = await blob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const livecodesUrl = metaPng.getMetadata(uint8Array, "LiveCodes URL");
    if (livecodesUrl) {
      const config = await getConfigFromShareUrl(livecodesUrl, true);
      if (config)
        return config;
    }
  } catch {
  }
  try {
    const text = await ocr(blob);
    const content = await cleanUpCode(text);
    if (content && typeof content === "object") {
      return content;
    }
    if (content.trim().length > 3) {
      const langs = window.deps.languages.map((lang) => lang.name);
      const detected = await detectLanguage(content, langs);
      detected.language = getLanguageByAlias(detected.language) || detected.language;
      detected.secondBest = getLanguageByAlias(detected.secondBest) || detected.secondBest;
      const langNamesInCode = window.deps.languages.filter(
        (lang) => content.search(new RegExp(`\\b${lang.name}\\b`, "i")) !== -1 || content.search(new RegExp(`\\b${lang.extensions[0]}\\b`, "i")) !== -1
      ).map((lang) => lang.name);
      const language = langNamesInCode.find(
        (lang) => lang === detected.language || lang === detected.secondBest
      ) ?? langNamesInCode[0] ?? detected.language ?? detected.secondBest ?? "html";
      const editorId = getLanguageEditorId(language) ?? "markup";
      return {
        activeEditor: editorId,
        [editorId]: {
          language,
          content
        }
      };
    }
  } catch {
  }
  return {
    markup: {
      language: "html",
      content: `<img src="${await blobToBase64(blob)}" alt="image" />`
    }
  };
};

// src/livecodes/import/zip.ts
var importFromZip = async (blob, populateConfig) => new Promise(async (resolve, reject) => {
  const JSZip = await loadScript(jsZipUrl, "JSZip");
  JSZip.loadAsync(blob).then(async (zip) => {
    const projectJson = zip.file(/livecodes\.json/);
    if (projectJson.length > 0) {
      projectJson[0].async("string").then((str) => {
        resolve(JSON.parse(str));
      }).catch(reject);
      return;
    }
    const filesInSrcDir = zip.file(/((^src\/)|(\/src\/))/);
    const allFiles = zip.file(/.*/);
    const rootFiles = allFiles.filter((file) => !file.name.includes("/"));
    const selectedFiles = filesInSrcDir.length > 0 ? filesInSrcDir : rootFiles.length > 0 ? rootFiles : allFiles;
    if (selectedFiles.length > 0) {
      const sourceFiles = await Promise.all(
        selectedFiles.map(async (file) => ({
          filename: file.name,
          content: await file.async("string")
        }))
      );
      resolve(populateConfig(sourceFiles, {}));
      return;
    }
    resolve({});
  }).catch(reject);
});

// src/livecodes/import/files.ts
var importFromFiles = async (files, populateConfig, eventsManager) => {
  const loadFiles = (files2) => new Promise((resolve, reject) => {
    const sourceFiles = [];
    for (const file of files2) {
      const maxSizeAllowed = 100 * 1024 * 1024;
      if (file.size > maxSizeAllowed) {
        reject("Error: Exceeded size 100 MB");
        return;
      }
      const reader = new FileReader();
      eventsManager.addEventListener(reader, "load", (event) => {
        const text = event.target?.result || "";
        sourceFiles.push({
          filename: file.name,
          content: text
        });
        if (sourceFiles.length === files2.length) {
          resolve(populateConfig(sourceFiles, {}));
        }
      });
      eventsManager.addEventListener(reader, "error", () => {
        reject("Error: Failed to read file");
      });
      reader.readAsText(file);
    }
  });
  const loadZipFile = (files2) => importFromZip(files2[0], populateConfig);
  const loadImage = (files2) => importFromImage(files2[0]);
  if (!files?.length)
    return {};
  const getConfigFromFiles = files?.length > 1 ? loadFiles : files[0].name.endsWith(".zip") ? loadZipFile : files[0].type.startsWith("image/") && files[0].type !== "image/svg+xml" ? loadImage : loadFiles;
  return getConfigFromFiles(files);
};

// src/livecodes/import/import.ts
var importCode = async (url3, params, config, user, baseUrl) => {
  if (isCompressedCode(url3)) {
    return importCompressedCode(url3);
  }
  if (isProjectId(url3)) {
    return importProject(url3);
  }
  const importSrc = await import(baseUrl + "import-src.js");
  const {
    importFromCodepen,
    importFromDom,
    importFromGithub,
    importFromGithubDir,
    importFromGithubGist,
    importFromGitlab,
    importFromGitlabDir,
    importFromGitlabSnippet,
    importFromJsbin,
    importTypescriptPlayground,
    importVuePlayground,
    importFromUrl
  } = importSrc;
  if (isDom(url3)) {
    return importFromDom(url3, params, config);
  }
  if (isGithubGist(url3)) {
    return importFromGithubGist(url3, params);
  }
  if (isGithubDir(url3)) {
    return importFromGithubDir(url3, params, user);
  }
  if (isGithubUrl(url3)) {
    return importFromGithub(url3, user);
  }
  if (isGitlabSnippet(url3)) {
    return importFromGitlabSnippet(url3, params);
  }
  if (isGitlabDir(url3)) {
    return importFromGitlabDir(url3, params);
  }
  if (isGitlabUrl(url3)) {
    return importFromGitlab(url3);
  }
  if (isCodepen(url3)) {
    return importFromCodepen(url3);
  }
  if (isJsbin(url3)) {
    return importFromJsbin(url3);
  }
  if (isTypescriptPlayground(url3)) {
    return importTypescriptPlayground(url3);
  }
  if (isVuePlayground(url3)) {
    return importVuePlayground(url3);
  }
  if (getValidUrl(url3)) {
    return importFromUrl(url3, params, config);
  }
  return Promise.resolve({});
};

// src/livecodes/UI/selectors.ts
var getUrlImportForm = (importContainer) => importContainer.querySelector("#url-import-form");
var getUrlImportButton = (importContainer) => importContainer.querySelector("#url-import-btn");
var getUrlImportInput = (importContainer) => importContainer.querySelector("#code-url");
var getCodeImportInput = (importContainer) => importContainer.querySelector("#local-code-input");
var getImportJsonUrlForm = (importContainer) => importContainer.querySelector("#json-url-import-form");
var getImportJsonUrlButton = (importContainer) => importContainer.querySelector("#json-url-import-btn");
var getImportJsonUrlInput = (importContainer) => importContainer.querySelector("#json-url");
var getBulkImportJsonUrlForm = (importContainer) => importContainer.querySelector("#bulk-json-url-import-form");
var getBulkImportJsonUrlButton = (importContainer) => importContainer.querySelector("#bulk-json-url-import-btn");
var getBulkImportJsonUrlInput = (importContainer) => importContainer.querySelector("#bulk-json-url");
var getLinkToSavedProjects = (importContainer) => importContainer.querySelector("#link-to-saved-projects");
var getImportFileInput = (importContainer) => importContainer.querySelector("#file-input");
var getBulkImportFileInput = (importContainer) => importContainer.querySelector("#bulk-file-input");

// src/livecodes/UI/import.ts
var createImportContainer = (eventsManager) => {
  const div = document.createElement("div");
  div.innerHTML = importScreen;
  const importContainer = div.firstChild;
  const tabs = importContainer.querySelectorAll("#import-tabs li");
  tabs.forEach((tab) => {
    const link = tab.querySelector("a");
    if (!link)
      return;
    eventsManager.addEventListener(link, "click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      document.querySelectorAll("#import-screens > div").forEach((screen) => {
        screen.classList.remove("active");
      });
      const target = importContainer.querySelector("#" + link.dataset.target);
      target?.classList.add("active");
      target?.querySelector("input")?.focus();
    });
  });
  return importContainer;
};
var createImportUI = ({
  baseUrl,
  modal,
  notifications,
  eventsManager,
  getUser,
  loadConfig,
  populateConfig,
  projectStorage,
  showScreen
}) => {
  const importContainer = createImportContainer(eventsManager);
  const importForm = getUrlImportForm(importContainer);
  const importButton = getUrlImportButton(importContainer);
  eventsManager.addEventListener(importForm, "submit", async (e) => {
    e.preventDefault();
    const buttonText = importButton.innerHTML;
    importButton.innerHTML = window.deps.translateString("generic.loading", "Loading...");
    notifications.info(window.deps.translateString("generic.loading", "Loading..."));
    importButton.disabled = true;
    const importInput = getUrlImportInput(importContainer);
    const url3 = importInput.value;
    const imported = await importCode(url3, {}, defaultConfig, await getUser?.(), baseUrl);
    if (imported && Object.keys(imported).length > 0) {
      await loadConfig(
        {
          ...defaultConfig,
          ...imported
        },
        location.origin + location.pathname + "?x=" + encodeURIComponent(url3)
      );
      modal.close();
    } else {
      importButton.innerHTML = buttonText;
      importButton.disabled = false;
      notifications.error(
        window.deps.translateString("import.error.failedToLoadURL", "Error: failed to load URL")
      );
      importInput.focus();
    }
  });
  const codeImportInput = getCodeImportInput(importContainer);
  eventsManager.addEventListener(codeImportInput, "change", () => {
    if (!codeImportInput.files?.length)
      return;
    notifications.info(window.deps.translateString("generic.loading", "Loading..."));
    importFromFiles(codeImportInput.files, populateConfig, eventsManager).then(loadConfig).then(modal.close).catch((message) => {
      notifications.error(message);
    });
  });
  const importJsonUrlForm = getImportJsonUrlForm(importContainer);
  const importJsonUrlButton = getImportJsonUrlButton(importContainer);
  eventsManager.addEventListener(importJsonUrlForm, "submit", async (e) => {
    e.preventDefault();
    const buttonText = importJsonUrlButton.innerHTML;
    importJsonUrlButton.innerHTML = window.deps.translateString("generic.loading", "Loading...");
    notifications.info(window.deps.translateString("generic.loading", "Loading..."));
    importJsonUrlButton.disabled = true;
    const importInput = getImportJsonUrlInput(importContainer);
    const url3 = importInput.value;
    fetchWithHandler(url3).then((res) => res.json()).then(
      (fileConfig) => loadConfig(fileConfig, location.origin + location.pathname + "?config=" + url3)
    ).then(() => modal.close()).catch(() => {
      importJsonUrlButton.innerHTML = buttonText;
      importJsonUrlButton.disabled = false;
      notifications.error(
        window.deps.translateString("import.error.failedToLoadURL", "Error: failed to load URL")
      );
      importInput.focus();
    });
  });
  const bulkImportJsonUrlForm = getBulkImportJsonUrlForm(importContainer);
  const bulkimportJsonUrlButton = getBulkImportJsonUrlButton(importContainer);
  eventsManager.addEventListener(bulkImportJsonUrlForm, "submit", async (e) => {
    e.preventDefault();
    notifications.info(
      window.deps.translateString("import.bulk.started", "Bulk import started...")
    );
    const buttonText = bulkimportJsonUrlButton.innerHTML;
    bulkimportJsonUrlButton.innerHTML = window.deps.translateString(
      "generic.loading",
      "Loading..."
    );
    bulkimportJsonUrlButton.disabled = true;
    const importInput = getBulkImportJsonUrlInput(importContainer);
    const url3 = importInput.value;
    fetchWithHandler(url3).then((res) => res.json()).then(insertItems).catch(() => {
      bulkimportJsonUrlButton.innerHTML = buttonText;
      bulkimportJsonUrlButton.disabled = false;
      notifications.error(
        window.deps.translateString("import.error.failedToLoadURL", "Error: failed to load URL")
      );
      importInput.focus();
    });
  });
  const loadFile = (input) => new Promise((resolve, reject) => {
    if (input.files?.length === 0)
      return;
    const file = input.files[0];
    const allowedTypes = ["application/json", "text/plain"];
    if (allowedTypes.indexOf(file.type) === -1) {
      reject("Error: Incorrect file type");
      return;
    }
    const maxSizeAllowed = 100 * 1024 * 1024;
    if (file.size > maxSizeAllowed) {
      reject(
        window.deps.translateString(
          "generic.error.exceededSize",
          "Error: Exceeded size {{size}} MB",
          {
            size: 100
          }
        )
      );
      return;
    }
    const reader = new FileReader();
    eventsManager.addEventListener(reader, "load", async (event) => {
      const text = event.target?.result || "";
      try {
        resolve(JSON.parse(text));
      } catch (error) {
        reject(
          window.deps.translateString(
            "import.error.invalidConfigFile",
            "Invalid configuration file"
          )
        );
      }
    });
    eventsManager.addEventListener(reader, "error", () => {
      reject(
        window.deps.translateString(
          "generic.error.failedToReadFile",
          "Error: Failed to read file"
        )
      );
    });
    reader.readAsText(file);
  });
  const insertItems = async (items) => {
    const getItemConfig = (item) => item.config || item.pen;
    if (Array.isArray(items) && items.every(getItemConfig) && projectStorage) {
      await projectStorage.bulkInsert(items.map(getItemConfig));
      notifications.success(window.deps.translateString("import.success", "Import Successful!"));
      showScreen("open");
      return;
    }
    return Promise.reject(
      window.deps.translateString("import.error.invalidFile", "Error: Invalid file")
    );
  };
  const fileInput = getImportFileInput(importContainer);
  eventsManager.addEventListener(fileInput, "change", () => {
    notifications.info(window.deps.translateString("generic.loading", "Loading..."));
    loadFile(fileInput).then(loadConfig).then(modal.close).catch((message) => {
      notifications.error(message);
    });
  });
  const bulkFileInput = getBulkImportFileInput(importContainer);
  eventsManager.addEventListener(bulkFileInput, "change", () => {
    notifications.info(
      window.deps.translateString("import.bulk.started", "Bulk import started...")
    );
    loadFile(bulkFileInput).then(insertItems).catch((message) => {
      notifications.error(message);
    });
  });
  const linkToSavedProjects = getLinkToSavedProjects(importContainer);
  eventsManager.addEventListener(linkToSavedProjects, "click", (e) => {
    e.preventDefault();
    showScreen("open");
  });
  modal.show(importContainer, { isAsync: true, autoFocus: false });
  getUrlImportInput(importContainer).focus();
};
export {
  createImportUI,
  importCode
};
