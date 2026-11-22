#!/usr/bin/env python3
"""Build a bounded, provenance-first inventory for creator media restoration.

This script never copies or uploads media. It compares homepage filename references
against selected workspace directories and records technical availability only.
"""
from __future__ import annotations

import hashlib
import mimetypes
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path

PROJECT = Path(__file__).resolve().parents[1]
HOMEPAGE = PROJECT / "client/src/pages/Home.tsx"
OUTPUT = PROJECT / "docs/local-media-inventory.md"
SEARCH_ROOTS = [Path("/home/ubuntu/upload"), Path("/home/ubuntu/webdev-static-assets")]
MEDIA_EXTENSIONS = {
    ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg",
    ".mp4", ".webm", ".mov", ".m4v", ".avi",
}
PRIORITY_TERMS = (
    "hawk", "pyramid", "theater", "theatre", "sneaker", "sana", "agent-25",
    "video(15)", "video(16)", "video(17)", "video(18)", "video(19)",
    "video(20)", "video(21)", "video(22)", "video(23)", "video(24)",
    "video(25)", "video(26)", "video(27)", "video(28)", "video(29)",
    "video(30)", "video(31)", "video(32)", "video(33)", "media(35)",
)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def dimensions(path: Path) -> str:
    try:
        if path.suffix.lower() in {".mp4", ".webm", ".mov", ".m4v", ".avi"}:
            result = subprocess.run(
                ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height,duration", "-of", "csv=p=0:s=x", str(path)],
                capture_output=True, text=True, timeout=5, check=False,
            )
            return result.stdout.strip() or "unavailable"
        result = subprocess.run(["identify", "-format", "%wx%h", str(path)], capture_output=True, text=True, timeout=5, check=False)
        return result.stdout.strip() or "unavailable"
    except (OSError, subprocess.SubprocessError):
        return "unavailable"


def title_from_filename(name: str) -> str:
    stem = Path(name).stem.replace("_", " ").replace("-", " ")
    stem = re.sub(r"\s+", " ", stem).strip()
    return stem or name


def status(path: Path | None, homepage: str, filename: str) -> tuple[str, str]:
    if path is None:
        return "METADATA RECORD", "No matching local bytes found in the selected inventory roots."
    if path.parent == Path("/home/ubuntu/webdev-static-assets") or Path("/home/ubuntu/webdev-static-assets") in path.parents:
        if filename in homepage and ".mp4" in filename.lower():
            return "AVAILABLE MEDIA", "Managed static bytes are present and may be connected to a real visitor-controlled video source."
        return "SOURCE NEEDS HOSTED URL", "Bytes exist in managed static storage, but no homepage source mapping was found for this filename."
    return "SOURCE NEEDS HOSTED URL", "Bytes exist in the local upload area, but the homepage has no deployment-safe browser source mapping."


def main() -> None:
    homepage = HOMEPAGE.read_text(encoding="utf-8")
    referenced = sorted({m for m in re.findall(r"[A-Za-z0-9_() .-]+\.(?:mp4|webm|mov|m4v|avi|png|jpe?g|webp|gif)", homepage, flags=re.I)})
    files = [p for root in SEARCH_ROOTS for p in root.rglob("*") if p.is_file() and p.suffix.lower() in MEDIA_EXTENSIONS]
    by_name: dict[str, list[Path]] = {}
    for path in files:
        by_name.setdefault(path.name, []).append(path)

    selected = set(referenced)
    for path in files:
        lowered = path.name.lower()
        if any(term in lowered for term in PRIORITY_TERMS):
            selected.add(path.name)

    rows = []
    for name in sorted(selected, key=str.lower):
        matches = by_name.get(name, [])
        path = sorted(matches, key=lambda p: ("webdev-static-assets" not in p.parts, str(p)))[0] if matches else None
        state, explanation = status(path, homepage, name)
        rows.append({
            "filename": name,
            "path": str(path) if path else "—",
            "kind": mimetypes.guess_type(name)[0] or "application/octet-stream",
            "size": f"{path.stat().st_size:,} bytes" if path else "—",
            "dimensions": dimensions(path) if path else "—",
            "sha": sha256(path) if path else "—",
            "mapped": "YES" if name in homepage else "NO",
            "playable": "NO — local bytes only" if path and path.suffix.lower() in {".mp4", ".webm", ".mov", ".m4v", ".avi"} else "IMAGE / DETAIL ACTION",
            "state": state,
            "explanation": explanation,
        })

    available = sum(row["path"] != "—" for row in rows)
    mapped = sum(row["mapped"] == "YES" for row in rows)
    playable_candidates = sum(row["playable"].startswith("YES") for row in rows)
    generated = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = [
        "# ScrollVerse local media restoration inventory",
        "",
        f"Generated: {generated}",
        "",
        "## Scope",
        "",
        "This is a bounded, read-only comparison of filename references in `client/src/pages/Home.tsx` against `/home/ubuntu/upload` and `/home/ubuntu/webdev-static-assets`. It does not copy, upload, execute, render, publish, tokenize, or transform supplied media. A SHA-256 identifies the exact local bytes observed; it is not an authenticity or rights certificate.",
        "",
        f"- Selected records: **{len(rows)}**",
        f"- Records with matching local bytes: **{available}**",
        f"- Records currently named in homepage source: **{mapped}**",
        f"- Records with a current managed-source candidate: **{playable_candidates}**",
        "- `AVAILABLE MEDIA` means a managed static source candidate exists and can be wired to a native visitor-controlled player.",
        "- `SOURCE NEEDS HOSTED URL` means bytes exist locally but are not a deployable browser URL; do not show a fake play control.",
        "- `METADATA RECORD` means no matching bytes were found in the selected roots; keep the source receipt and use an `OPEN`/detail action only.",
        "",
        "## Restoration priority",
        "",
        "1. Connect managed static theater MP4s and confirmed priority clips to real `<video controls preload=\"none\" playsInline>` cards.",
        "2. Create image thumbnails only from explicitly selected managed static assets; keep raw upload images outside the app bundle.",
        "3. Keep missing or unhosted records visibly labeled as metadata-only with no `PLAY` button.",
        "4. Preserve existing routes, provenance labels, source receipts, and payment pathways.",
        "",
        "## Records",
        "",
        "| Filename | Local path | Type | Size | Dimensions / duration | SHA-256 | Homepage mapped | Play/render state | Classification | Evidence note |",
        "|---|---|---:|---:|---:|---|:---:|---|---|---|",
    ]
    for row in rows:
        lines.append("| {filename} | `{path}` | `{kind}` | {size} | `{dimensions}` | `{sha}` | {mapped} | {playable} | **{state}** | {explanation} |".format(**row))
    lines.extend([
        "",
        "## External state boundary",
        "",
        "The custom-domain checks recorded in the inherited audit returned the Manus unpaid-billing holding page for `scrollverse.co`, `www.scrollverse.co`, and the managed preview domain. This inventory does not change hosting or billing state. Account, subscription, credit, billing, and hosting reconciliation belongs with [Manus Help](https://help.manus.im).",
        "",
    ])
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"wrote {OUTPUT} ({len(rows)} records; {available} with local bytes; {mapped} homepage-mapped)")


if __name__ == "__main__":
    main()
