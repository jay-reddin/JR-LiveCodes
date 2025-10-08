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
var colorisBaseUrl = /* @__PURE__ */ getUrl("@melloware/coloris@0.22.0/dist/");
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
var htmlToImageUrl = /* @__PURE__ */ getUrl("html-to-image@1.11.11/dist/html-to-image.js");
var metaPngUrl = /* @__PURE__ */ getUrl("meta-png@1.0.6/dist/meta-png.umd.js");
var prismOfficialThemesBaseUrl = /* @__PURE__ */ getUrl("prismjs@1.29.0/themes/");
var prismThemesBaseUrl = /* @__PURE__ */ getUrl("prism-themes@1.9.0/themes/");
var prismThemeNordUrl = /* @__PURE__ */ getUrl(
  "gh:GalenWong/nord-prism-js@9f085d2a64b37f72a516540ba3f87877d12d7e2d/prism-nord.css"
);
var prismThemesLaserWaveUrl = /* @__PURE__ */ getUrl(
  "gh:PrismJS/prism-themes@447479fc7b2be2051fe27e561aceed7cc87a589f/themes/prism-laserwave.css"
);

// src/livecodes/editor/codejar/prism-themes.ts
var changeLineNumberColor = (color) => `.line-numbers-rows > span::before { color: ${color} !important; }`;
var prismThemes = [
  { name: "a11y-dark", title: "A11y Dark", url: prismThemesBaseUrl + "prism-a11y-dark.css" },
  { name: "atom-dark", title: "Atom Dark", url: prismThemesBaseUrl + "prism-atom-dark.css" },
  {
    name: "base16-ateliersulphurpool-light",
    title: "Base16 Ateliersulphurpool Light",
    url: prismThemesBaseUrl + "prism-base16-ateliersulphurpool.light.css"
  },
  {
    name: "catppuccin-latte",
    title: "Catppuccin Latte",
    url: vendorsBaseUrl + "catppuccin/prism/latte.css"
  },
  {
    name: "catppuccin-frappe",
    title: "Catppuccin Frappe",
    url: vendorsBaseUrl + "catppuccin/prism/frappe.css"
  },
  {
    name: "catppuccin-macchiato",
    title: "Catppuccin Macchiato",
    url: vendorsBaseUrl + "catppuccin/prism/macchiato.css"
  },
  {
    name: "catppuccin-mocha",
    title: "Catppuccin Mocha",
    url: vendorsBaseUrl + "catppuccin/prism/mocha.css"
  },
  { name: "cb", title: "CB", url: prismThemesBaseUrl + "prism-cb.css" },
  {
    name: "coldark-cold",
    title: "Coldark Cold",
    url: prismThemesBaseUrl + "prism-coldark-cold.css"
  },
  {
    name: "coldark-dark",
    title: "Coldark Dark",
    url: prismThemesBaseUrl + "prism-coldark-dark.css"
  },
  { name: "coy", title: "Coy", url: prismOfficialThemesBaseUrl + "prism-coy.css" },
  {
    name: "coy-without-shadows",
    title: "Coy Without Shadows",
    url: prismThemesBaseUrl + "prism-coy-without-shadows.css"
  },
  { name: "darcula", title: "Darcula", url: prismThemesBaseUrl + "prism-darcula.css" },
  { name: "dark", title: "Dark", url: prismOfficialThemesBaseUrl + "prism-dark.css" },
  { name: "dracula", title: "Dracula", url: prismThemesBaseUrl + "prism-dracula.css" },
  {
    name: "duotone-dark",
    title: "Duotone Dark",
    url: prismThemesBaseUrl + "prism-duotone-dark.css"
  },
  {
    name: "duotone-earth",
    title: "Duotone Earth",
    url: prismThemesBaseUrl + "prism-duotone-earth.css"
  },
  {
    name: "duotone-forest",
    title: "Duotone Forest",
    url: prismThemesBaseUrl + "prism-duotone-forest.css"
  },
  {
    name: "duotone-light",
    title: "Duotone Light",
    url: prismThemesBaseUrl + "prism-duotone-light.css"
  },
  {
    name: "duotone-sea",
    title: "Duotone Sea",
    url: prismThemesBaseUrl + "prism-duotone-sea.css"
  },
  {
    name: "duotone-space",
    title: "Duotone Space",
    url: prismThemesBaseUrl + "prism-duotone-space.css"
  },
  { name: "funky", title: "Funky", url: prismOfficialThemesBaseUrl + "prism-funky.css" },
  { name: "ghcolors", title: "GH Colors", url: prismThemesBaseUrl + "prism-ghcolors.css" },
  {
    name: "gruvbox-dark",
    title: "Gruvbox Dark",
    url: prismThemesBaseUrl + "prism-gruvbox-dark.css"
  },
  {
    name: "gruvbox-light",
    title: "Gruvbox Light",
    url: prismThemesBaseUrl + "prism-gruvbox-light.css"
  },
  { name: "holi-theme", title: "Holi Theme", url: prismThemesBaseUrl + "prism-holi-theme.css" },
  { name: "hopscotch", title: "Hopscotch", url: prismThemesBaseUrl + "prism-hopscotch.css" },
  { name: "laserwave", title: "Laserwave", url: prismThemesLaserWaveUrl },
  { name: "lucario", title: "Lucario", url: prismThemesBaseUrl + "prism-lucario.css" },
  {
    name: "material-dark",
    title: "Material Dark",
    url: prismThemesBaseUrl + "prism-material-dark.css"
  },
  {
    name: "material-light",
    title: "Material Light",
    url: prismThemesBaseUrl + "prism-material-light.css"
  },
  {
    name: "material-oceanic",
    title: "Material Oceanic",
    url: prismThemesBaseUrl + "prism-material-oceanic.css"
  },
  {
    name: "monochrome",
    title: "Monochrome",
    // code[class*="language-"],pre[class*="language-"]{color:#24292e;background-color:#fffffe;}
    url: "data:text/css;charset=UTF-8;base64,Y29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLHByZVtjbGFzcyo9Imxhbmd1YWdlLSJde2NvbG9yOiMyNDI5MmU7YmFja2dyb3VuZC1jb2xvcjojZmZmZmZlO30="
  },
  {
    name: "monochrome-dark",
    title: "Monochrome Dark",
    // code[class*="language-"],pre[class*="language-"]{color:#e2e2e3;background-color:#24292e;}
    url: "data:text/css;charset=UTF-8;base64,Y29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLHByZVtjbGFzcyo9Imxhbmd1YWdlLSJde2NvbG9yOiNlMmUyZTM7YmFja2dyb3VuZC1jb2xvcjojMjQyOTJlO30="
  },
  { name: "night-owl", title: "Night Owl", url: prismThemesBaseUrl + "prism-night-owl.css" },
  { name: "nord", title: "Nord", url: prismThemesBaseUrl + "prism-nord.css" },
  { name: "nord-2", title: "Nord 2", url: prismThemeNordUrl },
  { name: "okaidia", title: "Okaidia", url: prismOfficialThemesBaseUrl + "prism-okaidia.css" },
  { name: "one-dark", title: "One Dark", url: prismThemesBaseUrl + "prism-one-dark.css" },
  { name: "one-light", title: "One Light", url: prismThemesBaseUrl + "prism-one-light.css" },
  { name: "pojoaque", title: "Pojoaque", url: prismThemesBaseUrl + "prism-pojoaque.css" },
  {
    name: "shades-of-purple",
    title: "Shades of Purple",
    url: prismThemesBaseUrl + "prism-shades-of-purple.css"
  },
  {
    name: "solarized-dark-atom",
    title: "Solarized Dark Atom",
    url: prismThemesBaseUrl + "prism-solarized-dark-atom.css"
  },
  {
    name: "solarized-light",
    title: "Solarized Light",
    url: prismOfficialThemesBaseUrl + "prism-solarizedlight.css"
  },
  { name: "synthwave84", title: "Synthwave 84", url: prismThemesBaseUrl + "prism-synthwave84.css" },
  { name: "tomorrow", title: "Tomorrow", url: prismOfficialThemesBaseUrl + "prism-tomorrow.css" },
  { name: "twilight", title: "Twilight", url: prismOfficialThemesBaseUrl + "prism-twilight.css" },
  { name: "vs", title: "VS", url: prismThemesBaseUrl + "prism-vs.css" },
  {
    name: "vsc-dark-plus",
    title: "VSC Dark Plus",
    url: prismThemesBaseUrl + "prism-vsc-dark-plus.css"
  },
  {
    name: "xonokai",
    title: "Xonokai",
    url: prismThemesBaseUrl + "prism-xonokai.css",
    overrideCSS: changeLineNumberColor("#6f705e")
  },
  { name: "z-touchs", title: "Z-Touchs", url: prismThemesBaseUrl + "prism-z-touch.css" }
];

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

