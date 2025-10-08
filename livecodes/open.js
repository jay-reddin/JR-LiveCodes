// src/livecodes/utils/utils.ts
var safeName = (name, symbol = "_") => name.replace(/[\W]+/g, symbol);
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
var getDate = () => {
  let date = /* @__PURE__ */ new Date();
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1e3);
  return date.toISOString().split("T")[0];
};
var predefinedValues = {
  APP_VERSION: "47",
  SDK_VERSION: "0.12.0",
  COMMIT_SHA: "7b4906d",
  REPO_URL: "https://github.com/live-codes/livecodes",
  DOCS_BASE_URL: "http://localhost:3000/docs/"
};

// src/livecodes/html/open.html?raw
var open_default = '<div id="list-container" class="list-container modal-container">\r\n  <div class="modal-title" data-i18n="open.heading">Saved Projects</div>\r\n  <div id="projects-screen-container" class="modal-screen-container">\r\n    <div class="modal-message" id="projects-container" class="items-container">\r\n      <div class="buttons">\r\n        <button id="bulk-import-button" class="button" data-i18n="open.import">Import</button>\r\n        <button id="export-all-button" class="button" data-i18n="open.exportAll">Export All</button>\r\n        <button id="delete-all-button" class="button danger" data-i18n="open.deleteAll">\r\n          Delete All\r\n        </button>\r\n      </div>\r\n\r\n      <div class="modal-search">\r\n        <div>\r\n          <span id="sort-by-label">\r\n            <i class="icon-arrow-sort"></i>\r\n            <span data-i18n="open.sort.heading">Sort By:</span>\r\n          </span>\r\n          <a href="#" id="sort-by-last-modified" class="active">\r\n            <i class="icon-calendar-sort"></i>\r\n            <span class="sort-time" data-i18n="open.sort.lastModified">Last&nbsp;Modified</span>\r\n          </a>\r\n          <a href="#" id="sort-by-title">\r\n            <i class="icon-arrow-text-sort"></i>\r\n            <span class="sort-title" data-i18n="open.sort.title">Title</span></a\r\n          >\r\n          <a href="#" id="sorted-asc" style="display: none">\r\n            <i class="icon-arrow-sort-up"></i>\r\n          </a>\r\n          <a href="#" id="sorted-desc">\r\n            <i class="icon-arrow-sort-down"></i>\r\n          </a>\r\n          <select name="language-filter" id="language-filter">\r\n            <option value="" data-i18n="open.placeholder.allLanguages">All languages</option>\r\n          </select>\r\n          <input\r\n            id="filter-tags"\r\n            type="text"\r\n            placeholder="Filter by tags"\r\n            data-i18n="open.placeholder.filterByTags"\r\n            data-i18n-prop="placeholder"\r\n          />\r\n        </div>\r\n        <div>\r\n          <input\r\n            id="search-projects"\r\n            type="text"\r\n            placeholder="Search"\r\n            data-i18n="open.placeholder.search"\r\n            data-i18n-prop="placeholder"\r\n          />\r\n          <a\r\n            href="#"\r\n            id="reset-filters"\r\n            title="Reset"\r\n            data-i18n="open.reset"\r\n            data-i18n-prop="title"\r\n          >\r\n            <i class="icon-reset"></i>\r\n          </a>\r\n        </div>\r\n      </div>\r\n\r\n      <div class="modal-message no-data">\r\n        <div class="description alert" data-i18n="open.noData.heading">\r\n          You have no saved projects.\r\n        </div>\r\n        <div class="description help" data-i18n="open.noData.desc" data-i18n-prop="innerHTML">\r\n          You can save a project from (settings&nbsp;menu&nbsp;>&nbsp;Save) or by the keyboard\r\n          shortcut (Ctrl/\u2318&nbsp;+&nbsp;S).\r\n        </div>\r\n      </div>\r\n      <div class="modal-message no-data" id="no-match">\r\n        <div class="description confirm" data-i18n="open.noMatch">\r\n          No projects match these filters.\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n';

