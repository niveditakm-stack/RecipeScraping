export function applyLCHFFilter(recipe, lchfEliminate, lchfAdd) {
  const recipeIngredients = recipe.ingredients.toLowerCase();

  for (const ingredient of lchfEliminate) {
    if (recipeIngredients.includes(ingredient)) {
      return {
        table: null,
        reason: `DISCARDED — contains LCHF eliminate ingredient: "${ingredient}"`,
      };
    }
  }

  for (const ingredient of lchfAdd) {
    if (recipeIngredients.includes(ingredient)) {
      return {
        table: "lchf_add",
        reason: `LCHF_ADD — contains add ingredient: "${ingredient}"`,
      };
    }
  }

  return {
    table: "lchf_eliminate",
    reason: "LCHF_SAFE — Recipe passed the elimination check",
  };
}
