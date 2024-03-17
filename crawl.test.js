// When doing test driven development there are kind of three steps:
/**
 * 1. Stub out the function we wanna test
 * 2. Write the tests for the function
 * 3. To go back and actually implement
 */

const { normalizeURL, getURLsFromHTML } = require('./crawl');
const { test, expect } = require('@jest/globals');

// We want to normalize urls to the same string if they point to the same page

// Test#1 stripping out the protocol
test('normalizeURL strip protocol', () => {
  const input = 'https://blog.boot.dev/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';

  expect(actual).toEqual(expected);
});

// Getting rid of the trailing slash
test('normalizeURL strip trailing slash', () => {
  const input = 'https://blog.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';

  expect(actual).toEqual(expected);
});

// Making sure case insensitivity
test('normalizeURL capitals', () => {
  const input = 'https://BLOG.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';

  expect(actual).toEqual(expected);
});

// testing for http protocol
test('normalizeURL strip-http', () => {
  const input = 'http://BLOG.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';

  expect(actual).toEqual(expected);
});

test('getURLsFromHTML absolute urls', () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://blog.boot.dev/">Boot.dev Blog</a>
    </body>
  </html>
`
  const inputBaseURL = 'https://blog.boot.dev'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);

  const expected = ['https://blog.boot.dev/'];

  expect(actual).toEqual(expected);
});

// test for relative url: url with no domain and protocol
test('getURLsFromHTML relative urls', () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="/path/">Boot.dev Blog</a>
    </body>
  </html>
`
  const inputBaseURL = 'https://blog.boot.dev'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);

  const expected = ['https://blog.boot.dev/path/'];

  expect(actual).toEqual(expected);
});

// test for both types of url
test('getURLsFromHTML both types urls', () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://blog.boot.dev/path1/">Boot.dev Blog path1</a>
      <a href="/path2/">Boot.dev Blog path2</a>
    </body>
  </html>
`
  const inputBaseURL = 'https://blog.boot.dev'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);

  const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/'];

  expect(actual).toEqual(expected);
});

// test for bad url
test('getURLsFromHTML invalid urls', () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="invalid">Invalid</a>
    </body>
  </html>
`
  const inputBaseURL = 'https://blog.boot.dev'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);

  const expected = [];  // expected to not extract no url

  expect(actual).toEqual(expected);
});
