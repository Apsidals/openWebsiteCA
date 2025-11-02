// open-site.js

// We are using the 'chromium' browser engine from Playwright.
const { chromium } = require('playwright');

// The URL to open is passed as an environment variable from the workflow file.
const targetUrl = process.env.TARGET_URL;

if (!targetUrl) {
  console.error('Error: TARGET_URL environment variable is not set.');
  process.exit(1); // Exit with an error code.
}

// This is an async function, which allows us to use 'await'.
(async () => {
  console.log(`Preparing to launch browser and navigate to: ${targetUrl}`);
  
  let browser = null;
  try {
    // Launch a new Chromium browser instance.
    // 'headless: true' means the browser UI will not be shown.
    browser = await chromium.launch({ headless: true });
    
    // Create a new page in the browser.
    const page = await browser.newPage();
    
    // Navigate to the target URL.
    // 'waitUntil: "networkidle"' is a crucial step. It tells Playwright to wait
    // until the network is quiet for 500ms. This is a good sign that all
    // resources, including analytics scripts, have loaded and executed.
    console.log('Navigating to page...');
    await page.goto(targetUrl, { waitUntil: 'networkidle' });
    
    // You can optionally take a screenshot to verify it's working.
    // This will be saved as an "artifact" in the GitHub Actions run.
    await page.screenshot({ path: 'visit-screenshot.png' });
    
    console.log(`Successfully visited the page. Title: "${await page.title()}"`);
    
  } catch (error) {
    console.error('An error occurred during the browser automation:', error);
    process.exit(1); // Exit with an error code if something goes wrong.
    
  } finally {
    // Ensure the browser is always closed, even if an error occurred.
    if (browser) {
      await browser.close();
      console.log('Browser closed.');
    }
  }
})();
