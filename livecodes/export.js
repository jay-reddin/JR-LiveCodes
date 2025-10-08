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
var escapeScript = (code) => code.replace(/<\/script>/g, "<\\/script>");
var safeName = (name, symbol = "_") => name.replace(/[\W]+/g, symbol);
var downloadFile = (filename, extension, content) => {
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = content;
  a.download = safeName(filename) + "." + extension;
  a.click();
  a.remove();
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
var removeComments = (src) => src.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1");

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

// src/livecodes/export/utils.ts
var getFilesFromConfig = (config, {
  getLanguageExtension
}) => {
  const filenames = {
    markup: "index",
    style: "style",
    script: "script"
  };
  const codeFiles = Object.keys(filenames).reduce((files, editorId) => {
    const filename = filenames[editorId];
    const language = config[editorId].language;
    const extension = getLanguageExtension?.(language) || "md";
    const content = config[editorId].content || "";
    return {
      ...files,
      ...content ? { [filename + "." + extension]: { content } } : {}
    };
  }, {});
  const externalStyles = config.stylesheets.length > 0 ? {
    styles: {
      content: config.stylesheets.map((url) => `<link rel="stylesheet" href="${url}" />`).join("\n")
    }
  } : void 0;
  const externalScripts = config.scripts.length > 0 ? {
    scripts: {
      content: config.scripts.map((url) => `<script src="${url}"><\/script>`).join("\n")
    }
  } : void 0;
  const tests = config.tests?.content ? {
    ["script.spec." + getLanguageExtension?.(config.tests?.language) || "ts"]: {
      content: config.tests?.content
    }
  } : void 0;
  return {
    ...codeFiles,
    ...externalStyles,
    ...externalScripts,
    ...tests
  };
};
var getDescriptionFile = (config, user, url, gist = true) => {
  const githubUrl = gist ? "https://gist.github.com/" : "https://github.com/";
  const displayName = user?.displayName || user?.username;
  const userInfo = !displayName ? "" : !user.username ? "by " + displayName : "by [" + displayName + "](" + githubUrl + user.username + ")";
  const projectInfo = url ? `[project](https://livecodes.io/?x=${url})` : "project";
  return {
    [safeName(config.title) + ".md"]: {
      content: `# ${config.title}
A ${projectInfo} created ${userInfo} on [LiveCodes](https://livecodes.io).`
    }
  };
};
var getCompilerScripts = ({
  baseUrl,
  editorId,
  config,
  compiled,
  supportedLanguages,
  getLanguageCompiler
}) => {
  if (supportedLanguages[editorId].includes(config[editorId].language))
    return [];
  const compilerScripts = getLanguageCompiler?.(config[editorId].language)?.scripts;
  const compiledCode = config[editorId].language === "python" ? config[editorId].content || "" : compiled[editorId];
  const scripts = typeof compilerScripts === "function" ? compilerScripts({ compiled: compiledCode, baseUrl, config }) : compilerScripts;
  return scripts?.filter((url) => url.startsWith("https://")) || [];
};
var getContent = ({
  editorId,
  config,
  compiled,
  supportedLanguages,
  getLanguageCompiler
}) => {
  const isScriptSupported = ["javascript", "jsx", "tsx", ...supportedLanguages.script].includes(
    config.script.language
  );
  const content = {
    markup: ["html", ...supportedLanguages.markup].includes(config.markup.language) ? config.markup.content : compiled.markup,
    style: ["css", ...supportedLanguages.style].includes(config.style.language) ? config.style.content : compiled.style,
    script: config.script.language === "php" ? config.script.content?.replace(/<\?php/g, "") || "" : config.script.language === "python" ? config.script.content : replaceImports(
      (isScriptSupported ? config.script.content : compiled.script) || "",
      config
    )
  };
  const scriptType = getLanguageCompiler?.(config.script.language)?.scriptType;
  if (!isScriptSupported && scriptType && scriptType !== "module") {
    if (editorId === "markup") {
      return content.markup + `
<script type="${scriptType}">
${escapeScript(content.script || "")}
<\/script>
`;
    }
    if (editorId === "script") {
      if (config.script.language === "python") {
        return 'window.addEventListener("load", () => {brython()});';
      }
      return "";
    }
  }
  return content[editorId] || "";
};

// src/livecodes/export/export-codepen.ts
var exportCodepen = (config, {
  baseUrl,
  compiled,
  deps
}) => {
  const form = document.createElement("form");
  form.action = "https://codepen.io/pen/define";
  form.method = "POST";
  form.target = "_blank";
  form.style.display = "none";
  const dataInput = document.createElement("input");
  dataInput.name = "data";
  const supportedLanguages = {
    markup: ["markdown", "haml"],
    style: ["less", "scss", "sass", "stylus"],
    script: ["babel", "typescript", "coffeescript", "livescript"]
  };
  const getEditorContent = (editorId) => getContent({ editorId, config, compiled, supportedLanguages, ...deps });
  const getEditorCompilerScripts = (editorId) => getCompilerScripts({ baseUrl, editorId, config, compiled, supportedLanguages, ...deps });
  dataInput.value = JSON.stringify({
    title: config.title,
    description: config.description,
    tags: config.tags,
    html: getEditorContent("markup"),
    html_pre_processor: supportedLanguages.markup.includes(config.markup.language) ? config.markup.language : "none",
    css: getEditorContent("style"),
    css_pre_processor: supportedLanguages.style.includes(config.style.language) ? config.style.language : "none",
    css_starter: config.cssPreset === "normalize.css" ? "normalize" : config.cssPreset === "reset-css" ? "reset" : "neither",
    css_prefix: config.processors.includes("autoprefixer") ? "autoprefixer" : "neither",
    js: getEditorContent("script"),
    js_pre_processor: supportedLanguages.script.includes(config.script.language) ? config.script.language : config.script.language === "jsx" ? "babel" : config.script.language === "tsx" ? "typescript" : "none",
    html_classes: typeof config.htmlAttrs === "object" ? config.htmlAttrs.class || "" : "",
    head: config.head || "",
    css_external: config.stylesheets.join(";"),
    js_external: [
      ...config.scripts,
      ...getEditorCompilerScripts("markup"),
      ...getEditorCompilerScripts("style"),
      ...getEditorCompilerScripts("script")
    ].join(";")
  });
  form.appendChild(dataInput);
  document.body.appendChild(form);
  form.submit();
  form.remove();
};

// src/livecodes/export/export-github-gist.ts
var exportGithubGist = async (config, {
  user,
  deps
}) => {
  if (!user)
    return;
  const files = getFiles(config, user, deps);
  const response = await saveGist(config, user, files);
  const gistInfo = await response.json();
  if (gistInfo.id) {
    const description = getDescriptionFile(config, user, gistInfo.html_url);
    await saveGist(config, user, description, gistInfo.id);
    window.open("https://gist.github.com/" + gistInfo.id);
  }
};
var getFiles = (config, user, deps) => {
  const descriptionFile = getDescriptionFile(config, user);
  const contentFiles = getFilesFromConfig(config, deps);
  return {
    ...descriptionFile,
    ...contentFiles
  };
};
var saveGist = (config, user, files, gistId) => {
  const body = {
    accept: "application/vnd.github.v3+json",
    description: config.title,
    files,
    public: true
  };
  let url = "https://api.github.com/gists";
  if (gistId) {
    url += "/" + gistId;
  }
  return fetch(url, {
    method: gistId ? "PATCH" : "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "token " + user.token
    },
    body: JSON.stringify(body)
  });
};

