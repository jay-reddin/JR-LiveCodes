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
var pathBrowserifyUrl = /* @__PURE__ */ getModuleUrl("path-browserify@1.0.1");

// src/livecodes/types/bundle-types.ts
var bomOptExp = /^\uFEFF?/;
var externalExp = /^([ \t]*declare module )(['"])(.+?)(\2[ \t]*{?.*)$/;
var importExp = /^([ \t]*(?:export )?(?:import .+? )= require\()(['"])(.+?)(\2\);.*)$/;
var importEs6Exp = /^([ \t]*(?:export|import) ?(?:(?:\* (?:as [^ ,]+)?)|.*)?,? ?(?:[^ ,]+ ?,?)(?:\{(?:[^ ,]+ ?,?)*\})? ?from )(['"])([^ ,]+)(\2;.*)$/;
var referenceTagExp = /^[ \t]*\/\/\/[ \t]*<reference[ \t]+path=(["'])(.*?)\1?[ \t]*\/>.*$/;
var identifierExp = /^\w+(?:[\.-]\w+)*$/;
var fileExp = /^([\./].*|.:.*)$/;
var privateExp = /^[ \t]*(?:static )?private (?:static )?/;
var publicExp = /^([ \t]*)(static |)(public |)(static |)(.*)/;
async function bundle(options) {
  const path = await import(pathBrowserifyUrl);
  assert(typeof options === "object" && options, "options must be an object");
  const main = options.main;
  const exportName = options.name;
  const baseDir = optValue(options.baseDir, options.main.split("/").slice(0, -1).join("/"));
  const newline = optValue(options.newline, "\n");
  const indent = optValue(options.indent, "    ") || "    ";
  const prefix = optValue(options.prefix, "");
  const separator = optValue(options.separator, "/") || "/";
  const externals = optValue(options.externals, false);
  const exclude = optValue(options.exclude, null);
  const referenceExternals = optValue(options.referenceExternals, false);
  const emitOnIncludedFileNotFound = optValue(options.emitOnIncludedFileNotFound, false);
  const emitOnNoIncludedFileNotFound = optValue(options.emitOnNoIncludedFileNotFound, false);
  const headerText = optValue(options.headerText, "");
  const comments = false;
  const verbose = optValue(options.verbose, false);
  assert(main, 'option "main" must be defined');
  assert(exportName, 'option "name" must be defined');
  assert(typeof newline === "string", 'option "newline" must be a string');
  assert(typeof indent === "string", 'option "indent" must be a string');
  assert(typeof prefix === "string", 'option "prefix" must be a string');
  assert(separator.length > 0, 'option "separator" must have non-zero length');
  trace("### settings object passed ###");
  traceObject(options);
  trace("### settings ###");
  trace("main:         %s", main);
  trace("name:         %s", exportName);
  trace("baseDir:      %s", baseDir);
  trace("mainFile:     %s", main);
  trace("externals:    %s", externals ? "yes" : "no");
  trace("exclude:      %s", exclude);
  trace("comments:     %s", comments ? "yes" : "no");
  trace("emitOnIncludedFileNotFound:   %s", emitOnIncludedFileNotFound ? "yes" : "no");
  trace("emitOnNoIncludedFileNotFound: %s", emitOnNoIncludedFileNotFound ? "yes" : "no");
  trace("headerText    %s", headerText);
  const headerData = headerText ? "/*" + headerText + "*/\n" : "";
  let isExclude;
  if (typeof exclude === "function") {
    isExclude = exclude;
  } else if (exclude instanceof RegExp) {
    isExclude = (file) => exclude.test(file);
  } else {
    isExclude = () => false;
  }
  const getPkgName = (exportedName) => {
    if (!exportedName.includes("/"))
      return exportedName;
    if (!exportedName.startsWith("@"))
      return exportedName.split("/")[0];
    const [scope, name, ..._path] = exportedName.split("/");
    return `${scope}/${name}`;
  };
  const pkgName = getPkgName(exportName);
  const [urlPart1, urlPart2] = main.split(pkgName, 2);
  const sourceRoot = urlPart1 + pkgName + urlPart2?.split("/")[0] + "/";
  trace("\n### find typings ###");
  const inSourceTypings = (file) => file.startsWith(sourceRoot);
  trace("source typings (will be included in output if actually used)");
  trace("excluded typings (will always be excluded from output)");
  const fileMap = /* @__PURE__ */ Object.create(null);
  const globalExternalImports = [];
  let mainParse = null;
  const externalTypings = [];
  const inExternalTypings = (file) => externalTypings.indexOf(file) !== -1;
  {
    trace("\n### parse files ###");
    const queue = [main];
    const queueSeen = /* @__PURE__ */ Object.create(null);
    while (queue.length > 0) {
      const target = queue.shift();
      if (!target) {
        continue;
      }
      if (queueSeen[target]) {
        continue;
      }
      queueSeen[target] = true;
      const parse = await parseFile(target);
      if (!parse) {
        continue;
      }
      if (!mainParse) {
        mainParse = parse;
      }
      fileMap[parse.file] = parse;
      pushUniqueArr(queue, parse.refs, parse.relativeImports);
    }
  }
  trace("\n### map exports ###");
  const exportMap = /* @__PURE__ */ Object.create(null);
  Object.keys(fileMap).forEach((file) => {
    const parse = fileMap[file];
    parse.exports.forEach((name) => {
      assert(!(name in exportMap), "already got export for: " + name);
      exportMap[name] = parse;
      trace("- %s -> %s", name, parse.file);
    });
  });
  trace("\n### determine typings to include ###");
  const excludedTypings = [];
  const usedTypings = [];
  const externalDependencies = [];
  {
    const queue = [mainParse];
    const queueSeen = /* @__PURE__ */ Object.create(null);
    trace("queue");
    trace(queue);
    while (queue.length > 0) {
      const parse = queue.shift();
      if (!parse || queueSeen[parse.file]) {
        continue;
      }
      queueSeen[parse.file] = true;
      trace("%s (%s)", parse.name, parse.file);
      usedTypings.push(parse);
      parse.externalImports.forEach((name) => {
        const p = exportMap[name];
        if (!p)
          return;
        if (!externals) {
          trace(" - exclude external %s", name);
          pushUnique(externalDependencies, !p ? name : p?.file);
          return;
        }
        if (isExclude(path.relative(baseDir, p?.file), true)) {
          trace(" - exclude external filter %s", name);
          pushUnique(excludedTypings, p?.file);
          return;
        }
        trace(" - include external %s", name);
        assert(p, name);
        queue.push(p);
      });
      parse.relativeImports.forEach((file) => {
        const p = fileMap[file];
        if (!p)
          return;
        if (isExclude(path.relative(baseDir, p?.file), false)) {
          trace(" - exclude internal filter %s", file);
          pushUnique(excludedTypings, p?.file);
          return;
        }
        trace(" - import relative %s", file);
        assert(p, file);
        queue.push(p);
      });
    }
  }
  trace("\n### rewrite global external modules ###");
  usedTypings.forEach((parse) => {
    trace(parse.name);
    parse.relativeRef.forEach((line) => {
      line.modified = replaceExternal(line.original, getLibName);
      trace(" - %s  ==>  %s", line.original, line.modified);
    });
    parse.importLineRef.forEach((line) => {
      if (importExp.test(line.original)) {
        line.modified = replaceImportExport(line.original, getLibName);
      } else {
        line.modified = replaceImportExportEs6(line.original, getLibName);
      }
      trace(" - %s  ==>  %s", line.original, line.modified);
    });
  });
  trace("\n### build output ###");
  let content = headerData;
  if (externalDependencies.length > 0) {
    content += "// Dependencies for this module:" + newline;
    externalDependencies.forEach((file) => {
      if (referenceExternals) {
        content += formatReference(path.relative(baseDir, file).replace(/\\/g, "/")) + newline;
      } else {
        content += "//   " + path.relative(baseDir, file).replace(/\\/g, "/") + newline;
      }
    });
  }
  if (globalExternalImports.length > 0) {
    content += newline;
    content += globalExternalImports.join(newline) + newline;
  }
  content += newline;
  content += usedTypings.filter((parse) => {
    parse.lines = parse.lines.filter((line) => true !== line.skip);
    return parse.lines.length > 0;
  }).map((parse) => {
    if (inSourceTypings(parse.file)) {
      return formatModule(
        parse.file,
        parse.lines.map((line) => getIndenter(parse.indent, indent)(line))
      );
    } else {
      return parse.lines.map((line) => getIndenter(parse.indent, indent)(line)).join(newline) + newline;
    }
  }).join(newline) + newline;
  const inUsed = (file) => usedTypings.filter((parse) => parse.file === file).length !== 0;
  const bundleResult = {
    fileMap,
    includeFilesNotFound: [],
    noIncludeFilesNotFound: [],
    options
  };
  trace("## files not found ##");
  for (const p in fileMap) {
    const parse = fileMap[p];
    if (!parse.fileExists) {
      if (inUsed(parse.file)) {
        bundleResult.includeFilesNotFound.push(parse.file);
        warning(" X Included file NOT FOUND %s ", parse.file);
      } else {
        bundleResult.noIncludeFilesNotFound.push(parse.file);
        trace(" X Not used file not found %s", parse.file);
      }
    }
  }
  trace("\n### write output ###");
  if ((bundleResult.includeFilesNotFound.length === 0 || bundleResult.includeFilesNotFound.length > 0 && emitOnIncludedFileNotFound) && (bundleResult.noIncludeFilesNotFound.length === 0 || bundleResult.noIncludeFilesNotFound.length > 0 && emitOnNoIncludedFileNotFound)) {
    bundleResult.emitted = true;
  } else {
    warning(" XXX Not emit due to exist files not found.");
    trace(
      "See documentation for emitOnIncludedFileNotFound and emitOnNoIncludedFileNotFound options."
    );
    bundleResult.emitted = false;
  }
  if (verbose) {
    trace("\n### statistics ###");
    trace("excludedTypings");
    excludedTypings.forEach((p) => {
      trace(" - %s", p);
    });
    trace("used external typings");
    externalTypings.forEach((p) => {
      if (inUsed(p)) {
        trace(" - %s", p);
      }
    });
    trace("unused external typings");
    externalTypings.forEach((p) => {
      if (!inUsed(p)) {
        trace(" - %s", p);
      }
    });
    trace("external dependencies");
    externalDependencies.forEach((p) => {
      trace(" - %s", p);
    });
  }
  trace("\n### done ###\n");
  return content;
  function assert(condition, msg) {
    if (!condition && verbose) {
      console.error(msg || "assertion failed");
    }
  }
  function traceObject(obj) {
    if (verbose) {
      console.log(obj);
    }
  }
  function trace(...args) {
    if (verbose) {
      console.log(...args);
    }
  }
  function warning(...args) {
    if (verbose) {
      console.log(...args);
    }
  }
  function getModName(file) {
    return path.relative(
      baseDir,
      path.dirname(file) + path.sep + path.basename(file).replace(/\.d\.ts$/, "")
    );
  }
  function getExpName(file) {
    if (file === main) {
      return exportName;
    }
    return getExpNameRaw(file);
  }
  function getExpNameRaw(file) {
    return prefix + pkgName + separator + cleanupName(getModName(file));
  }
  function getLibName(ref) {
    return getExpNameRaw(main) + separator + prefix + separator + ref;
  }
  function cleanupName(name) {
    return name.replace(/\.\./g, "--").replace(/[\\\/]/g, separator);
  }
  function mergeModulesLines(lines) {
    const i = indent;
    return (lines.length === 0 ? "" : i + lines.join(newline + i)) + newline;
  }
  function formatModule(file, lines) {
    let out = "";
    out += "declare module '" + getExpName(file) + "' {" + newline;
    out += mergeModulesLines(lines);
    out += "}" + newline;
    return out;
  }
  async function parseFile(file) {
    const name = getModName(file);
    trace("%s (%s)", name, file);
    const res = {
      file,
      name,
      indent,
      exp: getExpName(file),
      refs: [],
      // triple-slash references
      externalImports: [],
      // import()'s like "events"
      relativeImports: [],
      // import()'s like "./foo"
      exports: [],
      lines: [],
      fileExists: true,
      // the next two properties contain single-element arrays, which reference the same single-element in .lines,
      // in order to be able to replace their contents later in the bundling process.
      importLineRef: [],
      relativeRef: []
    };
    try {
      const url = new URL(file);
      const mainUrl = new URL(main);
      if (url.origin !== mainUrl.origin && url.origin === window.location.origin) {
        trace(" X - Invalid URL: %s", file);
        throw new Error();
      }
    } catch {
      return res;
    }
    let response = await fetch(file);
    if (!response.ok) {
      file = file + "/index.d.ts";
      response = await fetch(file);
      if (!response.ok) {
        trace(" X - File not found: %s", file);
        res.fileExists = false;
        return res;
      }
    }
    let code = (await response.text()).replace(bomOptExp, "").replace(/\s*$/, "");
    if (code.includes(sourceRoot)) {
      const dir = file.substring(0, file.lastIndexOf("/")) + "/";
      code = code.replace(
        new RegExp(regexEscape(sourceRoot) + "(.*)", "g"),
        (match) => path.relative(dir, match)
      );
    }
    res.indent = indent || "    ";
    let multiComment = [];
    let queuedJSDoc;
    let inBlockComment = false;
    const popBlock = () => {
      if (multiComment.length > 0) {
        if (/^[ \t]*\/\*\*/.test(multiComment[0])) {
          queuedJSDoc = multiComment;
        } else if (comments) {
          multiComment.forEach((line) => res.lines.push({ original: line }));
        }
        multiComment = [];
      }
      inBlockComment = false;
    };
    const popJSDoc = () => {
      if (queuedJSDoc) {
        queuedJSDoc.forEach((line) => {
          const match = line.match(/^([ \t]*)(\*.*)/);
          if (match) {
            res.lines.push({ original: match[1] + " " + match[2] });
          } else {
            res.lines.push({ original: line });
          }
        });
        queuedJSDoc = null;
      }
    };
    for (let line of code.split("\n")) {
      let match;
      if (/^[((=====)(=*)) \t]*\*+\//.test(line)) {
        multiComment.push(line);
        popBlock();
        continue;
      }
      if (/^[ \t]*\/\*/.test(line)) {
        multiComment.push(line);
        inBlockComment = true;
        if (/\*+\/[ \t]*$/.test(line)) {
          popBlock();
        }
        continue;
      }
      if (inBlockComment) {
        multiComment.push(line);
        continue;
      }
      if (/^\s*$/.test(line)) {
        res.lines.push({ original: "" });
        continue;
      }
      if (/^\/\/\//.test(line)) {
        const ref = extractReference(line);
        if (ref) {
          const refPath = path.resolve(path.dirname(file), ref);
          if (inSourceTypings(refPath)) {
            trace(" - reference source typing %s (%s)", ref, refPath);
          } else {
            const relPath = path.relative(baseDir, refPath).replace(/\\/g, "/");
            trace(" - reference external typing %s (%s) (relative: %s)", ref, refPath, relPath);
            if (!inExternalTypings(refPath)) {
              externalTypings.push(refPath);
            }
          }
          pushUnique(res.refs, refPath);
          continue;
        }
      }
      if (/^\/\//.test(line)) {
        if (comments) {
          res.lines.push({ original: line });
        }
        continue;
      }
      if (privateExp.test(line)) {
        queuedJSDoc = null;
        continue;
      }
      popJSDoc();
      if (line.indexOf("from") >= 0 && (match = line.match(importEs6Exp)) || line.indexOf("require") >= 0 && (match = line.match(importExp))) {
        const [_, lead, quote, moduleName, trail] = match;
        assert(moduleName);
        let impPath = path.resolve(path.dirname(file), moduleName);
        if (impPath.startsWith("/")) {
          impPath = impPath.replace("/https:/", "https://").replace(".js", ".d.ts");
        }
        if (fileExp.test(moduleName) || moduleName.startsWith(sourceRoot)) {
          const modLine = {
            original: lead + quote + getExpName(impPath) + trail
          };
          res.lines.push(modLine);
          let full = impPath;
          const fullRes = await fetch(full);
          if (!fullRes.ok) {
            full += ".d.ts";
          }
          trace(" - import relative %s (%s)", moduleName, full);
          pushUnique(res.relativeImports, full);
          res.importLineRef.push(modLine);
        } else {
          const modLine = {
            original: line
          };
          trace(" - import external %s", moduleName);
          pushUnique(res.externalImports, moduleName);
          if (externals) {
            res.importLineRef.push(modLine);
          }
          res.lines.push(modLine);
        }
      } else if (match = line.match(externalExp)) {
        const [_, _declareModule, _lead, moduleName, _trail] = match;
        assert(moduleName);
        trace(" - declare %s", moduleName);
        pushUnique(res.exports, moduleName);
        const modLine = {
          original: line
        };
        res.relativeRef.push(modLine);
        res.lines.push(modLine);
      } else {
        if (match = line.match(publicExp)) {
          const [_, sp, static1, _pub, static2, ident] = match;
          line = sp + static1 + static2 + ident;
        }
        if (inSourceTypings(file)) {
          res.lines.push({ original: line.replace(/^(export )?declare /g, "$1") });
        } else {
          res.lines.push({ original: line });
        }
      }
    }
    return res;
  }
}
function pushUnique(arr, value) {
  if (arr.indexOf(value) < 0) {
    arr.push(value);
  }
  return arr;
}
function pushUniqueArr(arr, ...values) {
  values.forEach((vs) => vs.forEach((v) => pushUnique(arr, v)));
  return arr;
}
function formatReference(file) {
  return '/// <reference path="' + file.replace(/\\/g, "/") + '" />';
}
function extractReference(tag) {
  const match = tag.match(referenceTagExp);
  if (match) {
    return match[2];
  }
  return null;
}
function replaceImportExport(line, replacer) {
  const match = line.match(importExp);
  if (match) {
    if (identifierExp.test(match[3])) {
      return match[1] + match[2] + replacer(match[3]) + match[4];
    }
  }
  return line;
}
function replaceImportExportEs6(line, replacer) {
  if (line.indexOf("from") < 0) {
    return line;
  }
  const match = line.match(importEs6Exp);
  if (match) {
    if (identifierExp.test(match[3])) {
      return match[1] + match[2] + replacer(match[3]) + match[4];
    }
  }
  return line;
}
function replaceExternal(line, replacer) {
  const match = line.match(externalExp);
  if (match) {
    const [_, declareModule, beforeIndent, moduleName, afterIdent] = match;
    if (identifierExp.test(moduleName)) {
      return declareModule + beforeIndent + replacer(moduleName) + afterIdent;
    }
  }
  return line;
}
function getIndenter(_actual, _use) {
  return (line) => line.modified || line.original;
}
function optValue(passed, def) {
  if (typeof passed === "undefined") {
    return def;
  }
  return passed;
}
function regexEscape(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
export {
  bundle
};
