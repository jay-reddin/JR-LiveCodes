// src/livecodes/editor/codemirror/codemirror.ts
import { autocompletion } from "@codemirror/autocomplete";
import { basicSetup, closeBrackets, lineNumbers } from "codemirror";
import { Compartment, EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView as EditorView2, keymap } from "@codemirror/view";
import { redo, undo } from "@codemirror/commands";
import { HighlightStyle as HighlightStyle2, defaultHighlightStyle, foldEffect, indentUnit, syntaxHighlighting as syntaxHighlighting2 } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import { vscodeKeymap } from "@replit/codemirror-vscode-keymap";
import { colorPicker } from "@replit/codemirror-css-color-picker";

// src/livecodes/UI/selectors.ts
var getEditorModeNode = () => document.querySelector("#editor-mode");

// src/livecodes/utils/utils.ts
var debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    if (timeout)
      clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(null, args), typeof delay === "function" ? delay() : delay);
  };
};
var isMac = () => navigator.userAgent.includes("Mac") || navigator.platform.includes("Mac");
var ctrl = (e) => isMac() ? e.metaKey : e.ctrlKey;
var getRandomString = () => String(Math.random()) + "-" + Date.now().toFixed();

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
var cm6ThemeBasicLightUrl = /* @__PURE__ */ getUrl(
  "cm6-theme-basic-light@0.2.0/dist/index.js"
);
var cm6ThemeBasicDarkUrl = /* @__PURE__ */ getUrl(
  "cm6-theme-basic-dark@0.2.0/dist/index.js"
);
var cm6ThemeGruvboxLightUrl = /* @__PURE__ */ getUrl(
  "cm6-theme-gruvbox-light@0.2.0/dist/index.js"
);
var cm6ThemeGruvboxDarkUrl = /* @__PURE__ */ getUrl(
  "cm6-theme-gruvbox-dark@0.2.0/dist/index.js"
);
var cm6ThemeMaterialDarkUrl = /* @__PURE__ */ getUrl(
  "cm6-theme-material-dark@0.2.0/dist/index.js"
);
var cm6ThemeNordUrl = /* @__PURE__ */ getUrl("cm6-theme-nord@0.2.0/dist/index.js");
var cm6ThemeSolarizedLightUrl = /* @__PURE__ */ getUrl(
  "cm6-theme-solarized-light@0.2.0/dist/index.js"
);
var cm6ThemeSolarizedDarkUrl = /* @__PURE__ */ getUrl(
  "cm6-theme-solarized-dark@0.2.0/dist/index.js"
);
var codeMirrorBaseUrl = /* @__PURE__ */ getUrl("@live-codes/codemirror@0.3.2/build/");
var comlinkBaseUrl = /* @__PURE__ */ getUrl("comlink@4.4.1/dist/");
var ddietrCmThemesBaseUrl = /* @__PURE__ */ getUrl(
  "@ddietr/codemirror-themes@1.4.2/dist/theme/"
);
var thememirrorBaseUrl = /* @__PURE__ */ getUrl("thememirror@2.0.1/dist/themes/");

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

