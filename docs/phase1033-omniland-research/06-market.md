# Omniland capability track: Market and ecosystem readiness

**Scope:** Cross-platform packaging, open standards, creator tooling, pricing/free-door patterns, observability, and launch readiness.

## Findings

### Cross-platform packaging

**Fact.** The W3C Web Application Manifest defines a JSON document containing startup parameters and application defaults for a web application. It includes fields such as `name`, `icons`, `start_url`, `scope`, `display`, `orientation`, and `shortcuts`. The specification describes installation as creating an installed web application whose manifest properties are applied when launched, potentially making it appear as a labeled icon in a home screen, launcher, or start menu. The same specification is currently a W3C Working Draft, so implementation details remain subject to browser support and change. [1]

**Recommendation.** For a console-less, low-overhead product, package the core experience as a responsive web app first and add a standards-based manifest, icons, explicit scope, stable start URL, and deep-link-safe routing. Treat native wrappers or app-store packaging as optional later distribution layers rather than prerequisites. Verify install behavior on target browsers before describing the product as universally installable.

### Open standards and asset portability

**Fact.** Khronos defines glTF as an API-neutral runtime asset delivery format intended to bridge content-creation tools and modern graphics applications. The specification calls it open, interoperable, compact, runtime-efficient, vendor- and runtime-neutral, and suitable for web and mobile devices with limited processing and memory. It supports complete scenes including nodes, meshes, materials, cameras, and animations, and is extensible. glTF is an asset format, not an authoring or streaming format, and does not mandate runtime behavior. [2]

**Recommendation.** Use glTF/GLB as the exchange and delivery baseline for 3D creator assets, while retaining source authoring files separately. Publish a small, versioned asset contract (supported glTF version, permitted extensions, texture limits, licensing metadata, and fallback behavior). Do not imply that glTF alone provides streaming, physics, identity, commerce, or runtime semantics.

### Creator tooling and extensibility

**Fact.** MDN documents Web Components as a suite of browser technologies for reusable custom elements with encapsulated functionality. The main technologies are custom elements, Shadow DOM, and HTML templates; together they reduce naming and styling collisions and allow components to be reused as ordinary HTML elements. The documented lifecycle includes connection, disconnection, adoption, and attribute-change callbacks. [3]

**Recommendation.** Expose creator-facing UI and portal modules as composable web components or similarly isolated modules with a narrow, documented event/data contract. Start with a small kit—scene card, creator profile, media shelf, CTA, and analytics hook—rather than a large SDK. This permits embedding into different shells without requiring a console or a proprietary editor.

### Pricing and free-door patterns

**Fact.** Stripe Checkout supports subscription free trials using `trial_period_days` or `trial_end`. Stripe states that the maximum free-trial length is 730 days and notes that longer trials can suffer from expiring payment methods and lower conversion. By default, Checkout collects a payment method for use after the trial; it can instead avoid collection with `payment_method_collection=if_required`. If no payment method is supplied by trial end, the subscription can be configured to cancel or pause. Stripe also documents reminder and customer-portal flows for collecting or updating payment details. [5]

**Recommendation.** Use a low-friction free door: a genuinely usable free tier or short opt-in trial that allows discovery without payment credentials, then gate durable value such as creator publishing limits, analytics depth, private spaces, or asset capacity. Make end behavior explicit, provide cancellation before conversion, and measure activation-to-paid conversion rather than maximizing trial length. Pricing mechanics are product recommendations; Stripe’s documented parameters are implementation facts, not evidence that any particular plan will convert.

### Observability and launch readiness

**Fact.** OpenTelemetry is an open-source, vendor- and tool-agnostic observability framework and toolkit for generating, exporting, and collecting telemetry such as traces, metrics, and logs. It is not itself an observability backend. Its stated goal is to allow instrumentation across languages, infrastructure, and runtime environments, with a standard protocol, semantic conventions, APIs, SDKs, and a collector. [4]

**Recommendation.** Instrument the smallest meaningful funnel before launch: page load and install prompt outcome, asset load failures, scene boot and disposal, creator publish attempts, checkout/trial events, and key interaction latency. Use stable event names and privacy-minimized properties, export through an OpenTelemetry-compatible path, and attach release/version identifiers. A launch gate should require tested rollback, error-rate and latency thresholds, accessible keyboard/touch flows, asset-license records, pricing/cancellation checks, and verified deep links—not merely a successful build.

## Practical recommendations for a console-less, low-overhead product

1. **Ship one web-first package.** Use a responsive site plus Web App Manifest and deep links; keep native shells optional until usage proves a need.
2. **Standardize the content boundary.** Deliver portable 3D through glTF/GLB and maintain a manifest containing asset version, rights status, dimensions, and fallback media.
3. **Build a small creator kit.** Prefer reusable web components with explicit inputs, outputs, lifecycle cleanup, and accessible defaults over a heavyweight proprietary editor.
4. **Offer a real free door.** Start with free browsing and limited creator publishing; if using trials, avoid surprise charges, support no-card entry where appropriate, and define pause/cancel behavior.
5. **Instrument the launch path.** Adopt OpenTelemetry-compatible traces, metrics, and logs for the user journey and operational failures, while minimizing personal data.
6. **Use a written readiness checklist.** Require browser/device checks, performance and accessibility checks, asset provenance, payment lifecycle tests, observability dashboards, rollback instructions, and explicit approval before any external activation or publication.

## References

[1]: https://www.w3.org/TR/appmanifest/ "W3C Web Application Manifest"
[2]: https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html "Khronos glTF 2.0 Specification"
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components "MDN Web Components"
[4]: https://opentelemetry.io/docs/what-is-opentelemetry/ "OpenTelemetry: What is OpenTelemetry?"
[5]: https://docs.stripe.com/payments/checkout/free-trials.md?ui=full-page "Stripe Checkout free trials"
