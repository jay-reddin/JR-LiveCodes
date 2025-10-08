// node_modules/js-base64/base64.mjs
var _hasatob = typeof atob === "function";
var _hasbtoa = typeof btoa === "function";
var _hasBuffer = typeof Buffer === "function";
var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var b64chs = Array.prototype.slice.call(b64ch);
var b64tab = ((a) => {
  let tab = {};
  a.forEach((c, i) => tab[c] = i);
  return tab;
})(b64chs);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
var _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
var _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, "");
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
var cb_utob = (c) => {
  if (c.length < 2) {
    var cc = c.charCodeAt(0);
    return cc < 128 ? c : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  } else {
    var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
    return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  }
};
var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
var utob = (u) => u.replace(re_utob, cb_utob);
var _encode = _hasBuffer ? (s) => Buffer.from(s, "utf8").toString("base64") : _TE ? (s) => _fromUint8Array(_TE.encode(s)) : (s) => _btoa(utob(s));
var encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = (cccc) => {
  switch (cccc.length) {
    case 4:
      var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
      return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
    case 3:
      return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
    default:
      return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
  }
};
var btou = (b) => b.replace(re_btou, cb_btou);
var atobPolyfill = (asc) => {
  asc = asc.replace(/\s+/g, "");
  if (!b64re.test(asc))
    throw new TypeError("malformed base64.");
  asc += "==".slice(2 - (asc.length & 3));
  let u24, bin = "", r1, r2;
  for (let i = 0; i < asc.length; ) {
    u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
    bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
  }
  return bin;
};
var _atob = _hasatob ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
var _toUint8Array = _hasBuffer ? (a) => _U8Afrom(Buffer.from(a, "base64")) : (a) => _U8Afrom(_atob(a).split("").map((c) => c.charCodeAt(0)));
var _decode = _hasBuffer ? (a) => Buffer.from(a, "base64").toString("utf8") : _TD ? (a) => _TD.decode(_toUint8Array(a)) : (a) => btou(_atob(a));
var _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
var decode = (src) => _decode(_unURI(src));

