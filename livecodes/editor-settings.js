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

// src/livecodes/utils/utils.ts
var escapeCode = (code, slash = true) => code.replace(/\\/g, slash ? "\\\\" : "\\").replace(/`/g, "\\`").replace(/<\/script>/g, "<\\/script>");
var cloneObject = (x) => (globalThis.structuredClone || ((obj) => JSON.parse(JSON.stringify(obj, (_k, v) => v === void 0 ? null : v))))(x);
var getLanguageCustomSettings = (language, config) => ({
  ...config.customSettings[language]
});
var preventFocus = (container) => {
  const editorFocusArea = container.querySelector("textarea") || // monaco
  container.querySelector('[role="textbox"]');
  if (editorFocusArea) {
    const disableFocus = () => editorFocusArea.tabIndex = -1;
    const ob = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (
          // avoid infinite loop
          mutation.type === "attributes" && mutation.attributeName === "tabindex" && editorFocusArea.tabIndex !== -1
        ) {
          disableFocus();
        }
      }
    });
    ob.observe(editorFocusArea, { attributes: true });
    disableFocus();
  }
};
var predefinedValues = {
  APP_VERSION: "47",
  SDK_VERSION: "0.12.0",
  COMMIT_SHA: "7b4906d",
  REPO_URL: "https://github.com/live-codes/livecodes",
  DOCS_BASE_URL: "http://localhost:3000/docs/"
};

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
var cm6ThemeBasicLightUrl = /* @__PURE__ */ getUrl(
  "cm6-theme-basic-light@0.2.0/dist/index.js"
);
var cm6ThemeBasicDarkUrl = /* @__PURE__ */ getUrl(
  "cm6-theme-basic-dark@0.2.0/dist/index.js"
);
var cm6ThemeGruvboxLightUrl = /* @__PURE__ */ getUrl(
  "cm6-theme-gruvbox-light@0.2.0/dist/index.js"
);
var cm6ThemeGruvboxDarkUrl = /* @__PURE__ */ getUrl(
  "cm6-theme-gruvbox-dark@0.2.0/dist/index.js"
);
var cm6ThemeMaterialDarkUrl = /* @__PURE__ */ getUrl(
  "cm6-theme-material-dark@0.2.0/dist/index.js"
);
var cm6ThemeNordUrl = /* @__PURE__ */ getUrl("cm6-theme-nord@0.2.0/dist/index.js");
var cm6ThemeSolarizedLightUrl = /* @__PURE__ */ getUrl(
  "cm6-theme-solarized-light@0.2.0/dist/index.js"
);
var cm6ThemeSolarizedDarkUrl = /* @__PURE__ */ getUrl(
  "cm6-theme-solarized-dark@0.2.0/dist/index.js"
);
var ddietrCmThemesBaseUrl = /* @__PURE__ */ getUrl(
  "@ddietr/codemirror-themes@1.4.2/dist/theme/"
);
var dotUrl = /* @__PURE__ */ getUrl("dot@1.1.3/doT.js");
var ejsUrl = /* @__PURE__ */ getUrl("ejs@3.1.10/ejs.js");
var etaUrl = /* @__PURE__ */ getUrl("eta@3.4.0/dist/eta.umd.js");
var fontAnonymousProUrl = /* @__PURE__ */ getUrl(
  "@fontsource/anonymous-pro@4.5.9/index.css"
);
var fontAstigmataUrl = /* @__PURE__ */ getUrl(
  "gh:hatemhosny/astigmata-font@6d0ee00a07fb1932902f0b81a504d075d47bd52f/index.css"
);
var fontCascadiaCodeUrl = /* @__PURE__ */ getUrl(
  "@fontsource/cascadia-code@4.2.1/index.css"
);
var fontCodeNewRomanUrl = /* @__PURE__ */ getUrl(
  "https://fonts.cdnfonts.com/css/code-new-roman-2"
);
var fontComicMonoUrl = /* @__PURE__ */ getUrl("comic-mono@0.0.1/index.css");
var fontCourierPrimeUrl = /* @__PURE__ */ getUrl(
  "@fontsource/courier-prime@4.5.9/index.css"
);
var fontDECTerminalModernUrl = /* @__PURE__ */ getUrl(
  "https://fonts.cdnfonts.com/css/dec-terminal-modern"
);
var fontDejaVuMonoUrl = /* @__PURE__ */ getUrl("@fontsource/dejavu-mono@4.5.4/index.css");
var fontFantasqueUrl = /* @__PURE__ */ getUrl(
  "@typopro/web-fantasque-sans-mono@3.7.5/TypoPRO-FantasqueSansMono.css"
);
var fontFiraCodeUrl = /* @__PURE__ */ getUrl("firacode@6.2.0/distr/fira_code.css");
var fontFixedsysUrl = /* @__PURE__ */ getUrl("https://fonts.cdnfonts.com/css/fixedsys-62");
var fontHackUrl = /* @__PURE__ */ getUrl("hack-font@3.3.0/build/web/hack.css");
var fontHermitUrl = /* @__PURE__ */ getUrl("typeface-hermit@0.0.44/index.css");
var fontIBMPlexMonoUrl = /* @__PURE__ */ getUrl(
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap"
);
var fontInconsolataUrl = /* @__PURE__ */ getUrl(
  "https://fonts.googleapis.com/css2?family=Inconsolata&display=swap"
);
var fontIosevkaUrl = /* @__PURE__ */ getUrl("@fontsource/iosevka@4.5.4/index.css");
var fontJetbrainsMonoUrl = /* @__PURE__ */ getUrl(
  "@fontsource/jetbrains-mono@4.5.11/index.css"
);
var fontMenloUrl = /* @__PURE__ */ getUrl("https://fonts.cdnfonts.com/css/menlo");
var fontMonaspaceBaseUrl = /* @__PURE__ */ getUrl("monaspace-font@0.0.2/");
var fontMonofurUrl = /* @__PURE__ */ getUrl("https://fonts.cdnfonts.com/css/monofur");
var fontMonoidUrl = /* @__PURE__ */ getUrl("@typopro/web-monoid@3.7.5/TypoPRO-Monoid.css");
var fontNotoUrl = /* @__PURE__ */ getUrl(
  "https://fonts.googleapis.com/css2?family=Noto+Sans+Mono&display=swap"
);
var fontNovaMonoUrl = /* @__PURE__ */ getUrl(
  "https://fonts.googleapis.com/css2?family=Nova+Mono&display=swap"
);
var fontOpenDyslexicUrl = /* @__PURE__ */ getUrl(
  "@fontsource/opendyslexic@4.5.4/index.css"
);
var fontProFontWindowsUrl = /* @__PURE__ */ getUrl(
  "https://fonts.cdnfonts.com/css/profontwindows"
);
var fontRobotoMonoUrl = /* @__PURE__ */ getUrl("@fontsource/roboto-mono@4.5.8/index.css");
var fontSFMonoUrl = /* @__PURE__ */ getUrl("https://fonts.cdnfonts.com/css/sf-mono");
var fontSourceCodeProUrl = /* @__PURE__ */ getUrl(
  "@fontsource/source-code-pro@4.5.12/index.css"
);
var fontSpaceMonoUrl = /* @__PURE__ */ getUrl("@fontsource/space-mono@4.5.10/index.css");
var fontSudoVarUrl = /* @__PURE__ */ getUrl("https://fonts.cdnfonts.com/css/sudo-var");
var fontUbuntuMonoUrl = /* @__PURE__ */ getUrl("@fontsource/ubuntu-mono@4.5.11/index.css");
var fontVictorMonoUrl = /* @__PURE__ */ getUrl("victormono@1.5.4/dist/index.css");
var go2jsBaseUrl = /* @__PURE__ */ getUrl("@live-codes/go2js@0.5.0/build/");
var handlebarsBaseUrl = /* @__PURE__ */ getUrl("handlebars@4.7.8/dist/");
var imbaBaseUrl = /* @__PURE__ */ getUrl("imba@2.0.0-alpha.229/dist/");
var liquidJsUrl = /* @__PURE__ */ getUrl("liquidjs@10.14.0/dist/liquid.browser.min.js");
var malinaBaseUrl = /* @__PURE__ */ getUrl(`malinajs@0.7.19/`);
var markedUrl = /* @__PURE__ */ getUrl("marked@13.0.2/marked.min.js");
var mjmlUrl = /* @__PURE__ */ getUrl("mjml-browser@4.15.3/lib/index.js");
var monacoThemesBaseUrl = /* @__PURE__ */ getUrl("monaco-themes@0.4.4/themes/");
var mustacheUrl = /* @__PURE__ */ getUrl("mustache@4.2.0/mustache.js");
var nunjucksBaseUrl = /* @__PURE__ */ getUrl("nunjucks@3.2.4/browser/");
var opalBaseUrl = /* @__PURE__ */ getUrl("https://cdn.opalrb.com/opal/1.8.2/");
var parinferUrl = /* @__PURE__ */ getUrl("parinfer@3.13.1/parinfer.js");
var prettierBaseUrl = /* @__PURE__ */ getUrl("prettier@3.3.2/");
var prettierPhpUrl = /* @__PURE__ */ getUrl("@prettier/plugin-php@0.22.2/standalone.js");
var prismOfficialThemesBaseUrl = /* @__PURE__ */ getUrl("prismjs@1.29.0/themes/");
var prismThemesBaseUrl = /* @__PURE__ */ getUrl("prism-themes@1.9.0/themes/");
var prismThemeNordUrl = /* @__PURE__ */ getUrl(
  "gh:GalenWong/nord-prism-js@9f085d2a64b37f72a516540ba3f87877d12d7e2d/prism-nord.css"
);
var prismThemesLaserWaveUrl = /* @__PURE__ */ getUrl(
  "gh:PrismJS/prism-themes@447479fc7b2be2051fe27e561aceed7cc87a589f/themes/prism-laserwave.css"
);
var riotBaseUrl = /* @__PURE__ */ getUrl("riot@9.2.2/");
var sqlFormatterUrl = /* @__PURE__ */ getUrl(
  "sql-formatter@12.2.1/dist/sql-formatter.min.js"
);
var sqljsBaseUrl = /* @__PURE__ */ getUrl("sql.js@1.10.3/dist/");
var squintCljsBaseUrl = /* @__PURE__ */ getUrl("squint-cljs@0.4.81/");
var stencilUrl = /* @__PURE__ */ getUrl("@stencil/core@3.2.2/compiler/stencil.js");
var svelteBaseUrl = /* @__PURE__ */ getUrl("svelte@5.12.0/");
var thememirrorBaseUrl = /* @__PURE__ */ getUrl("thememirror@2.0.1/dist/themes/");
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

