// src/livecodes/utils/utils.ts
var isMobile = () => {
  let mobile = false;
  const userAgent = navigator.userAgent.toLowerCase();
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      a
    ) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    )) {
      mobile = true;
    }
  })(userAgent || navigator.vendor || window.opera);
  return mobile;
};
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

// src/livecodes/html/snippets.html?raw
var snippets_default = '<div id="snippets-list-container" class="modal-container list-container">\r\n  <div class="modal-title" data-i18n="snippets.heading">Code Snippets</div>\r\n  <div class="modal-screen-container">\r\n    <div id="snippets-container" class="modal-message items-container">\r\n      <div class="buttons">\r\n        <button id="snippets-add-snippet-button" class="button" data-i18n="snippets.add.heading">\r\n          Add Snippet\r\n        </button>\r\n        <button\r\n          id="snippets-delete-all-button"\r\n          class="button danger"\r\n          data-i18n="snippets.deleteAll"\r\n        >\r\n          Delete All\r\n        </button>\r\n      </div>\r\n\r\n      <div class="modal-search">\r\n        <div>\r\n          <span id="sort-by-label">\r\n            <i class="icon-arrow-sort"></i>\r\n            <span data-i18n="snippets.sort.heading">Sort By:</span>\r\n          </span>\r\n          <a href="#" id="snippets-sort-by-last-modified" class="active"\r\n            ><i class="icon-calendar-sort"></i>\r\n            <span class="sort-time" data-i18n="snippets.sort.date">Date</span></a\r\n          ><a href="#" id="snippets-sort-by-title">\r\n            <i class="icon-arrow-text-sort"></i>\r\n            <span class="sort-title" data-i18n="snippets.sort.title">Title</span></a\r\n          ><a href="#" id="snippets-sorted-asc" style="display: none"\r\n            ><i class="icon-arrow-sort-up"></i></a\r\n          ><a href="#" id="snippets-sorted-desc"><i class="icon-arrow-sort-down"></i></a>\r\n          <select name="lang-filter" id="snippets-lang-filter">\r\n            <option value="" data-i18n="snippets.placeholder.allLanguages">All languages</option>\r\n          </select>\r\n        </div>\r\n        <div>\r\n          <input\r\n            id="search-snippets"\r\n            type="text"\r\n            placeholder="Search"\r\n            data-i18n="snippets.placeholder.search"\r\n            data-i18n-prop="placeholder"\r\n          />\r\n          <a\r\n            href="#"\r\n            id="snippets-reset-filters"\r\n            title="Reset"\r\n            data-i18n="snippets.reset"\r\n            data-i18n-prop="title"\r\n          >\r\n            <i class="icon-reset"></i>\r\n          </a>\r\n        </div>\r\n      </div>\r\n\r\n      <div class="modal-message no-data description alert">\r\n        <div data-i18n="snippets.noSavedSnippets">You have no saved snippets.</div>\r\n      </div>\r\n      <div class="modal-message no-data description confirm" id="snippets-no-match">\r\n        <div data-i18n="snippets.noMatch">No snippets match these filters.</div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n';

// src/livecodes/html/add-snippet.html?raw
var add_snippet_default = '<div id="add-snippet-container" class="modal-container">\r\n  <div class="modal-title" data-i18n="snippets.add.heading">Add Snippet</div>\r\n\r\n  <div id="add-snippet-screen-container" class="modal-screen-container">\r\n    <div class="buttons">\r\n      <button id="snippets-button" class="button" data-i18n="snippets.add.snippets">\r\n        Snippets\r\n      </button>\r\n    </div>\r\n\r\n    <div class="modal-screen">\r\n      <label for="add-snippet-title-input" data-i18n="snippets.add.title">Title</label>\r\n      <input id="add-snippet-title-input" type="text" />\r\n      <label for="add-snippet-description-textarea" data-i18n="snippets.add.desc"\r\n        >Description</label\r\n      >\r\n      <textarea id="add-snippet-description-textarea"></textarea>\r\n      <label for="language-select" data-i18n="snippets.add.language">Language</label>\r\n      <select id="language-select"></select>\r\n      <label for="snippet-editor" data-i18n="snippets.add.code">Code</label>\r\n      <div id="add-snippet-editor" class="editor custom-editor"></div>\r\n      <button id="add-snippet-save-btn" class="wide-button" data-i18n="snippets.add.save">\r\n        Save\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n';

