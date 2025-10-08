// src/livecodes/utils/utils.ts
var safeName = (name, symbol = "_") => name.replace(/[\W]+/g, symbol);
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
var getDate = () => {
  let date = /* @__PURE__ */ new Date();
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1e3);
  return date.toISOString().split("T")[0];
};
var base64ToUint8Array = (str) => new Uint8Array(
  atob(str).split("").map((c) => c.charCodeAt(0))
);
var predefinedValues = {
  APP_VERSION: "47",
  SDK_VERSION: "0.12.0",
  COMMIT_SHA: "7b4906d",
  REPO_URL: "https://github.com/live-codes/livecodes",
  DOCS_BASE_URL: "http://localhost:3000/docs/"
};

// src/livecodes/html/backup.html?raw
var backup_default = '<div id="backup-container" class="modal-container">\r\n  <div class="modal-title" data-i18n="backup.heading">Backup / Restore</div>\r\n  <div id="backup-screens" class="modal-screen-container">\r\n    <ul id="backup-tabs" class="modal-tabs">\r\n      <li class="active">\r\n        <a href="#" data-target="backup" data-i18n="backup.backup.heading">Backup</a>\r\n      </li>\r\n      <li><a href="#" data-target="restore" data-i18n="backup.restore.heading">Restore</a></li>\r\n    </ul>\r\n\r\n    <div id="backup" class="tab-content active">\r\n      <div class="modal-screen">\r\n        <div class="description help" data-i18n="backup.backup.desc" data-i18n-prop="innerHTML">\r\n          Backup LiveCodes data, so that it can be later restored on this or other devices. <br />\r\n          Please visit the\r\n          <a href="{{DOCS_BASE_URL}}features/backup-restore" target="_blank" rel="noopener"\r\n            >documentations</a\r\n          >\r\n          for details.\r\n        </div>\r\n        <form id="backup-form">\r\n          <div id="backup-stores">\r\n            <div class="backup-store">\r\n              <input type="checkbox" id="backup-projects-checkbox" data-store="projects" checked />\r\n              <label for="backup-projects-checkbox" data-i18n="backup.backup.projects"\r\n                >Projects</label\r\n              >\r\n            </div>\r\n            <div class="backup-store">\r\n              <input\r\n                type="checkbox"\r\n                id="backup-templates-checkbox"\r\n                data-store="templates"\r\n                checked\r\n              />\r\n              <label for="backup-templates-checkbox" data-i18n="backup.backup.templates"\r\n                >User Templates</label\r\n              >\r\n            </div>\r\n            <div class="backup-store">\r\n              <input type="checkbox" id="backup-snippets-checkbox" data-store="snippets" checked />\r\n              <label for="backup-snippets-checkbox" data-i18n="backup.backup.snippets"\r\n                >Code Snippets</label\r\n              >\r\n            </div>\r\n            <div class="backup-store">\r\n              <input type="checkbox" id="backup-assets-checkbox" data-store="assets" checked />\r\n              <label for="backup-assets-checkbox" data-i18n="backup.backup.assets">Assets</label>\r\n            </div>\r\n            <div class="backup-store">\r\n              <input\r\n                type="checkbox"\r\n                id="backup-user-settings-checkbox"\r\n                data-store="userConfig"\r\n                checked\r\n              />\r\n              <label for="backup-user-settings-checkbox" data-i18n="backup.backup.settings"\r\n                >User Settings</label\r\n              >\r\n            </div>\r\n          </div>\r\n          <button\r\n            id="backup-btn"\r\n            class="wide-button"\r\n            type="submit"\r\n            data-i18n="backup.backup.button"\r\n          >\r\n            Backup\r\n          </button>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div id="restore" class="tab-content">\r\n      <div class="modal-screen">\r\n        <div class="description help" data-i18n="backup.restore.desc" data-i18n-prop="innerHTML">\r\n          Restore previously backed-up LiveCodes data. <br />\r\n          If you choose to replace current content, you may want to back it up first. <br />\r\n          Please visit the\r\n          <a href="{{DOCS_BASE_URL}}features/backup-restore" target="_blank" rel="noopener"\r\n            >documentations</a\r\n          >\r\n          for details.\r\n        </div>\r\n        <form id="restore-form">\r\n          <div class="input-container">\r\n            <span>\r\n              <input\r\n                type="radio"\r\n                name="restore-mode"\r\n                id="restore-mode-replace"\r\n                value="replace"\r\n                checked\r\n              />\r\n              <label\r\n                class="radio-label"\r\n                for="restore-mode-replace"\r\n                data-i18n="backup.restore.mode.replace"\r\n                >Replace current content</label\r\n              >\r\n            </span>\r\n            <span>\r\n              <input type="radio" name="restore-mode" id="restore-mode-merge" value="merge" />\r\n              <label\r\n                class="radio-label"\r\n                for="restore-mode-merge"\r\n                data-i18n="backup.restore.mode.merge"\r\n                >Merge with current content</label\r\n              >\r\n            </span>\r\n          </div>\r\n\r\n          <label\r\n            for="file-input"\r\n            class="file-input-label"\r\n            data-i18n="backup.restore.fromFile"\r\n            tabindex="0"\r\n            >Restore from file</label\r\n          >\r\n          <input\r\n            type="file"\r\n            id="file-input"\r\n            class="file-input"\r\n            accept=".zip,zip,application/zip,application/x-zip,application/x-zip-compressed"\r\n          />\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n';

