import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import SourceVisual from '../client/src/components/SourceVisual';

describe('source visual rendering', () => {
  it('retains source alt text and lazy image loading when an image is supplied', () => {
    const html=renderToStaticMarkup(React.createElement(SourceVisual, {src:"/manus-storage/original.png", alt:"Original creator artwork", title:"Living Journey", mark:"JOURNEY", className:"aspect-video"}));
    expect(html).toContain('alt="Original creator artwork"');
    expect(html).toContain('loading="lazy"');
  });
  it('shows a complete text-led composition rather than inventing an original image', () => {
    const html=renderToStaticMarkup(React.createElement(SourceVisual, {alt:"Original artwork", title:"Penny for Your Thoughts", mark:"READ · CREATE", className:"aspect-square"}));
    expect(html).toContain('Penny for Your Thoughts');
    expect(html).toContain('Text-led display');
    expect(html).not.toContain('<img');
    expect(html).not.toContain('Original artwork');
  });
});
