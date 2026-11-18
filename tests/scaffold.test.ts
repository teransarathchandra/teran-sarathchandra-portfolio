import { describe, expect, it } from 'vitest';
import config from '../astro.config.mjs';

describe('scaffold', () => {
  it('serves under the GitHub Pages project base path', () => {
    expect(config.site).toBe('https://teransarathchandra.github.io');
    expect(config.base).toBe('/teran-sarathchandra-portfolio');
  });
});
