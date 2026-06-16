import pool from "./dbConnection.js";

export async function insertRecipe(recipe, tableName, allergyType = null) {
  try {
    const allergyTables = [
      "lfv_eliminate_allergy",
      "lfv_add_allergy",
      "lchf_eliminate_allergy",
      "lchf_add_allergy",
    ];

    let query;
    let values;

    if (allergyTables.includes(tableName)) {
      query = `
        INSERT INTO ${tableName} (
          recipe_id, recipe_name, recipe_category, food_category,
          ingredients, preparation_time, cooking_time,
          tag, no_of_servings, cuisine_category,
          recipe_description, preparation_method,
          nutrient_values, recipe_url, allergy_type
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
        ON CONFLICT (recipe_url) DO NOTHING
      `;
      values = [
        recipe.recipe_id,
        recipe.recipe_name,
        recipe.recipe_category,
        recipe.food_category,
        recipe.ingredients,
        recipe.preparation_time,
        recipe.cooking_time,
        recipe.tag,
        recipe.no_of_servings,
        recipe.cuisine_category,
        recipe.recipe_description,
        recipe.preparation_method,
        recipe.nutrient_values,
        recipe.recipe_url,
        allergyType,
      ];
    } else {
      query = `
        INSERT INTO ${tableName} (
          recipe_id, recipe_name, recipe_category, food_category,
          ingredients, preparation_time, cooking_time,
          tag, no_of_servings, cuisine_category,
          recipe_description, preparation_method,
          nutrient_values, recipe_url
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
        ON CONFLICT (recipe_url) DO NOTHING
      `;
      values = [
        recipe.recipe_id,
        recipe.recipe_name,
        recipe.recipe_category,
        recipe.food_category,
        recipe.ingredients,
        recipe.preparation_time,
        recipe.cooking_time,
        recipe.tag,
        recipe.no_of_servings,
        recipe.cuisine_category,
        recipe.recipe_description,
        recipe.preparation_method,
        recipe.nutrient_values,
        recipe.recipe_url,
      ];
    }

    await pool.query(query, values);
    console.log(`Inserted into ${tableName}: ${recipe.recipe_name}`);
  } catch (err) {
    console.error(`Failed to insert into ${tableName}:`, err.message);
  }
}
