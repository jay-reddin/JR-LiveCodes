"use strict";
(() => {
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

  // src/livecodes/utils/utils.ts
  var getLanguageCustomSettings = (language, config) => ({
    ...config.customSettings[language]
  });

  // src/livecodes/compiler/import-map.ts
  var isBare = (mod) => !mod.startsWith("https://") && !mod.startsWith("http://") && !mod.startsWith(".") && !mod.startsWith("/") && !mod.startsWith("data:") && !mod.startsWith("blob:");
  var styleimportsPattern = /(?:@import\s+?)((?:".*?")|(?:'.*?')|(?:url\('.*?'\))|(?:url\(".*?"\)))(.*)?;/g;
  var replaceStyleImports = (code, exceptions) => code.replace(new RegExp(styleimportsPattern), (statement, match, media) => {
    if (exceptions?.some(
      (e) => typeof e === "string" && e === match || typeof e === "object" && new RegExp(e).test(match)
    )) {
      return statement;
    }
    const url = match.replace(/"/g, "").replace(/'/g, "").replace(/url\(/g, "").replace(/\)/g, "");
    const modified = '@import "' + modulesService.getUrl(url) + '";';
    const mediaQuery = media?.trim();
    return !isBare(url) ? statement : mediaQuery ? `@media ${mediaQuery} {
${modified}
}` : modified;
  });

  // src/livecodes/services/allowed-origin.ts
  var allowedOrigin = (origin = location.origin) => Boolean(
    origin && (origin.endsWith("livecodes.io") || origin.endsWith("livecodes.pages.dev") || origin.endsWith("localpen.pages.dev") || origin.includes("127.0.0.1") || origin.includes("localhost:") || origin.endsWith("localhost") || origin.endsWith(".test"))
  );

  // src/livecodes/utils/compression.ts
  var import_lz_string = __toESM(require_lz_string());

  // src/livecodes/vendors.ts
  var { getUrl, getModuleUrl } = modulesService;
  var vendorsBaseUrl = (
    // 'http://127.0.0.1:8081/';
    /* @__PURE__ */ getUrl("@live-codes/browser-compilers@0.22.3/dist/")
  );
  var tailwindcssBaseUrl = /* @__PURE__ */ getUrl("tailwindcss@4.0.0/");
  var tailwindcss3Url = /* @__PURE__ */ getUrl(
    "@mhsdesign/jit-browser-tailwindcss@0.4.1/dist/cdn.min.js"
  );

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

  // src/livecodes/languages/lightningcss/processor-lightningcss-compiler.ts
  self.createLightningcssCompiler = () => {
    const { init, transform } = self.lightningcss;
    const initialized = init(new URL(vendorsBaseUrl + "lightningcss/lightningcss_node.wasm"));
    return async (css, { config }) => {
      const customSettings = getLanguageCustomSettings("lightningcss", config);
      await initialized;
      const { code, map, warnings } = transform({
        filename: "style.css",
        code: new TextEncoder().encode(css),
        minify: true,
        drafts: {
          nesting: true,
          customMedia: true
        },
        errorRecovery: true,
        ...customSettings
      });
      warnings.forEach((warning) => {
        console.warn(warning.message, "\nline:", warning.loc.line, "column:", warning.loc.column);
      });
      const sourceMap = customSettings.sourceMap ? `
/*# sourceMappingURL=${new TextDecoder().decode(map)}` : "";
      return new TextDecoder().decode(code) + sourceMap;
    };
  };
  var lightningcssFeatures = {
    Nesting: 1,
    NotSelectorList: 2,
    DirSelector: 4,
    LangSelectorList: 8,
    IsSelector: 16,
    TextDecorationThicknessPercent: 32,
    MediaIntervalSyntax: 64,
    MediaRangeSyntax: 128,
    CustomMediaQueries: 256,
    ClampFunction: 512,
    ColorFunction: 1024,
    OklabColors: 2048,
    LabColors: 4096,
    P3Colors: 8192,
    HexAlphaColors: 16384,
    SpaceSeparatedColorNotation: 32768,
    FontFamilySystemUi: 65536,
    DoublePositionGradients: 131072,
    VendorPrefixes: 262144,
    LogicalProperties: 524288,
    LightDark: 1048576,
    Selectors: 31,
    MediaQueries: 448,
    Colors: 1113088
  };

  // src/livecodes/languages/tailwindcss/utils.ts
  var addCodeInStyleBlocks = (css, html) => {
    const getBlockPattern = (el, langAttr = "lang") => `(<${el}\\s*)(?:([\\s\\S]*?)${langAttr}\\s*=\\s*["']([A-Za-z0-9 _]*)["'])?((?:[^>]*)>)([\\s\\S]*?)(<\\/${el}>)`;
    const pattern = getBlockPattern("style");
    for (const arr of [...html.matchAll(new RegExp(pattern, "g"))]) {
      const content = arr[5];
      if (content?.trim()) {
        css += `
${content}`;
      }
    }
    return css;
  };

  // src/livecodes/languages/tailwindcss/processor-tailwindcss-compiler.ts
  self.createTailwindcssCompiler = () => {
    const pluginsUrl = vendorsBaseUrl + "tailwindcss/tailwindcss-plugins.js";
    let cachedPlugins;
    const officialPlugins = [
      "@tailwindcss/forms",
      "@tailwindcss/typography",
      "@tailwindcss/aspect-ratio",
      "@tailwindcss/line-clamp"
    ];
    const loadPlugins = () => {
      self.importScripts(pluginsUrl);
      cachedPlugins = self.tailwindcssPlugins.plugins;
    };
    const scan = (code) => {
      const classes = /* @__PURE__ */ new Set();
      const stringsPattern = /((?:`(?:.|\n|\r)+?`)|(?:'.+?')|(?:".+?"))/g;
      const strings = code.match(new RegExp(stringsPattern)) ?? [];
      for (const str of strings) {
        str.slice(1, -1).replace(/[\n\r]/g, " ").split(" ").forEach((c) => {
          c = c.trim();
          if (c === "" || classes.has(c))
            return;
          classes.add(c);
        });
      }
      return Array.from(classes);
    };
    const loadStylesheet = async (id, base) => {
      const fetchFromCDN = (file) => {
        const url = tailwindcssBaseUrl + file;
        return fetch(url).then((res) => res.text());
      };
      const load = async () => {
        if (id === "tailwindcss") {
          return {
            base,
            content: await fetchFromCDN("index.css")
          };
        } else if (id === "tailwindcss/preflight" || id === "tailwindcss/preflight.css" || id === "./preflight.css") {
          return {
            base,
            content: await fetchFromCDN("preflight.css")
          };
        } else if (id === "tailwindcss/theme" || id === "tailwindcss/theme.css" || id === "./theme.css") {
          return {
            base,
            content: await fetchFromCDN("theme.css")
          };
        } else if (id === "tailwindcss/utilities" || id === "tailwindcss/utilities.css" || id === "./utilities.css") {
          return {
            base,
            content: await fetchFromCDN("utilities.css")
          };
        }
        return {
          base,
          content: await fetch(id).then((res) => res.text()).catch(() => "")
        };
      };
      return load();
    };
    const loadModule = async (id) => {
      if (officialPlugins.includes(id) && !cachedPlugins) {
        loadPlugins();
      }
      if (cachedPlugins?.[id]) {
        return {
          base: "/",
          module: cachedPlugins[id]
        };
      }
      try {
        const moduleUrl = isBare(id) ? modulesService.getModuleUrl(id) : id;
        const module = await import(moduleUrl);
        return {
          base: "/",
          module: module.default ?? module
        };
      } catch {
        throw new Error(`Tailwind CSS plugin "${id}" could not be loaded.`);
      }
    };
    const checkVersion = (code) => {
      const directivesPattern = /@tailwind\s+((base)|(components)|(utilities))\s*;?/g;
      if (new RegExp(directivesPattern).exec(code))
        return 3;
      return 4;
    };
    const processInLightningCss = async (code, language, config, options) => {
      const Features = lightningcssFeatures;
      const lightningConfig = {
        minify: false,
        sourceMap: false,
        drafts: { customMedia: true },
        nonStandard: { deepSelectorCombinator: true },
        include: Features.Nesting,
        exclude: Features.LogicalProperties | Features.DirSelector | Features.LightDark,
        targets: {
          safari: 16 << 16 | 4 << 8,
          ios_saf: 16 << 16 | 4 << 8,
          firefox: 128 << 16,
          chrome: 111 << 16
        },
        errorRecovery: true
      };
      const modifiedConfig = {
        ...config,
        customSettings: {
          ...config.customSettings,
          lightningcss: {
            ...lightningConfig,
            ...config.customSettings.lightningcss
          }
        }
      };
      const compiled1 = await compileInCompiler(code, language, modifiedConfig, options);
      const compiled2 = await compileInCompiler(compiled1.code, language, modifiedConfig, options);
      return compiled2;
    };
    const tailwind3 = (code, { config, options }) => {
      if (!self.createTailwindcss) {
        self.importScripts(tailwindcss3Url);
      }
      const customSettings = getLanguageCustomSettings("tailwindcss", config);
      const selectedPluginNames = customSettings.plugins?.filter((p) => officialPlugins.includes(p)) || [];
      if (!cachedPlugins && selectedPluginNames.length > 0) {
        loadPlugins();
      }
      const loadedPlugins = selectedPluginNames.map((p) => cachedPlugins[p]);
      const tailwind = self.createTailwindcss({
        tailwindConfig: {
          ...customSettings,
          ...loadedPlugins.length > 0 ? { plugins: loadedPlugins } : {}
        }
      });
      const html = `<template>${options.html}
<script>${config.script.content}<\/script></template>`;
      return tailwind.generateStylesFromContent(addCodeInStyleBlocks(code, html), [html]);
    };
    const tailwind4 = async (code, { config, options }) => {
      const prepareCode = (css2, html2) => {
        let result = replaceStyleImports(css2, [/tailwindcss/g]);
        if (!result.includes("@import")) {
          result = `@import "tailwindcss";${result}`;
        }
        return addCodeInStyleBlocks(result, html2);
      };
      const html = `<template>${options.html}
<script>${config.script.content}<\/script></template>`;
      const css = prepareCode(code, html);
      try {
        const compiler = await self.tailwindcss.compile(css, {
          base: "/",
          loadStylesheet,
          loadModule
        });
        const candidates = scan(html);
        const output = compiler.build(candidates);
        return processInLightningCss(output, "lightningcss", config, options);
      } catch (e) {
        console.error("Error compiling Tailwind CSS.", e.message || e);
      }
      return css;
    };
    return (cssCode, compileOptions) => checkVersion(cssCode) === 3 ? tailwind3(cssCode, compileOptions) : tailwind4(cssCode, compileOptions);
  };
})();
