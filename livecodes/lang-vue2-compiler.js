"use strict";
(() => {
  // src/livecodes/utils/utils.ts
  var escapeCode = (code, slash = true) => code.replace(/\\/g, slash ? "\\\\" : "\\").replace(/`/g, "\\`").replace(/<\/script>/g, "<\\/script>");
  var getFileExtension = (file) => file.split(".")[file.split(".").length - 1];

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

  // src/livecodes/languages/vue2/lang-vue2-compiler.ts
  var getLoaderOptions = (defaultCDN) => `const options = {
  moduleCache: {
    vue: Vue,
  },
  pathResolve({ refPath, relPath }) {
    if ( relPath === '.' ) {
      return refPath;
    }
    if ( relPath.startsWith('http') || relPath === 'vue' ) {
      return relPath;
    }
    // relPath is a module name ?
    if ( relPath[0] !== '.' && relPath[0] !== '/' ) {
      const importMapScript = document.querySelector('script[type="importmap"]')?.innerHTML.trim();
      if (importMapScript) {
        try {
          const importMap = JSON.parse(importMapScript);
          if (importMap?.imports?.[relPath]) {
            return importMap.imports[relPath];
          }
        } catch {}
      }
      return '${modulesService.getModuleUrl("", { defaultCDN })}' + relPath;
    }

    return refPath === undefined || !refPath.startsWith('http') ? relPath : String(new URL(relPath, refPath));
  },
  async getFile(url) {
    if (url === '/component.vue') return content;
    const res = await fetch(url);
    if ( !res.ok )
      throw Object.assign(new Error(res.statusText + ' ' + url), { res });
    return await res.text();
  },
  loadModule(path, options) {
    if ( path === 'vue' ) return Vue;
    if ( path.endsWith('.vue') || path.endsWith('.css') || path.endsWith('.scss') ) return;
    if ( !['http://', 'https://'].some(x => path.startsWith(x)) ) return;
    return import(path).catch(() => import(path + '.js'));
  },
  handleModule: async function (type, getContentData, path, options) {
    switch (type) {
      case '.css':
        options.addStyle(await getContentData(false));
        return null;
    }
  },
  addStyle: (textContent) => {
    const style = Object.assign(document.createElement('style'), { textContent });
    const ref = document.head.getElementsByTagName('style')[0] || null;
    document.head.insertBefore(style, ref);
  },
};
`;
  self.createVueCompiler = () => async (code, { config }) => `(() => {
let app = document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement('div'));

/* <!-- */
let content = \`${escapeCode(await compileAllBlocks(code, config))}\`;
/* --> */
${getLoaderOptions(config.customSettings.defaultCDN)}
const { loadModule } = window['vue3-sfc-loader'];
const App = Vue.createApp(Vue.defineAsyncComponent(() => loadModule('/component.vue', options)));
App.mount(app)
App.config.devtools = true;
})();
`;
  self.createVue2Compiler = () => async (code, { config }) => `(() => {
let app = document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement('div'));

/* <!-- */
let content = \`${escapeCode(await compileAllBlocks(code, config))}\`;
/* --> */
${getLoaderOptions(config.customSettings.defaultCDN)}
const { loadModule, vueVersion } = window['vue2-sfc-loader'];
loadModule('/component.vue', options)
.then(component => new Vue(component).$mount(app));
Vue.config.devtools = true;
})();
`;
})();
