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

// src/sdk/react.tsx
import { useEffect, useRef, useState } from "react";

// src/sdk/index.ts
var import_lz_string = __toESM(require_lz_string());
async function createPlayground(container, options = {}) {
  if (typeof container === "object" && !(container instanceof HTMLElement) && (container.headless || container.view === "headless")) {
    options = container;
    container = null;
  }
  const { config = {}, headless, loading = "lazy", view } = options;
  const isHeadless = headless || view === "headless";
  let containerElement = null;
  let appVersion = null;
  if (typeof container === "string") {
    containerElement = document.querySelector(container);
  } else if (container instanceof HTMLElement) {
    containerElement = container;
  } else if (!(isHeadless && typeof container === "object")) {
    throw new Error("A valid container element is required.");
  }
  if (!containerElement) {
    if (isHeadless) {
      containerElement = document.createElement("div");
      hideElement(containerElement);
      document.body.appendChild(containerElement);
    } else {
      throw new Error(`Cannot find element: "${container}"`);
    }
  }
  const playgroundUrl = new URL(getPlaygroundUrl(options));
  const origin = playgroundUrl.origin;
  playgroundUrl.searchParams.set("embed", "true");
  playgroundUrl.searchParams.set("loading", isHeadless ? "eager" : loading);
  playgroundUrl.searchParams.set("sdkVersion", "0.12.0");
  if (typeof config === "object" && Object.keys(config).length > 0) {
    playgroundUrl.searchParams.set("config", "sdk");
  }
  const params = options.params;
  if (typeof params === "object" && Object.keys(params).length > 0 && JSON.stringify(params).length < 1800) {
    Object.keys(params).forEach((param) => {
      playgroundUrl.searchParams.set(param, encodeURIComponent(String(params[param])));
    });
  }
  let destroyed = false;
  const alreadyDestroyedMessage = "Cannot call API methods after calling `destroy()`.";
  const eventHandlers = [];
  const registerEventHandler = (handler, eventType = "message") => {
    addEventListener(eventType, handler);
    eventHandlers.push(handler);
  };
  const createIframe = () => new Promise((resolve) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    if (!containerElement)
      return;
    const height = containerElement.dataset.height || containerElement.style.height;
    if (height && !isHeadless) {
      const cssHeight = isNaN(Number(height)) ? height : height + "px";
      containerElement.style.height = cssHeight;
    }
    if (containerElement.dataset.defaultStyles !== "false" && !isHeadless) {
      (_a = containerElement.style).backgroundColor || (_a.backgroundColor = "#fff");
      (_b = containerElement.style).border || (_b.border = "1px solid black");
      (_c = containerElement.style).borderRadius || (_c.borderRadius = "8px");
      (_d = containerElement.style).boxSizing || (_d.boxSizing = "border-box");
      (_e = containerElement.style).padding || (_e.padding = "0");
      (_f = containerElement.style).width || (_f.width = "100%");
      (_g = containerElement.style).height || (_g.height = containerElement.style.height || "300px");
      containerElement.style.minHeight = "200px";
      containerElement.style.flexGrow = "1";
      (_h = containerElement.style).overflow || (_h.overflow = "hidden");
      (_i = containerElement.style).resize || (_i.resize = "vertical");
    }
    const className = "livecodes";
    const preExistingIframe = containerElement.querySelector(
      `iframe.${className}`
    );
    const frame = preExistingIframe || document.createElement("iframe");
    frame.classList.add(className);
    frame.setAttribute(
      "allow",
      "accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share"
    );
    frame.setAttribute("allowtransparency", "true");
    frame.setAttribute("allowpaymentrequest", "true");
    frame.setAttribute("allowfullscreen", "true");
    frame.setAttribute(
      "sandbox",
      "allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts"
    );
    const iframeLoading = loading === "eager" ? "eager" : "lazy";
    frame.setAttribute("loading", iframeLoading);
    if (isHeadless) {
      hideElement(frame);
    } else {
      frame.style.height = "100%";
      frame.style.minHeight = "200px";
      frame.style.width = "100%";
      frame.style.margin = "0";
      frame.style.border = "0";
      frame.style.borderRadius = containerElement.style.borderRadius;
    }
    registerEventHandler(function initHandler(e) {
      var _a2;
      if (e.source !== frame.contentWindow || e.origin !== origin || ((_a2 = e.data) == null ? void 0 : _a2.type) !== "livecodes-init") {
        return;
      }
      removeEventListener("message", initHandler);
      appVersion = Number(e.data.payload.appVersion.replace(/^v/, ""));
    });
    if (!appVersion || appVersion < 46) {
      registerEventHandler(function configHandler(e) {
        var _a2, _b2;
        if (e.source !== frame.contentWindow || e.origin !== origin || ((_a2 = e.data) == null ? void 0 : _a2.type) !== "livecodes-get-config") {
          return;
        }
        removeEventListener("message", configHandler);
        (_b2 = frame.contentWindow) == null ? void 0 : _b2.postMessage({ type: "livecodes-config", payload: config }, origin);
      });
    }
    frame.onload = () => {
      resolve(frame);
    };
    frame.src = playgroundUrl.href;
    if (!preExistingIframe) {
      containerElement.appendChild(frame);
    }
  });
  const iframe = await createIframe();
  const livecodesReady = new Promise((resolve) => {
    registerEventHandler(function readyHandler(e) {
      var _a;
      if (e.source !== iframe.contentWindow || e.origin !== origin || ((_a = e.data) == null ? void 0 : _a.type) !== "livecodes-ready") {
        return;
      }
      removeEventListener("message", readyHandler);
      resolve();
      livecodesReady.settled = true;
    });
  });
  const loadLivecodes = () => destroyed ? Promise.reject(alreadyDestroyedMessage) : new Promise(async (resolve) => {
    var _a;
    if (livecodesReady.settled)
      resolve();
    const message = { type: "livecodes-load" };
    (_a = iframe.contentWindow) == null ? void 0 : _a.postMessage(message, origin);
    await livecodesReady;
    resolve();
  });
  const callAPI = (method, args) => new Promise(async (resolve, reject) => {
    var _a;
    if (destroyed) {
      return reject(alreadyDestroyedMessage);
    }
    await loadLivecodes();
    const id = getRandomString();
    registerEventHandler(function handler(e) {
      var _a2, _b;
      if (e.source !== iframe.contentWindow || e.origin !== origin || ((_a2 = e.data) == null ? void 0 : _a2.type) !== "livecodes-api-response" || ((_b = e.data) == null ? void 0 : _b.id) !== id) {
        return;
      }
      if (e.data.method === method) {
        removeEventListener("message", handler);
        const payload = e.data.payload;
        if (payload == null ? void 0 : payload.error) {
          reject(payload.error);
        } else {
          resolve(payload);
        }
      }
    });
    (_a = iframe.contentWindow) == null ? void 0 : _a.postMessage({ method, id, args }, origin);
  });
  const watchers = {};
  const sdkEvents = ["load", "ready", "code", "console", "tests", "destroy"];
  const watch = (event, fn) => {
    var _a;
    if (destroyed) {
      throw new Error(alreadyDestroyedMessage);
    }
    if (!sdkEvents.includes(event))
      return { remove: () => void 0 };
    callAPI("watch", [event]);
    if (!watchers[event]) {
      watchers[event] = [];
    }
    (_a = watchers[event]) == null ? void 0 : _a.push(fn);
    return {
      remove: () => {
        var _a2, _b;
        watchers[event] = (_a2 = watchers[event]) == null ? void 0 : _a2.filter((w) => w !== fn);
        if (((_b = watchers[event]) == null ? void 0 : _b.length) === 0) {
          callAPI("watch", [event, "unsubscribe"]);
        }
      }
    };
  };
  const mapEvent = (event) => ({
    "livecodes-app-loaded": "load",
    "livecodes-ready": "ready",
    "livecodes-change": "code",
    "livecodes-console": "console",
    "livecodes-test-results": "tests",
    "livecodes-destroy": "destroy"
  })[event];
  registerEventHandler(async function watchHandler(e) {
    var _a, _b, _c, _d;
    const sdkEvent = mapEvent((_b = (_a = e.data) == null ? void 0 : _a.type) != null ? _b : "");
    if (e.source !== iframe.contentWindow || e.origin !== origin || !sdkEvent || !watchers[sdkEvent]) {
      return;
    }
    const data = (_c = e.data) == null ? void 0 : _c.payload;
    (_d = watchers[sdkEvent]) == null ? void 0 : _d.forEach((fn) => {
      fn(data);
    });
  });
  const destroy = () => {
    var _a;
    (_a = iframe == null ? void 0 : iframe.remove) == null ? void 0 : _a.call(iframe);
    Object.values(watchers).forEach((watcher) => {
      watcher.length = 0;
    });
    eventHandlers.forEach((handler) => removeEventListener("message", handler));
    eventHandlers.length = 0;
    if (observer && containerElement) {
      observer.unobserve(containerElement);
    }
    destroyed = true;
  };
  let observer;
  if (loading === "lazy" && "IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries, observer2) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            await loadLivecodes();
            observer2.unobserve(containerElement);
          }
        });
      },
      { rootMargin: "150px" }
    );
    observer.observe(containerElement);
  }
  function hideElement(el) {
    el.style.position = "absolute";
    el.style.top = "0";
    el.style.visibility = "hidden";
    el.style.opacity = "0";
  }
  const getRandomString = () => (String(Math.random()) + Date.now().toFixed()).replace("0.", "");
  return {
    load: () => loadLivecodes(),
    run: () => callAPI("run"),
    format: (allEditors) => callAPI("format", [allEditors]),
    getShareUrl: (shortUrl) => callAPI("getShareUrl", [shortUrl]),
    getConfig: (contentOnly) => callAPI("getConfig", [contentOnly]),
    setConfig: (config2) => callAPI("setConfig", [config2]),
    getCode: () => callAPI("getCode"),
    show: (pane, options2) => callAPI("show", [pane, options2]),
    runTests: () => callAPI("runTests"),
    onChange: (fn) => watch("code", fn),
    watch,
    exec: (command, ...args) => callAPI("exec", [command, ...args]),
    destroy: () => {
      if (destroyed) {
        return Promise.reject(alreadyDestroyedMessage);
      }
      destroy();
      return Promise.resolve();
    }
  };
}
function getPlaygroundUrl(options = {}) {
  const {
    appUrl = "https://livecodes.io",
    params = {},
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
  } catch (e) {
    throw new Error(`${appUrl} is not a valid URL.`);
  }
  const hashParams = new URLSearchParams();
  Object.entries(otherOptions).forEach(([key, value]) => {
    if (value !== void 0) {
      playgroundUrl.searchParams.set(key, String(value));
    }
  });
  const isHeadless = options.view === "headless" || headless;
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
    } catch (e) {
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
  if (params && typeof params === "object" && Object.keys(params).length > 0) {
    try {
      hashParams.set("params", (0, import_lz_string.compressToEncodedURIComponent)(JSON.stringify(params)));
    } catch (e) {
      Object.keys(params).forEach((param) => {
        playgroundUrl.searchParams.set(param, encodeURIComponent(String(params[param])));
      });
    }
  }
  if (importId) {
    playgroundUrl.searchParams.set("x", encodeURIComponent(importId));
  }
  if (isHeadless) {
    playgroundUrl.searchParams.set("headless", "true");
  }
  if (hashParams.toString().length > 0) {
    playgroundUrl.hash = hashParams.toString();
  }
  return playgroundUrl.href;
}