// src/livecodes/utils/utils.ts
var debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    if (timeout)
      clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(null, args), typeof delay === "function" ? delay() : delay);
  };
};
var safeName = (name, symbol = "_") => name.replace(/[\W]+/g, symbol);
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
var copyImage = async (image, type) => {
  const mimeTypes = {
    png: "image/png",
    jpg: "image/jpeg",
    svg: "image/svg+xml"
  };
  try {
    if ("write" in navigator.clipboard) {
      await navigator.clipboard.write([new ClipboardItem({ [mimeTypes[type]]: image })]);
      return true;
    }
  } catch (err) {
  }
  return false;
};
var getRandomString = () => String(Math.random()) + "-" + Date.now().toFixed();
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
var loadStylesheet = (url, id, insertBefore) => {
  if (id && document.getElementById(id))
    return;
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = url;
  stylesheet.id = id || "styles-" + getRandomString();
  stylesheet.crossOrigin = "anonymous";
  document.head.insertBefore(
    stylesheet,
    insertBefore ? document.querySelector(insertBefore) : null
  );
};
var colorToRgba = (name) => {
  const fakeDiv = document.createElement("div");
  fakeDiv.style.color = name;
  document.body.appendChild(fakeDiv);
  const style = window.getComputedStyle(fakeDiv);
  const colorValue = style.getPropertyValue("color") || "rgb(77, 121, 179)";
  document.body.removeChild(fakeDiv);
  const rgba = colorValue.split("(")[1].split(")")[0].split(",").map((x) => Number(x));
  const [r, g, b, a = 1] = rgba;
  return { r, g, b, a };
};
var predefinedValues = {
  APP_VERSION: "47",
  SDK_VERSION: "0.12.0",
  COMMIT_SHA: "7b4906d",
  REPO_URL: "https://github.com/live-codes/livecodes",
  DOCS_BASE_URL: "http://localhost:3000/docs/"
};

