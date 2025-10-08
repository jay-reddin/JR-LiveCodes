"use strict";
(() => {
  // src/livecodes/events/custom-events.ts
  var customEvents = {
    init: "livecodes-init",
    getConfig: "livecodes-get-config",
    config: "livecodes-config",
    load: "livecodes-load",
    appLoaded: "livecodes-app-loaded",
    ready: "livecodes-ready",
    change: "livecodes-change",
    testResults: "livecodes-test-results",
    console: "livecodes-console",
    destroy: "livecodes-destroy",
    resizeEditor: "livecodes-resize-editor",
    apiResponse: "livecodes-api-response",
    i18n: "livecodes-i18n"
  };

  // src/livecodes/html/app.html?raw
  var app_default = `<!doctype html>\r
<html lang="en" dir="ltr">\r
  <head>\r
    <meta charset="UTF-8" />\r
    <meta name="viewport" content="width=device-width, initial-scale=1" />\r
    {{codeiumMeta}}\r
    <title>LiveCodes</title>\r
    <style>\r
      body {\r
        overflow: hidden;\r
      }\r
    </style>\r
    <link rel="preconnect" href="https://cdn.jsdelivr.net/" crossorigin />\r
    <link rel="dns-prefetch" href="https://cdn.jsdelivr.net/" />\r
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin />\r
    <link rel="stylesheet" href="{{baseUrl}}app.css" id="app-styles" />\r
    <script src="{{esModuleShimsUrl}}" async><\/script>\r
    <script type="importmap">\r
      {\r
        "imports": {\r
          "codemirror": "{{codemirrorCoreUrl}}",\r
          "@codemirror/autocomplete": "{{codemirrorCoreUrl}}",\r
          "@codemirror/commands": "{{codemirrorCoreUrl}}",\r
          "@codemirror/language": "{{codemirrorCoreUrl}}",\r
          "@codemirror/lint": "{{codemirrorCoreUrl}}",\r
          "@codemirror/search": "{{codemirrorCoreUrl}}",\r
          "@codemirror/state": "{{codemirrorCoreUrl}}",\r
          "@codemirror/theme-one-dark": "{{codemirrorCoreUrl}}",\r
          "@codemirror/view": "{{codemirrorCoreUrl}}",\r
          "@codemirror/lang-html": "{{codemirrorCoreUrl}}",\r
          "@codemirror/lang-css": "{{codemirrorCoreUrl}}",\r
          "@codemirror/lang-javascript": "{{codemirrorCoreUrl}}",\r
          "@codemirror/lang-json": "{{codemirrorCoreUrl}}",\r
          "@lezer/common": "{{codemirrorCoreUrl}}",\r
          "@lezer/highlight": "{{codemirrorCoreUrl}}",\r
          "@lezer/lr": "{{codemirrorCoreUrl}}",\r
          "@replit/codemirror-indentation-markers": "{{codemirrorCoreUrl}}",\r
          "@replit/codemirror-vscode-keymap": "{{codemirrorCoreUrl}}",\r
          "@replit/codemirror-css-color-picker": "{{codemirrorCoreUrl}}"\r
        }\r
      }\r
    <\/script>\r
  </head>\r
  <body>\r
    <div id="container">\r
      <div id="toolbar">\r
        <div class="toolbar-app">\r
          <div class="toolbar-menu">\r
            <a\r
              href="/"\r
              id="logo"\r
              title="LiveCodes: A Code Playground That Just Works!"\r
              data-i18n="app.logo.title"\r
              data-i18n-prop="title"\r
            >\r
              <img\r
                alt="LiveCodes Logo"\r
                src="{{baseUrl}}assets/images/livecodes-logo.svg"\r
                loading="lazy"\r
              />\r
            </a>\r
            <a\r
              href="javascript:void(0)"\r
              id="app-menu-button-project"\r
              class="app-menu-button menu"\r
              title="Project"\r
              data-i18n="menu.appProject.hint"\r
              data-i18n-prop="title"\r
              aria-label="Project"\r
            >\r
              <i class="icon-nav"></i>\r
              <span class="menu-text" data-i18n="menu.appProject.heading">Project</span>\r
            </a>\r
            <div id="app-menu-container-project" class="menu-scroller"></div>\r
            <a\r
              href="javascript:void(0)"\r
              id="app-menu-button-settings"\r
              class="app-menu-button menu"\r
              title="App Settings"\r
              data-i18n="menu.appSettings.hint"\r
              data-i18n-prop="title"\r
              aria-label="Settings"\r
            >\r
              <i class="icon-settings"></i>\r
              <span class="menu-text" data-i18n="menu.appSettings.heading">Settings</span>\r
            </a>\r
            <div id="app-menu-container-settings" class="menu-scroller"></div>\r
            <a\r
              href="javascript:void(0)"\r
              id="app-menu-button-help"\r
              class="app-menu-button menu"\r
              title="Help"\r
              data-i18n="menu.appHelp.hint"\r
              data-i18n-prop="title"\r
              aria-label="Help"\r
            >\r
              <i class="icon-help"></i>\r
              <span class="menu-text" data-i18n="menu.appHelp.heading">Help</span>\r
            </a>\r
            <div id="app-menu-container-help" class="menu-scroller"></div>\r
            <a\r
              href="javascript:void(0)"\r
              id="app-menu-button-i18n"\r
              class="app-menu-button button"\r
              title="UI Language"\r
              data-i18n="app.i18nButton.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-i18n"></i>\r
            </a>\r
            <div id="app-menu-container-i18n" class="menu-scroller"></div>\r
            <a\r
              href="javascript:void(0)"\r
              id="light-theme-button"\r
              class="button"\r
              title="Change Theme"\r
              data-i18n="app.changeTheme.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-theme-light"></i>\r
            </a>\r
            <a\r
              href="javascript:void(0)"\r
              id="dark-theme-button"\r
              class="button"\r
              title="Change Theme"\r
              data-i18n="app.changeTheme.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-theme-dark"></i>\r
            </a>\r
            <div class="enable-motion"></div>\r
          </div>\r
          <div id="select-editor"></div>\r
        </div>\r
        <div class="toolbar-render">\r
          <div>\r
            <div\r
              id="project-title"\r
              contenteditable="true"\r
              spellcheck="false"\r
              data-i18n="app.untitledProject"\r
            >\r
              Untitled Project\r
            </div>\r
            <a\r
              href="javascript:void(0)"\r
              id="run-button"\r
              class="button"\r
              title="Run (Shift + Enter)"\r
              data-i18n="app.run.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-run"></i>\r
            </a>\r
            <a\r
              href="javascript:void(0)"\r
              id="share-button"\r
              class="button"\r
              title="Share (Ctrl/\u2318 + Alt + S)"\r
              data-i18n="app.share.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-share"></i>\r
            </a>\r
\r
            <a\r
              href="javascript:void(0)"\r
              id="result-button"\r
              class="button"\r
              title="Result (Ctrl/\u2318 + Alt + R)"\r
              data-i18n="app.result.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-result"></i>\r
            </a>\r
            <a\r
              href="javascript:void(0)"\r
              id="fullscreen-button"\r
              title="Full Screen"\r
              class="button -left"\r
              data-i18n="app.fullscreen.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-full-screen"></i>\r
            </a>\r
          </div>\r
          <a href="#" id="login-link" class="menu -left" title="Login" aria-label="Login">\r
            <i class="icon-login"></i>\r
            <span class="menu-text" data-i18n="menu.login">Login</span></a\r
          >\r
          <a href="#" id="logout-link" class="menu -left" aria-label="Logout" style="display: none">\r
            <i class="icon-logout"></i>\r
            <span class="menu-text" data-i18n="menu.logout">Log out</span></a\r
          >\r
        </div>\r
      </div>\r
      <div id="editor-container">\r
        <div id="editors">\r
          <div id="markup" class="editor"></div>\r
          <div id="style" class="editor"></div>\r
          <div id="script" class="editor"></div>\r
          <div id="editor-tools" class="tool-buttons">\r
            <button\r
              type="button"\r
              id="focus-btn"\r
              title="Toggle Focus mode (Ctrl/\u2318 + K, Z)"\r
              data-i18n="app.focus.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-editor-focus"></i>\r
            </button>\r
            <button\r
              type="button"\r
              id="format-btn"\r
              title="Format (Alt + Shift + F)"\r
              data-i18n="app.format.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-editor-format"></i>\r
            </button>\r
            <button\r
              type="button"\r
              id="undo-btn"\r
              title="Undo (Ctrl/\u2318 + Z)"\r
              data-i18n="app.undo.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-editor-undo"></i>\r
            </button>\r
            <button\r
              type="button"\r
              id="redo-btn"\r
              title="Redo (Ctrl/\u2318 + Shift + Z)"\r
              data-i18n="app.redo.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-editor-redo"></i>\r
            </button>\r
            <button\r
              type="button"\r
              id="copy-btn"\r
              title="Copy (Ctrl/\u2318 + A, Ctrl/\u2318 + C)"\r
              data-i18n="app.copy.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-editor-copy"></i>\r
            </button>\r
            <button\r
              type="button"\r
              id="copy-as-url-btn"\r
              title="Copy code as data URL"\r
              data-i18n="app.copyAsUrl.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-editor-copy-url"></i>\r
            </button>\r
            <button\r
              type="button"\r
              id="code-to-img-btn"\r
              title="Code to Image"\r
              data-i18n="app.codeToImage.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-camera"></i>\r
            </button>\r
            <span id="editor-status">\r
              <span id="editor-mode" title="Editor Mode"></span>\r
              <span data-status="markup"></span>\r
              <span data-status="style"></span>\r
              <span data-status="script"></span>\r
            </span>\r
            <button\r
              type="button"\r
              id="external-resources-btn"\r
              title="External Resources"\r
              data-i18n="app.externalResources.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-editor-external"></i>\r
              <span id="external-resources-mark" class="mark"></span>\r
            </button>\r
            <button\r
              type="button"\r
              id="project-info-btn"\r
              title="Project Info"\r
              data-i18n="app.projectInfo.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-editor-project"></i>\r
              <span id="project-info-mark" class="mark"></span>\r
            </button>\r
            <button\r
              type="button"\r
              id="custom-settings-btn"\r
              title="Custom Settings"\r
              data-i18n="app.customSettings.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-editor-settings-custom"></i>\r
              <span id="custom-settings-mark" class="mark"></span>\r
            </button>\r
            <button\r
              type="button"\r
              id="editor-settings-btn"\r
              title="Editor Settings"\r
              data-i18n="app.editorSettings.hint"\r
              data-i18n-prop="title"\r
            >\r
              <i class="icon-editor-settings"></i>\r
            </button>\r
          </div>\r
        </div>\r
        <div id="output">\r
          <div id="result" class="full"></div>\r
          <div id="tools-pane"></div>\r
        </div>\r
      </div>\r
    </div>\r
    <div id="overlay" style="display: none"></div>\r
    <dialog id="modal">\r
      <div id="modal-container"></div>\r
      <div class="snackbars-left"></div>\r
    </dialog>\r
    <ninja-keys\r
      placeholder="Type a command or search..."\r
      data-i18n="commandMenu.placeholder"\r
      data-i18n-prop="placeholder"\r
      highlight-matches\r
      disableHotkeys\r
    ></ninja-keys>\r
    <div id="result-mode-drawer" class="hidden">\r
      <a href="#">\r
        <div id="drawer-logo">\r
          <img\r
            alt="LiveCodes Logo"\r
            src="{{baseUrl}}assets/images/livecodes-logo.svg"\r
            loading="lazy"\r
          />\r
        </div>\r
        <div id="drawer-text">\r
          <span data-i18n="resultMode.linkText">Edit on LiveCodes</span>\r
          <svg viewBox="6 6 12 12" xmlns="http://www.w3.org/2000/svg">\r
            <g>\r
              <path\r
                d="M15 13.5V9M15 9H10.5M15 9L9.00019 14.9999"\r
                stroke="currentColor"\r
                stroke-width="2"\r
                stroke-linecap="round"\r
              ></path>\r
            </g>\r
          </svg>\r
        </div>\r
      </a>\r
      <div>\r
        <button id="drawer-close">\r
          <svg viewBox="0 0 16 16">\r
            <path\r
              fill="rgb(119, 128, 137)"\r
              d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z"\r
              fill-rule="evenodd"\r
            ></path>\r
          </svg>\r
        </button>\r
      </div>\r
    </div>\r
    <script\r
      src="https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js"\r
      crossorigin="anonymous"\r
    ><\/script>\r
    <script>\r
      window.appCDN = '{{appCDN}}';\r
    <\/script>\r
    {{codemirrorModule}}\r
    <script type="module">\r
      import { app } from '{{baseUrl}}{{script}}';\r
      window.app = app;\r
    <\/script>\r
  </body>\r
</html>\r
`;

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
  var isInIframe = () => {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
      return false;
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  };

  // src/livecodes/vendors.ts
  var { getUrl, getModuleUrl } = modulesService;
  var codeMirrorBaseUrl = /* @__PURE__ */ getUrl("@live-codes/codemirror@0.3.2/build/");
  var esModuleShimsPath = "es-module-shims@1.10.0/dist/es-module-shims.js";

  // src/livecodes/main.ts
  var params = new URLSearchParams(location.search);
  var isHeadless = params.get("headless") != null && params.get("headless") !== "false" || params.get("view") === "headless";
  var isLite = params.get("mode") === "lite" || params.get("lite") != null && params.get("lite") !== "false";
  var isEmbed = isHeadless || isLite || params.get("embed") != null && params.get("embed") !== "false" || isInIframe();
  var loadingParam = params.get("loading");
  var clickToLoad = isEmbed && loadingParam !== "eager";
  var loading = !isEmbed ? "eager" : loadingParam === "lazy" || loadingParam === "click" || loadingParam === "eager" ? loadingParam : "lazy";
  var disableAI = params.get("disableAI") != null && params.get("disableAI") !== "false" || params.get("enableAI") === "false";
  var livecodes = (container, config = {}) => new Promise(async (resolve) => {
    const containerElement = document.querySelector(container);
    if (!containerElement) {
      throw new Error(`Cannot find element with the selector: "${container}"`);
    }
    const baseUrl = (location.origin + location.pathname).split("/").slice(0, -1).join("/") + "/livecodes/";
    if (config.mode === "lite") {
      isEmbed = true;
    }
    const scriptFile = isHeadless ? "headless.js" : isEmbed ? "embed.js" : "app.js";
    const anyOrigin = "*";
    const style = document.createElement("style");
    style.innerHTML = `
        ${container} {
            min-width: 300px;
            min-height: 200px;
            padding: 0;
            overflow: hidden;
        }
        ${container} > iframe {
            border: 0;
            width: 100%;
            height: 100%;
        }
        ${container}.embed iframe {
            width: calc(100% - 2px);
            height: calc(100% - 2px);
            border: 1px solid #001b25;
            border-radius: 8px;
        }
    `;
    document.head.appendChild(style);
    const loadApp = async () => {
      const appCDN = await modulesService.checkCDNs(esModuleShimsPath, params.get("appCDN"));
      const supportsImportMaps = HTMLScriptElement.supports ? HTMLScriptElement.supports("importmap") : false;
      const iframe = document.createElement("iframe");
      iframe.name = "app";
      iframe.style.display = "none";
      const disableAIQuery = disableAI ? `?disableAI` : "";
      iframe.src = "./app.html" + disableAIQuery;
      let contentLoaded = false;
      iframe.onload = () => {
        if (contentLoaded)
          return;
        const appContent = app_default.replace(/{{baseUrl}}/g, baseUrl).replace(/{{script}}/g, scriptFile).replace(/{{appCDN}}/g, appCDN).replace(/{{esModuleShimsUrl}}/g, modulesService.getUrl(esModuleShimsPath, appCDN)).replace(
          /{{codemirrorModule}}/g,
          supportsImportMaps ? "" : `
    <script type="module">
      import * as mod from '${baseUrl}codemirror.js';
      window['${baseUrl}codemirror.js'] = mod;
    <\/script>
    `
        ).replace(/{{codemirrorCoreUrl}}/g, `${codeMirrorBaseUrl}codemirror-core.js`).replace(/src="[^"]*?\.svg"/g, (str) => isHeadless ? 'src=""' : str).replace(
          /{{codeiumMeta}}/g,
          `<meta name="codeium:type" content="${disableAI ? "none" : "monaco"}" />`
        );
        iframe.contentWindow?.postMessage({ content: appContent }, location.origin);
        contentLoaded = true;
      };
      containerElement.appendChild(iframe);
      if (isEmbed) {
        const registerSDKEvent = (sdkEvent, hasData = false) => {
          window.addEventListener(sdkEvent, (e) => {
            if (hasData && e.detail == null)
              return;
            parent.postMessage(
              { type: sdkEvent, ...hasData ? { payload: e.detail } : {} },
              anyOrigin
            );
          });
        };
        registerSDKEvent(customEvents.appLoaded);
        registerSDKEvent(customEvents.ready);
        registerSDKEvent(customEvents.change, true);
        registerSDKEvent(customEvents.testResults, true);
        registerSDKEvent(customEvents.console, true);
        registerSDKEvent(customEvents.destroy);
      }
      let api = null;
      addEventListener(
        "message",
        async (e) => {
          if (e.data?.args === "i18n") {
            if (e.source !== iframe.contentWindow)
              return;
            if (!isEmbed) {
              const i18nSplashData = e.data.payload.data;
              for (const [key, value] of Object.entries(i18nSplashData)) {
                localStorage.setItem(`i18n_splash.${key}`, value);
              }
            }
            const lang = e.data.payload.lang;
            document.documentElement.lang = lang;
            const reload = e.data.payload.reload;
            const appUrl = e.data.payload.url;
            if (reload) {
              const url = new URL(appUrl || location.href);
              if (appUrl && lang) {
                url.searchParams.set("appLanguage", lang);
              } else {
                url.searchParams.delete("appLanguage");
              }
              if (isEmbed) {
                url.searchParams.set("embed", "");
              }
              location.href = url.href;
            }
            return;
          }
          if (isEmbed) {
            if (e.source !== parent || api == null)
              return;
            const { method, id, args } = e.data ?? {};
            if (!method || !id)
              return;
            const methodArguments = Array.isArray(args) ? args : [args];
            let payload;
            try {
              payload = await api[method](...methodArguments);
            } catch (error) {
              payload = { error: error.message || error };
            }
            if (typeof payload === "object") {
              Object.keys(payload).forEach((key) => {
                if (typeof payload[key] === "function") {
                  delete payload[key];
                }
              });
            }
            parent.postMessage(
              {
                type: customEvents.apiResponse,
                method,
                id,
                payload
              },
              anyOrigin
            );
          } else {
            if (e.source !== iframe.contentWindow)
              return;
            if (e.data?.args === "home") {
              location.href = location.origin + location.pathname;
            } else if (e.data?.args === "console-message") {
              console.info(...e.data.payload ?? []);
            }
          }
        }
      );
      iframe.addEventListener("load", async () => {
        const app = iframe.contentWindow?.app;
        if (typeof app === "function") {
          api = await app(config, baseUrl);
          if (!isHeadless) {
            iframe.style.display = "block";
          }
          window.dispatchEvent(
            new CustomEvent(customEvents.appLoaded, {
              detail: api
            })
          );
          resolve(api);
        }
      });
    };
    if (clickToLoad) {
      window.addEventListener(
        customEvents.load,
        () => {
          loadApp();
        },
        { once: true }
      );
      const preloadLink = document.createElement("link");
      preloadLink.href = baseUrl + scriptFile;
      preloadLink.rel = "preload";
      preloadLink.as = "script";
      document.head.appendChild(preloadLink);
    } else {
      loadApp();
    }
  });

  // src/livecodes/index.ts
  var sdkVersion = params.get("sdkVersion");
  var rootSelector = "#livecodes";
  var loadingEl = document.querySelector("#loading");
  var loadingText = document.querySelector("#loading-text");
  var loadingHTML = loadingEl.innerHTML;
  if (isEmbed) {
    parent.postMessage(
      { type: customEvents.init, payload: { appVersion: "47" } },
      "*"
    );
    document.body.classList.add("embed");
    if (clickToLoad) {
      loadingEl.classList.add("click-to-load");
      loadingEl.title = "Click to Load";
      loadingText.innerText = "Click to load LiveCodes";
      loadingEl.addEventListener("click", load);
      addEventListener("message", (e) => {
        if (e.source === parent && e.data?.type === customEvents.load) {
          load();
        }
      });
      if (loading === "lazy" && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries, observer2) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                load();
                observer2.unobserve(document.body);
              }
            });
          },
          { rootMargin: "150px" }
        );
        observer.observe(document.body);
      }
    }
  } else {
    const i18nItem = (item) => `i18n_${item}`;
    const i18nLoadingText = localStorage.getItem(i18nItem("splash.loading"));
    if (i18nLoadingText) {
      loadingText.innerText = i18nLoadingText;
    }
  }
  function load() {
    window.dispatchEvent(new Event(customEvents.load));
    if (!clickToLoad)
      return;
    loadingEl.style.opacity = "0";
    setTimeout(() => {
      loadingEl.classList.remove("click-to-load");
      loadingEl.innerHTML = loadingHTML;
      loadingEl.title = "";
      loadingEl.style.opacity = "1";
    }, 500);
  }
  function loaded() {
    loadingEl.style.opacity = "0";
    setTimeout(() => {
      loadingEl.remove();
    }, 500);
    document.querySelector(rootSelector).style.opacity = "1";
  }
  function resize() {
    document.body.style.height = window.innerHeight + "px";
  }
  resize();
  window.addEventListener("resize", resize, false);
  setTimeout(resize, 500);
  window.addEventListener(customEvents.appLoaded, (e) => {
    loaded();
    window.livecodes = e.detail;
  });
  window.addEventListener(customEvents.destroy, () => {
    window.removeEventListener("resize", resize);
    document.body.innerHTML = "";
    document.head.innerHTML = "";
  });
  if (isEmbed && params.get("config") === "sdk" && !sdkVersion) {
    addEventListener(
      "message",
      function configHandler(e) {
        if (e.source !== parent || e.data?.type !== customEvents.config)
          return;
        removeEventListener("message", configHandler);
        livecodes("#livecodes", e.data.payload).then(loaded);
      }
    );
    parent.postMessage({ type: customEvents.getConfig }, "*");
  } else {
    livecodes("#livecodes").then(loaded);
  }
})();
