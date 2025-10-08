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
  "node_modules/lz-string/libs/lz-string.js"(exports, module2) {
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
            buf.forEach(function(c2) {
              result.push(f(c2));
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
          var dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c2, data = { val: getNextValue(0), position: resetValue, index: 1 };
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
              c2 = f(bits);
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
              c2 = f(bits);
              break;
            case 2:
              return "";
          }
          dictionary[3] = c2;
          w = c2;
          result.push(c2);
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
            switch (c2 = bits) {
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
                c2 = dictSize - 1;
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
                c2 = dictSize - 1;
                enlargeIn--;
                break;
              case 2:
                return result.join("");
            }
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
            if (dictionary[c2]) {
              entry = dictionary[c2];
            } else {
              if (c2 === dictSize) {
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
    } else if (typeof module2 !== "undefined" && module2 != null) {
      module2.exports = LZString;
    }
  }
});

// node_modules/licia/has.js
var require_has = __commonJS({
  "node_modules/licia/has.js"(exports, module2) {
    var hasOwnProp = Object.prototype.hasOwnProperty;
    exports = function(obj, key) {
      return hasOwnProp.call(obj, key);
    };
    module2.exports = exports;
  }
});

// node_modules/licia/keys.js
var require_keys = __commonJS({
  "node_modules/licia/keys.js"(exports, module2) {
    var has = require_has();
    if (Object.keys && true) {
      exports = Object.keys;
    } else {
      exports = function(obj) {
        var ret = [];
        for (var key in obj) {
          if (has(obj, key))
            ret.push(key);
        }
        return ret;
      };
    }
    module2.exports = exports;
  }
});

// node_modules/licia/escape.js
var require_escape = __commonJS({
  "node_modules/licia/escape.js"(exports, module2) {
    var keys5 = require_keys();
    exports = function(str) {
      return regTest.test(str) ? str.replace(regReplace, replaceFn) : str;
    };
    var map8 = exports.map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "`": "&#x60;"
    };
    var regSrc = "(?:" + keys5(map8).join("|") + ")";
    var regTest = new RegExp(regSrc);
    var regReplace = new RegExp(regSrc, "g");
    var replaceFn = function(match) {
      return map8[match];
    };
    module2.exports = exports;
  }
});

// node_modules/licia/toStr.js
var require_toStr = __commonJS({
  "node_modules/licia/toStr.js"(exports, module2) {
    exports = function(val) {
      return val == null ? "" : val.toString();
    };
    module2.exports = exports;
  }
});

// node_modules/licia/idxOf.js
var require_idxOf = __commonJS({
  "node_modules/licia/idxOf.js"(exports, module2) {
    exports = function(arr, val, fromIdx) {
      return Array.prototype.indexOf.call(arr, val, fromIdx);
    };
    module2.exports = exports;
  }
});

// node_modules/licia/objToStr.js
var require_objToStr = __commonJS({
  "node_modules/licia/objToStr.js"(exports, module2) {
    var ObjToStr = Object.prototype.toString;
    exports = function(val) {
      return ObjToStr.call(val);
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isStr.js
var require_isStr = __commonJS({
  "node_modules/licia/isStr.js"(exports, module2) {
    var objToStr = require_objToStr();
    exports = function(val) {
      return objToStr(val) === "[object String]";
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isNum.js
var require_isNum = __commonJS({
  "node_modules/licia/isNum.js"(exports, module2) {
    var objToStr = require_objToStr();
    exports = function(val) {
      return objToStr(val) === "[object Number]";
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isFn.js
var require_isFn = __commonJS({
  "node_modules/licia/isFn.js"(exports, module2) {
    var objToStr = require_objToStr();
    exports = function(val) {
      var objStr = objToStr(val);
      return objStr === "[object Function]" || objStr === "[object GeneratorFunction]" || objStr === "[object AsyncFunction]";
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isArrLike.js
var require_isArrLike = __commonJS({
  "node_modules/licia/isArrLike.js"(exports, module2) {
    var isNum8 = require_isNum();
    var isFn4 = require_isFn();
    var MAX_ARR_IDX = Math.pow(2, 53) - 1;
    exports = function(val) {
      if (!val)
        return false;
      var len = val.length;
      return isNum8(len) && len >= 0 && len <= MAX_ARR_IDX && !isFn4(val);
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isUndef.js
var require_isUndef = __commonJS({
  "node_modules/licia/isUndef.js"(exports, module2) {
    exports = function(val) {
      return val === void 0;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/optimizeCb.js
var require_optimizeCb = __commonJS({
  "node_modules/licia/optimizeCb.js"(exports, module2) {
    var isUndef4 = require_isUndef();
    exports = function(fn, ctx, argCount) {
      if (isUndef4(ctx))
        return fn;
      switch (argCount == null ? 3 : argCount) {
        case 1:
          return function(val) {
            return fn.call(ctx, val);
          };
        case 3:
          return function(val, idx, collection) {
            return fn.call(ctx, val, idx, collection);
          };
        case 4:
          return function(accumulator, val, idx, collection) {
            return fn.call(ctx, accumulator, val, idx, collection);
          };
      }
      return function() {
        return fn.apply(ctx, arguments);
      };
    };
    module2.exports = exports;
  }
});

// node_modules/licia/each.js
var require_each = __commonJS({
  "node_modules/licia/each.js"(exports, module2) {
    var isArrLike = require_isArrLike();
    var keys5 = require_keys();
    var optimizeCb = require_optimizeCb();
    exports = function(obj, iterator, ctx) {
      iterator = optimizeCb(iterator, ctx);
      var i, len;
      if (isArrLike(obj)) {
        for (i = 0, len = obj.length; i < len; i++)
          iterator(obj[i], i, obj);
      } else {
        var _keys = keys5(obj);
        for (i = 0, len = _keys.length; i < len; i++) {
          iterator(obj[_keys[i]], _keys[i], obj);
        }
      }
      return obj;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/values.js
var require_values = __commonJS({
  "node_modules/licia/values.js"(exports, module2) {
    var each12 = require_each();
    exports = function(obj) {
      var ret = [];
      each12(obj, function(val) {
        ret.push(val);
      });
      return ret;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/contain.js
var require_contain = __commonJS({
  "node_modules/licia/contain.js"(exports, module2) {
    var idxOf = require_idxOf();
    var isStr6 = require_isStr();
    var isArrLike = require_isArrLike();
    var values = require_values();
    exports = function(arr, val) {
      if (isStr6(arr))
        return arr.indexOf(val) > -1;
      if (!isArrLike(arr))
        arr = values(arr);
      return idxOf(arr, val) >= 0;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/startWith.js
var require_startWith = __commonJS({
  "node_modules/licia/startWith.js"(exports, module2) {
    exports = function(str, prefix) {
      return str.indexOf(prefix) === 0;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/escapeJsStr.js
var require_escapeJsStr = __commonJS({
  "node_modules/licia/escapeJsStr.js"(exports, module2) {
    var toStr6 = require_toStr();
    exports = function(str) {
      return toStr6(str).replace(regEscapeChars, function(char) {
        switch (char) {
          case '"':
          case "'":
          case "\\":
            return "\\" + char;
          case "\n":
            return "\\n";
          case "\r":
            return "\\r";
          case "\u2028":
            return "\\u2028";
          case "\u2029":
            return "\\u2029";
        }
      });
    };
    var regEscapeChars = /["'\\\n\r\u2028\u2029]/g;
    module2.exports = exports;
  }
});

// node_modules/licia/endWith.js
var require_endWith = __commonJS({
  "node_modules/licia/endWith.js"(exports, module2) {
    exports = function(str, suffix) {
      var idx = str.length - suffix.length;
      return idx >= 0 && str.indexOf(suffix, idx) === idx;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isArr.js
var require_isArr = __commonJS({
  "node_modules/licia/isArr.js"(exports, module2) {
    var objToStr = require_objToStr();
    if (Array.isArray && true) {
      exports = Array.isArray;
    } else {
      exports = function(val) {
        return objToStr(val) === "[object Array]";
      };
    }
    module2.exports = exports;
  }
});

// node_modules/licia/isArgs.js
var require_isArgs = __commonJS({
  "node_modules/licia/isArgs.js"(exports, module2) {
    var objToStr = require_objToStr();
    exports = function(val) {
      return objToStr(val) === "[object Arguments]";
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isEmpty.js
var require_isEmpty = __commonJS({
  "node_modules/licia/isEmpty.js"(exports, module2) {
    var isArrLike = require_isArrLike();
    var isArr4 = require_isArr();
    var isStr6 = require_isStr();
    var isArgs = require_isArgs();
    var keys5 = require_keys();
    exports = function(val) {
      if (val == null)
        return true;
      if (isArrLike(val) && (isArr4(val) || isStr6(val) || isArgs(val))) {
        return val.length === 0;
      }
      return keys5(val).length === 0;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/createAssigner.js
var require_createAssigner = __commonJS({
  "node_modules/licia/createAssigner.js"(exports, module2) {
    var isUndef4 = require_isUndef();
    var each12 = require_each();
    exports = function(keysFn, defaults7) {
      return function(obj) {
        each12(arguments, function(src, idx) {
          if (idx === 0)
            return;
          var keys5 = keysFn(src);
          each12(keys5, function(key) {
            if (!defaults7 || isUndef4(obj[key]))
              obj[key] = src[key];
          });
        });
        return obj;
      };
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isObj.js
var require_isObj = __commonJS({
  "node_modules/licia/isObj.js"(exports, module2) {
    exports = function(val) {
      var type2 = typeof val;
      return !!val && (type2 === "function" || type2 === "object");
    };
    module2.exports = exports;
  }
});

// node_modules/licia/getProto.js
var require_getProto = __commonJS({
  "node_modules/licia/getProto.js"(exports, module2) {
    var isObj4 = require_isObj();
    var isFn4 = require_isFn();
    var getPrototypeOf = Object.getPrototypeOf;
    var ObjectCtr = {}.constructor;
    exports = function(obj) {
      if (!isObj4(obj))
        return;
      if (getPrototypeOf && true)
        return getPrototypeOf(obj);
      var proto = obj.__proto__;
      if (proto || proto === null)
        return proto;
      if (isFn4(obj.constructor))
        return obj.constructor.prototype;
      if (obj instanceof ObjectCtr)
        return ObjectCtr.prototype;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/extendOwn.js
var require_extendOwn = __commonJS({
  "node_modules/licia/extendOwn.js"(exports, module2) {
    var keys5 = require_keys();
    var createAssigner = require_createAssigner();
    exports = createAssigner(keys5);
    module2.exports = exports;
  }
});

// node_modules/licia/isMatch.js
var require_isMatch = __commonJS({
  "node_modules/licia/isMatch.js"(exports, module2) {
    var keys5 = require_keys();
    exports = function(obj, src) {
      var _keys = keys5(src);
      var len = _keys.length;
      if (obj == null)
        return !len;
      obj = Object(obj);
      for (var i = 0; i < len; i++) {
        var key = _keys[i];
        if (src[key] !== obj[key] || !(key in obj))
          return false;
      }
      return true;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/matcher.js
var require_matcher = __commonJS({
  "node_modules/licia/matcher.js"(exports, module2) {
    var extendOwn = require_extendOwn();
    var isMatch = require_isMatch();
    exports = function(attrs) {
      attrs = extendOwn({}, attrs);
      return function(obj) {
        return isMatch(obj, attrs);
      };
    };
    module2.exports = exports;
  }
});

// node_modules/licia/identity.js
var require_identity = __commonJS({
  "node_modules/licia/identity.js"(exports, module2) {
    exports = function(val) {
      return val;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/castPath.js
var require_castPath = __commonJS({
  "node_modules/licia/castPath.js"(exports, module2) {
    var has = require_has();
    var isArr4 = require_isArr();
    exports = function(str, obj) {
      if (isArr4(str))
        return str;
      if (obj && has(obj, str))
        return [str];
      var ret = [];
      str.replace(regPropName, function(match, number, quote, str2) {
        ret.push(quote ? str2.replace(regEscapeChar, "$1") : number || match);
      });
      return ret;
    };
    var regPropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var regEscapeChar = /\\(\\)?/g;
    module2.exports = exports;
  }
});

// node_modules/licia/safeGet.js
var require_safeGet = __commonJS({
  "node_modules/licia/safeGet.js"(exports, module2) {
    var isUndef4 = require_isUndef();
    var castPath = require_castPath();
    exports = function(obj, path) {
      path = castPath(path, obj);
      var prop;
      prop = path.shift();
      while (!isUndef4(prop)) {
        obj = obj[prop];
        if (obj == null)
          return;
        prop = path.shift();
      }
      return obj;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/property.js
var require_property = __commonJS({
  "node_modules/licia/property.js"(exports, module2) {
    var isArr4 = require_isArr();
    var safeGet = require_safeGet();
    exports = function(path) {
      if (!isArr4(path))
        return shallowProperty(path);
      return function(obj) {
        return safeGet(obj, path);
      };
    };
    function shallowProperty(key) {
      return function(obj) {
        return obj == null ? void 0 : obj[key];
      };
    }
    module2.exports = exports;
  }
});

// node_modules/licia/safeCb.js
var require_safeCb = __commonJS({
  "node_modules/licia/safeCb.js"(exports, module2) {
    var isFn4 = require_isFn();
    var isObj4 = require_isObj();
    var isArr4 = require_isArr();
    var optimizeCb = require_optimizeCb();
    var matcher = require_matcher();
    var identity = require_identity();
    var property = require_property();
    exports = function(val, ctx, argCount) {
      if (val == null)
        return identity;
      if (isFn4(val))
        return optimizeCb(val, ctx, argCount);
      if (isObj4(val) && !isArr4(val))
        return matcher(val);
      return property(val);
    };
    module2.exports = exports;
  }
});

// node_modules/licia/filter.js
var require_filter = __commonJS({
  "node_modules/licia/filter.js"(exports, module2) {
    var safeCb = require_safeCb();
    var each12 = require_each();
    exports = function(obj, predicate, ctx) {
      var ret = [];
      predicate = safeCb(predicate, ctx);
      each12(obj, function(val, idx, list) {
        if (predicate(val, idx, list))
          ret.push(val);
      });
      return ret;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/unique.js
var require_unique = __commonJS({
  "node_modules/licia/unique.js"(exports, module2) {
    var filter3 = require_filter();
    exports = function(arr, cmp) {
      cmp = cmp || isEqual;
      return filter3(arr, function(item, idx, arr2) {
        var len = arr2.length;
        while (++idx < len) {
          if (cmp(item, arr2[idx]))
            return false;
        }
        return true;
      });
    };
    function isEqual(a, b) {
      return a === b;
    }
    module2.exports = exports;
  }
});

// node_modules/licia/allKeys.js
var require_allKeys = __commonJS({
  "node_modules/licia/allKeys.js"(exports, module2) {
    var keys5 = require_keys();
    var getProto2 = require_getProto();
    var unique2 = require_unique();
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    exports = function(obj) {
      var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$prototype = _ref.prototype, prototype = _ref$prototype === void 0 ? true : _ref$prototype, _ref$unenumerable = _ref.unenumerable, unenumerable = _ref$unenumerable === void 0 ? false : _ref$unenumerable, _ref$symbol = _ref.symbol, symbol = _ref$symbol === void 0 ? false : _ref$symbol;
      var ret = [];
      if ((unenumerable || symbol) && getOwnPropertyNames) {
        var getKeys = keys5;
        if (unenumerable && getOwnPropertyNames)
          getKeys = getOwnPropertyNames;
        do {
          ret = ret.concat(getKeys(obj));
          if (symbol && getOwnPropertySymbols) {
            ret = ret.concat(getOwnPropertySymbols(obj));
          }
        } while (prototype && (obj = getProto2(obj)) && obj !== Object.prototype);
        ret = unique2(ret);
      } else {
        if (prototype) {
          for (var key in obj)
            ret.push(key);
        } else {
          ret = keys5(obj);
        }
      }
      return ret;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/defaults.js
var require_defaults = __commonJS({
  "node_modules/licia/defaults.js"(exports, module2) {
    var createAssigner = require_createAssigner();
    var allKeys2 = require_allKeys();
    exports = createAssigner(allKeys2, true);
    module2.exports = exports;
  }
});

// node_modules/licia/truncate.js
var require_truncate = __commonJS({
  "node_modules/licia/truncate.js"(exports, module2) {
    var defaults7 = require_defaults();
    var isUndef4 = require_isUndef();
    exports = function(txt, width) {
      var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      defaults7(options, defOptions);
      var ellipsis = options.ellipsis, separator = options.separator;
      var len = txt.length;
      if (width > len)
        return txt;
      var end = width - ellipsis.length;
      if (end < 1)
        return ellipsis;
      var ret = txt.slice(0, end);
      if (isUndef4(separator))
        return ret + ellipsis;
      if (txt.indexOf(separator, end) !== end) {
        var idx = ret.lastIndexOf(separator);
        if (idx > -1) {
          ret = ret.slice(0, idx);
        }
      }
      return ret + ellipsis;
    };
    var defOptions = {
      ellipsis: "..."
    };
    module2.exports = exports;
  }
});

// node_modules/licia/upperFirst.js
var require_upperFirst = __commonJS({
  "node_modules/licia/upperFirst.js"(exports, module2) {
    exports = function(str) {
      if (str.length < 1)
        return str;
      return str[0].toUpperCase() + str.slice(1);
    };
    module2.exports = exports;
  }
});

// node_modules/licia/map.js
var require_map = __commonJS({
  "node_modules/licia/map.js"(exports, module2) {
    var safeCb = require_safeCb();
    var keys5 = require_keys();
    var isArrLike = require_isArrLike();
    exports = function(obj, iterator, ctx) {
      iterator = safeCb(iterator, ctx);
      var _keys = !isArrLike(obj) && keys5(obj);
      var len = (_keys || obj).length;
      var results = Array(len);
      for (var i = 0; i < len; i++) {
        var curKey = _keys ? _keys[i] : i;
        results[i] = iterator(obj[curKey], curKey, obj);
      }
      return results;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/ltrim.js
var require_ltrim = __commonJS({
  "node_modules/licia/ltrim.js"(exports, module2) {
    var regSpace = /^\s+/;
    exports = function(str, chars) {
      if (chars == null) {
        if (str.trimLeft) {
          return str.trimLeft();
        }
        return str.replace(regSpace, "");
      }
      var start = 0;
      var len = str.length;
      var charLen = chars.length;
      var found = true;
      var i;
      var c2;
      while (found && start < len) {
        found = false;
        i = -1;
        c2 = str.charAt(start);
        while (++i < charLen) {
          if (c2 === chars[i]) {
            found = true;
            start++;
            break;
          }
        }
      }
      return start >= len ? "" : str.substr(start, len);
    };
    module2.exports = exports;
  }
});

// node_modules/licia/rtrim.js
var require_rtrim = __commonJS({
  "node_modules/licia/rtrim.js"(exports, module2) {
    exports = function(str, chars) {
      if (chars == null) {
        if (str.trimRight) {
          return str.trimRight();
        }
        chars = " \r\n	\f\v";
      }
      var end = str.length - 1;
      var charLen = chars.length;
      var found = true;
      var i;
      var c2;
      while (found && end >= 0) {
        found = false;
        i = -1;
        c2 = str.charAt(end);
        while (++i < charLen) {
          if (c2 === chars[i]) {
            found = true;
            end--;
            break;
          }
        }
      }
      return end >= 0 ? str.substring(0, end + 1) : "";
    };
    module2.exports = exports;
  }
});

// node_modules/licia/trim.js
var require_trim = __commonJS({
  "node_modules/licia/trim.js"(exports, module2) {
    var ltrim = require_ltrim();
    var rtrim = require_rtrim();
    exports = function(str, chars) {
      if (chars == null && str.trim) {
        return str.trim();
      }
      return ltrim(rtrim(str, chars), chars);
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isBrowser.js
var require_isBrowser = __commonJS({
  "node_modules/licia/isBrowser.js"(exports, module2) {
    exports = typeof window === "object" && typeof document === "object" && document.nodeType === 9;
    module2.exports = exports;
  }
});

// node_modules/licia/root.js
var require_root = __commonJS({
  "node_modules/licia/root.js"(exports, module2) {
    var isBrowser = require_isBrowser();
    exports = isBrowser ? window : global;
    module2.exports = exports;
  }
});

// node_modules/licia/last.js
var require_last = __commonJS({
  "node_modules/licia/last.js"(exports, module2) {
    exports = function(arr) {
      var len = arr ? arr.length : 0;
      if (len)
        return arr[len - 1];
    };
    module2.exports = exports;
  }
});

// node_modules/licia/arrToMap.js
var require_arrToMap = __commonJS({
  "node_modules/licia/arrToMap.js"(exports, module2) {
    var each12 = require_each();
    var isUndef4 = require_isUndef();
    var isFn4 = require_isFn();
    exports = function(arr, val) {
      if (isUndef4(val))
        val = true;
      var _isFn = isFn4(val);
      var ret = {};
      each12(arr, function(key) {
        ret[key] = _isFn ? val(key) : val;
      });
      return ret;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/lowerCase.js
var require_lowerCase = __commonJS({
  "node_modules/licia/lowerCase.js"(exports, module2) {
    var toStr6 = require_toStr();
    exports = function(str) {
      return toStr6(str).toLocaleLowerCase();
    };
    module2.exports = exports;
  }
});

// node_modules/licia/parseHtml.js
var require_parseHtml = __commonJS({
  "node_modules/licia/parseHtml.js"(exports, module2) {
    var last3 = require_last();
    var arrToMap = require_arrToMap();
    var startWith7 = require_startWith();
    var lowerCase7 = require_lowerCase();
    exports = function(html6, handler2) {
      var stack2 = [];
      var text;
      var lastHtml = html6;
      while (html6) {
        text = true;
        if (!last3(stack2) || !SPECIAL[last3(stack2)]) {
          if (startWith7(html6, "<!--")) {
            var endIdx = html6.indexOf("-->");
            if (endIdx >= 0) {
              if (handler2.comment) {
                handler2.comment(html6.substring(4, endIdx));
              }
              html6 = html6.substring(endIdx + 3);
              text = false;
            }
          } else if (startWith7(html6, "<!")) {
            var match = html6.match(regDoctype);
            if (match) {
              if (handler2.text)
                handler2.text(html6.substring(0, match[0].length));
              html6 = html6.substring(match[0].length);
              text = false;
            }
          } else if (startWith7(html6, "</")) {
            var _match = html6.match(regEndTag);
            if (_match) {
              html6 = html6.substring(_match[0].length);
              _match[0].replace(regEndTag, parseEndTag);
              text = false;
            }
          } else if (startWith7(html6, "<")) {
            var _match2 = html6.match(regStartTag);
            if (_match2) {
              html6 = html6.substring(_match2[0].length);
              _match2[0].replace(regStartTag, parseStartTag);
              text = false;
            }
          }
          if (text) {
            var _endIdx = html6.indexOf("<");
            var _text = _endIdx < 0 ? html6 : html6.substring(0, _endIdx);
            html6 = _endIdx < 0 ? "" : html6.substring(_endIdx);
            if (handler2.text)
              handler2.text(_text);
          }
        } else {
          var execRes = new RegExp("</".concat(last3(stack2), "[^>]*>")).exec(
            html6
          );
          if (execRes) {
            var _text2 = html6.substring(0, execRes.index);
            html6 = html6.substring(execRes.index + execRes[0].length);
            if (_text2 && handler2.text)
              handler2.text(_text2);
          }
          parseEndTag("", last3(stack2));
        }
        if (lastHtml === html6) {
          throw Error("Parse Error: " + html6);
        }
        lastHtml = html6;
      }
      parseEndTag();
      function parseStartTag(tag, tagName, rest, unary) {
        tagName = lowerCase7(tagName);
        unary = !!unary;
        if (!unary)
          stack2.push(tagName);
        if (handler2.start) {
          var attrs = {};
          rest.replace(regAttr, function(all, $1, $22, $32, $42) {
            attrs[$1] = $22 || $32 || $42 || "";
          });
          handler2.start(tagName, attrs, unary);
        }
      }
      function parseEndTag(tag, tagName) {
        tagName = lowerCase7(tagName);
        var pos;
        if (!tagName) {
          pos = 0;
        } else {
          for (pos = stack2.length - 1; pos >= 0; pos--) {
            if (stack2[pos] === tagName)
              break;
          }
        }
        if (pos >= 0) {
          for (var i = stack2.length - 1; i >= pos; i--) {
            if (handler2.end)
              handler2.end(stack2[i]);
          }
          stack2.length = pos;
        }
      }
    };
    var regDoctype = /^<!\s*doctype((?:\s+[\w:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/i;
    var regEndTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
    var regStartTag = /^<([-A-Za-z0-9_]+)((?:\s+[-A-Za-z0-9_:@.]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/i;
    var regAttr = /([-A-Za-z0-9_:@.]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
    var SPECIAL = arrToMap("script,style".split(","));
    module2.exports = exports;
  }
});

// node_modules/licia/extend.js
var require_extend = __commonJS({
  "node_modules/licia/extend.js"(exports, module2) {
    var createAssigner = require_createAssigner();
    var allKeys2 = require_allKeys();
    exports = createAssigner(allKeys2);
    module2.exports = exports;
  }
});

// node_modules/licia/toArr.js
var require_toArr = __commonJS({
  "node_modules/licia/toArr.js"(exports, module2) {
    var isArrLike = require_isArrLike();
    var map8 = require_map();
    var isArr4 = require_isArr();
    var isStr6 = require_isStr();
    exports = function(val) {
      if (!val)
        return [];
      if (isArr4(val))
        return val;
      if (isArrLike(val) && !isStr6(val))
        return map8(val);
      return [val];
    };
    module2.exports = exports;
  }
});

// node_modules/licia/create.js
var require_create = __commonJS({
  "node_modules/licia/create.js"(exports, module2) {
    var isObj4 = require_isObj();
    exports = function(proto) {
      if (!isObj4(proto))
        return {};
      if (objCreate && true)
        return objCreate(proto);
      function noop2() {
      }
      noop2.prototype = proto;
      return new noop2();
    };
    var objCreate = Object.create;
    module2.exports = exports;
  }
});

// node_modules/licia/inherits.js
var require_inherits = __commonJS({
  "node_modules/licia/inherits.js"(exports, module2) {
    var create = require_create();
    exports = function(Class, SuperClass) {
      Class.prototype = create(SuperClass.prototype);
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isMiniProgram.js
var require_isMiniProgram = __commonJS({
  "node_modules/licia/isMiniProgram.js"(exports, module2) {
    var isFn4 = require_isFn();
    exports = typeof wx !== "undefined" && isFn4(wx.openLocation);
    module2.exports = exports;
  }
});

// node_modules/licia/Class.js
var require_Class = __commonJS({
  "node_modules/licia/Class.js"(exports, module2) {
    var extend7 = require_extend();
    var toArr4 = require_toArr();
    var inherits = require_inherits();
    var safeGet = require_safeGet();
    var isMiniProgram = require_isMiniProgram();
    exports = function(methods, statics) {
      return Base.extend(methods, statics);
    };
    function makeClass(parent2, methods, statics) {
      statics = statics || {};
      var className = methods.className || safeGet(methods, "initialize.name") || "";
      delete methods.className;
      var ctor = function() {
        var args = toArr4(arguments);
        return this.initialize ? this.initialize.apply(this, args) || this : this;
      };
      if (!isMiniProgram) {
        try {
          ctor = new Function(
            "toArr",
            "return function " + className + "(){var args = toArr(arguments);return this.initialize ? this.initialize.apply(this, args) || this : this;};"
          )(toArr4);
        } catch (e) {
        }
      }
      inherits(ctor, parent2);
      ctor.prototype.constructor = ctor;
      ctor.extend = function(methods2, statics2) {
        return makeClass(ctor, methods2, statics2);
      };
      ctor.inherits = function(Class) {
        inherits(ctor, Class);
      };
      ctor.methods = function(methods2) {
        extend7(ctor.prototype, methods2);
        return ctor;
      };
      ctor.statics = function(statics2) {
        extend7(ctor, statics2);
        return ctor;
      };
      ctor.methods(methods).statics(statics);
      return ctor;
    }
    var Base = exports.Base = makeClass(Object, {
      className: "Base",
      callSuper: function(parent2, name, args) {
        var superMethod = parent2.prototype[name];
        return superMethod.apply(this, args);
      },
      toString: function() {
        return this.constructor.name;
      }
    });
    module2.exports = exports;
  }
});

// node_modules/licia/reverse.js
var require_reverse = __commonJS({
  "node_modules/licia/reverse.js"(exports, module2) {
    exports = function(arr) {
      var len = arr.length;
      var ret = Array(len);
      len--;
      for (var i = 0; i <= len; i++) {
        ret[len - i] = arr[i];
      }
      return ret;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/Stack.js
var require_Stack = __commonJS({
  "node_modules/licia/Stack.js"(exports, module2) {
    var Class = require_Class();
    var reverse = require_reverse();
    exports = Class({
      initialize: function Stack2() {
        this.clear();
      },
      clear: function() {
        this._items = [];
        this.size = 0;
      },
      push: function(item) {
        this._items.push(item);
        return ++this.size;
      },
      pop: function() {
        if (!this.size)
          return;
        this.size--;
        return this._items.pop();
      },
      peek: function() {
        return this._items[this.size - 1];
      },
      forEach: function(iterator, ctx) {
        ctx = arguments.length > 1 ? ctx : this;
        var items = this._items;
        for (var i = this.size - 1, j = 0; i >= 0; i--, j++) {
          iterator.call(ctx, items[i], j, this);
        }
      },
      toArr: function() {
        return reverse(this._items);
      }
    });
    module2.exports = exports;
  }
});

// node_modules/licia/mapObj.js
var require_mapObj = __commonJS({
  "node_modules/licia/mapObj.js"(exports, module2) {
    var safeCb = require_safeCb();
    var keys5 = require_keys();
    exports = function(obj, iterator, ctx) {
      iterator = safeCb(iterator, ctx);
      var _keys = keys5(obj);
      var len = _keys.length;
      var ret = {};
      for (var i = 0; i < len; i++) {
        var curKey = _keys[i];
        ret[curKey] = iterator(obj[curKey], curKey, obj);
      }
      return ret;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/html.js
var require_html = __commonJS({
  "node_modules/licia/html.js"(exports, module2) {
    var parseHtml = require_parseHtml();
    var Stack2 = require_Stack();
    var isArr4 = require_isArr();
    var each12 = require_each();
    var isStr6 = require_isStr();
    var mapObj = require_mapObj();
    function parse(html6) {
      var ret = [];
      var stack2 = new Stack2();
      parseHtml(html6, {
        start: function(tag, attrs) {
          attrs = mapObj(attrs, function(val) {
            return unescapeQuote(val);
          });
          stack2.push({
            tag,
            attrs
          });
        },
        end: function() {
          var node = stack2.pop();
          if (!stack2.size) {
            ret.push(node);
            return;
          }
          var lastNode = stack2.peek();
          if (!isArr4(lastNode.content)) {
            lastNode.content = [];
          }
          lastNode.content.push(node);
        },
        comment: function(text) {
          var comment = "<!--".concat(text, "-->");
          var lastNode = stack2.peek();
          if (!lastNode) {
            ret.push(comment);
            return;
          }
          if (!lastNode.content)
            lastNode.content = [];
          lastNode.content.push(comment);
        },
        text: function(text) {
          var lastNode = stack2.peek();
          if (!lastNode) {
            ret.push(text);
            return;
          }
          if (!lastNode.content)
            lastNode.content = [];
          lastNode.content.push(text);
        }
      });
      return ret;
    }
    function stringify3(tree) {
      var ret = "";
      if (isArr4(tree)) {
        each12(tree, function(node) {
          return ret += stringify3(node);
        });
      } else if (isStr6(tree)) {
        ret = tree;
      } else {
        ret += "<".concat(tree.tag);
        each12(tree.attrs, function(val, key) {
          return ret += " ".concat(key, '="').concat(escapeQuote(val), '"');
        });
        ret += ">";
        if (tree.content)
          ret += stringify3(tree.content);
        ret += "</".concat(tree.tag, ">");
      }
      return ret;
    }
    var unescapeQuote = function(str) {
      return str.replace(/&quot;/g, '"');
    };
    var escapeQuote = function(str) {
      return str.replace(/"/g, "&quot;");
    };
    exports = {
      parse,
      stringify: stringify3
    };
    module2.exports = exports;
  }
});

// node_modules/licia/toNum.js
var require_toNum = __commonJS({
  "node_modules/licia/toNum.js"(exports, module2) {
    var isNum8 = require_isNum();
    var isObj4 = require_isObj();
    var isFn4 = require_isFn();
    var isStr6 = require_isStr();
    exports = function(val) {
      if (isNum8(val))
        return val;
      if (isObj4(val)) {
        var temp = isFn4(val.valueOf) ? val.valueOf() : val;
        val = isObj4(temp) ? temp + "" : temp;
      }
      if (!isStr6(val))
        return val === 0 ? val : +val;
      return +val;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isNode.js
var require_isNode = __commonJS({
  "node_modules/licia/isNode.js"(exports, module2) {
    var objToStr = require_objToStr();
    exports = typeof process !== "undefined" && objToStr(process) === "[object process]";
    module2.exports = exports;
  }
});

// node_modules/licia/detectOs.js
var require_detectOs = __commonJS({
  "node_modules/licia/detectOs.js"(exports, module2) {
    var isBrowser = require_isBrowser();
    var isNode = require_isNode();
    exports = function(ua) {
      if (!ua && isBrowser) {
        ua = navigator.userAgent;
      }
      function detect(keyword) {
        return ua.indexOf(keyword) > -1;
      }
      if (ua) {
        ua = ua.toLowerCase();
        if (detect("windows phone"))
          return "windows phone";
        if (detect("win"))
          return "windows";
        if (detect("android"))
          return "android";
        if (detect("ipad") || detect("iphone") || detect("ipod"))
          return "ios";
        if (detect("mac"))
          return "os x";
        if (detect("linux"))
          return "linux";
      } else if (isNode) {
        var _process = process, platform = _process.platform, env = _process.env;
        if (platform === "win32" || env.OSTYPE === "cygwin" || env.OSTYPE === "msys") {
          return "windows";
        }
        if (platform === "darwin") {
          return "os x";
        }
        if (platform === "linux") {
          return "linux";
        }
      }
      return "unknown";
    };
    module2.exports = exports;
  }
});

// node_modules/licia/noop.js
var require_noop = __commonJS({
  "node_modules/licia/noop.js"(exports, module2) {
    exports = function() {
    };
    module2.exports = exports;
  }
});

// node_modules/licia/loadImg.js
var require_loadImg = __commonJS({
  "node_modules/licia/loadImg.js"(exports, module2) {
    var noop2 = require_noop();
    exports = function(src, cb) {
      cb = cb || noop2;
      var img = new Image();
      img.onload = function() {
        cb(null, img);
      };
      img.onerror = function(err) {
        cb(err);
      };
      img.src = src;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isHidden.js
var require_isHidden = __commonJS({
  "node_modules/licia/isHidden.js"(exports, module2) {
    var root5 = require_root();
    var getComputedStyle2 = root5.getComputedStyle;
    var document3 = root5.document;
    exports = function(el) {
      var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$display = _ref.display, display = _ref$display === void 0 ? true : _ref$display, _ref$visibility = _ref.visibility, visibility = _ref$visibility === void 0 ? false : _ref$visibility, _ref$opacity = _ref.opacity, opacity = _ref$opacity === void 0 ? false : _ref$opacity, _ref$size = _ref.size, size = _ref$size === void 0 ? false : _ref$size, _ref$viewport = _ref.viewport, viewport = _ref$viewport === void 0 ? false : _ref$viewport, _ref$overflow = _ref.overflow, overflow = _ref$overflow === void 0 ? false : _ref$overflow;
      var computedStyle = getComputedStyle2(el);
      if (display) {
        var tagName = el.tagName;
        if (tagName === "BODY" || tagName === "HTML" || computedStyle.position === "fixed") {
          if (computedStyle.display === "none") {
            return true;
          } else {
            var cur = el;
            while (cur = cur.parentElement) {
              var _computedStyle = getComputedStyle2(cur);
              if (_computedStyle.display === "none") {
                return true;
              }
            }
          }
        } else if (el.offsetParent === null) {
          return true;
        }
      }
      if (visibility && computedStyle.visibility === "hidden") {
        return true;
      }
      if (opacity) {
        if (computedStyle.opacity === "0") {
          return true;
        } else {
          var _cur = el;
          while (_cur = _cur.parentElement) {
            var _computedStyle2 = getComputedStyle2(_cur);
            if (_computedStyle2.opacity === "0") {
              return true;
            }
          }
        }
      }
      var clientRect = el.getBoundingClientRect();
      if (size && (clientRect.width === 0 || clientRect.height === 0)) {
        return true;
      }
      if (viewport) {
        var containerRect = {
          top: 0,
          left: 0,
          right: document3.documentElement.clientWidth,
          bottom: document3.documentElement.clientHeight
        };
        return isOutside(clientRect, containerRect);
      }
      if (overflow) {
        var _cur2 = el;
        while (_cur2 = _cur2.parentElement) {
          var _computedStyle3 = getComputedStyle2(_cur2);
          var _overflow = _computedStyle3.overflow;
          if (_overflow === "scroll" || _overflow === "hidden") {
            var curRect = _cur2.getBoundingClientRect();
            if (isOutside(clientRect, curRect))
              return true;
          }
        }
      }
      return false;
    };
    function isOutside(clientRect, containerRect) {
      return clientRect.right < containerRect.left || clientRect.left > containerRect.right || clientRect.bottom < containerRect.top || clientRect.top > containerRect.bottom;
    }
    module2.exports = exports;
  }
});

// node_modules/licia/isBool.js
var require_isBool = __commonJS({
  "node_modules/licia/isBool.js"(exports, module2) {
    exports = function(val) {
      return val === true || val === false;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isNil.js
var require_isNil = __commonJS({
  "node_modules/licia/isNil.js"(exports, module2) {
    exports = function(val) {
      return val == null;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/toSrc.js
var require_toSrc = __commonJS({
  "node_modules/licia/toSrc.js"(exports, module2) {
    var isNil = require_isNil();
    exports = function(fn) {
      if (isNil(fn))
        return "";
      try {
        return fnToStr.call(fn);
      } catch (e) {
      }
      try {
        return fn + "";
      } catch (e) {
      }
      return "";
    };
    var fnToStr = Function.prototype.toString;
    module2.exports = exports;
  }
});

// node_modules/licia/isPromise.js
var require_isPromise = __commonJS({
  "node_modules/licia/isPromise.js"(exports, module2) {
    var isObj4 = require_isObj();
    var isFn4 = require_isFn();
    exports = function(val) {
      return isObj4(val) && isFn4(val.then) && isFn4(val.catch);
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isNaN.js
var require_isNaN = __commonJS({
  "node_modules/licia/isNaN.js"(exports, module2) {
    var isNum8 = require_isNum();
    exports = function(val) {
      return isNum8(val) && val !== +val;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isBuffer.js
var require_isBuffer = __commonJS({
  "node_modules/licia/isBuffer.js"(exports, module2) {
    var isFn4 = require_isFn();
    exports = function(val) {
      if (val == null)
        return false;
      if (val._isBuffer)
        return true;
      return val.constructor && isFn4(val.constructor.isBuffer) && val.constructor.isBuffer(val);
    };
    module2.exports = exports;
  }
});

// node_modules/licia/type.js
var require_type = __commonJS({
  "node_modules/licia/type.js"(exports, module2) {
    var objToStr = require_objToStr();
    var isNaN3 = require_isNaN();
    var lowerCase7 = require_lowerCase();
    var isBuffer = require_isBuffer();
    exports = function(val) {
      var lower = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      var ret;
      if (val === null)
        ret = "Null";
      if (val === void 0)
        ret = "Undefined";
      if (isNaN3(val))
        ret = "NaN";
      if (isBuffer(val))
        ret = "Buffer";
      if (!ret) {
        ret = objToStr(val).match(regObj);
        if (ret)
          ret = ret[1];
      }
      if (!ret)
        return "";
      return lower ? lowerCase7(ret) : ret;
    };
    var regObj = /^\[object\s+(.*?)]$/;
    module2.exports = exports;
  }
});

// node_modules/licia/restArgs.js
var require_restArgs = __commonJS({
  "node_modules/licia/restArgs.js"(exports, module2) {
    exports = function(fn, startIdx) {
      startIdx = startIdx == null ? fn.length - 1 : +startIdx;
      return function() {
        var len = Math.max(arguments.length - startIdx, 0);
        var rest = new Array(len);
        var i;
        for (i = 0; i < len; i++)
          rest[i] = arguments[i + startIdx];
        switch (startIdx) {
          case 0:
            return fn.call(this, rest);
          case 1:
            return fn.call(this, arguments[0], rest);
          case 2:
            return fn.call(this, arguments[0], arguments[1], rest);
        }
        var args = new Array(startIdx + 1);
        for (i = 0; i < startIdx; i++)
          args[i] = arguments[i];
        args[startIdx] = rest;
        return fn.apply(this, args);
      };
    };
    module2.exports = exports;
  }
});

// node_modules/licia/mergeArr.js
var require_mergeArr = __commonJS({
  "node_modules/licia/mergeArr.js"(exports, module2) {
    var restArgs = require_restArgs();
    exports = restArgs(function(first, arrays) {
      var end = first.length;
      for (var i = 0, len = arrays.length; i < len; i++) {
        var arr = arrays[i];
        for (var j = 0, _len = arr.length; j < _len; j++) {
          first[end++] = arr[j];
        }
      }
      first.length = end;
      return first;
    });
    module2.exports = exports;
  }
});

// node_modules/licia/Select.js
var require_Select = __commonJS({
  "node_modules/licia/Select.js"(exports, module2) {
    var Class = require_Class();
    var isStr6 = require_isStr();
    var each12 = require_each();
    var mergeArr = require_mergeArr();
    exports = Class({
      className: "Select",
      initialize: function(selector) {
        this.length = 0;
        if (!selector)
          return this;
        if (isStr6(selector))
          return rootSelect.find(selector);
        if (selector.nodeType) {
          this[0] = selector;
          this.length = 1;
        }
      },
      find: function(selector) {
        var ret = new exports();
        this.each(function() {
          mergeArr(ret, this.querySelectorAll(selector));
        });
        return ret;
      },
      each: function(fn) {
        each12(this, function(element, idx) {
          fn.call(element, idx, element);
        });
        return this;
      }
    });
    var rootSelect = new exports(document);
    module2.exports = exports;
  }
});

// node_modules/licia/$safeEls.js
var require_safeEls = __commonJS({
  "node_modules/licia/$safeEls.js"(exports, module2) {
    var isStr6 = require_isStr();
    var toArr4 = require_toArr();
    var Select = require_Select();
    exports = function(val) {
      return toArr4(isStr6(val) ? new Select(val) : val);
    };
    module2.exports = exports;
  }
});

// node_modules/licia/$offset.js
var require_offset = __commonJS({
  "node_modules/licia/$offset.js"(exports, module2) {
    var $safeEls = require_safeEls();
    exports = function(els) {
      els = $safeEls(els);
      var el = els[0];
      var clientRect = el.getBoundingClientRect();
      return {
        left: clientRect.left + window.pageXOffset,
        top: clientRect.top + window.pageYOffset,
        width: Math.round(clientRect.width),
        height: Math.round(clientRect.height)
      };
    };
    module2.exports = exports;
  }
});

// node_modules/licia/$show.js
var require_show = __commonJS({
  "node_modules/licia/$show.js"(exports, module2) {
    var each12 = require_each();
    var $safeEls = require_safeEls();
    exports = function(els) {
      els = $safeEls(els);
      each12(els, function(el) {
        if (isHidden7(el)) {
          el.style.display = getDefDisplay(el.nodeName);
        }
      });
    };
    function isHidden7(el) {
      return getComputedStyle(el, "").getPropertyValue("display") == "none";
    }
    var elDisplay = {};
    function getDefDisplay(elName) {
      var el, display;
      if (!elDisplay[elName]) {
        el = document.createElement(elName);
        document.documentElement.appendChild(el);
        display = getComputedStyle(el, "").getPropertyValue("display");
        el.parentNode.removeChild(el);
        display == "none" && (display = "block");
        elDisplay[elName] = display;
      }
      return elDisplay[elName];
    }
    module2.exports = exports;
  }
});

// node_modules/licia/splitCase.js
var require_splitCase = __commonJS({
  "node_modules/licia/splitCase.js"(exports, module2) {
    var regUpperCase = /([A-Z])/g;
    var regSeparator = /[_.\- ]+/g;
    var regTrim = /(^-)|(-$)/g;
    exports = function(str) {
      str = str.replace(regUpperCase, "-$1").toLowerCase().replace(regSeparator, "-").replace(regTrim, "");
      return str.split("-");
    };
    module2.exports = exports;
  }
});

// node_modules/licia/kebabCase.js
var require_kebabCase = __commonJS({
  "node_modules/licia/kebabCase.js"(exports, module2) {
    var splitCase = require_splitCase();
    exports = function(str) {
      return splitCase(str).join("-");
    };
    module2.exports = exports;
  }
});

// node_modules/licia/memoize.js
var require_memoize = __commonJS({
  "node_modules/licia/memoize.js"(exports, module2) {
    var has = require_has();
    exports = function(fn, hashFn) {
      var memoize = function(key) {
        var cache2 = memoize.cache;
        var address = "" + (hashFn ? hashFn.apply(this, arguments) : key);
        if (!has(cache2, address))
          cache2[address] = fn.apply(this, arguments);
        return cache2[address];
      };
      memoize.cache = {};
      return memoize;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/camelCase.js
var require_camelCase = __commonJS({
  "node_modules/licia/camelCase.js"(exports, module2) {
    var splitCase = require_splitCase();
    exports = function(str) {
      var arr = splitCase(str);
      var ret = arr[0];
      arr.shift();
      arr.forEach(capitalize2, arr);
      ret += arr.join("");
      return ret;
    };
    function capitalize2(val, idx) {
      this[idx] = val.replace(/\w/, function(match) {
        return match.toUpperCase();
      });
    }
    module2.exports = exports;
  }
});

// node_modules/licia/prefix.js
var require_prefix = __commonJS({
  "node_modules/licia/prefix.js"(exports, module2) {
    var memoize = require_memoize();
    var camelCase = require_camelCase();
    var upperFirst4 = require_upperFirst();
    var has = require_has();
    var kebabCase = require_kebabCase();
    exports = memoize(function(name) {
      name = name.replace(regPrefixes, "");
      name = camelCase(name);
      if (has(style, name))
        return name;
      var i = prefixes.length;
      while (i--) {
        var prefixName = prefixes[i] + upperFirst4(name);
        if (has(style, prefixName))
          return prefixName;
      }
      return name;
    });
    exports.dash = memoize(function(name) {
      var camelCaseResult = exports(name);
      return (regPrefixes.test(camelCaseResult) ? "-" : "") + kebabCase(camelCaseResult);
    });
    var prefixes = ["O", "ms", "Moz", "Webkit"];
    var regPrefixes = /^(O)|(ms)|(Moz)|(Webkit)|(-o-)|(-ms-)|(-moz-)|(-webkit-)/g;
    var style = document.createElement("p").style;
    module2.exports = exports;
  }
});

// node_modules/licia/$css.js
var require_css = __commonJS({
  "node_modules/licia/$css.js"(exports, module2) {
    var isStr6 = require_isStr();
    var isObj4 = require_isObj();
    var kebabCase = require_kebabCase();
    var isUndef4 = require_isUndef();
    var contain10 = require_contain();
    var isNum8 = require_isNum();
    var $safeEls = require_safeEls();
    var prefix = require_prefix();
    var each12 = require_each();
    exports = function(nodes, name, val) {
      nodes = $safeEls(nodes);
      var isGetter = isUndef4(val) && isStr6(name);
      if (isGetter)
        return getCss(nodes[0], name);
      var css2 = name;
      if (!isObj4(css2)) {
        css2 = {};
        css2[name] = val;
      }
      setCss(nodes, css2);
    };
    function getCss(node, name) {
      return node.style[prefix(name)] || getComputedStyle(node, "").getPropertyValue(name);
    }
    function setCss(nodes, css2) {
      each12(nodes, function(node) {
        var cssText = ";";
        each12(css2, function(val, key) {
          key = prefix.dash(key);
          cssText += key + ":" + addPx(key, val) + ";";
        });
        node.style.cssText += cssText;
      });
    }
    var cssNumProps = [
      "column-count",
      "columns",
      "font-weight",
      "line-weight",
      "opacity",
      "z-index",
      "zoom"
    ];
    function addPx(key, val) {
      var needPx = isNum8(val) && !contain10(cssNumProps, kebabCase(key));
      return needPx ? val + "px" : val;
    }
    module2.exports = exports;
  }
});

// node_modules/licia/$attr.js
var require_attr = __commonJS({
  "node_modules/licia/$attr.js"(exports, module2) {
    var toArr4 = require_toArr();
    var isObj4 = require_isObj();
    var isStr6 = require_isStr();
    var each12 = require_each();
    var isUndef4 = require_isUndef();
    var $safeEls = require_safeEls();
    exports = function(els, name, val) {
      els = $safeEls(els);
      var isGetter = isUndef4(val) && isStr6(name);
      if (isGetter)
        return getAttr(els[0], name);
      var attrs = name;
      if (!isObj4(attrs)) {
        attrs = {};
        attrs[name] = val;
      }
      setAttr(els, attrs);
    };
    exports.remove = function(els, names) {
      els = $safeEls(els);
      names = toArr4(names);
      each12(els, function(node) {
        each12(names, function(name) {
          node.removeAttribute(name);
        });
      });
    };
    function getAttr(el, name) {
      return el.getAttribute(name);
    }
    function setAttr(els, attrs) {
      each12(els, function(el) {
        each12(attrs, function(val, name) {
          el.setAttribute(name, val);
        });
      });
    }
    module2.exports = exports;
  }
});

// node_modules/licia/$property.js
var require_property2 = __commonJS({
  "node_modules/licia/$property.js"(exports, module2) {
    var isUndef4 = require_isUndef();
    var each12 = require_each();
    var $safeEls = require_safeEls();
    exports = {
      html: propFactory("innerHTML"),
      text: propFactory("textContent"),
      val: propFactory("value")
    };
    function propFactory(name) {
      return function(nodes, val) {
        nodes = $safeEls(nodes);
        var node = nodes[0];
        if (isUndef4(val)) {
          return node ? node[name] : "";
        }
        if (!node)
          return;
        each12(nodes, function(node2) {
          node2[name] = val;
        });
      };
    }
    module2.exports = exports;
  }
});

// node_modules/licia/$remove.js
var require_remove = __commonJS({
  "node_modules/licia/$remove.js"(exports, module2) {
    var each12 = require_each();
    var $safeEls = require_safeEls();
    exports = function(els) {
      els = $safeEls(els);
      each12(els, function(el) {
        var parent2 = el.parentNode;
        if (parent2)
          parent2.removeChild(el);
      });
    };
    module2.exports = exports;
  }
});

// node_modules/licia/$data.js
var require_data = __commonJS({
  "node_modules/licia/$data.js"(exports, module2) {
    var $attr = require_attr();
    var isStr6 = require_isStr();
    var isObj4 = require_isObj();
    var each12 = require_each();
    var $safeEls = require_safeEls();
    exports = function(nodes, name, val) {
      var dataName = name;
      if (isStr6(name))
        dataName = "data-" + name;
      if (isObj4(name)) {
        dataName = {};
        each12(name, function(val2, key) {
          dataName["data-" + key] = val2;
        });
      }
      return $attr(nodes, dataName, val);
    };
    module2.exports = exports;
  }
});

// node_modules/licia/delegate.js
var require_delegate = __commonJS({
  "node_modules/licia/delegate.js"(exports, module2) {
    var Class = require_Class();
    var contain10 = require_contain();
    function retTrue() {
      return true;
    }
    function retFalse() {
      return false;
    }
    function trigger(e) {
      var handlers = this.events[e.type];
      var handler2;
      var handlerQueue = formatHandlers.call(this, e, handlers);
      e = new exports.Event(e);
      var i = 0, j, matched, ret;
      while ((matched = handlerQueue[i++]) && !e.isPropagationStopped()) {
        e.curTarget = matched.el;
        j = 0;
        while ((handler2 = matched.handlers[j++]) && !e.isImmediatePropagationStopped()) {
          ret = handler2.handler.apply(matched.el, [e]);
          if (ret === false) {
            e.preventDefault();
            e.stopPropagation();
          }
        }
      }
    }
    function formatHandlers(e, handlers) {
      var current = e.target;
      var ret = [];
      var delegateCount = handlers.delegateCount;
      var selector;
      var matches;
      var handler2;
      var i;
      if (current.nodeType) {
        for (; current !== this; current = current.parentNode || this) {
          matches = [];
          for (i = 0; i < delegateCount; i++) {
            handler2 = handlers[i];
            selector = handler2.selector + " ";
            if (matches[selector] === void 0) {
              matches[selector] = contain10(
                this.querySelectorAll(selector),
                current
              );
            }
            if (matches[selector])
              matches.push(handler2);
          }
          if (matches.length)
            ret.push({
              el: current,
              handlers: matches
            });
        }
      }
      if (delegateCount < handlers.length) {
        ret.push({
          el: this,
          handlers: handlers.slice(delegateCount)
        });
      }
      return ret;
    }
    exports = {
      add: function(el, type2, selector, fn) {
        var handler2 = {
          selector,
          handler: fn
        };
        var handlers;
        if (!el.events)
          el.events = {};
        if (!(handlers = el.events[type2])) {
          handlers = el.events[type2] = [];
          handlers.delegateCount = 0;
          el.addEventListener(
            type2,
            function() {
              trigger.apply(el, arguments);
            },
            false
          );
        }
        selector ? handlers.splice(handlers.delegateCount++, 0, handler2) : handlers.push(handler2);
      },
      remove: function(el, type2, selector, fn) {
        var events = el.events;
        if (!events || !events[type2])
          return;
        var handlers = events[type2];
        var i = handlers.length;
        var handler2;
        while (i--) {
          handler2 = handlers[i];
          if ((!selector || handler2.selector == selector) && handler2.handler == fn) {
            handlers.splice(i, 1);
            if (handler2.selector) {
              handlers.delegateCount--;
            }
          }
        }
      },
      Event: Class({
        className: "Event",
        initialize: function Event2(e) {
          this.origEvent = e;
        },
        isDefaultPrevented: retFalse,
        isPropagationStopped: retFalse,
        isImmediatePropagationStopped: retFalse,
        preventDefault: function() {
          var e = this.origEvent;
          this.isDefaultPrevented = retTrue;
          if (e && e.preventDefault)
            e.preventDefault();
        },
        stopPropagation: function() {
          var e = this.origEvent;
          this.isPropagationStopped = retTrue;
          if (e && e.stopPropagation)
            e.stopPropagation();
        },
        stopImmediatePropagation: function() {
          var e = this.origEvent;
          this.isImmediatePropagationStopped = retTrue;
          if (e && e.stopImmediatePropagation)
            e.stopImmediatePropagation();
          this.stopPropagation();
        }
      })
    };
    module2.exports = exports;
  }
});

// node_modules/licia/$event.js
var require_event = __commonJS({
  "node_modules/licia/$event.js"(exports, module2) {
    var delegate = require_delegate();
    var isUndef4 = require_isUndef();
    var $safeEls = require_safeEls();
    var each12 = require_each();
    exports = {
      on: eventFactory("add"),
      off: eventFactory("remove")
    };
    function eventFactory(type2) {
      return function(nodes, event, selector, handler2) {
        nodes = $safeEls(nodes);
        if (isUndef4(handler2)) {
          handler2 = selector;
          selector = void 0;
        }
        each12(nodes, function(node) {
          delegate[type2](node, event, selector, handler2);
        });
      };
    }
    module2.exports = exports;
  }
});

// node_modules/licia/some.js
var require_some = __commonJS({
  "node_modules/licia/some.js"(exports, module2) {
    var safeCb = require_safeCb();
    var isArrLike = require_isArrLike();
    var keys5 = require_keys();
    exports = function(obj, predicate, ctx) {
      predicate = safeCb(predicate, ctx);
      var _keys = !isArrLike(obj) && keys5(obj);
      var len = (_keys || obj).length;
      for (var i = 0; i < len; i++) {
        var key = _keys ? _keys[i] : i;
        if (predicate(obj[key], key, obj))
          return true;
      }
      return false;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/$class.js
var require_class = __commonJS({
  "node_modules/licia/$class.js"(exports, module2) {
    var toArr4 = require_toArr();
    var some2 = require_some();
    var $safeEls = require_safeEls();
    var isStr6 = require_isStr();
    var each12 = require_each();
    exports = {
      add: function(els, name) {
        els = $safeEls(els);
        var names = safeName2(name);
        each12(els, function(el) {
          var classList = [];
          each12(names, function(name2) {
            if (!exports.has(el, name2))
              classList.push(name2);
          });
          if (classList.length !== 0) {
            el.className += (el.className ? " " : "") + classList.join(" ");
          }
        });
      },
      has: function(els, name) {
        els = $safeEls(els);
        var regName = new RegExp("(^|\\s)" + name + "(\\s|$)");
        return some2(els, function(el) {
          return regName.test(el.className);
        });
      },
      toggle: function(els, name) {
        els = $safeEls(els);
        each12(els, function(el) {
          if (!exports.has(el, name))
            return exports.add(el, name);
          exports.remove(el, name);
        });
      },
      remove: function(els, name) {
        els = $safeEls(els);
        var names = safeName2(name);
        each12(els, function(el) {
          each12(names, function(name2) {
            el.classList.remove(name2);
          });
        });
      }
    };
    function safeName2(name) {
      return isStr6(name) ? name.split(/\s+/) : toArr4(name);
    }
    module2.exports = exports;
  }
});

// node_modules/licia/$insert.js
var require_insert = __commonJS({
  "node_modules/licia/$insert.js"(exports, module2) {
    var each12 = require_each();
    var $safeEls = require_safeEls();
    var isStr6 = require_isStr();
    exports = {
      before: insertFactory("beforebegin"),
      after: insertFactory("afterend"),
      append: insertFactory("beforeend"),
      prepend: insertFactory("afterbegin")
    };
    function insertFactory(type2) {
      return function(nodes, val) {
        nodes = $safeEls(nodes);
        each12(nodes, function(node) {
          if (isStr6(val)) {
            node.insertAdjacentHTML(type2, val);
          } else {
            var parentNode = node.parentNode;
            switch (type2) {
              case "beforebegin":
                if (parentNode) {
                  parentNode.insertBefore(val, node);
                }
                break;
              case "afterend":
                if (parentNode) {
                  parentNode.insertBefore(val, node.nextSibling);
                }
                break;
              case "beforeend":
                node.appendChild(val);
                break;
              case "afterbegin":
                node.prepend(val);
                break;
            }
          }
        });
      };
    }
    module2.exports = exports;
  }
});

// node_modules/licia/$.js
var require__ = __commonJS({
  "node_modules/licia/$.js"(exports, module2) {
    var Select = require_Select();
    var $offset = require_offset();
    var $show = require_show();
    var $css = require_css();
    var $attr = require_attr();
    var $property = require_property2();
    var last3 = require_last();
    var $remove = require_remove();
    var $data = require_data();
    var $event = require_event();
    var $class = require_class();
    var $insert = require_insert();
    var isUndef4 = require_isUndef();
    var isStr6 = require_isStr();
    exports = function(selector) {
      return new Select(selector);
    };
    Select.methods({
      offset: function() {
        return $offset(this);
      },
      hide: function() {
        return this.css("display", "none");
      },
      show: function() {
        $show(this);
        return this;
      },
      first: function() {
        return exports(this[0]);
      },
      last: function() {
        return exports(last3(this));
      },
      get: function(idx) {
        return this[idx];
      },
      eq: function(idx) {
        return exports(this[idx]);
      },
      on: function(event, selector, handler2) {
        $event.on(this, event, selector, handler2);
        return this;
      },
      off: function(event, selector, handler2) {
        $event.off(this, event, selector, handler2);
        return this;
      },
      html: function(val) {
        var result = $property.html(this, val);
        if (isUndef4(val))
          return result;
        return this;
      },
      text: function(val) {
        var result = $property.text(this, val);
        if (isUndef4(val))
          return result;
        return this;
      },
      val: function(val) {
        var result = $property.val(this, val);
        if (isUndef4(val))
          return result;
        return this;
      },
      css: function(name, val) {
        var result = $css(this, name, val);
        if (isGetter(name, val))
          return result;
        return this;
      },
      attr: function(name, val) {
        var result = $attr(this, name, val);
        if (isGetter(name, val))
          return result;
        return this;
      },
      data: function(name, val) {
        var result = $data(this, name, val);
        if (isGetter(name, val))
          return result;
        return this;
      },
      rmAttr: function(name) {
        $attr.remove(this, name);
        return this;
      },
      remove: function() {
        $remove(this);
        return this;
      },
      addClass: function(name) {
        $class.add(this, name);
        return this;
      },
      rmClass: function(name) {
        $class.remove(this, name);
        return this;
      },
      toggleClass: function(name) {
        $class.toggle(this, name);
        return this;
      },
      hasClass: function(name) {
        return $class.has(this, name);
      },
      parent: function() {
        return exports(this[0].parentNode);
      },
      append: function(val) {
        $insert.append(this, val);
        return this;
      },
      prepend: function(val) {
        $insert.prepend(this, val);
        return this;
      },
      before: function(val) {
        $insert.before(this, val);
        return this;
      },
      after: function(val) {
        $insert.after(this, val);
        return this;
      }
    });
    var isGetter = function(name, val) {
      return isUndef4(val) && isStr6(name);
    };
    module2.exports = exports;
  }
});

// node_modules/licia/flatten.js
var require_flatten = __commonJS({
  "node_modules/licia/flatten.js"(exports, module2) {
    var isArr4 = require_isArr();
    exports = function(arr) {
      return flat(arr, []);
    };
    function flat(arr, res) {
      var len = arr.length, i = -1, cur;
      while (len--) {
        cur = arr[++i];
        isArr4(cur) ? flat(cur, res) : res.push(cur);
      }
      return res;
    }
    module2.exports = exports;
  }
});

// node_modules/licia/difference.js
var require_difference = __commonJS({
  "node_modules/licia/difference.js"(exports, module2) {
    var restArgs = require_restArgs();
    var flatten = require_flatten();
    var filter3 = require_filter();
    var contain10 = require_contain();
    exports = restArgs(function(arr, args) {
      args = flatten(args);
      return filter3(arr, function(val) {
        return !contain10(args, val);
      });
    });
    module2.exports = exports;
  }
});

// node_modules/licia/chunk.js
var require_chunk = __commonJS({
  "node_modules/licia/chunk.js"(exports, module2) {
    exports = function(arr, size) {
      var ret = [];
      size = size || 1;
      for (var i = 0, len = Math.ceil(arr.length / size); i < len; i++) {
        var start = i * size;
        var end = start + size;
        ret.push(arr.slice(start, end));
      }
      return ret;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/naturalSort.js
var require_naturalSort = __commonJS({
  "node_modules/licia/naturalSort.js"(exports, module2) {
    var startWith7 = require_startWith();
    var root5 = require_root();
    var toStr6 = require_toStr();
    exports = function(arr) {
      return arr.sort(naturalOrderComparator);
    };
    exports.comparator = naturalOrderComparator;
    function naturalOrderComparator(a, b) {
      a = toStr6(a);
      b = toStr6(b);
      if (startWith7(a, "_") && !startWith7(b, "_")) {
        return 1;
      }
      if (startWith7(b, "_") && !startWith7(a, "_")) {
        return -1;
      }
      var chunk3 = /^\d+|^\D+/;
      var chunka, chunkb, anum, bnum;
      while (true) {
        if (a) {
          if (!b) {
            return 1;
          }
        } else {
          if (b) {
            return -1;
          }
          return 0;
        }
        chunka = a.match(chunk3)[0];
        chunkb = b.match(chunk3)[0];
        anum = !root5.isNaN(chunka);
        bnum = !root5.isNaN(chunkb);
        if (anum && !bnum) {
          return -1;
        }
        if (bnum && !anum) {
          return 1;
        }
        if (anum && bnum) {
          var diff = chunka - chunkb;
          if (diff) {
            return diff;
          }
          if (chunka.length !== chunkb.length) {
            if (!+chunka && !+chunkb) {
              return chunka.length - chunkb.length;
            }
            return chunkb.length - chunka.length;
          }
        } else if (chunka !== chunkb) {
          return chunka < chunkb ? -1 : 1;
        }
        a = a.substring(chunka.length);
        b = b.substring(chunkb.length);
      }
    }
    module2.exports = exports;
  }
});

// node_modules/licia/uniqId.js
var require_uniqId = __commonJS({
  "node_modules/licia/uniqId.js"(exports, module2) {
    var idCounter = 0;
    exports = function(prefix) {
      var id2 = ++idCounter + "";
      return prefix ? prefix + id2 : id2;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/slice.js
var require_slice = __commonJS({
  "node_modules/licia/slice.js"(exports, module2) {
    exports = function(arr, start, end) {
      var len = arr.length;
      if (start == null) {
        start = 0;
      } else if (start < 0) {
        start = Math.max(len + start, 0);
      } else {
        start = Math.min(start, len);
      }
      if (end == null) {
        end = len;
      } else if (end < 0) {
        end = Math.max(len + end, 0);
      } else {
        end = Math.min(end, len);
      }
      var ret = [];
      while (start < end)
        ret.push(arr[start++]);
      return ret;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/partial.js
var require_partial = __commonJS({
  "node_modules/licia/partial.js"(exports, module2) {
    var restArgs = require_restArgs();
    var toArr4 = require_toArr();
    exports = restArgs(function(fn, partials) {
      return function() {
        var args = [];
        args = args.concat(partials);
        args = args.concat(toArr4(arguments));
        return fn.apply(this, args);
      };
    });
    module2.exports = exports;
  }
});

// node_modules/licia/before.js
var require_before = __commonJS({
  "node_modules/licia/before.js"(exports, module2) {
    exports = function(n, fn) {
      var memo;
      return function() {
        if (--n > 0)
          memo = fn.apply(this, arguments);
        if (n <= 1)
          fn = null;
        return memo;
      };
    };
    module2.exports = exports;
  }
});

// node_modules/licia/once.js
var require_once = __commonJS({
  "node_modules/licia/once.js"(exports, module2) {
    var partial = require_partial();
    var before = require_before();
    exports = partial(before, 2);
    module2.exports = exports;
  }
});

// node_modules/licia/clone.js
var require_clone = __commonJS({
  "node_modules/licia/clone.js"(exports, module2) {
    var isObj4 = require_isObj();
    var isArr4 = require_isArr();
    var extend7 = require_extend();
    exports = function(obj) {
      if (!isObj4(obj))
        return obj;
      return isArr4(obj) ? obj.slice() : extend7({}, obj);
    };
    module2.exports = exports;
  }
});

// node_modules/licia/Emitter.js
var require_Emitter = __commonJS({
  "node_modules/licia/Emitter.js"(exports, module2) {
    var Class = require_Class();
    var has = require_has();
    var each12 = require_each();
    var slice = require_slice();
    var once = require_once();
    var clone3 = require_clone();
    exports = Class(
      {
        initialize: function Emitter6() {
          this._events = this._events || {};
        },
        on: function(event, listener) {
          this._events[event] = this._events[event] || [];
          this._events[event].push(listener);
          return this;
        },
        off: function(event, listener) {
          var events = this._events;
          if (!has(events, event))
            return;
          var idx = events[event].indexOf(listener);
          if (idx > -1) {
            events[event].splice(idx, 1);
          }
          return this;
        },
        once: function(event, listener) {
          this.on(event, once(listener));
          return this;
        },
        emit: function(event) {
          var _this = this;
          if (!has(this._events, event))
            return;
          var args = slice(arguments, 1);
          var events = clone3(this._events[event]);
          each12(
            events,
            function(val) {
              return val.apply(_this, args);
            },
            this
          );
          return this;
        },
        removeAllListeners: function(event) {
          if (!event) {
            this._events = {};
          } else {
            delete this._events[event];
          }
          return this;
        }
      },
      {
        mixin: function(obj) {
          each12(["on", "off", "once", "emit", "removeAllListeners"], function(val) {
            obj[val] = exports.prototype[val];
          });
          obj._events = obj._events || {};
        }
      }
    );
    module2.exports = exports;
  }
});

// node_modules/licia/remove.js
var require_remove2 = __commonJS({
  "node_modules/licia/remove.js"(exports, module2) {
    var safeCb = require_safeCb();
    exports = function(arr, iterator, ctx) {
      var ret = [];
      iterator = safeCb(iterator, ctx);
      var i = -1;
      var len = arr.length;
      while (++i < len) {
        var realIdx = i - ret.length;
        var val = arr[realIdx];
        if (iterator(val, i, arr)) {
          ret.push(val);
          arr.splice(realIdx, 1);
        }
      }
      return ret;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/MediaQuery.js
var require_MediaQuery = __commonJS({
  "node_modules/licia/MediaQuery.js"(exports, module2) {
    var Emitter6 = require_Emitter();
    exports = Emitter6.extend({
      className: "MediaQuery",
      initialize: function(query) {
        var _this = this;
        this.callSuper(Emitter6, "initialize");
        this._listener = function() {
          _this.emit(_this.isMatch() ? "match" : "unmatch");
        };
        this.setQuery(query);
      },
      setQuery: function(query) {
        if (this._mql) {
          this._mql.removeListener(this._listener);
        }
        this._mql = window.matchMedia(query);
        this._mql.addListener(this._listener);
      },
      isMatch: function() {
        return this._mql.matches;
      }
    });
    module2.exports = exports;
  }
});

// node_modules/licia/theme.js
var require_theme = __commonJS({
  "node_modules/licia/theme.js"(exports, module2) {
    var Emitter6 = require_Emitter();
    var MediaQuery = require_MediaQuery();
    var m = new MediaQuery("(prefers-color-scheme: dark)");
    exports = {
      get: function() {
        return m.isMatch() ? "dark" : "light";
      }
    };
    Emitter6.mixin(exports);
    m.on("match", function() {
      return exports.emit("change", "dark");
    });
    m.on("unmatch", function() {
      return exports.emit("change", "light");
    });
    module2.exports = exports;
  }
});

// node_modules/licia/min.js
var require_min = __commonJS({
  "node_modules/licia/min.js"(exports, module2) {
    exports = function() {
      var arr = arguments;
      var ret = arr[0];
      for (var i = 1, len = arr.length; i < len; i++) {
        if (arr[i] < ret)
          ret = arr[i];
      }
      return ret;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/stripIndent.js
var require_stripIndent = __commonJS({
  "node_modules/licia/stripIndent.js"(exports, module2) {
    var isStr6 = require_isStr();
    var toArr4 = require_toArr();
    var min2 = require_min();
    var map8 = require_map();
    var trim10 = require_trim();
    exports = function(literals) {
      if (isStr6(literals))
        literals = toArr4(literals);
      var str = "";
      for (var _len = arguments.length, placeholders = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        placeholders[_key - 1] = arguments[_key];
      }
      for (var i = 0, len = literals.length; i < len; i++) {
        str += literals[i];
        if (placeholders[i])
          str += placeholders[i];
      }
      var lines = str.split("\n");
      var indentLens = [];
      for (var _i = 0, _len2 = lines.length; _i < _len2; _i++) {
        var line = lines[_i];
        var _indent = line.match(regStartSpaces);
        if (_indent) {
          indentLens.push(_indent[1].length);
        }
      }
      var indent = indentLens.length > 0 ? min2.apply(null, indentLens) : 0;
      return trim10(
        map8(lines, function(line2) {
          return line2[0] === " " ? line2.slice(indent) : line2;
        }).join("\n")
      );
    };
    var regStartSpaces = /^(\s+)\S+/;
    module2.exports = exports;
  }
});

// node_modules/licia/isEl.js
var require_isEl = __commonJS({
  "node_modules/licia/isEl.js"(exports, module2) {
    exports = function(val) {
      return !!(val && val.nodeType === 1);
    };
    module2.exports = exports;
  }
});

// node_modules/licia/h.js
var require_h = __commonJS({
  "node_modules/licia/h.js"(exports, module2) {
    var isEl3 = require_isEl();
    var isStr6 = require_isStr();
    var startWith7 = require_startWith();
    var $class = require_class();
    var $css = require_css();
    var each12 = require_each();
    var isFn4 = require_isFn();
    exports = function(tag, attrs) {
      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }
      if (isEl3(attrs) || isStr6(attrs)) {
        children.unshift(attrs);
        attrs = null;
      }
      if (!attrs)
        attrs = {};
      var _parseTag = parseTag(tag), tagName = _parseTag.tagName, id2 = _parseTag.id, classes = _parseTag.classes;
      var el = document.createElement(tagName);
      if (id2)
        el.setAttribute("id", id2);
      $class.add(el, classes);
      each12(children, function(child) {
        if (isStr6(child)) {
          el.appendChild(document.createTextNode(child));
        } else if (isEl3(child)) {
          el.appendChild(child);
        }
      });
      each12(attrs, function(val, key) {
        if (isStr6(val)) {
          el.setAttribute(key, val);
        } else if (isFn4(val) && startWith7(key, "on")) {
          el.addEventListener(key.slice(2), val, false);
        } else if (key === "style") {
          $css(el, val);
        }
      });
      return el;
    };
    function parseTag(tag) {
      var tagName = "div";
      var id2 = "";
      var classes = [];
      var words = [];
      var word = "";
      for (var i = 0, len = tag.length; i < len; i++) {
        var c2 = tag[i];
        if (c2 === "#" || c2 === ".") {
          words.push(word);
          word = c2;
        } else {
          word += c2;
        }
      }
      words.push(word);
      for (var _i = 0, _len2 = words.length; _i < _len2; _i++) {
        word = words[_i];
        if (!word)
          continue;
        if (startWith7(word, "#")) {
          id2 = word.slice(1);
        } else if (startWith7(word, ".")) {
          classes.push(word.slice(1));
        } else {
          tagName = word;
        }
      }
      return {
        tagName,
        id: id2,
        classes
      };
    }
    module2.exports = exports;
  }
});

// node_modules/licia/SingleEmitter.js
var require_SingleEmitter = __commonJS({
  "node_modules/licia/SingleEmitter.js"(exports, module2) {
    var Class = require_Class();
    var clone3 = require_clone();
    var each12 = require_each();
    var toArr4 = require_toArr();
    exports = Class(
      {
        initialize: function SingleEmitter() {
          this._listeners = [];
        },
        addListener: function(listener) {
          this._listeners.push(listener);
        },
        rmListener: function(listener) {
          var idx = this._listeners.indexOf(listener);
          if (idx > -1) {
            this._listeners.splice(idx, 1);
          }
        },
        rmAllListeners: function() {
          this._listeners = [];
        },
        emit: function() {
          var _this = this;
          var args = toArr4(arguments);
          var listeners = clone3(this._listeners);
          each12(
            listeners,
            function(listener) {
              return listener.apply(_this, args);
            },
            this
          );
        }
      },
      {
        mixin: function(obj) {
          each12(
            ["addListener", "rmListener", "emit", "rmAllListeners"],
            function(val) {
              obj[val] = exports.prototype[val];
            }
          );
          obj._listeners = obj._listeners || [];
        }
      }
    );
    module2.exports = exports;
  }
});

// node_modules/licia/ResizeSensor.js
var require_ResizeSensor = __commonJS({
  "node_modules/licia/ResizeSensor.js"(exports, module2) {
    var SingleEmitter = require_SingleEmitter();
    var h4 = require_h();
    var $event = require_event();
    var $css = require_css();
    var contain10 = require_contain();
    var extend7 = require_extend();
    var root5 = require_root();
    if (root5.ResizeObserver && true) {
      exports = SingleEmitter.extend({
        initialize: function ResizeSensor4(el) {
          var _this = this;
          if (el._resizeSensor) {
            return el._resizeSensor;
          }
          this.callSuper(SingleEmitter, "initialize");
          var resizeObserver = new root5.ResizeObserver(function() {
            return _this.emit();
          });
          resizeObserver.observe(el);
          el._resizeSensor = this;
          this._resizeObserver = resizeObserver;
          this._el = el;
        },
        destroy: function() {
          var el = this._el;
          if (!el._resizeSensor) {
            return;
          }
          this.rmAllListeners();
          delete el._resizeSensor;
          this._resizeObserver.unobserve(el);
        }
      });
    } else {
      exports = SingleEmitter.extend({
        initialize: function ResizeSensor4(el) {
          if (el._resizeSensor) {
            return el._resizeSensor;
          }
          this.callSuper(SingleEmitter, "initialize");
          this._el = el;
          el._resizeSensor = this;
          if (!contain10(
            ["absolute", "relative", "fixed", "sticky"],
            $css(el, "position")
          )) {
            $css(el, "position", "relative");
          }
          this._appendResizeSensor();
          this._bindEvent();
        },
        destroy: function() {
          var el = this._el;
          if (!el._resizeSensor) {
            return;
          }
          this.rmAllListeners();
          delete el._resizeSensor;
          el.removeChild(this._resizeSensorEl);
        },
        _appendResizeSensor: function() {
          var el = this._el;
          var style = {
            pointerEvents: "none",
            position: "absolute",
            left: "0px",
            top: "0px",
            right: "0px",
            bottom: "0px",
            overflow: "hidden",
            zIndex: "-1",
            visibility: "hidden",
            maxWidth: "100%"
          };
          var styleChild = {
            position: "absolute",
            left: "0px",
            top: "0px",
            transition: "0s"
          };
          var expandChildEl = h4("div", {
            style: styleChild
          });
          var expandEl = h4(
            "div.resize-sensor-expand",
            {
              style
            },
            expandChildEl
          );
          var shrinkEl = h4(
            "div.resize-sensor-shrink",
            {
              style
            },
            h4("div", {
              style: extend7(
                {
                  width: "200%",
                  height: "200%"
                },
                styleChild
              )
            })
          );
          var resizeSensorEl = h4(
            "div.resize-sensor",
            {
              dir: "ltr",
              style
            },
            expandEl,
            shrinkEl
          );
          this._expandEl = expandEl;
          this._expandChildEl = expandChildEl;
          this._shrinkEl = shrinkEl;
          this._resizeSensorEl = resizeSensorEl;
          el.appendChild(resizeSensorEl);
          this._resetExpandShrink();
        },
        _bindEvent: function() {
          var _this2 = this;
          $event.on(this._expandEl, "scroll", function() {
            return _this2._onScroll();
          });
          $event.on(this._shrinkEl, "scroll", function() {
            return _this2._onScroll();
          });
        },
        _onScroll: function() {
          this.emit();
          this._resetExpandShrink();
        },
        _resetExpandShrink: function() {
          var el = this._el;
          var width = el.offsetWidth;
          var height = el.offsetHeight;
          $css(this._expandChildEl, {
            width: width + 10,
            height: height + 10
          });
          extend7(this._expandEl, {
            scrollLeft: width + 10,
            scrollTop: height + 10
          });
          extend7(this._shrinkEl, {
            scrollLeft: width + 10,
            scrollTop: height + 10
          });
        }
      });
    }
    module2.exports = exports;
  }
});

// node_modules/licia/debounce.js
var require_debounce = __commonJS({
  "node_modules/licia/debounce.js"(exports, module2) {
    exports = function(fn, wait, immediate) {
      var timeout;
      return function() {
        var ctx = this;
        var args = arguments;
        var throttler = function() {
          timeout = null;
          fn.apply(ctx, args);
        };
        if (!immediate)
          clearTimeout(timeout);
        if (!immediate || !timeout)
          timeout = setTimeout(throttler, wait);
      };
    };
    module2.exports = exports;
  }
});

// node_modules/licia/throttle.js
var require_throttle = __commonJS({
  "node_modules/licia/throttle.js"(exports, module2) {
    var debounce3 = require_debounce();
    exports = function(fn, wait) {
      return debounce3(fn, wait, true);
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isNull.js
var require_isNull = __commonJS({
  "node_modules/licia/isNull.js"(exports, module2) {
    exports = function(val) {
      return val === null;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isRegExp.js
var require_isRegExp = __commonJS({
  "node_modules/licia/isRegExp.js"(exports, module2) {
    var objToStr = require_objToStr();
    exports = function(val) {
      return objToStr(val) === "[object RegExp]";
    };
    module2.exports = exports;
  }
});

// node_modules/licia/clamp.js
var require_clamp = __commonJS({
  "node_modules/licia/clamp.js"(exports, module2) {
    var isUndef4 = require_isUndef();
    exports = function(n, lower, upper) {
      if (isUndef4(upper)) {
        upper = lower;
        lower = void 0;
      }
      if (!isUndef4(lower) && n < lower)
        return lower;
      if (n > upper)
        return upper;
      return n;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/max.js
var require_max = __commonJS({
  "node_modules/licia/max.js"(exports, module2) {
    exports = function() {
      var arr = arguments;
      var ret = arr[0];
      for (var i = 1, len = arr.length; i < len; i++) {
        if (arr[i] > ret)
          ret = arr[i];
      }
      return ret;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isInt.js
var require_isInt = __commonJS({
  "node_modules/licia/isInt.js"(exports, module2) {
    var isNum8 = require_isNum();
    exports = function(val) {
      return isNum8(val) && val % 1 === 0;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isOdd.js
var require_isOdd = __commonJS({
  "node_modules/licia/isOdd.js"(exports, module2) {
    var isInt = require_isInt();
    exports = function(num) {
      if (!isInt(num))
        return false;
      return num % 2 !== 0;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/now.js
var require_now = __commonJS({
  "node_modules/licia/now.js"(exports, module2) {
    if (Date.now && true) {
      exports = Date.now;
    } else {
      exports = function() {
        return (/* @__PURE__ */ new Date()).getTime();
      };
    }
    module2.exports = exports;
  }
});

// node_modules/licia/pointerEvent.js
var require_pointerEvent = __commonJS({
  "node_modules/licia/pointerEvent.js"(exports, module2) {
    var root5 = require_root();
    var touchEvents = {
      down: "touchstart",
      move: "touchmove",
      up: "touchend"
    };
    var mouseEvents = {
      down: "mousedown",
      move: "mousemove",
      up: "mouseup"
    };
    var pointerEvents = {
      down: "pointerdown",
      move: "pointermove",
      up: "pointerup"
    };
    var hasPointerSupport = "PointerEvent" in root5;
    var hasTouchSupport5 = "ontouchstart" in root5;
    exports = function(type2) {
      if (hasPointerSupport) {
        return pointerEvents[type2];
      }
      return hasTouchSupport5 ? touchEvents[type2] : mouseEvents[type2];
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isShadowRoot.js
var require_isShadowRoot = __commonJS({
  "node_modules/licia/isShadowRoot.js"(exports, module2) {
    exports = function(val) {
      if (window.ShadowRoot) {
        return val instanceof ShadowRoot;
      }
      return false;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/MutationObserver.js
var require_MutationObserver = __commonJS({
  "node_modules/licia/MutationObserver.js"(exports, module2) {
    var Class = require_Class();
    exports = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    if (!exports) {
      exports = Class({
        initialize: function MutationObserver3() {
        },
        observe: function() {
        },
        disconnect: function() {
        },
        takeRecords: function() {
        }
      });
    }
    module2.exports = exports;
  }
});

// node_modules/licia/highlight.js
var require_highlight = __commonJS({
  "node_modules/licia/highlight.js"(exports, module2) {
    var each12 = require_each();
    var defaults7 = require_defaults();
    exports = function(str) {
      var lang = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "js";
      var style = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      defaults7(style, defStyle);
      str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      lang = language[lang];
      var subLangSi = 0;
      var subLangs = [];
      each12(lang, function(val) {
        if (!val.language)
          return;
        str = str.replace(val.re, function($1, $22) {
          if (!$22) {
            return $1;
          }
          subLangs[subLangSi++] = exports($22, val.language, style);
          return $1.replace($22, "___subtmpl" + (subLangSi - 1) + "___");
        });
      });
      each12(lang, function(val, key) {
        if (language[val.language])
          return;
        str = str.replace(val.re, "___" + key + "___$1___end" + key + "___");
      });
      var levels = [];
      str = str.replace(/___(?!subtmpl)\w+?___/g, function($0) {
        var end = $0.substr(3, 3) === "end", tag = (!end ? $0.substr(3) : $0.substr(6)).replace(/_/g, ""), lastTag = levels.length > 0 ? levels[levels.length - 1] : null;
        if (!end && (lastTag == null || tag == lastTag || lastTag != null && lang[lastTag] && lang[lastTag].embed != void 0 && lang[lastTag].embed.indexOf(tag) > -1)) {
          levels.push(tag);
          return $0;
        } else if (end && tag == lastTag) {
          levels.pop();
          return $0;
        }
        return "";
      });
      each12(lang, function(val, key) {
        var s = style[val.style] ? ' style="'.concat(style[val.style], '"') : "";
        str = str.replace(new RegExp("___end" + key + "___", "g"), "</span>").replace(
          new RegExp("___" + key + "___", "g"),
          '<span class="'.concat(val.style, '"').concat(s, ">")
        );
      });
      each12(lang, function(val) {
        if (!val.language)
          return;
        str = str.replace(/___subtmpl\d+___/g, function($tmpl) {
          var i = parseInt($tmpl.replace(/___subtmpl(\d+)___/, "$1"), 10);
          return subLangs[i];
        });
      });
      return str;
    };
    var defStyle = {
      comment: "color:#63a35c;",
      string: "color:#183691;",
      number: "color:#0086b3;",
      keyword: "color:#a71d5d;",
      operator: "color:#994500;"
    };
    var language = {};
    language.js = {
      comment: {
        re: /(\/\/.*|\/\*([\s\S]*?)\*\/)/g,
        style: "comment"
      },
      string: {
        re: /(('.*?')|(".*?"))/g,
        style: "string"
      },
      numbers: {
        re: /(-?(\d+|\d+\.\d+|\.\d+))/g,
        style: "number"
      },
      keywords: {
        re: /(?:\b)(function|for|foreach|while|if|else|elseif|switch|break|as|return|this|class|self|default|var|const|let|false|true|null|undefined)(?:\b)/gi,
        style: "keyword"
      },
      operator: {
        re: /(\+|-|\/|\*|%|=|&lt;|&gt;|\||\?|\.)/g,
        style: "operator"
      }
    };
    language.html = {
      comment: {
        re: /(&lt;!--([\s\S]*?)--&gt;)/g,
        style: "comment"
      },
      tag: {
        re: /(&lt;\/?\w(.|\n)*?\/?&gt;)/g,
        style: "keyword",
        embed: ["string"]
      },
      string: language.js.string,
      css: {
        re: /(?:&lt;style.*?&gt;)([\s\S]*)?(?:&lt;\/style&gt;)/gi,
        language: "css"
      },
      script: {
        re: /(?:&lt;script.*?&gt;)([\s\S]*?)(?:&lt;\/script&gt;)/gi,
        language: "js"
      }
    };
    language.css = {
      comment: language.js.comment,
      string: language.js.string,
      numbers: {
        re: /((-?(\d+|\d+\.\d+|\.\d+)(%|px|em|pt|in)?)|#[0-9a-fA-F]{3}[0-9a-fA-F]{3})/g,
        style: "number"
      },
      keywords: {
        re: /(@\w+|:?:\w+|[a-z-]+:)/g,
        style: "keyword"
      }
    };
    module2.exports = exports;
  }
});

// node_modules/licia/every.js
var require_every = __commonJS({
  "node_modules/licia/every.js"(exports, module2) {
    var safeCb = require_safeCb();
    var isArrLike = require_isArrLike();
    var keys5 = require_keys();
    exports = function(obj, predicate, ctx) {
      predicate = safeCb(predicate, ctx);
      var _keys = !isArrLike(obj) && keys5(obj);
      var len = (_keys || obj).length;
      for (var i = 0; i < len; i++) {
        var curKey = _keys ? _keys[i] : i;
        if (!predicate(obj[curKey], curKey, obj))
          return false;
      }
      return true;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/invert.js
var require_invert = __commonJS({
  "node_modules/licia/invert.js"(exports, module2) {
    var each12 = require_each();
    exports = function(obj) {
      var ret = {};
      each12(obj, function(val, key) {
        ret[val] = key;
      });
      return ret;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/keyCode.js
var require_keyCode = __commonJS({
  "node_modules/licia/keyCode.js"(exports, module2) {
    var isStr6 = require_isStr();
    var invert = require_invert();
    exports = function(val) {
      if (isStr6(val))
        return codeMap[val];
      return nameMap[val];
    };
    var codeMap = {
      backspace: 8,
      tab: 9,
      enter: 13,
      shift: 16,
      ctrl: 17,
      alt: 18,
      "pause/break": 19,
      "caps lock": 20,
      esc: 27,
      space: 32,
      "page up": 33,
      "page down": 34,
      end: 35,
      home: 36,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      insert: 45,
      delete: 46,
      windows: 91,
      "right windows": 92,
      "windows menu": 93,
      "numpad *": 106,
      "numpad +": 107,
      "numpad -": 109,
      "numpad .": 110,
      "numpad /": 111,
      "num lock": 144,
      "scroll lock": 145,
      ";": 186,
      "=": 187,
      ",": 188,
      "-": 189,
      ".": 190,
      "/": 191,
      "`": 192,
      "[": 219,
      "\\": 220,
      "]": 221,
      "'": 222
    };
    for (i = 97; i < 123; i++)
      codeMap[String.fromCharCode(i)] = i - 32;
    var i;
    for (_i = 48; _i < 58; _i++)
      codeMap[_i - 48] = _i;
    var _i;
    for (_i2 = 1; _i2 < 13; _i2++)
      codeMap["f" + _i2] = _i2 + 111;
    var _i2;
    for (_i3 = 0; _i3 < 10; _i3++)
      codeMap["numpad " + _i3] = _i3 + 96;
    var _i3;
    var nameMap = invert(codeMap);
    module2.exports = exports;
  }
});

// node_modules/licia/hotkey.js
var require_hotkey = __commonJS({
  "node_modules/licia/hotkey.js"(exports, module2) {
    var Emitter6 = require_Emitter();
    var keyCode = require_keyCode();
    var each12 = require_each();
    var unique2 = require_unique();
    var trim10 = require_trim();
    var map8 = require_map();
    var isFn4 = require_isFn();
    exports = {
      on: function(keys5, options, listener) {
        if (isFn4(options)) {
          listener = options;
          options = {};
        }
        keys5 = keys5.split(regComma);
        each12(keys5, function(key) {
          key = normalizeKey(key);
          if (options.element) {
            var _options = options, element = _options.element;
            var hotkeyListeners = element._hotkeyListeners || {};
            element._hotkeyListeners = hotkeyListeners;
            hotkeyListeners[key] = hotkeyListeners[key] || [];
            var hotkeyListener = function(e) {
              if (key === getKeysFromEvent(e)) {
                listener(e);
              }
            };
            hotkeyListeners[key].push({
              listener: hotkeyListener,
              origin: listener
            });
            element.addEventListener("keydown", hotkeyListener);
          } else {
            emitter.on(key, listener);
          }
        });
      },
      off: function(keys5, options, listener) {
        if (isFn4(options)) {
          listener = options;
          options = {};
        }
        keys5 = keys5.split(regComma);
        each12(keys5, function(key) {
          key = normalizeKey(key);
          if (options.element) {
            var _options2 = options, element = _options2.element;
            var hotkeyListeners = element._hotkeyListeners;
            if (hotkeyListeners && hotkeyListeners[key]) {
              var listeners = hotkeyListeners[key];
              var hotkeyListener;
              for (var i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i].origin === listener) {
                  hotkeyListener = listeners[i].listener;
                  listeners.splice(i, 1);
                }
              }
              if (hotkeyListener) {
                element.removeEventListener("keydown", hotkeyListener);
              }
            }
          } else {
            emitter.off(key, listener);
          }
        });
      }
    };
    var emitter = new Emitter6();
    document.addEventListener("keydown", function(e) {
      emitter.emit(getKeysFromEvent(e), e);
    });
    function getKeysFromEvent(e) {
      var keys5 = [];
      if (e.ctrlKey)
        keys5.push("ctrl");
      if (e.shiftKey)
        keys5.push("shift");
      keys5.push(keyCode(e.keyCode));
      return normalizeKey(keys5.join("+"));
    }
    function normalizeKey(keyStr) {
      var keys5 = keyStr.split(regPlus);
      keys5 = map8(keys5, function(key) {
        return trim10(key);
      });
      keys5 = unique2(keys5);
      keys5.sort();
      return keys5.join("+");
    }
    var regComma = /,/g;
    var regPlus = /\+/g;
    module2.exports = exports;
  }
});

// node_modules/licia/isErr.js
var require_isErr = __commonJS({
  "node_modules/licia/isErr.js"(exports, module2) {
    var objToStr = require_objToStr();
    exports = function(val) {
      switch (objToStr(val)) {
        case "[object Error]":
        case "[object DOMException]":
          return true;
        default:
          return val instanceof Error;
      }
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isPrimitive.js
var require_isPrimitive = __commonJS({
  "node_modules/licia/isPrimitive.js"(exports, module2) {
    exports = function(val) {
      var type2 = typeof val;
      return val == null || type2 !== "function" && type2 !== "object";
    };
    module2.exports = exports;
  }
});

// node_modules/licia/toInt.js
var require_toInt = __commonJS({
  "node_modules/licia/toInt.js"(exports, module2) {
    var toNum8 = require_toNum();
    exports = function(val) {
      if (!val)
        return val === 0 ? val : 0;
      val = toNum8(val);
      return val - val % 1;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/concat.js
var require_concat = __commonJS({
  "node_modules/licia/concat.js"(exports, module2) {
    var toArr4 = require_toArr();
    exports = function() {
      var args = toArr4(arguments);
      var ret = [];
      for (var i = 0, len = args.length; i < len; i++) {
        ret = ret.concat(toArr4(args[i]));
      }
      return ret;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/stringify.js
var require_stringify = __commonJS({
  "node_modules/licia/stringify.js"(exports, module2) {
    var type2 = require_type();
    var upperFirst4 = require_upperFirst();
    var toStr6 = require_toStr();
    var isUndef4 = require_isUndef();
    var isFn4 = require_isFn();
    var isRegExp4 = require_isRegExp();
    exports = function(obj, spaces) {
      return JSON.stringify(obj, serializer(), spaces);
    };
    function serializer() {
      var stack2 = [];
      var keys5 = [];
      return function(key, val) {
        if (stack2.length > 0) {
          var pos = stack2.indexOf(this);
          if (pos > -1) {
            stack2.splice(pos + 1);
            keys5.splice(pos, Infinity, key);
          } else {
            stack2.push(this);
            keys5.push(key);
          }
          var valPos = stack2.indexOf(val);
          if (valPos > -1) {
            if (stack2[0] === val) {
              val = "[Circular ~]";
            } else {
              val = "[Circular ~." + keys5.slice(0, valPos).join(".") + "]";
            }
          }
        } else {
          stack2.push(val);
        }
        if (isRegExp4(val) || isFn4(val)) {
          val = "[" + upperFirst4(type2(val)) + " " + toStr6(val) + "]";
        } else if (isUndef4(val)) {
          val = null;
        }
        return val;
      };
    }
    module2.exports = exports;
  }
});

// node_modules/licia/copy.js
var require_copy = __commonJS({
  "node_modules/licia/copy.js"(exports, module2) {
    var extend7 = require_extend();
    var noop2 = require_noop();
    exports = function(text, cb) {
      cb = cb || noop2;
      var el = document.createElement("textarea");
      var body = document.body;
      extend7(el.style, {
        fontSize: "12pt",
        border: "0",
        padding: "0",
        margin: "0",
        position: "absolute",
        left: "-9999px"
      });
      el.value = text;
      body.appendChild(el);
      el.setAttribute("readonly", "");
      el.select();
      el.setSelectionRange(0, text.length);
      try {
        document.execCommand("copy");
        cb();
      } catch (e) {
        cb(e);
      } finally {
        body.removeChild(el);
      }
    };
    module2.exports = exports;
  }
});

// node_modules/licia/isSymbol.js
var require_isSymbol = __commonJS({
  "node_modules/licia/isSymbol.js"(exports, module2) {
    exports = function(val) {
      return typeof val === "symbol";
    };
    module2.exports = exports;
  }
});

// node_modules/licia/safeSet.js
var require_safeSet = __commonJS({
  "node_modules/licia/safeSet.js"(exports, module2) {
    var castPath = require_castPath();
    var isUndef4 = require_isUndef();
    var toStr6 = require_toStr();
    var isSymbol2 = require_isSymbol();
    var isStr6 = require_isStr();
    exports = function(obj, path, val) {
      path = castPath(path, obj);
      var lastProp = path.pop();
      var prop;
      prop = path.shift();
      while (!isUndef4(prop)) {
        if (!isStr6(prop) && !isSymbol2(prop)) {
          prop = toStr6(prop);
        }
        if (prop === "__proto__" || prop === "constructor" || prop === "prototype") {
          return;
        }
        if (!obj[prop])
          obj[prop] = {};
        obj = obj[prop];
        prop = path.shift();
      }
      obj[lastProp] = val;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/defineProp.js
var require_defineProp = __commonJS({
  "node_modules/licia/defineProp.js"(exports, module2) {
    var castPath = require_castPath();
    var isStr6 = require_isStr();
    var isObj4 = require_isObj();
    var each12 = require_each();
    exports = function(obj, prop, descriptor) {
      if (isStr6(prop)) {
        defineProp(obj, prop, descriptor);
      } else if (isObj4(prop)) {
        each12(prop, function(descriptor2, prop2) {
          defineProp(obj, prop2, descriptor2);
        });
      }
      return obj;
    };
    function defineProp(obj, prop, descriptor) {
      var path = castPath(prop, obj);
      var lastProp = path.pop();
      while (prop = path.shift()) {
        if (!obj[prop])
          obj[prop] = {};
        obj = obj[prop];
      }
      Object.defineProperty(obj, lastProp, descriptor);
    }
    module2.exports = exports;
  }
});

// node_modules/licia/pick.js
var require_pick = __commonJS({
  "node_modules/licia/pick.js"(exports, module2) {
    var isStr6 = require_isStr();
    var isArr4 = require_isArr();
    var contain10 = require_contain();
    var each12 = require_each();
    exports = function(obj, filter3, omit) {
      if (isStr6(filter3))
        filter3 = [filter3];
      if (isArr4(filter3)) {
        var keys5 = filter3;
        filter3 = function(val, key) {
          return contain10(keys5, key);
        };
      }
      var ret = {};
      var iteratee = function(val, key) {
        if (filter3(val, key))
          ret[key] = val;
      };
      if (omit) {
        iteratee = function(val, key) {
          if (!filter3(val, key))
            ret[key] = val;
        };
      }
      each12(obj, iteratee);
      return ret;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/stringifyAll.js
var require_stringifyAll = __commonJS({
  "node_modules/licia/stringifyAll.js"(exports, module2) {
    var escapeJsStr2 = require_escapeJsStr();
    var type2 = require_type();
    var toStr6 = require_toStr();
    var endWith2 = require_endWith();
    var toSrc2 = require_toSrc();
    var keys5 = require_keys();
    var each12 = require_each();
    var Class = require_Class();
    var getProto2 = require_getProto();
    var difference2 = require_difference();
    var extend7 = require_extend();
    var isPromise2 = require_isPromise();
    var filter3 = require_filter();
    var now3 = require_now();
    var allKeys2 = require_allKeys();
    var contain10 = require_contain();
    var isObj4 = require_isObj();
    var isMiniProgram = require_isMiniProgram();
    var create = require_create();
    var startWith7 = require_startWith();
    var safeSet = require_safeSet();
    var defineProp = require_defineProp();
    var pick = require_pick();
    var isArrLike = require_isArrLike();
    exports = function(obj) {
      var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, self2 = _ref.self, _ref$startTime = _ref.startTime, startTime = _ref$startTime === void 0 ? now3() : _ref$startTime, _ref$timeout = _ref.timeout, timeout = _ref$timeout === void 0 ? 0 : _ref$timeout, _ref$depth = _ref.depth, depth = _ref$depth === void 0 ? 0 : _ref$depth, _ref$curDepth = _ref.curDepth, curDepth = _ref$curDepth === void 0 ? 1 : _ref$curDepth, _ref$visitor = _ref.visitor, visitor = _ref$visitor === void 0 ? new Visitor2() : _ref$visitor, _ref$unenumerable = _ref.unenumerable, unenumerable = _ref$unenumerable === void 0 ? false : _ref$unenumerable, _ref$symbol = _ref.symbol, symbol = _ref$symbol === void 0 ? false : _ref$symbol, _ref$accessGetter = _ref.accessGetter, accessGetter = _ref$accessGetter === void 0 ? false : _ref$accessGetter, _ref$ignore = _ref.ignore, ignore = _ref$ignore === void 0 ? [] : _ref$ignore;
      var json = "";
      var options = {
        visitor,
        unenumerable,
        symbol,
        accessGetter,
        depth,
        curDepth: curDepth + 1,
        timeout,
        startTime,
        ignore
      };
      var t = type2(obj, false);
      if (t === "String") {
        json = wrapStr(obj);
      } else if (t === "Number") {
        json = toStr6(obj);
        if (endWith2(json, "Infinity")) {
          json = '{"value":"'.concat(json, '","type":"Number"}');
        }
      } else if (t === "NaN") {
        json = '{"value":"NaN","type":"Number"}';
      } else if (t === "Boolean") {
        json = obj ? "true" : "false";
      } else if (t === "Null") {
        json = "null";
      } else if (t === "Undefined") {
        json = '{"type":"Undefined"}';
      } else if (t === "Symbol") {
        var val = "Symbol";
        try {
          val = toStr6(obj);
        } catch (e) {
        }
        json = '{"value":'.concat(wrapStr(val), ',"type":"Symbol"}');
      } else {
        if (timeout && now3() - startTime > timeout) {
          return wrapStr("Timeout");
        }
        if (depth && curDepth > depth) {
          return wrapStr("{...}");
        }
        json = "{";
        var parts = [];
        var visitedObj = visitor.get(obj);
        var id2;
        if (visitedObj) {
          id2 = visitedObj.id;
          parts.push('"reference":'.concat(id2));
        } else {
          id2 = visitor.set(obj);
          parts.push('"id":'.concat(id2));
        }
        parts.push('"type":"'.concat(t, '"'));
        if (endWith2(t, "Function")) {
          parts.push('"value":'.concat(wrapStr(toSrc2(obj))));
        } else if (t === "RegExp") {
          parts.push('"value":'.concat(wrapStr(obj)));
        }
        if (!visitedObj) {
          var enumerableKeys = keys5(obj);
          if (enumerableKeys.length) {
            parts.push(
              iterateObj(
                "enumerable",
                enumerableKeys,
                self2 || obj,
                options
              )
            );
          }
          if (unenumerable) {
            var unenumerableKeys = difference2(
              allKeys2(obj, {
                prototype: false,
                unenumerable: true
              }),
              enumerableKeys
            );
            if (unenumerableKeys.length) {
              parts.push(
                iterateObj(
                  "unenumerable",
                  unenumerableKeys,
                  self2 || obj,
                  options
                )
              );
            }
          }
          if (symbol) {
            var symbolKeys = filter3(
              allKeys2(obj, {
                prototype: false,
                symbol: true
              }),
              function(key) {
                return typeof key === "symbol";
              }
            );
            if (symbolKeys.length) {
              parts.push(
                iterateObj("symbol", symbolKeys, self2 || obj, options)
              );
            }
          }
          var prototype = getProto2(obj);
          if (prototype && !contain10(ignore, prototype)) {
            var proto = '"proto":'.concat(
              exports(
                prototype,
                extend7(options, {
                  self: self2 || obj
                })
              )
            );
            parts.push(proto);
          }
        }
        json += parts.join(",") + "}";
      }
      return json;
    };
    function iterateObj(name, keys6, obj, options) {
      var parts = [];
      each12(keys6, function(key) {
        var val;
        var descriptor = Object.getOwnPropertyDescriptor(obj, key);
        var hasGetter = descriptor && descriptor.get;
        var hasSetter = descriptor && descriptor.set;
        if (!options.accessGetter && hasGetter) {
          val = "(...)";
        } else {
          try {
            val = obj[key];
            if (contain10(options.ignore, val)) {
              return;
            }
            if (isPromise2(val)) {
              val.catch(function() {
              });
            }
          } catch (e) {
            val = e.message;
          }
        }
        parts.push("".concat(wrapKey(key), ":").concat(exports(val, options)));
        if (hasGetter) {
          parts.push(
            "".concat(wrapKey("get " + toStr6(key)), ":").concat(exports(descriptor.get, options))
          );
        }
        if (hasSetter) {
          parts.push(
            "".concat(wrapKey("set " + toStr6(key)), ":").concat(exports(descriptor.set, options))
          );
        }
      });
      return '"'.concat(name, '":{') + parts.join(",") + "}";
    }
    function wrapKey(key) {
      return '"'.concat(escapeJsonStr2(key), '"');
    }
    function wrapStr(str) {
      return '"'.concat(escapeJsonStr2(toStr6(str)), '"');
    }
    function escapeJsonStr2(str) {
      return escapeJsStr2(str).replace(/\\'/g, "'").replace(/\t/g, "\\t");
    }
    var Visitor2 = Class({
      initialize: function() {
        this.id = 1;
        this.visited = [];
      },
      set: function(val) {
        var visited = this.visited, id2 = this.id;
        var obj = {
          id: id2,
          val
        };
        visited.push(obj);
        this.id++;
        return id2;
      },
      get: function(val) {
        var visited = this.visited;
        for (var i = 0, len = visited.length; i < len; i++) {
          var obj = visited[i];
          if (val === obj.val)
            return obj;
        }
        return false;
      }
    });
    exports.parse = function(str) {
      var map8 = {};
      var obj = parse(JSON.parse(str), {
        map: map8
      });
      correctReference(map8);
      return obj;
    };
    function correctReference(map8) {
      each12(map8, function(obj) {
        var enumerableKeys = keys5(obj);
        for (var i = 0, len = enumerableKeys.length; i < len; i++) {
          var key = enumerableKeys[i];
          if (isObj4(obj[key])) {
            var reference = obj[key].reference;
            if (reference && map8[reference]) {
              obj[key] = map8[reference];
            }
          }
        }
        var proto = getProto2(obj);
        if (proto && proto.reference) {
          if (map8[proto.reference]) {
            Object.setPrototypeOf(obj, map8[proto.reference]);
          }
        }
      });
    }
    function parse(obj, options) {
      var map8 = options.map;
      if (!isObj4(obj)) {
        return obj;
      }
      var id2 = obj.id, type3 = obj.type, value = obj.value, proto = obj.proto, reference = obj.reference;
      var enumerable = obj.enumerable, unenumerable = obj.unenumerable;
      if (reference) {
        return obj;
      }
      if (type3 === "Number") {
        if (value === "Infinity") {
          return Number.POSITIVE_INFINITY;
        } else if (value === "-Infinity") {
          return Number.NEGATIVE_INFINITY;
        }
        return NaN;
      } else if (type3 === "Undefined") {
        return void 0;
      }
      var newObj;
      if (type3 === "Function") {
        newObj = function() {
        };
        newObj.toString = function() {
          return value;
        };
        if (proto) {
          Object.setPrototypeOf(newObj, parse(proto, options));
        }
      } else if (type3 === "RegExp") {
        newObj = strToRegExp(value);
      } else {
        if (type3 !== "Object") {
          var Fn;
          if (!isMiniProgram) {
            Fn = new Function(type3, "");
          } else {
            Fn = function() {
            };
          }
          if (proto) {
            Fn.prototype = parse(proto, options);
          }
          newObj = new Fn();
        } else {
          if (proto) {
            newObj = create(parse(proto, options));
          } else {
            newObj = create(null);
          }
        }
      }
      var defineProps = {};
      if (enumerable) {
        var len;
        if (isArrLike(enumerable)) {
          len = enumerable.length;
          delete enumerable.length;
        }
        enumerable = pick(enumerable, function(value2, key) {
          return !handleGetterSetter(enumerable, value2, key);
        });
        each12(enumerable, function(value2, key) {
          var defineProp2 = defineProps[key] || {};
          if (!defineProp2.get) {
            newObj[key] = parse(value2, options);
          }
        });
        if (len) {
          newObj.length = len;
        }
      }
      if (unenumerable) {
        unenumerable = pick(unenumerable, function(value2, key) {
          return !handleGetterSetter(unenumerable, value2, key);
        });
        each12(unenumerable, function(value2, key) {
          var defineProp2 = defineProps[key] || {};
          if (!defineProp2.get) {
            value2 = parse(value2, options);
            if (isObj4(value2) && value2.reference) {
              var _reference = value2.reference;
              value2 = function() {
                return map8[_reference];
              };
              defineProp2.get = value2;
            } else {
              defineProp2.value = value2;
            }
          }
          defineProp2.enumerable = false;
          defineProps[key] = defineProp2;
        });
      }
      defineProp(newObj, defineProps);
      function handleGetterSetter(obj2, val, key) {
        key = toStr6(key);
        var isGetterAndSetter = false;
        each12(["get", "set"], function(type4) {
          if (startWith7(key, type4 + " ")) {
            var realKey = key.replace(type4 + " ", "");
            if (obj2[realKey]) {
              val = parse(val, options);
              if (val === "Timeout") {
                val = retTimeout;
              }
              safeSet(defineProps, [realKey, type4], val);
              isGetterAndSetter = true;
            }
          }
        });
        return isGetterAndSetter;
      }
      map8[id2] = newObj;
      return newObj;
    }
    function retTimeout() {
      return "Timeout";
    }
    function strToRegExp(str) {
      var lastSlash = str.lastIndexOf("/");
      return new RegExp(str.slice(1, lastSlash), str.slice(lastSlash + 1));
    }
    module2.exports = exports;
  }
});

// node_modules/licia/nextTick.js
var require_nextTick = __commonJS({
  "node_modules/licia/nextTick.js"(exports, module2) {
    if (typeof process === "object" && process.nextTick && true) {
      exports = process.nextTick;
    } else if (typeof setImmediate === "function") {
      exports = function(cb) {
        setImmediate(ensureCallable(cb));
      };
    } else {
      exports = function(cb) {
        setTimeout(ensureCallable(cb), 0);
      };
    }
    function ensureCallable(fn) {
      if (typeof fn !== "function")
        throw new TypeError(fn + " is not a function");
      return fn;
    }
    module2.exports = exports;
  }
});

// node_modules/licia/extractUrls.js
var require_extractUrls = __commonJS({
  "node_modules/licia/extractUrls.js"(exports, module2) {
    var unique2 = require_unique();
    var trim10 = require_trim();
    var map8 = require_map();
    var toArr4 = require_toArr();
    exports = function(str) {
      var urlList = toArr4(str.match(regUrl));
      return unique2(
        map8(urlList, function(url3) {
          return trim10(url3);
        })
      );
    };
    var regUrl = /((https?)|(ftp)):\/\/[\w.]+[^ \f\n\r\t\v"\\<>[\]\u2100-\uFFFF(),]*/gi;
    module2.exports = exports;
  }
});

// node_modules/licia/escapeRegExp.js
var require_escapeRegExp = __commonJS({
  "node_modules/licia/escapeRegExp.js"(exports, module2) {
    exports = function(str) {
      return str.replace(/\W/g, "\\$&");
    };
    module2.exports = exports;
  }
});

// node_modules/licia/linkify.js
var require_linkify = __commonJS({
  "node_modules/licia/linkify.js"(exports, module2) {
    var extractUrls = require_extractUrls();
    var each12 = require_each();
    var escapeRegExp = require_escapeRegExp();
    exports = function(str, hyperlink) {
      hyperlink = hyperlink || defHyperlink;
      var urlList = extractUrls(str);
      each12(urlList, function(url3) {
        str = str.replace(new RegExp(escapeRegExp(url3), "g"), hyperlink);
      });
      return str;
    };
    function defHyperlink(url3) {
      return '<a href="' + url3 + '">' + url3 + "</a>";
    }
    module2.exports = exports;
  }
});

// node_modules/licia/toEl.js
var require_toEl = __commonJS({
  "node_modules/licia/toEl.js"(exports, module2) {
    var doc = document;
    exports = function(str) {
      var fragment = doc.createElement("body");
      fragment.innerHTML = str;
      return fragment.childNodes[0];
    };
    if (doc.createRange && doc.body) {
      range = doc.createRange();
      range.selectNode(doc.body);
      if (range.createContextualFragment) {
        exports = function(str) {
          return range.createContextualFragment(str).childNodes[0];
        };
      }
    }
    var range;
    module2.exports = exports;
  }
});

// node_modules/licia/perfNow.js
var require_perfNow = __commonJS({
  "node_modules/licia/perfNow.js"(exports, module2) {
    var now3 = require_now();
    var root5 = require_root();
    var performance = root5.performance;
    var process2 = root5.process;
    var loadTime;
    if (performance && performance.now) {
      exports = function() {
        return performance.now();
      };
    } else if (process2 && process2.hrtime) {
      getNanoSeconds = function() {
        var hr = process2.hrtime();
        return hr[0] * 1e9 + hr[1];
      };
      loadTime = getNanoSeconds() - process2.uptime() * 1e9;
      exports = function() {
        return (getNanoSeconds() - loadTime) / 1e6;
      };
    } else {
      loadTime = now3();
      exports = function() {
        return now3() - loadTime;
      };
    }
    var getNanoSeconds;
    module2.exports = exports;
  }
});

// node_modules/licia/xpath.js
var require_xpath = __commonJS({
  "node_modules/licia/xpath.js"(exports, module2) {
    var isStr6 = require_isStr();
    var Class = require_Class();
    exports = function(xpath2, optimized) {
      if (isStr6(xpath2)) {
        return findEl(xpath2);
      } else {
        return getXpath(xpath2, optimized);
      }
    };
    function findEl(xpath2) {
      var ret = [];
      var nodesSnapshot = document.evaluate(
        xpath2,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );
      for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        ret.push(nodesSnapshot.snapshotItem(i));
      }
      return ret;
    }
    function getXpath(node) {
      var optimized = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      if (node.nodeType === Node.DOCUMENT_NODE) {
        return "/";
      }
      var steps = [];
      var contextNode = node;
      while (contextNode) {
        var step = xPathValue(contextNode, optimized);
        if (!step) {
          break;
        }
        steps.push(step);
        if (step.optimized) {
          break;
        }
        contextNode = contextNode.parentNode;
      }
      steps.reverse();
      return (steps.length && steps[0].optimized ? "" : "/") + steps.join("/");
    }
    function xPathValue(node, optimized) {
      var ownValue;
      var ownIndex = xPathIndex(node);
      if (ownIndex === -1) {
        return null;
      }
      switch (node.nodeType) {
        case Node.ELEMENT_NODE:
          if (optimized && node.getAttribute("id")) {
            return new Step(
              '//*[@id="' + node.getAttribute("id") + '"]',
              true
            );
          }
          ownValue = node.localName;
          break;
        case Node.ATTRIBUTE_NODE:
          ownValue = "@" + node.nodeName();
          break;
        case Node.TEXT_NODE:
        case Node.CDATA_SECTION_NODE:
          ownValue = "text()";
          break;
        case Node.PROCESSING_INSTRUCTION_NODE:
          ownValue = "processing-instruction()";
          break;
        case Node.COMMENT_NODE:
          ownValue = "comment()";
          break;
        case Node.DOCUMENT_NODE:
          ownValue = "";
          break;
        default:
          ownValue = "";
          break;
      }
      if (ownIndex > 0) {
        ownValue += "[" + ownIndex + "]";
      }
      return new Step(ownValue, node.nodeType === Node.DOCUMENT_NODE);
    }
    function xPathIndex(node) {
      function areNodesSimilar(left, right) {
        if (left === right) {
          return true;
        }
        if (left.nodeType === Node.ELEMENT_NODE && right.nodeType === Node.ELEMENT_NODE) {
          return left.localName === right.localName;
        }
        if (left.nodeType === right.nodeType) {
          return true;
        }
        var leftType = left.nodeType === Node.CDATA_SECTION_NODE ? Node.TEXT_NODE : left.nodeType;
        var rightType = right.nodeType === Node.CDATA_SECTION_NODE ? Node.TEXT_NODE : right.nodeType;
        return leftType === rightType;
      }
      var siblings = node.parentNode ? node.parentNode.children : null;
      if (!siblings) {
        return 0;
      }
      var hasSameNamedElements;
      for (var i = 0; i < siblings.length; ++i) {
        if (areNodesSimilar(node, siblings[i]) && siblings[i] !== node) {
          hasSameNamedElements = true;
          break;
        }
      }
      if (!hasSameNamedElements) {
        return 0;
      }
      var ownIndex = 1;
      for (var _i = 0; _i < siblings.length; ++_i) {
        if (areNodesSimilar(node, siblings[_i])) {
          if (siblings[_i] === node) {
            return ownIndex;
          }
          ++ownIndex;
        }
      }
      return -1;
    }
    var Step = Class({
      initialize: function(value, optimized) {
        this.value = value;
        this.optimized = optimized || false;
      },
      toString: function() {
        return this.value;
      }
    });
    module2.exports = exports;
  }
});

// node_modules/licia/isDate.js
var require_isDate = __commonJS({
  "node_modules/licia/isDate.js"(exports, module2) {
    var objToStr = require_objToStr();
    exports = function(val) {
      return objToStr(val) === "[object Date]";
    };
    module2.exports = exports;
  }
});

// node_modules/licia/repeat.js
var require_repeat = __commonJS({
  "node_modules/licia/repeat.js"(exports, module2) {
    exports = function(str, n) {
      var ret = "";
      if (n < 1)
        return "";
      while (n > 0) {
        if (n & 1)
          ret += str;
        n >>= 1;
        str += str;
      }
      return ret;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/lpad.js
var require_lpad = __commonJS({
  "node_modules/licia/lpad.js"(exports, module2) {
    var repeat = require_repeat();
    var toStr6 = require_toStr();
    exports = function(str, len, chars) {
      str = toStr6(str);
      var strLen = str.length;
      chars = chars || " ";
      if (strLen < len)
        str = (repeat(chars, len - strLen) + str).slice(-len);
      return str;
    };
    module2.exports = exports;
  }
});

// node_modules/licia/dateFormat.js
var require_dateFormat = __commonJS({
  "node_modules/licia/dateFormat.js"(exports, module2) {
    var isStr6 = require_isStr();
    var isDate = require_isDate();
    var toStr6 = require_toStr();
    var lpad = require_lpad();
    exports = function(date, mask, utc, gmt) {
      if (arguments.length === 1 && isStr6(date) && !regNum.test(date)) {
        mask = date;
        date = void 0;
      }
      date = date || /* @__PURE__ */ new Date();
      if (!isDate(date))
        date = new Date(date);
      mask = toStr6(exports.masks[mask] || mask || exports.masks["default"]);
      var maskSlice = mask.slice(0, 4);
      if (maskSlice === "UTC:" || maskSlice === "GMT:") {
        mask = mask.slice(4);
        utc = true;
        if (maskSlice === "GMT:")
          gmt = true;
      }
      var prefix = utc ? "getUTC" : "get";
      var d = date[prefix + "Date"]();
      var D = date[prefix + "Day"]();
      var m = date[prefix + "Month"]();
      var y = date[prefix + "FullYear"]();
      var H = date[prefix + "Hours"]();
      var M = date[prefix + "Minutes"]();
      var s = date[prefix + "Seconds"]();
      var L = date[prefix + "Milliseconds"]();
      var o = utc ? 0 : date.getTimezoneOffset();
      var flags = {
        d,
        dd: padZero(d),
        ddd: exports.i18n.dayNames[D],
        dddd: exports.i18n.dayNames[D + 7],
        m: m + 1,
        mm: padZero(m + 1),
        mmm: exports.i18n.monthNames[m],
        mmmm: exports.i18n.monthNames[m + 12],
        yy: toStr6(y).slice(2),
        yyyy: y,
        h: H % 12 || 12,
        hh: padZero(H % 12 || 12),
        H,
        HH: padZero(H),
        M,
        MM: padZero(M),
        s,
        ss: padZero(s),
        l: padZero(L, 3),
        L: padZero(Math.round(L / 10)),
        t: H < 12 ? "a" : "p",
        tt: H < 12 ? "am" : "pm",
        T: H < 12 ? "A" : "P",
        TT: H < 12 ? "AM" : "PM",
        Z: gmt ? "GMT" : utc ? "UTC" : (toStr6(date).match(regTimezone) || [""]).pop().replace(regTimezoneClip, ""),
        o: (o > 0 ? "-" : "+") + padZero(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
        S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
      };
      return mask.replace(regToken, function(match) {
        if (match in flags)
          return flags[match];
        return match.slice(1, match.length - 1);
      });
    };
    var padZero = function(str) {
      var len = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
      return lpad(toStr6(str), len, "0");
    };
    var regToken = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g;
    var regTimezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
    var regNum = /\d/;
    var regTimezoneClip = /[^-+\dA-Z]/g;
    exports.masks = {
      default: "ddd mmm dd yyyy HH:MM:ss",
      shortDate: "m/d/yy",
      mediumDate: "mmm d, yyyy",
      longDate: "mmmm d, yyyy",
      fullDate: "dddd, mmmm d, yyyy",
      shortTime: "h:MM TT",
      mediumTime: "h:MM:ss TT",
      longTime: "h:MM:ss TT Z",
      isoDate: "yyyy-mm-dd",
      isoTime: "HH:MM:ss",
      isoDateTime: "yyyy-mm-dd'T'HH:MM:sso",
      isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
      expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z"
    };
    exports.i18n = {
      dayNames: [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      monthNames: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    };
    module2.exports = exports;
  }
});

// node_modules/licia/raf.js
var require_raf = __commonJS({
  "node_modules/licia/raf.js"(exports, module2) {
    var now3 = require_now();
    var isBrowser = require_isBrowser();
    var raf2;
    var cancel;
    var lastTime = 0;
    if (isBrowser) {
      raf2 = window.requestAnimationFrame;
      cancel = window.cancelAnimationFrame;
      vendors = ["ms", "moz", "webkit", "o"];
      for (i = 0, len = vendors.length; i < len && !raf2; i++) {
        raf2 = window[vendors[i] + "RequestAnimationFrame"];
        cancel = window[vendors[i] + "CancelAnimationFrame"] || window[vendors[i] + "CancelRequestAnimationFrame"];
      }
      if (raf2) {
        raf2 = raf2.bind(window);
        cancel = cancel.bind(window);
      }
    }
    var vendors;
    var i;
    var len;
    raf2 = raf2 || function(cb) {
      var curTime = now3();
      var timeToCall = Math.max(0, 16 - (curTime - lastTime));
      var id2 = setTimeout(function() {
        cb(curTime + timeToCall);
      }, timeToCall);
      lastTime = curTime + timeToCall;
      return id2;
    };
    cancel = cancel || function(id2) {
      clearTimeout(id2);
    };
    raf2.cancel = cancel;
    exports = raf2;
    module2.exports = exports;
  }
});

// src/sdk/index.ts
var import_lz_string = __toESM(require_lz_string());
function getPlaygroundUrl(options = {}) {
  const {
    appUrl = "https://livecodes.io",
    params: params2 = {},
    config = {},
    headless,
    import: importId,
    lite,
    view,
    ...otherOptions
  } = options;
  let playgroundUrl;
  try {
    playgroundUrl = new URL(appUrl);
  } catch {
    throw new Error(`${appUrl} is not a valid URL.`);
  }
  const hashParams = new URLSearchParams();
  Object.entries(otherOptions).forEach(([key, value]) => {
    if (value !== void 0) {
      playgroundUrl.searchParams.set(key, String(value));
    }
  });
  const isHeadless2 = options.view === "headless" || headless;
  if (lite) {
    console.warn(
      `Deprecation notice: "lite" option is deprecated. Use "config: { mode: 'lite' }" instead.`
    );
    if (typeof config === "object" && config.mode == null) {
      config.mode = "lite";
    } else {
      playgroundUrl.searchParams.set("lite", "true");
    }
  }
  if (view) {
    console.warn(
      `Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".`
    );
    if (typeof config === "object" && config.view == null && view !== "headless") {
      config.view = view;
    } else {
      playgroundUrl.searchParams.set("view", view);
    }
  }
  if (typeof config === "string") {
    try {
      new URL(config);
      playgroundUrl.searchParams.set("config", encodeURIComponent(config));
    } catch {
      throw new Error(`"config" is not a valid URL or configuration object.`);
    }
  } else if (config && typeof config === "object" && Object.keys(config).length > 0) {
    if (config.title && config.title !== "Untitled Project") {
      playgroundUrl.searchParams.set("title", config.title);
    }
    if (config.description && config.description.length > 0) {
      playgroundUrl.searchParams.set("description", config.description);
    }
    hashParams.set("config", "code/" + (0, import_lz_string.compressToEncodedURIComponent)(JSON.stringify(config)));
  }
  if (params2 && typeof params2 === "object" && Object.keys(params2).length > 0) {
    try {
      hashParams.set("params", (0, import_lz_string.compressToEncodedURIComponent)(JSON.stringify(params2)));
    } catch {
      Object.keys(params2).forEach((param) => {
        playgroundUrl.searchParams.set(param, encodeURIComponent(String(params2[param])));
      });
    }
  }
  if (importId) {
    playgroundUrl.searchParams.set("x", encodeURIComponent(importId));
  }
  if (isHeadless2) {
    playgroundUrl.searchParams.set("headless", "true");
  }
  if (hashParams.toString().length > 0) {
    playgroundUrl.hash = hashParams.toString();
  }
  return playgroundUrl.href;
}

// node_modules/js-base64/base64.mjs
var _hasbtoa = typeof btoa === "function";
var _hasBuffer = typeof Buffer === "function";
var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var b64chs = Array.prototype.slice.call(b64ch);
var b64tab = ((a) => {
  let tab = {};
  a.forEach((c2, i) => tab[c2] = i);
  return tab;
})(b64chs);
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
var _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
var btoaPolyfill = (bin) => {
  let u32, c0, c1, c2, asc = "";
  const pad = bin.length % 3;
  for (let i = 0; i < bin.length; ) {
    if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255)
      throw new TypeError("invalid character found");
    u32 = c0 << 16 | c1 << 8 | c2;
    asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
  }
  return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};
var _btoa = _hasbtoa ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
var _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
  const maxargs = 4096;
  let strs = [];
  for (let i = 0, l = u8a.length; i < l; i += maxargs) {
    strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
  }
  return _btoa(strs.join(""));
};
var cb_utob = (c2) => {
  if (c2.length < 2) {
    var cc = c2.charCodeAt(0);
    return cc < 128 ? c2 : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  } else {
    var cc = 65536 + (c2.charCodeAt(0) - 55296) * 1024 + (c2.charCodeAt(1) - 56320);
    return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  }
};
var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
var utob = (u2) => u2.replace(re_utob, cb_utob);
var _encode = _hasBuffer ? (s) => Buffer.from(s, "utf8").toString("base64") : _TE ? (s) => _fromUint8Array(_TE.encode(s)) : (s) => _btoa(utob(s));
var encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);

// src/livecodes/utils/utils.ts
var debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    if (timeout)
      clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(null, args), typeof delay === "function" ? delay() : delay);
  };
};
var decodeHTML = (html6) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html6;
  return txt.value;
};
var escapeScript = (code) => code.replace(/<\/script>/g, "<\\/script>");
var escapeCode = (code, slash = true) => code.replace(/\\/g, slash ? "\\\\" : "\\").replace(/`/g, "\\`").replace(/<\/script>/g, "<\\/script>");
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
var isRelativeUrl = (url3) => !url3?.startsWith("http") && !url3?.startsWith("data:");
var getAbsoluteUrl = (url3, baseUrl2 = document.baseURI) => isRelativeUrl(url3) ? new URL(url3, baseUrl2).href : url3;
var cloneObject = (x) => (globalThis.structuredClone || ((obj) => JSON.parse(JSON.stringify(obj, (_k, v) => v === void 0 ? null : v))))(x);
var objectMap = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));
var objectFilter = (obj, predicate) => Object.fromEntries(Object.entries(obj).filter(([k, v], i) => predicate(v, k, i)));
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
var stringToValidJson = (str) => str.replace(/'[^'"]*'(?=(?:[^"]*"[^"]*")*[^"]*$)/g, function replaceSingleQuotes(matchedStr) {
  return '"' + matchedStr.substring(1, matchedStr.length - 1) + '"';
}).replace(
  // /(\w+(?=([^"\\]*(\\.|"([^"\\]*\\.)*[^"\\]*"))*[^"]*$))(\s*:)(?!(\w*)(?:"))/gm,
  /(\w+(?=([^"\\]*(\\.|"([^"\\]*\\.)*[^"\\]*"))*[^"]*$))(\s*:)/gm,
  function quoteNonQuoted(matchedStr) {
    return '"' + matchedStr.substring(0, matchedStr.length - 1).trimEnd() + '":';
  }
).replace(/,\s*([\]}])/g, "$1");
var stringify = (obj, pretty = false) => {
  try {
    return JSON.stringify(obj, void 0, pretty ? 2 : void 0);
  } catch {
    return "";
  }
};
var getRandomString = () => String(Math.random()) + "-" + Date.now().toFixed();
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
var loadStylesheet = (url3, id2, insertBefore) => {
  if (id2 && document.getElementById(id2))
    return;
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = url3;
  stylesheet.id = id2 || "styles-" + getRandomString();
  stylesheet.crossOrigin = "anonymous";
  document.head.insertBefore(
    stylesheet,
    insertBefore ? document.querySelector(insertBefore) : null
  );
};
var toDataUrl = (content, type2 = "text/javascript") => `data:${type2};charset=UTF-8;base64,` + encode(content);
var removeComments = (src) => src.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1");
var removeStrings = (src) => src.replace(/'[^\n']*'/gm, "''").replace(/"[^\n"]*"/gm, '""').replace(/`[^`]*`/gm, "``");
var removeCommentsAndStrings = (src) => removeStrings(removeComments(src));
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
var capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
var toCamelCase = (str) => str.replace(/[-_.]+/g, " ").trim().replace(/^([A-Z])|\s+(\w)/g, function(_match, p1, p2) {
  if (p2)
    return p2.toUpperCase();
  return p1.toLowerCase();
});
var removeDuplicates = (arr) => Array.from(new Set(arr));
var addAttrs = (el, attributes) => {
  if (typeof attributes === "object") {
    Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
    return;
  }
  const attrs = attributes.match(/[^\s="']+\s*=\s*(('[^']*')|("[^"]*"))/g) || [];
  for (const attr of attrs) {
    const [key, ...rest] = attr.split("=");
    const value = rest.join("=");
    el.setAttribute(key, value.slice(1, -1));
  }
};
var colorToRgba = (name) => {
  const fakeDiv = document.createElement("div");
  fakeDiv.style.color = name;
  document.body.appendChild(fakeDiv);
  const style = window.getComputedStyle(fakeDiv);
  const colorValue = style.getPropertyValue("color") || "rgb(77, 121, 179)";
  document.body.removeChild(fakeDiv);
  const rgba = colorValue.split("(")[1].split(")")[0].split(",").map((x) => Number(x));
  const [r2, g, b, a = 1] = rgba;
  return { r: r2, g, b, a };
};
var rgbaToHsla = (r2, g, b, a = 1) => {
  const r$ = r2 / 255;
  const g$ = g / 255;
  const b$ = b / 255;
  const cmin = Math.min(r$, g$, b$);
  const cmax = Math.max(r$, g$, b$);
  const delta = cmax - cmin;
  let h4 = 0;
  let s = 0;
  let l = 0;
  if (delta === 0)
    h4 = 0;
  else if (cmax === r$)
    h4 = (g$ - b$) / delta % 6;
  else if (cmax === g$)
    h4 = (b$ - r$) / delta + 2;
  else
    h4 = (r$ - g$) / delta + 4;
  h4 = Math.round(h4 * 60);
  if (h4 < 0)
    h4 += 360;
  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(0);
  l = +(l * 100).toFixed(0);
  return { h: h4, s, l, a };
};
var colorToHsla = (color) => {
  const { r: r2, g, b, a } = colorToRgba(color);
  return rgbaToHsla(r2, g, b, a);
};
var rgbToHex = (r2, g, b) => (
  // eslint-disable-next-line no-bitwise
  "#" + ((r2 << 16) + (g << 8) + b).toString(16).padStart(6, "0")
);
var colorToHex = (color) => {
  const { r: r2, g, b } = colorToRgba(color);
  return rgbToHex(r2, g, b);
};
var compareObjects = (srcObj, dstObj) => {
  const diff = [];
  for (const key of Object.keys(srcObj)) {
    const srcObjProp = srcObj[key];
    const dstObjProp = dstObj[key];
    if (typeof srcObjProp === "function") {
      continue;
    } else if (!(key in dstObj)) {
      diff.push(key);
    } else if (srcObjProp !== null && typeof srcObjProp === "object") {
      if (!dstObjProp || typeof dstObjProp !== "object") {
        diff.push(key);
      } else if (Array.isArray(srcObjProp)) {
        if (!Array.isArray(dstObjProp)) {
          diff.push(key);
        } else if (srcObjProp.length !== dstObjProp.length) {
          diff.push(key);
        } else {
          for (let i = 0; i < srcObjProp.length; i++) {
            if (srcObjProp[i] !== dstObjProp[i]) {
              diff.push(`${key}[${i}]`);
            }
          }
        }
      } else {
        const objDiff = compareObjects(srcObjProp, dstObjProp).map((k) => `${key}.${k}`);
        diff.push(...objDiff);
      }
    } else if (srcObjProp !== dstObjProp) {
      diff.push(key);
    }
  }
  return diff;
};
var addProp = (obj, key, value) => {
  const keys5 = key.split(".");
  if (keys5.length === 1) {
    obj[key] = value;
    return;
  }
  const [first, ...rest] = keys5;
  if (!obj[first])
    obj[first] = {};
  addProp(obj[first], rest.join("."), value);
};
var predefinedValues = {
  APP_VERSION: "47",
  SDK_VERSION: "0.12.0",
  COMMIT_SHA: "7b4906d",
  REPO_URL: "https://github.com/live-codes/livecodes",
  DOCS_BASE_URL: "http://localhost:3000/docs/"
};

// src/livecodes/html/sandbox/v9/index.html?raw
var v9_default = `<!doctype html>\r
<html>\r
  <head>\r
    <script id="message-script" data-env="development">\r
      window.addEventListener('message', function (event) {\r
        var html = event.data.result || event.data.html;\r
        if (html) {\r
          document.open();\r
          document.write(html);\r
          document.close();\r
        }\r
      });\r
    <\/script>\r
  </head>\r
  <body></body>\r
</html>\r
`;

// src/livecodes/html/save-prompt.html?raw
var save_prompt_default = '<div id="prompt-screen">\r\n  <div class="modal-title" data-i18n="savePrompt.heading">Unsaved changes</div>\r\n\r\n  <div class="modal-screen-container">\r\n    <div class="modal-screen">\r\n      <div\r\n        class="description dialog"\r\n        data-i18n="savePrompt.prompt.heading"\r\n        data-i18n-prop="innerHTML"\r\n      >\r\n        The changes you made may not be saved. <br />\r\n        Do you want to save now?\r\n      </div>\r\n\r\n      <div class="buttons">\r\n        <button id="prompt-save-btn" class="button" data-i18n="savePrompt.prompt.save">Save</button>\r\n        <button id="prompt-donot-save-btn" class="button" data-i18n="savePrompt.prompt.discard">\r\n          Do not save\r\n        </button>\r\n        <button id="prompt-cancel-btn" class="button" data-i18n="savePrompt.prompt.cancel">\r\n          Cancel\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n';

// src/livecodes/html/recover-prompt.html?raw
var recover_prompt_default = '<div id="prompt-recover-screen">\r\n  <div class="modal-title" data-i18n="recoverPrompt.heading">Recover unsaved project?</div>\r\n\r\n  <div class="modal-screen-container">\r\n    <div class="description warn" data-i18n="recoverPrompt.desc">\r\n      Your last project has unsaved changes! <br />\r\n      <br />\r\n    </div>\r\n\r\n    <div class="description help" data-i18n="recoverPrompt.meta" data-i18n-prop="innerHTML">\r\n      Title: <strong id="unsaved-project-name"></strong> <br />\r\n      Last modified: <span id="unsaved-project-last-modified"></span>\r\n    </div>\r\n    <div class="centered" data-i18n="recoverPrompt.prompt.heading" data-i18n-prop="innerHTML">\r\n      <br />Do you want to recover it now?\r\n    </div>\r\n    <div class="buttons">\r\n      <button\r\n        id="prompt-recover-btn"\r\n        class="button"\r\n        title="Recover project to editor"\r\n        data-i18n="recoverPrompt.prompt.recover"\r\n        data-i18n-prop="title"\r\n      >\r\n        Recover\r\n      </button>\r\n      <button\r\n        id="prompt-save-previous-btn"\r\n        class="button"\r\n        title="Save to device and continue"\r\n        data-i18n="recoverPrompt.prompt.save"\r\n        data-i18n-prop="title"\r\n      >\r\n        Save\r\n      </button>\r\n      <button\r\n        id="prompt-cancel-recover-btn"\r\n        class="button"\r\n        title="Discard unsaved project"\r\n        data-i18n="recoverPrompt.prompt.discard"\r\n        data-i18n-prop="title"\r\n      >\r\n        Cancel\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div id="show-prompt">\r\n    <input\r\n      type="checkbox"\r\n      value="disable-recover-checkbox"\r\n      id="disable-recover-checkbox"\r\n      name="disable-recover-checkbox"\r\n    />\r\n    <label for="disable-recover-checkbox" data-i18n="recoverPrompt.notShowAgain"\r\n      >Do not show this again.</label\r\n    >\r\n  </div>\r\n</div>\r\n';

// src/livecodes/html/index.ts
var replaceValues = (str) => Object.entries(predefinedValues).reduce(
  (str2, [key, value]) => str2.replace(new RegExp(`{{${key}}}`, "g"), value),
  str
);
var resultTemplate = /* @__PURE__ */ replaceValues(v9_default);
var savePromptScreen = /* @__PURE__ */ replaceValues(save_prompt_default);
var recoverPromptScreen = /* @__PURE__ */ replaceValues(recover_prompt_default);

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
var asciidocUrl = /* @__PURE__ */ getUrl(
  "@asciidoctor/core@2.2.8/dist/browser/asciidoctor.js"
);
var assemblyscriptLoaderUrl = /* @__PURE__ */ getUrl(
  "@assemblyscript/loader@0.27.29/umd/index.js"
);
var astroBaseUrl = /* @__PURE__ */ getUrl("@hatemhosny/astro-internal@0.0.4/");
var babelUrl = /* @__PURE__ */ getUrl("@babel/standalone@7.26.4/babel.js");
var biwaschemeUrl = /* @__PURE__ */ getUrl("biwascheme@0.8.0/release/biwascheme.js");
var browserJestUrl = /* @__PURE__ */ getUrl(
  "@live-codes/browser-jest@0.0.3/dist/browser-jest.umd.js"
);
var brythonBaseUrl = /* @__PURE__ */ getUrl("brython@3.12.4/");
var chaiUrl = /* @__PURE__ */ getModuleUrl("chai@5.1.2");
var cherryCljsBaseUrl = /* @__PURE__ */ getUrl("cherry-cljs@0.2.19/");
var clioBaseUrl = /* @__PURE__ */ getUrl(
  "@live-codes/clio-browser-compiler@0.0.3/public/build/"
);
var coffeeScriptUrl = /* @__PURE__ */ getUrl(
  "coffeescript@2.7.0/lib/coffeescript-browser-compiler-legacy/coffeescript.js"
);
var dotUrl = /* @__PURE__ */ getUrl("dot@1.1.3/doT.js");
var ejsUrl = /* @__PURE__ */ getUrl("ejs@3.1.10/ejs.js");
var esModuleShimsPath = "es-module-shims@1.10.0/dist/es-module-shims.js";
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
var jsclUrl = /* @__PURE__ */ getUrl(
  "gh:jscl-project/jscl-project.github.io@058adc599f0d012718ef3ad28e704a92c4dd741e/jscl.js"
);
var liquidJsUrl = /* @__PURE__ */ getUrl("liquidjs@10.14.0/dist/liquid.browser.min.js");
var localforageUrl = /* @__PURE__ */ getUrl("localforage@1.10.0/dist/localforage.min.js");
var luaUrl = /* @__PURE__ */ getUrl("fengari-web@0.1.4/dist/fengari-web.js");
var lunaConsoleStylesUrl = /* @__PURE__ */ getUrl("luna-console@1.3.3/luna-console.css");
var lunaDataGridStylesUrl = /* @__PURE__ */ getUrl(
  "luna-data-grid@0.5.1/luna-data-grid.css"
);
var lunaDomViewerStylesUrl = /* @__PURE__ */ getUrl(
  "luna-dom-viewer@1.2.4/luna-dom-viewer.css"
);
var lunaObjViewerStylesUrl = /* @__PURE__ */ getUrl(
  "luna-object-viewer@0.2.4/luna-object-viewer.css"
);
var malinaBaseUrl = /* @__PURE__ */ getUrl(`malinajs@0.7.19/`);
var markedUrl = /* @__PURE__ */ getUrl("marked@13.0.2/marked.min.js");
var mjmlUrl = /* @__PURE__ */ getUrl("mjml-browser@4.15.3/lib/index.js");
var mustacheUrl = /* @__PURE__ */ getUrl("mustache@4.2.0/mustache.js");
var normalizeCssUrl = /* @__PURE__ */ getUrl("normalize.css@8.0.1/normalize.css");
var nunjucksBaseUrl = /* @__PURE__ */ getUrl("nunjucks@3.2.4/browser/");
var opalBaseUrl = /* @__PURE__ */ getUrl("https://cdn.opalrb.com/opal/1.8.2/");
var parinferUrl = /* @__PURE__ */ getUrl("parinfer@3.13.1/parinfer.js");
var postcssImportUrlUrl = /* @__PURE__ */ getUrl(
  "@live-codes/postcss-import-url@0.1.2/dist/postcss-import-url.js"
);
var prettierBaseUrl = /* @__PURE__ */ getUrl("prettier@3.3.2/");
var prettierPhpUrl = /* @__PURE__ */ getUrl("@prettier/plugin-php@0.22.2/standalone.js");
var requireUrl = /* @__PURE__ */ getUrl("requirejs@2.3.6/require.js");
var resetCssUrl = /* @__PURE__ */ getUrl("reset-css@5.0.1/reset.css");
var riotBaseUrl = /* @__PURE__ */ getUrl("riot@9.2.2/");
var rubyWasmScriptUrl = /* @__PURE__ */ getUrl(
  "@ruby/wasm-wasi@2.6.2/dist/browser.umd.js"
);
var snackbarUrl = /* @__PURE__ */ getUrl("@snackbar/core@1.7.0/dist/snackbar.css");
var spacingJsUrl = /* @__PURE__ */ getUrl("spacingjs@1.0.7/dist/bundle.js");
var sqlFormatterUrl = /* @__PURE__ */ getUrl(
  "sql-formatter@12.2.1/dist/sql-formatter.min.js"
);
var sqljsBaseUrl = /* @__PURE__ */ getUrl("sql.js@1.10.3/dist/");
var squintCljsBaseUrl = /* @__PURE__ */ getUrl("squint-cljs@0.4.81/");
var stencilUrl = /* @__PURE__ */ getUrl("@stencil/core@3.2.2/compiler/stencil.js");
var stylisUrl = /* @__PURE__ */ getUrl("stylis@4.3.2/dist/umd/stylis.js");
var svelteBaseUrl = /* @__PURE__ */ getUrl("svelte@5.12.0/");
var tauPrologBaseUrl = /* @__PURE__ */ getUrl("tau-prolog@0.3.4/modules/");
var twigUrl = /* @__PURE__ */ getUrl("twig@1.17.1/twig.min.js");
var typescriptUrl = /* @__PURE__ */ getUrl(`typescript@5.6.2/lib/typescript.js`);
var uniterUrl = /* @__PURE__ */ getUrl("uniter@2.18.0/dist/uniter.js");
var vue2CdnUrl = /* @__PURE__ */ getUrl("vue@2");
var vueRuntimeUrl = /* @__PURE__ */ getUrl("vue@3/dist/vue.runtime.esm-browser.prod.js");
var vueSDKUrl = /* @__PURE__ */ getUrl(`livecodes@${"0.12.0"}/vue.js`);
var vueSfcLoaderCdnBaseUrl = /* @__PURE__ */ getUrl("vue3-sfc-loader@0.9.5/dist/");
var wabtjsUrl = /* @__PURE__ */ getUrl("wabt@1.0.35/index.js");
var wasmoonUrl = /* @__PURE__ */ getUrl("wasmoon@1.16.0/dist/index.js");

// src/livecodes/UI/loading.ts
var loadingMessage = (message = window.deps.translateString("generic.loading", "Loading...")) => {
  const loadingDiv = document.createElement("div");
  loadingDiv.innerHTML = message;
  loadingDiv.classList.add("modal-message");
  return loadingDiv;
};

// src/livecodes/UI/selectors.ts
var getProjectTitleElement = () => document.querySelector("#project-title");
var getMarkupElement = () => document.querySelector("#markup");
var getStyleElement = () => document.querySelector("#style");
var getScriptElement = () => document.querySelector("#script");
var getResultElement = () => document.querySelector("#result");
var getResultIFrameElement = () => document.querySelector("#result > iframe");
var getLogoLink = () => document.querySelector("a#logo");
var getLightThemeButton = () => document.querySelector("#light-theme-button");
var getDarkThemeButton = () => document.querySelector("#dark-theme-button");
var getEditorToolbar = () => document.querySelector("#editor-tools");
var getFormatButton = () => document.querySelector("#editor-tools #format-btn");
var getEditorModeNode = () => document.querySelector("#editor-mode");
var getExternalResourcesBtn = () => document.querySelector("#editor-tools #external-resources-btn");
var getProjectInfoBtn = () => document.querySelector("#editor-tools #project-info-btn");
var getCustomSettingsBtn = () => document.querySelector("#editor-tools #custom-settings-btn");
var getResultButton = () => document.querySelector("#result-button");
var getEditorTitles = () => document.querySelectorAll(".editor-title:not(.hidden)");
var getEditorDivs = () => document.querySelectorAll("#editors > .editor");
var getToolspaneLoader = () => document.querySelector("#tools-pane-loading");
var getZoomButtonValue = () => document.querySelector("#zoom-button #zoom-value");
var getModalSaveButton = () => document.querySelector("#modal #prompt-save-btn");
var getModalDoNotSaveButton = () => document.querySelector("#modal #prompt-donot-save-btn");
var getModalCancelButton = () => document.querySelector("#modal #prompt-cancel-btn");
var getModalRecoverButton = () => document.querySelector("#modal #prompt-recover-btn");
var getModalSavePreviousButton = () => document.querySelector("#modal #prompt-save-previous-btn");
var getModalCancelRecoverButton = () => document.querySelector("#modal #prompt-cancel-recover-btn");
var getModalUnsavedName = () => document.querySelector("#modal #unsaved-project-name");
var getModalUnsavedLastModified = () => document.querySelector("#modal #unsaved-project-last-modified");
var getModalDisableRecoverCheckbox = () => document.querySelector("#modal #disable-recover-checkbox");
var getThemeColorSelector = () => document.querySelector("#app-menu-settings #theme-color-selector");
var getLoginLink = () => document.querySelector("#login-link");
var getLogoutLink = () => document.querySelector("#logout-link");
var getAutoupdateToggle = () => document.querySelector("#app-menu-settings input#autoupdate");
var getDelayValue = () => document.querySelector("#app-menu-settings #delay-value");
var getDelayRange = () => document.querySelector("#app-menu-settings input#delay-range");
var getAutosaveToggle = () => document.querySelector("#app-menu-settings input#autosave");
var getAutosyncToggle = () => document.querySelector("#app-menu-settings input#autosync");
var getFormatOnsaveToggle = () => document.querySelector("#app-menu-settings input#formatOnsave");
var getProcessorToggles = () => document.querySelectorAll("#style-selector input");
var getThemeToggle = () => document.querySelector("#app-menu-settings input#theme");
var getLayoutToggle = () => document.querySelector("#app-menu-settings input#layout");
var getShowWelcomeToggle = () => document.querySelector("#app-menu-settings input#welcome");
var getRecoverToggle = () => document.querySelector("#app-menu-settings input#recover-unsaved");
var getSpacingToggle = () => document.querySelector("#app-menu-settings input#show-spacing");
var getCSSPresetLinks = () => document.querySelectorAll("#css-preset-menu a");
var getWatchTestsButton = () => document.querySelector("#test-container #watch-tests-btn");
var getModalWelcomeRecover = (welcomeContainer = document) => welcomeContainer.querySelector("#modal #welcome-recover");
var getNinjaKeys = () => document.querySelector("ninja-keys");
var getResultModeDrawer = () => document.querySelector("#result-mode-drawer");

// src/livecodes/UI/login.ts
var displayLoggedIn = (user) => {
  const loginLink = getLoginLink();
  if (loginLink) {
    loginLink.style.display = "none";
  }
  const logOutLink = getLogoutLink();
  const logOutText = logOutLink?.querySelector("span");
  if (logOutLink && logOutText) {
    const displayName = user.displayName || user.username;
    logOutText.innerHTML = window.deps.translateString("login.logout", "Log out");
    logOutLink.title = window.deps.translateString("login.loginAs", "Logged in as {{name}}", {
      name: displayName
    });
    logOutLink.style.display = "flex";
  }
};

// src/livecodes/utils/get-import-instance.ts
function createInstance(url3) {
  return import(url3);
}
var instancePromise = null;
function getImportInstance(url3) {
  if (!instancePromise) {
    instancePromise = createInstance(url3).catch(() => {
    });
  }
  return instancePromise;
}

// node_modules/split.js/dist/split.es.js
var global2 = typeof window !== "undefined" ? window : null;
var ssr = global2 === null;
var document2 = !ssr ? global2.document : void 0;
var calc = ssr ? "calc" : ["", "-webkit-", "-moz-", "-o-"].filter(function(prefix) {
  var el = document2.createElement("div");
  el.style.cssText = "width:" + prefix + "calc(9px)";
  return !!el.style.length;
}).shift() + "calc";

// src/livecodes/events/custom-events.ts
var customEvents = {
  init: "livecodes-init",
  getConfig: "livecodes-get-config",
  config: "livecodes-config",
  load: "livecodes-load",
  appLoaded: "livecodes-app-loaded",
  ready: "livecodes-ready",
  change: "livecodes-change",
  testResults: "livecodes-test-results",
  console: "livecodes-console",
  destroy: "livecodes-destroy",
  resizeEditor: "livecodes-resize-editor",
  apiResponse: "livecodes-api-response",
  i18n: "livecodes-i18n"
};

// src/livecodes/events/events.ts
var createEventsManager = () => {
  const events = [];
  const addEventListener2 = (element, eventType, fn, options) => {
    if (!element)
      return;
    element.addEventListener(eventType, fn, options || false);
    events.push({
      element,
      eventType,
      fn
    });
  };
  const removeEventListener2 = (element, eventType, fn) => {
    if (!element)
      return;
    element.removeEventListener(eventType, fn);
    const event = events.find(
      (ev) => ev.element === element && ev.eventType === eventType && ev.fn === fn
    );
    if (!event)
      return;
    events.splice(events.indexOf(event));
  };
  const removeEventListeners = () => {
    events.forEach((event) => {
      event.element.removeEventListener(event.eventType, event.fn);
      events.splice(events.indexOf(event));
    });
  };
  return {
    addEventListener: addEventListener2,
    removeEventListener: removeEventListener2,
    removeEventListeners
  };
};

// src/livecodes/events/pub.ts
var createPub = () => {
  const subscribers = [];
  const subscribe = (fn) => {
    subscribers.push(fn);
    return {
      unsubscribe: () => {
        subscribers.splice(subscribers.indexOf(fn), 1);
      }
    };
  };
  const notify = (data) => {
    subscribers.forEach((fn) => {
      fn(data);
    });
  };
  const unsubscribeAll = () => {
    subscribers.length = 0;
  };
  const hasSubscribers = () => subscribers.length > 0;
  return {
    subscribe,
    notify,
    hasSubscribers,
    unsubscribeAll
  };
};

// src/livecodes/i18n/app-languages.ts
var appLanguages = {
  ar: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
  de: "Deutsch",
  en: "English",
  es: "Espa\xF1ol",
  fa: "\u0641\u0627\u0631\u0633\u06CC",
  fr: "Fran\xE7ais",
  hi: "\u0939\u093F\u0902\u0926\u0940",
  it: "Italiano",
  ja: "\u65E5\u672C\u8A9E",
  pt: "Portugu\xEAs",
  ru: "\u0420\u0443\u0301\u0441\u0441\u043A\u0438\u0439",
  ur: "\u0627\u0631\u062F\u0648",
  "zh-CN": "\u4E2D\u6587\uFF08\u7B80\u4F53\uFF09"
};

// src/livecodes/languages/css-presets.ts
var cssPresets = [
  {
    id: "normalize.css",
    name: "Normalize.css",
    url: normalizeCssUrl
  },
  {
    id: "reset-css",
    name: "CSS reset",
    url: resetCssUrl
  }
];

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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-art-template-compiler.js");
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
var getLanguageTitle = (language) => {
  const languageSpecs = window.deps.languages.find((lang) => lang.name === language);
  return languageSpecs?.longTitle || languageSpecs?.title || language.toUpperCase();
};
var getLanguageEditorId = (alias = "") => window.deps.languages.find((lang) => lang.name === getLanguageByAlias(alias))?.editor;
var getLanguageExtension = (alias = "") => window.deps.languages.find((lang) => lang.name === getLanguageByAlias(alias))?.extensions[0];
var getLanguageSpecs = (alias = "") => window.deps.languages.find((lang) => lang.name === getLanguageByAlias(alias));
var getLanguageCompiler = (alias = "") => {
  const languageSpecs = getLanguageSpecs(alias);
  let compiler2 = languageSpecs?.compiler;
  if (typeof compiler2 === "string") {
    compiler2 = getLanguageCompiler(compiler2);
  }
  return compiler2;
};
var mapLanguage = (language) => getLanguageSpecs(language)?.editorLanguage || language;
var languageIsEnabled = (language, config) => {
  const lang = getLanguageByAlias(language);
  if (!lang)
    return false;
  if (!config.languages)
    return true;
  if (["javascript", "typescript"].includes(lang) && ["javascript", "typescript"].includes(mapLanguage(lang))) {
    return true;
  }
  return config.languages?.map(getLanguageByAlias).filter(Boolean).includes(lang);
};
var processorIsEnabled = (processor, config) => {
  if (!window.deps.processors.map((p) => p.name).includes(processor))
    return false;
  if (!config.languages)
    return true;
  return config.languages.includes(processor);
};
var processorIsActivated = (processor, config) => config.processors.includes(processor);
var getActivatedProcessors = (language, config) => {
  const editorId = getLanguageEditorId(language);
  if (!editorId)
    return "";
  return window.deps.processors.filter((p) => p.editor === editorId).map((p) => p.name).filter((p) => processorIsEnabled(p, config)).filter((p) => processorIsActivated(p, config)).join("-");
};
var getCustomSettings = (language, config) => {
  const settings = {
    ...getLanguageCustomSettings(language, config)
  };
  if (getLanguageEditorId(language) === "markup") {
    settings.template = config.customSettings.template;
  }
  return settings;
};

// src/livecodes/languages/asciidoc/lang-asciidoc.ts
var asciidoc = {
  name: "asciidoc",
  title: "AsciiDoc",
  compiler: {
    url: asciidocUrl,
    factory: () => {
      const asciidoctor = window.Asciidoctor();
      return async (code, { config }) => asciidoctor.convert(code, {
        standalone: true,
        attributes: { nofooter: true },
        ...getLanguageCustomSettings("asciidoc", config)
      });
    }
  },
  extensions: ["adoc", "asciidoc", "asc"],
  editor: "markup"
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-assemblyscript-compiler.js");
      return self.createAssemblyscriptCompiler();
    },
    scripts: ({ baseUrl: baseUrl2 }) => [
      assemblyscriptLoaderUrl,
      baseUrl2 + "lang-assemblyscript-script.js"
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-astro-compiler.js");
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

// src/livecodes/languages/blockly/lang-blockly.ts
var blockly = {
  name: "blockly",
  title: "Blockly",
  compiler: {
    factory: () => async (_code, { options }) => options?.blockly?.js || ""
  },
  extensions: ["blockly.xml", "xml"],
  editor: "script",
  editorLanguage: "xml"
};

// src/livecodes/languages/civet/lang-civet.ts
var civetUrl = vendorsBaseUrl + "civet/civet.js";
var civet = {
  name: "civet",
  title: "Civet",
  compiler: {
    url: civetUrl,
    factory: () => async (code) => window.civet.compile(code, { js: true })
  },
  extensions: ["civet"],
  editor: "script",
  editorLanguage: "coffeescript"
};

// src/livecodes/languages/clio/lang-clio.ts
var clio = {
  name: "clio",
  title: "Clio",
  compiler: {
    url: clioBaseUrl + "compile.js",
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-clio-compiler.js");
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
  const handler2 = async function(ev) {
    const message = ev.data.payload;
    if (ev.data.trigger === "compileInCompiler" && message?.content === content && message?.language === language) {
      worker.removeEventListener("message", handler2);
      resolve(getCompileResult(message.compiled));
    }
  };
  worker.addEventListener("message", handler2);
  worker.postMessage({
    type: "compileInCompiler",
    payload: { content, language, config, options }
  });
});

// src/livecodes/compiler/import-map.ts
var importsPattern = /(import\s+?(?:(?:(?:[\w*\s{},\$]*)\s+from\s+?)|))((?:".*?")|(?:'.*?'))([\s]*?(?:;|$|))/g;
var dynamicImportsPattern = /(import\s*?\(\s*?((?:".*?")|(?:'.*?'))\s*?\))/g;
var getImports = (code, removeSpecifier2 = false) => [
  ...[...removeComments(code).matchAll(new RegExp(importsPattern))],
  ...[...removeComments(code).matchAll(new RegExp(dynamicImportsPattern))]
].map((arr) => arr[2].replace(/"/g, "").replace(/'/g, "")).map((mod) => {
  if (!removeSpecifier2 || !isBare(mod) || !mod.includes(":")) {
    return mod;
  }
  return mod.split(":")[1];
});
var needsBundler = (mod) => !mod.startsWith("https://deno.bundlejs.com/") && !mod.startsWith("https://edge.bundlejs.com/") && !mod.startsWith("https://esm.sh/") && !mod.endsWith("#nobundle") && (mod.startsWith("https://deno.land/") || mod.startsWith("https://github.com/") || mod.startsWith("https://raw.githubusercontent.com/") || mod.startsWith("https://gitlab.com/") || mod.startsWith("https://bitbucket.org") || mod.endsWith(".ts") || mod.endsWith(".jsx") || mod.endsWith(".tsx"));
var isBare = (mod) => !mod.startsWith("https://") && !mod.startsWith("http://") && !mod.startsWith(".") && !mod.startsWith("/") && !mod.startsWith("data:") && !mod.startsWith("blob:");
var isStylesheet = (mod) => (mod.endsWith(".css") || mod.endsWith(".scss") || mod.endsWith(".sass") || mod.endsWith(".less") || mod.endsWith(".styl")) && !mod.startsWith("./style");
var findImportMapKey = (mod, importmap) => Object.keys(importmap).find((key) => key === mod || mod.startsWith(key + "/"));
var createImportMap = (code, config, { fallbackToCdn = true, external } = {}) => getImports(code).map((libName) => {
  if (!needsBundler(libName) && !isBare(libName) || isStylesheet(libName)) {
    return {};
  } else {
    const imports = { ...config.imports, ...config.customSettings?.imports };
    const key = findImportMapKey(libName, imports);
    if (key) {
      return { [key]: imports[key] };
    }
    if (!fallbackToCdn) {
      return {};
    }
    return {
      [libName]: modulesService.getModuleUrl(libName, {
        defaultCDN: config?.customSettings?.defaultCDN,
        external
      })
    };
  }
}).reduce((acc, curr) => ({ ...acc, ...curr }), {});
var hasImports = (code) => getImports(code).length > 0;
var hasExports = (code) => new RegExp(/(^export\s)|([\s|;]export\s)/).test(removeCommentsAndStrings(code));
var hasDefaultExport = (code) => new RegExp(/export\s*default\s/).test(code);
var hasAwait = (code) => new RegExp(/(^await\s)|([\s|;]await\s)/).test(removeCommentsAndStrings(code));
var isModuleScript = (code) => hasImports(code) || hasExports(code) || hasAwait(code);
var replaceImports = (code, config, { importMap, external } = {}) => {
  importMap = importMap || createImportMap(code, config, { external });
  return code.replace(new RegExp(importsPattern), (statement) => {
    if (!importMap) {
      return statement;
    }
    const libName = statement.replace(new RegExp(importsPattern), "$2").replace(/"/g, "").replace(/'/g, "");
    const key = findImportMapKey(libName, importMap);
    if (!key) {
      return statement;
    }
    return statement.replace(key, importMap[key]);
  });
};
var isScriptImport = (mod) => mod.toLowerCase().startsWith("./script") || mod.toLowerCase().startsWith("./component") || mod.startsWith("./") && (mod.toLowerCase().endsWith(".js") || mod.toLowerCase().endsWith(".ts") || mod.toLowerCase().endsWith(".jsx") || mod.toLowerCase().endsWith(".tsx") || mod.toLowerCase().endsWith(".vue") || mod.toLowerCase().endsWith(".svelte"));
var styleimportsPattern = /(?:@import\s+?)((?:".*?")|(?:'.*?')|(?:url\('.*?'\))|(?:url\(".*?"\)))(.*)?;/g;
var hasStyleImports = (code) => new RegExp(styleimportsPattern).test(code);
var cjs2esm = (code) => {
  const strippedCode = removeComments(code);
  if (!/\b(require|module|exports)\b/.test(strippedCode))
    return code;
  const requirePattern = /(?:^|\s)require(?:\s*)\((?:\s*)('(.*?)'|"(.*?)")(?:\s*)\)/g;
  const getRequires = (str) => [...str.matchAll(new RegExp(requirePattern))].map(
    (arr) => arr[1].replace(/"/g, "").replace(/'/g, "")
  );
  const requires = getRequires(strippedCode);
  if (requires.length === 0)
    return code;
  const imports = requires.map(
    (id2, i) => [
      `import * as __requires_${i} from '${id2}';`,
      `const __requires_${i}_default = __requires_${i}.default;`
    ].join("\n")
  ).join("\n");
  const lookup = `const __requires_lookup = { ${requires.map((id2, i) => `'${id2}': __requires_${i}_default || __requires_${i}`).join(", ")} };`;
  const require2 = `window.require = window.require || ((id) => {
	if (id in __requires_lookup) return __requires_lookup[id];
	throw new Error(\`Cannot require modules dynamically (\${id})\`);
});`;
  return [
    imports,
    lookup,
    require2,
    `const exports = {}; const module = { exports };`,
    code,
    `export default module.exports;`
  ].join("\n\n");
};
var createCSSModulesImportMap = (compiledScript, compiledStyle, cssTokens = {}, extension = "css") => {
  const scriptImports = getImports(compiledScript);
  const extensions = extension === "css" ? [extension] : ["css", extension];
  const filenames = [
    ...extensions.map((ext) => "./style." + ext),
    ...extensions.map((ext) => "./styles." + ext),
    ...extensions.map((ext) => "./style.module." + ext),
    ...extensions.map((ext) => "./styles.module." + ext)
  ];
  return filenames.map((filename) => {
    if (!scriptImports.includes(filename)) {
      return {};
    }
    if (!filename.includes(".module.")) {
      return {
        [filename]: toDataUrl(`export default \`${escapeCode(compiledStyle)}\`;`)
      };
    }
    const cssModule = `export default ${escapeCode(JSON.stringify(cssTokens))};
` + Object.keys(cssTokens).filter((key) => key === toCamelCase(key)).map((key) => `export const ${escapeCode(key)} = "${escapeCode(cssTokens[key])}";`).join("\n");
    return { [filename]: toDataUrl(cssModule) };
  }).reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

// src/livecodes/compiler/get-all-compilers.ts
var getAllCompilers = (languages2, config, baseUrl2) => languages2.filter(
  (language) => window.deps.processors.includes(language) || languageIsEnabled(language.name, config)
).reduce((compilers, language) => {
  if (language.compiler && !compilers[language.name]) {
    if (typeof language.compiler === "string") {
      const compiler2 = languages2.find((lang) => lang.name === language.compiler)?.compiler;
      compilers[language.name] = {
        ...compiler2,
        url: getCompilerUrl(compiler2.url, baseUrl2),
        aliasTo: language.compiler
      };
    } else {
      compilers[language.name] = {
        ...language.compiler,
        url: getCompilerUrl(language.compiler.url, baseUrl2)
      };
    }
  }
  return compilers;
}, {});
var getCompilerUrl = (url3, baseUrl2) => !url3 ? "" : isRelativeUrl(url3) ? baseUrl2 + url3 : url3;

// src/livecodes/services/allowed-origin.ts
var allowedOrigin = (origin = location.origin) => Boolean(
  origin && (origin.endsWith("livecodes.io") || origin.endsWith("livecodes.pages.dev") || origin.endsWith("localpen.pages.dev") || origin.includes("127.0.0.1") || origin.includes("localhost:") || origin.endsWith("localhost") || origin.endsWith(".test"))
);

// src/livecodes/utils/compression.ts
var import_lz_string2 = __toESM(require_lz_string());
var compress = import_lz_string2.compressToEncodedURIComponent;
var decompress = (compressed, isJSON = true) => {
  const decoded = (0, import_lz_string2.decompressFromEncodedURIComponent)(compressed);
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
  return (0, import_lz_string2.decompressFromBase64)(compressed);
};

// src/livecodes/storage/fake-storage.ts
var fakeStorage = {
  getList: async () => [],
  getAllData: async () => [],
  getItem: async () => null,
  addItem: async () => "",
  updateItem: async () => "",
  deleteItem: async () => void 0,
  bulkInsert: async () => void 0,
  restore: async () => void 0,
  clear: async () => void 0,
  subscribe: () => ({ unsubscribe: () => void 0 }),
  unsubscribeAll: () => void 0
};
var fakeSimpleStorage = {
  getValue: () => null,
  setValue: () => void 0,
  clear: () => void 0,
  subscribe: () => ({ unsubscribe: () => void 0 }),
  unsubscribeAll: () => void 0
};

// src/livecodes/storage/storage.ts
var localforage;
var dbName = "livecodes";
var stores = {};
var generateId = () => (Date.now() + "" + Math.floor(Math.floor(Math.random() * Date.now()))).substring(0, 24);
var loadLocalforage = async (store) => {
  if (!localforage) {
    localforage = await loadScript(localforageUrl, "localforage");
    localforage.config({
      name: dbName
    });
  }
  if (!stores[store]) {
    stores[store] = localforage.createInstance({
      name: dbName,
      storeName: store
    });
  }
};
var createStorage = async (name, isEmbed2) => {
  if (isEmbed2)
    return fakeStorage;
  let store;
  const pub = createPub();
  const subscribe = (fn) => pub.subscribe(fn);
  const unsubscribeAll = () => {
    pub.unsubscribeAll();
  };
  const notifyPub = () => {
    if (pub.hasSubscribers()) {
      getAllData().then((data) => {
        pub.notify(data);
      });
    }
  };
  const load = async () => {
    await loadLocalforage(name);
    store = stores[name];
  };
  const getList = async () => {
    await load();
    return store.keys();
  };
  const getAllData = async () => {
    await load();
    const list = [];
    await store.iterate((item) => {
      list.push(item);
    });
    return list.sort(
      (a, b) => b.lastModified && a.lastModified ? b.lastModified - a.lastModified : 0
    );
  };
  const getItem = async (id2) => {
    await load();
    return store.getItem(id2);
  };
  const updateItem = async (id2, value, notify = true) => {
    await load();
    await store.setItem(id2, value);
    if (notify) {
      notifyPub();
    }
    return id2;
  };
  const addItem = async (value, notify = true) => {
    const id2 = generateId();
    await updateItem(id2, value, notify);
    return id2;
  };
  const deleteItem = async (id2) => {
    await load();
    await store.removeItem(id2);
    notifyPub();
  };
  const bulkInsert = async (data) => {
    for (const item of data) {
      await addItem(item, false);
    }
    notifyPub();
  };
  const restore = async (data) => {
    for (const item of data) {
      if (item.id) {
        await updateItem(item.id, item, false);
      } else {
        await addItem(item, false);
      }
    }
    notifyPub();
  };
  const clear = async () => {
    await load();
    await store.clear();
    notifyPub();
  };
  return {
    getList,
    getAllData,
    getItem,
    addItem: (value) => addItem(value),
    updateItem: (id2, value) => updateItem(id2, value),
    deleteItem,
    bulkInsert,
    restore,
    clear,
    subscribe,
    unsubscribeAll
  };
};

// src/livecodes/storage/encrypt.ts
var keyStorage;
var loadStorage = async () => {
  keyStorage = keyStorage || await createStorage("__livecodes_key__", false);
};
var encode2 = (text) => {
  const enc = new TextEncoder();
  return enc.encode(text);
};
var decode = (encoded) => {
  const dec = new TextDecoder();
  return dec.decode(encoded);
};
var saveKey = async (key) => {
  await loadStorage();
  await keyStorage.updateItem("__livecodes_key_id__", compress(key));
};
var loadKey = async () => {
  await loadStorage();
  const key = await keyStorage.getItem("__livecodes_key_id__");
  return key ? decompress(key) : null;
};
var generateKey = async () => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256"
    },
    true,
    ["encrypt", "decrypt"]
  );
  const publicKey = await crypto.subtle.exportKey("jwk", keyPair.publicKey);
  const privateKey = await crypto.subtle.exportKey("jwk", keyPair.privateKey);
  const keyString = JSON.stringify({ public: publicKey, private: privateKey });
  await saveKey(keyString);
  return keyString;
};
var importKey = async (key) => crypto.subtle.importKey(
  "jwk",
  JSON.parse(await loadKey() || await generateKey())[key],
  {
    name: "RSA-OAEP",
    hash: "SHA-256"
  },
  true,
  key === "public" ? ["encrypt"] : ["decrypt"]
);
var encrypt = async (text) => {
  const encoded = encode2(text);
  const importedKey = await importKey("public");
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    importedKey,
    encoded
  );
  return JSON.stringify(Array.from(new Uint8Array(encrypted)));
};
var decrypt = async (encrypted) => {
  try {
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "RSA-OAEP"
      },
      await importKey("private"),
      new Uint8Array(JSON.parse(encrypted))
    );
    return decode(decrypted);
  } catch {
    return null;
  }
};

// src/livecodes/storage/project-storage.ts
var createProjectStorage = async (name, isEmbed2) => {
  const storage = await createStorage(name, isEmbed2);
  const getList = async () => (await storage.getAllData()).map((item) => ({
    id: item.id,
    title: item.config?.title || "",
    description: item.config?.description || "",
    tags: item.config?.tags || [],
    languages: item.config ? [item.config.markup.language, item.config.style.language, item.config.script.language] : [],
    lastModified: item.lastModified
  })).sort((a, b) => b.lastModified - a.lastModified);
  const updateItem = (id2, config) => {
    const newItem = {
      id: id2,
      config,
      lastModified: Date.now()
    };
    return storage.updateItem(id2, newItem);
  };
  const addItem = async (config) => {
    const id2 = generateId();
    return updateItem(id2, config);
  };
  const bulkInsert = async (newProjects) => {
    for (const config of newProjects) {
      await addItem(config);
    }
  };
  return {
    ...storage,
    getList,
    addItem,
    updateItem,
    bulkInsert
  };
};

// src/livecodes/storage/simple-storage.ts
var createSimpleStorage = (name, isEmbed2) => {
  if (isEmbed2)
    return fakeSimpleStorage;
  const pub = createPub();
  const subscribe = (fn) => pub.subscribe(fn);
  const unsubscribeAll = () => {
    pub.unsubscribeAll();
  };
  const notifyPub = () => {
    pub.notify(getValue());
  };
  const setValue = (value) => {
    window.localStorage.setItem(name, JSON.stringify(value));
    notifyPub();
  };
  const getValue = () => {
    const value = window.localStorage.getItem(name);
    if (!value)
      return null;
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  };
  const clear = () => {
    setValue(null);
    notifyPub();
  };
  return {
    getValue,
    setValue,
    clear,
    subscribe,
    unsubscribeAll
  };
};

// src/livecodes/storage/stores.ts
var createStores = () => cloneObject({
  projects: null,
  templates: null,
  assets: null,
  snippets: null,
  recover: null,
  userConfig: null,
  userData: null,
  appData: null,
  sync: null
});
var initializeStores = async (stores3, isEmbed2) => {
  if (isEmbed2)
    return;
  stores3.projects = await createProjectStorage("__livecodes_data__", isEmbed2);
  stores3.templates = await createProjectStorage("__livecodes_templates__", isEmbed2);
  stores3.assets = await createStorage("__livecodes_assets__", isEmbed2);
  stores3.snippets = await createStorage("__livecodes_snippets__", isEmbed2);
  stores3.recover = createSimpleStorage("__livecodes_project_recover__", isEmbed2);
  stores3.userConfig = createSimpleStorage("__livecodes_user_config__", isEmbed2);
  stores3.userData = await createStorage("__livecodes_user_data__", isEmbed2);
  stores3.appData = createSimpleStorage("__livecodes_app_data__", isEmbed2);
  stores3.sync = await createStorage("__livecodes_sync_data__", isEmbed2);
};

// src/livecodes/services/auth.ts
var fakeAuthService = {
  load: async () => {
  },
  getUser: async () => {
  },
  signIn: async () => {
  },
  signOut: async () => {
  },
  isLoggedIn: () => false
};
var createAuthService = (isEmbed2) => {
  if (isEmbed2)
    return fakeAuthService;
  let initializeApp;
  let getApp;
  let getAuth;
  let signInWithPopup;
  let signOut;
  let GithubAuthProvider;
  let firebaseConfig;
  let firebaseApp;
  let auth;
  let currentUser;
  return {
    async load() {
      const firebase = await getImportInstance("./firebase.js");
      initializeApp = firebase.initializeApp;
      getApp = firebase.getApp;
      getAuth = firebase.getAuth;
      signInWithPopup = firebase.signInWithPopup;
      signOut = firebase.signOut;
      GithubAuthProvider = firebase.GithubAuthProvider;
      firebaseConfig = firebase.firebaseConfig;
      try {
        firebaseApp = getApp();
      } catch {
        firebaseApp = initializeApp(firebaseConfig);
      }
      auth = getAuth(firebaseApp);
      currentUser = auth.currentUser;
    },
    async getUser() {
      if (!auth) {
        await this.load();
      }
      const token = await getToken(currentUser?.uid);
      if (currentUser) {
        if (!token)
          return;
        return Promise.resolve(await getUserInfo(currentUser));
      }
      return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (!user) {
            resolve(void 0);
          } else {
            currentUser = user;
            unsubscribe();
            resolve(await getUserInfo(currentUser));
          }
        });
      });
    },
    async signIn(scopes = ["gist", "repo"]) {
      if (!auth) {
        await this.load();
      }
      const provider = new GithubAuthProvider();
      scopes.forEach((scope) => provider.addScope(scope));
      const result = await signInWithPopup(auth, provider);
      const token = GithubAuthProvider.credentialFromResult(result)?.accessToken;
      if (!token)
        return;
      currentUser = result.user;
      await saveToken(currentUser.uid, token);
      await fetchUserName(currentUser);
      return getUserInfo(result.user);
    },
    async signOut() {
      if (!auth) {
        await this.load();
      }
      await signOut(auth);
      deleteUserData(currentUser?.uid);
      currentUser = null;
    },
    isLoggedIn() {
      return currentUser != null;
    }
  };
};
var saveToken = async (uid, token) => {
  localStorage.setItem("token_" + uid, await encrypt(token));
};
var getToken = async (uid) => {
  if (!uid)
    return null;
  const token = localStorage.getItem("token_" + uid);
  if (!token)
    return null;
  return decrypt(token);
};
var saveUsername = (uid, username) => {
  localStorage.setItem("username_" + uid, username);
};
var deleteUserData = (uid) => {
  if (!uid)
    return;
  localStorage.removeItem("token_" + uid);
  localStorage.removeItem("username_" + uid);
};
var getUserInfo = async (user) => ({
  uid: user.uid,
  displayName: user.displayName,
  username: await fetchUserName(user),
  email: user.email,
  photoURL: user.photoURL,
  token: await getToken(user.uid)
});
var fetchUserName = async (user) => {
  const uid = user.uid;
  const fromLocalStorage = localStorage.getItem("username_" + uid);
  if (fromLocalStorage) {
    return fromLocalStorage;
  }
  const fromUserInfo = user.reloadUserInfo?.screenName;
  if (fromUserInfo) {
    saveUsername(uid, fromUserInfo);
    return fromUserInfo;
  }
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: "token " + await getToken(uid)
    }
  });
  const userInfo = await response.json();
  const login = userInfo.login;
  saveUsername(uid, login);
  return login;
};

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
  getProject: async (id2) => {
    try {
      const res = await fetch(dpasteGetUrl + id2 + ".txt");
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
  getProject: async (id2) => {
    if (id2.length < 11)
      return dpasteService.getProject(id2);
    try {
      const res = await fetch(apiUrl + "?id=" + id2);
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

// src/livecodes/compiler/compiler-sandbox.ts
var createCompilerSandbox = (sandboxUrl) => new Promise((resolve) => {
  const frameId = "compiler-frame";
  const previousFrame = document.getElementById(frameId);
  previousFrame?.remove();
  const iframe = document.createElement("iframe");
  iframe.name = "compiler";
  iframe.id = frameId;
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.visibility = "hidden";
  iframe.style.position = "absolute";
  iframe.setAttribute("sandbox", "allow-same-origin allow-scripts");
  iframe.src = sandboxUrl;
  document.body.appendChild(iframe);
  iframe.onload = () => {
    resolve(iframe.contentWindow);
  };
});

// src/livecodes/compiler/create-compiler.ts
var createCompiler = async ({
  config,
  baseUrl: baseUrl2,
  eventsManager: eventsManager2
}) => {
  let compilers;
  let compilerSandbox;
  const compilerOrigin = sandboxService.getOrigin();
  let reloads = 3;
  const initialize = async () => new Promise(async (resolve) => {
    compilers = getAllCompilers(
      [...window.deps.languages, ...window.deps.processors],
      config,
      baseUrl2
    );
    const compilerUrl2 = sandboxService.getCompilerUrl() + "?appCDN=" + getAppCDN();
    compilerSandbox = await createCompilerSandbox(compilerUrl2);
    eventsManager2.addEventListener(window, "message", async (event) => {
      if (event.origin === compilerOrigin && event.source === compilerSandbox && event.data.type === "init-success") {
        resolve("done");
      }
    });
    const configMessage = {
      type: "init",
      payload: config,
      baseUrl: baseUrl2,
      scriptUrl: baseUrl2 + "compiler-utils.js"
    };
    compilerSandbox.postMessage(configMessage, compilerOrigin);
  });
  const createLanguageCompiler = (language) => (content, { config: config2, options }) => new Promise((resolve, reject) => {
    const handler2 = (event) => {
      const message = event.data;
      if (event.origin === compilerOrigin && event.source === compilerSandbox && message.from === "compiler" && (message.type === "compiled" || message.type === "compile-failed") && message.payload.language === language && message.payload.content === content) {
        window.removeEventListener("message", handler2);
        if (message.type === "compiled") {
          resolve(message.payload.compiled);
        } else if (message.type === "compile-failed") {
          reject(language + " compile failed.\n" + message.payload.error);
        }
      }
    };
    window.addEventListener("message", handler2);
    const compileMessage = {
      type: "compile",
      payload: { content, language, config: config2, options }
    };
    compilerSandbox.postMessage(compileMessage, compilerOrigin);
  });
  const load = (languages2, config2) => Promise.allSettled(
    languages2.map(
      (language) => new Promise(async (resolve, reject) => {
        if (["jsx", "tsx"].includes(language)) {
          language = "typescript";
        }
        const languageCompiler = compilers[language];
        if (languageCompiler && !languageCompiler.fn) {
          eventsManager2.addEventListener(
            window,
            "message",
            async (event) => {
              if (event.origin === compilerOrigin && event.source === compilerSandbox && event.data.from === "compiler" && event.data.type === "loaded" && event.data.payload === language) {
                languageCompiler.fn = createLanguageCompiler(language);
                resolve("done");
              } else if (event.origin === compilerOrigin && event.source === compilerSandbox && event.data.from === "compiler" && event.data.type === "load-failed" && event.data.payload === language) {
                if (reloads === 0) {
                  reject(`Failed to load compiler for: ${language}.`);
                } else {
                  reloads -= 1;
                  await initialize();
                  await load(
                    Array.from(
                      /* @__PURE__ */ new Set([
                        ...languages2,
                        config2.markup.language,
                        config2.style.language,
                        config2.script.language
                      ])
                    ),
                    config2
                  );
                  resolve("done");
                }
              }
            }
          );
          const loadMessage = { type: "load", payload: { language, config: config2 } };
          compilerSandbox.postMessage(loadMessage, compilerOrigin);
        } else {
          resolve("done");
        }
      })
    )
  );
  const cache2 = {};
  const compile = async (content, language, config2, options) => {
    if (["jsx", "tsx"].includes(language)) {
      language = "typescript";
    }
    const enabledProcessors = getActivatedProcessors(language, config2);
    const languageSettings = stringify(getCustomSettings(language, config2));
    if (!options?.forceCompile && cache2[language]?.content === content && cache2[language]?.processors === enabledProcessors && cache2[language]?.languageSettings === languageSettings && cache2[language]?.compiled) {
      return {
        code: cache2[language]?.compiled || "",
        info: JSON.parse(cache2[language]?.info || "{}")
      };
    }
    if (compilers[language] && !compilers[language].fn) {
      await load([language], config2);
    }
    const compiler2 = compilers[language]?.fn;
    if (typeof compiler2 !== "function") {
      return new Promise((res) => {
        if (language !== "html" && language !== "css" && language !== "javascript") {
          console.error("Failed to load compiler for: " + language);
        }
        res({ code: "", info: {} });
      });
    }
    const compiled = getCompileResult(await compiler2(content, { config: config2, language, baseUrl: baseUrl2, options })) || "";
    const processed = getCompileResult(await postProcess(compiled.code, { config: config2, language, baseUrl: baseUrl2, options })) || "";
    const info = {
      ...compiled.info,
      ...processed.info
    };
    cache2[language] = {
      content,
      compiled: processed.code,
      info: JSON.stringify(info),
      processors: enabledProcessors,
      languageSettings: stringify(getCustomSettings(language, config2))
    };
    return { code: processed.code, info };
  };
  const postProcess = async (content, { config: config2, language, baseUrl: baseUrl3, options }) => {
    let code = content;
    let info = {};
    let postcssRequired = false;
    const editorId = getLanguageEditorId(language) || "markup";
    const tailwindcssIsActive = processorIsEnabled("tailwindcss", config2) && processorIsActivated("tailwindcss", config2);
    if (editorId === "style" && hasStyleImports(code) && !tailwindcssIsActive) {
      postcssRequired = true;
    }
    for (const processor of window.deps.processors) {
      if (processorIsEnabled(processor.name, config2) && processorIsActivated(processor.name, config2) && processor.editor === editorId || editorId === "style" && processor.name === "postcss") {
        if (processor.isPostcssPlugin) {
          postcssRequired = true;
        } else {
          if (processor.name === "postcss" && !postcssRequired)
            continue;
          if (compilers[processor.name] && !compilers[processor.name].fn) {
            await load([processor.name], config2);
          }
          const process2 = compilers[processor.name].fn || (async (code2) => code2);
          if (typeof process2 !== "function") {
            console.error("Failed to load processor: " + processor.name);
            return { code, info };
          }
          const processResult = await process2(code, { config: config2, language, baseUrl: baseUrl3, options });
          const result = getCompileResult(processResult);
          code = result.code;
          info = {
            ...info,
            ...result.info
          };
        }
      }
    }
    return { code, info };
  };
  const clearCache = () => {
    Object.keys(cache2).forEach((key) => delete cache2[key]);
  };
  const typescriptFeatures = ({
    feature,
    payload
  }) => new Promise((resolve) => {
    const id2 = getRandomString();
    const handler2 = (event) => {
      const message = event.data;
      if (event.origin !== compilerOrigin || event.source !== compilerSandbox || message.from !== "compiler" || message.type !== "ts-features" || message.payload.id !== id2) {
        return;
      }
      window.removeEventListener("message", handler2);
      resolve(message.payload.data);
    };
    window.addEventListener("message", handler2);
    const compileMessage = {
      type: "ts-features",
      payload: { id: id2, feature, data: payload }
    };
    compilerSandbox.postMessage(compileMessage, compilerOrigin);
  });
  await initialize();
  return {
    load,
    compile,
    clearCache,
    typescriptFeatures,
    isFake: false
  };
};

// src/livecodes/compiler/get-compiler.ts
var getCompiler = (options) => {
  const mode = options.config.mode;
  if (mode === "codeblock" || mode === "editor") {
    return createFakeCompiler();
  } else {
    return createCompiler(options);
  }
};
async function createFakeCompiler() {
  return {
    load: (_languages, _config) => Promise.resolve(["do nothing"]),
    compile: (content, _language, _config) => Promise.resolve(getCompileResult(content)),
    clearCache: () => void 0,
    typescriptFeatures: async () => void 0,
    isFake: true
  };
}

// src/livecodes/languages/commonlisp/lang-commonlisp.ts
var parenFormatter = () => {
  const url3 = parinferUrl;
  self.importScripts(url3);
  return async (value) => ({
    formatted: window.parinfer.parenMode(value).text,
    cursorOffset: 0
  });
};
var commonlisp = {
  name: "commonlisp",
  title: "Lisp",
  longTitle: "Common Lisp",
  formatter: {
    factory: parenFormatter
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl: baseUrl2 }) => [jsclUrl, baseUrl2 + "lang-commonlisp-script.js"],
    scriptType: "text/commonlisp",
    compiledCodeLanguage: "commonlisp"
  },
  extensions: ["lisp", "common-lisp"],
  editor: "script",
  editorLanguage: "scheme"
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

// src/livecodes/languages/coffeescript/lang-coffeescript.ts
var coffeescript = {
  name: "coffeescript",
  title: "Coffee",
  longTitle: "CoffeeScript",
  compiler: {
    url: coffeeScriptUrl,
    factory: () => async (code, { config }) => window.CoffeeScript.compile(code, {
      bare: true,
      ...getLanguageCustomSettings("coffeescript", config)
    })
  },
  extensions: ["coffee"],
  editor: "script"
};

// src/livecodes/languages/cpp/lang-cpp.ts
var cdnUrl = vendorsBaseUrl + "jscpp/JSCPP.es5.min.js";
var cpp = {
  name: "cpp",
  title: "C++",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl: baseUrl2 }) => [cdnUrl, baseUrl2 + "lang-cpp-script.js"],
    scriptType: "text/cpp",
    compiledCodeLanguage: "cpp"
  },
  extensions: ["cpp", "c", "C", "cp", "cxx", "c++", "cppm", "ixx", "ii", "hpp", "h"],
  editor: "script"
};

// src/livecodes/languages/cpp-wasm/lang-cpp-wasm.ts
var cppWasm = {
  name: "cpp-wasm",
  title: "C++ (Wasm)",
  longTitle: "C/C++ (Wasm)",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl: baseUrl2 }) => [baseUrl2 + "lang-cpp-wasm-script.js"],
    scriptType: "text/cpp",
    compiledCodeLanguage: "cpp",
    liveReload: true
  },
  extensions: [
    "wasm.cpp",
    "cppwasm",
    "cwasm",
    "clang.cpp",
    "clang",
    "cpp",
    "c",
    "C",
    "cp",
    "cxx",
    "c++",
    "cppm",
    "ixx",
    "ii",
    "hpp",
    "h"
  ],
  editor: "script",
  editorLanguage: "cpp",
  largeDownload: true
};

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
    scripts: ({ baseUrl: baseUrl2 }) => [baseUrl2 + "lang-csharp-wasm-script.js"],
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
var runOutsideWorker = async (code, { baseUrl: baseUrl2, config }) => {
  const { diagramsCompiler } = await import(baseUrl2 + "lang-diagrams-compiler-esm.js");
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-dot-compiler.js");
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-ejs-compiler.js");
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-eta-compiler.js");
      return self.createEtaCompiler();
    }
  },
  extensions: ["eta"],
  editor: "markup",
  editorLanguage: "html"
};

// src/livecodes/languages/fennel/lang-fennel.ts
var fennel = {
  name: "fennel",
  title: "Fennel",
  formatter: {
    factory: parenFormatter
  },
  compiler: {
    url: luaUrl,
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-fennel-compiler.js");
      return self.createFennelCompiler();
    },
    scripts: [luaUrl],
    scriptType: "application/lua",
    compiledCodeLanguage: "lua"
  },
  extensions: ["fnl"],
  editor: "script",
  editorLanguage: "scheme"
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

// src/livecodes/languages/gleam/lang-gleam.ts
var gleam = {
  name: "gleam",
  title: "Gleam",
  compiler: {
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-gleam-compiler.js");
      return self.createGleamCompiler();
    },
    loadAsExternalModule: true,
    inlineModule: `(async() => {
      const main = (await import('./script')).main;
      if (typeof main === "function") main();
    })();
`
  },
  extensions: ["gleam"],
  editor: "script",
  editorLanguage: "swift"
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
    scripts: ({ baseUrl: baseUrl2 }) => [baseUrl2 + "lang-go-wasm-script.js"],
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-haml-compiler.js");
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-handlebars-compiler.js");
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-imba-compiler.js");
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
    scripts: ({ baseUrl: baseUrl2 }) => [baseUrl2 + "lang-java-script.js"],
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
var jinja = {
  name: "jinja",
  title: "Jinja",
  formatter: {
    factory: () => {
      self.importScripts(jinjaUrl);
      return async (code, cursorOffset, formatterConfig) => {
        const formatted = new self.Jinja.Template(code).format({
          indent: formatterConfig?.tabSize || 2
        });
        return { formatted, cursorOffset };
      };
    }
  },
  compiler: {
    url: jinjaUrl,
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-jinja-compiler.js");
      return self.createJinjaCompiler();
    }
  },
  extensions: ["jinja"],
  editor: "markup",
  editorLanguage: "html"
};

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

// src/livecodes/languages/julia/lang-julia.ts
var julia = {
  name: "julia",
  title: "Julia",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl: baseUrl2 }) => [baseUrl2 + "lang-julia-script.js"],
    liveReload: true,
    scriptType: "text/julia",
    compiledCodeLanguage: "julia"
  },
  extensions: ["jl"],
  editor: "script",
  largeDownload: true
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-liquid-compiler.js");
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
var luaFormatter = {
  factory: () => {
    self.importScripts(luaFmtUrl);
    return async (code, cursorOffset) => ({
      formatted: self.luaFmt.formatText(code),
      cursorOffset
    });
  }
};
var lua = {
  name: "lua",
  title: "Lua",
  formatter: luaFormatter,
  compiler: {
    factory: () => async (code) => code,
    scripts: [luaUrl],
    scriptType: "application/lua",
    compiledCodeLanguage: "lua"
  },
  extensions: ["lua"],
  editor: "script"
};

// src/livecodes/languages/lua-wasm/lang-lua-wasm.ts
var luaWasm = {
  name: "lua-wasm",
  title: "Lua (Wasm)",
  formatter: luaFormatter,
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl: baseUrl2 }) => [wasmoonUrl, baseUrl2 + "lang-lua-wasm-script.js"],
    scriptType: "application/lua",
    compiledCodeLanguage: "lua"
  },
  extensions: ["wasm.lua", "luawasm"],
  editor: "script",
  editorLanguage: "lua"
};

// src/livecodes/languages/malina/lang-malina.ts
var malina = {
  name: "malina",
  title: "Malina.js",
  parser: {
    name: "html",
    pluginUrls: [parserPlugins.html, parserPlugins.babel]
  },
  compiler: {
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-malina-compiler.js");
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
      const { html: html6, errors } = self.mjml(
        code,
        getLanguageCustomSettings("mjml", config)
      );
      errors?.forEach(
        (err) => {
          console.warn(err.formattedMessage);
        }
      );
      return html6;
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-mustache-compiler.js");
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-nunjucks-compiler.js");
      return self.createNunjucksCompiler();
    }
  },
  extensions: ["njk", "nunjucks"],
  editor: "markup",
  editorLanguage: "html"
};

// src/livecodes/languages/ocaml/lang-ocaml.ts
var ocaml = {
  name: "ocaml",
  title: "OCaml",
  compiler: "rescript",
  extensions: ["ml", "mli"],
  editor: "script",
  editorLanguage: "javascript"
};

// src/livecodes/languages/perl/lang-perl.ts
var perl = {
  name: "perl",
  title: "Perl",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl: baseUrl2 }) => [
      vendorsBaseUrl + "perlito/perlito5.min.js",
      baseUrl2 + "lang-perl-script.js"
    ],
    scriptType: "text/perl"
  },
  extensions: ["pl", "pm"],
  editor: "script"
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
    scripts: ({ baseUrl: baseUrl2 }) => [
      vendorsBaseUrl + "php-wasm/php-wasm.js",
      baseUrl2 + "lang-php-wasm-script.js"
    ],
    scriptType: "text/php-wasm",
    compiledCodeLanguage: "php"
  },
  extensions: ["wasm.php", "phpwasm"],
  editor: "script",
  editorLanguage: "php"
};

// src/livecodes/languages/postgresql/lang-postgresql.ts
var runOutsideWorker3 = async (code, { baseUrl: baseUrl2, config }) => {
  const { pgSqlCompiler } = await import(baseUrl2 + "lang-postgresql-compiler-esm.js");
  return pgSqlCompiler(code, { baseUrl: baseUrl2, config });
};
var postgresql = {
  name: "postgresql",
  title: "PostgreSQL",
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
    factory: () => async (code) => code,
    runOutsideWorker: runOutsideWorker3,
    scripts: ({ baseUrl: baseUrl2 }) => [baseUrl2 + "lang-sql-script.js"],
    scriptType: "application/json",
    compiledCodeLanguage: "json"
  },
  extensions: [
    "pg.sql",
    "pgsql",
    "pgsql.sql",
    "pgsql",
    "pg",
    "pglite",
    "pglite.sql",
    "postgresql",
    "postgres",
    "postgre.sql",
    "postgresql.sql"
  ],
  editor: "script",
  editorLanguage: "sql"
};

// src/livecodes/languages/prolog/lang-prolog.ts
var prolog = {
  name: "prolog",
  title: "Prolog",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl: baseUrl2 }) => [
      tauPrologBaseUrl + "core.js",
      tauPrologBaseUrl + "charsio.js",
      tauPrologBaseUrl + "dom.js",
      tauPrologBaseUrl + "format.js",
      tauPrologBaseUrl + "js.js",
      tauPrologBaseUrl + "lists.js",
      tauPrologBaseUrl + "os.js",
      tauPrologBaseUrl + "promises.js",
      tauPrologBaseUrl + "random.js",
      tauPrologBaseUrl + "statistics.js",
      baseUrl2 + "lang-prolog-script.js"
    ],
    scriptType: "text/prolog",
    compiledCodeLanguage: "prolog"
  },
  extensions: ["prolog.pl", "prolog"],
  editor: "script"
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-pug-compiler.js");
      return self.createPugCompiler();
    }
  },
  extensions: ["pug", "jade"],
  editor: "markup"
};

// src/livecodes/languages/python/lang-python.ts
var brythonUrl = brythonBaseUrl + "brython.min.js";
var stdlibUrl = brythonBaseUrl + "brython_stdlib.js";
var python = {
  name: "python",
  title: "Python",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ compiled, config }) => {
      const { autoloadStdlib } = getLanguageCustomSettings("python", config);
      const importsPattern2 = /^(?:from[ ]+(\S+)[ ]+)?import[ ]+(\S+)(?:[ ]+as[ ]+\S+)?[ ]*$/gm;
      const stdlib = autoloadStdlib !== false && compiled.match(importsPattern2) ? [stdlibUrl] : [];
      return [brythonUrl, ...stdlib];
    },
    scriptType: "text/python",
    compiledCodeLanguage: "python"
  },
  extensions: ["py"],
  editor: "script"
};

// src/livecodes/languages/python-wasm/lang-python-wasm.ts
var pythonWasm = {
  name: "python-wasm",
  title: "Py (Wasm)",
  longTitle: "Python (Wasm)",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl: baseUrl2 }) => [baseUrl2 + "lang-python-wasm-script.js"],
    liveReload: true,
    scriptType: "text/python",
    compiledCodeLanguage: "python"
  },
  extensions: ["wasm.py", "py3", "pyodide", "py-wasm", "pythonwasm", "pywasm"],
  editor: "script",
  editorLanguage: "python",
  largeDownload: true
};

// src/livecodes/languages/r/lang-r.ts
var r = {
  name: "r",
  title: "R",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl: baseUrl2 }) => [baseUrl2 + "lang-r-script-esm.js"],
    inlineScript: `
    livecodes.r = livecodes.r || {config: {}};
    // reset config before next load
    livecodes.r.config = {};
    livecodes.r.evaluated = new Promise((resolve) => {
      addEventListener('load', async () => {
        await livecodes.r.loaded;
        if (livecodes.r.config?.autoEvaluate !== false) {
          await livecodes.r.run();
          resolve();
        }
      });
    });
    `,
    liveReload: true,
    scriptType: "text/r",
    compiledCodeLanguage: "r"
  },
  extensions: ["r", "rlang", "rstats", "r-wasm"],
  editor: "script",
  largeDownload: true
};

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

// src/livecodes/languages/rescript/lang-rescript.ts
var runOutsideWorker4 = async (code, { baseUrl: baseUrl2, language }) => {
  const { rescriptCompiler } = await import(baseUrl2 + "lang-rescript-compiler-esm.js");
  return rescriptCompiler(code, { baseUrl: baseUrl2, language });
};
var formatterFactory = (baseUrl2, language) => {
  importScripts(baseUrl2 + "lang-rescript-formatter.js");
  return self.createRescriptFormatter(baseUrl2, language);
};
var rescript = {
  name: "rescript",
  title: "ReScript",
  formatter: {
    factory: formatterFactory
  },
  compiler: {
    factory: () => async (code) => code,
    runOutsideWorker: runOutsideWorker4,
    scriptType: "module"
  },
  extensions: ["res", "resi"],
  editor: "script",
  editorLanguage: "javascript"
};

// src/livecodes/languages/reason/lang-reason.ts
var reason = {
  name: "reason",
  title: "Reason",
  formatter: {
    factory: formatterFactory
  },
  compiler: "rescript",
  extensions: ["re", "rei"],
  editor: "script",
  editorLanguage: "javascript"
};

// src/livecodes/languages/richtext/lang-richtext.ts
var richtext = {
  name: "richtext",
  title: "Rich Text",
  longTitle: "Rich Text Editor",
  compiler: {
    factory: () => async (_code, { config }) => config.markup.content || "",
    styles: ["quill.css"]
  },
  extensions: ["rte", "rte.html", "rich"],
  editor: "markup",
  editorLanguage: "html"
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-riot-compiler.js");
      return self.createRiotCompiler();
    },
    scripts: [cdnUrl2],
    scriptType: "module"
  },
  extensions: ["riot", "riotjs"],
  editor: "script"
};

// src/livecodes/languages/ruby/lang-ruby.ts
var getImports2 = (code, requireMap = {}) => Array.from(
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
      const imports = getImports2(compiled, requireMap);
      const stdlib = autoloadStdlib !== false ? imports : [];
      return [opalBaseUrl + "opal.min.js", ...stdlib];
    }
  },
  extensions: ["rb"],
  editor: "script"
};

// src/livecodes/languages/ruby-wasm/lang-ruby-wasm.ts
var rubyWasm = {
  name: "ruby-wasm",
  title: "Ruby (Wasm)",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl: baseUrl2 }) => [rubyWasmScriptUrl, baseUrl2 + "lang-ruby-wasm-script.js"],
    liveReload: true,
    scriptType: "text/ruby-wasm",
    compiledCodeLanguage: "ruby"
  },
  extensions: ["wasm.rb", "rubywasm"],
  editor: "script",
  editorLanguage: "ruby",
  largeDownload: true
};

// src/livecodes/languages/scheme/lang-scheme.ts
var scheme = {
  name: "scheme",
  title: "Scheme",
  formatter: {
    factory: parenFormatter
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: [biwaschemeUrl],
    scriptType: "text/biwascheme",
    compiledCodeLanguage: "scheme"
  },
  extensions: ["scm"],
  editor: "script"
};

// src/livecodes/languages/scss/lang-sass.ts
var sass = {
  name: "sass",
  title: "Sass",
  compiler: "scss",
  extensions: ["sass"],
  editor: "style"
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-scss-compiler.js");
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-solid-compiler.js");
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-sql-compiler.js");
      return self.createSqlCompiler();
    },
    scripts: ({ baseUrl: baseUrl2 }) => [baseUrl2 + "lang-sql-script.js"],
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

// src/livecodes/languages/stylis/lang-stylis.ts
var stylis = {
  name: "stylis",
  title: "Stylis",
  compiler: {
    url: stylisUrl,
    factory: () => async (code) => {
      const { compile, serialize, stringify: stringify3, middleware, prefixer } = window.stylis;
      return serialize(compile(code), middleware([prefixer, stringify3]));
    }
  },
  extensions: ["stylis"],
  editor: "style",
  editorLanguage: "scss"
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-svelte-compiler.js");
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

// src/livecodes/languages/tcl/lang-tcl.ts
var tcl = {
  name: "tcl",
  title: "Tcl",
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl: baseUrl2 }) => [requireUrl, baseUrl2 + "lang-tcl-script.js"],
    scriptType: "text/tcl",
    compiledCodeLanguage: "tcl"
  },
  extensions: ["tcl"],
  editor: "script"
};

// src/livecodes/languages/teal/lang-teal.ts
var teal = {
  name: "teal",
  title: "Teal",
  formatter: luaFormatter,
  compiler: {
    url: luaUrl,
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-teal-compiler.js");
      return self.createTealCompiler();
    },
    scripts: [luaUrl],
    scriptType: "application/lua",
    compiledCodeLanguage: "lua"
  },
  extensions: ["tl"],
  editor: "script",
  editorLanguage: "lua"
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-twig-compiler.js");
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-vento-compiler.js");
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-vue-compiler.js");
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-vue2-compiler.js");
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
var scriptType2 = "application/wasm-uint8";
var wat = {
  name: "wat",
  title: "WAT",
  longTitle: "WebAssembly Text",
  formatter: {
    factory: () => {
      importScripts(formatterUrl);
      return async (value) => {
        let formatted = value;
        try {
          formatted = self.wastRefmt.format(value);
        } catch (error) {
          console.warn("failed parsing WAT", error);
        }
        return {
          formatted,
          cursorOffset: 0
        };
      };
    }
  },
  compiler: {
    url: wabtjsUrl,
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "lang-wat-compiler.js");
      return self.createWatCompiler();
    },
    scripts: ({ baseUrl: baseUrl2 }) => [baseUrl2 + "lang-wat-script.js"],
    scriptType: scriptType2,
    compiledCodeLanguage: "Binary"
  },
  extensions: ["wat", "wast", "webassembly", "wasm"],
  editor: "script"
};

// src/livecodes/languages/languages.ts
var languages = [
  html,
  markdown,
  mdx,
  astro,
  pug,
  asciidoc,
  haml,
  mustache,
  handlebars,
  ejs,
  eta,
  nunjucks,
  liquid,
  dot,
  twig,
  vento,
  artTemplate,
  jinja,
  bbcode,
  mjml,
  diagrams,
  richtext,
  css,
  scss,
  sass,
  less,
  stylus,
  stylis,
  javascript,
  typescript,
  flow,
  babel,
  sucrase,
  jsx,
  tsx,
  react,
  reactTsx,
  reactNative,
  reactNativeTsx,
  vue,
  vue2,
  vueApp,
  svelte,
  svelteApp,
  stencil,
  solid,
  solidTsx,
  riot,
  malina,
  coffeescript,
  livescript,
  civet,
  clio,
  imba,
  rescript,
  reason,
  ocaml,
  python,
  pythonWasm,
  r,
  ruby,
  rubyWasm,
  go,
  goWasm,
  php,
  phpWasm,
  cpp,
  cppWasm,
  java,
  csharpWasm,
  perl,
  lua,
  luaWasm,
  teal,
  fennel,
  julia,
  scheme,
  commonlisp,
  clojurescript,
  gleam,
  tcl,
  assemblyscript,
  wat,
  sql,
  postgresql,
  prolog,
  blockly
];

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
var postcssImportUrl = {
  name: "postcssImportUrl",
  title: "Import Url",
  isPostcssPlugin: true,
  compiler: {
    url: postcssImportUrlUrl,
    factory: (config) => self.postcssImportUrl({
      ...getLanguageCustomSettings("postcssImportUrl", config)
    })
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "processor-postcss-compiler.js");
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "processor-lightningcss-compiler.js");
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "processor-tailwindcss-compiler.js");
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "processor-unocss-compiler.js");
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
    factory: (_config, baseUrl2) => {
      self.importScripts(baseUrl2 + "processor-windicss-compiler.js");
      return self.createWindicssCompiler();
    }
  },
  editor: "style"
};

// src/livecodes/languages/processors.ts
var processors = [
  ...[
    tailwindcss,
    windicss,
    unocss,
    tokencss,
    purgecss,
    postcssImportUrl,
    autoprefixer,
    postcssPresetEnv,
    lightningcss,
    cssnano,
    cssModules
  ],
  // keep postcss as last processor
  postcss
];

// src/livecodes/UI/create-language-menus.ts
var createLanguageMenus = (config, baseUrl2, eventsManager2, showLanguageInfo2, loadStarterTemplate2, importCode, registerMenuButton2) => {
  const editorIds2 = ["markup", "style", "script"];
  const rootList = document.createElement("ul");
  document.querySelector("#select-editor")?.appendChild(rootList);
  let editorsNumber = editorIds2.length;
  editorIds2.forEach((editorId) => {
    const editorSelector = document.createElement("a");
    editorSelector.href = "#";
    editorSelector.id = editorId + "-selector";
    editorSelector.classList.add("editor-title", "noselect");
    editorSelector.dataset.editor = editorId;
    editorSelector.innerHTML = `
      <span></span>
      <a
        href="javascript:void(0)"
        onclick="event.stopPropagation();"
        class="language-menu-button"
        title="${window.deps.translateString("core.changeLanguage.hint", "Change Language")}"
      >
      <i class="icon-arrow-down"></i>
      </a>
    `;
    rootList.appendChild(editorSelector);
    const menuScroller = document.createElement("div");
    menuScroller.classList.add("menu-scroller");
    menuScroller.classList.add("menu-scroller-" + editorId);
    registerMenuButton2(menuScroller, editorSelector.querySelector(".language-menu-button"));
    editorSelector.appendChild(menuScroller);
    const languageMenu = document.createElement("ul");
    languageMenu.classList.add("dropdown-menu");
    languageMenu.classList.add("dropdown-menu-" + editorId);
    menuScroller.appendChild(languageMenu);
    const editorLanguages2 = [...window.deps.languages].filter((language) => language.editor === editorId).filter((language) => languageIsEnabled(language.name, config));
    if (editorLanguages2.length === 0) {
      editorSelector.classList.add("hidden");
      editorsNumber -= 1;
    } else if (editorLanguages2.length === 1) {
      const changeLanguageButton = editorSelector.querySelector(".language-menu-button");
      if (changeLanguageButton) {
        changeLanguageButton.style.display = "none";
      }
    }
    const enabledProcessors = window.deps.processors.filter(
      (p) => p.editor === editorId && processorIsEnabled(p.name, config)
    );
    const processorsHeader = enabledProcessors.length > 0 ? {
      name: editorId + "-processors",
      title: "Processors:",
      longTitle: "Processors:",
      editor: editorId
    } : void 0;
    if (processorsHeader) {
      editorLanguages2.push(processorsHeader);
    }
    editorLanguages2.forEach((language) => {
      const languageItem = document.createElement("li");
      languageItem.classList.add("language-item");
      languageMenu.appendChild(languageItem);
      const languageLink = document.createElement("a");
      languageLink.href = "#";
      languageLink.dataset.editor = editorId;
      languageLink.dataset.lang = language.name;
      languageLink.title = language.longTitle || language.title;
      languageLink.innerHTML = language.longTitle || language.title;
      if (!("extensions" in language)) {
        languageLink.classList.add("subtitle");
      }
      if (language.name === "style-processors") {
        languageItem.classList.add("column-break");
      }
      languageItem.appendChild(languageLink);
      if (language.info !== false) {
        const tooltip = document.createElement("span");
        tooltip.classList.add("tooltip");
        tooltip.title = window.deps.translateString("generic.clickForInfo", "Click for info...");
        tooltip.innerHTML = infoIcon;
        eventsManager2.addEventListener(
          tooltip,
          "mousedown",
          async () => {
            const languageInfo = document.createElement("div");
            languageInfo.classList.add("language-info");
            languageInfo.innerHTML = await getLanguageInfo(language.name, baseUrl2);
            showLanguageInfo2(languageInfo);
            const templateLink = languageInfo.querySelector("a[data-template]");
            const templateName = templateLink?.dataset.template;
            if (templateLink && templateName) {
              eventsManager2.addEventListener(
                templateLink,
                "click",
                async (event) => {
                  event.preventDefault();
                  loadStarterTemplate2(templateName);
                },
                false
              );
            }
            const codeLink = languageInfo.querySelector("a[data-code]");
            const codeUrl = codeLink?.dataset.code;
            if (codeLink && codeUrl) {
              eventsManager2.addEventListener(
                codeLink,
                "click",
                async (event) => {
                  event.preventDefault();
                  importCode({ importUrl: codeUrl });
                },
                false
              );
            }
          },
          false
        );
        languageItem.appendChild(tooltip);
      }
    });
  });
  if (editorsNumber < 3) {
    document.querySelectorAll(".editor-title").forEach((editorSelector) => {
      editorSelector.classList.add("half-width");
    });
  }
};
var getLanguageInfo = async (language, baseUrl2) => {
  const languageInfoHTML = await import(baseUrl2 + "language-info.js").then(
    (mod) => mod.languageInfo
  );
  const domParser = new DOMParser();
  const dom = domParser.parseFromString(languageInfoHTML, "text/html");
  const info = dom.querySelector(`[data-lang="${language}"]`);
  return info?.innerHTML || "";
};
var infoIcon = '<i class="icon-info"></i>';

// node_modules/@snackbar/core/dist/snackbar.es.js
function _call(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }
  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
function _invokeIgnored(body) {
  var result = body();
  if (result && result.then) {
    return result.then(_empty);
  }
}
function _empty() {
}
function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
var instances = {
  left: [],
  center: [],
  right: []
};
var instanceStackStatus = {
  left: true,
  center: true,
  right: true
};
var themes = {
  light: {
    backgroundColor: "#fff",
    textColor: "#000",
    actionColor: "#008000"
  },
  dark: {}
};
var Snackbar = function Snackbar2(message, options) {
  var this$1 = this;
  if (options === void 0)
    options = {};
  var timeout = options.timeout;
  if (timeout === void 0)
    timeout = 0;
  var actions = options.actions;
  if (actions === void 0)
    actions = [{
      text: "dismiss",
      callback: function() {
        return this$1.destroy();
      }
    }];
  var position = options.position;
  if (position === void 0)
    position = "center";
  var theme5 = options.theme;
  if (theme5 === void 0)
    theme5 = "dark";
  var maxStack = options.maxStack;
  if (maxStack === void 0)
    maxStack = 3;
  this.message = message;
  this.options = {
    timeout,
    actions,
    position,
    maxStack,
    theme: typeof theme5 === "string" ? themes[theme5] : theme5
  };
  this.wrapper = this.getWrapper(this.options.position);
  this.insert();
  instances[this.options.position].push(this);
  this.stack();
};
var prototypeAccessors = { theme: { configurable: true } };
prototypeAccessors.theme.get = function() {
  return this.options.theme;
};
Snackbar.prototype.getWrapper = function getWrapper(position) {
  var wrapper = document.querySelector(".snackbars-" + position);
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.className = "snackbars snackbars-" + position;
    document.body.appendChild(wrapper);
  }
  return wrapper;
};
Snackbar.prototype.insert = function insert() {
  var this$1 = this;
  var el = document.createElement("div");
  el.className = "snackbar";
  el.setAttribute("aria-live", "assertive");
  el.setAttribute("aria-atomic", "true");
  el.setAttribute("aria-hidden", "false");
  var ref = this.theme;
  var backgroundColor = ref.backgroundColor;
  var textColor = ref.textColor;
  var boxShadow = ref.boxShadow;
  var actionColor = ref.actionColor;
  var container = document.createElement("div");
  container.className = "snackbar--container";
  if (backgroundColor) {
    container.style.backgroundColor = backgroundColor;
  }
  if (textColor) {
    container.style.color = textColor;
  }
  if (boxShadow) {
    container.style.boxShadow = boxShadow;
  }
  el.appendChild(container);
  var text = document.createElement("div");
  text.className = "snackbar--text";
  if (typeof this.message === "string") {
    text.textContent = this.message;
  } else {
    text.appendChild(this.message);
  }
  container.appendChild(text);
  if (this.options.actions) {
    var loop = function() {
      var action = list[i];
      var style = action.style;
      var text$1 = action.text;
      var callback = action.callback;
      var button = document.createElement("button");
      button.className = "snackbar--button";
      button.innerHTML = text$1;
      if (actionColor) {
        button.style.color = actionColor;
      }
      if (style) {
        Object.keys(style).forEach(function(key) {
          button.style[key] = style[key];
        });
      }
      button.addEventListener("click", function() {
        this$1.stopTimer();
        if (callback) {
          callback(button, this$1);
        } else {
          this$1.destroy();
        }
      });
      container.appendChild(button);
    };
    for (var i = 0, list = this$1.options.actions; i < list.length; i += 1)
      loop();
  }
  this.startTimer();
  el.addEventListener("mouseenter", function() {
    this$1.expand();
  });
  el.addEventListener("mouseleave", function() {
    this$1.stack();
  });
  this.el = el;
  this.wrapper.appendChild(el);
};
Snackbar.prototype.stack = function stack() {
  var this$1 = this;
  instanceStackStatus[this.options.position] = true;
  var positionInstances = instances[this.options.position];
  var l = positionInstances.length - 1;
  positionInstances.forEach(function(instance, i) {
    instance.startTimer();
    var el = instance.el;
    if (el) {
      el.style.transform = "translate3d(0, -" + (l - i) * 15 + "px, -" + (l - i) + "px) scale(" + (1 - 0.05 * (l - i)) + ")";
      var hidden = l - i >= this$1.options.maxStack;
      this$1.toggleVisibility(el, hidden);
    }
  });
};
Snackbar.prototype.expand = function expand() {
  var this$1 = this;
  instanceStackStatus[this.options.position] = false;
  var positionInstances = instances[this.options.position];
  var l = positionInstances.length - 1;
  positionInstances.forEach(function(instance, i) {
    instance.stopTimer();
    var el = instance.el;
    if (el) {
      el.style.transform = "translate3d(0, -" + (l - i) * el.clientHeight + "px, 0) scale(1)";
      var hidden = l - i >= this$1.options.maxStack;
      this$1.toggleVisibility(el, hidden);
    }
  });
};
Snackbar.prototype.toggleVisibility = function toggleVisibility(el, hidden) {
  if (hidden) {
    this.visibilityTimeoutId = window.setTimeout(function() {
      el.style.visibility = "hidden";
    }, 300);
    el.style.opacity = "0";
  } else {
    if (this.visibilityTimeoutId) {
      clearTimeout(this.visibilityTimeoutId);
      this.visibilityTimeoutId = void 0;
    }
    el.style.opacity = "1";
    el.style.visibility = "visible";
  }
};
Snackbar.prototype.destroy = function destroy() {
  var _this = this;
  return _call(function() {
    var el = _this.el;
    var wrapper = _this.wrapper;
    return _invokeIgnored(function() {
      if (el) {
        el.setAttribute("aria-hidden", "true");
        return _await(new Promise(function(resolve) {
          var eventName = getAnimationEvent(el);
          if (eventName) {
            el.addEventListener(eventName, function() {
              return resolve();
            });
          } else {
            resolve();
          }
        }), function() {
          wrapper.removeChild(el);
          var positionInstances = instances[_this.options.position];
          var index = void 0;
          for (var i = 0; i < positionInstances.length; i++) {
            if (positionInstances[i].el === el) {
              index = i;
              break;
            }
          }
          if (index !== void 0) {
            positionInstances.splice(index, 1);
          }
          if (instanceStackStatus[_this.options.position]) {
            _this.stack();
          } else {
            _this.expand();
          }
        });
      }
    });
  });
};
Snackbar.prototype.startTimer = function startTimer() {
  var this$1 = this;
  if (this.options.timeout && !this.timeoutId) {
    this.timeoutId = self.setTimeout(function() {
      return this$1.destroy();
    }, this.options.timeout);
  }
};
Snackbar.prototype.stopTimer = function stopTimer() {
  if (this.timeoutId) {
    clearTimeout(this.timeoutId);
    this.timeoutId = void 0;
  }
};
Object.defineProperties(Snackbar.prototype, prototypeAccessors);
function getAnimationEvent(el) {
  var animations = {
    animation: "animationend",
    OAnimation: "oAnimationEnd",
    MozAnimation: "Animationend",
    WebkitAnimation: "webkitAnimationEnd"
  };
  for (var i = 0, list = Object.keys(animations); i < list.length; i += 1) {
    var key = list[i];
    if (el.style[key] !== void 0) {
      return animations[key];
    }
  }
  return;
}

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

// src/livecodes/config/build-config.ts
var buildConfig = (appConfig2) => {
  if (!appConfig2)
    return { ...defaultConfig };
  const userConfig = upgradeAndValidate(appConfig2);
  let config = {
    ...defaultConfig,
    ...userConfig,
    ...userConfig.mode === "result" && userConfig.tools == null ? { tools: { enabled: [], active: "", status: "none" } } : {}
  };
  const params2 = getParams();
  const { version: version2, ...paramsConfig } = upgradeAndValidate(loadParamConfig(config, params2));
  config = {
    ...config,
    ...paramsConfig
  };
  const activeEditor = config.activeEditor || "markup";
  config = fixLanguageNames({
    ...config,
    activeEditor
  });
  return config;
};
var fixLanguageNames = (config) => ({
  ...config,
  markup: {
    ...config.markup,
    language: getLanguageByAlias(config.markup.language) || defaultConfig.markup.language
  },
  style: {
    ...config.style,
    language: getLanguageByAlias(config.style.language) || defaultConfig.style.language
  },
  script: {
    ...config.script,
    language: getLanguageByAlias(config.script.language) || defaultConfig.script.language
  },
  ...config.tests?.language ? {
    tests: {
      ...config.tests,
      language: getLanguageByAlias(config.tests.language) || defaultConfig.tests?.language || "typescript"
    }
  } : {},
  ...config.languages ? {
    languages: removeDuplicates(
      config.languages.map((lang) => getLanguageByAlias(lang)).filter(Boolean)
    )
  } : {}
});
var getParams = (queryParams = parent.location.search, hashParams = parent.location.hash) => {
  let params2 = Object.fromEntries(
    new URLSearchParams(queryParams)
  );
  if (hashParams) {
    hashParams = hashParams.replace("#", "?");
    params2 = {
      ...params2,
      ...Object.fromEntries(new URLSearchParams(hashParams))
    };
  }
  let encodedParams = {};
  Object.keys(params2).forEach((key) => {
    try {
      const value = params2[key];
      if (key === "params") {
        encodedParams = JSON.parse(decompress(value) || "{}");
        if (!encodedParams || typeof encodedParams !== "object")
          encodedParams = {};
      } else {
        params2[key] = decodeURIComponent(value);
      }
    } catch {
    }
    params2 = { ...encodedParams, ...params2 };
    if (params2[key] === "")
      params2[key] = true;
    if (params2[key] === "true")
      params2[key] = true;
    if (params2[key] === "false")
      params2[key] = false;
  });
  params2.x ?? (params2.x = params2.import);
  return params2;
};
var loadParamConfig = (config, params2) => {
  const paramsConfig = [...Object.keys(defaultConfig)].filter((key) => key !== "version").reduce(
    (acc, key) => ({
      ...acc,
      [key]: params2[key]
    }),
    {}
  );
  Object.keys(params2).forEach((key) => {
    const language = getLanguageByAlias(key);
    if (!language)
      return;
    const editorId2 = getLanguageEditorId(language);
    if (editorId2 && !paramsConfig[editorId2]) {
      const value = params2[key];
      const content = typeof value === "string" ? decodeHTML(value) : "";
      paramsConfig[editorId2] = { language, content };
      if (!paramsConfig.activeEditor) {
        paramsConfig.activeEditor = editorId2;
      }
    }
  });
  const lang = getLanguageByAlias(params2.language || params2.lang);
  const editorId = getLanguageEditorId(lang);
  if (editorId) {
    if (paramsConfig[editorId]?.language === lang) {
      paramsConfig.activeEditor = editorId;
    } else if (!paramsConfig[editorId]?.content && config[editorId]?.language === lang) {
      paramsConfig[editorId] = {
        ...config[editorId]
      };
      paramsConfig.activeEditor = editorId;
    } else if (!config[editorId]?.content) {
      paramsConfig[editorId] = {
        language: lang,
        content: ""
      };
      paramsConfig.activeEditor = editorId;
    }
  }
  const editorIds2 = ["markup", "style", "script"];
  const paramsActiveEditor = params2.activeEditor;
  const paramsActive = params2.active;
  paramsConfig.activeEditor = editorIds2.includes(paramsActiveEditor) ? paramsActiveEditor : paramsActiveEditor in editorIds2 ? editorIds2[paramsActiveEditor] : editorIds2.includes(paramsActive) ? paramsActive : paramsActive in editorIds2 ? editorIds2[paramsActive] : paramsConfig.activeEditor;
  if (typeof params2.languages === "string") {
    paramsConfig.languages = params2.languages.split(",").map((lang2) => lang2.trim()).map(getLanguageByAlias).filter(Boolean);
  }
  if (typeof params2.processors === "string") {
    paramsConfig.processors = params2.processors.split(",").map((processor) => processor.trim()).filter(Boolean);
  }
  if (typeof params2.tags === "string") {
    paramsConfig.tags = params2.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  }
  if (typeof params2.stylesheets === "string") {
    paramsConfig.stylesheets = params2.stylesheets.split(",").map((url3) => url3.trim()).filter(Boolean);
  }
  if (typeof params2.scripts === "string") {
    paramsConfig.scripts = params2.scripts.split(",").map((url3) => url3.trim()).filter(Boolean);
  }
  const allTools = ["console", "compiled", "tests"];
  const toolsNotSpecified = !params2.tools && allTools.map((t) => params2[t]).filter(Boolean).length === 0;
  const isToolsDisabled = params2.tools === "none" || params2.tools === false || params2.mode === "editor" || params2.mode === "codeblock" || params2.mode === "result" && toolsNotSpecified;
  if (isToolsDisabled) {
    paramsConfig.tools = { enabled: [], active: "", status: "none" };
  } else if (toolsNotSpecified) {
  } else {
    paramsConfig.tools = cloneObject(defaultConfig.tools);
    let status;
    const [paramToolsList, paramToolsStatus] = params2.tools?.split("|") || ["", ""];
    const paramTools = paramToolsList.split(",").map((t) => t.trim()).filter((t) => allTools.includes(t));
    if (paramTools.length > 0) {
      paramsConfig.tools.enabled = paramTools;
      paramsConfig.tools.active = paramTools[0];
    }
    const tools = Object.keys(params2).filter((k) => allTools.includes(k));
    tools.forEach((tool) => {
      if (!paramsConfig.tools)
        return;
      if (params2[tool] === true) {
        params2[tool] = "open";
      }
      if (params2[tool] === false) {
        params2[tool] = "none";
      }
      if (!status && ["open", "full", "closed"].includes(params2[tool])) {
        if (paramsConfig.tools.enabled && paramsConfig.tools.enabled !== "all" && !paramsConfig.tools.enabled.includes(tool)) {
          paramsConfig.tools.enabled.push(tool);
        }
        paramsConfig.tools.active = tool;
        paramsConfig.tools.status = params2[tool];
        status = paramsConfig.tools.status;
      }
      if (params2[tool] === "none") {
        if (paramsConfig.tools.enabled === "all") {
          paramsConfig.tools.enabled = [...allTools];
        }
        paramsConfig.tools.enabled = paramsConfig.tools.enabled?.filter((t) => t !== tool) || [];
        if (paramsConfig.tools.active === tool) {
          paramsConfig.tools.active = paramsConfig.tools.enabled?.[0] || "";
        }
      }
    });
    if (["open", "full", "closed"].includes(params2.tools)) {
      paramsConfig.tools.status = params2.tools;
    } else if (["open", "full", "closed"].includes(paramToolsStatus)) {
      paramsConfig.tools.status = paramToolsStatus;
    } else if (!paramsConfig.tools?.status && ["editor", "codeblock", "result"].includes(paramsConfig.mode || "")) {
      paramsConfig.tools = { enabled: [], active: "", status: "none" };
    } else if (!paramsConfig.tools.status) {
      paramsConfig.tools.status = "closed";
    }
  }
  if (params2.lite) {
    paramsConfig.mode = "lite";
  }
  if (typeof params2.customSettings === "string" && params2.customSettings.trim().startsWith("{")) {
    try {
      paramsConfig.customSettings = JSON.parse(stringToValidJson(params2.customSettings));
    } catch {
    }
  }
  Object.keys(params2).forEach((k) => {
    if (k.startsWith("markup.") || k.startsWith("style.") || k.startsWith("script.") || k.startsWith("tests.") || k.startsWith("customSettings.") || k.startsWith("imports.") || k.startsWith("types.") || k.startsWith("tools.")) {
      addProp(paramsConfig, k, params2[k]);
    }
  });
  return paramsConfig;
};

// src/livecodes/config/upgrade-config.ts
var upgradeSteps = [
  {
    to: "18",
    upgrade: (oldConfig, version2) => {
      const config = clone(oldConfig);
      const head = config.customSettings?.head;
      if (typeof head === "string") {
        config.head = head;
        delete config.customSettings?.head;
      }
      const htmlClasses = config.customSettings?.htmlClasses;
      if (typeof htmlClasses === "string") {
        if (typeof config.htmlAttrs === "string") {
          config.htmlAttrs = `class="${htmlClasses}" ${config.htmlAttrs}`;
        } else {
          config.htmlAttrs = {
            ...config.htmlAttrs,
            class: htmlClasses
          };
        }
        delete config.customSettings?.htmlClasses;
      }
      return {
        ...config,
        version: version2
      };
    }
  },
  {
    to: "0.6.0",
    upgrade: (oldConfig, version2) => {
      const config = clone(oldConfig);
      if (config.processors && "postcss" in config.processors) {
        config.processors = Object.keys(config.processors.postcss).filter(
          (p) => config.processors.postcss[p]
        );
      }
      return {
        ...config,
        version: version2
      };
    }
  },
  {
    to: "0.5.0",
    upgrade: (oldConfig, version2) => {
      const config = clone(oldConfig);
      if ("editor" in config && config.editor === "prism") {
        config.editor = "codejar";
      }
      if ("compiled" in config) {
        config.tools = config.tools || clone(defaultConfig.tools);
        config.tools.active = "compiled";
        config.tools.status = config.compiled;
        delete config.compiled;
      }
      if ("console" in config) {
        config.tools = config.tools || clone(defaultConfig.tools);
        config.tools.active = "console";
        config.tools.status = config.console;
        delete config.console;
      }
      if (config.script?.language === "graph") {
        config.script.language = "diagrams";
      }
      if (config.languages?.includes("graph")) {
        config.languages = config.languages.map((l) => l === "graph" ? "diagrams" : l);
      }
      if ("enableRestore" in config) {
        config.recoverUnsaved = config.enableRestore;
        delete config.enableRestore;
      }
      return {
        ...config,
        version: version2
      };
    }
  },
  {
    to: "0.4.0",
    upgrade: (oldConfig, version2) => {
      let config = clone(oldConfig);
      config = renameProperty(config, "update_delay", "delay");
      config = renameProperty(config, "allow_lang_change", "allowLangChange");
      if ("autoprefixer" in config) {
        config.processors = clone(defaultConfig.processors);
        config.processors.postcss = config.processors.postcss || {};
        config.processors.postcss.autoprefixer = config.autoprefixer;
        delete config.autoprefixer;
      }
      if ("baseUrl" in config) {
        delete config.baseUrl;
      }
      if ("cssPreset" in config && config.cssPreset === null) {
        config.cssPreset = "";
      }
      if ("editor" in config && typeof config.editor !== "string") {
        config.editor = void 0;
      }
      if ("language" in config) {
        config.activeEditor = getLanguageEditorId(config.language);
        delete config.language;
      }
      if ("modules" in config) {
        const imports = {
          ...config.modules.reduce(
            (acc, mod) => ({
              ...acc,
              ...mod.url ? { [mod.name]: mod.url } : {}
            }),
            {}
          )
        };
        if (Object.keys(imports).length > 0) {
          config.imports = imports;
        }
        const types = {
          ...config.modules.reduce(
            (acc, mod) => ({
              ...acc,
              ...mod.typesUrl ? { [mod.name]: mod.typesUrl } : {}
            }),
            {}
          )
        };
        if (Object.keys(types).length > 0) {
          config.types = types;
        }
        delete config.modules;
      }
      return {
        ...config,
        version: version2
      };
    }
  }
];
var upgradeConfig = (oldConfig) => {
  const oldVersion = isValidVersion(oldConfig.version) ? oldConfig.version : "0.0.0";
  const currentVersion = defaultConfig.version;
  if (isEarlier({ version: currentVersion, comparedTo: oldVersion })) {
    console.warn(
      `Unsupported config version '${oldVersion}'. Current LiveCodes version is '${currentVersion}'`
    );
    return oldConfig;
  }
  if (oldVersion === currentVersion)
    return oldConfig;
  return {
    ...upgradeSteps.sort((a, b) => isEarlier({ version: a.to, comparedTo: b.to }) ? -1 : 1).reduce(
      (config, step) => isEarlier({ version: config.version, comparedTo: step.to }) ? step.upgrade(config, step.to) : config,
      oldConfig
    ),
    version: currentVersion
  };
};
var isValidVersion = (version2) => {
  if (typeof version2 !== "string")
    return false;
  const numbers = version2.split(".");
  if (numbers.length !== 3)
    return false;
  if (numbers.map((n) => Number(n)).filter(isNaN).length !== 0)
    return false;
  return true;
};
var isEarlier = ({ version: version2, comparedTo }) => {
  if (!version2)
    return true;
  const versionNumbers = version2.split(".").map((n) => Number(n));
  const comparedToNumbers = comparedTo.split(".").map((n) => Number(n));
  for (const i in versionNumbers) {
    if (versionNumbers[i] < comparedToNumbers[i])
      return true;
  }
  return false;
};
var clone = (obj) => JSON.parse(JSON.stringify(obj));
var renameProperty = (obj, oldProp, newProp) => {
  const { [oldProp]: _, ...newObj } = {
    ...obj,
    ...oldProp in obj ? { [newProp]: obj[oldProp] } : {}
  };
  return newObj;
};

// src/livecodes/config/validate-config.ts
var validateConfig = (config) => {
  const is = (x, type2, arrayType) => {
    if (type2 === "array") {
      if (!Array.isArray(x))
        return false;
      if (arrayType) {
        return x.filter((l) => is(l, arrayType)).length > 0;
      }
      return true;
    }
    if (type2 === "object") {
      return x && typeof x === type2;
    }
    if (type2 === "number" && !isNaN(Number(x))) {
      return true;
    }
    return typeof x === type2;
  };
  const includes = (arr, x) => x != null && arr.includes(x);
  const views = ["split", "editor", "result"];
  const modes = [
    "full",
    "focus",
    "lite",
    "simple",
    "editor",
    "codeblock",
    "result"
  ];
  const themes2 = ["light", "dark"];
  const layout = ["responsive", "horizontal", "vertical"];
  const editorModes = ["vim", "emacs"];
  const tools = ["console", "compiled", "tests"];
  const toolsPaneStatus = ["", "full", "closed", "open", "none"];
  const editors2 = ["monaco", "codemirror", "codejar", "auto"];
  const editorIds2 = ["markup", "style", "script"];
  const zoomLevels = [1, 0.5, 0.25];
  const isFoldedLines = (x) => is(x, "object") && (is(x.from, "number") || is(x.to, "number"));
  const fixSfcLanguage = (lang, editorId) => editorId !== "markup" ? lang : lang === "svelte" ? "svelte-app" : lang === "vue" ? "vue-app" : lang;
  const validateEditorProps = (x, editorId) => ({
    language: fixSfcLanguage(
      getLanguageEditorId(fixSfcLanguage(x.language, editorId)) === editorId ? getLanguageByAlias(x.language) || defaultConfig[editorId].language : defaultConfig[editorId].language,
      editorId
    ),
    ...is(x.title, "string") ? { title: x.title } : {},
    ...is(x.content, "string") ? { content: x.content } : {},
    ...is(x.contentUrl, "string") ? { contentUrl: x.contentUrl } : {},
    ...is(x.hideTitle, "boolean") ? { hideTitle: x.hideTitle } : {},
    ...is(x.hiddenContent, "string") ? { hiddenContent: x.hiddenContent } : {},
    ...is(x.hiddenContentUrl, "string") ? { hiddenContentUrl: x.hiddenContentUrl } : {},
    ...is(x.foldedLines, "array", "object") && x.foldedLines?.every(isFoldedLines) ? { foldedLines: x.foldedLines } : {},
    ...is(x.order, "number") ? { order: x.order } : {},
    ...is(x.selector, "string") ? { selector: x.selector } : {},
    ...is(x.position, "object") ? { position: x.position } : {}
  });
  const validateTestsProps = (x) => ({
    ...x && is(x.language, "string") ? { language: x.language } : {},
    ...x && is(x.content, "string") ? { content: x.content } : {},
    ...x && is(x.contentUrl, "string") ? { contentUrl: x.contentUrl } : {},
    ...x && is(x.hiddenContent, "string") ? { hiddenContent: x.hiddenContent } : {},
    ...x && is(x.hiddenContentUrl, "string") ? { hiddenContentUrl: x.hiddenContentUrl } : {},
    ...x && is(x.selector, "string") ? { selector: x.selector } : {},
    ...x && is(x.position, "object") ? { position: x.position } : {}
  });
  const validateToolsProps = (x) => ({
    ...defaultConfig.tools,
    ...x && Array.isArray(x.enabled) ? { enabled: x.enabled.filter((t) => tools.includes(t)) } : {
      ...x && x.enabled == null && x.status === "none" ? { enabled: [] } : { enabled: defaultConfig.tools.enabled }
    },
    ...x && x.active != null && includes(tools, x.active) && (typeof x.enabled === "string" || x.enabled == null || Array.isArray(x.enabled) && includes(x.enabled, x.active)) ? { active: x.active } : { active: defaultConfig.tools.active },
    ...x && x.status != null && includes(toolsPaneStatus, x.status) ? { status: x.status } : { status: defaultConfig.tools.status }
  });
  return {
    ...is(config.title, "string") ? { title: config.title } : {},
    ...is(config.description, "string") ? { description: config.description } : {},
    ...is(config.head, "string") ? { head: config.head } : {},
    ...is(config.htmlAttrs, "string") || is(config.htmlAttrs, "object") ? { htmlAttrs: config.htmlAttrs } : {},
    ...is(config.tags, "array", "string") ? { tags: removeDuplicates(config.tags) } : {},
    ...is(config.autoupdate, "boolean") ? { autoupdate: config.autoupdate } : {},
    ...is(config.autosave, "boolean") ? { autosave: config.autosave } : {},
    ...is(config.autotest, "boolean") ? { autotest: config.autotest } : {},
    ...is(config.delay, "number") ? { delay: Number(config.delay) } : {},
    ...is(config.formatOnsave, "boolean") ? { formatOnsave: config.formatOnsave } : {},
    ...includes(views, config.view) ? { view: config.view } : {},
    ...includes(modes, config.mode) ? { mode: config.mode } : {},
    ...includes(themes2, config.theme) ? { theme: config.theme } : {},
    ...is(config.themeColor, "string") ? { themeColor: config.themeColor } : {},
    ...includes(layout, config.layout) ? { layout: config.layout } : {},
    ...is(config.editorTheme, "array", "string") || is(config.editorTheme, "string") ? { editorTheme: config.editorTheme } : {},
    ...is(config.appLanguage, "string") ? { appLanguage: config.appLanguage } : {},
    ...is(config.recoverUnsaved, "boolean") ? { recoverUnsaved: config.recoverUnsaved } : {},
    ...is(config.welcome, "boolean") ? { welcome: config.welcome } : {},
    ...is(config.showSpacing, "boolean") ? { showSpacing: config.showSpacing } : {},
    ...is(config.readonly, "boolean") ? { readonly: config.readonly } : {},
    ...is(config.allowLangChange, "boolean") ? { allowLangChange: config.allowLangChange } : {},
    ...includes(editorIds2, config.activeEditor) ? { activeEditor: config.activeEditor } : {},
    ...is(config.languages, "array", "string") ? { languages: removeDuplicates(config.languages) } : {},
    ...is(config.markup, "object") ? { markup: validateEditorProps(config.markup, "markup") } : {},
    ...is(config.style, "object") ? { style: validateEditorProps(config.style, "style") } : {},
    ...is(config.script, "object") ? { script: validateEditorProps(config.script, "script") } : {},
    ...is(config.tools, "object") ? { tools: validateToolsProps(config.tools) } : {},
    ...is(config.tests, "object") ? { tests: validateTestsProps(config.tests) } : {},
    ...includes(zoomLevels, Number(config.zoom)) ? { zoom: Number(config.zoom) } : {},
    ...is(config.stylesheets, "array", "string") ? { stylesheets: removeDuplicates(config.stylesheets) } : {},
    ...is(config.scripts, "array", "string") ? { scripts: removeDuplicates(config.scripts) } : {},
    ...is(config.cssPreset, "string") ? { cssPreset: config.cssPreset } : {},
    ...is(config.processors, "array", "string") ? { processors: removeDuplicates(config.processors) } : {},
    ...is(config.customSettings, "object") ? { customSettings: config.customSettings } : {},
    ...includes(editors2, config.editor) ? { editor: config.editor } : {},
    ...is(config.fontFamily, "string") ? { fontFamily: config.fontFamily } : {},
    ...is(config.fontSize, "number") ? { fontSize: Number(config.fontSize) } : {},
    ...is(config.useTabs, "boolean") ? { useTabs: config.useTabs } : {},
    ...is(config.tabSize, "number") ? { tabSize: Number(config.tabSize) } : {},
    ...is(config.lineNumbers, "boolean") || config.lineNumbers === "relative" ? { lineNumbers: config.lineNumbers } : {},
    ...is(config.wordWrap, "boolean") ? { wordWrap: config.wordWrap } : {},
    ...is(config.closeBrackets, "boolean") ? { closeBrackets: config.closeBrackets } : {},
    ...is(config.foldRegions, "boolean") ? { foldRegions: config.foldRegions } : {},
    ...is(config.semicolons, "boolean") ? { semicolons: config.semicolons } : {},
    ...is(config.singleQuote, "boolean") ? { singleQuote: config.singleQuote } : {},
    ...is(config.trailingComma, "boolean") ? { trailingComma: config.trailingComma } : {},
    ...is(config.emmet, "boolean") ? { emmet: config.emmet } : {},
    ...is(config.enableAI, "boolean") ? { enableAI: config.enableAI } : {},
    ...includes(editorModes, config.editorMode) ? { editorMode: config.editorMode } : {},
    ...is(config.imports, "object") ? { imports: config.imports } : {},
    ...is(config.types, "object") ? { types: config.types } : {},
    ...is(config.version, "string") ? { version: config.version } : {}
  };
};

// src/livecodes/config/config.ts
var appConfig = defaultConfig;
var getConfig = () => cloneObject(appConfig);
var setConfig = (newConfig) => {
  appConfig = cloneObject(newConfig);
};
var getContentConfig = (config) => cloneObject({
  title: config.title,
  description: config.description,
  head: config.head,
  htmlAttrs: config.htmlAttrs,
  tags: config.tags,
  activeEditor: config.activeEditor,
  languages: config.languages,
  markup: config.markup,
  style: config.style,
  script: config.script,
  stylesheets: config.stylesheets,
  scripts: config.scripts,
  cssPreset: config.cssPreset,
  processors: config.processors,
  customSettings: config.customSettings,
  imports: config.imports,
  types: config.types,
  tests: config.tests,
  version: config.version
});
var getUserConfig = (config) => cloneObject({
  autoupdate: config.autoupdate,
  autosave: config.autosave,
  autotest: config.autotest,
  appLanguage: config.appLanguage,
  delay: config.delay,
  formatOnsave: config.formatOnsave,
  layout: config.layout,
  recoverUnsaved: config.recoverUnsaved,
  welcome: config.welcome,
  showSpacing: config.showSpacing,
  ...getEditorConfig(config),
  ...getFormatterConfig(config)
});
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
var upgradeAndValidate = (config) => validateConfig(upgradeConfig(config));

// src/livecodes/cache/cache.ts
var defaultContentConfig = getContentConfig(defaultConfig);
var initialCache = {
  ...defaultContentConfig,
  markup: { ...defaultContentConfig.markup, compiled: "", modified: "" },
  style: { ...defaultContentConfig.style, compiled: "", modified: "" },
  script: { ...defaultContentConfig.script, compiled: "", modified: "" },
  tests: { language: "javascript", ...defaultContentConfig.tests, compiled: "" },
  result: "",
  styleOnlyUpdate: false
};
var cache = initialCache;
var getCache = () => ({ ...cache });
var setCache = (newCache = initialCache) => {
  cache = {
    ...newCache,
    markup: {
      modified: newCache.markup.compiled === cache.markup.compiled ? cache.markup.modified : "",
      ...newCache.markup
    },
    style: {
      modified: newCache.style.compiled === cache.style.compiled ? cache.style.modified : "",
      ...newCache.style
    },
    script: {
      modified: newCache.script.compiled === cache.script.compiled ? cache.script.modified : "",
      ...newCache.script
    },
    tests: {
      language: "javascript",
      compiled: "",
      ...newCache.tests
    },
    result: newCache.result || ""
  };
};
var updateCache = (editorId, language, modified) => {
  if (cache[editorId].language === language) {
    cache[editorId].modified = modified;
  }
};
var getCachedCode = () => ({
  markup: {
    language: cache.markup.language,
    content: cache.markup.content || "",
    compiled: cache.markup.modified || cache.markup.compiled || ""
  },
  style: {
    language: cache.style.language,
    content: cache.style.content || "",
    compiled: cache.style.modified || cache.style.compiled || ""
  },
  script: {
    language: cache.script.language,
    content: cache.script.content || "",
    compiled: cache.script.modified || cache.script.compiled || ""
  },
  result: cache.result || ""
});

// src/livecodes/cache/utils.ts
var removeExtra = (editor, keys5) => {
  const contentEditor = { ...editor };
  keys5.forEach((key) => delete contentEditor[key]);
  return contentEditor;
};
var cacheIsValid = (cache2, config) => {
  const excludedKeys = [
    "activeEditor",
    "title",
    "description",
    "tests"
  ];
  const extraCache = ["compiled", "modified"];
  const contentCache = {
    ...removeExtra(cache2, ["result", "styleOnlyUpdate", ...excludedKeys]),
    markup: removeExtra(cache2.markup, extraCache),
    style: removeExtra(cache2.style, extraCache),
    script: removeExtra(cache2.script, extraCache)
  };
  const contentConfig = removeExtra(config, excludedKeys);
  return JSON.stringify(contentCache) === JSON.stringify(contentConfig);
};

// src/livecodes/editor/fake-editor.ts
var createFakeEditor = (options) => {
  let value = options.value;
  let language = options.language;
  return {
    getValue: () => value,
    setValue: (v = "") => {
      value = v;
    },
    getLanguage: () => language,
    setLanguage: (lang, v) => {
      language = lang;
      if (v) {
        value = v;
      }
    },
    getEditorId: () => getLanguageEditorId(language) || "markup",
    focus: () => void 0,
    getPosition: () => ({ lineNumber: 1, column: 1 }),
    setPosition: () => void 0,
    onContentChanged: () => void 0,
    addKeyBinding: () => void 0,
    keyCodes: {
      CtrlEnter: "",
      ShiftEnter: "",
      Enter: "",
      UpArrow: "",
      DownArrow: "",
      ShiftAltF: ""
    },
    changeSettings: () => void 0,
    registerFormatter: () => void 0,
    format: async () => void 0,
    isReadonly: true,
    setTheme: () => void 0,
    undo: () => void 0,
    redo: () => void 0,
    destroy: () => void 0,
    isFake: true
  };
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

// src/livecodes/editor/create-editor.ts
var getEditorFileName = (editorName) => editorName === "codemirror" ? `codemirror.js` : editorName === "codejar" ? "codejar.js" : "monaco.js";
var loadEditor = async (editorName, options) => {
  const { baseUrl: baseUrl2 } = options;
  const fileName = getEditorFileName(editorName);
  const editorUrl = baseUrl2 + fileName;
  let editorModule = window[editorUrl];
  if (!editorModule) {
    editorModule = await import(editorUrl);
    window[editorUrl] = editorModule;
  }
  const createCodeEditor = editorModule.createEditor;
  const codeEditor = await createCodeEditor(options);
  return codeEditor;
};
var selectEditor = (options) => {
  const { editor, mode, editorId, activeEditor, isLite: isLite2, isHeadless: isHeadless2 } = options;
  const auto = isMobile() ? "codemirror" : "monaco";
  return (isHeadless2 ? "fake" : mode === "result" && editorId !== "console" && editorId !== "compiled" ? "fake" : mode === "simple" && editorId !== activeEditor ? "fake" : ["codemirror", "monaco", "codejar"].includes(editor || "") ? editor : editor === "auto" ? auto : mode === "simple" && editorId === activeEditor ? "codemirror" : mode === "codeblock" || isLite2 ? "codejar" : auto) || "monaco";
};
var getEditorOptions = (options) => {
  const codeblockOptions = {
    ...options,
    readOnly: true
  };
  const compiledCodeOptions = {
    ...options,
    readOnly: true
  };
  const consoleOptions = {
    ...options,
    lineNumbers: false
  };
  const embedOptions = {
    ...options,
    lineNumbers: false,
    readOnly: true
  };
  const editorId = options.editorId;
  return editorId === "console" ? consoleOptions : editorId === "compiled" ? compiledCodeOptions : editorId === "embed" ? embedOptions : options.mode === "codeblock" ? codeblockOptions : options;
};
var loadedFonts = [];
var loadFont = (fontName) => {
  if (!fontName || loadedFonts.includes(fontName))
    return;
  const font = fonts.find((f) => [f.id, f.name, f.label].includes(fontName));
  if (!font)
    return;
  loadStylesheet(font.url, "font-" + font.id);
  loadedFonts.push(fontName);
};
var createEditor = async (options) => {
  if (!options)
    throw new Error();
  const editorOptions = getEditorOptions(options);
  const editorName = selectEditor(editorOptions);
  if (editorName === "fake")
    return createFakeEditor(editorOptions);
  if (editorOptions.fontFamily) {
    loadFont(editorOptions.fontFamily);
  }
  const codeEditor = await loadEditor(editorName, editorOptions);
  const changeSettings = codeEditor.changeSettings;
  codeEditor.changeSettings = (settings) => {
    if (settings.fontFamily) {
      loadFont(settings.fontFamily);
    }
    return changeSettings(settings);
  };
  return codeEditor;
};

// src/livecodes/editor/custom-editor-commands.ts
var handler = (event) => {
  if (event.data.type === "customEditorCommand") {
    if (event.data.payload === "fork") {
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          keyCode: 83,
          shiftKey: true,
          ctrlKey: !navigator.platform.match("Mac"),
          metaKey: !!navigator.platform.match("Mac")
        })
      );
    }
    if (event.data.payload === "save") {
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          keyCode: 83,
          ctrlKey: !navigator.platform.match("Mac"),
          metaKey: !!navigator.platform.match("Mac")
        })
      );
    }
  }
};
var registerEditorCommands = (enable, eventsManager2) => {
  if (enable) {
    eventsManager2.addEventListener(window, "message", handler);
  } else {
    eventsManager2.removeEventListener(window, "message", handler);
  }
};

// src/livecodes/editor/blockly/blockly-editor.ts
var createBlocklyEditor = ({
  baseUrl: baseUrl2,
  eventsManager: eventsManager2
}) => {
  let blockly2;
  const loadBlockly = async () => {
    if (blockly2)
      return;
    const editorContainer = document.querySelector("#script");
    const blocklyElement = document.createElement("div");
    blocklyElement.id = "blockly";
    blocklyElement.classList.add("custom-editor");
    blocklyElement.innerHTML = `<span class="loading-custom-editor">Loading blockly editor...</span>`;
    editorContainer.appendChild(blocklyElement);
    blockly2 = await import(baseUrl2 + "blockly.js");
  };
  return {
    language: "blockly",
    show: async (show, options) => {
      if (!blockly2 && show) {
        await loadBlockly();
      }
      const blocklyEditor = document.querySelector("#blockly");
      if (!show || options.editors.script.getLanguage() !== "blockly") {
        if (blocklyEditor)
          blocklyEditor.style.display = "none";
        return;
      }
      if (blocklyEditor)
        blocklyEditor.style.display = "unset";
      await blockly2.showBlockly(options);
      registerEditorCommands(show, eventsManager2);
    },
    getContent: async (options) => {
      await loadBlockly();
      return blockly2.getBlocklyContent(options);
    },
    setTheme: (theme5) => {
      blockly2?.setBlocklyTheme(theme5);
    }
  };
};

// src/livecodes/editor/quill/quill-editor.ts
var createQuillEditor = ({
  baseUrl: baseUrl2,
  eventsManager: eventsManager2
}) => {
  let quillEditor;
  const loadEditor2 = async () => {
    if (quillEditor)
      return;
    const editorContainer = document.querySelector("#markup");
    const editorElement = document.createElement("div");
    editorElement.id = "quillEditor";
    editorElement.classList.add("custom-editor");
    editorElement.innerHTML = `<span class="loading-custom-editor">Loading rich text editor...</span>`;
    editorContainer.appendChild(editorElement);
    quillEditor = await import(baseUrl2 + "quill.js");
  };
  return {
    language: "richtext",
    show: async (show, options) => {
      if (!quillEditor && show) {
        await loadEditor2();
      }
      const editorContainer = document.querySelector("#quillEditor");
      if (!show || options.editors.markup.getLanguage() !== "richtext") {
        if (editorContainer)
          editorContainer.style.display = "none";
        return;
      }
      if (editorContainer)
        editorContainer.style.display = "unset";
      await quillEditor.showQuillEditor(options);
      registerEditorCommands(show, eventsManager2);
    },
    getContent: async (options) => {
      await loadEditor2();
      return quillEditor.getQuillEditorContent(options);
    },
    setTheme: (theme5) => {
      quillEditor?.setQuillEditorTheme(theme5);
    }
  };
};

// src/livecodes/editor/custom-editors.ts
var createCustomEditors = (options) => ({
  blockly: createBlocklyEditor(options),
  richtext: createQuillEditor(options)
});

// src/livecodes/editor/ts-compiler-options.ts
var hasJsx = [
  "jsx",
  "tsx",
  "react",
  "react-tsx",
  "sucrase",
  "babel",
  "flow",
  "solid",
  "solid.tsx",
  "stencil",
  "react-native",
  "react-native-tsx",
  "vue"
];

// src/livecodes/formatter/formatter.ts
var createFormatter = (baseUrl2) => {
  let worker;
  const initWorker = () => {
    if (worker)
      return;
    worker = new Worker(baseUrl2 + "format.worker.js?appCDN=" + getAppCDN());
    const configMessage = { type: "init", baseUrl: baseUrl2 };
    worker.postMessage(configMessage);
  };
  const load = async (languages2) => new Promise((resolve, reject) => {
    initWorker();
    const handler2 = (event) => {
      const message = event.data;
      if ((message.type === "loaded" || message.type === "load-failed") && message.payload === languages2) {
        worker?.removeEventListener("message", handler2);
        if (message.type === "loaded") {
          resolve("loaded formatter for: " + languages2.join(", "));
        } else if (message.type === "load-failed") {
          reject("failed loading formatter for: " + languages2.join(", "));
        }
      }
    };
    worker?.addEventListener("message", handler2);
    const loadMessage = {
      type: "load",
      payload: languages2
    };
    worker?.postMessage(loadMessage);
  });
  const getFormatFn = async (language) => {
    const formatFn = (value, cursorOffset, formatterConfig = {}) => new Promise((resolve, reject) => {
      initWorker();
      const handler2 = (event) => {
        const message = event.data;
        if ((message.type === "formatted" || message.type === "format-failed") && message.payload.language === language && message.payload.value === value && message.payload.cursorOffset === cursorOffset) {
          worker?.removeEventListener("message", handler2);
          if (message.type === "formatted") {
            resolve({
              formatted: message.payload.formatted,
              cursorOffset: message.payload.formattedCursorOffset
            });
          } else if (message.type === "format-failed") {
            reject({
              language,
              formatted: value,
              cursorOffset
            });
          }
        }
      };
      worker?.addEventListener("message", handler2);
      const formatMessage = {
        type: "format",
        payload: {
          language,
          value,
          cursorOffset,
          formatterConfig
        }
      };
      worker?.postMessage(formatMessage);
    });
    return formatFn;
  };
  const destroy2 = () => {
    worker?.terminate();
  };
  return {
    load,
    getFormatFn,
    destroy: destroy2
  };
};

// src/livecodes/formatter/get-formatter.ts
var getFormatter = (config, baseUrl2, lazy) => {
  const { readonly, mode } = config;
  if (readonly || mode === "codeblock" || mode === "result") {
    return createFakeFormatter();
  } else if (lazy) {
    return createLazyFormatter(baseUrl2);
  } else {
    return createFormatter(baseUrl2);
  }
};
var createLazyFormatter = (baseUrl2) => {
  const fakeFormatter = createFakeFormatter();
  let formatter2 = fakeFormatter;
  const lazyFormatter = {
    load: (languages2) => {
      loadFormatter();
      return formatter2.load(languages2);
    },
    getFormatFn: (language) => {
      loadFormatter();
      return formatter2.getFormatFn(language);
    },
    destroy: () => {
      lazyFormatter.load = fakeFormatter.load;
      lazyFormatter.getFormatFn = fakeFormatter.getFormatFn;
    }
  };
  const loadFormatter = function() {
    formatter2 = createFormatter(baseUrl2);
    lazyFormatter.load = formatter2.load;
    lazyFormatter.getFormatFn = formatter2.getFormatFn;
    lazyFormatter.destroy = formatter2.destroy;
  };
  return lazyFormatter;
};
function createFakeFormatter() {
  return {
    load: (_languages) => Promise.resolve("do nothing"),
    getFormatFn: (_language) => Promise.resolve(
      (value, cursorOffset) => Promise.resolve({ formatted: value, cursorOffset })
    ),
    destroy: () => void 0
  };
}

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
var isGithub = (url3) => isGithubDir(url3) || isGithubUrl(url3);
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

// src/livecodes/languages/jsx/react-runtime.ts
var reactRuntime = `
import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import App from "./script";
(() => {
  if (typeof App !== "function") return;
  const root = createRoot(document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement("div")));
  root.render(_jsx(App, {}));
})();
`;

// src/livecodes/languages/react-native/react-native-runtime.ts
var reactNativeRuntime = `
import { AppRegistry } from "react-native";
import App from "./script";
(() => {
  if (typeof App !== "function") return;
  const rootTag = document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement("div"));
  AppRegistry.registerComponent("App", () => App);
  AppRegistry.runApplication("App", { rootTag });
})();
`;

// src/livecodes/languages/solid/solid-runtime.ts
var solidRuntime = `
import { render, createComponent } from "solid-js/web";
import App from "./script";
(() => {
  if (typeof App !== "function") return;
  const root = document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement("div"));
  render(() => createComponent(App, {}), root);
})();
`;

// src/livecodes/toolspane/test-imports.ts
var testImports = {
  react: "https://esm.sh/react?dev",
  "react/jsx-runtime": "https://esm.sh/react/jsx-runtime?dev",
  "react-dom": "https://esm.sh/react-dom?dev",
  "react-dom/client": "https://esm.sh/react-dom/client?dev",
  "react-dom/test-utils": "https://esm.sh/react-dom/test-utils?dev",
  "@testing-library/dom": vendorsBaseUrl + "@testing-library/dom.js",
  "@testing-library/jest-dom": vendorsBaseUrl + "@testing-library/jest-dom.js",
  "@testing-library/react": vendorsBaseUrl + "@testing-library/react.js",
  "@testing-library/react/pure": vendorsBaseUrl + "@testing-library/react-pure.js",
  "@testing-library/user-event": vendorsBaseUrl + "@testing-library/user-event.js",
  chai: chaiUrl
};

// src/livecodes/result/result-page.ts
var createResultPage = async ({
  code,
  config,
  forExport,
  template,
  baseUrl: baseUrl2,
  singleFile,
  runTests: runTests2,
  compileInfo
}) => {
  const absoluteBaseUrl = getAbsoluteUrl(baseUrl2);
  const domParser = new DOMParser();
  const dom = domParser.parseFromString(template, "text/html");
  if (forExport) {
    dom.querySelector("script")?.remove();
    const utilsScript = dom.createElement("script");
    utilsScript.innerHTML = "window.livecodes = window.livecodes || {};";
    dom.head.appendChild(utilsScript);
  } else {
    const utilsScript = dom.createElement("script");
    utilsScript.src = absoluteBaseUrl + "result-utils.js";
    utilsScript.dataset.env = "development";
    dom.head.appendChild(utilsScript);
  }
  const addMetaTag = (name, content) => {
    const meta = dom.createElement("meta");
    meta.name = name;
    meta.content = content;
    dom.head.appendChild(meta);
  };
  if (config.title) {
    dom.title = config.title;
    addMetaTag("title", config.title);
  }
  if (config.description) {
    addMetaTag("description", config.description);
  }
  if (config.htmlAttrs) {
    addAttrs(dom.documentElement, config.htmlAttrs);
  }
  if (config.head) {
    dom.head.innerHTML += config.head;
  }
  if (config.cssPreset) {
    const presetUrl = cssPresets.find((preset) => preset.id === config.cssPreset)?.url;
    if (presetUrl) {
      const cssPreset = dom.createElement("link");
      cssPreset.rel = "stylesheet";
      cssPreset.id = "__livecodes__css-preset";
      cssPreset.href = getAbsoluteUrl(presetUrl, absoluteBaseUrl);
      dom.head.appendChild(cssPreset);
    }
  }
  config.stylesheets.forEach((url3) => {
    const stylesheet = dom.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = url3;
    dom.head.appendChild(stylesheet);
  });
  const markup = code.markup.compiled;
  dom.body.innerHTML += markup;
  let userDefinedImportmap = {};
  const importmapScript = dom.querySelector('script[type="importmap"]');
  if (importmapScript) {
    try {
      userDefinedImportmap = JSON.parse(importmapScript.innerHTML.trim());
    } catch {
    }
    importmapScript.remove();
  }
  const configImports = {
    ...config.imports,
    ...config.customSettings.imports,
    ...userDefinedImportmap.imports
  };
  const markupImports = getImports(code.markup.compiled);
  const scriptImports = getImports(code.script.compiled);
  const stylesheetImports = [
    ...new Set(
      [...markupImports, ...scriptImports].filter((mod) => {
        const isCss = mod.startsWith("data:text/css") || /\.css(\?|#|$)/i.test(mod);
        const isRelative = mod.startsWith(".");
        return isCss && (Object.keys(configImports).includes(mod) || !isRelative);
      })
    )
  ];
  stylesheetImports.forEach((mod) => {
    const url3 = configImports[mod] || modulesService.getUrl(mod);
    const stylesheet = dom.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = url3;
    dom.head.appendChild(stylesheet);
    if (Object.keys(configImports).includes(mod)) {
      configImports[mod] = "data:text/javascript;charset=UTF-8;base64,";
    }
  });
  if (singleFile) {
    const style = code.style.compiled;
    const styleElement = dom.createElement("style");
    styleElement.id = "__livecodes_styles__";
    styleElement.innerHTML = style;
    dom.head.appendChild(styleElement);
  } else {
    const EditorStylesheet = dom.createElement("link");
    EditorStylesheet.rel = "stylesheet";
    EditorStylesheet.href = "./style.css";
    dom.head.appendChild(EditorStylesheet);
  }
  const extra = dom.querySelectorAll('script[type="script-for-styles"]');
  extra.forEach((el) => el.remove());
  if (code.script.language === "blockly") {
    const extra2 = dom.querySelectorAll(
      'script[type="blockly/script"], script[data-type="blockly/script"], xml[type="blockly/xml"], xml[data-type="blockly/xml"]'
    );
    extra2.forEach((el) => el.remove());
  }
  const runtimeDependencies = ["markup", "style", "script"].map(
    (editorId) => ({
      language: code[editorId].language,
      compiled: code[editorId].compiled
    })
  );
  const compiledTests = runTests2 ? code.tests?.compiled || "" : "";
  const scriptCompiler = getLanguageCompiler(code.script.language);
  const scriptImportsInMarkup = markupImports.filter(isScriptImport);
  const scriptImportsInTests = runTests2 && !forExport ? getImports(compiledTests).filter(isScriptImport) : [];
  const importFromScript = Boolean(
    scriptImportsInMarkup.length > 0 || scriptCompiler?.loadAsExternalModule || scriptImportsInTests.length > 0
  );
  const jsxRuntimes = {
    jsx: reactRuntime,
    tsx: reactRuntime,
    react: reactRuntime,
    "react-tsx": reactRuntime,
    "react-native": reactNativeRuntime,
    "react-native-tsx": reactNativeRuntime,
    solid: solidRuntime,
    "solid.tsx": solidRuntime
  };
  const jsxRuntime = jsxRuntimes[code.script.language] || "";
  const reactImport = jsxRuntime === reactRuntime || jsxRuntime === reactNativeRuntime ? 'import React from "react";\n' : "";
  const shouldInsertJsxRuntime = Object.keys(jsxRuntimes).includes(code.script.language) && !config.customSettings[code.script.language]?.disableAutoRender && hasDefaultExport(code.script.compiled) && !hasCustomJsxRuntime(code.script.content || "", config) && !importFromScript;
  const hasPreact = scriptImports.find((mod) => mod === "preact");
  let compilerImports = {};
  for (const { language, compiled } of runtimeDependencies) {
    const compiler2 = getLanguageCompiler(language);
    if (!compiler2)
      continue;
    const compilerStyles = typeof compiler2.styles === "function" ? compiler2.styles({ compiled, baseUrl: absoluteBaseUrl, config }) : compiler2.styles || [];
    compilerStyles.forEach((depStyleUrl) => {
      const stylesheet = dom.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = isRelativeUrl(depStyleUrl) ? absoluteBaseUrl + depStyleUrl : depStyleUrl;
      dom.head.appendChild(stylesheet);
    });
    const compilerScripts = typeof compiler2.scripts === "function" ? compiler2.scripts({ compiled, baseUrl: absoluteBaseUrl, config }) : compiler2.scripts || [];
    compilerScripts.forEach((depScriptUrl) => {
      const depScript = dom.createElement("script");
      depScript.src = isRelativeUrl(depScriptUrl) ? absoluteBaseUrl + depScriptUrl : depScriptUrl;
      if (compiler2.deferScripts) {
        depScript.defer = true;
      }
      if (depScriptUrl.includes("-script-esm.")) {
        depScript.type = "module";
      }
      dom.head.appendChild(depScript);
    });
    if (compiler2.inlineScript) {
      if (typeof compiler2.inlineScript === "function") {
        compiler2.inlineScript = await compiler2.inlineScript({
          baseUrl: baseUrl2
        });
      }
      const inlineScript = dom.createElement("script");
      inlineScript.innerHTML = compiler2.inlineScript;
      dom.head.appendChild(inlineScript);
    }
    if (compiler2.imports) {
      compilerImports = {
        ...compilerImports,
        ...objectMap(compiler2.imports, (url3) => getAbsoluteUrl(url3, baseUrl2))
      };
    }
  }
  const styleExtension = getLanguageExtension(code.style.language);
  const externalModules = hasPreact ? "preact" : jsxRuntime === reactRuntime ? "react,react-dom" : [config.markup.language, config.script.language].find((lang) => lang.startsWith("vue")) ? "vue" : void 0;
  const userImports = config.customSettings.mapImports === false ? {} : {
    ...hasImports(code.script.compiled) ? createImportMap(code.script.compiled, config, { external: externalModules }) : {},
    ...hasImports(code.markup.compiled) ? createImportMap(code.markup.compiled, config, { external: externalModules }) : {},
    ...shouldInsertJsxRuntime ? createImportMap(reactImport + jsxRuntime, config) : {},
    ...runTests2 && !forExport && hasImports(compiledTests) ? createImportMap(compiledTests, config, { external: externalModules }) : {},
    ...stylesheetImports.reduce(
      (acc, url3) => ({
        ...acc,
        [url3]: toDataUrl("")
      }),
      {}
    ),
    ...createCSSModulesImportMap(
      code.script.compiled,
      code.style.compiled,
      compileInfo.cssModules,
      styleExtension
    ),
    ...createCSSModulesImportMap(
      code.markup.compiled,
      code.style.compiled,
      compileInfo.cssModules,
      styleExtension
    ),
    ...compileInfo.imports
  };
  const scriptImportKeys = Array.from(
    /* @__PURE__ */ new Set(["./script", ...scriptImportsInMarkup, ...scriptImportsInTests])
  );
  const scriptImport = importFromScript || shouldInsertJsxRuntime ? scriptImportKeys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: toDataUrl(
        replaceImports(code.script.compiled, config, {
          importMap: objectFilter(userImports, (_value, key2) => key2.startsWith("./")),
          external: externalModules
        })
      )
    }),
    {}
  ) : {};
  Object.keys(userImports).filter(
    (userKey) => Object.keys(configImports).find(
      (configKey) => configKey.endsWith("/") && userKey.startsWith(configKey)
    )
  ).forEach((userKey) => {
    delete userImports[userKey];
  });
  const reactImports = (() => {
    if (!externalModules)
      return {};
    if (hasPreact) {
      const preactUrl = modulesService.getModuleUrl("preact");
      return {
        preact: preactUrl,
        "preact/": preactUrl + "/"
      };
    }
    const reactUrl = modulesService.getModuleUrl("react");
    const reactDomUrl = modulesService.getModuleUrl("react-dom");
    return {
      react: reactUrl,
      "react/": reactUrl + "/",
      "react-dom": reactDomUrl,
      "react-dom/": reactDomUrl + "/"
    };
  })();
  const importMaps = {
    ...userDefinedImportmap,
    // for "scopes"
    imports: {
      ...userImports,
      ...scriptImport,
      ...reactImports,
      ...compilerImports,
      ...runTests2 ? testImports : {},
      ...configImports
    }
  };
  if (Object.keys(importMaps).length > 0) {
    const esModuleShims = dom.createElement("script");
    esModuleShims.src = modulesService.getUrl(esModuleShimsPath, getAppCDN());
    esModuleShims.async = true;
    dom.head.appendChild(esModuleShims);
    const importMapsScript = dom.createElement("script");
    importMapsScript.type = "importmap";
    importMapsScript.innerHTML = JSON.stringify(importMaps, null, 2);
    dom.head.appendChild(importMapsScript);
  }
  config.scripts.forEach((url3) => {
    const externalScript = dom.createElement("script");
    externalScript.src = url3;
    dom.head.appendChild(externalScript);
  });
  if (scriptCompiler?.inlineModule) {
    if (typeof scriptCompiler.inlineModule === "function") {
      scriptCompiler.inlineModule = await scriptCompiler.inlineModule({
        baseUrl: baseUrl2
      });
    }
    const inlineModule = dom.createElement("script");
    inlineModule.innerHTML = scriptCompiler.inlineModule;
    inlineModule.type = "module";
    dom.head.appendChild(inlineModule);
  }
  if (!importFromScript && !shouldInsertJsxRuntime) {
    const script = code.script.compiled;
    const scriptElement = dom.createElement("script");
    if (singleFile) {
      scriptElement.innerHTML = escapeScript(script);
    } else {
      scriptElement.src = "./script.js";
    }
    dom.body.appendChild(scriptElement);
    const scriptType3 = getLanguageCompiler(code.script.language)?.scriptType;
    if (scriptType3) {
      scriptElement.type = scriptType3;
    } else if (config.customSettings.scriptType != null) {
      if (config.customSettings.scriptType) {
        scriptElement.type = config.customSettings.scriptType;
      }
    } else if (isModuleScript(script)) {
      scriptElement.type = "module";
    }
  }
  if (shouldInsertJsxRuntime) {
    const jsxRuntimeScript = dom.createElement("script");
    jsxRuntimeScript.type = "module";
    jsxRuntimeScript.innerHTML = jsxRuntime;
    dom.body.appendChild(jsxRuntimeScript);
  }
  if (config.showSpacing && !forExport) {
    const spacingScript = dom.createElement("script");
    spacingScript.src = spacingJsUrl;
    spacingScript.dataset.env = "development";
    dom.body.appendChild(spacingScript);
  }
  if (runTests2 && !forExport) {
    const jestScript = dom.createElement("script");
    jestScript.src = browserJestUrl;
    jestScript.dataset.env = "development";
    dom.body.appendChild(jestScript);
    const testScript = dom.createElement("script");
    testScript.type = "module";
    testScript.dataset.env = "development";
    testScript.innerHTML = `
const {afterAll, afterEach, beforeAll, beforeEach, describe, fdescribe, xdescribe, it, test, fit, xtest, xit, expect, jest} = window.browserJest;
${escapeScript(compiledTests)}

window.browserJest.run().then(results => {
  parent.postMessage({type: 'testResults', payload: {results: results.testResults }}, '*');
}).catch((error) => {
  parent.postMessage({type: 'testResults', payload: {error: error.message || String(error)}}, '*');
});
    `;
    dom.body.appendChild(testScript);
  }
  return "<!DOCTYPE html>\n" + dom.documentElement.outerHTML;
};
var cleanResultFromDev = (result) => {
  const resultDOM = new DOMParser().parseFromString(result, "text/html");
  const elements = resultDOM.querySelectorAll('[data-env="development"]');
  elements.forEach((el) => {
    el.remove();
  });
  return resultDOM.documentElement.outerHTML;
};

// src/livecodes/services/permanent-url.ts
var sdkFiles = {
  esm: "livecodes.js",
  umd: "livecodes.umd.js",
  react: "react.js",
  vue: "vue.js",
  types: "index.d.ts"
};
var permanentUrlService = {
  getAppUrl: () => false ? `${location.origin}/` : `https://v${"47"}.livecodes.io/`,
  getSDKUrl: (file = "esm") => modulesService.getUrl(`livecodes@${"0.12.0"}/${sdkFiles[file]}`)
};

// src/livecodes/templates/get-starter-templates.ts
var mapBaseUrl = (content, baseUrl2) => {
  const replaceUrl = (url3) => url3.replace(/{{ __livecodes_baseUrl__ }}/g, getAbsoluteUrl(baseUrl2)).replace(/{{ __CDN_URL__ }}/g, modulesService.getUrl("~").replace("~", ""));
  if (typeof content === "string") {
    return replaceUrl(content);
  } else {
    return {
      ...content,
      url: replaceUrl(content.url)
    };
  }
};
var loadTemplates = async (baseUrl2) => (await import(baseUrl2 + "templates.js")).starterTemplates;
var getStarterTemplates = async (config, baseUrl2) => (await loadTemplates(baseUrl2)).filter((template) => {
  const enabledLanguages = config.languages?.map(getLanguageByAlias).filter(Boolean);
  if (!enabledLanguages)
    return true;
  if (template.name === "blank")
    return true;
  const templateLanguages = [
    template.markup?.language,
    template.style?.language,
    template.script?.language
  ];
  for (const language of templateLanguages) {
    const lang = getLanguageByAlias(language);
    if (!lang || !enabledLanguages.includes(lang))
      return false;
  }
  return true;
}).map((template) => ({
  ...template,
  markup: {
    ...template.markup,
    language: template.markup?.language || "html",
    content: mapBaseUrl(template.markup?.content || "", baseUrl2),
    ...template.markup?.contentUrl ? { contentUrl: mapBaseUrl(template.markup?.contentUrl || "", baseUrl2) } : {}
  },
  style: {
    ...template.style,
    language: template.style?.language || "css",
    content: mapBaseUrl(template.style?.content || "", baseUrl2),
    ...template.style?.contentUrl ? { contentUrl: mapBaseUrl(template.style?.contentUrl || "", baseUrl2) } : {}
  },
  script: {
    ...template.script,
    language: template.script?.language || "javascript",
    content: mapBaseUrl(template.script?.content || "", baseUrl2),
    ...template.script?.contentUrl ? { contentUrl: mapBaseUrl(template.script?.contentUrl || "", baseUrl2) } : {}
  },
  imports: objectMap(template.imports || {}, (url3) => mapBaseUrl(url3 || "", baseUrl2)),
  types: objectMap(template.types || {}, (url3) => mapBaseUrl(url3 || "", baseUrl2)),
  stylesheets: template.stylesheets?.map((url3) => mapBaseUrl(url3 || "", baseUrl2)),
  scripts: template.scripts?.map((url3) => mapBaseUrl(url3 || "", baseUrl2))
}));
var getTemplate = async (name, config, baseUrl2) => (await getStarterTemplates(config, baseUrl2)).filter(
  (template) => template.name.toLowerCase() === name.toLowerCase() || template.aliases?.map((a) => a.toLowerCase()).includes(name.toLowerCase())
)[0];

// node_modules/luna-console/esm/console/getPreview.js
var import_escape = __toESM(require_escape());
var import_toStr = __toESM(require_toStr());
var import_contain2 = __toESM(require_contain());
var import_startWith = __toESM(require_startWith());
var import_escapeJsStr = __toESM(require_escapeJsStr());
var import_each = __toESM(require_each());
var import_endWith = __toESM(require_endWith());
var import_isEmpty = __toESM(require_isEmpty());
var import_truncate = __toESM(require_truncate());

// node_modules/luna-console/esm/console/util.js
var import_upperFirst = __toESM(require_upperFirst());
function getObjType(obj) {
  if (obj.constructor && obj.constructor.name)
    return obj.constructor.name;
  return (0, import_upperFirst.default)({}.toString.call(obj).replace(/(\[object )|]/g, ""));
}

// node_modules/luna-console/esm/share/util.js
var import_map = __toESM(require_map());
var import_trim = __toESM(require_trim());
var import_root = __toESM(require_root());
var import_html6 = __toESM(require_html());
var import_isNum = __toESM(require_isNum());
var import_contain = __toESM(require_contain());
var import_toNum = __toESM(require_toNum());
var import_detectOs = __toESM(require_detectOs());
var import_loadImg = __toESM(require_loadImg());
var import_isHidden = __toESM(require_isHidden());
function exportCjs(module2, clazz) {
  try {
    module2.exports = clazz;
    module2.exports.default = clazz;
  } catch (e) {
  }
}
function classPrefix(name) {
  const prefix = `luna-${name}-`;
  function processClass(str) {
    return (0, import_map.default)((0, import_trim.default)(str).split(/\s+/), (singleClass) => {
      if ((0, import_contain.default)(singleClass, prefix)) {
        return singleClass;
      }
      return singleClass.replace(/[\w-]+/, (match) => `${prefix}${match}`);
    }).join(" ");
  }
  return function(str) {
    if (/<[^>]*>/g.test(str)) {
      try {
        const tree = import_html6.default.parse(str);
        traverseTree(tree, (node) => {
          if (node.attrs && node.attrs.class) {
            node.attrs.class = processClass(node.attrs.class);
          }
        });
        return import_html6.default.stringify(tree);
      } catch (e) {
        return processClass(str);
      }
    }
    return processClass(str);
  };
}
function traverseTree(tree, handler2) {
  for (let i = 0, len = tree.length; i < len; i++) {
    const node = tree[i];
    handler2(node);
    if (node.content) {
      traverseTree(node.content, handler2);
    }
  }
}
var hasTouchSupport = "ontouchstart" in import_root.default;
function getPlatform() {
  const os = (0, import_detectOs.default)();
  if (os === "os x") {
    return "mac";
  }
  return os;
}
function hasSelection(node) {
  const selection = window.getSelection();
  if (!selection || selection.type !== "Range" || selection.toString() === "") {
    return false;
  }
  const { anchorNode, focusNode } = selection;
  return selection.containsNode(node, true) || anchorNode && node.contains(anchorNode) || focusNode && node.contains(focusNode);
}

// node_modules/luna-console/esm/console/getPreview.js
var c = classPrefix("console");
function getPreview(obj, { topObj, level = 0, getterVal = false, unenumerable = true } = {}) {
  let json = "";
  let type2 = "";
  const keyNum = 5;
  const parts = [];
  let names = [];
  let objEllipsis = "";
  const circular = false;
  let i;
  topObj = topObj || obj;
  const passOpts = { getterVal, unenumerable, level: level + 1 };
  const doStringify = level === 0;
  const keyWrapper = `<span class="${c("key")}">`;
  const numWrapper = `<span class="${c("number")}">`;
  const nullWrapper = `<span class="${c("null")}">`;
  const strWrapper = `<span class="${c("string")}">`;
  const boolWrapper = `<span class="${c("boolean")}">`;
  const specialWrapper = `<span class="${c("special")}">`;
  const strEscape = (str) => (0, import_escape.default)(str).replace(/\\n/g, "\u21B5").replace(/\\f|\\r|\\t/g, "").replace(/\\/g, "");
  const wrapperEnd = "</span>";
  const wrapKey = (key) => keyWrapper + strEscape(key) + wrapperEnd;
  const wrapNum = (num) => numWrapper + num + wrapperEnd;
  const wrapRegExp = (str) => strWrapper + str + wrapperEnd;
  const wrapBool = (bool) => boolWrapper + bool + wrapperEnd;
  const wrapNull = (str) => nullWrapper + str + wrapperEnd;
  function wrapStr(str) {
    str = (0, import_toStr.default)(str);
    if ((0, import_contain2.default)(SPECIAL_VAL, str) || (0, import_startWith.default)(str, "Array[")) {
      return specialWrapper + strEscape(str) + wrapperEnd;
    }
    if (str.length > 100) {
      str = (0, import_truncate.default)(str, 100, {
        separator: " ",
        ellipsis: "\u2026"
      });
    }
    return strWrapper + strEscape(`"${str}"`) + wrapperEnd;
  }
  function objIteratee(name) {
    if (i > keyNum) {
      objEllipsis = ", \u2026";
      return;
    }
    const key = wrapKey(escapeJsonStr(name));
    if (!getterVal) {
      const descriptor = Object.getOwnPropertyDescriptor(obj, name);
      if (descriptor && descriptor.get) {
        parts.push(`${key}: ${wrapStr("(...)")}`);
        i++;
        return;
      }
    }
    parts.push(`${key}: ${getPreview(topObj[name], passOpts)}`);
    i++;
  }
  try {
    type2 = {}.toString.call(obj);
  } catch (e) {
    type2 = "[object Object]";
  }
  const isStr6 = type2 == "[object String]";
  const isArr4 = type2 == "[object Array]";
  const isObj4 = type2 == "[object Object]";
  const isNum8 = type2 == "[object Number]";
  const isRegExp4 = type2 == "[object RegExp]";
  const isSymbol2 = type2 == "[object Symbol]";
  const isFn4 = type2 == "[object Function]";
  const isBool4 = type2 == "[object Boolean]";
  if (circular) {
    json = wrapStr("[circular]");
  } else if (isStr6) {
    json = wrapStr(escapeJsonStr(obj));
  } else if (isRegExp4) {
    json = wrapRegExp(escapeJsonStr(obj.toString()));
  } else if (isFn4) {
    json = wrapStr("\u0192");
  } else if (isArr4) {
    if (doStringify) {
      json = "[";
      let len = obj.length;
      let arrEllipsis = "";
      if (len > 100) {
        len = 100;
        arrEllipsis = ", \u2026";
      }
      for (let i2 = 0; i2 < len; i2++) {
        parts.push(`${getPreview(obj[i2], passOpts)}`);
      }
      json += parts.join(", ") + arrEllipsis + "]";
    } else {
      json = `Array(${obj.length})`;
    }
  } else if (isObj4) {
    if (canBeProto(obj)) {
      obj = Object.getPrototypeOf(obj);
    }
    names = unenumerable ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    if (doStringify) {
      i = 1;
      json = "{";
      (0, import_each.default)(names, objIteratee);
      json += parts.join(", ") + objEllipsis + "}";
    } else {
      json = getObjType(obj);
      if (json === "Object")
        json = "{\u2026}";
    }
  } else if (isNum8) {
    json = obj + "";
    if ((0, import_endWith.default)(json, "Infinity") || json === "NaN") {
      json = `"${json}"`;
    } else {
      json = wrapNum(json);
    }
  } else if (isBool4) {
    json = wrapBool(obj ? "true" : "false");
  } else if (obj === null) {
    json = wrapNull("null");
  } else if (isSymbol2) {
    json = wrapStr("Symbol");
  } else if (obj === void 0) {
    json = wrapStr("undefined");
  } else {
    try {
      if (canBeProto(obj)) {
        obj = Object.getPrototypeOf(obj);
      }
      if (doStringify) {
        i = 1;
        json = "{";
        names = unenumerable ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
        (0, import_each.default)(names, objIteratee);
        json += parts.join(", ") + objEllipsis + "}";
      } else {
        json = getObjType(obj);
        if (json === "Object")
          json = "{\u2026}";
      }
    } catch (e) {
      json = wrapStr(obj);
    }
  }
  return json;
}
var SPECIAL_VAL = ["(...)", "undefined", "Symbol", "Object", "\u0192"];
function canBeProto(obj) {
  const emptyObj = (0, import_isEmpty.default)(Object.getOwnPropertyNames(obj));
  const proto = Object.getPrototypeOf(obj);
  return emptyObj && proto && proto !== Object.prototype;
}
function escapeJsonStr(str) {
  return (0, import_escapeJsStr.default)(str).replace(/\\'/g, "'").replace(/\t/g, "\\t");
}

// node_modules/luna-object-viewer/esm/object-viewer/index.js
var import_getProto = __toESM(require_getProto());
var import_isNum4 = __toESM(require_isNum());
var import_isBool2 = __toESM(require_isBool());
var import_lowerCase2 = __toESM(require_lowerCase());
var import_isObj2 = __toESM(require_isObj());
var import_isArr = __toESM(require_isArr());
var import_upperFirst3 = __toESM(require_upperFirst());
var import_keys2 = __toESM(require_keys());
var import_each4 = __toESM(require_each());
var import_toSrc = __toESM(require_toSrc());
var import_isPromise = __toESM(require_isPromise());
var import_type = __toESM(require_type());
var import__3 = __toESM(require__());
var import_difference = __toESM(require_difference());
var import_truncate3 = __toESM(require_truncate());
var import_isStr2 = __toESM(require_isStr());
var import_allKeys = __toESM(require_allKeys());
var import_filter = __toESM(require_filter());
var import_chunk2 = __toESM(require_chunk());
var import_toStr3 = __toESM(require_toStr());
var import_noop = __toESM(require_noop());
var import_naturalSort2 = __toESM(require_naturalSort());

// node_modules/luna-object-viewer/esm/object-viewer/Visitor.js
var import_extend = __toESM(require_extend());
var Visitor = class {
  constructor() {
    this.id = 0;
    this.visited = [];
  }
  set(val, extra) {
    const { visited, id: id2 } = this;
    const obj = {
      id: id2,
      val
    };
    (0, import_extend.default)(obj, extra);
    visited.push(obj);
    this.id++;
    return id2;
  }
  get(val) {
    const { visited } = this;
    for (let i = 0, len = visited.length; i < len; i++) {
      const obj = visited[i];
      if (val === obj.val)
        return obj;
    }
    return false;
  }
};

// node_modules/luna-object-viewer/esm/object-viewer/util.js
var import_toStr2 = __toESM(require_toStr());
var import_trim2 = __toESM(require_trim());
var import_escape2 = __toESM(require_escape());
var encode3 = (val) => {
  return (0, import_escape2.default)((0, import_toStr2.default)(val)).replace(/\n/g, "\u21B5").replace(/\f|\r|\t/g, "");
};
function getFnAbstract(str) {
  if (str.length > 500)
    str = str.slice(0, 500) + "...";
  return "\u0192 " + (0, import_trim2.default)(extractFnHead(str).replace("function", ""));
}
var regFnHead = /function(.*?)\((.*?)\)/;
function extractFnHead(str) {
  const fnHead = str.match(regFnHead);
  if (fnHead)
    return fnHead[0];
  return str;
}

// node_modules/luna-object-viewer/esm/object-viewer/Static.js
var import__2 = __toESM(require__());
var import_startWith3 = __toESM(require_startWith());
var import_isObj = __toESM(require_isObj());
var import_uniqId = __toESM(require_uniqId());
var import_upperFirst2 = __toESM(require_upperFirst());
var import_toNum3 = __toESM(require_toNum());
var import_chunk = __toESM(require_chunk());
var import_each3 = __toESM(require_each());
var import_isNaN = __toESM(require_isNaN());
var import_isNum3 = __toESM(require_isNum());
var import_isBool = __toESM(require_isBool());
var import_isStr = __toESM(require_isStr());
var import_truncate2 = __toESM(require_truncate());
var import_keys = __toESM(require_keys());
var import_lowerCase = __toESM(require_lowerCase());
var import_naturalSort = __toESM(require_naturalSort());

// node_modules/luna-object-viewer/esm/share/Component.js
var import_Emitter = __toESM(require_Emitter());
var import__ = __toESM(require__());

// node_modules/luna-object-viewer/esm/share/util.js
var import_map2 = __toESM(require_map());
var import_trim3 = __toESM(require_trim());
var import_root2 = __toESM(require_root());
var import_html7 = __toESM(require_html());
var import_isNum2 = __toESM(require_isNum());
var import_contain3 = __toESM(require_contain());
var import_toNum2 = __toESM(require_toNum());
var import_detectOs2 = __toESM(require_detectOs());
var import_loadImg2 = __toESM(require_loadImg());
var import_isHidden2 = __toESM(require_isHidden());
function exportCjs2(module2, clazz) {
  try {
    module2.exports = clazz;
    module2.exports.default = clazz;
  } catch (e) {
  }
}
function classPrefix2(name) {
  const prefix = `luna-${name}-`;
  function processClass(str) {
    return (0, import_map2.default)((0, import_trim3.default)(str).split(/\s+/), (singleClass) => {
      if ((0, import_contain3.default)(singleClass, prefix)) {
        return singleClass;
      }
      return singleClass.replace(/[\w-]+/, (match) => `${prefix}${match}`);
    }).join(" ");
  }
  return function(str) {
    if (/<[^>]*>/g.test(str)) {
      try {
        const tree = import_html7.default.parse(str);
        traverseTree2(tree, (node) => {
          if (node.attrs && node.attrs.class) {
            node.attrs.class = processClass(node.attrs.class);
          }
        });
        return import_html7.default.stringify(tree);
      } catch (e) {
        return processClass(str);
      }
    }
    return processClass(str);
  };
}
function traverseTree2(tree, handler2) {
  for (let i = 0, len = tree.length; i < len; i++) {
    const node = tree[i];
    handler2(node);
    if (node.content) {
      traverseTree2(node.content, handler2);
    }
  }
}
var hasTouchSupport2 = "ontouchstart" in import_root2.default;
function getPlatform2() {
  const os = (0, import_detectOs2.default)();
  if (os === "os x") {
    return "mac";
  }
  return os;
}
function hasSelection2(node) {
  const selection = window.getSelection();
  if (!selection || selection.type !== "Range" || selection.toString() === "") {
    return false;
  }
  const { anchorNode, focusNode } = selection;
  return selection.containsNode(node, true) || anchorNode && node.contains(anchorNode) || focusNode && node.contains(focusNode);
}

// node_modules/luna-object-viewer/esm/share/Component.js
var import_each2 = __toESM(require_each());
var import_extend2 = __toESM(require_extend());
var import_defaults = __toESM(require_defaults());
var import_remove = __toESM(require_remove2());
var import_theme = __toESM(require_theme());
var import_startWith2 = __toESM(require_startWith());
var Component = class extends import_Emitter.default {
  constructor(container, { compName }, { theme: t = "light" } = {}) {
    super();
    this.subComponents = [];
    this.theme = "";
    this.onThemeChange = (t2) => {
      if (this.options.theme === "auto") {
        this.setTheme(t2);
      }
    };
    this.compName = compName;
    this.c = classPrefix2(compName);
    this.options = {};
    this.container = container;
    this.$container = (0, import__.default)(container);
    this.$container.addClass([
      `luna-${compName}`,
      this.c(`platform-${getPlatform2()}`)
    ]);
    this.on("changeOption", (name, val) => {
      if (name === "theme" && val) {
        let t2 = val;
        if (val === "auto") {
          t2 = import_theme.default.get();
        }
        this.setTheme(t2);
        (0, import_each2.default)(this.subComponents, (component) => component.setOption("theme", val));
      }
    });
    import_theme.default.on("change", this.onThemeChange);
    this.setOption("theme", t);
  }
  destroy() {
    this.destroySubComponents();
    const { $container } = this;
    const classes = $container.attr("class");
    (0, import_each2.default)(classes.split(/\s+/), (c2) => {
      if ((0, import_startWith2.default)(c2, `luna-${this.compName}`)) {
        $container.rmClass(c2);
      }
    });
    $container.html("");
    this.emit("destroy");
    this.removeAllListeners();
    import_theme.default.off("change", this.onThemeChange);
  }
  setOption(name, val) {
    const options = this.options;
    let newOptions = {};
    if (typeof name === "string") {
      newOptions[name] = val;
    } else {
      newOptions = name;
    }
    (0, import_each2.default)(newOptions, (val2, name2) => {
      const oldVal = options[name2];
      options[name2] = val2;
      if (val2 === oldVal) {
        return;
      }
      this.emit("changeOption", name2, val2, oldVal);
    });
  }
  getOption(name) {
    return this.options[name];
  }
  addSubComponent(component) {
    component.setOption("theme", this.options.theme);
    this.subComponents.push(component);
  }
  removeSubComponent(component) {
    (0, import_remove.default)(this.subComponents, (com) => com === component);
  }
  destroySubComponents() {
    (0, import_each2.default)(this.subComponents, (component) => component.destroy());
    this.subComponents = [];
  }
  initOptions(options, defs = {}) {
    (0, import_defaults.default)(options, defs);
    (0, import_extend2.default)(this.options, options);
  }
  find(selector) {
    return this.$container.find(this.c(selector));
  }
  setTheme(theme5) {
    const { c: c2, $container } = this;
    if (this.theme) {
      $container.rmClass(c2(`theme-${this.theme}`));
    }
    $container.addClass(c2(`theme-${theme5}`));
    this.theme = theme5;
  }
};

// node_modules/luna-object-viewer/esm/object-viewer/Static.js
var JsonViewer = class extends Component {
  constructor(container) {
    super(container, { compName: "object-viewer" });
    this.onItemClick = (e) => {
      const { map: map8, c: c2 } = this;
      const $this = (0, import__2.default)(e.curTarget);
      const circularId = $this.data("object-id");
      const $firstSpan = $this.find("span").eq(0);
      if ($this.data("first-level"))
        return;
      if (circularId) {
        $this.find("ul").html(this.objToHtml(map8[circularId], false));
        $this.rmAttr("data-object-id");
      }
      e.stopImmediatePropagation();
      if (!$firstSpan.hasClass(c2("expanded")))
        return;
      const $ul = $this.find("ul").eq(0);
      if ($firstSpan.hasClass(c2("collapsed"))) {
        $firstSpan.rmClass(c2("collapsed"));
        $ul.show();
      } else {
        $firstSpan.addClass(c2("collapsed"));
        $ul.hide();
      }
      this.emit("change");
    };
    this.bindEvent();
  }
  set(data) {
    if ((0, import_isStr.default)(data))
      data = JSON.parse(data);
    this.data = {
      id: (0, import_uniqId.default)("json"),
      enumerable: {
        0: data
      }
    };
    this.map = {};
    createMap(this.map, this.data);
    this.render();
  }
  destroy() {
    super.destroy();
    this.$container.off("click", "li", this.onItemClick);
  }
  objToHtml(data, firstLevel) {
    let ret = "";
    (0, import_each3.default)(["enumerable", "unenumerable", "symbol"], (type2) => {
      if (!data[type2])
        return;
      const typeKeys = (0, import_keys.default)(data[type2]);
      (0, import_naturalSort.default)(typeKeys);
      for (let i = 0, len = typeKeys.length; i < len; i++) {
        const key = typeKeys[i];
        ret += this.createEl(key, data[type2][key], type2, firstLevel);
      }
    });
    if (data.proto) {
      if (ret === "") {
        ret = this.objToHtml(data.proto);
      } else {
        ret += this.createEl("[[Prototype]]", data.proto, "proto");
      }
    }
    return ret;
  }
  createEl(key, val, keyType, firstLevel = false) {
    const { c: c2 } = this;
    let type2 = typeof val;
    if (val === null) {
      return `<li>${wrapKey(key)}<span class="${c2("null")}">null</span></li>`;
    } else if ((0, import_isNum3.default)(val) || (0, import_isBool.default)(val)) {
      return `<li>${wrapKey(key)}<span class="${c2(type2)}">${encode3(val)}</span></li>`;
    }
    if (val.type === "RegExp")
      type2 = "regexp";
    if (val.type === "Number")
      type2 = "number";
    if (val.type === "Number" || val.type === "RegExp") {
      return `<li>${wrapKey(key)}<span class="${c2(type2)}">${encode3(val.value)}</span></li>`;
    } else if (val.type === "Undefined" || val.type === "Symbol") {
      return `<li>${wrapKey(key)}<span class="${c2("special")}">${(0, import_lowerCase.default)(val.type)}</span></li>`;
    } else if (val === "(...)") {
      return `<li>${wrapKey(key)}<span class="${c2("special")}">${val}</span></li>`;
    } else if ((0, import_isObj.default)(val)) {
      const id2 = val.id;
      const referenceId = val.reference;
      const objAbstract = getObjAbstract(val) || (0, import_upperFirst2.default)(type2);
      const icon = firstLevel ? "" : `<span class="${c2("expanded collapsed")}"><span class="${c2("icon icon-caret-right")}"></span><span class="${c2("icon icon-caret-down")}"></span></span>`;
      let obj = `<li ${firstLevel ? 'data-first-level="true"' : ""} ${'data-object-id="' + (referenceId || id2) + '"'}>${icon}${wrapKey(key)}<span class="${c2("open")}">${firstLevel ? "" : objAbstract}</span><ul class="${c2(type2)}" ${firstLevel ? "" : 'style="display:none"'}>`;
      if (firstLevel)
        obj += this.objToHtml(this.map[id2]);
      return obj + `</ul><span class="${c2("close")}"></span></li>`;
    }
    function wrapKey(key2) {
      if (firstLevel)
        return "";
      if ((0, import_isObj.default)(val) && val.jsonSplitArr)
        return "";
      let keyClass = c2("key");
      if (keyType === "unenumerable" || keyType === "symbol") {
        keyClass = c2("key-lighter");
      } else if (keyType === "proto") {
        keyClass = c2("key-special");
      }
      return `<span class="${keyClass}">${encode3(key2)}</span>: `;
    }
    if ((0, import_isStr.default)(val) && val.length > 1e4) {
      val = (0, import_truncate2.default)(val, 50, {
        separator: " ",
        ellipsis: "\u2026"
      });
    }
    return `<li>${wrapKey(key)}<span class="${c2(typeof val)}">"${encode3(val)}"</span></li>`;
  }
  render() {
    const data = this.map[this.data.id];
    this.$container.html(this.objToHtml(data, true));
  }
  bindEvent() {
    this.$container.on("click", "li", this.onItemClick);
  }
};
function createMap(map8, data) {
  const id2 = data.id;
  if (!id2 && id2 !== 0)
    return;
  const isArr4 = data.type && (0, import_startWith3.default)(data.type, "Array");
  if (isArr4 && data.enumerable) {
    const arr = objToArr(data, id2, data.type);
    if (arr.length > 100)
      data = splitBigArr(arr);
  }
  map8[id2] = data;
  const values = [];
  (0, import_each3.default)(["enumerable", "unenumerable", "symbol"], (type2) => {
    if (!data[type2])
      return;
    for (const key in data[type2]) {
      values.push(data[type2][key]);
    }
  });
  if (data.proto) {
    values.push(data.proto);
  }
  for (let i = 0, len = values.length; i < len; i++) {
    const val = values[i];
    if ((0, import_isObj.default)(val))
      createMap(map8, val);
  }
}
function splitBigArr(data) {
  let idx = 0;
  const enumerable = {};
  (0, import_each3.default)((0, import_chunk.default)(data, 100), (val) => {
    const obj = {};
    const startIdx = idx;
    obj.type = "[" + startIdx;
    obj.enumerable = {};
    (0, import_each3.default)(val, (val2) => {
      obj.enumerable[idx] = val2;
      idx += 1;
    });
    const endIdx = idx - 1;
    obj.type += (endIdx - startIdx > 0 ? " \u2026 " + endIdx : "") + "]";
    obj.id = (0, import_uniqId.default)("json");
    obj.jsonSplitArr = true;
    enumerable[idx] = obj;
  });
  const ret = {};
  ret.enumerable = enumerable;
  ret.id = data.id;
  ret.type = data.type;
  if (data.unenumerable)
    ret.unenumerable = data.unenumerable;
  if (data.symbol)
    ret.symbol = data.symbol;
  if (data.proto)
    ret.proto = data.proto;
  return ret;
}
function objToArr(data, id2, type2) {
  const ret = [];
  const enumerable = {};
  (0, import_each3.default)(data.enumerable, (val, key) => {
    const idx = (0, import_toNum3.default)(key);
    if (!(0, import_isNaN.default)(idx)) {
      ret[idx] = val;
    } else {
      enumerable[key] = val;
    }
  });
  ret.enumerable = enumerable;
  ret.type = type2;
  ret.id = id2;
  if (data.unenumerable)
    ret.unenumerable = data.unenumerable;
  if (data.symbol)
    ret.symbol = data.symbol;
  if (data.proto)
    ret.proto = data.proto;
  return ret;
}
function getObjAbstract(data) {
  const { type: type2, value } = data;
  if (!type2)
    return;
  if (type2 === "Function") {
    return getFnAbstract(value);
  }
  if (type2 === "Array" && data.unenumerable) {
    return `Array(${data.unenumerable.length})`;
  }
  return data.type;
}

// node_modules/luna-object-viewer/esm/object-viewer/index.js
var ObjectViewer = class extends Component {
  constructor(container, options = {}) {
    super(container, { compName: "object-viewer" });
    this.onItemClick = (e) => {
      const { map: map8, c: c2 } = this;
      if (hasSelection2(e.curTarget)) {
        return;
      }
      const $this = (0, import__3.default)(e.curTarget);
      const circularId = $this.data("object-id");
      const $firstSpan = $this.find("span").eq(0);
      if ($this.data("first-level"))
        return;
      if (circularId) {
        $this.find("ul").html(this.objToHtml(map8[circularId], false));
        $this.rmAttr("data-object-id");
      }
      e.stopImmediatePropagation();
      if (!$firstSpan.hasClass(c2("expanded")))
        return;
      const $ul = $this.find("ul").eq(0);
      if ($firstSpan.hasClass(c2("collapsed"))) {
        $firstSpan.rmClass(c2("collapsed"));
        $ul.show();
      } else {
        $firstSpan.addClass(c2("collapsed"));
        $ul.hide();
      }
      this.emit("change");
    };
    this.initOptions(options, {
      prototype: true,
      unenumerable: false,
      accessGetter: false
    });
    this.bindEvent();
    if (this.options.object) {
      this.set(this.options.object);
    }
  }
  set(data) {
    this.data = [data];
    this.visitor = new Visitor();
    this.map = {};
    this.render();
  }
  destroy() {
    super.destroy();
    this.$container.off("click", "li", this.onItemClick);
  }
  objToHtml(data, firstLevel) {
    const { visitor } = this;
    let self2 = data;
    let isBigArr = false;
    const visitedObj = visitor.get(data);
    if (visitedObj && visitedObj.self) {
      self2 = visitedObj.self;
    }
    let ret = "";
    const types = ["enumerable"];
    let enumerableKeys = (0, import_keys2.default)(data);
    let unenumerableKeys = [];
    let symbolKeys = [];
    let virtualKeys = [];
    const virtualData = {};
    if (this.options.unenumerable && !firstLevel) {
      types.push("unenumerable");
      types.push("symbol");
      unenumerableKeys = (0, import_difference.default)((0, import_allKeys.default)(data, {
        prototype: false,
        unenumerable: true
      }), enumerableKeys);
      symbolKeys = (0, import_filter.default)((0, import_allKeys.default)(data, {
        prototype: false,
        symbol: true
      }), (key) => {
        return typeof key === "symbol";
      });
    }
    if ((0, import_isArr.default)(data) && data.length > 100) {
      types.unshift("virtual");
      isBigArr = true;
      let idx = 0;
      const map8 = {};
      (0, import_each4.default)((0, import_chunk2.default)(data, 100), (val) => {
        const obj = /* @__PURE__ */ Object.create(null);
        const startIdx = idx;
        let key = "[" + startIdx;
        (0, import_each4.default)(val, (val2) => {
          obj[idx] = val2;
          map8[idx] = true;
          idx++;
        });
        const endIdx = idx - 1;
        key += (endIdx - startIdx > 0 ? " \u2026 " + endIdx : "") + "]";
        virtualData[key] = obj;
      });
      virtualKeys = (0, import_keys2.default)(virtualData);
      enumerableKeys = (0, import_filter.default)(enumerableKeys, (val) => !map8[val]);
    }
    (0, import_each4.default)(types, (type2) => {
      let typeKeys = [];
      if (type2 === "symbol") {
        typeKeys = symbolKeys;
      } else if (type2 === "unenumerable") {
        typeKeys = unenumerableKeys;
      } else if (type2 === "virtual") {
        typeKeys = virtualKeys;
      } else {
        typeKeys = enumerableKeys;
      }
      if (!isBigArr) {
        (0, import_naturalSort2.default)(typeKeys);
      }
      for (let i = 0, len = typeKeys.length; i < len; i++) {
        const key = (0, import_toStr3.default)(typeKeys[i]);
        let val = "";
        const descriptor = Object.getOwnPropertyDescriptor(data, key);
        const hasGetter = descriptor && descriptor.get;
        const hasSetter = descriptor && descriptor.set;
        if (hasGetter && !this.options.accessGetter) {
          val = "(...)";
        } else {
          try {
            if (type2 === "virtual") {
              val = virtualData[key];
            } else {
              val = self2[key];
            }
            if ((0, import_isPromise.default)(val)) {
              ;
              val.catch(import_noop.default);
            }
          } catch (e) {
            if (e instanceof Error) {
              val = e.message;
            } else {
              val = (0, import_toStr3.default)(e);
            }
          }
        }
        ret += this.createEl(key, data, val, type2, firstLevel);
        if (hasGetter) {
          ret += this.createEl(`get ${key}`, data, descriptor.get, type2, firstLevel);
        }
        if (hasSetter) {
          ret += this.createEl(`set ${key}`, data, descriptor.set, type2, firstLevel);
        }
      }
    });
    if (this.options.prototype) {
      const proto = (0, import_getProto.default)(data);
      if (!firstLevel && proto) {
        if (ret === "") {
          const id2 = visitor.set(proto, {
            self: data
          });
          this.map[id2] = proto;
          ret = this.objToHtml(proto);
        } else {
          ret += this.createEl("[[Prototype]]", self2 || data, proto, "proto");
        }
      }
    }
    return ret;
  }
  createEl(key, self2, val, keyType, firstLevel = false) {
    const { visitor, c: c2 } = this;
    let t = typeof val;
    let valType = (0, import_type.default)(val, false);
    if (keyType === "virtual")
      valType = key;
    if (val === null) {
      return `<li>${wrapKey(key)}<span class="${c2("null")}">null</span></li>`;
    } else if ((0, import_isNum4.default)(val) || (0, import_isBool2.default)(val)) {
      return `<li>${wrapKey(key)}<span class="${c2(t)}">${encode3(val)}</span></li>`;
    }
    if (valType === "RegExp")
      t = "regexp";
    if (valType === "Number")
      t = "number";
    if (valType === "Undefined" || valType === "Symbol") {
      return `<li>${wrapKey(key)}<span class="${c2("special")}">${(0, import_lowerCase2.default)(valType)}</span></li>`;
    } else if (val === "(...)") {
      return `<li>${wrapKey(key)}<span class="${c2("special")}">${val}</span></li>`;
    } else if ((0, import_isObj2.default)(val)) {
      const visitedObj = visitor.get(val);
      let id2;
      if (visitedObj) {
        id2 = visitedObj.id;
      } else {
        const extra = {};
        if (keyType === "proto") {
          extra.self = self2;
        }
        id2 = visitor.set(val, extra);
        this.map[id2] = val;
      }
      let objAbstract = "Object";
      if (t === "regexp") {
        objAbstract = `<span class="${c2(t)}">${encode3(val)}`;
      } else {
        objAbstract = encode3(getObjAbstract2(val, valType) || (0, import_upperFirst3.default)(t));
      }
      const icon = firstLevel ? "" : `<span class="${c2("expanded collapsed")}"><span class="${c2("icon icon-caret-right")}"></span><span class="${c2("icon icon-caret-down")}"></span></span>`;
      let obj = `<li ${firstLevel ? 'data-first-level="true"' : ""} ${'data-object-id="' + id2 + '"'}>${icon}${wrapKey(key)}<span class="${c2("open")}">${firstLevel ? "" : objAbstract}</span><ul class="${c2(t)}" ${firstLevel ? "" : 'style="display:none"'}>`;
      if (firstLevel)
        obj += this.objToHtml(val);
      return obj + `</ul><span class="${c2("close")}"></span></li>`;
    }
    function wrapKey(key2) {
      if (firstLevel)
        return "";
      if ((0, import_isObj2.default)(val) && keyType === "virtual")
        return "";
      let keyClass = c2("key");
      if (keyType === "unenumerable" || keyType === "symbol") {
        keyClass = c2("key-lighter");
      } else if (keyType === "proto") {
        keyClass = c2("key-special");
      }
      return `<span class="${keyClass}">${encode3(key2)}</span>: `;
    }
    if ((0, import_isStr2.default)(val) && val.length > 1e4) {
      val = (0, import_truncate3.default)(val, 50, {
        separator: " ",
        ellipsis: "\u2026"
      });
    }
    return `<li>${wrapKey(key)}<span class="${c2(typeof val)}">"${encode3(val)}"</span></li>`;
  }
  render() {
    this.$container.html(this.objToHtml(this.data, true));
  }
  bindEvent() {
    this.$container.on("click", "li", this.onItemClick);
    this.on("changeOption", (name, val) => {
      switch (name) {
        case "object":
          this.set(val);
          break;
        case "unenumerable":
        case "prototype":
        case "accessGetter":
          this.render();
          break;
      }
    });
  }
};
function getObjAbstract2(data, type2) {
  if (!type2)
    return;
  if (type2 === "Function") {
    return getFnAbstract((0, import_toSrc.default)(data));
  }
  if (type2 === "Array") {
    return `Array(${data.length})`;
  }
  return type2;
}
if (typeof module !== "undefined") {
  ;
  ObjectViewer.Static = JsonViewer;
  exportCjs2(module, ObjectViewer);
}

// node_modules/luna-data-grid/esm/data-grid/index.js
var import__5 = __toESM(require__());
var import_stripIndent = __toESM(require_stripIndent());

// node_modules/luna-data-grid/esm/share/Component.js
var import_Emitter2 = __toESM(require_Emitter());
var import__4 = __toESM(require__());

// node_modules/luna-data-grid/esm/share/util.js
var import_map3 = __toESM(require_map());
var import_trim4 = __toESM(require_trim());
var import_root3 = __toESM(require_root());
var import_html8 = __toESM(require_html());
var import_isNum5 = __toESM(require_isNum());
var import_contain4 = __toESM(require_contain());
var import_toNum4 = __toESM(require_toNum());
var import_detectOs3 = __toESM(require_detectOs());
var import_loadImg3 = __toESM(require_loadImg());
var import_isHidden3 = __toESM(require_isHidden());
function exportCjs3(module2, clazz) {
  try {
    module2.exports = clazz;
    module2.exports.default = clazz;
  } catch (e) {
  }
}
function classPrefix3(name) {
  const prefix = `luna-${name}-`;
  function processClass(str) {
    return (0, import_map3.default)((0, import_trim4.default)(str).split(/\s+/), (singleClass) => {
      if ((0, import_contain4.default)(singleClass, prefix)) {
        return singleClass;
      }
      return singleClass.replace(/[\w-]+/, (match) => `${prefix}${match}`);
    }).join(" ");
  }
  return function(str) {
    if (/<[^>]*>/g.test(str)) {
      try {
        const tree = import_html8.default.parse(str);
        traverseTree3(tree, (node) => {
          if (node.attrs && node.attrs.class) {
            node.attrs.class = processClass(node.attrs.class);
          }
        });
        return import_html8.default.stringify(tree);
      } catch (e) {
        return processClass(str);
      }
    }
    return processClass(str);
  };
}
function traverseTree3(tree, handler2) {
  for (let i = 0, len = tree.length; i < len; i++) {
    const node = tree[i];
    handler2(node);
    if (node.content) {
      traverseTree3(node.content, handler2);
    }
  }
}
var hasTouchSupport3 = "ontouchstart" in import_root3.default;
function eventClient(type2, e) {
  const name = type2 === "x" ? "clientX" : "clientY";
  if (e[name]) {
    return e[name];
  }
  if (e.changedTouches) {
    return e.changedTouches[0][name];
  }
  return 0;
}
function pxToNum(str) {
  return (0, import_toNum4.default)(str.replace("px", ""));
}
function getPlatform3() {
  const os = (0, import_detectOs3.default)();
  if (os === "os x") {
    return "mac";
  }
  return os;
}

// node_modules/luna-data-grid/esm/share/Component.js
var import_each5 = __toESM(require_each());
var import_extend3 = __toESM(require_extend());
var import_defaults2 = __toESM(require_defaults());
var import_remove2 = __toESM(require_remove2());
var import_theme2 = __toESM(require_theme());
var import_startWith4 = __toESM(require_startWith());
var Component2 = class extends import_Emitter2.default {
  constructor(container, { compName }, { theme: t = "light" } = {}) {
    super();
    this.subComponents = [];
    this.theme = "";
    this.onThemeChange = (t2) => {
      if (this.options.theme === "auto") {
        this.setTheme(t2);
      }
    };
    this.compName = compName;
    this.c = classPrefix3(compName);
    this.options = {};
    this.container = container;
    this.$container = (0, import__4.default)(container);
    this.$container.addClass([
      `luna-${compName}`,
      this.c(`platform-${getPlatform3()}`)
    ]);
    this.on("changeOption", (name, val) => {
      if (name === "theme" && val) {
        let t2 = val;
        if (val === "auto") {
          t2 = import_theme2.default.get();
        }
        this.setTheme(t2);
        (0, import_each5.default)(this.subComponents, (component) => component.setOption("theme", val));
      }
    });
    import_theme2.default.on("change", this.onThemeChange);
    this.setOption("theme", t);
  }
  destroy() {
    this.destroySubComponents();
    const { $container } = this;
    const classes = $container.attr("class");
    (0, import_each5.default)(classes.split(/\s+/), (c2) => {
      if ((0, import_startWith4.default)(c2, `luna-${this.compName}`)) {
        $container.rmClass(c2);
      }
    });
    $container.html("");
    this.emit("destroy");
    this.removeAllListeners();
    import_theme2.default.off("change", this.onThemeChange);
  }
  setOption(name, val) {
    const options = this.options;
    let newOptions = {};
    if (typeof name === "string") {
      newOptions[name] = val;
    } else {
      newOptions = name;
    }
    (0, import_each5.default)(newOptions, (val2, name2) => {
      const oldVal = options[name2];
      options[name2] = val2;
      if (val2 === oldVal) {
        return;
      }
      this.emit("changeOption", name2, val2, oldVal);
    });
  }
  getOption(name) {
    return this.options[name];
  }
  addSubComponent(component) {
    component.setOption("theme", this.options.theme);
    this.subComponents.push(component);
  }
  removeSubComponent(component) {
    (0, import_remove2.default)(this.subComponents, (com) => com === component);
  }
  destroySubComponents() {
    (0, import_each5.default)(this.subComponents, (component) => component.destroy());
    this.subComponents = [];
  }
  initOptions(options, defs = {}) {
    (0, import_defaults2.default)(options, defs);
    (0, import_extend3.default)(this.options, options);
  }
  find(selector) {
    return this.$container.find(this.c(selector));
  }
  setTheme(theme5) {
    const { c: c2, $container } = this;
    if (this.theme) {
      $container.rmClass(c2(`theme-${this.theme}`));
    }
    $container.addClass(c2(`theme-${theme5}`));
    this.theme = theme5;
  }
};

// node_modules/luna-data-grid/esm/data-grid/index.js
var import_each6 = __toESM(require_each());
var import_map4 = __toESM(require_map());
var import_escape3 = __toESM(require_escape());
var import_h = __toESM(require_h());
var import_toStr4 = __toESM(require_toStr());
var import_isEl = __toESM(require_isEl());
var import_isUndef = __toESM(require_isUndef());
var import_ResizeSensor = __toESM(require_ResizeSensor());
var import_throttle = __toESM(require_throttle());
var import_defaults3 = __toESM(require_defaults());
var import_naturalSort3 = __toESM(require_naturalSort());
var import_isNull = __toESM(require_isNull());
var import_isFn = __toESM(require_isFn());
var import_isRegExp = __toESM(require_isRegExp());
var import_isArr2 = __toESM(require_isArr());
var import_isStr3 = __toESM(require_isStr());
var import_trim5 = __toESM(require_trim());
var import_contain5 = __toESM(require_contain());
var import_toNum5 = __toESM(require_toNum());
var import_lowerCase3 = __toESM(require_lowerCase());
var import_clamp = __toESM(require_clamp());
var import_max = __toESM(require_max());
var import_min = __toESM(require_min());
var import_isOdd = __toESM(require_isOdd());
var import_now = __toESM(require_now());
var import_remove3 = __toESM(require_remove2());
var import_pointerEvent = __toESM(require_pointerEvent());
var $document = (0, import__5.default)(document);
var MIN_COL_WIDTH = 24;
var ROW_HEIGHT = 20;
var DataGrid = class extends Component2 {
  constructor(container, options) {
    super(container, { compName: "data-grid" }, options);
    this.resizeIdx = 0;
    this.resizeStartX = 0;
    this.resizeStartLeft = 0;
    this.resizeDeltaX = 0;
    this.nodes = [];
    this.displayNodes = [];
    this.colWidthsInitialized = false;
    this.colMap = {};
    this.selectedNode = null;
    this.isAscending = true;
    this.colWidths = [];
    this.spaceHeight = 0;
    this.topSpaceHeight = 0;
    this.lastScrollTop = 0;
    this.lastTimestamp = 0;
    this.speedToleranceFactor = 100;
    this.maxSpeedTolerance = 2e3;
    this.minSpeedTolerance = 100;
    this.scrollTimer = null;
    this.onResizeColMove = (e) => {
      const { resizeIdx, $resizers, colWidths, $colgroup } = this;
      e = e.origEvent;
      let deltaX = eventClient("x", e) - this.resizeStartX;
      const leftColWidth = colWidths[resizeIdx];
      const rightColWidth = colWidths[resizeIdx + 1];
      const lowerBound = (0, import_min.default)(-leftColWidth + MIN_COL_WIDTH, 0);
      const upperBound = (0, import_max.default)(rightColWidth - MIN_COL_WIDTH, 0);
      deltaX = (0, import_clamp.default)(deltaX, lowerBound, upperBound);
      $colgroup.each(function() {
        const $cols = (0, import__5.default)(this).find("col");
        $cols.eq(resizeIdx).css("width", leftColWidth + deltaX + "px");
        $cols.eq(resizeIdx + 1).css("width", rightColWidth - deltaX + "px");
      });
      this.resizeDeltaX = deltaX;
      const newLeft = this.resizeStartLeft + deltaX;
      $resizers.eq(resizeIdx).css("left", `${newLeft}px`);
    };
    this.onResizeColEnd = (e) => {
      this.onResizeColMove(e);
      const { c: c2, colWidths, resizeIdx, resizeDeltaX } = this;
      const { columns: columns2 } = this.options;
      const leftCol = columns2[resizeIdx];
      const rightCol = columns2[resizeIdx + 1];
      const leftColWidth = colWidths[resizeIdx] + resizeDeltaX;
      const rightColWidth = colWidths[resizeIdx + 1] - resizeDeltaX;
      const totalWidth = leftColWidth + rightColWidth;
      const totalWeight = leftCol.weight + rightCol.weight;
      const leftWeight = totalWeight * (leftColWidth / totalWidth);
      const rightWeight = totalWeight - leftWeight;
      leftCol.weight = leftWeight;
      rightCol.weight = rightWeight;
      this.applyColWeights();
      (0, import__5.default)(document.body).rmClass(c2("resizing"));
      $document.off((0, import_pointerEvent.default)("move"), this.onResizeColMove);
      $document.off((0, import_pointerEvent.default)("up"), this.onResizeColEnd);
    };
    this.onScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = this.dataContainer;
      if (scrollTop <= 0)
        return;
      if (clientHeight + scrollTop > scrollHeight)
        return;
      const lastScrollTop = this.lastScrollTop;
      const lastTimestamp = this.lastTimestamp;
      const timestamp = (0, import_now.default)();
      const duration = timestamp - lastTimestamp;
      const distance = scrollTop - lastScrollTop;
      const speed = Math.abs(distance / duration);
      let speedTolerance = speed * this.speedToleranceFactor;
      if (duration > 1e3) {
        speedTolerance = 1e3;
      }
      if (speedTolerance > this.maxSpeedTolerance) {
        speedTolerance = this.maxSpeedTolerance;
      }
      if (speedTolerance < this.minSpeedTolerance) {
        speedTolerance = this.minSpeedTolerance;
      }
      this.lastScrollTop = scrollTop;
      this.lastTimestamp = timestamp;
      let topTolerance = 0;
      let bottomTolerance = 0;
      if (lastScrollTop < scrollTop) {
        topTolerance = this.minSpeedTolerance;
        bottomTolerance = speedTolerance;
      } else {
        topTolerance = speedTolerance;
        bottomTolerance = this.minSpeedTolerance;
      }
      if (this.topSpaceHeight < scrollTop - topTolerance && this.topSpaceHeight + this.data.offsetHeight > scrollTop + clientHeight + bottomTolerance) {
        return;
      }
      this.renderData({
        topTolerance: topTolerance * 2,
        bottomTolerance: bottomTolerance * 2
      });
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer);
      }
      this.scrollTimer = setTimeout(() => {
        this.renderData();
      }, 100);
    };
    this.renderData = (0, import_throttle.default)(({ topTolerance = 500, bottomTolerance = 500 } = {}) => {
      const { dataContainer, displayNodes, tableBody } = this;
      const { scrollTop, clientHeight } = dataContainer;
      const top = scrollTop - topTolerance;
      const bottom = scrollTop + clientHeight + bottomTolerance;
      let topSpaceHeight = 0;
      let currentHeight = 0;
      const len = displayNodes.length;
      const renderNodes = [];
      const height = ROW_HEIGHT;
      for (let i = 0; i < len; i++) {
        const node = displayNodes[i];
        if (currentHeight <= bottom) {
          if (currentHeight + height > top) {
            if (renderNodes.length === 0 && (0, import_isOdd.default)(i)) {
              renderNodes.push(displayNodes[i - 1]);
              topSpaceHeight -= height;
            }
            renderNodes.push(node);
          } else if (currentHeight < top) {
            topSpaceHeight += height;
          }
        }
        currentHeight += height;
      }
      this.updateSpace(currentHeight);
      this.updateTopSpace(topSpaceHeight);
      const frag = document.createDocumentFragment();
      for (let i = 0, len2 = renderNodes.length; i < len2; i++) {
        frag.appendChild(renderNodes[i].container);
      }
      frag.appendChild(this.fillerRow);
      tableBody.textContent = "";
      tableBody.appendChild(frag);
    }, 16);
    this.$container.attr("tabindex", "0");
    this.resizeSensor = new import_ResizeSensor.default(container);
    this.onResize = (0, import_throttle.default)(() => {
      this.updateHeight();
      this.updateWeights();
    }, 16);
    if (options.height) {
      options.maxHeight = options.height;
      options.minHeight = options.height;
    }
    this.initOptions(options, {
      minHeight: 41,
      maxHeight: Infinity,
      filter: "",
      selectable: false
    });
    const { columns, minHeight, maxHeight } = this.options;
    (0, import_each6.default)(columns, (column) => {
      (0, import_defaults3.default)(column, {
        sortable: false
      });
      this.colMap[column.id] = column;
    });
    if (maxHeight < minHeight) {
      this.setOption("maxHeight", minHeight);
    }
    this.initTpl();
    this.$headerRow = this.find(".header").find("tr");
    this.$fillerRow = this.find(".filler-row");
    this.fillerRow = this.$fillerRow.get(0);
    this.$data = this.find(".data");
    this.data = this.$data.get(0);
    this.$tableBody = this.$data.find("tbody");
    this.tableBody = this.$tableBody.get(0);
    this.$colgroup = this.$container.find("colgroup");
    this.$dataContainer = this.find(".data-container");
    this.dataContainer = this.$dataContainer.get(0);
    this.$space = this.find(".data-space");
    this.space = this.$space.get(0);
    this.renderHeader();
    this.renderResizers();
    this.updateWeights();
    this.updateHeight();
    this.bindEvent();
  }
  destroy() {
    super.destroy();
    this.resizeSensor.destroy();
    this.$container.rmAttr("tabindex");
  }
  remove(node) {
    const { nodes, displayNodes } = this;
    (0, import_remove3.default)(nodes, (n) => n === node);
    (0, import_remove3.default)(displayNodes, (n) => n === node);
    if (node === this.selectedNode) {
      this.selectNode(null);
    }
    this.renderData();
    this.updateHeight();
  }
  append(data, options = {}) {
    (0, import_defaults3.default)(options, {
      selectable: this.options.selectable
    });
    const node = new DataGridNode(this, data, options);
    this.nodes.push(node);
    const isVisible = this.filterNode(node);
    if (isVisible) {
      this.displayNodes.push(node);
    }
    if (this.sortId) {
      this.sortNodes(this.sortId, this.isAscending);
    } else {
      if (isVisible) {
        this.renderData();
      }
    }
    this.updateHeight();
    return node;
  }
  setData(data, uniqueId) {
    const items = (0, import_map4.default)(data, (item) => {
      if (!(0, import_isArr2.default)(item)) {
        return [
          item,
          {
            selectable: this.options.selectable
          }
        ];
      }
      (0, import_defaults3.default)(item[1], {
        selectable: this.options.selectable
      });
      return item;
    });
    if (!uniqueId) {
      this.clear();
      (0, import_each6.default)(items, (item) => {
        const node = new DataGridNode(this, item[0], item[1]);
        this.nodes.push(node);
        if (this.filterNode(node)) {
          this.displayNodes.push(node);
        }
      });
    } else {
      const nodesMap = {};
      (0, import_each6.default)(this.nodes, (node) => {
        nodesMap[node.data[uniqueId]] = node;
      });
      const nodes = [];
      const displayNodes = [];
      (0, import_each6.default)(items, (item) => {
        const id2 = item[0][uniqueId];
        let node;
        if (nodesMap[id2]) {
          node = nodesMap[id2];
          node.data = item[0];
          node.render();
        } else {
          node = new DataGridNode(this, item[0], item[1]);
        }
        nodes.push(node);
        if (this.filterNode(node)) {
          displayNodes.push(node);
        }
      });
      if (this.selectedNode && !(0, import_contain5.default)(nodes, this.selectedNode)) {
        this.selectNode(null);
      }
      this.nodes = nodes;
      this.displayNodes = displayNodes;
    }
    if (this.sortId) {
      this.sortNodes(this.sortId, this.isAscending);
    } else {
      this.renderData();
    }
  }
  clear() {
    this.nodes = [];
    this.displayNodes = [];
    this.selectNode(null);
    this.renderData();
    this.updateHeight();
  }
  updateHeight() {
    const { $fillerRow, $container } = this;
    let { maxHeight, minHeight } = this.options;
    const headerHeight = this.$headerRow.offset().height;
    const borderTopWidth = pxToNum($container.css("border-top-width"));
    const borderBottomWidth = pxToNum($container.css("border-bottom-width"));
    const minusHeight = headerHeight + borderTopWidth + borderBottomWidth;
    minHeight -= minusHeight;
    if (minHeight < 0) {
      minHeight = 0;
    }
    maxHeight -= minusHeight;
    const len = this.displayNodes.length;
    let height = 0;
    if (len > 0) {
      height = ROW_HEIGHT * len;
    }
    if (height > minHeight) {
      $fillerRow.hide();
    } else {
      $fillerRow.show();
    }
    if (height < minHeight) {
      height = minHeight;
    } else if (height >= maxHeight) {
      height = maxHeight;
    }
    this.$dataContainer.css({ height });
  }
  selectNode(node) {
    if (!(0, import_isNull.default)(node) && !node?.selectable) {
      return;
    }
    if (this.selectedNode === node) {
      return;
    }
    if (this.selectedNode) {
      this.selectedNode.deselect();
      this.selectedNode = null;
      if ((0, import_isNull.default)(node)) {
        this.emit("deselect");
      }
    }
    if (!(0, import_isNull.default)(node)) {
      this.selectedNode = node;
      node.select();
      this.emit("select", node);
    }
  }
  onResizeColStart(e) {
    const { c: c2, resizeIdx, $resizers } = this;
    e.stopPropagation();
    e.preventDefault();
    e = e.origEvent;
    this.resizeStartX = eventClient("x", e);
    this.resizeStartLeft = pxToNum($resizers.eq(resizeIdx).css("left"));
    (0, import__5.default)(document.body).addClass(c2("resizing"));
    $document.on((0, import_pointerEvent.default)("move"), this.onResizeColMove);
    $document.on((0, import_pointerEvent.default)("up"), this.onResizeColEnd);
  }
  bindEvent() {
    const { c: c2, $headerRow, $tableBody, $resizers, $dataContainer } = this;
    this.resizeSensor.addListener(this.onResize);
    $dataContainer.on("scroll", this.onScroll);
    const self2 = this;
    $tableBody.on("click", c2(".node"), function(e) {
      self2.selectNode(this.dataGridNode);
      setTimeout(() => {
        if (this.hasDoubleClick) {
          return;
        }
        self2.emit("click", e.origEvent, this.dataGridNode);
      }, 200);
    }).on("dblclick", c2(".node"), function(e) {
      e.stopPropagation();
      this.hasDoubleClick = true;
      self2.emit("dblclick", e.origEvent, this.dataGridNode);
      setTimeout(() => {
        this.hasDoubleClick = false;
      }, 300);
    }).on("contextmenu", c2(".node"), function(e) {
      e.preventDefault();
      e.stopPropagation();
      self2.selectNode(this.dataGridNode);
      self2.emit("contextmenu", e.origEvent, this.dataGridNode);
    });
    $headerRow.on("click", c2(".sortable"), function(e) {
      e.stopPropagation();
      const $this = (0, import__5.default)(this);
      const id2 = $this.data("id");
      const order = $this.data("order");
      const isAscending = order !== "descending";
      $this.data("order", isAscending ? "descending" : "ascending");
      $headerRow.find(c2(".icon-caret-up")).hide();
      $headerRow.find(c2(".icon-caret-down")).hide();
      const $iconUp = $this.find(c2(".icon-caret-up"));
      const $iconDown = $this.find(c2(".icon-caret-down"));
      if (isAscending) {
        $iconUp.show();
      } else {
        $iconDown.show();
      }
      self2.sortNodes(id2, isAscending);
      $headerRow.find("th").each(function() {
        const $this2 = (0, import__5.default)(this);
        if ($this2.data("id") !== id2) {
          $this2.rmAttr("data-order");
        }
      });
    });
    $resizers.on((0, import_pointerEvent.default)("down"), function(e) {
      const $this = (0, import__5.default)(this);
      self2.resizeIdx = (0, import_toNum5.default)($this.data("idx"));
      self2.onResizeColStart(e);
    });
    this.on("changeOption", (name) => {
      switch (name) {
        case "minHeight":
        case "maxHeight":
          this.updateHeight();
          break;
        case "filter":
          this.displayNodes = [];
          (0, import_each6.default)(this.nodes, (node) => {
            if (this.filterNode(node)) {
              this.displayNodes.push(node);
            }
          });
          if (this.selectedNode && !this.filterNode(this.selectedNode)) {
            this.selectNode(null);
          }
          this.renderData();
          this.updateHeight();
          break;
      }
    });
  }
  sortNodes(id2, isAscending) {
    const column = this.colMap[id2];
    const comparator = column.comparator || import_naturalSort3.default.comparator;
    function sortFn(a, b) {
      let aVal = a.data[id2];
      let bVal = b.data[id2];
      if ((0, import_isEl.default)(aVal)) {
        aVal = aVal.innerText;
      }
      if ((0, import_isEl.default)(bVal)) {
        bVal = bVal.innerText;
      }
      return isAscending ? comparator(aVal, bVal) : comparator(bVal, aVal);
    }
    this.nodes.sort(sortFn);
    this.displayNodes.sort(sortFn);
    this.renderData();
    this.sortId = id2;
    this.isAscending = isAscending;
  }
  updateWeights() {
    const { container, $headerRow } = this;
    const { columns } = this.options;
    const tableWidth = container.offsetWidth;
    if (!this.colWidthsInitialized && tableWidth) {
      for (let i = 0, len = columns.length; i < len; i++) {
        const column = columns[i];
        if (!column.weight) {
          const thWidth = $headerRow.find("th").get(i).offsetWidth;
          column.weight = 100 * thWidth / tableWidth;
        }
      }
      this.colWidthsInitialized = true;
    }
    this.applyColWeights();
  }
  applyColWeights() {
    const { container, $colgroup } = this;
    const { columns } = this.options;
    const tableWidth = container.offsetWidth;
    if (tableWidth <= 0) {
      return;
    }
    let sumOfWeights = 0;
    const len = columns.length;
    for (let i = 0; i < len; i++) {
      sumOfWeights += columns[i].weight;
    }
    const minColumnWidth = 14;
    let html6 = "";
    let sum = 0;
    let lastOffset = 0;
    this.colWidths = [];
    for (let i = 0; i < len; i++) {
      const column = columns[i];
      sum += column.weight;
      const offset = sum * tableWidth / sumOfWeights | 0;
      const width = Math.max(offset - lastOffset, minColumnWidth);
      lastOffset = offset;
      html6 += `<col style="width:${width}px"></col>`;
      this.colWidths[i] = width;
    }
    $colgroup.html(html6);
    this.positionResizers();
  }
  positionResizers() {
    const { colWidths } = this;
    const resizerLeft = [];
    const len = colWidths.length - 1;
    for (let i = 0; i < len; i++) {
      resizerLeft[i] = (resizerLeft[i - 1] || 0) + colWidths[i];
    }
    for (let i = 0; i < len; i++) {
      this.$resizers.eq(i).css("left", resizerLeft[i] + "px");
    }
  }
  updateTopSpace(height) {
    this.topSpaceHeight = height;
    this.data.style.top = height + "px";
  }
  updateSpace(height) {
    if (this.spaceHeight === height) {
      return;
    }
    this.spaceHeight = height;
    this.space.style.height = height + "px";
  }
  filterNode(node) {
    let { filter: filter3 } = this.options;
    if (filter3) {
      if ((0, import_isFn.default)(filter3)) {
        return filter3(node);
      } else if ((0, import_isRegExp.default)(filter3)) {
        return filter3.test(node.text());
      } else if ((0, import_isStr3.default)(filter3)) {
        filter3 = (0, import_trim5.default)(filter3);
        if (filter3) {
          return (0, import_contain5.default)((0, import_lowerCase3.default)(node.text()), (0, import_lowerCase3.default)(filter3));
        }
      }
    }
    return true;
  }
  renderHeader() {
    const { c: c2 } = this;
    let html6 = "";
    let fillerRowHtml = "";
    (0, import_each6.default)(this.options.columns, (column) => {
      const title = (0, import_escape3.default)(column.title);
      if (column.sortable) {
        html6 += c2(`
          <th class="sortable" data-id="${column.id}">
            ${title}
            <span class="icon-caret-up"></span>
            <span class="icon-caret-down"></span>
          </th>`);
      } else {
        html6 += `<th>${title}</th>`;
      }
      fillerRowHtml += "<td></td>";
    });
    this.$headerRow.html(html6);
    this.$fillerRow.html(fillerRowHtml);
  }
  renderResizers() {
    let resizers = "";
    const len = this.options.columns.length - 1;
    for (let i = 0; i < len; i++) {
      resizers += this.c(`<div class="resizer" data-idx="${i}"></div>`);
    }
    this.$container.append(resizers);
    this.$resizers = this.find(".resizer");
  }
  initTpl() {
    this.$container.html(this.c(import_stripIndent.default`
        <div class="header-container">
          <table class="header">
            <colgroup></colgroup>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
        <div class="data-container">
          <div class="data-space">
            <table class="data">
              <colgroup></colgroup>
              <tbody>
                <tr class="filler-row"></tr>
              </tbody>
            </table>
          </div>
        </div>
      `));
  }
};
var DataGridNode = class {
  constructor(dataGrid, data, options) {
    this.container = (0, import_h.default)("tr");
    this.selectable = false;
    ;
    this.container.dataGridNode = this;
    this.$container = (0, import__5.default)(this.container);
    this.$container.addClass(dataGrid.c("node"));
    this.dataGrid = dataGrid;
    this.data = data;
    if (options.selectable) {
      this.selectable = options.selectable;
      this.$container.addClass(dataGrid.c("selectable"));
    }
    this.render();
  }
  text() {
    return this.$container.text();
  }
  select() {
    this.$container.addClass(this.dataGrid.c("selected"));
  }
  deselect() {
    this.$container.rmClass(this.dataGrid.c("selected"));
  }
  render() {
    const { data, $container, container } = this;
    const columns = this.dataGrid.getOption("columns");
    $container.html("");
    (0, import_each6.default)(columns, (column) => {
      const td = (0, import_h.default)("td");
      const val = data[column.id];
      if (!(0, import_isUndef.default)(val)) {
        if ((0, import_isEl.default)(val)) {
          td.appendChild(val);
        } else {
          td.innerText = (0, import_toStr4.default)(val);
        }
      }
      container.appendChild(td);
    });
  }
};
if (typeof module !== "undefined") {
  exportCjs3(module, DataGrid);
}

// node_modules/luna-dom-viewer/esm/share/Component.js
var import_Emitter3 = __toESM(require_Emitter());
var import__6 = __toESM(require__());

// node_modules/luna-dom-viewer/esm/share/util.js
var import_map5 = __toESM(require_map());
var import_trim6 = __toESM(require_trim());
var import_root4 = __toESM(require_root());
var import_html9 = __toESM(require_html());
var import_isNum6 = __toESM(require_isNum());
var import_contain6 = __toESM(require_contain());
var import_toNum6 = __toESM(require_toNum());
var import_detectOs4 = __toESM(require_detectOs());
var import_loadImg4 = __toESM(require_loadImg());
var import_isHidden4 = __toESM(require_isHidden());
function exportCjs4(module2, clazz) {
  try {
    module2.exports = clazz;
    module2.exports.default = clazz;
  } catch (e) {
  }
}
function classPrefix4(name) {
  const prefix = `luna-${name}-`;
  function processClass(str) {
    return (0, import_map5.default)((0, import_trim6.default)(str).split(/\s+/), (singleClass) => {
      if ((0, import_contain6.default)(singleClass, prefix)) {
        return singleClass;
      }
      return singleClass.replace(/[\w-]+/, (match) => `${prefix}${match}`);
    }).join(" ");
  }
  return function(str) {
    if (/<[^>]*>/g.test(str)) {
      try {
        const tree = import_html9.default.parse(str);
        traverseTree4(tree, (node) => {
          if (node.attrs && node.attrs.class) {
            node.attrs.class = processClass(node.attrs.class);
          }
        });
        return import_html9.default.stringify(tree);
      } catch (e) {
        return processClass(str);
      }
    }
    return processClass(str);
  };
}
function traverseTree4(tree, handler2) {
  for (let i = 0, len = tree.length; i < len; i++) {
    const node = tree[i];
    handler2(node);
    if (node.content) {
      traverseTree4(node.content, handler2);
    }
  }
}
var hasTouchSupport4 = "ontouchstart" in import_root4.default;
function getPlatform4() {
  const os = (0, import_detectOs4.default)();
  if (os === "os x") {
    return "mac";
  }
  return os;
}

// node_modules/luna-dom-viewer/esm/share/Component.js
var import_each7 = __toESM(require_each());
var import_extend4 = __toESM(require_extend());
var import_defaults4 = __toESM(require_defaults());
var import_remove4 = __toESM(require_remove2());
var import_theme3 = __toESM(require_theme());
var import_startWith5 = __toESM(require_startWith());
var Component3 = class extends import_Emitter3.default {
  constructor(container, { compName }, { theme: t = "light" } = {}) {
    super();
    this.subComponents = [];
    this.theme = "";
    this.onThemeChange = (t2) => {
      if (this.options.theme === "auto") {
        this.setTheme(t2);
      }
    };
    this.compName = compName;
    this.c = classPrefix4(compName);
    this.options = {};
    this.container = container;
    this.$container = (0, import__6.default)(container);
    this.$container.addClass([
      `luna-${compName}`,
      this.c(`platform-${getPlatform4()}`)
    ]);
    this.on("changeOption", (name, val) => {
      if (name === "theme" && val) {
        let t2 = val;
        if (val === "auto") {
          t2 = import_theme3.default.get();
        }
        this.setTheme(t2);
        (0, import_each7.default)(this.subComponents, (component) => component.setOption("theme", val));
      }
    });
    import_theme3.default.on("change", this.onThemeChange);
    this.setOption("theme", t);
  }
  destroy() {
    this.destroySubComponents();
    const { $container } = this;
    const classes = $container.attr("class");
    (0, import_each7.default)(classes.split(/\s+/), (c2) => {
      if ((0, import_startWith5.default)(c2, `luna-${this.compName}`)) {
        $container.rmClass(c2);
      }
    });
    $container.html("");
    this.emit("destroy");
    this.removeAllListeners();
    import_theme3.default.off("change", this.onThemeChange);
  }
  setOption(name, val) {
    const options = this.options;
    let newOptions = {};
    if (typeof name === "string") {
      newOptions[name] = val;
    } else {
      newOptions = name;
    }
    (0, import_each7.default)(newOptions, (val2, name2) => {
      const oldVal = options[name2];
      options[name2] = val2;
      if (val2 === oldVal) {
        return;
      }
      this.emit("changeOption", name2, val2, oldVal);
    });
  }
  getOption(name) {
    return this.options[name];
  }
  addSubComponent(component) {
    component.setOption("theme", this.options.theme);
    this.subComponents.push(component);
  }
  removeSubComponent(component) {
    (0, import_remove4.default)(this.subComponents, (com) => com === component);
  }
  destroySubComponents() {
    (0, import_each7.default)(this.subComponents, (component) => component.destroy());
    this.subComponents = [];
  }
  initOptions(options, defs = {}) {
    (0, import_defaults4.default)(options, defs);
    (0, import_extend4.default)(this.options, options);
  }
  find(selector) {
    return this.$container.find(this.c(selector));
  }
  setTheme(theme5) {
    const { c: c2, $container } = this;
    if (this.theme) {
      $container.rmClass(c2(`theme-${this.theme}`));
    }
    $container.addClass(c2(`theme-${theme5}`));
    this.theme = theme5;
  }
};

// node_modules/luna-dom-viewer/esm/dom-viewer/index.js
var import_each8 = __toESM(require_each());
var import__7 = __toESM(require__());
var import_h2 = __toESM(require_h());
var import_map6 = __toESM(require_map());
var import_filter2 = __toESM(require_filter());
var import_isShadowRoot = __toESM(require_isShadowRoot());
var import_stripIndent2 = __toESM(require_stripIndent());
var import_toArr = __toESM(require_toArr());
var import_MutationObserver = __toESM(require_MutationObserver());
var import_contain7 = __toESM(require_contain());
var import_highlight = __toESM(require_highlight());
var import_truncate4 = __toESM(require_truncate());
var import_last = __toESM(require_last());
var import_escape4 = __toESM(require_escape());
var import_trim7 = __toESM(require_trim());
var import_every = __toESM(require_every());
var import_hotkey = __toESM(require_hotkey());
var import_lowerCase4 = __toESM(require_lowerCase());
var emptyHighlightStyle = {
  comment: "",
  string: "",
  number: "",
  keyword: "",
  operator: ""
};
var DomViewer = class _DomViewer extends Component3 {
  constructor(container, options = {}) {
    super(container, { compName: "dom-viewer" }, options);
    this.isExpanded = false;
    this.childNodes = [];
    this.childNodeDomViewers = [];
    this.expand = (recursive = false) => {
      if (!this.isExpandable()) {
        return;
      }
      if (!this.isExpanded) {
        this.isExpanded = true;
        this.renderExpandTag();
        this.renderChildNodes();
      }
      if (recursive) {
        (0, import_each8.default)(this.childNodeDomViewers, (domViewer) => {
          domViewer.expand(true);
        });
      }
    };
    this.collapse = (recursive = false) => {
      if (!this.isExpandable()) {
        return;
      }
      if (this.isExpanded) {
        this.isExpanded = false;
        this.renderCollapseTag();
      }
      if (recursive) {
        (0, import_each8.default)(this.childNodeDomViewers, (domViewer) => {
          domViewer.collapse(true);
        });
      }
    };
    this.toggle = () => {
      if (this.isExpanded) {
        this.collapse();
      } else {
        this.expand();
      }
    };
    this.onKeyRight = () => {
      if (this.isExpanded) {
        this.childNodeDomViewers[0].select();
      } else {
        this.expand();
      }
    };
    this.onKeyLeft = () => {
      if (this.isExpanded) {
        this.collapse();
      } else {
        this.options.parent?.select();
      }
    };
    this.onKeyDown = () => {
      const { options: options2 } = this;
      if (this.isExpanded) {
        this.childNodeDomViewers[0].select();
        return;
      }
      let { parent: parent2 } = options2;
      if (!parent2) {
        return;
      }
      if (options2.isEndTag) {
        parent2 = parent2.getOption("parent");
        if (!parent2) {
          return;
        }
        const { childNodes, childNodeDomViewers, endTagDomViewer } = parent2;
        const idx = childNodes.indexOf(options2.node);
        if (childNodes[idx + 1]) {
          childNodeDomViewers[idx + 1].select();
        } else if (endTagDomViewer) {
          endTagDomViewer.select();
        }
      } else {
        const { childNodeDomViewers, endTagDomViewer } = parent2;
        const idx = childNodeDomViewers.indexOf(this);
        if (childNodeDomViewers[idx + 1]) {
          childNodeDomViewers[idx + 1].select();
        } else if (endTagDomViewer) {
          endTagDomViewer.select();
        }
      }
    };
    this.onKeyUp = () => {
      const { options: options2 } = this;
      const parent2 = options2.parent;
      if (!parent2) {
        return;
      }
      let domViewer;
      if (options2.isEndTag) {
        domViewer = (0, import_last.default)(parent2.childNodeDomViewers);
      } else {
        const idx = parent2.childNodeDomViewers.indexOf(this);
        if (idx < 1) {
          parent2.select();
        } else {
          domViewer = parent2.childNodeDomViewers[idx - 1];
        }
      }
      if (domViewer) {
        if (domViewer.isExpanded) {
          domViewer.endTagDomViewer?.select();
        } else {
          domViewer.select();
        }
      }
    };
    this.initOptions(options, {
      node: document.documentElement,
      parent: null,
      isEndTag: false,
      observe: true,
      rootContainer: container,
      rootDomViewer: this,
      ignore: () => false,
      ignoreAttr: () => false,
      lowerCaseTagName: true,
      hotkey: true
    });
    this.isShadowRoot = (0, import_isShadowRoot.default)(this.options.node);
    this.initTpl();
    this.bindEvent();
    if (!this.options.isEndTag && this.options.observe) {
      this.initObserver();
    }
  }
  select(node) {
    const { c: c2, options } = this;
    if (!node || node && options.node === node) {
      if (this.$tag.hasClass(c2("selected"))) {
        return;
      }
      (0, import__7.default)(this.options.rootContainer).find(c2(".selected")).rmClass(c2("selected")).rmAttr("tabindex");
      this.$tag.attr("tabindex", "0").get(0).focus();
      this.$tag.addClass(c2("selected"));
      options.rootDomViewer.emit("select", options.node);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    let childNode = node;
    let curNode = node.parentElement;
    while (curNode) {
      if (curNode === options.node) {
        this.expand();
        const childNodeDomViewer = this.childNodeDomViewers[this.childNodes.indexOf(childNode)];
        childNodeDomViewer.select(node);
        break;
      }
      childNode = curNode;
      curNode = curNode.parentElement;
    }
  }
  attach() {
    this.container.appendChild(this.$tag.get(0));
    if (this.$children) {
      this.container.appendChild(this.$children.get(0));
    }
  }
  isAttached() {
    return !!this.$tag.get(0).parentNode;
  }
  detach() {
    this.$tag.remove();
    if (this.$children) {
      this.$children.remove();
    }
  }
  destroy() {
    const { c: c2 } = this;
    if (this.$tag.hasClass(c2("selected"))) {
      this.options.rootDomViewer.emit("deselect");
    }
    this.detach();
    if (this.observer) {
      this.observer.disconnect();
    }
    this.destroySubComponents();
    if (this.options.rootDomViewer === this) {
      this.$container.rmClass(`luna-dom-viewer`).rmClass(c2(`platform-${getPlatform4()}`)).rmClass(c2(`theme-${this.options.theme}`));
    }
    this.emit("destroy");
    this.removeAllListeners();
  }
  renderExpandTag() {
    const { $tag, c: c2 } = this;
    const { node } = this.options;
    if (!this.isShadowRoot) {
      $tag.html(this.renderHtmlTag({
        ...getHtmlTagData(node),
        hasTail: false,
        hasToggleButton: true
      }));
    }
    $tag.addClass(c2("expanded"));
    this.$children.rmClass(c2("hidden"));
  }
  renderCollapseTag() {
    const { $tag, c: c2 } = this;
    const { node } = this.options;
    this.$children.addClass(c2("hidden"));
    if (!this.isShadowRoot) {
      this.$tag.html(this.renderHtmlTag({
        ...getHtmlTagData(node),
        hasTail: true,
        hasToggleButton: true
      }));
    }
    $tag.rmClass(c2("expanded"));
  }
  initObserver() {
    this.observer = new import_MutationObserver.default((mutations) => {
      (0, import_each8.default)(mutations, (mutation) => {
        this.handleMutation(mutation);
      });
    });
    this.observer.observe(this.options.node, {
      attributes: true,
      childList: true,
      characterData: true
    });
  }
  handleMutation(mutation) {
    const { $tag, c: c2 } = this;
    const { node, ignore } = this.options;
    if ((0, import_contain7.default)(["attributes", "childList"], mutation.type)) {
      if (mutation.type === "childList") {
        if ((0, import_every.default)(mutation.addedNodes, ignore) && (0, import_every.default)(mutation.removedNodes, ignore)) {
          return;
        }
        this.renderChildNodes();
      }
      if (this.isExpandable()) {
        this.isExpanded ? this.renderExpandTag() : this.renderCollapseTag();
      } else {
        this.$children.addClass(c2("hidden"));
        this.isExpanded = false;
        if (this.isShadowRoot) {
          $tag.html(this.renderShadowRoot(false));
        } else {
          $tag.html(this.renderHtmlTag({
            ...getHtmlTagData(node),
            hasTail: false
          }));
        }
      }
    } else if (mutation.type === "characterData") {
      if (node.nodeType === Node.TEXT_NODE) {
        $tag.html(this.renderTextNode(node));
      } else if (node.nodeType === Node.COMMENT_NODE) {
        $tag.html(this.renderHtmlComment(node.nodeValue));
      }
    }
  }
  bindEvent() {
    const { c: c2, $tag } = this;
    const { node } = this.options;
    if (node.nodeType === Node.ELEMENT_NODE || this.isShadowRoot) {
      $tag.on("click", c2(".toggle"), (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }
    if (hasTouchSupport4) {
      $tag.on("click", () => this.select());
    } else {
      $tag.on("mousedown", () => this.select());
    }
    if (this.options.hotkey) {
      const options = { element: $tag.get(0) };
      import_hotkey.default.on("right", options, this.onKeyRight);
      import_hotkey.default.on("left", options, this.onKeyLeft);
      import_hotkey.default.on("down", options, this.onKeyDown);
      import_hotkey.default.on("up", options, this.onKeyUp);
    }
  }
  isExpandable() {
    const { node } = this.options;
    if (node.nodeType !== Node.ELEMENT_NODE && !this.isShadowRoot) {
      return false;
    }
    return this.getChildNodes().length > 0;
  }
  getChildNodes() {
    const { rootContainer, ignore } = this.options;
    const node = this.options.node;
    let childNodes = (0, import_toArr.default)(node.childNodes);
    childNodes = (0, import_filter2.default)(childNodes, (child) => {
      if (child.nodeType === Node.TEXT_NODE || child.nodeType === Node.COMMENT_NODE) {
        const value = child.nodeValue;
        if ((0, import_trim7.default)(value) === "") {
          return false;
        }
      }
      return child !== rootContainer && !ignore(child);
    });
    if (node.shadowRoot) {
      childNodes.unshift(node.shadowRoot);
    } else if (node.chobitsuShadowRoot) {
      childNodes.unshift(node.chobitsuShadowRoot);
    }
    return childNodes;
  }
  initTpl() {
    const { container, c: c2 } = this;
    const { node, isEndTag, lowerCaseTagName } = this.options;
    const $tag = (0, import__7.default)((0, import_h2.default)("li"));
    $tag.addClass(c2("tree-item"));
    this.$tag = $tag;
    if (isEndTag) {
      let tagName = node.tagName;
      if (lowerCaseTagName) {
        tagName = (0, import_lowerCase4.default)(tagName);
      }
      $tag.html(c2(`<span class="html-tag" style="margin-left: -15px;">&lt;<span class="tag-name">/${tagName}</span>&gt;</span><span class="selection"></span>`));
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const isExpandable = this.isExpandable();
      const data = {
        ...getHtmlTagData(node),
        hasTail: isExpandable,
        hasToggleButton: isExpandable
      };
      $tag.html(this.renderHtmlTag(data));
    } else if ((0, import_isShadowRoot.default)(node)) {
      const isExpandable = this.isExpandable();
      $tag.html(this.renderShadowRoot(isExpandable));
    } else if (node.nodeType === Node.TEXT_NODE) {
      $tag.html(this.renderTextNode(node));
    } else if (node.nodeType === Node.COMMENT_NODE) {
      const value = node.nodeValue;
      if (value.trim() === "")
        return;
      $tag.html(this.renderHtmlComment(value));
    } else {
      return;
    }
    container.appendChild($tag.get(0));
    if (node.nodeType === node.ELEMENT_NODE || this.isShadowRoot) {
      const $children = (0, import__7.default)((0, import_h2.default)("ul"));
      $children.addClass([c2("children"), c2("hidden")]);
      container.appendChild($children.get(0));
      this.$children = $children;
    }
  }
  renderChildNodes() {
    const node = this.options.node;
    const { rootContainer, ignore, ignoreAttr, rootDomViewer, observe, lowerCaseTagName } = this.options;
    const $container = this.$children;
    const container = $container.get(0);
    const oldChildNodes = this.childNodes;
    const oldChildNodeDomViewers = this.childNodeDomViewers;
    (0, import_each8.default)(oldChildNodeDomViewers, (domViewer) => {
      domViewer.detach();
      this.removeSubComponent(domViewer);
    });
    if (this.endTagDomViewer) {
      this.endTagDomViewer.detach();
    }
    const childNodes = this.getChildNodes();
    this.childNodes = childNodes;
    const childNodeDomViewers = [];
    this.childNodeDomViewers = childNodeDomViewers;
    (0, import_each8.default)(childNodes, (node2, idx) => {
      const pos = oldChildNodes.indexOf(node2);
      let domViewer;
      if (pos > -1) {
        domViewer = oldChildNodeDomViewers[pos];
      } else {
        domViewer = new _DomViewer(container, {
          node: node2,
          observe,
          parent: this,
          rootContainer,
          rootDomViewer,
          ignore,
          ignoreAttr,
          lowerCaseTagName
        });
      }
      domViewer.attach();
      childNodeDomViewers[idx] = domViewer;
      this.addSubComponent(domViewer);
    });
    (0, import_each8.default)(oldChildNodeDomViewers, (domViewer) => {
      if (!domViewer.isAttached()) {
        domViewer.destroy();
      }
    });
    if (node && !this.isShadowRoot) {
      if (this.endTagDomViewer) {
        this.endTagDomViewer.attach();
      } else {
        this.endTagDomViewer = new _DomViewer(container, {
          node,
          parent: this,
          isEndTag: true,
          lowerCaseTagName,
          rootContainer,
          rootDomViewer,
          ignore
        });
        this.addSubComponent(this.endTagDomViewer);
      }
    }
  }
  renderHtmlTag(data) {
    const { lowerCaseTagName } = this.options;
    data.attributes = (0, import_filter2.default)(data.attributes, (attribute) => {
      return !this.options.ignoreAttr(data.el, attribute.name, attribute.value);
    });
    const attributes = (0, import_map6.default)(data.attributes, (attribute) => {
      const { name, value, isLink } = attribute;
      return `<span class="attribute">
          <span class="attribute-name">${(0, import_escape4.default)(name)}</span>${value ? `="<span class="attribute-value${isLink ? " attribute-underline" : ""}">${(0, import_escape4.default)(value)}</span>"` : ""}</span>`;
    }).join("");
    let tail = "";
    let tagName = data.tagName;
    if (lowerCaseTagName) {
      tagName = (0, import_lowerCase4.default)(tagName);
    }
    if (data.hasTail) {
      tail = `${data.hasTail ? "\u2026" : ""}<span class="html-tag">&lt;<span class="tag-name">/${tagName}</span>&gt;</span>`;
    } else if (!this.isExpandable()) {
      tail = `<span class="html-tag">&lt;<span class="tag-name">/${tagName}</span>&gt;</span>`;
    }
    return this.c(import_stripIndent2.default`
      ${data.hasToggleButton ? this.renderToggle() : ""}
      <span class="html-tag">&lt;<span class="tag-name">${tagName}</span>${attributes}&gt;</span>${tail}
      <span class="selection"></span>`);
  }
  renderTextNode(node) {
    const { c: c2 } = this;
    const value = node.nodeValue;
    const parent2 = node.parentElement;
    const prepend = '<span class="text-node">';
    const append = '</span><span class="selection"></span>';
    if (parent2 && value.length < 1e4) {
      if (parent2.tagName === "STYLE") {
        return c2(`${prepend}${(0, import_highlight.default)(value, "css", emptyHighlightStyle)}${append}`);
      } else if (parent2.tagName === "SCRIPT") {
        return c2(`${prepend}${(0, import_highlight.default)(value, "js", emptyHighlightStyle)}${append}`);
      }
    }
    return c2(`"${prepend}${(0, import_escape4.default)((0, import_truncate4.default)(value, 1e4, {
      separator: " ",
      ellipsis: "\u2026"
    }))}${append}"`);
  }
  renderHtmlComment(value) {
    return this.c(`<span class="html-comment">&lt;!-- ${(0, import_escape4.default)(value)} --&gt;</span><span class="selection"></span>`);
  }
  renderShadowRoot(hasToggle) {
    const { node } = this.options;
    return this.c(import_stripIndent2.default`
      ${hasToggle ? this.renderToggle() : ""}
      <span class="shadow-root">#shadow-root (${node.mode})</span>
      <span class="selection"></span>`);
  }
  renderToggle() {
    return '<div class="toggle "><span class="icon icon-caret-right"></span><span class="icon icon-caret-down"></span></div>';
  }
};
function getHtmlTagData(el) {
  const ret = {
    el,
    tagName: "",
    attributes: []
  };
  ret.tagName = el.tagName;
  const attributes = [];
  (0, import_each8.default)(el.attributes, (attribute) => {
    const { name, value } = attribute;
    attributes.push({
      name,
      value,
      isLink: isUrlAttribute(el, name)
    });
  });
  ret.attributes = attributes;
  return ret;
}
function isUrlAttribute(el, name) {
  const tagName = el.tagName;
  if (tagName === "SCRIPT" || tagName === "IMAGE" || tagName === "VIDEO" || tagName === "AUDIO") {
    if (name === "src")
      return true;
  }
  if (tagName === "LINK") {
    if (name === "href")
      return true;
  }
  return false;
}
if (typeof module !== "undefined") {
  exportCjs4(module, DomViewer);
}

// node_modules/luna-console/esm/console/Log.js
var import_ResizeSensor2 = __toESM(require_ResizeSensor());
var import_isObj3 = __toESM(require_isObj());
var import_isStr4 = __toESM(require_isStr());
var import_isErr = __toESM(require_isErr());
var import_isPrimitive = __toESM(require_isPrimitive());
var import_defaults5 = __toESM(require_defaults());
var import_isEl2 = __toESM(require_isEl());
var import_toStr5 = __toESM(require_toStr());
var import_toNum7 = __toESM(require_toNum());
var import_toInt = __toESM(require_toInt());
var import_concat = __toESM(require_concat());
var import_escape5 = __toESM(require_escape());
var import_isNull2 = __toESM(require_isNull());
var import_isUndef2 = __toESM(require_isUndef());
var import_isFn2 = __toESM(require_isFn());
var import_toArr2 = __toESM(require_toArr());
var import_isArr3 = __toESM(require_isArr());
var import_unique = __toESM(require_unique());
var import_contain8 = __toESM(require_contain());
var import_isEmpty2 = __toESM(require_isEmpty());
var import_clone = __toESM(require_clone());
var import_each9 = __toESM(require_each());
var import_map7 = __toESM(require_map());
var import_trim8 = __toESM(require_trim());
var import_lowerCase5 = __toESM(require_lowerCase());
var import_isHidden5 = __toESM(require_isHidden());
var import_keys3 = __toESM(require_keys());
var import__8 = __toESM(require__());
var import_h3 = __toESM(require_h());
var import_Emitter4 = __toESM(require_Emitter());
var import_debounce = __toESM(require_debounce());
var import_stringify = __toESM(require_stringify());
var import_copy = __toESM(require_copy());
var import_stringifyAll = __toESM(require_stringifyAll());
var import_nextTick = __toESM(require_nextTick());
var import_linkify = __toESM(require_linkify());
var import_highlight2 = __toESM(require_highlight());
var import_truncate5 = __toESM(require_truncate());
var import_some = __toESM(require_some());
var import_isNum7 = __toESM(require_isNum());
var import_stripIndent3 = __toESM(require_stripIndent());
var import_toEl = __toESM(require_toEl());
var import_uniqId2 = __toESM(require_uniqId());
var import_isBool3 = __toESM(require_isBool());
var import_isSymbol = __toESM(require_isSymbol());
var import_isRegExp2 = __toESM(require_isRegExp());
var regJsUrl = /https?:\/\/([0-9.\-A-Za-z]+)(?::(\d+))?\/[A-Z.a-z0-9/]*\.js/g;
var emptyHighlightStyle2 = {
  comment: "",
  string: "",
  number: "",
  keyword: "",
  operator: ""
};
var Log = class extends import_Emitter4.default {
  constructor(console2, { type: type2 = "log", args = [], id: id2, group, targetGroup, header, ignoreFilter = false, accessGetter, unenumerable, lazyEvaluation }) {
    super();
    this.container = (0, import_h3.default)("div");
    this.count = 1;
    this.width = 0;
    this.height = 0;
    this.isHidden = false;
    this.columns = [];
    this.elements = {};
    this.objects = {};
    this.console = console2;
    this.type = type2;
    this.group = group;
    this.targetGroup = targetGroup;
    this.args = args;
    this.id = id2;
    this.header = header;
    this.ignoreFilter = ignoreFilter;
    this.collapsed = false;
    this.container.log = this;
    this.height = 0;
    this.width = 0;
    this.$container = (0, import__8.default)(this.container);
    this.accessGetter = accessGetter;
    this.unenumerable = unenumerable;
    this.lazyEvaluation = lazyEvaluation;
    let level = "info";
    switch (type2) {
      case "debug":
        level = "verbose";
        break;
      case "error":
        level = "error";
        break;
      case "warn":
        level = "warning";
        break;
    }
    this.level = level;
    this.resizeSensor = new import_ResizeSensor2.default(this.container);
    this.onResize = (0, import_debounce.default)(() => {
      if ((0, import_isHidden5.default)(this.container)) {
        this.isHidden = true;
      } else {
        if (!this.isHidden) {
          this.updateSize(false);
        }
        this.isHidden = false;
      }
    }, 16);
    this.formatMsg();
    if (this.group) {
      this.checkGroup();
    }
    this.bindEvent();
  }
  checkGroup() {
    let { group } = this;
    let collapsed = false;
    while (group) {
      if (group.collapsed) {
        collapsed = true;
        break;
      }
      group = group.parent;
    }
    if (collapsed !== this.collapsed) {
      this.collapsed = collapsed;
      return true;
    }
    return false;
  }
  updateIcon(icon) {
    const { c: c2 } = this.console;
    const $icon = this.$container.find(c2(".icon-container")).find(c2(".icon"));
    $icon.rmAttr("class").addClass([c2("icon"), c2(`icon-${icon}`)]);
    return this;
  }
  addCount() {
    this.count++;
    const { $container, count } = this;
    const { c: c2 } = this.console;
    const $countContainer = $container.find(c2(".count-container"));
    const $icon = $container.find(c2(".icon-container"));
    const $count = $countContainer.find(c2(".count"));
    if (count === 2) {
      $countContainer.rmClass(c2("hidden"));
    }
    $count.text((0, import_toStr5.default)(count));
    $icon.addClass(c2("hidden"));
    return this;
  }
  groupEnd() {
    const { $container } = this;
    const { c: c2 } = this.console;
    const $lastNesting = $container.find(`.${c2("nesting-level")}:not(.${c2("group-closed")})`).last();
    $lastNesting.addClass(c2("group-closed"));
    return this;
  }
  updateTime(time) {
    const $timeContainer = this.$container.find(this.console.c(".time-container"));
    if (this.header) {
      $timeContainer.find("span").eq(0).text(time);
      this.header.time = time;
    }
    return this;
  }
  isAttached() {
    return !!this.container.parentNode;
  }
  isSimple() {
    return !(0, import_some.default)(this.args, (arg) => (0, import_isObj3.default)(arg));
  }
  updateSize(silent = true) {
    const { width, height } = this.container.getBoundingClientRect();
    const newHeight = height - 1;
    if (this.height !== newHeight) {
      this.height = newHeight;
      if (!silent) {
        this.emit("updateHeight");
      }
    }
    if (this.width !== width) {
      this.width = width;
    }
  }
  html() {
    return this.container.outerHTML;
  }
  text() {
    return this.content.textContent || "";
  }
  select() {
    this.$container.addClass(this.console.c("selected"));
  }
  deselect() {
    this.$container.rmClass(this.console.c("selected"));
  }
  copy() {
    const { args } = this;
    let str = "";
    (0, import_each9.default)(args, (arg, idx) => {
      if (idx !== 0) {
        str += " ";
      }
      if ((0, import_isObj3.default)(arg)) {
        str += (0, import_stringify.default)(arg);
      } else {
        str += (0, import_toStr5.default)(arg);
      }
    });
    (0, import_copy.default)(str);
  }
  bindEvent() {
    const { c: c2 } = this.console;
    const self2 = this;
    this.resizeSensor.addListener(this.onResize);
    this.$container.on("click", c2(".dom-viewer"), (e) => e.stopPropagation()).on("click", c2(".preview"), function(e) {
      e.stopPropagation();
      if (hasSelection(this)) {
        return;
      }
      const $this = (0, import__8.default)(this);
      const $icon = $this.find(c2(".preview-icon-container")).find(c2(".icon"));
      let icon = "caret-down";
      if ($icon.hasClass(c2("icon-caret-down"))) {
        icon = "caret-right";
      }
      $icon.rmAttr("class").addClass([c2("icon"), c2(`icon-${icon}`)]);
      self2.renderObjectViewer(this);
    }).on("click", () => this.click());
  }
  renderEl() {
    const { elements } = this;
    const { c: c2 } = this.console;
    const self2 = this;
    this.$container.find(c2(".dom-viewer")).each(function() {
      const $this = (0, import__8.default)(this);
      const id2 = $this.data("id");
      new DomViewer(this, {
        node: elements[id2],
        theme: self2.console.getOption("theme")
      });
    });
  }
  renderObjectViewer(preview) {
    const { console: console2, unenumerable, accessGetter, lazyEvaluation } = this;
    const { c: c2 } = console2;
    const $container = (0, import__8.default)(preview);
    const id2 = $container.data("id");
    if (!id2) {
      return;
    }
    const obj = this.objects[id2];
    const $json = $container.find(c2(".json"));
    if ($json.hasClass(c2("hidden"))) {
      if ($json.data("init") !== "true") {
        if (!lazyEvaluation) {
          const staticViewer = new JsonViewer($json.get(0));
          staticViewer.setOption("theme", console2.getOption("theme"));
          staticViewer.set(obj);
        } else {
          const objViewer = new ObjectViewer($json.get(0), {
            unenumerable,
            accessGetter
          });
          objViewer.setOption("theme", console2.getOption("theme"));
          objViewer.set(obj);
        }
        $json.data("init", "true");
      }
      $json.rmClass(c2("hidden"));
    } else {
      $json.addClass(c2("hidden"));
    }
  }
  renderTable(args) {
    const Value = "__LunaConsoleValue";
    const { columns, $container, console: console2 } = this;
    const { c: c2 } = console2;
    const $dataGrid = $container.find(c2(".data-grid"));
    const table = args[0];
    const dataGrid = new DataGrid($dataGrid.get(0), {
      columns: (0, import_concat.default)([
        {
          id: "(index)",
          title: "(index)",
          sortable: true
        }
      ], (0, import_map7.default)(columns, (column) => {
        return {
          id: column,
          title: column === Value ? "Value" : column,
          sortable: true
        };
      })),
      theme: console2.getOption("theme")
    });
    (0, import_each9.default)(table, (obj, idx) => {
      const data = {
        "(index)": (0, import_toStr5.default)(idx)
      };
      columns.forEach((column) => {
        if ((0, import_isObj3.default)(obj)) {
          data[column] = column === Value ? "" : this.formatTableVal(obj[column]);
        } else if ((0, import_isPrimitive.default)(obj)) {
          data[column] = column === Value ? this.formatTableVal(obj) : "";
        }
      });
      dataGrid.append(data);
    });
  }
  extractObj(obj, options = {}, cb) {
    const { accessGetter, unenumerable } = this;
    (0, import_defaults5.default)(options, {
      accessGetter,
      unenumerable,
      symbol: unenumerable,
      timeout: 1e3
    });
    stringify2(obj, options, (result) => cb(JSON.parse(result)));
  }
  click() {
    const { type: type2, $container, console: console2 } = this;
    const { c: c2 } = console2;
    switch (type2) {
      case "log":
      case "warn":
      case "info":
      case "debug":
      case "output":
      case "table":
      case "dir":
        break;
      case "group":
      case "groupCollapsed":
        if (!hasSelection(this.container)) {
          console2.toggleGroup(this);
        }
        break;
      case "error":
        if (!hasSelection(this.container)) {
          $container.find(c2(".stack")).toggleClass(c2("hidden"));
        }
        break;
    }
  }
  formatMsg() {
    let { args } = this;
    const { type: type2, id: id2, header, group } = this;
    const { c: c2 } = this.console;
    args = (0, import_clone.default)(args);
    let msg = "";
    let icon;
    let err;
    if (type2 === "group" || type2 === "groupCollapsed") {
      if (args.length === 0) {
        args = ["console.group"];
      }
    }
    switch (type2) {
      case "log":
      case "info":
      case "debug":
        msg = this.formatCommon(args);
        break;
      case "dir":
        msg = this.formatDir(args);
        break;
      case "warn":
        icon = "warn";
        msg = this.formatCommon(args);
        break;
      case "error":
        if ((0, import_isStr4.default)(args[0]) && args.length !== 1)
          args = this.substituteStr(args);
        err = args[0];
        icon = "error";
        err = (0, import_isErr.default)(err) ? err : new Error(this.formatCommon(args));
        msg = this.formatErr(err);
        break;
      case "table":
        msg = this.formatTable(args);
        break;
      case "html":
        msg = args[0];
        break;
      case "input":
        msg = this.formatJs(args[0]);
        icon = "input";
        break;
      case "output":
        msg = this.formatCommon(args);
        icon = "output";
        break;
      case "groupCollapsed":
        msg = this.formatCommon(args);
        icon = "caret-right";
        break;
      case "group":
        msg = this.formatCommon(args);
        icon = "caret-down";
        break;
    }
    if ((0, import_contain8.default)(["log", "debug", "warn"], type2) && this.isSimple()) {
      msg = (0, import_linkify.default)(msg, (url3) => {
        return `<a href="${url3}" target="_blank">${url3}</a>`;
      });
    }
    msg = this.render({ msg, type: type2, icon, id: id2, header, group });
    this.$container.addClass(`${c2("log-container")}`).html(msg);
    switch (type2) {
      case "table":
        if (!(0, import_isEmpty2.default)(this.columns)) {
          this.renderTable(args);
        }
        break;
    }
    if (!(0, import_isEmpty2.default)(this.elements)) {
      this.renderEl();
    }
    this.$content = this.$container.find(c2(".log-content"));
    this.content = this.$content.get(0);
  }
  render(data) {
    const { c: c2 } = this.console;
    let html6 = "";
    let indent = "";
    if (data.group) {
      const { indentLevel } = data.group;
      for (let i = 0; i < indentLevel; i++) {
        indent += `<div class="${c2("nesting-level")}"></div>`;
      }
    }
    if (data.header) {
      html6 += import_stripIndent3.default`
      <div class="${c2("header")}">
        ${indent}
        <div class="${c2("time-from-container")}">
          <span>${data.header.time}</span> <span>${data.header.from}</span>
        </div>
      </div>`;
    }
    let icon = "";
    if (data.icon) {
      icon = `<div class="${c2("icon-container")}"><span class="${c2("icon icon-" + data.icon)}"></span></div>`;
    }
    html6 += `
    <div class="${c2(data.type + " log-item")}">
      ${indent}
      ${icon}
      <div class="${c2("count-container hidden")}">
        <div class="${c2("count")}"></div>
      </div>    
      <div class="${c2("log-content-wrapper")}">
        <div class="${c2("log-content")}">${data.msg}</div>
      </div>
    </div>`;
    return html6;
  }
  formatTable(args) {
    const Value = "__LunaConsoleValue";
    const table = args[0];
    let filter3 = args[1];
    let columns = [];
    if ((0, import_isStr4.default)(filter3))
      filter3 = (0, import_toArr2.default)(filter3);
    if (!(0, import_isArr3.default)(filter3))
      filter3 = null;
    if (!(0, import_isObj3.default)(table))
      return this.formatCommon(args);
    (0, import_each9.default)(table, (val) => {
      if ((0, import_isPrimitive.default)(val)) {
        columns.push(Value);
      } else if ((0, import_isObj3.default)(val)) {
        columns = columns.concat((0, import_keys3.default)(val));
      }
    });
    columns = (0, import_unique.default)(columns);
    columns.sort();
    if (filter3)
      columns = columns.filter((val) => (0, import_contain8.default)(filter3, val));
    if (columns.length > 20)
      columns = columns.slice(0, 20);
    if ((0, import_isEmpty2.default)(columns))
      return this.formatCommon(args);
    this.columns = columns;
    return this.console.c('<div class="data-grid"></div>') + this.formatPreview(table);
  }
  formatErr(err) {
    let lines = err.stack ? err.stack.split("\n") : [];
    let msg = err.name ? `${err.name}: ` : "";
    msg += `${err.message || lines[0]}<br/>`;
    lines = lines.map((val) => (0, import_escape5.default)(val));
    const stack2 = `<div class="${this.console.c("stack hidden")}">${lines.slice(1).join("<br/>")}</div>`;
    return msg + stack2.replace(regJsUrl, (match) => `<a href="${match}" target="_blank">${match}</a>`);
  }
  formatCommon(args) {
    const { c: c2 } = this.console;
    const needStrSubstitution = (0, import_isStr4.default)(args[0]) && args.length !== 1;
    if (needStrSubstitution)
      args = this.substituteStr(args);
    for (let i = 0, len = args.length; i < len; i++) {
      let val = args[i];
      if ((0, import_isEl2.default)(val)) {
        args[i] = this.formatEl(val);
      } else if ((0, import_isFn2.default)(val)) {
        args[i] = this.formatFn(val);
      } else if ((0, import_isRegExp2.default)(val)) {
        args[i] = `<span class="${c2("regexp")}">${(0, import_escape5.default)((0, import_toStr5.default)(val))}</span>`;
      } else if ((0, import_isObj3.default)(val)) {
        args[i] = this.formatPreview(val);
      } else if ((0, import_isUndef2.default)(val)) {
        args[i] = `<span class="${c2("undefined")}">undefined</span>`;
      } else if ((0, import_isNull2.default)(val)) {
        args[i] = `<span class="${c2("null")}">null</span>`;
      } else if ((0, import_isNum7.default)(val)) {
        args[i] = `<span class="${c2("number")}">${(0, import_toStr5.default)(val)}</span>`;
      } else if (typeof val === "bigint") {
        args[i] = `<span class="${c2("number")}">${(0, import_toStr5.default)(val)}n</span>`;
      } else if ((0, import_isBool3.default)(val)) {
        args[i] = `<span class="${c2("boolean")}">${(0, import_toStr5.default)(val)}</span>`;
      } else if ((0, import_isSymbol.default)(val)) {
        args[i] = `<span class="${c2("symbol")}">${(0, import_escape5.default)((0, import_toStr5.default)(val))}</span>`;
      } else {
        val = (0, import_toStr5.default)(val);
        if (i !== 0 || !needStrSubstitution) {
          val = (0, import_escape5.default)(val);
        }
        if (val.length > 5e3) {
          val = (0, import_truncate5.default)(val, 5e3, {
            separator: " ",
            ellipsis: "\u2026"
          });
        }
        args[i] = val;
      }
    }
    return args.join(" ");
  }
  formatDir(args) {
    if ((0, import_isObj3.default)(args[0])) {
      return this.formatPreview(args[0]);
    }
    return this.formatCommon(args);
  }
  formatTableVal(val) {
    const { c: c2 } = this.console;
    if ((0, import_isObj3.default)(val))
      return "{\u2026}";
    if ((0, import_isPrimitive.default)(val))
      return (0, import_toEl.default)(`<div class="${c2("preview")}">${getPreview(val)}</div>`);
    return (0, import_toStr5.default)(val);
  }
  formatPreview(obj) {
    const { c: c2 } = this.console;
    const id2 = (0, import_uniqId2.default)();
    if (this.lazyEvaluation) {
      this.objects[id2] = obj;
    } else {
      this.extractObj(obj, {}, (result) => {
        this.objects[id2] = result;
      });
    }
    const noPreview = (0, import_contain8.default)(["dir", "table"], this.type);
    let type2 = getObjType(obj);
    if (type2 === "Array" && obj.length > 1) {
      type2 = `(${obj.length})`;
      if (noPreview) {
        type2 = `Array${type2}`;
      }
    } else if (type2 === "RegExp") {
      type2 = (0, import_toStr5.default)(obj);
    } else if ((0, import_isEl2.default)(obj)) {
      type2 = this.formatElName(obj);
    }
    return `<div class="${c2("preview")}" data-id="${id2}"><div class="${c2("preview-container")}"><div class="${c2("preview-icon-container")}"><span class="${c2("icon icon-caret-right")}"></span></div><span class="${c2("preview-content-container")}"><span class="${c2("descriptor")}">${(0, import_escape5.default)(type2)}</span> <span class="${c2("object-preview")}">${noPreview ? "" : getPreview(obj, {
      getterVal: this.accessGetter,
      unenumerable: false
    })}</span></span></div><div class="${c2("json hidden")}"></div></div>`;
  }
  substituteStr(args) {
    const str = (0, import_escape5.default)(args[0]);
    let isInCss = false;
    let newStr = "";
    args.shift();
    for (let i = 0, len = str.length; i < len; i++) {
      const c2 = str[i];
      if (c2 === "%" && args.length !== 0) {
        i++;
        const arg = args.shift();
        switch (str[i]) {
          case "i":
          case "d":
            newStr += (0, import_toInt.default)(arg);
            break;
          case "f":
            newStr += (0, import_toNum7.default)(arg);
            break;
          case "s":
            newStr += (0, import_toStr5.default)(arg);
            break;
          case "O":
            if ((0, import_isObj3.default)(arg)) {
              newStr += this.formatPreview(arg);
            } else {
              newStr += (0, import_toStr5.default)(arg);
            }
            break;
          case "o":
            if ((0, import_isEl2.default)(arg)) {
              newStr += this.formatEl(arg);
            } else if ((0, import_isObj3.default)(arg)) {
              newStr += this.formatPreview(arg);
            } else {
              newStr += (0, import_toStr5.default)(arg);
            }
            break;
          case "c":
            if (str.length <= i + 1) {
              break;
            }
            if (isInCss)
              newStr += "</span>";
            isInCss = true;
            newStr += `<span style="${correctStyle(arg)}">`;
            break;
          default:
            i--;
            args.unshift(arg);
            newStr += c2;
        }
      } else {
        newStr += c2;
      }
    }
    if (isInCss)
      newStr += "</span>";
    args.unshift(newStr);
    return args;
  }
  formatJs(val) {
    let hightlighted = (0, import_highlight2.default)(val, "js", emptyHighlightStyle2);
    if (hightlighted !== val) {
      hightlighted = this.console.c(hightlighted);
    }
    return `<pre class="${this.console.c("code")}">${hightlighted}</pre>`;
  }
  formatFn(val) {
    return `<pre style="display:inline">${this.formatJs(val.toString())}</pre>`;
  }
  formatElName(val) {
    const { id: id2, className } = val;
    let ret = val.tagName.toLowerCase();
    if (id2 !== "")
      ret += `#${id2}`;
    if ((0, import_isStr4.default)(className)) {
      let classes = "";
      (0, import_each9.default)(className.split(/\s+/g), (val2) => {
        if (val2.trim() === "")
          return;
        classes += `.${val2}`;
      });
      ret += classes;
    }
    return ret;
  }
  formatEl(val) {
    const id2 = (0, import_uniqId2.default)();
    this.elements[id2] = val;
    return this.console.c(`<div class="dom-viewer" data-id="${id2}"></div>`);
  }
};
function correctStyle(val) {
  val = (0, import_lowerCase5.default)(val);
  const rules = val.split(";");
  const style = {};
  (0, import_each9.default)(rules, (rule) => {
    if (!(0, import_contain8.default)(rule, ":"))
      return;
    const [name, val2] = rule.split(":");
    style[(0, import_trim8.default)(name)] = (0, import_trim8.default)(val2);
  });
  style["display"] = "inline-block";
  style["max-width"] = "100%";
  delete style.width;
  delete style.height;
  let ret = "";
  (0, import_each9.default)(style, (val2, key) => {
    ret += `${key}:${val2};`;
  });
  return ret;
}
function stringify2(obj, options, cb) {
  const result = (0, import_stringifyAll.default)(obj, options);
  (0, import_nextTick.default)(() => cb(result));
}

// node_modules/luna-console/esm/console/index.js
var import_isUndef3 = __toESM(require_isUndef());
var import_perfNow = __toESM(require_perfNow());
var import_now2 = __toESM(require_now());
var import_isStr5 = __toESM(require_isStr());
var import_extend6 = __toESM(require_extend());
var import_uniqId3 = __toESM(require_uniqId());
var import_isRegExp3 = __toESM(require_isRegExp());
var import_isFn3 = __toESM(require_isFn());
var import_Stack = __toESM(require_Stack());
var import_isEmpty3 = __toESM(require_isEmpty());
var import_contain9 = __toESM(require_contain());
var import_copy2 = __toESM(require_copy());
var import_each11 = __toESM(require_each());
var import_toArr3 = __toESM(require_toArr());
var import_keys4 = __toESM(require_keys());
var import_last2 = __toESM(require_last());
var import_throttle2 = __toESM(require_throttle());
var import_xpath = __toESM(require_xpath());
var import_lowerCase6 = __toESM(require_lowerCase());
var import_dateFormat = __toESM(require_dateFormat());
var import_isHidden6 = __toESM(require_isHidden());
var import_stripIndent4 = __toESM(require_stripIndent());
var import_ResizeSensor3 = __toESM(require_ResizeSensor());
var import_isNull3 = __toESM(require_isNull());

// node_modules/luna-console/esm/share/Component.js
var import_Emitter5 = __toESM(require_Emitter());
var import__9 = __toESM(require__());
var import_each10 = __toESM(require_each());
var import_extend5 = __toESM(require_extend());
var import_defaults6 = __toESM(require_defaults());
var import_remove5 = __toESM(require_remove2());
var import_theme4 = __toESM(require_theme());
var import_startWith6 = __toESM(require_startWith());
var Component4 = class extends import_Emitter5.default {
  constructor(container, { compName }, { theme: t = "light" } = {}) {
    super();
    this.subComponents = [];
    this.theme = "";
    this.onThemeChange = (t2) => {
      if (this.options.theme === "auto") {
        this.setTheme(t2);
      }
    };
    this.compName = compName;
    this.c = classPrefix(compName);
    this.options = {};
    this.container = container;
    this.$container = (0, import__9.default)(container);
    this.$container.addClass([
      `luna-${compName}`,
      this.c(`platform-${getPlatform()}`)
    ]);
    this.on("changeOption", (name, val) => {
      if (name === "theme" && val) {
        let t2 = val;
        if (val === "auto") {
          t2 = import_theme4.default.get();
        }
        this.setTheme(t2);
        (0, import_each10.default)(this.subComponents, (component) => component.setOption("theme", val));
      }
    });
    import_theme4.default.on("change", this.onThemeChange);
    this.setOption("theme", t);
  }
  destroy() {
    this.destroySubComponents();
    const { $container } = this;
    const classes = $container.attr("class");
    (0, import_each10.default)(classes.split(/\s+/), (c2) => {
      if ((0, import_startWith6.default)(c2, `luna-${this.compName}`)) {
        $container.rmClass(c2);
      }
    });
    $container.html("");
    this.emit("destroy");
    this.removeAllListeners();
    import_theme4.default.off("change", this.onThemeChange);
  }
  setOption(name, val) {
    const options = this.options;
    let newOptions = {};
    if (typeof name === "string") {
      newOptions[name] = val;
    } else {
      newOptions = name;
    }
    (0, import_each10.default)(newOptions, (val2, name2) => {
      const oldVal = options[name2];
      options[name2] = val2;
      if (val2 === oldVal) {
        return;
      }
      this.emit("changeOption", name2, val2, oldVal);
    });
  }
  getOption(name) {
    return this.options[name];
  }
  addSubComponent(component) {
    component.setOption("theme", this.options.theme);
    this.subComponents.push(component);
  }
  removeSubComponent(component) {
    (0, import_remove5.default)(this.subComponents, (com) => com === component);
  }
  destroySubComponents() {
    (0, import_each10.default)(this.subComponents, (component) => component.destroy());
    this.subComponents = [];
  }
  initOptions(options, defs = {}) {
    (0, import_defaults6.default)(options, defs);
    (0, import_extend5.default)(this.options, options);
  }
  find(selector) {
    return this.$container.find(this.c(selector));
  }
  setTheme(theme5) {
    const { c: c2, $container } = this;
    if (this.theme) {
      $container.rmClass(c2(`theme-${this.theme}`));
    }
    $container.addClass(c2(`theme-${theme5}`));
    this.theme = theme5;
  }
};

// node_modules/luna-console/esm/console/index.js
var import_raf = __toESM(require_raf());
var import_trim9 = __toESM(require_trim());
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
var id = 0;
var Console = class extends Component4 {
  constructor(container, options = {}) {
    super(container, { compName: "console" }, options);
    this.spaceHeight = 0;
    this.topSpaceHeight = 0;
    this.bottomSpaceHeight = 0;
    this.lastScrollTop = 0;
    this.lastTimestamp = 0;
    this.speedToleranceFactor = 100;
    this.maxSpeedTolerance = 2e3;
    this.minSpeedTolerance = 100;
    this.logs = [];
    this.displayLogs = [];
    this.timer = {};
    this.counter = {};
    this.asyncList = [];
    this.asyncTimer = null;
    this.isAtBottom = true;
    this.groupStack = new import_Stack.default();
    this.selectedLog = null;
    this.onScroll = () => {
      const { scrollHeight, offsetHeight, scrollTop } = this.container;
      if (scrollTop <= 0)
        return;
      if (offsetHeight + scrollTop > scrollHeight)
        return;
      let isAtBottom = false;
      if (scrollHeight === offsetHeight) {
        isAtBottom = true;
      } else if (Math.abs(scrollHeight - offsetHeight - scrollTop) < 1) {
        isAtBottom = true;
      }
      this.isAtBottom = isAtBottom;
      const lastScrollTop = this.lastScrollTop;
      const lastTimestamp = this.lastTimestamp;
      const timestamp = (0, import_now2.default)();
      const duration = timestamp - lastTimestamp;
      const distance = scrollTop - lastScrollTop;
      const speed = Math.abs(distance / duration);
      let speedTolerance = speed * this.speedToleranceFactor;
      if (duration > 1e3) {
        speedTolerance = 1e3;
      }
      if (speedTolerance > this.maxSpeedTolerance) {
        speedTolerance = this.maxSpeedTolerance;
      }
      if (speedTolerance < this.minSpeedTolerance) {
        speedTolerance = this.minSpeedTolerance;
      }
      this.lastScrollTop = scrollTop;
      this.lastTimestamp = timestamp;
      let topTolerance = 0;
      let bottomTolerance = 0;
      if (lastScrollTop < scrollTop) {
        topTolerance = this.minSpeedTolerance;
        bottomTolerance = speedTolerance;
      } else {
        topTolerance = speedTolerance;
        bottomTolerance = this.minSpeedTolerance;
      }
      if (this.topSpaceHeight < scrollTop - topTolerance && this.topSpaceHeight + this.el.offsetHeight > scrollTop + offsetHeight + bottomTolerance) {
        return;
      }
      this.renderViewport({
        topTolerance: topTolerance * 2,
        bottomTolerance: bottomTolerance * 2
      });
    };
    this.initTpl();
    this.initOptions(options, {
      maxNum: 0,
      asyncRender: true,
      showHeader: false,
      filter: "",
      level: ["verbose", "info", "warning", "error"],
      accessGetter: false,
      unenumerable: true,
      lazyEvaluation: true
    });
    this.$el = this.find(".logs");
    this.el = this.$el.get(0);
    this.$fakeEl = this.find(".fake-logs");
    this.fakeEl = this.$fakeEl.get(0);
    this.$space = this.find(".logs-space");
    this.space = this.$space.get(0);
    if (isAndroid) {
      this.speedToleranceFactor = 800;
      this.maxSpeedTolerance = 3e3;
      this.minSpeedTolerance = 800;
    }
    this.resizeSensor = new import_ResizeSensor3.default(container);
    this.renderViewport = (0, import_throttle2.default)((options2) => {
      this._renderViewport(options2);
    }, 16);
    this.global = {
      copy(value) {
        if (!(0, import_isStr5.default)(value))
          value = JSON.stringify(value, null, 2);
        (0, import_copy2.default)(value);
      },
      $(selectors) {
        return document.querySelector(selectors);
      },
      $$(selectors) {
        return (0, import_toArr3.default)(document.querySelectorAll(selectors));
      },
      $x(path) {
        return (0, import_xpath.default)(path);
      },
      clear: () => {
        this.clear();
      },
      dir: (value) => {
        this.dir(value);
      },
      table: (data, columns) => {
        this.table(data, columns);
      },
      keys: import_keys4.default
    };
    this.bindEvent();
  }
  setGlobal(name, val) {
    this.global[name] = val;
  }
  destroy() {
    this.$container.off("scroll", this.onScroll);
    this.resizeSensor.destroy();
    super.destroy();
  }
  count(label = "default") {
    const { counter } = this;
    !(0, import_isUndef3.default)(counter[label]) ? counter[label]++ : counter[label] = 1;
    this.info(`${label}: ${counter[label]}`);
  }
  countReset(label = "default") {
    this.counter[label] = 0;
  }
  assert(...args) {
    if ((0, import_isEmpty3.default)(args))
      return;
    const exp = args.shift();
    if (!exp) {
      if (args.length === 0)
        args.unshift("console.assert");
      args.unshift("Assertion failed: ");
      this.insert("error", args);
    }
  }
  log(...args) {
    if ((0, import_isEmpty3.default)(args))
      return;
    this.insert("log", args);
  }
  debug(...args) {
    if ((0, import_isEmpty3.default)(args))
      return;
    this.insert("debug", args);
  }
  dir(obj) {
    if ((0, import_isUndef3.default)(obj))
      return;
    this.insert("dir", [obj]);
  }
  table(...args) {
    if ((0, import_isEmpty3.default)(args))
      return;
    this.insert("table", args);
  }
  time(name = "default") {
    if (this.timer[name]) {
      return this.insert("warn", [`Timer '${name}' already exists`]);
    }
    this.timer[name] = (0, import_perfNow.default)();
  }
  timeLog(name = "default") {
    const startTime = this.timer[name];
    if (!startTime) {
      return this.insert("warn", [`Timer '${name}' does not exist`]);
    }
    this.info(`${name}: ${(0, import_perfNow.default)() - startTime}ms`);
  }
  timeEnd(name = "default") {
    this.timeLog(name);
    delete this.timer[name];
  }
  clear(silent = false) {
    this.logs = [];
    this.displayLogs = [];
    this.selectLog(null);
    this.lastLog = void 0;
    this.counter = {};
    this.timer = {};
    this.groupStack = new import_Stack.default();
    this.asyncList = [];
    if (this.asyncTimer) {
      clearTimeout(this.asyncTimer);
      this.asyncTimer = null;
    }
    if (silent) {
      this.render();
    } else {
      this.insert("log", [
        "%cConsole was cleared",
        "color:#808080;font-style:italic;"
      ]);
    }
  }
  info(...args) {
    if ((0, import_isEmpty3.default)(args))
      return;
    this.insert("info", args);
  }
  error(...args) {
    if ((0, import_isEmpty3.default)(args))
      return;
    this.insert("error", args);
  }
  warn(...args) {
    if ((0, import_isEmpty3.default)(args))
      return;
    this.insert("warn", args);
  }
  group(...args) {
    this.insert({
      type: "group",
      args,
      ignoreFilter: true
    });
  }
  groupCollapsed(...args) {
    this.insert({
      type: "groupCollapsed",
      args,
      ignoreFilter: true
    });
  }
  groupEnd() {
    this.insert("groupEnd");
  }
  evaluate(code) {
    this.insert({
      type: "input",
      args: [code],
      ignoreFilter: true
    });
    try {
      this.output(this.evalJs(code));
    } catch (e) {
      this.insert({
        type: "error",
        ignoreFilter: true,
        args: [e]
      });
    }
  }
  html(...args) {
    this.insert("html", args);
  }
  toggleGroup(log) {
    const { targetGroup } = log;
    targetGroup.collapsed ? this.openGroup(log) : this.collapseGroup(log);
  }
  output(val) {
    this.insert({
      type: "output",
      args: [val],
      ignoreFilter: true
    });
  }
  render() {
    const { logs, selectedLog } = this;
    this.$el.html("");
    this.isAtBottom = true;
    this.updateBottomSpace(0);
    this.updateTopSpace(0);
    this.displayLogs = [];
    for (let i = 0, len = logs.length; i < len; i++) {
      this.attachLog(logs[i]);
    }
    if (selectedLog) {
      if (!(0, import_contain9.default)(this.displayLogs, selectedLog)) {
        this.selectLog(null);
      }
    }
  }
  insert(type2, args) {
    const { showHeader, asyncRender } = this.options;
    let header;
    if (showHeader) {
      header = {
        time: getCurTime(),
        from: getFrom()
      };
    }
    if (asyncRender) {
      return this.insertAsync(type2, args, header);
    }
    this.insertSync(type2, args, header);
  }
  insertAsync(type2, args, header) {
    this.asyncList.push([type2, args, header]);
    this.handleAsyncList();
  }
  insertSync(type2, args, header) {
    const { logs, groupStack } = this;
    const { maxNum, accessGetter, unenumerable, lazyEvaluation } = this.options;
    let options;
    if ((0, import_isStr5.default)(type2)) {
      options = {
        type: type2,
        args,
        header
      };
    } else {
      options = type2;
    }
    if (options.type === "groupEnd") {
      const lastLog2 = this.lastLog;
      lastLog2.groupEnd();
      this.groupStack.pop();
      return;
    }
    if (groupStack.size > 0) {
      options.group = groupStack.peek();
    }
    (0, import_extend6.default)(options, {
      id: ++id,
      accessGetter,
      unenumerable,
      lazyEvaluation
    });
    if (options.type === "group" || options.type === "groupCollapsed") {
      const group = {
        id: (0, import_uniqId3.default)("group"),
        collapsed: false,
        parent: groupStack.peek(),
        indentLevel: groupStack.size + 1
      };
      if (options.type === "groupCollapsed")
        group.collapsed = true;
      options.targetGroup = group;
      groupStack.push(group);
    }
    let log = new Log(this, options);
    log.on("updateHeight", () => {
      this.isAtBottom = false;
      this.renderViewport();
    });
    const lastLog = this.lastLog;
    if (lastLog && !(0, import_contain9.default)(["html", "group", "groupCollapsed"], log.type) && lastLog.type === log.type && log.isSimple() && lastLog.text() === log.text()) {
      lastLog.addCount();
      if (log.header)
        lastLog.updateTime(log.header.time);
      log = lastLog;
      this.detachLog(lastLog);
    } else {
      logs.push(log);
      this.lastLog = log;
    }
    if (maxNum !== 0 && logs.length > maxNum) {
      const firstLog = logs[0];
      this.detachLog(firstLog);
      logs.shift();
    }
    this.attachLog(log);
    this.emit("insert", log);
  }
  updateTopSpace(height) {
    this.topSpaceHeight = height;
    this.el.style.top = height + "px";
  }
  updateBottomSpace(height) {
    this.bottomSpaceHeight = height;
  }
  updateSpace(height) {
    if (this.spaceHeight === height)
      return;
    this.spaceHeight = height;
    this.space.style.height = height + "px";
  }
  detachLog(log) {
    const { displayLogs } = this;
    const idx = displayLogs.indexOf(log);
    if (idx > -1) {
      displayLogs.splice(idx, 1);
      this.renderViewport();
    }
  }
  attachLog(log) {
    if (!this.filterLog(log) || log.collapsed)
      return;
    const { displayLogs } = this;
    if (displayLogs.length === 0) {
      displayLogs.push(log);
      this.renderViewport();
      return;
    }
    const lastDisplayLog = (0, import_last2.default)(displayLogs);
    if (log.id > lastDisplayLog.id) {
      displayLogs.push(log);
      this.renderViewport();
      return;
    }
    let startIdx = 0;
    let endIdx = displayLogs.length - 1;
    let middleLog;
    let middleIdx = 0;
    while (startIdx <= endIdx) {
      middleIdx = startIdx + Math.floor((endIdx - startIdx) / 2);
      middleLog = displayLogs[middleIdx];
      if (middleLog.id === log.id) {
        return;
      }
      if (middleLog.id < log.id) {
        startIdx = middleIdx + 1;
      } else {
        endIdx = middleIdx - 1;
      }
    }
    if (middleLog.id < log.id) {
      displayLogs.splice(middleIdx + 1, 0, log);
    } else {
      displayLogs.splice(middleIdx, 0, log);
    }
    this.renderViewport();
  }
  handleAsyncList(timeout = 20) {
    const asyncList = this.asyncList;
    if (this.asyncTimer)
      return;
    this.asyncTimer = setTimeout(() => {
      this.asyncTimer = null;
      let done = false;
      const len = asyncList.length;
      let timeout2, num;
      if (len < 1e3) {
        num = 200;
        timeout2 = 400;
      } else if (len < 5e3) {
        num = 500;
        timeout2 = 800;
      } else if (len < 1e4) {
        num = 800;
        timeout2 = 1e3;
      } else if (len < 25e3) {
        num = 1e3;
        timeout2 = 1200;
      } else if (len < 5e4) {
        num = 1500;
        timeout2 = 1500;
      } else {
        num = 2e3;
        timeout2 = 2500;
      }
      if (num > len) {
        num = len;
        done = true;
      }
      for (let i = 0; i < num; i++) {
        const [type2, args, header] = asyncList.shift();
        this.insertSync(type2, args, header);
      }
      if (!done) {
        (0, import_raf.default)(() => this.handleAsyncList(timeout2));
      }
    }, timeout);
  }
  injectGlobal() {
    (0, import_each11.default)(this.global, (val, name) => {
      if (window[name])
        return;
      window[name] = val;
    });
  }
  clearGlobal() {
    (0, import_each11.default)(this.global, (val, name) => {
      if (window[name] && window[name] === val) {
        delete window[name];
      }
    });
  }
  evalJs(jsInput) {
    let ret;
    this.injectGlobal();
    try {
      ret = eval.call(window, `(${jsInput})`);
    } catch (e) {
      ret = eval.call(window, jsInput);
    }
    this.setGlobal("$_", ret);
    this.clearGlobal();
    return ret;
  }
  filterLog(log) {
    const { level } = this.options;
    let { filter: filter3 } = this.options;
    if (log.ignoreFilter) {
      return true;
    }
    if (!(0, import_contain9.default)(level, log.level)) {
      return false;
    }
    if (filter3) {
      if ((0, import_isFn3.default)(filter3)) {
        return filter3(log);
      } else if ((0, import_isRegExp3.default)(filter3)) {
        return filter3.test((0, import_lowerCase6.default)(log.text()));
      } else if ((0, import_isStr5.default)(filter3)) {
        filter3 = (0, import_trim9.default)(filter3);
        if (filter3) {
          return (0, import_contain9.default)((0, import_lowerCase6.default)(log.text()), (0, import_lowerCase6.default)(filter3));
        }
      }
    }
    return true;
  }
  collapseGroup(log) {
    const { targetGroup } = log;
    targetGroup.collapsed = true;
    log.updateIcon("caret-right");
    this.updateGroup(log);
  }
  openGroup(log) {
    const { targetGroup } = log;
    targetGroup.collapsed = false;
    log.updateIcon("caret-down");
    this.updateGroup(log);
  }
  updateGroup(log) {
    const { targetGroup } = log;
    const { logs } = this;
    const len = logs.length;
    let i = logs.indexOf(log) + 1;
    while (i < len) {
      const log2 = logs[i];
      if (!log2.checkGroup() && log2.group === targetGroup) {
        break;
      }
      log2.collapsed ? this.detachLog(log2) : this.attachLog(log2);
      i++;
    }
  }
  selectLog(log) {
    if (this.selectedLog) {
      this.selectedLog.deselect();
      this.selectedLog = null;
    }
    if (!(0, import_isNull3.default)(log)) {
      this.selectedLog = log;
      this.selectedLog?.select();
      this.emit("select", log);
    } else {
      this.emit("deselect");
    }
  }
  bindEvent() {
    const { $el, c: c2 } = this;
    this.resizeSensor.addListener(this.renderViewport);
    const self2 = this;
    $el.on("click", c2(".log-container"), function() {
      self2.selectLog(this.log);
    });
    this.on("changeOption", (name, val) => {
      const { logs } = this;
      switch (name) {
        case "maxNum":
          if (val > 0 && logs.length > val) {
            this.logs = logs.slice(logs.length - val);
            this.render();
          }
          break;
        case "filter":
          this.render();
          break;
        case "level":
          this.options.level = (0, import_toArr3.default)(val);
          this.render();
          break;
      }
    });
    this.$container.on("scroll", this.onScroll);
  }
  _renderViewport({ topTolerance = 500, bottomTolerance = 500 } = {}) {
    const { el, container, space } = this;
    if ((0, import_isHidden6.default)(container))
      return;
    const { scrollTop, offsetHeight } = container;
    const containerWidth = space.getBoundingClientRect().width;
    const top = scrollTop - topTolerance;
    const bottom = scrollTop + offsetHeight + bottomTolerance;
    const { displayLogs } = this;
    let topSpaceHeight = 0;
    let bottomSpaceHeight = 0;
    let currentHeight = 0;
    const len = displayLogs.length;
    const { fakeEl } = this;
    const fakeFrag = document.createDocumentFragment();
    const logs = [];
    for (let i = 0; i < len; i++) {
      const log = displayLogs[i];
      const { width, height } = log;
      if (height === 0 || width !== containerWidth) {
        fakeFrag.appendChild(log.container);
        logs.push(log);
      }
    }
    if (logs.length > 0) {
      fakeEl.appendChild(fakeFrag);
      for (let i = 0, len2 = logs.length; i < len2; i++) {
        logs[i].updateSize();
      }
      fakeEl.textContent = "";
    }
    const frag = document.createDocumentFragment();
    for (let i = 0; i < len; i++) {
      const log = displayLogs[i];
      const { container: container2, height } = log;
      if (currentHeight > bottom) {
        bottomSpaceHeight += height;
      } else if (currentHeight + height > top) {
        frag.appendChild(container2);
      } else if (currentHeight < top) {
        topSpaceHeight += height;
      }
      currentHeight += height;
    }
    this.updateSpace(currentHeight);
    this.updateTopSpace(topSpaceHeight);
    this.updateBottomSpace(bottomSpaceHeight);
    while (el.firstChild) {
      if (el.lastChild) {
        el.removeChild(el.lastChild);
      }
    }
    el.appendChild(frag);
    const { scrollHeight } = container;
    if (this.isAtBottom && scrollTop <= scrollHeight - offsetHeight) {
      container.scrollTop = 1e7;
    }
  }
  initTpl() {
    this.$container.html(this.c(import_stripIndent4.default`
      <div class="logs-space">
        <div class="fake-logs"></div>
        <div class="logs"></div>
      </div>
    `));
  }
};
var getCurTime = () => (0, import_dateFormat.default)("HH:MM:ss ");
function getFrom() {
  const e = new Error();
  let ret = "";
  const lines = e.stack ? e.stack.split("\n") : "";
  for (let i = 0, len = lines.length; i < len; i++) {
    ret = lines[i];
    if (ret.indexOf("winConsole") > -1 && i < len - 1) {
      ret = lines[i + 1];
      break;
    }
  }
  return ret;
}
if (typeof module !== "undefined") {
  exportCjs(module, Console);
}

// src/livecodes/types/default-types.ts
var getDefaultTypes = () => ({});

// src/livecodes/core.ts
var stores2 = createStores();
var eventsManager = createEventsManager();
var notifications;
var modal;
var i18n;
var split = null;
var typeLoader;
var screens = [];
var params = getParams();
var iframeScrollPosition = { x: 0, y: 0 };
var editorIds = ["markup", "style", "script"];
var baseUrl;
var isEmbed;
var isLite;
var isHeadless;
var compiler;
var formatter;
var editors;
var customEditors;
var currentEditorConfig;
var toolsPane;
var authService;
var editorLanguages;
var resultLanguages = [];
var projectId;
var isSaved = true;
var changingContent = false;
var consoleInputCodeCompletion;
var starterTemplates;
var initialized = false;
var isDestroyed = false;
var broadcastInfo = {
  isBroadcasting: false,
  channel: "",
  channelUrl: "",
  channelToken: "",
  broadcastSource: false
};
var resultPopup = null;
var sdkWatchers = {
  load: createPub(),
  ready: createPub(),
  code: createPub(),
  tests: createPub(),
  console: createPub(),
  destroy: createPub()
};
var getEditorLanguage = (editorId = "markup") => editorLanguages?.[editorId];
var getEditorLanguages = () => Object.values(editorLanguages || {});
var getActiveEditor = () => editors[getConfig().activeEditor || "markup"];
var setActiveEditor = async (config) => showEditor(config.activeEditor);
var loadStyles = () => isHeadless ? Promise.resolve() : Promise.all(
  [
    snackbarUrl,
    ...isLite ? [] : [
      lunaObjViewerStylesUrl,
      lunaDataGridStylesUrl,
      lunaDomViewerStylesUrl,
      lunaConsoleStylesUrl
    ]
  ].map((url3) => loadStylesheet(url3, void 0, "#app-styles"))
);
var createIframe = (container, result = "", service = sandboxService) => new Promise((resolve, reject) => {
  if (!container) {
    reject(
      window.deps.translateString("core.error.noResultContainer", "Result container not found")
    );
    return;
  }
  let iframe = getResultIFrameElement();
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.name = "result";
    iframe.id = "result-frame";
    if (isHeadless) {
      iframe.setAttribute("sandbox", "allow-same-origin allow-forms allow-scripts");
    } else {
      iframe.setAttribute(
        "allow",
        "accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"
      );
      iframe.setAttribute("allowtransparency", "true");
      iframe.setAttribute("allowpaymentrequest", "true");
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute(
        "sandbox",
        "allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"
      );
    }
  }
  iframe.tabIndex = 1;
  const scriptLang = getEditorLanguage("script") || "javascript";
  const compilers = getAllCompilers(languages, getConfig(), baseUrl);
  const editorsText = `
      ${getConfig().markup.hiddenContent || ""}
      ${getConfig().markup.content}
      ${getConfig().style.hiddenContent || ""}
      ${getConfig().style.content}
      ${getConfig().script.hiddenContent || ""}
      ${getConfig().script.content}
      `;
  const iframeIsPlaced = iframe.parentElement === container;
  const styleOnlyUpdate = iframeIsPlaced && getCache().styleOnlyUpdate;
  const liveReload = iframeIsPlaced && compilers[scriptLang]?.liveReload && resultLanguages.includes(scriptLang) && !editorsText.includes("__livecodes_reload__");
  if (styleOnlyUpdate) {
    const domParser = new DOMParser();
    const dom = domParser.parseFromString(result, "text/html");
    const stylesElement = dom.querySelector("#__livecodes_styles__");
    if (stylesElement) {
      const styles = stylesElement.innerHTML;
      iframe.contentWindow?.postMessage({ styles }, service.getOrigin());
    } else {
      iframe.contentWindow?.postMessage({ result }, service.getOrigin());
    }
    resolve("loaded");
  } else if (liveReload) {
    iframe.contentWindow?.postMessage({ result }, service.getOrigin());
    resolve("loaded");
  } else {
    let loaded = false;
    eventsManager.addEventListener(iframe, "load", function onload() {
      eventsManager.removeEventListener(iframe, "load", onload);
      if (!result || loaded) {
        resolve("loaded");
        return;
      }
      iframe.contentWindow?.postMessage({ result }, service.getOrigin());
      loaded = true;
      resolve("loaded");
    });
    iframe.remove();
    const { markup, style, script } = getConfig();
    const query = `?markup=${markup.language}&style=${style.language}&script=${script.language}&isEmbed=${isEmbed}&isLoggedIn=${Boolean(authService?.isLoggedIn())}&appCDN=${getAppCDN()}`;
    const scrollPosition = params.scrollPosition === false || iframeScrollPosition.x === 0 && iframeScrollPosition.y === 0 ? "" : `#livecodes-scroll-position:${iframeScrollPosition.x},${iframeScrollPosition.y}`;
    iframe.src = service.getResultUrl() + query + scrollPosition;
    container.appendChild(iframe);
  }
  resultLanguages = getEditorLanguages();
});
var loadModuleTypes = async (editors2, config, loadAll = false, force = false) => {
  if (typeof editors2?.script?.addTypes !== "function")
    return;
  const scriptLanguage = config.script.language;
  if (["typescript", "javascript"].includes(mapLanguage(scriptLanguage)) || force) {
    if (compiler.isFake) {
      await reloadCompiler({ ...config, mode: "full" });
    }
    const configTypes = {
      ...getLanguageCompiler(config.markup.language)?.types,
      ...getLanguageCompiler(config.script.language)?.types,
      ...getDefaultTypes(),
      ...config.types,
      ...config.customSettings.types
    };
    const reactImport = hasJsx.includes(scriptLanguage) ? `import React from 'react';
` : "";
    const libs = await typeLoader.load(
      reactImport + getConfig().script.content + "\n" + getConfig().markup.content,
      configTypes,
      loadAll,
      force
    );
    libs.forEach((lib) => editors2.script.addTypes?.(lib, force));
  }
};
var highlightSelectedLanguage = (editorId, language) => {
  const menuItems = document.querySelectorAll(
    `.dropdown-menu-${editorId} .language-item a`
  );
  menuItems.forEach((item) => {
    if (item.dataset.lang === language) {
      item.parentElement?.classList.add("active");
    } else {
      item.parentElement?.classList.remove("active");
    }
  });
};
var setEditorTitle = (editorId, title) => {
  const editorTitle = document.querySelector(`#${editorId}-selector span`);
  const editorTitleContainer = document.querySelector(`#${editorId}-selector`);
  const language = getLanguageByAlias(title);
  if (!editorTitle || !language)
    return;
  const config = getConfig();
  if (config[editorId].hideTitle) {
    editorTitleContainer.style.display = "none";
    return;
  }
  editorTitleContainer.style.display = "";
  editorTitleContainer.style.order = String(config[editorId].order ?? 0);
  highlightSelectedLanguage(editorId, language);
  const shortcut = ` (Ctrl/\u2318 + Alt + ${editorIds.indexOf(editorId) + 1})`;
  const customTitle = config[editorId].title;
  if (customTitle) {
    editorTitle.textContent = customTitle;
    if (!isEmbed) {
      editorTitle.title = `${capitalize(editorId)}: ${customTitle}${shortcut}`;
    }
    return;
  }
  const lang = languages.find((lang2) => lang2.name === language);
  editorTitle.textContent = lang?.title ?? "";
  if (!isEmbed) {
    editorTitle.title = `${capitalize(editorId)}: ${lang?.longTitle ?? lang?.title ?? ""}${shortcut}`;
  }
};
var createCopyButtons = () => {
  const copyImgHtml = `<span><i class="icon-copy" alt="copy"></i></span>`;
  editorIds.forEach((editorId) => {
    const copyButton = document.createElement("div");
    copyButton.innerHTML = copyImgHtml;
    copyButton.classList.add("copy-button", "tool-buttons");
    copyButton.title = window.deps.translateString("core.copy.title", "Copy");
    document.getElementById(editorId)?.appendChild(copyButton);
    eventsManager.addEventListener(copyButton, "click", () => {
      if (copyToClipboard(editors?.[editorId]?.getValue())) {
        copyButton.innerHTML = `<span><img src="${baseUrl}assets/images/tick.svg" alt="copied"></span>`;
        copyButton.classList.add("visible");
        copyButton.title = window.deps.translateString("core.copy.hint", "Copied!");
        setTimeout(() => {
          copyButton.innerHTML = copyImgHtml;
          copyButton.classList.remove("visible");
          copyButton.title = window.deps.translateString("core.copy.title", "Copy");
        }, 2e3);
      }
    });
  });
};
var createEditors = async (config) => {
  let isReload = false;
  if (editors) {
    isReload = true;
    Object.values(editors).forEach((editor) => editor.destroy());
    resetEditorModeStatus();
  }
  const findActiveEditor = () => config.activeEditor || config.languages?.length && getLanguageEditorId(config.languages[0]) || (config.markup.content ? "markup" : config.style.content ? "style" : config.script.content ? "script" : "markup");
  const baseOptions = {
    baseUrl,
    mode: config.mode,
    readonly: config.readonly,
    ...getEditorConfig(config),
    activeEditor: findActiveEditor(),
    isEmbed,
    isLite,
    isHeadless,
    mapLanguage,
    getLanguageExtension,
    getFormatterConfig: () => getFormatterConfig(getConfig()),
    getFontFamily
  };
  const markupOptions = {
    ...baseOptions,
    container: getMarkupElement(),
    editorId: "markup",
    language: languageIsEnabled(config.markup.language, config) ? config.markup.language : config.languages?.find((lang) => getLanguageEditorId(lang) === "markup") || "html",
    value: languageIsEnabled(config.markup.language, config) ? config.markup.content || "" : ""
  };
  const styleOptions = {
    ...baseOptions,
    container: getStyleElement(),
    editorId: "style",
    language: languageIsEnabled(config.style.language, config) ? config.style.language : config.languages?.find((lang) => getLanguageEditorId(lang) === "style") || "css",
    value: languageIsEnabled(config.style.language, config) ? config.style.content || "" : ""
  };
  const scriptOptions = {
    ...baseOptions,
    container: getScriptElement(),
    editorId: "script",
    language: languageIsEnabled(config.script.language, config) ? config.script.language : config.languages?.find((lang) => getLanguageEditorId(lang) === "script") || "javascript",
    value: languageIsEnabled(config.script.language, config) ? config.script.content || "" : ""
  };
  const markupEditor = await createEditor(markupOptions);
  const styleEditor = await createEditor(styleOptions);
  const scriptEditor = await createEditor(scriptOptions);
  currentEditorConfig = { ...getEditorConfig(config), ...getFormatterConfig(config) };
  setEditorTitle("markup", markupOptions.language);
  setEditorTitle("style", styleOptions.language);
  setEditorTitle("script", scriptOptions.language);
  editorLanguages = {
    markup: markupOptions.language,
    style: styleOptions.language,
    script: scriptOptions.language
  };
  editors = {
    markup: markupEditor,
    style: styleEditor,
    script: scriptEditor
  };
  Object.keys(editors).forEach((editorId) => {
    const language = editorLanguages?.[editorId] || "html";
    applyLanguageConfigs(language);
    formatter.getFormatFn(language).then((fn) => editors[editorId].registerFormatter(fn));
    registerRun(editorId, editors);
  });
  if (config.mode === "codeblock") {
    createCopyButtons();
  }
  if (isReload) {
    loadModuleTypes(
      editors,
      config,
      /* loadAll = */
      true
    );
  }
};
var reloadEditors = async (config) => {
  await createEditors(config);
  await toolsPane?.console?.reloadEditor(config);
  await toolsPane?.compiled?.reloadEditor(config);
  updateCompiledCode();
  handleChangeContent();
};
var updateEditors = async (editors2, config) => {
  const editorIds2 = Object.keys(editors2);
  for (const editorId of editorIds2) {
    const language = getLanguageByAlias(config[editorId].language);
    if (language) {
      await changeLanguage(language, config[editorId].content, true);
    }
    const editor = editors2[editorId];
    if (config.foldRegions) {
      await editor.foldRegions?.();
    }
    const foldedLines = config[editorId].foldedLines;
    if (foldedLines?.length) {
      await editor.foldLines?.(foldedLines);
    }
  }
};
var showEditor = (editorId = "markup", isUpdate = false) => {
  const config = getConfig();
  const allHidden = editorIds.every((editor) => config[editor].hideTitle);
  if (config[editorId].hideTitle && !allHidden)
    return;
  const titles = getEditorTitles();
  const editorIsVisible = () => Array.from(titles).map((title) => title.dataset.editor).includes(editorId);
  if (!editorIsVisible()) {
    editorId = titles[0].dataset.editor || "markup";
  }
  titles.forEach((selector) => selector.classList.remove("active"));
  const activeTitle = document.getElementById(editorId + "-selector");
  activeTitle?.classList.add("active");
  const editorDivs = getEditorDivs();
  editorDivs.forEach((editor) => editor.style.display = "none");
  const activeEditor = document.getElementById(editorId);
  activeEditor.style.display = "block";
  activeEditor.style.visibility = "visible";
  if (!isEmbed && !isUpdate) {
    editors[editorId]?.focus();
  }
  if (!isUpdate) {
    setConfig({
      ...getConfig(),
      activeEditor: editorId
    });
  }
  updateCompiledCode();
  if (initialized || config.view !== "result") {
    split?.show("code");
  }
  configureEditorTools(getActiveEditor().getLanguage());
  showEditorModeStatus(editorId);
};
var showEditorModeStatus = (editorId) => {
  const editorStatusNodes = document.querySelectorAll(
    "#editor-status > span[data-status]"
  );
  editorStatusNodes.forEach((node) => {
    if (node.dataset.status === editorId) {
      node.style.position = "unset";
      node.style.width = "unset";
      node.style.overflow = "unset";
    } else {
      node.style.position = "absolute";
      node.style.width = "0";
      node.style.overflow = "hidden";
    }
  });
};
var resetEditorModeStatus = () => {
  const editorModeNode = getEditorModeNode();
  if (editorModeNode) {
    editorModeNode.textContent = "";
  }
  const editorStatusNodes = document.querySelectorAll(
    "#editor-status > span[data-status]"
  );
  editorStatusNodes.forEach((node) => {
    node.innerHTML = "";
  });
};
var addConsoleInputCodeCompletion = () => {
  if (consoleInputCodeCompletion) {
    consoleInputCodeCompletion.dispose();
  }
  if (editorLanguages?.script && ["javascript", "typescript"].includes(mapLanguage(editorLanguages.script))) {
    if (editors.script && typeof editors.script.addTypes === "function") {
      consoleInputCodeCompletion = editors.script.addTypes({
        content: getConfig().script.content + "\n{}",
        filename: "script.js"
      });
    }
  }
};
var configureEditorTools = (language) => {
  if (getConfig().readonly || language === "blockly" || language === "richtext") {
    getEditorToolbar().classList.add("hidden");
    return false;
  }
  getEditorToolbar().classList.remove("hidden");
  const langSpecs = getLanguageSpecs(language);
  if (langSpecs?.formatter || langSpecs?.parser) {
    getFormatButton().classList.remove("disabled");
  } else {
    getFormatButton().classList.add("disabled");
  }
  return true;
};
var addPhpToken = (code) => code.includes("<?php") || code.includes("<?=") ? code : "<?php\n" + code;
var phpHelper = ({ editor, code }) => {
  if (code?.trim()) {
    return addPhpToken(code);
  }
  if (editor?.getLanguage().startsWith("php")) {
    editor.setValue(addPhpToken(editor.getValue()));
    editor.setPosition({ lineNumber: 2, column: 0 });
  }
  return "<?php\n";
};
var applyLanguageConfigs = async (language) => {
  const editorId = getLanguageEditorId(language);
  if (!editorId || !language || !languageIsEnabled(language, getConfig()))
    return;
  configureEditorTools(language);
  Object.keys(customEditors).forEach(async (lang) => {
    await customEditors[lang]?.show(Object.values(editorLanguages || []).includes(lang), {
      baseUrl,
      editors,
      config: getConfig(),
      html: getCache().markup.compiled || getConfig().markup.content || "",
      eventsManager
    });
  });
};
var changeLanguage = async (language, value, isUpdate = false) => {
  const editorId = getLanguageEditorId(language);
  if (!editorId || !language || !languageIsEnabled(language, getConfig()))
    return;
  if (getLanguageSpecs(language)?.largeDownload) {
    notifications.info(
      window.deps.translateString(
        "core.changeLanguage.message",
        "Loading {{lang}}. This may take a while!",
        {
          lang: getLanguageTitle(language)
        }
      )
    );
  }
  const editor = editors[editorId];
  editor.setLanguage(language, value ?? (getConfig()[editorId].content || ""));
  if (editorLanguages) {
    editorLanguages[editorId] = language;
  }
  setEditorTitle(editorId, language);
  showEditor(editorId, isUpdate);
  phpHelper({ editor: editors.script });
  if (!isEmbed && !isUpdate) {
    setTimeout(() => editor.focus());
  }
  await compiler.load([language], getConfig());
  formatter.getFormatFn(language).then((fn) => editor.registerFormatter(fn));
  if (!isUpdate) {
    setConfig({
      ...getConfig(),
      activeEditor: editorId
    });
    if (getConfig().autoupdate) {
      await run2();
    }
  }
  await setSavedStatus();
  dispatchChangeEvent();
  addConsoleInputCodeCompletion();
  loadModuleTypes(
    editors,
    getConfig(),
    /* loadAll = */
    true
  );
  await applyLanguageConfigs(language);
};
var registerRun = (editorId, editors2) => {
  const editor = editors2[editorId];
  editor.addKeyBinding("run", editor.keyCodes.ShiftEnter, async () => {
    await run2();
  });
};
var updateCompiledCode = () => {
  const getCompiledLanguage = (editorId) => {
    const defaultLang = {
      markup: "html",
      style: "css",
      script: "javascript"
    };
    const lang = getLanguageCompiler(getConfig()[editorId].language)?.compiledCodeLanguage;
    return {
      language: lang || defaultLang[editorId],
      label: lang === "json" ? "JSON" : getLanguageByAlias(lang) || lang || defaultLang[editorId]
    };
  };
  const compiledLanguages = {
    markup: getCompiledLanguage("markup"),
    style: getCompiledLanguage("style"),
    script: getCompiledLanguage("script")
  };
  if (toolsPane && toolsPane.compiled) {
    const cache2 = getCache();
    Object.keys(cache2).forEach((editorId) => {
      if (editorId !== getConfig().activeEditor)
        return;
      let compiledCode = cache2[editorId].modified || cache2[editorId].compiled || "";
      if (editorId === "script" && getConfig().script.language.startsWith("php")) {
        compiledCode = phpHelper({ code: compiledCode });
      }
      toolsPane?.compiled?.update(
        compiledLanguages[editorId].language,
        compiledCode,
        compiledLanguages[editorId].label
      );
    });
  }
};
var getResultPage = async ({
  sourceEditor = void 0,
  forExport = false,
  template = resultTemplate,
  singleFile = true,
  runTests: runTests2 = false
}) => {
  updateConfig();
  const config = getConfig();
  const contentConfig = getContentConfig(config);
  const getContent = (editor) => {
    const editorContent = editor?.content ?? "";
    const hiddenContent = editor?.hiddenContent ?? "";
    if (!hiddenContent) {
      return editorContent;
    }
    const placeholder = "{{__livecodes_editor_content__}}";
    return hiddenContent.includes(placeholder) ? hiddenContent.replace(placeholder, editorContent) : `${hiddenContent}
${editorContent}`;
  };
  const markupContent = getContent(config.markup);
  const styleContent = getContent(config.style);
  const scriptContent = getContent(config.script);
  const testsContent = getContent(config.tests);
  const markupLanguage = config.markup.language;
  const styleLanguage = config.style.language;
  const scriptLanguage = config.script.language;
  const testsLanguage = config.tests?.language || "typescript";
  const scriptType3 = getLanguageCompiler(scriptLanguage)?.scriptType;
  const forceCompileStyles = [...config.processors, ...getCache().processors].find(
    (name) => processors.find((p) => name === p.name && p.needsHTML)
  ) && (config.processors.join(",") !== getCache().processors.join(",") || markupContent !== getContent(getCache().markup) || scriptContent !== getContent(getCache().script));
  const testsNotChanged = !config.tests?.content && !getCache().tests?.content || config.tests?.language === getCache().tests?.language && config.tests?.content === getCache().tests?.content && getCache().tests?.compiled;
  if (testsNotChanged && !config.tests?.content) {
    toolsPane?.tests?.showResults({ results: [] });
  }
  const forceCompileSFC = (config.markup.language === config.script.language + "-app" || getCache().markup.language === getCache().script.language + "-app") && (config.markup.language !== getCache().markup.language || config.script.language !== getCache().script.language);
  const markupCompileResult = await compiler.compile(markupContent, markupLanguage, config, {
    forceCompile: forceCompileSFC
  });
  let compiledMarkup = markupCompileResult.code;
  const scriptCompileResult = await compiler.compile(scriptContent, scriptLanguage, config, {
    forceCompile: forceCompileStyles || forceCompileSFC,
    blockly: scriptLanguage === "blockly" ? await customEditors.blockly?.getContent({
      baseUrl,
      editors,
      config: getConfig(),
      html: compiledMarkup,
      eventsManager
    }) : {}
  });
  const compiledScript = scriptCompileResult.code;
  let compileInfo = {
    ...markupCompileResult.info,
    ...scriptCompileResult.info,
    importedContent: (markupCompileResult.info.importedContent || "") + (scriptCompileResult.info.importedContent || ""),
    imports: {
      ...scriptCompileResult.info.imports,
      ...markupCompileResult.info.imports
    }
  };
  const [styleCompileResult, testsCompileResult] = await Promise.all([
    compiler.compile(styleContent, styleLanguage, config, {
      html: `${compiledMarkup}<script type="script-for-styles">${compiledScript}<\/script>
        <script type="script-for-styles">${compileInfo.importedContent}<\/script>`,
      forceCompile: forceCompileStyles
    }),
    runTests2 ? testsNotChanged ? Promise.resolve(getCache().tests?.compiled || "") : compiler.compile(testsContent, testsLanguage, config, {}) : Promise.resolve(getCompileResult(getCache().tests?.compiled || ""))
  ]);
  const [compiledStyle, compiledTests] = [styleCompileResult, testsCompileResult].map((result2) => {
    const { code, info } = getCompileResult(result2);
    compileInfo = {
      ...compileInfo,
      ...info
    };
    return code;
  });
  if (compileInfo.modifiedHTML) {
    compiledMarkup = compileInfo.modifiedHTML;
  }
  const compiledCode = {
    ...contentConfig,
    markup: {
      ...contentConfig.markup,
      compiled: compiledMarkup,
      modified: compiledMarkup
    },
    style: {
      ...contentConfig.style,
      compiled: compiledStyle,
      modified: compiledStyle
    },
    script: {
      ...contentConfig.script,
      compiled: config.customSettings.convertCommonjs === false || scriptType3 && scriptType3 !== "module" ? compiledScript : cjs2esm(compiledScript)
    },
    tests: {
      language: testsLanguage,
      ...contentConfig.tests,
      compiled: compiledTests
    }
  };
  compiledCode.script.modified = compiledCode.script.compiled;
  if (scriptType3 != null && scriptType3 !== "module") {
    singleFile = true;
  }
  const result = await createResultPage({
    code: compiledCode,
    config,
    forExport,
    template,
    baseUrl,
    singleFile,
    runTests: runTests2,
    compileInfo
  });
  const styleOnlyUpdate = sourceEditor === "style" && !compileInfo.cssModules;
  const logError = (language, errors = []) => {
    errors.forEach((err) => toolsPane?.console?.error(`[${getLanguageTitle(language)}] ${err}`));
  };
  logError(markupLanguage, markupCompileResult.info?.errors);
  logError(styleLanguage, styleCompileResult.info?.errors);
  logError(scriptLanguage, scriptCompileResult.info?.errors);
  logError(testsLanguage, getCompileResult(testsCompileResult).info?.errors);
  if (singleFile) {
    setCache({
      ...getCache(),
      ...compiledCode,
      result: cleanResultFromDev(result),
      styleOnlyUpdate
    });
    if (broadcastInfo.isBroadcasting) {
      broadcast();
    }
    if (resultPopup && !resultPopup.closed) {
      resultPopup?.postMessage({ result }, location.origin);
    }
  }
  return result;
};
var reloadCompiler = async (config, force = false) => {
  if (!compiler.isFake && !force)
    return;
  compiler = window.compiler = await getCompiler({
    config,
    baseUrl,
    eventsManager
  });
  setCache();
  await getResultPage({});
};
var setLoading = (status) => {
  const loading = getToolspaneLoader();
  if (!loading)
    return;
  if (status === true) {
    loading.style.display = "unset";
  } else {
    loading.style.display = "none";
  }
};
var flushResult = () => {
  const iframe = getResultIFrameElement();
  if (!iframe?.contentWindow)
    return;
  setLoading(true);
  iframe.contentWindow.postMessage({ flush: true }, "*");
  const compiledLanguages = {
    markup: getLanguageCompiler(getConfig().markup.language)?.compiledCodeLanguage || "html",
    style: getLanguageCompiler(getConfig().style.language)?.compiledCodeLanguage || "css",
    script: getLanguageCompiler(getConfig().script.language)?.compiledCodeLanguage || "javascript"
  };
  const loadingComments = {
    html: "<!-- loading -->",
    css: "/* loading */",
    javascript: "// loading",
    wat: ";; loading"
  };
  updateCache("markup", compiledLanguages.markup, loadingComments[compiledLanguages.markup] ?? "");
  updateCache("style", compiledLanguages.style, loadingComments[compiledLanguages.style] ?? "");
  updateCache("script", compiledLanguages.script, loadingComments[compiledLanguages.script] ?? "");
  setCache({
    ...getCache(),
    tests: {
      language: "javascript",
      content: "",
      compiled: ""
    }
  });
  updateCompiledCode();
  toolsPane?.console?.clear(
    /* silent= */
    true
  );
  toolsPane?.tests?.clearTests();
};
var setProjectTitle = (setDefault = false) => {
  const projectTitle = getProjectTitleElement();
  if (!projectTitle)
    return;
  const defaultTitle = defaultConfig.title;
  if (setDefault && projectTitle.textContent?.trim() === "") {
    projectTitle.textContent = defaultTitle;
  }
  const title = projectTitle.textContent || defaultTitle;
  if (title === getConfig().title)
    return;
  setConfig({ ...getConfig(), title });
  if (getConfig().autosave) {
    save(!projectId, false);
  }
  setWindowTitle();
  setSavedStatus();
  dispatchChangeEvent();
};
var setWindowTitle = () => {
  const title = getConfig().title;
  const hostLabel = location.hostname.startsWith("dev.livecodes.io") ? "(dev) " : location.hostname.startsWith("127.0.0.1") || location.hostname.startsWith("localhost") ? "(local) " : "";
  parent.document.title = hostLabel + (title && title !== "Untitled Project" ? title + " - " : "") + "LiveCodes";
};
var setExternalResourcesMark = () => {
  const btn = getExternalResourcesBtn();
  const config = getConfig();
  if (config.scripts.length > 0 || config.stylesheets.length > 0 || config.cssPreset) {
    btn.classList.add("active");
    btn.style.display = "unset";
  } else {
    btn.classList.remove("active");
    if (isEmbed) {
      btn.style.display = "none";
    }
  }
};
var setProjectInfoMark = () => {
  const btn = getProjectInfoBtn();
  const config = getConfig();
  if (typeof config.htmlAttrs === "string" && config.htmlAttrs !== defaultConfig.htmlAttrs && config.htmlAttrs.trim().length > 0 || typeof config.htmlAttrs === "object" && config.htmlAttrs && Object.entries(config.htmlAttrs).length > 0 || config.head !== defaultConfig.head && config.head.trim().length > 0) {
    btn.classList.add("active");
    btn.style.display = "unset";
  } else {
    btn.classList.remove("active");
    if (isEmbed) {
      btn.style.display = "none";
    }
  }
};
var setCustomSettingsMark = () => {
  const btn = getCustomSettingsBtn();
  if (isEmbed) {
    btn.hidden = true;
    return;
  }
  const config = getConfig();
  const customSettings = JSON.stringify(config.customSettings);
  if (!customSettings || customSettings === "{}" || customSettings === '{"imports":{}}') {
    btn.classList.remove("active");
  } else {
    btn.classList.add("active");
  }
};
var run2 = async (editorId, runTests2) => {
  setLoading(true);
  if (editorId !== "style") {
    toolsPane?.console?.clear(
      /* silent= */
      true
    );
  }
  const config = getConfig();
  const shouldRunTests = (runTests2 ?? config.autotest) && Boolean(config.tests?.content?.trim());
  const result = await getResultPage({ sourceEditor: editorId, runTests: shouldRunTests });
  await createIframe(getResultElement(), result);
  updateCompiledCode();
};
var runTests = () => run2(
  /* editorId= */
  void 0,
  /* runTests= */
  true
);
var updateUrl = (url3, push = false) => {
  if (push && !isEmbed) {
    parent.history.pushState(null, "", url3);
  } else {
    parent.history.replaceState(null, "", url3);
  }
};
var format = async (allEditors = true) => {
  if (allEditors) {
    await Promise.all(
      Object.values(editors).map(async (editor) => {
        await editor.format();
        if (getConfig().foldRegions) {
          await editor.foldRegions?.();
        }
      })
    );
  } else {
    const activeEditor = getActiveEditor();
    await activeEditor.format();
    if (getConfig().foldRegions) {
      await activeEditor.foldRegions?.();
    }
    activeEditor.focus();
  }
  updateConfig();
};
var save = async (notify = false, setTitle = true, isAutoSave = false) => {
  if (setTitle) {
    setProjectTitle(true);
  }
  if (editors && getConfig().formatOnsave && !isAutoSave) {
    await format(true);
  }
  const projectConfig = buildConfig(getConfig());
  if (!projectId) {
    projectId = await stores2.projects?.addItem(projectConfig) || "";
  } else {
    await stores2.projects?.updateItem(projectId, projectConfig);
  }
  await setSavedStatus();
  if (notify) {
    notifications.success(
      window.deps.translateString("core.save.success", "Project locally saved to device!")
    );
  }
  await share(false);
};
var share = async (shortUrl = false, contentOnly = true, urlUpdate = true, includeResult = false, permanentUrl = false) => {
  const config = getConfig();
  const content = contentOnly ? {
    ...getContentConfig(config),
    markup: {
      ...config.markup,
      title: void 0,
      hideTitle: void 0
    },
    style: {
      ...config.style,
      title: void 0,
      hideTitle: void 0
    },
    script: {
      ...config.script,
      title: void 0,
      hideTitle: void 0
    },
    tools: {
      ...config.tools,
      enabled: defaultConfig.tools.enabled,
      status: config.tools.status === "none" ? defaultConfig.tools.status : config.tools.status
    }
  } : config;
  const currentUrl = (location.origin + location.pathname).split("/").slice(0, -1).join("/") + "/";
  const appUrl = permanentUrl ? permanentUrlService.getAppUrl() : currentUrl;
  let shareURL = new URL(appUrl);
  if (shortUrl) {
    shareURL.search = "x=id/" + await shareService.shareProject({
      ...content,
      result: includeResult ? getCache().result : void 0
    });
  } else {
    const playgroundUrl = getPlaygroundUrl({ appUrl, config: content });
    shareURL = new URL(playgroundUrl);
  }
  if (urlUpdate) {
    updateUrl(shareURL.href, true);
  }
  const projectTitle = content.title !== defaultConfig.title ? content.title + " - " : "";
  return {
    title: projectTitle + "LiveCodes",
    url: shareURL.href
  };
};
var updateConfig = () => {
  editorIds.forEach((editorId) => {
    setConfig({
      ...getConfig(),
      [editorId]: {
        ...getConfig()[editorId],
        language: getEditorLanguage(editorId),
        content: editors[editorId].getValue()
      }
    });
  });
};
var loadConfig = async (newConfig, url3, flush = true) => {
  changingContent = true;
  const validConfig = upgradeAndValidate(newConfig);
  const content = getContentConfig({
    ...defaultConfig,
    ...validConfig
  });
  const config = {
    ...getConfig(),
    ...validConfig.autotest != null ? { autotest: validConfig.autotest } : {},
    ...validConfig.mode != null ? { mode: validConfig.mode } : {},
    ...validConfig.tools != null ? { tools: validConfig.tools } : {},
    ...content
  };
  setConfig(config);
  await importExternalContent({ config });
  setProjectRecover();
  if (flush) {
    flushResult();
  }
  const projectTitle = getProjectTitleElement();
  projectTitle.textContent = getConfig().title;
  setWindowTitle();
  const currentUrl = (location.origin + location.pathname).split("/").slice(0, -1).join("/") + "/";
  updateUrl(url3 ?? currentUrl, true);
  iframeScrollPosition.x = 0;
  iframeScrollPosition.y = 0;
  await applyConfig(
    config,
    /* reload= */
    true
  );
  changingContent = false;
};
var applyConfig = async (newConfig, reload = false, oldConfig) => {
  const currentConfig = oldConfig || getConfig();
  const combinedConfig = { ...currentConfig, ...newConfig };
  if (reload) {
    await updateEditors(editors, getConfig());
  }
  phpHelper({ editor: editors.script });
  setLoading(true);
  await setActiveEditor(combinedConfig);
  if (!isEmbed) {
    loadSettings(combinedConfig);
  }
  if (newConfig.mode || newConfig.view) {
    window.deps?.showMode?.(combinedConfig.mode, combinedConfig.view);
  }
  if (newConfig.tools) {
    configureToolsPane(newConfig.tools, combinedConfig.mode);
  }
  if (newConfig.zoom) {
    zoom(newConfig.zoom);
  }
  if (newConfig.theme || newConfig.editorTheme || newConfig.themeColor || newConfig.fontSize) {
    setTheme(combinedConfig.theme, combinedConfig.editorTheme);
  }
  if (newConfig.autotest) {
    getWatchTestsButton()?.classList.remove("disabled");
  }
  toolsPane?.console?.clear(
    /* silent= */
    true
  );
  setConfig(combinedConfig);
  if (!isEmbed) {
    setTimeout(() => getActiveEditor().focus());
  }
  setExternalResourcesMark();
  setProjectInfoMark();
  setCustomSettingsMark();
  updateCompiledCode();
  loadModuleTypes(
    editors,
    combinedConfig,
    /* loadAll = */
    true
  );
  compiler.load(getEditorLanguages(), combinedConfig).then(() => {
    if (!combinedConfig.autoupdate) {
      setLoading(false);
      return;
    }
    setTimeout(() => {
      if (toolsPane?.getActiveTool() === "tests" && ["open", "full"].includes(toolsPane?.getStatus())) {
        run2(void 0, true);
      } else {
        run2();
      }
    });
  });
  if (!isEmbed) {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(
        () => {
          formatter.load(getEditorLanguages());
        },
        { timeout: 15e3 }
      );
    } else {
      setTimeout(() => {
        formatter.load(getEditorLanguages());
      }, 1e4);
    }
  }
  if (isEmbed && !combinedConfig.tests?.content?.trim()) {
    toolsPane?.disableTool("tests");
  } else {
    toolsPane?.enableTool("tests");
  }
  if (!reload) {
    await loadDefaults();
    requestAnimationFrame(() => {
      changeThemeColor();
    });
  }
  const editorConfig = {
    ...getEditorConfig(newConfig),
    ...getFormatterConfig(newConfig)
  };
  const hasEditorConfig = Object.keys(editorConfig).some((k) => k in newConfig);
  let shouldReloadEditors = (() => {
    if (newConfig.editor != null && !(newConfig.editor in editors.markup))
      return true;
    if (newConfig.mode != null) {
      if (newConfig.mode !== "result" && editors.markup.isFake)
        return true;
      if (newConfig.mode !== "codeblock" && editors.markup.codejar)
        return true;
    }
    return false;
  })();
  if ("configureTailwindcss" in editors.markup) {
    if (newConfig.processors?.includes("tailwindcss")) {
      editors.markup.configureTailwindcss?.(true);
    }
    if (currentConfig.processors?.includes("tailwindcss") && !newConfig.processors?.includes("tailwindcss")) {
      editors.markup.configureTailwindcss?.(false);
      shouldReloadEditors = true;
    }
  }
  if (shouldReloadEditors) {
    await reloadEditors(combinedConfig);
  } else if (hasEditorConfig) {
    currentEditorConfig = {
      ...getEditorConfig(combinedConfig),
      ...getFormatterConfig(combinedConfig)
    };
    getAllEditors().forEach((editor) => editor.changeSettings(currentEditorConfig));
  }
  parent.dispatchEvent(new Event(customEvents.ready));
};
var setUserConfig = (newConfig, save2 = true) => {
  const userConfig = getUserConfig({
    ...getConfig(),
    ...newConfig == null ? getUserConfig(defaultConfig) : newConfig
  });
  setConfig({
    ...getConfig(),
    ...userConfig
  });
  if (save2) {
    stores2.userConfig?.setValue({
      ...stores2.userConfig.getValue(),
      ...newConfig
    });
  }
};
var loadUserConfig = (updateUI = true) => {
  if (isEmbed)
    return;
  const userConfig = stores2.userConfig?.getValue();
  const currentConfig = getConfig();
  setConfig(
    buildConfig({
      ...currentConfig,
      ...getUserConfig(userConfig || currentConfig)
    })
  );
  if (!updateUI)
    return;
  const newConfig = getConfig();
  loadSettings(newConfig);
  setTheme(newConfig.theme, newConfig.editorTheme);
  showSyncStatus(true);
};
var loadTemplate = async (templateId) => {
  const templateConfig = (await stores2.templates?.getItem(templateId))?.config;
  if (templateConfig) {
    await loadConfig(templateConfig);
  }
};
var dispatchChangeEvent = debounce(async () => {
  let changeEvent;
  if (sdkWatchers.code.hasSubscribers()) {
    if (!cacheIsValid(getCache(), getContentConfig(getConfig()))) {
      await getResultPage({ forExport: true });
    }
    changeEvent = new CustomEvent(customEvents.change, {
      detail: {
        code: getCachedCode(),
        config: getConfig()
      }
    });
  } else {
    changeEvent = new CustomEvent(customEvents.change, { detail: void 0 });
  }
  document.dispatchEvent(changeEvent);
  parent.dispatchEvent(changeEvent);
}, 50);
var setSavedStatus = async () => {
  if (isEmbed)
    return;
  updateConfig();
  const savedConfig = projectId && (await stores2.projects?.getItem(projectId || ""))?.config;
  isSaved = changingContent || !!(savedConfig && JSON.stringify(getContentConfig(savedConfig)) === JSON.stringify(getContentConfig(getConfig())));
  const projectTitle = getProjectTitleElement();
  if (!isSaved) {
    projectTitle.classList.add("unsaved");
    setProjectRecover();
  } else {
    projectTitle.classList.remove("unsaved");
    setProjectRecover(true);
  }
};
var checkSavedStatus = (doNotCloseModal = false) => {
  if (isSaved || isEmbed) {
    return Promise.resolve(true);
  }
  return new Promise((resolve) => {
    const div = document.createElement("div");
    div.innerHTML = savePromptScreen;
    modal.show(div.firstChild, { size: "small" });
    eventsManager.addEventListener(getModalSaveButton(), "click", async () => {
      await save(true);
      if (!doNotCloseModal) {
        modal.close();
      }
      resolve(true);
    });
    eventsManager.addEventListener(getModalDoNotSaveButton(), "click", () => {
      if (!doNotCloseModal) {
        modal.close();
      }
      resolve(true);
    });
    eventsManager.addEventListener(getModalCancelButton(), "click", () => {
      if (!doNotCloseModal) {
        modal.close();
      }
      resolve(false);
    });
    getModalSaveButton().focus();
  });
};
var checkSavedAndExecute = (fn, cancelFn) => () => checkSavedStatus(true).then((confirmed) => {
  if (confirmed) {
    setTimeout(fn);
  } else if (typeof cancelFn === "function") {
    setTimeout(cancelFn);
  } else {
    setTimeout(() => {
      modal.close();
    });
  }
});
var setProjectRecover = (reset2 = false) => {
  if (isEmbed)
    return;
  stores2.recover?.clear();
  if (reset2 || !getConfig().recoverUnsaved)
    return;
  stores2.recover?.setValue({
    config: getContentConfig(getConfig()),
    lastModified: Date.now()
  });
};
var checkRecoverStatus = (isWelcomeScreen = false) => {
  const config = getConfig();
  if (!config.recoverUnsaved || isEmbed || config.mode !== "full" || config.readonly) {
    return Promise.resolve("recover disabled");
  }
  const unsavedItem = stores2.recover?.getValue();
  const unsavedProject = unsavedItem?.config;
  if (!unsavedItem || !unsavedProject) {
    return Promise.resolve("no unsaved project");
  }
  const projectName = unsavedProject.title;
  return new Promise((resolve) => {
    const welcomeRecover = getModalWelcomeRecover();
    if (isWelcomeScreen) {
      welcomeRecover.style.display = "block";
    } else {
      const div = document.createElement("div");
      div.innerHTML = recoverPromptScreen;
      modal.show(div.firstChild, { size: "small", isAsync: true });
    }
    getModalUnsavedName().textContent = projectName;
    getModalUnsavedName().title = projectName;
    getModalUnsavedLastModified().textContent = new Date(
      unsavedItem.lastModified
    ).toLocaleString();
    const disableRecoverCheckbox = getModalDisableRecoverCheckbox();
    eventsManager.addEventListener(getModalRecoverButton(), "click", async () => {
      modal.show(loadingMessage(), { size: "small" });
      await loadConfig(unsavedProject);
      await setSavedStatus();
      modal.close();
      resolve("recover");
    });
    eventsManager.addEventListener(getModalSavePreviousButton(), "click", async () => {
      if (stores2.projects) {
        await stores2.projects.addItem(unsavedProject);
        notifications.success(
          window.deps.translateString(
            "core.save.successWithName",
            'Project "{{name}}" saved to device.',
            {
              name: projectName
            }
          )
        );
      }
      if (isWelcomeScreen) {
        welcomeRecover.classList.add("cancelled");
      } else {
        modal.close();
      }
      setProjectRecover(true);
      resolve("save and continue");
    });
    eventsManager.addEventListener(getModalCancelRecoverButton(), "click", () => {
      if (isWelcomeScreen) {
        welcomeRecover.classList.add("cancelled");
      } else {
        modal.close();
      }
      setProjectRecover(true);
      resolve("cancel recover");
    });
    eventsManager.addEventListener(disableRecoverCheckbox, "change", () => {
      setUserConfig({ recoverUnsaved: !disableRecoverCheckbox.checked });
      loadSettings(getConfig());
    });
  });
};
var configureEmmet = async (config) => {
  if (isLite)
    return;
  [editors.markup, editors.style].forEach((editor, editorIndex) => {
    if (editor.monaco && editorIndex > 0)
      return;
    editor.changeSettings(getEditorConfig(config));
  });
};
var getTemplates = async () => {
  if (starterTemplates) {
    return starterTemplates;
  }
  starterTemplates = await getStarterTemplates(getConfig(), baseUrl);
  return starterTemplates;
};
var initializeAuth = async () => {
  if (authService)
    return;
  authService = createAuthService(isEmbed);
  const user = await authService.getUser();
  if (user) {
    displayLoggedIn(user);
  }
};
var getUserData = async () => {
  const user = await authService?.getUser();
  if (!user || !stores2.userData)
    return null;
  const id2 = user.username || user.uid;
  return (await stores2.userData.getItem(id2))?.data || null;
};
var getAppData = () => stores2.appData?.getValue() || null;
var setAppData = (data) => {
  stores2.appData?.setValue({
    ...stores2.appData.getValue(),
    ...data
  });
};
var showSyncStatus = async (force = false) => {
  if (isEmbed)
    return;
  const lastSync = (await getUserData())?.sync?.lastSync;
  if (lastSync || force) {
    const syncUIModule = await import(baseUrl + "sync-ui.js");
    syncUIModule.updateSyncStatus({ lastSync });
  }
};
var showScreen = async (screen, options) => {
  const foundScreen = screens.find((s) => s.screen.toLowerCase() === screen.toLowerCase());
  if (!foundScreen)
    return;
  await foundScreen.show(options);
  const modalElement = document.querySelector("#modal");
  modalElement.firstElementChild?.click();
};
var loadSelectedScreen = () => {
  const params2 = Object.fromEntries(
    new URLSearchParams(parent.location.search)
  );
  const screen = params2.new === "" ? "new" : params2.screen;
  if (screen) {
    showScreen(screen);
    return true;
  }
  return false;
};
var getAllEditors = () => [
  ...Object.values(editors),
  toolsPane?.console?.getEditor?.(),
  toolsPane?.compiled?.getEditor?.()
].filter((x) => x != null);
var setTheme = (theme5, editorTheme) => {
  const themes2 = ["light", "dark"];
  const root5 = document.documentElement;
  root5?.classList.remove(...themes2);
  root5?.classList.add(theme5);
  changeThemeColor();
  setFontSize();
  const themeToggle = getThemeToggle();
  if (themeToggle) {
    themeToggle.checked = theme5 === "dark";
  }
  const darkThemeButton = getDarkThemeButton();
  if (darkThemeButton && !isEmbed) {
    if (theme5 === "dark") {
      darkThemeButton.style.display = "inherit";
    } else {
      darkThemeButton.style.display = "none";
    }
  }
  const lightThemeButton = getLightThemeButton();
  if (lightThemeButton && !isEmbed) {
    if (theme5 === "light") {
      lightThemeButton.style.display = "inherit";
    } else {
      lightThemeButton.style.display = "none";
    }
  }
  getAllEditors().forEach((editor) => {
    editor?.setTheme(theme5, editorTheme);
    customEditors[editor?.getLanguage()]?.setTheme(theme5);
  });
  toolsPane?.console?.setTheme?.(theme5);
  getNinjaKeys()?.classList.toggle("dark", theme5 === "dark");
};
var changeThemeColor = () => {
  const { themeColor, theme: theme5 } = getConfig();
  const color = themeColor || getDefaultColor();
  const { h: h4, s, l } = colorToHsla(color);
  const root5 = document.documentElement;
  root5.style.setProperty("--hue", `${h4}`);
  root5.style.setProperty("--st", `${s}%`);
  root5.style.setProperty("--lt", `${theme5 === "light" ? 100 : l}%`);
  const customColorInput = getThemeColorSelector()?.querySelector(
    'input[type="color"]'
  );
  if (customColorInput) {
    customColorInput.value = colorToHex(color);
  }
};
var getDefaultColor = () => `hsl(214, 40%, 50%)`;
var setFontSize = () => {
  const fontSize = getConfig().fontSize || (isEmbed ? 12 : 14);
  const root5 = document.documentElement;
  root5.style.setProperty("--font-size", `${fontSize + 2}px`);
};
var loadSettings = (config) => {
  const processorToggles = getProcessorToggles();
  processorToggles.forEach((toggle) => {
    const processor = toggle.dataset.processor;
    if (!processor)
      return;
    toggle.checked = config.processors.includes(processor);
  });
  if (isEmbed)
    return;
  const autoupdateToggle = getAutoupdateToggle();
  autoupdateToggle.checked = config.autoupdate;
  const delayValue = getDelayValue();
  const delayRange = getDelayRange();
  delayRange.value = String(config.delay);
  delayValue.textContent = String(config.delay / 1e3);
  const autosaveToggle = getAutosaveToggle();
  autosaveToggle.checked = config.autosave;
  const autosyncToggle = getAutosyncToggle();
  getUserData().then((userData) => {
    autosyncToggle.checked = userData?.sync?.autosync || false;
  });
  const formatOnsaveToggle = getFormatOnsaveToggle();
  formatOnsaveToggle.checked = config.formatOnsave;
  const themeToggle = getThemeToggle();
  themeToggle.checked = config.theme === "dark";
  const layoutToggle = getLayoutToggle();
  layoutToggle.checked = config.layout === "vertical";
  const recoverToggle = getRecoverToggle();
  recoverToggle.checked = config.recoverUnsaved;
  const showWelcomeToggle = getShowWelcomeToggle();
  showWelcomeToggle.checked = config.welcome;
  const spacingToggle = getSpacingToggle();
  spacingToggle.checked = config.showSpacing;
  getCSSPresetLinks().forEach((link) => {
    link.classList.remove("active");
    if (config.cssPreset === link.dataset.preset) {
      link.classList.add("active");
    }
    if (!config.cssPreset && link.dataset.preset === "none") {
      link.classList.add("active");
    }
  });
};
var showLanguageInfo = async (languageInfo) => {
  const showModal = () => modal.show(languageInfo, { size: "small" });
  if (i18n) {
    i18n.loadNamespaces(["language-info"], showModal);
  } else {
    showModal();
  }
};
var loadStarterTemplate = async (templateName, checkSaved = true) => {
  const templates = await getTemplates();
  const { title, thumbnail, ...templateConfig } = templates.filter((template) => template.name === templateName)?.[0] || {};
  if (templateConfig) {
    setAppData({
      recentTemplates: [
        { name: templateName, title },
        ...getAppData()?.recentTemplates?.filter((t) => t.name !== templateName) || []
      ].slice(0, 5)
    });
    const doNotCheckAndExecute = (fn) => async () => fn();
    (checkSaved ? checkSavedAndExecute : doNotCheckAndExecute)(async () => {
      projectId = "";
      const newConfig = { ...defaultConfig, ...templateConfig };
      return await importExternalContent({ config: newConfig }) || loadConfig(newConfig, "?template=" + templateName);
    })().finally(() => {
      modal.close();
    });
  } else {
    notifications.error(
      window.deps.translateString("core.error.failedToLoadTemplate", "Failed loading template")
    );
  }
};
var getPlaygroundState = () => {
  const config = getConfig();
  const cachedCode = getCachedCode();
  return {
    ...config,
    ...cachedCode,
    markup: {
      ...config.markup,
      ...cachedCode.markup,
      position: editors.markup.getPosition()
    },
    style: {
      ...config.style,
      ...cachedCode.style,
      position: editors.style.getPosition()
    },
    script: {
      ...config.script,
      ...cachedCode.script,
      position: editors.script.getPosition()
    },
    tools: {
      enabled: config.tools.enabled,
      active: toolsPane?.getActiveTool() ?? "",
      status: toolsPane?.getStatus() ?? ""
    }
  };
};
var zoom = (level = 1) => {
  const iframe = getResultIFrameElement();
  const zoomBtnValue = getZoomButtonValue();
  if (!iframe || !zoomBtnValue)
    return;
  iframe.classList.remove("zoom25");
  iframe.classList.remove("zoom50");
  if (level === 0.5) {
    iframe.classList.add("zoom50");
  }
  if (level === 0.25) {
    iframe.classList.add("zoom25");
  }
  zoomBtnValue.textContent = String(level);
};
var broadcast = async ({
  serverUrl,
  channel,
  channelToken,
  broadcastSource
} = {}) => {
  if (isEmbed)
    return;
  const broadcastData = getAppData()?.broadcast;
  if (!serverUrl) {
    serverUrl = broadcastData?.serverUrl;
  }
  if (!serverUrl)
    return;
  if (broadcastSource == null) {
    broadcastSource = broadcastInfo.broadcastSource;
  }
  if (channel == null) {
    channel = broadcastInfo.channel;
  }
  if (channelToken == null) {
    channelToken = broadcastInfo.channelToken;
  }
  const userToken = broadcastData?.userToken;
  const { result, ...data } = getPlaygroundState();
  try {
    const res = await fetch(serverUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        result,
        ...broadcastSource ? { data } : {},
        ...channel ? { channel } : {},
        ...channelToken ? { channelToken } : {},
        ...userToken ? { userToken } : {}
      })
    });
    if (!res.ok)
      return;
    return res.json();
  } catch {
    return;
  }
};
var getVersion = (log = true) => {
  const appVersion = "47";
  const sdkVersion = "0.12.0";
  const commitSHA = "7b4906d";
  const repoUrl = "https://github.com/live-codes/livecodes";
  const appUrl = permanentUrlService.getAppUrl();
  const sdkUrl = permanentUrlService.getSDKUrl();
  if (log) {
    console.log(`App Version: ${appVersion} (${repoUrl}/releases/tag/v${appVersion})`);
    console.log(
      `SDK Version: ${sdkVersion} (https://www.npmjs.com/package/livecodes/v/${sdkVersion})`
    );
    console.log(`Git commit: ${commitSHA} (${repoUrl}/commit/${commitSHA})`);
    console.log(`App Permanent URL: ${appUrl}`);
    console.log(`SDK Permanent URL: ${sdkUrl}`);
  }
  return {
    appVersion,
    sdkVersion,
    commitSHA,
    appUrl,
    sdkUrl
  };
};
var handleChangeContent = () => {
  const contentChanged = async (editorId, loading) => {
    updateConfig();
    const config = getConfig();
    addConsoleInputCodeCompletion();
    if (config.autoupdate && !loading) {
      await run2(editorId);
    }
    if (config.markup.content !== getCache().markup.content) {
      await getResultPage({ sourceEditor: editorId });
    }
    for (const key of Object.keys(customEditors)) {
      if (config[editorId].language === key) {
        await customEditors[key]?.show(true, {
          baseUrl,
          editors,
          config,
          html: getCache().markup.compiled || config.markup.content || "",
          eventsManager
        });
      }
    }
    if (config.autosave) {
      await save(
        /* notify = */
        false,
        /* setTitle = */
        true,
        /* isAutoSave = */
        true
      );
    }
    dispatchChangeEvent();
    loadModuleTypes(editors, config);
  };
  const debouncecontentChanged = (editorId) => debounce(
    async () => {
      await contentChanged(editorId, changingContent);
    },
    () => getConfig().delay ?? defaultConfig.delay
  );
  Object.keys(editors).forEach((editorId) => {
    editors[editorId].onContentChanged(debouncecontentChanged(editorId));
    editors[editorId].onContentChanged(setSavedStatus);
  });
};
var registerMenuButton = (menu, button) => {
  menu.classList.add("hidden");
  const onClickOutside = (event) => {
    if (!button.contains(event.target) && !menu.firstElementChild?.contains(event.target)) {
      menu.classList.add("hidden");
    }
  };
  const onIframeClicked = (event) => {
    if (event.data.type !== "clicked")
      return;
    menu.classList.add("hidden");
  };
  eventsManager.addEventListener(window, "click", onClickOutside);
  eventsManager.addEventListener(window, "message", onIframeClicked);
  eventsManager.addEventListener(button, "click", () => {
    document.querySelectorAll(".menu-scroller").forEach((el) => {
      if (el === menu) {
        menu.classList.toggle("hidden");
      } else {
        el.classList.add("hidden");
      }
    });
  });
};
var handleConsole = () => {
  eventsManager.addEventListener(window, "message", (event) => {
    if (event.origin !== sandboxService.getOrigin() || event.data.type !== "console") {
      return;
    }
    let consoleEvent;
    if (sdkWatchers.console.hasSubscribers()) {
      const message = event.data;
      const args = message.method === "clear" ? [] : message.args?.map?.((arg) => arg.content ?? "") ?? [];
      consoleEvent = new CustomEvent(customEvents.console, {
        detail: { method: message.method, args }
      });
    } else {
      consoleEvent = new CustomEvent(customEvents.console);
    }
    document.dispatchEvent(consoleEvent);
    parent.dispatchEvent(consoleEvent);
  });
};
var handleTestResults = () => {
  eventsManager.addEventListener(window, "message", (ev) => {
    if (ev.origin !== sandboxService.getOrigin())
      return;
    if (ev.data.type !== "testResults")
      return;
    let results = ev.data.payload?.results;
    const error = ev.data.payload?.error;
    if (Array.isArray(results)) {
      results = results.map((result) => {
        if (result.status === "done") {
          result.status = result.errors?.length === 0 ? "pass" : "fail";
        }
        return result;
      });
    }
    toolsPane?.tests?.showResults({ results, error });
    sdkWatchers.tests.notify({ results, error });
    let testResultsEvent;
    if (sdkWatchers.tests.hasSubscribers()) {
      testResultsEvent = new CustomEvent(customEvents.testResults, {
        detail: JSON.parse(JSON.stringify({ results, error }))
      });
    } else {
      testResultsEvent = new CustomEvent(customEvents.testResults);
    }
    document.dispatchEvent(testResultsEvent);
    parent.dispatchEvent(testResultsEvent);
    setLoading(false);
  });
};
var handleResultModeDrawer = () => {
  const drawer = getResultModeDrawer();
  const drawerLink = drawer.querySelector("a");
  const closeBtn = drawer.querySelector("#drawer-close");
  eventsManager.addEventListener(drawerLink, "click", async (event) => {
    event.preventDefault();
    window.open(
      (await share(
        /* shortUrl= */
        false,
        /* contentOnly= */
        true,
        /* urlUpdate= */
        false
      )).url,
      "_blank"
    );
  });
  eventsManager.addEventListener(closeBtn, "click", async () => {
    drawer.classList.add("hidden");
  });
};
var configureToolsPane = (tools, mode) => {
  if (!toolsPane)
    return;
  if (mode === "result" && (!tools || tools.status === "" || tools.status === "none")) {
    toolsPane.hide();
    return;
  }
  if (tools?.active) {
    toolsPane.setActiveTool(tools.active);
  }
  if (!tools) {
    toolsPane.close();
    return;
  }
  if (tools.status === "none") {
    toolsPane.hide();
    return;
  }
  if (tools.status === "full") {
    toolsPane.maximize();
  }
  if (tools.status === "open") {
    toolsPane.open();
  }
  if (tools.status === "closed" || tools.status === "") {
    toolsPane.close();
  }
};
var loadI18n = async (appLanguage) => {
  const userLang = appLanguage && appLanguage !== "auto" ? appLanguage : navigator.language;
  if (isHeadless || isEmbed && !appLanguage || !userLang || userLang.startsWith("en") || !Object.keys(appLanguages).find((lang) => lang.startsWith(userLang))) {
    return;
  }
  setConfig({ ...getConfig(), appLanguage: userLang });
  const i18nModule = await import(baseUrl + "i18n.js");
  i18n = await i18nModule.init(userLang, baseUrl);
  window.deps.translateString = i18n.translateString;
};
var translateStringMock = (_key, value, ...args) => {
  const rawInterpolation = args[0];
  const { isHTML, ...interpolation } = rawInterpolation ?? {};
  if (!interpolation)
    return value;
  let result = value;
  for (const [k, v] of Object.entries({ ...interpolation, ...predefinedValues })) {
    result = result.replaceAll(`{{${k}}}`, v);
  }
  return result;
};
var setAppLanguage = ({
  appLanguage,
  reload = false,
  url: url3
} = {}) => {
  const lang = appLanguage ?? i18n?.getLanguage() ?? "en";
  document.documentElement.lang = lang;
  document.documentElement.dir = i18n?.getLanguageDirection() ?? "ltr";
  if (!reload && (isEmbed || params.appLanguage))
    return;
  const flatten = (obj, prefix = "") => Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    if (typeof value === "object") {
      return { ...acc, ...flatten(value, `${prefix}${key}.`) };
    }
    return { ...acc, [`${prefix}${key}`]: value };
  }, {});
  const i18nSplashData = !isEmbed && i18n ? flatten(i18n.translateKey("splash", { returnObjects: true })) : {};
  parent.postMessage(
    {
      args: "i18n",
      payload: {
        data: i18nSplashData,
        reload,
        lang,
        url: url3
      }
    },
    location.origin
  );
};
var changeAppLanguage = async (appLanguage) => {
  if (!i18n && appLanguage !== "en") {
    modal.show(loadingMessage(), { size: "small" });
    await loadI18n(appLanguage);
  }
  await i18n?.changeLanguage(appLanguage);
  const url3 = (await share(
    /* shortUrl = */
    false,
    /* contentOnly = */
    false
  )).url;
  isSaved = true;
  setAppLanguage({ appLanguage, reload: true, url: url3 });
};
var configureEmbed = (eventsManager2) => {
  document.body.classList.add("embed");
  handleResultModeDrawer();
  const logoLink = getLogoLink();
  logoLink.title = window.deps.translateString("generic.embed.logoHint", "Edit on LiveCodes \u{1F855}");
  eventsManager2.addEventListener(logoLink, "click", async (event) => {
    event.preventDefault();
    window.open(
      (await share(
        /* shortUrl= */
        false,
        /* contentOnly= */
        true,
        /* urlUpdate= */
        false
      )).url,
      "_blank"
    );
  });
};
var configureLite = () => {
  setConfig({
    ...getConfig(),
    emmet: false,
    tools: {
      enabled: [],
      active: "",
      status: "none"
    }
  });
  getFormatButton().style.display = "none";
};
var configureSimpleMode = (config) => {
  setConfig({
    ...config,
    tools: {
      enabled: ["console"],
      active: "console",
      status: config.tools?.status || "closed"
    }
  });
};
var configureModes = ({
  config,
  isEmbed: isEmbed2,
  isLite: isLite2
}) => {
  if (config.mode === "codeblock") {
    setConfig({ ...config, readonly: true });
  }
  if (isLite2) {
    configureLite();
  }
  if (isEmbed2 || config.mode === "result") {
    configureEmbed(eventsManager);
  }
  if (config.mode === "simple") {
    configureSimpleMode(config);
  }
};
var importExternalContent = async (options) => {
  const { config = defaultConfig, sdkConfig, configUrl, template } = options;
  let importUrl = options.importUrl;
  const hasContentUrls = (conf) => editorIds.filter(
    (editorId) => conf[editorId]?.contentUrl && !conf[editorId]?.content || conf[editorId]?.hiddenContentUrl && !conf[editorId]?.hiddenContent
  ).length > 0;
  const validConfigUrl = getValidUrl(configUrl);
  if (importUrl?.startsWith("config") || importUrl?.startsWith("params")) {
    importUrl = "";
  }
  if (!validConfigUrl && !template && !importUrl && !hasContentUrls(config))
    return false;
  const loadingMessage2 = window.deps.translateString("core.import.loading", "Loading Project...");
  notifications.info(loadingMessage2);
  let templateConfig = {};
  let importUrlConfig = {};
  let contentUrlConfig = {};
  let configUrlConfig = {};
  if (template) {
    const templateObj = await getTemplate(template, config, baseUrl);
    if (templateObj) {
      templateConfig = upgradeAndValidate(templateObj);
    } else {
      notifications.error(
        window.deps.translateString(
          "core.error.couldNotLoadTemplate",
          "Could not load template: {{template}}",
          {
            template
          }
        )
      );
    }
  }
  if (importUrl) {
    let validImportUrl = importUrl;
    if (importUrl.startsWith("http") || importUrl.startsWith("data")) {
      try {
        validImportUrl = new URL(importUrl).href;
      } catch {
        validImportUrl = decodeURIComponent(importUrl);
      }
    }
    let user;
    if (isGithub(validImportUrl) && !isEmbed) {
      await initializeAuth();
      user = await authService?.getUser();
    }
    const importModule = await import(baseUrl + "import.js");
    importUrlConfig = await importModule.importCode(validImportUrl, params, config, user, baseUrl);
    if (Object.keys(importUrlConfig).length === 0) {
      notifications.error(
        window.deps.translateString("core.error.invalidImport", "Invalid import URL")
      );
    }
  }
  if (hasContentUrls(config)) {
    const editorsContent = await Promise.all(
      editorIds.map(async (editorId) => {
        const contentUrl = config[editorId].contentUrl;
        const hiddenContentUrl = config[editorId].hiddenContentUrl;
        const [content, hiddenContent] = await Promise.all([
          contentUrl && getValidUrl(contentUrl) && !config[editorId].content ? fetch(contentUrl).then((res) => res.text()) : Promise.resolve(""),
          hiddenContentUrl && getValidUrl(hiddenContentUrl) && !config[editorId].hiddenContent ? fetch(hiddenContentUrl).then((res) => res.text()) : Promise.resolve("")
        ]);
        return {
          ...config[editorId],
          ...content ? { content } : {},
          ...hiddenContent ? { hiddenContent } : {}
        };
      })
    );
    contentUrlConfig = {
      markup: editorsContent[0],
      style: editorsContent[1],
      script: editorsContent[2]
    };
  }
  if (validConfigUrl) {
    configUrlConfig = upgradeAndValidate(
      await fetch(validConfigUrl).then((res) => res.json()).catch(() => ({}))
    );
    if (hasContentUrls(configUrlConfig)) {
      return importExternalContent({ ...options, config: { ...config, ...configUrlConfig } });
    }
  }
  await loadConfig(
    buildConfig({
      ...config,
      ...templateConfig,
      ...importUrlConfig,
      ...configUrlConfig,
      ...sdkConfig,
      ...contentUrlConfig
    }),
    parent.location.href,
    false
  );
  loadSelectedScreen();
  return true;
};
var loadDefaults = async () => {
  if (isEmbed || params["no-defaults"] || params.languages || params.template || params.config || params.active || params.activeEditor || getLanguageByAlias(params.lang) || getLanguageByAlias(params.language)) {
    return;
  }
  for (const param of Object.keys(params)) {
    if (getLanguageByAlias(param))
      return;
  }
  if (getConfig().welcome && !params.screen && getConfig().mode === "full" || params.screen === "welcome") {
    showScreen("welcome");
    return;
  }
  const defaultTemplateId = getAppData()?.defaultTemplate;
  if (defaultTemplateId) {
    notifications.info(
      window.deps.translateString("core.loadDefaults.template", "Loading default template")
    );
    await loadTemplate(defaultTemplateId);
    return;
  }
  const lastUsedLanguage = getAppData()?.language;
  if (lastUsedLanguage) {
    changingContent = true;
    await changeLanguage(lastUsedLanguage);
    changingContent = false;
  }
  setProjectRecover(
    /* reset = */
    true
  );
};
var initializePlayground = async (options, initializeFn) => {
  const importUrl = params.x || parent.location.hash.substring(1);
  const appConfig2 = options?.config ?? {};
  const codeImportConfig = importCompressedCode(importUrl);
  const sdkConfig = importCompressedCode(params.config ?? "");
  const initialConfig = { ...codeImportConfig, ...appConfig2, ...sdkConfig };
  baseUrl = options?.baseUrl ?? "/livecodes/";
  isHeadless = options?.isHeadless ?? false;
  isLite = params.mode === "lite" || params.lite != null && params.lite !== false || // for backward compatibility
  initialConfig.mode === "lite" || false;
  isEmbed = isHeadless || isLite || (options?.isEmbed ?? false) || initialConfig.mode === "simple" || params.mode === "simple";
  window.history.replaceState(null, "", "./");
  await initializeStores(stores2, isEmbed);
  const userConfig = stores2.userConfig?.getValue() ?? {};
  setConfig(buildConfig({ ...getConfig(), ...userConfig, ...initialConfig }));
  configureModes({ config: getConfig(), isEmbed, isLite });
  compiler = window.compiler = await getCompiler({
    config: getConfig(),
    baseUrl,
    eventsManager
  });
  formatter = getFormatter(getConfig(), baseUrl, isEmbed);
  customEditors = createCustomEditors({ baseUrl, eventsManager });
  await loadI18n(getConfig().appLanguage);
  createLanguageMenus(
    getConfig(),
    baseUrl,
    eventsManager,
    showLanguageInfo,
    loadStarterTemplate,
    importExternalContent,
    registerMenuButton
  );
  await createEditors(getConfig());
  await initializeFn?.();
  loadUserConfig(
    /* updateUI = */
    true
  );
  loadStyles();
  await createIframe(getResultElement());
  setTheme(getConfig().theme, getConfig().editorTheme);
  if (!isEmbed) {
    initializeAuth().then(() => showSyncStatus());
    checkRecoverStatus();
  }
  importExternalContent({
    config: getConfig(),
    sdkConfig,
    configUrl: params.config,
    template: params.template,
    importUrl: Object.keys(codeImportConfig).length > 0 ? "" : importUrl
    // do not re-import compressed code
  }).then(async (contentImported) => {
    if (!contentImported) {
      loadSelectedScreen();
      await applyConfig(
        getConfig(),
        /* reload = */
        false
      );
    }
    initialized = true;
  });
  configureEmmet(getConfig());
  setAppLanguage();
};
var createApi = () => {
  const apiGetShareUrl = async (shortUrl = false) => (await share(shortUrl, true, false)).url;
  const apiGetConfig = async (contentOnly = false) => {
    updateConfig();
    const config = contentOnly ? getContentConfig(getConfig()) : getConfig();
    return JSON.parse(JSON.stringify(config));
  };
  const apiSetConfig = async (newConfig) => {
    const currentConfig = getConfig();
    const newAppConfig = buildConfig({ ...currentConfig, ...newConfig });
    const hasNewAppLanguage = newConfig.appLanguage && newConfig.appLanguage !== i18n?.getLanguage();
    const shouldRun = newConfig.mode != null && newConfig.mode !== "editor" && newConfig.mode !== "codeblock";
    const shouldReloadCompiler = shouldRun && compiler.isFake;
    const isContentOnlyChange = compareObjects(
      newConfig,
      currentConfig
    ).every((k) => ["markup.content", "style.content", "script.content"].includes(k));
    setConfig(newAppConfig);
    if (isContentOnlyChange) {
      for (const key of ["markup", "style", "script"]) {
        const content = newConfig[key]?.content;
        if (content != null) {
          editors[key].setValue(content);
        }
      }
      return newAppConfig;
    }
    if (hasNewAppLanguage) {
      changeAppLanguage(newConfig.appLanguage);
      return newAppConfig;
    }
    if (shouldReloadCompiler) {
      await reloadCompiler(newAppConfig);
    }
    await applyConfig(
      newConfig,
      /* reload = */
      true,
      currentConfig
    );
    return newAppConfig;
  };
  const apiGetCode = async () => {
    updateConfig();
    if (!cacheIsValid(getCache(), getContentConfig(getConfig()))) {
      await getResultPage({ forExport: true });
    }
    return JSON.parse(JSON.stringify(getCachedCode()));
  };
  const apiShow = async (panel, { full = false, line, column, zoom: zoomLevel } = {}) => {
    if (panel === "toggle-result") {
      getResultButton()?.click();
      if (zoomLevel) {
        zoom(zoomLevel);
      }
    } else if (panel === "result") {
      split?.show("output", full);
      if (getConfig().tools.status !== "none") {
        setTimeout(() => toolsPane?.close(), 350);
      }
      if (zoomLevel) {
        zoom(zoomLevel);
      }
    } else if (panel === "editor") {
      split?.show("code", full);
    } else if (panel === "console" || panel === "compiled" || panel === "tests") {
      split?.show("output");
      toolsPane?.setActiveTool(panel);
      if (full) {
        toolsPane?.maximize();
      } else {
        toolsPane?.open();
      }
    } else if (Object.keys(editors).includes(panel)) {
      showEditor(panel);
      split?.show("code", full);
      if (typeof line === "number" && line > 0) {
        const col = typeof column === "number" && column > -1 ? column : 0;
        getActiveEditor().setPosition({ lineNumber: line, column: col });
        getActiveEditor().focus();
      }
    } else {
      throw new Error(window.deps.translateString("core.error.invalidPanelId", "Invalid panel id"));
    }
  };
  const apiRunTests = () => new Promise((resolve) => {
    const watcher = sdkWatchers.tests.subscribe((testResults) => {
      resolve(testResults);
      watcher.unsubscribe();
    });
    runTests();
  });
  const apiWatch = (sdkEvent, fn) => {
    if (!(sdkEvent in sdkWatchers))
      return { remove: () => void 0 };
    if (fn === "unsubscribe") {
      sdkWatchers[sdkEvent].unsubscribeAll();
      return { remove: () => void 0 };
    }
    const callback = typeof fn === "function" ? fn : () => void 0;
    const sub = sdkWatchers[sdkEvent].subscribe(callback);
    return { remove: sub.unsubscribe };
  };
  const apiExec = async (command, ...args) => {
    if (command === "setBroadcastToken") {
      if (isEmbed) {
        return {
          error: window.deps.translateString(
            "core.error.unavailableForEmbeds",
            "Command unavailable for embeds"
          )
        };
      }
      const broadcastData = getAppData()?.broadcast;
      if (!broadcastData) {
        return {
          error: window.deps.translateString("core.error.unavailable", "Command unavailable")
        };
      }
      const token = args[0];
      if (typeof token !== "string") {
        return { error: window.deps.translateString("core.error.invalidToken", "Invalid token!") };
      }
      setAppData({
        broadcast: {
          ...broadcastData,
          userToken: token
        }
      });
      return {
        output: window.deps.translateString(
          "core.broadcast.successSetToken",
          "Broadcast user token set successfully"
        )
      };
    }
    if (command === "showVersion") {
      const output = getVersion();
      return { output };
    }
    return { error: window.deps.translateString("core.error.invalidCommand", "Invalid command!") };
  };
  const apiDestroy = async () => {
    getAllEditors().forEach((editor) => editor?.destroy());
    eventsManager.removeEventListeners();
    Object.values(stores2).forEach((store) => store?.unsubscribeAll?.());
    Object.values(sdkWatchers).forEach((watcher) => watcher?.unsubscribeAll?.());
    parent.dispatchEvent(new Event(customEvents.destroy));
    formatter?.destroy();
    document.body.innerHTML = "";
    document.head.innerHTML = "";
    isDestroyed = true;
  };
  const alreadyDestroyedMessage = "Cannot call API methods after calling `destroy()`.";
  const reject = () => Promise.reject(alreadyDestroyedMessage);
  const throwError = () => {
    throw new Error(alreadyDestroyedMessage);
  };
  const call = (fn) => !isDestroyed ? fn() : reject();
  const callSync = (fn) => !isDestroyed ? fn() : throwError();
  return {
    run: () => call(() => run2()),
    format: (allEditors) => call(() => format(allEditors)),
    getShareUrl: (shortUrl) => call(() => apiGetShareUrl(shortUrl)),
    getConfig: (contentOnly) => call(() => apiGetConfig(contentOnly)),
    setConfig: (config) => call(() => apiSetConfig(config)),
    getCode: () => call(() => apiGetCode()),
    show: (pane, options) => call(() => apiShow(pane, options)),
    runTests: () => call(() => apiRunTests()),
    onChange: (fn) => callSync(() => apiWatch("code", fn)),
    watch: (sdkEvent, fn) => callSync(() => apiWatch(sdkEvent, fn)),
    exec: (command, ...args) => call(() => apiExec(command, ...args)),
    destroy: () => call(() => apiDestroy())
  };
};
var initHeadless = async (config, baseUrl2) => {
  window.deps = {
    showMode: () => void 0,
    translateString: translateStringMock,
    languages,
    processors
  };
  await initializePlayground({ config, baseUrl: baseUrl2, isEmbed: true, isHeadless: true }, () => {
    notifications = {
      info: () => void 0,
      success: () => void 0,
      warning: () => void 0,
      error: () => void 0,
      confirm: () => void 0
    };
    modal = { show: () => void 0, close: () => void 0 };
    typeLoader = { load: async () => [] };
    handleConsole();
    handleTestResults();
  });
  return createApi();
};

// src/livecodes/headless.ts
var app = initHeadless;
export {
  app
};