// src/livecodes/html/index.ts
var replaceValues = (str) => Object.entries(predefinedValues).reduce(
  (str2, [key, value]) => str2.replace(new RegExp(`{{${key}}}`, "g"), value),
  str
);
var openScreen = /* @__PURE__ */ replaceValues(open_default);

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
var tagifyBaseUrl = /* @__PURE__ */ getUrl("@yaireo/tagify@4.25.1/dist/");

// src/livecodes/UI/selectors.ts
var getBulkImportButton = (listContainer) => listContainer.querySelector("#bulk-import-button");
var getExportAllButton = (listContainer) => listContainer.querySelector("#export-all-button");
var getDeleteAllButton = (listContainer) => listContainer.querySelector("#delete-all-button");

// node_modules/split.js/dist/split.es.js
var global = typeof window !== "undefined" ? window : null;
var ssr = global === null;
var document2 = !ssr ? global.document : void 0;
var calc = ssr ? "calc" : ["", "-webkit-", "-moz-", "-o-"].filter(function(prefix) {
  var el = document2.createElement("div");
  el.style.cssText = "width:" + prefix + "calc(9px)";
  return !!el.style.length;
}).shift() + "calc";

// src/livecodes/UI/info.ts
var getTags = (value) => {
  try {
    return JSON.parse(value).map((tag) => tag.value);
  } catch {
    return value.split(",").map((tag) => tag.trim());
  }
};

