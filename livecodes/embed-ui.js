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

// src/livecodes/utils/utils.ts
var encodeHTML = (html) => html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&#34;");
var escapeCode = (code, slash = true) => code.replace(/\\/g, slash ? "\\\\" : "\\").replace(/`/g, "\\`").replace(/<\/script>/g, "<\\/script>");
var cloneObject = (x) => (globalThis.structuredClone || ((obj) => JSON.parse(JSON.stringify(obj, (_k, v) => v === void 0 ? null : v))))(x);
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
var indentCode = (code, spaces, skipFirstLine = true) => (skipFirstLine ? "" : " ".repeat(spaces)) + code.split("\n").join("\n" + " ".repeat(spaces));
var predefinedValues = {
  APP_VERSION: "47",
  SDK_VERSION: "0.12.0",
  COMMIT_SHA: "7b4906d",
  REPO_URL: "https://github.com/live-codes/livecodes",
  DOCS_BASE_URL: "http://localhost:3000/docs/"
};

// src/livecodes/html/embed.html?raw
var embed_default = '<div id="embed-container" class="modal-container">\r\n  <div class="modal-title" data-i18n="embed.heading">Embed Project</div>\r\n  <div id="embed-screen-container" class="modal-screen-container">\r\n    <div class="modal-screen">\r\n      <label data-i18n="embed.preview">Preview</label>\r\n      <div id="embed-preview-container" data-i18n="embed.previewLoading">Loading Preview...</div>\r\n      <form id="embed-form"></form>\r\n\r\n      <label for="embed-code" data-i18n="embed.code.heading">Code</label>\r\n      <div id="embed-code" class="custom-editor"></div>\r\n      <button id="embed-copy-btn" class="wide-button" data-i18n="embed.code.copy">Copy Code</button>\r\n\r\n      <div class="description help" data-i18n="embed.desc" data-i18n-prop="innerHTML">\r\n        Please check the\r\n        <a href="{{DOCS_BASE_URL}}configuration/" target="_blank" rel="noopener">documentations</a>\r\n        for advanced configurations.\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n';

// src/livecodes/html/index.ts
var replaceValues = (str) => Object.entries(predefinedValues).reduce(
  (str2, [key, value]) => str2.replace(new RegExp(`{{${key}}}`, "g"), value),
  str
);
var embedScreen = /* @__PURE__ */ replaceValues(embed_default);

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

// src/livecodes/UI/embed-ui.ts
var createEmbedUI = async ({
  config,
  editorLanguages,
  modal,
  notifications,
  eventsManager,
  createEditorFn,
  getUrlFn
}) => {
  const title = config.title;
  const activeEditor = config.activeEditor || "markup";
  const div = document.createElement("div");
  div.innerHTML = embedScreen;
  const embedContainer = div.firstChild;
  modal.show(embedContainer, { isAsync: true, onClose: () => editor?.destroy() });
  const previewContainer = embedContainer.querySelector("#embed-preview-container");
  const form = embedContainer.querySelector("#embed-form");
  const codeArea = embedContainer.querySelector("#embed-code");
  const copyBtn = embedContainer.querySelector("#embed-copy-btn");
  if (!previewContainer || !form || !codeArea || !copyBtn)
    return;
  const formFields = [
    {
      title: window.deps.translateString("embed.theme.heading", "Theme"),
      name: "theme",
      options: [
        {
          label: window.deps.translateString("embed.theme.dark", "Dark"),
          value: "dark",
          checked: true
        },
        { label: window.deps.translateString("embed.theme.light", "Light"), value: "light" }
      ]
    },
    {
      title: window.deps.translateString("embed.loading.heading", "Loading"),
      name: "loading",
      options: [
        {
          label: window.deps.translateString("embed.loading.lazy", "Lazy"),
          value: "lazy",
          checked: true
        },
        { label: window.deps.translateString("embed.loading.click", "On-click"), value: "click" },
        { label: window.deps.translateString("embed.loading.eager", "Eager"), value: "eager" }
      ]
    },
    {
      title: window.deps.translateString("embed.lite", "Lite Mode"),
      name: "lite",
      options: [{ value: "true", checked: false }],
      help: `${"http://localhost:3000/docs/"}features/lite`
    },
    {
      title: window.deps.translateString("embed.readonly", "Read only"),
      name: "readonly",
      options: [{ value: "true", checked: false }]
    },
    {
      title: window.deps.translateString("embed.mode.heading", "Display Mode"),
      name: "mode",
      options: [
        {
          label: window.deps.translateString("embed.mode.full", "Full"),
          value: "full",
          checked: true
        },
        {
          label: window.deps.translateString("embed.mode.simple", "Simple"),
          value: "simple"
        },
        {
          label: window.deps.translateString("embed.mode.editor", "Editor"),
          value: "editor"
        },
        {
          label: window.deps.translateString("embed.mode.codeblock", "Code Block"),
          value: "codeblock"
        },
        {
          label: window.deps.translateString("embed.mode.result", "Result"),
          value: "result"
        }
      ],
      help: `${"http://localhost:3000/docs/"}features/display-modes`
    },
    {
      title: window.deps.translateString("embed.view.heading", "Default View"),
      name: "view",
      options: [
        {
          label: window.deps.translateString("embed.view.split", "Split"),
          value: "split",
          checked: true
        },
        {
          label: window.deps.translateString("embed.view.editor", "Editor"),
          value: "editor"
        },
        {
          label: window.deps.translateString("embed.view.result", "Result"),
          value: "result"
        }
      ],
      help: `${"http://localhost:3000/docs/"}features/default-view`
    },
    {
      title: window.deps.translateString("embed.layout.heading", "Layout"),
      name: "layout",
      options: [
        {
          label: window.deps.translateString("embed.layout.responsive", "Responsive"),
          value: "responsive",
          checked: true
        },
        {
          label: window.deps.translateString("embed.layout.horizontal", "Horizontal"),
          value: "horizontal"
        },
        {
          label: window.deps.translateString("embed.layout.vertical", "Vertical"),
          value: "vertical"
        }
      ],
      help: `${"http://localhost:3000/docs/"}configuration/configuration-object#layout`
    },
    {
      title: window.deps.translateString("embed.activeEditor.heading", "Active Editor"),
      name: "activeEditor",
      options: [
        {
          label: window.deps.translateString("embed.activeEditor.markup", "{{markup}}", {
            markup: editorLanguages.markup
          }),
          value: "markup",
          checked: activeEditor === "markup"
        },
        {
          label: window.deps.translateString("embed.activeEditor.style", "{{style}}", {
            style: editorLanguages.style
          }),
          value: "style",
          checked: activeEditor === "style"
        },
        {
          label: window.deps.translateString("embed.activeEditor.script", "{{script}}", {
            script: editorLanguages.script
          }),
          value: "script",
          checked: activeEditor === "script"
        }
      ]
    },
    {
      title: window.deps.translateString("embed.codeEditor.heading", "Code Editor"),
      name: "editor",
      options: [
        {
          label: window.deps.translateString("embed.codeEditor.default", "Default"),
          value: "",
          checked: true
        },
        {
          label: window.deps.translateString("embed.codeEditor.monaco", "Monaco"),
          value: "monaco"
        },
        {
          label: window.deps.translateString("embed.codeEditor.codeMirror", "CodeMirror"),
          value: "codemirror"
        },
        {
          label: window.deps.translateString("embed.codeEditor.codeJar", "CodeJar"),
          value: "codejar"
        }
      ],
      help: `${"http://localhost:3000/docs/"}features/editor-settings#code-editor`
    },
    {
      title: window.deps.translateString("embed.tools.heading", "Tools"),
      name: "tools",
      options: [
        {
          label: window.deps.translateString("embed.tools.closed", "Closed"),
          value: "closed",
          checked: true
        },
        { label: window.deps.translateString("embed.tools.open", "Open"), value: "open" },
        { label: window.deps.translateString("embed.tools.full", "Full"), value: "full" },
        { label: window.deps.translateString("embed.tools.none", "None"), value: "none" }
      ],
      help: `${"http://localhost:3000/docs/"}features/tools-pane`
    },
    {
      title: window.deps.translateString("embed.activeTool.heading", "Active Tool"),
      name: "activeTool",
      options: [
        {
          label: window.deps.translateString("embed.activeTool.console", "Console"),
          value: "console",
          checked: true
        },
        {
          label: window.deps.translateString("embed.activeTool.compiled", "Compiled"),
          value: "compiled"
        },
        { label: window.deps.translateString("embed.activeTool.tests", "Tests"), value: "tests" }
      ].filter((option) => option.value === "tests" && !config.tests?.content ? false : true),
      help: `${"http://localhost:3000/docs/"}features/tools-pane`
    },
    {
      title: window.deps.translateString("embed.permanentUrl", "Permanent URL"),
      name: "permanentUrl",
      options: [{ value: "true", checked: true }],
      help: `${"http://localhost:3000/docs/"}features/permanent-url`
    },
    {
      title: window.deps.translateString("embed.embedType.heading", "Embed Type"),
      name: "type",
      options: [
        {
          label: window.deps.translateString("embed.embedType.cdn", "Script (CDN)"),
          value: "cdn",
          checked: true
        },
        { label: window.deps.translateString("embed.embedType.npm", "JS (npm)"), value: "npm" },
        { label: window.deps.translateString("embed.embedType.react", "React"), value: "react" },
        { label: window.deps.translateString("embed.embedType.vue", "Vue"), value: "vue" },
        {
          label: window.deps.translateString("embed.embedType.svelte", "Svelte"),
          value: "svelte"
        },
        {
          label: window.deps.translateString("embed.embedType.iframe", "Iframe"),
          value: "iframe"
        },
        { label: window.deps.translateString("embed.embedType.html", "HTML"), value: "html" }
      ]
    }
  ];
  formFields.forEach((field) => {
    const title2 = document.createElement("label");
    title2.innerHTML = field.title;
    form.appendChild(title2);
    if (field.help) {
      const helpLink = document.createElement("a");
      helpLink.href = field.help;
      helpLink.target = "_blank";
      helpLink.classList.add("help-link");
      helpLink.title = window.deps.translateString("generic.clickForInfo", "Click for info...");
      title2.appendChild(helpLink);
      const helpIcon = document.createElement("i");
      helpIcon.classList.add("icon-info");
      helpLink.appendChild(helpIcon);
    }
    const fieldContainer = document.createElement("div");
    fieldContainer.classList.add("input-container");
    form.appendChild(fieldContainer);
    field.options.forEach((option) => {
      const name = `embed-${field.name}`;
      const id = `${name}-${option.value}`;
      const isCheckBox = !option.label && option.value === "true";
      const optionContainer = document.createElement("span");
      fieldContainer.appendChild(optionContainer);
      const input = document.createElement("input");
      input.type = isCheckBox ? "checkbox" : "radio";
      input.name = name;
      input.id = id;
      input.value = option.value;
      input.checked = option.checked || false;
      optionContainer.appendChild(input);
      if (isCheckBox) {
        input.classList.add("switch");
      } else {
        const label = document.createElement("label");
        label.classList.add("radio-label");
        label.htmlFor = id;
        label.innerHTML = option.label || "";
        optionContainer.appendChild(label);
      }
    });
  });
  const editor = await createEditorFn(codeArea);
  const livecodesUrl = "https://livecodes.io";
  const sdkUrl = permanentUrlService.getSDKUrl("umd");
  let shareUrl = await getUrlFn(true);
  let urlObj = new URL(shareUrl);
  let appUrl = urlObj.origin + urlObj.pathname;
  const previewIframe = document.createElement("iframe");
  previewIframe.id = "embed-preview-iframe";
  previewContainer.innerHTML = "";
  previewIframe.tabIndex = -1;
  previewContainer.appendChild(previewIframe);
  const getContainerId = () => "livecodes-" + (Math.random() + 1).toString(36).substring(2);
  const getOptions = (data) => {
    const config2 = {
      ...data.mode !== defaultConfig.mode ? { mode: data.mode } : {},
      ...data.theme !== defaultConfig.theme ? { theme: data.theme } : {},
      ...!data.lite && (data.tools !== "closed" || data.activeTool !== "console") ? {
        tools: {
          enabled: data.tools === "none" ? [] : "all",
          status: data.tools,
          active: data.activeTool
        }
      } : {},
      ...data.readonly ? { readonly: data.readonly } : {},
      ...data.mode !== "result" && data.activeEditor !== activeEditor ? { activeEditor: data.activeEditor } : {},
      ...data.editor ? { editor: data.editor } : {},
      ...data.layout !== defaultConfig.layout ? { layout: data.layout } : {}
    };
    const importId = urlObj.searchParams.get("x");
    return {
      ...appUrl !== "https://livecodes.io/" ? { appUrl } : {},
      ...Object.keys(config2).length > 0 ? { config: config2 } : {},
      ...importId ? { import: importId } : {},
      ...data.lite ? { lite: data.lite } : {},
      ...data.loading !== "lazy" ? { loading: data.loading } : {},
      ...data.view && data.view !== "split" ? { view: data.view } : {}
    };
  };
  const getIframeUrl = (data) => {
    const iframeUrl = new URL(shareUrl);
    iframeUrl.searchParams.set(data.lite ? "lite" : "embed", "true");
    if (data.loading && data.loading !== "lazy") {
      iframeUrl.searchParams.set("loading", String(data.loading));
    }
    if (data.view && data.view !== "split") {
      iframeUrl.searchParams.set("view", String(data.view));
    }
    if (data.mode !== "result" && data.activeEditor && data.activeEditor !== activeEditor) {
      iframeUrl.searchParams.set("activeEditor", String(data.activeEditor));
    }
    if (data.mode && data.mode !== defaultConfig.mode) {
      iframeUrl.searchParams.set("mode", String(data.mode));
    }
    if (data.theme && data.theme !== defaultConfig.theme) {
      iframeUrl.searchParams.set("theme", String(data.theme));
    }
    if (data.tools && !data.lite && (data.tools !== "closed" || data.activeTool !== "console")) {
      iframeUrl.searchParams.set(
        data.tools === "none" ? "tools" : String(data.activeTool),
        String(data.tools)
      );
    }
    if (data.readonly !== void 0) {
      iframeUrl.searchParams.set("readonly", String(data.readonly));
    }
    if (data.editor) {
      iframeUrl.searchParams.set("editor", String(data.editor));
    }
    if (data.layout && data.layout !== defaultConfig.layout) {
      iframeUrl.searchParams.set("layout", String(data.layout));
    }
    return decodeURIComponent(iframeUrl.href);
  };
  const codeTemplates = {
    cdn: (data) => {
      const containerId = getContainerId();
      const containerHtml = `<div id="${containerId}"></div>`;
      const options = getOptions(data);
      const formatted = JSON.stringify(options, null, 2);
      const indented = indentCode(formatted, 2);
      return `
${containerHtml}
<script src="${sdkUrl}"><\/script>
<script>
  const options = ${indented};
  livecodes.createPlayground("#${containerId}", options);
<\/script>
`.trimStart();
    },
    npm(data) {
      const options = getOptions(data);
      const formatted = JSON.stringify(options, null, 2);
      return `
import { createPlayground } from "livecodes";
const options = ${formatted};
createPlayground("#container", options);
`.trimStart();
    },
    react(data) {
      const options = getOptions(data);
      const formatted = JSON.stringify(options, null, 2);
      const indented = indentCode(formatted, 2);
      return `
import LiveCodes from "livecodes/react";
export default function App() {
  const options = ${indented};
  return <LiveCodes {...options}></LiveCodes>;
}
`.trimStart();
    },
    vue(data) {
      const options = getOptions(data);
      const formatted = JSON.stringify(options, null, 2);
      const indented = indentCode(formatted, 2);
      return `
<script setup>
  import LiveCodes from 'livecodes/vue';
  const options = ${indented};
<\/script>

<template>
  <LiveCodes v-bind="options" />
</template>
`.trimStart();
    },
    svelte(data) {
      const options = getOptions(data);
      const formatted = JSON.stringify(options, null, 2);
      const indented = indentCode(formatted, 2);
      return `
<script>
  import { onMount } from 'svelte';
  import { createPlayground } from 'livecodes';
  const options = ${indented};
  let container;
  let playground;
  onMount(() => {
    createPlayground(container, options).then((p) => (playground = p));
    return () => playground?.destroy();
  });
<\/script>

<div bind:this="{container}"></div>
`.trimStart();
    },
    iframe: (data) => {
      const iframeUrl = getIframeUrl(data);
      const nonEmbeddedUrl = new URL(iframeUrl);
      nonEmbeddedUrl.searchParams.delete("embed");
      nonEmbeddedUrl.searchParams.delete("lite");
      const projectUrl = decodeURIComponent(nonEmbeddedUrl.href);
      return `
<iframe title="${title}" scrolling="no" loading="lazy" style="height:300px; width: 100%; border:1px solid black; border-radius:6px;" src="${iframeUrl}">
  See the project <a href="${projectUrl}" target="_blank">${title}</a> on <a href="${livecodesUrl}" target="_blank">LiveCodes</a>.
</iframe>
`.trimStart();
    },
    html: (data) => {
      const { import: _, ...options } = getOptions(data);
      const projectConfig = {
        ...cloneObject(config),
        ...options.config
      };
      Object.keys(projectConfig).forEach((key) => {
        if (JSON.stringify(projectConfig[key]) === JSON.stringify(defaultConfig[key]) || key === "activeEditor" && projectConfig.activeEditor === "markup" || ["markup", "style", "script"].includes(key)) {
          delete projectConfig[key];
        }
      });
      if (Object.keys(projectConfig).length > 0) {
        options.config = projectConfig;
      }
      const optionsAttr = escapeCode(JSON.stringify(options).replace(/'/g, "&#39;"));
      return `
<div class="livecodes" style="height: 300px;" data-options='${optionsAttr}'>
<pre data-lang="${config.markup.language}">${escapeCode(
        encodeHTML(config.markup.content || "")
      )}</pre>
<pre data-lang="${config.style.language}">${escapeCode(
        encodeHTML(config.style.content || "")
      )}</pre>
<pre data-lang="${config.script.language}">${escapeCode(
        encodeHTML(config.script.content || "")
      )}</pre>
</div>
<script defer src="${sdkUrl}" data-prefill><\/script>
`.trimStart();
    }
  };
  const previousSelections = {
    view: "split",
    tools: "closed",
    activeTool: "console",
    editor: ""
  };
  const generateCode = async () => {
    const formData = Array.from(new FormData(form)).reduce(
      (acc, [name, value]) => ({
        ...acc,
        [name.replace("embed-", "")]: value === "true" ? true : value
      }),
      {}
    );
    shareUrl = await getUrlFn(Boolean(formData.permanentUrl));
    urlObj = new URL(shareUrl);
    appUrl = urlObj.origin + urlObj.pathname;
    const viewInputs = document.querySelectorAll('input[name="embed-view"]');
    if (formData.mode !== "full") {
      previousSelections.view = formData.view || previousSelections.view;
      delete formData.view;
      viewInputs.forEach((input) => {
        input.checked = false;
        input.disabled = true;
      });
    } else {
      viewInputs.forEach((input) => {
        if (input.value === (formData.view || previousSelections.view)) {
          input.checked = true;
        }
        input.disabled = false;
        if (input.checked) {
          formData.view = input.value;
        }
      });
    }
    const toolsInputs = document.querySelectorAll('input[name="embed-tools"]');
    const activeToolInputs = document.querySelectorAll(
      'input[name="embed-activeTool"]'
    );
    const editorInputs = document.querySelectorAll('input[name="embed-editor"]');
    if (formData.lite) {
      previousSelections.tools = formData.tools ?? previousSelections.tools;
      previousSelections.editor = formData.editor ?? previousSelections.editor;
      delete formData.tools;
      delete formData.editor;
      toolsInputs.forEach((input) => {
        input.checked = false;
        input.disabled = true;
      });
      editorInputs.forEach((input) => {
        input.checked = false;
        input.disabled = true;
        if (input.value === "codejar") {
          input.checked = true;
        }
      });
    } else {
      toolsInputs.forEach((input) => {
        if (input.value === (formData.tools ?? previousSelections.tools)) {
          input.checked = true;
        }
        input.disabled = false;
        if (input.checked) {
          formData.tools = input.value;
        }
      });
      editorInputs.forEach((input) => {
        if (input.value === (formData.editor ?? previousSelections.editor)) {
          input.checked = true;
        }
        input.disabled = false;
        if (input.checked) {
          formData.editor = input.value;
        }
      });
    }
    if (formData.lite || formData.tools === "none") {
      previousSelections.activeTool = formData.activeTool || previousSelections.activeTool;
      delete formData.activeTool;
      activeToolInputs.forEach((input) => {
        input.checked = false;
        input.disabled = true;
      });
    } else {
      activeToolInputs.forEach((input) => {
        if (input.value === (formData.activeTool || previousSelections.activeTool)) {
          input.checked = true;
        }
        input.disabled = false;
        if (input.checked) {
          formData.activeTool = input.value;
        }
      });
    }
    const activeEditorInputs = document.querySelectorAll(
      'input[name="embed-activeEditor"]'
    );
    activeEditorInputs.forEach((input) => {
      if (formData.mode === "result") {
        input.checked = input.value === activeEditor;
        input.disabled = true;
        delete formData.activeEditor;
      } else {
        input.disabled = false;
      }
    });
    previewIframe.src = getIframeUrl(formData);
    const embedType = formData.type;
    const code = codeTemplates[embedType]?.(formData);
    const embedTypeLanguages = {
      npm: "javascript",
      react: "jsx"
    };
    const embedTypeLanguage = embedTypeLanguages[embedType] || "html";
    if (editor.getLanguage() !== embedTypeLanguage) {
      editor.setLanguage(embedTypeLanguage, code);
    } else {
      editor.setValue(code);
    }
  };
  eventsManager.addEventListener(form, "change", generateCode);
  eventsManager.addEventListener(copyBtn, "click", async () => {
    if (copyToClipboard(editor.getValue())) {
      notifications.success(
        window.deps.translateString("core.copy.copied", "Code copied to clipboard")
      );
    } else {
      notifications.error(
        window.deps.translateString("core.error.failedToCopyCode", "Failed to copy code")
      );
    }
  });
  generateCode();
};
export {
  createEmbedUI
};
