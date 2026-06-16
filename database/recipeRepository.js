import { pool } from "./db.js";

/**
 * Save recipe into PostgreSQL
 */
export async function saveRecipe(recipe) {

    const query = `
       INSERT INTO recipes (
            Recipe_id,
            Recipe_Name,
            Recipe_category
            Food_category,
            Ingredients,
            Preparation_time,
            Cooking_time,
            Tag,
            No_of_servings,
            Cuisine_category,
            Recipe_description,
            Preparation_method,
            Nutrient_values,
            Recipe_URL,
        )
        VALUES (
            $1,$2,$3,$4,$5,$6,$7,
            $8,$9,$10,$11,$12,$13,$14
        )
        ON CONFLICT (
            Recipe_id, 
        )
        DO NOTHING
    `;

    const values = [
        recipe.Recipe_id,
        recipe.Recipe_name,
        recipe.Recipe_category,
        recipe.Food_category,
        recipe.Ingredients,
        recipe.Preparation_time,
        recipe.Cooking_time,
        recipe.Tag,
        recipe.No_of_servings,
        recipe.Cuisine_category,
        recipe.Recipe_description,
        recipe.Preparation_method,
        recipe.Nutrient_values,
        recipe.Recipe_URL,
    ];

    try {await pool.query(query,values);} 
    catch (error) {console.error(`Failed to save recipe ${recipe.recipe_name}:`,error.message);

    throw error;
    }
}