// src/livecodes/editor/codemirror/codemirror-themes.ts
import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
var codemirrorThemes = [
  {
    name: "amy",
    title: "Amy",
    url: thememirrorBaseUrl + "amy.js",
    exportName: "amy"
  },
  {
    name: "aura",
    title: "Aura",
    url: ddietrCmThemesBaseUrl + "aura.js",
    exportName: "aura"
  },
  {
    name: "ayu-light",
    title: "Ayu Light",
    url: thememirrorBaseUrl + "ayu-light.js",
    exportName: "ayuLight"
  },
  {
    name: "barf",
    title: "Barf",
    url: thememirrorBaseUrl + "barf.js",
    exportName: "barf"
  },
  {
    name: "basic-light",
    title: "Basic Light",
    url: cm6ThemeBasicLightUrl,
    exportName: "basicLight"
  },
  {
    name: "basic-dark",
    title: "Basic Dark",
    url: cm6ThemeBasicDarkUrl,
    exportName: "basicDark"
  },
  {
    name: "bespin",
    title: "Bespin",
    url: thememirrorBaseUrl + "bespin.js",
    exportName: "bespin"
  },
  {
    name: "birds-of-paradise",
    title: "Birds of Paradise",
    url: thememirrorBaseUrl + "birds-of-paradise.js",
    exportName: "birdsOfParadise"
  },
  {
    name: "boys-and-girls",
    title: "Boys and Girls",
    url: thememirrorBaseUrl + "boys-and-girls.js",
    exportName: "boysAndGirls"
  },
  {
    name: "catppuccin-latte",
    title: "Catppuccin Latte",
    url: vendorsBaseUrl + "catppuccin/codemirror/codemirror-theme-catppuccin.js",
    exportName: "catppuccinLatte"
  },
  {
    name: "catppuccin-frappe",
    title: "Catppuccin Frappe",
    url: vendorsBaseUrl + "catppuccin/codemirror/codemirror-theme-catppuccin.js",
    exportName: "catppuccinFrappe"
  },
  {
    name: "catppuccin-macchiato",
    title: "Catppuccin Macchiato",
    url: vendorsBaseUrl + "catppuccin/codemirror/codemirror-theme-catppuccin.js",
    exportName: "catppuccinMacchiato"
  },
  {
    name: "catppuccin-mocha",
    title: "Catppuccin Mocha",
    url: vendorsBaseUrl + "catppuccin/codemirror/codemirror-theme-catppuccin.js",
    exportName: "catppuccinMocha"
  },
  {
    name: "clouds",
    title: "Clouds",
    url: thememirrorBaseUrl + "clouds.js",
    exportName: "clouds"
  },
  {
    name: "cobalt",
    title: "Cobalt",
    url: thememirrorBaseUrl + "cobalt.js",
    exportName: "cobalt"
  },
  { name: "cm-light", title: "Codemirror Light" },
  {
    name: "cool-glow",
    title: "Cool Glow",
    url: thememirrorBaseUrl + "cool-glow.js",
    exportName: "coolGlow"
  },
  {
    name: "dracula",
    title: "Dracula",
    url: thememirrorBaseUrl + "dracula.js",
    exportName: "dracula"
  },
  {
    name: "espresso",
    title: "Espresso",
    url: thememirrorBaseUrl + "espresso.js",
    exportName: "espresso"
  },
  {
    name: "github-dark",
    title: "GitHub Dark",
    url: ddietrCmThemesBaseUrl + "github-dark.js",
    exportName: "githubDark"
  },
  {
    name: "github-light",
    title: "GitHub Light",
    url: ddietrCmThemesBaseUrl + "github-light.js",
    exportName: "githubLight"
  },
  {
    name: "gruvbox-dark",
    title: "Gruvbox Dark",
    url: cm6ThemeGruvboxDarkUrl,
    exportName: "gruvboxDark"
  },
  {
    name: "gruvbox-light",
    title: "Gruvbox Light",
    url: cm6ThemeGruvboxLightUrl,
    exportName: "gruvboxLight"
  },
  {
    name: "material-dark",
    title: "Material Dark",
    url: cm6ThemeMaterialDarkUrl,
    exportName: "materialDark"
  },
  {
    name: "material-light",
    title: "Material Light",
    url: ddietrCmThemesBaseUrl + "material-light.js",
    exportName: "materialLight"
  },
  { name: "monochrome", title: "Monochrome" },
  { name: "monochrome-dark", title: "Monochrome Dark" },
  {
    name: "noctis-lilac",
    title: "Noctis Lilac",
    url: thememirrorBaseUrl + "noctis-lilac.js",
    exportName: "noctisLilac"
  },
  {
    name: "nord",
    title: "Nord",
    url: cm6ThemeNordUrl,
    exportName: "nord"
  },
  { name: "one-dark", title: "One Dark" },
  {
    name: "rose-pine-dawn",
    title: "Ros\xE9 Pine Dawn",
    url: thememirrorBaseUrl + "rose-pine-dawn.js",
    exportName: "rosePineDawn"
  },
  {
    name: "smoothy",
    title: "Smoothy",
    url: thememirrorBaseUrl + "smoothy.js",
    exportName: "smoothy"
  },
  {
    name: "solarized-dark",
    title: "Solarized Dark",
    url: cm6ThemeSolarizedDarkUrl,
    exportName: "solarizedDark"
  },
  {
    name: "solarized-light",
    title: "Solarized Light",
    url: cm6ThemeSolarizedLightUrl,
    exportName: "solarizedLight"
  },
  {
    name: "tokyo-night",
    title: "Tokyo Night",
    url: ddietrCmThemesBaseUrl + "tokyo-night.js",
    exportName: "tokyoNight"
  },
  {
    name: "tokyo-night-day",
    title: "Tokyo Night Day",
    url: ddietrCmThemesBaseUrl + "tokyo-night-day.js",
    exportName: "tokyoNightDay"
  },
  {
    name: "tokyo-night-storm",
    title: "Tokyo Night Storm",
    url: ddietrCmThemesBaseUrl + "tokyo-night-storm.js",
    exportName: "tokyoNightStorm"
  },
  {
    name: "tomorrow",
    title: "Tomorrow",
    url: thememirrorBaseUrl + "tomorrow.js",
    exportName: "tomorrow"
  }
];
var createTheme = ({
  variant,
  settings,
  styles
}) => {
  const theme = EditorView.theme(
    {
      "&": {
        backgroundColor: settings.background,
        color: settings.foreground
      },
      ".cm-content": {
        caretColor: settings.caret
      },
      ".cm-cursor, .cm-dropCursor": {
        borderLeftColor: settings.caret
      },
      "&.cm-focused .cm-selectionBackgroundm .cm-selectionBackground, .cm-selectionMatch, .cm-content ::selection": {
        backgroundColor: settings.selection
      },
      ".cm-activeLine": {
        backgroundColor: settings.lineHighlight
      },
      ".cm-gutters": {
        backgroundColor: settings.gutterBackground,
        color: settings.gutterForeground
      },
      ".cm-activeLineGutter": {
        backgroundColor: settings.lineHighlight
      }
    },
    {
      dark: variant === "dark"
    }
  );
  const highlightStyle = HighlightStyle.define(styles);
  const extension = [theme, syntaxHighlighting(highlightStyle)];
  return extension;
};
var customThemes = {
  monochrome: createTheme({
    variant: "light",
    settings: {
      background: "#fffffe",
      foreground: "#24292e",
      caret: "#24292e",
      selection: "#c8c8fa",
      gutterBackground: "#fffffe",
      gutterForeground: "#24292e",
      lineHighlight: "#f1faff"
    },
    styles: []
  }),
  "monochrome-dark": createTheme({
    variant: "dark",
    settings: {
      background: "#24292e",
      foreground: "#e2e2e3",
      caret: "#e2e2e3",
      selection: "#444d56",
      gutterBackground: "#24292e",
      gutterForeground: "#e2e2e3",
      lineHighlight: "#444d56"
    },
    styles: []
  })
};