// src/livecodes/config/config.ts
var getEditorConfig = (config) => cloneObject({
  editor: config.editor ?? (config.readonly === true ? "codejar" : void 0),
  theme: config.theme,
  themeColor: config.themeColor,
  editorTheme: config.editorTheme,
  fontFamily: config.fontFamily,
  fontSize: config.fontSize,
  useTabs: config.useTabs,
  tabSize: config.tabSize,
  lineNumbers: config.lineNumbers,
  wordWrap: config.wordWrap,
  closeBrackets: config.closeBrackets,
  foldRegions: config.foldRegions,
  emmet: config.emmet,
  enableAI: config.enableAI,
  editorMode: config.editorMode
});
var getFormatterConfig = (config) => cloneObject({
  useTabs: config.useTabs,
  tabSize: config.tabSize,
  semicolons: config.semicolons,
  singleQuote: config.singleQuote,
  trailingComma: config.trailingComma
});

// src/livecodes/editor/codejar/prism-themes.ts
var changeLineNumberColor = (color) => `.line-numbers-rows > span::before { color: ${color} !important; }`;
var prismThemes = [
  { name: "a11y-dark", title: "A11y Dark", url: prismThemesBaseUrl + "prism-a11y-dark.css" },
  { name: "atom-dark", title: "Atom Dark", url: prismThemesBaseUrl + "prism-atom-dark.css" },
  {
    name: "base16-ateliersulphurpool-light",
    title: "Base16 Ateliersulphurpool Light",
    url: prismThemesBaseUrl + "prism-base16-ateliersulphurpool.light.css"
  },
  {
    name: "catppuccin-latte",
    title: "Catppuccin Latte",
    url: vendorsBaseUrl + "catppuccin/prism/latte.css"
  },
  {
    name: "catppuccin-frappe",
    title: "Catppuccin Frappe",
    url: vendorsBaseUrl + "catppuccin/prism/frappe.css"
  },
  {
    name: "catppuccin-macchiato",
    title: "Catppuccin Macchiato",
    url: vendorsBaseUrl + "catppuccin/prism/macchiato.css"
  },
  {
    name: "catppuccin-mocha",
    title: "Catppuccin Mocha",
    url: vendorsBaseUrl + "catppuccin/prism/mocha.css"
  },
  { name: "cb", title: "CB", url: prismThemesBaseUrl + "prism-cb.css" },
  {
    name: "coldark-cold",
    title: "Coldark Cold",
    url: prismThemesBaseUrl + "prism-coldark-cold.css"
  },
  {
    name: "coldark-dark",
    title: "Coldark Dark",
    url: prismThemesBaseUrl + "prism-coldark-dark.css"
  },
  { name: "coy", title: "Coy", url: prismOfficialThemesBaseUrl + "prism-coy.css" },
  {
    name: "coy-without-shadows",
    title: "Coy Without Shadows",
    url: prismThemesBaseUrl + "prism-coy-without-shadows.css"
  },
  { name: "darcula", title: "Darcula", url: prismThemesBaseUrl + "prism-darcula.css" },
  { name: "dark", title: "Dark", url: prismOfficialThemesBaseUrl + "prism-dark.css" },
  { name: "dracula", title: "Dracula", url: prismThemesBaseUrl + "prism-dracula.css" },
  {
    name: "duotone-dark",
    title: "Duotone Dark",
    url: prismThemesBaseUrl + "prism-duotone-dark.css"
  },
  {
    name: "duotone-earth",
    title: "Duotone Earth",
    url: prismThemesBaseUrl + "prism-duotone-earth.css"
  },
  {
    name: "duotone-forest",
    title: "Duotone Forest",
    url: prismThemesBaseUrl + "prism-duotone-forest.css"
  },
  {
    name: "duotone-light",
    title: "Duotone Light",
    url: prismThemesBaseUrl + "prism-duotone-light.css"
  },
  {
    name: "duotone-sea",
    title: "Duotone Sea",
    url: prismThemesBaseUrl + "prism-duotone-sea.css"
  },
  {
    name: "duotone-space",
    title: "Duotone Space",
    url: prismThemesBaseUrl + "prism-duotone-space.css"
  },
  { name: "funky", title: "Funky", url: prismOfficialThemesBaseUrl + "prism-funky.css" },
  { name: "ghcolors", title: "GH Colors", url: prismThemesBaseUrl + "prism-ghcolors.css" },
  {
    name: "gruvbox-dark",
    title: "Gruvbox Dark",
    url: prismThemesBaseUrl + "prism-gruvbox-dark.css"
  },
  {
    name: "gruvbox-light",
    title: "Gruvbox Light",
    url: prismThemesBaseUrl + "prism-gruvbox-light.css"
  },
  { name: "holi-theme", title: "Holi Theme", url: prismThemesBaseUrl + "prism-holi-theme.css" },
  { name: "hopscotch", title: "Hopscotch", url: prismThemesBaseUrl + "prism-hopscotch.css" },
  { name: "laserwave", title: "Laserwave", url: prismThemesLaserWaveUrl },
  { name: "lucario", title: "Lucario", url: prismThemesBaseUrl + "prism-lucario.css" },
  {
    name: "material-dark",
    title: "Material Dark",
    url: prismThemesBaseUrl + "prism-material-dark.css"
  },
  {
    name: "material-light",
    title: "Material Light",
    url: prismThemesBaseUrl + "prism-material-light.css"
  },
  {
    name: "material-oceanic",
    title: "Material Oceanic",
    url: prismThemesBaseUrl + "prism-material-oceanic.css"
  },
  {
    name: "monochrome",
    title: "Monochrome",
    // code[class*="language-"],pre[class*="language-"]{color:#24292e;background-color:#fffffe;}
    url: "data:text/css;charset=UTF-8;base64,Y29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLHByZVtjbGFzcyo9Imxhbmd1YWdlLSJde2NvbG9yOiMyNDI5MmU7YmFja2dyb3VuZC1jb2xvcjojZmZmZmZlO30="
  },
  {
    name: "monochrome-dark",
    title: "Monochrome Dark",
    // code[class*="language-"],pre[class*="language-"]{color:#e2e2e3;background-color:#24292e;}
    url: "data:text/css;charset=UTF-8;base64,Y29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLHByZVtjbGFzcyo9Imxhbmd1YWdlLSJde2NvbG9yOiNlMmUyZTM7YmFja2dyb3VuZC1jb2xvcjojMjQyOTJlO30="
  },
  { name: "night-owl", title: "Night Owl", url: prismThemesBaseUrl + "prism-night-owl.css" },
  { name: "nord", title: "Nord", url: prismThemesBaseUrl + "prism-nord.css" },
  { name: "nord-2", title: "Nord 2", url: prismThemeNordUrl },
  { name: "okaidia", title: "Okaidia", url: prismOfficialThemesBaseUrl + "prism-okaidia.css" },
  { name: "one-dark", title: "One Dark", url: prismThemesBaseUrl + "prism-one-dark.css" },
  { name: "one-light", title: "One Light", url: prismThemesBaseUrl + "prism-one-light.css" },
  { name: "pojoaque", title: "Pojoaque", url: prismThemesBaseUrl + "prism-pojoaque.css" },
  {
    name: "shades-of-purple",
    title: "Shades of Purple",
    url: prismThemesBaseUrl + "prism-shades-of-purple.css"
  },
  {
    name: "solarized-dark-atom",
    title: "Solarized Dark Atom",
    url: prismThemesBaseUrl + "prism-solarized-dark-atom.css"
  },
  {
    name: "solarized-light",
    title: "Solarized Light",
    url: prismOfficialThemesBaseUrl + "prism-solarizedlight.css"
  },
  { name: "synthwave84", title: "Synthwave 84", url: prismThemesBaseUrl + "prism-synthwave84.css" },
  { name: "tomorrow", title: "Tomorrow", url: prismOfficialThemesBaseUrl + "prism-tomorrow.css" },
  { name: "twilight", title: "Twilight", url: prismOfficialThemesBaseUrl + "prism-twilight.css" },
  { name: "vs", title: "VS", url: prismThemesBaseUrl + "prism-vs.css" },
  {
    name: "vsc-dark-plus",
    title: "VSC Dark Plus",
    url: prismThemesBaseUrl + "prism-vsc-dark-plus.css"
  },
  {
    name: "xonokai",
    title: "Xonokai",
    url: prismThemesBaseUrl + "prism-xonokai.css",
    overrideCSS: changeLineNumberColor("#6f705e")
  },
  { name: "z-touchs", title: "Z-Touchs", url: prismThemesBaseUrl + "prism-z-touch.css" }
];