// src/livecodes/UI/open.ts
var createOpenItem = (item, list, getLanguageTitle, getLanguageByAlias, isTemplate = false) => {
  const li = document.createElement("li");
  list.appendChild(li);
  const link = document.createElement("a");
  link.href = "#";
  link.dataset.id = item.id;
  link.classList.add("open-project-link");
  const container = document.createElement("div");
  container.classList.add("open-project-item");
  link.appendChild(container);
  const lastModified = isMobile() ? new Date(item.lastModified).toLocaleDateString() : new Date(item.lastModified).toLocaleString();
  const langs = [];
  if (!isMobile()) {
    item.languages.forEach((lang) => {
      const langEl = document.createElement("span");
      langEl.classList.add("language-tag");
      langEl.dataset.lang = getLanguageByAlias(lang);
      if (isTemplate) {
        langEl.classList.add("template-tag");
      } else {
        langEl.title = window.deps.translateString("open.filter.language", "filter by language");
      }
      langEl.textContent = getLanguageTitle(lang);
      langs.push(langEl);
    });
  }
  const userTags = [];
  item.tags = [...new Set(item.tags)].filter(Boolean);
  if (!isMobile() && item.tags.length > 0) {
    item.tags.forEach((tag) => {
      const tagEl = document.createElement("span");
      tagEl.classList.add("user-tag");
      tagEl.dataset.tag = tag;
      if (isTemplate) {
        tagEl.classList.add("template-tag");
      } else {
        tagEl.title = window.deps.translateString("open.filter.tag", "filter by tag");
      }
      tagEl.textContent = tag;
      userTags.push(tagEl);
    });
  }
  const title = document.createElement("div");
  title.classList.add("open-title", "overflow-text");
  title.textContent = item.title;
  container.appendChild(title);
  const lastModifiedText = document.createElement("div");
  lastModifiedText.classList.add("light");
  lastModifiedText.textContent = window.deps.translateString(
    "open.lastModified",
    "Last modified: {{modified}}",
    {
      modified: lastModified
    }
  );
  container.appendChild(lastModifiedText);
  const tags = document.createElement("div");
  tags.classList.add("project-tags");
  langs.forEach((lang) => tags.append(lang));
  tags.innerHTML += userTags.length > 0 ? ' <span class="light">|</span> ' : "";
  userTags.forEach((tag) => tags.append(tag));
  container.appendChild(tags);
  const setAsDefault = document.createElement("div");
  setAsDefault.classList.add("template-default");
  const iconTemplate = document.createElement("i");
  iconTemplate.classList.add("icon-file-template");
  setAsDefault.appendChild(iconTemplate);
  const setAsDefaultLink = document.createElement("span");
  setAsDefaultLink.innerText = window.deps.translateString("open.setAsDefault", "Set as default");
  setAsDefaultLink.classList.add("template-default-link");
  setAsDefault.appendChild(setAsDefaultLink);
  const defaultTemplateLabel = document.createElement("span");
  defaultTemplateLabel.classList.add("default-template-label");
  defaultTemplateLabel.innerText = window.deps.translateString(
    "open.defaultTemplate",
    "Default template "
  );
  setAsDefault.appendChild(defaultTemplateLabel);
  const removeDefaultLink = document.createElement("span");
  removeDefaultLink.innerText = window.deps.translateString("open.removeDefault", "(unset)");
  removeDefaultLink.classList.add("template-remove-default-link", "delete");
  defaultTemplateLabel.appendChild(removeDefaultLink);
  if (isTemplate) {
    link.appendChild(setAsDefault);
  }
  li.appendChild(link);
  const actions = document.createElement("div");
  actions.classList.add("actions");
  li.appendChild(actions);
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  const iconCSS = '<i class="icon-delete"></i>';
  deleteButton.title = window.deps.translateString("open.action.delete", "Delete");
  deleteButton.innerHTML = `<span id="delete-button">${iconCSS}</span>`;
  actions.appendChild(deleteButton);
  return { link, deleteButton, setAsDefaultLink, removeDefaultLink };
};
var createItemLoader = (item) => {
  const loading = document.createElement("div");
  loading.innerHTML = `
    <div class="modal-message">${window.deps.translateString("generic.loading", "Loading...")}</div>
    <div class="modal-message">${item.title}</div>
    `;
  return loading;
};
var organizeProjects = (getProjects, showProjects, eventsManager, languages) => {
  let sortBy = "lastModified";
  let sortByDirection = "desc";
  let language;
  let tags = [];
  let tagify;
  let searchResults = [];
  const lastModifiedButton = document.querySelector(
    "#list-container #sort-by-last-modified"
  );
  const titleButton = document.querySelector("#list-container #sort-by-title");
  const sortedAscButton = document.querySelector("#list-container #sorted-asc");
  const sortedDescButton = document.querySelector("#list-container #sorted-desc");
  const languageSelect = document.querySelector(
    "#list-container #language-filter"
  );
  const filterTagsInput = document.querySelector(
    "#list-container #filter-tags"
  );
  const searchProjectsInput = document.querySelector(
    "#list-container #search-projects"
  );
  const resetFiltersLink = document.querySelector("#list-container #reset-filters");
  languages.map((x) => ({
    name: x.name,
    title: x.longTitle || x.title
  })).sort(
    (a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : a.title.toLowerCase() > b.title.toLowerCase() ? 1 : 0
  ).forEach((lang) => {
    const option = document.createElement("option");
    option.text = lang.title;
    option.value = lang.name;
    languageSelect.appendChild(option);
  });
  const getFilteredAndSorted = async () => (await getProjects()).filter((p) => language ? p.languages.includes(language) : true).filter(
    (p) => tags.length > 0 ? tags.map((t) => p.tags.includes(t)).every((x) => x === true) : true
  ).filter(
    (p) => searchProjectsInput.value.trim() !== "" ? searchResults.includes(p.id) : true
  ).sort(
    (a, b) => sortBy === "lastModified" && sortByDirection === "asc" ? a.lastModified - b.lastModified : sortBy === "lastModified" && sortByDirection === "desc" ? b.lastModified - a.lastModified : sortBy === "title" && sortByDirection === "asc" && a.title < b.title ? -1 : sortBy === "title" && sortByDirection === "asc" && a.title > b.title ? 1 : sortBy === "title" && sortByDirection === "desc" && a.title < b.title ? 1 : sortBy === "title" && sortByDirection === "desc" && a.title > b.title ? -1 : 0
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
            languageSelect.value = tag.dataset.lang || "";
            await filterByLanguage();
          },
          false
        );
      } else if (tag.dataset.tag) {
        eventsManager.addEventListener(
          tag,
          "click",
          async (ev) => {
            ev.stopPropagation();
            if (tagify) {
              tagify.removeAllTags();
              tagify.addTags(tag.dataset.tag);
              await filterByTags();
            }
          },
          false
        );
      }
    });
  };
  const reloadProjects = async () => {
    showProjects(await getFilteredAndSorted());
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
  const filterByTags = async (value = filterTagsInput.value) => {
    tags = getTags(value).filter((x) => x !== "");
    await reloadProjects();
  };
  const filterByLanguage = async (value = languageSelect.value) => {
    language = value;
    await reloadProjects();
  };
  eventsManager.addEventListener(
    lastModifiedButton,
    "click",
    async (ev) => {
      ev.preventDefault();
      if (sortBy !== "lastModified") {
        sortDescending();
      } else if (sortByDirection === "asc") {
        sortDescending();
      } else {
        sortAscending();
      }
      sortBy = "lastModified";
      lastModifiedButton.classList.add("active");
      titleButton.classList.remove("active");
      await reloadProjects();
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
      await reloadProjects();
    },
    false
  );
  eventsManager.addEventListener(
    sortedAscButton,
    "click",
    async (ev) => {
      ev.preventDefault();
      sortDescending();
      await reloadProjects();
    },
    false
  );
  eventsManager.addEventListener(
    sortedDescButton,
    "click",
    async (ev) => {
      ev.preventDefault();
      sortAscending();
      await reloadProjects();
    },
    false
  );
  eventsManager.addEventListener(
    filterTagsInput,
    "keyup",
    () => filterByTags(filterTagsInput.value),
    false
  );
  eventsManager.addEventListener(
    languageSelect,
    "change",
    async () => {
      await filterByLanguage();
    },
    false
  );
  registerLanguageFilters();
  loadStylesheet(tagifyBaseUrl + "tagify.css", "tagify-styles");
  import(tagifyBaseUrl + "tagify.esm.js").then(async (tagifyMod) => {
    const Tagify = tagifyMod.default;
    if (Tagify) {
      tagify = new Tagify(filterTagsInput, {
        focusable: false,
        whitelist: Array.from(new Set((await getProjects()).map((item) => item.tags).flat())).sort(
          (a, b) => b > a ? -1 : 1
        ),
        dropdown: {
          maxItems: 40,
          enabled: 0,
          closeOnSelect: false,
          highlightFirst: true
        }
      });
      tagify.on("change", () => filterByTags(JSON.stringify(tagify?.value || "")));
    }
  });
  loadScript(flexSearchUrl, "FlexSearch").then(async (FlexSearch) => {
    const index = new FlexSearch.Document({
      index: ["title", "description", "tags", "languages"],
      tokenize: "full",
      worker: true
    });
    await Promise.all((await getProjects()).map((p) => index.add(p)));
    eventsManager.addEventListener(
      searchProjectsInput,
      "keyup",
      async () => {
        const result = await index.searchAsync(searchProjectsInput.value);
        searchResults = result.map((field) => field.result).flat();
        await reloadProjects();
      },
      false
    );
  });
  eventsManager.addEventListener(
    resetFiltersLink,
    "click",
    async (ev) => {
      ev.preventDefault();
      sortBy = "lastModified";
      sortByDirection = "desc";
      language = "";
      tags = [];
      searchResults = [];
      lastModifiedButton.classList.add("active");
      titleButton.classList.remove("active");
      sortDescending();
      languageSelect.value = "";
      tagify?.removeAllTags();
      searchProjectsInput.value = "";
      await reloadProjects();
    },
    false
  );
};
var createSavedProjectsList = async ({
  projectStorage,
  eventsManager,
  showScreen,
  getContentConfig,
  notifications,
  modal,
  loadConfig,
  getProjectId,
  setProjectId,
  languages,
  getLanguageTitle,
  getLanguageByAlias
}) => {
  const div = document.createElement("div");
  div.innerHTML = openScreen;
  const listContainer = div.firstChild;
  const noDataMessage = listContainer.querySelector(".no-data");
  const noMatchMessage = listContainer.querySelector("#no-match.no-data");
  const projectsContainer = listContainer.querySelector("#projects-container");
  const list = document.createElement("ul");
  list.classList.add("open-list");
  let savedProjects = await projectStorage.getList();
  let visibleProjects = savedProjects;
  const bulkImportButton = getBulkImportButton(listContainer);
  const exportAllButton = getExportAllButton(listContainer);
  const deleteAllButton = getDeleteAllButton(listContainer);
  eventsManager.addEventListener(
    bulkImportButton,
    "click",
    () => {
      showScreen("import");
    },
    false
  );
  eventsManager.addEventListener(
    exportAllButton,
    "click",
    async () => {
      const data = (await projectStorage.getAllData()).filter((item) => visibleProjects.find((p) => p.id === item.id)).map((item) => ({
        ...item,
        config: getContentConfig(item.config)
      })).sort((a, b) => a.lastModified - b.lastModified);
      const filename = "livecodes_export_" + getDate();
      const content = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
      downloadFile(filename, "json", content);
    },
    false
  );
  eventsManager.addEventListener(
    deleteAllButton,
    "click",
    async () => {
      notifications.confirm(
        window.deps.translateString("open.delete.all", "Delete {{projects}} projects?", {
          projects: visibleProjects.length
        }),
        async () => {
          notifications.info(
            window.deps.translateString("open.delete.deleting", "Deleting projects...")
          );
          await Promise.all(
            visibleProjects.map((p) => {
              if (getProjectId() === p.id) {
                setProjectId("");
              }
              return projectStorage.deleteItem(p.id);
            })
          );
          visibleProjects = [];
          savedProjects = await projectStorage.getList();
          await showList(visibleProjects);
        }
      );
    },
    false
  );
  projectsContainer.appendChild(list);
  const showList = async (projects) => {
    visibleProjects = projects;
    list.innerHTML = "";
    projects.forEach((item) => {
      const { link, deleteButton } = createOpenItem(
        item,
        list,
        getLanguageTitle,
        getLanguageByAlias
      );
      eventsManager.addEventListener(
        link,
        "click",
        async (event) => {
          event.preventDefault();
          const loading = createItemLoader(item);
          modal.show(loading, { size: "small" });
          const itemId = link.dataset.id || "";
          const savedProject = (await projectStorage.getItem(itemId))?.config;
          if (savedProject) {
            await loadConfig(savedProject);
            setProjectId(itemId);
          }
          modal.close();
          loading.remove();
        },
        false
      );
      eventsManager.addEventListener(
        deleteButton,
        "click",
        () => {
          notifications.confirm(
            window.deps.translateString("open.delete.one", "Delete project: {{project}}?", {
              project: item.title
            }),
            async () => {
              if (item.id === getProjectId()) {
                setProjectId("");
              }
              await projectStorage.deleteItem(item.id);
              visibleProjects = visibleProjects.filter((p) => p.id !== item.id);
              const li = deleteButton.parentElement;
              li.classList.add("hidden");
              setTimeout(() => {
                showList(visibleProjects);
              }, 500);
            }
          );
        },
        false
      );
    });
    if (projects.length === 0) {
      list.classList.add("hidden");
      deleteAllButton.classList.add("hidden");
      exportAllButton.classList.add("hidden");
      if ((await projectStorage.getList()).length === 0) {
        noDataMessage.classList.remove("hidden");
        noMatchMessage.classList.add("hidden");
      } else {
        noDataMessage.classList.add("hidden");
        noMatchMessage.classList.remove("hidden");
      }
    } else {
      list.classList.remove("hidden");
      deleteAllButton.classList.remove("hidden");
      exportAllButton.classList.remove("hidden");
      noDataMessage.classList.add("hidden");
      noMatchMessage.classList.add("hidden");
    }
  };
  await showList(savedProjects);
  const getProjects = () => projectStorage.getList();
  modal.show(listContainer, { isAsync: true });
  organizeProjects(getProjects, showList, eventsManager, languages);
};
export {
  createOpenItem,
  createSavedProjectsList
};
