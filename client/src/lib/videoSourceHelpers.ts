export function parseYouTubeId(value: string): string | null {
  try {
    const url = new URL(value);
    if (!['https:', 'http:'].includes(url.protocol)) return null;
    let id: string | null = null;
    if (url.hostname === 'youtu.be') id = url.pathname.slice(1);
    else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(url.hostname)) {
      if (url.pathname === '/watch') id = url.searchParams.get('v');
      else if (/^\/(embed|shorts|live)\/[^/]+$/.test(url.pathname)) id = url.pathname.split('/')[2];
    }
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}

export type VideoReference = { url: string; source: string; line: number };
export type VideoSource = { id: string; url: string; sources: { source: string; line: number }[] };
export function groupVideoReferences(references: VideoReference[]): VideoSource[] {
  const grouped = new Map<string, VideoSource>();
  for (const reference of references) {
    const id = parseYouTubeId(reference.url);
    if (!id) continue;
    const record = grouped.get(id) ?? { id, url: `https://www.youtube.com/watch?v=${id}`, sources: [] };
    if (!record.sources.some(source => source.source === reference.source && source.line === reference.line)) {
      record.sources.push({ source: reference.source, line: reference.line });
    }
    grouped.set(id, record);
  }
  return Array.from(grouped.values());
}
