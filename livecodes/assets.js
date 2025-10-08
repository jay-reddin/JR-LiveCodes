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

// src/livecodes/UI/icons.ts
var iconDelete = '<i class="icon-delete"></i>';

// src/livecodes/utils/utils.ts
var isMobile = () => {
  let mobile = false;
  const userAgent = navigator.userAgent.toLowerCase();
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      a
    ) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    )) {
      mobile = true;
    }
  })(userAgent || navigator.vendor || window.opera);
  return mobile;
};
var copyToClipboard = (text) => {
  if ("clipboard" in navigator) {
    return navigator.clipboard.writeText(text);
  } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    const textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy");
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
  return false;
};
var loadScript = (url, name) => new Promise((resolve, reject) => {
  if (name && globalThis[name]) {
    return resolve(globalThis[name]);
  }
  if (typeof globalThis.importScripts === "function") {
    globalThis.importScripts(url);
    if (name && globalThis[name]) {
      return resolve(globalThis[name]);
    }
    return resolve(globalThis);
  }
  const script = document.createElement("script");
  script.src = url;
  script.async = true;
  const removeEventListeners = () => {
    script.removeEventListener("load", onLoad);
    script.removeEventListener("error", onError);
  };
  const onLoad = () => {
    removeEventListeners();
    if (!name) {
      return resolve("loaded: " + url);
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
    reject("failed to load: " + url);
  };
  script.addEventListener("load", onLoad);
  script.addEventListener("error", onError);
  document.head.appendChild(script);
});
var predefinedValues = {
  APP_VERSION: "47",
  SDK_VERSION: "0.12.0",
  COMMIT_SHA: "7b4906d",
  REPO_URL: "https://github.com/live-codes/livecodes",
  DOCS_BASE_URL: "http://localhost:3000/docs/"
};

// src/livecodes/html/assets.html?raw
var assets_default = '<div id="assets-list-container" class="modal-container list-container">\r\n  <div class="modal-title" data-i18n="assets.heading">Assets</div>\r\n  <div class="modal-screen-container">\r\n    <div class="modal-message" id="assets-container" class="items-container">\r\n      <div class="buttons">\r\n        <button id="assets-add-asset-button" class="button" data-i18n="assets.add.heading">\r\n          Add Asset\r\n        </button>\r\n        <button id="assets-delete-all-button" class="button danger" data-i18n="assets.deleteAll">\r\n          Delete All\r\n        </button>\r\n      </div>\r\n\r\n      <div class="modal-search">\r\n        <div>\r\n          <span id="sort-by-label">\r\n            <i class="icon-arrow-sort"></i\r\n            ><span data-i18n="assets.sort.heading">Sort By:</span></span\r\n          >\r\n          <a href="#" id="assets-sort-by-last-modified" class="active"\r\n            ><i class="icon-calendar-sort"></i>\r\n            <span class="sort-time" data-i18n="assets.sort.date">Date</span></a\r\n          ><a href="#" id="assets-sort-by-title">\r\n            <i class="icon-arrow-text-sort"></i>\r\n            <span class="sort-title" data-i18n="assets.sort.fileName">File Name</span></a\r\n          ><a href="#" id="assets-sorted-asc" style="display: none"\r\n            ><i class="icon-arrow-sort-up"></i></a\r\n          ><a href="#" id="assets-sorted-desc"><i class="icon-arrow-sort-down"></i></a>\r\n          <select name="type-filter" id="assets-type-filter">\r\n            <option value="" data-i18n="assets.types.all">All types</option>\r\n          </select>\r\n        </div>\r\n        <div>\r\n          <input\r\n            id="search-assets"\r\n            type="text"\r\n            placeholder="Search"\r\n            data-i18n="assets.search"\r\n            data-i18n-prop="placeholder"\r\n          />\r\n          <a\r\n            href="#"\r\n            id="assets-reset-filters"\r\n            title="Reset"\r\n            data-i18n="assets.resetFilters"\r\n            data-i18n-prop="title"\r\n          >\r\n            <i class="icon-reset"></i>\r\n          </a>\r\n        </div>\r\n      </div>\r\n\r\n      <div class="modal-message no-data description alert" data-i18n="assets.noSavedAssets">\r\n        <div>You have no saved assets.</div>\r\n      </div>\r\n\r\n      <div\r\n        class="modal-message no-data description confirm"\r\n        id="assets-no-match"\r\n        data-i18n="assets.noMatch"\r\n      >\r\n        <div>No assets match these filters.</div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n';

// src/livecodes/html/add-asset.html?raw
var add_asset_default = '<div id="add-asset-container" class="modal-container">\r\n  <div class="modal-title" data-i18n="assets.add.heading">Add Asset</div>\r\n\r\n  <div id="add-asset-screens" class="modal-screen-container">\r\n    <div class="buttons">\r\n      <button id="assets-button" class="button" data-i18n="assets.heading">Assets</button>\r\n    </div>\r\n\r\n    <ul id="add-asset-tabs" class="modal-tabs">\r\n      <li class="active">\r\n        <a href="#" data-target="add-asset-data-url" data-i18n="assets.add.dataURL.heading">\r\n          Data URL</a\r\n        >\r\n      </li>\r\n      <li>\r\n        <a href="#" data-target="add-asset-gh-pages" data-i18n="assets.add.githubPages.heading">\r\n          GitHub Pages</a\r\n        >\r\n      </li>\r\n    </ul>\r\n\r\n    <div id="add-asset-data-url" class="tab-content active">\r\n      <div class="modal-screen">\r\n        <div\r\n          class="description help"\r\n          data-i18n="assets.add.dataURL.desc"\r\n          data-i18n-prop="innerHTML"\r\n        >\r\n          Add asset as a base64-encoded\r\n          <a\r\n            href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs"\r\n            target="_blank"\r\n            rel="noopener"\r\n            >data url</a\r\n          >.\r\n        </div>\r\n        <form id="add-asset-data-url-form">\r\n          <label\r\n            for="asset-data-url-file-input"\r\n            class="file-input-label"\r\n            data-i18n="assets.add.dataURL.label"\r\n            tabindex="0"\r\n            >Add file</label\r\n          >\r\n          <input type="file" id="asset-data-url-file-input" class="file-input" />\r\n        </form>\r\n        <div id="data-url-output" class="clickable" style="width: 100%"></div>\r\n      </div>\r\n    </div>\r\n    <div id="add-asset-gh-pages" class="tab-content">\r\n      <div class="modal-screen">\r\n        <div\r\n          class="description help"\r\n          data-i18n="assets.add.githubPages.desc"\r\n          data-i18n-prop="innerHTML"\r\n        >\r\n          Deploy asset to GitHub Pages. The file is pushed to\r\n          <span class="code">gh-pages</span> branch of the repo\r\n          <span class="code">livecodes-assets</span> on your GitHub account. If the repo does not\r\n          already exist, a public repo will be created.\r\n        </div>\r\n        <form id="add-asset-gh-pages-form">\r\n          <label\r\n            for="asset-gh-pages-file-input"\r\n            id="asset-gh-pages-file-input-label"\r\n            class="file-input-label"\r\n            data-i18n="assets.add.githubPages.label"\r\n            tabindex="0"\r\n            >Upload file</label\r\n          >\r\n          <input type="file" id="asset-gh-pages-file-input" class="file-input" />\r\n        </form>\r\n        <div id="gh-pages-output" class="clickable" style="width: 100%"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n';

// src/livecodes/html/index.ts
var replaceValues = (str) => Object.entries(predefinedValues).reduce(
  (str2, [key, value]) => str2.replace(new RegExp(`{{${key}}}`, "g"), value),
  str
);
var assetsScreen = /* @__PURE__ */ replaceValues(assets_default);
var addAssetScreen = /* @__PURE__ */ replaceValues(add_asset_default);

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
var flexSearchUrl = /* @__PURE__ */ getUrl("flexsearch@0.7.21/dist/flexsearch.bundle.js");

// src/livecodes/storage/storage.ts
var generateId = () => (Date.now() + "" + Math.floor(Math.floor(Math.random() * Date.now()))).substring(0, 24);

// src/livecodes/UI/selectors.ts
var getAddAssetButton = (listContainer) => listContainer.querySelector("#assets-add-asset-button");
var getAssetsDeleteAllButton = (listContainer) => listContainer.querySelector("#assets-delete-all-button");
var getAssetsButton = (listContainer) => listContainer.querySelector("#assets-button");
var getAssetDataUrlFileInput = (listContainer) => listContainer.querySelector("#asset-data-url-file-input");
var getAssetDataUrlOutput = (listContainer) => listContainer.querySelector("#data-url-output");
var getAssetGHPagesFileInput = (listContainer) => listContainer.querySelector("#asset-gh-pages-file-input");
var getAssetGHPagesFileInputLabel = (listContainer) => listContainer.querySelector("#asset-gh-pages-file-input-label");
var getAssetGHPagesOutput = (listContainer) => listContainer.querySelector("#gh-pages-output");

// src/livecodes/UI/assets.ts
var copyUrl = (url, notifications) => {
  if (copyToClipboard(url)) {
    notifications.success(
      window.deps.translateString("assets.url.success", "URL is copied to clipboard.")
    );
  } else {
    notifications.error(window.deps.translateString("assets.url.fail", "Failed to copy URL."));
  }
};
var typesToShow = {
  other: window.deps.translateString("assets.type.other", "Other"),
  audio: window.deps.translateString("assets.type.audio", "Audio"),
  video: window.deps.translateString("assets.type.video", "Video"),
  image: window.deps.translateString("assets.type.image", "Image"),
  archive: window.deps.translateString("assets.type.archive", "Archive"),
  stylesheet: window.deps.translateString("assets.type.stylesheet", "Stylesheet"),
  csv: window.deps.translateString("assets.type.csv", "CSV"),
  html: window.deps.translateString("assets.type.html", "HTML"),
  icon: window.deps.translateString("assets.type.icon", "Icon"),
  script: window.deps.translateString("assets.type.script", "Script"),
  json: window.deps.translateString("assets.type.json", "JSON"),
  font: window.deps.translateString("assets.type.font", "Font"),
  text: window.deps.translateString("assets.type.text", "Text"),
  xml: window.deps.translateString("assets.type.xml", "XML")
};
var createLinkContent = (item, baseUrl) => {
  const container = document.createElement("div");
  container.classList.add("asset-item");
  const title = document.createElement("div");
  title.classList.add("asset-title", "overflow-text");
  title.textContent = item.filename;
  container.appendChild(title);
  const img = document.createElement("img");
  img.src = getThumbnailUrl(item, baseUrl);
  img.classList.add("img-preview");
  img.onerror = function() {
    const fallbackImg = baseUrl + "assets/images/image.svg";
    if (img.src !== fallbackImg) {
      img.src = fallbackImg;
    }
  };
  container.appendChild(img);
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("asset-details");
  container.appendChild(detailsContainer);
  const type = document.createElement("div");
  type.classList.add("light");
  type.textContent = window.deps.translateString("assets.link.type", "Type: {{type}}", {
    type: typesToShow[item.type]
  });
  detailsContainer.appendChild(type);
  const lastModified = isMobile() ? new Date(item.lastModified).toLocaleDateString() : new Date(item.lastModified).toLocaleString();
  const date = document.createElement("div");
  date.classList.add("light");
  date.textContent = window.deps.translateString("assets.link.date", "Date: {{modified}}", {
    modified: String(lastModified)
  });
  detailsContainer.appendChild(date);
  const url = document.createElement("div");
  url.classList.add("light", "asset-url", "overflow-text");
  url.textContent = window.deps.translateString("assets.link.url", "URL: {{url}}", {
    url: item.url
  });
  detailsContainer.appendChild(url);
  return container;
};
var createAssetItem = (item, list, notifications, baseUrl) => {
  const li = document.createElement("li");
  list.appendChild(li);
  const link = document.createElement("a");
  link.href = "#";
  link.dataset.id = item.id;
  link.classList.add("asset-link");
  link.title = window.deps.translateString("assets.generic.clickToCopyURL", "Click to copy URL");
  link.appendChild(createLinkContent(item, baseUrl));
  link.onclick = (ev) => {
    ev.preventDefault();
    copyUrl(item.url, notifications);
  };
  li.appendChild(link);
  const actions = document.createElement("div");
  actions.classList.add("actions");
  li.appendChild(actions);
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = iconDelete;
  deleteButton.classList.add("action-button", "delete-button");
  deleteButton.title = window.deps.translateString("assets.action.delete", "Delete");
  actions.appendChild(deleteButton);
  return { link, deleteButton };
};
var organizeAssets = async (getAssets, showAssets, eventsManager) => {
  let sortBy = "date";
  let sortByDirection = "desc";
  let type;
  let searchResults = [];
  const lastModifiedButton = document.querySelector(
    "#assets-list-container #assets-sort-by-last-modified"
  );
  const titleButton = document.querySelector(
    "#assets-list-container #assets-sort-by-title"
  );
  const sortedAscButton = document.querySelector(
    "#assets-list-container #assets-sorted-asc"
  );
  const sortedDescButton = document.querySelector(
    "#assets-list-container #assets-sorted-desc"
  );
  const typeSelect = document.querySelector(
    "#assets-list-container #assets-type-filter"
  );
  const searchAssetsInput = document.querySelector(
    "#assets-list-container #search-assets"
  );
  const resetFiltersLink = document.querySelector(
    "#assets-list-container #assets-reset-filters"
  );
  Array.from(new Set((await getAssets()).map((x) => x.type))).sort(
    (a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : a.toLowerCase() > b.toLowerCase() ? 1 : 0
  ).forEach((type2) => {
    const option = document.createElement("option");
    option.text = type2;
    option.value = type2;
    typeSelect.appendChild(option);
  });
  const getFilteredAndSorted = async () => (await getAssets()).filter((p) => type ? p.type === type : true).filter((p) => searchAssetsInput.value.trim() !== "" ? searchResults.includes(p.id) : true).sort(
    (a, b) => sortBy === "date" && sortByDirection === "asc" ? a.lastModified - b.lastModified : sortBy === "date" && sortByDirection === "desc" ? b.lastModified - a.lastModified : sortBy === "filename" && sortByDirection === "asc" && a.filename < b.filename ? -1 : sortBy === "filename" && sortByDirection === "asc" && a.filename > b.filename ? 1 : sortBy === "filename" && sortByDirection === "desc" && a.filename < b.filename ? 1 : sortBy === "filename" && sortByDirection === "desc" && a.filename > b.filename ? -1 : 0
  );
  const reloadAssets = async () => {
    showAssets(await getFilteredAndSorted());
  };
  const sortAscending = () => {
    sortByDirection = "asc";
    sortedAscButton.style.display = "unset";
    sortedDescButton.style.display = "none";
  };
  const sortDescending = () => {
    sortByDirection = "desc";
    sortedAscButton.style.display = "none";
    sortedDescButton.style.display = "unset";
  };
  const filterByType = async (value = typeSelect.value) => {
    type = value;
    await reloadAssets();
  };
  eventsManager.addEventListener(
    lastModifiedButton,
    "click",
    async (ev) => {
      ev.preventDefault();
      if (sortBy !== "date") {
        sortDescending();
      } else if (sortByDirection === "asc") {
        sortDescending();
      } else {
        sortAscending();
      }
      sortBy = "date";
      lastModifiedButton.classList.add("active");
      titleButton.classList.remove("active");
      await reloadAssets();
    },
    false
  );
  eventsManager.addEventListener(
    titleButton,
    "click",
    async (ev) => {
      ev.preventDefault();
      if (sortBy !== "filename") {
        sortAscending();
      } else if (sortByDirection === "asc") {
        sortDescending();
      } else {
        sortAscending();
      }
      sortBy = "filename";
      lastModifiedButton.classList.remove("active");
      titleButton.classList.add("active");
      await reloadAssets();
    },
    false
  );
  eventsManager.addEventListener(
    sortedAscButton,
    "click",
    async (ev) => {
      ev.preventDefault();
      sortDescending();
      await reloadAssets();
    },
    false
  );
  eventsManager.addEventListener(
    sortedDescButton,
    "click",
    async (ev) => {
      ev.preventDefault();
      sortAscending();
      await reloadAssets();
    },
    false
  );
  eventsManager.addEventListener(
    typeSelect,
    "change",
    async () => {
      await filterByType();
    },
    false
  );
  loadScript(flexSearchUrl, "FlexSearch").then(async (FlexSearch) => {
    const index = new FlexSearch.Document({
      index: ["filename", "type"],
      tokenize: "full",
      worker: true
    });
    await Promise.all((await getAssets()).map((p) => index.add(p)));
    eventsManager.addEventListener(
      searchAssetsInput,
      "keyup",
      async () => {
        const result = await index.searchAsync(searchAssetsInput.value);
        searchResults = result.map((field) => field.result).flat();
        await reloadAssets();
      },
      false
    );
  });
  eventsManager.addEventListener(
    resetFiltersLink,
    "click",
    async (ev) => {
      ev.preventDefault();
      sortBy = "date";
      sortByDirection = "desc";
      type = "";
      searchResults = [];
      lastModifiedButton.classList.add("active");
      titleButton.classList.remove("active");
      sortDescending();
      typeSelect.value = "";
      searchAssetsInput.value = "";
      await reloadAssets();
    },
    false
  );
};
var createAssetsList = async ({
  assetsStorage,
  eventsManager,
  showScreen,
  notifications,
  modal,
  baseUrl
}) => {
  const div = document.createElement("div");
  div.innerHTML = assetsScreen;
  const listContainer = div.firstChild;
  const noDataMessage = listContainer.querySelector(".no-data");
  const noMatchMessage = listContainer.querySelector("#assets-no-match.no-data");
  const assetsContainer = listContainer.querySelector("#assets-container");
  const list = document.createElement("ul");
  list.classList.add("open-list");
  let savedAssets = await assetsStorage.getAllData();
  let visibleAssets = savedAssets;
  const addAssetButton = getAddAssetButton(listContainer);
  const deleteAllButton = getAssetsDeleteAllButton(listContainer);
  eventsManager.addEventListener(
    addAssetButton,
    "click",
    () => {
      showScreen("add-asset");
    },
    false
  );
  eventsManager.addEventListener(
    deleteAllButton,
    "click",
    async () => {
      notifications.confirm(
        window.deps.translateString("assets.delete.all", "Delete {{assets}} assets?", {
          assets: visibleAssets.length
        }),
        async () => {
          for (const p of visibleAssets) {
            await assetsStorage.deleteItem(p.id);
          }
          visibleAssets = [];
          savedAssets = await assetsStorage.getAllData();
          await showList(visibleAssets);
        }
      );
    },
    false
  );
  assetsContainer.appendChild(list);
  const showList = async (assets) => {
    visibleAssets = assets;
    list.innerHTML = "";
    assets.forEach((item) => {
      const { deleteButton } = createAssetItem(item, list, notifications, baseUrl);
      eventsManager.addEventListener(
        deleteButton,
        "click",
        () => {
          notifications.confirm(
            window.deps.translateString("assets.delete.one", "Delete asset: {{asset}}?", {
              asset: item.filename
            }),
            async () => {
              await assetsStorage.deleteItem(item.id);
              visibleAssets = visibleAssets.filter((p) => p.id !== item.id);
              const li = deleteButton.parentElement;
              li.classList.add("hidden");
              setTimeout(() => {
                showList(visibleAssets);
              }, 500);
            }
          );
        },
        false
      );
    });
    if (assets.length === 0) {
      list.classList.add("hidden");
      deleteAllButton.classList.add("hidden");
      if ((await assetsStorage.getList()).length === 0) {
        noDataMessage.classList.remove("hidden");
        noMatchMessage.classList.add("hidden");
      } else {
        noDataMessage.classList.add("hidden");
        noMatchMessage.classList.remove("hidden");
      }
    } else {
      list.classList.remove("hidden");
      deleteAllButton.classList.remove("hidden");
      noDataMessage.classList.add("hidden");
      noMatchMessage.classList.add("hidden");
    }
  };
  await showList(savedAssets);
  const getAssets = () => assetsStorage.getAllData();
  modal.show(listContainer, { isAsync: true });
  organizeAssets(getAssets, showList, eventsManager);
};
var createAddAssetContainer = ({
  assetsStorage,
  eventsManager,
  showScreen,
  notifications,
  deployAsset,
  getUser,
  baseUrl,
  activeTab
}) => {
  let user;
  const div = document.createElement("div");
  div.innerHTML = addAssetScreen;
  const addAssetContainer = div.firstChild;
  const tabs = addAssetContainer.querySelectorAll("#add-asset-tabs li");
  const activateTab = (tab) => {
    const link = tab.querySelector("a");
    if (!link)
      return;
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    document.querySelectorAll("#add-asset-screens > div").forEach((screen) => {
      screen.classList.remove("active");
    });
    const target = addAssetContainer.querySelector("#" + link.dataset.target);
    target?.classList.add("active");
    target?.querySelector("input")?.focus();
  };
  tabs.forEach((tab) => {
    const link = tab.querySelector("a");
    if (!link)
      return;
    eventsManager.addEventListener(tab, "click", () => activateTab(tab));
  });
  setTimeout(() => {
    if (activeTab) {
      activateTab(tabs[activeTab]);
    }
  });
  const assetsButton = getAssetsButton(addAssetContainer);
  const dataUrlFileInput = getAssetDataUrlFileInput(addAssetContainer);
  const dataUrlOutput = getAssetDataUrlOutput(addAssetContainer);
  const ghPagesFileInput = getAssetGHPagesFileInput(addAssetContainer);
  const ghPagesFileInputLabel = getAssetGHPagesFileInputLabel(addAssetContainer);
  const ghPagesOutput = getAssetGHPagesOutput(addAssetContainer);
  eventsManager.addEventListener(
    assetsButton,
    "click",
    () => {
      showScreen("assets");
    },
    false
  );
  const loadFile = (input, deploy = false) => new Promise((resolve, reject) => {
    if (input.files?.length === 0)
      return;
    const file = input.files[0];
    const maxSizeAllowed = 2 * 1024 * 1024;
    if (file.size > maxSizeAllowed) {
      reject(
        window.deps.translateString(
          "generic.error.exceededSize",
          "Error: Exceeded size {{size}} MB",
          {
            size: 2
          }
        )
      );
      return;
    }
    const reader = new FileReader();
    eventsManager.addEventListener(reader, "load", async (event) => {
      let url = "";
      if (deploy) {
        if (!user) {
          reject(
            window.deps.translateString(
              "assets.loadFile.error.unauthenticated",
              "Error: Unauthenticated user"
            )
          );
          return;
        }
        ghPagesFileInputLabel.innerText = window.deps.translateString(
          "assets.loadFile.uploading",
          "Uploading..."
        );
        ghPagesFileInputLabel.classList.add("disabled");
        const deployResult = await deployAsset(user, {
          path: file.name,
          content: event.target?.result.split("base64,")[1]
        });
        ghPagesFileInputLabel.innerText = window.deps.translateString(
          "assets.loadFile.upload",
          "Upload file"
        );
        ghPagesFileInputLabel.classList.remove("disabled");
        if (deployResult) {
          url = deployResult.url;
        } else {
          reject(
            window.deps.translateString(
              "assets.loadFile.error.failedToUpload",
              "Error: Failed to upload file"
            )
          );
        }
      }
      url = url || event.target?.result;
      resolve({
        id: generateId(),
        filename: file.name,
        type: getType(file.type, file.name),
        url,
        lastModified: Date.now()
      });
    });
    eventsManager.addEventListener(reader, "error", () => {
      reject(
        window.deps.translateString(
          "generic.error.failedToReadFile",
          "Error: Failed to read file"
        )
      );
    });
    reader.readAsDataURL(file);
  });
  const processAsset = async (asset, outputElement, deploy = false) => {
    await assetsStorage.updateItem(asset.id, asset);
    const AddedFile = document.createElement("p");
    const fileLabel = document.createElement("span");
    fileLabel.textContent = window.deps.translateString(
      "assets.processAsset.addFile",
      "Added file: "
    );
    fileLabel.classList.add("bold");
    AddedFile.appendChild(fileLabel);
    const fileName = document.createElement("span");
    fileName.textContent += asset.filename;
    AddedFile.appendChild(fileName);
    AddedFile.classList.add("overflow-text");
    outputElement.appendChild(AddedFile);
    const urlText = document.createElement("p");
    const urlLabel = document.createElement("span");
    urlLabel.textContent = window.deps.translateString("assets.processAsset.urlLabel", "URL: ");
    urlLabel.classList.add("bold");
    urlText.appendChild(urlLabel);
    const url = document.createElement("span");
    url.textContent += asset.url;
    urlText.appendChild(url);
    urlText.classList.add("overflow-text");
    outputElement.appendChild(urlText);
    if (deploy) {
      const deployNotice = document.createElement("p");
      deployNotice.textContent = window.deps.translateString(
        "assets.processAsset.deployNotice",
        "The asset should be available on this URL soon (~1 min)."
      );
      deployNotice.classList.add("description", "center");
      outputElement.appendChild(deployNotice);
    } else {
      const previewImg = document.createElement("img");
      previewImg.src = getThumbnailUrl(asset, baseUrl);
      previewImg.onerror = function() {
        const fallbackImg = baseUrl + "assets/images/image.svg";
        if (previewImg.src !== fallbackImg) {
          previewImg.src = fallbackImg;
        }
      };
      previewImg.classList.add("img-preview-larger");
      outputElement.appendChild(previewImg);
    }
    const clickToCopy = document.createElement("p");
    clickToCopy.textContent = window.deps.translateString(
      "assets.generic.clickToCopyURL",
      "Click to copy URL"
    );
    clickToCopy.classList.add("description", "center");
    outputElement.appendChild(clickToCopy);
    const sep = document.createElement("hr");
    sep.style.margin = "1em";
    outputElement.appendChild(sep);
    outputElement.title = window.deps.translateString(
      "assets.generic.clickToCopyURL",
      "Click to copy URL"
    );
    notifications.success(
      window.deps.translateString("assets.processAsset.success", "File added to assets!")
    );
    outputElement.onclick = () => copyUrl(asset.url, notifications);
  };
  const inputHandler = async (fileInput, outputElement, deploy = false) => {
    await loadFile(fileInput, deploy).then((asset) => processAsset(asset, outputElement, deploy)).catch((message) => {
      notifications.error(message);
    });
  };
  eventsManager.addEventListener(
    dataUrlFileInput,
    "change",
    () => {
      inputHandler(dataUrlFileInput, dataUrlOutput);
    },
    false
  );
  eventsManager.addEventListener(
    ghPagesFileInputLabel,
    "click",
    async (ev) => {
      user = await getUser(async () => {
        await showScreen("add-asset", 1);
      });
      if (!user) {
        ev.preventDefault();
        notifications.error(
          window.deps.translateString("generic.error.authentication", "Authentication error!")
        );
      }
    },
    false
  );
  eventsManager.addEventListener(
    ghPagesFileInput,
    "change",
    () => {
      inputHandler(ghPagesFileInput, ghPagesOutput, true);
    },
    false
  );
  return addAssetContainer;
};
var getType = (mime, filename) => {
  const types = {
    "audio/aac": "audio",
    "video/x-msvideo": "video",
    "image/bmp": "image",
    "application/x-bzip": "archive",
    "application/x-bzip2": "archive",
    "text/css": "stylesheet",
    "text/csv": "csv",
    "application/gzip": "archive",
    "image/gif": "image",
    "text/html": "html",
    "image/vnd.microsoft.icon": "icon",
    "image/jpeg": "image",
    "text/javascript": "script",
    "application/javascript": "script",
    "application/json": "json",
    "application/ld+json": "json",
    "audio/midi": "audio",
    "audio/x-midi": "audio",
    "audio/mpeg": "audio",
    "video/mp4": "video",
    "video/mpeg": "video",
    "audio/ogg": "audio",
    "video/ogg": "video",
    "application/ogg": "audio",
    "audio/opus": "audio",
    "font/otf": "font",
    "image/png": "image",
    "application/vnd.rar": "archive",
    "image/svg+xml": "image",
    "application/x-tar": "archive",
    "image/tiff": "image",
    "video/mp2t": "video",
    "font/ttf": "font",
    "text/plain": "text",
    "audio/wav": "audio",
    "audio/webm": "audio",
    "video/webm": "video",
    "image/webp": "image",
    "font/woff": "font",
    "font/woff2": "font",
    "application/xhtml+xml": "html",
    "application/xml": "xml",
    "application/zip": "archive",
    "video/3gpp": "video",
    "video/3gpp2": "audio",
    "application/x-7z-compressed": "archive"
  };
  const extensions = {
    aac: "audio",
    bmp: "image",
    bzip: "archive",
    bzip2: "archive",
    css: "stylesheet",
    csv: "csv",
    gzip: "archive",
    gif: "image",
    html: "html",
    ico: "icon",
    jpeg: "image",
    jpg: "image",
    js: "script",
    json: "json",
    midi: "audio",
    mpeg: "audio",
    mp4: "video",
    ogg: "audio",
    otf: "font",
    png: "image",
    rar: "archive",
    svg: "image",
    tar: "archive",
    tiff: "image",
    mp2t: "video",
    ttf: "font",
    txt: "text",
    wav: "audio",
    webm: "audio",
    webp: "image",
    woff: "font",
    woff2: "font",
    xml: "xml",
    zip: "archive",
    "3gpp": "video",
    "3gpp2": "audio",
    "7z": "archive"
  };
  const extension = filename.split(".")[filename.split(".").length - 1];
  return types[mime] || extensions[extension] || "other";
};
var getThumbnailUrl = (item, baseUrl) => {
  if (item.type === "image" || item.type === "icon") {
    return item.url;
  }
  const path = baseUrl + "assets/images/";
  if (item.type === "other") {
    return path + "file.svg";
  }
  return path + item.type + ".svg";
};
export {
  createAddAssetContainer,
  createAssetsList
};
