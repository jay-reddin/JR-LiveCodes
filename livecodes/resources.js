// src/livecodes/utils/utils.ts
var debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    if (timeout)
      clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(null, args), typeof delay === "function" ? delay() : delay);
  };
};
var isFirefox = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes("firefox") || userAgent.includes("fxios");
};
var hideOnClickOutside = (element) => {
  const hideElement = () => {
    element.style.display = "none";
    removeListeners();
    window.watchingEscape = false;
  };
  const outsideClickListener = (event) => {
    if (!element.contains(event.target) && isVisible(element)) {
      hideElement();
    }
  };
  const escapeListener = (event) => {
    if (event.key === "Escape") {
      hideElement();
      event.preventDefault();
    }
  };
  const isVisible = (elem) => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  const removeListeners = () => {
    document.removeEventListener("click", outsideClickListener);
    document.removeEventListener("keydown", escapeListener);
  };
  document.addEventListener("click", outsideClickListener);
  document.addEventListener("keydown", escapeListener);
  window.watchingEscape = true;
  return {
    clear: () => removeListeners()
  };
};
var predefinedValues = {
  APP_VERSION: "47",
  SDK_VERSION: "0.12.0",
  COMMIT_SHA: "7b4906d",
  REPO_URL: "https://github.com/live-codes/livecodes",
  DOCS_BASE_URL: "http://localhost:3000/docs/"
};