// src/livecodes/html/code-to-image.html?raw
var code_to_image_default = '<div id="code-to-img-container" class="modal-container">\r\n  <div class="modal-title" data-i18n="codeToImage.heading">Code to Image</div>\r\n  <div class="modal-screen-container">\r\n    <div class="modal-screen">\r\n      <label data-i18n="codeToImage.preview">Preview</label>\r\n      <!-- <a href="#" id="code-to-img-copy-link" class="code-link" data-i18n="codeToImage.copy">Copy</a> -->\r\n      <!-- <a href="#" id="code-to-img-format-link" class="code-link" data-i18n="codeToImage.format">Format</a> -->\r\n      <div id="code-to-img-preview-background" dir="ltr">\r\n        <div id="code-to-img-preview-container"></div>\r\n        <div id="code-to-img-watermark"></div>\r\n      </div>\r\n      <form id="code-to-img-form">\r\n        <div class="accordion">\r\n          <button class="title" data-i18n="codeToImage.presets">Presets</button>\r\n          <div class="panel" id="presets-container"></div>\r\n\r\n          <button class="title" data-i18n="codeToImage.layout">Layout</button>\r\n          <div class="panel">\r\n            <label class="range-slider-label" data-i18n="codeToImage.background">Background</label>\r\n            <div class="input-container color-picker-container">\r\n              <input\r\n                type="text"\r\n                class="color-picker"\r\n                name="code-to-img-bg1"\r\n                id="code-to-img-bg1"\r\n                placeholder="color 1"\r\n              />\r\n              <input\r\n                type="text"\r\n                class="color-picker"\r\n                name="code-to-img-bg2"\r\n                id="code-to-img-bg2"\r\n                placeholder="color 2"\r\n              />\r\n              <select name="code-to-img-bgDirection" id="code-to-img-bgDirection">\r\n                <option value="" data-i18n="codeToImage.direction">Direction</option>\r\n                <option value="to bottom">\u2193</option>\r\n                <option value="to top">\u2191</option>\r\n                <option value="to right">\u2192</option>\r\n                <option value="to left">\u2190</option>\r\n                <option value="to bottom right">\u2198</option>\r\n                <option value="to bottom left">\u2199</option>\r\n                <option value="to top right">\u2197</option>\r\n                <option value="to top left">\u2196</option>\r\n              </select>\r\n            </div>\r\n\r\n            <label class="range-slider-label" data-i18n="codeToImage.width">Width</label>\r\n            <div class="input-container">\r\n              <input\r\n                type="range"\r\n                min="30"\r\n                max="100"\r\n                class="range-slider"\r\n                name="code-to-img-width"\r\n              />\r\n            </div>\r\n\r\n            <label class="range-slider-label" data-i18n="codeToImage.padding">Padding</label>\r\n            <div class="input-container">\r\n              <input\r\n                type="range"\r\n                min="0"\r\n                max="64"\r\n                value="48"\r\n                class="range-slider"\r\n                name="code-to-img-padding"\r\n              />\r\n            </div>\r\n\r\n            <label class="range-slider-label" data-i18n="codeToImage.borderRadius"\r\n              >Border Radius</label\r\n            >\r\n            <div class="input-container">\r\n              <input\r\n                type="range"\r\n                min="0"\r\n                max="30"\r\n                value="5"\r\n                class="range-slider"\r\n                name="code-to-img-borderRadius"\r\n              />\r\n            </div>\r\n\r\n            <label data-i18n="codeToImage.shadow">Shadow</label>\r\n            <div class="input-container">\r\n              <input\r\n                type="checkbox"\r\n                class="switch"\r\n                value="true"\r\n                checked="checked"\r\n                name="code-to-img-shadow"\r\n              />\r\n            </div>\r\n\r\n            <label data-i18n="codeToImage.windowStyle.label">Window Style</label>\r\n            <div class="input-container">\r\n              <span>\r\n                <input\r\n                  name="code-to-img-windowStyle"\r\n                  type="radio"\r\n                  value="none"\r\n                  checked="checked"\r\n                  id="code-to-img-windowStyle-none"\r\n                />\r\n                <label\r\n                  for="code-to-img-windowStyle-none"\r\n                  class="radio-label"\r\n                  data-i18n="codeToImage.windowStyle.none"\r\n                  >None</label\r\n                >\r\n              </span>\r\n              <span>\r\n                <input\r\n                  name="code-to-img-windowStyle"\r\n                  type="radio"\r\n                  value="mac"\r\n                  id="code-to-img-windowStyle-mac"\r\n                />\r\n                <label\r\n                  for="code-to-img-windowStyle-mac"\r\n                  class="radio-label"\r\n                  data-i18n="codeToImage.windowStyle.mac"\r\n                  >macOS</label\r\n                >\r\n              </span>\r\n              <span>\r\n                <input\r\n                  name="code-to-img-windowStyle"\r\n                  type="radio"\r\n                  value="windows"\r\n                  id="code-to-img-windowStyle-windows"\r\n                />\r\n                <label\r\n                  for="code-to-img-windowStyle-windows"\r\n                  class="radio-label"\r\n                  data-i18n="codeToImage.windowStyle.windows"\r\n                  >Windows</label\r\n                >\r\n              </span>\r\n            </div>\r\n\r\n            <label data-i18n="codeToImage.shareUrl">Share URL</label>\r\n            <div class="input-container">\r\n              <input type="checkbox" class="switch" value="true" name="code-to-img-watermark" />\r\n            </div>\r\n          </div>\r\n\r\n          <button class="title" data-i18n="codeToImage.code">Code</button>\r\n          <div class="panel">\r\n            <label data-i18n="codeToImage.theme">Theme</label>\r\n            <div class="input-container">\r\n              <select name="code-to-img-editorTheme" id="code-to-img-editorTheme"></select>\r\n            </div>\r\n\r\n            <label class="range-slider-label" data-i18n="codeToImage.opacity">Opacity</label>\r\n            <div class="input-container">\r\n              <input\r\n                type="range"\r\n                min="0.7"\r\n                max="1.0"\r\n                step="0.01"\r\n                class="range-slider"\r\n                name="code-to-img-opacity"\r\n                id="code-to-img-opacity"\r\n              />\r\n            </div>\r\n\r\n            <label data-i18n="codeToImage.fontFamily">Font Family</label>\r\n            <div class="input-container">\r\n              <select name="code-to-img-fontFamily" id="code-to-img-fontFamily">\r\n                <option value="" data-i18n="codeToImage.default">Default</option>\r\n              </select>\r\n            </div>\r\n\r\n            <label data-i18n="codeToImage.fontSize">Font Size</label>\r\n            <div class="input-container">\r\n              <select name="code-to-img-fontSize" id="code-to-img-fontSize">\r\n                <option value="10">10</option>\r\n                <option value="11">11</option>\r\n                <option value="12">12</option>\r\n                <option value="13">13</option>\r\n                <option value="14">14</option>\r\n                <option value="15">15</option>\r\n                <option value="16">16</option>\r\n                <option value="17">17</option>\r\n                <option value="18">18</option>\r\n                <option value="19">19</option>\r\n                <option value="20">20</option>\r\n                <option value="22">22</option>\r\n                <option value="24">24</option>\r\n                <option value="26">26</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n\r\n          <button class="title" data-i18n="codeToImage.image">Image</button>\r\n          <div class="panel">\r\n            <label data-i18n="codeToImage.scale">Image Scale</label>\r\n            <div class="input-container">\r\n              <span>\r\n                <input name="code-to-img-scale" type="radio" value="1" id="code-to-img-scale-1" />\r\n                <label for="code-to-img-scale-1" class="radio-label">1x</label>\r\n              </span>\r\n              <span>\r\n                <input name="code-to-img-scale" type="radio" value="2" id="code-to-img-scale-2" />\r\n                <label for="code-to-img-scale-2" class="radio-label">2x</label>\r\n              </span>\r\n              <span>\r\n                <input name="code-to-img-scale" type="radio" value="3" id="code-to-img-scale-3" />\r\n                <label for="code-to-img-scale-3" class="radio-label">3x</label>\r\n              </span>\r\n              <span>\r\n                <input name="code-to-img-scale" type="radio" value="4" id="code-to-img-scale-4" />\r\n                <label for="code-to-img-scale-4" class="radio-label">4x</label>\r\n              </span>\r\n            </div>\r\n\r\n            <label data-i18n="codeToImage.imageFormat.label">Image Format</label>\r\n            <div class="input-container">\r\n              <span>\r\n                <input\r\n                  name="code-to-img-format"\r\n                  type="radio"\r\n                  value="png"\r\n                  id="code-to-img-format-png"\r\n                />\r\n                <label\r\n                  for="code-to-img-format-png"\r\n                  class="radio-label"\r\n                  data-i18n="codeToImage.imageFormat.png"\r\n                  >PNG</label\r\n                >\r\n              </span>\r\n              <span>\r\n                <input\r\n                  name="code-to-img-format"\r\n                  type="radio"\r\n                  value="jpg"\r\n                  id="code-to-img-format-jpg"\r\n                />\r\n                <label\r\n                  for="code-to-img-format-jpg"\r\n                  class="radio-label"\r\n                  data-i18n="codeToImage.imageFormat.jpg"\r\n                  >JPEG</label\r\n                >\r\n              </span>\r\n              <span>\r\n                <input\r\n                  name="code-to-img-format"\r\n                  type="radio"\r\n                  value="svg"\r\n                  id="code-to-img-format-svg"\r\n                />\r\n                <label\r\n                  for="code-to-img-format-svg"\r\n                  class="radio-label"\r\n                  data-i18n="codeToImage.imageFormat.svg"\r\n                  >SVG</label\r\n                >\r\n              </span>\r\n            </div>\r\n\r\n            <label data-i18n="codeToImage.fileName">File Name</label>\r\n            <div class="input-container">\r\n              <input name="code-to-img-fileName" type="text" id="code-to-img-fileName" />\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </form>\r\n      <div id="code-to-img-actions">\r\n        <button id="code-to-img-save-btn" class="wide-button" data-i18n="codeToImage.save">\r\n          Save Image\r\n        </button>\r\n        <button\r\n          id="code-to-img-menu-btn"\r\n          class="button"\r\n          title="Share"\r\n          data-i18n="codeToImage.shareTitle"\r\n          data-i18n-prop="title"\r\n        >\r\n          <i class="icon-share"></i>\r\n        </button>\r\n        <div id="code-to-img-menu-container">\r\n          <ul id="code-to-img-share-menu" class="dropdown-menu">\r\n            <li>\r\n              <a href="#" id="code-to-img-share-btn" data-i18n="codeToImage.shareImage"\r\n                >Share Image</a\r\n              >\r\n            </li>\r\n            <li>\r\n              <a href="#" id="code-to-img-copy-img-btn" data-i18n="codeToImage.copyImage"\r\n                >Copy Image</a\r\n              >\r\n            </li>\r\n            <li>\r\n              <a href="#" id="code-to-img-copy-code-btn" data-i18n="codeToImage.copyCode"\r\n                >Copy Code</a\r\n              >\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n';