// src/livecodes/editor/codemirror/codemirror-themes.ts
import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
var codemirrorThemes = [
  {
    name: "amy",
    title: "Amy",
    url: thememirrorBaseUrl + "amy.js",
    exportName: "amy"
  },
  {
    name: "aura",
    title: "Aura",
    url: ddietrCmThemesBaseUrl + "aura.js",
    exportName: "aura"
  },
  {
    name: "ayu-light",
    title: "Ayu Light",
    url: thememirrorBaseUrl + "ayu-light.js",
    exportName: "ayuLight"
  },
  {
    name: "barf",
    title: "Barf",
    url: thememirrorBaseUrl + "barf.js",
    exportName: "barf"
  },
  {
    name: "basic-light",
    title: "Basic Light",
    url: cm6ThemeBasicLightUrl,
    exportName: "basicLight"
  },
  {
    name: "basic-dark",
    title: "Basic Dark",
    url: cm6ThemeBasicDarkUrl,
    exportName: "basicDark"
  },
  {
    name: "bespin",
    title: "Bespin",
    url: thememirrorBaseUrl + "bespin.js",
    exportName: "bespin"
  },
  {
    name: "birds-of-paradise",
    title: "Birds of Paradise",
    url: thememirrorBaseUrl + "birds-of-paradise.js",
    exportName: "birdsOfParadise"
  },
  {
    name: "boys-and-girls",
    title: "Boys and Girls",
    url: thememirrorBaseUrl + "boys-and-girls.js",
    exportName: "boysAndGirls"
  },
  {
    name: "catppuccin-latte",
    title: "Catppuccin Latte",
    url: vendorsBaseUrl + "catppuccin/codemirror/codemirror-theme-catppuccin.js",
    exportName: "catppuccinLatte"
  },
  {
    name: "catppuccin-frappe",
    title: "Catppuccin Frappe",
    url: vendorsBaseUrl + "catppuccin/codemirror/codemirror-theme-catppuccin.js",
    exportName: "catppuccinFrappe"
  },
  {
    name: "catppuccin-macchiato",
    title: "Catppuccin Macchiato",
    url: vendorsBaseUrl + "catppuccin/codemirror/codemirror-theme-catppuccin.js",
    exportName: "catppuccinMacchiato"
  },
  {
    name: "catppuccin-mocha",
    title: "Catppuccin Mocha",
    url: vendorsBaseUrl + "catppuccin/codemirror/codemirror-theme-catppuccin.js",
    exportName: "catppuccinMocha"
  },
  {
    name: "clouds",
    title: "Clouds",
    url: thememirrorBaseUrl + "clouds.js",
    exportName: "clouds"
  },
  {
    name: "cobalt",
    title: "Cobalt",
    url: thememirrorBaseUrl + "cobalt.js",
    exportName: "cobalt"
  },
  { name: "cm-light", title: "Codemirror Light" },
  {
    name: "cool-glow",
    title: "Cool Glow",
    url: thememirrorBaseUrl + "cool-glow.js",
    exportName: "coolGlow"
  },
  {
    name: "dracula",
    title: "Dracula",
    url: thememirrorBaseUrl + "dracula.js",
    exportName: "dracula"
  },
  {
    name: "espresso",
    title: "Espresso",
    url: thememirrorBaseUrl + "espresso.js",
    exportName: "espresso"
  },
  {
    name: "github-dark",
    title: "GitHub Dark",
    url: ddietrCmThemesBaseUrl + "github-dark.js",
    exportName: "githubDark"
  },
  {
    name: "github-light",
    title: "GitHub Light",
    url: ddietrCmThemesBaseUrl + "github-light.js",
    exportName: "githubLight"
  },
  {
    name: "gruvbox-dark",
    title: "Gruvbox Dark",
    url: cm6ThemeGruvboxDarkUrl,
    exportName: "gruvboxDark"
  },
  {
    name: "gruvbox-light",
    title: "Gruvbox Light",
    url: cm6ThemeGruvboxLightUrl,
    exportName: "gruvboxLight"
  },
  {
    name: "material-dark",
    title: "Material Dark",
    url: cm6ThemeMaterialDarkUrl,
    exportName: "materialDark"
  },
  {
    name: "material-light",
    title: "Material Light",
    url: ddietrCmThemesBaseUrl + "material-light.js",
    exportName: "materialLight"
  },
  { name: "monochrome", title: "Monochrome" },
  { name: "monochrome-dark", title: "Monochrome Dark" },
  {
    name: "noctis-lilac",
    title: "Noctis Lilac",
    url: thememirrorBaseUrl + "noctis-lilac.js",
    exportName: "noctisLilac"
  },
  {
    name: "nord",
    title: "Nord",
    url: cm6ThemeNordUrl,
    exportName: "nord"
  },
  { name: "one-dark", title: "One Dark" },
  {
    name: "rose-pine-dawn",
    title: "Ros\xE9 Pine Dawn",
    url: thememirrorBaseUrl + "rose-pine-dawn.js",
    exportName: "rosePineDawn"
  },
  {
    name: "smoothy",
    title: "Smoothy",
    url: thememirrorBaseUrl + "smoothy.js",
    exportName: "smoothy"
  },
  {
    name: "solarized-dark",
    title: "Solarized Dark",
    url: cm6ThemeSolarizedDarkUrl,
    exportName: "solarizedDark"
  },
  {
    name: "solarized-light",
    title: "Solarized Light",
    url: cm6ThemeSolarizedLightUrl,
    exportName: "solarizedLight"
  },
  {
    name: "tokyo-night",
    title: "Tokyo Night",
    url: ddietrCmThemesBaseUrl + "tokyo-night.js",
    exportName: "tokyoNight"
  },
  {
    name: "tokyo-night-day",
    title: "Tokyo Night Day",
    url: ddietrCmThemesBaseUrl + "tokyo-night-day.js",
    exportName: "tokyoNightDay"
  },
  {
    name: "tokyo-night-storm",
    title: "Tokyo Night Storm",
    url: ddietrCmThemesBaseUrl + "tokyo-night-storm.js",
    exportName: "tokyoNightStorm"
  },
  {
    name: "tomorrow",
    title: "Tomorrow",
    url: thememirrorBaseUrl + "tomorrow.js",
    exportName: "tomorrow"
  }
];
var createTheme = ({
  variant,
  settings,
  styles
}) => {
  const theme = EditorView.theme(
    {
      "&": {
        backgroundColor: settings.background,
        color: settings.foreground
      },
      ".cm-content": {
        caretColor: settings.caret
      },
      ".cm-cursor, .cm-dropCursor": {
        borderLeftColor: settings.caret
      },
      "&.cm-focused .cm-selectionBackgroundm .cm-selectionBackground, .cm-selectionMatch, .cm-content ::selection": {
        backgroundColor: settings.selection
      },
      ".cm-activeLine": {
        backgroundColor: settings.lineHighlight
      },
      ".cm-gutters": {
        backgroundColor: settings.gutterBackground,
        color: settings.gutterForeground
      },
      ".cm-activeLineGutter": {
        backgroundColor: settings.lineHighlight
      }
    },
    {
      dark: variant === "dark"
    }
  );
  const highlightStyle = HighlightStyle.define(styles);
  const extension = [theme, syntaxHighlighting(highlightStyle)];
  return extension;
};
var customThemes = {
  monochrome: createTheme({
    variant: "light",
    settings: {
      background: "#fffffe",
      foreground: "#24292e",
      caret: "#24292e",
      selection: "#c8c8fa",
      gutterBackground: "#fffffe",
      gutterForeground: "#24292e",
      lineHighlight: "#f1faff"
    },
    styles: []
  }),
  "monochrome-dark": createTheme({
    variant: "dark",
    settings: {
      background: "#24292e",
      foreground: "#e2e2e3",
      caret: "#e2e2e3",
      selection: "#444d56",
      gutterBackground: "#24292e",
      gutterForeground: "#e2e2e3",
      lineHighlight: "#444d56"
    },
    styles: []
  })
};

