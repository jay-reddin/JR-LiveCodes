// src/livecodes/utils/utils.ts
var safeName = (name, symbol = "_") => name.replace(/[\W]+/g, symbol);
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

// src/livecodes/html/share.html?raw
var share_default = '<div id="share-screen" class="modal-container">\r\n  <div class="modal-title" data-i18n="share.heading">Share</div>\r\n\r\n  <div class="modal-content modal-screen-container">\r\n    <div id="share-top-text">\r\n      <span id="share-permanent-url"\r\n        ><input id="share-permanent-url-checkbox" type="checkbox" /><label\r\n          for="share-permanent-url-checkbox"\r\n          data-i18n="share.permanentURL"\r\n          >Permanent URL</label\r\n        ></span\r\n      >\r\n      <a href="#" id="share-click-to-copy"></a>\r\n    </div>\r\n    <input type="text" dir="ltr" id="share-url-input" data-clickonenter="true" readonly />\r\n    <div id="share-expiry" class="share-expiry light">\r\n      <div class="share-short-url-expiry">\r\n        <span>&nbsp;</span><a href="#" data-i18n="share.encodedURL">Get encoded URL</a>\r\n      </div>\r\n      <div class="share-encoded-url-expiry">\r\n        <span class="{{warnClass}}" data-i18n="share.characters">{{urlLength}} characters</span\r\n        ><a href="#" data-i18n="share.shortURL">Get short URL</a>\r\n      </div>\r\n    </div>\r\n    <div id="share-expiry-self-hosted" class="share-expiry light">\r\n      <div class="share-short-url-expiry">\r\n        <span class="danger" data-i18n="share.expireInOneYear">Expires in 1 year</span\r\n        ><a href="#" data-i18n="share.encodedURL">Get encoded URL</a>\r\n      </div>\r\n      <div class="share-encoded-url-expiry">\r\n        <span class="{{warnClass}}" data-i18n="share.characters">{{urlLength}} characters</span\r\n        ><a href="#" data-i18n="share.shortURL">Get short URL</a>\r\n      </div>\r\n    </div>\r\n    <div id="share-links-container">\r\n      <ul id="share-links"></ul>\r\n      <div id="qrcode-container" class="qrcode-container" data-i18n="share.qrcode.generating">\r\n        Generating...\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n';

// src/livecodes/html/index.ts
var replaceValues = (str) => Object.entries(predefinedValues).reduce(
  (str2, [key, value]) => str2.replace(new RegExp(`{{${key}}}`, "g"), value),
  str
);
var shareScreen = /* @__PURE__ */ replaceValues(share_default);

// src/livecodes/services/allowed-origin.ts
var allowedOrigin = (origin = location.origin) => Boolean(
  origin && (origin.endsWith("livecodes.io") || origin.endsWith("livecodes.pages.dev") || origin.endsWith("localpen.pages.dev") || origin.includes("127.0.0.1") || origin.includes("localhost:") || origin.endsWith("localhost") || origin.endsWith(".test"))
);

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
var qrcodeUrl = /* @__PURE__ */ getUrl("easyqrcodejs@4.6.1/dist/easy.qrcode.min.js");

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
var getQrCodeContainer = () => document.querySelector("#qrcode-container");

