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
var webRBaseUrl = /* @__PURE__ */ getUrl("webr@0.4.0/dist/");

// src/livecodes/languages/r/lang-r-script-esm.ts
var importPattern = /((?:(?:library)|(?:require))\s*?\(\s*?((?:".*?")|(?:'.*?')|(?:.*?))\s*?\))/g;
var removeComments = (src) => src.replace(/#.*$/gm, "");
var getImports = (code) => [...[...removeComments(code).matchAll(new RegExp(importPattern))]].map((arr) => arr[2].replace(/"/g, "").replace(/'/g, "").split(",")[0].trim()).filter(Boolean);
var defaultConfig = {
  canvasHeight: 309,
  canvasWidth: 500,
  canvasPointSize: 12,
  canvasBackground: "transparent"
};
livecodes.r.packages = [];
livecodes.r.run = livecodes.r.run || (async ({
  code,
  container,
  canvasHeight,
  canvasWidth,
  canvasPointSize,
  canvasBackground,
  env
} = {}) => {
  parent.postMessage({ type: "loading", payload: true }, "*");
  livecodes.r.output = "";
  livecodes.r.plots = [];
  if (container !== null && livecodes.r.config?.container !== null) {
    if (typeof container === "string") {
      container = document.querySelector(container);
    } else if (typeof livecodes.r.config?.container === "string") {
      container = document.querySelector(livecodes.r.config.container);
    }
    container = container || livecodes.r.config?.container || document.body;
  }
  canvasHeight = Number(
    canvasHeight || livecodes.r.config?.canvasHeight || defaultConfig.canvasHeight
  );
  canvasWidth = Number(
    canvasWidth || livecodes.r.config?.canvasWidth || defaultConfig.canvasWidth
  );
  canvasPointSize = Number(
    canvasPointSize || livecodes.r.config?.canvasPointSize || defaultConfig.canvasPointSize
  );
  canvasBackground = String(
    canvasBackground || livecodes.r.config?.canvasBackground || defaultConfig.canvasBackground
  );
  if (code == null) {
    code = "";
    const scripts = document.querySelectorAll('script[type="text/r"]');
    scripts.forEach((script) => code += script.innerHTML + "\n");
  }
  const imports = getImports(code).filter((pkg) => !livecodes.r.packages.includes(pkg));
  if (imports.length > 0) {
    await initialization;
    console.log("Installing packages: " + imports.join(", "));
    const pkgCode = imports.map((pkg) => `webr::install("${pkg}")
`).join("");
    await livecodes.r.run({ code: pkgCode, container: null });
    livecodes.r.packages = [.../* @__PURE__ */ new Set([...livecodes.r.packages, ...imports])];
  }
  let result;
  if (code.trim()) {
    await initialization;
    const { webR, webRCodeShelter } = livecodes.r;
    let canvas = null;
    const canvasList = [];
    await webR.init();
    result = await webRCodeShelter.captureR(code, {
      withAutoprint: true,
      captureStreams: true,
      captureConditions: false,
      env: env || livecodes.r.config?.env || {},
      captureGraphics: {
        width: canvasWidth,
        height: canvasHeight,
        bg: canvasBackground,
        pointsize: canvasPointSize
      }
    });
    try {
      await webR.evalRVoid("dev.off()");
      const getOutput = (type) => result?.output.filter((evt) => type === "all" || evt.type === type).map((evt) => evt.data).join("\n") || "";
      const output = getOutput("all");
      const stdout = getOutput("stdout");
      const stderr = getOutput("stderr");
      if (stderr.trim()) {
        console.log(stderr);
      }
      const images = result?.images || [];
      images.forEach((img) => {
        canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.style.width = String(canvasWidth) + "px";
        canvas.style.display = "block";
        canvas.style.margin = "auto";
        canvasList.push(canvas);
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, img.width, img.height);
      });
      if (container && typeof container !== "string") {
        container.innerHTML = "";
        const pre = document.createElement("pre");
        if (/\S/.test(stdout)) {
          const code2 = document.createElement("code");
          code2.innerText = stdout;
          pre.appendChild(code2);
        } else {
          pre.style.visibility = "hidden";
        }
        container.appendChild(pre);
        for (const canvas2 of canvasList) {
          const div = document.createElement("div");
          div.appendChild(canvas2);
          container.appendChild(div);
        }
      }
      livecodes.r.output = output;
      livecodes.r.plots = canvasList;
    } finally {
      webRCodeShelter.purge();
    }
  }
  parent.postMessage({ type: "loading", payload: false }, "*");
  return result;
});
var initialization = (async () => {
  parent.postMessage({ type: "loading", payload: true }, "*");
  const getChannelType = (ChannelType) => {
    if (typeof SharedArrayBuffer != "undefined") {
      return ChannelType.SharedArrayBuffer;
    } else {
      return ChannelType.PostMessage;
    }
  };
  const init = async () => {
    if (livecodes.r.ready) {
      await livecodes.r.webR.init();
      return;
    }
    console.log("Loading WebR...");
    const { WebR, ChannelType } = await import(webRBaseUrl + "webr.mjs");
    livecodes.r.webR = new WebR({
      baseUrl: webRBaseUrl,
      channelType: getChannelType(ChannelType)
    });
    await livecodes.r.webR.init();
    livecodes.r.webRCodeShelter = await new livecodes.r.webR.Shelter();
    livecodes.r.ready = true;
    console.log("WebR loaded.");
  };
  await init();
  parent.postMessage({ type: "loading", payload: false }, "*");
})();
livecodes.r.loaded = initialization;