// src/livecodes/editor/fonts.ts
var fonts = [
  {
    id: "anonymous-pro",
    name: "Anonymous Pro",
    url: fontAnonymousProUrl
  },
  {
    id: "astigmata",
    name: "Astigmata",
    url: fontAstigmataUrl
  },
  {
    id: "cascadia-code",
    name: "Cascadia Code",
    url: fontCascadiaCodeUrl
  },
  {
    id: "comic-mono",
    name: "Code New Roman",
    url: fontCodeNewRomanUrl
  },
  {
    id: "comic-mono",
    name: "Comic Mono",
    url: fontComicMonoUrl
  },
  {
    id: "courier-prime",
    name: "Courier Prime",
    url: fontCourierPrimeUrl
  },
  {
    id: "dec-terminal-modern",
    name: "DEC Terminal Modern",
    url: fontDECTerminalModernUrl
  },
  {
    id: "dejavu-mono",
    name: "DejaVu Mono",
    url: fontDejaVuMonoUrl
  },
  {
    id: "fantasque-sans-mono",
    name: "TypoPRO Fantasque Sans Mono",
    label: "Fantasque Sans Mono",
    url: fontFantasqueUrl
  },
  {
    id: "fira-code",
    name: "Fira Code",
    url: fontFiraCodeUrl
  },
  {
    id: "fixedsys",
    name: "Fixedsys 62",
    label: "Fixedsys",
    url: fontFixedsysUrl
  },
  {
    id: "hack",
    name: "Hack",
    url: fontHackUrl
  },
  {
    id: "hermit",
    name: "Hermit",
    url: fontHermitUrl
  },
  {
    id: "ibm-plex-mono",
    name: "IBM Plex Mono",
    url: fontIBMPlexMonoUrl
  },
  {
    id: "inconsolata",
    name: "Inconsolata",
    url: fontInconsolataUrl
  },
  {
    id: "iosevka",
    name: "Iosevka",
    url: fontIosevkaUrl
  },
  {
    id: "jetbrains-mono",
    name: "JetBrains Mono",
    url: fontJetbrainsMonoUrl
  },
  {
    id: "menlo",
    name: "Menlo",
    url: fontMenloUrl
  },
  {
    id: "monaspace-argon",
    name: "Monaspace Argon",
    url: fontMonaspaceBaseUrl + "argon.css"
  },
  {
    id: "monaspace-krypton",
    name: "Monaspace Krypton",
    url: fontMonaspaceBaseUrl + "krypton.css"
  },
  {
    id: "monaspace-neon",
    name: "Monaspace Neon",
    url: fontMonaspaceBaseUrl + "neon.css"
  },
  {
    id: "monaspace-radon",
    name: "Monaspace Radon",
    url: fontMonaspaceBaseUrl + "radon.css"
  },
  {
    id: "monaspace-xenon",
    name: "Monaspace Xenon",
    url: fontMonaspaceBaseUrl + "xenon.css"
  },
  {
    id: "monofur",
    name: "Monofur",
    url: fontMonofurUrl
  },
  {
    id: "monoid",
    name: "TypoPRO Monoid",
    label: "Monoid",
    url: fontMonoidUrl
  },
  {
    id: "noto-sans-mono",
    name: "Noto Sans Mono",
    url: fontNotoUrl
  },
  {
    id: "nova-mono",
    name: "Nova Mono",
    url: fontNovaMonoUrl
  },
  {
    id: "opendyslexic",
    name: "OpenDyslexic",
    url: fontOpenDyslexicUrl
  },
  {
    id: "profontwindows",
    name: "ProFontWindows",
    label: "ProFont",
    url: fontProFontWindowsUrl
  },
  {
    id: "roboto-mono",
    name: "Roboto Mono",
    url: fontRobotoMonoUrl
  },
  {
    id: "sf-mono",
    name: "SF Mono",
    url: fontSFMonoUrl
  },
  {
    id: "source-code-pro",
    name: "Source Code Pro",
    url: fontSourceCodeProUrl
  },
  {
    id: "space-mono",
    name: "Space Mono",
    url: fontSpaceMonoUrl
  },
  {
    id: "sudo-var",
    name: "Sudo Var",
    url: fontSudoVarUrl
  },
  {
    id: "ubuntu-mono",
    name: "Ubuntu Mono",
    url: fontUbuntuMonoUrl
  },
  {
    id: "victor-mono",
    name: "Victor Mono",
    url: fontVictorMonoUrl
  }
];
var getFontFamily = (font) => {
  const defaultFonts = 'Consolas, "Roboto Mono", "Ubuntu Mono", ui-monospace, monospace';
  if (!font)
    return defaultFonts;
  const fontName = fonts.find((f) => [f.id, f.name, f.label].includes(font))?.name;
  return fontName ? `"${fontName}", ${defaultFonts}` : defaultFonts;
};