// src/livecodes/html/index.ts
var replaceValues = (str) => Object.entries(predefinedValues).reduce(
  (str2, [key, value]) => str2.replace(new RegExp(`{{${key}}}`, "g"), value),
  str
);
var backupScreen = /* @__PURE__ */ replaceValues(backup_default);

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
var jsZipUrl = /* @__PURE__ */ getUrl("jszip@3.10.1/dist/jszip.js");

// src/livecodes/UI/selectors.ts
var getBackupLink = () => document.querySelector("#backup-link");
var getImportFileInput = (importContainer) => importContainer.querySelector("#file-input");
var getImportFileInputLabel = (importContainer) => importContainer.querySelector(".file-input-label");
var getBackupForm = (backupContainer) => backupContainer.querySelector("#backup-form");
var getBackupBtn = (backupContainer) => backupContainer.querySelector("#backup-btn");
var getBackupCheckedInputs = (backupContainer) => backupContainer.querySelectorAll('#backup input[type="checkbox"]:checked');

// src/livecodes/UI/backup.ts
var createBackupContainer = (eventsManager) => {
  const div = document.createElement("div");
  div.innerHTML = backupScreen;
  const backupContainer = div.firstChild;
  const tabs = backupContainer.querySelectorAll("#backup-tabs li");
  tabs.forEach((tab) => {
    const link = tab.querySelector("a");
    if (!link)
      return;
    eventsManager.addEventListener(link, "click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      document.querySelectorAll("#backup-screens > div").forEach((screen) => {
        screen.classList.remove("active");
      });
      const target = backupContainer.querySelector("#" + link.dataset.target);
      target?.classList.add("active");
      target?.querySelector("input")?.focus();
    });
  });
  return backupContainer;
};
var inProgressMessage = window.deps.translateString("backup.inProgress", "In progress...");
var isInProgress = () => getBackupLink()?.title === inProgressMessage;
var updateProgressStatus = ({
  inProgress,
  backupContainer
}) => {
  const backupLink = getBackupLink();
  const backupBtn = getBackupBtn(backupContainer);
  const fileInput = getImportFileInput(backupContainer);
  const fileInputLabel = getImportFileInputLabel(backupContainer);
  if (inProgress ?? isInProgress()) {
    if (backupLink) {
      backupLink.title = inProgressMessage;
    }
    backupBtn.innerText = inProgressMessage;
    backupBtn.disabled = true;
    fileInputLabel.innerText = inProgressMessage;
    fileInput.disabled = true;
  } else {
    if (backupLink) {
      backupLink.title = "";
    }
    backupBtn.innerText = window.deps.translateString("backup.backupBtn", "Backup");
    backupBtn.disabled = false;
    fileInputLabel.innerText = window.deps.translateString(
      "backup.fileInputLabel",
      "Restore from file"
    );
    fileInput.disabled = false;
  }
};
var createBackupUI = ({
  baseUrl,
  modal,
  notifications,
  eventsManager,
  stores,
  deps
}) => {
  const backupContainer = createBackupContainer(eventsManager);
  const backupForm = getBackupForm(backupContainer);
  const fileInput = getImportFileInput(backupContainer);
  updateProgressStatus({ backupContainer });
  const syncModule = import(baseUrl + "sync.js").then((mod) => {
    mod.init(baseUrl);
    return mod;
  });
  const createZip = async (files) => {
    const JSZip = await loadScript(jsZipUrl, "JSZip");
    const zip = new JSZip();
    files.forEach(({ filename: filename2, content: content2 }) => {
      zip.file(filename2, content2);
    });
    const output = await zip.generateAsync({
      type: "base64",
      compression: "DEFLATE",
      compressionOptions: {
        level: 6
      }
    });
    const filename = "livecodes_backup_" + getDate();
    const extension = "zip";
    const content = "data:application/zip;base64," + encodeURIComponent(output);
    downloadFile(filename, extension, content);
  };
  const backup = async () => {
    const storeKeys = [...getBackupCheckedInputs(backupContainer)].map((input) => input.dataset.store).filter(Boolean);
    if (storeKeys.length === 0) {
      notifications.warning(
        window.deps.translateString(
          "backup.error.atLeastOneStore",
          "Please select at least one store to backup"
        )
      );
      return;
    }
    if (storeKeys.includes("userConfig")) {
      storeKeys.push("userData");
      storeKeys.push("appData");
    }
    const loadedSyncModule = await syncModule;
    const files = await Promise.all(
      storeKeys.filter((storeKey) => Boolean(stores[storeKey])).map(async (storeKey) => ({
        filename: storeKey + ".b64",
        content: await loadedSyncModule.exportStoreAsBase64Update({ storeKey }) || ""
      }))
    );
    await createZip(files);
  };
  const loadFile = (input) => new Promise((resolve, reject) => {
    if (input.files?.length === 0)
      return;
    const file = input.files[0];
    if (!file.name.endsWith(".zip")) {
      reject(
        window.deps.translateString(
          "backup.error.incorrectFileType",
          "Error: Incorrect file type"
        )
      );
      return;
    }
    const maxSizeAllowed = 100 * 1024 * 1024;
    if (file.size > maxSizeAllowed) {
      reject(
        window.deps.translateString(
          "generic.error.exceededSize",
          "Error: Exceeded size {{size}} MB",
          {
            size: 100
          }
        )
      );
      return;
    }
    resolve(file);
  });
  const extractZip = async (blob) => {
    const JSZip = await loadScript(jsZipUrl, "JSZip");
    const zip = await JSZip.loadAsync(blob);
    const files = zip.file(/\.b64$/);
    return Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: await file.async("string")
      }))
    );
  };
  const restore = async (files) => {
    const loadedSyncModule = await syncModule;
    const formData = new FormData(backupForm);
    const mergeCurrent = formData.get("restore-mode") === "merge";
    for (const file of files) {
      const storeKey = file.filename.slice(0, -4);
      const storage = stores[storeKey];
      if (storage) {
        const update = base64ToUint8Array(file.content);
        await loadedSyncModule.restoreFromUpdate({
          update,
          storeKey,
          mergeCurrent
        });
      }
    }
    const hasUserConfig = files.find((f) => f.filename.startsWith("user"));
    if (hasUserConfig) {
      deps.loadUserConfig();
    }
    notifications.success(
      window.deps.translateString("backup.restore.success", "Restored Successfully!")
    );
  };
  eventsManager.addEventListener(backupForm, "submit", async (e) => {
    e.preventDefault();
    updateProgressStatus({ inProgress: true, backupContainer });
    await backup();
    updateProgressStatus({ inProgress: false, backupContainer });
  });
  eventsManager.addEventListener(fileInput, "change", async () => {
    updateProgressStatus({ inProgress: true, backupContainer });
    await Promise.resolve(fileInput).then(loadFile).then(extractZip).then(restore).catch((message) => {
      notifications.error(message);
    });
    updateProgressStatus({ inProgress: false, backupContainer });
  });
  modal.show(backupContainer, { isAsync: true });
};
export {
  createBackupUI,
  isInProgress,
  updateProgressStatus
};
