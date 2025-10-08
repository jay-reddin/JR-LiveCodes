"use strict";
(() => {
  // node_modules/js-base64/base64.mjs
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

  // src/livecodes/utils/utils.ts
  var getRandomString = () => String(Math.random()) + "-" + Date.now().toFixed();
  var toDataUrl = (content, type = "text/javascript") => `data:${type};charset=UTF-8;base64,` + encode(content);
  var removeComments = (src) => src.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1");
  var getValidUrl = (url) => {
    if (!url)
      return null;
    let validUrl = null;
    if (url.startsWith("http") || url.startsWith("data:")) {
      try {
        validUrl = new URL(url).href;
      } catch {
        try {
          validUrl = new URL(decodeURIComponent(url)).href;
        } catch {
        }
      }
    }
    return validUrl;
  };
  var getFileExtension = (file) => file.split(".")[file.split(".").length - 1];
  var replaceAsync = async (str, regexp, asyncFn) => {
    const replacements = await Promise.all(
      Array.from(str.matchAll(regexp), (match) => asyncFn(...match))
    );
    let i = 0;
    return str.replace(regexp, () => replacements[i++]);
  };
  var getErrorMessage = (err) => {
    if (err == null)
      return "";
    if (err instanceof Error)
      return err.message;
    if (err && typeof err === "object" && "message" in err && typeof err.message === "string") {
      return err.message;
    }
    return String(err);
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
  var processorIsEnabled = (processor, config) => {
    if (!window.deps.processors.map((p) => p.name).includes(processor))
      return false;
    if (!config.languages)
      return true;
    return config.languages.includes(processor);
  };
  var processorIsActivated = (processor, config) => config.processors.includes(processor);

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

  // src/livecodes/compiler/import-map.ts
  var importsPattern = /(import\s+?(?:(?:(?:[\w*\s{},\$]*)\s+from\s+?)|))((?:".*?")|(?:'.*?'))([\s]*?(?:;|$|))/g;
  var dynamicImportsPattern = /(import\s*?\(\s*?((?:".*?")|(?:'.*?'))\s*?\))/g;
  var getImports = (code, removeSpecifier = false) => [
    ...[...removeComments(code).matchAll(new RegExp(importsPattern))],
    ...[...removeComments(code).matchAll(new RegExp(dynamicImportsPattern))]
  ].map((arr) => arr[2].replace(/"/g, "").replace(/'/g, "")).map((mod) => {
    if (!removeSpecifier || !isBare(mod) || !mod.includes(":")) {
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
  var modulesCache = {};
  var fetchModule = async (mod) => {
    if (modulesCache[mod]) {
      return modulesCache[mod];
    }
    const res = await fetch(mod);
    const content = await res.text();
    modulesCache[mod] = content;
    return content;
  };
  var replaceSFCImports = async (code, {
    filename,
    config,
    isSfc,
    getLanguageByAlias: getLanguageByAlias2,
    compileSFC,
    external
  }) => {
    const isExtensionless = (mod) => mod.startsWith(".") && !mod.split("/")[mod.split("/").length - 1].includes(".");
    const sfcImports = getImports(code).filter(
      (mod) => isSfc(mod) || isExtensionless(mod) || mod.startsWith(".")
    );
    const projectImportMap = {
      ...config.imports,
      ...config.customSettings.imports
    };
    const importMap = {};
    await Promise.all(
      sfcImports.map(async (mod) => {
        if (!(filename.startsWith("https://") || filename.startsWith("http://")) && isScriptImport(mod)) {
          return;
        }
        const urlInMap = isExtensionless(mod) && getValidUrl(filename) != null && projectImportMap[findImportMapKey(new URL(mod, filename).href, projectImportMap) || 0];
        const url = projectImportMap[findImportMapKey(mod, projectImportMap) || 0] || urlInMap || (mod.startsWith("https://") || mod.startsWith("http://") ? mod : mod.startsWith(".") && getValidUrl(filename) != null ? new URL(mod, filename).href : modulesService.getUrl(mod));
        const content = await fetchModule(url);
        const compiled = isSfc(mod) ? await compileSFC(content, { filename: url, config }) : await replaceSFCImports(
          (await compileInCompiler(
            content,
            getLanguageByAlias2(getFileExtension(url)) || "javascript",
            config
          )).code,
          { filename: url, config, isSfc, getLanguageByAlias: getLanguageByAlias2, compileSFC, external }
        );
        if (!compiled)
          return;
        const dataUrl = toDataUrl(compiled);
        importMap[mod] = dataUrl;
      })
    );
    return replaceImports(code, {}, { importMap, external });
  };
  var styleimportsPattern = /(?:@import\s+?)((?:".*?")|(?:'.*?')|(?:url\('.*?'\))|(?:url\(".*?"\)))(.*)?;/g;
  var hasStyleImports = (code) => new RegExp(styleimportsPattern).test(code);

  // src/livecodes/compiler/compile-blocks.ts
  var exportDefaultImports = (code) => {
    const defaultImportPattern = /(?:import\s+?(?:(?:(\w*)\s+from\s+?)|))((?:".*?")|(?:'.*?'))([\s]*?(?:;|$|))/g;
    const tokens = [];
    for (const arr of [...code.matchAll(new RegExp(defaultImportPattern, "g"))]) {
      const [_match, token] = arr;
      tokens.push(token);
    }
    if (tokens.length === 0)
      return "";
    return `
export { ${tokens.join(", ")} };`;
  };
  var fetchBlocksSource = async (code, blockElement) => {
    const getBlockPattern = (el) => `(<${el}(?:[^>]*?))(?:\\ssrc=["']([^"'\\s]*?)["'])((?:[^>]*))(>(?:\\s*?)<\\/${el}>|\\/>)`;
    const pattern = getBlockPattern(blockElement);
    const blocks = [];
    for (const arr of [...code.matchAll(new RegExp(pattern, "g"))]) {
      const [element, opentagPre, src, opentagPost, _closetag] = arr;
      if (!src) {
        blocks.push(element);
      } else {
        const url = modulesService.getUrl(src);
        try {
          const res = await fetch(url);
          if (!res.ok)
            throw new Error("failed to fetch: " + url);
          const content = await res.text();
          const langAttr = opentagPre.includes("lang") || opentagPost.includes("lang") ? "" : ` lang="${getFileExtension(url)}"`;
          blocks.push(`${opentagPre + langAttr + opentagPost}>${content}</${blockElement}>`);
        } catch {
          blocks.push(element);
        }
      }
    }
    return code.replace(new RegExp(pattern, "g"), () => blocks.pop() || "");
  };
  var postProcess = async (content, config, language) => {
    let code = content;
    let info = {};
    let postcssRequired = false;
    const editorId = getLanguageEditorId(language) || "markup";
    const tailwindcssIsActive = processorIsEnabled("tailwindcss", config) && processorIsActivated("tailwindcss", config);
    if (editorId === "style" && hasStyleImports(code) && !tailwindcssIsActive) {
      postcssRequired = true;
    }
    for (const processor of window.deps.processors) {
      if (["tailwindcss", "unocss", "windicss"].includes(processor.name))
        continue;
      if (processorIsEnabled(processor.name, config) && processorIsActivated(processor.name, config) && processor.editor === editorId || editorId === "style" && processor.name === "postcss") {
        if (processor.isPostcssPlugin) {
          postcssRequired = true;
        } else {
          if (processor.name === "postcss" && !postcssRequired)
            continue;
          const tailwindcssReference = tailwindcssIsActive && processor.name === "tailwindcss" ? '@reference "tailwindcss";\n' : "";
          const processResult = await compileInCompiler(
            tailwindcssReference + code,
            processor.name,
            config
          );
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
  var compileBlocks = async (code, blockElement, config, options = {}) => {
    let fullCode = await fetchBlocksSource(code, blockElement);
    if (typeof options.prepareFn === "function") {
      fullCode = await options.prepareFn(fullCode, config);
    }
    const hasProcessors = config.processors.filter((p) => !options.skipCompilers?.includes(p)).length > 0;
    const getBlockPattern = (el, langAttr = "lang") => `(<${el}\\s*)(?:([\\s\\S]*?)${langAttr}\\s*=\\s*["']([A-Za-z0-9 _]*)["'])?((?:[^>]*)>)([\\s\\S]*?)(<\\/${el}>)`;
    const pattern = getBlockPattern(blockElement, options.languageAttribute);
    const blocks = [];
    for (const arr of [...fullCode.matchAll(new RegExp(pattern, "g"))]) {
      const [element, opentag, opentagPre = "", language = "", opentagPost, content, closetag] = arr;
      if ((!language || !content) && (blockElement !== "style" || !hasProcessors)) {
        blocks.push(element);
        continue;
      }
      const lang = getLanguageByAlias(language);
      if ((!lang || options.skipCompilers?.includes(lang)) && (blockElement !== "style" || !hasProcessors)) {
        blocks.push(element);
        continue;
      }
      let exports = "";
      if (["typescript", "jsx", "tsx", "babel", "sucrase"].includes(lang || "")) {
        exports = exportDefaultImports(content);
      }
      let compiled = (await compileInCompiler(content + exports, lang, config)).code || content;
      if (exports) {
        compiled = compiled.replace(exports, "");
      }
      if (hasProcessors) {
        compiled = getCompileResult(await postProcess(compiled, config, lang ?? "css")).code;
      }
      blocks.push(
        element.replace(
          new RegExp(pattern, "g"),
          blockElement === "template" && options.removeEnclosingTemplate ? compiled : opentag + opentagPre + opentagPost + compiled + closetag
        )
      );
    }
    return fullCode.replace(new RegExp(pattern, "g"), () => blocks.pop() || "");
  };
  var compileAllBlocks = async (code, config, options = {}) => {
    const blockElements = ["template", "style", "script"];
    for (const el of blockElements) {
      code = await compileBlocks(code, el, config, options);
    }
    return code;
  };

  // src/livecodes/languages/vue/lang-vue-compiler.ts
  self.createVueCompiler = () => {
    const MAIN_FILE = "App.vue";
    const SECONDARY_FILE = "Component.vue";
    const COMP_IDENTIFIER = "__sfc__";
    let errors = [];
    let css = "";
    const ids = {};
    let importedContent = "";
    const SFCCompiler = self.VueCompilerSFC.VueCompilerSFC;
    async function compileVueSFC(code, { filename = MAIN_FILE, config }) {
      if (filename === MAIN_FILE) {
        errors = [];
        css = "";
        importedContent = "";
      }
      if (!code.trim())
        return;
      const isSfc = (mod) => mod.toLowerCase().endsWith(".vue") || mod.toLowerCase().startsWith("data:text/vue");
      const testTs = (filename2) => !!(filename2 && /(\.|\b)(tsx?|typescript)$/.test(filename2.toLowerCase()));
      const testJsx = (filename2) => !!(filename2 && /(\.|\b)[jt]sx$/.test(filename2.toLowerCase()));
      code = await replaceSFCImports(code, {
        filename,
        config,
        getLanguageByAlias,
        isSfc,
        compileSFC: async (code2, { filename: filename2, config: config2 }) => {
          const compiled2 = (await compileVueSFC(code2, { filename: filename2, config: config2 }))?.js || "";
          importedContent += `
${filename2}

${compiled2}
`;
          return compiled2;
        }
      });
      const compiledBlocks = await compileBlocks2(code, {
        config,
        skipCompilers: ["typescript", "jsx", "tsx", "babel", "sucrase"]
      });
      const cssModules = compiledBlocks.cssModules;
      code = compiledBlocks.content;
      const compiled = { css: "", js: "", ssr: "" };
      if (!ids[filename]) {
        ids[filename] = await hashId(filename);
      }
      const id = ids[filename];
      const { errors: err, descriptor } = SFCCompiler.parse(code, {
        filename,
        sourceMap: false
        // templateParseOptions: store.sfcOptions?.template?.compilerOptions,
      });
      if (err.length) {
        errors.push(...err);
        return;
      }
      const scriptLang = descriptor.script?.lang || descriptor.scriptSetup?.lang;
      const isTS = testTs(scriptLang);
      const isJSX = testJsx(scriptLang);
      const hasScoped = descriptor.styles.some((s) => s.scoped);
      let clientCode = "";
      for (const style of descriptor.styles) {
        const styleResult = await SFCCompiler.compileStyleAsync({
          // ...store.sfcOptions?.style,
          source: style.content,
          filename,
          id,
          scoped: style.scoped,
          modules: false
        });
        if (styleResult.errors.length) {
          errors.push(...styleResult.errors);
        } else {
          css += `${styleResult.code}
`;
        }
      }
      if (css) {
        compiled.css = css.trim();
      }
      const appendSharedCode = (code2) => {
        clientCode += code2;
      };
      const [compiledScript, bindings] = await doCompileScript(descriptor, id, false, isTS, isJSX);
      const clientScript = isTS || isJSX ? await compileTypescript(compiledScript, { config }) : compiledScript;
      appendSharedCode(clientScript);
      if (descriptor.template && !descriptor.scriptSetup) {
        const clientTemplateResult = await doCompileTemplate(
          descriptor,
          id,
          bindings,
          false,
          isTS,
          isJSX
        );
        if (!clientTemplateResult)
          return;
        const templateCode = isTS || isJSX ? await compileTypescript(clientTemplateResult, { config }) : clientTemplateResult;
        appendSharedCode(templateCode);
      }
      if (hasScoped) {
        appendSharedCode(`
${COMP_IDENTIFIER}.__scopeId = ${JSON.stringify(`data-v-${id}`)};`);
      }
      const createAppCode = filename === MAIN_FILE ? `
import { createApp } from 'vue';
createApp(${COMP_IDENTIFIER})
  .mount(document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement('div')));
` : "\n";
      if (cssModules) {
        appendSharedCode(
          `
${COMP_IDENTIFIER}.computed = {...${COMP_IDENTIFIER}.computed, $style() { return ${JSON.stringify(
            cssModules
          )} }};`
        );
      }
      if (clientCode) {
        appendSharedCode(
          `
${COMP_IDENTIFIER}.__file = ${JSON.stringify(filename)};
export default ${COMP_IDENTIFIER};` + createAppCode
        );
        compiled.js = clientCode.trimStart();
      }
      return compiled;
    }
    async function doCompileScript(descriptor, id, ssr, isTS, isJSX) {
      if (descriptor.script || descriptor.scriptSetup) {
        const expressionPlugins = [];
        if (isTS) {
          expressionPlugins.push("typescript");
        }
        if (isJSX) {
          expressionPlugins.push("jsx");
        }
        const compiledScript = SFCCompiler.compileScript(descriptor, {
          inlineTemplate: true,
          // ...store.sfcOptions?.script,
          id,
          genDefaultAs: COMP_IDENTIFIER,
          templateOptions: {
            // ...store.sfcOptions?.template,
            ssr,
            ssrCssVars: descriptor.cssVars,
            compilerOptions: {
              // ...store.sfcOptions?.template?.compilerOptions,
              expressionPlugins
            }
          }
        });
        let code = compiledScript.content;
        if (compiledScript.bindings) {
          code = `/* Analyzed bindings: ${JSON.stringify(compiledScript.bindings, null, 2)} */
` + code;
        }
        return [code, compiledScript.bindings];
      } else {
        const vaporFlag = descriptor.vapor ? "__vapor: true" : "";
        return [`
const ${COMP_IDENTIFIER} = { ${vaporFlag} }`, void 0];
      }
    }
    async function doCompileTemplate(descriptor, id, bindingMetadata, ssr, isTS, isJSX) {
      const expressionPlugins = [];
      if (isTS) {
        expressionPlugins.push("typescript");
      }
      if (isJSX) {
        expressionPlugins.push("jsx");
      }
      const templateResult = SFCCompiler.compileTemplate({
        isProd: false,
        // ...store.sfcOptions?.template,
        vapor: descriptor.vapor,
        ast: descriptor.template.ast,
        source: descriptor.template.content,
        filename: descriptor.filename,
        id,
        scoped: descriptor.styles.some((s) => s.scoped),
        slotted: descriptor.slotted,
        ssr,
        ssrCssVars: descriptor.cssVars,
        compilerOptions: {
          // ...store.sfcOptions?.template?.compilerOptions,
          bindingMetadata,
          expressionPlugins
        }
      });
      if (templateResult.errors.length) {
        errors.push(...templateResult.errors);
        return;
      }
      const fnName = ssr ? "ssrRender" : "render";
      return `
${templateResult.code.replace(
        /\nexport (function|const) (render|ssrRender)/,
        `$1 ${fnName}`
      )}
${COMP_IDENTIFIER}.${fnName} = ${fnName};`;
    }
    async function hashId(filename) {
      try {
        const msgUint8 = new TextEncoder().encode(filename);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        return hashHex.slice(0, 8);
      } catch {
        return getRandomString().slice(2, 10).split("").map((x) => String.fromCharCode(65 + Number(x))).join("").replace(/`/g, "-").toLowerCase();
      }
    }
    async function compileBlocks2(code, { config, skipCompilers }) {
      let content = code;
      const scriptPattern = /<script([\s\S]*?)>([\s\S]*?)<\/script>/g;
      const stylePattern = /<style([\s\S]*?)>([\s\S]*?)<\/style>/g;
      const prepareFn = async (code2) => code2.replace(scriptPattern, (match, attrs, scriptContent) => {
        if (!scriptContent.includes("<")) {
          return match;
        }
        if (!attrs.toLowerCase().includes(" lang")) {
          attrs += ' lang="jsx"';
        }
        const jsxImports = 'import { h, Fragment } from "vue";\n';
        if (!scriptContent.includes(jsxImports) && (attrs.toLowerCase().includes('"ts"') || attrs.toLowerCase().includes('"typescript"') || attrs.toLowerCase().includes('"jsx"') || attrs.toLowerCase().includes('"tsx"') || attrs.toLowerCase().includes("'ts'") || attrs.toLowerCase().includes("'typescript'") || attrs.toLowerCase().includes("'jsx'") || attrs.toLowerCase().includes("'tsx'"))) {
          scriptContent = jsxImports + scriptContent;
        }
        return `<script ${attrs}>${scriptContent}<\/script>`;
      });
      config.customSettings.typescript = {
        ...config.customSettings.typescript,
        jsxFactory: "h",
        jsxFragmentFactory: "Fragment"
      };
      content = await compileAllBlocks(content, config, { prepareFn, skipCompilers });
      let cssModules;
      content = await replaceAsync(
        content,
        stylePattern,
        async (match, attrs, styleContent) => {
          if (!attrs.includes(" module")) {
            return match;
          }
          const cssModulesCompileResult = await compileInCompiler(styleContent, "postcss", {
            ...config,
            processors: ["cssmodules"]
          });
          cssModules = {
            ...cssModules,
            ...cssModulesCompileResult.info.cssModules
          };
          return `<style ${attrs.replace(" module", "")}>${cssModulesCompileResult.code}</style>`;
        }
      );
      return { content, cssModules };
    }
    async function compileTypescript(content, { config }) {
      const exports = exportDefaultImports(content);
      let compiled = (await compileInCompiler(content + exports, "tsx", config)).code || content;
      if (exports) {
        compiled = compiled.replace(exports, "");
      }
      return compiled;
    }
    return async (code, { config, language }) => {
      try {
        const isMainFile = config.markup.language !== "vue-app" || language === "vue-app";
        const filename = isMainFile ? MAIN_FILE : SECONDARY_FILE;
        const result = await compileVueSFC(code, { config, filename });
        if (result) {
          const { css: css2, js } = result;
          const injectCSS = !css2.trim() ? "" : `
document.head.insertBefore(
  Object.assign(document.createElement('style'), { textContent: ${JSON.stringify(css2)} }),
  document.head.getElementsByTagName('style')[0]
);
`;
          const compiledCode = js + injectCSS;
          return {
            code: language === "vue-app" ? `<script type="module">${compiledCode}<\/script>` : compiledCode,
            info: { importedContent, imports: createImportMap(importedContent, config), errors }
          };
        }
        if (errors.length) {
          console.error(...errors);
        }
        const empty = `export default () => {}`;
        return {
          code: language === "vue-app" ? `<script type="module">${empty}<\/script>` : empty,
          info: { errors }
        };
      } catch (err) {
        return {
          code: "",
          info: { errors: [...errors, getErrorMessage(err)] }
        };
      }
    };
  };
})();
