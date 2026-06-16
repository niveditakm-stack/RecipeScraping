import { readAllergyData } from "../readers/excelReader.js";

const { allergies } = readAllergyData();

export function applyAllergyFilter(recipe, dietTable) {
  const recipeIngredients = recipe.ingredients.toLowerCase();

  for (const allergen of allergies) {
    if (recipeIngredients.includes(allergen)) {
      return {
        table: `${dietTable}_allergy`,
        allergy_type: allergen,
        reason: `ALLERGY — contains "${allergen}" → ${dietTable}_allergy`,
      };
    }
  }
  return {
    table: `${dietTable}_no_allergy`,
    allergy_type: null,
    reason: `NO ALLERGY → ${dietTable}_no_allergy`,
  };
}