// src/livecodes/editor/monaco/monaco-themes.ts
var monacoThemes = [
  {
    name: "active4d",
    title: "Active4D",
    url: monacoThemesBaseUrl + "Active4D.json"
  },
  {
    name: "all-hallows-eve",
    title: "All Hallows Eve",
    url: monacoThemesBaseUrl + "All Hallows Eve.json"
  },
  {
    name: "amy",
    title: "Amy",
    url: monacoThemesBaseUrl + "Amy.json"
  },
  {
    name: "birds-of-paradise",
    title: "Birds of Paradise",
    url: monacoThemesBaseUrl + "Birds of Paradise.json"
  },
  {
    name: "blackboard",
    title: "Blackboard",
    url: monacoThemesBaseUrl + "Blackboard.json"
  },
  {
    name: "brilliance-black",
    title: "Brilliance Black",
    url: monacoThemesBaseUrl + "Brilliance Black.json"
  },
  {
    name: "brilliance-dull",
    title: "Brilliance Dull",
    url: monacoThemesBaseUrl + "Brilliance Dull.json"
  },
  {
    name: "catppuccin-latte",
    title: "Catppuccin Latte",
    url: vendorsBaseUrl + "catppuccin/monaco/latte.json"
  },
  {
    name: "catppuccin-frappe",
    title: "Catppuccin Frappe",
    url: vendorsBaseUrl + "catppuccin/monaco/frappe.json"
  },
  {
    name: "catppuccin-macchiato",
    title: "Catppuccin Macchiato",
    url: vendorsBaseUrl + "catppuccin/monaco/macchiato.json"
  },
  {
    name: "catppuccin-mocha",
    title: "Catppuccin Mocha",
    url: vendorsBaseUrl + "catppuccin/monaco/mocha.json"
  },
  {
    name: "chrome-devtools",
    title: "Chrome DevTools",
    url: monacoThemesBaseUrl + "Chrome DevTools.json"
  },
  {
    name: "clouds-midnight",
    title: "Clouds Midnight",
    url: monacoThemesBaseUrl + "Clouds Midnight.json"
  },
  {
    name: "clouds",
    title: "Clouds",
    url: monacoThemesBaseUrl + "Clouds.json"
  },
  {
    name: "cobalt",
    title: "Cobalt",
    url: monacoThemesBaseUrl + "Cobalt.json"
  },
  {
    name: "cobalt2",
    title: "Cobalt2",
    url: monacoThemesBaseUrl + "Cobalt2.json"
  },
  {
    name: "dawn",
    title: "Dawn",
    url: monacoThemesBaseUrl + "Dawn.json"
  },
  {
    name: "dracula",
    title: "Dracula",
    url: monacoThemesBaseUrl + "Dracula.json"
  },
  {
    name: "dreamweaver",
    title: "Dreamweaver",
    url: monacoThemesBaseUrl + "Dreamweaver.json"
  },
  {
    name: "eiffel",
    title: "Eiffel",
    url: monacoThemesBaseUrl + "Eiffel.json"
  },
  {
    name: "espresso-libre",
    title: "Espresso Libre",
    url: monacoThemesBaseUrl + "Espresso Libre.json"
  },
  {
    name: "github",
    title: "GitHub",
    url: monacoThemesBaseUrl + "GitHub.json"
  },
  {
    name: "github-dark",
    title: "GitHub Dark",
    url: monacoThemesBaseUrl + "GitHub Dark.json"
  },
  {
    name: "github-light",
    title: "GitHub Light",
    url: monacoThemesBaseUrl + "GitHub Light.json"
  },
  {
    name: "hc-black",
    title: "High Contrast (Black)"
  },
  {
    name: "hc-light",
    title: "High Contrast (Light)"
  },
  {
    name: "idle",
    title: "Idle",
    url: monacoThemesBaseUrl + "IDLE.json"
  },
  {
    name: "idlefingers",
    title: "Idle Fingers",
    url: monacoThemesBaseUrl + "idleFingers.json"
  },
  {
    name: "iplastic",
    title: "iPlastic",
    url: monacoThemesBaseUrl + "iPlastic.json"
  },
  {
    name: "katzenmilch",
    title: "Katzenmilch",
    url: monacoThemesBaseUrl + "Katzenmilch.json"
  },
  {
    name: "krtheme",
    title: "krTheme",
    url: monacoThemesBaseUrl + "krTheme.json"
  },
  {
    name: "kuroir",
    title: "Kuroir Theme",
    url: monacoThemesBaseUrl + "Kuroir Theme.json"
  },
  {
    name: "lazy",
    title: "Lazy",
    url: monacoThemesBaseUrl + "LAZY.json"
  },
  {
    name: "magicwb-amiga",
    title: "MagicWB (Amiga)",
    url: monacoThemesBaseUrl + "MagicWB (Amiga).json"
  },
  {
    name: "merbivore-soft",
    title: "Merbivore Soft",
    url: monacoThemesBaseUrl + "Merbivore Soft.json"
  },
  {
    name: "merbivore",
    title: "Merbivore",
    url: monacoThemesBaseUrl + "Merbivore.json"
  },
  {
    name: "monochrome",
    title: "Monochrome"
  },
  {
    name: "monochrome-dark",
    title: "Monochrome Dark"
  },
  {
    name: "monoindustrial",
    title: "monoindustrial",
    url: monacoThemesBaseUrl + "monoindustrial.json"
  },
  {
    name: "monokai",
    title: "Monokai",
    url: monacoThemesBaseUrl + "Monokai.json"
  },
  {
    name: "monokai-bright",
    title: "Monokai Bright",
    url: monacoThemesBaseUrl + "Monokai Bright.json"
  },
  {
    name: "night-owl",
    title: "Night Owl",
    url: monacoThemesBaseUrl + "Night Owl.json"
  },
  {
    name: "nord",
    title: "Nord",
    url: monacoThemesBaseUrl + "Nord.json"
  },
  {
    name: "oceanic-next",
    title: "Oceanic Next",
    url: monacoThemesBaseUrl + "Oceanic Next.json"
  },
  {
    name: "pastels-on-dark",
    title: "Pastels on Dark",
    url: monacoThemesBaseUrl + "Pastels on Dark.json"
  },
  {
    name: "slush-and-poppies",
    title: "Slush and Poppies",
    url: monacoThemesBaseUrl + "Slush and Poppies.json"
  },
  {
    name: "solarized-dark",
    title: "Solarized Dark",
    url: monacoThemesBaseUrl + "Solarized-dark.json"
  },
  {
    name: "solarized-light",
    title: "Solarized Light",
    url: monacoThemesBaseUrl + "Solarized-light.json"
  },
  {
    name: "spacecadet",
    title: "SpaceCadet",
    url: monacoThemesBaseUrl + "SpaceCadet.json"
  },
  {
    name: "sunburst",
    title: "Sunburst",
    url: monacoThemesBaseUrl + "Sunburst.json"
  },
  {
    name: "textmate-mac-classic",
    title: "Textmate (Mac Classic)",
    url: monacoThemesBaseUrl + "Textmate (Mac Classic).json"
  },
  {
    name: "tomorrow",
    title: "Tomorrow",
    url: monacoThemesBaseUrl + "Tomorrow.json"
  },
  {
    name: "tomorrow-night",
    title: "Tomorrow Night",
    url: monacoThemesBaseUrl + "Tomorrow-Night.json"
  },
  {
    name: "tomorrow-night-blue",
    title: "Tomorrow Night Blue",
    url: monacoThemesBaseUrl + "Tomorrow-Night-Blue.json"
  },
  {
    name: "tomorrow-night-bright",
    title: "Tomorrow Night Bright",
    url: monacoThemesBaseUrl + "Tomorrow-Night-Bright.json"
  },
  {
    name: "tomorrow-night-eighties",
    title: "Tomorrow Night Eighties",
    url: monacoThemesBaseUrl + "Tomorrow-Night-Eighties.json"
  },
  {
    name: "twilight",
    title: "Twilight",
    url: monacoThemesBaseUrl + "Twilight.json"
  },
  {
    name: "upstream-sunburst",
    title: "Upstream Sunburst",
    url: monacoThemesBaseUrl + "Upstream Sunburst.json"
  },
  {
    name: "vibrant-ink",
    title: "Vibrant Ink",
    url: monacoThemesBaseUrl + "Vibrant Ink.json"
  },
  {
    name: "vs",
    title: "VS"
  },
  {
    name: "vs-dark",
    title: "VS Dark"
  },
  {
    name: "xcode-default",
    title: "Xcode Default",
    url: monacoThemesBaseUrl + "Xcode_default.json"
  },
  {
    name: "zenburnesque",
    title: "Zenburnesque",
    url: monacoThemesBaseUrl + "Zenburnesque.json"
  }
];

