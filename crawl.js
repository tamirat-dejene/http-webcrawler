const { JSDOM } = require('jsdom');
const { URL } = require('url');

async function crawlPage(baseURL, currentURL, pages) {
  
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  
  
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }
  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }
  pages[normalizedCurrentURL] = 1;
  
  // console.log(`Actively crawling ${normalizedCurrentURL}`);
  try {
    const resp = await fetch(currentURL);
    
    if (resp.status > 399) {
      console.log(`Error in fetch with status: ${resp.status} code on page: ${currentURL}`);
      return pages;
    }
    
    const contentType = resp.headers.get('content-type');
    if (!contentType.includes('text/html')) {
      console.log(`Error in fetch non html response with content-type: ${contentType} code on page: ${currentURL}`);
      return pages;   
    }

    const htmlBody = await resp.text();
    const nextUrls = getURLsFromHTML(htmlBody, baseURL);
    for (let nextURL of nextUrls)
      crawlPage(baseURL, nextURL, pages);


  } catch (error) {
    console.log('------------------------------------------------------')
    console.log(`Error in fetch: ${error.message}, on page: ${currentURL}`)
    console.log('------------------------------------------------------')
  }

  return pages;
}

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

module.exports = { normalizeURL, getURLsFromHTML, crawlPage };