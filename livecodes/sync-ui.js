// src/livecodes/utils/utils.ts
var predefinedValues = {
  APP_VERSION: "47",
  SDK_VERSION: "0.12.0",
  COMMIT_SHA: "7b4906d",
  REPO_URL: "https://github.com/live-codes/livecodes",
  DOCS_BASE_URL: "http://localhost:3000/docs/"
};

// src/livecodes/html/sync.html?raw
var sync_default = '<div id="sync-container" class="modal-container">\r\n  <div class="modal-title" data-i18n="sync.heading">Sync to GitHub Repo</div>\r\n  <div id="sync-status" class="modal-screen-container"></div>\r\n\r\n  <div id="sync-screens" class="modal-screen-container">\r\n    <ul id="sync-tabs" class="modal-tabs">\r\n      <li class="active">\r\n        <a href="#" data-target="new-repo" data-i18n="sync.create.heading">Create New Repo</a>\r\n      </li>\r\n      <li>\r\n        <a href="#" data-target="existing-repo" data-i18n="sync.existing.heading">Existing Repo</a>\r\n      </li>\r\n    </ul>\r\n\r\n    <div id="new-repo" class="tab-content active">\r\n      <div class="modal-screen">\r\n        <form id="new-repo-form">\r\n          <div>\r\n            <label for="new-repo-name" data-i18n="sync.create.repoName"\r\n              >Repo Name <span id="new-repo-name-error" class="error"></span\r\n            ></label>\r\n            <input\r\n              type="text"\r\n              id="new-repo-name"\r\n              placeholder="Required"\r\n              data-i18n="generic.required"\r\n              data-i18n-prop="placeholder"\r\n            />\r\n          </div>\r\n          <div class="padded">\r\n            <input type="checkbox" id="new-repo-autosync" checked />\r\n            <label for="new-repo-autosync" data-i18n="sync.autoSync">Auto sync</label>\r\n          </div>\r\n          <button\r\n            id="new-repo-btn"\r\n            class="wide-button start-sync-btn"\r\n            type="submit"\r\n            data-i18n="sync.syncBtn"\r\n          >\r\n            Sync\r\n          </button>\r\n        </form>\r\n        <div class="description help" data-i18n="sync.create.desc" data-i18n-prop="innerHTML">\r\n          A new <strong>private</strong> repo will be created. Your LiveCodes local data will be\r\n          synchronized with <span class="code">main</span> branch.\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div id="existing-repo" class="tab-content">\r\n      <div class="modal-screen">\r\n        <form id="existing-repo-form">\r\n          <div>\r\n            <label for="existing-repo-name" data-i18n="sync.existing.repoName">Repo Name</label>\r\n            <input\r\n              type="text"\r\n              id="existing-repo-name"\r\n              autocomplete="off"\r\n              placeholder="Loading..."\r\n              data-i18n="generic.loading"\r\n              data-i18n-prop="placeholder"\r\n            />\r\n          </div>\r\n          <div class="padded">\r\n            <input type="checkbox" id="existing-repo-autosync" checked />\r\n            <label for="existing-repo-autosync" data-i18n="sync.autoSync">Auto sync</label>\r\n          </div>\r\n          <button\r\n            id="existing-repo-btn"\r\n            class="wide-button start-sync-btn"\r\n            type="submit"\r\n            data-i18n="sync.syncBtn"\r\n          >\r\n            Sync\r\n          </button>\r\n        </form>\r\n        <div class="description help" data-i18n="sync.existing.desc" data-i18n-prop="innerHTML">\r\n          Your LiveCodes local data will be synchronized with\r\n          <span class="code">main</span> branch.\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n';

// src/livecodes/html/index.ts
var replaceValues = (str) => Object.entries(predefinedValues).reduce(
  (str2, [key, value]) => str2.replace(new RegExp(`{{${key}}}`, "g"), value),
  str
);
var syncScreen = /* @__PURE__ */ replaceValues(sync_default);

// src/livecodes/services/github.ts
var getGithubHeaders = (user, mediaType) => ({
  Accept: `application/vnd.github.v3${mediaType ? "." + mediaType : ""}+json`,
  "Content-Type": "application/json",
  Authorization: "token " + user.token
});
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
var autoCompleteUrl = /* @__PURE__ */ getUrl(
  "@tarekraafat/autocomplete.js@10.2.7/dist/autoComplete.min.js"
);

// src/livecodes/UI/selectors.ts
var getSyncLink = () => document.querySelector("#sync-link");
var getSyncIndicator = () => document.querySelector("#sync-indicator");
var getNewRepoForm = (deployContainer) => deployContainer.querySelector("#new-repo-form");
var getNewRepoNameInput = (deployContainer) => deployContainer.querySelector("#new-repo-name");
var getNewRepoAutoSync = (deployContainer) => deployContainer.querySelector("#new-repo-autosync");
var getExistingRepoForm = (deployContainer) => deployContainer.querySelector("#existing-repo-form");
var getExistingRepoNameInput = (deployContainer) => deployContainer.querySelector("#existing-repo-name");
var getExistingRepoAutoSync = (deployContainer) => deployContainer.querySelector("#existing-repo-autosync");
var getSyncStatus = (syncContainer) => (syncContainer || document).querySelector("#sync-status");
var getStartSyncBtns = (syncContainer) => (syncContainer || document).querySelectorAll(".start-sync-btn");

