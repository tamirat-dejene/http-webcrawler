// When doing test driven development there are kind of three steps:
/**
 * 1. Stub out the function we wanna test
 * 2. Write the tests for the function
 * 3. To go back and actually implement
 */

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  // we don't actually want the protocol
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  // strip trailing slash
  if (hostPath.length > 0 && hostPath.slice(-1) === '/')
    return hostPath.slice(0, -1);
  return hostPath;
}

module.exports = { normalizeURL };