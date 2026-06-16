import { chromium } from "playwright";
import config from "./config/config.js";
import pool from "./database/dbConnection.js";
import { collectRecipeUrls } from "./scraper/recipeUrlCollector.js";
import { scrapeRecipe } from "./scraper/recipePageScraper.js";
import { applyLFVFilter } from "./filters/lfvFilter.js";
import { applyLCHFFilter } from "./filters/lchfFilter.js";
import { applyAllergyFilter } from "./filters/allergyFilter.js";
import { insertRecipe } from "./database/recipeRepository.js";
import { readLFVData, readLCHFData } from "./readers/excelReader.js";

const TOTAL_PAGES = 1;

async function run() {
  const { lfvEliminate, lfvAdd } = readLFVData();
  const { lchfEliminate, lchfAdd } = readLCHFData();
  
  const browser = await chromium.launch({
    headless: config.scraper.headless,
  });

  const context = await browser.newContext();

  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
  });

  const page = await context.newPage();

  await page.goto(config.scraper.baseUrl, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(3000);

  const urls = await collectRecipeUrls(
    page,
    `${config.scraper.baseUrl}/recipes/`,
    TOTAL_PAGES,
  );
  console.log(`[Main] Total URLs collected: ${urls.length}`);

  //const testUrls = urls.slice(0, 5);
  for (const url of urls) {
    try {
      console.log("\n=============================");

      const recipe = await scrapeRecipe(context, url);
      if (!recipe) continue;

      console.log("Name:", recipe.recipe_name);
      console.log("Ingredients:", recipe.ingredients?.substring(0, 80));

      const lfvResult = applyLFVFilter(recipe, lfvEliminate, lfvAdd);
      console.log("[LFV]", lfvResult.reason);
      if (lfvResult.table) {
        const lfvAllergy = applyAllergyFilter(recipe, lfvResult.table);
        console.log("[ALLERGY]", lfvAllergy.reason);
        await insertRecipe(recipe, lfvAllergy.table, lfvAllergy.allergy_type);
      }

      const lchfResult = applyLCHFFilter(recipe, lchfEliminate, lchfAdd);
      console.log("[LCHF]", lchfResult.reason);
      if (lchfResult.table) {
        const lchfAllergy = applyAllergyFilter(recipe, lchfResult.table);
        console.log("[ALLERGY]", lchfAllergy.reason);
        await insertRecipe(recipe, lchfAllergy.table, lchfAllergy.allergy_type);
      }
    } catch (err) {
      console.error(`[Error] Failed: ${url}`, err.message);
    }
    await page.waitForTimeout(3000);
  }

  await browser.close();
  await pool.end();
  console.log("\n[Main] Scraping complete!");
}

run();