// src/livecodes/UI/sync-ui.ts
var createSyncContainer = (eventsManager, repo) => {
  const div = document.createElement("div");
  div.innerHTML = syncScreen;
  const syncContainer = div.firstChild;
  const tabs = syncContainer.querySelectorAll("#sync-tabs li");
  tabs.forEach((tab) => {
    const link = tab.querySelector("a");
    if (!link)
      return;
    eventsManager.addEventListener(link, "click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      document.querySelectorAll("#sync-screens > div").forEach((screen) => {
        screen.classList.remove("active");
      });
      const target = syncContainer.querySelector("#" + link.dataset.target);
      target?.classList.add("active");
      target?.querySelector("input")?.focus();
    });
  });
  if (repo) {
    setTimeout(() => {
      tabs[1].click();
      const existingRepoNameInput = getExistingRepoNameInput(syncContainer);
      existingRepoNameInput.value = repo;
    });
  }
  return syncContainer;
};
var syncInProgressMessage = window.deps.translateString(
  "sync.syncInProgress",
  "Sync in progress..."
);
var isSyncInProgress = () => getSyncLink()?.title === syncInProgressMessage;
var updateSyncStatus = ({
  inProgress,
  lastSync,
  syncContainer
}) => {
  const syncLink = getSyncLink();
  const syncIndicator = getSyncIndicator();
  const syncStatus = getSyncStatus(syncContainer);
  const startSyncBtns = getStartSyncBtns(syncContainer);
  const lastSyncMessage = lastSync ? `Last sync: ${new Date(lastSync).toLocaleString()}` : "";
  if (syncStatus) {
    syncStatus.innerText = lastSyncMessage;
  }
  if (inProgress ?? isSyncInProgress()) {
    if (syncLink) {
      syncLink.title = syncInProgressMessage;
      syncIndicator?.classList.remove("hidden");
    }
    startSyncBtns?.forEach((btn) => {
      btn.innerText = syncInProgressMessage;
      btn.disabled = true;
    });
  } else {
    if (syncLink) {
      syncLink.title = lastSyncMessage;
      syncIndicator?.classList.add("hidden");
    }
    startSyncBtns?.forEach((btn) => {
      btn.innerText = window.deps.translateString("sync.syncBtn", "Sync");
      btn.disabled = false;
    });
  }
};
var createSyncUI = async ({
  baseUrl,
  modal,
  notifications,
  eventsManager,
  user,
  deps
}) => {
  const syncData = await deps.getSyncData();
  const syncContainer = createSyncContainer(eventsManager, syncData?.repo);
  const newRepoForm = getNewRepoForm(syncContainer);
  const newRepoNameInput = getNewRepoNameInput(syncContainer);
  const newRepoAutoSync = getNewRepoAutoSync(syncContainer);
  const existingRepoForm = getExistingRepoForm(syncContainer);
  const existingRepoNameInput = getExistingRepoNameInput(syncContainer);
  const existingRepoAutoSync = getExistingRepoAutoSync(syncContainer);
  updateSyncStatus({ inProgress: isSyncInProgress(), lastSync: syncData?.lastSync, syncContainer });
  const syncModule = import(baseUrl + "sync.js").then((mod) => {
    mod.init(baseUrl);
    return mod;
  });
  const sync = (user2, repo, newRepo) => {
    notifications.info(window.deps.translateString("sync.syncStarted", "Sync started..."));
    modal.close();
    return syncModule.then(async (mod) => {
      const syncResult = await mod.sync({
        user: user2,
        repo,
        newRepo
      });
      if (!syncResult) {
        notifications.error(window.deps.translateString("sync.error.generic", "Sync failed!"));
        return;
      }
      notifications.success(window.deps.translateString("sync.success", "Sync complete!"));
    }).catch(() => {
      notifications.error(window.deps.translateString("sync.error.generic", "Sync failed!"));
    });
  };
  eventsManager.addEventListener(newRepoForm, "submit", async (e) => {
    e.preventDefault();
    if (!user || isSyncInProgress())
      return;
    const repo = newRepoNameInput.value;
    const autosync = newRepoAutoSync.checked;
    const newRepo = true;
    if (!repo) {
      notifications.error(
        window.deps.translateString("sync.error.repoNameRequired", "Repo name is required")
      );
      return;
    }
    updateSyncStatus({ inProgress: true });
    await sync(user, repo, newRepo);
    const lastSync = Date.now();
    await deps.setSyncData({ autosync, repo, lastSync });
    updateSyncStatus({ inProgress: false, lastSync });
  });
  eventsManager.addEventListener(existingRepoForm, "submit", async (e) => {
    e.preventDefault();
    if (!user || isSyncInProgress())
      return;
    const repo = existingRepoNameInput.value;
    const autosync = existingRepoAutoSync.checked;
    const newRepo = false;
    if (!repo) {
      notifications.error(
        window.deps.translateString("sync.error.repoNameRequired", "Repo name is required")
      );
      return;
    }
    updateSyncStatus({ inProgress: true });
    await sync(user, repo, newRepo);
    const lastSync = Date.now();
    await deps.setSyncData({ autosync, repo, lastSync });
    updateSyncStatus({ inProgress: false, lastSync });
  });
  modal.show(syncContainer, { isAsync: true, autoFocus: false });
  newRepoNameInput.focus();
  if (!user)
    return;
  if (!globalThis.autoComplete) {
    await import(autoCompleteUrl);
  }
  const autoComplete = globalThis.autoComplete;
  const repos = await getUserRepos(user, "all");
  eventsManager.addEventListener(existingRepoNameInput, "init", () => {
    existingRepoNameInput.focus();
  });
  const inputSelector = "#" + existingRepoNameInput.id;
  if (!document.querySelector(inputSelector))
    return;
  const autoCompleteJS = new autoComplete({
    selector: inputSelector,
    placeHolder: window.deps.translateString("sync.searchRepos", "Search your repos..."),
    data: {
      src: repos
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
  createSyncUI,
  isSyncInProgress,
  updateSyncStatus
};
