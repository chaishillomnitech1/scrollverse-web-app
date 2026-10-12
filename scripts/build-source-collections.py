"""Build a text-led catalog without executing or publishing raw source content.
Historical receipts come from a frozen reviewed seed, never same-name replacement files.
"""
from pathlib import Path
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]
UPLOAD = Path('/home/ubuntu/upload')
seed = json.loads((ROOT / 'scripts/source-seeds/oct12-historical-catalog.json').read_text())
batches = seed['SOURCE_BATCHES']
collections = seed['SOURCE_COLLECTIONS']
index = seed['SOURCE_TITLE_INDEX']


def receipt(n, replacement=False):
    path = UPLOAD / f'pasted_content_{n}.txt'
    raw = path.read_bytes()
    sha = hashlib.sha256(raw).hexdigest()
    lines = raw.decode().split('\n')
    if raw.endswith(b'\n'):
        lines.pop()
    source_id = f'batch-{n}-v{sha[:12]}' if replacement else f'batch-{n}'
    return dict(id=source_id, filename=path.name, bytes=len(raw), sha256=sha,
                lineCount=len(lines), versionLabel='Replacement text version' if replacement else 'Supplied text')


revisions = {}
for n in range(8, 14):
    new = receipt(n, True)
    old = next(batch for batch in batches if batch['id'] == f'batch-{n}')
    old['versionLabel'] = 'Earlier reviewed version — receipt retained; raw bytes not currently available'
    if new['sha256'] != old['sha256']:
        batches.append(new)
        revisions[n] = new['id']
for n in [15, 16]:
    batches.append(receipt(n))


def cite(batch, start, end):
    return dict(batch=batch if isinstance(batch, str) else f'batch-{batch}', lines=[start, end])


def item(id, title, category, detail, href, sources, mark, color):
    return dict(id=id, title=title, category=category, detail=detail, href=href,
                sources=sources, mark=mark, color=color, label='Creator collection', catalogDate='2026-10-12')


# Extend existing creative families instead of multiplying repeated prompt variants.
additional = {
    'vortex': [cite(16, 21, 23), cite(16, 37, 80)],
    'haiti': [cite(16, 24, 35), cite(16, 81, 92)],
    'theater': [cite(16, 93, 98)],
    'dominion': [cite(16, 477, 510)],
    'fluidity': [cite(16, 513, 548)],
    'gaia': [cite(16, 740, 772)],
    'heart': [cite(16, 360, 388), cite(revisions[9], 264, 270)],
    'mississippi-hall': [cite(16, 19, 19)],
    'soul-evolution-hall': [cite(16, 2, 18)],
}
for record in collections:
    record['sources'].extend(additional.get(record['id'], []))
collections.extend([
    item('duat', 'THE DUAT', 'Stories', 'An eight-stage symbolic passage: Threshold, Dream Descent, Night Journey, Gates, Recognition, Transformation, Dawn Return and Anubis Guardian. Gold, obsidian and emerald exhibit directions preserve the creator’s journey vocabulary; the artwork remains a separate production source.', '/sovereign-archive-chronicles', [cite(16, 304, 304), cite(16, 308, 308), cite(16, 311, 311)], 'VIII', '#FFD18A'),
    item('chais-computing', 'CHAIS COMPUTING / Omniversal Manifesto', 'Books', 'Human vision and digital intelligence meet in a creator-authored philosophy of authenticity, transparency, fairness, wisdom and evolution. The five-layer blueprint and love-as-operational-principle motif continue into the existing manifesto.', '/manifesto', [cite(revisions[8], 1040, 1084)], 'CC', '#FFB36B'),
    item('bridges-and-gold', 'Bridges in the Dark, Dragons in the Gold', 'Stories', 'A luminous-bridge mystery and an alchemical transformation sequence form a text-led inquiry into matter, meaning and the limits of explanation. Follow the original passages into the Philosophers Archive without substituting an invented image for the referenced source.', '/philosophers-archive', [cite(revisions[10], 21, 128)], 'GOLD', '#FFD18A'),
    item('deepexa-source', 'DeepExa / Agentic List Builder', 'Systems', 'The creator’s product direction describes niche-specific lead, supplier, partner and account lists with deduplication, filters, cited rows and CSV handoffs. Two supplied text versions connect that design to the existing DeepExa experience; credential-shaped source text stays outside this gallery.', '/deepexa', [cite(revisions[11], 6, 16), cite(revisions[12], 32, 45)], 'EXA', '#8CEEDD'),
    item('open-horizon', 'The Open Horizon / Plate 750', 'Identity', 'Flatland, relational reality and cosmic recursion become a creator-led philosophical reading room. The source’s final inscription moves from separation to relation and an open horizon, preserving its own distinction between mathematical explanation and speculative cosmology.', '/consciousness-mirror', [cite(revisions[13], 1106, 1152)], '750', '#DCC8FF'),
])