// src/livecodes/html/external-resources.html?raw
var external_resources_default = `<div id="resources-container" class="modal-container">\r
  <div class="modal-title" data-i18n="resources.heading">External Resources</div>\r
  <div id="resources-screen-container" class="modal-screen-container">\r
    <div class="modal-screen">\r
      <label\r
        for="resources-search-input"\r
        data-i18n="resources.search.heading"\r
        data-i18n-prop="innerHTML"\r
        >Search Packages <span class="nowrap label-description">(powered by jsDelivr)</span></label\r
      >\r
      <input\r
        type="text"\r
        id="resources-search-input"\r
        placeholder="e.g. jquery, lodash@4, bootstrap@5.2.3, ..."\r
        data-i18n="resources.search.placeholder"\r
        data-i18n-prop="placeholder"\r
        onfocus="this.value=''"\r
      />\r
      <div id="resources-result-container"><ul id="resources-search-results"></ul></div>\r
\r
      <div id="resources-textarea-container">\r
        <div class="description help center" data-i18n="resources.urlDesc">\r
          Add stylesheet/script URLs. Each URL should be in a separate line.\r
        </div>\r
\r
        <label for="external-stylesheets" data-i18n="resources.stylesheets"\r
          >External Stylesheets</label\r
        >\r
        <textarea\r
          dir="ltr"\r
          id="external-stylesheets"\r
          placeholder="https://"\r
          data-resource="stylesheets"\r
        ></textarea>\r
        <label for="external-scripts" data-i18n="resources.scripts">External Scripts</label>\r
        <textarea\r
          dir="ltr"\r
          id="external-scripts"\r
          placeholder="https://"\r
          data-resource="scripts"\r
        ></textarea>\r
      </div>\r
\r
      <label data-i18n="resources.fonts.heading" data-i18n-prop="innerHTML"\r
        >Fonts <span class="nowrap label-description">(powered by Google Fonts)</span></label\r
      >\r
      <div id="fonts-container">\r
        <select>\r
          <option value="" data-i18n="generic.loading">Loading...</option>\r
        </select>\r
        <button class="btn" data-i18n="resources.fonts.add">Add</button>\r
      </div>\r
\r
      <label data-i18n="resources.cssPresets.heading">CSS Presets</label>\r
      <div class="input-container">\r
        <span>\r
          <input type="radio" id="resources-css-preset-none" name="css-preset" value="" checked />\r
          <label\r
            class="radio-label"\r
            for="resources-css-preset-none"\r
            data-i18n="resources.cssPresets.none"\r
            >None</label\r
          >\r
        </span>\r
        <span>\r
          <input\r
            type="radio"\r
            id="resources-css-preset-normalize-css"\r
            name="css-preset"\r
            value="normalize.css"\r
          />\r
          <label\r
            class="radio-label"\r
            for="resources-css-preset-normalize-css"\r
            data-i18n="resources.cssPresets.normalizeCss"\r
            >Normalize.css</label\r
          >\r
        </span>\r
        <span>\r
          <input\r
            type="radio"\r
            id="resources-css-preset-reset-css"\r
            name="css-preset"\r
            value="reset-css"\r
          />\r
          <label\r
            class="radio-label"\r
            for="resources-css-preset-reset-css"\r
            data-i18n="resources.cssPresets.resetCss"\r
            >Reset CSS</label\r
          >\r
        </span>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;

// src/livecodes/html/index.ts
var replaceValues = (str) => Object.entries(predefinedValues).reduce(
  (str2, [key, value]) => str2.replace(new RegExp(`{{${key}}}`, "g"), value),
  str
);
var resourcesScreen = /* @__PURE__ */ replaceValues(external_resources_default);

// src/livecodes/services/utils.ts
var removeCDNPrefix = (url) => {
  if (!url.startsWith("https://"))
    return url;
  const prefixes = [
    "https://esm.sh/",
    "https://cdn.skypack.dev/",
    "https://cdn.jsdelivr.net/npm/",
    "https://fastly.jsdelivr.net/npm/",
    "https://gcore.jsdelivr.net/npm/",
    "https://testingcf.jsdelivr.net/npm/",
    "https://jsdelivr.b-cdn.net/npm/",
    "https://esm.run/",
    "https://esbuild.vercel.app/",
    "https://bundle.run/",
    "https://unpkg.com/",
    "https://npmcdn.com/",
    "https://deno.bundlejs.com/?file&q=",
    "https://jspm.dev/"
  ];
  for (const prefix of prefixes) {
    if (url.startsWith(prefix)) {
      return url.replace(prefix, "");
    }
  }
  return url;
};
var removeSpecifier = (type) => type.includes(":") && !type.startsWith("data:") && !type.startsWith("http") ? type.split(":")[1] : type;

// src/livecodes/services/pkgInfo.ts
var getSearchApiUrl = (query) => `https://ofcncog2cu-dsn.algolia.net/1/indexes/npm-search/${encodeURIComponent(
  query
)}?x-algolia-agent=Browser`;
var algoliaHeaders = {
  "X-Algolia-Application-Id": "OFCNCOG2CU",
  "X-Algolia-API-Key": "f54e21fa3a2a0160595bb058179bfb1e"
};
var attributesToRetrieve = ["name", "description", "homepage", "repository.url", "version"];
var apiEndpoint = "https://data.jsdelivr.com/v1";
var jsDelivrHeaders = {
  // https://github.com/live-codes/livecodes/issues/628
  ...isFirefox() ? {} : { "User-Agent": "https://livecodes.io" }
};
var splitNameVersion = (nameVersion) => {
  const scoped = nameVersion.startsWith("@");
  const str = scoped ? nameVersion.slice(1) : nameVersion;
  const [name, version] = str.split("@");
  return [(scoped ? "@" : "") + name, version];
};
var search = async (query, limit = 10) => {
  const options = {
    page: 0,
    hitsPerPage: limit,
    attributesToHighlight: [],
    attributesToRetrieve,
    analyticsTags: ["jsdelivr"]
  };
  const [name, version] = splitNameVersion(query);
  let exactVersion;
  if (version) {
    const versioned = await addPkgVersion(query);
    if (typeof versioned === "string") {
      exactVersion = splitNameVersion(versioned)[1];
    }
  }
  const data = await fetch(getSearchApiUrl("query"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      ...algoliaHeaders
    },
    body: JSON.stringify({
      query: name,
      ...options
    })
  }).then((res) => {
    if (!res.ok)
      throw new Error("failed to fetch");
    return res;
  }).then((res) => res.json()).catch((err) => ({
    error: true,
    message: err.message || String(err)
  }));
  if ("error" in data) {
    return data;
  }
  const results = data.hits.map((pkg) => {
    if (pkg.name === name && exactVersion) {
      pkg.version = exactVersion;
    }
    if (pkg.repository?.url) {
      pkg.repo = pkg.repository?.url;
    }
    return pkg;
  });
  results.sort((a, b) => a.name === name ? -1 : b.name === name ? 1 : 0);
  return results;
};
var addPkgVersion = async (pkgName) => {
  const url = `${apiEndpoint}/package/resolve/npm/${pkgName}`;
  const data = await fetch(url, { headers: jsDelivrHeaders }).then((res) => {
    if (!res.ok)
      throw new Error("failed to fetch");
    return res;
  }).then((res) => res.json()).catch((err) => ({
    error: true,
    message: err.message || String(err)
  }));
  if ("error" in data) {
    return data;
  }
  const name = splitNameVersion(pkgName)[0];
  const version = data.version;
  return version ? `${name}@${version}` : name;
};
var getPkgInfo = async (pkgName) => {
  const [name, version] = splitNameVersion(removeSpecifier(removeCDNPrefix(pkgName)));
  let exactVersion;
  if (version) {
    const versioned = await addPkgVersion(pkgName);
    if (typeof versioned === "string") {
      exactVersion = splitNameVersion(versioned)[1];
    }
  }
  const url = getSearchApiUrl(name) + "&attributesToRetrieve=" + attributesToRetrieve.join(",");
  const data = await fetch(url, {
    method: "GET",
    headers: algoliaHeaders
  }).then((res) => {
    if (!res.ok)
      throw new Error("failed to fetch");
    return res;
  }).then((res) => res.json()).catch((err) => ({
    error: true,
    message: err.message || String(err)
  }));
  if ("error" in data) {
    return data;
  }
  if (exactVersion) {
    data.version = exactVersion;
  }
  if (data.repository?.url) {
    data.repo = data.repository?.url;
  }
  return data;
};
var getPkgFiles = async (pkgName) => {
  const pkgNameVersion = await addPkgVersion(pkgName);
  const url = `${apiEndpoint}/package/npm/${pkgNameVersion}/flat`;
  const data = await fetch(url, { headers: jsDelivrHeaders }).then((res) => {
    if (!res.ok)
      throw new Error("failed to fetch");
    return res;
  }).then((res) => res.json()).catch((err) => ({
    error: true,
    message: err.message || String(err)
  }));
  if ("error" in data) {
    return data;
  }
  const basePath = `https://cdn.jsdelivr.net/npm/${pkgNameVersion}`;
  return {
    ...data.default ? { default: basePath + data.default } : {},
    files: data.files.map((f) => basePath + f.name)
  };
};
var getPkgDefaultFiles = async (pkgName) => {
  const pkgNameVersion = await addPkgVersion(pkgName);
  const url = `${apiEndpoint}/package/npm/${pkgNameVersion}/entrypoints`;
  const data = await fetch(url, { headers: jsDelivrHeaders }).then((res) => {
    if (!res.ok)
      throw new Error("failed to fetch");
    return res;
  }).then((res) => res.json()).catch((err) => ({
    error: true,
    message: err.message || String(err)
  }));
  if ("error" in data) {
    return data;
  }
  const basePath = `https://cdn.jsdelivr.net/npm/${pkgNameVersion}`;
  return {
    ...data.js?.file ? { js: basePath + data.js?.file } : {},
    ...data.css?.file ? { css: basePath + data.css?.file } : {}
  };
};
var pkgInfoService = {
  search,
  getPkgInfo,
  getPkgFiles,
  getPkgDefaultFiles
};

