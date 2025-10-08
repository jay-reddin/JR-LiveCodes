"use strict";
(() => {
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
  };
  var __privateWrapper = (obj, member, setter, getter) => ({
    set _(value) {
      __privateSet(obj, member, value, setter);
    },
    get _() {
      return __privateGet(obj, member, getter);
    }
  });

  // src/livecodes/utils/utils.ts
  var getLanguageCustomSettings = (language, config) => ({
    ...config.customSettings[language]
  });
  var getErrorMessage = (err) => {
    if (err == null)
      return "";
    if (err instanceof Error)
      return err.message;
    if (err && typeof err === "object" && "message" in err && typeof err.message === "string") {
      return err.message;
    }
    return String(err);
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
  var gleamBaseUrl = /* @__PURE__ */ getUrl("gh:live-codes/gleam-precompiled@v0.5.0/");

  // src/livecodes/languages/gleam/gleam-modules.ts
  var srcBaseUrl = gleamBaseUrl + "build/packages/";
  var modules = {
    // gleam_stdlib
    "gleam/bit_array": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/bit_array.gleam" },
    "gleam/bool": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/bool.gleam" },
    "gleam/bytes_builder": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/bytes_builder.gleam" },
    "gleam/dict": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/dict.gleam" },
    "gleam/dynamic": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/dynamic.gleam" },
    "gleam/float": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/float.gleam" },
    "gleam/function": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/function.gleam" },
    "gleam/int": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/int.gleam" },
    "gleam/io": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/io.gleam" },
    "gleam/iterator": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/iterator.gleam" },
    "gleam/list": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/list.gleam" },
    "gleam/option": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/option.gleam" },
    "gleam/order": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/order.gleam" },
    "gleam/pair": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/pair.gleam" },
    "gleam/queue": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/queue.gleam" },
    "gleam/regex": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/regex.gleam" },
    "gleam/result": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/result.gleam" },
    "gleam/set": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/set.gleam" },
    "gleam/string": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/string.gleam" },
    "gleam/string_builder": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/string_builder.gleam" },
    "gleam/uri": { srcUrl: srcBaseUrl + "gleam_stdlib/src/gleam/uri.gleam" },
    // extras
    "gleam/crypto": { srcUrl: srcBaseUrl + "gleam_crypto/src/gleam/crypto.gleam" },
    "gleam/erlang": { srcUrl: srcBaseUrl + "gleam_erlang/src/gleam/erlang.gleam" },
    "gleam/erlang/atom": { srcUrl: srcBaseUrl + "gleam_erlang/src/gleam/erlang/atom.gleam" },
    "gleam/erlang/charlist": { srcUrl: srcBaseUrl + "gleam_erlang/src/gleam/erlang/charlist.gleam" },
    "gleam/erlang/node": { srcUrl: srcBaseUrl + "gleam_erlang/src/gleam/erlang/node.gleam" },
    "gleam/erlang/os": { srcUrl: srcBaseUrl + "gleam_erlang/src/gleam/erlang/os.gleam" },
    "gleam/erlang/process": { srcUrl: srcBaseUrl + "gleam_erlang/src/gleam/erlang/process.gleam" },
    "gleam/fetch": { srcUrl: srcBaseUrl + "gleam_fetch/src/gleam/fetch.gleam" },
    "gleam/http": { srcUrl: srcBaseUrl + "gleam_http/src/gleam/http.gleam" },
    "gleam/http/cookie": { srcUrl: srcBaseUrl + "gleam_http/src/gleam/http/cookie.gleam" },
    "gleam/http/request": { srcUrl: srcBaseUrl + "gleam_http/src/gleam/http/request.gleam" },
    "gleam/http/response": { srcUrl: srcBaseUrl + "gleam_http/src/gleam/http/response.gleam" },
    "gleam/http/service": { srcUrl: srcBaseUrl + "gleam_http/src/gleam/http/service.gleam" },
    "gleam/javascript": { srcUrl: srcBaseUrl + "gleam_javascript/src/gleam/javascript.gleam" },
    "gleam/javascript/array": {
      srcUrl: srcBaseUrl + "gleam_javascript/src/gleam/javascript/array.gleam"
    },
    "gleam/javascript/map": {
      srcUrl: srcBaseUrl + "gleam_javascript/src/gleam/javascript/map.gleam"
    },
    "gleam/javascript/promise": {
      srcUrl: srcBaseUrl + "gleam_javascript/src/gleam/javascript/promise.gleam"
    },
    "gleam/json": { srcUrl: srcBaseUrl + "gleam_json/src/gleam/json.gleam" },
    "gleam/otp/actor": { srcUrl: srcBaseUrl + "gleam_otp/src/gleam/otp/actor.gleam" },
    "gleam/otp/intensity_tracker": {
      srcUrl: srcBaseUrl + "gleam_otp/src/gleam/otp/intensity_tracker.gleam"
    },
    "gleam/otp/port": { srcUrl: srcBaseUrl + "gleam_otp/src/gleam/otp/port.gleam" },
    "gleam/otp/supervisor": { srcUrl: srcBaseUrl + "gleam_otp/src/gleam/otp/supervisor.gleam" },
    "gleam/otp/system": { srcUrl: srcBaseUrl + "gleam_otp/src/gleam/otp/system.gleam" },
    "gleam/otp/task": { srcUrl: srcBaseUrl + "gleam_otp/src/gleam/otp/task.gleam" }
  };

  // src/livecodes/languages/gleam/lang-gleam-compiler.ts
  self.createGleamCompiler = () => {
    var _wasm, _nextId, _projects, _id;
    const compilerUrl = gleamBaseUrl + "compiler/v1.3.0-rc1/gleam_wasm.js";
    const compiledBaseUrl = gleamBaseUrl + "build/dev/javascript/";
    let compiler;
    async function initGleamCompiler() {
      const wasm = await import(compilerUrl);
      await wasm.default();
      wasm.initialise_panic_hook(false);
      if (!compiler) {
        compiler = new Compiler(wasm);
      }
      return compiler;
    }
    class Compiler {
      constructor(wasm) {
        __privateAdd(this, _wasm, void 0);
        __privateAdd(this, _nextId, 0);
        __privateAdd(this, _projects, /* @__PURE__ */ new Map());
        __privateSet(this, _wasm, wasm);
      }
      get wasm() {
        return __privateGet(this, _wasm);
      }
      newProject() {
        const id = __privateWrapper(this, _nextId)._++;
        const project = new Project(id);
        __privateGet(this, _projects).set(id, new WeakRef(project));
        return project;
      }
      garbageCollectProjects() {
        const gone = [];
        for (const [id, project] of __privateGet(this, _projects)) {
          if (!project.deref())
            gone.push(id);
        }
        for (const id of gone) {
          __privateGet(this, _projects).delete(id);
          __privateGet(this, _wasm).delete_project(id);
        }
      }
    }
    _wasm = new WeakMap();
    _nextId = new WeakMap();
    _projects = new WeakMap();
    class Project {
      constructor(id) {
        __privateAdd(this, _id, void 0);
        __privateSet(this, _id, id);
      }
      get projectId() {
        return __privateGet(this, _id);
      }
      writeModule(moduleName, code) {
        compiler.wasm.write_module(__privateGet(this, _id), moduleName, code);
      }
      compilePackage(target) {
        compiler.garbageCollectProjects();
        compiler.wasm.reset_warnings(__privateGet(this, _id));
        compiler.wasm.compile_package(__privateGet(this, _id), target);
      }
      readCompiledJavaScript(moduleName) {
        return compiler.wasm.read_compiled_javascript(__privateGet(this, _id), moduleName);
      }
      readCompiledErlang(moduleName) {
        return compiler.wasm.read_compiled_erlang(__privateGet(this, _id), moduleName);
      }
      resetFilesystem() {
        compiler.wasm.reset_filesystem(__privateGet(this, _id));
      }
      delete() {
        compiler.wasm.delete_project(__privateGet(this, _id));
      }
      takeWarnings() {
        const warnings = [];
        while (true) {
          const warning = compiler.wasm.pop_warning(__privateGet(this, _id));
          if (!warning)
            return warnings;
          warnings.push(warning.trimStart());
        }
      }
    }
    _id = new WeakMap();
    const loadModules = async (mods) => {
      await Promise.all(
        Object.keys(mods).filter((mod) => mods[mod].srcUrl && !mods[mod].src).map(async (mod) => {
          const { srcUrl } = mods[mod];
          if (!srcUrl)
            return;
          const res = await fetch(srcUrl);
          if (!res.ok) {
            console.error("Failed fetching: " + srcUrl);
            return;
          }
          const src = await res.text();
          mods[mod].src = src;
        })
      );
    };
    const updateModules = async (newModules) => {
      for (const mod of Object.keys(newModules)) {
        const newModule = newModules[mod];
        const oldModule = { ...modules[mod] };
        modules[mod] = modules[mod] || {};
        if (newModule.src) {
          modules[mod].src = newModule.src;
        }
        if (newModule.srcUrl && newModule.srcUrl !== oldModule?.srcUrl) {
          modules[mod].srcUrl = newModule.srcUrl;
          modules[mod].src = void 0;
        }
        if (newModule.compiledUrl) {
          modules[mod].compiledUrl = newModule.compiledUrl;
        }
      }
      await loadModules(modules);
    };
    const compilerLoaded = Promise.all([initGleamCompiler(), loadModules(modules)]);
    const externalPattern = /(@external\s{0,20}\(\s{0,20}javascript\s{0,20},\s{0,20}".{0,200}?)(@)(.{0,200}?"\s{0,20},\s{0,20}".{0,200}?"\))/g;
    const placeholder = "______at______";
    const removeAt = (str) => {
      if (!str.includes("@"))
        return str;
      const pattern = new RegExp(externalPattern);
      return str.replace(pattern, `$1${placeholder}$3`);
    };
    const restoreAt = (str) => {
      if (!str.includes(placeholder))
        return str;
      return str.split(placeholder).join("@");
    };
    const compile = async (code, { config }) => {
      if (!code)
        return "";
      await compilerLoaded;
      const configModules = getLanguageCustomSettings("gleam", config)?.modules || {};
      await updateModules(configModules);
      const project = compiler.newProject();
      for (const mod of Object.keys(modules)) {
        if (modules[mod].src) {
          project.writeModule(mod, modules[mod].src);
        }
      }
      try {
        project.writeModule("main", removeAt(code));
        project.compilePackage("javascript");
        const js = project.readCompiledJavaScript("main");
        return restoreAt(js).replace(/from\s+"\.\/(.+)"/g, (_, mod) => {
          if (mod === "gleam.mjs" || mod === "prelude.mjs") {
            return `from "${compiledBaseUrl}prelude.mjs"`;
          }
          const modName = mod.replace(".mjs", "");
          if (mod.startsWith("gleam/")) {
            const [_root, path] = modName.split("/");
            const extras = ["javascript", "json", "crypto", "fetch", "http"];
            const dir = extras.includes(path) ? `gleam_${path}/` : "gleam_stdlib/";
            return `from "${compiledBaseUrl + dir + mod}"`;
          }
          if (modules[modName]?.compiledUrl) {
            return `from "${modules[modName].compiledUrl}"`;
          }
          return `from "${mod}"`;
        });
      } catch (error) {
        console.warn(error);
        return {
          code: "",
          info: { errors: [getErrorMessage(error)] }
        };
      } finally {
        project.delete();
      }
    };
    return compile;
  };
})();
