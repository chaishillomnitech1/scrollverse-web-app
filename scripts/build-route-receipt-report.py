#!/usr/bin/env python3
"""Build a complete markdown comparison of App.tsx routes and media receipts."""
from pathlib import Path
import re
from collections import defaultdict

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "client/src/App.tsx"
INVENTORY = ROOT / "docs/local-media-inventory.md"
OUTPUT = ROOT / "docs/route-receipt-comparison-report.md"

text = APP.read_text()
# Handles both path="/x" and path={"/x"} forms.
routes = sorted({a or b for a, b in re.findall(r'<Route\s+path=(?:\{"([^\"]+)"\}|"([^\"]+)")', text)})
keywords = {
    "payment": ("payment", "checkout"),
    "customer-commerce": ("customer", "commerce", "shop", "sales", "direct-fan"),
    "exchange-finance": ("exchange", "financial", "finance", "currency", "revenue", "royalt", "wallet"),
    "token-nft": ("token", "nft"),
    "creator-media": ("creator", "media", "music", "film", "movie", "theater", "books"),
}

def categories(route):
    lower = route.lower()
    return [name for name, terms in keywords.items() if any(term in lower for term in terms)] or ["other"]

by_category = defaultdict(list)
for route in routes:
    for category in categories(route):
        by_category[category].append(route)

inv = INVENTORY.read_text()
selected = int(re.search(r"Selected records: \*\*(\d+)", inv).group(1))
matched = int(re.search(r"Records with matching local bytes: \*\*(\d+)", inv).group(1))
mapped = int(re.search(r"Records currently named in homepage source: \*\*(\d+)", inv).group(1))
candidates = int(re.search(r"Records with a current managed-source candidate: \*\*(\d+)", inv).group(1))
classification_counts = {}
for label in ("AVAILABLE MEDIA", "SOURCE NEEDS HOSTED URL", "METADATA RECORD"):
    classification_counts[label] = len(re.findall(rf"\*\*{re.escape(label)}\*\*", inv))

lines = [
    "# ScrollVerse route and receipt comparison report",
    "",
    "## Executive summary",
    "",
    f"The current repository contains **{len(routes)} unique registered routes** in `client/src/App.tsx` ({text.count('<Route')} route declarations including duplicates or aliases). The route registry still contains the extended application, direct-to-customer, commerce, exchange, payment, revenue, creator, media, token, NFT, and wallet surfaces. The bounded restoration inventory contains **{selected} media/source records**, of which **{matched}** have matching local bytes, **{mapped}** are named by homepage source, and **{candidates}** currently have a managed-source candidate according to the inventory. This report compares what is preserved in local code and receipts; it does not infer hosting, billing, account, payment, wallet, contract, or publication state.",
    "",
    "## Receipt inventory crosswalk",
    "",
    "| Receipt classification | Count | Homepage treatment |",
    "|---|---:|---|",
    f"| AVAILABLE MEDIA | {classification_counts['AVAILABLE MEDIA']} | Native visitor-controlled playback only when a confirmed browser source is connected. |",
    f"| SOURCE NEEDS HOSTED URL | {classification_counts['SOURCE NEEDS HOSTED URL']} | Visible source receipt; no fake play control until a deployment-safe URL is connected. |",
    f"| METADATA RECORD | {classification_counts['METADATA RECORD']} | Visible metadata/source record with detail/search treatment and no play control. |",
    "",
    "The homepage now adds an inventory-backed `LocalMediaRestorationShelf` after `ArtifactFrontDoor`. Confirmed theater records from `client/src/lib/metaLegionArchive.ts` are merged as `AVAILABLE MEDIA`; the 79 bounded inventory records remain source-labeled and hash-bearing. The catalog generator is `scripts/build-homepage-media-catalog.py`.",
    "",
    "## Preserved route categories",
    "",
]
for category in ("payment", "customer-commerce", "exchange-finance", "token-nft", "creator-media", "other"):
    items = by_category.get(category, [])
    title = category.replace("-", " ").title()
    lines += [f"### {title} ({len(items)} routes)", ""]
    if items:
        lines += ["| Route |", "|---|"] + [f"| `{route}` |" for route in items]
    else:
        lines.append("No routes matched this category.")
    lines.append("")

lines += [
    "## Homepage exposure crosswalk",
    "",
    "| Surface | Current state | Evidence |",
    "|---|---|---|",
    "| Artifact Front Door | Preserved and rendered before the restoration shelf. | `Home.tsx:ArtifactFrontDoor` |",
    "| Inventory restoration shelf | Added and data-driven. | `Home.tsx:LocalMediaRestorationShelf`, `localMediaCatalog.ts` |",
    "| Managed theater playback | Visitor-controlled, `controls`, `preload=none`, `playsInline`, no autoplay. | `metaLegionArchive.ts` and shelf render contract |",
    "| Local upload bytes | Preserved as hashed source records outside `client/public`. | `docs/local-media-inventory.md` |",
    "| Payment and exchange routes | Still registered and not deleted by this restoration slice. | `client/src/App.tsx` route registry |",
    "",
    "## Complete route appendix",
    "",
] + [f"- `{route}`" for route in routes] + [
    "",
    "## Boundaries",
    "",
    "- This is a local repository and receipt comparison, not a claim that a custom domain currently serves this build.",
    "- The report does not activate transactions, billing, wallets, tokenization, contracts, customer purchases, or exchange operations.",
    "- SHA-256 values identify observed bytes; they are not authenticity or rights certificates.",
    "- No raw upload files were copied into `client/public`; only metadata and confirmed project-managed `/manus-storage` sources are used by the browser shelf.",
]
OUTPUT.write_text("\n".join(lines) + "\n")
print(f"wrote {OUTPUT} with {len(routes)} routes and {selected} receipt records")
