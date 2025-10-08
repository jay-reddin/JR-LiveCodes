"use strict";
(() => {
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
  var csharpWasmBaseUrl = /* @__PURE__ */ getUrl("@seth0x41/csharp-wasm@1.0.3/");

  // src/livecodes/languages/csharp-wasm/lang-csharp-wasm-script.ts
  livecodes.csharp ?? (livecodes.csharp = {});
  var waitFor = (condition, timeout = 3e4) => new Promise((resolve) => {
    const startTime = Date.now();
    const check = async () => {
      if (await condition())
        resolve(true);
      else if (Date.now() - startTime > timeout)
        resolve(false);
      else
        setTimeout(check, 100);
    };
    check();
  });
  var patchFetch = () => {
    const originalFetch = window.fetch;
    window.fetch = (resource, init = {}) => {
      const url = typeof resource === "string" ? resource : "url" in resource ? resource.url : resource.href;
      if (url.startsWith(csharpWasmBaseUrl)) {
        return originalFetch(resource, { ...init, credentials: "omit" });
      }
      return originalFetch(resource, init);
    };
  };
  var loadBlazorScript = () => new Promise((resolve, reject) => {
    const scriptSrc = `${csharpWasmBaseUrl}_framework/blazor.webassembly.js`;
    if (document.querySelector(`script[src="${scriptSrc}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.setAttribute("autostart", "false");
    script.onload = () => resolve();
    script.onerror = (err) => reject(new Error(`Failed to load Blazor script: ${err}`));
    document.head.appendChild(script);
  });
  var isReady = async () => {
    try {
      await window.DotNet.invokeMethodAsync("MyRunnyApp", "RunCode", "int x = 1 + 1;", "");
      return true;
    } catch (err) {
      return false;
    }
  };
  var runCSharpCode = async (code, input = "") => {
    await livecodes.csharp.init;
    try {
      const { output, errors } = await window.DotNet.invokeMethodAsync(
        "MyRunnyApp",
        "RunCode",
        code,
        input
      );
      return { output, error: errors || null };
    } catch (err) {
      const error = "Error: " + err.message;
      return { output: null, error };
    }
  };
  var _a;
  (_a = livecodes.csharp).init ?? (_a.init = (async () => {
    if (livecodes.csharp.ready)
      return;
    console.log("Initializing C# environment...");
    try {
      await loadBlazorScript();
      if (!window.Blazor)
        throw new Error("Blazor failed to load properly");
      patchFetch();
      await window.Blazor.start({
        loadBootResource: (_type, name) => `${csharpWasmBaseUrl}_framework/${name}`
      });
      if (!await waitFor(isReady)) {
        throw new Error("Timeout waiting for DotNet to be ready");
      }
      console.log("C# environment initialized successfully");
    } catch (err) {
      console.error("Failed to initialize C# environment:", err);
      livecodes.csharp.ready = false;
      livecodes.csharp.init = null;
      throw err;
    }
  })());
  var _a2;
  (_a2 = livecodes.csharp).run ?? (_a2.run = async (input) => {
    let code = "";
    livecodes.csharp.input = input;
    livecodes.csharp.output = null;
    livecodes.csharp.ready = false;
    const scripts = document.querySelectorAll('script[type="text/csharp-wasm"]');
    scripts.forEach((script) => code += script.innerHTML + "\n");
    const { output, error } = !code.trim() ? { output: null, error: null } : await runCSharpCode(code, input);
    if (error != null) {
      console.error(error);
    } else if (output != null) {
      console.log(output);
    }
    livecodes.csharp.output = output;
    livecodes.csharp.error = error;
    livecodes.csharp.exitCode = error ? 1 : 0;
    livecodes.csharp.ready = true;
    return { output, error, exitCode: 0 };
  });
  livecodes.csharp.loaded = new Promise((resolve) => {
    const interval = setInterval(() => {
      if (livecodes.csharp.ready) {
        clearInterval(interval);
        resolve();
      }
    }, 50);
  });
  window.addEventListener("load", async () => {
    parent.postMessage({ type: "loading", payload: true }, "*");
    await livecodes.csharp.run(livecodes.csharp.input);
    parent.postMessage({ type: "loading", payload: false }, "*");
  });
})();
