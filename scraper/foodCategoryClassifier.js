export function classifyFoodCategory(
breadcrumbs = "",
tags = [],
ingredients = []
) {

const normalizedBreadcrumbs = Array.isArray(breadcrumbs)? breadcrumbs.join(" ").toLowerCase(): breadcrumbs.toLowerCase();

const normalizedTags = tags.map(
    tag => tag.toLowerCase()
);

const normalizedIngredients = ingredients.map(
    ingredient => ingredient.toLowerCase()
);

const dairyKeywords = [
    "milk",
    "paneer",
    "curd",
    "yogurt",
    "butter",
    "ghee",
    "cream",
    "cheese"
];

const eggKeywords = [
    "egg",
    "eggs",
    "egg white",
    "egg yolk"
];

const nonVegKeywords = [
    "chicken",
    "fish",
    "mutton",
    "prawn",
    "shrimp"
];

//  Jain
if (
    normalizedBreadcrumbs.includes("jain") ||
    normalizedTags.some(tag => tag.includes("jain"))
) {
    return "Jain";
}

//  Non-veg
if (
    normalizedIngredients.some(ingredient =>
        nonVegKeywords.some(keyword =>
            ingredient.includes(keyword)
        )
    )
) {
    return "Non-veg";
}

// Eggitarian
if (
    normalizedIngredients.some(ingredient =>
        eggKeywords.some(keyword =>
            ingredient.includes(keyword)
        )
    )
) {
    return "Eggitarian";
}

//  Vegetarian
if (
    normalizedIngredients.some(ingredient =>
        dairyKeywords.some(keyword =>
            ingredient.includes(keyword)
        )
    )
) {
    return "Vegetarian";
}

 //Vegan
return "Vegan";


}