// src/livecodes/editor/themes.ts
var getEditorThemeData = (themeItem) => {
  let editorTheme = themeItem.trim();
  let editor;
  let theme;
  if (themeItem.includes(":")) {
    [editor, editorTheme] = editorTheme.split(":");
    if (editor !== "monaco" && editor !== "codemirror" && editor !== "codejar") {
      editor = void 0;
    }
  }
  if (themeItem.includes("@")) {
    [editorTheme, theme] = editorTheme.split("@");
    if (theme !== "light" && theme !== "dark") {
      theme = void 0;
    }
  }
  return { editor, editorTheme, theme };
};
var getEditorTheme = ({
  editor,
  editorTheme,
  theme,
  editorThemes
}) => {
  if (!editorTheme)
    return null;
  const themes = typeof editorTheme === "string" ? editorTheme.split(",").map((t) => t.trim()) : editorTheme;
  const editorThemeData = themes.map(getEditorThemeData);
  for (const editorThemeItem of editorThemeData) {
    if ((editorThemeItem.editor === editor || editorThemeItem.editor === void 0) && (editorThemeItem.theme === theme || editorThemeItem.theme === void 0) && editorThemes.includes(
      editorThemeItem.editorTheme
    )) {
      return editorThemeItem.editorTheme;
    }
  }
  return null;
};

// src/livecodes/html/editor-settings.html?raw
var editor_settings_default = '<div id="editor-settings-container" class="modal-container">\r\n  <div class="modal-title" data-i18n="editorSettings.heading">Editor Settings</div>\r\n  <div id="editor-settings-screen-container" class="modal-screen-container">\r\n    <div class="modal-screen">\r\n      <label data-i18n="editorSettings.preview">Preview</label>\r\n      <a href="#" id="editor-settings-format-link" data-i18n="editorSettings.format">Format</a>\r\n      <div id="editor-settings-preview-container" class="custom-editor"></div>\r\n      <form id="editor-settings-form"></form>\r\n      <div\r\n        class="description alert"\r\n        id="codejar-info"\r\n        data-i18n="editorSettings.codeJarDesc"\r\n        data-i18n-prop="innerHTML"\r\n      >\r\n        <i class="icon-alert"></i>\r\n        * The marked features are not available in CodeJar.\r\n      </div>\r\n      <div class="description help" data-i18n="editorSettings.desc" data-i18n-prop="innerHTML">\r\n        <i class="icon-help"></i>\r\n        Please check the\r\n        <a href="{{DOCS_BASE_URL}}features/editor-settings" target="_blank" rel="noopener"\r\n          >documentations</a\r\n        >\r\n        for details.\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n';

// src/livecodes/html/index.ts
var replaceValues = (str) => Object.entries(predefinedValues).reduce(
  (str2, [key, value]) => str2.replace(new RegExp(`{{${key}}}`, "g"), value),
  str
);
var editorSettingsScreen = /* @__PURE__ */ replaceValues(editor_settings_default);

// src/livecodes/UI/selectors.ts
var getEditorSettingsFormatLink = (editorSettingsContainer) => editorSettingsContainer.querySelector("#editor-settings-format-link");