// src/livecodes/export/export-html.ts
var exportHTML = (config, html) => {
  const filename = config.title;
  const extension = "html";
  const content = "data:text/html;charset=utf-8," + encodeURIComponent(html);
  downloadFile(filename, extension, content);
};

// src/livecodes/export/export-jsfiddle.ts
var exportJsfiddle = (config, {
  baseUrl,
  compiled,
  deps
}) => {
  const form = document.createElement("form");
  form.action = "https://jsfiddle.net/api/post/library/pure/";
  form.method = "POST";
  form.target = "_blank";
  form.style.display = "none";
  const supportedLanguages = {
    markup: ["haml"],
    style: ["scss", "sass"],
    script: ["babel", "typescript", "coffeescript"]
  };
  const getEditorContent = (editorId) => getContent({ editorId, config, compiled, supportedLanguages, ...deps });
  const getEditorCompilerScripts = (editorId) => getCompilerScripts({ baseUrl, editorId, config, compiled, supportedLanguages, ...deps });
  const data = {
    title: config.title,
    description: config.description || "",
    html: getEditorContent("markup"),
    css: getEditorContent("style"),
    css_panel: config.style.language === "scss" ? "1" : "0",
    js: getEditorContent("script"),
    js_panel: config.script.language === "typescript" ? "4" : config.script.language === "jsx" ? "3" : config.script.language === "coffeescript" ? "5" : "0",
    resources: [
      ...config.stylesheets,
      ...config.scripts,
      ...getEditorCompilerScripts("markup"),
      ...getEditorCompilerScripts("style"),
      ...getEditorCompilerScripts("script")
    ].join(",")
  };
  Object.keys(data).forEach((key) => {
    const input = document.createElement("input");
    input.name = key;
    input.value = data[key];
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
  form.remove();
};

// src/livecodes/export/export-json.ts
var exportJSON = (config) => {
  const filename = config.title;
  const extension = "json";
  const content = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
  downloadFile(filename, extension, content);
};

// src/livecodes/vendors.ts
var { getUrl, getModuleUrl } = modulesService;
var jsZipUrl = /* @__PURE__ */ getUrl("jszip@3.10.1/dist/jszip.js");

// src/livecodes/export/export-src.ts
var exportSrc = async (config, {
  html,
  deps
}, _baseUrl) => {
  const JSZip = await loadScript(jsZipUrl, "JSZip");
  const zip = new JSZip();
  const files = getFilesFromConfig(config, deps);
  Object.keys(files).forEach((filename2) => {
    zip.file(filename2, files[filename2]?.content);
  });
  zip.file("result.html", html);
  zip.file("livecodes.json", JSON.stringify(config, null, 2));
  const output = await zip.generateAsync({ type: "base64" });
  const filename = config.title;
  const extension = "zip";
  const content = "data:application/zip;base64," + encodeURIComponent(output);
  downloadFile(filename, extension, content);
};

// src/livecodes/export/export.ts
var exportConfig = (config, baseUrl, type, payload) => {
  const exportFns = {
    json: exportJSON,
    src: exportSrc,
    html: exportHTML,
    codepen: exportCodepen,
    jsfiddle: exportJsfiddle,
    githubGist: exportGithubGist
  };
  exportFns[type](config, payload, baseUrl);
};
export {
  exportConfig
};
