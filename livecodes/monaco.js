// src/livecodes/UI/selectors.ts
var getEditorModeNode = () => document.querySelector("#editor-mode");

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
var isFirefox = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes("firefox") || userAgent.includes("fxios");
};
var cloneObject = (x) => (globalThis.structuredClone || ((obj) => JSON.parse(JSON.stringify(obj, (_k, v) => v === void 0 ? null : v))))(x);
var getRandomString = () => String(Math.random()) + "-" + Date.now().toFixed();
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
var removeComments = (src) => src.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1");

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
var isBare = (mod) => !mod.startsWith("https://") && !mod.startsWith("http://") && !mod.startsWith(".") && !mod.startsWith("/") && !mod.startsWith("data:") && !mod.startsWith("blob:");

// src/livecodes/services/utils.ts
var removeCDNPrefix = (url) => {
  if (!url.startsWith("https://"))
    return url;
  const prefixes = [
    "https://esm.sh/",
    "https://cdn.skypack.dev/",
    "https://cdn.jsdelivr.net/npm/",
    "https://fastly.jsdelivr.net/npm/",
    "https://gcore.jsdelivr.net/npm/",
    "https://testingcf.jsdelivr.net/npm/",
    "https://jsdelivr.b-cdn.net/npm/",
    "https://esm.run/",
    "https://esbuild.vercel.app/",
    "https://bundle.run/",
    "https://unpkg.com/",
    "https://npmcdn.com/",
    "https://deno.bundlejs.com/?file&q=",
    "https://jspm.dev/"
  ];
  for (const prefix of prefixes) {
    if (url.startsWith(prefix)) {
      return url.replace(prefix, "");
    }
  }
  return url;
};
var removeSpecifier = (type) => type.includes(":") && !type.startsWith("data:") && !type.startsWith("http") ? type.split(":")[1] : type;

// src/livecodes/services/pkgInfo.ts
var getSearchApiUrl = (query) => `https://ofcncog2cu-dsn.algolia.net/1/indexes/npm-search/${encodeURIComponent(
  query
)}?x-algolia-agent=Browser`;
var algoliaHeaders = {
  "X-Algolia-Application-Id": "OFCNCOG2CU",
  "X-Algolia-API-Key": "f54e21fa3a2a0160595bb058179bfb1e"
};
var attributesToRetrieve = ["name", "description", "homepage", "repository.url", "version"];
var apiEndpoint = "https://data.jsdelivr.com/v1";
var jsDelivrHeaders = {
  // https://github.com/live-codes/livecodes/issues/628
  ...isFirefox() ? {} : { "User-Agent": "https://livecodes.io" }
};
var splitNameVersion = (nameVersion) => {
  const scoped = nameVersion.startsWith("@");
  const str = scoped ? nameVersion.slice(1) : nameVersion;
  const [name, version] = str.split("@");
  return [(scoped ? "@" : "") + name, version];
};
var search = async (query, limit = 10) => {
  const options = {
    page: 0,
    hitsPerPage: limit,
    attributesToHighlight: [],
    attributesToRetrieve,
    analyticsTags: ["jsdelivr"]
  };
  const [name, version] = splitNameVersion(query);
  let exactVersion;
  if (version) {
    const versioned = await addPkgVersion(query);
    if (typeof versioned === "string") {
      exactVersion = splitNameVersion(versioned)[1];
    }
  }
  const data = await fetch(getSearchApiUrl("query"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      ...algoliaHeaders
    },
    body: JSON.stringify({
      query: name,
      ...options
    })
  }).then((res) => {
    if (!res.ok)
      throw new Error("failed to fetch");
    return res;
  }).then((res) => res.json()).catch((err) => ({
    error: true,
    message: err.message || String(err)
  }));
  if ("error" in data) {
    return data;
  }
  const results = data.hits.map((pkg) => {
    if (pkg.name === name && exactVersion) {
      pkg.version = exactVersion;
    }
    if (pkg.repository?.url) {
      pkg.repo = pkg.repository?.url;
    }
    return pkg;
  });
  results.sort((a, b) => a.name === name ? -1 : b.name === name ? 1 : 0);
  return results;
};
var addPkgVersion = async (pkgName) => {
  const url = `${apiEndpoint}/package/resolve/npm/${pkgName}`;
  const data = await fetch(url, { headers: jsDelivrHeaders }).then((res) => {
    if (!res.ok)
      throw new Error("failed to fetch");
    return res;
  }).then((res) => res.json()).catch((err) => ({
    error: true,
    message: err.message || String(err)
  }));
  if ("error" in data) {
    return data;
  }
  const name = splitNameVersion(pkgName)[0];
  const version = data.version;
  return version ? `${name}@${version}` : name;
};
var getPkgInfo = async (pkgName) => {
  const [name, version] = splitNameVersion(removeSpecifier(removeCDNPrefix(pkgName)));
  let exactVersion;
  if (version) {
    const versioned = await addPkgVersion(pkgName);
    if (typeof versioned === "string") {
      exactVersion = splitNameVersion(versioned)[1];
    }
  }
  const url = getSearchApiUrl(name) + "&attributesToRetrieve=" + attributesToRetrieve.join(",");
  const data = await fetch(url, {
    method: "GET",
    headers: algoliaHeaders
  }).then((res) => {
    if (!res.ok)
      throw new Error("failed to fetch");
    return res;
  }).then((res) => res.json()).catch((err) => ({
    error: true,
    message: err.message || String(err)
  }));
  if ("error" in data) {
    return data;
  }
  if (exactVersion) {
    data.version = exactVersion;
  }
  if (data.repository?.url) {
    data.repo = data.repository?.url;
  }
  return data;
};
var getPkgFiles = async (pkgName) => {
  const pkgNameVersion = await addPkgVersion(pkgName);
  const url = `${apiEndpoint}/package/npm/${pkgNameVersion}/flat`;
  const data = await fetch(url, { headers: jsDelivrHeaders }).then((res) => {
    if (!res.ok)
      throw new Error("failed to fetch");
    return res;
  }).then((res) => res.json()).catch((err) => ({
    error: true,
    message: err.message || String(err)
  }));
  if ("error" in data) {
    return data;
  }
  const basePath = `https://cdn.jsdelivr.net/npm/${pkgNameVersion}`;
  return {
    ...data.default ? { default: basePath + data.default } : {},
    files: data.files.map((f) => basePath + f.name)
  };
};
var getPkgDefaultFiles = async (pkgName) => {
  const pkgNameVersion = await addPkgVersion(pkgName);
  const url = `${apiEndpoint}/package/npm/${pkgNameVersion}/entrypoints`;
  const data = await fetch(url, { headers: jsDelivrHeaders }).then((res) => {
    if (!res.ok)
      throw new Error("failed to fetch");
    return res;
  }).then((res) => res.json()).catch((err) => ({
    error: true,
    message: err.message || String(err)
  }));
  if ("error" in data) {
    return data;
  }
  const basePath = `https://cdn.jsdelivr.net/npm/${pkgNameVersion}`;
  return {
    ...data.js?.file ? { js: basePath + data.js?.file } : {},
    ...data.css?.file ? { css: basePath + data.css?.file } : {}
  };
};
var pkgInfoService = {
  search,
  getPkgInfo,
  getPkgFiles,
  getPkgDefaultFiles
};