// src/livecodes/editor/codemirror/editor-languages.ts
import { LanguageSupport, StreamLanguage } from "@codemirror/language";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
var legacy = (parser) => new LanguageSupport(StreamLanguage.define(parser));
var getPath = (mod) => codeMirrorBaseUrl + mod;
var moduleUrls = {
  vue: getPath("codemirror-lang-vue.js"),
  svelte: getPath("codemirror-lang-svelte.js"),
  liquid: getPath("codemirror-lang-liquid.js"),
  json: getPath("codemirror-lang-json.js"),
  markdown: getPath("codemirror-lang-markdown.js"),
  python: getPath("codemirror-lang-python.js"),
  php: getPath("codemirror-lang-php.js"),
  java: getPath("codemirror-lang-java.js"),
  clike: getPath("codemirror-lang-clike.js"),
  mllike: getPath("codemirror-lang-mllike.js"),
  cpp: getPath("codemirror-lang-cpp.js"),
  sql: getPath("codemirror-lang-sql.js"),
  wast: getPath("codemirror-lang-wast.js"),
  scss: getPath("codemirror-lang-scss.js"),
  coffeescript: getPath("codemirror-lang-coffeescript.js"),
  livescript: getPath("codemirror-lang-livescript.js"),
  ruby: getPath("codemirror-lang-ruby.js"),
  go: getPath("codemirror-lang-go.js"),
  perl: getPath("codemirror-lang-perl.js"),
  lua: getPath("codemirror-lang-lua.js"),
  r: getPath("codemirror-lang-r.js"),
  julia: getPath("codemirror-lang-julia.js"),
  scheme: getPath("codemirror-lang-scheme.js"),
  clojure: getPath("codemirror-lang-clojure.js"),
  tcl: getPath("codemirror-lang-tcl.js"),
  less: getPath("codemirror-lang-less.js"),
  stylus: getPath("codemirror-lang-stylus.js"),
  rust: getPath("codemirror-lang-rust.js"),
  swift: getPath("codemirror-lang-swift.js")
};
var editorLanguages = {
  html: async () => html(),
  css: async () => css(),
  javascript: async () => javascript(),
  typescript: async () => javascript({ typescript: true }),
  jsx: async () => javascript({ jsx: true }),
  tsx: async () => javascript({ jsx: true, typescript: true }),
  json: async () => json(),
  vue: async () => (await import(moduleUrls.vue)).vue(),
  svelte: async () => (await import(moduleUrls.svelte)).svelte(),
  liquid: async () => (await import(moduleUrls.liquid)).liquid(),
  markdown: async () => (await import(moduleUrls.markdown)).markdown(),
  python: async () => (await import(moduleUrls.python)).python(),
  php: async () => (await import(moduleUrls.php)).php(),
  go: async () => (await import(moduleUrls.go)).go(),
  java: async () => (await import(moduleUrls.java)).java(),
  cpp: async () => (await import(moduleUrls.cpp)).cpp(),
  sql: async () => (await import(moduleUrls.sql)).sql(),
  wat: async () => (await import(moduleUrls.wast)).wast(),
  scss: async () => (await import(moduleUrls.scss)).sass(),
  sass: async () => (await import(moduleUrls.scss)).sass({ indented: true }),
  coffeescript: async () => legacy((await import(moduleUrls.coffeescript)).coffeeScript),
  livescript: async () => legacy((await import(moduleUrls.livescript)).liveScript),
  ruby: async () => legacy((await import(moduleUrls.ruby)).ruby),
  perl: async () => legacy((await import(moduleUrls.perl)).perl),
  lua: async () => legacy((await import(moduleUrls.lua)).lua),
  r: async () => legacy((await import(moduleUrls.r)).r),
  julia: async () => legacy((await import(moduleUrls.julia)).julia),
  scheme: async () => legacy((await import(moduleUrls.scheme)).scheme),
  clojure: async () => legacy((await import(moduleUrls.clojure)).clojure),
  tcl: async () => legacy((await import(moduleUrls.tcl)).tcl),
  less: async () => legacy((await import(moduleUrls.less)).less),
  stylus: async () => legacy((await import(moduleUrls.stylus)).stylus),
  csharp: async () => legacy((await import(moduleUrls.clike)).csharp),
  ocaml: async () => legacy((await import(moduleUrls.mllike)).oCaml),
  // fsharp: async () => legacy((await import(moduleUrls.mllike)).fSharp),
  // @ts-ignore
  rust: async () => legacy((await import(moduleUrls.rust)).rust),
  swift: async () => legacy((await import(moduleUrls.swift)).swift)
};