// src/sdk/react.tsx
import { jsx } from "react/jsx-runtime";
function LiveCodes(props) {
  const containerRef = useRef(null);
  const [className, setClassName] = useState(props.className || "");
  const [style, setStyle] = useState(props.style || {});
  const [height, setHeight] = useState(props.height);
  const [playground, setPlayground] = useState();
  const [configCache, setConfigCache] = useState(JSON.stringify(props.config || ""));
  const [otherOptionsCache, setOtherOptionsCache] = useState("");
  useEffect(() => {
    if (!containerRef.current)
      return;
    const { className: className2, style: style2, height: height2, sdkReady, config, ...otherOptions } = props;
    setClassName(className2 || "");
    setStyle(style2 || {});
    setHeight(height2);
    if (!playground || otherOptionsCache !== JSON.stringify(otherOptions)) {
      setOtherOptionsCache(JSON.stringify(otherOptions));
      playground == null ? void 0 : playground.destroy();
      createPlayground(containerRef.current, { config, ...otherOptions }).then((sdk) => {
        setPlayground(sdk);
        if (typeof sdkReady === "function") {
          sdkReady(sdk);
        }
      });
    } else {
      if (configCache === JSON.stringify(config))
        return;
      setConfigCache(JSON.stringify(config));
      if (typeof config === "string") {
        fetch(config).then((res) => res.json()).then((json) => {
          playground == null ? void 0 : playground.setConfig(json);
        });
      } else if (config) {
        playground.setConfig(config);
      }
    }
  }, [props]);
  useEffect(
    () => () => {
      playground == null ? void 0 : playground.destroy();
    },
    []
  );
  return /* @__PURE__ */ jsx("div", { ref: containerRef, className, style, "data-height": height });
}
export {
  LiveCodes as default
};
