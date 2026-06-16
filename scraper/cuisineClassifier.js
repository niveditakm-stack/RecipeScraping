export function classifyCuisine(recipeDescription) {
if (!recipeDescription) {
return "Unknown";
}

const description = recipeDescription.toLowerCase();

// Priority 1 - Regional / Specific Cuisine
if (description.includes("punjabi")) return "Punjabi";
if (description.includes("gujarati")) return "Gujarati";
if (description.includes("maharashtrian")) return "Maharashtrian";
if (description.includes("mumbai")) return "Maharashtrian";
if (description.includes("kerala")) return "Kerala";
if (description.includes("andhra")) return "Andhra";
if (description.includes("bengali")) return "Bengali";
if (description.includes("rajasthani")) return "Rajasthani";
if (description.includes("south indian")) return "South Indian";
if (description.includes("north indian")) return "North Indian";

// International Cuisines
if (description.includes("chinese")) return "Chinese";
if (description.includes("italian")) return "Italian";
if (description.includes("mexican")) return "Mexican";

// Generic Indian Fallback
if (
description.includes("indian dish") ||
description.includes("traditional indian") ||
description.includes("popular across india") ||
description.includes("indian cuisine")
) {
return "Indian";
}

return "Indian";
}