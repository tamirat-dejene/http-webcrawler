// Process command line arguments
// Our scripts takes a website as an input and crawl that website

const { crawlPage } = require("./crawl");
const { printReport } = require("./report");

async function main() {
  // Invalid command line argument
  let l = process.argv.length;
  if (l !== 3) {
    if (l > 3)
      console.log('too many command line arguments');
    else
      console.log('no website provided');
    process.exit(1);
  }

  const baseURL = process.argv[2];
  console.log(`starting crawl of ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});

  printReport(pages);
}

main();
