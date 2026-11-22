# Omniland capability track: Install and delivery

**Scope:** PWA, offline caching, download/import packaging, installability, and low-overhead distribution. **Status:** research notes based on current official standards and browser/platform documentation. These notes do not claim any ScrollVerse external activation.

## Findings

### 1. Installability is a browser-mediated progressive enhancement, not a guaranteed app-store install

A web app manifest is the browser-readable JSON contract for application identity and launch behavior. The W3C manifest specification defines metadata such as the app name, icons, preferred launch URL (`start_url`), display mode, scope, orientation, and shortcuts. It explicitly warns that the specification is a Working Draft and may change, so implementation should follow tested browser behavior rather than assume every manifest member is uniformly supported. [1]

For Chromium install promotion, current web.dev guidance lists HTTPS, a manifest containing a name or short name, 192px and 512px icons, `start_url`, an accepted `display` value, and no positive `prefer_related_applications` flag. Chrome also applies engagement heuristics before firing `beforeinstallprompt`; a user interaction and roughly 30 seconds of viewing are part of that current Chrome criterion. Other browsers can differ. [2]

MDN distinguishes installability from offline support: service workers are commonly used for offline experiences, but are not themselves required for a PWA to be installable under the cited Chromium criteria. HTTPS is required for installable production delivery; `localhost` and `127.0.0.1` are permitted for development. [3]

Browser/platform variance matters for a console-less product. MDN reports Chromium desktop browsers support manifest-based installation, Safari supports Add to Dock on macOS Sonoma and later, Firefox does not support manifest-based PWA installation, and iOS installation is exposed through browser-specific flows rather than a single universal prompt. Therefore, the product should always remain fully usable as a normal HTTPS website and treat installation as an enhancement. [3]

### 2. Offline capability comes from a service worker plus explicit cache/version policy

A service worker can act as a programmable proxy: it intercepts requests and can return cached responses, enabling an offline-first baseline. Its lifecycle includes `install`, where assets can be cached, and `activate`, where old caches can be removed; a newly installed worker may wait while an older worker controls open pages. Existing pages may need reloads before they are controlled. [4]

This supports a small, deterministic offline shell: cache the HTML entry point, CSS, JavaScript bundles, icons, and a deliberately selected set of static metadata. It does not mean all dynamic features work offline. Network-dependent identity, payments, live feeds, external integrations, and server mutations need explicit offline states, queueing, or a read-only fallback. That last sentence is a product recommendation derived from the service-worker model, not a browser guarantee.

### 3. Browser storage is origin-scoped and normally best-effort

MDN documents that Cache API, IndexedDB, and Origin Private File System data are managed per origin under browser-specific quota and eviction rules. Browser-stored data is best-effort by default; it can be removed when quota or device conditions require it, or when the user clears site data. An app can request persistent storage with `navigator.storage.persist()`, but browser approval behavior varies and persistence still does not override a user's explicit deletion. [5]

This is a material delivery constraint: a PWA cache should be treated as a replaceable performance/offline layer, not as the only copy of user-owned content. The UI should expose export/download for portable packages and report cache/storage status without promising indefinite retention.

### 4. Download/import packaging can be web-native, but file-system APIs require user permission and have uneven support

The File System API and File System Access API let a web app read, write, and manage user-selected files or directories. MDN states that file access is disallowed unless the user specifically permits it; the APIs are available only in secure contexts. The Origin Private File System (OPFS) is a separate, origin-private area that is not visible to the user. MDN identifies large local asset bundles, resumable uploads, offline media, and local caches as relevant OPFS use cases. [6]

Chrome's official documentation says File System Access is supported on most Chromium browsers across desktop operating systems and Android, while noting exceptions such as Brave's flag-gated state at the time of publication. [7] Consequently, a low-overhead product should use a portable, explicit package format (for example, a versioned ZIP or JSON plus media manifest) with ordinary file input/download as the baseline, and add File System Access as an optional enhancement rather than a hard dependency.

### 5. Store packaging is optional and adds platform-specific overhead

