import { chromium } from "playwright";
import { collectRecipeUrls } from "./scraper/recipeUrlCollector.js";
import { scrapeRecipe } from "./scraper/recipePageScraper.js";
import { loadIngredientRules,filterRecipe } from "./scraper/recipeValidator.js";
import { saveRecipe } from "./database/recipeRepository.js";

const BASE_URL =
    "https://www.tarladalal.com/recipes/";

const TOTAL_PAGES = 2;

const EXCEL_FILE_PATH =
    "./data/IngredientsAndComorbidities-ScrapperHackathon.xlsx";

async function run() {

    let browser;

    try {

        loadIngredientRules(
            EXCEL_FILE_PATH
        );

        browser =
            await chromium.launch({
                headless: false
            });

        const context =
            await browser.newContext({
                userAgent:
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",

                viewport: {
                    width: 1280,
                    height: 800
                }
            });

        await context.addInitScript(() => {
            Object.defineProperty(
                navigator,
                "webdriver",
                {
                    get: () => undefined
                }
            );
        });

        const page =
            await context.newPage();

        const urls =
            await collectRecipeUrls(
                page,
                BASE_URL,
                TOTAL_PAGES
            );

        console.log(
            `Total URLs collected: ${urls.length}`
        );

        for (let i = 0; i < urls.length; i++) {

            try {

                console.log(
                    `\nProcessing ${i + 1}/${urls.length}`
                );

                const recipe =
                    await scrapeRecipe(
                        context,
                        urls[i]
                    );

                if (!recipe) {

                    console.log(
                        "Recipe could not be scraped"
                    );

                    continue;
                }

                const filteredRecipes =
                    filterRecipe(recipe);

                if (
                    filteredRecipes.length === 0
                ) {

                    console.log(
                        `${recipe["Recipe Name"]} did not match any diet`
                    );

                    continue;
                }

                for (
                    const recipeData
                    of filteredRecipes
                ) {

                    await saveRecipe(
                        recipeData
                    );

                    console.log(
                        `Saved: ${recipeData.recipe_name} (${recipeData.diet_type})`
                    );
                }

            } catch (error) {

                console.error(
                    `Failed processing ${urls[i]}`,
                    error.message
                );
            }
        }

        console.log(
            "Scraping completed successfully"
        );

    } catch (error) {

        console.error(
            "Application error:",
            error.message
        );

    } finally {

        if (browser) {
            await browser.close();
        }
    }
}

run();