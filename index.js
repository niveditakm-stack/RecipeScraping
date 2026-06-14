import { chromium } from "playwright";
import { collectRecipeUrls } from "./scraper/recipeUrlCollector.js";

const BASE_URL = "https://www.tarladalal.com/recipes/";
const TOTAL_PAGES = 2;

async function run() {
  const browser = await chromium.launch({ headless: false });

  // ✅ Keep these - they prevent blocking
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 800 },
  });

  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
  });

  const page = await context.newPage();

  const urls = await collectRecipeUrls(page, BASE_URL, TOTAL_PAGES);

  console.log(`\n✅ Total URLs collected: ${urls.length}`);
  console.log("First 5:", urls.slice(0, 5));

  await browser.close();
}

run();