PWAs can be distributed directly by HTTPS URL and can also be packaged for stores. web.dev describes PWABuilder as a way to validate and generate packages for stores, with platform-specific submission rules, developer accounts, metadata, and possible store payment/content constraints. The packaging workflow produces a downloadable package, but this is a distribution channel choice, not a prerequisite for direct web delivery. [8]

For a console-less product, the lowest-overhead route is therefore: one canonical HTTPS origin, installable manifest, service-worker shell, and downloadable/importable content packages. Store wrappers should be deferred until a specific platform audience or discovery requirement justifies the operational and compliance cost.

## Practical recommendations for a console-less, low-overhead product

1. **Ship one canonical HTTPS web origin first.** Make every core route usable in an ordinary browser, then add a manifest with stable `id`, `name`/`short_name`, 192px and 512px icons, `start_url`, `scope`, and `display: standalone` or `minimal-ui`. Use an in-app install affordance only when the browser exposes the relevant install event; always retain a manual “Add to Home Screen/Dock” explanation for browsers without the same prompt.

2. **Cache a small app shell, not the whole universe.** Precache the entry HTML, versioned JS/CSS, fonts/icons, and a compact offline catalog. Use network-first or stale-while-revalidate strategies for mutable metadata, and show a clear read-only/offline state for live or authenticated operations. Version caches and delete old versions during service-worker activation.

3. **Define a portable import/export package.** Use a versioned manifest containing package ID, schema version, checksums, asset URLs or relative paths, and human-readable metadata. Offer “Download package” using ordinary browser downloads and “Import package” through `<input type="file">` as the compatibility baseline. Validate size, MIME type, schema, and checksums before accepting content.

4. **Treat browser storage as a cache and workspace, not the source of truth.** Keep canonical user-owned packages exportable outside the origin. Use `navigator.storage.estimate()` for transparent status, request `navigator.storage.persist()` only when the product has a strong reason, and handle quota errors and eviction by allowing re-import or re-download.

5. **Add OPFS/File System Access only behind capability detection.** On supporting browsers, use OPFS for large local asset staging or resumable downloads and File System Access for user-selected folders/files. Provide ordinary download/upload fallbacks because support and permission UX vary across browsers and platforms.

6. **Defer app-store wrappers.** Use direct web/PWA delivery for the first low-overhead release. Consider PWABuilder or platform-specific packaging only when store discovery, OS integration, or a target device ecosystem produces enough value to offset signing, account, review, update, and policy overhead.

## Source records

[1] W3C, “Web Application Manifest.” Defines the JSON manifest, startup parameters, icons, launch URL, display, scope, and notes the current Working Draft status. https://www.w3.org/TR/appmanifest/

[2] web.dev, “What does it take to be installable?” Documents Chrome install promotion criteria, HTTPS, manifest members, icon sizes, engagement heuristics, and browser variation. https://web.dev/articles/install-criteria

[3] MDN Web Docs, “Making PWAs installable.” Documents manifest requirements, HTTPS/localhost constraints, the distinction between installability and service-worker offline support, and browser/platform installation differences. https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable

[4] MDN Web Docs, “Using Service Workers.” Documents service-worker proxy behavior, offline-first caching, install/activate lifecycle, cache versioning, and control/reload behavior. https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

[5] MDN Web Docs, “Storage quotas and eviction criteria.” Documents origin-scoped storage, Cache API/IndexedDB/OPFS, best-effort versus persistent storage, quota, and eviction. https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria

[6] MDN Web Docs, “File System API.” Documents secure-context requirements, user permission for file access, file/directory handles, OPFS, and offline/local asset use cases. https://developer.mozilla.org/en-US/docs/Web/API/File_System_API

[7] Chrome for Developers, “The File System Access API: simplifying access to local files.” Documents direct local file/folder access after user permission and current Chromium-oriented support. https://developer.chrome.com/docs/capabilities/web-apis/file-system-access

[8] web.dev, “PWAs in app stores.” Documents direct browser/PWA delivery, PWABuilder packaging, platform-specific store requirements, and package download flow. https://web.dev/articles/pwas-in-app-stores