// src/livecodes/UI/share.ts
var encode = encodeURIComponent;
var createShareContainer = async (shareFn, baseUrl, eventsManager) => {
  let messageTimeout;
  const copyUrl = (url) => {
    if (!url || !copyToClipboard(url)) {
      setMessage(
        window.deps.translateString("share.error.failedToCopy", "Copy to clipboard failed!")
      );
    }
    setMessage(window.deps.translateString("share.copy.copied", "URL copied to clipboard"));
    messageTimeout = setTimeout(() => {
      setMessage(window.deps.translateString("share.copy.clickToCopy", "Click to copy"));
    }, 5e3);
  };
  const showQrCode = async () => {
    const qrcodeContainer = getQrCodeContainer();
    items.style.visibility = "hidden";
    qrcodeContainer.style.display = "flex";
    qrcodeImg = "";
    if (qrcodeImg) {
      shareExpiry?.classList.add("short-url");
      if (input && shareDataShort) {
        input.value = shareDataShort.url;
      }
      return;
    }
    if (!shareDataShort) {
      await generateShortUrl();
    }
    if (!shareDataShort)
      return;
    await generateQrCode({
      container: qrcodeContainer,
      url: shareDataShort.url,
      title: shareDataShort.title,
      logo: baseUrl + "assets/images/livecodes-logo.svg"
    });
  };
  const populateItems = (shareData2, services2, items2) => {
    if (!items2)
      return;
    items2.innerHTML = "";
    services2.forEach((service) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = service.createShareUrl?.(shareData2) || "#";
      link.target = "blank";
      link.rel = "noopener noreferrer";
      link.innerHTML = `
        <span class="share-image-container">
        <i class="${service.icon}"
          alt="${service.name}"
          ${service.name === window.deps.translateString("share.services.twitter", "\u{1D54F} / Twitter") ? 'class="twitter"' : ""}
        ></i>
        </span>
        ${service.name}
      `;
      if (service.onClick) {
        eventsManager.addEventListener(link, "click", async (event) => {
          event.preventDefault();
          service.onClick?.(shareData2);
        });
      }
      item.appendChild(link);
      items2.appendChild(item);
      if (service.name === window.deps.translateString("share.services.share", "Share via \u2026") && !navigator.share) {
        item.remove();
      }
    });
    if (input) {
      input.value = shareData2.url;
    }
    setMessage(window.deps.translateString("share.copy.clickToCopy", "Click to copy"));
  };
  const services = [
    {
      name: window.deps.translateString("share.services.facebook", "Facebook"),
      icon: "icon-share-facebook",
      createShareUrl: ({ url }) => `https://www.facebook.com/sharer.php?u=${encode(url)}`
    },
    {
      name: window.deps.translateString("share.services.twitter", "\u{1D54F} / Twitter"),
      icon: "icon-share-x",
      createShareUrl: ({ url, title }) => `https://twitter.com/intent/tweet?url=${encode(url)}&text=${encode(title)}`
    },
    {
      name: window.deps.translateString("share.services.hackerNews", "Hacker News"),
      icon: "icon-share-hacker",
      createShareUrl: ({ url, title }) => `https://news.ycombinator.com/submitlink?u=${encode(url)}&t=${encode(title)}`
    },
    {
      name: window.deps.translateString("share.services.reddit", "Reddit"),
      icon: "icon-share-reddit",
      createShareUrl: ({ url, title }) => `https://www.reddit.com/submit?url=${encode(url)}&title=${encode(title)}`
    },
    {
      name: window.deps.translateString("share.services.linkedIn", "LinkedIn"),
      icon: "icon-share-linkedin",
      createShareUrl: ({ url, title }) => `https://www.linkedin.com/shareArticle?url=${encode(url)}&title=${encode(
        title
      )}&mini=true&source=LiveCodes`
    },
    {
      name: window.deps.translateString("share.services.devTo", "Dev.to"),
      icon: "icon-share-dev",
      createShareUrl: ({ url, title }) => `https://dev.to/new?prefill=${encode(
        "---\ntitle: " + title + "\npublished: true\ntags: livecodes\n---\n\n\n\n" + url
      )}`
    },
    {
      name: window.deps.translateString("share.services.tumblr", "Tumblr"),
      icon: "icon-share-tumblr",
      createShareUrl: ({ url, title }) => `https://www.tumblr.com/share/link?url=${encode(url)}&name=${encode(title)}`
    },
    {
      name: window.deps.translateString("share.services.pinterest", "Pinterest"),
      icon: "icon-share-pinterest",
      createShareUrl: ({ url, title }) => `https://pinterest.com/pin/create/bookmarklet/?url=${encode(url)}&description=${encode(
        title
      )}`
    },
    {
      name: window.deps.translateString("share.services.whatsApp", "WhatsApp"),
      icon: "icon-share-whatsapp",
      createShareUrl: ({ url, title }) => `https://api.whatsapp.com/send?text=${encode(title)} ${encode(url)}`
    },
    {
      name: window.deps.translateString("share.services.telegram", "Telegram"),
      icon: "icon-share-telegram",
      createShareUrl: ({ url, title }) => `https://t.me/share/url?url=${encode(url)}&text=${encode(title)}`
    },
    {
      name: window.deps.translateString("share.services.pocket", "Pocket"),
      icon: "icon-share-pocket",
      createShareUrl: ({ url, title }) => `https://getpocket.com/save?url=${encode(url)}&title=${encode(title)}`
    },
    {
      name: window.deps.translateString("share.services.email", "Email"),
      icon: "icon-share-email",
      createShareUrl: ({ url, title }) => `mailto:?subject=${encode(title)}&body=${encode(url)}`
    },
    {
      name: window.deps.translateString("share.services.qrCode", "QR code"),
      icon: "icon-share-qr",
      onClick: showQrCode
    },
    {
      name: window.deps.translateString("share.services.share", "Share via \u2026"),
      icon: "icon-share",
      onClick: ({ url, title }) => navigator.share({ url, title })
    }
  ];
  const useExternalShare = !allowedOrigin();
  const div = document.createElement("div");
  let shareData = await shareFn(false, false);
  let shareDataShort;
  let qrcodeImg;
  const urlLength = shareData.url.length;
  div.innerHTML = shareScreen.replace(/{{urlLength}}/g, String(urlLength)).replace(/{{warnClass}}/g, urlLength > 2048 ? "danger" : "warn");
  const shareContainer = div.firstChild;
  if (useExternalShare) {
    shareContainer.querySelector("#share-expiry").outerHTML = "";
  } else {
    shareContainer.querySelector("#share-expiry-self-hosted").outerHTML = "";
  }
  const items = shareContainer.querySelector("#share-links");
  const permanentUrlCheckbox = shareContainer.querySelector(
    "#share-permanent-url-checkbox"
  );
  const clickToCopy = shareContainer.querySelector("#share-click-to-copy");
  const input = shareContainer.querySelector("#share-url-input");
  const shareExpiry = shareContainer.querySelector(".share-expiry");
  const shortUrlLink = shareExpiry?.querySelector(".share-encoded-url-expiry a");
  const encodedUrlLink = shareExpiry?.querySelector(".share-short-url-expiry a");
  const charactersSpan = shareExpiry?.querySelector(
    ".share-encoded-url-expiry span"
  );
  charactersSpan.dataset.i18nInterpolation = JSON.stringify({ urlLength });
  const setMessage = (message) => {
    if (!clickToCopy)
      return;
    clearTimeout(messageTimeout);
    clickToCopy.innerHTML = message;
  };
  populateItems(shareData, services, items);
  const generateShortUrl = async (event) => {
    event?.preventDefault();
    setMessage(window.deps.translateString("share.generateURL", "Generating URL \u2026"));
    try {
      shareDataShort = shareDataShort || await shareFn(true, permanentUrlCheckbox.checked);
      populateItems(shareDataShort, services, items);
      shareExpiry?.classList.add("short-url");
    } catch {
      setMessage(
        window.deps.translateString(
          "share.error.failedToGenerateURL",
          "Failed to generate short URL!"
        )
      );
    }
  };
  eventsManager.addEventListener(shortUrlLink, "click", generateShortUrl);
  eventsManager.addEventListener(encodedUrlLink, "click", (event) => {
    event.preventDefault();
    populateItems(shareData, services, items);
    shareExpiry?.classList.remove("short-url");
    const qrcodeContainer = getQrCodeContainer();
    qrcodeContainer.style.display = "none";
    items.style.visibility = "visible";
  });
  eventsManager.addEventListener(permanentUrlCheckbox, "change", async () => {
    shareData = await shareFn(false, permanentUrlCheckbox.checked);
    if (shareDataShort) {
      shareDataShort = await shareFn(true, permanentUrlCheckbox.checked);
    }
    const data = shareExpiry?.classList.contains("short-url") ? shareDataShort : shareData;
    populateItems(data, services, items);
  });
  eventsManager.addEventListener(input, "click", function() {
    copyUrl(input?.value);
    input?.select();
  });
  eventsManager.addEventListener(clickToCopy, "click", function(ev) {
    ev.preventDefault();
    copyUrl(input?.value);
    input?.select();
  });
  return shareContainer;
};
export {
  createShareContainer
};
