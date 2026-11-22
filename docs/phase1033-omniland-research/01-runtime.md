# Omniland capability track: Cross-device runtime

## Findings

### WebGPU: high-end path, not a universal baseline

**Fact.** WebGPU exposes GPU hardware to the Web and is designed to map efficiently to modern native GPU APIs. It is not WebGL and does not explicitly target OpenGL ES. Applications obtain an adapter with `navigator.gpu.requestAdapter()` and then a device; the user agent may return `null`. Device creation can require specific features and limits, and the request fails when the adapter cannot provide them. WebGPU is also exposed in Window and Worker contexts and requires a secure context. [1]

**Fact.** Browser/platform coverage is still uneven. Chrome’s current overview records the original Chrome 113 desktop/ChromeOS rollout, Android support in Chrome 121 for Android 12+ on selected Qualcomm and ARM GPUs, and later WebGPU shipment in Firefox 141 on Windows and Safari 26. The same page points to the GPUWeb implementation-status page for updates, so version and OS/driver coverage must be treated as a moving compatibility input rather than a permanent guarantee. [2]

**Recommendation.** Treat WebGPU as an opportunistic renderer/compute accelerator. Detect both API presence and successful adapter/device acquisition, then inspect supported features and limits before enabling expensive scenes. Do not make initial navigation or core content depend on it.

### WebAssembly: portable compute layer

**Fact.** The WebAssembly core specification defines Wasm as a safe, portable, low-level code format designed for efficient execution and compact representation. It is hardware-, platform-, and language-independent, can be embedded in browsers or other environments, and supports modular, streamable, and parallelizable representation. [3]

**Recommendation.** Put deterministic, CPU-heavy but renderer-independent work—such as parsing, spatial/index calculations, compression/decompression, and simulation steps—behind a small JavaScript/Wasm boundary. Lazy-load the Wasm module after the baseline UI is usable; avoid shipping a large Wasm payload to users who only need lightweight browsing.

### WebGL: practical graphics fallback

**Fact.** WebGL is a plugin-free JavaScript API for 2D/3D graphics in compatible browsers, based on OpenGL ES and exposed through HTML canvas. MDN reports WebGL support in all modern browsers, while also warning that the device must have suitable hardware. WebGL 2 adds much of OpenGL ES 3.0’s feature set and uses the `webgl2` context. Context creation can still fail, and browser/GPU capability differences remain relevant. [4]

**Fact.** Khronos describes WebGL as a cross-platform, royalty-free open web standard; WebGL 1 exposes OpenGL ES 2.0 and WebGL 2 exposes OpenGL ES 3.0. [5]

**Recommendation.** Implement a lower-cost WebGL 2 path first, with WebGL 1 or a non-3D/canvas fallback where the required context is unavailable. Keep scene assets and shader/material features within the common subset; use capability checks instead of assuming that a browser’s WebGL API exists means a particular GPU feature exists.

### Progressive enhancement and browser/device coverage

**Fact.** MDN defines progressive enhancement as delivering essential content and functionality broadly, then adding richer behavior for modern browsers and devices. It specifically identifies feature detection as the normal way to determine whether newer functionality can run, and notes that accessible alternatives should be supplied where possible. [6]

**Recommendation.** Define explicit runtime tiers rather than a single “supported/unsupported” gate: (1) semantic HTML/DOM baseline; (2) optional Wasm compute; (3) WebGL 1/2 rendering; (4) WebGPU rendering/compute. Persist only short-lived diagnostics such as selected tier, context/device loss, and coarse performance signals, so the product can adapt without collecting unnecessary device data.

## Practical recommendations for a console-less, low-overhead product

1. **Make the baseline useful without GPU APIs.** The shell, navigation, readable artifact metadata, controls, and accessible alternatives should work with ordinary HTML/CSS/JavaScript. A canvas should enhance the experience, not be the only way to reach content.
2. **Use runtime capability negotiation.** Check `navigator.gpu`, handle `requestAdapter()` returning `null`, request only the features actually needed, and compare required limits before selecting the WebGPU tier. For fallback, attempt `webgl2`, then `webgl`, and handle context-creation failure.
3. **Ship one asset model with tiered presentation.** Keep geometry, textures, shader variants, and animation budgets small; select quality by tested capabilities and viewport/device conditions rather than user-agent strings. Prefer compressed, cacheable, lazy-loaded assets.
4. **Keep compute optional and bounded.** Lazy-load Wasm only for features that benefit from it, cap worker/concurrency and memory usage, and retain a JavaScript implementation for small jobs or environments where Wasm loading fails.
5. **Design for loss and recovery.** Treat WebGL context loss and WebGPU device loss as recoverable runtime states: pause rendering, release/recreate resources, and preserve the user’s non-rendered state in the DOM/application model.
6. **Test a coverage matrix, not just browsers.** Include Chromium desktop and Android, Firefox Windows, Safari desktop/mobile, WebGL-only devices, software-rendered or restricted-GPU environments, reduced-motion/accessibility settings, and narrow/slow networks. Record the tested browser/OS/driver versions because WebGPU coverage changes.

## Source records

1. **W3C WebGPU — WebGPU specification.** https://www.w3.org/TR/webgpu/ — Supports the facts that WebGPU exposes GPU hardware to the Web; is distinct from WebGL; uses `navigator.gpu`, adapter/device acquisition, secure contexts, workers; and negotiates required features and limits with possible failure/null results.
2. **Chrome for Developers — Overview of WebGPU.** https://developer.chrome.com/docs/web-platform/webgpu/overview — Supports the dated browser/platform coverage summary: Chrome 113 initial desktop/ChromeOS support, Android Chrome 121 on Android 12+ selected Qualcomm/ARM GPUs, Firefox 141 on Windows, and Safari 26; also directs readers to implementation status for updates.
3. **W3C WebAssembly Core Specification.** https://www.w3.org/TR/wasm-core-2/ — Supports Wasm’s safe, portable, low-level format, compact/efficient representation, hardware/platform independence, browser embedding, modularity, streamability, and parallelizability.
4. **MDN — WebGL: 2D and 3D graphics for the web.** https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API — Supports WebGL’s browser/canvas/OpenGL ES model, modern-browser availability caveat, hardware requirement, WebGL 2’s OpenGL ES 3.0 feature set, and context/capability caveats.
5. **MDN — Progressive enhancement.** https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement — Supports the baseline-plus-enhancement model, feature detection guidance, and accessible alternatives recommendation.

## Scope note

This report covers runtime architecture and compatibility evidence only. It does not claim or imply ScrollVerse external activation, deployment, or integration status.

## References

[1]: https://www.w3.org/TR/webgpu/ "WebGPU specification"
[2]: https://developer.chrome.com/docs/web-platform/webgpu/overview "Overview of WebGPU"
[3]: https://www.w3.org/TR/wasm-core-2/ "WebAssembly Core Specification"
[4]: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API "WebGL: 2D and 3D graphics for the web"
[5]: https://www.khronos.org/webgl/ "WebGL: 3D Graphics for the Web"
[6]: https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement "Progressive enhancement"