# Preserve exact title labels and all occurrence citations; casefold only for merging.
by_title = {record['title'].casefold(): record for record in index}
lines = (UPLOAD / 'pasted_content_15.txt').read_bytes().decode().split('\n')
for i, text in enumerate(lines):
    if text.strip() != 'HTML':
        continue
    j = i + 1
    while j < len(lines) and not lines[j].strip():
        j += 1
    if j >= len(lines):
        continue
    title = lines[j].strip()
    lower = title.casefold()
    if lower == 'chais evidence timeline' or any(term in lower for term in ['exhibit a', 'counsel', 'privileged', 'chais hill v.']):
        continue
    source = cite(15, j + 1, j + 1)
    if lower in by_title:
        record = by_title[lower]
        record['sources'].append(source)
        record['occurrences'] = len(record['sources'])
        continue
    if any(word in lower for word in ['theater', 'film', 'podcast']):
        category, route = 'Stories', '/omniland-cinematic-gateway'
    elif any(word in lower for word in ['legion', 'codex', 'phase', 'research']):
        category, route = 'Systems', '/omniversal-source-ledger'
    elif any(word in lower for word in ['chaisallah', 'birthday', 'soul altar']):
        category, route = 'Identity', '/creator-digital-dna'
    elif any(word in lower for word in ['money', 'treasury', 'acquisition', 'exchange']):
        category, route = 'Artifacts', '/music-creator-release-readiness'
    else:
        category, route = 'Books', '/source-labeled-storybook-index'
    record = item('title-' + hashlib.sha256(lower.encode()).hexdigest()[:12], title, category,
                  'Title preserved from the supplied artifact index. Follow its planning continuation to develop the source record; the underlying HTML body or media is a separate accession.',
                  route, [source], 'INDEX', '#A5DFF5')
    record.update(label='Source title', occurrences=1)
    index.append(record)
    by_title[lower] = record

header = '''// Generated from reviewed creator text by scripts/build-source-collections.py.
// Same-name versions have independent IDs; historical raw files may no longer be available.
export type SourceCitation = { batch: string; lines: [number, number] };
export type SourceRecord = {
  id: string; title: string; category: string; detail: string; label: string;
  catalogDate: string; href: string; sources: SourceCitation[]; mark: string;
  color: string; occurrences?: number;
};
export type SourceBatch = { id: string; filename: string; bytes: number; sha256: string; lineCount: number; versionLabel?: string };

'''
output = header
for name, data, typ in [('SOURCE_BATCHES', batches, 'SourceBatch'), ('SOURCE_COLLECTIONS', collections, 'SourceRecord'), ('SOURCE_TITLE_INDEX', index, 'SourceRecord')]:
    output += f'export const {name}: {typ}[] = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n\n'
(ROOT / 'client/src/lib/sourceCollections.ts').write_text(output)
print(f'Catalog: {len(batches)} version receipts, {len(collections)} collections, {len(index)} unique titles, {sum(record["occurrences"] for record in index)} title occurrences.')
