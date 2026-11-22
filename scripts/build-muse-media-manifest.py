#!/usr/bin/env python3
"""Build a local-only SHA-256 manifest for owner-held media roots."""
from __future__ import annotations

import hashlib
import json
import mimetypes
from pathlib import Path
from typing import Iterable

ROOTS = (Path('/home/ubuntu/upload'), Path('/home/ubuntu/webdev-static-assets'))
OUT = Path(__file__).resolve().parents[1] / 'docs' / 'muse-media-byte-manifest-2026-11-22.json'


def files(root: Path) -> Iterable[Path]:
    if root.exists():
        yield from sorted(p for p in root.rglob('*') if p.is_file())


def digest(path: Path) -> str:
    h = hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            h.update(block)
    return h.hexdigest()


records = []
for root in ROOTS:
    for path in files(root):
        records.append({
            'root': str(root),
            'relativePath': str(path.relative_to(root)),
            'bytes': path.stat().st_size,
            'mime': mimetypes.guess_type(path.name)[0] or 'application/octet-stream',
            'sha256': digest(path),
        })

manifest = {
    'manifestId': 'muse-media-byte-manifest-2026-11-22',
    'generatedAt': '2026-11-22',
    'scope': 'local-only owner-held source inventory; no upload or publication performed',
    'roots': [str(root) for root in ROOTS],
    'fileCount': len(records),
    'totalBytes': sum(item['bytes'] for item in records),
    'records': records,
}
OUT.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(json.dumps({k: manifest[k] for k in ('manifestId', 'fileCount', 'totalBytes')}, indent=2))
print(OUT)
