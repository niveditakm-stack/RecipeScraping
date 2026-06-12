import dotenv from 'dotenv';

import readDietRules from './excel/excelReader.js';

import launchBrowser from './scraper/browser.js';

import getRecipeLinks from './scraper/recipeLinks.js';

import scrapeRecipe from './scraper/recipeDetails.js';

import processRecipe from './services/recipeProcessor.js';

dotenv.config();

async function main() {

```
try {

    console.log('====================================');
    console.log('Starting Recipe Scraper...');
    console.log('====================================');

    /*
     * Read Excel Rules
     */

    const rules = readDietRules(
        process.env.EXCEL_FILE_PATH
    );

    console.log(
        `LCHF Eliminate: ${rules.LCHF.eliminate.length}`
    );

    console.log(
        `LCHF Add: ${rules.LCHF.add.length}`
    );

    console.log(
        `LFV Eliminate: ${rules.LFV.eliminate.length}`
    );

    console.log(
        `LFV Add: ${rules.LFV.add.length}`
    );

    /*
     * Launch Browser
     */

    const browser = await launchBrowser();

    const page = await browser.newPage();

    /*
     * Collect Recipe URLs
     */

    console.log('Collecting recipe URLs...');

    const recipeUrls =
        await getRecipeLinks(page);

    console.log(
        `Found ${recipeUrls.length} recipes`
    );

    let processed = 0;
    let saved = 0;
    let rejected = 0;

    for (const recipeUrl of recipeUrls) {

        try {

            console.log(
                `Processing: ${recipeUrl}`
            );

            const recipe =
                await scrapeRecipe(
                    page,
                    recipeUrl
                );

            /*
             * Process LCHF
             */

            const lchfResult =
                await processRecipe(
                    recipe,
                    'LCHF',
                    rules.LCHF
                );

            if (lchfResult.saved) {
                saved++;
            }

            if (lchfResult.rejected) {
                rejected++;
            }

            /*
             * Process LFV
             */

            const lfvResult =
                await processRecipe(
                    recipe,
                    'LFV',
                    rules.LFV
                );

            if (lfvResult.saved) {
                saved++;
            }

            if (lfvResult.rejected) {
                rejected++;
            }

            processed++;

            console.log(
                `Processed: ${processed}`
            );

        } catch (error) {

            console.error(
                `Failed: ${recipeUrl}`
            );

            console.error(error.message);
        }
    }

    await browser.close();

    console.log('====================================');
    console.log('SCRAPING COMPLETED');
    console.log(`Processed: ${processed}`);
    console.log(`Saved: ${saved}`);
    console.log(`Rejected: ${rejected}`);
    console.log('====================================');

} catch (error) {

    console.error('Fatal Error');
    console.error(error);
}
```

}

main();
