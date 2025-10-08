"use strict";
(() => {
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
  var removeComments = (src) => src.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1");
  var getLanguageCustomSettings = (language, config) => ({
    ...config.customSettings[language]
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

  // src/livecodes/vendors.ts
  var { getUrl, getModuleUrl } = modulesService;
  var astroBaseUrl = /* @__PURE__ */ getUrl("@hatemhosny/astro-internal@0.0.4/");
  var astroWasmURL = /* @__PURE__ */ getUrl("@astrojs/compiler@0.9.2/astro.wasm");

  // src/livecodes/languages/astro/lang-astro-compiler.ts
  var internalURL = astroBaseUrl + "index.min.js";
  var compileFrontmatter = async (code, config) => {
    code = replaceImports(code, config);
    const pattern = /^---((?:.|\n|\r)*)---((?:.|\n|\r)*)/;
    const frontmatter = code.trim().match(new RegExp(pattern))?.[1];
    if (!frontmatter)
      return code;
    const compiled = (await compileInCompiler(frontmatter, "typescript", config)).code;
    return code.trim().replace(new RegExp(pattern), `---
${compiled}
---
$2`);
  };
  self.createAstroCompiler = () => {
    const { transform, initialize, renderAstroToHTML } = self.astroCompiler;
    const compilerReady = initialize({ wasmURL: astroWasmURL });
    return async (code, { config }) => {
      await compilerReady;
      const processedCode = await compileFrontmatter(code, config);
      const result = await transform(processedCode, {
        sourcefile: "file.astro",
        sourcemap: false,
        internalURL,
        // site: location.href,
        ...getLanguageCustomSettings("astro", config)
      });
      const output = await renderAstroToHTML(result.code);
      if (output.errors) {
        for (const err of output.errors) {
          console.warn(err);
        }
        return "";
      }
      return output;
    };
  };
})();
