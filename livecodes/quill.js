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

// src/livecodes/services/allowed-origin.ts
var allowedOrigin = (origin = location.origin) => Boolean(
  origin && (origin.endsWith("livecodes.io") || origin.endsWith("livecodes.pages.dev") || origin.endsWith("localpen.pages.dev") || origin.includes("127.0.0.1") || origin.includes("localhost:") || origin.endsWith("localhost") || origin.endsWith(".test"))
);

// src/livecodes/utils/compression.ts
var import_lz_string = __toESM(require_lz_string());

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
    const addExternalParam = (url) => !external || !url.includes("https://esm.sh") ? url : url.includes("?") ? `${url}&external=${external}` : `${url}?external=${external}`;
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
    const url = new URL(location.href);
    return url.searchParams.get("appCDN") || modulesService.cdnLists.npm[0];
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
var quillEditorCdnBaseUrl = /* @__PURE__ */ getUrl("quill@2.0.2/dist/");
var quillHtmlEditUrl = /* @__PURE__ */ getUrl(
  "quill-html-edit-button@2.2.14/dist/quill.htmlEditButton.min.js"
);
var quillBlotFormatterUrl = /* @__PURE__ */ getUrl(
  "quill-blot-formatter@1.0.5/dist/quill-blot-formatter.min.js"
);
var quillBetterTableBaseUrl = /* @__PURE__ */ getUrl("quill-better-table@1.2.10/dist/");

// src/livecodes/html/sandbox/index.ts
var sandboxVersion = "v9";

