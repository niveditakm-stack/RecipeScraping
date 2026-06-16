import { chromium } from 'playwright';
import { classifyCuisine } from "./cuisineClassifier.js";
import { classifyRecipeCategory } from "./recipeCategoryClassifier.js";
import { classifyFoodCategory } from "./foodCategoryClassifier.js";
async function scrapeRecipe(context,recipeUrl) {

    console.log(`[Recipe] Scraping: ${recipeUrl}`);
    const page = await context.newPage();

    try {

        await page.goto(recipeUrl);
       // Recipe id
      
       const startPosition = recipeUrl.lastIndexOf("-") + 1;

       const endPosition = recipeUrl.length - 1;

       const recipeId  =  recipeUrl.substring(startPosition,endPosition);
       // Recipe name 
        await page.locator('h1.rec-heading').waitFor();

        const recipeName = (await page.locator('h1.rec-heading span') .textContent()).trim();
        // preparation time and cooking time
        const prepContainer =page.locator('.content').filter({ has: page.locator('h6:has-text("Preparation Time")')
        });
        const preparationTime = (
            await prepContainer.locator('strong').textContent()
        )   .trim();
        const cookContainer =page.locator('.content').filter({ has: page.locator('h6:has-text("Cooking Time")')
        });
        const cookingTime = (
            await cookContainer.locator('strong').textContent()
        )   .trim();
        //No of servings
        const makesContainer =page.locator('.content').filter({ has: page.locator('h6:has-text("Makes")')
        });
        const noOfServings = (
            await makesContainer.locator('strong').textContent()
        )   .trim();
        //ingredients
        const ingredients =(await page.locator('#ingredients li').allTextContents()
        ) .map(text => text.replace(/\s+/g, ' ').trim());
        //preparation method
        const methodSteps = ( await page.locator('.rsepc ol li').allTextContents()
        ).map(step =>step.replace(/\s+/g, ' ').trim()
       );
   
    const descriptionSelectors = [
          '#aboutrecipe p',
          '.recipe-descfirst-box p',
          '#aboutrecipe',
         '.recipe-descfirst-box'
    ];

    let recipeDescription = '';

    for (const selector of descriptionSelectors) {
    const locator = page.locator(selector);

    if (await locator.count() > 0) {
        const text = (
            await locator.first().textContent()
        )?.replace(/\s+/g, ' ').trim();

        if (text) {
            recipeDescription = text;
            console.log(`Description found using ${selector}`);
            break;
        }
     }
    }
        // Breadcrumbs
        const breadcrumbs = (await page.locator('.breadcrumbs a').allTextContents()
                ).map(item => item.trim());

        // Tags
        const tags = (await page.locator('.tags-list li a').allTextContents()
        ).map(tag => tag.trim());

       // Cuisine category
        const cuisineCategory = classifyCuisine(recipeDescription);

      // Recipe category
         const recipeCategory = classifyRecipeCategory(recipeName);

      // Food category
        const foodCategory = classifyFoodCategory(breadcrumbs,tags,ingredients);
    
      //Nutrients values
      const rowCount = await page.locator("table tr").count();
     

      const nutrientValues = {};

      for (let i = 0; i < rowCount; i++) {

      const row = page.locator("table tr").nth(i);
      const tdCount = await row.locator("td").count();

      if (tdCount < 2) {
        
        continue;
    }

      const nutrientName = (await row.locator("td").nth(0).textContent()).replace(/\s+/g, " ").trim();

      const nutrientValue = (await row.locator("td").nth(1).textContent() ).replace(/\s+/g, " ").trim();

      nutrientValues[nutrientName] = nutrientValue;

    }
      //console.log(nutrientValues);
   
     // Recipe object
        const recipe = {
            "Recipe ID": recipeId,
            "Recipe Name": recipeName,
            "Recipe Category": recipeCategory,
            "Food Category": foodCategory,
            "Ingredients": ingredients,
            "Preparation Time": preparationTime,
            "Cooking Time": cookingTime,
            "Tags": tags,
            "No of Servings": noOfServings,
            "Cuisine Category": cuisineCategory,
            "Recipe Description": recipeDescription,
            "Preparation Method": methodSteps,
            "Nutrient Values": nutrientValues,
            "Recipe URL": page.url(),
        };

        return  recipe;
    } catch (error) {

        console.error(`[Recipe Error] ${recipeUrl}`, error);
        throw error;

    } finally {

       await page.close();
    }
}

export { scrapeRecipe };
