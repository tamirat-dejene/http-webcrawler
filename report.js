function printReport(pages) {
  console.log('==========================');
  console.log('      REPORT ');
  console.log('==========================');

  const sortedPages = sortPages(pages);
  for (let page of sortedPages)
    console.log(`Found ${page[1]} links to page ${page[0]}`);

  console.log('==========================');

}

function sortPages(pages) {
  let pagesArray = Object.entries(pages); // [ [key, val] ]
  pagesArray.sort((a, b) => b[1] - a[1]);
  return pagesArray;
}

module.exports = { sortPages, printReport }; 