// src/livecodes/UI/selectors.ts
var getExternalResourcesTextareas = () => document.querySelectorAll("#resources-container textarea");
var getExternalResourcesCssPresetInputs = () => document.querySelectorAll('#resources-container input[type="radio"]');

// src/livecodes/UI/resources.ts
var createExternalResourcesUI = ({
  baseUrl,
  modal,
  eventsManager,
  deps
}) => {
  const div = document.createElement("div");
  div.innerHTML = resourcesScreen;
  const resourcesContainer = div.firstChild;
  modal.show(resourcesContainer, { onClose: () => updateResources(), autoFocus: false });
  const externalResources = getExternalResourcesTextareas();
  externalResources.forEach((textarea) => {
    const resourceContent = deps.getConfig()[textarea.dataset.resource];
    textarea.value = resourceContent.length !== 0 ? resourceContent.join("\n") + "\n" : "";
  });
  const cssPresetInputs = getExternalResourcesCssPresetInputs();
  cssPresetInputs.forEach((input) => {
    const cssPreset = deps.getConfig().cssPreset;
    if (cssPreset === input.value) {
      input.checked = true;
    }
  });
  const searchInput = document.querySelector(
    "#resources-container #resources-search-input"
  );
  const resultContainer = document.querySelector(
    "#resources-container #resources-result-container"
  );
  const searchResultsEl = document.querySelector(
    "#resources-container #resources-search-results"
  );
  const fontsSelect = document.querySelector(
    "#resources-container #fonts-container select"
  );
  const addFontsBtn = document.querySelector(
    "#resources-container #fonts-container button"
  );
  const addResource = (url, type) => {
    if (!url || isAdded(url, type))
      return;
    const textarea = type === "stylesheets" ? externalResources[0] : externalResources[1];
    textarea.value = textarea.value.trim() === "" ? url.trim() + "\n" : textarea.value.split("\n").map((x) => x.trim()).filter((x) => x !== "").join("\n") + "\n" + url.trim() + "\n";
    document.querySelector(`#resources-search-results a.add-resource[data-resource-url="${url}"]`)?.classList.add("resource-added");
  };
  const isAdded = (url, type) => {
    if (!url)
      return false;
    const textarea = type === "stylesheets" ? externalResources[0] : externalResources[1];
    return Boolean(
      textarea.value.split("\n").map((x) => x.trim()).find((x) => x === url.trim())
    );
  };
  const getResultItem = ({
    name,
    version,
    description,
    files
  }) => {
    const li = document.createElement("li");
    const itemTitle = document.createElement("div");
    itemTitle.classList.add("search-result-item-title");
    itemTitle.textContent = name;
    li.appendChild(itemTitle);
    const itemVersion = document.createElement("span");
    itemVersion.classList.add("label-description");
    itemVersion.textContent = "v" + version;
    itemTitle.appendChild(itemVersion);
    const itemDescription = document.createElement("div");
    itemDescription.classList.add("search-result-item-description");
    itemDescription.textContent = description || "";
    li.appendChild(itemDescription);
    const itemFiles = document.createElement("div");
    itemFiles.classList.add("search-result-item-files");
    li.appendChild(itemFiles);
    const itemScript = document.createElement("span");
    itemScript.classList.add("search-result-item-script");
    itemFiles.appendChild(itemScript);
    if (files?.js) {
      const scriptAdded = isAdded(files.js, "scripts");
      const itemScriptLink = document.createElement("a");
      itemScriptLink.classList.add("add-resource");
      itemScriptLink.classList.toggle("resource-added", scriptAdded);
      itemScriptLink.href = "#";
      itemScriptLink.onclick = scriptAdded ? null : () => addResource(files.js || "", "scripts");
      itemScriptLink.title = files.js;
      itemScriptLink.dataset.resourceUrl = files.js;
      itemScriptLink.innerHTML = `<img src="${baseUrl}assets/images/javascript.svg" /> JS`;
      itemScript.appendChild(itemScriptLink);
    }
    const itemStylesheet = document.createElement("span");
    itemStylesheet.classList.add("search-result-item-stylesheet");
    itemFiles.appendChild(itemStylesheet);
    if (files?.css) {
      const stylesheetAdded = isAdded(files.css, "stylesheets");
      const itemStylesheetLink = document.createElement("a");
      itemStylesheetLink.classList.add("add-resource");
      itemStylesheetLink.classList.toggle("resource-added", stylesheetAdded);
      itemStylesheetLink.href = "#";
      itemStylesheetLink.onclick = stylesheetAdded ? null : () => addResource(files.css || "", "stylesheets");
      itemStylesheetLink.title = files.css;
      itemStylesheetLink.dataset.resourceUrl = files.css;
      itemStylesheetLink.innerHTML = `<img src="${baseUrl}assets/images/css.svg" /> CSS`;
      itemStylesheet.appendChild(itemStylesheetLink);
    }
    const itemBrowse = document.createElement("span");
    itemBrowse.classList.add("search-result-item-Browse");
    itemFiles.appendChild(itemBrowse);
    const itemBrowseLink = document.createElement("a");
    itemBrowseLink.href = `https://cdn.jsdelivr.net/npm/${name}/`;
    itemBrowseLink.target = "_blank";
    itemBrowseLink.title = window.deps.translateString(
      "resources.browseOnJsDelivr",
      "Browse package files on jsDelivr"
    );
    itemBrowseLink.textContent = "Browse";
    itemBrowse.appendChild(itemBrowseLink);
    return li;
  };
  const search2 = async () => {
    const query = searchInput.value;
    const searchResults = await pkgInfoService.search(searchInput.value, 5);
    if (query !== searchInput.value) {
      searchResultsEl.innerHTML = `<li><div class="search-result-item-description">${window.deps.translateString("generic.loading", "Loading...")}</div></li>`;
      return;
    }
    if ("error" in searchResults) {
      searchResultsEl.innerHTML = `<li><div class="search-result-item-error">${window.deps.translateString("resources.error.failedToLoadResults", "Failed to load results!")}</div></li>`;
      return;
    }
    if (searchResults.length === 0) {
      searchResultsEl.innerHTML = `<li><div class="search-result-item-description">${window.deps.translateString("resources.error.noResultsFound", "No results found for: ")}<strong>${query}</strong></div></li>`;
      return;
    }
    const resultsWithFiles = (await Promise.all(
      searchResults.map(async (info) => {
        const pkgName = info.version != null ? `${info.name}@${info.version}` : info.name;
        const files = await pkgInfoService.getPkgDefaultFiles(pkgName);
        if ("error" in files)
          return;
        return {
          ...info,
          files
        };
      })
    )).filter(Boolean);
    if (query !== searchInput.value)
      return;
    if (resultsWithFiles.length === 0) {
      searchResultsEl.innerHTML = `<li><div class="search-result-item-error">${window.deps.translateString("resources.error.failedToLoadResults", "Failed to load results!")}</div></li>`;
      return;
    }
    searchResultsEl.innerHTML = "";
    resultsWithFiles.forEach((item) => searchResultsEl.appendChild(getResultItem(item)));
  };
  let menuEvents;
  searchInput?.focus();
  searchInput.addEventListener("input", async () => {
    searchResultsEl.innerHTML = `<li><div class="search-result-item-description">${window.deps.translateString("generic.loading", "Loading...")}</div></li>`;
    menuEvents?.clear();
    if (searchInput.value.length > 0) {
      resultContainer.style.display = "unset";
      menuEvents = hideOnClickOutside(resultContainer);
    } else {
      resultContainer.style.display = "none";
      return;
    }
    debounce(search2, 300)();
  });
  const fontsModule = import(baseUrl + "google-fonts.js");
  fontsModule.then((mod) => {
    fontsSelect.innerHTML = `<option value="">${window.deps.translateString("resources.fonts.select", "Select font ...")}</option>`;
    const fonts = mod.googleFonts.getFonts();
    fonts.forEach((font) => {
      const option = document.createElement("option");
      option.innerText = font;
      fontsSelect.appendChild(option);
    });
    eventsManager.addEventListener(addFontsBtn, "click", () => {
      if (fontsSelect.value === "")
        return;
      addResource(mod.googleFonts.getStylesheetUrl(fontsSelect.value), "stylesheets");
      fontsSelect.value = "";
      addFontsBtn.innerText = "\u2714";
      setTimeout(() => {
        addFontsBtn.innerText = window.deps.translateString("resources.fonts.add", "Add");
      }, 1e3);
    });
  });
  const updateResources = async () => {
    externalResources.forEach((textarea) => {
      const resource = textarea.dataset.resource;
      deps.setConfig({
        ...deps.getConfig(),
        [resource]: textarea.value?.split("\n").map((x) => x.trim()).filter((x) => x !== "") || []
      });
    });
    cssPresetInputs.forEach((input) => {
      if (input.checked) {
        deps.setConfig({
          ...deps.getConfig(),
          cssPreset: input.value
        });
      }
    });
    deps.loadResources();
  };
};
export {
  createExternalResourcesUI
};
