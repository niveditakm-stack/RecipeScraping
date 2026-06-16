import xlsx from "xlsx";

let dietRules = {};

/**
 * Load LCHF/LVF ingredient rules from Excel
 */
export function loadIngredientRules(EXCEL_FILE_PATH) {

    const workbook = xlsx.readFile(EXCEL_FILE_PATH);

    const sheetName = workbook.SheetNames[0];

    const sheet = workbook.Sheets[sheetName];

    const rows = xlsx.utils.sheet_to_json(sheet);

    dietRules = {
        LCHF: {
            add: [],
            eliminate: []
        },
        LVF: {
            add: [],
            eliminate: []
        }
    };

    rows.forEach(row => {

        if (row.LCHF_Add) {
            dietRules.LCHF.add.push(
                row.LCHF_Add.toLowerCase().trim()
            );
        }

        if (row.LCHF_Eliminate) {
            dietRules.LCHF.eliminate.push(
                row.LCHF_Eliminate.toLowerCase().trim()
            );
        }

        if (row.LVF_Add) {
            dietRules.LVF.add.push(
                row.LVF_Add.toLowerCase().trim()
            );
        }

        if (row.LVF_Eliminate) {
            dietRules.LVF.eliminate.push(
                row.LVF_Eliminate.toLowerCase().trim()
            );
        }

    });

    console.log("Ingredient rules loaded");

    return dietRules;
}

/**
 * Normalize ingredient text
 */
function normalizeIngredient(text) {

    return text
        .toLowerCase()
        .replace(/[0-9]/g, "")
        .replace(/[(),]/g, "")
        .replace(
            /\b(cup|cups|tbsp|tsp|kg|gm|grams|ml|ltr|litre|litres)\b/g,
            ""
        )
        .replace(/\s+/g, " ")
        .trim();
}

/**
 * Check recipe against one diet
 */
function filterByDiet(recipe, dietType) {

    const addList =
        dietRules[dietType].add;

    const eliminateList =
        dietRules[dietType].eliminate;

    const recipeIngredients =
        recipe["Ingredients"].map(
            ingredient =>
                normalizeIngredient(ingredient)
        );

    // Reject if eliminate ingredient exists

    const hasEliminate =
        eliminateList.some(eliminate =>
            recipeIngredients.some(recipeIngredient =>
                recipeIngredient.includes(eliminate)
            )
        );

    if (hasEliminate) {

        return null;
    }

    // Every ingredient must belong to Add list

    const allIngredientsAllowed =
        recipeIngredients.every(recipeIngredient =>
            addList.some(addIngredient =>
                recipeIngredient.includes(addIngredient)
            )
        );

    if (!allIngredientsAllowed) {

        return null;
    }

    // PostgreSQL-ready object

    return {
        recipe_id: recipe["Recipe ID"],
        recipe_name: recipe["Recipe Name"],
        ingredients: recipe["Ingredients"],
        recipe_url: recipe["Recipe URL"],
        diet_type: dietType
    };
}

/**
 * Main function used by scraper
 */
export function filterRecipe(recipe) {

    const results = [];

    const lchfRecipe =
        filterByDiet(recipe, "LCHF");

    if (lchfRecipe) {

        results.push(lchfRecipe);
    }

    const lvfRecipe =
        filterByDiet(recipe, "LVF");

    if (lvfRecipe) {

        results.push(lvfRecipe);
    }

    return results;
}

