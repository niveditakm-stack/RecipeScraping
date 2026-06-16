export function applyLFVFilter(recipe, lfvEliminate, lfvAdd) {
  const recipeIngredients = recipe.ingredients.toLowerCase();
  for (const ingredient of lfvEliminate) {
    if (recipeIngredients.includes(ingredient)) {
      return {
        table: null,
        reason: `DISCARDED — contains LFV eliminate ingredient: "${ingredient}"`,
      };
    }
  }
  for (const ingredient of lfvAdd) {
    if (recipeIngredients.includes(ingredient)) {
      return {
        table: "lfv_add",
        reason: `LFV_ADD — contains add ingredient: "${ingredient}"`,
      };
    }
  }

  return {
    table: "lfv_eliminate",
    reason: "LFV_SAFE — Recipe passed the elimination check",
  };
}