// src/livecodes/vendors.ts
var { getUrl, getModuleUrl } = modulesService;
var vendorsBaseUrl = (
  // 'http://127.0.0.1:8081/';
  /* @__PURE__ */ getUrl("@live-codes/browser-compilers@0.22.3/dist/")
);
var codeiumProviderUrl = /* @__PURE__ */ getUrl(
  "@live-codes/monaco-codeium-provider@0.2.2/dist/index.js"
);
var emmetMonacoUrl = /* @__PURE__ */ getUrl("emmet-monaco-es@5.5.0/dist/emmet-monaco.js");
var monacoBaseUrl = /* @__PURE__ */ getUrl("@live-codes/monaco-editor@0.3.0/");
var monacoEmacsUrl = /* @__PURE__ */ getUrl("monaco-emacs@0.3.0/dist/monaco-emacs.js");
var monacoThemesBaseUrl = /* @__PURE__ */ getUrl("monaco-themes@0.4.4/themes/");
var monacoVimUrl = /* @__PURE__ */ getUrl("monaco-vim@0.4.1/dist/monaco-vim.js");
var monacoVolarUrl = /* @__PURE__ */ getUrl(
  "@live-codes/monaco-volar@0.1.0/dist/index.js"
);

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
var getCompilerOptions = (language) => {
  const JSLangs = ["javascript", "jsx", "react", "flow", "solid", "react-native"];
  const isJSLang = JSLangs.includes(language);
  const isJsx = hasJsx.includes(language);
  const nonReactJsx = ["solid", "solid.tsx", "stencil", "vue"].includes(language);
  const settings = {
    allowJs: true,
    checkJs: !isJSLang,
    strictNullChecks: !isJSLang,
    allowNonTsExtensions: true,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    allowSyntheticDefaultImports: true,
    allowUmdGlobalAccess: true,
    esModuleInterop: true,
    target: 7,
    // monaco.languages.typescript.ScriptTarget.ES2020,
    module: 99,
    // monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: 2,
    // monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    lib: ["es2021", "dom", "dom.iterable"]
  };
  const jsxSettings = {
    jsx: 4
    // monaco.languages.typescript.JsxEmit.ReactJSX,
    // jsxFactory: 'React.createElement',
    // reactNamespace: 'React',
    // jsxFragmentFactory: 'React.Fragment',
  };
  const nonReactJsxSettings = {
    jsx: 1,
    // monaco.languages.typescript.JsxEmit.Preserve,
    jsxFactory: "h",
    ...["solid", "solid.tsx"].includes(language) ? { jsxImportSource: "solid-js", jsxFactory: "JSX" } : {},
    jsxFragmentFactory: "Fragment"
  };
  return {
    ...settings,
    ...isJsx ? jsxSettings : {},
    ...nonReactJsx ? nonReactJsxSettings : {}
  };
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
var customThemes = [
  {
    name: "custom-vs-light",
    theme: {
      base: "vs",
      inherit: true,
      rules: [{ token: "comment", fontStyle: "italic" }],
      colors: {}
    }
  },
  {
    name: "custom-vs-dark",
    theme: {
      base: "vs-dark",
      inherit: true,
      rules: [{ token: "comment", fontStyle: "italic" }],
      colors: {}
    }
  },
  {
    name: "monochrome",
    theme: {
      base: "vs",
      inherit: false,
      rules: [],
      colors: {
        "editor.foreground": "#24292e",
        "editorBracketHighlight.foreground1": "#24292e",
        "editorBracketHighlight.foreground2": "#24292e",
        "editorBracketHighlight.foreground3": "#24292e",
        "editorBracketHighlight.foreground4": "#24292e",
        "editorBracketHighlight.unexpectedBracket.foreground": "#24292e"
      }
    }
  },
  {
    name: "monochrome-dark",
    theme: {
      base: "vs-dark",
      inherit: false,
      rules: [],
      colors: {
        "editor.foreground": "#e2e2e3",
        "editor.background": "#24292e",
        "editorBracketHighlight.foreground1": "#e2e2e3",
        "editorBracketHighlight.foreground2": "#e2e2e3",
        "editorBracketHighlight.foreground3": "#e2e2e3",
        "editorBracketHighlight.foreground4": "#e2e2e3",
        "editorBracketHighlight.unexpectedBracket.foreground": "#e2e2e3"
      }
    }
  }
];

// src/livecodes/editor/monaco/twoslashSupport.ts
var booleanConfigRegexp = /^\/\/\s?@(\w+)$/;
var valuedConfigRegexp = /^\/\/\s?@(\w+):\s?(.+)$/;
var extractTwoSlashCompilerOptions = (optionDeclarations2) => {
  const optMap = /* @__PURE__ */ new Map();
  if (!optionDeclarations2) {
  } else {
    for (const opt of optionDeclarations2) {
      optMap.set(opt.name.toLowerCase(), opt);
    }
  }
  return (code) => {
    const codeLines = code.split("\n");
    const options = {};
    codeLines.forEach((_line) => {
      let match;
      const line = _line.trim();
      if (match = booleanConfigRegexp.exec(line)) {
        if (optMap.has(match[1].toLowerCase())) {
          options[match[1]] = true;
          setOption(match[1], "true", options, optMap);
        }
      } else if (match = valuedConfigRegexp.exec(line)) {
        if (optMap.has(match[1].toLowerCase())) {
          setOption(match[1], match[2], options, optMap);
        }
      }
    });
    return options;
  };
};
function setOption(name, value, opts, optMap) {
  const opt = optMap.get(name.toLowerCase());
  if (!opt)
    return;
  switch (opt.type) {
    case "number":
    case "string":
    case "boolean":
      opts[opt.name] = parsePrimitive(value, opt.type);
      break;
    case "list":
      const elementType = opt.element.type;
      const strings = value.split(",");
      if (typeof elementType === "string") {
        opts[opt.name] = strings.map((v) => parsePrimitive(v, elementType));
      } else {
        opts[opt.name] = strings.map((v) => getOptionValueFromMap(opt.name, v, elementType)).filter(Boolean);
      }
      break;
    default:
      const optMap2 = opt.type;
      opts[opt.name] = getOptionValueFromMap(opt.name, value, optMap2);
  }
}
function parsePrimitive(value, type) {
  switch (type) {
    case "number":
      return +value;
    case "string":
      return value;
    case "boolean":
      return value.toLowerCase() === "true" || value.length === 0;
  }
}
function getOptionValueFromMap(_name, key, optMap) {
  const result = optMap.get(key.toLowerCase());
  return result;
}
var twoslashCompletions = (optionDeclarations2) => (model, position, _token) => {
  const result = [];
  const thisLine = model.getValueInRange({
    startLineNumber: position.lineNumber,
    startColumn: 0,
    endLineNumber: position.lineNumber,
    endColumn: position.column
  });
  if (!thisLine.startsWith("//")) {
    return { suggestions: [] };
  }
  const words = thisLine.replace("	", "").split(" ");
  if (words.length !== 2) {
    return { suggestions: [] };
  }
  const word = words[1];
  if (word.startsWith("-")) {
    return {
      suggestions: [
        {
          label: "---cut---",
          kind: 14,
          detail: "Twoslash split output",
          insertText: "---cut---".replace(word, "")
        }
      ]
    };
  }
  if (!word.startsWith("@")) {
    return { suggestions: [] };
  }
  const knowns = [
    "noErrors",
    "errors",
    "showEmit",
    "showEmittedFile",
    "noStaticSemanticInfo",
    "emit",
    "noErrorValidation",
    "filename"
  ];
  const optsNames = (optionDeclarations2 || []).map((o) => o.name);
  knowns.concat(optsNames).forEach((name) => {
    if (name.startsWith(word.slice(1))) {
      result.push({
        label: name,
        kind: 14,
        detail: "Twoslash comment",
        insertText: name
      });
    }
  });
  return {
    suggestions: result
  };
};

// src/livecodes/editor/monaco/register-twoslash.ts
var optionDeclarations;
var registerTwoSlash = async ({
  isJSLang,
  editor,
  monaco: monaco2,
  compilerOptions
}) => {
  const language = isJSLang ? "javascript" : "typescript";
  const getWorker = isJSLang ? monaco2.languages.typescript.getJavaScriptWorker : monaco2.languages.typescript.getTypeScriptWorker;
  const defaults = isJSLang ? monaco2.languages.typescript.javascriptDefaults : monaco2.languages.typescript.typescriptDefaults;
  const model = editor.getModel();
  optionDeclarations = optionDeclarations || await window.compiler.typescriptFeatures({ feature: "getOptionDeclarations" });
  if (!window.isTwoslashCompletionsRegistered) {
    const langs = ["javascript", "typescript"];
    langs.forEach((l) => {
      monaco2.languages.registerCompletionItemProvider(l, {
        triggerCharacters: ["@", "/", "-"],
        provideCompletionItems: twoslashCompletions(optionDeclarations)
      });
    });
    window.isTwoslashCompletionsRegistered = true;
  }
  const updateCompilerSettings = (opts) => {
    const newKeys = Object.keys(opts);
    if (!newKeys.length)
      return;
    newKeys.forEach((key) => {
      if (compilerOptions[key] === opts[key])
        delete opts[key];
    });
    if (!Object.keys(opts).length)
      return;
    compilerOptions = { ...compilerOptions, ...opts };
    defaults.setCompilerOptions(compilerOptions);
  };
  const getTwoSlashCompilerOptions = extractTwoSlashCompilerOptions(optionDeclarations);
  const textUpdated = () => {
    const code = editor.getModel()?.getValue();
    if (!code)
      return;
    const configOpts = getTwoSlashCompilerOptions(code);
    updateCompilerSettings(configOpts);
  };
  textUpdated();
  const getWorkerProcess = async () => {
    if (!model)
      return;
    const worker = await getWorker();
    return worker(model.uri);
  };
  const createTwoslashInlayProvider = () => {
    const provider = {
      provideInlayHints: async (model2, _, cancel) => {
        const text = model2.getValue();
        const queryRegex = /^\s*\/\/\s*\^\?$/gm;
        let match;
        const results = [];
        const worker = await getWorkerProcess();
        if (!worker || model2.isDisposed()) {
          return {
            hints: [],
            dispose: () => void 0
          };
        }
        while ((match = queryRegex.exec(text)) !== null) {
          if (cancel.isCancellationRequested || model2.isDisposed()) {
            return {
              hints: [],
              dispose: () => void 0
            };
          }
          const end = match.index + match[0].length - 1;
          const endPos = model2.getPositionAt(end);
          const inspectionPos = new monaco2.Position(endPos.lineNumber - 1, endPos.column);
          const inspectionOff = model2.getOffsetAt(inspectionPos);
          const hint = await worker.getQuickInfoAtPosition(
            "file://" + model2.uri.path,
            inspectionOff
          );
          if (!hint || !hint.displayParts)
            continue;
          let text2 = hint.displayParts.map((d) => d.text).join("").replace(/\\n/g, "").replace(/  /g, "");
          if (text2.length > 120)
            text2 = text2.slice(0, 119) + "...";
          const inlay = {
            // @ts-ignore
            kind: 0,
            position: new monaco2.Position(endPos.lineNumber, endPos.column + 1),
            label: text2,
            paddingLeft: true
          };
          results.push(inlay);
        }
        return {
          hints: results,
          dispose: () => void 0
        };
      }
    };
    return provider;
  };
  window.inlayHintRegistered = window.inlayHintRegistered || /* @__PURE__ */ new Set();
  if (!window.inlayHintRegistered.has(language)) {
    monaco2.languages.registerInlayHintsProvider(language, createTwoslashInlayProvider());
    window.inlayHintRegistered.add(language);
    editor.getModel()?.onDidChangeContent(textUpdated);
  }
};

// src/livecodes/editor/monaco/monaco.ts
var monacoGloballyLoaded = false;
var disposeEmmet = {};
var monaco;
var loadedThemes = /* @__PURE__ */ new Set();
var codeiumProvider;
var editors = [];
var tailwindcssConfig;
var vueRegistered = false;
var shikiThemes = {};
var createEditor = async (options) => {
  const {
    container,
    baseUrl,
    readonly,
    theme,
    editorTheme,
    isEmbed,
    getLanguageExtension,
    mapLanguage,
    getFormatterConfig,
    getFontFamily
  } = options;
  let language = options.language;
  if (!container)
    throw new Error("editor container not found");
  const loadMonaco = () => import(monacoBaseUrl + "monaco.js");
  let editorMode;
  let currentTheme = theme;
  let currentEditorTheme = editorTheme;
  const convertOptions = (opt) => ({
    fontFamily: getFontFamily(opt.fontFamily),
    fontSize: opt.fontSize || (isEmbed ? 12 : 14),
    insertSpaces: !opt.useTabs,
    detectIndentation: false,
    tabSize: opt.tabSize,
    lineNumbers: opt.lineNumbers === "relative" ? "relative" : opt.lineNumbers ? "on" : "off",
    wordWrap: opt.wordWrap ? "on" : "off",
    autoClosingBrackets: opt.closeBrackets ? "always" : "never",
    autoClosingQuotes: opt.closeBrackets ? "always" : "never",
    autoClosingDelete: opt.closeBrackets ? "always" : "never"
  });
  const baseOptions = convertOptions(options);
  const monacoMapLanguage = (language2) => language2 === "livescript" ? "coffeescript" : ["rescript", "reason", "ocaml"].includes(language2) ? "csharp" : language2.startsWith("vue") ? "vue" : ["svelte", "malina", "riot"].includes(language2) ? "razor" : mapLanguage(language2);
  try {
    window.monaco = window.monaco || (await loadMonaco()).monaco;
    monaco = window.monaco;
  } catch {
    throw new Error("Failed to load monaco editor");
  }
  customThemes.forEach((t) => monaco.editor.defineTheme(t.name, t.theme));
  const loadTheme = async (theme2, editorTheme2) => {
    const selectedTheme = getEditorTheme({
      editor: "monaco",
      editorTheme: editorTheme2,
      theme: theme2,
      editorThemes: monacoThemes.map((t) => t.name)
    });
    const newTheme = selectedTheme === "vs" ? "custom-vs-light" : selectedTheme === "vs-dark" ? "custom-vs-dark" : !selectedTheme ? "custom-vs-" + theme2 : selectedTheme;
    if (loadedThemes.has(newTheme))
      return newTheme;
    const themeData = monacoThemes.find((t) => t.name === newTheme);
    if (themeData?.url) {
      await fetch(themeData.url).then((data) => data.json()).then((data) => {
        monaco.editor.defineTheme(newTheme, data);
        loadedThemes.add(newTheme);
      });
    }
    return newTheme;
  };
  const setTheme = (theme2, editorTheme2) => {
    loadTheme(theme2, editorTheme2).then((newTheme) => {
      monaco.editor.setTheme(shikiThemes[newTheme] ?? newTheme);
      currentTheme = theme2;
      currentEditorTheme = editorTheme2;
    });
  };
  const isAndroid = navigator && /android/i.test(navigator.userAgent);
  const defaultOptions = {
    theme: await loadTheme(theme, editorTheme),
    fontLigatures: true,
    formatOnType: false,
    lineNumbersMinChars: 3,
    minimap: { enabled: false },
    scrollbar: { useShadows: false },
    mouseWheelZoom: false,
    automaticLayout: true,
    readOnly: readonly,
    fixedOverflowWidgets: true,
    lightbulb: {
      enabled: "on"
    },
    quickSuggestions: {
      other: !isAndroid,
      comments: !isAndroid,
      strings: !isAndroid
    },
    acceptSuggestionOnCommitCharacter: !isAndroid,
    acceptSuggestionOnEnter: !isAndroid ? "on" : "off",
    inlayHints: {
      enabled: "on"
    }
  };
  const codeblockOptions = {
    ...defaultOptions,
    scrollBeyondLastLine: false,
    contextmenu: false
  };
  const compiledCodeOptions = {
    ...defaultOptions,
    scrollBeyondLastLine: false
  };
  const consoleOptions = {
    ...defaultOptions,
    glyphMargin: true,
    folding: false,
    lineDecorationsWidth: 0,
    lineNumbers: "off",
    lineNumbersMinChars: 0,
    scrollbar: {
      vertical: "auto"
    },
    scrollBeyondLastLine: false,
    contextmenu: false
  };
  const embedOptions = {
    ...consoleOptions
  };
  const editorId = options.editorId;
  const initOptions = editorId === "console" ? consoleOptions : editorId === "compiled" ? compiledCodeOptions : editorId === "embed" ? embedOptions : options.mode === "codeblock" ? codeblockOptions : defaultOptions;
  let editorOptions = cloneObject({ ...baseOptions, ...initOptions });
  const configureTypeScriptFeatures = () => {
    const JSLangs = ["javascript", "jsx", "react", "flow", "solid", "react-native"];
    const isJSLang = JSLangs.includes(language);
    if (!["script", "tests", "editorSettings"].includes(editorId) || !["javascript", "typescript"].includes(monacoMapLanguage(language))) {
      return;
    }
    const compilerOptions = getCompilerOptions(language);
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions(compilerOptions);
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions(compilerOptions);
    const diagnosticsOptions = {
      // just silence errors for "flow" for now
      // TODO: fix this
      // https://github.com/facebook/flow/tree/main/website/src/try-flow
      noSemanticValidation: language === "flow",
      // This is when tslib is not found
      diagnosticCodesToIgnore: [2354]
    };
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(diagnosticsOptions);
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(diagnosticsOptions);
    registerTwoSlash({ isJSLang, editor, monaco, compilerOptions });
  };
  const listeners = [];
  const updateListeners = () => {
    listeners.forEach((fn) => editor.getModel()?.onDidChangeContent(fn));
  };
  const customLanguages = {
    astro: baseUrl + "monaco-lang-astro.js",
    clio: baseUrl + "monaco-lang-clio.js",
    imba: baseUrl + "monaco-lang-imba.js",
    // sql: baseUrl + 'monaco-lang-sql.js', // TODO: add autocomplete
    wat: baseUrl + "monaco-lang-wat.js"
  };
  const addVueSupport = async () => {
    if (vueRegistered)
      return;
    vueRegistered = true;
    const { registerVue, registerHighlighter } = await import(monacoVolarUrl);
    const tsCompilerOptions = { ...getCompilerOptions("vue"), jsx: "preserve" };
    await registerVue({ editor, monaco, tsCompilerOptions, silent: true });
    shikiThemes = registerHighlighter(monaco);
    shikiThemes["custom-vs-light"] = shikiThemes.vs;
    shikiThemes["custom-vs-dark"] = shikiThemes["vs-dark"];
    setTheme(currentTheme, currentEditorTheme);
  };
  const loadMonacoLanguage = async (lang) => {
    if (monacoMapLanguage(lang) === "vue") {
      await addVueSupport();
      return;
    }
    const langUrl = customLanguages[lang];
    if (langUrl && !monaco.languages.getLanguages().find((l) => l.id === lang)) {
      const mod = (await import(langUrl)).default;
      monaco.languages.register({ id: lang });
      if (mod.config) {
        monaco.languages.setLanguageConfiguration(lang, mod.config);
      }
      if (mod.tokens) {
        monaco.languages.setMonarchTokensProvider(lang, mod.tokens);
      }
    }
  };
  let modelUri = "";
  const setModel = (editor2, value, language2) => {
    const random = getRandomString();
    const ext = getLanguageExtension(language2);
    const extension = monacoMapLanguage(language2) === "typescript" && !ext?.endsWith("ts") && !ext?.endsWith("tsx") ? ext + ".tsx" : ext;
    modelUri = `file:///${editorId}.${random}.${extension}`;
    const oldModel = editor2.getModel();
    const model = monaco.editor.createModel(
      value || "",
      monacoMapLanguage(language2),
      monaco.Uri.parse(modelUri)
    );
    editor2.setModel(model);
    setTimeout(() => oldModel?.dispose(), 1e3);
    updateListeners();
    configureTypeScriptFeatures();
  };
  const editor = monaco.editor.create(container, {
    ...editorOptions,
    language: language.startsWith("vue") ? "html" : monacoMapLanguage(language)
  });
  setModel(editor, options.value, language.startsWith("vue") ? "html" : language);
  loadMonacoLanguage(language);
  if (language.startsWith("vue")) {
    setTimeout(() => {
      setLanguage(language);
    }, 50);
  }
  const getOrCreateModel = (value, lang, uri) => {
    const model = monaco.editor.getModel(uri);
    if (model) {
      model.setValue(value);
      return model;
    }
    return monaco.editor.createModel(value, lang, uri);
  };
  const contentEditors = ["markup", "style", "script", "tests"];
  if (contentEditors.includes(editorId)) {
    editors.push(editor);
  }
  if (editorOptions.theme === "vs-light")
    container.style.backgroundColor = "#fff";
  if (editorOptions.theme?.startsWith("http") || editorOptions.theme?.startsWith("./")) {
    fetch(editorOptions.theme).then((res) => res.json()).then((data) => {
      monaco.editor.defineTheme("theme", data);
      monaco.editor.setTheme("theme");
      container.style.backgroundColor = data.colors["editor.background"];
    });
  }
  const getEditorId = () => editorId;
  const getValue = () => editor.getValue();
  const setValue = (value = "") => {
    editor.getModel()?.setValue(value);
  };
  let types = [];
  const isEditorType = (type) => !type.filename.startsWith("/node_modules/");
  const addTypes = (type, force) => {
    const code = type.content;
    const path = "file://" + type.filename;
    const loadedType = types.find((t) => t.filename === type.filename);
    if (loadedType) {
      if (isEditorType(type)) {
        loadedType.libJs.dispose();
        loadedType.libJs = monaco.languages.typescript.javascriptDefaults.addExtraLib(code, path);
      }
      if (!force)
        return;
      loadedType.libJs?.dispose();
      loadedType.libTs?.dispose();
    }
    types.push({
      editorId,
      filename: type.filename,
      libJs: monaco.languages.typescript.javascriptDefaults.addExtraLib(code, path),
      libTs: isEditorType(type) ? {
        // avoid duplicate declarations for typescript
        dispose: () => {
        }
      } : monaco.languages.typescript.typescriptDefaults.addExtraLib(code, path)
    });
  };
  let scriptModel;
  const createScriptModel = () => {
    if (editorId !== "tests")
      return;
    let scriptLanguage = "javascript";
    const scriptEditor = editors.find((editor2) => {
      const editorLang = editor2.getModel()?.getLanguageId();
      scriptLanguage = editorLang || "javascript";
      return ["javascript", "typescript"].includes(editorLang);
    });
    if (!scriptEditor)
      return;
    const ext = scriptLanguage === "typescript" ? "tsx" : "jsx";
    scriptModel = getOrCreateModel(
      scriptEditor.getValue(),
      scriptLanguage,
      monaco.Uri.parse("script." + ext)
    );
  };
  createScriptModel();
  const addDeclarations = () => {
    if (editorId !== "script")
      return;
    const declarations = `
    declare module 'https://*';
    declare module 'data:*';
    declare module './*';
    `;
    getOrCreateModel(declarations, void 0, monaco.Uri.parse("file:///declarations.d.ts"));
  };
  addDeclarations();
  const clearTypes = (allTypes = true) => {
    scriptModel?.dispose();
    if (editorId === "tests")
      return;
    types.filter((type) => type.editorId === editorId).filter((type) => allTypes ? true : isEditorType(type)).forEach((type) => {
      type.libJs.dispose();
      type.libTs.dispose();
    });
    types = types.filter((type) => type.editorId !== editorId).filter((type) => allTypes ? false : !isEditorType(type));
  };
  const getLanguage = () => language;
  const setLanguage = (lang, value) => {
    language = lang;
    clearTypes(false);
    const valueToInsert = value ?? editor.getValue();
    if (monacoMapLanguage(lang) === "vue") {
      setValue(valueToInsert);
    } else {
      setModel(editor, valueToInsert, language);
    }
    loadMonacoLanguage(lang).then(() => {
      if (monacoMapLanguage(lang) === "vue") {
        setModel(editor, editor.getValue(), language);
      }
    });
  };
  const focus = () => editor.focus();
  const layout = () => editor.layout();
  const onContentChanged = (fn) => {
    listeners.push(fn);
    editor.getModel()?.onDidChangeContent(fn);
  };
  const keyCodes = {
    // eslint-disable-next-line
    CtrlEnter: monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
    // eslint-disable-next-line
    ShiftEnter: monaco.KeyMod.Shift | monaco.KeyCode.Enter,
    Enter: monaco.KeyCode.Enter,
    UpArrow: monaco.KeyCode.UpArrow,
    DownArrow: monaco.KeyCode.DownArrow,
    // eslint-disable-next-line
    ShiftAltF: monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF
  };
  const addKeyBinding = (label, keybinding, callback) => {
    editor.addAction({
      id: label,
      label,
      keybindings: [keybinding],
      precondition: "!suggestWidgetVisible && !markersNavigationVisible && !findWidgetVisible",
      run: callback
    });
  };
  const configureEditorMode = async (mode) => {
    const editorModeNode = getEditorModeNode();
    const statusNode = document.querySelector(
      `#editor-status [data-status="${options.editorId}"]`
    );
    const setEditorModeText = (str) => {
      if (!editorModeNode)
        return;
      editorModeNode.textContent = str;
    };
    const setStatusText = (str) => {
      if (!statusNode)
        return;
      statusNode.textContent = str;
    };
    if (!mode) {
      editorMode?.dispose();
      editorMode = void 0;
      setStatusText("");
      setEditorModeText("");
      return;
    }
    if (mode === "vim") {
      if (editorMode?.mode === "vim")
        return;
      if (editorMode?.mode === "emacs") {
        editorMode.dispose();
        setStatusText("");
      }
      const MonacoVim = await loadScript(monacoVimUrl, "MonacoVim");
      const stNode = statusNode?.innerHTML !== "" ? void 0 : statusNode;
      editorMode = MonacoVim.initVimMode(editor, stNode);
      editorMode.mode = "vim";
      setEditorModeText("Vim");
    }
    if (mode === "emacs") {
      if (editorMode?.mode === "emacs")
        return;
      if (editorMode?.mode === "vim") {
        editorMode.dispose();
        setStatusText("");
      }
      const MonacoEmacs = await loadScript(monacoEmacsUrl, "MonacoEmacs");
      editorMode = new MonacoEmacs.EmacsExtension(editor);
      setStatusText("");
      editorMode.onDidMarkChange(function(ev) {
        setStatusText(ev ? "Mark Set!" : "Mark Unset");
      });
      editorMode.onDidChangeKey(function(str) {
        setStatusText(str);
      });
      editorMode.start();
      editorMode.mode = "emacs";
      setEditorModeText("Emacs");
    }
  };
  configureEditorMode(options.editorMode);
  const registerFormatter = (formatFn) => {
    let editorModel = editor.getModel();
    if (!formatFn || !editorModel)
      return;
    monaco.languages.registerDocumentFormattingEditProvider(monacoMapLanguage(language), {
      provideDocumentFormattingEdits: async () => {
        let currentEditor = editor;
        if (!editor.getModel()) {
          currentEditor = editors.find((ed) => ed.getModel()?.getLanguageId() === monacoMapLanguage(language)) || editor;
        }
        editorModel = currentEditor.getModel();
        if (!editorModel)
          return [];
        const val = currentEditor.getValue() || "";
        const prettyVal = await formatFn(val, 0, getFormatterConfig());
        return [
          {
            range: editorModel.getFullModelRange(),
            text: prettyVal.formatted
          }
        ];
      }
    });
  };
  const format = async () => editor.getAction("editor.action.formatDocument")?.run();
  const configureEmmet = (enabled) => {
    if (!enabled && !window.emmetMonaco)
      return;
    loadScript(emmetMonacoUrl, "emmetMonaco").then((emmetMonaco) => {
      if (enabled) {
        if (!disposeEmmet.html || disposeEmmet.disabled) {
          disposeEmmet.html = emmetMonaco.emmetHTML(monaco, [
            "html",
            "php",
            "astro",
            "markdown",
            "mdx"
          ]);
          disposeEmmet.css = emmetMonaco.emmetCSS(monaco, ["css", "scss", "less"]);
          disposeEmmet.jsx = emmetMonaco.emmetJSX(monaco, [
            "javascript",
            "typescript",
            "jsx",
            "tsx"
          ]);
          disposeEmmet.disabled = false;
        }
      } else {
        disposeEmmet.html?.();
        disposeEmmet.css?.();
        disposeEmmet.jsx?.();
        disposeEmmet.disabled = true;
      }
    });
  };
  const configureTailwindcss = (enabled) => {
    if (!enabled) {
      tailwindcssConfig?.dispose();
      tailwindcssConfig = void 0;
      return;
    }
    if (tailwindcssConfig)
      return;
    tailwindcssConfig = true;
    import(vendorsBaseUrl + "tailwindcss/monaco-tailwindcss.js").then(
      ({ configureMonacoTailwindcss, tailwindcssData }) => {
        monaco.languages.css.cssDefaults.setOptions({
          data: {
            dataProviders: {
              tailwindcssData
            }
          }
        });
        tailwindcssConfig = configureMonacoTailwindcss(monaco);
      }
    );
  };
  const changeSettings = (settings) => {
    editorOptions = {
      ...convertOptions(settings),
      ...initOptions
    };
    configureEmmet(settings.emmet);
    configureEditorMode(settings.editorMode);
    editor.updateOptions(editorOptions);
    setTheme(settings.theme, settings.editorTheme);
    configureCodeium(settings.enableAI);
  };
  const undo = () => {
    editor.getModel()?.undo?.();
  };
  const redo = () => {
    editor.getModel()?.redo?.();
  };
  const getPosition = () => {
    const position = editor.getPosition();
    return {
      lineNumber: position?.lineNumber ?? 1,
      column: position?.column ?? 1
    };
  };
  const setPosition = (position) => {
    const newPosition = {
      lineNumber: position.lineNumber,
      column: position.column ?? 1
    };
    editor.setPosition(newPosition);
    setTimeout(() => editor.revealPositionInCenter(newPosition, 0), 50);
  };
  const foldRegions = async () => {
    const model = editor.getModel();
    if (!model)
      return;
    const regionRegExp = /\/\/#region[\s\S]*?\/\/#endregion/g;
    let matches;
    while ((matches = regionRegExp.exec(model.getValue())) !== null) {
      const startLineNumber = model.getPositionAt(matches.index).lineNumber;
      const endLineNumber = model.getPositionAt(matches.index + matches[0].length).lineNumber;
      editor.setSelection(new monaco.Selection(startLineNumber, 1, endLineNumber + 1, 1));
      await editor.getAction("editor.createFoldingRangeFromSelection")?.run();
    }
  };
  const foldLines = async (linesToFold) => {
    for (const lines of linesToFold) {
      const startLine = lines.from ?? 0;
      const endLine = lines.to ?? editor.getModel().getLineCount();
      if (startLine < 0 || endLine < 0 || startLine > endLine)
        continue;
      editor.setSelection(new monaco.Selection(startLine, 1, endLine + 1, 1));
      await editor.getAction("editor.createFoldingRangeFromSelection")?.run();
    }
  };
  const configureCodeium = (enabled) => {
    if (!enabled) {
      codeiumProvider?.dispose();
      codeiumProvider = void 0;
      return;
    }
    if (codeiumProvider) {
      return;
    }
    codeiumProvider = { dispose: () => "loading..." };
    import(codeiumProviderUrl).then((codeiumModule) => {
      codeiumProvider = codeiumModule.registerCodeiumProvider(monaco, {
        getEditors: () => editors
      });
    });
  };
  const destroy = () => {
    editors = editors.filter((e) => e !== editor);
    editorMode?.dispose();
    listeners.length = 0;
    clearTypes(true);
    editor.getModel()?.dispose();
    editor.dispose();
    container.innerHTML = "";
  };
  window.addEventListener("unhandledrejection", function(event) {
    if (event.reason && event.reason.name === "Canceled") {
      event.preventDefault();
    }
  });
  const addCloseTag = (event) => {
    const addCloseLanguages = ["html", "markdown", "javascript", "typescript"];
    const model = editor.getModel();
    if (!model || !addCloseLanguages.includes(monacoMapLanguage(language)) || monacoMapLanguage(language) === "typescript" && !hasJsx.includes(language) || // avoid autocompleting TS generics
    editorOptions.autoClosingBrackets === "never") {
      return;
    }
    const isSelfClosing = (tag) => [
      "area",
      "base",
      "br",
      "col",
      "command",
      "embed",
      "hr",
      "img",
      "input",
      "keygen",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr",
      "circle",
      "ellipse",
      "line",
      "path",
      "polygon",
      "polyline",
      "rect",
      "stop",
      "use"
    ].includes(tag);
    if (event.browserEvent.key === ">") {
      const currentSelections = editor.getSelections() || [];
      const edits = [];
      const newSelections = [];
      for (const selection of currentSelections) {
        newSelections.push(
          new monaco.Selection(
            selection.selectionStartLineNumber,
            selection.selectionStartColumn + 1,
            selection.endLineNumber,
            selection.endColumn + 1
          )
        );
        const contentBeforeChange = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: selection.endLineNumber,
          endColumn: selection.endColumn
        });
        const match = contentBeforeChange.match(/<([\w-]+)(?![^>]*\/>)[^>]*$/);
        if (!match) {
          continue;
        }
        const [fullMatch, tag] = match;
        if (isSelfClosing(tag) || fullMatch.trim().endsWith("/")) {
          continue;
        }
        edits.push({
          range: {
            startLineNumber: selection.endLineNumber,
            startColumn: selection.endColumn + 1,
            // add 1 to offset for the inserting '>' character
            endLineNumber: selection.endLineNumber,
            endColumn: selection.endColumn + 1
          },
          text: `</${tag}>`
        });
      }
      setTimeout(() => {
        editor.executeEdits(model.getValue(), edits, newSelections);
      }, 0);
    }
  };
  editor.onKeyDown(addCloseTag);
  const registerShowPackageInfo = () => {
    const pkgCache = /* @__PURE__ */ new Map();
    const npmPackageHoverProvider = {
      provideHover(model, position) {
        const content = model.getLineContent(position.lineNumber);
        let pkg = getImports(
          content,
          /* removeSpecifier= */
          true
        )[0];
        if (!pkg)
          return;
        if (pkg.startsWith("https://") || pkg.startsWith("http://") || pkg.startsWith(".") || pkg.startsWith("data:") || pkg.startsWith("blob:")) {
          return;
        }
        const parts = pkg.split("/");
        const end = parts[0].startsWith("@") ? 2 : 1;
        pkg = parts.slice(0, end).join("/");
        return (async () => {
          let pkgInfo;
          if (!pkgCache.has(pkg)) {
            pkgInfo = await pkgInfoService.getPkgInfo(pkg);
            if ("error" in pkgInfo)
              return;
            pkgCache.set(pkg, pkgInfo);
          } else {
            pkgInfo = pkgCache.get(pkg);
          }
          if (!pkgInfo || "error" in pkgInfo)
            return;
          const { name, description = "", repo = "" } = pkgInfo;
          return {
            contents: [
              {
                value: `## [${name}](https://www.npmjs.com/package/${name})
${description}


${repo ? `[GitHub](${repo}) |` : ""} [Skypack](https://skypack.dev/view/${name}) | [jsDelivr](https://www.jsdelivr.com/package/npm/${name}) | [Unpkg](https://unpkg.com/browse/${name}/) | [Snyk](https://snyk.io/advisor/npm-package/${name}) | [Bundlephobia](https://bundlephobia.com/package/${name})

Docs: [Importing modules](${new URL("http://localhost:3000/docs/", location.href).href}features/module-resolution)`
              }
            ]
          };
        })();
      }
    };
    monaco.languages.registerHoverProvider("javascript", npmPackageHoverProvider);
    monaco.languages.registerHoverProvider("typescript", npmPackageHoverProvider);
    monaco.languages.registerHoverProvider("html", npmPackageHoverProvider);
  };
  if (!monacoGloballyLoaded) {
    registerShowPackageInfo();
  }
  monacoGloballyLoaded = true;
  return {
    getValue,
    setValue,
    getLanguage,
    setLanguage,
    getEditorId,
    focus,
    getPosition,
    setPosition,
    foldRegions,
    foldLines,
    layout,
    addTypes,
    changeSettings,
    configureTailwindcss,
    onContentChanged,
    keyCodes,
    addKeyBinding,
    registerFormatter,
    format,
    isReadonly: readonly,
    setTheme,
    undo,
    redo,
    destroy,
    monaco: editor
  };
};
export {
  createEditor
};