// src/livecodes/editor/codemirror/codemirror.ts
var editors = [];
var tsWorker;
var tabFocusMode = false;
var changeTabFocusMode = debounce(() => tabFocusMode = !tabFocusMode, 50);
var createEditor = async (options) => {
  const {
    container,
    readonly,
    isEmbed,
    editorId,
    getFormatterConfig,
    getFontFamily,
    getLanguageExtension
  } = options;
  let editorSettings = { ...options };
  if (!container)
    throw new Error("editor container not found");
  const getLanguageSupport = async (language2) => editorLanguages[language2]?.() || editorLanguages.html?.();
  const mapLanguage = (lang) => {
    if (lang.startsWith("vue"))
      return "vue";
    if (lang.startsWith("svelte"))
      return "svelte";
    if (lang === "liquid")
      return "liquid";
    return options.mapLanguage?.(lang) || lang;
  };
  const themes = {
    "one-dark": oneDark,
    "cm-light": [
      syntaxHighlighting2(defaultHighlightStyle),
      EditorView2.theme({
        "&": { backgroundColor: "#ffffff" }
      })
    ],
    ...customThemes
  };
  const defaultThemes = { dark: "one-dark", light: "cm-light" };
  const getActiveTheme = () => themes[theme] || themes[defaultThemes[options.theme]] || [];
  let language = options.language;
  let mappedLanguage = mapLanguage(language);
  let mappedLanguageSupport = await getLanguageSupport(mappedLanguage);
  let theme = await loadTheme(options.theme, options.editorTheme);
  const keyBindings = [];
  const listeners = [];
  const notifyListeners = (update) => {
    if (update.docChanged) {
      listeners.forEach((fn) => fn(update));
    }
  };
  let codemirrorTS;
  let vim;
  let emacs;
  let emmet;
  let codeium;
  let lineNumbersRelative;
  const configureTSExtension = (extensionList) => {
    if (mappedLanguage === "typescript") {
      return extensionList;
    }
    if (mappedLanguage === "javascript") {
      return extensionList.slice(0, -1);
    }
    return [];
  };
  let tsResolve;
  const tsLoaded = new Promise((resolve) => tsResolve = resolve);
  const loadTS = async (reset = false) => {
    const feature = codemirrorTS && reset ? "changeCodeMirrorLanguage" : "initCodeMirrorTS";
    if (reset) {
      codemirrorTS = void 0;
    }
    if (!["typescript", "javascript"].includes(mappedLanguage) || codemirrorTS)
      return;
    const codemirrorTsUrl = `${codeMirrorBaseUrl}codemirror-ts.js`;
    const [tsMod, Comlink, _] = await Promise.all([
      import(codemirrorTsUrl),
      import(comlinkBaseUrl + "esm/comlink.min.js"),
      window.compiler.typescriptFeatures({ feature, payload: language })
    ]);
    const { tsFacetWorker, tsSyncWorker, tsLinterWorker, tsAutocompleteWorker, tsHoverWorker } = tsMod;
    if (!tsWorker) {
      const iframe = document.querySelector("#compiler-frame");
      if (!iframe?.contentWindow)
        return;
      const worker = Comlink.wrap(Comlink.windowEndpoint(iframe.contentWindow));
      await worker.initialize();
      tsWorker = worker;
    }
    const random = getRandomString();
    const ext = getLanguageExtension(language);
    const extension = mappedLanguage === "typescript" && !ext?.endsWith("ts") && !ext?.endsWith("tsx") ? ext + ".tsx" : ext;
    const path = `/${editorId}.${random}.${extension}`;
    codemirrorTS = codemirrorTS || [
      tsFacetWorker.of({ worker: tsWorker, path }),
      tsSyncWorker(),
      autocompletion({ override: [tsAutocompleteWorker()] }),
      tsHoverWorker(),
      tsLinterWorker()
    ];
    view.dispatch({ effects: [tsExtension.reconfigure(configureTSExtension(codemirrorTS))] });
  };
  const addTypes = (lib) => {
    tsLoaded.then(() => {
      window.compiler.typescriptFeatures({ feature: "addTypes", payload: lib });
    });
  };
  const loadExtensions = async (opt) => {
    const modules = {
      vim: `${codeMirrorBaseUrl}codemirror-vim.js`,
      emacs: `${codeMirrorBaseUrl}codemirror-emacs.js`,
      emmet: `${codeMirrorBaseUrl}codemirror-emmet.js`,
      codeium: `${codeMirrorBaseUrl}codemirror-codeium.js`,
      lineNumbersRelative: `${codeMirrorBaseUrl}codemirror-line-numbers-relative.js`
    };
    const [vimMod, emacsMod, emmetMod, codeiumMod, lineNumbersRelativeMod] = await Promise.all([
      opt.editorMode === "vim" ? import(modules.vim) : Promise.resolve({}),
      opt.editorMode === "emacs" ? import(modules.emacs) : Promise.resolve({}),
      opt.emmet ? import(modules.emmet) : Promise.resolve({}),
      opt.enableAI ? import(modules.codeium) : Promise.resolve({}),
      opt.lineNumbers === "relative" ? import(modules.lineNumbersRelative) : Promise.resolve({})
    ]);
    vim = vimMod.vim;
    emacs = emacsMod.emacs;
    emmet = emmetMod.emmet;
    codeium = codeiumMod.codeium;
    lineNumbersRelative = lineNumbersRelativeMod.lineNumbersRelative;
  };
  await loadExtensions(options);
  const languageExtension = new Compartment();
  const tsExtension = new Compartment();
  const keyBindingsExtension = new Compartment();
  const themeExtension = new Compartment();
  const readOnlyExtension = EditorView2.editable.of(false);
  const editorSettingsExtension = new Compartment();
  const lineNumbersExtension = new Compartment();
  const closeBracketsExtension = new Compartment();
  const italicComments = HighlightStyle2.define([{ tag: tags.comment, fontStyle: "italic" }]);
  const configureSettingsExtension = (settings) => {
    const fontSize = (settings.fontSize ?? editorSettings.fontSize) || (isEmbed ? 12 : 14);
    const fontFamily = getFontFamily(settings.fontFamily ?? editorSettings.fontFamily);
    const tabSize = settings.tabSize ?? editorSettings.tabSize;
    const useTabs = settings.useTabs ?? editorSettings.useTabs;
    const wordWrap = settings.wordWrap ?? editorSettings.wordWrap;
    const enableEmmet = settings.emmet ?? editorSettings.emmet;
    const enableLineNumbers = settings.lineNumbers ?? editorSettings.lineNumbers;
    const enableAI = settings.enableAI ?? editorSettings.enableAI;
    const editorMode = settings.editorMode ?? editorSettings.editorMode;
    return [
      EditorState.tabSize.of(tabSize),
      indentUnit.of(useTabs ? "	" : " ".repeat(tabSize)),
      ...wordWrap ? [EditorView2.lineWrapping] : [],
      ...editorMode === "vim" && vim ? [vim()] : editorMode === "emacs" && emacs ? [emacs()] : [],
      ...enableEmmet && emmet ? [emmet] : [],
      ...enableLineNumbers === "relative" && lineNumbersRelative ? [lineNumbersRelative()] : enableLineNumbers && lineNumbers ? [lineNumbers()] : [],
      ...enableAI && codeium ? [codeium(editors, mapLanguage)] : [],
      EditorView2.theme({
        "&": {
          height: "100%",
          fontSize: fontSize + "px"
        },
        ".cm-scroller": {
          overflow: "auto",
          fontFamily
        }
      })
    ];
  };
  const getExtensions = () => {
    const defaultOptions = [
      languageExtension.of(mappedLanguageSupport),
      tsExtension.of(
        ["typescript", "javascript"].includes(mappedLanguage) && codemirrorTS ? configureTSExtension(codemirrorTS) : []
      ),
      EditorView2.updateListener.of(notifyListeners),
      themeExtension.of(getActiveTheme()),
      syntaxHighlighting2(italicComments),
      editorSettingsExtension.of(configureSettingsExtension({})),
      keyBindingsExtension.of(keymap.of(keyBindings)),
      closeBracketsExtension.of(editorSettings.closeBrackets ? closeBrackets() : []),
      basicSetup,
      readonly ? readOnlyExtension : [],
      keymap.of(vscodeKeymap),
      indentationMarkers(),
      colorPicker
    ];
    const codeblockOptions = [readOnlyExtension, ...defaultOptions];
    const compiledCodeOptions = [readOnlyExtension, ...defaultOptions];
    const consoleOptions = [...defaultOptions];
    return editorId === "console" ? consoleOptions : editorId === "compiled" ? compiledCodeOptions : options.mode === "codeblock" ? codeblockOptions : defaultOptions;
  };
  const showEditorMode = async (mode) => {
    const editorModeNode = getEditorModeNode();
    const setEditorModeText = (str) => {
      if (!editorModeNode)
        return;
      editorModeNode.textContent = str;
    };
    if (!mode) {
      setEditorModeText("");
    }
    if (mode === "vim") {
      setEditorModeText("Vim");
    }
    if (mode === "emacs") {
      setEditorModeText("Emacs");
    }
  };
  const view = new EditorView2({
    state: EditorState.create({
      extensions: getExtensions(),
      doc: options.value
    }),
    parent: container
  });
  showEditorMode(options.editorMode);
  const getEditorId = () => editorId;
  const getValue = () => view.state.doc.toString();
  const setValue = (value = "", newState = true) => {
    if (newState) {
      view.setState(EditorState.create({ doc: value, extensions: getExtensions() }));
    } else {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: value
        }
      });
    }
  };
  const focus = () => view.focus();
  const getLanguage = () => language;
  const setLanguage = (lang, value) => {
    language = lang;
    mappedLanguage = mapLanguage(language);
    getLanguageSupport(mappedLanguage).then((langSupport) => {
      mappedLanguageSupport = langSupport;
      view.dispatch({
        effects: [languageExtension.reconfigure(mappedLanguageSupport)]
      });
    });
    tsLoaded.then(() => {
      loadTS(true);
    });
    if (value != null) {
      setValue(value);
    }
  };
  const codeiumEditor = { editorId, getLanguage, getValue };
  editors.push(codeiumEditor);
  loadTS().then(() => {
    tsResolve();
  });
  const onContentChanged = (fn) => {
    listeners.push(fn);
  };
  const keyCodes = {
    CtrlEnter: "Ctrl-Enter",
    ShiftEnter: "Shift-Enter",
    Enter: "Enter",
    UpArrow: "ArrowUp",
    DownArrow: "ArrowDown",
    ShiftAltF: "Shift-Alt-f"
  };
  const addKeyBinding = (_label, keyCode, callback) => {
    keyBindings.push({
      key: keyCode,
      run() {
        callback();
        return true;
      }
    });
    view.dispatch({
      effects: keyBindingsExtension.reconfigure(keymap.of(keyBindings))
    });
  };
  const toggleTabFocusMode = (event) => {
    if (event.code === "KeyM" && ctrl(event)) {
      event.preventDefault();
      changeTabFocusMode();
      setTimeout(() => {
        view.setTabFocusMode?.(tabFocusMode);
      }, 70);
    }
  };
  view.setTabFocusMode(tabFocusMode);
  addEventListener("keydown", toggleTabFocusMode);
  let formatter;
  const registerFormatter = (formatFn) => {
    if (!formatFn)
      return;
    formatter = formatFn;
    addKeyBinding("format", keyCodes.ShiftAltF, async () => {
      await format();
      focus();
    });
  };
  const format = async () => {
    if (!formatter)
      return;
    const offset = view.state.selection.main.to;
    const oldValue = getValue();
    const newValue = await formatter(oldValue, offset, getFormatterConfig());
    setValue(newValue.formatted, false);
    const newOffset = newValue.cursorOffset >= 0 ? newValue.cursorOffset : 0;
    view.dispatch({ selection: { anchor: newOffset } });
  };
  async function loadTheme(appTheme, editorTheme) {
    const selectedTheme = getEditorTheme({
      editor: "codemirror",
      editorTheme,
      theme: appTheme,
      editorThemes: codemirrorThemes.map((t) => t.name)
    });
    const newTheme = selectedTheme ? selectedTheme : defaultThemes[appTheme];
    const themeData = codemirrorThemes.find((t) => t.name === newTheme);
    if (!themes[newTheme] && themeData?.url) {
      const themeExt = (await import(themeData.url))[themeData.exportName || "default"];
      themes[newTheme] = themeExt;
    }
    return newTheme;
  }
  const setTheme = (appTheme, editorTheme) => {
    loadTheme(appTheme, editorTheme).then((newTheme) => {
      theme = newTheme;
      view.dispatch({
        effects: themeExtension.reconfigure(getActiveTheme())
      });
    });
  };
  const changeSettings = (settings) => {
    editorSettings = { ...settings };
    loadExtensions(editorSettings).then(() => {
      view.dispatch({
        effects: [
          editorSettingsExtension.reconfigure(configureSettingsExtension(editorSettings)),
          lineNumbersExtension.reconfigure(editorSettings.lineNumbers ? lineNumbers() : []),
          closeBracketsExtension.reconfigure(editorSettings.closeBrackets ? closeBrackets() : [])
        ]
      });
      setTheme(editorSettings.theme, editorSettings.editorTheme);
      showEditorMode(editorSettings.editorMode);
    });
  };
  const editorUndo = () => {
    undo({ state: view.state, dispatch: view.dispatch });
  };
  const editorRedo = () => {
    redo({ state: view.state, dispatch: view.dispatch });
  };
  addKeyBinding("redo", "Mod-Shift-z", editorRedo);
  const getPosition = () => {
    const position = view.state.selection.asSingle().ranges[0].from;
    const lineInfo = view.state.doc.lineAt(position);
    const lineNumber = lineInfo.number;
    const column = position - lineInfo.from + 1;
    return { lineNumber, column };
  };
  const setPosition = ({ lineNumber, column = 1 }) => {
    const col = column - 1;
    const line = view.state.doc.lines > lineNumber ? lineNumber : view.state.doc.lines;
    const lineInfo = view.state.doc.line(line);
    const columnNumber = lineInfo.length > col ? col : lineInfo.length;
    const position = lineInfo.from + columnNumber;
    view.dispatch({
      selection: { anchor: position },
      effects: [EditorView2.scrollIntoView(position, { x: "center", y: "center" })]
    });
  };
  const foldRegions = () => {
    const code = view.state.doc.toString();
    const regionRegExp = /\/\/#region[\s\S]*?\/\/#endregion/g;
    let matches;
    while ((matches = regionRegExp.exec(code)) !== null) {
      const start = matches.index + code.slice(matches.index).indexOf("\n");
      const end = matches.index + matches[0].length;
      view.dispatch({
        effects: foldEffect.of({ from: start, to: end })
      });
    }
  };
  const foldLines = (linesToFold) => {
    linesToFold.forEach((line) => {
      let start = 0;
      let end = view.state.doc.length;
      if (line.from < 0 || line.to < 0 || line.from > line.to)
        return;
      try {
        if (line.from) {
          const startLineInfo = view.state.doc.line(line.from);
          start = startLineInfo.from;
        }
        if (line.to) {
          const endLineInfo = view.state.doc.line(line.to);
          end = endLineInfo.from + endLineInfo.length;
        }
        view.dispatch({
          effects: foldEffect.of({ from: start, to: end })
        });
      } catch (e) {
      }
    });
  };
  const destroy = () => {
    listeners.length = 0;
    keyBindings.length = 0;
    view.destroy();
    container.innerHTML = "";
    editors.splice(editors.indexOf(codeiumEditor), 1);
    removeEventListener("keydown", toggleTabFocusMode);
  };
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
    addTypes,
    onContentChanged,
    keyCodes,
    addKeyBinding,
    changeSettings,
    registerFormatter,
    format,
    isReadonly: readonly,
    setTheme,
    undo: editorUndo,
    redo: editorRedo,
    destroy,
    codemirror: view
  };
};
export {
  createEditor
};
