#!/usr/bin/env python3
"""Generate the browser-safe metadata catalog from docs/local-media-inventory.md."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
INVENTORY = ROOT / "docs/local-media-inventory.md"
OUTPUT = ROOT / "client/src/lib/localMediaCatalog.ts"


def parse_rows(text: str):
    records = []
    in_records = False
    for line in text.splitlines():
        if line.startswith("## Records"):
            in_records = True
            continue
        if not in_records or not line.startswith("|"):
            continue
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if len(cells) != 10 or cells[0] == "Filename" or set(cells[0]) == {"-"}:
            continue
        filename, local_path, media_type, size, dimensions, sha256, mapped, state, classification, note = cells
        classification = re.sub(r"\*", "", classification).strip()
        records.append({
            "id": f"inventory-{len(records)+1:03d}",
            "filename": filename,
            "mediaType": media_type,
            "localPath": None if local_path == "—" else local_path.strip("`") ,
            "dimensions": dimensions,
            "sha256": None if sha256 == "—" else sha256,
            "homepageMapped": mapped == "YES",
            "state": state,
            "classification": classification,
            "evidenceNote": note,
        })
    return records

records = parse_rows(INVENTORY.read_text())
header = '''/** Generated from docs/local-media-inventory.md. Do not add browser URLs for local-only bytes here. */\nexport type LocalMediaClassification = "AVAILABLE MEDIA" | "SOURCE NEEDS HOSTED URL" | "METADATA RECORD";\n\nexport type LocalMediaCatalogRecord = {\n  id: string;\n  filename: string;\n  mediaType: string;\n  localPath: string | null;\n  dimensions: string;\n  sha256: string | null;\n  homepageMapped: boolean;\n  state: string;\n  classification: LocalMediaClassification;\n  evidenceNote: string;\n};\n\nexport const LOCAL_MEDIA_CATALOG: LocalMediaCatalogRecord[] = '''
OUTPUT.write_text(header + json.dumps(records, indent=2, ensure_ascii=False) + " as LocalMediaCatalogRecord[];\n")
print(f"generated {len(records)} records at {OUTPUT}")
