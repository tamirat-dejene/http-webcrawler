const { normalizeURL } = require('./crawl');
const { test, expect } = require('@jest/globals');

// We want to normalize urls to the same string if they point to the same page

test('normalizeURL strip protocol', () => {
  const input = 'https://blog.boot.dev/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';

  expect(actual).toEqual(expected);
});

test('normalizeURL strip trailing slash', () => {
  const input = 'https://blog.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';

  expect(actual).toEqual(expected);
});

test('normalizeURL capitals', () => {
  const input = 'https://BLOG.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';

  expect(actual).toEqual(expected);
});

test('normalizeURL strip http', () => {
  const input = 'http://BLOG.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';

  expect(actual).toEqual(expected);
});