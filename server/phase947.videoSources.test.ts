import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseYouTubeId, groupVideoReferences } from '../client/src/lib/videoSourceHelpers';

describe('video source library normalization', () => {
  it.each([
    ['https://youtu.be/-y_qej0SV9A?is=abc', '-y_qej0SV9A'],
    ['https://www.youtube.com/watch?feature=share&v=Mewlw7ZzCqA', 'Mewlw7ZzCqA'],
    ['https://www.youtube-nocookie.com/embed/gLHqMp9QvrU', 'gLHqMp9QvrU'],
    ['https://youtube.com.evil.test/watch?v=Mewlw7ZzCqA', null],
    ['javascript:alert(1)', null],
    ['https://youtu.be/short', null],
    ['https://youtu.be/Mewlw7ZzCqAlong', null],
  ])('normalizes trusted YouTube hosts without accepting arbitrary destinations: %s', (url, expected) => {
    expect(parseYouTubeId(url)).toBe(expected);
  });
  it('groups repeats while retaining separate passage citations and skipping invalid links', () => {
    expect(groupVideoReferences([
      { url:'https://youtu.be/Mewlw7ZzCqA?a=b', source:'batch-14', line:186 },
      { url:'https://youtube.com/watch?v=Mewlw7ZzCqA', source:'batch-16', line:562 },
      { url:'https://evil.test/Mewlw7ZzCqA', source:'batch-16', line:563 },
    ])).toEqual([{ id:'Mewlw7ZzCqA', url:'https://www.youtube.com/watch?v=Mewlw7ZzCqA', sources:[{source:'batch-14',line:186},{source:'batch-16',line:562}] }]);
  });
  it('offers a first-party library from the homepage and synchronization reading room', () => {
    expect(readFileSync('client/src/App.tsx', 'utf8')).toContain('path="/synchronization-video-library"');
    expect(readFileSync('client/src/pages/Home.tsx', 'utf8')).toContain('href="/synchronization-video-library"');
    expect(readFileSync('client/src/pages/Synchronizations.tsx', 'utf8')).toContain('/synchronization-video-library');
  });
});