// src/livecodes/UI/editor-settings.ts
var createEditorSettingsUI = async ({
  baseUrl,
  modal,
  eventsManager,
  scrollToSelector,
  deps
}) => {
  const userConfig = deps.getUserConfig();
  const div = document.createElement("div");
  div.innerHTML = editorSettingsScreen;
  const editorSettingsContainer = div.firstChild;
  modal.show(editorSettingsContainer, {
    isAsync: true,
    scrollToSelector,
    onClose: () => {
      editor?.destroy();
    }
  });
  const previewContainer = editorSettingsContainer.querySelector(
    "#editor-settings-preview-container"
  );
  const form = editorSettingsContainer.querySelector("#editor-settings-form");
  if (!previewContainer || !form)
    return;
  const defaultText = window.deps.translateString("editorSettings.default", "Default");
  const formFields = [
    {
      title: window.deps.translateString(
        "editorSettings.enableAI.heading",
        "Enable AI Code Assistant"
      ),
      name: "enableAI",
      options: [{ value: "true" }],
      help: `${"http://localhost:3000/docs/"}features/ai`,
      note: window.deps.translateString(
        "editorSettings.enableAI.note",
        'Powered by <a href="https://windsurf.com/" rel="noopener noreferrer" target="_blank"><img id="windsurf-logo" src="{{baseUrl}}assets/images/windsurf.svg" style="height: 3em; translate: 0 40%; margin-top: -2em;" alt="Windsurf" /></a>',
        {
          isHTML: true,
          baseUrl
        }
      )
    },
    {
      title: window.deps.translateString("editorSettings.editor.heading", "Editor"),
      name: "editor",
      options: [
        {
          label: defaultText,
          value: ""
        },
        {
          label: window.deps.translateString("editorSettings.editor.monaco", "Monaco"),
          value: "monaco"
        },
        {
          label: window.deps.translateString("editorSettings.editor.codemirror", "CodeMirror"),
          value: "codemirror"
        },
        {
          label: window.deps.translateString("editorSettings.editor.codejar", "CodeJar"),
          value: "codejar"
        }
      ],
      help: `${"http://localhost:3000/docs/"}features/editor-settings#code-editor`
    },
    {
      title: window.deps.translateString("editorSettings.theme", "Dark Mode"),
      name: "theme",
      options: [{ value: "true" }]
    },
    {
      title: window.deps.translateString("editorSettings.editorTheme", "Editor Theme"),
      name: "editorTheme-monaco-dark",
      options: [
        { label: defaultText, value: "" },
        ...monacoThemes.map((t) => ({ label: t.title, value: `monaco:${t.name}@dark` }))
      ]
    },
    {
      name: "editorTheme-monaco-light",
      options: [
        { label: defaultText, value: "" },
        ...monacoThemes.map((t) => ({ label: t.title, value: `monaco:${t.name}@light` }))
      ]
    },
    {
      name: "editorTheme-codemirror-dark",
      options: [
        { label: defaultText, value: "" },
        ...codemirrorThemes.map((t) => ({ label: t.title, value: `codemirror:${t.name}@dark` }))
      ]
    },
    {
      name: "editorTheme-codemirror-light",
      options: [
        { label: defaultText, value: "" },
        ...codemirrorThemes.map((t) => ({ label: t.title, value: `codemirror:${t.name}@light` }))
      ]
    },
    {
      name: "editorTheme-codejar-dark",
      options: [
        { label: defaultText, value: "" },
        ...prismThemes.map((t) => ({ label: t.title, value: `codejar:${t.name}@dark` }))
      ]
    },
    {
      name: "editorTheme-codejar-light",
      options: [
        { label: defaultText, value: "" },
        ...prismThemes.map((t) => ({ label: t.title, value: `codejar:${t.name}@light` }))
      ]
    },
    {
      title: window.deps.translateString("editorSettings.fontFamily", "Font Family"),
      name: "fontFamily",
      options: [
        { label: defaultText, value: "" },
        ...fonts.map((font) => ({ label: font.label || font.name, value: font.name }))
      ]
    },
    {
      title: window.deps.translateString("editorSettings.fontSize", "Font Size"),
      name: "fontSize",
      options: [
        { label: "10", value: "10" },
        { label: "11", value: "11" },
        { label: "12", value: "12" },
        { label: "13", value: "13" },
        { label: "14", value: "14", checked: true },
        { label: "15", value: "15" },
        { label: "16", value: "16" },
        { label: "17", value: "17" },
        { label: "18", value: "18" },
        { label: "19", value: "19" },
        { label: "20", value: "20" },
        { label: "22", value: "22" },
        { label: "24", value: "24" },
        { label: "26", value: "26" }
      ]
    },
    {
      title: window.deps.translateString("editorSettings.useTabs.heading", "Indentation"),
      name: "useTabs",
      options: [
        {
          label: window.deps.translateString("editorSettings.useTabs.spaces", "Spaces"),
          value: "false"
        },
        {
          label: window.deps.translateString("editorSettings.useTabs.tabs", "Tabs"),
          value: "true"
        }
      ]
    },
    {
      title: window.deps.translateString("editorSettings.tabSize", "Tab Size"),
      name: "tabSize",
      options: [
        { label: "1", value: "1" },
        { label: "2", value: "2", checked: true },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" }
      ]
    },
    {
      title: window.deps.translateString("editorSettings.lineNumbers", "Show line numbers"),
      name: "lineNumbers",
      options: [{ value: "true" }]
    },
    {
      title: window.deps.translateString(
        "editorSettings.lineNumbersRelative",
        "Relative line numbers *"
      ),
      name: "lineNumbersRelative",
      options: [{ value: "true" }]
    },
    {
      title: window.deps.translateString("editorSettings.wordWrap", "Word-wrap"),
      name: "wordWrap",
      options: [{ value: "true" }]
    },
    {
      title: window.deps.translateString(
        "editorSettings.closeBrackets",
        "Auto-close brackets and quotes"
      ),
      name: "closeBrackets",
      options: [{ value: "true" }]
    },
    {
      title: window.deps.translateString("editorSettings.foldRegions", "Fold (collapse) regions *"),
      name: "foldRegions",
      options: [{ value: "true" }],
      help: `${"http://localhost:3000/docs/"}configuration/configuration-object#foldregions`
    },
    {
      title: window.deps.translateString("editorSettings.emmet", "Enable Emmet *"),
      name: "emmet",
      options: [{ value: "true" }]
    },
    {
      title: window.deps.translateString("editorSettings.editorMode.heading", "Editor Mode *"),
      name: "editorMode",
      options: [
        { label: defaultText, value: "" },
        {
          label: window.deps.translateString("editorSettings.editorMode.vim", "Vim"),
          value: "vim"
        },
        {
          label: window.deps.translateString("editorSettings.editorMode.emacs", "Emacs"),
          value: "emacs"
        }
      ],
      help: `${"http://localhost:3000/docs/"}features/editor-settings#editor-modes`
    },
    {
      title: window.deps.translateString("editorSettings.semicolons", "Format: Use Semicolons"),
      name: "semicolons",
      options: [{ value: "true" }]
    },
    {
      title: window.deps.translateString("editorSettings.singleQuote", "Format: Use Single Quotes"),
      name: "singleQuote",
      options: [{ value: "true" }]
    },
    {
      title: window.deps.translateString(
        "editorSettings.trailingComma",
        "Format: Use Trailing Commas"
      ),
      name: "trailingComma",
      options: [{ value: "true" }]
    }
  ];
  const editorOptions = {
    baseUrl,
    container: previewContainer,
    editorId: "editorSettings",
    getLanguageExtension: () => "jsx",
    isEmbed: false,
    isLite: false,
    isHeadless: false,
    language: "jsx",
    mapLanguage: () => "javascript",
    readonly: false,
    value: editorContent,
    ...getEditorConfig(userConfig),
    ...getFormatterConfig(userConfig),
    getFormatterConfig: () => getFormatterConfig(deps.getUserConfig()),
    getFontFamily
  };
  let codeEditor = editorOptions.editor;
  const initializeEditor = async (options) => {
    const ed = await deps.createEditor(options);
    if (typeof ed.addTypes === "function") {
      deps.loadTypes(editorContent).then((types) => {
        types.forEach((type) => {
          ed?.addTypes?.(type);
        });
      });
    }
    deps.getFormatFn().then((fn) => {
      setTimeout(() => {
        ed.registerFormatter(fn);
        ed.format();
      }, 500);
    });
    getEditorSettingsFormatLink(editorSettingsContainer).onclick = (ev) => {
      ev.preventDefault();
      ed.format();
    };
    return ed;
  };
  const allThemes = [
    "editorTheme-monaco-dark",
    "editorTheme-monaco-light",
    "editorTheme-codemirror-dark",
    "editorTheme-codemirror-light",
    "editorTheme-codejar-dark",
    "editorTheme-codejar-light"
  ];
  formFields.forEach((field) => {
    let title;
    if (field.title) {
      title = document.createElement("label");
      title.innerHTML = field.title.replace(
        "*",
        `<a href="#codejar-info" title="${window.deps.translateString("editorSettings.notAvailableInCodeJar", "Not available in CodeJar")}" style="text-decoration: none;">*</a>`
      );
      title.dataset.name = field.name;
      form.appendChild(title);
    }
    if (field.help) {
      const helpLink = document.createElement("a");
      helpLink.href = field.help;
      helpLink.target = "_blank";
      helpLink.classList.add("help-link");
      helpLink.title = window.deps.translateString("generic.clickForInfo", "Click for info...");
      title?.appendChild(helpLink);
      const helpIcon = document.createElement("span");
      helpIcon.classList.add("icon-info");
      helpLink.appendChild(helpIcon);
    }
    const fieldContainer = document.createElement("div");
    fieldContainer.classList.add("input-container");
    form.appendChild(fieldContainer);
    const name = `editor-settings-${field.name}`;
    const getOptionValue = (name2) => String(
      editorOptions[name2] ?? userConfig[name2] ?? defaultConfig[name2] ?? ""
    );
    const optionValue = getOptionValue(field.name);
    if (field.options.length > 4) {
      const select = document.createElement("select");
      select.name = name;
      fieldContainer.appendChild(select);
      let selectedThemeValue = "";
      if (field.name.startsWith("editorTheme-")) {
        const [_, thisEditor, thisTheme] = field.name.split("-");
        const selectedTheme = getEditorTheme({
          editor: thisEditor,
          theme: thisTheme,
          editorTheme: editorOptions.editorTheme,
          editorThemes: thisEditor === "monaco" ? monacoThemes.map((t) => t.name) : thisEditor === "codemirror" ? codemirrorThemes.map((t) => t.name) : prismThemes.map((t) => t.name)
        });
        if (selectedTheme) {
          selectedThemeValue = `${thisEditor}:${selectedTheme}@${thisTheme}`;
        }
      }
      field.options.forEach((option) => {
        const optionEl = document.createElement("option");
        optionEl.text = option.label || "";
        optionEl.value = option.value;
        if (field.name.startsWith("editorTheme-")) {
          optionEl.selected = selectedThemeValue === option.value;
        } else {
          optionEl.selected = optionValue === option.value || option.checked === true;
        }
        select.appendChild(optionEl);
      });
      return;
    }
    field.options.forEach((option) => {
      const id = `${name}-${option.value}`;
      const isCheckBox = !option.label && option.value === "true";
      const optionContainer = document.createElement("span");
      fieldContainer.appendChild(optionContainer);
      const input = document.createElement("input");
      input.type = isCheckBox ? "checkbox" : "radio";
      input.name = name;
      input.id = id;
      input.value = option.value;
      input.checked = field.name === "theme" ? optionValue === "dark" : field.name === "lineNumbers" ? optionValue === "true" || optionValue === "relative" : optionValue === option.value;
      if (field.name === "lineNumbersRelative") {
        input.checked = getOptionValue("lineNumbers") === "relative";
        input.disabled = getOptionValue("lineNumbers") === "false";
      }
      optionContainer.appendChild(input);
      if (isCheckBox) {
        input.classList.add("switch");
      } else {
        const label = document.createElement("label");
        label.classList.add("radio-label");
        label.htmlFor = id;
        label.innerHTML = option.label || "";
        optionContainer.appendChild(label);
      }
    });
    if (field.note) {
      const note = document.createElement("div");
      note.classList.add("input-container", "field-note");
      note.innerHTML = field.note;
      form.appendChild(note);
    }
  });
  let editor = await initializeEditor(editorOptions);
  const updateOptions = async (init) => {
    const formData = Array.from(new FormData(form)).reduce(
      (acc, [name, value]) => ({
        ...acc,
        [name.replace("editor-settings-", "")]: value === "true" ? true : value === "false" ? false : value === "" ? void 0 : !isNaN(Number(value)) ? Number(value) : value
      }),
      {}
    );
    const booleanFields = formFields.filter(
      (field) => field.options.length === 1 && !field.options[0].label && field.options[0].value === "true"
    ).map((field) => field.name);
    booleanFields.forEach((key) => {
      if (!(key in formData)) {
        formData[key] = false;
      }
      if (key === "theme") {
        formData.theme = formData.theme === true ? "dark" : "light";
      }
      if (key === "lineNumbersRelative" && formData.lineNumbersRelative === true && formData.lineNumbers === true) {
        formData.lineNumbers = "relative";
      }
    });
    const relativeLineNumbersField = form.querySelector(
      '[name="editor-settings-lineNumbersRelative"]'
    );
    if (relativeLineNumbersField) {
      relativeLineNumbersField.checked = formData.lineNumbers === "relative";
      relativeLineNumbersField.disabled = formData.lineNumbers === false;
    }
    delete formData.lineNumbersRelative;
    formData.editorTheme = allThemes.map((name) => formData[name]).filter(Boolean).join(", ");
    allThemes.forEach((name) => {
      delete formData[name];
    });
    if (formData.editor === codeEditor) {
      editor.changeSettings(formData);
    } else {
      const value = editor.getValue();
      editor.destroy();
      editor = await initializeEditor({
        ...editorOptions,
        ...getEditorConfig(formData),
        value
      });
    }
    const windsurfLogo = document.getElementById("windsurf-logo");
    if (formData.theme === "light") {
      windsurfLogo.style.filter = "invert(1)";
    } else {
      windsurfLogo.style.filter = "unset";
    }
    if (!init) {
      deps.changeSettings(formData);
      codeEditor = formData.editor;
    }
    const prefix = "editor-settings-editorTheme-";
    const editorThemes = {
      "monaco-dark": form.querySelector(`[name="${prefix}monaco-dark"]`),
      "monaco-light": form.querySelector(`[name="${prefix}monaco-light"]`),
      "codemirror-dark": form.querySelector(`[name="${prefix}codemirror-dark"]`),
      "codemirror-light": form.querySelector(`[name="${prefix}codemirror-light"]`),
      "codejar-dark": form.querySelector(`[name="${prefix}codejar-dark"]`),
      "codejar-light": form.querySelector(`[name="${prefix}codejar-light"]`)
    };
    const currentEditor = editor.monaco ? "monaco" : editor.codemirror ? "codemirror" : "codejar";
    const currentTheme = formData.theme;
    const keys = Object.keys(editorThemes);
    keys.forEach((key) => {
      if (!key)
        return;
      const editorTheme = editorThemes[key];
      if (!editorTheme)
        return;
      if (key === `${currentEditor}-${currentTheme}`) {
        editorTheme.parentElement.hidden = false;
      } else {
        editorTheme.parentElement.hidden = true;
      }
    });
  };
  preventFocus(previewContainer);
  eventsManager.addEventListener(form, "change", () => updateOptions());
  updateOptions(true);
};
var editorContent = `
import React, { useState } from 'react';
import { createRoot } from "react-dom/client";

function App(props) {
  const [count, setCount] = useState(0);
  // increment on click!
  const onClick = () => setCount(count + 1);
  return (
    <div className="container">
      <h1>Hello, {props.name}!</h1>
      <img
        alt="a long alt attribute value that describes this image in details so that we can demonstrate word-wrap"
        className="logo"
        src="https://livecodes.io/livecodes/assets/templates/react.svg"
      />
      <p>You clicked {count === 0 ? 'zero' : count} times.</p>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

const root = createRoot(document.querySelector("#root"));
root.render(<App name="React" />);
`.trimStart();
export {
  createEditorSettingsUI
};
