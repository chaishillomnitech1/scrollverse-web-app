# Phase 168 — Public Route Data Minimization

The public Main Page Action Wheel and Creator Collection Records route now surface an explicit data-minimization notice. The improvement is based on the existing `/journey` privacy specification, which documents opt-in analytics, a 90-day retention boundary, absence of free-text profile/finance/IP/device-fingerprint collection, and a separate owner-facing evidence workflow.

| Public route | Verified behavior | Stated boundary |
|---|---|---|
| Home Action Wheel | Static first-party route directory | No form, upload, profile field, consent toggle, or visitor record is created when a visitor opens a route. |
| Creator Collection Records | Static collection-development context | No uploads, ownership files, provenance material, or visitor records are accepted or published through the public route. |
| Authenticated creator workflows | Separate protected routes | Any protected flow carries its own stated data boundary and is not implied by visiting the public directory. |

The notices do not claim that an external website or linked third-party platform has the same privacy behavior. They describe the first-party public routes only.
