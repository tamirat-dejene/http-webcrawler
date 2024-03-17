

const { JSDOM } = require('jsdom');


/**
 * Grab all the url embedded within the html page
 * @param {htmlBody} htmlBody string represnting html file
 * @param {baseURL} baseURL string representins the url of the website being crawled
 * @returns array of all the urls in the html page
 */
function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);  // takes html string and creates in memory html tree structure: allows us access dom in node
  const linkElements = dom.window.document.querySelectorAll('a'); // list of <a> tags

  let urlString;

  for (let linkElement of linkElements) {
    urlString = linkElement.href;

    if (linkElement.href.slice(0, 1) === '/')
      urlString = `${baseURL}${linkElement.href}`  // relative

    try {
      let urlObj = new URL(urlString);
      urls.push(urlObj.href);
    } catch (err) {
      console.log(`Error with the url: ${err.message}`);
    }
  }

  return urls;
}


/**
 * Normalizes the given url string
 * @param {urlString} urlString any string representing a url
 * @returns normalized url
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

module.exports = { normalizeURL, getURLsFromHTML };