// src/livecodes/html/index.ts
var replaceValues = (str) => Object.entries(predefinedValues).reduce(
  (str2, [key, value]) => str2.replace(new RegExp(`{{${key}}}`, "g"), value),
  str
);
var codeToImageScreen = /* @__PURE__ */ replaceValues(code_to_image_default);

// src/livecodes/UI/code-to-image.ts
var getEditorOptions = (options) => ({
  container: options.container,
  editorTheme: options.editorTheme,
  fontFamily: options.fontFamily,
  fontSize: options.fontSize,
  lineNumbers: options.lineNumbers,
  wordWrap: options.wordWrap
});
var createCodeToImageUI = async ({
  baseUrl,
  currentUrl,
  fileName,
  editorId,
  modal,
  notifications,
  eventsManager,
  deps
}) => {
  const div = document.createElement("div");
  div.innerHTML = codeToImageScreen.replace(/{{baseUrl}}/g, baseUrl);
  const codeToImageContainer = div.firstChild;
  const edirtorContainer = codeToImageContainer.querySelector(
    "#code-to-img-preview-container"
  );
  const backgroundEl = codeToImageContainer.querySelector(
    "#code-to-img-preview-background"
  );
  const form = codeToImageContainer.querySelector("#code-to-img-form");
  if (!edirtorContainer || !form)
    return;
  const presetsContainer = form.querySelector("#presets-container");
  const defaultPreset = {
    id: "default",
    container: edirtorContainer,
    bg1: "#f5f5dc",
    bg2: "",
    bgDirection: "to bottom right",
    opacity: 0.9,
    windowStyle: "none",
    watermark: false,
    editorTheme: "dracula",
    fontFamily: "fira-code",
    fontSize: 14,
    lineNumbers: false,
    wordWrap: true,
    borderRadius: 5,
    shadow: true,
    width: 70,
    padding: 48,
    format: "png",
    scale: 1,
    fileName
  };
  const selectPreset = (id) => {
    presetsContainer.querySelectorAll(".preset").forEach((p) => {
      if (p.dataset.id === id) {
        p.classList.add("active");
      } else {
        p.classList.remove("active");
      }
    });
  };
  const updateCustomPreset = (id) => {
    const preset = getFormData();
    const customPreset = presets.find((preset2) => preset2.id === "custom");
    if (!customPreset)
      return;
    Object.keys(preset).filter((key) => key !== "id").forEach((key) => {
      customPreset[key] = preset[key];
    });
    if (id === "custom") {
      deps.savePreset(customPreset);
    } else {
      deps.savePreset({ id });
    }
  };
  const applyPreset = (preset) => {
    const fullPreset = {
      ...defaultPreset,
      ...preset
    };
    const excludedKeys = ["container", "width", "fileName"];
    const keys = Object.keys(fullPreset);
    keys.filter((key) => !excludedKeys.includes(key) && form[`code-to-img-${key}`] != null).forEach((key) => {
      const field = form[`code-to-img-${key}`];
      if (field.type === "checkbox") {
        field.checked = fullPreset[key];
      } else {
        field.value = String(fullPreset[key]);
      }
      if (key === "bg1" || key === "bg2") {
        const parent = field.parentNode;
        if (parent.classList.contains("clr-field")) {
          parent.style.color = field.value;
        }
      }
      if (key === "opacity" && fullPreset.opacity == null) {
        field.value = "1";
      }
    });
    updateOptions(
      /* reset = */
      true
    );
    selectPreset(fullPreset.id);
  };
  const populatePresets = () => {
    presets.forEach((preset) => {
      const presetBtn = document.createElement("btn");
      presetBtn.classList.add("preset");
      presetBtn.dataset.id = preset.id;
      if (preset.id === "custom") {
        presetBtn.textContent = window.deps.translateString("generic.custom", "Custom");
      } else {
        const img = document.createElement("img");
        img.src = `${baseUrl}assets/code-to-img/${preset.id}.jpg`;
        presetBtn.appendChild(img);
      }
      presetBtn.addEventListener("click", () => {
        applyPreset(preset);
        updateCustomPreset(preset.id);
      });
      presetBtn.tabIndex = 0;
      eventsManager.addEventListener(presetBtn, "keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          presetBtn.click();
        }
      });
      presetsContainer.appendChild(presetBtn);
    });
  };
  populatePresets();
  modal.show(codeToImageContainer, { isAsync: true, size: "full" });
  const initializeEditor = async (options) => {
    const ed = await deps.createEditor(getEditorOptions(options));
    if (ed.getValue().trim() === "") {
      editorId = "script";
      ed.setLanguage("tsx", defaultCode);
    }
    deps.getFormatFn().then((fn) => {
      setTimeout(() => {
        ed.registerFormatter(fn);
      }, 500);
    });
    eventsManager.addEventListener(
      codeToImageContainer.querySelector("#code-to-img-format-link"),
      "click",
      (ev) => {
        ev.preventDefault();
        ed.format();
      }
    );
    return ed;
  };
  const editorThemesSelect = form.querySelector("#code-to-img-editorTheme");
  prismThemes.forEach((theme) => {
    const option = document.createElement("option");
    option.text = theme.title;
    option.value = theme.name;
    editorThemesSelect.appendChild(option);
  });
  const fontFamilySelect = form.querySelector("#code-to-img-fontFamily");
  fonts.forEach((font) => {
    const option = document.createElement("option");
    option.text = font.name;
    option.value = font.id;
    fontFamilySelect.appendChild(option);
  });
  Object.keys(defaultPreset).forEach((key) => {
    const field = form[`code-to-img-${key}`];
    if (!field)
      return;
    if (field.type === "checkbox") {
      field.checked = defaultPreset[key];
    } else {
      field.value = String(defaultPreset[key]);
    }
  });
  import(colorisBaseUrl + "esm/coloris.min.js").then((colorisModule) => {
    const Coloris = colorisModule.default;
    Coloris.init();
    Coloris({
      el: "#code-to-img-bg1",
      parent: ".modal-screen-container",
      swatches: [
        "#264653",
        "#2a9d8f",
        "#e9c46a",
        "#f4a261",
        "#e76f51",
        "#d62828",
        "#023e8a",
        "#0077b6",
        "#0096c7",
        "#00b4d8",
        "#48cae4",
        "#f5f5dc",
        "#4a90e2"
      ]
    });
    Coloris({ el: "#code-to-img-bg2" });
  });
  loadStylesheet(colorisBaseUrl + "coloris.css");
  const editor = await initializeEditor(defaultPreset);
  const windowControls = document.createElement("div");
  windowControls.id = "code-to-img-window-controls";
  windowControls.innerHTML = `
  <span id="code-to-img-mac" class="window-buttons"><svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle><circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle><circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle></g></svg></span>
  <span id="code-to-img-title" class="window-title" spellcheck="false" contenteditable="true"></span>
  <span id="code-to-img-windows" class="window-buttons"><svg width="58" height="14" viewBox="0 0 58 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 7H11" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"></path><path d="M35 1H25C24.4477 1 24 1.44772 24 2V12C24 12.5523 24.4477 13 25 13H35C35.5523 13 36 12.5523 36 12V2C36 1.44772 35.5523 1 35 1Z" stroke="#878787"></path><path d="M47 2L57 12" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"></path><path d="M47 12L57 2" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
`;
  edirtorContainer.querySelector("pre")?.prepend(windowControls);
  const watermark = backgroundEl.querySelector("#code-to-img-watermark");
  const updateWatermark = (url) => {
    watermark.innerHTML = `
    <img src="${baseUrl}assets/images/livecodes-logo.svg" alt="LiveCodes logo" />
    ${url}
  `;
  };
  updateWatermark(currentUrl);
  const getCodeConfig = () => ({
    title: windowControls.querySelector("#code-to-img-title").textContent || "",
    activeEditor: editorId,
    [editorId]: {
      language: editor.getLanguage(),
      content: editor.getValue()
    }
  });
  let cachedConfig;
  let formData;
  const getFormData = () => {
    formData = Array.from(new FormData(form)).reduce(
      (acc, [name, value]) => ({
        ...acc,
        [name.replace("code-to-img-", "")]: value === "true" ? true : value === "false" ? false : value === "" ? void 0 : !isNaN(Number(value)) ? Number(value) : value
      }),
      {}
    );
    const booleanFields = ["lineNumbers", "wordWrap", "shadow", "watermark"];
    booleanFields.forEach((key) => {
      if (!(key in formData)) {
        formData[key] = false;
      }
    });
    return formData;
  };
  const adjustSize = (formData2, initialLoad) => {
    backgroundEl.style.padding = formData2.padding + "px";
    backgroundEl.style.margin = 64 - formData2.padding + "px";
    if (initialLoad) {
      setTimeout(() => {
        formData2.width = backgroundEl.offsetWidth / backgroundEl.parentElement.offsetWidth * 100;
        form[`code-to-img-width`].value = formData2.width;
      }, 150);
    } else {
      const color1 = formData2.bg1 || "#f5f5dc";
      const color2 = formData2.bg2 || color1;
      const direction = formData2.bgDirection || "to bottom";
      backgroundEl.style.backgroundImage = `linear-gradient(${direction}, ${color1}, ${color2})`;
      backgroundEl.style.width = formData2.width + "%";
      edirtorContainer.style.width = backgroundEl.offsetWidth - formData2.padding * 2 + "px";
    }
  };
  const updateOptions = async (reset = false) => {
    const formData2 = getFormData();
    editor.changeSettings(formData2);
    adjustSize(formData2, reset);
    const color1 = formData2.bg1 || "#f5f5dc";
    const color2 = formData2.bg2 || color1;
    const direction = formData2.bgDirection || "to bottom";
    backgroundEl.style.backgroundImage = `linear-gradient(${direction}, ${color1}, ${color2})`;
    edirtorContainer.style.borderRadius = formData2.borderRadius + "px";
    edirtorContainer.querySelector("pre").style.borderRadius = formData2.borderRadius + "px";
    edirtorContainer.querySelector("code").style.borderRadius = formData2.borderRadius + "px";
    const editorBackground = edirtorContainer.querySelector("pre");
    const editorCode = edirtorContainer.querySelector("code");
    const applyOpacity = () => {
      editorBackground.style.background = "";
      editorCode.style.background = "";
      if (formData2.opacity === 1)
        return;
      const { r, g, b } = colorToRgba(getComputedStyle(editorBackground).backgroundColor);
      editorBackground.style.background = `rgba(${r}, ${g}, ${b}, ${formData2.opacity})`;
      editorCode.style.background = `rgba(${r}, ${g}, ${b}, 0)`;
    };
    setTimeout(applyOpacity, 50);
    setTimeout(applyOpacity, 200);
    setTimeout(applyOpacity, 500);
    setTimeout(applyOpacity, 1e3);
    setTimeout(applyOpacity, 2e3);
    edirtorContainer.classList.toggle("shadow", Boolean(formData2.shadow));
    watermark.hidden = !formData2.watermark;
    watermark.classList.toggle("shadow", Boolean(formData2.shadow));
    windowControls.style.display = formData2.windowStyle === "none" ? "none" : "flex";
    windowControls.querySelector("#code-to-img-windows").style.visibility = formData2.windowStyle === "windows" ? "visible" : "hidden";
    windowControls.querySelector("#code-to-img-mac").style.visibility = formData2.windowStyle === "mac" ? "visible" : "hidden";
    if (formData2.watermark && !cachedConfig) {
      updateShareLink();
    }
  };
  const updateShareLink = async () => {
    const newConfig = getCodeConfig();
    if (formData.watermark && JSON.stringify(cachedConfig) !== JSON.stringify(newConfig)) {
      cachedConfig = newConfig;
      const url = await deps.getShareUrl(
        newConfig,
        /* shortUrl = */
        true
      );
      updateWatermark(url);
    }
  };
  const debouncedUpdateOptions = debounce(updateOptions, 500);
  eventsManager.addEventListener(form, "input", (e) => {
    if (e?.target?.id === "code-to-img-editorTheme") {
      form["code-to-img-opacity"].value = "1";
    }
    if (e?.target?.id === "code-to-img-opacity") {
      debouncedUpdateOptions();
    } else {
      updateOptions();
    }
    if (!["fileName", "width"].map((n) => "code-to-img-" + n).includes(e?.target?.name)) {
      updateCustomPreset("custom");
      selectPreset("custom");
    }
  });
  updateOptions(
    /* reset = */
    true
  );
  eventsManager.addEventListener(window, "resize", () => adjustSize(getFormData(), true));
  const htmlToImagePromise = loadScript(htmlToImageUrl, "htmlToImage");
  const metaPngPromise = loadScript(metaPngUrl, "MetaPNG");
  const getImageUrl = async () => {
    const htmlToImage = await htmlToImagePromise;
    await updateShareLink();
    const container = backgroundEl;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const scale = formData.scale || 1;
    const methodNames = {
      png: "toPng",
      jpg: "toJpeg",
      svg: "toSvg"
    };
    let dataUrl = await htmlToImage[methodNames[formData.format] || "toPng"](container, {
      quality: 1,
      width: width * scale,
      height: height * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        margin: "0",
        width: `${width}px`,
        height: `${height}px`
      }
    });
    if (formData.format === "png") {
      try {
        const metaPng = await metaPngPromise;
        const newConfig = getCodeConfig();
        let url;
        if (formData.watermark && JSON.stringify(cachedConfig) === JSON.stringify(newConfig)) {
          url = watermark.innerText.trim();
        } else {
          url = await deps.getShareUrl(newConfig, formData.watermark);
        }
        dataUrl = metaPng.addMetadataFromBase64DataURI(dataUrl, "LiveCodes URL", url);
      } catch {
      }
    }
    return dataUrl;
  };
  const saveBtn = codeToImageContainer.querySelector("#code-to-img-save-btn");
  eventsManager.addEventListener(saveBtn, "click", async () => {
    saveBtn.disabled = true;
    saveBtn.classList.add("disabled");
    const btnText = saveBtn.innerText;
    saveBtn.innerText = window.deps.translateString("core.generating", "Generating...");
    getImageUrl().then((dataUrl) => {
      downloadFile(formData.fileName, formData.format || "png", dataUrl);
    }).catch(() => {
      notifications.error(
        window.deps.translateString("core.error.failedToSaveImage", "Failed to save image")
      );
    }).finally(() => {
      saveBtn.disabled = false;
      saveBtn.classList.remove("disabled");
      saveBtn.innerText = btnText;
    });
  });
  const menu = codeToImageContainer.querySelector("#code-to-img-share-menu");
  const menuBtn = codeToImageContainer.querySelector("#code-to-img-menu-btn");
  eventsManager.addEventListener(menuBtn, "click", () => {
    const currentDisplay = menu.style.display;
    menu.style.display = currentDisplay === "block" ? "none" : "block";
  });
  eventsManager.addEventListener(document, "click", (e) => {
    if (!menu || !menuBtn)
      return;
    if (e.target !== menuBtn && !menuBtn.contains(e.target)) {
      menu.style.display = "none";
    }
  });
  const shareBtn = codeToImageContainer.querySelector("#code-to-img-share-btn");
  eventsManager.addEventListener(shareBtn, "click", () => {
    const btnText = shareBtn.innerText;
    shareBtn.innerText = window.deps.translateString("core.generating", "Generating...");
    getImageUrl().then(async (dataUrl) => {
      const blob = await fetch(dataUrl).then((res) => res.blob());
      const data = {
        files: [
          new File([blob], `${formData.fileName}.${formData.format || "png"}`, {
            type: blob.type
          })
        ],
        title: "LiveCodes Code to Image"
      };
      await navigator.share(data);
    }).catch(() => {
      notifications.error(
        window.deps.translateString("core.error.failedToShareImage", "Failed to share image")
      );
    }).finally(() => {
      shareBtn.innerText = btnText;
    });
  });
  const copyImageBtn = codeToImageContainer.querySelector(
    "#code-to-img-copy-img-btn"
  );
  eventsManager.addEventListener(copyImageBtn, "click", () => {
    const btnText = copyImageBtn.innerText;
    copyImageBtn.innerText = window.deps.translateString("core.generating", "Generating...");
    getImageUrl().then(async (dataUrl) => {
      const blob = await fetch(dataUrl).then((res) => res.blob());
      const imageCopied = await copyImage(blob, formData.format || "png");
      if (imageCopied) {
        notifications.success(
          window.deps.translateString("core.copy.copiedImage", "Image copied to clipboard.")
        );
        return;
      }
    }).catch(() => {
      notifications.error(
        window.deps.translateString("core.error.failedToCopyImage", "Failed to copy image")
      );
    }).finally(() => {
      copyImageBtn.innerText = btnText;
    });
  });
  const copyCodeBtn = codeToImageContainer.querySelector(
    "#code-to-img-copy-code-btn"
  );
  eventsManager.addEventListener(copyCodeBtn, "click", (ev) => {
    ev.preventDefault();
    const code = editor.getValue();
    if (copyToClipboard(code)) {
      notifications.success(
        window.deps.translateString("core.copy.copied", "Code copied to clipboard")
      );
    } else {
      notifications.error(
        window.deps.translateString("core.error.failedToCopyCode", "Failed to copy code")
      );
    }
  });
  const savedPreset = deps.getSavedPreset();
  if (!savedPreset) {
    applyPreset(presets[0]);
  } else if (savedPreset.id === "custom") {
    applyPreset(savedPreset);
  } else {
    applyPreset(presets.find((preset) => preset.id === savedPreset.id) || presets[0]);
  }
};
var presets = [
  {
    id: "preset_1",
    bg1: "#4a90e2",
    bg2: "#c162f5",
    bgDirection: "to bottom left",
    editorTheme: "one-dark",
    shadow: true,
    windowStyle: "mac"
  },
  {
    id: "preset_2",
    bg1: "#48cae4",
    bg2: "#f562f5",
    bgDirection: "to bottom right",
    editorTheme: "laserwave",
    shadow: true
  },
  {
    id: "preset_3",
    bg1: "#823bb9",
    bg2: "#f4a261",
    bgDirection: "to bottom right",
    editorTheme: "duotone-dark",
    windowStyle: "mac",
    shadow: true
  },
  {
    id: "preset_4",
    bg1: "#c3ac75",
    bg2: "#ff8e38",
    borderRadius: 15,
    shadow: true,
    editorTheme: "darcula",
    opacity: 0.95,
    fontFamily: "fira-code"
  },
  {
    id: "preset_5",
    bg1: "#f5f5dc",
    bg2: "",
    bgDirection: "to bottom right",
    editorTheme: "dracula",
    shadow: true
  },
  {
    id: "preset_6",
    bg1: "#deecdd",
    bg2: "#c1dfc4",
    bgDirection: "to bottom",
    shadow: true,
    editorTheme: "tomorrow",
    opacity: 1,
    windowStyle: "none",
    fontFamily: "nova-mono"
  },
  {
    id: "preset_7",
    bg1: "#fd978b",
    bg2: "#f9748f",
    windowStyle: "mac",
    shadow: true,
    editorTheme: "holi-theme",
    opacity: 0.85
  },
  {
    id: "preset_8",
    bg1: "#e94057",
    bg2: "#a52c78",
    bgDirection: "to bottom left",
    shadow: true,
    editorTheme: "funky",
    opacity: 0.95
  },
  {
    id: "preset_9",
    bg1: "#4cb88e",
    bg2: "#1e6267",
    bgDirection: "to bottom",
    shadow: true,
    editorTheme: "holi-theme",
    fontFamily: "cascadia-code"
  },
  {
    id: "preset_10",
    bg1: "#07a2a2",
    bg2: "",
    editorTheme: "a11y-dark",
    shadow: true
  },
  {
    id: "preset_11",
    bg1: "#4a90e2",
    bg2: "",
    editorTheme: "dracula",
    fontFamily: "monaspace-radon",
    shadow: false
  },
  {
    id: "preset_12",
    bg1: "#48cae4",
    bg2: "#0096c7",
    shadow: true,
    editorTheme: "shades-of-purple",
    windowStyle: "mac",
    fontFamily: "monofur",
    fontSize: 16
  },
  {
    id: "preset_13",
    bg1: "#111c28",
    bg2: "#111c28",
    padding: 10,
    borderRadius: 0,
    shadow: false,
    editorTheme: "coldark-dark",
    windowStyle: "none",
    fontFamily: "monaspace-krypton"
  },
  {
    id: "preset_14",
    bg1: "#f2daa1",
    bg2: "#998149",
    shadow: true,
    editorTheme: "gruvbox-light",
    fontFamily: "jetbrains-mono"
  },
  {
    id: "preset_15",
    bg1: "#494949",
    bg2: "#494949",
    editorTheme: "coldark-cold",
    opacity: 1,
    shadow: true,
    windowStyle: "windows"
  },
  {
    id: "preset_16",
    bg1: "#243b55",
    bg2: "#141e30",
    bgDirection: "to right",
    shadow: true,
    editorTheme: "vs",
    opacity: 0.95,
    windowStyle: "none",
    fontFamily: "sf-mono"
  },
  {
    id: "preset_17",
    bg1: "#ffffff",
    bg2: "#e2efff",
    shadow: true,
    editorTheme: "coy-without-shadows",
    opacity: 1,
    fontFamily: "hack"
  },
  {
    id: "custom"
  }
];
var defaultCode = `
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(count + 1);
  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
`.trimStart();
export {
  createCodeToImageUI
};