// src/livecodes/html/index.ts
var replaceValues = (str) => Object.entries(predefinedValues).reduce(
  (str2, [key, value]) => str2.replace(new RegExp(`{{${key}}}`, "g"), value),
  str
);
var snippetsScreen = /* @__PURE__ */ replaceValues(snippets_default);
var addSnippetScreen = /* @__PURE__ */ replaceValues(add_snippet_default);

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
var flexSearchUrl = /* @__PURE__ */ getUrl("flexsearch@0.7.21/dist/flexsearch.bundle.js");

// src/livecodes/languages/utils.ts
var getLanguageTitle = (language) => {
  const languageSpecs = window.deps.languages.find((lang) => lang.name === language);
  return languageSpecs?.longTitle || languageSpecs?.title || language.toUpperCase();
};

// src/livecodes/storage/storage.ts
var generateId = () => (Date.now() + "" + Math.floor(Math.floor(Math.random() * Date.now()))).substring(0, 24);

// src/livecodes/UI/icons.ts
var edit = '<i class="icon-edit"></i>';
var copy = '<i class="icon-copy"></i>';
var iconDelete = '<i class="icon-delete"></i>';

// src/livecodes/UI/selectors.ts
var getAddSnippetButton = (snippetsContainer) => snippetsContainer.querySelector("#snippets-add-snippet-button");
var getSnippetsDeleteAllButton = (snippetsContainer) => snippetsContainer.querySelector("#snippets-delete-all-button");
var getSnippetLanguageSelect = (snippetsContainer) => snippetsContainer.querySelector("#language-select");
var getAddSnippetEditor = (snippetsContainer) => snippetsContainer.querySelector("#add-snippet-editor");
var getSnippetTitleInput = (snippetsContainer) => snippetsContainer.querySelector("#add-snippet-title-input");
var getSnippetDescriptionArea = (snippetsContainer) => snippetsContainer.querySelector("#add-snippet-description-textarea");
var getSaveSnippetBtn = (snippetsContainer) => snippetsContainer.querySelector("#add-snippet-save-btn");
var getSnippetsBtn = (snippetsContainer) => snippetsContainer.querySelector("#snippets-button");

