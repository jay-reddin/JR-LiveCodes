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
var safeName = (name, symbol = "_") => name.replace(/[\W]+/g, symbol);
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
var predefinedValues = {
  APP_VERSION: "47",
  SDK_VERSION: "0.12.0",
  COMMIT_SHA: "7b4906d",
  REPO_URL: "https://github.com/live-codes/livecodes",
  DOCS_BASE_URL: "http://localhost:3000/docs/"
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

// src/livecodes/services/github.ts
var getGithubHeaders = (user, mediaType) => ({
  Accept: `application/vnd.github.v3${mediaType ? "." + mediaType : ""}+json`,
  "Content-Type": "application/json",
  Authorization: "token " + user.token
});
var repoExists = async (user, repo) => {
  try {
    const res = await fetch(`https://api.github.com/repos/${user.username}/${repo}`, {
      method: "GET",
      cache: "no-store",
      headers: getGithubHeaders(user)
    });
    return res.ok;
  } catch {
    return false;
  }
};
var createRepo = async (user, repo, privateRepo = false, description) => {
  const res = await fetch("https://api.github.com/user/repos", {
    method: "POST",
    cache: "no-store",
    headers: getGithubHeaders(user),
    body: JSON.stringify({
      name: repo,
      private: privateRepo,
      ...privateRepo ? {} : { homepage: `https://${user.username}.github.io/${repo}/` },
      ...description ? { description } : {}
    })
  });
  if (!res.ok) {
    const error = await res.json().then((data) => data.errors[0]?.message);
    if (error === "name already exists on this account") {
      throw new Error("Repo name already exists");
    }
    throw new Error("Error creating repo");
  }
  return res.json().then((data) => data.name);
};
var createFile = async ({
  user,
  repo,
  branch,
  file,
  message,
  initialize = false,
  encoded = false
}) => {
  const url = `https://api.github.com/repos/${user.username}/${repo}/contents/`;
  const path = file.path.split("/").slice(0, -1).join("/");
  let sha;
  if (!initialize) {
    const response = await fetch(url + path, {
      method: "GET",
      cache: "no-store",
      headers: getGithubHeaders(user)
    });
    if (response.ok) {
      const files = await response.json();
      sha = files.find((f) => f.path === file.path)?.sha;
    }
  }
  const res = await fetch(url + file.path, {
    method: "PUT",
    cache: "no-store",
    headers: getGithubHeaders(user),
    body: JSON.stringify({
      message: message || "deploy",
      content: encoded ? file.content : encode(file.content),
      branch,
      ...sha ? { sha } : {}
    })
  });
  if (!res.ok) {
    throw new Error("Error creating file");
  }
  return res.json();
};
var initializeRepo = async (user, repo, branch = "main", readmeContent) => (await createFile({
  user,
  repo,
  branch,
  file: { path: "README.md", content: `${readmeContent || "# " + repo + "\n"}` },
  message: "initial commit",
  initialize: true,
  encoded: false
}))?.commit.sha;
var getLastCommit = async (user, repo, branch) => {
  const res = await fetch(
    `https://api.github.com/repos/${user.username}/${repo}/git/matching-refs/heads/${branch}?per_page=100`,
    {
      method: "GET",
      cache: "no-store",
      headers: getGithubHeaders(user)
    }
  );
  const refs = await res.json();
  if (refs.message === "Git Repository is empty.") {
    const commit = await initializeRepo(user, repo, "main");
    return branch === "main" ? commit : null;
  }
  if (!res.ok) {
    throw new Error("Error getting last commit");
  }
  const branchRef = refs.find((ref) => ref.ref === `refs/heads/${branch}`);
  if (!branchRef)
    return null;
  return branchRef.object.sha;
};
var getTree = async (user, repo, commit) => {
  const res = await fetch(
    `https://api.github.com/repos/${user.username}/${repo}/commits/${commit}`,
    {
      method: "GET",
      cache: "no-store",
      headers: getGithubHeaders(user)
    }
  );
  if (!res.ok) {
    throw new Error("Error getting commit tree");
  }
  const data = await res.json();
  const tree = data?.commit?.tree?.sha;
  if (!tree)
    return null;
  return tree;
};
var createTree = async (user, repo, files, baseTree) => {
  const tree = files.map((file) => ({
    path: file.path,
    mode: "100644",
    type: "blob",
    content: file.content
  }));
  const res = await fetch(`https://api.github.com/repos/${user.username}/${repo}/git/trees`, {
    method: "POST",
    cache: "no-store",
    headers: getGithubHeaders(user),
    body: JSON.stringify({
      ...baseTree ? { base_tree: baseTree } : {},
      tree
    })
  });
  if (!res.ok) {
    throw new Error("Error creating tree");
  }
  return res.json().then((data) => data.sha);
};
var createCommit = async (user, repo, message, tree, lastCommit) => {
  const res = await fetch(`https://api.github.com/repos/${user.username}/${repo}/git/commits`, {
    method: "POST",
    cache: "no-store",
    headers: getGithubHeaders(user),
    body: JSON.stringify({
      tree,
      message: message || "deploy",
      ...lastCommit ? { parents: [lastCommit] } : {}
    })
  });
  if (!res.ok) {
    throw new Error("Error creating commit");
  }
  return res.json().then((data) => data.sha);
};
var createBranch = async (user, repo, branch, commit) => {
  const res = await fetch(`https://api.github.com/repos/${user.username}/${repo}/git/refs`, {
    method: "POST",
    cache: "no-store",
    headers: getGithubHeaders(user),
    body: JSON.stringify({
      ref: `refs/heads/${branch}`,
      sha: commit
    })
  });
  if (!res.ok) {
    throw new Error("Error creating branch");
  }
  return true;
};
var updateBranch = async (user, repo, branch, commit) => {
  const res = await fetch(
    `https://api.github.com/repos/${user.username}/${repo}/git/refs/heads/${branch}`,
    {
      method: "PATCH",
      cache: "no-store",
      headers: getGithubHeaders(user),
      body: JSON.stringify({
        sha: commit
      })
    }
  );
  if (!res.ok) {
    throw new Error("Error updating branch");
  }
  return true;
};
var commitFiles = async ({
  files,
  user,
  repo,
  branch,
  message,
  newRepo,
  privateRepo,
  description,
  readmeContent,
  clearPrevious = true
}) => {
  let lastCommit;
  let tree;
  let commit;
  let succeeded = false;
  if (newRepo) {
    repo = safeName(repo, "-").toLowerCase();
  }
  try {
    if (newRepo || !await repoExists(user, repo)) {
      newRepo = true;
      await createRepo(user, repo, privateRepo, description);
      const initialCommit = await initializeRepo(user, repo, "main", readmeContent);
      lastCommit = branch === "main" ? initialCommit : null;
    } else {
      lastCommit = await getLastCommit(user, repo, branch);
    }
    const baseTree = lastCommit && !clearPrevious ? await getTree(user, repo, lastCommit) : null;
    tree = await createTree(user, repo, files, baseTree);
    commit = await createCommit(user, repo, message, tree, lastCommit);
    if (lastCommit) {
      succeeded = await updateBranch(user, repo, branch, commit);
    } else {
      succeeded = await createBranch(user, repo, branch, commit);
    }
    if (!succeeded)
      return null;
    return {
      tree,
      commit
    };
  } catch (error) {
    return null;
  }
};
var commitFile = async ({
  file,
  user,
  repo,
  branch,
  message,
  newRepo,
  privateRepo,
  description,
  readmeContent
}) => {
  try {
    if (newRepo || !await repoExists(user, repo)) {
      newRepo = true;
      repo = safeName(repo, "-").toLowerCase();
      await createRepo(user, repo, privateRepo, description);
      await initializeRepo(user, repo, branch, readmeContent);
    }
    const result = await createFile({
      user,
      repo,
      branch,
      file,
      message,
      initialize: newRepo || false,
      encoded: true
    });
    return {
      tree: result?.commit?.tree?.sha,
      commit: result?.commit?.sha
    };
  } catch (error) {
    return null;
  }
};
var getUserRepos = async (user, reposType = "public") => {
  let page = 1;
  const pageSize = 100;
  const maxPages = 5;
  const results = [];
  while (page <= maxPages) {
    const response = await fetch(
      `https://api.github.com/user/repos?type=${reposType}&per_page=${pageSize}&page=${page}`,
      {
        method: "GET",
        cache: "no-store",
        headers: getGithubHeaders(user)
      }
    );
    page += 1;
    if (!response.ok) {
      continue;
    }
    const newResults = await response.json();
    results.push(...newResults.map((repo) => repo.name));
    if (newResults.length < pageSize) {
      page = maxPages + 1;
    }
  }
  return results;
};

// src/livecodes/vendors.ts
var { getUrl, getModuleUrl } = modulesService;
var autoCompleteUrl = /* @__PURE__ */ getUrl(
  "@tarekraafat/autocomplete.js@10.2.7/dist/autoComplete.min.js"
);
var qrcodeUrl = /* @__PURE__ */ getUrl("easyqrcodejs@4.6.1/dist/easy.qrcode.min.js");

// src/livecodes/storage/storage.ts
var generateId = () => (Date.now() + "" + Math.floor(Math.floor(Math.random() * Date.now()))).substring(0, 24);

// src/livecodes/deploy/deploy.ts
var prepareFiles = ({
  config,
  content,
  commitSource,
  singleFile,
  deps
}) => {
  const files = [{ path: "index.html", content: content.resultPage }];
  if (!singleFile) {
    files.push(
      { path: "style.css", content: content.style || "" },
      { path: "script.js", content: content.script || "" }
    );
  }
  if (commitSource) {
    const sourceFiles = getFilesFromConfig(config, deps);
    files.push(
      ...Object.keys(sourceFiles).map((filename) => ({
        path: "src/" + filename,
        content: sourceFiles[filename].content
      })),
      { path: "src/livecodes.json", content: JSON.stringify(config, null, 2) }
    );
  }
  return files;
};
var deploy = async ({
  user,
  repo,
  config,
  content,
  message,
  commitSource = true,
  singleFile,
  newRepo = true,
  deps
}) => {
  if (newRepo) {
    repo = safeName(repo, "-").toLowerCase();
  }
  const files = prepareFiles({ config, content, commitSource, singleFile, deps });
  const branch = "gh-pages";
  const urlToSrc = commitSource ? `https://github.com/${user.username}/${repo}/tree/gh-pages/src` : void 0;
  const description = config.title !== defaultConfig.title ? config.title : "";
  const readmeContent = Object.values(getDescriptionFile(config, user, urlToSrc, false))[0].content;
  const result = await commitFiles({
    files,
    user,
    repo,
    branch,
    message,
    newRepo,
    privateRepo: false,
    description,
    readmeContent,
    clearPrevious: true
  });
  if (!result)
    return null;
  return {
    url: `https://${user.username}.github.io/${repo}/`,
    username: user.username,
    repo,
    tree: result.tree,
    commit: result.commit
  };
};
var deployFile = async ({
  file,
  user,
  repo,
  branch,
  message,
  description,
  readmeContent
}) => {
  const githubFile = {
    path: `assets/${generateId()}/${file.path}`,
    content: file.content
  };
  const result = await commitFile({
    file: githubFile,
    user,
    repo,
    branch,
    message,
    privateRepo: false,
    description,
    readmeContent
  });
  if (!result)
    return null;
  return {
    url: `https://${user.username}.github.io/${repo}/${githubFile.path}`,
    username: user.username,
    repo,
    tree: result?.tree,
    commit: result?.commit
  };
};
var deployedConfirmation = (deployResult, sourcePublished) => {
  const { url, username, repo, commit } = deployResult;
  const linkToSource = !sourcePublished ? "" : `
    <div class="description">
      <p>
        The source code is
        <a
          href="https://github.com/${username}/${repo}/tree/${commit}/src"
          target="_blank"
        >
          publicly available
        </a>
      </p>
      <p>
        Permanent link:
        <a
          href="https://livecodes.io/?config=https://raw.githubusercontent.com/${username}/${repo}/${commit}/src/livecodes.json"
          target="_blank"
        >
          Edit in LiveCodes
        </a>
      </p>
      <p>
        Check
        <a
          href="https://github.com/${username}/${repo}/actions"
          target="_blank"
        >
          deployment status
        </a>
      </p>
    </div>
`;
  const msg = `
    <div id="deploy-container" class="modal-container">
      <div class="modal-title">Deployed Successfully!</div>
        <div class="modal-screen-container">
          <div class="description success">
            Your project has been deployed successfully to GitHub Pages, and will shortly be available (~1&nbsp;min) on: <br />
            <a href="${url}" target="_blank">${url}</a>
          </div>
          <div id="deploy-qrcode" class="qrcode-container">Generating...</div>
          ${linkToSource}
        </div>
    </div>
  `;
  const confirmationContainer = document.createElement("div");
  confirmationContainer.innerHTML = msg;
  return confirmationContainer;
};

// src/livecodes/html/sandbox/v9/index.html?raw
var v9_default = `<!doctype html>\r
<html>\r
  <head>\r
    <script id="message-script" data-env="development">\r
      window.addEventListener('message', function (event) {\r
        var html = event.data.result || event.data.html;\r
        if (html) {\r
          document.open();\r
          document.write(html);\r
          document.close();\r
        }\r
      });\r
    <\/script>\r
  </head>\r
  <body></body>\r
</html>\r
`;

// src/livecodes/html/deploy.html?raw
var deploy_default = '<div id="deploy-container" class="modal-container">\r\n  <div class="modal-title" data-i18n="deploy.heading">Deploy to GitHub Pages</div>\r\n  <div id="deploy-screens" class="modal-screen-container">\r\n    <ul id="deploy-tabs" class="modal-tabs">\r\n      <li class="active">\r\n        <a href="#" data-target="new-repo" data-i18n="deploy.create.heading">Create New Repo</a>\r\n      </li>\r\n      <li>\r\n        <a href="#" data-target="existing-repo" data-i18n="deploy.existing.heading"\r\n          >Existing Repo</a\r\n        >\r\n      </li>\r\n    </ul>\r\n\r\n    <div id="new-repo" class="tab-content active">\r\n      <div class="modal-screen">\r\n        <form id="new-repo-form">\r\n          <div>\r\n            <label for="new-repo-name" data-i18n="deploy.create.repoName" data-i18n-prop="innerHTML"\r\n              >Repo Name <span id="new-repo-name-error" class="error"></span\r\n            ></label>\r\n            <input\r\n              type="text"\r\n              id="new-repo-name"\r\n              placeholder="Required"\r\n              data-i18n="generic.required"\r\n              data-i18n-prop="placeholder"\r\n            />\r\n          </div>\r\n          <div>\r\n            <label for="new-repo-message" data-i18n="deploy.generic.commitMessage"\r\n              >Commit Message</label\r\n            >\r\n            <input\r\n              type="text"\r\n              id="new-repo-message"\r\n              placeholder="Optional"\r\n              data-i18n="generic.optional"\r\n              data-i18n-prop="placeholder"\r\n            />\r\n          </div>\r\n          <div class="padded">\r\n            <input type="checkbox" id="new-repo-source" />\r\n            <label for="new-repo-source" data-i18n="deploy.generic.commitSourceCodePublic"\r\n              >Commit source code (public)</label\r\n            >\r\n          </div>\r\n          <button\r\n            id="new-repo-btn"\r\n            class="wide-button"\r\n            type="submit"\r\n            data-i18n="deploy.generic.deployBtn"\r\n          >\r\n            Deploy\r\n          </button>\r\n        </form>\r\n        <div class="description help" data-i18n="deploy.create.desc" data-i18n-prop="innerHTML">\r\n          A new <strong>public</strong> repo will be created. The result page will be pushed to\r\n          <span class="code">gh-pages</span> branch.\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div id="existing-repo" class="tab-content">\r\n      <div class="modal-screen">\r\n        <form id="existing-repo-form">\r\n          <div>\r\n            <label for="existing-repo-name" data-i18n="deploy.existing.repoName">Repo Name</label>\r\n            <input\r\n              type="text"\r\n              id="existing-repo-name"\r\n              autocomplete="off"\r\n              placeholder="Loading..."\r\n              data-i18n="generic.loading"\r\n              data-i18n-prop="placeholder"\r\n            />\r\n          </div>\r\n          <div>\r\n            <label for="existing-repo-message" data-i18n="deploy.generic.commitMessage"\r\n              >Commit Message</label\r\n            >\r\n            <input\r\n              type="text"\r\n              id="existing-repo-message"\r\n              placeholder="Optional"\r\n              data-i18n="generic.optional"\r\n              data-i18n-prop="placeholder"\r\n            />\r\n          </div>\r\n          <div class="padded">\r\n            <input type="checkbox" id="existing-repo-source" />\r\n            <label for="existing-repo-source" data-i18n="deploy.generic.commitSourceCodePublic"\r\n              >Commit source code (public)</label\r\n            >\r\n          </div>\r\n          <button\r\n            id="existing-repo-btn"\r\n            class="wide-button"\r\n            type="submit"\r\n            data-i18n="deploy.generic.deployBtn"\r\n          >\r\n            Deploy\r\n          </button>\r\n        </form>\r\n        <div class="description help" data-i18n="deploy.existing.desc" data-i18n-prop="innerHTML">\r\n          A new commit will be added to <span class="code">gh-pages</span> branch.\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n';

// src/livecodes/html/index.ts
var replaceValues = (str) => Object.entries(predefinedValues).reduce(
  (str2, [key, value]) => str2.replace(new RegExp(`{{${key}}}`, "g"), value),
  str
);
var resultTemplate = /* @__PURE__ */ replaceValues(v9_default);
var deployScreen = /* @__PURE__ */ replaceValues(deploy_default);

// src/livecodes/UI/qrcode.ts
var generateQrCode = async ({
  container,
  url,
  title,
  logo
}) => {
  const QRCode = await loadScript(qrcodeUrl, "QRCode");
  container.style.visibility = "hidden";
  const qr = new QRCode(container, {
    text: url,
    logo,
    width: 200,
    height: 200,
    drawer: "canvas",
    onRenderingEnd: (_options, dataUrl) => {
      container.innerHTML = "";
      const qrcodeImg = document.createElement("img");
      qrcodeImg.src = dataUrl;
      qrcodeImg.style.cursor = "pointer";
      qrcodeImg.title = window.deps.translateString(
        "share.qrcode.clickToDownload",
        "Click to download"
      );
      qrcodeImg.onclick = () => qr.download(safeName(title || "LiveCodes", "-"));
      container.appendChild(qrcodeImg);
      container.style.visibility = "visible";
    }
  });
};

// src/livecodes/UI/selectors.ts
var getNewRepoForm = (deployContainer) => deployContainer.querySelector("#new-repo-form");
var getNewRepoButton = (deployContainer) => deployContainer.querySelector("#new-repo-btn");
var getNewRepoNameInput = (deployContainer) => deployContainer.querySelector("#new-repo-name");
var getNewRepoNameError = (deployContainer) => deployContainer.querySelector("#new-repo-name-error");
var getNewRepoMessageInput = (deployContainer) => deployContainer.querySelector("#new-repo-message");
var getNewRepoCommitSource = (deployContainer) => deployContainer.querySelector("#new-repo-source");
var getExistingRepoForm = (deployContainer) => deployContainer.querySelector("#existing-repo-form");
var getExistingRepoButton = (deployContainer) => deployContainer.querySelector("#existing-repo-btn");
var getExistingRepoNameInput = (deployContainer) => deployContainer.querySelector("#existing-repo-name");
var getExistingRepoMessageInput = (deployContainer) => deployContainer.querySelector("#existing-repo-message");
var getExistingRepoCommitSource = (deployContainer) => deployContainer.querySelector("#existing-repo-source");

// src/livecodes/UI/deploy.ts
var createDeployContainer = (eventsManager, repo) => {
  const div = document.createElement("div");
  div.innerHTML = deployScreen;
  const deployContainer = div.firstChild;
  const tabs = deployContainer.querySelectorAll("#deploy-tabs li");
  tabs.forEach((tab) => {
    const link = tab.querySelector("a");
    if (!link)
      return;
    eventsManager.addEventListener(tab, "click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      document.querySelectorAll("#deploy-screens > div").forEach((screen) => {
        screen.classList.remove("active");
      });
      const target = deployContainer.querySelector("#" + link.dataset.target);
      target?.classList.add("active");
      target?.querySelector("input")?.focus();
    });
  });
  if (repo) {
    setTimeout(() => {
      tabs[1].click();
      const existingRepoNameInput = getExistingRepoNameInput(deployContainer);
      const existingRepoMessageInput = getExistingRepoMessageInput(deployContainer);
      existingRepoNameInput.value = repo;
      existingRepoMessageInput.focus();
    });
  }
  return deployContainer;
};
var createDeployUI = async ({
  modal,
  notifications,
  eventsManager,
  user,
  deployRepo,
  deps
}) => {
  const deployContainer = createDeployContainer(eventsManager, deployRepo);
  const newRepoForm = getNewRepoForm(deployContainer);
  const newRepoButton = getNewRepoButton(deployContainer);
  const newRepoNameInput = getNewRepoNameInput(deployContainer);
  const newRepoNameError = getNewRepoNameError(deployContainer);
  const newRepoMessageInput = getNewRepoMessageInput(deployContainer);
  const newRepoCommitSource = getNewRepoCommitSource(deployContainer);
  const existingRepoForm = getExistingRepoForm(deployContainer);
  const existingRepoButton = getExistingRepoButton(deployContainer);
  const existingRepoNameInput = getExistingRepoNameInput(deployContainer);
  const existingRepoMessageInput = getExistingRepoMessageInput(deployContainer);
  const existingRepoCommitSource = getExistingRepoCommitSource(deployContainer);
  const publish = async (user2, repo, message, commitSource, newRepo) => {
    const forExport = true;
    const scriptType = deps.getLanguageCompiler(deps.getConfig().script.language)?.scriptType;
    const singleFile = scriptType != null && scriptType !== "module";
    newRepoNameError.innerHTML = "";
    const resultHtml = await deps.getResultPage({
      forExport,
      template: resultTemplate,
      singleFile
    });
    const cache = deps.getCache();
    const deployResult = await deploy({
      user: user2,
      repo,
      config: deps.getContentConfig(deps.getConfig()),
      content: {
        resultPage: resultHtml,
        style: cache.style.compiled || "",
        script: cache.script.compiled || ""
      },
      message,
      commitSource,
      singleFile,
      newRepo,
      deps: { getLanguageExtension: deps.getLanguageExtension }
    }).catch((error) => {
      if (error.message === "Repo name already exists") {
        newRepoNameError.innerHTML = window.deps.translateString(
          "deploy.error.repoNameExists",
          "Repo name already exists"
        );
      }
    });
    if (newRepoNameError.innerHTML !== "") {
      return false;
    } else if (deployResult) {
      await deps.setProjectDeployRepo(repo);
      const confirmationContainer = deployedConfirmation(deployResult, commitSource);
      modal.show(confirmationContainer, { size: "small" });
      await generateQrCode({
        container: confirmationContainer.querySelector("#deploy-qrcode"),
        url: deployResult.url,
        title: repo
      });
      return true;
    } else {
      modal.close();
      notifications.error(
        window.deps.translateString("deploy.error.generic", "Deployment failed!")
      );
      return true;
    }
  };
  eventsManager.addEventListener(newRepoForm, "submit", async (e) => {
    e.preventDefault();
    if (!user)
      return;
    const name = newRepoNameInput.value.replace(/[^A-Za-z0-9_.-]/g, "-");
    const message = newRepoMessageInput.value;
    const commitSource = newRepoCommitSource.checked;
    const newRepo = true;
    if (!name) {
      notifications.error(
        window.deps.translateString("deploy.error.repoNameRequired", "Repo name is required")
      );
      return;
    }
    newRepoButton.innerHTML = window.deps.translateString(
      "deploy.generic.deploying",
      "Deploying..."
    );
    newRepoButton.disabled = true;
    const result = await publish(user, name, message, commitSource, newRepo);
    if (!result) {
      newRepoButton.innerHTML = window.deps.translateString("deploy.generic.deployBtn", "Deploy");
      newRepoButton.disabled = false;
    }
  });
  eventsManager.addEventListener(existingRepoForm, "submit", async (e) => {
    e.preventDefault();
    if (!user)
      return;
    const name = existingRepoNameInput.value;
    const message = existingRepoMessageInput.value;
    const commitSource = existingRepoCommitSource.checked;
    const newRepo = false;
    if (!name) {
      notifications.error(
        window.deps.translateString("deploy.error.repoNameRequired", "Repo name is required")
      );
      return;
    }
    existingRepoButton.innerHTML = window.deps.translateString(
      "deploy.generic.deploying",
      "Deploying..."
    );
    existingRepoButton.disabled = true;
    await publish(user, name, message, commitSource, newRepo);
  });
  modal.show(deployContainer, { isAsync: true, autoFocus: false });
  newRepoNameInput.focus();
  if (!user)
    return;
  if (!globalThis.autoComplete) {
    await import(autoCompleteUrl);
  }
  const autoComplete = globalThis.autoComplete;
  const publicRepos = await getUserRepos(user);
  eventsManager.addEventListener(existingRepoNameInput, "init", () => {
    if (!deployRepo) {
      existingRepoNameInput.focus();
    }
  });
  const inputSelector = "#" + existingRepoNameInput.id;
  if (!document.querySelector(inputSelector))
    return;
  const autoCompleteJS = new autoComplete({
    selector: inputSelector,
    placeHolder: window.deps.translateString("deploy.searchRepo", "Search your public repos..."),
    data: {
      src: publicRepos
    },
    resultItem: {
      highlight: {
        render: true
      }
    }
  });
  eventsManager.addEventListener(autoCompleteJS.input, "selection", function(event) {
    const feedback = event.detail;
    autoCompleteJS.input.blur();
    const selection = feedback.selection.value;
    autoCompleteJS.input.value = selection;
  });
};
export {
  createDeployUI,
  deployFile
};
