import { chromium } from "playwright";
import { collectRecipeUrls } from "./scraper/recipeUrlCollector.js";
import { scrapeRecipe } from "./scraper/recipePageScraper.js";

//const BASE_URL = "https://www.tarladalal.com/recipes/";
const TOTAL_PAGES = 2;

async function run() {
  const browser = await chromium.launch({ headless: false });

  //  Keep these - they prevent blocking
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 800 },
  });

  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
  });

  const page = await context.newPage();

  const urls = await collectRecipeUrls(
    page,
    `${config.scraper.baseUrl}/recipes/`,
    TOTAL_PAGES,
  );
  
  const recipes = [];

  for (let i = 0; i < urls.length; i++) {
    console.log(`\nScraping ${i + 1} of ${urls.length}`);
    console.log(`URL: ${urls[i]}`);
    const recipe = await scrapeRecipe(context, urls[i]);
    console.log(recipe);
    recipes.push(recipe);

    console.log(`Completed ${i + 1}/${urls.length}`);
  }

  console.log(`\nTotal Recipes Scraped: ${recipes.length}`);

  await browser.close();
}

run();