// src/livecodes/UI/snippets.ts
var editor;
var textLanguage = {
  name: "text",
  title: window.deps.translateString("snippets.text", "Plain Text"),
  editorLanguage: ""
};
var getLanguage = (name) => name === textLanguage.name ? textLanguage.title : getLanguageTitle(name);
var copySnippet = (url, notifications) => {
  if (copyToClipboard(url)) {
    notifications.success(
      window.deps.translateString("snippets.copy.copied", "Snippet is copied to clipboard.")
    );
  } else {
    notifications.error(
      window.deps.translateString("snippets.error.failedToCopy", "Failed to copy URL.")
    );
  }
};
var createSnippetItem = (item, list, notifications, showScreen) => {
  const li = document.createElement("li");
  list.appendChild(li);
  const link = document.createElement("a");
  link.href = "#";
  link.title = window.deps.translateString(
    "snippets.copy.clickToCopySnippet",
    "Click to copy snippet"
  );
  link.classList.add("snippet-link");
  link.title = item.description;
  link.onclick = (ev) => {
    ev.preventDefault();
    copySnippet(item.code, notifications);
  };
  const container = document.createElement("div");
  container.classList.add("snippet-item");
  link.appendChild(container);
  const lastModified = isMobile() ? new Date(item.lastModified).toLocaleDateString() : new Date(item.lastModified).toLocaleString();
  const title = document.createElement("div");
  title.classList.add("open-title", "overflow-text");
  title.textContent = item.title;
  container.appendChild(title);
  if (!isMobile()) {
    const lastModifiedText = document.createElement("div");
    lastModifiedText.classList.add("light");
    lastModifiedText.textContent = window.deps.translateString(
      "snippets.lastModified",
      "Last modified: {{modified}}",
      {
        modified: lastModified
      }
    );
    container.appendChild(lastModifiedText);
  }
  const tags = document.createElement("div");
  tags.classList.add("project-tags");
  const langEl = document.createElement("span");
  langEl.classList.add("language-tag");
  langEl.dataset.lang = item.language;
  langEl.title = window.deps.translateString("snippets.filter.language", "filter by language");
  langEl.textContent = getLanguage(item.language);
  tags.append(langEl);
  container.appendChild(tags);
  const editorContainer = document.createElement("div");
  editorContainer.classList.add("editor", "custom-editor");
  container.appendChild(editorContainer);
  li.appendChild(link);
  const actions = document.createElement("div");
  actions.classList.add("actions");
  li.appendChild(actions);
  const copyButton = document.createElement("button");
  copyButton.innerHTML = copy;
  copyButton.classList.add("action-button");
  copyButton.title = window.deps.translateString("snippets.action.copy", "Copy");
  copyButton.onclick = (ev) => {
    ev.preventDefault();
    copySnippet(item.code, notifications);
  };
  actions.appendChild(copyButton);
  const editButton = document.createElement("button");
  editButton.innerHTML = edit;
  editButton.classList.add("action-button");
  editButton.title = window.deps.translateString("snippets.action.edit", "Edit");
  editButton.onclick = () => {
    showScreen("add-snippet", item.id);
  };
  actions.appendChild(editButton);
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = iconDelete;
  deleteButton.classList.add("action-button", "delete-button");
  deleteButton.title = window.deps.translateString("snippets.action.delete", "Delete");
  actions.appendChild(deleteButton);
  return { link, deleteButton };
};
var organizeSnippets = async (getSnippets, showSnippets, eventsManager) => {
  let sortBy = "date";
  let sortByDirection = "desc";
  let language;
  let searchResults = [];
  const lastModifiedButton = document.querySelector(
    "#snippets-list-container #snippets-sort-by-last-modified"
  );
  const titleButton = document.querySelector(
    "#snippets-list-container #snippets-sort-by-title"
  );
  const sortedAscButton = document.querySelector(
    "#snippets-list-container #snippets-sorted-asc"
  );
  const sortedDescButton = document.querySelector(
    "#snippets-list-container #snippets-sorted-desc"
  );
  const langSelect = document.querySelector(
    "#snippets-list-container #snippets-lang-filter"
  );
  const searchSnippetsInput = document.querySelector(
    "#snippets-list-container #search-snippets"
  );
  const resetFiltersLink = document.querySelector(
    "#snippets-list-container #snippets-reset-filters"
  );
  Array.from(new Set((await getSnippets()).map((x) => x.language))).sort(
    (a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : a.toLowerCase() > b.toLowerCase() ? 1 : 0
  ).forEach((lang) => {
    const option = document.createElement("option");
    option.text = getLanguage(lang);
    option.value = lang;
    langSelect.appendChild(option);
  });
  const getFilteredAndSorted = async () => (await getSnippets()).filter((p) => language ? p.language === language : true).filter(
    (p) => searchSnippetsInput.value.trim() !== "" ? searchResults.includes(p.id) : true
  ).sort(
    (a, b) => sortBy === "date" && sortByDirection === "asc" ? a.lastModified - b.lastModified : sortBy === "date" && sortByDirection === "desc" ? b.lastModified - a.lastModified : sortBy === "title" && sortByDirection === "asc" && a.title < b.title ? -1 : sortBy === "title" && sortByDirection === "asc" && a.title > b.title ? 1 : sortBy === "title" && sortByDirection === "desc" && a.title < b.title ? 1 : sortBy === "title" && sortByDirection === "desc" && a.title > b.title ? -1 : 0
  );
  const registerLanguageFilters = () => {
    const projectTags = document.querySelectorAll(".project-tags span");
    projectTags.forEach((tag) => {
      if (tag.dataset.lang) {
        eventsManager.addEventListener(
          tag,
          "click",
          async (ev) => {
            ev.stopPropagation();
            langSelect.value = tag.dataset.lang || "";
            await filterByLanguage();
          },
          false
        );
      }
    });
  };
  const reloadSnippets = async () => {
    showSnippets(await getFilteredAndSorted());
    registerLanguageFilters();
  };
  const sortAscending = () => {
    sortByDirection = "asc";
    sortedAscButton.style.display = "unset";
    sortedDescButton.style.display = "none";
  };
  const sortDescending = () => {
    sortByDirection = "desc";
    sortedAscButton.style.display = "none";
    sortedDescButton.style.display = "unset";
  };
  const filterByLanguage = async (value = langSelect.value) => {
    language = value;
    await reloadSnippets();
  };
  eventsManager.addEventListener(
    lastModifiedButton,
    "click",
    async (ev) => {
      ev.preventDefault();
      if (sortBy !== "date") {
        sortDescending();
      } else if (sortByDirection === "asc") {
        sortDescending();
      } else {
        sortAscending();
      }
      sortBy = "date";
      lastModifiedButton.classList.add("active");
      titleButton.classList.remove("active");
      await reloadSnippets();
    },
    false
  );
  eventsManager.addEventListener(
    titleButton,
    "click",
    async (ev) => {
      ev.preventDefault();
      if (sortBy !== "title") {
        sortAscending();
      } else if (sortByDirection === "asc") {
        sortDescending();
      } else {
        sortAscending();
      }
      sortBy = "title";
      lastModifiedButton.classList.remove("active");
      titleButton.classList.add("active");
      await reloadSnippets();
    },
    false
  );
  eventsManager.addEventListener(
    sortedAscButton,
    "click",
    async (ev) => {
      ev.preventDefault();
      sortDescending();
      await reloadSnippets();
    },
    false
  );
  eventsManager.addEventListener(
    sortedDescButton,
    "click",
    async (ev) => {
      ev.preventDefault();
      sortAscending();
      await reloadSnippets();
    },
    false
  );
  eventsManager.addEventListener(
    langSelect,
    "change",
    async () => {
      await filterByLanguage();
    },
    false
  );
  registerLanguageFilters();
  loadScript(flexSearchUrl, "FlexSearch").then(async (FlexSearch) => {
    const index = new FlexSearch.Document({
      index: ["title", "language", "description"],
      tokenize: "full",
      worker: true
    });
    await Promise.all((await getSnippets()).map((p) => index.add(p)));
    eventsManager.addEventListener(
      searchSnippetsInput,
      "keyup",
      async () => {
        const result = await index.searchAsync(searchSnippetsInput.value);
        searchResults = result.map((field) => field.result).flat();
        await reloadSnippets();
      },
      false
    );
  });
  eventsManager.addEventListener(
    resetFiltersLink,
    "click",
    async (ev) => {
      ev.preventDefault();
      sortBy = "date";
      sortByDirection = "desc";
      language = "";
      searchResults = [];
      lastModifiedButton.classList.add("active");
      titleButton.classList.remove("active");
      sortDescending();
      langSelect.value = "";
      searchSnippetsInput.value = "";
      await reloadSnippets();
    },
    false
  );
};
var createSnippetsList = async ({
  snippetsStorage,
  eventsManager,
  notifications,
  modal,
  deps
}) => {
  const div = document.createElement("div");
  div.innerHTML = snippetsScreen;
  const listContainer = div.firstChild;
  const noDataMessage = listContainer.querySelector(".no-data");
  const noMatchMessage = listContainer.querySelector("#snippets-no-match.no-data");
  const snippetsContainer = listContainer.querySelector("#snippets-container");
  const list = document.createElement("ul");
  list.classList.add("open-list");
  let savedSnippets = await snippetsStorage.getAllData();
  let visibleSnippets = savedSnippets;
  const addSnippetButton = getAddSnippetButton(listContainer);
  const deleteAllButton = getSnippetsDeleteAllButton(listContainer);
  eventsManager.addEventListener(
    addSnippetButton,
    "click",
    () => {
      deps.showScreen("add-snippet");
    },
    false
  );
  eventsManager.addEventListener(
    deleteAllButton,
    "click",
    async () => {
      notifications.confirm(
        window.deps.translateString("snippets.delete.all", "Delete {{snippets}} snippets?", {
          snippets: visibleSnippets.length
        }),
        async () => {
          for (const p of visibleSnippets) {
            await snippetsStorage.deleteItem(p.id);
          }
          visibleSnippets = [];
          savedSnippets = await snippetsStorage.getAllData();
          await showList(visibleSnippets);
        }
      );
    },
    false
  );
  snippetsContainer.appendChild(list);
  const showList = async (snippets) => {
    visibleSnippets = snippets;
    list.innerHTML = "";
    snippets.forEach((item) => {
      const { link, deleteButton } = createSnippetItem(item, list, notifications, deps.showScreen);
      const editorContainer = link.querySelector(".editor");
      deps.createEditorFn({
        container: editorContainer,
        editorId: "snippet",
        editor: "codejar",
        readonly: true,
        language: item.language,
        value: item.code
      });
      eventsManager.addEventListener(
        deleteButton,
        "click",
        () => {
          notifications.confirm(
            window.deps.translateString("snippets.delete.one", "Delete snippet: {{snippet}}?", {
              snippet: item.title
            }),
            async () => {
              await snippetsStorage.deleteItem(item.id);
              visibleSnippets = visibleSnippets.filter((p) => p.id !== item.id);
              const li = deleteButton.parentElement;
              li.classList.add("hidden");
              setTimeout(() => {
                showList(visibleSnippets);
              }, 500);
            }
          );
        },
        false
      );
    });
    if (snippets.length === 0) {
      list.classList.add("hidden");
      deleteAllButton.classList.add("hidden");
      if ((await snippetsStorage.getList()).length === 0) {
        noDataMessage.classList.remove("hidden");
        noMatchMessage.classList.add("hidden");
      } else {
        noDataMessage.classList.add("hidden");
        noMatchMessage.classList.remove("hidden");
      }
    } else {
      list.classList.remove("hidden");
      deleteAllButton.classList.remove("hidden");
      noDataMessage.classList.add("hidden");
      noMatchMessage.classList.add("hidden");
    }
  };
  await showList(savedSnippets);
  const getSnippets = () => snippetsStorage.getAllData();
  modal.show(listContainer, { isAsync: true, onClose: () => editor?.destroy() });
  organizeSnippets(getSnippets, showList, eventsManager);
};
var createAddSnippetContainer = async ({
  snippetId,
  snippetsStorage,
  eventsManager,
  showScreen,
  notifications,
  deps
}) => {
  const div = document.createElement("div");
  div.innerHTML = addSnippetScreen;
  const addSnippetContainer = div.firstChild;
  const snippetsButton = getSnippetsBtn(addSnippetContainer);
  const snippetTitleInput = getSnippetTitleInput(addSnippetContainer);
  const snippetDescriptionArea = getSnippetDescriptionArea(addSnippetContainer);
  const languageSelect = getSnippetLanguageSelect(addSnippetContainer);
  const snippetEditor = getAddSnippetEditor(addSnippetContainer);
  const saveSnippetBtn = getSaveSnippetBtn(addSnippetContainer);
  const loadedSnippet = snippetId ? await snippetsStorage.getItem(snippetId) : null;
  if (loadedSnippet) {
    snippetTitleInput.value = loadedSnippet.title;
    snippetDescriptionArea.value = loadedSnippet.description;
  }
  const selectedLanguage = loadedSnippet?.language || deps.getAppData()?.snippets?.language || "javascript";
  [...window.deps.languages, textLanguage].filter(
    (lang) => ["jsx", "tsx", "rescript", "reason", "ocaml"].includes(lang.name) || !["blockly", "richtext"].includes(lang.name) && !["html", "javascript", "typescript", "cpp", "python"].includes(
      lang.editorLanguage || ""
    )
  ).map((lang) => ({ name: lang.name, title: getLanguage(lang.name) })).sort(
    (a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : a.title.toLowerCase() < b.title.toLowerCase() ? 1 : 0
  ).forEach((lang) => {
    const option = document.createElement("option");
    option.text = lang.title;
    option.value = lang.name;
    option.selected = lang.name === selectedLanguage;
    languageSelect.appendChild(option);
  });
  editor = await deps.createEditorFn({
    container: snippetEditor,
    editorId: "add-snippet",
    language: selectedLanguage,
    value: loadedSnippet?.code || ""
  });
  const saveSnippet = async () => {
    if (!snippetTitleInput.value) {
      notifications.error(
        window.deps.translateString("snippets.error.noTitle", "Please add snippet title.")
      );
      snippetTitleInput.focus();
      return;
    }
    const snippet = {
      id: loadedSnippet?.id || generateId(),
      title: snippetTitleInput.value,
      description: snippetDescriptionArea.value,
      language: languageSelect.value,
      code: editor?.getValue() || "",
      lastModified: Date.now()
    };
    await snippetsStorage.updateItem(snippet.id, snippet);
    deps.setAppData({ snippets: { language: snippet.language } });
    notifications.success(
      window.deps.translateString("snippets.save.success", "Snippet locally saved to device!")
    );
    showScreen("snippets");
    editor?.destroy();
  };
  eventsManager.addEventListener(
    snippetsButton,
    "click",
    () => {
      showScreen("snippets");
      editor?.destroy();
    },
    false
  );
  eventsManager.addEventListener(
    languageSelect,
    "change",
    () => {
      editor?.setLanguage(languageSelect.value);
    },
    false
  );
  eventsManager.addEventListener(saveSnippetBtn, "click", saveSnippet, false);
  return addSnippetContainer;
};
export {
  createAddSnippetContainer,
  createSnippetsList
};