// src/livecodes/services/sandbox.ts
var cfPagesBaseUrl = "https://livecodes-sandbox.pages.dev";
var serviceBaseUrl = false ? selfHostedBaseUrl : false ? ghPagesBaseUrl : cfPagesBaseUrl;
var version = sandboxVersion;
var sandboxService = {
  getResultUrl: () => `${serviceBaseUrl}/${version}/`,
  getCompilerUrl: () => `${serviceBaseUrl}/${version}/compiler`,
  getOrigin: () => new URL(serviceBaseUrl).origin
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
      const url = await res.text();
      return url.replace(dpasteGetUrl, "");
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

// src/livecodes/editor/quill/quill.html?raw
var quill_default = `<!doctype html>\r
<html lang="en">\r
  <head>\r
    <meta charset="UTF-8" />\r
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />\r
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\r
    <title>Rich Text Editor</title>\r
  </head>\r
  <body>\r
    <style>\r
      html,\r
      body {\r
        margin: 0;\r
        padding: 0;\r
        height: 100%;\r
      }\r
      #standalone-container {\r
        display: flex;\r
        flex-direction: column;\r
        height: 100%;\r
        max-height: 100%;\r
      }\r
      #editor-container {\r
        flex-grow: 0;\r
        overflow-y: auto;\r
      }\r
      body {\r
        background: #fff;\r
      }\r
      .ql-snow.ql-toolbar {\r
        background: #eaecec;\r
      }\r
      #toolbar-container .ql-font span[data-label='Arial']::before {\r
        font-family: Arial, sans-serif;\r
      }\r
      #toolbar-container .ql-font span[data-label='Comic Sans MS']::before {\r
        font-family:\r
          Comic Sans MS,\r
          sans-serif;\r
      }\r
      #toolbar-container .ql-font span[data-label='Verdana']::before {\r
        font-family: Verdana, sans-serif;\r
      }\r
      #toolbar-container .ql-font span[data-label='Helvetica']::before {\r
        font-family: Helvetica, sans-serif;\r
      }\r
      #toolbar-container .ql-font span[data-label='Tahoma']::before {\r
        font-family: Tahoma, sans-serif;\r
      }\r
      #toolbar-container .ql-font span[data-label='Trebuchet MS']::before {\r
        font-family:\r
          Trebuchet MS,\r
          sans-serif;\r
      }\r
      #toolbar-container .ql-font span[data-label='Times New Roman']::before {\r
        font-family:\r
          Times New Roman,\r
          serif;\r
      }\r
      #toolbar-container .ql-font span[data-label='Georgia']::before {\r
        font-family: Georgia, serif;\r
      }\r
      #toolbar-container .ql-font span[data-label='Garamond']::before {\r
        font-family: Garamond, serif;\r
      }\r
      #toolbar-container .ql-font span[data-label='Courier New']::before {\r
        font-family:\r
          Courier New,\r
          monospace;\r
      }\r
      #toolbar-container .ql-font span[data-label='Brush Script MT']::before {\r
        font-family:\r
          Brush Script MT,\r
          cursive;\r
      }\r
      #toolbar-container .ql-size span[data-label='Small']::before {\r
        font-size: 0.75em;\r
      }\r
      #toolbar-container .ql-size span[data-label='Large']::before {\r
        font-size: 1.5em;\r
      }\r
      #toolbar-container .ql-size span[data-label='Huge']::before {\r
        font-size: 2.5em;\r
      }\r
    </style>\r
\r
    <!-- styles placeholder -->\r
\r
    <div id="standalone-container">\r
      <div id="toolbar-container">\r
        <span class="ql-formats">\r
          <select class="ql-font" title="Font Face">\r
            <option selected>Default</option>\r
            <option>Arial</option>\r
            <option>Brush Script MT</option>\r
            <option>Comic Sans MS</option>\r
            <option>Courier New</option>\r
            <option>Garamond</option>\r
            <option>Georgia</option>\r
            <option>Helvetica</option>\r
            <option>Tahoma</option>\r
            <option>Times New Roman</option>\r
            <option>Trebuchet MS</option>\r
            <option>Verdana</option>\r
          </select>\r
          <select class="ql-size" title="Font Size">\r
            <option value="0.75em">Small</option>\r
            <option selected>Normal</option>\r
            <option value="1.5em">Large</option>\r
            <option value="2.5em">Huge</option>\r
          </select>\r
          <select class="ql-header" title="Heading">\r
            <option value=""></option>\r
            <option value="1"></option>\r
            <option value="2"></option>\r
            <option value="3"></option>\r
            <option value="4"></option>\r
            <option value="5"></option>\r
            <option value="6"></option>\r
          </select>\r
        </span>\r
        <span class="ql-formats">\r
          <button class="ql-bold" title="Bold"></button>\r
          <button class="ql-italic" title="Italic"></button>\r
          <button class="ql-underline" title="Underline"></button>\r
          <button class="ql-strike" title="Strike"></button>\r
        </span>\r
        <span class="ql-formats">\r
          <select class="ql-color" title="Font Color"></select>\r
          <select class="ql-background" title="Background Color"></select>\r
        </span>\r
        <span class="ql-formats">\r
          <button class="ql-script" value="sub" title="Subscript"></button>\r
          <button class="ql-script" value="super" title="Superscript"></button>\r
        </span>\r
        <span class="ql-formats">\r
          <button class="ql-list" value="ordered" title="Ordered List"></button>\r
          <button class="ql-list" value="bullet" title="Unordered List"></button>\r
          <button class="ql-indent" value="-1" title="Outdent"></button>\r
          <button class="ql-indent" value="+1" title="Indent"></button>\r
          <button class="ql-blockquote" title="Quote"></button>\r
        </span>\r
        <span class="ql-formats">\r
          <button class="ql-direction" value="rtl" title="Text Direction"></button>\r
          <select class="ql-align" title="Align">\r
            <option></option>\r
            <option value="right"></option>\r
            <option value="center"></option>\r
            <option value="justify"></option>\r
          </select>\r
        </span>\r
        <span class="ql-formats">\r
          <button class="ql-link" title="Link"></button>\r
          <button class="ql-image" title="Image"></button>\r
          <button class="ql-video" title="Video"></button>\r
          <button class="ql-table" title="Insert Table"></button>\r
        </span>\r
        <span class="ql-formats">\r
          <button class="ql-undo" title="Undo"></button>\r
          <button class="ql-redo" title="Redo"></button>\r
          <button class="ql-clean" title="Reset formatting"></button>\r
        </span>\r
      </div>\r
      <div id="editor-container">\r
        <!-- content placeholder -->\r
      </div>\r
    </div>\r
\r
    <!-- scripts placeholder -->\r
\r
    <script>\r
      (() => {\r
        let updatingContent = false;\r
\r
        var Font = Quill.import('attributors/style/font');\r
        Font.whitelist = [\r
          'Arial',\r
          'Helvetica',\r
          'Verdana',\r
          'Tahoma',\r
          'Trebuchet MS',\r
          'Times New Roman',\r
          'Georgia',\r
          'Garamond',\r
          'Courier New',\r
          'Brush Script MT',\r
        ];\r
        Quill.register(Font, true);\r
\r
        var SizeStyle = Quill.import('attributors/style/size');\r
        SizeStyle.whitelist = ['0.75em', '1.5em', '2.5em'];\r
        Quill.register(SizeStyle, true);\r
\r
        var Align = Quill.import('attributors/style/align');\r
        Quill.register(Align, true);\r
\r
        var Direction = Quill.import('attributors/style/direction');\r
        Quill.register(Direction, true);\r
\r
        Quill.register('modules/htmlEditButton', htmlEditButton);\r
        Quill.register('modules/blotFormatter', QuillBlotFormatter.default);\r
        Quill.register({ 'modules/better-table': quillBetterTable }, true);\r
\r
        var Font = Quill.import('attributors/style/font');\r
        Font.whitelist = [\r
          'Arial',\r
          'Brush Script MT',\r
          'Comic Sans MS',\r
          'Courier New',\r
          'Garamond',\r
          'Georgia',\r
          'Helvetica',\r
          'Tahoma',\r
          'Times New Roman',\r
          'Trebuchet MS',\r
          'Verdana',\r
        ];\r
        Quill.register(Font, true);\r
\r
        var SizeStyle = Quill.import('attributors/style/size');\r
        SizeStyle.whitelist = ['0.75em', '1.5em', '2.5em'];\r
        Quill.register(SizeStyle, true);\r
\r
        var Align = Quill.import('attributors/style/align');\r
        Quill.register(Align, true);\r
\r
        var Direction = Quill.import('attributors/style/direction');\r
        Quill.register(Direction, true);\r
\r
        var quill = new Quill('#editor-container', {\r
          modules: {\r
            toolbar: {\r
              container: '#toolbar-container',\r
              handlers: {\r
                undo: (value) => {\r
                  quill.history.undo();\r
                },\r
                redo: (value) => {\r
                  quill.history.redo();\r
                },\r
                table: (value) => {\r
                  let tableModule = quill.getModule('better-table');\r
                  tableModule.insertTable(3, 3);\r
                },\r
              },\r
            },\r
            history: {\r
              delay: 1000,\r
              userOnly: false,\r
            },\r
            htmlEditButton: {\r
              debug: false,\r
              msg: 'Edit the content in HTML format',\r
            },\r
            blotFormatter: {},\r
            table: false, // disable table module\r
            'better-table': {\r
              operationMenu: {\r
                color: {\r
                  colors: ['green', 'red', 'yellow', 'blue', 'grey', 'white'],\r
                  text: 'Background Colors:',\r
                },\r
              },\r
            },\r
            // keyboard: {\r
            //   bindings: quillBetterTable.keyboardBindings\r
            // }\r
          },\r
          placeholder: 'Content...',\r
          theme: 'snow',\r
        });\r
\r
        document.querySelector('.ql-undo').innerHTML =\r
          '<svg viewBox="0 0 1792 1792" style="transform: scaleX(0.9) scaleY(0.9);" xmlns="http://www.w3.org/2000/svg"><path class="ql-fill" d="M1664 896q0 156-61 298t-164 245-245 164-298 61q-172 0-327-72.5t-264-204.5q-7-10-6.5-22.5t8.5-20.5l137-138q10-9 25-9 16 2 23 12 73 95 179 147t225 52q104 0 198.5-40.5t163.5-109.5 109.5-163.5 40.5-198.5-40.5-198.5-109.5-163.5-163.5-109.5-198.5-40.5q-98 0-188 35.5t-160 101.5l137 138q31 30 14 69-17 40-59 40h-448q-26 0-45-19t-19-45v-448q0-42 40-59 39-17 69 14l130 129q107-101 244.5-156.5t284.5-55.5q156 0 298 61t245 164 164 245 61 298z"/></svg>';\r
        document.querySelector('.ql-redo').innerHTML =\r
          '<svg viewBox="0 0 1792 1792" style="transform: scaleX(-0.9) scaleY(0.9);" xmlns="http://www.w3.org/2000/svg"><path class="ql-fill" d="M1664 896q0 156-61 298t-164 245-245 164-298 61q-172 0-327-72.5t-264-204.5q-7-10-6.5-22.5t8.5-20.5l137-138q10-9 25-9 16 2 23 12 73 95 179 147t225 52q104 0 198.5-40.5t163.5-109.5 109.5-163.5 40.5-198.5-40.5-198.5-109.5-163.5-163.5-109.5-198.5-40.5q-98 0-188 35.5t-160 101.5l137 138q31 30 14 69-17 40-59 40h-448q-26 0-45-19t-19-45v-448q0-42 40-59 39-17 69 14l130 129q107-101 244.5-156.5t284.5-55.5q156 0 298 61t245 164 164 245 61 298z"/></svg>';\r
\r
        function updateCode() {\r
          parent.postMessage(\r
            { type: 'quillEditorCode', payload: { html: quill.root.innerHTML || '' } },\r
            '*',\r
          );\r
        }\r
\r
        quill.on('text-change', () => {\r
          if (updatingContent) {\r
            updatingContent = false;\r
            return; // prevent infinite loop\r
          }\r
          updateCode();\r
        });\r
\r
        window.addEventListener('message', function (event) {\r
          if (event.data.html) {\r
            updatingContent = true;\r
            quill.root.innerHTML = event.data.html;\r
          } else if (event.data.type === 'updateCode') {\r
            updateCode();\r
          } else if (event.data.type === 'setTheme') {\r
          }\r
        });\r
\r
        window.addEventListener('load', () => {\r
          parent.postMessage({ type: 'quillEditorLoaded', payload: true }, '*');\r
          updateCode();\r
        });\r
      })();\r
    <\/script>\r
  </body>\r
</html>\r
`;

// src/livecodes/editor/quill/quill.ts
var quillEditorLoaded = false;
var quillEditorContent = "";
var getIframe = () => document.querySelector("#quill-editor-frame");
var showQuillEditor = async ({
  baseUrl,
  config,
  editors,
  eventsManager
}) => {
  if (quillEditorLoaded) {
    if (quillEditorContent !== editors.markup.getValue()) {
      getIframe()?.contentWindow?.postMessage({ html: editors.markup.getValue() }, "*");
    }
    return;
  }
  const quillEditorScripts = `
  <script src="${quillEditorCdnBaseUrl}quill.js"><\/script>
  <script src="${quillHtmlEditUrl}"><\/script>
  <script src="${quillBlotFormatterUrl}"><\/script>
  <script src="${quillBetterTableBaseUrl}quill-better-table.min.js"><\/script>
  <script src="${baseUrl}custom-editor-utils.js"><\/script>
    `;
  const quillEditorStyles = `
  <link rel="stylesheet" href="${baseUrl}quill.css" />
  <link rel="stylesheet" href="${quillEditorCdnBaseUrl}quill.snow.css" />
  <link rel="stylesheet" href="${quillBetterTableBaseUrl}quill-better-table.css" />
  `;
  const getQuillEditorHTML = () => quill_default.replace("<!-- styles placeholder -->", quillEditorStyles).replace("<!-- scripts placeholder -->", quillEditorLoaded ? "" : quillEditorScripts).replace("// {{ custom config }}", config.readonly ? "readOnly: true" : "").replace("<!-- content placeholder -->", editors.markup.getValue());
  await new Promise((resolve) => {
    const quillEditorContainer = document.querySelector("#quillEditor");
    let iframe = getIframe();
    const onload = () => {
      eventsManager.addEventListener(window, "message", (event) => {
        if (event.source !== getIframe()?.contentWindow || !["quillEditorCode", "quillEditorLoaded"].includes(event.data.type)) {
          return;
        }
        if (event.data.type === "quillEditorLoaded") {
          quillEditorLoaded = true;
          eventsManager.removeEventListener(iframe, "load", onload);
          updateQuillEditorCode();
          resolve("loaded");
          return;
        }
        const { html } = event.data.payload;
        quillEditorContent = html;
        editors.markup.setValue(html || "");
      });
      getIframe()?.contentWindow?.postMessage({ result: getQuillEditorHTML() }, "*");
    };
    if (iframe) {
      onload();
    } else {
      iframe = document.createElement("iframe");
      iframe.name = "quillEditor";
      iframe.id = "quill-editor-frame";
      iframe.setAttribute(
        "sandbox",
        "allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"
      );
      eventsManager.addEventListener(iframe, "load", onload);
      iframe.src = sandboxService.getResultUrl();
      quillEditorContainer.appendChild(iframe);
    }
  });
};
var getQuillEditorContent = async ({
  baseUrl,
  editors,
  config,
  html,
  eventsManager
}) => {
  if (config.script.language !== "richtext")
    return {};
  if (!quillEditorLoaded) {
    await showQuillEditor({ baseUrl, config, editors, html, eventsManager });
  }
  return {
    html: quillEditorContent
  };
};
var setQuillEditorTheme = (theme) => {
  getIframe()?.contentWindow?.postMessage(
    { type: "setTheme", payload: theme },
    sandboxService.getOrigin()
  );
};
var updateQuillEditorCode = () => {
  getIframe()?.contentWindow?.postMessage({ type: "updateCode" }, sandboxService.getOrigin());
};
export {
  getQuillEditorContent,
  setQuillEditorTheme,
  showQuillEditor
};