// src/livecodes/utils/utils.ts
var stringToValidJson = (str) => str.replace(/'[^'"]*'(?=(?:[^"]*"[^"]*")*[^"]*$)/g, function replaceSingleQuotes(matchedStr) {
  return '"' + matchedStr.substring(1, matchedStr.length - 1) + '"';
}).replace(
  // /(\w+(?=([^"\\]*(\\.|"([^"\\]*\\.)*[^"\\]*"))*[^"]*$))(\s*:)(?!(\w*)(?:"))/gm,
  /(\w+(?=([^"\\]*(\\.|"([^"\\]*\\.)*[^"\\]*"))*[^"]*$))(\s*:)/gm,
  function quoteNonQuoted(matchedStr) {
    return '"' + matchedStr.substring(0, matchedStr.length - 1).trimEnd() + '":';
  }
).replace(/,\s*([\]}])/g, "$1");
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
var blobToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject();
  reader.onerror = (error) => reject(error);
});
var toDataUrl = (content, type = "text/javascript") => `data:${type};charset=UTF-8;base64,` + encode(content);
var getWorkerDataURL = (url) => toDataUrl(`importScripts("${url}");`);
var removeComments = (src) => src.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1");
var getLanguageCustomSettings = (language, config) => ({
  ...config.customSettings[language]
});
var runOrContinue = (fn, catchFn) => async (x) => {
  try {
    const result = await fn(x);
    return result;
  } catch (error) {
    if (typeof catchFn === "function") {
      catchFn(error);
    }
    return x;
  }
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
var vendorsBaseUrl = (
  // 'http://127.0.0.1:8081/';
  /* @__PURE__ */ getUrl("@live-codes/browser-compilers@0.22.3/dist/")
);
var cytoscapeSvgUrl = /* @__PURE__ */ getUrl("cytoscape-svg@0.4.0/cytoscape-svg.js");
var cytoscapeUrl = /* @__PURE__ */ getUrl("cytoscape@3.25.0/dist/cytoscape.min.js");
var elkjsBaseUrl = /* @__PURE__ */ getUrl("elkjs@0.8.2/lib/");
var graphreCdnUrl = /* @__PURE__ */ getUrl("graphre@0.1.3/dist/graphre.js");
var hpccJsCdnUrl = /* @__PURE__ */ getUrl("@hpcc-js/wasm@2.13.0/dist/index.js");
var mermaidCdnUrl = /* @__PURE__ */ getUrl("mermaid@10.2.2/dist/mermaid.esm.mjs");
var nomnomlCdnUrl = /* @__PURE__ */ getUrl("nomnoml@1.6.1/dist/nomnoml.js");
var pintoraUrl = /* @__PURE__ */ getUrl(
  "@pintora/standalone@0.6.2/lib/pintora-standalone.umd.js"
);
var plotlyCdnUrl = /* @__PURE__ */ getUrl("plotly.js@2.23.2/dist/plotly.js");
var svgbobWasmCdnUrl = /* @__PURE__ */ getUrl("svgbob-wasm@0.4.1-a0/svgbob_wasm_bg.wasm");
var vegaCdnUrl = /* @__PURE__ */ getUrl("vega@5.25.0/build/vega.js");
var vegaLiteCdnUrl = /* @__PURE__ */ getUrl("vega-lite@5.9.3/build/vega-lite.js");
var waveDromBaseUrl = /* @__PURE__ */ getUrl("wavedrom@3.2.0/");

// src/livecodes/languages/diagrams/lang-diagrams-compiler-esm.ts
var useShadowDom = false;
var displaySVG = (el, svg) => {
  if (el.tagName.toLowerCase() === "img") {
    el.src = toDataUrl(svg, "image/svg+xml");
  } else {
    el.innerHTML = svg;
  }
};
var toValidJson = (str) => stringToValidJson(removeComments(str));
var compile = async (code, type, loadFn, renderFn, shadowDom = false) => {
  if (!code)
    return "";
  const temp = document.createElement("div");
  temp.innerHTML = code;
  const scripts = temp.querySelectorAll(
    `script[type="application/diagram-${type}"]`
  );
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }
  await loadFn();
  for (const script of scripts) {
    if (!script.src && !script.innerHTML.trim())
      continue;
    const output = script.dataset.output;
    if (!output)
      continue;
    const content = script.src ? await fetch(script.src).then((res) => res.text()) : script.innerHTML;
    let svg = await renderFn(content, script);
    const elements = temp.querySelectorAll(`[data-src="${output}"]`);
    for (const el of elements) {
      if (el.tagName.toLowerCase() !== "img" && shadowDom) {
        useShadowDom = true;
        svg = `<svg-container> ${svg} </svg-container>`;
      }
      displaySVG(el, svg);
    }
    script.remove();
  }
  const result = temp.innerHTML;
  temp.remove();
  return result;
};
var compileGnuplot = async (code) => {
  const temp = document.createElement("div");
  temp.innerHTML = code;
  document.body.appendChild(temp);
  const scripts = temp.querySelectorAll(
    'script[type="application/diagram-gnuplot"]'
  );
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }
  const gnuplotCdnBaseUrl = vendorsBaseUrl + "gnuplot";
  const Gnuplot = await loadScript(gnuplotCdnBaseUrl + "/gnuplot_api.js", "Gnuplot");
  const workerUrl = getWorkerDataURL(gnuplotCdnBaseUrl + "/gnuplot.js");
  const gnuplot = window.gnuplot = window.gnuplot || new Gnuplot(workerUrl);
  const runCode = (code2, files) => new Promise(async (resolve) => {
    await Promise.all(
      files.map(
        (file) => new Promise((resolvePut) => {
          gnuplot.putFile(file.fileName, file.content, resolvePut);
        })
      )
    );
    gnuplot.run(code2, resolve);
  });
  const getImgUrl = (fileName) => new Promise((resolve) => {
    gnuplot.getFile(fileName, function(e) {
      if (!e?.content) {
        resolve("");
        return;
      }
      const ab = new Uint8Array(e.content);
      const blob = new Blob([ab], { type: "image/svg+xml" });
      blobToBase64(blob).then(resolve);
    });
  });
  await new Promise((resolveDel) => gnuplot.removeFiles(null, resolveDel));
  const inputFiles = [];
  const fileScripts = temp.querySelectorAll(
    'script[type="application/diagram-gnuplot-file"]'
  );
  for (const fileScript of fileScripts) {
    if (!fileScript.dataset.file && !fileScript.src)
      continue;
    const content = fileScript.src ? await fetch(fileScript.src).then((res) => res.text()) : fileScript.innerHTML;
    const fileName = fileScript.dataset.file || fileScript.src?.split("/")[fileScript.src?.split("/").length - 1] || "data.txt";
    inputFiles.push({ fileName, content });
    fileScript.remove();
  }
  for (const script of scripts) {
    if (!script.src && !script.innerHTML.trim())
      continue;
    const content = script.src ? await fetch(script.src).then((res) => res.text()) : script.innerHTML;
    await runCode(content, inputFiles);
    script.remove();
  }
  const elements = temp.querySelectorAll(`[data-src]`);
  for (const el of elements) {
    const imgUrl = await getImgUrl(el.dataset.src || "");
    if (!imgUrl)
      continue;
    if (el.tagName.toLowerCase() === "img") {
      el.src = imgUrl;
    } else {
      el.innerHTML = decode(imgUrl.split(",")[1]);
    }
  }
  const result = temp.innerHTML;
  temp.remove();
  return result;
};
var compileMermaid = async (code) => {
  let mermaid;
  const load = async () => {
    mermaid = (await import(mermaidCdnUrl)).default;
    mermaid.initialize({
      startOnLoad: false
    });
  };
  let count = 0;
  const counter = () => count++;
  const render = async (src) => {
    const placeholder = document.createElement("div");
    placeholder.id = "livecodes-mermaid-chart-" + counter();
    document.body.appendChild(placeholder);
    const { svg } = await mermaid.render(placeholder.id, src.trim());
    placeholder.remove();
    return svg;
  };
  return compile(code, "mermaid", load, render);
};
var compileGraphviz = async (code) => {
  let graphviz;
  const load = async () => {
    const hpccWasm = await import(hpccJsCdnUrl);
    graphviz = await hpccWasm.Graphviz.load();
  };
  const render = (src, script) => {
    const layout = script.dataset.layout || "dot";
    return graphviz.layout(src, "svg", layout);
  };
  return compile(code, "graphviz", load, render);
};
var compileVega = async (code) => {
  const temp = document.createElement("div");
  temp.innerHTML = code;
  const vegaLiteScripts = temp.querySelectorAll(
    'script[type="application/diagram-vega-lite"]'
  );
  let vega;
  if (vegaLiteScripts.length > 0) {
    vega = await loadScript(vegaCdnUrl, "vega");
    const vegaLite = await loadScript(vegaLiteCdnUrl, "vegaLite");
    for (const vegaLiteScript of vegaLiteScripts) {
      if (!vegaLiteScript.src && !vegaLiteScript.innerHTML.trim())
        continue;
      const output = vegaLiteScript.dataset.output;
      if (!output)
        continue;
      const vegaLiteOptions = {};
      try {
        const content = vegaLiteScript.src ? await fetch(vegaLiteScript.src).then((res) => res.json()) : JSON.parse(toValidJson(vegaLiteScript.innerHTML));
        vegaLiteScript.innerHTML = JSON.stringify(vegaLite.compile(content, vegaLiteOptions).spec);
        vegaLiteScript.type = "application/diagram-vega";
        vegaLiteScript.removeAttribute("src");
      } catch {
        vegaLiteScript.remove();
        throw new Error("failed to parse vegaLite specs.");
      }
    }
  }
  const load = async () => {
    vega = vega || await loadScript(vegaCdnUrl, "vega");
  };
  const render = async (src, options = {}) => {
    const diagramContainer = document.createElement("div");
    try {
      const specs = JSON.parse(toValidJson(src));
      const view = new vega.View(vega.parse(specs), {
        ...options,
        renderer: "svg",
        container: diagramContainer
      });
      await view.runAsync();
      return diagramContainer.querySelector("svg")?.outerHTML || "";
    } catch {
      throw new Error("failed to parse vega specs.");
    } finally {
      diagramContainer.remove();
    }
  };
  const result = await compile(temp.innerHTML, "vega", load, render);
  temp.remove();
  return result;
};
var compilePlotly = async (code) => {
  let Plotly;
  const load = async () => {
    Plotly = await loadScript(plotlyCdnUrl, "Plotly");
  };
  const render = (src) => {
    const diagramContainer = document.createElement("div");
    try {
      const specs = JSON.parse(toValidJson(src));
      Plotly.newPlot(diagramContainer, specs.data, specs.layout, { displayModeBar: false });
      return diagramContainer.querySelector("svg")?.outerHTML || "";
    } catch {
      throw new Error("failed to parse plotly specs.");
    } finally {
      diagramContainer.remove();
    }
  };
  return compile(code, "plotly", load, render);
};
var compileSvgBob = async (code) => {
  let svgbob;
  const load = async () => {
    const { svgbobWasm } = await import(vendorsBaseUrl + "svgbob-wasm/svgbob-wasm.js");
    svgbob = await svgbobWasm(svgbobWasmCdnUrl);
  };
  const render = (src) => svgbob.convert_string(src);
  return compile(code, "svgbob", load, render, true);
};
var compileWaveDrom = async (code) => {
  let WaveDrom;
  const load = async () => {
    await loadScript(waveDromBaseUrl + "skins/default.js", "WaveSkin");
    WaveDrom = await loadScript(waveDromBaseUrl + "wavedrom.min.js", "WaveDrom");
  };
  const render = (src) => {
    const diagramContainer = document.createElement("div");
    try {
      const obj = JSON.parse(toValidJson(src));
      diagramContainer.id = "diagram-id";
      document.body.appendChild(diagramContainer);
      WaveDrom.RenderWaveForm(diagramContainer.id, obj, "");
      const svg = diagramContainer.innerHTML || "";
      return svg;
    } catch {
      throw new Error("failed to parse WaveDrom specs.");
    } finally {
      diagramContainer.remove();
    }
  };
  return compile(code, "wavedrom", load, render);
};
var compileNomnoml = async (code) => {
  let nomnoml;
  const load = async () => {
    await loadScript(graphreCdnUrl, "graphre");
    nomnoml = await loadScript(nomnomlCdnUrl, "nomnoml");
  };
  const render = (src) => nomnoml.renderSvg(src);
  return compile(code, "nomnoml", load, render);
};
var compileElk = async (code) => {
  let elk;
  let renderer;
  const load = async () => {
    const elkjsUrl = elkjsBaseUrl + "elk-api.js";
    const elkjsWorkerUrl = elkjsBaseUrl + "elk-worker.min.js";
    const elksvgUrl = vendorsBaseUrl + "elkjs-svg/elkjs-svg.js";
    const ELK = await loadScript(elkjsUrl, "ELK");
    const elksvg = await loadScript(elksvgUrl, "elksvg");
    elk = new ELK({ workerUrl: getWorkerDataURL(elkjsWorkerUrl) });
    renderer = new elksvg.Renderer();
  };
  const render = (src) => {
    try {
      const specs = JSON.parse(toValidJson(src));
      return elk.layout(specs).then((data) => renderer.toSvg(data));
    } catch {
      throw new Error("failed to parse ELK JSON.");
    }
  };
  return compile(code, "elk", load, render, true);
};
var compileCytoscape = async (code) => {
  let cytoscape;
  let cytoscapeSvg;
  const load = async () => {
    [cytoscape, cytoscapeSvg] = await Promise.all([
      loadScript(cytoscapeUrl, "cytoscape"),
      loadScript(cytoscapeSvgUrl, "cytoscapeSvg")
    ]);
    cytoscape.use(cytoscapeSvg);
  };
  const render = (src) => {
    const cyEl = document.createElement("div");
    cyEl.style.display = "block";
    cyEl.style.visibility = "none";
    cyEl.style.height = "300px";
    cyEl.style.width = "300px";
    document.body.appendChild(cyEl);
    try {
      const options = {
        ...JSON.parse(toValidJson(removeComments(src))),
        container: cyEl
      };
      return cytoscape(options).svg({ scale: 1, full: true });
    } catch {
      throw new Error("failed to parse Cytoscape options.");
    } finally {
      cyEl.remove();
    }
  };
  return compile(code, "cytoscape", load, render);
};
var compilePintora = async (code, config) => {
  let pintora;
  const load = async () => {
    pintora = await loadScript(pintoraUrl, "pintora");
  };
  const render = (src) => {
    const container = document.createElement("div");
    pintora.default.renderTo(src, {
      container,
      config: {
        ...getLanguageCustomSettings("pintora", config)
      }
    });
    const svg = container.firstElementChild;
    svg?.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg?.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    return container.innerHTML;
  };
  return compile(code, "pintora", load, render);
};
var getShadowDomScript = () => useShadowDom ? `
<script>
  class SVGContainer extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({mode: 'closed'});
      shadowRoot.append(...this.childNodes);
    }
  }
  customElements.define('svg-container', SVGContainer);
<\/script>
` : "";
var run = (fn) => runOrContinue(fn, console.error);
var diagramsCompiler = async (code, { config }) => {
  const result = await Promise.resolve(code).then(run(compileGnuplot)).then(run(compileMermaid)).then(run(compileGraphviz)).then(run(compileVega)).then(run(compilePlotly)).then(run(compileSvgBob)).then(run(compileWaveDrom)).then(run(compileNomnoml)).then(run(compileElk)).then(run(compileCytoscape)).then(run((src) => compilePintora(src, config))).catch((err) => {
    console.error(err);
    return code;
  });
  return result + getShadowDomScript();
};
export {
  diagramsCompiler
};
