"use strict";
(() => {
  // node_modules/js-base64/base64.mjs
  var _hasbtoa = typeof btoa === "function";
  var _hasBuffer = typeof Buffer === "function";
  var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
  var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
  var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var b64chs = Array.prototype.slice.call(b64ch);
  var b64tab = ((a) => {
    let tab = {};
    a.forEach((c, i) => tab[c] = i);
    return tab;
  })(b64chs);
  var _fromCC = String.fromCharCode.bind(String);
  var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
  var _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
  var btoaPolyfill = (bin) => {
    let u32, c0, c1, c2, asc = "";
    const pad = bin.length % 3;
    for (let i = 0; i < bin.length; ) {
      if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255)
        throw new TypeError("invalid character found");
      u32 = c0 << 16 | c1 << 8 | c2;
      asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
    }
    return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
  };
  var _btoa = _hasbtoa ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
  var _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
    const maxargs = 4096;
    let strs = [];
    for (let i = 0, l = u8a.length; i < l; i += maxargs) {
      strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
    }
    return _btoa(strs.join(""));
  };
  var cb_utob = (c) => {
    if (c.length < 2) {
      var cc = c.charCodeAt(0);
      return cc < 128 ? c : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
    } else {
      var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
      return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
    }
  };
  var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
  var utob = (u) => u.replace(re_utob, cb_utob);
  var _encode = _hasBuffer ? (s) => Buffer.from(s, "utf8").toString("base64") : _TE ? (s) => _fromUint8Array(_TE.encode(s)) : (s) => _btoa(utob(s));
  var encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);

  // src/livecodes/utils/utils.ts
  var toDataUrl = (content, type = "text/javascript") => `data:${type};charset=UTF-8;base64,` + encode(content);
  var createWorkerFromContent = (content) => {
    try {
      return new Worker(toDataUrl(content));
    } catch (e) {
      return new Worker(URL.createObjectURL(new Blob([content], { type: "application/javascript" })));
    }
  };

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
  var browserfsUrl = /* @__PURE__ */ getUrl("browserfs@1.4.3/dist/browserfs.min.js");
  var doppioJvmBaseUrl = "https://unpkg.com/@seth0x41/doppio@1.0.0/";

  // src/livecodes/languages/java/lang-java-script.ts
  var doppioJvmUrl = doppioJvmBaseUrl + "doppio.js";
  var doppioJvmJarsUrl = doppioJvmBaseUrl + "java_home/";
  var getWorkerSrc = () => `
      var window = self;

      // overriding annoying ZipFS warnings
      const originalWarn = console.warn;
      console.warn = function(message) {
        if (message && message.includes("ZipFS")) {
          return;
        }
        originalWarn.apply(console, arguments);
      };
      const originalLog = console.log;
      console.log = function(message) {
        if (message && message.includes("@stu")) {
          return;
        }
        originalLog.apply(console, arguments);
      };

      // loading BrowserFS
      importScripts('${browserfsUrl}');
      importScripts('${doppioJvmUrl}');

      function createDir(fs, path) {
        const parts = path.split('/').filter(Boolean);
        let current = '';
        for (const part of parts) {
          current += \`/\${part}\`;
          if (!fs.existsSync(current)) fs.mkdirSync(current);
        }
      }

      async function initFS() {
        BrowserFS.install(self);
        const mfs = new BrowserFS.FileSystem.MountableFileSystem();
        BrowserFS.initialize(mfs);
        mfs.mount('/tmp', new BrowserFS.FileSystem.InMemory());
        mfs.mount('/release', new BrowserFS.FileSystem.InMemory());

        const fs = BrowserFS.BFSRequire('fs');
        self.javaFS = { fs };

        createDir(fs, '/release/vendor/java_home/lib');
        createDir(fs, '/release/vendor/natives');

        // load essential JAR files
        const jarBaseUrl = '${doppioJvmJarsUrl}';
        const jars = ['doppio.jar', 'rt.jar', 'tools.jar', 'jce.jar', 'charsets.jar', 'currency.data'];
        await Promise.all(jars.map(async jar => {
          try {
            const response = await fetch(\`\${jarBaseUrl}\${jar}\`);
            if (!response.ok) throw new Error(\`Failed to fetch \${jar}: \${response.status}\`);
            const buffer = await response.arrayBuffer();
            fs.writeFileSync(\`/release/vendor/java_home/lib/\${jar}\`, Buffer.from(buffer));
            // console.log(\`loaded \${jar}\`);
          } catch (e) {
            console.error(\`error loading \${jar}: \${e.message}\`);
          }
        }));
      }

      const initialize = initFS();
      initialize.then(() => {
        postMessage({ initialized: true });
      });

      // Run Java code
      let lastCode = null;
      let lastClassName = null;

      const runCode = async (code, input) => {
        let output = null;
        let error = null;
        let exitCode = 0;

        try {
          await initialize;

          const fs = self.javaFS.fs;
          const process = BrowserFS.BFSRequire('process');

          const className = (code.match(/public\\s+class\\s+(\\w+)/)?.[1]) || 'Main';
          const filePath = \`/tmp/\${className}.java\`;
          const classFilePath = \`/tmp/\${className}.class\`;

          const shouldCompile = lastCode !== code || lastClassName !== className || !fs.existsSync(classFilePath);

          if (shouldCompile) {
            if (fs.existsSync('/tmp')) fs.readdirSync('/tmp').forEach(f => fs.unlinkSync(\`/tmp/\${f}\`));
            // console.log('Cleared /tmp directory');

            fs.writeFileSync(filePath, code);
            // console.log(\`Wrote source to \${filePath}\`);
            // console.log('Files in /tmp after writing:', fs.readdirSync('/tmp'));

            const classpath = '/release/vendor/java_home/lib/doppio.jar:/release/vendor/java_home/lib/rt.jar:/release/vendor/java_home/lib/tools.jar:/release/vendor/java_home/lib/jce.jar:/release/vendor/java_home/lib/charsets.jar';
            let compileOutput = '';

            process.stdout.removeAllListeners('data');
            process.stderr.removeAllListeners('data');
            process.stdout.on('data', data => compileOutput += data.toString());
            process.stderr.on('data', data => compileOutput += data.toString());

            const compileExitCode = await new Promise(resolve => {
              self.Doppio.VM.CLI(
                ['-classpath', classpath, 'com.sun.tools.javac.Main', filePath],
                {
                  doppioHomePath: '/release',
                  javaHomePath: '/release/vendor/java_home',
                  nativeClasspath: ['/release/vendor/natives'],
                },
                resolve
              );
            });

            // console.log('Compilation exit code:', compileExitCode);
            // console.log('Compilation output:', compileOutput);
            // console.log('files in /tmp after compilation:', fs.readdirSync('/tmp'));

            if (compileExitCode !== 0) {
              throw new Error(\`Compilation failed with exit code \${compileExitCode}. Output: \${compileOutput}\`);
            }

            if (!fs.existsSync(classFilePath)) {
              throw new Error(\`class file \${classFilePath} not found after compilation\`);
            }

            lastCode = code;
            lastClassName = className;
          } else {
            // console.log('Skipping compilation: Code unchanged and .class file exists');
          }

          let output = '';
          process.stdout.removeAllListeners('data');
          process.stderr.removeAllListeners('data');
          process.stdout.on('data', data => {
            output += data.toString();
          });
          process.stderr.on('data', data => {
            output += data.toString();
          });
          if (input) {
            process.stdin.write(input);
          }

          const runExitCode = await new Promise(resolve => {
            self.Doppio.VM.CLI(
              ['-classpath', '/tmp', className],
              {
                doppioHomePath: '/release',
                javaHomePath: '/release/vendor/java_home',
                nativeClasspath: ['/release/vendor/natives'],
              },
              resolve
            );
          });

          // console.log('Run exit code:', runExitCode);
          // console.log('Final output:', output);
          return { input, output, error, exitCode: runExitCode };
        } catch (err) {
          error = err.message ?? err;
          exitCode = err.code ?? 1;
          return { input, output, error, exitCode };
        }
      };

      addEventListener('message', async (e) => {
        const code = e.data.code;
        const input = e.data.input;
        const result = code.trim() ? await runCode(code, input) : {};
        postMessage(result);
      });

      postMessage({ loaded: true });
    `;
  livecodes.java = livecodes.java || {};
  livecodes.java.run = livecodes.java.run || ((input = "") => new Promise((resolve) => {
    let code = "";
    livecodes.java.input = input;
    livecodes.java.output = null;
    const scripts = document.querySelectorAll('script[type="text/java"]');
    scripts.forEach((script) => code += script.innerHTML + "\n");
    livecodes.java.worker.onmessage = function(e) {
      if (e.data.loaded) {
        livecodes.java.worker.loaded = true;
        return;
      }
      if (e.data.initialized) {
        console.log("Java environment initialized successfully.");
        return;
      }
      const result = e.data;
      if (result.error != null) {
        console.error(result.error);
      } else if (result.output != null) {
        console.log(result.output);
      }
      livecodes.java.input = result.input;
      livecodes.java.output = result.output;
      livecodes.java.error = result.error;
      livecodes.java.exitCode = result.exitCode;
      livecodes.java.ready = true;
      resolve(result);
    };
    livecodes.java.worker.postMessage({ code, input: `${String(input ?? "")}
` });
  }));
  livecodes.java.loaded = new Promise(async function(resolve) {
    const i = setInterval(() => {
      if (livecodes.java.ready) {
        clearInterval(i);
        return resolve();
      }
    }, 50);
  });
  window.addEventListener("load", async () => {
    livecodes.java.ready = false;
    parent.postMessage({ type: "loading", payload: true }, "*");
    const workerSrc = await getWorkerSrc();
    const init = () => {
      if (livecodes.java.worker)
        return;
      console.log("Initializing Java environment...");
      livecodes.java.worker = createWorkerFromContent(workerSrc);
    };
    init();
    const result = await livecodes.java.run(livecodes.java.input);
    parent.postMessage({ type: "loading", payload: false }, "*");
  });
})();
